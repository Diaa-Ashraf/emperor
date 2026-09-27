<?php

namespace App\Listeners;

use App\DTOs\NotificationPayloadDTO;
use App\Events\TargetOrderPaid;
use App\Jobs\SendNotificationJob;

class SendTargetOrderPaidNotification
{
    public function handle(TargetOrderPaid $event): void
    {
        $order = $event->order;
        $user = $order->user;

        if (!$user) {
            return;
        }

        $amount = number_format((float) $order->net_payout, 2);
        $appName = $order->product?->name ?? 'التطبيق';

        $payload = new NotificationPayloadDTO(
            title: 'تم اعتماد مستحقات بيع التارجت! 🎯💵',
            body: "تم اعتماد تحويل التارجت الخاص بك على {$appName} وإيداع مبلغ {$amount} {$order->currency} في محفظتك.",
            type: 'target_paid',
            link: '/targets',
            data: [
                'order_id' => $order->id,
                'public_id' => $order->public_id,
                'payout' => (float) $order->net_payout,
            ]
        );

        SendNotificationJob::dispatch($user->id, $payload);
    }
}
