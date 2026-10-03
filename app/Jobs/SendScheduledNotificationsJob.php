<?php

namespace App\Jobs;

use App\Models\ScheduledNotification;
use App\Services\SmartNotificationService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendScheduledNotificationsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function handle(SmartNotificationService $service): void
    {
        $dueNotifications = ScheduledNotification::where('is_active', true)
            ->whereNull('sent_at')
            ->where('scheduled_at', '<=', now())
            ->get();

        foreach ($dueNotifications as $notification) {
            $service->sendToAudience($notification);
        }
    }
}
