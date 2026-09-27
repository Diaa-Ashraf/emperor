<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DepositMethodResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $locale = app()->getLocale();

        return [
            'id' => $this->id,
            'name' => $this->name,
            'code' => $this->code,
            'type' => $this->type,
            'currency' => $this->currency,
            'logo' => $this->logo ? asset($this->logo) : null,
            'min_amount' => (float) $this->min_amount,
            'max_amount' => (float) $this->max_amount,
            'fixed_fee' => (float) $this->fixed_fee,
            'percent_fee' => (float) $this->percent_fee,
            'account_details' => $this->account_details,
            'instructions' => is_array($this->instructions) 
                ? ($this->instructions[$locale] ?? $this->instructions['ar'] ?? null) 
                : $this->instructions,
            'sort_order' => (int) $this->sort_order,
        ];
    }
}
