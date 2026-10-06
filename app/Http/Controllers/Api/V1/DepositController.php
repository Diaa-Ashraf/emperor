<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\StoreDepositRequest;
use App\Http\Resources\DepositMethodResource;
use App\Http\Resources\DepositResource;
use App\Models\DepositRequest;
use App\Models\PaymentMethod;
use App\Services\DepositService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class DepositController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected DepositService $depositService
    ) {}

    /**
     * Get active deposit payment methods.
     */
    public function methods(): JsonResponse
    {
        $methods = PaymentMethod::where('is_active', true)
            ->where('allow_deposit', true)
            ->orderBy('sort_order')
            ->get();

        return $this->successResponse(
            DepositMethodResource::collection($methods),
            'تم جلب طرق الإيداع المتاحة بنجاح'
        );
    }

    /**
     * Submit a new deposit request.
     */
    public function store(StoreDepositRequest $request): JsonResponse
    {
        $user = $request->user();
        $validated = $request->validated();

        $methodId = $validated['payment_method_id'] ?? null;
        $methodCode = $validated['method'] ?? null;

        $method = null;
        if ($methodId) {
            $method = PaymentMethod::find($methodId);
        }
        if (!$method && $methodCode) {
            $method = PaymentMethod::where('code', $methodCode)
                ->orWhere('name', 'like', "%{$methodCode}%")
                ->first();
        }
        if (!$method) {
            $method = PaymentMethod::where('is_active', true)->first();
        }

        if (!$method) {
            return $this->errorResponse('طريقة الدفع المحددة غير متوفرة حالياً.', Response::HTTP_BAD_REQUEST);
        }

        $proofImagePath = null;
        if ($request->hasFile('proof_image')) {
            $proofImagePath = $request->file('proof_image')->store('deposit_proofs', 'public');
        }

        $senderAccount = $validated['sender_account'] ?? $validated['sender_wallet'] ?? null;
        $txRef = $validated['transaction_reference'] ?? $validated['transaction_ref'] ?? null;

        try {
            $deposit = $this->depositService->submitDeposit(
                user: $user,
                method: $method,
                amount: (float) $validated['amount'],
                senderAccount: $senderAccount,
                transactionReference: $txRef,
                proofImage: $proofImagePath
            );

            return $this->successResponse(
                new DepositResource($deposit->load('paymentMethod')),
                'تم إرسال طلب الإيداع بنجاح، سيتم مراجعته وشحن محفظتك خلال دقائق.',
                Response::HTTP_CREATED
            );
        } catch (\Throwable $e) {
            return $this->errorResponse($e->getMessage(), Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Get user deposit requests history.
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        $baseQuery = DepositRequest::where('user_id', $user->id);

        // Filter last 5 days by default unless 'all_time' is requested
        $days = $request->input('days', 5);
        if ($days && $days > 0 && !$request->boolean('all_time')) {
            $baseQuery->where('created_at', '>=', now()->subDays((int)$days)->startOfDay());
        }

        // Summary stats for badges
        $stats = [
            'total' => (clone $baseQuery)->count(),
            'pending' => (clone $baseQuery)->whereIn('status', ['pending', 'reviewing'])->count(),
            'approved' => (clone $baseQuery)->whereIn('status', ['approved', 'completed'])->count(),
            'rejected' => (clone $baseQuery)->where('status', 'rejected')->count(),
        ];

        $query = (clone $baseQuery)->with('paymentMethod')
            ->select([
                'id', 'user_id', 'payment_method_id', 'amount', 'fee', 'final_amount',
                'currency', 'status', 'sender_account', 'transaction_reference',
                'proof_image', 'reviewer_notes', 'created_at', 'reviewed_at'
            ]);

        if ($status = $request->input('status')) {
            if ($status === 'approved' || $status === 'completed') {
                $query->whereIn('status', ['approved', 'completed']);
            } elseif ($status === 'pending') {
                $query->whereIn('status', ['pending', 'reviewing']);
            } elseif ($status !== 'all') {
                $query->where('status', $status);
            }
        }

        $perPage = (int) $request->input('per_page', 10);
        $deposits = $query->latest('id')->paginate($perPage);
        $deposits->through(fn($item) => new DepositResource($item));

        return response()->json([
            'success' => true,
            'message' => 'تم جلب سجل طلبات التحويلات والإيداع بنجاح',
            'data' => $deposits->items(),
            'stats' => $stats,
            'meta' => [
                'current_page' => $deposits->currentPage(),
                'last_page' => $deposits->lastPage(),
                'per_page' => $deposits->perPage(),
                'total' => $deposits->total(),
            ]
        ], Response::HTTP_OK);
    }

    /**
     * Get single deposit request details.
     */
    public function show(Request $request, int $id): JsonResponse
    {
        $deposit = DepositRequest::where('user_id', $request->user()->id)
            ->with('paymentMethod')
            ->findOrFail($id);

        return $this->successResponse(
            new DepositResource($deposit),
            'تم جلب تفاصيل طلب الإيداع بنجاح'
        );
    }
}

