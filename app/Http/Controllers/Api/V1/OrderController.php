<?php

namespace App\Http\Controllers\Api\V1;

use App\DTOs\OrderRequestDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\StoreOrderRequest;
use App\Http\Resources\OrderResource;
use App\Jobs\ExecuteOrderJob;
use App\Models\Order;
use App\Services\OrderService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class OrderController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected OrderService $orderService
    ) {}

    /**
     * Place a new order (debits wallet & dispatches fulfillment job).
     */
    public function store(StoreOrderRequest $request): JsonResponse
    {
        $user = $request->user();
        $validated = $request->validated();

        $dto = new OrderRequestDTO(
            userId: $user->id,
            productId: (int) $validated['product_id'],
            productTierId: (int) $validated['product_tier_id'],
            quantity: (int) $validated['quantity'],
            playerId: $validated['player_id'] ?? null,
            serverId: $validated['server_id'] ?? null,
            accountRegion: $validated['account_region'] ?? null,
            extraFields: $validated['extra_fields'] ?? [],
            idempotencyKey: $validated['idempotency_key'] ?? $request->header('X-Idempotency-Key'),
            channel: 'web'
        );

        try {
            $order = $this->orderService->createOrder($dto, $user);

            // Dispatch async fulfillment job
            ExecuteOrderJob::dispatch($order->id);

            return $this->successResponse(
                new OrderResource($order->load(['product', 'tier'])),
                'تم إنشاء الطلب وخصم المبلغ من المحفظة بنجاح، جاري تنفيذ الشحن.',
                Response::HTTP_CREATED
            );
        } catch (\Throwable $e) {
            return $this->errorResponse($e->getMessage(), Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Get user orders history.
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        $query = Order::where('user_id', $user->id)
            ->with(['product', 'tier'])
            ->select([
                'id', 'public_id', 'user_id', 'product_id', 'product_tier_id',
                'quantity', 'unit_price', 'total_amount', 'currency',
                'player_id', 'server_id', 'account_region', 'status',
                'failure_reason', 'created_at', 'updated_at'
            ]);

        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        $orders = $query->latest('id')->paginate(15);

        return $this->paginatedResponse($orders, 'تم جلب سجل طلباتك بنجاح');
    }

    /**
     * Get single order details by public ID or ID.
     */
    public function show(Request $request, string $id): JsonResponse
    {
        $user = $request->user();

        $order = Order::where('user_id', $user->id)
            ->with(['product', 'tier'])
            ->where(function ($q) use ($id) {
                $q->where('public_id', $id)->orWhere('id', $id);
            })
            ->firstOrFail();

        return $this->successResponse(
            new OrderResource($order),
            'تم جلب تفاصيل الطلب بنجاح'
        );
    }
}
