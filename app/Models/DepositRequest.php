<?php

namespace App\Models;

use App\Enums\DepositStatus;
use App\Traits\LogsAdminActivity;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DepositRequest extends Model
{
    use HasFactory, LogsAdminActivity;

    protected $fillable = [
        'user_id',
        'payment_method_id',
        'amount',
        'fee',
        'final_amount',
        'currency',
        'sender_account',
        'transaction_reference',
        'proof_image',
        'status',
        'reviewer_id',
        'reviewer_notes',
        'reviewed_at',
    ];

    protected static function booted(): void
    {
        static::creating(function (DepositRequest $deposit) {
            $deposit->fee = $deposit->fee ?? 0;
            if ($deposit->final_amount === null || $deposit->final_amount === '') {
                $deposit->final_amount = (float) $deposit->amount - (float) $deposit->fee;
            }
        });
    }

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
            'fee' => 'decimal:2',
            'final_amount' => 'decimal:2',
            'status' => DepositStatus::class,
            'reviewed_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function paymentMethod(): BelongsTo
    {
        return $this->belongsTo(PaymentMethod::class);
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewer_id');
    }
}
