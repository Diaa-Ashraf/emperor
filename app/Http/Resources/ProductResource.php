<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $resolveUrl = function (?string $path) {
            if (!$path) {
                return null;
            }
            if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://') || str_starts_with($path, 'data:')) {
                return $path;
            }
            $clean = '/' . ltrim(preg_replace('#/+#', '/', $path), '/');
            if (str_starts_with($clean, '/images/')) {
                return $clean;
            }
            if (str_starts_with($clean, '/storage/')) {
                if (preg_match('#^/storage/+images/(.*)$#', $clean, $m)) {
                    return '/images/' . $m[1];
                }
                return $clean;
            }
            return '/storage/' . ltrim($clean, '/');
        };

        $firstTier = $this->whenLoaded('activeTiers', fn() => $this->activeTiers->first(), fn() => $this->whenLoaded('tiers', fn() => $this->tiers->first()));
        $pricingService = app(\App\Services\PricingService::class);
        // Public catalog endpoints still need the signed-in user's currency
        // so the displayed quote matches the price checked at order time.
        $user = $request->user() ?: Auth::guard('sanctum')->user();

        $tierResources = ProductTierResource::collection($this->whenLoaded('activeTiers', function () {
            return $this->activeTiers;
        }, function () {
            return $this->whenLoaded('tiers');
        }));

        $userPrice = $firstTier ? $pricingService->getPriceForUser($firstTier, $user) : null;
        $usdPrice = $firstTier ? $pricingService->getPriceInCurrency($firstTier, 'USD', $user) : null;
        $egpPrice = $firstTier ? $pricingService->getPriceInCurrency($firstTier, 'EGP', $user) : null;
        $providerFields = $firstTier?->metadata['provider_product_fields'] ?? [];
        $categoryType = $this->effectiveCategoryType();
        $effectiveType = match ($categoryType) {
            \App\Enums\CategoryType::VOICE_APPS => \App\Enums\ProductType::DIRECT_TOPUP,
            \App\Enums\CategoryType::CARDS => \App\Enums\ProductType::VOUCHER,
            \App\Enums\CategoryType::TARGET => \App\Enums\ProductType::TARGET,
            \App\Enums\CategoryType::TELECOM => \App\Enums\ProductType::DIRECT_TOPUP,
            default => $this->type,
        };
        $requiresPlayerId = array_key_exists('requires_player_id', $firstTier?->metadata ?? [])
            ? (bool) $firstTier->metadata['requires_player_id']
            : $effectiveType !== \App\Enums\ProductType::VOUCHER;

        return [
            'id' => $this->id,
            'parent_id' => $this->parent_id,
            'category_id' => $this->category_id,
            'category_name' => $this->category?->name,
            'name' => $this->name,
            'slug' => $this->slug,
            'type' => $effectiveType?->value,
            'type_label' => $effectiveType?->label(),
            'requires_player_id' => $requiresPlayerId,
            'description' => $this->description,
            'image_url' => $resolveUrl($this->image ?: $this->parent?->image),
            'image' => $resolveUrl($this->image ?: $this->parent?->image),
            'player_id_label' => $this->player_id_label ?: 'معرّف الحساب / Player ID',
            'player_id_validation_regex' => $this->player_id_validation_regex,
            'player_id_guide_image' => $resolveUrl($this->player_id_guide_image),
            'has_server_id' => (bool) $this->has_server_id,
            'server_id_label' => $this->server_id_label ?: 'Zone ID / Server ID',
            'server_options' => $this->server_options,
            'requires_account_region' => (bool) $this->requires_account_region,
            'region_options' => $this->region_options,
            'provider_fields' => $providerFields,
            'price' => $userPrice,
            'currency' => $user?->currency ?: 'EGP',
            'price_usd' => $usdPrice,
            'price_egp' => $egpPrice,
            'unit_price' => $userPrice,
            'min_qty' => $firstTier ? (int) ($firstTier->min_qty ?: 1) : 1,
            'max_qty' => $firstTier ? (int) ($firstTier->max_qty ?: 10000000) : 10000000,
            'is_package' => $firstTier ? ((int) ($firstTier->max_qty ?: 1) === 1 && (int) ($firstTier->min_qty ?: 1) === 1) : false,
            'variants_count' => $this->variants_count ?? $this->whenLoaded('variants', fn() => $this->variants->count(), 0),
            'variants' => ProductResource::collection($this->whenLoaded('variants')),
            'tiers' => $tierResources,
            'active_tiers' => $tierResources,
            'sort_order' => (int) $this->sort_order,
        ];
    }

    private function effectiveCategoryType(): ?\App\Enums\CategoryType
    {
        $category = $this->category;
        $type = $category?->type;
        if ($type !== null && $type !== \App\Enums\CategoryType::GAMES) {
            return $type;
        }

        $name = mb_strtolower(($category?->name ?? '') . ' ' . ($category?->slug ?? ''));
        if (str_contains($name, 'تطبيق') || str_contains($name, 'شات') || str_contains($name, 'app')) {
            return \App\Enums\CategoryType::VOICE_APPS;
        }
        if (str_contains($name, 'بطاق') || str_contains($name, 'كارت') || str_contains($name, 'كروت') || str_contains($name, 'card') || str_contains($name, 'voucher')) {
            return \App\Enums\CategoryType::CARDS;
        }
        if (str_contains($name, 'اتصالات') || str_contains($name, 'شبكات') || str_contains($name, 'telecom')) {
            return \App\Enums\CategoryType::TELECOM;
        }

        return $type;
    }
}
