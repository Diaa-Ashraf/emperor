<?php

namespace App\Http\Resources;

use App\Services\PricingService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductTierResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $user = $request->user();
        $pricingService = app(PricingService::class);
        $userPrice = $pricingService->getPriceForUser($this->resource, $user);
        $targetCurrency = $user?->currency ?: 'EGP';

        $minQty = (int) ($this->min_qty ?: 1);
        $maxQty = (int) ($this->max_qty ?: 100);

        return [
            'id' => $this->id,
            'name' => $this->name,
            'sku' => $this->sku,
            'price' => (float) $userPrice,
            'price_usd' => (float) $pricingService->getPriceInCurrency($this->resource, 'USD', $user),
            'price_egp' => (float) $pricingService->getPriceInCurrency($this->resource, 'EGP', $user),
            'currency' => $targetCurrency,
            'sale_price' => $this->sale_price ? (float) $this->sale_price : null,
            'min_qty' => $minQty,
            'max_qty' => $maxQty,
            'is_package' => ($maxQty === 1 && $minQty === 1),
            'metadata' => $this->metadata,
            'in_stock' => (bool) $this->in_stock,
            'stock_qty' => (int) $this->stock_qty,
            'is_active' => (bool) $this->is_active,
            'sort_order' => (int) $this->sort_order,
        ];
    }
}
