<?php

namespace App\Http\Resources;

use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class TargetAppResource extends JsonResource
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

        $firstRate = $this->targetRates?->first();
        $user = $request->user() ?: Auth::guard('sanctum')->user();
        $targetCurrency = strtoupper((string) ($user?->currency ?: ($firstRate?->currency ?: 'EGP')));
        $rateVal = $firstRate ? (float) $firstRate->rate_per_point : 0.05;
        $rateCurrency = strtoupper((string) ($firstRate?->currency ?: 'EGP'));
        if ($rateCurrency !== $targetCurrency) {
            try {
                $rateVal = (float) app(\App\Services\ExchangeRateService::class)
                    ->calculateConversion($rateCurrency, $targetCurrency, $rateVal)['final_amount'];
                $rateCurrency = $targetCurrency;
            } catch (\Throwable $e) {
                // Keep the configured rate and its true currency visible if no conversion exists.
            }
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'image_url' => $resolveUrl($this->image),
            'player_id_label' => $this->player_id_label ?? 'آيدي الحساب (App ID)',
            'agency_id' => Setting::get('target_agency_id', 'EMP-TARGET-001'),
            'rate_per_unit' => $rateVal,
            'rate_currency' => $rateCurrency,
            'rate_text' => $rateVal . ' ' . $rateCurrency . ' / وحدة',
            'rates' => TargetRateResource::collection($this->whenLoaded('targetRates')),
        ];
    }
}
