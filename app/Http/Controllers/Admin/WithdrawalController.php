<?php

namespace App\Http\Controllers\Admin;

use App\Enums\WithdrawalStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ApproveWithdrawalRequest;
use App\Http\Requests\Admin\RejectWithdrawalRequest;
use App\Models\PaymentMethod;
use App\Models\WithdrawalRequest;
use App\Services\WithdrawalService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class WithdrawalController extends Controller
{
    public function __construct(
        protected WithdrawalService $withdrawalService
    ) {}

    /**
     * Display listing of withdrawal requests with rich filters and metrics.
     */
    public function index(Request $request): View
    {
        $query = WithdrawalRequest::query()
            ->select([
                'id',
                'user_id',
                'payment_method_id',
                'amount',
                'fee',
                'final_amount',
                'currency',
                'recipient_account',
                'status',
                'reviewer_id',
                'payout_proof_image',
                'payout_reference',
                'reviewer_notes',
                'reviewed_at',
                'created_at',
            ])
            ->with([
                'user:id,name,email,phone',
                'paymentMethod:id,name,code,logo',
                'reviewer:id,name',
            ]);

        // Filter by status
        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        // Filter by payment method
        if ($methodId = $request->input('payment_method_id')) {
            $query->where('payment_method_id', $methodId);
        }

        // Search by user name / phone / email / recipient account / reference / ID
        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                if (is_numeric($search)) {
                    $q->orWhere('id', (int) $search);
                }
                $q->orWhere('recipient_account', 'like', "%{$search}%")
                    ->orWhere('payout_reference', 'like', "%{$search}%")
                    ->orWhereHas('user', function ($uq) use ($search) {
                        $uq->where('name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%")
                            ->orWhere('phone', 'like', "%{$search}%");
                    });
            });
        }

        $withdrawals = $query->latest('id')->paginate(15)->withQueryString();

        $statuses = WithdrawalStatus::cases();
        $paymentMethods = PaymentMethod::select(['id', 'name'])->where('allow_withdrawal', true)->orWhere('is_active', true)->get();

        // Summary counts and metrics
        $counts = [
            'all' => WithdrawalRequest::count(),
            'pending' => WithdrawalRequest::where('status', WithdrawalStatus::PENDING)->count(),
            'completed' => WithdrawalRequest::where('status', WithdrawalStatus::COMPLETED)->count(),
            'rejected' => WithdrawalRequest::where('status', WithdrawalStatus::REJECTED)->count(),
            'total_completed_amount' => (float) WithdrawalRequest::where('status', WithdrawalStatus::COMPLETED)->sum('final_amount'),
        ];

        return view('admin.withdrawals.index', compact('withdrawals', 'statuses', 'paymentMethods', 'counts'));
    }

    /**
     * Display a specific withdrawal request details.
     */
    public function show(int $id): View
    {
        $withdrawal = WithdrawalRequest::with([
            'user.wallets',
            'paymentMethod',
            'reviewer:id,name,email',
        ])->findOrFail($id);

        return view('admin.withdrawals.show', compact('withdrawal'));
    }

    /**
     * Approve and mark withdrawal as completed with payout receipt.
     */
    public function approve(ApproveWithdrawalRequest $request, int $id): RedirectResponse
    {
        $withdrawal = WithdrawalRequest::with(['user', 'paymentMethod'])->findOrFail($id);

        if ($withdrawal->status !== WithdrawalStatus::PENDING) {
            return back()->with('error', 'تمت مراجعة هذا الطلب مسبقاً وتغيير حالته.');
        }

        $proofImagePath = null;
        if ($request->hasFile('proof_image')) {
            $proofImagePath = $request->file('proof_image')->store('payout_proofs', 'public');
        }

        try {
            $this->withdrawalService->complete(
                request: $withdrawal,
                reviewer: auth()->user(),
                proofImage: $proofImagePath,
                reference: $request->input('payout_reference'),
                notes: $request->input('reviewer_notes') ?? 'تم تنفيذ التحويل بنجاح بواسطة الإدارة'
            );

            return back()->with('success', "تم تأكيد تحويل مستحقات طلب السحب (#{$withdrawal->id}) بمبلغ {$withdrawal->final_amount} {$withdrawal->currency} وإشعار العميل فوراً.");
        } catch (\Throwable $e) {
            return back()->with('error', 'حدث خطأ أثناء اعتماد الطلب: ' . $e->getMessage());
        }
    }

    /**
     * Reject withdrawal request, document reason, and refund user wallet.
     */
    public function reject(RejectWithdrawalRequest $request, int $id): RedirectResponse
    {
        $withdrawal = WithdrawalRequest::with(['user', 'paymentMethod'])->findOrFail($id);

        if ($withdrawal->status !== WithdrawalStatus::PENDING) {
            return back()->with('error', 'تمت مراجعة هذا الطلب مسبقاً وتغيير حالته.');
        }

        try {
            $this->withdrawalService->reject(
                request: $withdrawal,
                reviewer: auth()->user(),
                reason: $request->validated('reason')
            );

            return back()->with('success', "تم رفض طلب السحب (#{$withdrawal->id}) واسترجاع كامل المبلغ ({$withdrawal->amount} {$withdrawal->currency}) لمحفظة العميل بنجاح.");
        } catch (\Throwable $e) {
            return back()->with('error', 'حدث خطأ أثناء رفض الطلب: ' . $e->getMessage());
        }
    }
}
