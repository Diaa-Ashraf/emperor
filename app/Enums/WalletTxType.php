<?php

namespace App\Enums;

enum WalletTxType: string
{
    case DEPOSIT = 'deposit';
    case ORDER_PAYMENT = 'order_payment';
    case REFUND = 'refund';
    case TARGET_PAYOUT = 'target_payout';
    case TRANSFER_IN = 'transfer_in';
    case TRANSFER_OUT = 'transfer_out';
    case REFERRAL_COMMISSION = 'referral_commission';
    case ADMIN_ADJUSTMENT = 'admin_adjustment';

    public function label(): string
    {
        return match ($this) {
            self::DEPOSIT => 'إيداع رصيد',
            self::ORDER_PAYMENT => 'دفع قيمة طلب',
            self::REFUND => 'استرجاع رصيد طلب ملغي',
            self::TARGET_PAYOUT => 'مستحقات بيع تارجت',
            self::TRANSFER_IN => 'تحويل وارد من مستخدم',
            self::TRANSFER_OUT => 'تحويل صادر لمستخدم',
            self::REFERRAL_COMMISSION => 'عمولة إحالة أصدقاء',
            self::ADMIN_ADJUSTMENT => 'تعديل إداري',
        };
    }

    public function isCredit(): bool
    {
        return match ($this) {
            self::DEPOSIT, self::REFUND, self::TARGET_PAYOUT, self::TRANSFER_IN, self::REFERRAL_COMMISSION => true,
            self::ORDER_PAYMENT, self::TRANSFER_OUT => false,
            self::ADMIN_ADJUSTMENT => true, // depends on amount sign
        };
    }
}
