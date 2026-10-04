<?php

namespace App\Services;

use App\Adapters\Notifications\FirebaseChannel;
use App\Adapters\Notifications\WhatsAppChannel;
use App\DTOs\NotificationPayloadDTO;
use App\Models\User;
use Illuminate\Support\Str;

class NotificationService
{
    public function __construct(
        protected FirebaseChannel $firebaseChannel,
        protected ?WhatsAppChannel $whatsappChannel = null
    ) {}

    /**
     * Send notification to user (Database + FCM push + WhatsApp).
     */
    public function notify(User $user, NotificationPayloadDTO $payload): void
    {
        // 1. Create Laravel database notification
        $user->notifications()->create([
            'id' => (string) Str::uuid(),
            'type' => $payload->type ?? 'general',
            'data' => [
                'title' => $payload->title,
                'body' => $payload->body,
                'link' => $payload->link,
                'image_url' => $payload->imageUrl,
                'extra' => $payload->data,
            ],
        ]);

        // 2. FCM Push Notification (if device token exists)
        if (!empty($user->fcm_token)) {
            $this->firebaseChannel->send($user->fcm_token, $payload);
        }

        // 3. WhatsApp Notification (if user has phone number and channel is enabled)
        if (!empty($user->phone) && $this->whatsappChannel) {
            $this->whatsappChannel->send($user->phone, $payload, $user->name);
        }
    }
}
