<?php

namespace App\Models;

use App\Enums\OrderStatus;
use App\Traits\HasPublicId;
use App\Traits\LogsAdminActivity;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    use HasFactory, HasPublicId, LogsAdminActivity;

    public const PUBLIC_ID_PREFIX = 'EMP-ORD';

    protected $fillable = [
        'public_id',
        'user_id',
        'product_id',
        'product_tier_id',
        'provider_id',
        'quantity',
        'unit_price',
        'total_amount',
        'currency',
        'cost_amount',
        'profit_amount',
        'player_id',
        'server_id',
        'account_region',
        'extra_fields',
        'status',
        'provider_order_id',
        'provider_status',
        'provider_response',
        'failure_reason',
        'retry_count',
        'channel',
        'ip_address',
        'user_agent',
    ];

    protected function casts(): array
    {
        return [
            'quantity' => 'integer',
            'unit_price' => 'decimal:2',
            'total_amount' => 'decimal:2',
            'cost_amount' => 'decimal:4',
            'profit_amount' => 'decimal:4',
            'extra_fields' => 'array',
            'status' => OrderStatus::class,
            'provider_response' => 'array',
            'retry_count' => 'integer',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
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

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function vouchers(): HasMany
    {
        return $this->hasMany(Voucher::class);
    }
}
