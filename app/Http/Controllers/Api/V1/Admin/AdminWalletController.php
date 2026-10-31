<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Enums\OrderStatus;
use App\Enums\WalletTxType;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Setting;
use App\Models\User;
use App\Models\Wallet;
use App\Models\WalletTransaction;
use App\Services\WalletService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class AdminWalletController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected WalletService $walletService
    ) {}

    /**
     * Get admin wallet summary, balances across all supported currencies, customer liabilities, and profit in period.
     */
    public function summary(Request $request): JsonResponse
    {
        $adminUser = $request->user() ?: User::where('role', 'admin')->first();
        if (!$adminUser) {
            $adminUser = User::first();
        }

        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        $queryFrom = $startDate ? Carbon::parse($startDate)->startOfDay() : Carbon::now()->subDays(30)->startOfDay();
        $queryTo = $endDate ? Carbon::parse($endDate)->endOfDay() : Carbon::now()->endOfDay();

        // ═══ Targeted User Wallet View (Matching User Wallet History Screenshots) ═══
        if ($request->filled('user_id')) {
            $targetUser = User::find($request->input('user_id'));
            if ($targetUser) {
                $targetCurrency = $targetUser->currency ?: 'EGP';
                $targetWallet = $this->walletService->getOrCreateWallet($targetUser, $targetCurrency);
                $totalMovements = WalletTransaction::where('user_id', $targetUser->id)->count();

                $totalCredits = (float) WalletTransaction::where('user_id', $targetUser->id)
                    ->where('amount', '>', 0)
                    ->sum('amount');

                $lastCredit = WalletTransaction::where('user_id', $targetUser->id)
                    ->where('amount', '>', 0)
                    ->latest('id')
                    ->first(['id', 'amount', 'description', 'created_at']);

                $lastDebit = WalletTransaction::where('user_id', $targetUser->id)
                    ->where('amount', '<', 0)
                    ->latest('id')
                    ->first(['id', 'amount', 'description', 'created_at']);

                return $this->successResponse([
                    'is_user_view' => true,
                    'user' => [
                        'id' => $targetUser->id,
                        'name' => $targetUser->name,
                        'email' => $targetUser->email,
                        'currency' => $targetCurrency,
                    ],
                    'user_stats' => [
                        'current_balance' => (float) $targetWallet->balance,
                        'currency' => $targetCurrency,
                        'movements_count' => $totalMovements,
                        'total_credits' => $totalCredits,
                        'last_credit' => $lastCredit,
                        'last_debit' => $lastDebit,
                    ],
                    'period' => [
                        'start_date' => $queryFrom->toDateString(),
                        'end_date' => $queryTo->toDateString(),
                        'transactions_count' => $totalMovements,
                    ],
                ], 'تم جلب سجل حركة المستخدم بنجاح');
            }
        }

        // Admin primary currency wallet
        $adminCurrency = $adminUser->currency ?: 'EGP';
        $adminWallet = $this->walletService->getOrCreateWallet($adminUser, $adminCurrency);

        // All admin wallets across different currencies
        $adminWallets = Wallet::query()
            ->select(['id', 'user_id', 'currency', 'balance', 'frozen_balance', 'updated_at'])
            ->where('user_id', $adminUser->id)
            ->get();

        // Customer liabilities
        $customerWalletsQuery = Wallet::query()->where('user_id', '!=', $adminUser->id);
        $totalCustomerBalanceEgp = (float) $customerWalletsQuery->sum('balance');
        $customerWalletsCount = (int) $customerWalletsQuery->count();

        // Converted customer balance in USD
        $usdRate = (float) (Setting::get('usd_to_egp_rate', 50.0) ?: 50.0);
        $totalCustomerBalanceUsd = round($totalCustomerBalanceEgp / $usdRate, 6);

        // Net profit in the selected period from completed orders
        $profitEgpInPeriod = (float) Order::where('status', OrderStatus::COMPLETED)
            ->whereBetween('created_at', [$queryFrom, $queryTo])
            ->sum('profit_amount');
        $profitUsdInPeriod = round($profitEgpInPeriod / $usdRate, 6);

        // Admin settings (currency, group)
        $adminGroup = Setting::get('admin_vip_group_' . $adminUser->id, 'VIP8 (1%)');

        // Total transactions count in the period
        $transactionsCount = WalletTransaction::whereBetween('created_at', [$queryFrom, $queryTo])->count();

        return $this->successResponse([
            'admin_wallet' => [
                'balance' => (float) $adminWallet->balance,
                'currency' => $adminCurrency,
                'name' => Setting::get('site_name', 'سند ومهره كارد'),
            ],
            'admin_settings' => [
                'currency' => $adminCurrency,
                'group' => $adminGroup,
            ],
            'customer_stats' => [
                'total_balance_usd' => $totalCustomerBalanceUsd,
                'total_balance_egp' => $totalCustomerBalanceEgp,
                'wallets_count' => $customerWalletsCount,
            ],
            'profit_stats' => [
                'profit_usd' => $profitUsdInPeriod,
                'profit_egp' => $profitEgpInPeriod,
            ],
            'period' => [
                'start_date' => $queryFrom->toDateString(),
                'end_date' => $queryTo->toDateString(),
                'transactions_count' => $transactionsCount,
            ],
            'admin_wallets' => $adminWallets,
        ], 'تم جلب ملخص المحفظة الإدارية بنجاح');
    }

    /**
     * Paginated ledger of system & admin transactions.
     */
    public function transactions(Request $request): JsonResponse
    {
        $perPage = min((int) ($request->input('per_page', 20)), 100);

        $query = WalletTransaction::query()
            ->select([
                'id',
                'wallet_id',
                'type',
                'amount',
                'balance_before',
                'balance_after',
                'description',
                'reference_type',
                'reference_id',
                'created_at',
            ])
            ->with(['wallet:id,user_id,currency', 'wallet.user:id,name,email'])
            ->latest('id');

        if ($request->filled('start_date') && $request->filled('end_date')) {
            $from = Carbon::parse($request->input('start_date'))->startOfDay();
            $to = Carbon::parse($request->input('end_date'))->endOfDay();
            $query->whereBetween('created_at', [$from, $to]);
        }

        if ($request->filled('user_id')) {
            $query->where('user_id', (int) $request->input('user_id'));
        }

        if ($request->filled('search')) {
            $search = trim($request->input('search'));
            $query->where(function ($q) use ($search) {
                $q->where('id', $search)
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('idempotency_key', 'like', "%{$search}%")
                    ->orWhere('reference_id', $search);
            });
        }

        if ($request->filled('type')) {
            $query->where('type', $request->input('type'));
        }

        if ($request->filled('currency')) {
            $query->whereHas('wallet', function ($q) use ($request) {
                $q->where('currency', $request->input('currency'));
            });
        }

        $transactions = $query->paginate($perPage);

        return $this->successResponse($transactions, 'تم جلب سجل العمليات المالية بنجاح');
    }

    /**
     * Adjust admin wallet balance (Credit / Debit).
     */
    public function adjustBalance(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'amount' => ['required', 'numeric', 'min:0.01'],
            'action' => ['nullable', 'in:credit,debit'],
            'currency' => ['nullable', 'string', 'max:5'],
            'description' => ['nullable', 'string', 'max:255'],
        ], [
            'amount.required' => 'المبلغ مطلوب.',
            'amount.min' => 'يجب أن يكون المبلغ أكبر من صفر.',
        ]);

        $adminUser = $request->user() ?: (User::where('role', 'admin')->first() ?: User::first());
        $amount = (float) $validated['amount'];
        $currency = strtoupper($validated['currency'] ?? ($adminUser?->currency ?: 'EGP'));
        $action = $validated['action'] ?? 'credit';
        $description = $validated['description'] ?? 'إضافة رصيد مباشر لحساب الأدمن';

        try {
            if ($action === 'credit') {
                $tx = $this->walletService->credit(
                    user: $adminUser,
                    amount: $amount,
                    type: WalletTxType::MANUAL_CREDIT,
                    description: $description,
                    currency: $currency,
                    referenceType: 'admin_manual_adjustment',
                    referenceId: $adminUser->id
                );
            } else {
                $tx = $this->walletService->debit(
                    user: $adminUser,
                    amount: $amount,
                    type: WalletTxType::MANUAL_DEBIT,
                    description: $description,
                    currency: $currency,
                    referenceType: 'admin_manual_adjustment',
                    referenceId: $adminUser->id
                );
            }

            return $this->successResponse([
                'transaction_id' => $tx->id,
                'new_balance' => $tx->balance_after,
            ], 'تمت إضافة الرصيد لحساب الأدمن بنجاح');
        } catch (\Throwable $e) {
            return $this->errorResponse($e->getMessage(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    /**
     * Update admin account settings (currency, group).
     */
    public function updateSettings(Request $request): JsonResponse
    {
        $adminUser = $request->user() ?: (User::where('role', 'admin')->first() ?: User::first());

        $validated = $request->validate([
            'currency' => ['required', 'string', 'in:EGP,USD,SAR,AED,TRY'],
            'group' => ['nullable', 'string', 'max:50'],
        ], [
            'currency.required' => 'العملة مطلوبة.',
        ]);

        $adminUser->update([
            'currency' => $validated['currency'],
        ]);

        if (!empty($validated['group'])) {
            Setting::set('admin_vip_group_' . $adminUser->id, $validated['group']);
        }

        return $this->successResponse([
            'currency' => $adminUser->currency,
            'group' => Setting::get('admin_vip_group_' . $adminUser->id, 'VIP8 (1%)'),
        ], 'تم حفظ إعدادات حساب الأدمن بنجاح');
    }
}
