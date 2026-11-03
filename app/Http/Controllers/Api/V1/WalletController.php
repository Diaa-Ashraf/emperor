<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\WalletResource;
use App\Http\Resources\WalletTransactionResource;
use App\Models\WalletTransaction;
use App\Services\ExchangeRateService;
use App\Services\MultiCurrencyWalletService;
use App\Services\WalletService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class WalletController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected WalletService $walletService,
        protected MultiCurrencyWalletService $multiCurrencyService,
        protected ExchangeRateService $exchangeRateService
    ) {}

    /**
     * Get user wallets balance summary (in primary currency and USD equivalent).
     */
    public function balance(Request $request): JsonResponse
    {
        $user = $request->user();
        $currency = $user->currency ?? 'EGP';
        $wallet = $this->walletService->getOrCreateWallet($user, $currency);

        $walletsSummary = $this->multiCurrencyService->getUserWallets($user);
        $usdBalance = 0.0;
        $activeRates = $this->exchangeRateService->getActiveRates();
        foreach ($walletsSummary as $walletSummary) {
            $walletCurrency = strtoupper((string) ($walletSummary['currency'] ?? 'USD'));
            $walletAmount = (float) ($walletSummary['available_balance'] ?? $walletSummary['balance'] ?? 0);
            if (in_array($walletCurrency, ['USD', 'USDT'], true)) {
                $usdBalance += $walletAmount;
                continue;
            }
            try {
                $usdBalance += (float) $this->exchangeRateService->calculateConversion($walletCurrency, 'USD', max($walletAmount, 0.000001))['final_amount'];
            } catch (\Throwable $e) {
                // Ignore wallet currencies that do not have an active conversion rate.
            }
        }
        $preferredBalance = 0.0;
        $preferredCurrency = strtoupper($currency);
        foreach ($walletsSummary as $walletSummary) {
            $walletCurrency = strtoupper((string) ($walletSummary['currency'] ?? 'USD'));
            if ($walletCurrency === $preferredCurrency) {
                $preferredBalance += (float) ($walletSummary['available_balance'] ?? 0);
                continue;
            }
            $walletAmount = (float) ($walletSummary['available_balance'] ?? 0);
            if ($walletAmount <= 0) continue;
            try {
                $preferredBalance += (float) $this->exchangeRateService->calculateConversion($walletCurrency, $preferredCurrency, $walletAmount)['final_amount'];
            } catch (\Throwable $e) {
                // Skip currencies without a configured rate.
            }
        }

        return $this->successResponse([
            'currency' => $currency,
            'balance' => (float) $wallet->balance,
            'frozen_balance' => (float) $wallet->frozen_balance,
            'available_balance' => (float) max(0, $wallet->balance - $wallet->frozen_balance),
            'is_locked' => (bool) $wallet->is_locked,
            'wallets' => $walletsSummary,
            'balance_usd' => round($usdBalance, 4),
            'preferred_balance' => round($preferredBalance, 4),
            'preferred_currency' => $preferredCurrency,
            'rates' => $activeRates->map(fn ($rate) => [
                'from_currency' => $rate->from_currency,
                'to_currency' => $rate->to_currency,
                'rate' => (float) $rate->rate,
                'is_active' => (bool) $rate->is_active,
            ])->values(),
        ], 'تم جلب رصيد المحفظة بنجاح');
    }

    /**
     * Get available exchange rates.
     */
    public function rates(): JsonResponse
    {
        $rates = $this->exchangeRateService->getActiveRates();
        return $this->successResponse($rates, 'تم جلب أسعار الصرف بنجاح');
    }

    /**
     * Preview currency conversion calculation.
     */
    public function previewConversion(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'from_currency' => 'required|string|size:3',
            'to_currency' => 'required|string|size:3|different:from_currency',
            'amount' => 'required|numeric|min:0.01',
        ], [
            'from_currency.required' => 'يرجى تحديد عملة المصدر',
            'to_currency.required' => 'يرجى تحديد العملة المحول إليها',
            'to_currency.different' => 'لا يمكن التحويل لنفس العملة',
            'amount.required' => 'يرجى تحديد المبلغ المراد تحويله',
            'amount.min' => 'المبلغ يجب أن يكون أكبر من 0',
        ]);

        try {
            $preview = $this->exchangeRateService->calculateConversion(
                fromCurrency: $validated['from_currency'],
                toCurrency: $validated['to_currency'],
                amount: (float) $validated['amount']
            );

            return $this->successResponse($preview, 'تم حساب التحويل بنجاح');
        } catch (\Throwable $e) {
            return $this->errorResponse($e->getMessage(), Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Convert currency within user's wallet.
     */
    public function convert(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'from_currency' => 'required|string|size:3',
            'to_currency' => 'required|string|size:3|different:from_currency',
            'amount' => 'required|numeric|min:0.01',
        ], [
            'from_currency.required' => 'يرجى تحديد عملة المصدر',
            'to_currency.required' => 'يرجى تحديد العملة المحول إليها',
            'to_currency.different' => 'لا يمكن التحويل لنفس العملة',
            'amount.required' => 'يرجى تحديد المبلغ المراد تحويله',
            'amount.min' => 'المبلغ يجب أن يكون أكبر من 0',
        ]);

        $user = $request->user();

        try {
            $result = $this->multiCurrencyService->convertCurrency(
                user: $user,
                fromCurrency: $validated['from_currency'],
                toCurrency: $validated['to_currency'],
                amount: (float) $validated['amount']
            );

            return $this->successResponse(
                $result,
                "تم تحويل {$validated['amount']} {$validated['from_currency']} إلى {$validated['to_currency']} بنجاح!"
            );
        } catch (\Throwable $e) {
            return $this->errorResponse($e->getMessage(), Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Get paginated wallet transactions with type filter.
     */
    public function transactions(Request $request): JsonResponse
    {
        $user = $request->user();

        $query = WalletTransaction::query()
            ->where('user_id', $user->id)
            ->select([
                'id', 'wallet_id', 'user_id', 'type', 'amount',
                'balance_before', 'balance_after', 'fee',
                'reference_type', 'reference_id', 'description', 'created_at'
            ]);

        if ($type = $request->input('type')) {
            $query->where('type', $type);
        }

        $transactions = $query->latest('id')->paginate(20);
        $transactions->through(fn($item) => new WalletTransactionResource($item));

        return $this->paginatedResponse($transactions, 'تم جلب سجل العمليات بنجاح');
    }
}
