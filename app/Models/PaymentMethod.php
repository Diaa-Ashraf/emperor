<?php

namespace App\Models;

use App\Traits\LogsAdminActivity;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PaymentMethod extends Model
{
    use HasFactory, LogsAdminActivity;

    protected $fillable = [
        'name',
        'sub_name',
        'code',
        'country',
        'country_name',
        'type',
        'currency',
        'logo',
        'min_amount',
        'max_amount',
        'fixed_fee',
        'percent_fee',
        'account_number',
        'note',
        'instruction',
        'account_details',
        'instructions',
        'is_active',
        'allow_deposit',
        'allow_withdrawal',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'min_amount' => 'decimal:2',
            'max_amount' => 'decimal:2',
            'fixed_fee' => 'decimal:2',
            'percent_fee' => 'decimal:2',
            'account_details' => 'array',
            'instructions' => 'array',
            'is_active' => 'boolean',
            'allow_deposit' => 'boolean',
            'allow_withdrawal' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function depositRequests(): HasMany
    {
        return $this->hasMany(DepositRequest::class);
    }

    public function withdrawalRequests(): HasMany
    {
        return $this->hasMany(WithdrawalRequest::class);
    }

    public function calculateFee(float $amount): float
    {
        return (float) ($this->fixed_fee + ($amount * ($this->percent_fee / 100)));
    }
}
