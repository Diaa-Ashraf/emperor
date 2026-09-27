<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TargetRateResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'min_points' => $this->min_points,
            'max_points' => $this->max_points,
            'rate_per_point' => (float) $this->rate_per_point,
            'currency' => $this->currency ?? 'EGP',
            'is_active' => (bool) $this->is_active,
        ];
    }
}
