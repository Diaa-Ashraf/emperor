<?php

namespace App\Services;

use App\Enums\WalletTxType;
use App\Enums\WithdrawalStatus;
use App\Models\PaymentMethod;
use App\Models\User;
use App\Models\WithdrawalRequest;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;

class WithdrawalService
{
    public function __construct(
        protected WalletService $walletService,
        protected ?NotificationService $notificationService = null
    ) {}

    /**
     * Submit a withdrawal request and freeze balance.
     */
    public function submitWithdrawal(
        User $user,
        PaymentMethod $method,
        float $amount,
        string $recipientAccount
    ): WithdrawalRequest {
        if ($amount < $method->min_amount || $amount > $method->max_amount) {
            throw new InvalidArgumentException("المبلغ يجب أن يكون بين {$method->min_amount} و {$method->max_amount} {$method->currency}");
        }

        $fee = $method->calculateFee($amount);
        $finalAmount = $amount - $fee;

        return DB::transaction(function () use ($user, $method, $amount, $fee, $finalAmount, $recipientAccount) {
            // Debit from wallet upon requesting
            $this->walletService->debit(
                user: $user,
                amount: $amount,
                type: WalletTxType::TRANSFER_OUT,
                description: "طلب سحب رصيد عبر {$method->name}",
                currency: $method->currency
            );

            return WithdrawalRequest::create([
                'user_id' => $user->id,
                'payment_method_id' => $method->id,
                'amount' => $amount,
                'fee' => $fee,
                'final_amount' => $finalAmount,
                'currency' => $method->currency,
                'recipient_account' => $recipientAccount,
                'status' => WithdrawalStatus::PENDING,
            ]);
        });
    }

    /**
     * Complete withdrawal after sending money to user.
     */
    public function complete(
        WithdrawalRequest $request,
        User $reviewer,
        ?string $proofImage = null,
        ?string $reference = null,
        ?string $notes = null
    ): void {
        $request->update([
            'status' => WithdrawalStatus::COMPLETED,
            'reviewer_id' => $reviewer->id,
            'payout_proof_image' => $proofImage,
            'payout_reference' => $reference,
            'reviewer_notes' => $notes,
            'reviewed_at' => now(),
        ]);

        if ($this->notificationService && $request->user) {
            try {
                $this->notificationService->notify(
                    $request->user,
                    new \App\DTOs\NotificationPayloadDTO(
                        title: '🎉 تم تحويل مستحقات سحب الرصيد بنجاح!',
                        body: "تم تنفيذ طلب السحب #{$request->id} بنجاح وتحويل صافي مبلغ {$request->final_amount} {$request->currency} إلى حسابك ({$request->recipient_account}).",
                        type: 'withdrawal_completed',
                        link: '/targets',
                        data: ['withdrawal_id' => $request->id, 'amount' => (float) $request->final_amount]
                    )
                );
            } catch (\Throwable $e) {
                \Illuminate\Support\Facades\Log::error("Failed sending withdrawal completed notification: " . $e->getMessage());
            }
        }
    }

    /**
     * Reject withdrawal and refund money back to wallet.
     */
    public function reject(WithdrawalRequest $request, User $reviewer, string $reason): void
    {
        DB::transaction(function () use ($request, $reviewer, $reason) {
            if ($request->status === WithdrawalStatus::REJECTED) {
                return;
            }

            $request->update([
                'status' => WithdrawalStatus::REJECTED,
                'reviewer_id' => $reviewer->id,
                'reviewer_notes' => $reason,
                'reviewed_at' => now(),
            ]);

            $this->walletService->credit(
                user: $request->user,
                amount: (float) $request->amount,
                type: WalletTxType::REFUND,
                description: "استرجاع مبلغ سحب مرفوض (طلب #{$request->id})",
                currency: $request->currency,
                referenceType: WithdrawalRequest::class,
                referenceId: $request->id
            );
        });

        if ($this->notificationService && $request->user) {
            try {
                $this->notificationService->notify(
                    $request->user,
                    new \App\DTOs\NotificationPayloadDTO(
                        title: '⚠️ تم رفض طلب سحب الرصيد',
                        body: "تم رفض طلب سحب الرصيد #{$request->id} (السبب: {$reason}). وتم إرجاع كامل المبلغ ({$request->amount} {$request->currency}) إلى محفظتك.",
                        type: 'withdrawal_rejected',
                        link: '/targets',
                        data: ['withdrawal_id' => $request->id, 'reason' => $reason]
                    )
                );
            } catch (\Throwable $e) {
                \Illuminate\Support\Facades\Log::error("Failed sending withdrawal rejected notification: " . $e->getMessage());
            }
        }
    }
}
