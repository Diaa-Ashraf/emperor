<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ExchangeRate;
use App\Services\ExchangeRateService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class ExchangeRateController extends Controller
{
    public function __construct(
        protected ExchangeRateService $exchangeRateService
    ) {}

    /**
     * Display exchange rates list.
     */
    public function index(): View
    {
        $this->exchangeRateService->seedDefaultRates();
        $rates = ExchangeRate::with('updatedBy:id,name')->get();

        return view('admin.exchange_rates.index', compact('rates'));
    }

    /**
     * Store or update an exchange rate.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'from_currency' => ['required', 'string', 'size:3'],
            'to_currency' => ['required', 'string', 'size:3', 'different:from_currency'],
            'rate' => ['required', 'numeric', 'min:0.000001'],
            'conversion_fee_percent' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'is_active' => ['nullable', 'boolean'],
        ], [
            'from_currency.required' => 'عملة المصدر مطلوبة',
            'to_currency.required' => 'عملة الهدف مطلوبة',
            'to_currency.different' => 'لا يمكن أن تكون عملة المصدر والهدف متطابقتين',
            'rate.required' => 'سعر الصرف مطلوب',
            'rate.min' => 'سعر الصرف يجب أن يكون أكبر من 0',
        ]);

        $this->exchangeRateService->setRate(
            fromCurrency: $validated['from_currency'],
            toCurrency: $validated['to_currency'],
            rate: (float) $validated['rate'],
            feePercent: (float) ($validated['conversion_fee_percent'] ?? 0),
            isActive: isset($validated['is_active']) ? (bool) $validated['is_active'] : true,
            admin: auth()->user()
        );

        return back()->with('success', "تم حفظ سعر الصرف ({$validated['from_currency']} -> {$validated['to_currency']}) بنجاح.");
    }

    /**
     * Toggle active state.
     */
    public function toggle(int $id): RedirectResponse
    {
        $rate = ExchangeRate::findOrFail($id);
        $rate->update(['is_active' => !$rate->is_active]);

        $status = $rate->is_active ? 'تفعيل' : 'تعطيل';
        return back()->with('success', "تم {$status} سعر الصرف بنجاح.");
    }
}
