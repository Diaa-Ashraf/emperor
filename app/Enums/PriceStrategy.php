<?php

namespace App\Enums;

enum PriceStrategy: string
{
    case PERCENTAGE = 'percentage';
    case FIXED_ADDITION = 'fixed_addition';
    case MANUAL = 'manual';

    public function label(): string
    {
        return match ($this) {
            self::PERCENTAGE => 'نسبة مئوية من سعر المصدر (%)',
            self::FIXED_ADDITION => 'مبلغ ثابت مضاف للربح',
            self::MANUAL => 'سعر محدد يدوياً',
        };
    }
}
