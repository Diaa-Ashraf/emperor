<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class BannerResource extends JsonResource
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
            'title' => $this->title,
            'subtitle' => $this->subtitle,
            'type' => $this->type,
            'link' => $this->link,
            'old_price' => $this->old_price !== null ? (float) $this->old_price : null,
            'sale_price' => $this->sale_price !== null ? (float) $this->sale_price : null,
            'discount_badge' => $this->discount_badge,
            'claimed_percent' => $this->claimed_percent !== null ? (int) $this->claimed_percent : null,
            'remaining_items' => $this->remaining_items !== null ? (int) $this->remaining_items : null,
            'image_url' => $resolveUrl($this->image),
            'mobile_image_url' => $resolveUrl($this->mobile_image),
            'sort_order' => (int) $this->sort_order,
            'starts_at' => $this->starts_at?->toIso8601String(),
            'ends_at' => $this->ends_at?->toIso8601String(),
        ];
    }
}
