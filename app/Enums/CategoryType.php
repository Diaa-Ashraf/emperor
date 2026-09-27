<?php

namespace App\Enums;

enum CategoryType: string
{
    case GAMES = 'games';
    case VOICE_APPS = 'voice_apps';
    case CARDS = 'cards';
    case TARGET = 'target';
    case TELECOM = 'telecom';

    public function label(): string
    {
        return match ($this) {
            self::GAMES => 'الألعاب',
            self::VOICE_APPS => 'برامج الشات الصوتي',
            self::CARDS => 'البطاقات الرقمية والاشتراكات',
            self::TARGET => 'بيع واستلام التارجت',
            self::TELECOM => 'شحن شبكات الاتصالات',
        };
    }
}
