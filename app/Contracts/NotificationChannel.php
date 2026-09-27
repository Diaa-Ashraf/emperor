<?php

namespace App\Contracts;

use App\DTOs\NotificationPayloadDTO;
use App\Models\User;

interface NotificationChannel
{
    /**
     * Send notification to a specific user.
     */
    public function send(User $user, NotificationPayloadDTO $payload): bool;

    /**
     * Send broadcast notification.
     */
    public function broadcast(NotificationPayloadDTO $payload, ?string $topic = null): bool;
}
