<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class CategoryResource extends JsonResource
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
            'name' => $this->name,
            'slug' => $this->slug,
            'type' => $this->type?->value,
            'type_label' => $this->type?->label(),
            'icon_url' => $resolveUrl($this->icon),
            'banner_url' => $resolveUrl($this->banner),
            'description' => $this->description,
            'products_count' => $this->whenCounted('products', $this->products_count),
            'sort_order' => (int) $this->sort_order,
        ];
    }
}
