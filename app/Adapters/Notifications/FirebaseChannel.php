<?php

namespace App\Adapters\Notifications;

use App\DTOs\NotificationPayloadDTO;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FirebaseChannel
{
    /**
     * Send Push Notification via Firebase Cloud Messaging (FCM).
     */
    public function send(string $fcmToken, NotificationPayloadDTO $payload): bool
    {
        if (empty($fcmToken)) {
            return false;
        }

        $projectId = config('services.firebase.project_id', 'emperor-saas');
        $serverKey = config('services.firebase.server_key');

        // Legacy / Standard HTTP FCM payload
        $messageData = [
            'to' => $fcmToken,
            'notification' => [
                'title' => $payload->title,
                'body' => $payload->body,
                'image' => $payload->imageUrl,
                'sound' => 'default',
                'click_action' => $payload->link ? url($payload->link) : url('/notifications'),
            ],
            'data' => array_merge([
                'type' => $payload->type ?? 'general',
                'link' => $payload->link ?? '/notifications',
                'timestamp' => now()->toIso8601String(),
            ], array_map('strval', $payload->data)),
        ];

        // If server key is configured, dispatch HTTP request to Firebase FCM endpoint
        if (!empty($serverKey)) {
            try {
                $response = Http::withHeaders([
                    'Authorization' => 'key=' . $serverKey,
                    'Content-Type' => 'application/json',
                ])->post('https://fcm.googleapis.com/fcm/send', $messageData);

                if ($response->successful()) {
                    Log::info("FCM push sent successfully to {$fcmToken}: {$payload->title}");
                    return true;
                }

                Log::warning("FCM push failed for {$fcmToken}: " . $response->body());
                return false;
            } catch (\Exception $e) {
                Log::error("FCM push error: " . $e->getMessage());
                return false;
            }
        }

        // Development / Test mode logging
        Log::info("FCM push simulated (local/test) for {$fcmToken}: [{$payload->title}] {$payload->body}");
        return true;
    }
}
