<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\StoreTargetOrderRequest;
use App\Http\Resources\TargetOrderResource;
use App\Models\Product;
use App\Models\TargetSellOrder;
use App\Services\TargetSellService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TargetOrderController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected TargetSellService $targetSellService
    ) {}

    /**
     * Get user's target sell orders history.
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        $query = TargetSellOrder::where('user_id', $user->id)
            ->with(['product:id,name,image'])
            ->select([
                'id', 'public_id', 'user_id', 'product_id', 'app_user_id', 'app_username',
                'agency_id', 'target_points', 'rate_per_point', 'gross_amount', 'fee',
                'net_payout', 'currency', 'payout_method', 'proof_image', 'user_notes',
                'status', 'reviewer_notes', 'reviewed_at', 'created_at'
            ]);

        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        $orders = $query->latest('id')->paginate(15);

        return $this->paginatedResponse($orders, 'تم جلب سجل طلبات بيع التارجت بنجاح');
    }

    /**
     * Submit a new target sell order.
     */
    public function store(StoreTargetOrderRequest $request): JsonResponse
    {
        $user = $request->user();
        $validated = $request->validated();
        $product = Product::findOrFail($validated['product_id']);

        $proofImagePath = null;
        if ($request->hasFile('proof_image')) {
            $proofImagePath = $request->file('proof_image')->store('target_proofs', 'public');
        }

        try {
            $order = $this->targetSellService->submitOrder(
                user: $user,
                product: $product,
                appUserId: $validated['app_user_id'],
                appUsername: $validated['app_username'] ?? null,
                points: (int) $validated['target_points'],
                proofImage: $proofImagePath,
                userNotes: $validated['user_notes'] ?? null
            );

            return $this->successResponse(
                new TargetOrderResource($order->load('product')),
                'تم إرسال طلب بيع التارجت بنجاح، سيقوم فريق المراجعة بالتحقق من استلام التارجت وإيداع الرصيد في محفظتك.',
                Response::HTTP_CREATED
            );
        } catch (\Throwable $e) {
            return $this->errorResponse($e->getMessage(), Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Get single target sell order details.
     */
    public function show(Request $request, int $id): JsonResponse
    {
        $order = TargetSellOrder::where('user_id', $request->user()->id)
            ->with(['product:id,name,image'])
            ->findOrFail($id);

        return $this->successResponse(
            new TargetOrderResource($order),
            'تم جلب تفاصيل طلب بيع التارجت بنجاح'
        );
    }
}
