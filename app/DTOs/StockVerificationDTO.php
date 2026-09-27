<?php

namespace App\DTOs;

readonly class StockVerificationDTO
{
    public function __construct(
        public bool $valid,
        public ?string $playerName = null,
        public ?string $message = null,
        public array $raw = [],
    ) {}
}
