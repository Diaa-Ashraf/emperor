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

        $tierUserPrice = $this->pricingService->getPriceForUser($tier, $user);

        // Detect if tier represents a package of coins (e.g. "7,000 كوينز" or "1,000 كوينز")
        $coinsInTier = 1;
        if (!empty($tier->name)) {
            $cleaned = str_replace(',', '', (string) $tier->name);
            if (preg_match('/(\d+)/', $cleaned, $matches)) {
                $num = (int) $matches[1];
                if ($num > 1) {
                    $coinsInTier = $num;
                }
            }
        }

        $isVoiceApp = ($product->category?->type === \App\Enums\CategoryType::VOICE_APPS)
            || ($product->category?->slug === 'apps')
            || ($dto->quantity >= 500 && $coinsInTier > 1);

        if ($isVoiceApp && $coinsInTier > 1) {
            $coinRate = $tierUserPrice / $coinsInTier;
            $coinCost = ((float) $tier->source_cost) / $coinsInTier;

            $totalAmount = round($coinRate * $dto->quantity, 2);
            $costAmount = round($coinCost * $dto->quantity, 2);
            $unitPrice = round($coinRate, 6);
        } else {
            $unitPrice = $tierUserPrice;
            $totalAmount = round($unitPrice * $dto->quantity, 2);
            $costAmount = round(((float) $tier->source_cost) * $dto->quantity, 2);
        }

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

            // 4. In-App Notification for User
            try {
                $user->notifications()->create([
                    'id' => (string) \Illuminate\Support\Str::uuid(),
                    'type' => 'order_created',
                    'data' => json_encode([
                        'title' => 'تم إنشاء طلب الشحن بنجاح',
                        'body' => "طلبك رقم {$order->public_id} ({$product->name} - {$tier->name}) قيد المعالجة الآن.",
                        'link' => "/orders/{$order->id}",
                        'order_id' => $order->id,
                    ]),
                ]);
            } catch (\Throwable $e) {}

            // 5. In-App Notification for Admins
            try {
                $admins = User::where('role', \App\Enums\UserRole::ADMIN)->orWhere('role', 'admin')->get();
                foreach ($admins as $admin) {
                    $admin->notifications()->create([
                        'id' => (string) \Illuminate\Support\Str::uuid(),
                        'type' => 'admin_new_order_alert',
                        'data' => json_encode([
                            'title' => 'طلب شحن جديد',
                            'body' => "طلب جديد {$order->public_id} من {$user->name} بقيمة {$order->total_amount} {$order->currency}",
                            'link' => "/admin/orders/{$order->id}",
                            'order_id' => $order->id,
                        ]),
                    ]);
                }
            } catch (\Throwable $e) {}

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
