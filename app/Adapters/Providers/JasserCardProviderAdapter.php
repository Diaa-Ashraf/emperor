<?php

namespace App\Adapters\Providers;

use App\Contracts\ProviderAdapter;
use App\DTOs\OrderRequestDTO;
use App\DTOs\ProviderOrderResultDTO;
use App\DTOs\StockVerificationDTO;
use GuzzleHttp\Client;
use Illuminate\Support\Str;
use RuntimeException;

/** Jasser Card implementation of the provider API used by the card suppliers. */
class JasserCardProviderAdapter implements ProviderAdapter
{
    private Client $client;

    public function __construct(private array $config = [])
    {
        $rawBaseUrl = (string) ($config['base_url'] ?? config('services.jasser_card.base_url', 'https://jasser-card.net/client/api'));
        $baseUrl = rtrim($rawBaseUrl, '/');
        // Jasser Card endpoints are under /client/api (e.g. /client/api/profile, /client/api/products)
        if ($baseUrl === 'https://jasser-card.net/api' || $baseUrl === 'https://jasser-card.net' || $baseUrl === 'http://jasser-card.net/api' || $baseUrl === 'http://jasser-card.net') {
            $baseUrl = 'https://jasser-card.net/client/api';
        }
        $token = (string) ($config['api_token'] ?? $config['api_key'] ?? config('services.jasser_card.api_token', ''));
        if ($token === '') {
            throw new RuntimeException('مفتاح API Token الخاص بمورد Jasser Card غير مضبوط.');
        }

        $this->client = new Client([
            'base_uri' => $baseUrl . '/',
            'timeout' => (int) ($config['timeout'] ?? config('services.jasser_card.timeout', 25)),
            'connect_timeout' => 10,
            'headers' => [
                'api-token' => $token,
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
            ],
        ]);
    }

    public function getBalance(): array
    {
        $data = $this->request('GET', 'profile');
        $profile = (array) ($data['data'] ?? $data);

        return [
            'success' => true,
            'balance' => (float) ($profile['balance'] ?? $profile['wallet_balance'] ?? 0),
            'currency' => (string) ($profile['currency'] ?? 'USD'),
            'email' => (string) ($profile['email'] ?? ''),
            'raw' => $data,
        ];
    }

