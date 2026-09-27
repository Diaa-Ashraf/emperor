<?php

namespace App\Adapters\Providers;

use App\Contracts\ProviderAdapter;
use App\DTOs\OrderRequestDTO;
use App\DTOs\ProviderOrderResultDTO;
use App\DTOs\StockVerificationDTO;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TamiAdapter implements ProviderAdapter
{
    protected string $apiUrl;
    protected ?string $clientId;
    protected ?string $clientSecret;
    protected bool $sandbox;
    protected int $timeout;

    public function __construct(array $config = [])
    {
        $this->apiUrl = rtrim($config['api_url'] ?? env('TAMI_API_URL', 'https://api.tami-cards.com/api/v2'), '/');
        $this->clientId = $config['client_id'] ?? env('TAMI_CLIENT_ID');
        $this->clientSecret = $config['client_secret'] ?? env('TAMI_CLIENT_SECRET');
        $this->sandbox = (bool) ($config['sandbox_mode'] ?? env('TAMI_SANDBOX_MODE', false));
        $this->timeout = (int) ($config['timeout'] ?? 20);
    }

    /**
     * Submit voucher card order to Tami.
     */
    public function executeOrder(OrderRequestDTO $orderDto): ProviderOrderResultDTO
    {
        if (empty($this->clientId) || $this->sandbox) {
            Log::info("Tami Cards: Simulated fulfillment for Tier ID: {$orderDto->productTierId}, Qty: {$orderDto->quantity}");

            $simulatedCodes = [];
            for ($i = 0; $i < $orderDto->quantity; $i++) {
                $simulatedCodes[] = 'TAMI-' . strtoupper(substr(md5(uniqid()), 0, 16));
            }

            return new ProviderOrderResultDTO(
                success: true,
                status: 'completed',
                providerOrderId: 'TAMI-SIM-' . strtoupper(uniqid()),
                voucherCodes: $simulatedCodes,
                errorMessage: null,
                rawResponse: ['simulated' => true, 'provider' => 'tami', 'codes' => $simulatedCodes],
                costAmount: 0.0
            );
        }

        try {
            $response = Http::timeout($this->timeout)
                ->withBasicAuth($this->clientId, $this->clientSecret ?? '')
                ->post("{$this->apiUrl}/vouchers/purchase", [
                    'product_sku' => $orderDto->productTierId,
                    'quantity' => $orderDto->quantity,
                    'reference' => 'EMP-TAMI-' . uniqid(),
                ]);

            $json = $response->json() ?? [];

            if ($response->successful() && !empty($json['cards'])) {
                $pins = array_column($json['cards'], 'pin_code');

                return new ProviderOrderResultDTO(
                    success: true,
                    status: 'completed',
                    providerOrderId: $json['transaction_id'] ?? ('TAMI-' . uniqid()),
                    voucherCodes: $pins,
                    errorMessage: null,
                    rawResponse: $json,
                    costAmount: (float) ($json['total_cost'] ?? 0.0)
                );
            }

            Log::warning("Tami purchase failed: " . $response->body());

            return new ProviderOrderResultDTO(
                success: false,
                status: 'failed',
                providerOrderId: null,
                voucherCodes: null,
                errorMessage: $json['error'] ?? 'فشل شراء الكروت من مزود طامي.',
                rawResponse: $json
            );
        } catch (\Exception $e) {
            Log::error("Tami adapter error: " . $e->getMessage());

            return new ProviderOrderResultDTO(
                success: false,
                status: 'failed',
                providerOrderId: null,
                voucherCodes: null,
                errorMessage: 'تعذر الاتصال بمزود طامي: ' . $e->getMessage()
            );
        }
    }

    /**
     * Check order status from Tami.
     */
    public function checkOrderStatus(string $providerOrderId): ProviderOrderResultDTO
    {
        if (empty($this->clientId) || $this->sandbox) {
            return new ProviderOrderResultDTO(
                success: true,
                status: 'completed',
                providerOrderId: $providerOrderId
            );
        }

        try {
            $response = Http::timeout($this->timeout)
                ->withBasicAuth($this->clientId, $this->clientSecret ?? '')
                ->get("{$this->apiUrl}/vouchers/orders/{$providerOrderId}");

            $json = $response->json() ?? [];

            return new ProviderOrderResultDTO(
                success: $response->successful(),
                status: $json['status'] ?? 'completed',
                providerOrderId: $providerOrderId,
                voucherCodes: isset($json['cards']) ? array_column($json['cards'], 'pin_code') : null,
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
     * Verify stock availability for digital vouchers.
     */
    public function verifyPlayer(string $sku, string $playerId, ?string $serverId = null): StockVerificationDTO
    {
        if (empty($this->clientId) || $this->sandbox) {
            return new StockVerificationDTO(
                valid: true,
                playerName: 'Voucher Stock Available',
                message: 'In stock',
                raw: ['stock' => 999]
            );
        }

        try {
            $response = Http::timeout(10)
                ->withBasicAuth($this->clientId, $this->clientSecret ?? '')
                ->get("{$this->apiUrl}/vouchers/stock/{$sku}");

            $json = $response->json() ?? [];
            $inStock = ($json['available_stock'] ?? 0) > 0;

            return new StockVerificationDTO(
                valid: $inStock,
                playerName: $inStock ? 'متوفر بالمخزون' : 'غير متوفر حالياً',
                message: $inStock ? 'Stock available' : 'Out of stock',
                raw: $json
            );
        } catch (\Exception $e) {
            return new StockVerificationDTO(
                valid: true, // Optimistic fallback
                message: 'Could not verify real-time stock'
            );
        }
    }

    /**
     * Get remaining balance on Tami account.
     */
    public function getBalance(): array
    {
        if (empty($this->clientId) || $this->sandbox) {
            return [
                'currency' => 'USD',
                'balance' => 50000.00,
                'status' => 'active',
            ];
        }

        try {
            $response = Http::timeout(10)
                ->withBasicAuth($this->clientId, $this->clientSecret ?? '')
                ->get("{$this->apiUrl}/account/balance");

            $json = $response->json() ?? [];

            return [
                'currency' => $json['currency'] ?? 'USD',
                'balance' => (float) ($json['balance'] ?? 0.0),
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
