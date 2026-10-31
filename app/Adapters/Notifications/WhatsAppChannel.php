<?php

namespace App\Adapters\Notifications;

use App\DTOs\NotificationPayloadDTO;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WhatsAppChannel
{
    /**
     * Send luxury WhatsApp message to user phone number.
     */
    public function send(string $phoneNumber, NotificationPayloadDTO $payload, ?string $recipientName = null): bool
    {
        $normalizedPhone = $this->normalizePhoneNumber($phoneNumber);
        if (empty($normalizedPhone)) {
            return false;
        }

        $messageText = $this->formatMessage($payload, $recipientName);

        // Fetch dynamic settings from database first, fallback to config
        $dbSettings = [];
        try {
            $dbSettings = \App\Models\Setting::whereIn('key', [
                'whatsapp_enabled',
                'whatsapp_provider',
                'whatsapp_api_token',
                'whatsapp_phone_number_id',
                'whatsapp_instance_id',
                'whatsapp_custom_endpoint',
            ])->pluck('value', 'key')->toArray();
        } catch (\Throwable $e) {}

        if (isset($dbSettings['whatsapp_enabled']) && !filter_var($dbSettings['whatsapp_enabled'], FILTER_VALIDATE_BOOLEAN)) {
            Log::info("WhatsApp notifications currently disabled in settings.");
            return false;
        }

        $provider = !empty($dbSettings['whatsapp_provider']) ? $dbSettings['whatsapp_provider'] : config('services.whatsapp.provider', 'meta');
        $apiToken = !empty($dbSettings['whatsapp_api_token']) ? $dbSettings['whatsapp_api_token'] : config('services.whatsapp.api_token');
        $phoneId = !empty($dbSettings['whatsapp_phone_number_id']) ? $dbSettings['whatsapp_phone_number_id'] : config('services.whatsapp.phone_number_id');
        $instanceId = !empty($dbSettings['whatsapp_instance_id']) ? $dbSettings['whatsapp_instance_id'] : config('services.whatsapp.instance_id');
        $customEndpoint = !empty($dbSettings['whatsapp_custom_endpoint']) ? $dbSettings['whatsapp_custom_endpoint'] : config('services.whatsapp.custom_endpoint');

        // Meta WhatsApp Business Cloud API
        if ($provider === 'meta' && !empty($apiToken) && !empty($phoneId)) {
            try {
                $response = Http::withToken($apiToken)->post("https://graph.facebook.com/v18.0/{$phoneId}/messages", [
                    'messaging_product' => 'whatsapp',
                    'recipient_type' => 'individual',
                    'to' => $normalizedPhone,
                    'type' => 'text',
                    'text' => [
                        'preview_url' => true,
                        'body' => $messageText,
                    ],
                ]);

                if ($response->successful()) {
                    Log::info("WhatsApp message sent successfully via Meta to {$normalizedPhone}");
                    return true;
                }

                Log::warning("WhatsApp send failed via Meta for {$normalizedPhone}: " . $response->body());
                return false;
            } catch (\Exception $e) {
                Log::error("WhatsApp send exception: " . $e->getMessage());
                return false;
            }
        }

        // UltraMsg Provider
        if ($provider === 'ultramsg' && !empty($apiToken) && !empty(config('services.whatsapp.instance_id'))) {
            $instanceId = config('services.whatsapp.instance_id');
            try {
                $response = Http::post("https://api.ultramsg.com/{$instanceId}/messages/chat", [
                    'token' => $apiToken,
                    'to' => $normalizedPhone,
                    'body' => $messageText,
                ]);

                if ($response->successful()) {
                    Log::info("WhatsApp message sent successfully via UltraMsg to {$normalizedPhone}");
                    return true;
                }

                Log::warning("WhatsApp send failed via UltraMsg for {$normalizedPhone}: " . $response->body());
                return false;
            } catch (\Exception $e) {
                Log::error("WhatsApp UltraMsg exception: " . $e->getMessage());
                return false;
            }
        }

        // Custom Endpoint
        $customEndpoint = config('services.whatsapp.custom_endpoint');
        if (!empty($customEndpoint)) {
            try {
                $response = Http::post($customEndpoint, [
                    'phone' => $normalizedPhone,
                    'message' => $messageText,
                    'payload' => (array) $payload,
                ]);

                return $response->successful();
            } catch (\Exception $e) {
                Log::error("WhatsApp custom endpoint exception: " . $e->getMessage());
                return false;
            }
        }

        // Development / Test Simulation
        Log::info("WhatsApp push simulated (local/test) to {$normalizedPhone}:\n{$messageText}");
        return true;
    }

    /**
     * Format a luxury Arabic message for Emperor.
     */
    public function formatMessage(NotificationPayloadDTO $payload, ?string $recipientName = null): string
    {
        $greeting = $recipientName ? "مرحباً يا {$recipientName} ✨" : "مرحباً بك في منصة سند ومهره كارد ✨";

        $lines = [
            "✨ *منصة سند ومهره كارد | Mohra & Sand Card*",
            "━━━━━━━━━━━━━━━━━━",
            $greeting,
            "",
            "📌 *{$payload->title}*",
            $payload->body,
        ];

        // Format extra data fields if present
        if (!empty($payload->data)) {
            $lines[] = "";
            if (isset($payload->data['amount'])) {
                $currency = $payload->data['currency'] ?? 'EGP';
                $lines[] = "💰 *المبلغ:* {$payload->data['amount']} {$currency}";
            }
            if (isset($payload->data['order_id'])) {
                $lines[] = "📦 *رقم الطلب:* #{$payload->data['order_id']}";
            }
            if (isset($payload->data['status'])) {
                $lines[] = "📊 *الحالة:* {$payload->data['status']}";
            }
        }

        if (!empty($payload->link)) {
            $baseUrl = config('app.url', 'https://emperor.cards');
            $fullLink = str_starts_with($payload->link, 'http') ? $payload->link : rtrim($baseUrl, '/') . '/' . ltrim($payload->link, '/');
            $lines[] = "";
            $lines[] = "🔗 *للتفاصيل والمتابعة:* {$fullLink}";
        }

        $lines[] = "━━━━━━━━━━━━━━━━━━";
        $lines[] = "✨ _شكراً لثقتكم بنا — دعمكم فخر لمنصتنا_";

        return implode("\n", $lines);
    }

    /**
     * Normalize phone number to international E.164 without leading plus.
     */
    public function normalizePhoneNumber(string $phone): string
    {
        // Strip everything except numbers
        $cleaned = preg_replace('/[^0-9]/', '', $phone);

        if (empty($cleaned)) {
            return '';
        }

        // Egyptian local 01xxxxxxxxx format -> 201xxxxxxxxx
        if (str_starts_with($cleaned, '01') && strlen($cleaned) === 11) {
            return '2' . $cleaned;
        }

        // If starts with 00, remove 00
        if (str_starts_with($cleaned, '00')) {
            $cleaned = substr($cleaned, 2);
        }

        return $cleaned;
    }
}
