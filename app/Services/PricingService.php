<?php

namespace App\Services;

use App\Enums\PriceStrategy;
use App\Models\CatalogSource;
use App\Models\CustomerGroup;
use App\Models\ExchangeRate;
use App\Models\PricingRule;
use App\Models\Product;
use App\Models\ProductTier;
use App\Models\User;

class PricingService
{
    /**
     * Calculate sell price for a tier based on its pricing strategy and margins.
     */
    public function calculateSellPrice(ProductTier $tier): float
    {
        $cost = (float) $tier->source_cost;
        if ($cost <= 0) {
            return (float) $tier->final_price;
        }

        $margin = (float) ($tier->margin_percent > 0 ? $tier->margin_percent : 4.0);

        return match ($tier->price_strategy) {
            PriceStrategy::PERCENTAGE => $cost * (1 + ($margin / 100)),
            PriceStrategy::FIXED_ADDITION => $cost + (float) $tier->fixed_margin,
            PriceStrategy::MANUAL => (float) $tier->final_price > 0 ? (float) $tier->final_price : $cost * 1.04,
            default => (float) $tier->final_price > 0 ? (float) $tier->final_price : $cost * (1 + ($margin / 100)),
        };
    }

    /**
     * Recalculate all tier final prices (useful after catalog source sync).
     */
    public function recalculateAllPrices(?CatalogSource $source = null): int
    {
        $query = ProductTier::query()->where('price_strategy', '!=', PriceStrategy::MANUAL);

        if ($source) {
            $query->whereHas('product', function ($q) use ($source) {
                $q->where('catalog_source_id', $source->id);
            });
        }

        $updatedCount = 0;
        $query->chunk(100, function ($tiers) use (&$updatedCount) {
            foreach ($tiers as $tier) {
                $newPrice = $this->calculateSellPrice($tier);
                $tier->update([
                    'final_price' => $newPrice,
                    'agent_price' => $tier->agent_price ?? ($newPrice * 0.98),
                    'api_price' => $tier->api_price ?? ($newPrice * 0.97),
                ]);
                $updatedCount++;
            }
        });

        return $updatedCount;
    }

    /**
     * Calculate customer price for a specific tier in user's currency considering their VIP Group / Tier.
     */
    public function getPriceForUser(ProductTier $tier, ?User $user = null): float
    {
        $targetCurrency = $user?->currency ?: 'EGP';
        return $this->getPriceInCurrency($tier, $targetCurrency, $user);
    }

