<?php

namespace App\Http\Resources;

use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TargetAppResource extends JsonResource
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

        $firstRate = $this->targetRates?->first();
        $rateVal = $firstRate ? (float) $firstRate->rate_per_point : 48;

        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'image_url' => $resolveUrl($this->image),
            'player_id_label' => $this->player_id_label ?? 'آيدي الحساب (App ID)',
            'agency_id' => Setting::get('target_agency_id', 'EMP-TARGET-001'),
            'rate_per_unit' => $rateVal,
            'rate_text' => $rateVal . ' EGP / دولار',
            'rates' => TargetRateResource::collection($this->whenLoaded('targetRates')),
        ];
    }
}
