<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PaymentMethod;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\View\View;

class PaymentMethodController extends Controller
{
    /**
     * Display a listing of payment methods and country transfers.
     */
    public function index(Request $request): View
    {
        $query = PaymentMethod::query();

        if ($request->filled('country') && $request->country !== 'all') {
            $query->where('country', $request->country);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('sub_name', 'like', "%{$search}%")
                    ->orWhere('country_name', 'like', "%{$search}%")
                    ->orWhere('currency', 'like', "%{$search}%")
                    ->orWhere('account_number', 'like', "%{$search}%");
            });
        }

        $methods = $query->orderBy('sort_order')->orderBy('id', 'desc')->paginate(20)->withQueryString();

        $allMethods = PaymentMethod::all();
        $counts = [
            'total' => $allMethods->count(),
            'active' => $allMethods->where('is_active', true)->count(),
            'inactive' => $allMethods->where('is_active', false)->count(),
            'countries' => $allMethods->pluck('country_name')->filter()->unique()->count(),
        ];

        $countriesList = $allMethods->groupBy('country')->map(function ($items, $key) {
            $first = $items->first();
            return [
                'code' => $key,
                'name' => $first->country_name ?? $key,
                'currency' => $first->currency,
                'count' => $items->count(),
            ];
        })->values();

        return view('admin.payment_methods.index', compact('methods', 'counts', 'countriesList'));
    }

    /**
     * Show the form for creating a new payment method / transfer.
     */
    public function create(): View
    {
        return view('admin.payment_methods.create');
    }

    /**
     * Store a newly created payment method in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:150'],
            'sub_name' => ['nullable', 'string', 'max:100'],
            'country_name' => ['required', 'string', 'max:100'],
            'country' => ['nullable', 'string', 'max:50'],
            'currency' => ['required', 'string', 'max:10'],
            'code' => ['nullable', 'string', 'max:50', 'unique:payment_methods,code'],
            'account_number' => ['required', 'string', 'max:255'],
            'note' => ['nullable', 'string', 'max:500'],
            'instruction' => ['nullable', 'string', 'max:1000'],
            'min_amount' => ['required', 'numeric', 'min:0'],
            'max_amount' => ['nullable', 'numeric', 'gte:min_amount'],
            'fixed_fee' => ['nullable', 'numeric', 'min:0'],
            'percent_fee' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'logo' => ['nullable', 'image', 'mimes:png,jpg,jpeg,webp,svg', 'max:2048'],
            'brand_icon' => ['nullable', 'string'],
        ], [
            'name.required' => 'يرجى إدخال اسم وسيلة الدفع',
            'country_name.required' => 'يرجى إدخال اسم التحويل أو الدولة (مثال: تحويل الأردن)',
            'currency.required' => 'يرجى إدخال كود العملة (مثال: JOD)',
            'account_number.required' => 'يرجى إدخال رقم المحفظة أو الحساب المحول إليه',
            'min_amount.required' => 'يرجى تحديد الحد الأدنى للتحويل',
        ]);

        if (empty($validated['code'])) {
            $validated['code'] = Str::slug($validated['sub_name'] ?: $validated['name'], '_') . '_' . time();
        }

        if (empty($validated['country'])) {
            $validated['country'] = Str::slug($validated['country_name'], '_') ?: 'custom';
        }

        $validated['sub_name'] = $validated['sub_name'] ?: $validated['name'];
        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['allow_deposit'] = true;
        $validated['allow_withdrawal'] = $request->boolean('allow_withdrawal', false);
        $validated['fixed_fee'] = $validated['fixed_fee'] ?? 0;
        $validated['percent_fee'] = $validated['percent_fee'] ?? 0;
        $validated['max_amount'] = $validated['max_amount'] ?? 50000;
        $validated['sort_order'] = $validated['sort_order'] ?? 0;

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('payment-methods', 'public');
            $validated['logo'] = '/storage/' . $path;
        } elseif (!empty($request->brand_icon)) {
            $validated['logo'] = $request->brand_icon;
        }

        $validated['account_details'] = [
            'account_number' => $validated['account_number'],
            'wallet_number' => $validated['account_number'],
        ];

        PaymentMethod::create($validated);

        return redirect()->route('admin.payment-methods.index')
            ->with('success', 'تمت إضافة وسيلة التحويل والدفع بنجاح وستظهر مباشرة في صفحة الشحن للعملاء.');
    }

    /**
     * Show the form for editing the specified payment method.
     */
    public function edit(int $id): View
    {
        $method = PaymentMethod::findOrFail($id);
        return view('admin.payment_methods.edit', compact('method'));
    }

    /**
     * Update the specified payment method in storage.
     */
    public function update(Request $request, int $id): RedirectResponse
    {
        $method = PaymentMethod::findOrFail($id);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:150'],
            'sub_name' => ['nullable', 'string', 'max:100'],
            'country_name' => ['required', 'string', 'max:100'],
            'country' => ['nullable', 'string', 'max:50'],
            'currency' => ['required', 'string', 'max:10'],
            'code' => ['nullable', 'string', 'max:50', 'unique:payment_methods,code,' . $method->id],
            'account_number' => ['required', 'string', 'max:255'],
            'note' => ['nullable', 'string', 'max:500'],
            'instruction' => ['nullable', 'string', 'max:1000'],
            'min_amount' => ['required', 'numeric', 'min:0'],
            'max_amount' => ['nullable', 'numeric', 'gte:min_amount'],
            'fixed_fee' => ['nullable', 'numeric', 'min:0'],
            'percent_fee' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'logo' => ['nullable', 'image', 'mimes:png,jpg,jpeg,webp,svg', 'max:2048'],
            'brand_icon' => ['nullable', 'string'],
        ], [
            'name.required' => 'يرجى إدخال اسم وسيلة الدفع',
            'country_name.required' => 'يرجى إدخال اسم التحويل أو الدولة (مثال: تحويل الأردن)',
            'currency.required' => 'يرجى إدخال كود العملة (مثال: JOD)',
            'account_number.required' => 'يرجى إدخال رقم المحفظة أو الحساب المحول إليه',
            'min_amount.required' => 'يرجى تحديد الحد الأدنى للتحويل',
        ]);

        if (empty($validated['country'])) {
            $validated['country'] = $method->country ?: (Str::slug($validated['country_name'], '_') ?: 'custom');
        }

        $validated['sub_name'] = $validated['sub_name'] ?: $validated['name'];
        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['allow_deposit'] = true;
        $validated['allow_withdrawal'] = $request->boolean('allow_withdrawal', $method->allow_withdrawal);
        $validated['fixed_fee'] = $validated['fixed_fee'] ?? 0;
        $validated['percent_fee'] = $validated['percent_fee'] ?? 0;
        $validated['max_amount'] = $validated['max_amount'] ?? $method->max_amount;
        $validated['sort_order'] = $validated['sort_order'] ?? 0;

        if ($request->hasFile('logo')) {
            if ($method->logo && str_starts_with($method->logo, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $method->logo));
            }
            $path = $request->file('logo')->store('payment-methods', 'public');
            $validated['logo'] = '/storage/' . $path;
        } elseif (!empty($request->brand_icon)) {
            $validated['logo'] = $request->brand_icon;
        }

        $validated['account_details'] = array_merge($method->account_details ?? [], [
            'account_number' => $validated['account_number'],
            'wallet_number' => $validated['account_number'],
        ]);

        $method->update($validated);

        return redirect()->route('admin.payment-methods.index')
            ->with('success', "تم تحديث وسيلة التحويل ({$method->name}) بنجاح.");
    }

    /**
     * Toggle active state.
     */
    public function toggleActive(int $id): RedirectResponse
    {
        $method = PaymentMethod::findOrFail($id);
        $method->update(['is_active' => !$method->is_active]);

        $statusMsg = $method->is_active ? 'تفعيل' : 'تعطيل';
        return back()->with('success', "تم {$statusMsg} وسيلة التحويل ({$method->name}) بنجاح.");
    }

    /**
     * Remove the specified payment method from storage.
     */
    public function destroy(int $id): RedirectResponse
    {
        $method = PaymentMethod::findOrFail($id);

        if ($method->depositRequests()->exists()) {
            $method->update(['is_active' => false]);
            return back()->with('warning', 'تم تعطيل وسيلة الدفع بدلاً من حذفها لوجود طلبات إيداع سابقة مرتبطة بها.');
        }

        if ($method->logo && str_starts_with($method->logo, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $method->logo));
        }

        $method->delete();

        return redirect()->route('admin.payment-methods.index')
            ->with('success', 'تم حذف وسيلة الدفع والتحويل بنجاح.');
    }
}
