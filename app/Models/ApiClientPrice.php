<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ApiClientPrice extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'product_tier_id',
        'custom_price',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'custom_price' => 'decimal:2',
            'is_active' => 'boolean',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function productTier(): BelongsTo
    {
        return $this->belongsTo(ProductTier::class);
    }
}
