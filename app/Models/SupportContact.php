<?php

namespace App\Models;

use App\Traits\LogsAdminActivity;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupportContact extends Model
{
    use HasFactory, LogsAdminActivity;

    protected $fillable = [
        'name',
        'channel',
        'value',
        'icon',
        'description',
        'is_active',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function getChannelLabelAttribute(): string
    {
        return match ($this->channel) {
            'whatsapp' => 'واتساب WhatsApp',
            'telegram' => 'تيليجرام Telegram',
            'phone' => 'اتصال هاتفي Phone',
            'email' => 'البريد الإلكتروني Email',
            default => ucfirst($this->channel),
        };
    }

    public function getChannelIconAttribute(): string
    {
        return match ($this->channel) {
            'whatsapp' => 'ti-brand-whatsapp text-success',
            'telegram' => 'ti-brand-telegram text-info',
            'phone' => 'ti-phone text-warning',
            'email' => 'ti-mail text-danger',
            default => 'ti-headset text-warning',
        };
    }
}
