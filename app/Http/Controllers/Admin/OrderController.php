<?php

namespace App\Http\Controllers\Admin;

use App\Enums\OrderStatus;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use App\Services\OrderService;
use App\Services\ProviderManagerService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class OrderController extends Controller
{
    public function __construct(
        protected OrderService $orderService,
        protected ProviderManagerService $providerManager
    ) {}

    public function index(Request $request): View
    {
        $query = Order::query()
            ->with(['user', 'product', 'tier', 'provider'])
            ->select([
                'id', 'public_id', 'user_id', 'product_id', 'product_tier_id', 'provider_id',
                'quantity', 'unit_price', 'total_amount', 'currency', 'profit_amount',
                'player_id', 'status', 'created_at'
            ]);

        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        if ($productId = $request->input('product_id')) {
            $query->where('product_id', $productId);
        }

        if ($userId = $request->input('user_id')) {
            $query->where('user_id', $userId);
        }

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('public_id', 'like', "%{$search}%")
                  ->orWhere('player_id', 'like', "%{$search}%")
                  ->orWhereHas('user', function ($uq) use ($search) {
                      $uq->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('phone', 'like', "%{$search}%");
                  });
            });
        }

        if ($dateFrom = $request->input('date_from')) {
            $query->whereDate('created_at', '>=', $dateFrom);
        }

        if ($dateTo = $request->input('date_to')) {
            $query->whereDate('created_at', '<=', $dateTo);
        }

        $orders = $query->latest('id')->paginate(20)->withQueryString();
        $products = Product::select(['id', 'name'])->orderBy('name')->get();

        return view('admin.orders.index', compact('orders', 'products'));
    }

    public function show(int $id): View
    {
        $order = Order::with(['user.wallet', 'product.category', 'tier', 'provider', 'items'])
            ->findOrFail($id);

        return view('admin.orders.show', compact('order'));
    }

    public function retry(int $id): RedirectResponse
    {
        $order = Order::findOrFail($id);

        if (in_array($order->status, [OrderStatus::COMPLETED, OrderStatus::REFUNDED])) {
            return back()->with('error', 'لا يمكن إعادة محاولة طلب مكتمل أو مسترد بالفعل.');
        }

        $order->update([
            'status' => OrderStatus::PROCESSING,
            'retry_count' => $order->retry_count + 1,
            'failure_reason' => null,
        ]);

        $result = $this->providerManager->fulfill($order);

        if ($result->success && $result->status === 'completed') {
            $order->update(['status' => OrderStatus::COMPLETED]);
            return back()->with('success', 'تم إعادة محاولة الطلب واكتماله بنجاح من المزود.');
        } elseif ($result->success && $result->status === 'pending') {
            return back()->with('success', 'تم إرسال الطلب للمزود، والحالة قيد المعالجة حالياً.');
        }

        $order->update([
            'status' => OrderStatus::FAILED,
            'failure_reason' => $result->errorMessage ?? 'فشل التنفيذ من المزود.',
        ]);

        return back()->with('error', 'فشلت محاولة تنفيذ الطلب: ' . ($result->errorMessage ?? 'خطأ غير معروف'));
    }

    public function refund(Request $request, int $id): RedirectResponse
    {
        $order = Order::with('user')->findOrFail($id);

        if ($order->status === OrderStatus::REFUNDED) {
            return back()->with('error', 'هذا الطلب تم استرداد قيمته مسبقاً.');
        }

        $reason = $request->input('reason', 'استرداد يدوي من لوحة التحكم بواسطة الإدارة');
        $this->orderService->refundOrder($order, $reason);

        return back()->with('success', "تم استرداد مبلغ {$order->total_amount} {$order->currency} بنجاح إلى محفظة المستخدم.");
    }
}
