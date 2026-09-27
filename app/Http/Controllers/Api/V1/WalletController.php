<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\WalletResource;
use App\Http\Resources\WalletTransactionResource;
use App\Models\WalletTransaction;
use App\Services\WalletService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WalletController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected WalletService $walletService
    ) {}

    /**
     * Get user wallets balance summary (in primary currency and USD equivalent).
     */
    public function balance(Request $request): JsonResponse
    {
        $user = $request->user();
        $currency = $user->currency ?? 'EGP';
        $wallet = $this->walletService->getOrCreateWallet($user, $currency);

        // Approximate USD rate for conversion display
        $exchangeRatesToUsd = [
            'EGP' => 1 / 50.0, // 50 EGP = 1 USD
            'SAR' => 1 / 3.75, // 3.75 SAR = 1 USD
            'SYP' => 1 / 14000.0,
            'USD' => 1.0,
        ];

        $rate = $exchangeRatesToUsd[$currency] ?? 1.0;
        $balanceUsd = round((float) $wallet->balance * $rate, 2);

        return $this->successResponse([
            'currency' => $currency,
            'balance' => (float) $wallet->balance,
            'balance_usd' => $balanceUsd,
            'frozen_balance' => (float) $wallet->frozen_balance,
            'available_balance' => (float) $wallet->available_balance,
            'is_locked' => (bool) $wallet->is_locked,
            'wallets' => WalletResource::collection($user->wallets),
        ], 'تم جلب رصيد المحفظة بنجاح');
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
