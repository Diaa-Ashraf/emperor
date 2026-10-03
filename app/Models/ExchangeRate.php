<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ExchangeRate extends Model
{
    use HasFactory;

    protected $fillable = [
        'from_currency',
        'to_currency',
        'rate',
        'conversion_fee_percent',
        'is_active',
        'updated_by',
    ];

    protected function casts(): array
    {
        return [
            'rate' => 'decimal:6',
            'conversion_fee_percent' => 'decimal:2',
            'is_active' => 'boolean',
        ];
    }

    public function updatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
