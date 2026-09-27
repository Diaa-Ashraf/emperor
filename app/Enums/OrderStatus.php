<?php

namespace App\Enums;

enum OrderStatus: string
{
    case PENDING = 'pending';
    case PROCESSING = 'processing';
    case COMPLETED = 'completed';
    case FAILED = 'failed';
    case REFUNDED = 'refunded';
    case MANUAL_REVIEW = 'manual_review';

    public function label(): string
    {
        return match ($this) {
            self::PENDING => 'قيد الانتظار',
            self::PROCESSING => 'جاري المعالجة',
            self::COMPLETED => 'مكتمل بنجاح',
            self::FAILED => 'فشل التنفيذ',
            self::REFUNDED => 'مسترجع للمحفظة',
            self::MANUAL_REVIEW => 'مراجعة يدوية',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::PENDING => 'warning',
            self::PROCESSING => 'info',
            self::COMPLETED => 'success',
            self::FAILED => 'danger',
            self::REFUNDED => 'secondary',
            self::MANUAL_REVIEW => 'primary',
        };
    }
}
