<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PaymentGroup extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'currency',
        'description',
        'image',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function paymentMethods(): HasMany
    {
        return $this->hasMany(PaymentMethod::class, 'payment_group_id');
    }
}

