import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    Home,
    User,
    Shield,
    Share2,
    FileText,
    Target,
    Settings,
    Headphones,
    LogOut,
    LogIn,
    UserPlus,
    X,
    Copy,
    Check,
    ChevronLeft,
    ChevronRight,
    Sparkles,
    Sun,
    Moon,
    Wallet,
    ArrowUpRight,
    Crown,
    Code,
    Key
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useToast } from '../../contexts/ToastContext';

export default function UserSidebarDrawer({ isOpen, onClose }) {
    const { user, isAuthenticated, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const { language, switchLanguage, t, isRtl } = useLanguage();
    const { success } = useToast();
    const location = useLocation();
    const navigate = useNavigate();

    const [copiedId, setCopiedId] = useState(false);

    // Body scroll lock & Escape listener
    React.useEffect(() => {
        if (!isOpen) return;

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const copyUserId = () => {
        const idToCopy = user?.id ? `EMP-${user.id}` : 'EMP-9705F';
        navigator.clipboard.writeText(idToCopy);
        setCopiedId(true);
        success(t('copied') || 'تم النسخ');
        setTimeout(() => setCopiedId(false), 2000);
    };

    const handleLogout = async () => {
        onClose();
        await logout();
        navigate('/login');
    };

    const navItems = [
        {
            path: '/',
            label: 'الرئيسية',
            icon: Home,
            iconBg: '#D4A537',
            iconColor: '#08080A'
        },
        {
            path: '/deposit',
            label: 'شحن المحفظة (إيداع كاش / USDT)',
            icon: Wallet,
            iconBg: '#22C55E',
            iconColor: '#08080A'
        },
        {
            path: '/wallet',
            label: 'محفظتي وسجل الحركات',
            icon: Wallet,
            iconBg: '#D4A537',
            iconColor: '#08080A',
            authRequired: true
        },
        {
            path: '/target/sell',
            label: 'بيع واستبدال التارجت',
            icon: Target,
            iconBg: '#F5D061',
            iconColor: '#08080A'
        },
        {
            path: '/orders',
            label: 'طلباتي السابقة',
            icon: FileText,
            iconBg: '#D4A537',
            iconColor: '#08080A',
            authRequired: true
        },
        {
            path: '/profile',
            label: 'حسابي وبياناتي',
            icon: User,
            iconBg: '#D4A537',
            iconColor: '#08080A',
            authRequired: true
        },
        {
            path: '/settings',
            label: 'حماية وأمان الحساب',
            icon: Shield,
            iconBg: '#D4A537',
            iconColor: '#08080A',
            authRequired: true
        },
        {
            path: '/referrals',
            label: 'برنامج الإحالة والأرباح',
            icon: Share2,
            iconBg: '#D4A537',
            iconColor: '#08080A',
            authRequired: true
        },
        {
            path: '/developer',
            label: 'الربط البرمجي للمتاجر (B2B API)',
            icon: Key,
            iconBg: '#3B82F6',
            iconColor: '#FFFFFF',
            authRequired: true
        },
        {
            path: '/account-issues',
            label: 'مشاكل الحساب والشكاوى',
            icon: Headphones,
            iconBg: '#EF4444',
            iconColor: '#FFFFFF'
        },
        {
            path: '/about',
            label: 'من نحن (عن إمبراطور)',
            icon: Sparkles,
            iconBg: '#D4A537',
            iconColor: '#08080A'
        },
        {
            path: '/created-by',
            label: 'فريق التطوير والبرمجة',
            icon: Shield,
            iconBg: '#D4A537',
            iconColor: '#08080A'
        },
        {
            path: '/support',
            label: 'الدعم الفني المباشر',
            icon: Headphones,
            iconBg: '#22C55E',
            iconColor: '#08080A'
        },
    ];

    const isActive = (path) => {
        if (path === '/' && location.pathname === '/') return true;
        if (path !== '/' && location.pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="drawer-backdrop"
                onClick={onClose}
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 99998,
                }}
            />

            {/* Slide-in Panel */}
            <aside
                className={`drawer-panel ${isRtl ? 'rtl' : 'ltr'}`}
                style={{
                    zIndex: 99999,
                    paddingTop: 'env(safe-area-inset-top, 0px)',
                    paddingBottom: 'env(safe-area-inset-bottom, 0px)',
                }}
            >
                {/* Top Bar with Close Button & Theme/Lang */}
                <div style={{
                    padding: 'max(14px, env(safe-area-inset-top, 14px)) 16px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid rgba(212, 165, 55, 0.25)',
                    background: 'rgba(12, 12, 16, 0.95)',
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                }}>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'rgba(212, 165, 55, 0.15)',
                            border: '1.5px solid rgba(212, 165, 55, 0.4)',
                            borderRadius: '12px',
                            padding: '6px 12px',
                            height: '38px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            color: '#F5D061',
                            cursor: 'pointer',
                            fontSize: '13px',
                            fontWeight: '800',
                            transition: 'all 0.2s',
                        }}
                    >
                        <X size={18} />
                        <span>إغلاق</span>
                    </button>

                    {/* Logo in Drawer */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}>
                        <div style={{
                            width: '34px',
                            height: '34px',
                            borderRadius: '10px',
                            background: 'linear-gradient(135deg, #F8E8B8 0%, #D4A537 50%, #9A7210 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 0 12px rgba(212, 165, 55, 0.35)',
                        }}>
                            <Crown size={18} color="#050507" strokeWidth={2.5} />
                        </div>
                        <span style={{
                            fontSize: '17px',
                            fontWeight: '900',
                            color: '#FFFFFF',
                            letterSpacing: '0.5px',
                        }}>
                            EMPEROR
                        </span>
                    </div>

                    {/* Theme Toggle in Drawer */}
                    <button
                        onClick={toggleTheme}
                        title={theme === 'dark' ? 'الوضع الفاتح' : 'الوضع الليلي'}
                        style={{
                            background: 'rgba(212, 165, 55, 0.1)',
                            border: '1px solid rgba(212, 165, 55, 0.25)',
                            borderRadius: '10px',
                            width: '36px',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#D4A537',
                            cursor: 'pointer',
                        }}
                    >
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                </div>

                {/* Language Switcher Pill (EN | AR) */}
                <div style={{ padding: '14px 20px 10px' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#121217',
                        border: '1px solid rgba(212, 165, 55, 0.2)',
                        borderRadius: '24px',
                        padding: '4px',
                        gap: '4px',
                    }}>
                        <button
                            onClick={() => switchLanguage('en')}
                            style={{
                                flex: 1,
                                padding: '6px 12px',
                                borderRadius: '20px',
                                border: 'none',
                                background: language === 'en' ? 'linear-gradient(135deg, #F8E8B8 0%, #D4A537 100%)' : 'transparent',
                                color: language === 'en' ? '#08080A' : '#A0A0B0',
                                fontWeight: '800',
                                fontSize: '13px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            EN
                        </button>
                        <span style={{ color: '#40404A', fontSize: '12px' }}>|</span>
                        <button
                            onClick={() => switchLanguage('ar')}
                            style={{
                                flex: 1,
                                padding: '6px 12px',
                                borderRadius: '20px',
                                border: 'none',
                                background: language === 'ar' ? 'linear-gradient(135deg, #F8E8B8 0%, #D4A537 100%)' : 'transparent',
                                color: language === 'ar' ? '#08080A' : '#A0A0B0',
                                fontWeight: '800',
                                fontSize: '13px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            AR (عربي)
                        </button>
                    </div>
                </div>

                {/* User Profile Card (KA-Card Exact Match) */}
                <div style={{ padding: '0 20px 12px' }}>
                    {isAuthenticated ? (
                        <div style={{
                            background: '#101016',
                            border: '1px solid rgba(212, 165, 55, 0.3)',
                            borderRadius: '16px',
                            padding: '14px 16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '12px',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                {/* Avatar with Green Dot */}
                                <div style={{ position: 'relative' }}>
                                    <div style={{
                                        width: '42px',
                                        height: '42px',
                                        borderRadius: '12px',
                                        background: 'linear-gradient(135deg, #2A2415 0%, #151410 100%)',
                                        border: '1px solid #D4A537',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#D4A537',
                                        fontSize: '18px',
                                        fontWeight: '800',
                                    }}>
                                        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                    <span style={{
                                        position: 'absolute',
                                        bottom: '-2px',
                                        right: '-2px',
                                        width: '12px',
                                        height: '12px',
                                        borderRadius: '50%',
                                        background: '#22C55E',
                                        border: '2px solid #0B0B0E',
                                        boxShadow: '0 0 6px #22C55E',
                                    }} />
                                </div>

                                <div>
                                    <h4 style={{
                                        margin: '0 0 2px',
                                        fontSize: '14px',
                                        fontWeight: '800',
                                        color: '#FFFFFF',
                                    }}>
                                        {user?.name || 'عضو إمبراطور'}
                                    </h4>
                                    <span style={{
                                        fontSize: '11px',
                                        color: '#D4A537',
                                        fontWeight: '700',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                    }}>
                                        <Sparkles size={11} /> عضو معتمد
                                    </span>
                                </div>
                            </div>

                            {/* Copy User ID Button */}
                            <button
                                onClick={copyUserId}
                                title="نسخ معرف المستخدم"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '8px',
                                    padding: '4px 8px',
                                    color: '#A0A0B0',
                                    fontSize: '11px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                <span>{user?.id ? `EMP-${user.id}` : 'EMP-9705'}</span>
                                {copiedId ? <Check size={12} color="#22C55E" /> : <Copy size={12} />}
                            </button>
                        </div>
                    ) : (
                        <div style={{
                            background: '#101016',
                            border: '1px solid rgba(212, 165, 55, 0.25)',
                            borderRadius: '16px',
                            padding: '16px',
                            textAlign: 'center',
                        }}>
                            <p style={{ margin: '0 0 12px', fontSize: '13px', color: '#A0A0B0' }}>
                                سجل دخولك للوصول إلى محفظتك والشحن الفوري
                            </p>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <Link
                                    to="/login"
                                    onClick={onClose}
                                    style={{
                                        flex: 1,
                                        padding: '8px',
                                        borderRadius: '8px',
                                        background: 'rgba(212, 165, 55, 0.15)',
                                        border: '1px solid rgba(212, 165, 55, 0.3)',
                                        color: '#F8E8B8',
                                        fontSize: '13px',
                                        fontWeight: '700',
                                        textDecoration: 'none',
                                    }}
                                >
                                    تسجيل الدخول
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={onClose}
                                    style={{
                                        flex: 1,
                                        padding: '8px',
                                        borderRadius: '8px',
                                        background: 'linear-gradient(135deg, #F8E8B8 0%, #D4A537 100%)',
                                        color: '#08080A',
                                        fontSize: '13px',
                                        fontWeight: '800',
                                        textDecoration: 'none',
                                    }}
                                >
                                    حساب جديد
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* Wallet Balance & Recharge Box (Matches KA-Card Sidebar Exactly) */}
                <div style={{ padding: '0 20px 18px' }}>
                    <div style={{
                        background: 'linear-gradient(145deg, #14141E 0%, #0B0B0F 100%)',
                        border: '1px solid #D4A537',
                        borderRadius: '18px',
                        padding: '16px 18px',
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.6), 0 0 15px rgba(212, 165, 55, 0.1)',
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '12px',
                        }}>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '11px', color: '#8E8E98', fontWeight: '700', marginBottom: '2px' }}>
                                    رصيد المحفظة
                                </div>
                                <div style={{ fontSize: '18px', fontWeight: '900', color: '#FFFFFF', letterSpacing: '0.5px' }}>
                                    EGY {Number(user?.wallet?.balance || 0).toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 })}
                                </div>
                            </div>
                            <div style={{
                                width: '38px',
                                height: '38px',
                                borderRadius: '12px',
                                background: 'rgba(212, 165, 55, 0.15)',
                                border: '1px solid rgba(212, 165, 55, 0.4)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#F5D061',
                            }}>
                                <Wallet size={20} />
                            </div>
                        </div>

                        <Link
                            to="/deposit"
                            onClick={onClose}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                width: '100%',
                                padding: '12px',
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)',
                                color: '#000000',
                                fontSize: '14px',
                                fontWeight: '900',
                                textDecoration: 'none',
                                boxShadow: '0 4px 15px rgba(212, 165, 55, 0.3)',
                                boxSizing: 'border-box',
                            }}
                        >
                            <span>↗ اشحن الآن</span>
                        </Link>
                    </div>
                </div>

                {/* Section Divider / Label */}
                <div style={{
                    padding: '0 24px 8px',
                    fontSize: '12px',
                    fontWeight: '700',
                    color: '#8E8E98',
                    textTransform: 'uppercase',
                }}>
                    القائمة الرئيسية
                </div>

                {/* Navigation Items */}
                <nav style={{ flex: 1, padding: '0 14px 20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {navItems.map((item) => {
                        if (item.authRequired && !isAuthenticated) return null;
                        const active = isActive(item.path);

                        return (
                            <Link
                                key={item.label}
                                to={item.path}
                                onClick={(e) => {
                                    onClose();
                                    if (item.path === '/support') {
                                        e.preventDefault();
                                        window.dispatchEvent(new CustomEvent('emperor:open-support-modal'));
                                    }
                                }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '12px 14px',
                                    borderRadius: '12px',
                                    textDecoration: 'none',
                                    background: active
                                        ? 'linear-gradient(135deg, rgba(212, 165, 55, 0.18) 0%, rgba(20, 20, 26, 0.9) 100%)'
                                        : 'rgba(255, 255, 255, 0.02)',
                                    border: active
                                        ? '1px solid rgba(212, 165, 55, 0.4)'
                                        : '1px solid transparent',
                                    color: active ? '#D4A537' : '#D1D1DB',
                                    fontWeight: '700',
                                    fontSize: '14px',
                                    transition: 'all 0.2s ease',
                                    boxShadow: active ? '0 0 15px rgba(212, 165, 55, 0.15)' : 'none',
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '8px',
                                        background: 'rgba(212, 165, 55, 0.12)',
                                        border: '1px solid rgba(212, 165, 55, 0.25)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#F5D061',
                                    }}>
                                        <item.icon size={16} />
                                    </div>
                                    <span>{item.label}</span>
                                </div>
                                {isRtl ? <ChevronLeft size={16} color="#6E6E78" /> : <ChevronRight size={16} color="#6E6E78" />}
                            </Link>
                        );
                    })}

                    {/* Logout Button */}
                    {isAuthenticated && (
                        <button
                            onClick={handleLogout}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                width: '100%',
                                padding: '12px 14px',
                                marginTop: '10px',
                                borderRadius: '12px',
                                border: '1px solid rgba(239, 68, 68, 0.25)',
                                background: 'rgba(239, 68, 68, 0.06)',
                                color: '#EF4444',
                                fontWeight: '700',
                                fontSize: '14px',
                                cursor: 'pointer',
                                textAlign: 'right',
                            }}
                        >
                            <LogOut size={16} />
                            <span>تسجيل الخروج</span>
                        </button>
                    )}
                </nav>
            </aside>
        </>
    );
}
