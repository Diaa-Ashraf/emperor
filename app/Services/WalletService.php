<?php

namespace App\Services;

use App\Enums\WalletTxType;
use App\Models\User;
use App\Models\Wallet;
use App\Models\WalletTransaction;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;

class WalletService
{
    /**
     * Get or create a wallet for a user in a specific currency.
     */
    public function getOrCreateWallet(User $user, string $currency = 'EGP'): Wallet
    {
        return Wallet::firstOrCreate(
            ['user_id' => $user->id, 'currency' => $currency],
            ['balance' => 0.0000, 'frozen_balance' => 0.0000, 'is_locked' => false]
        );
    }

    /**
     * Credit funds to a user's wallet with row locking and ledger entry.
     */
    public function credit(
        User $user,
        float $amount,
        WalletTxType $type,
        string $description,
        string $currency = 'EGP',
        ?string $referenceType = null,
        ?int $referenceId = null,
        ?string $idempotencyKey = null,
        array $metadata = []
    ): WalletTransaction {
        if ($amount <= 0) {
            throw new InvalidArgumentException('Credit amount must be greater than zero.');
        }

        return DB::transaction(function () use ($user, $amount, $type, $description, $currency, $referenceType, $referenceId, $idempotencyKey, $metadata) {
            // Check idempotency if key provided
            if ($idempotencyKey) {
                $existing = WalletTransaction::where('idempotency_key', $idempotencyKey)->first();
                if ($existing) {
                    return $existing;
                }
            }

            $wallet = Wallet::where('user_id', $user->id)
                ->where('currency', $currency)
                ->lockForUpdate()
                ->first();

            if (!$wallet) {
                $wallet = Wallet::create([
                    'user_id' => $user->id,
                    'currency' => $currency,
                    'balance' => 0.0000,
                    'frozen_balance' => 0.0000,
                    'is_locked' => false,
                ]);
            }

            if ($wallet->is_locked) {
                throw new \RuntimeException('المحفظة مغلقة مؤقتاً، يرجى التواصل مع الدعم الفني.');
            }

            $balanceBefore = (float) $wallet->balance;
            $balanceAfter = $balanceBefore + $amount;

            $wallet->update(['balance' => $balanceAfter]);

            return WalletTransaction::create([
                'wallet_id' => $wallet->id,
                'user_id' => $user->id,
                'type' => $type,
                'amount' => $amount,
                'balance_before' => $balanceBefore,
                'balance_after' => $balanceAfter,
                'fee' => 0.0000,
                'reference_type' => $referenceType,
                'reference_id' => $referenceId,
                'idempotency_key' => $idempotencyKey,
                'description' => $description,
                'metadata' => $metadata,
                'created_at' => now(),
            ]);
        });
    }

    /**
     * Debit funds from a user's wallet with row locking and ledger entry.
     */
    public function debit(
        User $user,
        float $amount,
        WalletTxType $type,
        string $description,
        string $currency = 'EGP',
        ?string $referenceType = null,
        ?int $referenceId = null,
        ?string $idempotencyKey = null,
        array $metadata = []
    ): WalletTransaction {
        if ($amount <= 0) {
            throw new InvalidArgumentException('Debit amount must be greater than zero.');
        }

        return DB::transaction(function () use ($user, $amount, $type, $description, $currency, $referenceType, $referenceId, $idempotencyKey, $metadata) {
            if ($idempotencyKey) {
                $existing = WalletTransaction::where('idempotency_key', $idempotencyKey)->first();
                if ($existing) {
                    return $existing;
                }
            }

            $wallet = Wallet::where('user_id', $user->id)
                ->where('currency', $currency)
                ->lockForUpdate()
                ->first();

            if (!$wallet) {
                throw new \RuntimeException('المحفظة غير موجودة.');
            }

            if ($wallet->is_locked) {
                throw new \RuntimeException('المحفظة مغلقة مؤقتاً، يرجى التواصل مع الدعم الفني.');
            }

            $availableBalance = (float) ($wallet->balance - $wallet->frozen_balance);
            if ($availableBalance < $amount) {
                throw new \RuntimeException('رصيد المحفظة غير كافٍ لإتمام العملية.');
            }

            $balanceBefore = (float) $wallet->balance;
            $balanceAfter = $balanceBefore - $amount;

            $wallet->update(['balance' => $balanceAfter]);

            return WalletTransaction::create([
                'wallet_id' => $wallet->id,
                'user_id' => $user->id,
                'type' => $type,
                'amount' => -$amount,
                'balance_before' => $balanceBefore,
                'balance_after' => $balanceAfter,
                'fee' => 0.0000,
                'reference_type' => $referenceType,
                'reference_id' => $referenceId,
                'idempotency_key' => $idempotencyKey,
                'description' => $description,
                'metadata' => $metadata,
                'created_at' => now(),
            ]);
        });
    }

    /**
     * Transfer funds between two users.
     */
    public function transfer(User $sender, User $recipient, float $amount, string $currency = 'EGP'): void
    {
        DB::transaction(function () use ($sender, $recipient, $amount, $currency) {
            $this->debit(
                user: $sender,
                amount: $amount,
                type: WalletTxType::TRANSFER_OUT,
                description: "تحويل رصيد إلى المستخدم {$recipient->name} (#{$recipient->id})",
                currency: $currency,
                referenceType: User::class,
                referenceId: $recipient->id
            );

            $this->credit(
                user: $recipient,
                amount: $amount,
                type: WalletTxType::TRANSFER_IN,
                description: "تحويل رصيد وارد من المستخدم {$sender->name} (#{$sender->id})",
                currency: $currency,
                referenceType: User::class,
                referenceId: $sender->id
            );
        });
    }
}
