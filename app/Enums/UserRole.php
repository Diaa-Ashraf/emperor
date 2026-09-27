<?php

namespace App\Enums;

enum UserRole: string
{
    case ADMIN = 'admin';
    case AGENT = 'agent';
    case CUSTOMER = 'customer';
    case API_CLIENT = 'api_client';

    public function label(): string
    {
        return match ($this) {
            self::ADMIN => 'مدير النظام',
            self::AGENT => 'وكيل / موزع',
            self::CUSTOMER => 'عميل',
            self::API_CLIENT => 'عميل API',
        };
    }
}
