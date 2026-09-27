<?php

namespace App\Listeners;

use App\DTOs\NotificationPayloadDTO;
use App\Events\TargetOrderRejected;
use App\Jobs\SendNotificationJob;

class SendTargetOrderRejectedNotification
{
    public function handle(TargetOrderRejected $event): void
    {
        $order = $event->order;
        $user = $order->user;

        if (!$user) {
            return;
        }

        $appName = $order->product?->name ?? 'التطبيق';
        $reason = $event->reason;

        $payload = new NotificationPayloadDTO(
            title: 'تم رفض طلب بيع التارجت ⚠️',
            body: "تم رفض طلب بيع التارجت على {$appName}. السبب: {$reason}",
            type: 'target_rejected',
            link: '/targets',
            data: [
                'order_id' => $order->id,
                'public_id' => $order->public_id,
                'reason' => $reason,
            ]
        );

        SendNotificationJob::dispatch($user->id, $payload);
    }
}
