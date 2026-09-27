<?php

namespace App\DTOs;

readonly class CatalogSyncResultDTO
{
    public function __construct(
        public bool $success,
        public int $categoriesCreated,
        public int $categoriesUpdated,
        public int $productsCreated,
        public int $productsUpdated,
        public int $tiersCreated,
        public int $tiersUpdated,
        public array $errors = [],
    ) {}
}
