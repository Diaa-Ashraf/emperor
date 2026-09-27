<?php

namespace App\Services;

use App\Enums\PriceStrategy;
use App\Models\CatalogSource;
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

        return match ($tier->price_strategy) {
            PriceStrategy::PERCENTAGE => round($cost * (1 + (((float) $tier->margin_percent) / 100)), 2),
            PriceStrategy::FIXED_ADDITION => round($cost + (float) $tier->fixed_margin, 2),
            PriceStrategy::MANUAL => (float) $tier->final_price,
            default => (float) $tier->final_price,
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
                    'agent_price' => $tier->agent_price ?? round($newPrice * 0.98, 2),
                    'api_price' => $tier->api_price ?? round($newPrice * 0.97, 2),
                ]);
                $updatedCount++;
            }
        });

        return $updatedCount;
    }

    /**
     * Calculate customer price for a specific tier and user role.
     */
    public function getPriceForUser(ProductTier $tier, ?User $user = null): float
    {
        $basePrice = $tier->final_price > 0 ? (float) $tier->final_price : $this->calculateSellPrice($tier);

        if (!$user) {
            return $basePrice;
        }

        // Check if agent pricing applies
        if ($user->isAgent() && $tier->agent_price !== null && $tier->agent_price > 0) {
            return (float) $tier->agent_price;
        }

        // Check if API client custom override applies
        if ($user->isApiClient()) {
            $customOverride = \App\Models\ApiClientPrice::where('user_id', $user->id)
                ->where('product_tier_id', $tier->id)
                ->where('is_active', true)
                ->first();

            if ($customOverride && $customOverride->custom_price > 0) {
                return (float) $customOverride->custom_price;
            }

            if ($tier->api_price !== null && $tier->api_price > 0) {
                return (float) $tier->api_price;
            }
        }

        // Check custom pricing rules
        $rules = PricingRule::where('is_active', true)
            ->where(function ($q) {
                $q->whereNull('valid_from')->orWhere('valid_from', '<=', now());
            })
            ->where(function ($q) {
                $q->whereNull('valid_to')->orWhere('valid_to', '>=', now());
            })
            ->orderBy('priority', 'asc')
            ->get();

        foreach ($rules as $rule) {
            if ($this->ruleMatches($rule, $tier, $user)) {
                return $this->applyRule($rule, $basePrice);
            }
        }

        return $basePrice;
    }

    private function ruleMatches(PricingRule $rule, ProductTier $tier, User $user): bool
    {
        return match ($rule->target_type) {
            'all' => true,
            'role' => $user->role->value === $rule->target_id,
            'specific_user' => $user->id === (int) $rule->target_id,
            'category' => $tier->product->category_id === (int) $rule->target_id,
            'product' => $tier->product_id === (int) $rule->target_id,
            'tier' => $tier->id === (int) $rule->target_id,
            default => false,
        };
    }

    private function applyRule(PricingRule $rule, float $basePrice): float
    {
        $value = (float) $rule->margin_value;

        return match ($rule->margin_type) {
            'percentage_discount' => round($basePrice * (1 - ($value / 100)), 2),
            'percentage_markup' => round($basePrice * (1 + ($value / 100)), 2),
            'fixed_discount' => max(0, round($basePrice - $value, 2)),
            'fixed_markup' => round($basePrice + $value, 2),
            default => $basePrice,
        };
    }
}
