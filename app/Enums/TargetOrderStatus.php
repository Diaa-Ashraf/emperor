<?php

namespace App\Enums;

enum TargetOrderStatus: string
{
    case PENDING = 'pending';
    case IN_REVIEW = 'in_review';
    case VERIFIED = 'verified';
    case PAID = 'paid';
    case REJECTED = 'rejected';
    case CANCELLED = 'cancelled';

    public function label(): string
    {
        return match ($this) {
            self::PENDING => 'قيد الانتظار',
            self::IN_REVIEW => 'جاري المراجعة والتحقق',
            self::VERIFIED => 'تم التحقق من التحويل',
            self::PAID => 'تم دفع المبلغ للمحفظة',
            self::REJECTED => 'مرفوض',
            self::CANCELLED => 'ملغي',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::PENDING => 'warning',
            self::IN_REVIEW => 'info',
            self::VERIFIED => 'primary',
            self::PAID => 'success',
            self::REJECTED => 'danger',
            self::CANCELLED => 'secondary',
        };
    }
}
