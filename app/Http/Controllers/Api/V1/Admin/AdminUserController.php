<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Enums\UserRole;
use App\Enums\UserStatus;
use App\Enums\WalletTxType;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Wallet;
use App\Models\WalletTransaction;
use App\Services\WalletService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class AdminUserController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected WalletService $walletService
    ) {}

    /**
     * Paginated list of users with search and filter capabilities.
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = min((int) ($request->input('per_page', 15)), 100);

        $query = User::query()
            ->select([
                'id',
                'name',
                'email',
                'phone',
                'role',
                'status',
                'currency',
                'trust_level',
                'avatar',
                'api_access_status',
                'preferences',
                'created_at',
            ])
            ->with(['wallets:id,user_id,currency,balance']);

        if ($request->filled('search')) {
            $search = trim($request->input('search'));
            $query->where(function ($q) use ($search) {
                if (is_numeric($search)) {
                    $q->where('id', (int) $search)
                        ->orWhere('phone', 'like', "%{$search}%");
                } elseif (str_contains($search, '@')) {
                    $q->where('email', 'like', "%{$search}%");
                } else {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('phone', 'like', "%{$search}%");
                }
            });
        }

        if ($request->filled('role')) {
            $query->where('role', $request->input('role'));
        }

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        $users = $query->latest('id')->paginate($perPage);

        // Enhance collection with primary balance and currency for mobile card rendering
        $users->getCollection()->transform(function ($u) {
            $w = $u->wallets->firstWhere('currency', $u->currency ?: 'EGP') ?? $u->wallets->first();
            $u->balance = $w ? (float) $w->balance : 0.0;
            $u->balance_formatted = number_format($u->balance, 2);
            $u->active_currency = $w ? $w->currency : ($u->currency ?: 'EGP');
            $u->public_id = substr(md5('user_' . $u->id), 0, 24);
            return $u;
        });

        return $this->successResponse($users, 'تم جلب قائمة المستخدمين بنجاح');
    }

    /**
     * Get detailed user info for the user details modal (matching competitor screenshots).
     */
    public function show(int $id): JsonResponse
    {
        $user = User::query()
            ->select([
                'id',
                'name',
                'email',
                'phone',
                'role',
                'status',
                'currency',
                'country',
                'avatar',
                'email_verified_at',
                'phone_verified_at',
                'google_id',
                'trust_level',
                'api_access_status',
                'api_key',
                'preferences',
                'successful_target_count',
                'rejected_target_count',
                'last_login_at',
                'last_login_ip',
                'created_at',
            ])
            ->with(['wallets:id,user_id,currency,balance,frozen_balance'])
            ->findOrFail($id);

        $activeWallet = $user->wallets->firstWhere('currency', $user->currency ?: 'EGP') ?? $user->wallets->first();
        $balance = $activeWallet ? (float) $activeWallet->balance : 0.0;
        $currency = $activeWallet ? $activeWallet->currency : ($user->currency ?: 'EGP');

        $operationsCount = WalletTransaction::where('user_id', $user->id)->count();

        $lastTransaction = WalletTransaction::where('user_id', $user->id)
            ->latest('id')
            ->first(['id', 'amount', 'type', 'description', 'created_at']);

        $lastMovementDate = $lastTransaction ? $lastTransaction->created_at : null;

        $debtLimit = (float) ($user->preferences['debt_limit'] ?? 0);
        $group = $user->preferences['vip_group'] ?? 'VIP8 (1%)';

        return $this->successResponse([
            'user' => $user,
            'stats' => [
                'public_id' => substr(md5('user_' . $user->id), 0, 24),
                'balance' => $balance,
                'currency' => $currency,
                'debt_limit' => $debtLimit,
                'group' => $group,
                'operations_count' => $operationsCount,
                'last_movement_at' => $lastMovementDate,
                'last_transaction' => $lastTransaction,
                'email_verified' => !is_null($user->email_verified_at),
                'registration_method' => $user->google_id ? 'حساب Google' : 'بريد إلكتروني',
            ],
        ], 'تم جلب بيانات المستخدم بنجاح');
    }

    /**
     * Update user account settings (group, currency, debt_limit).
     */
    public function updateSettings(Request $request, int $id): JsonResponse
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'group' => ['nullable', 'string', 'max:50'],
            'currency' => ['nullable', 'string', 'in:EGP,USD,SAR,AED,TRY,EUR,GBP'],
            'debt_limit' => ['nullable', 'numeric', 'min:0'],
        ]);

        if (isset($validated['currency'])) {
            $user->currency = $validated['currency'];
        }

        $preferences = $user->preferences ?? [];
        if (isset($validated['group'])) {
            $preferences['vip_group'] = $validated['group'];
        }
        if (isset($validated['debt_limit'])) {
            $preferences['debt_limit'] = (float) $validated['debt_limit'];
        }
        $user->preferences = $preferences;
        $user->save();

        return $this->successResponse([
            'group' => $preferences['vip_group'] ?? 'VIP8 (1%)',
            'currency' => $user->currency,
            'debt_limit' => $preferences['debt_limit'] ?? 0,
        ], 'تم حفظ إعدادات المستخدم بنجاح');
    }

    /**
     * Adjust user wallet balance directly from the modal (Credit / Debit).
     */
    public function adjustBalance(Request $request, int $id): JsonResponse
    {
        $validated = $request->validate([
            'amount' => ['required', 'numeric', 'min:0.01'],
            'action' => ['required', 'in:credit,debit'],
            'currency' => ['nullable', 'string', 'max:5'],
            'description' => ['nullable', 'string', 'max:255'],
        ], [
            'amount.required' => 'المبلغ مطلوب.',
            'amount.min' => 'يجب أن يكون المبلغ أكبر من صفر.',
            'action.required' => 'نوع الإجراء مطلوب.',
        ]);

        $user = User::findOrFail($id);
        $amount = (float) $validated['amount'];
        $currency = strtoupper($validated['currency'] ?? ($user->currency ?: 'EGP'));
        $action = $validated['action'];
        $description = $validated['description'] ?: ($action === 'credit' ? 'إضافة رصيد لحساب المستخدم بواسطة الإدارة' : 'خصم رصيد من حساب المستخدم بواسطة الإدارة');

        try {
            if ($action === 'credit') {
                $tx = $this->walletService->credit(
                    user: $user,
                    amount: $amount,
                    type: WalletTxType::MANUAL_CREDIT,
                    description: $description,
                    currency: $currency,
                    referenceType: 'admin_user_adjustment',
                    referenceId: $request->user()->id
                );
            } else {
                $tx = $this->walletService->debit(
                    user: $user,
                    amount: $amount,
                    type: WalletTxType::MANUAL_DEBIT,
                    description: $description,
                    currency: $currency,
                    referenceType: 'admin_user_adjustment',
                    referenceId: $request->user()->id
                );
            }

            return $this->successResponse([
                'transaction_id' => $tx->id,
                'new_balance' => $tx->balance_after,
                'currency' => $currency,
            ], 'تم تعديل رصيد المستخدم بنجاح');
        } catch (\Throwable $e) {
            return $this->errorResponse($e->getMessage(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    /**
     * Update user status (Active / Banned / Suspended / Rejected) and Role.
     */
    public function updateStatus(Request $request, int $id): JsonResponse
    {
        $validated = $request->validate([
            'status' => ['nullable', 'string', 'in:active,suspended,banned,rejected,pending'],
            'role' => ['nullable', 'string', 'in:customer,agent,api_client,admin'],
            'password' => ['nullable', 'string', 'min:6'],
        ], [
            'status.in' => 'حالة الحساب غير صالحة.',
            'role.in' => 'الرتبة المحددة غير صالحة.',
            'password.min' => 'يجب ألا تقل كلمة المرور عن 6 أحرف.',
        ]);

        $user = User::findOrFail($id);

        if (!empty($validated['status'])) {
            $user->status = UserStatus::tryFrom($validated['status']) ?? $validated['status'];
        }

        if (!empty($validated['role'])) {
            $user->role = UserRole::tryFrom($validated['role']) ?? $validated['role'];
        }

        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        $user->save();

        return $this->successResponse([
            'id' => $user->id,
            'status' => $user->status,
            'role' => $user->role,
        ], 'تم تحديث بيانات الحساب بنجاح');
    }

    /**
     * Toggle or activate API access for the user.
     */
    public function toggleApiAccess(Request $request, int $id): JsonResponse
    {
        $user = User::findOrFail($id);

        if ($user->api_access_status === 'active') {
            $user->api_access_status = 'inactive';
        } else {
            $user->api_access_status = 'active';
            if (empty($user->api_key)) {
                $user->api_key = 'emp_' . Str::random(32);
            }
            $user->api_access_approved_at = now();
        }

        $user->save();

        return $this->successResponse([
            'api_access_status' => $user->api_access_status,
            'api_key' => $user->api_key,
        ], 'تم تحديث صلاحية الربط البرمجي (API) للمستخدم بنجاح');
    }

    /**
     * Detailed user ledger & wallet transactions history (Matching Screenshots 1 & 2).
     */
    public function ledger(Request $request, ?int $id = null): JsonResponse
    {
        $userId = $id ?? $request->query('user_id');
        $user = null;
        $wallet = null;

        if ($userId) {
            $user = User::select(['id', 'name', 'email', 'phone', 'currency', 'avatar', 'preferences', 'status'])
                ->with(['wallets:id,user_id,currency,balance'])
                ->findOrFail($userId);

            $wallet = $user->wallets->firstWhere('currency', $user->currency ?: 'EGP') ?? $user->wallets->first();
        }

        $query = WalletTransaction::query()
            ->with(['user:id,name,email,avatar']);

        if ($user) {
            $query->where('user_id', $user->id);
        }

        if ($request->filled('search')) {
            $search = trim($request->input('search'));
            $query->where(function ($q) use ($search) {
                $q->where('idempotency_key', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('id', $search);
            });
        }

        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->input('date_from'));
        }

        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->input('date_to'));
        }

        $perPage = min((int) ($request->input('per_page', 20)), 100);
        $transactions = $query->latest('id')->paginate($perPage);

        // Stats calculation
        $currentBalance = $wallet ? (float) $wallet->balance : 0.0;
        $totalOperations = $user ? WalletTransaction::where('user_id', $user->id)->count() : WalletTransaction::count();

        $totalCredits = $user
            ? (float) WalletTransaction::where('user_id', $user->id)->whereIn('type', [WalletTxType::DEPOSIT, WalletTxType::REFUND, WalletTxType::TRANSFER_IN])->sum('amount')
            : 0.0;

        $totalDebits = $user
            ? (float) WalletTransaction::where('user_id', $user->id)->whereIn('type', [WalletTxType::ORDER_PAYMENT, WalletTxType::TARGET_PAYOUT, WalletTxType::TRANSFER_OUT])->sum('amount')
            : 0.0;

        // Transform collection to match Screenshot 2 breakdown
        $transactions->getCollection()->transform(function ($tx) {
            $isDebit = in_array($tx->type, [WalletTxType::ORDER_PAYMENT, WalletTxType::TARGET_PAYOUT, WalletTxType::TRANSFER_OUT])
                || ($tx->balance_before > $tx->balance_after);

            $title = 'عملية محفظة';
            $subtitle = $tx->description ?: 'معاملة مالية مسجلة';
            if (str_contains($subtitle, '-')) {
                $parts = explode('-', $subtitle, 2);
                $title = trim($parts[0]);
                $subtitle = trim($parts[1]);
            } elseif ($tx->type === WalletTxType::ORDER_PAYMENT) {
                $title = 'شراء منتج / كود';
            } elseif ($tx->type === WalletTxType::DEPOSIT) {
                $title = 'شحن رصيد المحفظة';
            }

            return [
                'id' => $tx->id,
                'hash' => $tx->idempotency_key ?: substr(md5('tx_' . $tx->id), 0, 24),
                'title' => $title,
                'subtitle' => $subtitle,
                'is_debit' => $isDebit,
                'amount' => (float) $tx->amount,
                'amount_formatted' => ($isDebit ? '- ' : '+ ') . number_format($tx->amount, 2) . ' £',
                'source' => $tx->metadata['source'] ?? 'محفظة الموقع',
                'status' => $tx->metadata['status'] ?? 'مكتملة',
                'balance_before' => (float) $tx->balance_before,
                'balance_before_formatted' => number_format($tx->balance_before, 2) . ' £',
                'change' => ($isDebit ? '- ' : '+ ') . number_format($tx->amount, 2) . ' £',
                'balance_after' => (float) $tx->balance_after,
                'balance_after_formatted' => number_format($tx->balance_after, 2) . ' £',
                'date_formatted' => $tx->created_at->translatedFormat('d F Y في h:i A'),
                'created_at' => $tx->created_at->toISOString(),
            ];
        });

        return $this->successResponse([
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'currency' => $user->currency ?: 'EGP',
                'avatar' => $user->avatar,
                'status' => $user->status,
                'public_id' => substr(md5('user_' . $user->id), 0, 24),
            ] : null,
            'stats' => [
                'current_balance' => $currentBalance,
                'current_balance_formatted' => '£ ' . number_format($currentBalance, 2),
                'currency' => $wallet ? $wallet->currency : 'EGP',
                'operations_count' => $totalOperations,
                'total_credits' => $totalCredits,
                'total_credits_formatted' => '£ ' . number_format($totalCredits, 2),
                'total_debits' => $totalDebits,
                'total_debits_formatted' => '£ ' . number_format($totalDebits, 2),
            ],
            'transactions' => $transactions,
        ], 'تم جلب سجل حركة المستخدم بنجاح');
    }

    /**
     * Set exact user wallet balance (Matching Screenshot 2 "تعيين رصيد محدد").
     */
    public function setBalance(Request $request, int $id): JsonResponse
    {
        $validated = $request->validate([
            'target_balance' => ['required', 'numeric', 'min:0'],
            'currency' => ['nullable', 'string', 'max:5'],
            'notes' => ['nullable', 'string', 'max:255'],
        ], [
            'target_balance.required' => 'الرصيد المستهدف مطلوب.',
            'target_balance.min' => 'يجب ألا يقل الرصيد عن صفر.',
        ]);

        $user = User::findOrFail($id);
        $currency = strtoupper($validated['currency'] ?? ($user->currency ?: 'EGP'));
        $targetBalance = (float) $validated['target_balance'];

        $wallet = Wallet::firstOrCreate(
            ['user_id' => $user->id, 'currency' => $currency],
            ['balance' => 0.0, 'frozen_balance' => 0.0]
        );

        $currentBalance = (float) $wallet->balance;
        $diff = round($targetBalance - $currentBalance, 4);

        if (abs($diff) < 0.0001) {
            return $this->successResponse([
                'new_balance' => $currentBalance,
                'currency' => $currency,
            ], 'رصيد المستخدم مطابق بالفعل للمبلغ المدخل.');
        }

        try {
            if ($diff > 0) {
                $tx = $this->walletService->credit(
                    user: $user,
                    amount: $diff,
                    type: WalletTxType::ADMIN_ADJUSTMENT,
                    description: $validated['notes'] ?: 'تعيين رصيد محدد للحساب بواسطة الإدارة',
                    currency: $currency,
                    referenceType: 'admin_set_balance',
                    referenceId: $request->user()->id
                );
            } else {
                $tx = $this->walletService->debit(
                    user: $user,
                    amount: abs($diff),
                    type: WalletTxType::ADMIN_ADJUSTMENT,
                    description: $validated['notes'] ?: 'تعيين رصيد محدد للحساب بواسطة الإدارة',
                    currency: $currency,
                    referenceType: 'admin_set_balance',
                    referenceId: $request->user()->id
                );
            }

            return $this->successResponse([
                'transaction_id' => $tx->id,
                'new_balance' => (float) $tx->balance_after,
                'currency' => $currency,
            ], 'تم تعيين رصيد المستخدم بنجاح إلى ' . number_format($targetBalance, 2) . ' ' . $currency);
        } catch (\Throwable $e) {
            return $this->errorResponse($e->getMessage(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }
}

