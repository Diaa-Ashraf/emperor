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

        return [
            'id' => $this->id,
            'name' => $this->name,
            'sku' => $this->sku,
            'price' => (float) $userPrice,
            'currency' => $user?->currency ?? 'EGP',
            'sale_price' => $this->sale_price ? (float) $this->sale_price : null,
            'min_qty' => (int) ($this->min_qty ?: 1),
            'max_qty' => (int) ($this->max_qty ?: 100),
            'in_stock' => (bool) $this->in_stock,
            'stock_qty' => (int) $this->stock_qty,
            'is_active' => (bool) $this->is_active,
            'sort_order' => (int) $this->sort_order,
        ];
    }
}
