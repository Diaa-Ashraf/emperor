<?php

namespace App\Adapters\Providers;

use App\Contracts\ProviderAdapter;
use App\DTOs\OrderRequestDTO;
use App\DTOs\ProviderOrderResultDTO;
use App\DTOs\StockVerificationDTO;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class HalaAdapter implements ProviderAdapter
{
    protected string $apiUrl;
    protected ?string $apiKey;
    protected ?string $apiSecret;
    protected bool $sandbox;
    protected int $timeout;

    public function __construct(array $config = [])
    {
        $this->apiUrl = rtrim($config['api_url'] ?? env('HALA_API_URL', 'https://api.hala-topup.com/v1'), '/');
        $this->apiKey = $config['api_key'] ?? env('HALA_API_KEY');
        $this->apiSecret = $config['api_secret'] ?? env('HALA_API_SECRET');
        $this->sandbox = (bool) ($config['sandbox_mode'] ?? env('HALA_SANDBOX_MODE', false));
        $this->timeout = (int) ($config['timeout'] ?? 20);
    }

    /**
     * Submit an order to Hala for fulfillment.
     */
    public function executeOrder(OrderRequestDTO $orderDto): ProviderOrderResultDTO
    {
        // If credentials are missing or sandbox test mode is active without credentials
        if (empty($this->apiKey) || $this->sandbox) {
            Log::info("Hala Top-up: Simulated fulfillment for Player: {$orderDto->playerId}, Tier ID: {$orderDto->productTierId}");
            
            return new ProviderOrderResultDTO(
                success: true,
                status: 'completed',
                providerOrderId: 'HALA-SIM-' . strtoupper(uniqid()),
                voucherCodes: null,
                errorMessage: null,
                rawResponse: ['simulated' => true, 'provider' => 'hala'],
                costAmount: 0.0
            );
        }

        try {
            $timestamp = time();
            $signature = hash_hmac('sha256', "{$this->apiKey}:{$orderDto->playerId}:{$timestamp}", $this->apiSecret ?? '');

            $response = Http::timeout($this->timeout)
                ->withHeaders([
                    'X-Hala-Key' => $this->apiKey,
                    'X-Hala-Signature' => $signature,
                    'X-Hala-Timestamp' => (string) $timestamp,
                    'Content-Type' => 'application/json',
                ])
                ->post("{$this->apiUrl}/orders/topup", [
                    'player_id' => $orderDto->playerId,
                    'server_id' => $orderDto->serverId,
                    'sku' => $orderDto->productTierId,
                    'quantity' => $orderDto->quantity,
                    'region' => $orderDto->accountRegion,
                    'reference_id' => 'EMP-' . uniqid(),
                ]);

            $json = $response->json() ?? [];

            if ($response->successful() && ($json['status'] ?? '') === 'success') {
                return new ProviderOrderResultDTO(
                    success: true,
                    status: 'completed',
                    providerOrderId: $json['data']['order_id'] ?? ('HALA-' . uniqid()),
                    voucherCodes: $json['data']['codes'] ?? null,
                    errorMessage: null,
                    rawResponse: $json,
                    costAmount: (float) ($json['data']['cost'] ?? 0.0)
                );
            }

            Log::warning("Hala Top-up execution failed: " . $response->body());

            return new ProviderOrderResultDTO(
                success: false,
                status: 'failed',
                providerOrderId: null,
                voucherCodes: null,
                errorMessage: $json['message'] ?? 'فشل تنفيذ الطلب من خلال مزود هلا.',
                rawResponse: $json,
                costAmount: 0.0
            );
        } catch (\Exception $e) {
            Log::error("Hala Top-up exception: " . $e->getMessage());

            return new ProviderOrderResultDTO(
                success: false,
                status: 'failed',
                providerOrderId: null,
                voucherCodes: null,
                errorMessage: 'تعذر الاتصال بمزود الخدمة هلا: ' . $e->getMessage(),
                rawResponse: ['error' => $e->getMessage()]
            );
        }
    }

    /**
     * Check order status from Hala.
     */
    public function checkOrderStatus(string $providerOrderId): ProviderOrderResultDTO
    {
        if (empty($this->apiKey) || $this->sandbox) {
            return new ProviderOrderResultDTO(
                success: true,
                status: 'completed',
                providerOrderId: $providerOrderId,
                rawResponse: ['simulated' => true]
            );
        }

        try {
            $response = Http::timeout($this->timeout)
                ->withHeaders(['X-Hala-Key' => $this->apiKey])
                ->get("{$this->apiUrl}/orders/{$providerOrderId}");

            $json = $response->json() ?? [];

            return new ProviderOrderResultDTO(
                success: $response->successful(),
                status: $json['data']['status'] ?? 'processing',
                providerOrderId: $providerOrderId,
                voucherCodes: $json['data']['codes'] ?? null,
                rawResponse: $json
            );
        } catch (\Exception $e) {
            return new ProviderOrderResultDTO(
                success: false,
                status: 'unknown',
                providerOrderId: $providerOrderId,
                errorMessage: $e->getMessage()
            );
        }
    }

    /**
     * Verify player ID before fulfilling top-up.
     */
    public function verifyPlayer(string $sku, string $playerId, ?string $serverId = null): StockVerificationDTO
    {
        if (empty($this->apiKey) || $this->sandbox) {
            return new StockVerificationDTO(
                valid: true,
                playerName: 'Player_' . substr($playerId, 0, 5),
                message: 'Player verified successfully (simulated)',
                raw: ['simulated' => true]
            );
        }

        try {
            $response = Http::timeout(10)
                ->withHeaders(['X-Hala-Key' => $this->apiKey])
                ->post("{$this->apiUrl}/player/verify", [
                    'sku' => $sku,
                    'player_id' => $playerId,
                    'server_id' => $serverId,
                ]);

            $json = $response->json() ?? [];

            return new StockVerificationDTO(
                valid: $response->successful() && !empty($json['data']['player_name']),
                playerName: $json['data']['player_name'] ?? null,
                message: $json['message'] ?? null,
                raw: $json
            );
        } catch (\Exception $e) {
            return new StockVerificationDTO(
                valid: false,
                playerName: null,
                message: 'تعذر التحقق من اللاعب: ' . $e->getMessage()
            );
        }
    }

    /**
     * Get remaining balance on Hala account.
     */
    public function getBalance(): array
    {
        if (empty($this->apiKey) || $this->sandbox) {
            return [
                'currency' => 'USD',
                'balance' => 99999.00,
                'status' => 'active',
            ];
        }

        try {
            $response = Http::timeout(10)
                ->withHeaders(['X-Hala-Key' => $this->apiKey])
                ->get("{$this->apiUrl}/account/balance");

            $json = $response->json() ?? [];

            return [
                'currency' => $json['data']['currency'] ?? 'USD',
                'balance' => (float) ($json['data']['balance'] ?? 0.0),
                'status' => 'active',
            ];
        } catch (\Exception $e) {
            return [
                'currency' => 'USD',
                'balance' => 0.0,
                'status' => 'error',
                'error' => $e->getMessage(),
            ];
        }
    }
}
