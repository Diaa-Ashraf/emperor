<?php

use App\Jobs\SyncProductsJob;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('catalog:sync {source_id?}', function (?int $source_id = null) {
    $this->info('Starting catalog synchronization from providers...');
    $syncService = app(\App\Services\CatalogSyncService::class);
    $pricingService = app(\App\Services\PricingService::class);

    $sources = $source_id 
        ? \App\Models\CatalogSource::where('id', $source_id)->get() 
        : \App\Models\CatalogSource::where('is_active', true)->get();

    if ($sources->isEmpty()) {
        $this->warn('No active catalog sources found.');
        return;
    }

    foreach ($sources as $source) {
        $this->line("Syncing source: {$source->name} (Driver: {$source->driver})...");
        $result = $syncService->syncSource($source);
        if ($result->success) {
            $this->info("✓ Success! Created: {$result->productsCreated} products, Updated: {$result->productsUpdated} products, Tiers: {$result->tiersCreated} created.");
            $pricingService->recalculateAllPrices($source);
        } else {
            $this->error("✗ Failed! Errors: " . implode(', ', $result->errors));
        }
    }
})->purpose('Synchronize catalog products and pricing from external providers');

// Schedule hourly catalog sync
Schedule::job(new SyncProductsJob())->hourly();

