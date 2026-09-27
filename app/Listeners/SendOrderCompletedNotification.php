<?php

namespace App\Listeners;

use App\DTOs\NotificationPayloadDTO;
use App\Events\OrderCompleted;
use App\Jobs\SendNotificationJob;

class SendOrderCompletedNotification
{
    public function handle(OrderCompleted $event): void
    {
        $order = $event->order;
        $user = $order->user;

        if (!$user) {
            return;
        }

        $productName = $order->product?->name ?? 'طلبك';
        $tierName = $order->tier?->name ?? '';

        $payload = new NotificationPayloadDTO(
            title: 'تم اكتمال طلب الشحن بنجاح! 🎮',
            body: "تم شحن {$productName} ({$tierName}) بنجاح لحسابك [{$order->player_id}].",
            type: 'order_completed',
            link: "/orders/{$order->public_id}",
            data: [
                'order_id' => $order->id,
                'public_id' => $order->public_id,
            ]
        );

        SendNotificationJob::dispatch($user->id, $payload);
    }
}
