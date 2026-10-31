<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Enums\TargetOrderStatus;
use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\TargetSellOrder;
use App\Services\TargetSellService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminTargetController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected TargetSellService $targetSellService
    ) {}

    /**
     * Paginated list of target cashout orders with filters.
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = min((int) ($request->input('per_page', 15)), 100);

        $query = TargetSellOrder::query()
            ->select([
                'id',
                'public_id',
                'verification_code',
                'user_id',
                'product_id',
                'app_user_id',
                'app_username',
                'target_points',
                'rate_per_point',
                'gross_amount',
                'fee',
                'net_payout',
                'currency',
                'status',
                'created_at',
            ])
            ->with([
                'user:id,name,email,avatar',
                'product:id,name,image',
            ])
            ->latest('id');

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        if ($request->filled('search')) {
            $search = trim($request->input('search'));
            $query->where(function ($q) use ($search) {
                $q->where('public_id', 'like', "%{$search}%")
                    ->orWhere('verification_code', 'like', "%{$search}%")
                    ->orWhere('app_user_id', 'like', "%{$search}%")
                    ->orWhere('app_username', 'like', "%{$search}%")
                    ->orWhereHas('user', function ($uq) use ($search) {
                        $uq->where('name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%");
                    });
            });
        }

        $orders = $query->paginate($perPage);

        $counts = [
            'all' => TargetSellOrder::count(),
            'pending' => TargetSellOrder::where('status', TargetOrderStatus::PENDING)->count(),
            'paid' => TargetSellOrder::where('status', TargetOrderStatus::PAID)->count(),
            'rejected' => TargetSellOrder::where('status', TargetOrderStatus::REJECTED)->count(),
        ];

        return $this->successResponse([
            'orders' => $orders,
            'counts' => $counts,
        ], 'تم جلب طلبات التارجت بنجاح');
    }

    /**
     * Show single target cashout order details.
     */
    public function show(int $id): JsonResponse
    {
        $order = TargetSellOrder::query()
            ->with([
                'user:id,name,email,phone',
                'product:id,name,image',
                'reviewer:id,name',
            ])
            ->findOrFail($id);

        $proofUrl = $order->proof_image ? asset('storage/' . $order->proof_image) : null;

        return $this->successResponse([
            'order' => $order,
            'proof_url' => $proofUrl,
        ], 'تم جلب تفاصيل طلب التارجت بنجاح');
    }

    /**
     * Approve and pay target order directly into the user's wallet.
     */
    public function approve(Request $request, int $id): JsonResponse
    {
        $order = TargetSellOrder::with(['user', 'product'])->findOrFail($id);

        if ($order->status === TargetOrderStatus::PAID || $order->status === 'paid') {
            return $this->errorResponse('تم دفع هذا الطلب مسبقاً ولا يمكن تعديل حالته.', Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        try {
            $notes = $request->input('notes', 'تم التحقق من استلام التارجت واعتماد الدفع للمحفظة');
            $this->targetSellService->approveAndPay($order, $request->user(), $notes);

            return $this->successResponse([
                'id' => $order->id,
                'status' => 'paid',
                'net_payout' => $order->net_payout,
                'currency' => $order->currency,
            ], "تم اعتماد طلب التارجت (#{$order->public_id}) وإيداع مبلغ {$order->net_payout} {$order->currency} بنجاح.");
        } catch (\Throwable $e) {
            return $this->errorResponse('حدث خطأ أثناء اعتماد الطلب: ' . $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Reject target order with reason.
     */
    public function reject(Request $request, int $id): JsonResponse
    {
        $validated = $request->validate([
            'reason' => ['required', 'string', 'max:255'],
        ], [
            'reason.required' => 'سبب الرفض مطلوب لإشعار العميل.',
        ]);

        $order = TargetSellOrder::findOrFail($id);

        if ($order->status === TargetOrderStatus::PAID || $order->status === 'paid') {
            return $this->errorResponse('لا يمكن رفض طلب تم دفع مستحقاته بالفعل.', Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        try {
            $this->targetSellService->reject($order, $request->user(), $validated['reason']);

            return $this->successResponse([
                'id' => $order->id,
                'status' => 'rejected',
                'reason' => $validated['reason'],
            ], "تم رفض طلب التارجت (#{$order->public_id}) وتوثيق سبب الرفض.");
        } catch (\Throwable $e) {
            return $this->errorResponse('حدث خطأ أثناء رفض الطلب: ' . $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get target applications with rates and stats.
     */
    public function apps(Request $request): JsonResponse
    {
        $apps = Product::where('type', \App\Enums\ProductType::TARGET)
            ->with(['targetRates', 'category'])
            ->get()
            ->map(function ($app) {
                $meta = json_decode($app->description ?? '{}', true) ?: [];
                $rate = $app->targetRates->first()?->rate_per_point ?? ($meta['exchange_rate'] ?? 50);

                return [
                    'id' => $app->id,
                    'name' => $app->name,
                    'slug' => $app->slug,
                    'image' => $app->image ?: '/images/artwork/hero_card_banner.png',
                    'is_active' => (bool) $app->is_active,
                    'rate' => (float) $rate,
                    'rate_currency' => $meta['rate_currency'] ?? 'EGP',
                    'receiving_id' => $meta['receiving_id'] ?? ($app->player_id_label ?: '123456789'),
                    'payment_methods' => $meta['payment_methods'] ?? ['اتصالات كاش', 'أورانج كاش', 'محفظة الموقع'],
                ];
            });

        $stats = [
            'apps_count' => $apps->count(),
            'pending_orders' => TargetSellOrder::where('status', TargetOrderStatus::PENDING)->count(),
            'approved_orders' => TargetSellOrder::where('status', TargetOrderStatus::PAID)->count(),
        ];

        return $this->successResponse([
            'apps' => $apps,
            'stats' => $stats,
        ], 'تم جلب تطبيقات التارجت بنجاح');
    }

    /**
     * Save target application.
     */
    public function saveApp(Request $request, ?int $id = null): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'rate' => ['required', 'numeric', 'min:0.0001'],
            'receiving_id' => ['nullable', 'string', 'max:255'],
            'payment_methods' => ['nullable'],
            'image' => ['nullable'],
            'is_active' => ['nullable'],
        ]);

        $paymentMethods = $request->input('payment_methods', ['اتصالات كاش', 'أورانج كاش', 'محفظة الموقع']);
        if (!is_array($paymentMethods)) {
            $paymentMethods = [$paymentMethods];
        }

        $meta = [
            'exchange_rate' => (float) $validated['rate'],
            'rate_currency' => 'EGP',
            'receiving_id' => $validated['receiving_id'] ?? '123456789',
            'payment_methods' => $paymentMethods,
        ];

        $app = $id ? Product::findOrFail($id) : new Product();
        $app->name = $validated['name'];
        $app->type = \App\Enums\ProductType::TARGET;
        $app->description = json_encode($meta, JSON_UNESCAPED_UNICODE);
        $app->player_id_label = $meta['receiving_id'];

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('targets', 'public');
            $app->image = '/storage/' . $path;
        } elseif (!empty($validated['image']) && is_string($validated['image'])) {
            $app->image = $validated['image'];
        } elseif (!$app->image) {
            $app->image = '/images/artwork/hero_card_banner.png';
        }

        if ($request->has('is_active')) {
            $app->is_active = $request->boolean('is_active');
        }
        $app->save();

        TargetRate::updateOrCreate(
            ['product_id' => $app->id],
            [
                'min_points' => 1,
                'max_points' => 10000000,
                'rate_per_point' => (float) $validated['rate'],
                'currency' => 'EGP',
                'is_active' => true,
            ]
        );

        return $this->successResponse($app, 'تم حفظ تطبيق التارجت بنجاح');
    }

    /**
     * Toggle target app active state.
     */
    public function toggleApp(int $id): JsonResponse
    {
        $app = Product::findOrFail($id);
        $app->is_active = !$app->is_active;
        $app->save();

        return $this->successResponse([
            'id' => $app->id,
            'is_active' => $app->is_active,
        ], 'تم تعديل حالة التطبيق');
    }

    /**
     * Delete target app.
     */
    public function deleteApp(int $id): JsonResponse
    {
        $app = Product::findOrFail($id);
        $app->delete();

        return $this->successResponse(null, 'تم حذف تطبيق التارجت بنجاح');
    }
}

