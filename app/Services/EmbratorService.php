<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class EmbratorService
{
    protected Client $client;
    protected string $baseUrl;
    protected string $apiKey;

    public function __construct(array $config = [])
    {
        $this->baseUrl = rtrim($config['base_url'] ?? config('services.embrator.base_url', 'https://embrator.store/api/v1/reseller'), '/');
        $this->apiKey = $config['api_key'] ?? config('services.embrator.api_key', '8a36b758817f8708502c4e16cd3a4b5f9650133a1968961a68b08f6e4544ed8f');

        $this->client = new Client([
            'base_uri' => $this->baseUrl . '/',
            'timeout' => 20,
            'connect_timeout' => 10,
            'verify' => false,
            'headers' => [
                'x-api-key' => $this->apiKey,
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
                'User-Agent' => 'Emperor-B2B-Client/1.0',
            ],
        ]);
    }

    /**
     * Check reseller account data and balance.
     */
    public function getBalance(): array
    {
        try {
            $response = $this->client->get('balance');
            $data = json_decode($response->getBody()->getContents(), true);

            if (($data['success'] ?? false) && isset($data['data'])) {
                return [
                    'success' => true,
                    'balance' => (float) ($data['data']['balance'] ?? $data['data']['walletBalance'] ?? 0),
                    'wallet_balance' => (float) ($data['data']['walletBalance'] ?? 0),
                    'credit_limit' => (float) ($data['data']['creditLimit'] ?? 0),
                    'credit_used' => (float) ($data['data']['creditUsed'] ?? 0),
                    'currency' => $data['data']['currency'] ?? 'USD',
                    'email' => $data['data']['email'] ?? '',
                    'raw' => $data['data'],
                ];
            }

            return [
                'success' => false,
                'error' => $data['error']['message'] ?? 'فشل جلب رصيد الحساب من المزود',
                'raw' => $data,
            ];
        } catch (RequestException $e) {
            $msg = $this->extractErrorMessage($e);
            Log::error('Embrator balance check failed: ' . $msg);
            return ['success' => false, 'error' => $msg];
        } catch (\Throwable $e) {
            Log::error('Embrator balance check error: ' . $e->getMessage());
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }

    /**
     * Get active products catalog and required dynamic fields.
     */
    public function getProducts(): array
    {
        try {
            $response = $this->client->get('products');
            $data = json_decode($response->getBody()->getContents(), true);

            if (($data['success'] ?? false) && isset($data['data']) && is_array($data['data'])) {
                return [
                    'success' => true,
                    'products' => $data['data'],
                    'count' => count($data['data']),
                ];
            }

            return [
                'success' => false,
                'products' => [],
                'error' => $data['error']['message'] ?? 'فشل جلب منتجات المزود',
            ];
        } catch (RequestException $e) {
            $msg = $this->extractErrorMessage($e);
            Log::error('Embrator get products failed: ' . $msg);
            return ['success' => false, 'products' => [], 'error' => $msg];
        } catch (\Throwable $e) {
            Log::error('Embrator get products error: ' . $e->getMessage());
            return ['success' => false, 'products' => [], 'error' => $e->getMessage()];
        }
    }

    /**
     * Place order with external provider.
     */
    public function createOrder(
        string $productId,
        float|int $quantity,
        ?string $idempotencyKey = null,
        array $dynamicFields = []
    ): array {
        $idempotencyKey = $idempotencyKey ?: (string) Str::uuid();

        $payload = array_merge([
            'productId' => $productId,
            'quantity' => (float) $quantity,
            'idempotencyKey' => $idempotencyKey,
        ], $dynamicFields);

        try {
            $response = $this->client->post('orders', [
                'json' => $payload,
            ]);

            $data = json_decode($response->getBody()->getContents(), true);

            if (($data['success'] ?? false) && isset($data['data'])) {
                return [
                    'success' => true,
                    'order_id' => $data['data']['orderId'] ?? null,
                    'order_number' => $data['data']['orderNumber'] ?? null,
                    'status' => $data['data']['status'] ?? 'PENDING',
                    'idempotency_key' => $data['data']['idempotencyKey'] ?? $idempotencyKey,
                    'raw' => $data,
                ];
            }

            return [
                'success' => false,
                'error_code' => $data['error']['code'] ?? null,
                'error_message' => $data['error']['message'] ?? 'فشل إنشاء الطلب لدى المزود',
                'raw' => $data,
            ];
        } catch (RequestException $e) {
            $msg = $this->extractErrorMessage($e);
            $respBody = $e->hasResponse() ? json_decode($e->getResponse()->getBody()->getContents(), true) : [];
            Log::error('Embrator createOrder failed: ' . $msg, ['payload' => $payload, 'response' => $respBody]);

            return [
                'success' => false,
                'error_code' => $respBody['error']['code'] ?? $e->getCode(),
                'error_message' => $respBody['error']['message'] ?? $msg,
                'raw' => $respBody,
            ];
        } catch (\Throwable $e) {
            Log::error('Embrator createOrder exception: ' . $e->getMessage());
            return [
                'success' => false,
                'error_code' => 500,
                'error_message' => $e->getMessage(),
                'raw' => [],
            ];
        }
    }

    /**
     * Check order status (single or batch by idempotency keys / order IDs).
     */
    public function checkOrders(array|string $keys): array
    {
        $keysList = is_array($keys) ? implode(',', $keys) : $keys;

        try {
            $response = $this->client->get('orders', [
                'query' => ['keys' => $keysList],
            ]);

            $data = json_decode($response->getBody()->getContents(), true);

            if (($data['success'] ?? false) && isset($data['data'])) {
                return [
                    'success' => true,
                    'orders' => $data['data'],
                ];
            }

            return [
                'success' => false,
                'error' => $data['error']['message'] ?? 'فشل فحص حالة الطلب',
            ];
        } catch (RequestException $e) {
            return ['success' => false, 'error' => $this->extractErrorMessage($e)];
        } catch (\Throwable $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }

    /**
     * Extract human error message from Guzzle exception.
     */
    protected function extractErrorMessage(RequestException $e): string
    {
        if ($e->hasResponse()) {
            $body = json_decode($e->getResponse()->getBody()->getContents(), true);
            if (!empty($body['error']['message'])) {
                return $body['error']['message'];
            }
            if (!empty($body['message'])) {
                return $body['message'];
            }
        }

        return $e->getMessage();
    }
}

