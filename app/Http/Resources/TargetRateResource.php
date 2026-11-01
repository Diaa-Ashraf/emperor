<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class TargetRateResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $user = $request->user() ?: Auth::guard('sanctum')->user();
        $targetCurrency = strtoupper((string) ($user?->currency ?: ($this->currency ?: 'EGP')));
        $rate = (float) $this->rate_per_point;
        $currency = strtoupper((string) ($this->currency ?: 'EGP'));
        if ($currency !== $targetCurrency) {
            try {
                $rate = (float) app(\App\Services\ExchangeRateService::class)
                    ->calculateConversion($currency, $targetCurrency, $rate)['final_amount'];
                $currency = $targetCurrency;
            } catch (\Throwable $e) {
                // Report the configured currency rather than presenting a false conversion.
            }
        }
        return [
            'id' => $this->id,
            'min_points' => $this->min_points,
            'max_points' => $this->max_points,
            'rate_per_point' => $rate,
            'currency' => $currency,
            'is_active' => (bool) $this->is_active,
        ];
    }
}
