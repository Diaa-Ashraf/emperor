<?php

namespace App\Services;

use App\DTOs\TargetQuoteDTO;
use App\Enums\TargetOrderStatus;
use App\Enums\TargetVerificationMethod;
use App\Enums\WalletTxType;
use App\Models\Product;
use App\Models\Setting;
use App\Models\TargetRate;
use App\Models\TargetSellOrder;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TargetSellService
{
    public function __construct(
        protected WalletService $walletService,
        protected TrustLevelService $trustLevelService,
        protected OcrVerificationService $ocrService
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
     * Generate unique verification code (e.g. EMP-7K9A).
     */
    public function generateVerificationCode(): string
    {
        do {
            $code = 'EMP-' . strtoupper(Str::random(4));
        } while (TargetSellOrder::where('verification_code', $code)->exists());

        return $code;
    }

    /**
     * Submit a target sell order with intelligent auto-verification.
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
        $verificationCode = $this->generateVerificationCode();

        $order = TargetSellOrder::create([
            'user_id' => $user->id,
            'product_id' => $product->id,
            'verification_code' => $verificationCode,
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
            'auto_verified' => false,
            'verification_method' => TargetVerificationMethod::MANUAL->value,
        ]);

        // Attempt Auto-Verification
        $this->attemptAutoVerification($order, $user, $proofImage);

        return $order->fresh();
    }

    /**
     * Attempt automatic verification via Trust Level or OCR.
     */
    protected function attemptAutoVerification(TargetSellOrder $order, User $user, ?string $proofImage): void
    {
        // 1. Trust Level Instant Approval
        if ($this->trustLevelService->canAutoApproveByTrust($user, (float) $order->net_payout)) {
            $this->executeAutoApproval(
                order: $order,
                method: TargetVerificationMethod::TRUST_LEVEL,
                notes: 'تمت الموافقة الفورية بناءً على مستوى ثقة المستخدم (' . ($user->trust_level?->label() ?? 'موثوق') . ')'
            );
            return;
        }

        // 2. OCR Verification from Proof Screenshot
        if ($proofImage) {
            $ocrResult = $this->ocrService->verifyProofImage(
                relativeImagePath: $proofImage,
                verificationCode: $order->verification_code,
                targetPoints: $order->target_points
            );

            $order->update([
                'ocr_result' => $ocrResult,
                'ocr_confidence' => $ocrResult['confidence'] ?? 0,
            ]);

            if ($ocrResult['success'] === true) {
                $this->executeAutoApproval(
                    order: $order,
                    method: TargetVerificationMethod::OCR,
                    notes: "تم التحقق التلقائي وقراءة كود التحويل ({$order->verification_code}) بنجاح بدقة {$ocrResult['confidence']}%"
                );
                return;
            } else {
                $order->update([
                    'status' => TargetOrderStatus::IN_REVIEW,
                ]);
            }
        }
    }

    /**
     * Execute auto approval, credit wallet, and update trust stats.
     */
    protected function executeAutoApproval(
        TargetSellOrder $order,
        TargetVerificationMethod $method,
        string $notes
    ): void {
        DB::transaction(function () use ($order, $method, $notes) {
            $order->update([
                'status' => TargetOrderStatus::PAID,
                'auto_verified' => true,
                'verification_method' => $method->value,
                'reviewer_notes' => $notes,
                'reviewed_at' => now(),
            ]);

            $this->walletService->credit(
                user: $order->user,
                amount: (float) $order->net_payout,
                type: WalletTxType::TARGET_PAYOUT,
                description: "مستحقات بيع تارجت تلقائية للطلب {$order->public_id} ({$order->product->name})",
                currency: $order->currency,
                referenceType: TargetSellOrder::class,
                referenceId: $order->id
            );

            $this->trustLevelService->recordSuccessfulOrder($order->user);
        });

        event(new \App\Events\TargetOrderPaid($order));
    }

    /**
     * Approve and pay target sell order manually by admin.
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

            $this->trustLevelService->recordSuccessfulOrder($order->user);
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

        $this->trustLevelService->recordRejectedOrder($order->user);

        event(new \App\Events\TargetOrderRejected($order, $reason));
    }
}
