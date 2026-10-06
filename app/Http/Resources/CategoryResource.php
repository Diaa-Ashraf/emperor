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
            // If it's just an icon name (no slash and no image extension), it's an icon identifier, not a file URL
            if (!str_contains($path, '/') && !preg_match('/\.(png|jpe?g|svg|webp|gif|ico|avif)$/i', $path)) {
                return null;
            }
            return '/storage/' . ltrim($path, '/');
        };

        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'type' => $this->type?->value,
            'type_label' => $this->type?->label(),
            'icon' => $this->icon,
            'icon_url' => $resolveUrl($this->icon),
            'banner_url' => $resolveUrl($this->banner),
            'description' => $this->description,
            'products_count' => $this->whenCounted('products', $this->products_count),
            'sort_order' => (int) $this->sort_order,
        ];
    }
}
