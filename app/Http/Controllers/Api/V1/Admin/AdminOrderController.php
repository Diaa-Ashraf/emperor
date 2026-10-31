<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Enums\OrderStatus;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Services\OrderService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminOrderController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected OrderService $orderService
    ) {}

    /**
     * Paginated list of customer orders with filters and eager loading.
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = min((int) ($request->input('per_page', 15)), 100);

        $query = Order::query()
            ->select([
                'id',
                'public_id',
                'user_id',
                'product_id',
                'product_tier_id',
                'provider_id',
                'quantity',
                'unit_price',
                'total_amount',
                'cost_amount',
                'profit_amount',
                'currency',
                'status',
                'player_id',
                'provider_order_id',
                'created_at',
            ])
            ->with([
                'user:id,name,email,phone,avatar',
                'product:id,name,image',
                'tier:id,name,final_price',
                'provider:id,name',
            ]);

        // Status Filter
        if ($request->filled('status')) {
            $status = $request->input('status');
            if ($status === 'uncompleted') {
                $query->where('status', '!=', OrderStatus::COMPLETED);
            } elseif ($status !== 'all') {
                $query->where('status', $status);
            }
        }

        // Provider Filter
        if ($request->filled('provider_id') && $request->input('provider_id') !== 'all') {
            $query->where('provider_id', $request->input('provider_id'));
        }

        // Search Filter
        if ($request->filled('search')) {
            $search = trim($request->input('search'));
            $query->where(function ($q) use ($search) {
                $q->where('public_id', 'like', "%{$search}%")
                    ->orWhere('player_id', 'like', "%{$search}%")
                    ->orWhere('provider_order_id', 'like', "%{$search}%")
                    ->orWhere('id', $search)
                    ->orWhereHas('user', function ($uq) use ($search) {
                        $uq->where('name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%")
                            ->orWhere('phone', 'like', "%{$search}%");
                    })
                    ->orWhereHas('product', function ($pq) use ($search) {
                        $pq->where('name', 'like', "%{$search}%");
                    });
            });
        }

        // Sorting
        $sort = $request->input('sort', 'latest');
        if ($sort === 'oldest') {
            $query->oldest('id');
        } else {
            $query->latest('id');
        }

        $orders = $query->paginate($perPage);

        $totalAll = Order::count();
        $totalCompleted = Order::where('status', OrderStatus::COMPLETED)->count();

        $counts = [
            'all' => $totalAll,
            'pending' => Order::whereIn('status', [OrderStatus::PENDING, OrderStatus::PROCESSING])->count(),
            'manual_review' => Order::where('status', OrderStatus::MANUAL_REVIEW)->count(),
            'completed' => $totalCompleted,
            'uncompleted' => Order::where('status', '!=', OrderStatus::COMPLETED)->count(),
            'failed' => Order::where('status', OrderStatus::FAILED)->count(),
            'refunded' => Order::where('status', OrderStatus::REFUNDED)->count(),
        ];

        $providers = \App\Models\Provider::select(['id', 'name'])->where('is_active', true)->get();

        return $this->successResponse([
            'orders' => $orders,
            'counts' => $counts,
            'providers' => $providers,
        ], 'تم جلب قائمة الطلبات بنجاح');
    }

    /**
     * Show single order details.
     */
    public function show(string|int $id): JsonResponse
    {
        $order = Order::query()
            ->with([
                'user:id,name,email,phone,avatar',
                'product:id,name,image,category_id',
                'product.category:id,name',
                'tier:id,name,final_price,source_cost',
                'provider:id,name,driver',
            ])
            ->where(function ($q) use ($id) {
                if (is_numeric($id)) {
                    $q->where('id', $id)->orWhere('public_id', $id);
                } else {
                    $q->where('public_id', $id);
                }
            })
            ->firstOrFail();

        return $this->successResponse($order, 'تم جلب تفاصيل الطلب بنجاح');
    }

    /**
     * Update order status manually.
     */
    public function updateStatus(Request $request, int $id): JsonResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'string', 'in:pending,processing,completed,failed,refunded,manual_review'],
            'notes' => ['nullable', 'string', 'max:500'],
        ], [
            'status.required' => 'حالة الطلب مطلوبة.',
            'status.in' => 'الحالة المحددة غير صالحة.',
        ]);

        $order = Order::findOrFail($id);
        $newStatus = OrderStatus::tryFrom($validated['status']) ?? $validated['status'];

        try {
            $this->orderService->transitionStatus(
                order: $order,
                newStatus: $newStatus,
                reason: $validated['notes'] ?? 'تحديث يدوي بواسطة الإدارة',
                metadata: ['admin_id' => $request->user()->id]
            );

            return $this->successResponse([
                'id' => $order->id,
                'status' => $order->status,
            ], 'تم تحديث حالة الطلب بنجاح');
        } catch (\Throwable $e) {
            return $this->errorResponse('فشل تحديث حالة الطلب: ' . $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Retry automated fulfillment for a failed order.
     */
    public function retry(Request $request, int $id): JsonResponse
    {
        $order = Order::findOrFail($id);

        try {
            $this->orderService->fulfillOrder($order);

            return $this->successResponse([
                'id' => $order->id,
                'status' => $order->fresh()->status,
            ], 'تمت إعادة محاولة تنفيذ الطلب بنجاح');
        } catch (\Throwable $e) {
            return $this->errorResponse('فشل تنفيذ الطلب: ' . $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}

