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
                    border: 'rgba(212, 165, 55, 0.2)',
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
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '16px',
            padding: 'clamp(12px, 2.5vw, 16px) 18px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            transition: 'all 0.2s ease',
            boxSizing: 'border-box',
            width: '100%',
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-strong)';
            e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-subtle)';
            e.currentTarget.style.transform = 'translateY(0)';
        }}
        >
            {/* Left: Icon & Description */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1 1 200px', minWidth: 0 }}>
                <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: config.bg,
                    border: `1px solid ${config.border}`,
                    color: config.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                }}>
                    <Icon size={18} />
                </div>

                <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                        <span style={{ fontSize: '14.5px', fontWeight: '800', color: 'var(--text-primary)' }}>
                            {config.label}
                        </span>
                    </div>

                    <p style={{ margin: '0 0 2px', fontSize: '12.5px', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {transaction.description || 'عملية على محفظة إمبراطور'}
                    </p>

                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        {formattedDate}
                    </span>
                </div>
            </div>

            {/* Right: Amount & Balance After */}
            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flexShrink: 0 }}>
                <div style={{
                    fontSize: '16px',
                    fontWeight: '900',
                    color: isCredit ? '#22C55E' : '#EF4444',
                    direction: 'ltr',
                    fontFamily: 'Outfit, Cairo, sans-serif',
                }}>
                    {isCredit ? `+${amount}` : `-${amount}`} ج.م
                </div>

                <span style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    الرصيد: <strong style={{ color: 'var(--text-secondary)' }}>{balanceAfter} ج.م</strong>
                </span>
            </div>
        </div>
    );
}
