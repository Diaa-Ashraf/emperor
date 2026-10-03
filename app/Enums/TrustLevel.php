<?php

namespace App\Enums;

enum TrustLevel: string
{
    case NEW = 'new';
    case BRONZE = 'bronze';
    case SILVER = 'silver';
    case GOLD = 'gold';
    case VIP = 'vip';

    public function label(): string
    {
        return match ($this) {
            self::NEW => 'جديد (New)',
            self::BRONZE => 'برونزي (Bronze)',
            self::SILVER => 'فضي (Silver)',
            self::GOLD => 'ذهبي (Gold)',
            self::VIP => 'ملكي (VIP)',
        };
    }

    public function autoApproveLimit(): float
    {
        return match ($this) {
            self::NEW => 0.0,
            self::BRONZE => 200.0,
            self::SILVER => 500.0,
            self::GOLD => 1500.0,
            self::VIP => 5000.0,
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::NEW => 'secondary',
            self::BRONZE => 'warning',
            self::SILVER => 'info',
            self::GOLD => 'amber',
            self::VIP => 'success',
        };
    }
}
