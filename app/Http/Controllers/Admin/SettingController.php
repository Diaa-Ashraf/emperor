<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateGeneralSettingsRequest;
use App\Models\PaymentMethod;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class SettingController extends Controller
{
    /**
     * Display general and payment settings.
     */
    public function index(): View
    {
        $settings = Setting::all()->pluck('value', 'key');
        $paymentMethods = PaymentMethod::orderBy('sort_order')->get();

        return view('admin.settings.index', compact('settings', 'paymentMethods'));
    }

    /**
     * Update platform general settings.
     */
    public function updateGeneral(UpdateGeneralSettingsRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        foreach ($validated as $key => $value) {
            Setting::set($key, $value, 'general', 'string', true);
        }

        return back()->with('success', 'تم حفظ وتحديث الإعدادات العامة بنجاح.');
    }

    /**
     * Update a payment method details.
     */
    public function updatePaymentMethod(Request $request, int $id): RedirectResponse
    {
        $method = PaymentMethod::findOrFail($id);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'min_amount' => ['required', 'numeric', 'min:1'],
            'max_amount' => ['required', 'numeric', 'gte:min_amount'],
            'fixed_fee' => ['required', 'numeric', 'min:0'],
            'percent_fee' => ['required', 'numeric', 'min:0', 'max:100'],
            'account_details' => ['nullable', 'array'],
            'instructions' => ['nullable', 'array'],
            'is_active' => ['boolean'],
            'allow_deposit' => ['boolean'],
            'allow_withdrawal' => ['boolean'],
        ]);

        $validated['is_active'] = $request->has('is_active');
        $validated['allow_deposit'] = $request->has('allow_deposit');
        $validated['allow_withdrawal'] = $request->has('allow_withdrawal');

        $method->update($validated);

        return back()->with('success', "تم تحديث إعدادات طريقة الدفع ({$method->name}) بنجاح.");
    }
}
