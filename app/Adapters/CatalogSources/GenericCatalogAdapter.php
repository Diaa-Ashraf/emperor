<?php

namespace App\Adapters\CatalogSources;

use App\Contracts\CatalogSourceAdapter;
use App\DTOs\CatalogSyncResultDTO;

class GenericCatalogAdapter implements CatalogSourceAdapter
{
    public function __construct(
        protected array $config = []
    ) {}

    public function fetchCatalog(): CatalogSyncResultDTO
    {
        return new CatalogSyncResultDTO(
            success: true,
            categoriesCreated: 0,
            categoriesUpdated: 0,
            productsCreated: 0,
            productsUpdated: 0,
            tiersCreated: 0,
            tiersUpdated: 0
        );
    }

    public function fetchProductDetails(string $externalProductId): array
    {
        return [];
    }

    public function testConnection(): bool
    {
        return true;
    }
}
