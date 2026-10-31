<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class AdminSettingController extends Controller
{
    use ApiResponse;

    /**
     * Get all platform settings.
     */
    public function index(): JsonResponse
    {
        $allSettings = Setting::all()->pluck('value', 'key')->toArray();

        // Ensure defaults for critical fields
        $data = [
            'site_name' => $allSettings['site_name'] ?? 'سند ومهره كارد',
            'site_description' => $allSettings['site_description'] ?? 'خدماتك الرقمية والمالية في مكان واحد',
            'footer_slogan' => $allSettings['footer_slogan'] ?? 'سند ومهره كارد — المنصة الرائدة لشحن الألعاب والبطاقات الرقمية وبيع التارجت بأفضل الأسعار.',
            'site_logo' => $allSettings['site_logo'] ?? '/images/mohra_sand_logo.png',
            'site_favicon' => $allSettings['site_favicon'] ?? '/images/mohra_sand_logo.png',
            'whatsapp_support' => $allSettings['whatsapp_support'] ?? '+201000000000',
            'whatsapp_channel' => $allSettings['whatsapp_channel'] ?? 'https://whatsapp.com/channel/',
            'telegram_support' => $allSettings['telegram_support'] ?? 'https://t.me/',
            'support_email' => $allSettings['support_email'] ?? 'support@sm-cards.online',
            'support_phone' => $allSettings['support_phone'] ?? '',
            'working_hours' => $allSettings['working_hours'] ?? 'على مدار 24 ساعة طوال أيام الأسبوع',
            'announcement_enabled' => ($allSettings['announcement_enabled'] ?? '0') === '1' || ($allSettings['announcement_enabled'] ?? '') === 'true',
            'announcement_text' => $allSettings['announcement_text'] ?? '',
            'target_agency_id' => $allSettings['target_agency_id'] ?? 'EMP-TARGET-001',
            'target_agency_name' => $allSettings['target_agency_name'] ?? 'وكالة سند ومهره الرسمية',
            'min_wallet_deposit' => (float) ($allSettings['min_wallet_deposit'] ?? 50),
            'referral_is_active' => filter_var($allSettings['referral_is_active'] ?? true, FILTER_VALIDATE_BOOLEAN),
            'referral_percentage' => (float) ($allSettings['referral_percentage'] ?? 2.5),
            'referral_terms' => $allSettings['referral_terms'] ?? 'يحصل المحيل على نسبة عمولة تلقائية تُضاف لمحفظته فور تأكيد شحن الرصيد من قِبل الصديق المدعو.',
            'about_us_text' => $allSettings['about_us_text'] ?? '',
            'terms_conditions' => $allSettings['terms_conditions'] ?? '',
            'privacy_policy' => $allSettings['privacy_policy'] ?? '',
        ];

        return $this->successResponse($data, 'تم جلب إعدادات المنصة بنجاح');
    }

    /**
     * Update platform settings.
     */
    public function update(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'site_name' => ['nullable', 'string', 'max:150'],
            'site_description' => ['nullable', 'string', 'max:500'],
            'footer_slogan' => ['nullable', 'string', 'max:500'],
            'whatsapp_support' => ['nullable', 'string', 'max:50'],
            'whatsapp_channel' => ['nullable', 'string', 'max:255'],
            'telegram_support' => ['nullable', 'string', 'max:100'],
            'support_email' => ['nullable', 'string', 'max:100'],
            'support_phone' => ['nullable', 'string', 'max:50'],
            'working_hours' => ['nullable', 'string', 'max:150'],
            'announcement_enabled' => ['nullable'],
            'announcement_text' => ['nullable', 'string', 'max:1000'],
            'target_agency_id' => ['nullable', 'string', 'max:50'],
            'target_agency_name' => ['nullable', 'string', 'max:150'],
            'min_wallet_deposit' => ['nullable', 'numeric', 'min:1'],
            'referral_is_active' => ['nullable'],
            'referral_percentage' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'referral_terms' => ['nullable', 'string', 'max:2000'],
            'about_us_text' => ['nullable', 'string', 'max:5000'],
            'terms_conditions' => ['nullable', 'string', 'max:10000'],
            'privacy_policy' => ['nullable', 'string', 'max:10000'],
            'site_logo' => ['nullable', 'image', 'max:5120'],
            'site_favicon' => ['nullable', 'image', 'max:2048'],
        ], [
            'min_wallet_deposit.min' => 'الحد الأدنى للشحن يجب ألا يقل عن 1.',
            'referral_percentage.max' => 'نسبة عمولة الإحالة يجب ألا تتجاوز 100%.',
            'site_logo.image' => 'ملف الشعار يجب أن يكون صورة صالحة.',
            'site_favicon.image' => 'ملف أيقونة الموقع يجب أن يكون صورة صالحة.',
        ]);

        // Handle Site Logo Upload
        if ($request->hasFile('site_logo')) {
            $path = $request->file('site_logo')->store('settings', 'public');
            Setting::set('site_logo', '/storage/' . $path, 'general', 'string', true);
        }

        // Handle Site Favicon Upload
        if ($request->hasFile('site_favicon')) {
            $favPath = $request->file('site_favicon')->store('settings', 'public');
            Setting::set('site_favicon', '/storage/' . $favPath, 'general', 'string', true);
        }

        // Handle Booleans
        if ($request->has('announcement_enabled')) {
            $enabled = filter_var($request->input('announcement_enabled'), FILTER_VALIDATE_BOOLEAN) ? '1' : '0';
            Setting::set('announcement_enabled', $enabled, 'general', 'string', true);
        }

        if ($request->has('referral_is_active')) {
            $refActive = filter_var($request->input('referral_is_active'), FILTER_VALIDATE_BOOLEAN);
            Setting::set('referral_is_active', $refActive ? '1' : '0', 'general', 'boolean', true);
        }

        // Update Remaining Text/Numeric Keys
        $allowedKeys = [
            'site_name',
            'site_description',
            'footer_slogan',
            'whatsapp_support',
            'whatsapp_channel',
            'telegram_support',
            'support_email',
            'support_phone',
            'working_hours',
            'announcement_text',
            'target_agency_id',
            'target_agency_name',
            'min_wallet_deposit',
            'referral_percentage',
            'referral_terms',
            'about_us_text',
            'terms_conditions',
            'privacy_policy',
        ];

        foreach ($allowedKeys as $key) {
            if ($request->has($key)) {
                $val = $request->input($key);
                if (!is_null($val)) {
                    Setting::set($key, (string) $val, 'general', 'string', true);
                }
            }
        }

        return $this->successResponse(null, 'تم حفظ إعدادات المنصة بنجاح');
    }
}

