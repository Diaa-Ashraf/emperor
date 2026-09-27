<?php

namespace App\Models;

use App\Enums\CategoryType;
use App\Traits\LogsAdminActivity;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use HasFactory, SoftDeletes, LogsAdminActivity;

    protected $fillable = [
        'name',
        'slug',
        'type',
        'icon',
        'banner',
        'description',
        'is_active',
        'sort_order',
        'metadata',
    ];

    protected function casts(): array
    {
        return [
            'type' => CategoryType::class,
            'is_active' => 'boolean',
            'sort_order' => 'integer',
            'metadata' => 'array',
        ];
    }

    protected static function booted(): void
    {
        $flushCache = function () {
            \Illuminate\Support\Facades\Cache::forget('api_categories_v1_all');
            \Illuminate\Support\Facades\Cache::forget('api_categories_v1_games');
            \Illuminate\Support\Facades\Cache::forget('api_categories_v1_cards');
            \Illuminate\Support\Facades\Cache::forget('api_categories_v1_voice_apps');
            \Illuminate\Support\Facades\Cache::forget('api_categories_v1_target');
            \Illuminate\Support\Facades\Cache::forget('api_categories_v1_telecom');
        };

        static::saved($flushCache);
        static::deleted($flushCache);
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class)->orderBy('sort_order');
    }

    public function activeProducts(): HasMany
    {
        return $this->hasMany(Product::class)->where('is_active', true)->orderBy('sort_order');
    }
}
