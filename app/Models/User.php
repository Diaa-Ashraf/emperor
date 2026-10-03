<?php

namespace App\Models;

use App\Enums\UserRole;
use App\Enums\UserStatus;
use App\Traits\LogsAdminActivity;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles, SoftDeletes, LogsAdminActivity;

    protected $fillable = [
        'name',
        'email',
        'email_verified_at',
        'phone',
        'phone_verified_at',
        'password',
        'role',
        'trust_level',
        'successful_target_count',
        'rejected_target_count',
        'custom_auto_approve_limit',
        'status',
        'currency',
        'country',
        'referral_code',
        'referrer_id',
        'google_id',
        'avatar',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'two_factor_confirmed_at',
        'api_key',
        'api_secret',
        'api_ip_whitelist',
        'webhook_url',
        'api_rate_limit',
        'fcm_token',
        'preferences',
        'last_login_at',
        'last_login_ip',
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'api_secret',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'phone_verified_at' => 'datetime',
            'two_factor_confirmed_at' => 'datetime',
            'two_factor_recovery_codes' => 'array',
            'last_login_at' => 'datetime',
            'password' => 'hashed',
            'role' => UserRole::class,
            'trust_level' => \App\Enums\TrustLevel::class,
            'successful_target_count' => 'integer',
            'rejected_target_count' => 'integer',
            'custom_auto_approve_limit' => 'decimal:2',
            'status' => UserStatus::class,
            'api_ip_whitelist' => 'array',
            'preferences' => 'array',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (User $user) {
            if (empty($user->referral_code)) {
                $user->referral_code = strtoupper(substr(preg_replace('/[^a-zA-Z0-9]/', '', $user->name ?? 'EMP'), 0, 4) . rand(1000, 9999));
            }
        });
    }

    public function isAdmin(): bool
    {
        return $this->role === UserRole::ADMIN || (is_string($this->role) && $this->role === 'admin') || ($this->role instanceof UserRole && $this->role->value === 'admin');
    }

    public function isAgent(): bool
    {
        return $this->role === UserRole::AGENT || (is_string($this->role) && $this->role === 'agent') || ($this->role instanceof UserRole && $this->role->value === 'agent');
    }

    public function isCustomer(): bool
    {
        return $this->role === UserRole::CUSTOMER || (is_string($this->role) && $this->role === 'customer') || ($this->role instanceof UserRole && $this->role->value === 'customer');
    }

    public function isApiClient(): bool
    {
        return $this->role === UserRole::API_CLIENT || (is_string($this->role) && $this->role === 'api_client') || ($this->role instanceof UserRole && $this->role->value === 'api_client');
    }

    public function isActive(): bool
    {
        return $this->status === UserStatus::ACTIVE;
    }

    // Relationships
    public function wallets(): HasMany
    {
        return $this->hasMany(Wallet::class);
    }

    public function wallet(): HasOne
    {
        return $this->hasOne(Wallet::class)->where('currency', $this->currency ?? 'EGP');
    }

    public function walletTransactions(): HasMany
    {
        return $this->hasMany(WalletTransaction::class);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function depositRequests(): HasMany
    {
        return $this->hasMany(DepositRequest::class);
    }

    public function withdrawalRequests(): HasMany
    {
        return $this->hasMany(WithdrawalRequest::class);
    }

    public function targetSellOrders(): HasMany
    {
        return $this->hasMany(TargetSellOrder::class);
    }

    public function referrer(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'referrer_id');
    }

    public function referrals(): HasMany
    {
        return $this->hasMany(User::class, 'referrer_id');
    }

    public function referralCommissions(): HasMany
    {
        return $this->hasMany(ReferralCommission::class, 'referrer_id');
    }

    public function apiClientPrices(): HasMany
    {
        return $this->hasMany(ApiClientPrice::class);
    }

    /**
     * Generate API credentials (key, raw_secret, hashed_secret).
     */
    public static function generateApiCredentials(): array
    {
        $rawSecret = 'emp_sec_' . bin2hex(random_bytes(24));
        $apiKey = 'emp_key_' . bin2hex(random_bytes(16));
        $hashedSecret = hash('sha256', $rawSecret);

        return [
            'api_key' => $apiKey,
            'raw_secret' => $rawSecret, // only returned once for display
            'hashed_secret' => $hashedSecret,
        ];
    }

    public function auditLogs(): HasMany
    {
        return $this->hasMany(AuditLog::class);
    }

    public function apiLogs(): HasMany
    {
        return $this->hasMany(ApiLog::class);
    }
}
