<?php

namespace App\Services;

use App\DTOs\OrderRequestDTO;
use App\Enums\OrderStatus;
use App\Enums\ProductType;
use App\Enums\WalletTxType;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductTier;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;

class OrderService
{
    public function __construct(
        protected WalletService $walletService,
        protected PricingService $pricingService,
        protected ProviderManagerService $providerManager,
    ) {}

    /**
     * Create and process an order from request DTO.
     */
    public function createOrder(OrderRequestDTO $dto, User $user): Order
    {
        $product = Product::findOrFail($dto->productId);
        $tier = ProductTier::findOrFail($dto->productTierId);

        if (!$tier->is_active || !$product->is_active) {
            throw new InvalidArgumentException('هذا المنتج غير متاح حالياً للطلب.');
        }

        $unitPrice = $this->pricingService->getPriceForUser($tier, $user);
        $totalAmount = $unitPrice * $dto->quantity;
        $costAmount = ((float) $tier->source_cost) * $dto->quantity;
        $profitAmount = $totalAmount - $costAmount;

        return DB::transaction(function () use ($dto, $user, $product, $tier, $unitPrice, $totalAmount, $costAmount, $profitAmount) {
            // 1. Create order in PENDING status
            $order = Order::create([
                'user_id' => $user->id,
                'product_id' => $product->id,
                'product_tier_id' => $tier->id,
                'provider_id' => null,
                'quantity' => $dto->quantity,
                'unit_price' => $unitPrice,
                'total_amount' => $totalAmount,
                'currency' => $user->currency ?? 'EGP',
                'cost_amount' => $costAmount,
                'profit_amount' => $profitAmount,
                'player_id' => $dto->playerId,
                'server_id' => $dto->serverId,
                'account_region' => $dto->accountRegion,
                'extra_fields' => $dto->extraFields,
                'status' => OrderStatus::PENDING,
                'channel' => $dto->channel,
            ]);

            // 2. Debit wallet
            $this->walletService->debit(
                user: $user,
                amount: $totalAmount,
                type: WalletTxType::ORDER_PAYMENT,
                description: "دفع قيمة الطلب {$order->public_id} ({$product->name} - {$tier->name})",
                currency: $user->currency ?? 'EGP',
                referenceType: Order::class,
                referenceId: $order->id,
                idempotencyKey: $dto->idempotencyKey
            );

            // 3. Mark processing
            $order->update(['status' => OrderStatus::PROCESSING]);

            return $order;
        });
    }

    /**
     * Refund an order if fulfillment failed.
     */
    public function refundOrder(Order $order, string $reason = 'فشل في تنفيذ الطلب من المزود'): void
    {
        DB::transaction(function () use ($order, $reason) {
            if ($order->status === OrderStatus::REFUNDED) {
                return;
            }

            $order->update([
                'status' => OrderStatus::REFUNDED,
                'failure_reason' => $reason,
            ]);

            $this->walletService->credit(
                user: $order->user,
                amount: (float) $order->total_amount,
                type: WalletTxType::REFUND,
                description: "استرجاع رصيد الطلب الملغي {$order->public_id}",
                currency: $order->currency,
                referenceType: Order::class,
                referenceId: $order->id
            );
        });

        event(new \App\Events\OrderFailed($order, $reason));
    }
}
