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
        $baseUrl = rtrim((string) ($config['base_url'] ?? config('services.jasser_card.base_url')), '/');
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
            return [$products];
        }

        return array_values($products);
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

        $params = $orderDto->extraFields;
        foreach (['player_id' => $orderDto->playerId, 'server_id' => $orderDto->serverId, 'region' => $orderDto->accountRegion] as $key => $value) {
            if ($value && !isset($params[$key])) $params[$key] = $value;
        }

        try {
            $data = $this->request('POST', 'orders', ['json' => [
                'product_id' => is_numeric($productId) ? (int) $productId : $productId,
                'qty' => max(1, $orderDto->quantity),
                'order_uuid' => $orderDto->idempotencyKey ?: (string) Str::uuid(),
                'params' => (object) $params,
            ]]);
            $payload = (array) ($data['data'] ?? $data);
            $status = $this->normalizeStatus((string) ($payload['status'] ?? 'wait'));

            return new ProviderOrderResultDTO(
                success: true,
                status: $status,
                providerOrderId: (string) ($payload['order_id'] ?? $payload['order_uuid'] ?? ''),
                rawResponse: array_merge($data, ['order_uuid' => $payload['order_uuid'] ?? ($orderDto->idempotencyKey ?: null)]),
                costAmount: (float) ($payload['price'] ?? 0)
            );
        } catch (\Throwable $e) {
            return new ProviderOrderResultDTO(false, 'failed', errorMessage: $e->getMessage());
        }
    }

    public function checkOrderStatus(string $providerOrderId): ProviderOrderResultDTO
    {
        try {
            $query = str_starts_with($providerOrderId, 'ID_') ? ['orders' => $providerOrderId] : ['uuids' => $providerOrderId];
            $data = $this->request('GET', 'check', ['query' => $query]);
            $orders = $data['data'] ?? [];
            $order = is_array($orders) ? (array) (array_is_list($orders) ? ($orders[0] ?? []) : $orders) : [];
            $status = $this->normalizeStatus((string) ($order['status'] ?? 'wait'));
            return new ProviderOrderResultDTO(
                success: $status !== 'failed', status: $status,
                providerOrderId: (string) ($order['order_id'] ?? $providerOrderId),
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
