<?php

namespace App\Models;

use App\Enums\PriceStrategy;
use App\Traits\LogsAdminActivity;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProductTier extends Model
{
    use HasFactory, LogsAdminActivity;

    protected $fillable = [
        'product_id',
        'name',
        'sku',
        'source_cost',
        'cost_currency',
        'price_strategy',
        'margin_percent',
        'fixed_margin',
        'final_price',
        'agent_price',
        'api_price',
        'sale_price',
        'min_qty',
        'max_qty',
        'in_stock',
        'stock_qty',
        'is_active',
        'sort_order',
        'metadata',
    ];

    protected function casts(): array
    {
        return [
            'price_strategy' => PriceStrategy::class,
            'source_cost' => 'decimal:4',
            'margin_percent' => 'decimal:2',
            'fixed_margin' => 'decimal:4',
            'final_price' => 'decimal:2',
            'agent_price' => 'decimal:2',
            'api_price' => 'decimal:2',
            'sale_price' => 'decimal:2',
            'min_qty' => 'integer',
            'max_qty' => 'integer',
            'in_stock' => 'boolean',
            'stock_qty' => 'integer',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
            'metadata' => 'array',
        ];
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function productProviders(): HasMany
    {
        return $this->hasMany(ProductProvider::class);
    }

    public function vouchers(): HasMany
    {
        return $this->hasMany(Voucher::class);
    }

    public function availableVouchers(): HasMany
    {
        return $this->hasMany(Voucher::class)->where('status', 'available');
    }

    /**
     * Calculate final price based on source cost and pricing strategy.
     */
    public function calculateFinalPrice(): float
    {
        $cost = (float) $this->source_cost;

        return match ($this->price_strategy) {
            PriceStrategy::PERCENTAGE => round($cost * (1 + ($this->margin_percent / 100)), 2),
            PriceStrategy::FIXED_ADDITION => round($cost + $this->fixed_margin, 2),
            PriceStrategy::MANUAL => (float) $this->final_price,
            default => (float) $this->final_price,
        };
    }
}
