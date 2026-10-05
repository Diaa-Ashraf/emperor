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

        if ($request->hasFile('site_logo')) {
            $logoPath = $request->file('site_logo')->store('settings', 'public');
            Setting::set('site_logo', '/storage/' . $logoPath, 'general', 'string', true);
            unset($validated['site_logo']);
        }

        if ($request->hasFile('site_favicon')) {
            $favPath = $request->file('site_favicon')->store('settings', 'public');
            Setting::set('site_favicon', '/storage/' . $favPath, 'general', 'string', true);
            unset($validated['site_favicon']);
        }

        // Handle announcement checkbox boolean
        if (!$request->has('announcement_enabled')) {
            Setting::set('announcement_enabled', '0', 'general', 'string', true);
        }

        foreach ($validated as $key => $value) {
            if (!in_array($key, ['site_logo', 'site_favicon', 'methods']) && !is_null($value)) {
                Setting::set($key, $value, 'general', 'string', true);
            }
        }

        // Also update payment methods if included in form
        if ($request->has('methods') && is_array($request->input('methods'))) {
            foreach ($request->input('methods') as $mId => $mData) {
                $method = PaymentMethod::find($mId);
                if ($method) {
                    $method->update([
                        'min_amount' => $mData['min_amount'] ?? $method->min_amount,
                        'max_amount' => $mData['max_amount'] ?? $method->max_amount,
                        'fixed_fee' => $mData['fixed_fee'] ?? $method->fixed_fee,
                        'percent_fee' => $mData['percent_fee'] ?? $method->percent_fee,
                        'account_details' => array_merge($method->account_details ?? [], $mData['account_details'] ?? []),
                    ]);
                }
            }
        }

        return back()->with('success', 'تم حفظ وتحديث جميع إعدادات المنصة وحسابات الدفع بنجاح.');
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
