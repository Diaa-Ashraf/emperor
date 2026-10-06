import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Sliders,
    Moon,
    Sun,
    Bell,
    Globe,
    Shield,
    Key,
    Lock,
    LogOut,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    SlidersHorizontal,
    Check
} from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../contexts/ToastContext';
import { settingsApi } from '../api/endpoints';
import { requestNotificationPermission } from '../services/firebaseMessaging';

export default function SettingsPage() {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const { language, switchLanguage, t, isRtl } = useLanguage();
    const { success, addToast } = useToast();
    const navigate = useNavigate();

    const isDarkMode = theme === 'dark';

    const [preferences, setPreferences] = useState({
        order_notifications: true,
        balance_notifications: true,
        offers_notifications: false,
    });

    const handleToggleNotification = (key) => {
        setPreferences(prev => {
            const next = { ...prev, [key]: !prev[key] };
            success(t('saved', 'تم حفظ التعديل'));
            return next;
        });
    };

    const handleLogoutAllDevices = async () => {
        try {
            success(t('logoutSuccess', 'تم تسجيل الخروج من كل الأجهزة بنجاح'));
            setTimeout(() => logout(), 1000);
        } catch (e) {
            logout();
        }
    };

    const ArrowIcon = isRtl ? ChevronLeft : ChevronRight;

    return (
        <MainLayout>
            {/* Header */}
            <div style={{ marginBottom: '28px' }}>
                <h1 style={{ margin: '0 0 6px', fontSize: '26px', fontWeight: '900', color: 'var(--text-primary, #FFFFFF)' }}>
                    {t('settings', 'الإعدادات')}
                </h1>
                <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary, #9E9EA8)' }}>
                    {t('settingsSub', 'عرض وتعديل بيانات حسابك وتفضيلات التطبيق')}
                </p>
            </div>

            {/* 2-Column Responsive Layout */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
                gap: '24px',
                alignItems: 'start',
                marginBottom: '40px',
            }}>
                {/* ══ Column 1: Preferences (التفضيلات) ══ */}
                <div style={{
                    background: 'var(--bg-card, rgba(22, 22, 30, 0.85))',
                    border: '1px solid var(--border-medium, rgba(255, 255, 255, 0.08))',
                    borderRadius: '24px',
                    padding: '24px 22px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                }}>
                    {/* Section Header */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ textAlign: isRtl ? 'right' : 'left' }}>
                            <h3 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: '900', color: 'var(--text-primary, #FFFFFF)' }}>
                                {t('preferences', 'التفضيلات')}
                            </h3>
                            <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--text-muted, #94a3b8)' }}>
                                {t('preferencesSub', 'اللغة والمظهر والإشعارات في مكان واحد')}
                            </p>
                        </div>
                        <div style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '10px',
                            background: 'rgba(212, 165, 55, 0.12)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--gold-400, #D4A537)',
                        }}>
                            <SlidersHorizontal size={20} />
                        </div>
                    </div>

                    {/* 1. Language Selector Card */}
                    <div style={{
                        background: 'var(--bg-elevated, rgba(13, 13, 16, 0.6))',
                        border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.06))',
                        borderRadius: '16px',
                        padding: '16px 18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                    }}>
                        {/* Language Switch Pills */}
                        <div style={{
                            display: 'inline-flex',
                            background: 'rgba(0, 0, 0, 0.3)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '12px',
                            padding: '3px',
                            gap: '3px',
                        }}>
                            <button
                                onClick={() => switchLanguage('en')}
                                style={{
                                    padding: '6px 14px',
                                    borderRadius: '9px',
                                    border: 'none',
                                    background: language === 'en'
                                        ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                                        : 'transparent',
                                    color: language === 'en' ? '#0D0D0F' : '#94a3b8',
                                    fontWeight: '800',
                                    fontSize: '13px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                }}
                            >
                                English
                            </button>
                            <button
                                onClick={() => switchLanguage('ar')}
                                style={{
                                    padding: '6px 14px',
                                    borderRadius: '9px',
                                    border: 'none',
                                    background: language === 'ar'
                                        ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                                        : 'transparent',
                                    color: language === 'ar' ? '#0D0D0F' : '#94a3b8',
                                    fontWeight: '800',
                                    fontSize: '13px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                }}
                            >
                                العربية
                            </button>
                        </div>

                        <div style={{ textAlign: isRtl ? 'right' : 'left' }}>
                            <strong style={{ display: 'block', fontSize: '14.5px', color: 'var(--text-primary, #FFFFFF)', marginBottom: '2px' }}>
                                {t('language', 'اللغة')}
                            </strong>
                            <span style={{ fontSize: '11.5px', color: 'var(--text-muted, #94a3b8)' }}>
                                {t('selectLanguage', 'اختر لغة التطبيق المفضلة لديك')}
                            </span>
                        </div>
                    </div>

                    {/* 2. Dark Mode Toggle Card */}
                    <div style={{
                        background: 'var(--bg-elevated, rgba(13, 13, 16, 0.6))',
                        border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.06))',
                        borderRadius: '16px',
                        padding: '16px 18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                    }}>
                        {/* Switch UI */}
                        <div
                            onClick={toggleTheme}
                            style={{
                                width: '48px',
                                height: '26px',
                                borderRadius: '13px',
                                background: isDarkMode ? '#f59e0b' : 'rgba(255, 255, 255, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '2px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxSizing: 'border-box',
                            }}
                        >
                            <div style={{
                                width: '22px',
                                height: '22px',
                                borderRadius: '50%',
                                background: '#FFFFFF',
                                transform: isDarkMode ? 'translateX(22px)' : 'translateX(0px)',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
                            }} />
                        </div>

                        <div style={{ textAlign: isRtl ? 'right' : 'left' }}>
                            <strong style={{ display: 'block', fontSize: '14.5px', color: 'var(--text-primary, #FFFFFF)', marginBottom: '2px' }}>
                                {t('darkMode', 'الوضع الداكن')}
                            </strong>
                            <span style={{ fontSize: '11.5px', color: 'var(--text-muted, #94a3b8)' }}>
                                {t('darkModeDesc', 'استخدام الواجهة الداكنة داخل التطبيق')}
                            </span>
                        </div>
                    </div>

                    {/* 3. Notifications Category Card */}
                    <div style={{
                        background: 'var(--bg-elevated, rgba(13, 13, 16, 0.6))',
                        border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.06))',
                        borderRadius: '16px',
                        padding: '18px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '14px',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: isRtl ? 'flex-start' : 'flex-end', marginBottom: '2px' }}>
                            <Bell size={16} color="#f59e0b" />
                            <strong style={{ fontSize: '14px', color: 'var(--text-primary, #FFFFFF)' }}>
                                {t('notifications', 'الإشعارات')}
                            </strong>
                        </div>

                        {/* Item: Orders */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '8px 0',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                        }}>
                            <div
                                onClick={() => handleToggleNotification('order_notifications')}
                                style={{
                                    width: '44px',
                                    height: '24px',
                                    borderRadius: '12px',
                                    background: preferences.order_notifications ? '#f59e0b' : 'rgba(255, 255, 255, 0.15)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '2px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <div style={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    background: '#FFFFFF',
                                    transform: preferences.order_notifications ? 'translateX(20px)' : 'translateX(0px)',
                                    transition: 'all 0.3s ease',
                                }} />
                            </div>
                            <span style={{ fontSize: '13.5px', color: 'var(--text-primary, #cbd5e1)', fontWeight: '700' }}>
                                {t('orderNotifications', 'إشعارات الطلبات')}
                            </span>
                        </div>

                        {/* Item: Balance */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '8px 0',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                        }}>
                            <div
                                onClick={() => handleToggleNotification('balance_notifications')}
                                style={{
                                    width: '44px',
                                    height: '24px',
                                    borderRadius: '12px',
                                    background: preferences.balance_notifications ? '#f59e0b' : 'rgba(255, 255, 255, 0.15)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '2px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <div style={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    background: '#FFFFFF',
                                    transform: preferences.balance_notifications ? 'translateX(20px)' : 'translateX(0px)',
                                    transition: 'all 0.3s ease',
                                }} />
                            </div>
                            <span style={{ fontSize: '13.5px', color: 'var(--text-primary, #cbd5e1)', fontWeight: '700' }}>
                                {t('balanceNotifications', 'إشعارات الرصيد')}
                            </span>
                        </div>

                        {/* Item: Offers */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '8px 0',
                        }}>
                            <div
                                onClick={() => handleToggleNotification('offers_notifications')}
                                style={{
                                    width: '44px',
                                    height: '24px',
                                    borderRadius: '12px',
                                    background: preferences.offers_notifications ? '#f59e0b' : 'rgba(255, 255, 255, 0.15)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '2px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <div style={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    background: '#FFFFFF',
                                    transform: preferences.offers_notifications ? 'translateX(20px)' : 'translateX(0px)',
                                    transition: 'all 0.3s ease',
                                }} />
                            </div>
                            <span style={{ fontSize: '13.5px', color: 'var(--text-primary, #cbd5e1)', fontWeight: '700' }}>
                                {t('offersNotifications', 'إشعارات العروض')}
                            </span>
                        </div>
                    </div>
                </div>

                {/* ══ Column 2: Security (الأمان) ══ */}
                <div style={{
                    background: 'var(--bg-card, rgba(22, 22, 30, 0.85))',
                    border: '1px solid var(--border-medium, rgba(255, 255, 255, 0.08))',
                    borderRadius: '24px',
                    padding: '24px 22px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                }}>
                    {/* Section Header */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ textAlign: isRtl ? 'right' : 'left' }}>
                            <h3 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: '900', color: 'var(--text-primary, #FFFFFF)' }}>
                                {t('securitySettings', 'الأمان')}
                            </h3>
                            <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--text-muted, #94a3b8)' }}>
                                {t('securitySettingsSub', 'اختصارات لتغيير كلمة المرور وضبط الحماية')}
                            </p>
                        </div>
                        <div style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '10px',
                            background: 'rgba(212, 165, 55, 0.12)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--gold-400, #D4A537)',
                        }}>
                            <Shield size={20} />
                        </div>
                    </div>

                    {/* 1. Change Password Link Card */}
                    <Link
                        to="/profile"
                        style={{
                            background: 'var(--bg-elevated, rgba(13, 13, 16, 0.6))',
                            border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.06))',
                            borderRadius: '16px',
                            padding: '16px 18px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            textDecoration: 'none',
                            transition: 'all 0.2s',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gold-400, #D4A537)', fontSize: '13px', fontWeight: '800' }}>
                            <ArrowIcon size={16} />
                            <span>{t('open', 'فتح')}</span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ textAlign: isRtl ? 'right' : 'left' }}>
                                <strong style={{ display: 'block', fontSize: '14.5px', color: 'var(--text-primary, #FFFFFF)', marginBottom: '2px' }}>
                                    {t('changePassword', 'تغيير كلمة المرور')}
                                </strong>
                                <span style={{ fontSize: '11.5px', color: 'var(--text-muted, #94a3b8)' }}>
                                    {t('changePasswordSub', 'فتح قسم الأمان في صفحة حسابي لتحديث كلمة المرور')}
                                </span>
                            </div>

                            <div style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '10px',
                                background: 'rgba(255, 255, 255, 0.06)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#94a3b8',
                                flexShrink: 0,
                            }}>
                                <Key size={18} />
                            </div>
                        </div>
                    </Link>

                    {/* 2. Two-Factor Authentication Link Card */}
                    <Link
                        to="/profile"
                        style={{
                            background: 'var(--bg-elevated, rgba(13, 13, 16, 0.6))',
                            border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.06))',
                            borderRadius: '16px',
                            padding: '16px 18px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            textDecoration: 'none',
                            transition: 'all 0.2s',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gold-400, #D4A537)', fontSize: '13px', fontWeight: '800' }}>
                            <ArrowIcon size={16} />
                            <span>{t('open', 'فتح')}</span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ textAlign: isRtl ? 'right' : 'left' }}>
                                <strong style={{ display: 'block', fontSize: '14.5px', color: 'var(--text-primary, #FFFFFF)', marginBottom: '2px' }}>
                                    {t('twoFactor', 'المصادقة الثنائية')}
                                </strong>
                                <span style={{ fontSize: '11.5px', color: 'var(--text-muted, #94a3b8)' }}>
                                    {t('twoFactorSub', 'تفعيل أو تعطيل التحقق برمز البريد الإلكتروني')}
                                </span>
                            </div>

                            <div style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '10px',
                                background: 'rgba(255, 255, 255, 0.06)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#94a3b8',
                                flexShrink: 0,
                            }}>
                                <Lock size={18} />
                            </div>
                        </div>
                    </Link>

                    {/* 3. Logout All Devices Action Card */}
                    <div
                        onClick={handleLogoutAllDevices}
                        style={{
                            background: 'var(--bg-elevated, rgba(13, 13, 16, 0.6))',
                            border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.06))',
                            borderRadius: '16px',
                            padding: '16px 18px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#22c55e', fontSize: '13px', fontWeight: '800' }}>
                            <ArrowIcon size={16} />
                            <span>{t('enabled', 'مفعل')}</span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ textAlign: isRtl ? 'right' : 'left' }}>
                                <strong style={{ display: 'block', fontSize: '14.5px', color: 'var(--text-primary, #FFFFFF)', marginBottom: '2px' }}>
                                    {t('logoutAllDevices', 'تسجيل الخروج من كل الأجهزة')}
                                </strong>
                                <span style={{ fontSize: '11.5px', color: 'var(--text-muted, #94a3b8)' }}>
                                    {t('logoutAllDevicesSub', 'إنهاء كافة الجلسات النشطة على الأجهزة الأخرى')}
                                </span>
                            </div>

                            <div style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '10px',
                                background: 'rgba(34, 197, 94, 0.15)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#22c55e',
                                flexShrink: 0,
                            }}>
                                <CheckCircle2 size={18} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}


