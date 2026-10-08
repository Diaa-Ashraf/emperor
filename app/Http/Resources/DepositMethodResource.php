<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DepositMethodResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $locale = app()->getLocale();

        $accountNumber = $this->account_number;
        if (empty($accountNumber) && is_array($this->account_details)) {
            $accountNumber = $this->account_details['account_number'] 
                ?? $this->account_details['wallet_number'] 
                ?? $this->account_details['ipa_handle'] 
                ?? $this->account_details['trc20_address'] 
                ?? $this->account_details['cliq_alias'] 
                ?? $this->account_details['phone'] 
                ?? '';
        }

        $instruction = $this->instruction;
        if (empty($instruction) && !empty($this->instructions)) {
            $instruction = is_array($this->instructions) 
                ? ($this->instructions[$locale] ?? $this->instructions['ar'] ?? '') 
                : $this->instructions;
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'subName' => $this->sub_name ?: $this->name,
            'code' => $this->code,
            'country' => $this->country ?: 'egypt',
            'country_name' => $this->country_name ?: ($this->name),
            'tag' => $this->country_name ?: ($this->name),
            'type' => $this->type,
            'currency' => $this->currency,
            'logo' => $this->logo ? (str_starts_with($this->logo, 'http') ? $this->logo : asset($this->logo)) : null,
            'account_number' => $accountNumber ?: '',
            'note' => $this->note ?: '',
            'instruction' => $instruction ?: '',
            'min_amount' => (float) $this->min_amount,
            'max_amount' => (float) $this->max_amount,
            'fixed_fee' => (float) $this->fixed_fee,
            'percent_fee' => (float) $this->percent_fee,
            'account_details' => $this->account_details,
            'sort_order' => (int) $this->sort_order,
        ];
    }
}
