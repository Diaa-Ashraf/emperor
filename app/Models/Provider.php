<?php

namespace App\Models;

use App\Traits\LogsAdminActivity;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Provider extends Model
{
    use HasFactory, LogsAdminActivity;

    protected $fillable = [
        'name',
        'driver',
        'base_url',
        'api_key',
        'api_secret',
        'webhook_secret',
        'priority',
        'balance',
        'balance_currency',
        'is_active',
        'auto_fulfill',
        'config',
    ];

    protected $hidden = [
        'api_key',
        'api_secret',
        'webhook_secret',
    ];

    protected function casts(): array
    {
        return [
            'priority' => 'integer',
            'balance' => 'decimal:4',
            'is_active' => 'boolean',
            'auto_fulfill' => 'boolean',
            'config' => 'array',
        ];
    }

    public function productProviders(): HasMany
    {
        return $this->hasMany(ProductProvider::class);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}