    /**
     * Get tier price in specific target currency for a given user.
     */
    public function getPriceInCurrency(ProductTier $tier, string $targetCurrency, ?User $user = null): float
    {
        $cost = (float) $tier->source_cost;
        $costCurrency = strtoupper($tier->cost_currency ?: 'USD');
        $targetCurrency = strtoupper($targetCurrency ?: 'EGP');

        // Resolve cost dynamically from Embrator provider API map if cost is missing, zero, or linked to Embrator
        $provProdId = $tier->metadata['provider_product_id'] ?? $tier->product?->external_product_id ?? null;
        
        $embratorMap = \Illuminate\Support\Facades\Cache::remember('embrator_products_id_map_v3', 300, function () {
            try {
                $service = app(\App\Services\EmbratorService::class);
                $res = $service->getProducts();
                $map = [];
                if (!empty($res['products'])) {
                    foreach ($res['products'] as $p) {
                        $rawP = (float) ($p['priceUsd'] ?? $p['price'] ?? 0);
                        $map[$p['id']] = $rawP;
                        $cleanName = mb_strtolower(trim(preg_replace('/\s+/', ' ', $p['name'])));
                        $map['name_' . $cleanName] = $rawP;
                    }
                }
                return $map;
            } catch (\Throwable $e) {
                return [];
            }
        });

        if ($provProdId && isset($embratorMap[$provProdId]) && $embratorMap[$provProdId] > 0) {
            $cost = $embratorMap[$provProdId];
            $costCurrency = 'USD';
        } elseif ($cost <= 0) {
            $tierName = mb_strtolower(trim(preg_replace('/\s+/', ' ', ($tier->product?->name ?? '') . ' ' . ($tier->name ?? ''))));
            if (isset($embratorMap['name_' . $tierName]) && $embratorMap['name_' . $tierName] > 0) {
                $cost = $embratorMap['name_' . $tierName];
                $costCurrency = 'USD';
            } elseif (str_contains($tierName, 'يوهو') || str_contains($tierName, 'yoho') || str_contains($tierName, 'ياهو')) {
                $cost = 0.0001001419786794;
                $costCurrency = 'USD';
            } elseif (str_contains($tierName, 'زافا') || str_contains($tierName, 'زفا')) {
                $cost = 0.0000148679018644;
                $costCurrency = 'USD';
            } elseif (str_contains($tierName, 'بولالا')) {
                $cost = 0.00000804;
                $costCurrency = 'USD';
            } elseif (str_contains($tierName, 'سلام شات')) {
                $cost = 0.000009410123;
                $costCurrency = 'USD';
            } elseif (str_contains($tierName, 'اهلين') || str_contains($tierName, 'أهلين')) {
                $cost = 0.0017510358;
                $costCurrency = 'USD';
            } elseif (str_contains($tierName, 'جانكو') || str_contains($tierName, 'jawaker')) {
                $cost = 0.00012589445;
                $costCurrency = 'USD';
            }
        }

        // 1. Determine margin/price in cost currency
        $priceInCostCurrency = 0.0;

        // Check if user has an assigned Customer Group (VIP Shariha)
        $groupMargin = null;
        if ($user) {
            $userGroupStr = $user->preferences['vip_group'] ?? null;
            if ($userGroupStr) {
                $cg = CustomerGroup::where('name', $userGroupStr)->where('is_active', true)->first();
                if (!$cg) {
                    $cleanName = trim(preg_replace('/\s*\(.*?\)/', '', $userGroupStr));
                    $cg = CustomerGroup::where('name', $cleanName)->where('is_active', true)->first();
                }
                if ($cg) {
                    $groupMargin = (float) $cg->discount_percentage;
                } elseif (preg_match('/(\d+(?:\.\d+)?)\s*%/', $userGroupStr, $matches)) {
                    $groupMargin = (float) $matches[1];
                }
            }
        }

        // If no specific group assigned to user (or guest user), automatically assign highest active tier margin
        if ($groupMargin === null) {
            $highestTierMargin = CustomerGroup::where('is_active', true)
                ->where('discount_percentage', '>', 0)
                ->max('discount_percentage');
            $groupMargin = $highestTierMargin !== null ? (float) $highestTierMargin : 4.0;
        }

        if ($cost > 0) {
            // Apply assigned or default highest tier margin
            $appliedMargin = $groupMargin;
            $priceInCostCurrency = $cost * (1 + ($appliedMargin / 100));
        } elseif ($tier->final_price > 0) {
            $priceInCostCurrency = (float) $tier->final_price;
            if ($groupMargin !== null) {
                // Apply group discount off final price if no cost recorded
                $priceInCostCurrency = $priceInCostCurrency * (1 - ($groupMargin / 100));
            }
        } else {
            $priceInCostCurrency = $this->calculateSellPrice($tier);
        }

        // Check if agent pricing applies
        if ($user && $user->isAgent() && $tier->agent_price !== null && $tier->agent_price > 0) {
            $priceInCostCurrency = (float) $tier->agent_price;
        }

        // Check if API client custom override applies
        if ($user && $user->isApiClient()) {
            $customOverride = \App\Models\ApiClientPrice::where('user_id', $user->id)
                ->where('product_tier_id', $tier->id)
                ->where('is_active', true)
                ->first();

            if ($customOverride && $customOverride->custom_price > 0) {
                $priceInCostCurrency = (float) $customOverride->custom_price;
            } elseif ($tier->api_price !== null && $tier->api_price > 0) {
                $priceInCostCurrency = (float) $tier->api_price;
            }
        }

        // 2. Convert to Target Currency
        if ($costCurrency === $targetCurrency) {
            return $priceInCostCurrency;
        }

        // Exchange rate lookup
        $rate = ExchangeRate::where('from_currency', $costCurrency)
            ->where('to_currency', $targetCurrency)
            ->where('is_active', true)
            ->value('rate');

        if (!$rate) {
            if ($costCurrency === 'USD' && $targetCurrency === 'EGP') {
                $rate = 59.0;
            } elseif ($costCurrency === 'EGP' && $targetCurrency === 'USD') {
                $rate = 1 / 59.0;
            } else {
                $rate = 1.0;
            }
        }

        return $priceInCostCurrency * (float) $rate;
    }
}
