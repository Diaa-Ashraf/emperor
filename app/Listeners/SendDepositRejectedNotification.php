<?php

namespace App\Listeners;

use App\DTOs\NotificationPayloadDTO;
use App\Events\DepositRejected;
use App\Jobs\SendNotificationJob;

class SendDepositRejectedNotification
{
    public function handle(DepositRejected $event): void
    {
        $deposit = $event->deposit;
        $user = $deposit->user;

        if (!$user) {
            return;
        }

        $amount = number_format((float) $deposit->amount, 2);
        $reason = $deposit->reviewer_notes ?: 'بيانات التحويل غير مطابقة';

        $payload = new NotificationPayloadDTO(
            title: 'تم رفض طلب الإيداع ⚠️',
            body: "تم رفض طلب إيداع {$amount} {$deposit->currency}. السبب: {$reason}",
            type: 'deposit_rejected',
            link: '/wallet',
            data: [
                'deposit_id' => $deposit->id,
                'reason' => $reason,
            ]
        );

        SendNotificationJob::dispatch($user->id, $payload);
    }
}
