<?php

namespace App\Models;

use App\Enums\TargetOrderStatus;
use App\Traits\HasPublicId;
use App\Traits\LogsAdminActivity;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TargetSellOrder extends Model
{
    use HasFactory, HasPublicId, LogsAdminActivity;

    public const PUBLIC_ID_PREFIX = 'EMP-TGT';

    protected $fillable = [
        'public_id',
        'user_id',
        'product_id',
        'app_user_id',
        'app_username',
        'agency_id',
        'target_points',
        'rate_per_point',
        'gross_amount',
        'fee',
        'net_payout',
        'currency',
        'payout_method',
        'payout_details',
        'proof_image',
        'user_notes',
        'status',
        'reviewer_id',
        'reviewer_notes',
        'reviewed_at',
    ];

    protected function casts(): array
    {
        return [
            'target_points' => 'integer',
            'rate_per_point' => 'decimal:8',
            'gross_amount' => 'decimal:2',
            'fee' => 'decimal:2',
            'net_payout' => 'decimal:2',
            'payout_details' => 'array',
            'status' => TargetOrderStatus::class,
            'reviewed_at' => 'datetime',
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

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewer_id');
    }
}
