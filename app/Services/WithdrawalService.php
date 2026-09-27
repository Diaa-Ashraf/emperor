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
        protected WalletService $walletService
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
    }
}
