<?php

namespace App\DTOs;

readonly class ProviderOrderResultDTO
{
    public function __construct(
        public bool $success,
        public string $status, // pending, processing, completed, failed
        public ?string $providerOrderId = null,
        public ?array $voucherCodes = null,
        public ?string $errorMessage = null,
        public array $rawResponse = [],
        public float $costAmount = 0.0,
    ) {}
}
