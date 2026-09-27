<?php

namespace App\Listeners;

use App\DTOs\NotificationPayloadDTO;
use App\Events\OrderFailed;
use App\Jobs\SendNotificationJob;

class SendOrderFailedNotification
{
    public function handle(OrderFailed $event): void
    {
        $order = $event->order;
        $user = $order->user;

        if (!$user) {
            return;
        }

        $productName = $order->product?->name ?? 'الطلب';
        $amount = number_format((float) $order->total_amount, 2);

        $payload = new NotificationPayloadDTO(
            title: 'تعذر تنفيذ طلب الشحن وتم استرداد الرصيد ⚠️',
            body: "تعذر شحن {$productName}. تم إرجاع مبلغ {$amount} {$order->currency} لمحفظتك بالكامل.",
            type: 'order_failed',
            link: "/orders/{$order->public_id}",
            data: [
                'order_id' => $order->id,
                'public_id' => $order->public_id,
                'reason' => $event->reason,
            ]
        );

        SendNotificationJob::dispatch($user->id, $payload);
    }
}
