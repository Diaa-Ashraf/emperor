<?php

namespace App\Jobs;

use App\DTOs\NotificationPayloadDTO;
use App\Models\User;
use App\Services\NotificationService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendNotificationJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public int $userId,
        public NotificationPayloadDTO $payload
    ) {}

    public function handle(NotificationService $notificationService): void
    {
        $user = User::find($this->userId);
        if ($user) {
            $notificationService->notify($user, $this->payload);
        }
    }
}
