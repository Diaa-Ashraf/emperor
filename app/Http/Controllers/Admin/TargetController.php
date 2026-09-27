<?php

namespace App\Http\Controllers\Admin;

use App\Enums\CategoryType;
use App\Enums\ProductType;
use App\Enums\TargetOrderStatus;
use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Setting;
use App\Models\TargetRate;
use App\Models\TargetSellOrder;
use App\Services\TargetSellService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class TargetController extends Controller
{
    public function __construct(
        protected TargetSellService $targetSellService
    ) {}

    /**
     * Display target sell orders list.
     */
    public function index(Request $request): View
    {
        $query = TargetSellOrder::query()
            ->with(['user:id,name,email,phone', 'product:id,name,image', 'reviewer:id,name'])
            ->select([
                'id', 'public_id', 'user_id', 'product_id', 'app_user_id', 'app_username',
                'agency_id', 'target_points', 'rate_per_point', 'gross_amount', 'net_payout',
                'currency', 'proof_image', 'status', 'reviewer_id', 'created_at'
            ]);

        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        if ($productId = $request->input('product_id')) {
            $query->where('product_id', $productId);
        }

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('public_id', 'like', "%{$search}%")
                  ->orWhere('app_user_id', 'like', "%{$search}%")
                  ->orWhere('app_username', 'like', "%{$search}%")
                  ->orWhereHas('user', function ($uq) use ($search) {
                      $uq->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('phone', 'like', "%{$search}%");
                  });
            });
        }

        $orders = $query->latest('id')->paginate(15)->withQueryString();
        $targetProducts = Product::where('type', ProductType::TARGET)->select(['id', 'name'])->get();

        $counts = [
            'all' => TargetSellOrder::count(),
            'pending' => TargetSellOrder::where('status', TargetOrderStatus::PENDING)->count(),
            'paid' => TargetSellOrder::where('status', TargetOrderStatus::PAID)->count(),
            'rejected' => TargetSellOrder::where('status', TargetOrderStatus::REJECTED)->count(),
        ];

        return view('admin.targets.index', compact('orders', 'targetProducts', 'counts'));
    }

    /**
     * Display specific target sell order details.
     */
    public function show(int $id): View
    {
        $order = TargetSellOrder::with(['user.wallet', 'product.category', 'reviewer:id,name,email'])
            ->findOrFail($id);

        return view('admin.targets.show', compact('order'));
    }

    /**
     * Approve and pay target order to user's wallet.
     */
    public function approve(int $id): RedirectResponse
    {
        $order = TargetSellOrder::with(['user', 'product'])->findOrFail($id);

        if ($order->status === TargetOrderStatus::PAID) {
            return back()->with('error', 'تم دفع هذا الطلب مسبقاً.');
        }

        try {
            $this->targetSellService->approveAndPay($order, auth()->user(), 'تم التحقق من استلام التارجت واعتماد الدفع للمحفظة');
            return back()->with('success', "تم اعتماد طلب التارجت (#{$order->public_id}) وإيداع مبلغ {$order->net_payout} {$order->currency} في محفظة المستخدم بنجاح.");
        } catch (\Throwable $e) {
            return back()->with('error', 'حدث خطأ أثناء اعتماد الطلب: ' . $e->getMessage());
        }
    }

    /**
     * Reject target sell order.
     */
    public function reject(Request $request, int $id): RedirectResponse
    {
        $order = TargetSellOrder::findOrFail($id);

        if ($order->status === TargetOrderStatus::PAID) {
            return back()->with('error', 'لا يمكن رفض طلب تم دفع مستحقاته بالفعل.');
        }

        $reason = $request->input('reason', 'لم يتم استلام التارجت على معرّف الوكالة أو بيانات الحساب غير مطابقة');

        try {
            $this->targetSellService->reject($order, auth()->user(), $reason);
            return back()->with('success', "تم رفض طلب التارجت (#{$order->public_id}) وتوثيق سبب الرفض.");
        } catch (\Throwable $e) {
            return back()->with('error', 'حدث خطأ أثناء رفض الطلب: ' . $e->getMessage());
        }
    }

    /**
     * Display target selling applications & rates settings.
     */
    public function apps(): View
    {
        $apps = Product::where('type', ProductType::TARGET)
            ->with(['targetRates' => function ($q) {
                $q->orderBy('min_points', 'asc');
            }, 'category'])
            ->get();

        $defaultAgencyId = Setting::get('target_agency_id', 'EMP-AGENCY-777');

        return view('admin.targets.apps', compact('apps', 'defaultAgencyId'));
    }

    /**
     * Update target rate settings for a product.
     */
    public function updateRates(Request $request, int $productId): RedirectResponse
    {
        $product = Product::findOrFail($productId);
        $validated = $request->validate([
            'rates' => ['nullable', 'array'],
            'rates.*.min_points' => ['required', 'integer', 'min:1'],
            'rates.*.max_points' => ['required', 'integer', 'gte:rates.*.min_points'],
            'rates.*.rate_per_point' => ['required', 'numeric', 'min:0.00000001'],
            'rates.*.is_active' => ['nullable', 'boolean'],
        ]);

        TargetRate::where('product_id', $product->id)->delete();

        if (!empty($validated['rates'])) {
            foreach ($validated['rates'] as $rateData) {
                TargetRate::create([
                    'product_id' => $product->id,
                    'min_points' => $rateData['min_points'],
                    'max_points' => $rateData['max_points'],
                    'rate_per_point' => $rateData['rate_per_point'],
                    'currency' => 'EGP',
                    'is_active' => isset($rateData['is_active']) ? (bool) $rateData['is_active'] : true,
                ]);
            }
        }

        return back()->with('success', "تم تحديث أسعار تحويل التارجت لتطبيق {$product->name} بنجاح.");
    }
}
