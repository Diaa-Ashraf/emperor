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

        return $this->successResponse([
            'currency' => $currency,
            'balance' => (float) $wallet->balance,
            'frozen_balance' => (float) $wallet->frozen_balance,
            'available_balance' => (float) max(0, $wallet->balance - $wallet->frozen_balance),
            'is_locked' => (bool) $wallet->is_locked,
            'wallets' => $walletsSummary,
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
