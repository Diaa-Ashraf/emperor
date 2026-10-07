import React, { useState } from 'react';
import { CheckCircle2, Copy, Check, Calendar, CreditCard, Clock, XCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function DepositCard({ deposit }) {
    const { t, isRtl, language } = useLanguage();
    const [copied, setCopied] = useState(false);

    if (!deposit) return null;

    const getStatusConfig = (status) => {
        switch (status) {
            case 'approved':
            case 'completed':
                return {
                    bg: 'rgba(34, 197, 94, 0.12)',
                    border: 'rgba(34, 197, 94, 0.3)',
                    color: '#22c55e',
                    dot: '#22c55e',
                    label: t('completed', 'مكتملة'),
                    icon: CheckCircle2,
                };
            case 'rejected':
            case 'failed':
                return {
                    bg: 'rgba(239, 68, 68, 0.12)',
                    border: 'rgba(239, 68, 68, 0.3)',
                    color: '#ef4444',
                    dot: '#ef4444',
                    label: t('rejected', 'مرفوضة'),
                    icon: XCircle,
                };
            default:
                return {
                    bg: 'rgba(234, 179, 8, 0.12)',
                    border: 'rgba(234, 179, 8, 0.3)',
                    color: '#eab308',
                    dot: '#eab308',
                    label: t('pending', 'انتظار'),
                    icon: Clock,
                };
        }
    };

    const statusConfig = getStatusConfig(deposit.status);
    const amount = Number(deposit.amount || deposit.final_amount || 0).toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    });
    const fee = Number(deposit.fee || 0).toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    });
    const currency = language === 'en' ? 'EGP' : (deposit.currency === 'EGY' || deposit.currency === 'EGP' ? 'ج.م' : deposit.currency);
    const referenceId = deposit.reference_id || deposit.transaction_reference || `dep_${deposit.id}`;

    let formattedDate = deposit.created_at || '';
    try {
        if (deposit.created_at) {
            const d = new Date(deposit.created_at);
            const yyyy = d.getFullYear();
            const mm = d.getMonth() + 1;
            const dd = d.getDate();
            const timeStr = d.toLocaleTimeString(language === 'en' ? 'en-US' : 'ar-EG', { hour: '2-digit', minute: '2-digit' });
            formattedDate = `${yyyy}/${mm}/${dd}, ${timeStr}`;
        }
    } catch (e) {
        formattedDate = deposit.created_at;
    }

    const handleCopy = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText(referenceId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div
            style={{
                background: 'var(--bg-card, #FFFFFF)',
                border: '1px solid var(--border-medium, rgba(0, 0, 0, 0.08))',
                borderRadius: '20px',
                padding: 'clamp(14px, 3vw, 18px) clamp(14px, 3.5vw, 20px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                boxShadow: '0 4px 18px rgba(0, 0, 0, 0.04)',
                boxSizing: 'border-box',
                width: '100%',
                transition: 'all 0.2s ease',
            }}
        >
            {/* Top Row: Status badge on Left, Title & Copyable Reference on Right */}
            <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                flexWrap: 'wrap-reverse',
                gap: '10px',
            }}>
                {/* Status Pill */}
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    background: statusConfig.bg,
                    border: `1px solid ${statusConfig.border}`,
                    color: statusConfig.color,
                    fontSize: '12px',
                    fontWeight: '800',
                }}>
                    <span style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: statusConfig.dot,
                    }} />
                    <span>{statusConfig.label}</span>
                </div>

                {/* Right Side: Title + Reference */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    textAlign: isRtl ? 'right' : 'left',
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: isRtl ? 'flex-end' : 'flex-start' }}>
                        <h4 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: '800', color: 'var(--text-primary, #0f172a)' }}>
                            {t('addBalance', 'إضافة رصيد')}
                        </h4>

                        <div
                            onClick={handleCopy}
                            title={t('clickToCopyRef', 'اضغط لنسخ الرقم المرجعي')}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                fontSize: '11.5px',
                                color: 'var(--text-secondary, #64748b)',
                                fontFamily: 'monospace',
                                cursor: 'pointer',
                                background: 'var(--bg-elevated, #f8fafc)',
                                padding: '2px 8px',
                                borderRadius: '6px',
                                border: '1px solid var(--border-subtle, #e2e8f0)',
                            }}
                        >
                            <span style={{ direction: 'ltr' }}>#{referenceId}</span>
                            {copied ? <Check size={12} color="#22c55e" /> : <Copy size={12} />}
                        </div>
                    </div>

                    <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        background: 'rgba(34, 197, 94, 0.15)',
                        color: '#22c55e',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                    }}>
                        <CheckCircle2 size={22} />
                    </div>
                </div>
            </div>

            {/* Middle Container: Amount & Fee */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.08) 0%, rgba(14, 165, 233, 0.03) 100%)',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                borderRadius: '16px',
                padding: 'clamp(10px, 2.5vw, 14px) clamp(12px, 3vw, 20px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                {/* Fee */}
                <div style={{ textAlign: isRtl ? 'left' : 'right' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted, #94a3b8)', display: 'block', marginBottom: '2px' }}>
                        {t('fees', 'الرسوم')}
                    </span>
                    <strong style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary, #0f172a)' }}>
                        {currency} {fee}
                    </strong>
                </div>

                {/* Amount */}
                <div style={{ textAlign: isRtl ? 'right' : 'left' }}>
                    <span style={{ fontSize: '11px', color: '#0284c7', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: isRtl ? 'flex-end' : 'flex-start', marginBottom: '2px' }}>
                        <span>{t('amount', 'المبلغ')}</span>
                    </span>
                    <strong style={{ fontSize: '22px', fontWeight: '900', color: '#0284c7' }}>
                        {currency} {amount}
                    </strong>
                </div>
            </div>

            {/* Bottom Row: Currency/Payment method on left, Date on right */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '8px',
                fontSize: '12px',
                color: 'var(--text-secondary, #64748b)',
                paddingTop: '2px',
            }}>
                {/* Payment Badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CreditCard size={14} color="var(--gold-400, #D4A537)" />
                    <span style={{ fontWeight: '700' }}>{deposit.payment_method?.name || currency}</span>
                </div>

                {/* Date */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>{formattedDate}</span>
                    <Calendar size={14} color="var(--gold-400, #D4A537)" />
                </div>
            </div>
        </div>
    );
}
