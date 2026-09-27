<?php

namespace App\Contracts;

use App\DTOs\CatalogSyncResultDTO;

interface CatalogSourceAdapter
{
    /**
     * Fetch all available products and categories from source.
     */
    public function fetchCatalog(): CatalogSyncResultDTO;

    /**
     * Fetch real-time price & stock for a specific product tier.
     */
    public function fetchProductDetails(string $externalProductId): array;

    /**
     * Test connection to the catalog source.
     */
    public function testConnection(): bool;
}
