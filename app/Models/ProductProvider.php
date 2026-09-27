<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductProvider extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'product_tier_id',
        'provider_id',
        'provider_sku',
        'priority',
        'cost_price',
        'cost_currency',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'priority' => 'integer',
            'cost_price' => 'decimal:4',
            'is_active' => 'boolean',
        ];
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function tier(): BelongsTo
    {
        return $this->belongsTo(ProductTier::class, 'product_tier_id');
    }

    public function provider(): BelongsTo
    {
        return $this->belongsTo(Provider::class);
    }
}
