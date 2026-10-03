<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ScheduledNotification extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'body',
        'type',
        'target_audience',
        'target_user_ids',
        'segment_rules',
        'action_url',
        'image_url',
        'scheduled_at',
        'sent_at',
        'sent_count',
        'is_active',
        'created_by',
    ];

    protected function casts(): array
    {
        return [
            'target_user_ids' => 'array',
            'segment_rules' => 'array',
            'scheduled_at' => 'datetime',
            'sent_at' => 'datetime',
            'is_active' => 'boolean',
            'sent_count' => 'integer',
        ];
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
