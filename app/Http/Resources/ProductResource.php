<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $resolveUrl = function (?string $path) {
            if (!$path) {
                return null;
            }
            if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
                return $path;
            }
            return '/storage/' . ltrim($path, '/');
        };

        return [
            'id' => $this->id,
            'parent_id' => $this->parent_id,
            'category_id' => $this->category_id,
            'category_name' => $this->category?->name,
            'name' => $this->name,
            'slug' => $this->slug,
            'type' => $this->type?->value,
            'type_label' => $this->type?->label(),
            'description' => $this->description,
            'image_url' => $resolveUrl($this->image),
            'player_id_label' => $this->player_id_label ?: 'معرّف الحساب / Player ID',
            'player_id_validation_regex' => $this->player_id_validation_regex,
            'player_id_guide_image' => $resolveUrl($this->player_id_guide_image),
            'has_server_id' => (bool) $this->has_server_id,
            'server_id_label' => $this->server_id_label ?: 'Zone ID / Server ID',
            'server_options' => $this->server_options,
            'requires_account_region' => (bool) $this->requires_account_region,
            'region_options' => $this->region_options,
            'variants_count' => $this->variants_count ?? $this->whenLoaded('variants', fn() => $this->variants->count(), 0),
            'variants' => ProductResource::collection($this->whenLoaded('variants')),
            'tiers' => ProductTierResource::collection($this->whenLoaded('activeTiers', function () {
                return $this->activeTiers;
            }, function () {
                return $this->whenLoaded('tiers');
            })),
            'sort_order' => (int) $this->sort_order,
        ];
    }
}
