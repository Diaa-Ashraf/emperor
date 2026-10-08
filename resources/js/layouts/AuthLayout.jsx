import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, ShieldCheck, Sun, Moon, Globe } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function AuthLayout({ children, title, subtitle }) {
    const { theme, toggleTheme } = useTheme();
    const { language, switchLanguage, isRtl } = useLanguage();
    const isLight = theme === 'light';

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isLight ? '#F1F5F9' : '#08080C',
            backgroundImage: isLight
                ? 'radial-gradient(ellipse at 50% -20%, rgba(212, 165, 55, 0.15) 0%, rgba(241, 245, 249, 0) 70%)'
                : 'radial-gradient(ellipse at 50% -20%, rgba(212, 165, 55, 0.12) 0%, rgba(8, 8, 12, 0) 75%)',
            color: isLight ? '#0F172A' : '#FFFFFF',
            fontFamily: 'Cairo, sans-serif',
            direction: isRtl ? 'rtl' : 'ltr',
            padding: '24px 16px',
            position: 'relative',
            overflow: 'hidden',
            boxSizing: 'border-box',
            transition: 'background-color 0.3s ease, color 0.3s ease',
        }}>
            {/* Top Quick Controls: Theme Toggle & Language Toggle */}
            <div style={{
                position: 'absolute',
                top: '16px',
                [isRtl ? 'left' : 'right']: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                zIndex: 20,
            }}>
                {/* Language Switch */}
                <button
                    onClick={() => switchLanguage(language === 'ar' ? 'en' : 'ar')}
                    title={language === 'ar' ? 'Switch to English' : 'التحويل للعربية'}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        background: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.08)',
                        border: isLight ? '1.5px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '10px',
                        padding: '6px 10px',
                        color: isLight ? '#0F172A' : '#FFFFFF',
                        fontSize: '12px',
                        fontWeight: '800',
                        cursor: 'pointer',
                        boxShadow: isLight ? '0 2px 6px rgba(0, 0, 0, 0.05)' : 'none',
                    }}
                >
                    <Globe size={13} color="var(--gold-400, #D4A537)" />
                    <span>{language === 'ar' ? 'EN' : 'عربي'}</span>
                </button>

                {/* Theme Toggle Button */}
                <button
                    onClick={toggleTheme}
                    title={isLight ? 'التبديل إلى الوضع الليلي' : 'Switch to Light Mode'}
                    style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '10px',
                        background: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.08)',
                        border: isLight ? '1.5px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isLight ? '#9A7210' : '#F5D061',
                        cursor: 'pointer',
                        boxShadow: isLight ? '0 2px 6px rgba(0, 0, 0, 0.05)' : 'none',
                    }}
                >
                    {isLight ? <Moon size={16} /> : <Sun size={16} />}
                </button>
            </div>

            {/* Brand Header */}
            <Link
                to="/"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                    textDecoration: 'none',
                    marginBottom: '24px',
                    zIndex: 1,
                }}
            >
                <div style={{
                    width: '58px',
                    height: '58px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #F3E5AB 0%, #D4A537 50%, #AA7C11 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 20px rgba(212, 165, 55, 0.4)',
                }}>
                    <Crown size={30} color="#050507" strokeWidth={2.5} />
                </div>
                <div style={{ textAlign: 'center' }}>
                    <span style={{
                        fontSize: '24px',
                        fontWeight: '900',
                        color: isLight ? '#0F172A' : '#FFFFFF',
                        letterSpacing: '-0.5px',
                        display: 'block',
                    }}>
                        إمبراطور <span style={{ color: isLight ? '#B8860B' : '#F5D061' }}>EMPEROR</span>
                    </span>
                    <span style={{ fontSize: '13px', color: isLight ? '#64748B' : '#9E9EA8', fontWeight: '600' }}>
                        المنصة الرقمية الأولى لشحن الألعاب والتارجت
                    </span>
                </div>
            </Link>

            {/* Centered Auth Card */}
            <div style={{
                width: '100%',
                maxWidth: '460px',
                background: isLight
                    ? '#FFFFFF'
                    : 'linear-gradient(135deg, rgba(22, 22, 30, 0.95) 0%, rgba(14, 14, 20, 0.98) 100%)',
                border: isLight
                    ? '1.5px solid rgba(212, 165, 55, 0.4)'
                    : '1px solid rgba(212, 165, 55, 0.3)',
                borderRadius: '22px',
                padding: '32px 28px',
                boxShadow: isLight
                    ? '0 12px 40px rgba(15, 23, 42, 0.08), 0 0 20px rgba(212, 165, 55, 0.1)'
                    : '0 20px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(212, 165, 55, 0.1)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                zIndex: 1,
                boxSizing: 'border-box',
                transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
            }}>
                {(title || subtitle) && (
                    <div style={{ textAlign: 'center', marginBottom: '22px' }}>
                        {title && (
                            <h2 style={{
                                margin: '0 0 6px',
                                fontSize: '22px',
                                fontWeight: '900',
                                color: isLight ? '#B8860B' : '#F5D061',
                                fontFamily: 'Cairo, sans-serif',
                                letterSpacing: '-0.3px',
                            }}>
                                {title}
                            </h2>
                        )}
                        {subtitle && (
                            <p style={{
                                margin: 0,
                                fontSize: '13.5px',
                                color: isLight ? '#475569' : '#CBD5E1',
                                fontWeight: '600',
                                fontFamily: 'Cairo, sans-serif',
                            }}>
                                {subtitle}
                            </p>
                        )}
                    </div>
                )}
                {children}
            </div>

            {/* Security Notice */}
            <div style={{
                marginTop: '20px',
                color: isLight ? '#64748B' : '#71717A',
                fontSize: '12px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                zIndex: 1,
            }}>
                <ShieldCheck size={15} color={isLight ? '#B8860B' : '#D4A537'} />
                <span>اتصال آمن ومشفر بأحدث بروتوكولات الحماية العالمية</span>
            </div>
        </div>
    );
}
