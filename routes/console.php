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

Artisan::command('providers:sync-jasser-catalog {provider_id?}', function (?int $provider_id = null) {
    $providers = \App\Models\Provider::query()
        ->whereIn('driver', ['jasser_card', 'jasser-card', 'jassercard'])
        ->when($provider_id, fn ($query) => $query->whereKey($provider_id))
        ->get();

    if ($providers->isEmpty()) {
        $this->error($provider_id ? 'المورد المحدد غير موجود أو ليس Jasser Card.' : 'لم يتم العثور على مورد Jasser Card.');
        return \Symfony\Component\Console\Command\Command::FAILURE;
    }

    $updated = 0;
    $skipped = 0;
    $providerManager = app(\App\Services\ProviderManagerService::class);

    foreach ($providers as $provider) {
        $this->line("مزامنة كتالوج {$provider->name}...");
        try {
            $adapter = $providerManager->adapterFor($provider);
            if (!method_exists($adapter, 'getProducts')) {
                throw new RuntimeException('محول المورد لا يدعم جلب الكتالوج.');
            }
            $products = collect($adapter->getProducts())->keyBy(fn ($item) => (string) ($item['id'] ?? ''));

            foreach (\App\Models\ProductTier::query()->whereNotNull('metadata')->get() as $tier) {
                $metadata = $tier->metadata ?? [];
                if ((int) ($metadata['provider_id'] ?? 0) !== (int) $provider->id) continue;

                $sku = (string) ($metadata['provider_product_id'] ?? $tier->product?->external_product_id ?? '');
                $catalogItem = $products->get($sku);
                $unitCost = (float) ($catalogItem['price'] ?? 0);
                if (!$catalogItem || $unitCost <= 0) {
                    $skipped++;
                    continue;
                }

                $minQty = max(1, (int) ($catalogItem['min_qty'] ?? 1));
                $maxQty = max($minQty, (int) ($catalogItem['max_qty'] ?? 1));
                $currency = strtoupper((string) ($catalogItem['currency'] ?? 'USD'));
                $metadata['provider_product_currency'] = $currency;

                $changes = [
                    'min_qty' => $minQty,
                    'max_qty' => $maxQty,
                    'metadata' => $metadata,
                ];
                if (!(bool) ($metadata['manual_price'] ?? false) && (bool) ($metadata['sync_pricing'] ?? true)) {
                    $margin = (float) ($tier->margin_percent > 0 ? $tier->margin_percent : 4.0);
                    $sellPrice = $unitCost * (1 + ($margin / 100));
                    $changes['source_cost'] = $unitCost;
                    $changes['cost_currency'] = $currency;
                    $changes['final_price'] = $sellPrice;
                    $changes['sale_price'] = $sellPrice;
                }

                $tier->update($changes);
                \Illuminate\Support\Facades\DB::table('product_providers')
                    ->where('provider_id', $provider->id)
                    ->where('product_tier_id', $tier->id)
                    ->update([
                        'cost_price' => $unitCost,
                        'cost_currency' => $currency,
                        'updated_at' => now(),
                    ]);
                $updated++;
            }
            $this->info("اكتملت مزامنة {$provider->name}.");
        } catch (\Throwable $e) {
            $this->error("فشلت مزامنة {$provider->name}: {$e->getMessage()}");
            return \Symfony\Component\Console\Command\Command::FAILURE;
        }
    }

    \Illuminate\Support\Facades\Cache::flush();
    $this->info("تم تحديث {$updated} ربط منتج، وتجاوز {$skipped} لعدم وجود سعر صالح في كتالوج المورد.");
    return \Symfony\Component\Console\Command\Command::SUCCESS;
})->purpose('تحديث أسعار وحدود كتالوج منتجات Jasser Card المرتبطة');

