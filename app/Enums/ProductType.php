<?php

namespace App\Enums;

enum ProductType: string
{
    case PLAYER_ID = 'player_id';
    case VOUCHER = 'voucher';
    case TARGET = 'target';
    case DIRECT_TOPUP = 'direct_topup';

    public function label(): string
    {
        return match ($this) {
            self::PLAYER_ID => 'شحن عن طريق ID اللاعب',
            self::VOUCHER => 'كود قسيمة / بطاقة رقمية',
            self::TARGET => 'بيع واستلام تارجت',
            self::DIRECT_TOPUP => 'شحن مباشر / حساب',
        };
    }
}
