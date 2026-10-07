import React from 'react';
import { Link } from 'react-router-dom';
import { Wallet, PlusCircle, ArrowUpRight, History, ShieldCheck, Sparkles, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../ui/Button';

export default function WalletCard({ balanceData }) {
    const { user, isAuthenticated } = useAuth();
    const { t, language } = useLanguage();
    const { theme } = useTheme();
    const isLight = theme === 'light';

    const formattedBalance = Number(balanceData?.balance ?? user?.wallet_balance ?? 0).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    const currency = balanceData?.currency || user?.currency || 'EGP';
    const currencyLabel = currency === 'EGP' ? (language === 'en' ? 'EGP' : 'ج.م') : currency;

    const usdBalance = Number(balanceData?.balance_usd ?? 0).toFixed(2);

    if (!isAuthenticated) {
        return (
            <div style={{
                background: isLight ? '#FFFFFF' : 'linear-gradient(135deg, rgba(28, 28, 38, 0.95) 0%, rgba(18, 18, 24, 0.95) 100%)',
                border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(212, 165, 55, 0.3)',
                borderRadius: '20px',
                padding: '24px 28px',
                marginBottom: '32px',
                boxShadow: isLight ? '0 8px 24px rgba(0, 0, 0, 0.05)' : '0 10px 30px rgba(0, 0, 0, 0.4)',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '20px',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <div style={{
                    position: 'absolute',
                    top: '-50%',
                    right: '-20%',
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(212, 165, 55, 0.15) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', zIndex: 1 }}>
                    <div style={{
                        width: '54px',
                        height: '54px',
                        borderRadius: '16px',
                        background: 'linear-gradient(135deg, #F3E5AB 0%, #D4A537 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#0D0D0F',
                        boxShadow: '0 4px 15px rgba(212, 165, 55, 0.3)',
                    }}>
                        <Wallet size={28} />
                    </div>
                    <div>
                        <h3 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: '800', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                            {t('startTopupTitle', 'ابدأ الشحن وبيع التارجت فوراً')}
                        </h3>
                        <p style={{ margin: 0, fontSize: '13px', color: isLight ? '#475569' : '#9E9EA8' }}>
                            {t('startTopupDesc', 'سجل حسابك الآن وتمتع بأفضل أسعار الجملة، شحن فوري ومحفظة رقمية آمنة.')}
                        </p>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', zIndex: 1 }}>
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                        <Button variant="primary" size="md" icon={LogIn}>
                            {t('login', 'تسجيل الدخول')}
                        </Button>
                    </Link>
                    <Link to="/register" style={{ textDecoration: 'none' }}>
                        <Button variant="secondary" size="md" icon={UserPlus}>
                            {t('register', 'إنشاء حساب')}
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            background: isLight ? '#FFFFFF' : 'linear-gradient(135deg, #1C1917 0%, #291E0D 50%, #151108 100%)',
            border: isLight ? '1.5px solid rgba(212, 165, 55, 0.35)' : '1px solid rgba(212, 165, 55, 0.4)',
            borderRadius: '24px',
            padding: '28px 32px',
            marginBottom: '32px',
            boxShadow: isLight ? '0 8px 24px rgba(0, 0, 0, 0.05)' : '0 15px 40px rgba(0, 0, 0, 0.5), 0 0 25px rgba(212, 165, 55, 0.1)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Ambient Gold Glow */}
            <div style={{
                position: 'absolute',
                top: '-40px',
                left: '-40px',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(212, 165, 55, 0.25) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '24px',
                position: 'relative',
                zIndex: 2,
            }}>
                {/* Balance Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '13px', color: '#D4A537', fontWeight: '700' }}>
                            {t('emperorWallet', 'محفظة إمبراطور')}
                        </span>
                        <span style={{
                            fontSize: '11px',
                            background: 'rgba(34, 197, 94, 0.15)',
                            color: '#16A34A',
                            padding: '2px 8px',
                            borderRadius: '10px',
                            border: '1px solid rgba(34, 197, 94, 0.3)',
                            fontWeight: '700',
                        }}>
                            {t('active', 'نشط')}
                        </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                        <span style={{
                            fontSize: 'clamp(28px, 4vw, 38px)',
                            fontWeight: '900',
                            color: isLight ? '#0F172A' : '#FFFFFF',
                            letterSpacing: '-1px',
                            fontFamily: 'Cairo, sans-serif',
                        }}>
                            {formattedBalance}
                        </span>
                        <span style={{ fontSize: '20px', fontWeight: '800', color: '#D4A537' }}>
                            {currencyLabel}
                        </span>
                    </div>

                    <div style={{ fontSize: '13px', color: isLight ? '#64748B' : '#9E9EA8' }}>
                        {language === 'en' ? 'Approx. equivalent:' : 'يعادل تقريباً:'} <strong style={{ color: isLight ? '#1E293B' : '#E2E8F0' }}>${usdBalance} USD</strong>
                    </div>
                </div>

                {/* Quick Action Buttons */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    <Link to="/deposit" style={{ textDecoration: 'none' }}>
                        <Button
                            variant="primary"
                            size="md"
                            icon={PlusCircle}
                            style={{
                                boxShadow: '0 4px 20px rgba(212, 165, 55, 0.4)',
                            }}
                        >
                            {t('chargeWallet', 'شحن المحفظة')}
                        </Button>
                    </Link>

                    <Link to="/target/sell" style={{ textDecoration: 'none' }}>
                        <Button
                            variant="secondary"
                            size="md"
                            icon={ArrowUpRight}
                            style={{
                                background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.08)',
                                border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(212, 165, 55, 0.3)',
                                color: isLight ? '#92400E' : '#D4A537',
                            }}
                        >
                            {t('sellTarget', 'بيع تارجت')}
                        </Button>
                    </Link>

                    <Link to="/wallet" style={{ textDecoration: 'none' }}>
                        <Button
                            variant="ghost"
                            size="md"
                            icon={History}
                            style={{ color: isLight ? '#334155' : '#CBD5E1' }}
                        >
                            {t('transactionsHistory', 'سجل العمليات')}
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
