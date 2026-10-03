<?php

namespace App\Services;

use App\Enums\DepositStatus;
use App\Enums\WalletTxType;
use App\Events\DepositApproved;
use App\Events\DepositRejected;
use App\Models\DepositRequest;
use App\Models\PaymentMethod;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;

class DepositService
{
    public function __construct(
        protected WalletService $walletService
    ) {}

    /**
     * Submit a new deposit request.
     */
    public function submitDeposit(
        User $user,
        PaymentMethod $method,
        float $amount,
        ?string $senderAccount = null,
        ?string $transactionReference = null,
        ?string $proofImage = null
    ): DepositRequest {
        if ($amount < $method->min_amount || $amount > $method->max_amount) {
            throw new InvalidArgumentException("المبلغ يجب أن يكون بين {$method->min_amount} و {$method->max_amount} {$method->currency}");
        }

        $fee = $method->calculateFee($amount);
        $finalAmount = $amount - $fee;

        $deposit = DepositRequest::create([
            'user_id' => $user->id,
            'payment_method_id' => $method->id,
            'amount' => $amount,
            'fee' => $fee,
            'final_amount' => $finalAmount,
            'currency' => $method->currency,
            'sender_account' => $senderAccount,
            'transaction_reference' => $transactionReference,
            'proof_image' => $proofImage,
            'status' => DepositStatus::PENDING,
        ]);

        // 1. Create in-app notification for User
        try {
            $user->notifications()->create([
                'id' => (string) \Illuminate\Support\Str::uuid(),
                'type' => 'deposit_submitted',
                'data' => json_encode([
                    'title' => 'تم استلام طلب شحن الرصيد',
                    'body' => "طلب إيداع رقم #{$deposit->id} بمبلغ {$amount} {$method->currency} قيد المراجعة.",
                    'link' => "/deposits/{$deposit->id}",
                    'deposit_id' => $deposit->id,
                ]),
            ]);
        } catch (\Throwable $e) {
            // Ignore notification errors
        }

        // 2. Create in-app notification for Admins
        try {
            $admins = User::where('role', \App\Enums\UserRole::ADMIN)
                ->orWhere('role', 'admin')
                ->get();

            foreach ($admins as $admin) {
                $admin->notifications()->create([
                    'id' => (string) \Illuminate\Support\Str::uuid(),
                    'type' => 'admin_deposit_alert',
                    'data' => json_encode([
                        'title' => 'طلب إيداع جديد يحتاج مراجعة',
                        'body' => "طلب إيداع #{$deposit->id} من {$user->name} بمبلغ {$amount} {$method->currency} عبر {$method->name}",
                        'link' => "/admin/deposits/{$deposit->id}",
                        'deposit_id' => $deposit->id,
                    ]),
                ]);
            }
        } catch (\Throwable $e) {
            // Ignore notification errors
        }

        return $deposit;
    }

    /**
     * Approve a deposit request and credit user wallet.
     */
    public function approve(DepositRequest $request, User $reviewer, ?string $notes = null): void
    {
        DB::transaction(function () use ($request, $reviewer, $notes) {
            if ($request->status === DepositStatus::APPROVED) {
                return;
            }

            $request->update([
                'status' => DepositStatus::APPROVED,
                'reviewer_id' => $reviewer->id,
                'reviewer_notes' => $notes,
                'reviewed_at' => now(),
            ]);

            $this->walletService->credit(
                user: $request->user,
                amount: (float) $request->final_amount,
                type: WalletTxType::DEPOSIT,
                description: "إيداع رصيد عبر {$request->paymentMethod->name} (طلب #{$request->id})",
                currency: $request->currency,
                referenceType: DepositRequest::class,
                referenceId: $request->id
            );
        });

        event(new DepositApproved($request));
    }

    /**
     * Reject a deposit request.
     */
    public function reject(DepositRequest $request, User $reviewer, string $reason): void
    {
        $request->update([
            'status' => DepositStatus::REJECTED,
            'reviewer_id' => $reviewer->id,
            'reviewer_notes' => $reason,
            'reviewed_at' => now(),
        ]);

        event(new DepositRejected($request));
    }
}
