<?php

namespace App\Http\Controllers\Admin;

use App\Enums\DepositStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\RejectDepositRequest;
use App\Models\DepositRequest;
use App\Models\PaymentMethod;
use App\Services\DepositService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class DepositController extends Controller
{
    public function __construct(
        protected DepositService $depositService
    ) {}

    /**
     * Display listing of deposit requests with filters.
     */
    public function index(Request $request): View
    {
        $query = DepositRequest::query()
            ->select([
                'id', 'user_id', 'payment_method_id', 'amount', 'fee', 'final_amount',
                'currency', 'sender_account', 'transaction_reference', 'proof_image',
                'status', 'reviewer_id', 'created_at'
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

        // Search by user name / email / transaction reference
        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('transaction_reference', 'like', "%{$search}%")
                    ->orWhere('sender_account', 'like', "%{$search}%")
                    ->orWhereHas('user', function ($uq) use ($search) {
                        $uq->where('name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%")
                            ->orWhere('phone', 'like', "%{$search}%");
                    });
            });
        }

        $deposits = $query->latest('id')->paginate(15)->withQueryString();

        $statuses = DepositStatus::cases();
        $paymentMethods = PaymentMethod::select(['id', 'name'])->where('is_active', true)->get();

        // Counts for tab badges
        $counts = [
            'all' => DepositRequest::count(),
            'pending' => DepositRequest::where('status', DepositStatus::PENDING)->count(),
            'approved' => DepositRequest::where('status', DepositStatus::APPROVED)->count(),
            'rejected' => DepositRequest::where('status', DepositStatus::REJECTED)->count(),
        ];

        return view('admin.deposits.index', compact('deposits', 'statuses', 'paymentMethods', 'counts'));
    }

    /**
     * Display a specific deposit request details.
     */
    public function show(int $id): View
    {
        $deposit = DepositRequest::with([
            'user.wallet',
            'paymentMethod',
            'reviewer:id,name,email',
        ])->findOrFail($id);

        return view('admin.deposits.show', compact('deposit'));
    }

    /**
     * Approve deposit request and credit wallet balance.
     */
    public function approve(int $id): RedirectResponse
    {
        $deposit = DepositRequest::with(['user', 'paymentMethod'])->findOrFail($id);

        if ($deposit->status !== DepositStatus::PENDING) {
            return back()->with('error', 'تمت مراجعة هذا الطلب مسبقاً.');
        }

        try {
            $this->depositService->approve($deposit, auth()->user(), 'تم الاعتماد والشحن بواسطة الإدارة');
            return back()->with('success', "تمت الموافقة على طلب الإيداع (#{$deposit->id}) وشحن مبلغ {$deposit->final_amount} {$deposit->currency} في محفظة المستخدم بنجاح.");
        } catch (\Throwable $e) {
            return back()->with('error', 'حدث خطأ أثناء اعتماد الطلب: ' . $e->getMessage());
        }
    }

    /**
     * Reject deposit request with reason.
     */
    public function reject(RejectDepositRequest $request, int $id): RedirectResponse
    {
        $deposit = DepositRequest::findOrFail($id);

        if ($deposit->status !== DepositStatus::PENDING) {
            return back()->with('error', 'تمت مراجعة هذا الطلب مسبقاً.');
        }

        try {
            $this->depositService->reject($deposit, auth()->user(), $request->validated('reason'));
            return back()->with('success', "تم رفض طلب الإيداع (#{$deposit->id}) وتوثيق سبب الرفض.");
        } catch (\Throwable $e) {
            return back()->with('error', 'حدث خطأ أثناء رفض الطلب: ' . $e->getMessage());
        }
    }
}
