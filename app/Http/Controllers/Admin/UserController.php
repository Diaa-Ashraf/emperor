<?php

namespace App\Http\Controllers\Admin;

use App\Enums\UserRole;
use App\Enums\UserStatus;
use App\Enums\WalletTxType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AdjustBalanceRequest;
use App\Models\User;
use App\Models\Wallet;
use App\Services\WalletService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class UserController extends Controller
{
    public function __construct(
        protected WalletService $walletService
    ) {}

    /**
     * Display a listing of users with search and role filters.
     */
    public function index(Request $request): View
    {
        $query = User::query()
            ->select(['id', 'name', 'email', 'phone', 'role', 'status', 'currency', 'created_at', 'last_login_at'])
            ->with(['wallet' => function ($q) {
                $q->select(['id', 'user_id', 'currency', 'balance', 'frozen_balance', 'is_locked']);
            }]);

        // Search by name, email, or phone
        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        // Filter by role
        if ($role = $request->input('role')) {
            $query->where('role', $role);
        }

        // Filter by status
        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        $users = $query->latest('id')->paginate(15)->withQueryString();

        $roles = UserRole::cases();
        $statuses = UserStatus::cases();

        return view('admin.users.index', compact('users', 'roles', 'statuses'));
    }

    /**
     * Display user details, wallet ledger, and activity.
     */
    public function show(int $id): View
    {
        $user = User::with([
            'wallets',
            'walletTransactions' => function ($q) {
                $q->latest('id')->take(20);
            },
            'orders' => function ($q) {
                $q->with(['product:id,name', 'tier:id,name'])->latest('id')->take(10);
            },
            'depositRequests' => function ($q) {
                $q->with('paymentMethod:id,name')->latest('id')->take(10);
            },
            'targetSellOrders' => function ($q) {
                $q->with('product:id,name')->latest('id')->take(10);
            },
        ])->findOrFail($id);

        return view('admin.users.show', compact('user'));
    }

    /**
     * Toggle ban/suspension status for a user.
     */
    public function toggleBan(int $id): RedirectResponse
    {
        $user = User::findOrFail($id);

        if ($user->isAdmin()) {
            return back()->with('error', 'لا يمكن حظر حساب المدير الرئيسي.');
        }

        $newStatus = $user->status === UserStatus::BANNED ? UserStatus::ACTIVE : UserStatus::BANNED;
        $user->update(['status' => $newStatus]);

        $message = $newStatus === UserStatus::BANNED ? 'تم حظر حساب المستخدم بنجاح.' : 'تم إلغاء حظر حساب المستخدم بنجاح.';

        return back()->with('success', $message);
    }

    /**
     * Adjust user wallet balance manually (Admin Credit / Debit).
     */
    public function adjustBalance(AdjustBalanceRequest $request, int $id): RedirectResponse
    {
        $user = User::findOrFail($id);
        $validated = $request->validated();
        $amount = (float) $validated['amount'];
        $currency = $validated['currency'];
        $notes = $validated['notes'];

        try {
            if ($validated['type'] === 'credit') {
                $this->walletService->credit(
                    user: $user,
                    amount: $amount,
                    type: WalletTxType::ADMIN_ADJUSTMENT,
                    description: "تعديل إداري (إضافة رصيد): {$notes}",
                    currency: $currency,
                    referenceType: 'AdminAdjustment',
                    referenceId: auth()->id()
                );
            } else {
                $this->walletService->debit(
                    user: $user,
                    amount: $amount,
                    type: WalletTxType::ADMIN_ADJUSTMENT,
                    description: "تعديل إداري (خصم رصيد): {$notes}",
                    currency: $currency,
                    referenceType: 'AdminAdjustment',
                    referenceId: auth()->id()
                );
            }

            return back()->with('success', 'تم تعديل رصيد المحفظة بنجاح وتوثيق العملية في السجل المالي.');
        } catch (\Throwable $e) {
            return back()->with('error', 'فشل في تعديل الرصيد: ' . $e->getMessage());
        }
    }
}
