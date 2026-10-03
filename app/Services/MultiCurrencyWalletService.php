<?php

namespace App\Services;

use App\Enums\WalletTxType;
use App\Models\User;
use App\Models\Wallet;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;

class MultiCurrencyWalletService
{
    public function __construct(
        protected WalletService $walletService,
        protected ExchangeRateService $exchangeRateService
    ) {}

    /**
     * Get all wallet balances for a user across all supported currencies (EGP, USD, SAR).
     */
    public function getUserWallets(User $user): array
    {
        $currencies = ['EGP', 'USD', 'SAR'];
        $wallets = [];

        foreach ($currencies as $curr) {
            $wallet = $this->walletService->getOrCreateWallet($user, $curr);
            $wallets[] = [
                'currency' => $curr,
                'balance' => (float) $wallet->balance,
                'frozen_balance' => (float) $wallet->frozen_balance,
                'available_balance' => (float) max(0, $wallet->balance - $wallet->frozen_balance),
                'is_locked' => (bool) $wallet->is_locked,
            ];
        }

        return $wallets;
    }

    /**
     * Convert balance from one currency wallet to another.
     */
    public function convertCurrency(User $user, string $fromCurrency, string $toCurrency, float $amount): array
    {
        $from = strtoupper(trim($fromCurrency));
        $to = strtoupper(trim($toCurrency));

        if ($from === $to) {
            throw new InvalidArgumentException('لا يمكن التحويل لنفس العملة.');
        }

        $conversion = $this->exchangeRateService->calculateConversion($from, $to, $amount);
        $finalAmount = $conversion['final_amount'];

        return DB::transaction(function () use ($user, $from, $to, $amount, $finalAmount, $conversion) {
            // Debit from source wallet
            $debitTx = $this->walletService->debit(
                user: $user,
                amount: $amount,
                type: WalletTxType::ADMIN_ADJUSTMENT, // Or custom transfer/conversion type
                description: "تحويل رصيد من {$amount} {$from} إلى {$finalAmount} {$to} (سعر الصرف: {$conversion['rate']})",
                currency: $from,
                metadata: [
                    'action' => 'currency_conversion_out',
                    'to_currency' => $to,
                    'target_amount' => $finalAmount,
                    'exchange_rate' => $conversion['rate'],
                    'fee_amount' => $conversion['fee_amount'],
                ]
            );

            // Credit to destination wallet
            $creditTx = $this->walletService->credit(
                user: $user,
                amount: $finalAmount,
                type: WalletTxType::ADMIN_ADJUSTMENT,
                description: "استلام تحويل رصيد من {$from} بقيمة {$amount} {$from} بسعر صرف {$conversion['rate']}",
                currency: $to,
                metadata: [
                    'action' => 'currency_conversion_in',
                    'from_currency' => $from,
                    'source_amount' => $amount,
                    'exchange_rate' => $conversion['rate'],
                ]
            );

            return [
                'success' => true,
                'from_currency' => $from,
                'to_currency' => $to,
                'source_amount' => $amount,
                'received_amount' => $finalAmount,
                'exchange_rate' => $conversion['rate'],
                'fee_amount' => $conversion['fee_amount'],
                'source_transaction_id' => $debitTx->id,
                'destination_transaction_id' => $creditTx->id,
            ];
        });
    }
}
