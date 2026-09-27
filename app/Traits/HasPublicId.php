<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait HasPublicId
{
    /**
     * Boot the trait and generate public_id automatically on creation.
     */
    protected static function bootHasPublicId(): void
    {
        static::creating(function ($model) {
            if (empty($model->public_id)) {
                $prefix = defined(static::class . '::PUBLIC_ID_PREFIX') ? static::PUBLIC_ID_PREFIX : 'EMP';
                $model->public_id = $prefix . '-' . strtoupper(Str::random(10));
            }
        });
    }

    /**
     * Scope a query to find by public ID.
     */
    public function scopeFindByPublicId($query, string $publicId)
    {
        return $query->where('public_id', $publicId);
    }
}
