<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ReferralCommission;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class ReferralController extends Controller
{
    /**
     * Display referrals analytics and commissions ledger.
     */
    public function index(Request $request): View
    {
        $query = ReferralCommission::query()
            ->with(['referrer:id,name,email,phone', 'referredUser:id,name,email,phone'])
            ->select(['id', 'referrer_id', 'referred_user_id', 'source_type', 'source_id', 'amount', 'percentage', 'currency', 'status', 'created_at']);

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->whereHas('referrer', function ($rq) use ($search) {
                    $rq->where('name', 'like', "%{$search}%")
                       ->orWhere('email', 'like', "%{$search}%")
                       ->orWhere('phone', 'like', "%{$search}%");
                })->orWhereHas('referredUser', function ($uq) use ($search) {
                    $uq->where('name', 'like', "%{$search}%")
                       ->orWhere('email', 'like', "%{$search}%")
                       ->orWhere('phone', 'like', "%{$search}%");
                });
            });
        }

        if ($source = $request->input('source_type')) {
            $query->where('source_type', $source);
        }

        $commissions = $query->latest('id')->paginate(15)->withQueryString();

        // Top Referrers
        $topReferrers = User::whereHas('referrals')
            ->withCount('referrals')
            ->withSum('referralCommissions', 'amount')
            ->orderByDesc('referrals_count')
            ->take(5)
            ->get();

        $stats = [
            'total_commissions_paid' => (float) ReferralCommission::where('status', 'paid')->sum('amount'),
            'total_referral_rewards_count' => ReferralCommission::count(),
            'total_active_referrers' => User::whereHas('referrals')->count(),
            'total_referred_users' => User::whereNotNull('referrer_id')->count(),
        ];

        return view('admin.referrals.index', compact('commissions', 'topReferrers', 'stats'));
    }

    /**
     * Display referral system settings.
     */
    public function settings(): View
    {
        $settings = [
            'referral_is_active' => (bool) Setting::get('referral_is_active', true),
            'referral_percentage' => (float) Setting::get('referral_percentage', 2.0),
            'referral_trigger' => Setting::get('referral_trigger', 'deposit'),
            'referral_terms' => Setting::get('referral_terms', 'يحصل المحيل على نسبة عمولة تلقائية تُضاف لمحفظته فور تأكيد شحن الرصيد من قِبل الصديق المدعو.'),
        ];

        return view('admin.referrals.settings', compact('settings'));
    }

    /**
     * Update referral system configuration.
     */
    public function updateSettings(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'referral_is_active' => ['nullable', 'boolean'],
            'referral_percentage' => ['required', 'numeric', 'min:0', 'max:100'],
            'referral_trigger' => ['required', 'string', 'in:deposit,order,both'],
            'referral_terms' => ['nullable', 'string', 'max:2000'],
        ], [
            'referral_percentage.required' => 'نسبة العمولة مطلوبة.',
            'referral_percentage.numeric' => 'نسبة العمولة يجب أن تكون قيمة رقمية.',
            'referral_trigger.in' => 'شرط استحقاق العمولة غير صالح.',
        ]);

        Setting::set('referral_is_active', isset($validated['referral_is_active']) ? (bool) $validated['referral_is_active'] : false);
        Setting::set('referral_percentage', (float) $validated['referral_percentage']);
        Setting::set('referral_trigger', $validated['referral_trigger']);
        Setting::set('referral_terms', $validated['referral_terms'] ?? '');

        return back()->with('success', 'تم حفظ إعدادات نظام الإحالات والعمولات بنجاح.');
    }
}