    public function getProducts(array $query = []): array
    {
        $data = $this->request('GET', 'products', $query ? ['query' => $query] : []);

        // Jasser deployments have returned the catalog both as a top-level
        // list and wrapped under data/products/items/result. Unwrap known
        // envelopes before normalizing keyed collections into a list.
        $products = $data;
        for ($depth = 0; $depth < 4 && is_array($products) && !array_is_list($products); $depth++) {
            $next = null;
            foreach (['products', 'items', 'result', 'data'] as $key) {
                if (isset($products[$key]) && is_array($products[$key])) {
                    $next = $products[$key];
                    break;
                }
            }

            if ($next === null) {
                break;
            }

            $products = $next;
        }

        if (!is_array($products)) {
            throw new RuntimeException('صيغة كتالوج Jasser Card غير مفهومة.');
        }

        // Some APIs return one product object directly; do not mistake its
        // fields for a list of separate products.
        if (!array_is_list($products) && (isset($products['id']) || isset($products['product_id']) || isset($products['products_id']))) {
            $products = [$products];
        }

        return array_values(array_map(function ($product) {
            if (!is_array($product)) {
                return [];
            }

            $usdPrice = $product['unit_price_usd'] ?? $product['unitPriceUsd']
                ?? $product['priceUsd'] ?? $product['price_usd'] ?? $product['usd_price'] ?? null;
            $price = $usdPrice ?? $product['unit_price'] ?? $product['unitPrice']
                ?? $product['price'] ?? $product['cost'] ?? $product['amount'] ?? 0;
            $currency = $product['currency']
                ?? $product['price_currency']
                ?? $product['priceCurrency']
                ?? $product['currency_code']
                ?? $product['currencyCode']
                ?? ($usdPrice !== null ? 'USD' : 'USD');

            $rawPrice = (float) $price;
            $qtyValues = is_array($product['qty_values'] ?? null) ? $product['qty_values'] : [];
            $limits = is_array($product['limits'] ?? null) ? $product['limits'] : [];
            $quantityRange = is_array($product['quantity_range'] ?? null) ? $product['quantity_range']
                : (is_array($product['quantityRange'] ?? null) ? $product['quantityRange']
                    : (is_array($product['qty_range'] ?? null) ? $product['qty_range']
                        : (is_array($product['range'] ?? null) ? $product['range'] : [])));
            if (array_is_list($qtyValues) && count($qtyValues) > 1) {
                $explicitQtyValues = array_values(array_filter($qtyValues, 'is_numeric'));
                if ($explicitQtyValues) {
                    $qtyValues = ['min' => min($explicitQtyValues), 'max' => max($explicitQtyValues)];
                }
            }
            $minQty = $this->firstPositiveInteger([
                $product['min_qty'] ?? null, $product['minQty'] ?? null, $product['min_quantity'] ?? null,
                $product['minQuantity'] ?? null, $product['minimum_quantity'] ?? null, $product['min_order'] ?? null,
                $product['minOrder'] ?? null, $product['min_order_qty'] ?? null, $product['minOrderQty'] ?? null,
                $product['min'] ?? null, $product['minimum'] ?? null, $product['min_amount'] ?? null, $product['minAmount'] ?? null,
                $qtyValues['min'] ?? null, $qtyValues['minimum'] ?? null, $limits['min'] ?? null, $quantityRange['min'] ?? null,
            ], 1);
            $maxQty = $this->firstPositiveInteger([
                $product['max_qty'] ?? null, $product['maxQty'] ?? null, $product['max_quantity'] ?? null,
                $product['maxQuantity'] ?? null, $product['maximum_quantity'] ?? null, $product['max_order'] ?? null,
                $product['maxOrder'] ?? null, $product['max_order_qty'] ?? null, $product['maxOrderQty'] ?? null,
                $product['max'] ?? null, $product['maximum'] ?? null, $product['max_amount'] ?? null, $product['maxAmount'] ?? null,
                $qtyValues['max'] ?? null, $qtyValues['maximum'] ?? null, $limits['max'] ?? null, $quantityRange['max'] ?? null,
            ], 1);

            $priceQuantity = $this->firstPositiveInteger([
                $product['price_quantity'] ?? null, $product['priceQuantity'] ?? null,
                $product['price_for_qty'] ?? null, $product['priceForQty'] ?? null,
                $product['price_for_quantity'] ?? null, $product['priceForQuantity'] ?? null,
                $product['price_qty'] ?? null, $product['priceQty'] ?? null,
                $product['pricing_quantity'] ?? null, $product['pricingQuantity'] ?? null,
                $product['price_base_qty'] ?? null, $product['priceBaseQty'] ?? null,
                $product['price_basis'] ?? null, $product['priceBasis'] ?? null,
                $product['base_qty'] ?? null, $product['baseQty'] ?? null,
            ], 1);
            $priceIsAlreadyPerUnit = isset($product['unit_price']) || isset($product['unitPrice'])
                || isset($product['unit_price_usd']) || isset($product['unitPriceUsd']);
            $unitPrice = $rawPrice;
            if (!$priceIsAlreadyPerUnit && $rawPrice > 0 && $priceQuantity > 1) {
                $unitPrice = $rawPrice / $priceQuantity;
            } elseif (!$priceIsAlreadyPerUnit && $rawPrice > 0 && $minQty > 1 && $rawPrice > 0.01) {
                // Jasser Card may publish the cost for its minimum order quantity.
                $unitPrice = $rawPrice / $minQty;
            }

            return array_merge($product, [
                'id' => (string) ($product['id'] ?? $product['product_id'] ?? $product['productId'] ?? $product['products_id'] ?? $product['productsId'] ?? $product['sku'] ?? ''),
                'name' => (string) ($product['name'] ?? $product['title'] ?? $product['product_name'] ?? $product['productName'] ?? ''),
                'price' => (float) $unitPrice,
                'currency' => strtoupper((string) $currency),
                'min_qty' => $minQty,
                // Do not invent a 10-million quantity range when Jasser omits it:
                // the storefront would multiply a fixed package price by an arbitrary user quantity.
                'max_qty' => max($minQty, $maxQty),
            ]);
        }, $products));
    }

    private function firstPositiveInteger(array $values, int $default): int
    {
        foreach ($values as $value) {
            if (is_numeric($value) && (int) $value > 0) {
                return (int) $value;
            }
        }

        return $default;
    }

    public function getContent(int|string $categoryId = 0): array
    {
        $data = $this->request('GET', 'content/' . rawurlencode((string) $categoryId));
        return (array) ($data['data'] ?? []);
    }

