<?php

namespace App\Services;

use Exception;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class KaCardsService
{
    protected string $apiUrl;
    protected ?string $apiToken;
    protected int $timeout;

    public function __construct(array $config = [])
    {
        $this->apiUrl = rtrim($config['api_url'] ?? config('services.ka_cards.api_url', 'https://ka-cards.com/client/api'), '/');
        $this->apiToken = $config['api_token'] ?? config('services.ka_cards.api_token');
        $this->timeout = (int) ($config['timeout'] ?? config('services.ka_cards.timeout', 30));
    }

    /**
     * Get headers for API requests.
     */
    protected function getHeaders(): array
    {
        return [
            'api-token' => $this->apiToken,
            'Accept' => 'application/json',
            'Content-Type' => 'application/json',
        ];
    }

    /**
     * Fetch all available products and categories from KA-Cards.
     */
    public function getProducts(): array
    {
        try {
            $response = Http::timeout($this->timeout)
                ->withHeaders($this->getHeaders())
                ->get("{$this->apiUrl}/products");

            if ($response->successful()) {
                return $response->json() ?? [];
            }

            Log::error('KA-Cards getProducts failed: ' . $response->status(), [
                'body' => $response->body()
            ]);

            return [];
        } catch (Exception $e) {
            Log::error('KA-Cards getProducts Exception: ' . $e->getMessage());
            return [];
        }
    }

    /**
     * Fetch content / custom fields schema for a category or product.
     */
    public function getContent(int|string $id = 0): array
    {
        try {
            $response = Http::timeout($this->timeout)
                ->withHeaders($this->getHeaders())
                ->get("{$this->apiUrl}/content/{$id}");

            if ($response->successful()) {
                return $response->json() ?? [];
            }

            Log::warning("KA-Cards getContent({$id}) failed: " . $response->status());
            return [];
        } catch (Exception $e) {
            Log::error("KA-Cards getContent({$id}) Exception: " . $e->getMessage());
            return [];
        }
    }

    /**
     * Execute an order on KA-Cards.
     *
     * @param int $productId
     * @param int $qty
     * @param string $orderUuid Client reference UUID
     * @param array $params Custom dynamic params like player_id, server_id, etc.
     * @return array
     */
    public function createOrder(int $productId, int $qty, string $orderUuid, array $params = []): array
    {
        try {
            $payload = [
                'product_id' => $productId,
                'qty' => $qty,
                'order_uuid' => $orderUuid,
                'params' => (object) $params,
            ];

            $response = Http::timeout($this->timeout)
                ->withHeaders($this->getHeaders())
                ->post("{$this->apiUrl}/orders", $payload);

            $result = $response->json() ?? [];

            Log::info('KA-Cards createOrder response:', [
                'status' => $response->status(),
                'payload' => $payload,
                'response' => $result,
            ]);

            return [
                'successful' => $response->successful() && ($result['status'] ?? '') === 'OK',
                'status_code' => $response->status(),
                'data' => $result['data'] ?? null,
                'raw' => $result,
                'message' => $result['message'] ?? null,
            ];
        } catch (Exception $e) {
            Log::error('KA-Cards createOrder Exception: ' . $e->getMessage());

            return [
                'successful' => false,
                'status_code' => 500,
                'data' => null,
                'raw' => [],
                'message' => $e->getMessage(),
            ];
        }
    }

    /**
     * Check status of multiple or single orders by their KA order_ids.
     *
     * @param array|string $orderIds
     * @return array
     */
    public function checkOrders(array|string $orderIds): array
    {
        try {
            $ids = is_array($orderIds) ? implode(',', $orderIds) : $orderIds;

            $response = Http::timeout($this->timeout)
                ->withHeaders($this->getHeaders())
                ->get("{$this->apiUrl}/check", [
                    'orders' => $ids,
                ]);

            if ($response->successful()) {
                $result = $response->json() ?? [];
                return $result['data'] ?? [];
            }

            Log::warning('KA-Cards checkOrders failed: ' . $response->status(), [
                'ids' => $ids,
                'body' => $response->body()
            ]);

            return [];
        } catch (Exception $e) {
            Log::error('KA-Cards checkOrders Exception: ' . $e->getMessage());
            return [];
        }
    }
}
