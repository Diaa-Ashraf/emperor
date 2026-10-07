import React from 'react';
import { Check, Clock, Zap, XCircle, RefreshCw, AlertCircle } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export default function StatusTimeline({ status, createdAt, completedAt, failureReason }) {
    const { theme } = useTheme();
    const isLight = theme === 'light';
    // If order failed or refunded
    if (status === 'failed') {
        return (
            <div style={{
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.35)',
                borderRadius: '16px',
                padding: '20px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
            }}>
                <XCircle size={24} color="#EF4444" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                    <h4 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: '800', color: isLight ? '#DC2626' : '#F87171' }}>
                        تعذر إتمام طلب الشحن
                    </h4>
                    <p style={{ margin: '0 0 6px', fontSize: '13px', color: isLight ? '#475569' : '#CBD5E1' }}>
                        {failureReason || 'حدث خطأ أثناء تنفيذ الشحن مع مزود الخدمة.'}
                    </p>
                    <span style={{ fontSize: '12px', color: isLight ? '#16A34A' : '#4ADE80', fontWeight: '700' }}>
                        تم استرداد كامل قيمة الطلب إلى محفظتك تلقائياً.
                    </span>
                </div>
            </div>
        );
    }

    if (status === 'refunded') {
        return (
            <div style={{
                background: isLight ? 'rgba(56, 189, 248, 0.08)' : 'rgba(56, 189, 248, 0.12)',
                border: '1px solid rgba(56, 189, 248, 0.35)',
                borderRadius: '16px',
                padding: '20px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
            }}>
                <RefreshCw size={24} color={isLight ? '#0284C7' : '#38BDF8'} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                    <h4 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: '800', color: isLight ? '#0284C7' : '#38BDF8' }}>
                        تم استرداد الطلب
                    </h4>
                    <p style={{ margin: 0, fontSize: '13px', color: isLight ? '#475569' : '#CBD5E1' }}>
                        تم إلغاء الطلب واسترجاع المبلغ كاملاً إلى رصيد محفظتك.
                    </p>
                </div>
            </div>
        );
    }

    const steps = [
        {
            key: 'pending',
            title: 'استلام الطلب',
            desc: 'تم تسجيل الطلب وخصم المبلغ من المحفظة',
            icon: Clock,
        },
        {
            key: 'processing',
            title: 'جاري التنفيذ المباشر',
            desc: 'إرسال بيانات الشحن إلى مزود اللعبة والمطابقة',
            icon: Zap,
        },
        {
            key: 'completed',
            title: 'تم الشحن بنجاح',
            desc: 'تم إيداع الرصيد / الشدات في حسابك بنجاح',
            icon: Check,
        },
    ];

    const getStepIndex = () => {
        switch (status) {
            case 'completed':
                return 3;
            case 'processing':
                return 2;
            default:
                return 1;
        }
    };

    const currentStepIndex = getStepIndex();

    return (
        <div style={{
            background: isLight ? '#FFFFFF' : 'rgba(26, 26, 36, 0.7)',
            border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(212, 165, 55, 0.25)',
            boxShadow: isLight ? '0 4px 20px rgba(0, 0, 0, 0.05)' : 'none',
            borderRadius: '20px',
            padding: '28px 24px',
            marginBottom: '28px',
        }}>
            <h3 style={{ margin: '0 0 24px', fontSize: '17px', fontWeight: '800', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                مراحل تنفيذ الطلب
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
                {steps.map((step, idx) => {
                    const stepNum = idx + 1;
                    const isDone = stepNum < currentStepIndex || (stepNum === 3 && status === 'completed');
                    const isActive = stepNum === currentStepIndex && status !== 'completed';

                    const StepIcon = step.icon;

                    return (
                        <div
                            key={step.key}
                            style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '16px',
                                position: 'relative',
                            }}
                        >
                            {/* Vertical line connecting steps */}
                            {idx < steps.length - 1 && (
                                <div style={{
                                    position: 'absolute',
                                    top: '36px',
                                    right: '18px',
                                    bottom: '-20px',
                                    width: '2px',
                                    background: isDone ? '#D4A537' : (isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.1)'),
                                    zIndex: 0,
                                }} />
                            )}

                            {/* Step Circle Icon */}
                            <div style={{
                                width: '38px',
                                height: '38px',
                                borderRadius: '50%',
                                background: isDone
                                    ? 'linear-gradient(135deg, #22C55E, #15803D)'
                                    : isActive
                                        ? 'linear-gradient(135deg, #F3E5AB, #D4A537)'
                                        : (isLight ? '#F1F5F9' : '#1E1E28'),
                                border: `2px solid ${isDone ? '#4ADE80' : isActive ? (isLight ? '#D4A537' : '#FFFFFF') : (isLight ? '#CBD5E1' : 'rgba(255, 255, 255, 0.15)')}`,
                                color: isDone || isActive ? '#0D0D0F' : (isLight ? '#64748B' : '#8E8E98'),
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                zIndex: 1,
                                boxShadow: isActive ? '0 0 15px rgba(212, 165, 55, 0.6)' : 'none',
                                animation: isActive ? 'pulse 2s infinite' : 'none',
                            }}>
                                <StepIcon size={18} strokeWidth={isDone ? 3 : 2} color={isDone || isActive ? '#0D0D0F' : (isLight ? '#64748B' : '#8E8E98')} />
                            </div>

                            {/* Step Text Info */}
                            <div>
                                <h4 style={{
                                    margin: '0 0 2px',
                                    fontSize: '15px',
                                    fontWeight: '800',
                                    color: isDone ? '#16A34A' : isActive ? '#D4A537' : (isLight ? '#64748B' : '#8E8E98'),
                                }}>
                                    {step.title}
                                </h4>
                                <p style={{ margin: 0, fontSize: '13px', color: isLight ? '#475569' : '#9E9EA8' }}>
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
