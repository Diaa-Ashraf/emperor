<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Adapters\Notifications\WhatsAppChannel;
use App\DTOs\NotificationPayloadDTO;
use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminWhatsAppController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected WhatsAppChannel $whatsAppChannel
    ) {}

    /**
     * Get WhatsApp integration settings.
     */
    public function getSettings(): JsonResponse
    {
        $keys = [
            'whatsapp_enabled',
            'whatsapp_provider',
            'whatsapp_api_token',
            'whatsapp_phone_number_id',
            'whatsapp_instance_id',
            'whatsapp_custom_endpoint',
            'whatsapp_admin_phone',
            'whatsapp_notify_orders',
            'whatsapp_notify_deposits',
            'whatsapp_notify_targets',
            'whatsapp_channel',
            'whatsapp_support',
        ];

        $settings = Setting::whereIn('key', $keys)->pluck('value', 'key')->toArray();

        $data = [
            'enabled' => filter_var($settings['whatsapp_enabled'] ?? '1', FILTER_VALIDATE_BOOLEAN),
            'provider' => $settings['whatsapp_provider'] ?? config('services.whatsapp.provider', 'meta'),
            'api_token' => $settings['whatsapp_api_token'] ?? config('services.whatsapp.api_token', ''),
            'phone_number_id' => $settings['whatsapp_phone_number_id'] ?? config('services.whatsapp.phone_number_id', ''),
            'instance_id' => $settings['whatsapp_instance_id'] ?? config('services.whatsapp.instance_id', ''),
            'custom_endpoint' => $settings['whatsapp_custom_endpoint'] ?? config('services.whatsapp.custom_endpoint', ''),
            'admin_phone' => $settings['whatsapp_admin_phone'] ?? '',
            'notify_orders' => filter_var($settings['whatsapp_notify_orders'] ?? '1', FILTER_VALIDATE_BOOLEAN),
            'notify_deposits' => filter_var($settings['whatsapp_notify_deposits'] ?? '1', FILTER_VALIDATE_BOOLEAN),
            'notify_targets' => filter_var($settings['whatsapp_notify_targets'] ?? '1', FILTER_VALIDATE_BOOLEAN),
            'whatsapp_channel' => $settings['whatsapp_channel'] ?? 'https://whatsapp.com/channel/',
            'whatsapp_support' => $settings['whatsapp_support'] ?? '+201000000000',
        ];

        return $this->successResponse($data, 'تم جلب إعدادات الواتساب بنجاح');
    }

    /**
     * Save WhatsApp integration settings.
     */
    public function saveSettings(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'enabled' => ['required', 'boolean'],
            'provider' => ['required', 'string', 'in:meta,ultramsg,custom'],
            'api_token' => ['nullable', 'string', 'max:500'],
            'phone_number_id' => ['nullable', 'string', 'max:100'],
            'instance_id' => ['nullable', 'string', 'max:100'],
            'custom_endpoint' => ['nullable', 'string', 'max:500'],
            'admin_phone' => ['nullable', 'string', 'max:50'],
            'notify_orders' => ['nullable', 'boolean'],
            'notify_deposits' => ['nullable', 'boolean'],
            'notify_targets' => ['nullable', 'boolean'],
            'whatsapp_channel' => ['nullable', 'string', 'max:255'],
            'whatsapp_support' => ['nullable', 'string', 'max:50'],
        ], [
            'provider.required' => 'مزود خدمة الواتساب مطلوب',
            'provider.in' => 'المزود المختار غير صالح (meta أو ultramsg أو custom)',
        ]);

        $settingsMap = [
            'whatsapp_enabled' => $validated['enabled'] ? '1' : '0',
            'whatsapp_provider' => $validated['provider'],
            'whatsapp_api_token' => $validated['api_token'] ?? '',
            'whatsapp_phone_number_id' => $validated['phone_number_id'] ?? '',
            'whatsapp_instance_id' => $validated['instance_id'] ?? '',
            'whatsapp_custom_endpoint' => $validated['custom_endpoint'] ?? '',
            'whatsapp_admin_phone' => $validated['admin_phone'] ?? '',
            'whatsapp_notify_orders' => !empty($validated['notify_orders']) ? '1' : '0',
            'whatsapp_notify_deposits' => !empty($validated['notify_deposits']) ? '1' : '0',
            'whatsapp_notify_targets' => !empty($validated['notify_targets']) ? '1' : '0',
        ];

        if (isset($validated['whatsapp_channel'])) {
            $settingsMap['whatsapp_channel'] = $validated['whatsapp_channel'];
        }
        if (isset($validated['whatsapp_support'])) {
            $settingsMap['whatsapp_support'] = $validated['whatsapp_support'];
        }

        foreach ($settingsMap as $key => $val) {
            Setting::updateOrCreate(['key' => $key], ['value' => $val]);
        }

        return $this->successResponse(null, 'تم حفظ إعدادات الواتساب بنجاح');
    }

    /**
     * Send test WhatsApp message.
     */
    public function sendTest(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'phone' => ['required', 'string', 'min:9', 'max:20'],
            'message' => ['nullable', 'string', 'max:1000'],
        ], [
            'phone.required' => 'رقم هاتف المستلم مطلوب لإجراء الاختبار',
            'phone.min' => 'رقم الهاتف قصير جداً وغير صالح',
        ]);

        $phone = $validated['phone'];
        $customText = $validated['message'] ?? 'هذه رسالة تجريبية لتأكيد نجاح ربط بوابة الواتساب في منصة سند ومهره كارد بنجاح! 🚀';

        $payload = new NotificationPayloadDTO(
            title: 'اختبار الاتصال ببوابة الواتساب 📲',
            body: $customText,
            type: 'test',
            link: url('/'),
            data: [
                'status' => 'اتصال ناجح ومؤكد ✅',
                'time' => now()->format('Y-m-d H:i:s'),
            ]
        );

        $sent = $this->whatsAppChannel->send(
            phoneNumber: $phone,
            payload: $payload,
            recipientName: $request->user()?->name ?: 'مدير النظام'
        );

        if ($sent) {
            return $this->successResponse([
                'phone' => $phone,
                'status' => 'sent',
            ], "تم إرسال الرسالة التجريبية إلى الرقم ({$phone}) بنجاح");
        }

        return $this->errorResponse(
            "فشل إرسال الرسالة إلى ({$phone}). يرجى التحقق من صحة مفاتيح الـ API أو اتصال الإنترنت.",
            Response::HTTP_BAD_REQUEST
        );
    }
}

