<?php

namespace App\Services;

use App\Contracts\CatalogSourceAdapter;
use App\DTOs\CatalogSyncResultDTO;
use App\Models\CatalogSource;
use Exception;

class CatalogSyncService
{
    /**
     * Resolve catalog source adapter.
     */
    public function resolveAdapter(string $driver, array $config = []): CatalogSourceAdapter
    {
        $className = match ($driver) {
            'real_catalog', 'hala_catalog', 'tami_catalog' => \App\Adapters\CatalogSources\RealCatalogAdapter::class,
            'ka_cards_scraper' => \App\Adapters\CatalogSources\KaCardsCatalogAdapter::class,
            default => \App\Adapters\CatalogSources\GenericCatalogAdapter::class,
        };

        if (class_exists($className)) {
            return new $className($config);
        }

        return new \App\Adapters\CatalogSources\GenericCatalogAdapter($config);
    }

    /**
     * Sync catalog from a given source.
     */
    public function syncSource(CatalogSource $source): CatalogSyncResultDTO
    {
        $source->update(['sync_status' => 'syncing']);

        try {
            $adapter = $this->resolveAdapter($source->driver, $source->config ?? []);
            $result = $adapter->fetchCatalog();

            $source->update([
                'sync_status' => $result->success ? 'success' : 'failed',
                'last_synced_at' => now(),
            ]);

            return $result;
        } catch (Exception $e) {
            $source->update(['sync_status' => 'failed']);

            return new CatalogSyncResultDTO(
                success: false,
                categoriesCreated: 0,
                categoriesUpdated: 0,
                productsCreated: 0,
                productsUpdated: 0,
                tiersCreated: 0,
                tiersUpdated: 0,
                errors: [$e->getMessage()]
            );
        }
    }
}
