<?php

namespace App\Listeners;

use App\DTOs\NotificationPayloadDTO;
use App\Events\DepositApproved;
use App\Jobs\SendNotificationJob;

class SendDepositApprovedNotification
{
    public function handle(DepositApproved $event): void
    {
        $deposit = $event->deposit;
        $user = $deposit->user;

        if (!$user) {
            return;
        }

        $amount = number_format((float) $deposit->amount, 2);
        $payload = new NotificationPayloadDTO(
            title: 'تم شحن محفظتك بنجاح 💰',
            body: "تم اعتماد طلب الإيداع بقيمة {$amount} {$deposit->currency} وإضافتها لرصيدك.",
            type: 'deposit_approved',
            link: '/wallet',
            data: [
                'deposit_id' => $deposit->id,
                'amount' => (float) $deposit->amount,
                'currency' => $deposit->currency,
            ]
        );

        SendNotificationJob::dispatch($user->id, $payload);
    }
}
