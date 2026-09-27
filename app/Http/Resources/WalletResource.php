<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WalletResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'currency' => $this->currency,
            'balance' => (float) $this->balance,
            'frozen_balance' => (float) $this->frozen_balance,
            'available_balance' => (float) $this->available_balance,
            'is_locked' => (bool) $this->is_locked,
        ];
    }
}
