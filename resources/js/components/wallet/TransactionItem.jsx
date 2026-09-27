import React from 'react';
import { ArrowDownLeft, ArrowUpRight, RefreshCw, Gift, DollarSign, ShieldAlert, Sparkles } from 'lucide-react';

export default function TransactionItem({ transaction }) {
    if (!transaction) return null;

    const isCredit = Number(transaction.amount) > 0;
    const amount = Math.abs(Number(transaction.amount)).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    const balanceAfter = Number(transaction.balance_after || 0).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    const getTypeConfig = (type) => {
        switch (type) {
            case 'deposit':
                return {
                    label: 'إيداع رصيد',
                    icon: ArrowDownLeft,
                    color: '#22C55E',
                    bg: 'rgba(34, 197, 94, 0.15)',
                    border: 'rgba(34, 197, 94, 0.3)',
                };
            case 'order_payment':
            case 'purchase':
                return {
                    label: 'شحن طلب / لعبة',
                    icon: ArrowUpRight,
                    color: '#EF4444',
                    bg: 'rgba(239, 68, 68, 0.15)',
                    border: 'rgba(239, 68, 68, 0.3)',
                };
            case 'order_refund':
            case 'refund':
                return {
                    label: 'استرداد قيمة طلب',
                    icon: RefreshCw,
                    color: '#38BDF8',
                    bg: 'rgba(56, 189, 248, 0.15)',
                    border: 'rgba(56, 189, 248, 0.3)',
                };
            case 'referral_reward':
            case 'referral':
                return {
                    label: 'عمولة إحالة',
                    icon: Gift,
                    color: '#D4A537',
                    bg: 'rgba(212, 165, 55, 0.15)',
                    border: 'rgba(212, 165, 55, 0.3)',
                };
            case 'target_payout':
                return {
                    label: 'أرباح بيع تارجت',
                    icon: DollarSign,
                    color: '#10B981',
                    bg: 'rgba(16, 185, 129, 0.15)',
                    border: 'rgba(16, 185, 129, 0.3)',
                };
            default:
                return {
                    label: transaction.type || 'حركة محفظة',
                    icon: isCredit ? ArrowDownLeft : ArrowUpRight,
                    color: isCredit ? '#22C55E' : '#EF4444',
                    bg: isCredit ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                    border: 'rgba(255, 255, 255, 0.1)',
                };
        }
    };

    const config = getTypeConfig(transaction.type);
    const Icon = config.icon;

    // Format date in Arabic locale
    let formattedDate = transaction.created_at || '';
    try {
        if (transaction.created_at) {
            const dateObj = new Date(transaction.created_at);
            formattedDate = dateObj.toLocaleDateString('ar-EG', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
        }
    } catch (e) {
        formattedDate = transaction.created_at;
    }

    return (
        <div style={{
            background: 'rgba(26, 26, 36, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.07)',
            borderRadius: '16px',
            padding: '16px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '14px',
            transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(212, 165, 55, 0.3)';
            e.currentTarget.style.background = 'rgba(26, 26, 36, 0.9)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.07)';
            e.currentTarget.style.background = 'rgba(26, 26, 36, 0.65)';
        }}
        >
            {/* Left: Icon & Description */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: config.bg,
                    border: `1px solid ${config.border}`,
                    color: config.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                }}>
                    <Icon size={20} />
                </div>

                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                        <span style={{ fontSize: '15px', fontWeight: '800', color: '#FFFFFF' }}>
                            {config.label}
                        </span>
                    </div>

                    <p style={{ margin: '0 0 4px', fontSize: '13px', color: '#9E9EA8' }}>
                        {transaction.description || 'عملية على محفظة إمبراطور'}
                    </p>

                    <span style={{ fontSize: '11px', color: '#656570' }}>
                        {formattedDate}
                    </span>
                </div>
            </div>

            {/* Right: Amount & Balance After */}
            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <div style={{
                    fontSize: '17px',
                    fontWeight: '900',
                    color: isCredit ? '#4ADE80' : '#F87171',
                    direction: 'ltr',
                    fontFamily: 'Cairo, sans-serif',
                }}>
                    {isCredit ? `+${amount}` : `-${amount}`} ج.م
                </div>

                <span style={{ fontSize: '12px', color: '#8E8E98', marginTop: '2px' }}>
                    الرصيد بعدها: <strong style={{ color: '#CBD5E1' }}>{balanceAfter} ج.م</strong>
                </span>
            </div>
        </div>
    );
}
