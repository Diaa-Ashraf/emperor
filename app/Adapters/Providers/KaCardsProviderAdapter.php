<?php

namespace App\Adapters\Providers;

use App\Contracts\ProviderAdapter;
use App\DTOs\OrderRequestDTO;
use App\DTOs\ProviderOrderResultDTO;
use App\DTOs\StockVerificationDTO;
use App\Services\KaCardsService;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class KaCardsProviderAdapter implements ProviderAdapter
{
    protected KaCardsService $service;

    public function __construct(
        protected array $config = []
    ) {
        $this->service = new KaCardsService($this->config);
    }

    /**
     * Submit an order to KA-Cards for fulfillment.
     */
    public function executeOrder(OrderRequestDTO $orderDto): ProviderOrderResultDTO
    {
        $productId = (int) ($orderDto->productTierId ?: $orderDto->productId);
        $orderUuid = 'EMP-' . Str::uuid()->toString();

        $params = [];
        if (!empty($orderDto->playerId)) {
            $params['player_id'] = $orderDto->playerId;
        }
        if (!empty($orderDto->serverId)) {
            $params['server_id'] = $orderDto->serverId;
        }
        if (!empty($orderDto->accountRegion)) {
            $params['region'] = $orderDto->accountRegion;
        }

        $result = $this->service->createOrder(
            productId: $productId,
            qty: $orderDto->quantity ?: 1,
            orderUuid: $orderUuid,
            params: $params
        );

        if ($result['successful'] && isset($result['data']['order_id'])) {
            $orderData = $result['data'];
            $status = match ($orderData['status'] ?? '') {
                'accept', 'completed' => 'completed',
                'wait', 'pending' => 'pending',
                default => 'processing',
            };

            $rawVoucher = $orderData['replay_api'] ?? null;
            $voucherCodes = is_string($rawVoucher) ? [$rawVoucher] : (is_array($rawVoucher) ? $rawVoucher : null);

            return new ProviderOrderResultDTO(
                success: true,
                status: $status,
                providerOrderId: $orderData['order_id'],
                voucherCodes: $voucherCodes,
                errorMessage: null,
                rawResponse: $result['raw'],
                costAmount: (float) ($orderData['price'] ?? 0.0)
            );
        }

        Log::warning('KA-Cards fulfillment failed', ['result' => $result]);

        return new ProviderOrderResultDTO(
            success: false,
            status: 'failed',
            providerOrderId: null,
            voucherCodes: null,
            errorMessage: $result['message'] ?? 'فشل تنفيذ الطلب عبر مزود كروت KA-Cards',
            rawResponse: $result['raw'] ?? [],
            costAmount: 0.0
        );
    }

    /**
     * Check order status from KA-Cards.
     */
    public function checkOrderStatus(string $providerOrderId): ProviderOrderResultDTO
    {
        $orders = $this->service->checkOrders([$providerOrderId]);
        $order = !empty($orders) ? $orders[0] : null;

        if (!$order) {
            return new ProviderOrderResultDTO(
                success: false,
                status: 'pending',
                providerOrderId: $providerOrderId,
                errorMessage: 'تعذر التحقق من حالة الطلب حالياً'
            );
        }

        $status = match ($order['status'] ?? '') {
            'accept', 'completed' => 'completed',
            'wait', 'pending' => 'pending',
            'reject', 'failed' => 'failed',
            default => 'processing',
        };

        $rawVoucher = $order['replay_api'] ?? null;
        $voucherCodes = is_string($rawVoucher) ? [$rawVoucher] : (is_array($rawVoucher) ? $rawVoucher : null);

        return new ProviderOrderResultDTO(
            success: $status === 'completed',
            status: $status,
            providerOrderId: $order['order_id'] ?? $providerOrderId,
            voucherCodes: $voucherCodes,
            errorMessage: $status === 'failed' ? 'تم رفض أو إلغاء الطلب من المزود' : null,
            rawResponse: $order,
            costAmount: (float) ($order['price'] ?? 0.0)
        );
    }

    /**
     * Verify player ID before ordering (if supported).
     */
    public function verifyPlayer(string $sku, string $playerId, ?string $serverId = null): StockVerificationDTO
    {
        return new StockVerificationDTO(
            valid: true,
            playerName: 'Player_' . $playerId
        );
    }

    /**
     * Get remaining balance on provider account.
     */
    public function getBalance(): array
    {
        return [
            'balance' => 0.00,
            'currency' => 'USD',
        ];
    }
}
