<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Enums\DepositStatus;
use App\Http\Controllers\Controller;
use App\Models\DepositRequest;
use App\Services\DepositService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminDepositController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected DepositService $depositService
    ) {}

    /**
     * Paginated list of deposit requests with filters.
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = min((int) ($request->input('per_page', 15)), 100);

        $query = DepositRequest::query()
            ->select([
                'id',
                'user_id',
                'payment_method_id',
                'amount',
                'fee',
                'final_amount',
                'currency',
                'sender_account',
                'transaction_reference',
                'proof_image',
                'status',
                'created_at',
            ])
            ->with([
                'user:id,name,email,phone,avatar',
                'paymentMethod:id,name,type',
            ])
            ->latest('id');

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        if ($request->filled('search')) {
            $search = trim($request->input('search'));
            $query->where(function ($q) use ($search) {
                $q->where('transaction_reference', 'like', "%{$search}%")
                    ->orWhere('sender_account', 'like', "%{$search}%")
                    ->orWhere('id', $search)
                    ->orWhereHas('user', function ($uq) use ($search) {
                        $uq->where('name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%")
                            ->orWhere('phone', 'like', "%{$search}%");
                    });
            });
        }

        $deposits = $query->paginate($perPage);

        $counts = [
            'all' => DepositRequest::count(),
            'pending' => DepositRequest::where('status', DepositStatus::PENDING)->count(),
            'approved' => DepositRequest::where('status', DepositStatus::APPROVED)->count(),
            'rejected' => DepositRequest::where('status', DepositStatus::REJECTED)->count(),
        ];

        return $this->successResponse([
            'deposits' => $deposits,
            'counts' => $counts,
        ], 'تم جلب طلبات الإيداع بنجاح');
    }

    /**
     * Show single deposit request with proof image full URL.
     */
    public function show(int $id): JsonResponse
    {
        $deposit = DepositRequest::query()
            ->with([
                'user:id,name,email,phone',
                'paymentMethod:id,name,type',
                'reviewer:id,name',
            ])
            ->findOrFail($id);

        $proofUrl = $deposit->proof_image ? asset('storage/' . $deposit->proof_image) : null;

        return $this->successResponse([
            'deposit' => $deposit,
            'proof_url' => $proofUrl,
        ], 'تم جلب تفاصيل طلب الإيداع بنجاح');
    }

    /**
     * Approve deposit request and immediately credit customer's wallet.
     */
    public function approve(Request $request, int $id): JsonResponse
    {
        $deposit = DepositRequest::with(['user', 'paymentMethod'])->findOrFail($id);

        if ($deposit->status !== DepositStatus::PENDING && $deposit->status !== 'pending') {
            return $this->errorResponse('تمت مراجعة هذا الطلب مسبقاً ولا يمكن تعديل حالته.', Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        try {
            $notes = $request->input('notes', 'تم الاعتماد والشحن بواسطة الإدارة');
            $this->depositService->approve($deposit, $request->user(), $notes);

            return $this->successResponse([
                'id' => $deposit->id,
                'status' => 'approved',
                'amount' => $deposit->final_amount,
                'currency' => $deposit->currency,
            ], "تم قبول طلب الإيداع (#{$deposit->id}) وشحن مبلغ {$deposit->final_amount} {$deposit->currency} بنجاح.");
        } catch (\Throwable $e) {
            return $this->errorResponse('حدث خطأ أثناء اعتماد الطلب: ' . $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Reject deposit request with reason.
     */
    public function reject(Request $request, int $id): JsonResponse
    {
        $validated = $request->validate([
            'reason' => ['required', 'string', 'max:255'],
        ], [
            'reason.required' => 'سبب الرفض مطلوب لإشعار العميل.',
        ]);

        $deposit = DepositRequest::findOrFail($id);

        if ($deposit->status !== DepositStatus::PENDING && $deposit->status !== 'pending') {
            return $this->errorResponse('تمت مراجعة هذا الطلب مسبقاً ولا يمكن تعديل حالته.', Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        try {
            $this->depositService->reject($deposit, $request->user(), $validated['reason']);

            return $this->successResponse([
                'id' => $deposit->id,
                'status' => 'rejected',
                'reason' => $validated['reason'],
            ], "تم رفض طلب الإيداع (#{$deposit->id}) وتوثيق السبب بنجاح.");
        } catch (\Throwable $e) {
            return $this->errorResponse('حدث خطأ أثناء رفض الطلب: ' . $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}

