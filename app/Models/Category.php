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

    protected $appends = ['icon_url', 'banner_url'];

    public function getIconUrlAttribute(): ?string
    {
        if (!$this->icon) return null;
        if (str_starts_with($this->icon, 'http://') || str_starts_with($this->icon, 'https://') || str_starts_with($this->icon, 'data:')) {
            return $this->icon;
        }
        if (str_starts_with($this->icon, '/storage/')) {
            return $this->icon;
        }
        if (str_starts_with($this->icon, 'storage/')) {
            return '/' . $this->icon;
        }
        return \Illuminate\Support\Facades\Storage::url($this->icon);
    }

    public function getBannerUrlAttribute(): ?string
    {
        if (!$this->banner) return null;
        if (str_starts_with($this->banner, 'http://') || str_starts_with($this->banner, 'https://') || str_starts_with($this->banner, 'data:')) {
            return $this->banner;
        }
        if (str_starts_with($this->banner, '/storage/')) {
            return $this->banner;
        }
        if (str_starts_with($this->banner, 'storage/')) {
            return '/' . $this->banner;
        }
        return \Illuminate\Support\Facades\Storage::url($this->banner);
    }

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
