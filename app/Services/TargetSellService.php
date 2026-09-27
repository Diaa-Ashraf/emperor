<?php

namespace App\Services;

use App\DTOs\TargetQuoteDTO;
use App\Enums\TargetOrderStatus;
use App\Enums\WalletTxType;
use App\Models\Product;
use App\Models\Setting;
use App\Models\TargetRate;
use App\Models\TargetSellOrder;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;

class TargetSellService
{
    public function __construct(
        protected WalletService $walletService
    ) {}

    /**
     * Calculate quote for selling target points.
     */
    public function calculateQuote(Product $product, int $points): TargetQuoteDTO
    {
        $rateRecord = TargetRate::where('product_id', $product->id)
            ->where('is_active', true)
            ->where('min_points', '<=', $points)
            ->where('max_points', '>=', $points)
            ->first();

        if (!$rateRecord) {
            // Default rate fallback
            $rate = 0.05; // 0.05 EGP per unit
        } else {
            $rate = (float) $rateRecord->rate_per_point;
        }

        $grossAmount = round($points * $rate, 2);
        $fee = 0.00;
        $netPayout = $grossAmount - $fee;

        $agencyId = Setting::get('target_agency_id', config('emperor.target_selling.agency_id', 'EMP-TARGET-001'));

        return new TargetQuoteDTO(
            productId: $product->id,
            points: $points,
            ratePerPoint: $rate,
            grossAmount: $grossAmount,
            fee: $fee,
            netPayout: $netPayout,
            currency: 'EGP',
            agencyId: $agencyId
        );
    }

    /**
     * Submit a target sell order.
     */
    public function submitOrder(
        User $user,
        Product $product,
        string $appUserId,
        ?string $appUsername,
        int $points,
        ?string $proofImage = null,
        ?string $userNotes = null
    ): TargetSellOrder {
        $quote = $this->calculateQuote($product, $points);

        return TargetSellOrder::create([
            'user_id' => $user->id,
            'product_id' => $product->id,
            'app_user_id' => $appUserId,
            'app_username' => $appUsername,
            'agency_id' => $quote->agencyId,
            'target_points' => $points,
            'rate_per_point' => $quote->ratePerPoint,
            'gross_amount' => $quote->grossAmount,
            'fee' => $quote->fee,
            'net_payout' => $quote->netPayout,
            'currency' => $quote->currency,
            'payout_method' => 'wallet',
            'proof_image' => $proofImage,
            'user_notes' => $userNotes,
            'status' => TargetOrderStatus::PENDING,
        ]);
    }

    /**
     * Approve and pay target sell order to user's wallet.
     */
    public function approveAndPay(TargetSellOrder $order, User $reviewer, ?string $notes = null): void
    {
        DB::transaction(function () use ($order, $reviewer, $notes) {
            if ($order->status === TargetOrderStatus::PAID) {
                return;
            }

            $order->update([
                'status' => TargetOrderStatus::PAID,
                'reviewer_id' => $reviewer->id,
                'reviewer_notes' => $notes,
                'reviewed_at' => now(),
            ]);

            $this->walletService->credit(
                user: $order->user,
                amount: (float) $order->net_payout,
                type: WalletTxType::TARGET_PAYOUT,
                description: "مستحقات بيع تارجت للطلب {$order->public_id} ({$order->product->name})",
                currency: $order->currency,
                referenceType: TargetSellOrder::class,
                referenceId: $order->id
            );
        });

        event(new \App\Events\TargetOrderPaid($order));
    }

    /**
     * Reject target sell order.
     */
    public function reject(TargetSellOrder $order, User $reviewer, string $reason): void
    {
        $order->update([
            'status' => TargetOrderStatus::REJECTED,
            'reviewer_id' => $reviewer->id,
            'reviewer_notes' => $reason,
            'reviewed_at' => now(),
        ]);

        event(new \App\Events\TargetOrderRejected($order, $reason));
    }
}
