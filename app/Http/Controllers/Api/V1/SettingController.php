<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    use ApiResponse;

    /**
     * Get authenticated user preferences and settings.
     */
    public function userSettings(Request $request): JsonResponse
    {
        $user = $request->user();
        $defaults = [
            'theme' => 'dark',
            'locale' => 'ar',
            'push_notifications' => true,
            'email_notifications' => true,
            'sms_notifications' => false,
        ];

        $preferences = array_merge($defaults, $user->preferences ?? []);

        return $this->successResponse([
            'preferences' => $preferences,
            'account' => [
                'currency' => $user->currency,
                'two_factor_enabled' => (bool) $user->two_factor_confirmed_at,
            ],
        ], 'تم جلب إعدادات وتفضيلات المستخدم بنجاح');
    }

    /**
     * Update authenticated user preferences and settings.
     */
    public function updateUserSettings(Request $request): JsonResponse
    {
        $user = $request->user();

        $validated = $request->validate([
            'theme' => ['nullable', 'string', 'in:dark,light,system'],
            'locale' => ['nullable', 'string', 'in:ar,en'],
            'push_notifications' => ['nullable', 'boolean'],
            'email_notifications' => ['nullable', 'boolean'],
            'sms_notifications' => ['nullable', 'boolean'],
        ], [
            'theme.in' => 'المظهر المختار غير صالح.',
            'locale.in' => 'اللغة المختارة غير مدعومة.',
        ]);

        $current = $user->preferences ?? [];
        $updated = array_merge($current, array_filter($validated, fn($v) => !is_null($v)));

        $user->update(['preferences' => $updated]);

        return $this->successResponse($updated, 'تم حفظ تفضيلات المستخدم بنجاح');
    }
}
