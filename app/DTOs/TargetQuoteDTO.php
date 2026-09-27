<?php

namespace App\DTOs;

readonly class TargetQuoteDTO
{
    public function __construct(
        public int $productId,
        public int $points,
        public float $ratePerPoint,
        public float $grossAmount,
        public float $fee,
        public float $netPayout,
        public string $currency = 'EGP',
        public string $agencyId = '',
    ) {}
}
