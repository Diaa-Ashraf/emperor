<?php

namespace App\Jobs;

use App\Models\CatalogSource;
use App\Services\CatalogSyncService;
use App\Services\PricingService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class SyncProductsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public ?int $catalogSourceId = null
    ) {}

    public function handle(CatalogSyncService $syncService, PricingService $pricingService): void
    {
        if ($this->catalogSourceId) {
            $source = CatalogSource::find($this->catalogSourceId);
            if ($source && $source->is_active) {
                Log::info("Starting catalog sync for source: {$source->name}");
                $result = $syncService->syncSource($source);
                if ($result->success) {
                    $pricingService->recalculateAllPrices($source);
                }
            }
        } else {
            $sources = CatalogSource::where('is_active', true)->get();
            foreach ($sources as $source) {
                Log::info("Starting scheduled catalog sync for source: {$source->name}");
                $result = $syncService->syncSource($source);
                if ($result->success) {
                    $pricingService->recalculateAllPrices($source);
                }
            }
        }
    }
}
