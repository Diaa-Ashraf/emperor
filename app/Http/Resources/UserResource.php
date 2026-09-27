<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'role' => $this->role?->value ?? 'customer',
            'role_label' => $this->role?->label() ?? 'عميل',
            'status' => $this->status?->value ?? 'active',
            'currency' => $this->currency ?? 'EGP',
            'country' => $this->country,
            'referral_code' => $this->referral_code,
            'avatar' => $this->avatar ? asset('storage/' . $this->avatar) : null,
            'phone_verified' => $this->phone_verified_at !== null,
            'email_verified' => $this->email_verified_at !== null,
            'two_factor_enabled' => $this->two_factor_confirmed_at !== null,
            'wallet' => new WalletResource($this->whenLoaded('wallet', fn() => $this->wallet, $this->wallet()->first())),
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}
