<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $isAdmin = (bool) ($this->isAdmin() || ($this->role?->value ?? $this->role) === 'admin' || (method_exists($this, 'hasRole') && $this->hasRole(['admin', 'super_admin'])));
        $isStaff = $isAdmin || (method_exists($this, 'hasRole') && $this->hasRole(['operations_manager', 'finance_manager', 'support_agent']));

        $roles = [];
        if (method_exists($this, 'getRoleNames')) {
            try {
                $roles = $this->getRoleNames()->toArray();
            } catch (\Throwable $e) {
                $roles = [];
            }
        }
        if (empty($roles) && $this->role) {
            $roles = [$this->role?->value ?? (string) $this->role];
        }

        $permissions = [];
        if (method_exists($this, 'getAllPermissions')) {
            try {
                $permissions = $this->getAllPermissions()->pluck('name')->toArray();
            } catch (\Throwable $e) {
                $permissions = [];
            }
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'role' => $this->role?->value ?? 'customer',
            'role_label' => $this->role?->label() ?? 'عميل',
            'is_admin' => $isAdmin,
            'is_staff' => $isStaff,
            'can_access_admin' => ($isAdmin || $isStaff),
            'roles' => $roles,
            'permissions' => $permissions,
            'api_access_status' => $this->api_access_status ?? ($this->role?->value === 'api_client' || $isAdmin ? 'active' : 'inactive'),
            'has_api_access' => (bool) (($this->api_access_status ?? '') === 'active' || ($this->role?->value ?? $this->role) === 'api_client' || $isAdmin),
            'api_key' => ($isAdmin || $this->hasApiAccess()) ? $this->api_key : null,
            'status' => $this->status?->value ?? 'active',
            'currency' => $this->currency ?? 'EGP',
            'country' => $this->country,
            'referral_code' => $this->referral_code,
            'avatar' => $this->avatar ? asset('storage/' . $this->avatar) : null,
            'phone_verified' => $this->phone_verified_at !== null,
            'email_verified' => $this->email_verified_at !== null,
            'two_factor_enabled' => $this->two_factor_confirmed_at !== null,
            'trust_level' => $this->trust_level instanceof \App\Enums\TrustLevel ? $this->trust_level->value : ($this->trust_level ?? 'new'),
            'trust_level_label' => $this->trust_level instanceof \App\Enums\TrustLevel ? $this->trust_level->label() : (\App\Enums\TrustLevel::tryFrom((string)$this->trust_level)?->label() ?? 'جديد'),
            'successful_target_count' => (int) ($this->successful_target_count ?? 0),
            'rejected_target_count' => (int) ($this->rejected_target_count ?? 0),
            'wallet' => new WalletResource($this->whenLoaded('wallet', fn() => $this->wallet, $this->wallet()->first())),
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}
