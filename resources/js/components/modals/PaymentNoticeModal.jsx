import React, { useState, useEffect } from 'react';
import { X, AlertCircle, AlertTriangle, Check } from 'lucide-react';
import { getSiteLogo, getSiteName } from '../../utils/settingsHelper';
import { useTheme } from '../../contexts/ThemeContext';

export default function PaymentNoticeModal() {
    const [isOpen, setIsOpen] = useState(false);
    const { theme } = useTheme();
    const isLight = theme === 'light';

    useEffect(() => {
        // Check if user already dismissed the notice in this session
        const hasSeen = sessionStorage.getItem('emperor_entry_notice_seen');
        if (!hasSeen) {
            // Delay slightly so it opens seamlessly right after the splash screen (~1.7s)
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 1700);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleDismiss = () => {
        sessionStorage.setItem('emperor_entry_notice_seen', 'true');
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 99999,
                backgroundColor: 'rgba(5, 5, 8, 0.78)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px',
                animation: 'emperorModalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onClick={handleDismiss}
        >
            <style>{`
                @keyframes emperorModalFadeIn {
                    from { opacity: 0; transform: scale(0.96); }
                    to { opacity: 1; transform: scale(1); }
                }
                @keyframes emperorGlowPulse {
                    0% { opacity: 0.6; transform: scale(0.98); }
                    50% { opacity: 1; transform: scale(1.02); }
                    100% { opacity: 0.6; transform: scale(0.98); }
                }
            `}</style>

            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '440px',
                    backgroundColor: '#110D08',
                    backgroundImage: 'radial-gradient(ellipse at 50% 18%, rgba(212, 165, 55, 0.28) 0%, rgba(30, 20, 10, 0.95) 45%, #0B0806 85%)',
                    border: '1.5px solid rgba(212, 165, 55, 0.35)',
                    borderRadius: '28px',
                    padding: '28px 24px',
                    boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(212, 165, 55, 0.18)',
                    overflow: 'hidden',
                    direction: 'rtl',
                    fontFamily: 'Cairo, sans-serif',
                }}
            >
                {/* Decorative Amber Sparks & Bokeh in background */}
                <div
                    style={{
                        position: 'absolute',
                        top: '15%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '280px',
                        height: '100px',
                        background: 'radial-gradient(ellipse, rgba(235, 160, 30, 0.35) 0%, transparent 70%)',
                        filter: 'blur(25px)',
                        pointerEvents: 'none',
                    }}
                />

                {/* Close Button Top-Left */}
                <button
                    onClick={handleDismiss}
                    aria-label="إغلاق"
                    style={{
                        position: 'absolute',
                        top: '18px',
                        left: '18px',
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: '#E2E8F0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(212, 165, 55, 0.2)';
                        e.currentTarget.style.borderColor = 'rgba(212, 165, 55, 0.5)';
                        e.currentTarget.style.color = '#FFFFFF';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                        e.currentTarget.style.color = '#E2E8F0';
                    }}
                >
                    <X size={18} />
                </button>

                {/* Top Logo / Brand Title */}
                <div style={{ textAlign: 'center', marginBottom: '22px' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '4px 12px',
                    }}>
                        <img
                            src={getSiteLogo()}
                            alt="Logo"
                            style={{ width: '22px', height: '22px', objectFit: 'contain' }}
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                        <span style={{
                            color: '#E6A825',
                            fontSize: '13px',
                            fontWeight: '900',
                            letterSpacing: '1px',
                        }}>
                            سند ومهره كارد
                        </span>
                    </div>
                </div>

                {/* Centered Yellow Warning Icon Circle */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '14px',
                }}>
                    <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(235, 160, 30, 0.12)',
                        border: '2px solid rgba(235, 160, 30, 0.65)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#F59E0B',
                        boxShadow: '0 0 24px rgba(235, 160, 30, 0.4)',
                        animation: 'emperorGlowPulse 2.5s infinite ease-in-out',
                    }}>
                        <AlertTriangle size={28} strokeWidth={2.5} />
                    </div>
                </div>

                {/* Modal Title */}
                <h3 style={{
                    textAlign: 'center',
                    fontSize: '22px',
                    fontWeight: '900',
                    color: '#FFFFFF',
                    margin: '0 0 20px',
                    letterSpacing: '0.5px',
                }}>
                    تنبيه قبل الدفع
                </h3>

                {/* Notice Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                    {/* Item 1 */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(212, 165, 55, 0.22)',
                        borderRadius: '16px',
                        padding: '14px 18px',
                        gap: '14px',
                    }}>
                        <span style={{
                            fontSize: '14px',
                            fontWeight: '700',
                            color: '#F8FAFC',
                            flex: 1,
                            lineHeight: 1.5,
                        }}>
                            المنتجات الرقمية لا تُسترد بعد تأكيد التحويل.
                        </span>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(235, 160, 30, 0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#F59E0B',
                            flexShrink: 0,
                        }}>
                            <AlertCircle size={18} />
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(212, 165, 55, 0.22)',
                        borderRadius: '16px',
                        padding: '14px 18px',
                        gap: '14px',
                    }}>
                        <span style={{
                            fontSize: '14px',
                            fontWeight: '700',
                            color: '#F8FAFC',
                            flex: 1,
                            lineHeight: 1.5,
                        }}>
                            راجع تفاصيل طلبك جيدًا قبل الدفع.
                        </span>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(235, 160, 30, 0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#F59E0B',
                            flexShrink: 0,
                        }}>
                            <AlertCircle size={18} />
                        </div>
                    </div>
                </div>

                {/* Primary Action Button: متابعة ✓ */}
                <button
                    onClick={handleDismiss}
                    style={{
                        width: '100%',
                        padding: '14px 20px',
                        borderRadius: '16px',
                        background: 'linear-gradient(90deg, #E28710 0%, #D4690C 50%, #C35005 100%)',
                        border: 'none',
                        color: '#FFFFFF',
                        fontSize: '16px',
                        fontWeight: '900',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        boxShadow: '0 8px 24px rgba(212, 105, 12, 0.45)',
                        transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 12px 28px rgba(212, 105, 12, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(212, 105, 12, 0.45)';
                    }}
                >
                    <span>متابعة</span>
                    <Check size={18} strokeWidth={3} />
                </button>
            </div>
        </div>
    );
}

