import React, { useState, useEffect } from 'react';
import { X, AlertCircle, AlertTriangle, Check } from 'lucide-react';
import { getSiteLogo, getSiteName } from '../../utils/settingsHelper';
import { useLanguage } from '../../contexts/LanguageContext';

export default function PaymentNoticeModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [animatingOut, setAnimatingOut] = useState(false);
    const { isRtl, t } = useLanguage();

    useEffect(() => {
        // Check if the user already dismissed it in this browsing session
        const hasSeen = sessionStorage.getItem('emperor_payment_notice_seen');
        if (hasSeen) return;

        // Trigger appearance smoothly right after splash screen fades (~1.7s)
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 1700);

        return () => clearTimeout(timer);
    }, []);

    const handleDismiss = () => {
        sessionStorage.setItem('emperor_payment_notice_seen', 'true');
        setAnimatingOut(true);
        setTimeout(() => {
            setIsOpen(false);
            setAnimatingOut(false);
        }, 300);
    };

    if (!isOpen) return null;

    const siteName = getSiteName() || 'سند ومهره كارد';
    const siteLogo = getSiteLogo() || '/images/mohra_sand_logo.png';

    return (
        <div
            id="emperor-payment-notice-backdrop"
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 999998,
                backgroundColor: 'rgba(3, 8, 18, 0.85)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px',
                opacity: animatingOut ? 0 : 1,
                transition: 'opacity 0.3s ease',
                direction: isRtl ? 'rtl' : 'ltr',
                fontFamily: 'var(--font-cairo, Cairo, sans-serif)',
            }}
            onClick={(e) => {
                if (e.target === e.currentTarget) handleDismiss();
            }}
        >
            <style>{`
                @keyframes emperorNoticePop {
                    0% {
                        opacity: 0;
                        transform: scale(0.9) translateY(20px);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }
                @keyframes emperorNoticeGlowPulse {
                    0%, 100% {
                        box-shadow: 0 0 25px rgba(245, 208, 97, 0.35), 0 0 50px rgba(245, 158, 11, 0.25);
                        border-color: #F5D061;
                    }
                    50% {
                        box-shadow: 0 0 45px rgba(245, 208, 97, 0.6), 0 0 75px rgba(245, 158, 11, 0.45);
                        border-color: #FDE047;
                    }
                }
                @keyframes emperorParticleDrift {
                    0% { transform: translateY(0px) scale(0.9); opacity: 0.35; }
                    50% { transform: translateY(-9px) scale(1.15); opacity: 0.85; }
                    100% { transform: translateY(0px) scale(0.9); opacity: 0.35; }
                }
            `}</style>

            <div
                className="emperor-payment-notice-card"
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '430px',
                    borderRadius: '28px',
                    padding: '2px',
                    overflow: 'hidden',
                    background: 'transparent',
                    boxShadow: '0 25px 70px rgba(0, 0, 0, 0.95), 0 0 40px rgba(245, 208, 97, 0.2)',
                    animation: animatingOut ? 'none' : 'emperorNoticePop 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                    transform: animatingOut ? 'scale(0.92) translateY(15px)' : 'none',
                    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
            >
                {/* Outer Rotating Glowing Halo */}
                <div style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: 'conic-gradient(from 0deg, transparent 0deg, #F5D061 55deg, #F59E0B 120deg, transparent 180deg, #38BDF8 240deg, #F5D061 310deg, transparent 360deg)',
                    animation: 'emperorRainbowSpin 6s linear infinite',
                    zIndex: 0,
                }} />

                {/* Inner Card Body with Deep Obsidian Navy & Warm Emperor Amber Aesthetic */}
                <div style={{
                    position: 'relative',
                    zIndex: 1,
                    width: '100%',
                    height: '100%',
                    borderRadius: '26px',
                    background: 'linear-gradient(175deg, #181109 0%, #0d121c 30%, #050811 100%)',
                    padding: '24px 22px 22px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                }}>
                    {/* Ambient Warm Golden Sunburst Glow at Top */}
                    <div style={{
                        position: 'absolute',
                        top: '-90px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '280px',
                        height: '200px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(245, 158, 11, 0.38) 0%, rgba(245, 208, 97, 0.2) 45%, transparent 75%)',
                        filter: 'blur(35px)',
                        pointerEvents: 'none',
                    }} />

                    {/* Floating Luxury Gold Dust Particles */}
                    <div style={{
                        position: 'absolute',
                        top: '55px',
                        left: '40px',
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        background: '#F5D061',
                        boxShadow: '0 0 10px #F5D061',
                        animation: 'emperorParticleDrift 3.2s infinite ease-in-out',
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: '75px',
                        left: '90px',
                        width: '3px',
                        height: '3px',
                        borderRadius: '50%',
                        background: '#F59E0B',
                        boxShadow: '0 0 8px #F59E0B',
                        animation: 'emperorParticleDrift 2.7s infinite ease-in-out 0.4s',
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: '60px',
                        right: '50px',
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        background: '#F5D061',
                        boxShadow: '0 0 10px #F5D061',
                        animation: 'emperorParticleDrift 3.6s infinite ease-in-out 0.9s',
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: '80px',
                        right: '95px',
                        width: '3px',
                        height: '3px',
                        borderRadius: '50%',
                        background: '#FBBF24',
                        boxShadow: '0 0 8px #FBBF24',
                        animation: 'emperorParticleDrift 3s infinite ease-in-out 1.2s',
                    }} />

                    {/* Circular Close Button (Fixed Top-Left) */}
                    <button
                        onClick={handleDismiss}
                        title="إغلاق"
                        style={{
                            position: 'absolute',
                            top: '18px',
                            left: '18px',
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: 'rgba(255, 255, 255, 0.08)',
                            border: '1px solid rgba(255, 255, 255, 0.18)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#E2E8F0',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            outline: 'none',
                            zIndex: 10,
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.25)';
                            e.currentTarget.style.borderColor = '#ef4444';
                            e.currentTarget.style.color = '#ef4444';
                            e.currentTarget.style.transform = 'scale(1.08)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
                            e.currentTarget.style.color = '#E2E8F0';
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                    >
                        <X size={17} />
                    </button>

                    {/* Centered Brand Tag at Top */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        marginBottom: '18px',
                        marginTop: '4px',
                    }}>
                        <img
                            src={siteLogo}
                            alt={siteName}
                            style={{
                                width: '22px',
                                height: '22px',
                                objectFit: 'contain',
                                filter: 'drop-shadow(0 0 8px rgba(245, 208, 97, 0.5))',
                            }}
                        />
                        <span style={{
                            fontSize: '13px',
                            fontWeight: '900',
                            color: '#F5D061',
                            letterSpacing: '0.6px',
                            textShadow: '0 0 12px rgba(245, 208, 97, 0.4)',
                        }}>
                            {siteName}
                        </span>
                    </div>

                    {/* Central Glowing Warning Icon Halo */}
                    <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(245, 208, 97, 0.22) 0%, rgba(212, 165, 55, 0.08) 70%)',
                        border: '1.5px solid #F5D061',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#F5D061',
                        marginBottom: '14px',
                        animation: 'emperorNoticeGlowPulse 2.8s infinite ease-in-out',
                    }}>
                        <AlertTriangle size={28} color="#F5D061" />
                    </div>

                    {/* Modal Title */}
                    <h2 style={{
                        margin: '0 0 18px',
                        fontSize: '22px',
                        fontWeight: '900',
                        color: '#FFF8E7',
                        textShadow: '0 2px 10px rgba(0, 0, 0, 0.8), 0 0 25px rgba(245, 208, 97, 0.4)',
                        letterSpacing: '0.2px',
                    }}>
                        {t('paymentNoticeTitle', 'تنبيه قبل الدفع')}
                    </h2>

                    {/* ── Instruction Pill 1 ── */}
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: isRtl ? 'row-reverse' : 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        padding: '14px 16px',
                        borderRadius: '16px',
                        background: 'rgba(28, 20, 10, 0.85)',
                        border: '1.2px solid rgba(245, 208, 97, 0.35)',
                        marginBottom: '12px',
                        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(245, 208, 97, 0.15)',
                    }}>
                        {/* Text (aligned to reading direction) */}
                        <span style={{
                            fontSize: '13.5px',
                            fontWeight: '800',
                            color: '#FDE68A',
                            lineHeight: '1.45',
                            textAlign: isRtl ? 'right' : 'left',
                            flex: 1,
                        }}>
                            {t('paymentNotice1', 'المنتجات الرقمية لا تُسترد بعد تأكيد التحويل.')}
                        </span>

                        {/* Icon (on the right in RTL) */}
                        <div style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            background: 'rgba(245, 208, 97, 0.18)',
                            border: '1.2px solid rgba(245, 208, 97, 0.65)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#F5D061',
                            flexShrink: 0,
                            boxShadow: '0 0 10px rgba(245, 208, 97, 0.3)',
                        }}>
                            <AlertCircle size={16} />
                        </div>
                    </div>

                    {/* ── Instruction Pill 2 ── */}
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: isRtl ? 'row-reverse' : 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        padding: '14px 16px',
                        borderRadius: '16px',
                        background: 'rgba(28, 20, 10, 0.85)',
                        border: '1.2px solid rgba(245, 208, 97, 0.35)',
                        marginBottom: '22px',
                        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(245, 208, 97, 0.15)',
                    }}>
                        {/* Text */}
                        <span style={{
                            fontSize: '13.5px',
                            fontWeight: '800',
                            color: '#FDE68A',
                            lineHeight: '1.45',
                            textAlign: isRtl ? 'right' : 'left',
                            flex: 1,
                        }}>
                            {t('paymentNotice2', 'راجع تفاصيل طلبك جيدًا قبل الدفع.')}
                        </span>

                        {/* Icon */}
                        <div style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            background: 'rgba(245, 208, 97, 0.18)',
                            border: '1.2px solid rgba(245, 208, 97, 0.65)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#F5D061',
                            flexShrink: 0,
                            boxShadow: '0 0 10px rgba(245, 208, 97, 0.3)',
                        }}>
                            <AlertCircle size={16} />
                        </div>
                    </div>

                    {/* Action Button: متابعة with Checkmark (Exact Amber / Golden Warmth) */}
                    <button
                        onClick={handleDismiss}
                        style={{
                            width: '100%',
                            padding: '14px 22px',
                            borderRadius: '15px',
                            background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B45309 100%)',
                            border: '1px solid rgba(253, 230, 138, 0.35)',
                            color: '#FFFFFF',
                            fontSize: '16px',
                            fontWeight: '900',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            cursor: 'pointer',
                            boxShadow: '0 10px 28px rgba(217, 119, 6, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
                            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                            outline: 'none',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.02)';
                            e.currentTarget.style.boxShadow = '0 12px 34px rgba(217, 119, 6, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.35)';
                            e.currentTarget.style.background = 'linear-gradient(135deg, #FBBF24 0%, #EA580C 100%)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 10px 28px rgba(217, 119, 6, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.25)';
                            e.currentTarget.style.background = 'linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B45309 100%)';
                        }}
                    >
                        <span>{t('continue', 'متابعة')}</span>
                        <Check size={19} strokeWidth={3} />
                    </button>
                </div>
            </div>
        </div>
    );
}
