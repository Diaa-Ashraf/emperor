<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\PricingRule;
use App\Models\Product;
use App\Models\ProductTier;
use App\Services\PricingService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class PricingRuleController extends Controller
{
    public function __construct(
        protected PricingService $pricingService
    ) {}

    public function index(): View
    {
        $rules = PricingRule::orderBy('priority', 'asc')->latest('id')->get();
        
        $categories = Category::where('is_active', true)->select(['id', 'name'])->get();
        $products = Product::where('is_active', true)->select(['id', 'name'])->get();

        $stats = [
            'total_rules' => $rules->count(),
            'active_rules' => $rules->where('is_active', true)->count(),
            'total_tiers' => ProductTier::count(),
            'manual_tiers' => ProductTier::where('price_strategy', 'manual')->count(),
            'auto_tiers' => ProductTier::where('price_strategy', '!=', 'manual')->count(),
        ];

        return view('admin.pricing.index', compact('rules', 'categories', 'products', 'stats'));
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:191',
            'target_type' => 'required|in:all,role,category,product',
            'target_id' => 'nullable|integer',
            'margin_type' => 'required|in:percentage_markup,fixed_markup,percentage_discount,fixed_discount',
            'margin_value' => 'required|numeric|min:0',
            'priority' => 'required|integer|min:1|max:999',
            'is_active' => 'sometimes|boolean',
        ], [
            'name.required' => 'يرجى إدخال اسم قاعدة التسعير.',
            'margin_value.required' => 'يرجى تحديد قيمة الهامش أو النسبة.',
        ]);

        $validated['is_active'] = $request->boolean('is_active', true);

        PricingRule::create($validated);

        return redirect()
            ->route('admin.pricing.index')
            ->with('success', 'تم إنشاء قاعدة التسعير بنجاح.');
    }

    public function toggleActive(int $id): RedirectResponse
    {
        $rule = PricingRule::findOrFail($id);
        $rule->update(['is_active' => !$rule->is_active]);

        $status = $rule->is_active ? 'تفعيل' : 'تعطيل';
        return back()->with('success', "تم {$status} قاعدة التسعير بنجاح.");
    }

    public function destroy(int $id): RedirectResponse
    {
        $rule = PricingRule::findOrFail($id);
        $rule->delete();

        return redirect()
            ->route('admin.pricing.index')
            ->with('success', 'تم حذف قاعدة التسعير بنجاح.');
    }

    public function recalculate(): RedirectResponse
    {
        $count = $this->pricingService->recalculateAllPrices();

        return redirect()
            ->route('admin.pricing.index')
            ->with('success', "تمت إعادة حساب وتحديث أسعار {$count} باقة في المتجر بنجاح بناءً على استراتيجيات وهوامش التسعير الحالية.");
    }
}
