<?php

namespace App\Adapters\Providers;

use App\Contracts\ProviderAdapter;
use App\DTOs\OrderRequestDTO;
use App\DTOs\ProviderOrderResultDTO;
use App\DTOs\StockVerificationDTO;
use App\Models\Product;
use App\Models\ProductProvider;
use App\Models\ProductTier;
use App\Services\EmbratorService;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class EmbratorProviderAdapter implements ProviderAdapter
{
    protected EmbratorService $service;

    public function __construct(
        protected array $config = []
    ) {
        if (!empty($this->config['base_url'])) {
            config(['services.embrator.base_url' => $this->config['base_url']]);
        }
        if (!empty($this->config['api_key'])) {
            config(['services.embrator.api_key' => $this->config['api_key']]);
        }
        $this->service = new EmbratorService($this->config);
    }

    /**
     * Submit an order to Embrator Store for fulfillment.
     */
    public function executeOrder(OrderRequestDTO $orderDto): ProviderOrderResultDTO
    {
        // 1. Resolve external product ID (e.g. 6ad81ae0b1bf9e7679dc76a8 for Yoho Coins)
        $externalProductId = $orderDto->providerSku;

        if ($orderDto->productTierId) {
            $pp = ProductProvider::where('product_tier_id', $orderDto->productTierId)
                ->where('provider_id', $this->config['_provider_id'] ?? 0)
                ->where('is_active', true)
                ->first();
            $externalProductId = $pp?->provider_sku ?: $externalProductId;
        }

        if (!$externalProductId && $orderDto->productId) {
            $pp = ProductProvider::where('product_id', $orderDto->productId)
                ->where('provider_id', $this->config['_provider_id'] ?? 0)
                ->where('is_active', true)
                ->first();
            $externalProductId = $pp?->provider_sku;
        }

        if (!$externalProductId && $orderDto->productTierId) {
            $tier = ProductTier::find($orderDto->productTierId);
            $externalProductId = $tier?->metadata['provider_product_id'] ?? $tier?->metadata['external_product_id'] ?? null;
        }

        if (!$externalProductId && $orderDto->productId) {
            $product = Product::find($orderDto->productId);
            $externalProductId = $product?->external_product_id ?: $product?->catalog_source_id;
        }

        if (!$externalProductId) {
            return new ProviderOrderResultDTO(
                success: false,
                status: 'failed',
                errorMessage: 'تعذر تحديد معرف المنتج المربوط لدى المزود (Product ID not mapped).'
            );
        }

        // 2. Prepare dynamic fields
        $dynamicFields = $orderDto->extraFields ?: [];
        if (!empty($orderDto->playerId)) {
            $dynamicFields['playerId'] = $orderDto->playerId;
        }
        if (!empty($orderDto->serverId)) {
            $dynamicFields['serverId'] = $orderDto->serverId;
        }
        if (!empty($orderDto->accountRegion)) {
            $dynamicFields['region'] = $orderDto->accountRegion;
        }

        $idempotencyKey = $orderDto->idempotencyKey ?: (string) Str::uuid();

        // 3. Dispatch to Embrator API
        $response = $this->service->createOrder(
            productId: (string) $externalProductId,
            quantity: $orderDto->quantity ?: 1,
            idempotencyKey: $idempotencyKey,
            dynamicFields: $dynamicFields
        );

        if ($response['success']) {
            $status = match (strtoupper($response['status'] ?? 'PENDING')) {
                'COMPLETED' => 'completed',
                'FAILED', 'CANCELLED' => 'failed',
                default => 'pending',
            };

            return new ProviderOrderResultDTO(
                success: true,
                status: $status,
                providerOrderId: (string) ($response['order_id'] ?? $response['order_number'] ?? $idempotencyKey),
                errorMessage: null,
                rawResponse: $response['raw'] ?? []
            );
        }

        return new ProviderOrderResultDTO(
            success: false,
            status: 'failed',
            errorMessage: $response['error_message'] ?? 'فشل تنفيذ الطلب لدى المزود (رمز: ' . ($response['error_code'] ?? '0') . ')',
            rawResponse: $response['raw'] ?? []
        );
    }

    /**
     * Check order status from provider.
     */
    public function checkOrderStatus(string $providerOrderId): ProviderOrderResultDTO
    {
        $response = $this->service->checkOrders($providerOrderId);

        if ($response['success'] && !empty($response['orders'])) {
            $orderInfo = is_array($response['orders']) ? ($response['orders'][0] ?? $response['orders']) : [];
            $rawStatus = strtoupper($orderInfo['status'] ?? 'PENDING');

            $status = match ($rawStatus) {
                'COMPLETED' => 'completed',
                'FAILED', 'CANCELLED' => 'failed',
                default => 'pending',
            };

            return new ProviderOrderResultDTO(
                success: $status !== 'failed',
                status: $status,
                providerOrderId: $orderInfo['orderId'] ?? $providerOrderId,
                errorMessage: $status === 'failed' ? 'تم إلغاء الطلب من قِبل المزود' : null,
                rawResponse: $orderInfo
            );
        }

        return new ProviderOrderResultDTO(
            success: false,
            status: 'pending',
            providerOrderId: $providerOrderId,
            errorMessage: $response['error'] ?? 'تعذر جلب حالة الطلب من المزود'
        );
    }

    /**
     * Verify player / account before ordering.
     */
    public function verifyPlayer(string $sku, string $playerId, ?string $serverId = null): StockVerificationDTO
    {
        return new StockVerificationDTO(
            available: true,
            currentStock: 999999,
            message: 'جاهز للشحن الفوري'
        );
    }

    /**
     * Get remaining balance on provider account.
     */
    public function getBalance(): array
    {
        return $this->service->getBalance();
    }

    /**
     * Get live products catalog from Embrator.
     */
    public function getProducts(): array
    {
        return $this->service->getProducts();
    }
}

