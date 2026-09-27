<?php

namespace App\Models;

use App\Traits\LogsAdminActivity;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PricingRule extends Model
{
    use HasFactory, LogsAdminActivity;

    protected $fillable = [
        'name',
        'priority',
        'target_type',
        'target_id',
        'margin_type',
        'margin_value',
        'is_active',
        'valid_from',
        'valid_to',
    ];

    protected function casts(): array
    {
        return [
            'priority' => 'integer',
            'margin_value' => 'decimal:4',
            'is_active' => 'boolean',
            'valid_from' => 'datetime',
            'valid_to' => 'datetime',
        ];
    }
}
