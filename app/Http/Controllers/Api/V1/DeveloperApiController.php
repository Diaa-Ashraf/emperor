<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class DeveloperApiController extends Controller
{
    use ApiResponse;

    /**
     * Get API credentials and developer settings for the authenticated user.
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        return $this->successResponse([
            'is_api_client' => $user->isApiClient() || $user->isAdmin(),
            'api_key' => $user->api_key,
            'has_secret' => !empty($user->api_secret),
            'api_ip_whitelist' => $user->api_ip_whitelist ?? [],
            'webhook_url' => $user->webhook_url,
            'api_rate_limit' => $user->api_rate_limit ?: 60,
            'docs_url' => url('/docs/api'),
            'base_url' => url('/api/v1/external'),
        ], 'تم جلب بيانات الربط بنجاح');
    }

    /**
     * Generate or regenerate API Key & Secret.
     */
    public function generateKeys(Request $request): JsonResponse
    {
        $user = $request->user();

        $plainKey = 'emp_live_' . Str::random(32);
        $plainSecret = 'sec_' . Str::random(48);

        $user->api_key = $plainKey;
        $user->api_secret = hash('sha256', $plainSecret);
        
        // Elevate user role to api_client if regular customer
        if ($user->role === UserRole::CUSTOMER || $user->role === 'customer') {
            $user->role = UserRole::API_CLIENT;
        }

        $user->save();

        return $this->successResponse([
            'api_key' => $plainKey,
            'api_secret' => $plainSecret, // Revealed only once upon generation
            'api_ip_whitelist' => $user->api_ip_whitelist ?? [],
            'webhook_url' => $user->webhook_url,
            'notice' => 'يرجى حفظ الـ API Secret في مكان آمن، فلن يتم إظهاره مرة أخرى.',
        ], 'تم إنشاء مفاتيح الـ API بنجاح');
    }

    /**
     * Update developer configuration (IP Whitelist, Webhook URL).
     */
    public function updateSettings(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'webhook_url' => 'nullable|url|max:255',
            'api_ip_whitelist' => 'nullable|array',
            'api_ip_whitelist.*' => 'string|max:45',
        ], [
            'webhook_url.url' => 'رابط الـ Webhook يجب أن يكون رابطاً صالحاً (URL)',
            'api_ip_whitelist.array' => 'قائمة الـ IP يجب أن تكون مصفوفة صالحة',
        ]);

        $user = $request->user();

        if (array_key_exists('webhook_url', $validated)) {
            $user->webhook_url = $validated['webhook_url'];
        }

        if (array_key_exists('api_ip_whitelist', $validated)) {
            $user->api_ip_whitelist = $validated['api_ip_whitelist'];
        }

        $user->save();

        return $this->successResponse([
            'api_ip_whitelist' => $user->api_ip_whitelist ?? [],
            'webhook_url' => $user->webhook_url,
        ], 'تم تحديث إعدادات الربط بنجاح');
    }
}
