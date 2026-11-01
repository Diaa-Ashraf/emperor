<?php

namespace App\Adapters\Providers;

use App\Contracts\ProviderAdapter;
use App\DTOs\OrderRequestDTO;
use App\DTOs\ProviderOrderResultDTO;
use App\DTOs\StockVerificationDTO;
use GuzzleHttp\Client;
use Illuminate\Support\Str;
use RuntimeException;

class AdCardProviderAdapter implements ProviderAdapter
{
    private Client $client;

    public function __construct(private array $config = [])
    {
        $baseUrl = rtrim((string) config('services.ad_card.base_url', $config['base_url'] ?? 'https://ad-card.com/client/api'), '/');
        $token = (string) (config('services.ad_card.api_token') ?: ($config['api_token'] ?? $config['api_key'] ?? ''));
        if ($token === '') {
            throw new RuntimeException('مفتاح API Token الخاص بمورد AD Card غير مضبوط.');
        }

        $this->client = new Client([
            'base_uri' => $baseUrl . '/',
            'timeout' => (int) ($config['timeout'] ?? config('services.ad_card.timeout', 25)),
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
        $profile = $data['data'] ?? $data;
        return [
            'success' => true,
            'balance' => (float) ($profile['balance'] ?? 0),
            'currency' => $profile['currency'] ?? 'USD',
            'email' => $profile['email'] ?? '',
            'raw' => $data,
        ];
    }

    public function getProducts(array $query = []): array
    {
        if (isset($query['products_id'])) {
            $query['products_id'] = implode(',', (array) $query['products_id']);
        }
        $data = $this->request('GET', 'products', ['query' => $query]);
        $products = $data['data'] ?? $data;
        return is_array($products) ? array_values($products) : [];
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
                ->where('is_active', true)->first();
            $productId = $mapping?->provider_sku;
        }
        if (!$productId) {
            return new ProviderOrderResultDTO(false, 'failed', errorMessage: 'معرف منتج AD Card غير مربوط.');
        }

        $params = $orderDto->extraFields;
        if ($orderDto->playerId && !isset($params['player_id'])) $params['player_id'] = $orderDto->playerId;
        if ($orderDto->serverId && !isset($params['server_id'])) $params['server_id'] = $orderDto->serverId;
        if ($orderDto->accountRegion && !isset($params['region'])) $params['region'] = $orderDto->accountRegion;

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
            );
        } catch (\Throwable $e) {
            return new ProviderOrderResultDTO(false, 'failed', errorMessage: $e->getMessage());
        }
    }

    public function checkOrderStatus(string $providerOrderId): ProviderOrderResultDTO
    {
        try {
            $query = !str_starts_with($providerOrderId, 'ID_')
                ? ['uuids' => $providerOrderId]
                : ['orders' => $providerOrderId];
            $data = $this->request('GET', 'check', ['query' => $query]);
            $orders = $data['data'] ?? [];
            $order = is_array($orders) ? (array) (array_is_list($orders) ? ($orders[0] ?? []) : $orders) : [];
            $status = $this->normalizeStatus((string) ($order['status'] ?? 'wait'));
            return new ProviderOrderResultDTO(
                success: $status !== 'failed',
                status: $status,
                providerOrderId: (string) ($order['order_id'] ?? $providerOrderId),
                errorMessage: $status === 'failed' ? 'رفض المورد الطلب.' : null,
                rawResponse: $order,
            );
        } catch (\Throwable $e) {
            return new ProviderOrderResultDTO(false, 'pending', providerOrderId: $providerOrderId, errorMessage: $e->getMessage());
        }
    }

    public function checkStatus(string $providerOrderId): ProviderOrderResultDTO
    {
        return $this->checkOrderStatus($providerOrderId);
    }

    public function verifyPlayer(string $sku, string $playerId, ?string $serverId = null): StockVerificationDTO
    {
        return new StockVerificationDTO(available: true, currentStock: 999999, message: 'جاهز للشحن لدى AD Card');
    }

    private function request(string $method, string $path, array $options = []): array
    {
        try {
            $response = $this->client->request($method, ltrim($path, '/'), $options);
            $data = json_decode((string) $response->getBody(), true);
            if (!is_array($data)) throw new RuntimeException('استجابة AD Card غير صالحة.');
            if (($data['status'] ?? null) === 'ERROR') {
                throw new RuntimeException((string) ($data['message'] ?? 'فشل طلب AD Card.') . ' (رمز ' . ($data['code'] ?? '?') . ')');
            }
            return $data;
        } catch (\GuzzleHttp\Exception\RequestException $e) {
            $body = $e->hasResponse() ? json_decode((string) $e->getResponse()->getBody(), true) : null;
            throw new RuntimeException((string) ($body['message'] ?? $e->getMessage()), (int) $e->getCode(), $e);
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
