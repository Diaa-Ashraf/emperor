<?php

namespace App\DTOs;

readonly class NotificationPayloadDTO
{
    public function __construct(
        public string $title,
        public string $body,
        public ?string $type = 'general', // order_status, deposit_approved, target_paid, promo
        public ?string $link = null,
        public ?string $imageUrl = null,
        public array $data = [],
    ) {}
}