    public function executeOrder(OrderRequestDTO $orderDto): ProviderOrderResultDTO
    {
        $productId = $orderDto->providerSku;
        if (!$productId && $orderDto->productTierId) {
            $mapping = \App\Models\ProductProvider::where('product_tier_id', $orderDto->productTierId)
                ->where('provider_id', $this->config['_provider_id'] ?? 0)->where('is_active', true)->first();
            $productId = $mapping?->provider_sku;
        }
        if (!$productId) {
            return new ProviderOrderResultDTO(false, 'failed', errorMessage: 'معرف منتج Jasser Card غير مربوط.');
        }

        $params = $orderDto->extraFields ?: [];
        $playerId = $orderDto->playerId ?: ($params['playerId'] ?? $params['player_id'] ?? $params['userId'] ?? $params['user_id'] ?? $params['id'] ?? null);
        if ($playerId) {
            $params['playerId'] = $playerId;
        }

        $orderUuid = $orderDto->idempotencyKey ?: (string) Str::uuid();
        $queryParams = array_merge($params, [
            'qty' => max(1, $orderDto->quantity),
            'order_uuid' => $orderUuid,
        ]);

        try {
            // According to Jasser Card API documentation:
            // GET /client/api/newOrder/{product_id}/params?qty=1&playerId=...&order_uuid=...
            $data = $this->request('GET', 'newOrder/' . rawurlencode((string) $productId) . '/params', [
                'query' => $queryParams,
            ]);

            $orderData = (array) ($data['order'] ?? $data['data'] ?? $data);
            $status = $this->normalizeStatus((string) ($orderData['status'] ?? $data['status'] ?? 'wait'));

            return new ProviderOrderResultDTO(
                success: $status !== 'failed',
                status: $status,
                providerOrderId: (string) ($orderData['id'] ?? $orderData['order_id'] ?? $orderData['order_uuid'] ?? $orderUuid),
                rawResponse: array_merge($data, ['order_uuid' => $orderUuid]),
                costAmount: (float) ($orderData['price'] ?? 0)
            );
        } catch (\Throwable $e) {
            return new ProviderOrderResultDTO(false, 'failed', errorMessage: $e->getMessage());
        }
    }

    public function checkOrderStatus(string $providerOrderId): ProviderOrderResultDTO
    {
        try {
            // According to documentation:
            // GET /client/api/check?orders=[ID_a37aaa06] or /client/api/check?orders=[UUID]&uuid=1
            $isUuid = !str_starts_with($providerOrderId, 'ID_');
            $query = [
                'orders' => '[' . $providerOrderId . ']',
            ];
            if ($isUuid) {
                $query['uuid'] = 1;
            }

            $data = $this->request('GET', 'check', ['query' => $query]);
            $orders = $data['orders'] ?? $data['data'] ?? [];
            $order = is_array($orders) ? (array) (array_is_list($orders) ? ($orders[0] ?? []) : $orders) : [];
            $status = $this->normalizeStatus((string) ($order['status'] ?? 'wait'));

            return new ProviderOrderResultDTO(
                success: $status !== 'failed',
                status: $status,
                providerOrderId: (string) ($order['id'] ?? $order['order_id'] ?? $providerOrderId),
                errorMessage: $status === 'failed' ? 'رفض المورد الطلب.' : null,
                rawResponse: $order,
                costAmount: (float) ($order['price'] ?? 0)
            );
        } catch (\Throwable $e) {
            return new ProviderOrderResultDTO(false, 'pending', providerOrderId: $providerOrderId, errorMessage: $e->getMessage());
        }
    }

    public function verifyPlayer(string $sku, string $playerId, ?string $serverId = null): StockVerificationDTO
    {
        return new StockVerificationDTO(available: true, currentStock: 999999, message: 'جاهز للشحن لدى Jasser Card');
    }

    private function request(string $method, string $path, array $options = []): array
    {
        try {
            $response = $this->client->request($method, ltrim($path, '/'), $options);
            $data = json_decode((string) $response->getBody(), true);
            if (!is_array($data)) throw new RuntimeException('استجابة Jasser Card غير صالحة.');
            if (strtoupper((string) ($data['status'] ?? '')) === 'ERROR' || ($data['success'] ?? true) === false) {
                throw new RuntimeException((string) ($data['message'] ?? 'فشل طلب Jasser Card.') . (isset($data['code']) ? ' (رمز ' . $data['code'] . ')' : ''));
            }
            return $data;
        } catch (\GuzzleHttp\Exception\RequestException $e) {
            $body = $e->hasResponse() ? json_decode((string) $e->getResponse()->getBody(), true) : null;
            throw new RuntimeException((string) (is_array($body) ? ($body['message'] ?? $e->getMessage()) : $e->getMessage()), (int) $e->getCode(), $e);
        }
    }

    private function normalizeStatus(string $status): string
    {
        return match (strtolower($status)) {
            'accept', 'accepted', 'complete', 'completed', 'success', 'successful' => 'completed',
            'reject', 'rejected', 'cancelled', 'canceled', 'failed', 'error' => 'failed',
            'wait', 'waiting', 'pending', 'processing', 'in_progress' => 'pending',
            default => 'pending',
        };
    }
}
