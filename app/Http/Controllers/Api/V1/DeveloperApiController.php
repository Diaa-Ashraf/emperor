<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Models\Notification;
use App\Models\User;
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
        $hasAccess = $user->hasApiAccess();

        $status = $user->api_access_status ?? ($hasAccess ? 'active' : 'inactive');

        return $this->successResponse([
            'has_access' => $hasAccess,
            'api_access_status' => $status,
            'api_access_requested_at' => $user->api_access_requested_at?->toIso8601String(),
            'api_access_approved_at' => $user->api_access_approved_at?->toIso8601String(),
            'api_access_notes' => $user->api_access_notes,
            'is_api_client' => $user->isApiClient() || $user->isAdmin(),
            'api_key' => $hasAccess ? $user->api_key : null,
            'has_secret' => $hasAccess ? !empty($user->api_secret) : false,
            'api_ip_whitelist' => $hasAccess ? ($user->api_ip_whitelist ?? []) : [],
            'webhook_url' => $hasAccess ? $user->webhook_url : null,
            'api_rate_limit' => $user->api_rate_limit ?: 60,
            'docs_url' => url('/docs/api'),
            'base_url' => url('/api/v1/external'),
        ], 'تم جلب بيانات الربط البرمجي بنجاح');
    }

    /**
     * Submit a request for API activation (B2B).
     */
    public function requestAccess(Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user->hasApiAccess()) {
            return $this->successResponse([
                'api_access_status' => 'active',
            ], 'حسابك مفعل بالفعل للربط البرمجي.');
        }

        $validated = $request->validate([
            'notes' => 'nullable|string|max:1000',
            'business_name' => 'nullable|string|max:150',
            'website_url' => 'nullable|string|max:255',
        ]);

        $notes = trim(($validated['business_name'] ?? '') . ' | ' . ($validated['website_url'] ?? '') . ' | ' . ($validated['notes'] ?? ''));

        $user->api_access_status = 'pending';
        $user->api_access_requested_at = now();
        $user->api_access_notes = $notes;
        $user->save();

        // Notify Admins
        try {
            $admins = User::where('role', UserRole::ADMIN)->get();
            foreach ($admins as $admin) {
                Notification::create([
                    'user_id' => $admin->id,
                    'title' => 'طلب تفعيل ربط برمجي جديد (B2B API)',
                    'body' => "قدم العميل {$user->name} ({$user->email}) طلباً لتفعيل الربط البرمجي وتوليد التوكنات.",
                    'type' => 'api_request',
                    'data' => [
                        'user_id' => $user->id,
                        'user_name' => $user->name,
                        'notes' => $notes,
                    ],
                ]);
            }
        } catch (\Throwable $e) {
            // Ignore notification failure
        }

        return $this->successResponse([
            'api_access_status' => 'pending',
            'api_access_requested_at' => $user->api_access_requested_at->toIso8601String(),
        ], 'تم إرسال طلب تفعيل الربط البرمجي بنجاح. سيتم مراجعة طلبك وتفعيله من قِبل صاحب المنصة.');
    }

    /**
     * Generate or regenerate API Key & Secret.
     */
    public function generateKeys(Request $request): JsonResponse
    {
        $user = $request->user();

        if (!$user->hasApiAccess()) {
            return $this->errorResponse('لم يتم تفعيل صلاحية الربط البرمجي لحسابك من قِبل إدارة المنصة بعد. يرجى تقديم طلب تفعيل أو التواصل مع الإدارة.', 403);
        }

        $credentials = User::generateApiCredentials();

        $user->api_key = $credentials['api_key'];
        $user->api_secret = $credentials['hashed_secret'];
        
        // Ensure user role is api_client if not admin
        if (!$user->isAdmin()) {
            $user->role = UserRole::API_CLIENT;
        }

        $user->save();

        return $this->successResponse([
            'api_key' => $credentials['api_key'],
            'api_secret' => $credentials['raw_secret'], // Revealed only once upon generation
            'api_ip_whitelist' => $user->api_ip_whitelist ?? [],
            'webhook_url' => $user->webhook_url,
            'notice' => 'يرجى حفظ الـ API Secret في مكان آمن، فلن يتم إظهاره مرة أخرى.',
        ], 'تم إنشاء وتوليد مفاتيح الـ API بنجاح');
    }

    /**
     * Update developer configuration (IP Whitelist, Webhook URL).
     */
    public function updateSettings(Request $request): JsonResponse
    {
        $user = $request->user();

        if (!$user->hasApiAccess()) {
            return $this->errorResponse('غير مصرح لك بتعديل إعدادات الربط البرمجي قبل تفعيل الحساب.', 403);
        }

        $validated = $request->validate([
            'webhook_url' => 'nullable|url|max:255',
            'api_ip_whitelist' => 'nullable|array',
            'api_ip_whitelist.*' => 'string|max:45',
        ], [
            'webhook_url.url' => 'رابط الـ Webhook يجب أن يكون رابطاً صالحاً (URL)',
            'api_ip_whitelist.array' => 'قائمة الـ IP يجب أن تكون مصفوفة صالحة',
        ]);

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
