<?php

namespace App\Models;

use App\Enums\ProductType;
use App\Traits\LogsAdminActivity;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes, LogsAdminActivity;

    protected $fillable = [
        'category_id',
        'catalog_source_id',
        'external_product_id',
        'name',
        'slug',
        'description',
        'image',
        'type',
        'player_id_label',
        'player_id_validation_regex',
        'player_id_guide_image',
        'has_server_id',
        'server_id_label',
        'server_options',
        'requires_account_region',
        'region_options',
        'is_active',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'type' => ProductType::class,
            'has_server_id' => 'boolean',
            'server_options' => 'array',
            'requires_account_region' => 'boolean',
            'region_options' => 'array',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function catalogSource(): BelongsTo
    {
        return $this->belongsTo(CatalogSource::class);
    }

    public function tiers(): HasMany
    {
        return $this->hasMany(ProductTier::class)->orderBy('sort_order');
    }

    public function activeTiers(): HasMany
    {
        return $this->hasMany(ProductTier::class)->where('is_active', true)->orderBy('sort_order');
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function vouchers(): HasMany
    {
        return $this->hasMany(Voucher::class);
    }

    public function targetRates(): HasMany
    {
        return $this->hasMany(TargetRate::class);
    }

    public function targetSellOrders(): HasMany
    {
        return $this->hasMany(TargetSellOrder::class);
    }
}
