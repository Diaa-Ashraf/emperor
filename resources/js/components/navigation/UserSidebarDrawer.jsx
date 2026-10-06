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
    Key,
    Globe,
    ChevronDown,
    ExternalLink
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useToast } from '../../contexts/ToastContext';
import { getSiteLogo, getSiteName } from '../../utils/settingsHelper';

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

    const userDisplayId = user?.id ? `${String(user.id).padStart(6, '0')}f39e...` : '9705f39e...';
    const copyUserId = () => {
        const idToCopy = user?.id ? `EMP-${user.id}` : 'EMP-9705F';
        navigator.clipboard.writeText(idToCopy);
        setCopiedId(true);
        success(t('copied') || 'تم النسخ بنجاح');
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
            label: t('home', 'الرئيسية'),
            icon: Home,
            iconBadgeBg: '#0284c7',
            iconBadgeColor: '#ffffff'
        },
        {
            path: '/profile',
            label: t('myAccount', 'حسابي'),
            icon: User,
            iconBadgeBg: '#0284c7',
            iconBadgeColor: '#ffffff',
            authRequired: true
        },
        {
            path: '/settings',
            label: t('security', 'حماية الحساب'),
            icon: Shield,
            iconBadgeBg: '#0284c7',
            iconBadgeColor: '#ffffff',
            authRequired: true
        },
        {
            path: '/referrals',
            label: t('referrals', 'رابط الإحالة'),
            icon: Share2,
            iconBadgeBg: '#0284c7',
            iconBadgeColor: '#ffffff',
            authRequired: true
        },
        {
            path: '/orders',
            label: t('myOrders', 'طلباتي'),
            icon: FileText,
            iconBadgeBg: '#0284c7',
            iconBadgeColor: '#ffffff',
            authRequired: true
        },
        {
            path: '/target/apps',
            label: t('targetSelling', 'بيع التارجت'),
            icon: Target,
            iconBadgeBg: '#D4A537',
            iconBadgeColor: '#000000'
        },
        {
            path: '/wallet',
            label: t('financialTransfers', 'التحويلات المالية'),
            icon: Wallet,
            iconBadgeBg: '#0284c7',
            iconBadgeColor: '#ffffff',
            authRequired: true
        },
        {
            path: '/developer',
            label: t('developerApi', 'API للمطورين'),
            icon: Key,
            iconBadgeBg: '#3B82F6',
            iconBadgeColor: '#FFFFFF',
            authRequired: true,
            condition: (u) => Boolean(u?.has_api_access || u?.api_access_status === 'active' || u?.is_admin || u?.role === 'admin' || u?.role === 'api_client')
        },
        {
            path: '/created-by',
            label: t('createdBy', 'تم الإنشاء بواسطة'),
            icon: Code,
            iconBadgeBg: '#64748B',
            iconBadgeColor: '#FFFFFF'
        },
        {
            path: '/support',
            label: t('support', 'اتصل بنا'),
            icon: Headphones,
            iconBadgeBg: '#22C55E',
            iconBadgeColor: '#FFFFFF'
        },
        {
            path: '/settings',
            label: t('settings', 'الإعدادات'),
            icon: Settings,
            iconBadgeBg: '#0284c7',
            iconBadgeColor: '#ffffff',
            authRequired: true
        },
    ];

    const isActive = (path) => {
        if (!path || typeof path !== 'string' || path.startsWith('#')) return false;
        if (path === '/' && location.pathname === '/') return true;
        if (path !== '/' && location.pathname.startsWith(path)) return true;
        return false;
    };

    const isLight = theme === 'light';

    return (
        <>
            {/* Backdrop */}
            <div
                className="drawer-backdrop"
                onClick={onClose}
            />

            {/* Slide-in Panel (Exact KA CARD Layout) */}
            <aside
                className={`drawer-panel ${isRtl ? 'rtl' : 'ltr'}`}
                style={{
                    paddingTop: 'env(safe-area-inset-top, 0px)',
                    paddingBottom: 'env(safe-area-inset-bottom, 0px)',
                }}
            >
                {/* ── 1. Top Header: Collapse Arrow + Brand Logo + Theme Switcher ── */}
                <div style={{
                    padding: '16px 18px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    position: 'relative',
                }}>
                    {/* Collapse Drawer Arrow Button (Circle) */}
                    <button
                        onClick={onClose}
                        title={t('close', 'إغلاق')}
                        style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: isLight ? '#ffffff' : 'rgba(255, 255, 255, 0.05)',
                            border: isLight ? '1.5px solid rgba(212, 165, 55, 0.4)' : '1px solid rgba(255, 255, 255, 0.12)',
                            color: isLight ? '#0F172A' : '#CBD5E1',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#D4A537';
                            e.currentTarget.style.color = '#F5D061';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = isLight ? 'rgba(212, 165, 55, 0.4)' : 'rgba(255, 255, 255, 0.12)';
                            e.currentTarget.style.color = isLight ? '#0F172A' : '#CBD5E1';
                        }}
                    >
                        {isRtl ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                    </button>

                    {/* Centered Brand Logo */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            border: '1.2px solid rgba(212, 165, 55, 0.6)',
                            boxShadow: '0 0 15px rgba(212, 165, 55, 0.4)',
                            background: isLight ? '#ffffff' : '#050508',
                        }}>
                            <img
                                src={getSiteLogo()}
                                alt="EMPEROR"
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            />
                        </div>
                        <span style={{
                            fontSize: '18px',
                            fontWeight: '900',
                            color: isLight ? '#0F172A' : '#FFFFFF',
                            letterSpacing: '1px',
                        }}>
                            EMPEROR
                        </span>
                    </div>

                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        title={theme === 'dark' ? t('lightMode', 'الوضع الفاتح') : t('darkMode', 'الوضع الليلي')}
                        style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: isLight ? '#ffffff' : 'rgba(255, 255, 255, 0.05)',
                            border: isLight ? '1.5px solid rgba(212, 165, 55, 0.4)' : '1px solid rgba(255, 255, 255, 0.12)',
                            color: isLight ? '#b45309' : '#D4A537',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                        }}
                    >
                        {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
                    </button>
                </div>

                {/* ── 2. Language Switcher Pill (EN | AR 🌐) ── */}
                <div style={{ padding: '0 20px 14px', display: 'flex', justifyContent: 'center' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        background: isLight ? '#ffffff' : 'rgba(255, 255, 255, 0.03)',
                        border: isLight ? '1px solid rgba(212, 165, 55, 0.35)' : '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '20px',
                        padding: '3px 12px',
                        gap: '8px',
                        fontSize: '12px',
                        fontWeight: '800',
                        color: isLight ? '#475569' : '#94A3B8',
                    }}>
                        <button
                            onClick={() => switchLanguage('en')}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: language === 'en' ? 'var(--gold-400, #D4A537)' : (isLight ? '#475569' : '#94A3B8'),
                                fontWeight: language === 'en' ? '900' : '700',
                                fontSize: '12px',
                                cursor: 'pointer',
                                padding: 0,
                            }}
                        >
                            EN
                        </button>
                        <span style={{ color: 'rgba(255, 255, 255, 0.2)', fontSize: '11px' }}>|</span>
                        <button
                            onClick={() => switchLanguage('ar')}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: language === 'ar' ? 'var(--gold-400, #D4A537)' : (isLight ? '#475569' : '#94A3B8'),
                                fontWeight: language === 'ar' ? '900' : '700',
                                fontSize: '12px',
                                cursor: 'pointer',
                                padding: 0,
                            }}
                        >
                            AR
                        </button>
                        <Globe size={13} color="var(--gold-400, #D4A537)" />
                    </div>
                </div>

                {/* ── 3. User Profile Card (Matches KA CARD Sidebar) ── */}
                <div style={{ padding: '0 18px 14px' }}>
                    {isAuthenticated ? (
                        <div style={{
                            background: isLight ? '#ffffff' : 'rgba(18, 18, 24, 0.85)',
                            border: isLight ? '1.5px solid rgba(212, 165, 55, 0.4)' : '1px solid rgba(212, 165, 55, 0.22)',
                            borderRadius: '18px',
                            padding: '14px 16px',
                            position: 'relative',
                            boxShadow: isLight ? '0 4px 16px rgba(0, 0, 0, 0.04)' : '0 6px 20px rgba(0, 0, 0, 0.4)',
                        }}>
                            {/* Copy User ID Pill on Top Corner */}
                            <div style={{
                                position: 'absolute',
                                top: '10px',
                                [isRtl ? 'left' : 'right']: '12px',
                            }}>
                                <button
                                    onClick={copyUserId}
                                    title={t('copyUserId', 'نسخ معرف المستخدم')}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        background: isLight ? '#f1f5f9' : 'rgba(2, 132, 199, 0.15)',
                                        border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(2, 132, 199, 0.35)',
                                        borderRadius: '8px',
                                        padding: '2px 7px',
                                        color: isLight ? '#0284c7' : '#38bdf8',
                                        fontSize: '10.5px',
                                        fontWeight: '800',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <span>{userDisplayId}</span>
                                    {copiedId ? <Check size={11} color="#22C55E" /> : <Copy size={11} />}
                                </button>
                            </div>

                            {/* User details row */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
                                {/* Avatar with active status green circle */}
                                <div style={{ position: 'relative', flexShrink: 0 }}>
                                    <div style={{
                                        width: '46px',
                                        height: '46px',
                                        borderRadius: '14px',
                                        background: isLight
                                            ? 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)'
                                            : 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%)',
                                        border: '1.5px solid rgba(56, 189, 248, 0.6)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#FFFFFF',
                                        fontSize: '18px',
                                        fontWeight: '900',
                                        boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)',
                                    }}>
                                        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                    {/* Green Active Dot */}
                                    <span style={{
                                        position: 'absolute',
                                        bottom: '-2px',
                                        [isRtl ? 'left' : 'right']: '-2px',
                                        width: '12px',
                                        height: '12px',
                                        borderRadius: '50%',
                                        background: '#22c55e',
                                        border: isLight ? '2px solid #ffffff' : '2px solid #101015',
                                        boxShadow: '0 0 8px #22c55e',
                                    }} />
                                </div>

                                <div style={{ minWidth: 0 }}>
                                    <h4 style={{
                                        margin: '0 0 2px',
                                        fontSize: '14.5px',
                                        fontWeight: '900',
                                        color: isLight ? '#0F172A' : '#FFFFFF',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}>
                                        {user?.name || 'User'}
                                    </h4>
                                    <span style={{
                                        fontSize: '11.5px',
                                        fontWeight: '800',
                                        color: isLight ? '#0284c7' : '#38bdf8',
                                    }}>
                                        {user?.role === 'admin' ? t('vipMember', 'عميل إمبراطور VIP') : t('storeMember', 'عضو المتجر')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div style={{
                            background: isLight ? '#ffffff' : 'rgba(18, 18, 24, 0.85)',
                            border: isLight ? '1px solid rgba(212, 165, 55, 0.35)' : '1px solid rgba(212, 165, 55, 0.22)',
                            borderRadius: '16px',
                            padding: '16px',
                            textAlign: 'center',
                        }}>
                            <p style={{ margin: '0 0 12px', fontSize: '13px', color: isLight ? '#64748b' : '#A0A0B0', fontWeight: '600' }}>
                                {t('loginPrompt', 'سجل دخولك للوصول إلى محفظتك والشحن الفوري')}
                            </p>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <Link
                                    to="/login"
                                    onClick={onClose}
                                    style={{
                                        flex: 1,
                                        padding: '9px',
                                        borderRadius: '10px',
                                        background: 'rgba(212, 165, 55, 0.15)',
                                        border: '1px solid rgba(212, 165, 55, 0.4)',
                                        color: isLight ? '#9a7210' : '#F5D061',
                                        fontSize: '13px',
                                        fontWeight: '800',
                                        textDecoration: 'none',
                                    }}
                                >
                                    {t('login', 'تسجيل الدخول')}
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={onClose}
                                    style={{
                                        flex: 1,
                                        padding: '9px',
                                        borderRadius: '10px',
                                        background: 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)',
                                        color: '#000000',
                                        fontSize: '13px',
                                        fontWeight: '900',
                                        textDecoration: 'none',
                                    }}
                                >
                                    {t('register', 'حساب جديد')}
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* ── 4. Wallet Card (Exact KA CARD Gradient & Blue Charge Button) ── */}
                <div style={{ padding: '0 18px 16px' }}>
                    <div style={{
                        background: isLight
                            ? 'linear-gradient(145deg, #ffffff 0%, #f0f9ff 100%)'
                            : 'linear-gradient(145deg, #161622 0%, #0e0e16 100%)',
                        border: isLight ? '1.5px solid rgba(2, 132, 199, 0.35)' : '1px solid rgba(212, 165, 55, 0.25)',
                        borderRadius: '18px',
                        padding: '16px',
                        boxShadow: isLight
                            ? '0 6px 20px rgba(0, 0, 0, 0.05)'
                            : '0 8px 24px rgba(0, 0, 0, 0.5), 0 0 15px rgba(2, 132, 199, 0.08)',
                    }}>
                        {/* Top row: Wallet Icon & Balance Text */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '14px',
                        }}>
                            {/* Blue Rounded Wallet Icon Frame */}
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, #0284c7 0%, #1e40af 100%)',
                                border: '1px solid rgba(56, 189, 248, 0.5)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#FFFFFF',
                                boxShadow: '0 4px 12px rgba(2, 132, 199, 0.4)',
                                flexShrink: 0,
                            }}>
                                <Wallet size={20} />
                            </div>

                            {/* Balance Info */}
                            <div style={{ textAlign: isRtl ? 'left' : 'right' }}>
                                <div style={{
                                    fontSize: '11px',
                                    fontWeight: '800',
                                    color: isLight ? '#9a7210' : '#F5D061',
                                    marginBottom: '2px',
                                }}>
                                    {t('walletBalance', 'رصيد المحفظة')}
                                </div>
                                <div style={{
                                    fontSize: '19px',
                                    fontWeight: '900',
                                    color: isLight ? '#0F172A' : '#FFFFFF',
                                    letterSpacing: '0.5px',
                                    fontFamily: 'var(--font-cairo)',
                                }}>
                                    {language === 'en' ? 'EGP' : 'ج.م'} {Number(user?.wallet?.balance || 0).toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 })}
                                </div>
                            </div>
                        </div>

                        {/* Cyan/Blue Glossy Action Button: ↗ اشحن الآن */}
                        <Link
                            to="/deposit"
                            onClick={onClose}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '6px',
                                width: '100%',
                                padding: '10px 14px',
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                                color: '#FFFFFF',
                                fontSize: '13.5px',
                                fontWeight: '900',
                                textDecoration: 'none',
                                boxShadow: '0 4px 16px rgba(2, 132, 199, 0.45)',
                                boxSizing: 'border-box',
                                transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 6px 20px rgba(2, 132, 199, 0.65)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 16px rgba(2, 132, 199, 0.45)';
                            }}
                        >
                            <span>↗ {t('chargeNow', 'اشحن الآن')}</span>
                        </Link>
                    </div>
                </div>

                {/* ── 5. Navigation Section Header: الحساب ⌄ ── */}
                <div style={{
                    padding: '0 22px 8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '12px',
                    fontWeight: '800',
                    color: isLight ? '#64748B' : '#8E8E98',
                }}>
                    <span>{t('account', 'الحساب')}</span>
                    <ChevronDown size={14} />
                </div>

                {/* ── 6. Navigation Items (Sleek Dark Rounded Pills with Blue Icon Boxes) ── */}
                <nav style={{ flex: 1, padding: '0 14px 20px', display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
                    {navItems.map((item) => {
                        if (item.authRequired && !isAuthenticated) return null;
                        if (item.condition && !item.condition(user)) return null;
                        const active = isActive(item.path);

                        return (
                            <Link
                                key={item.path + item.label}
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
                                    padding: '10px 14px',
                                    borderRadius: '14px',
                                    textDecoration: 'none',
                                    background: active
                                        ? (isLight
                                            ? 'linear-gradient(135deg, rgba(2, 132, 199, 0.12) 0%, rgba(255, 255, 255, 0.95) 100%)'
                                            : 'linear-gradient(135deg, rgba(2, 132, 199, 0.22) 0%, rgba(18, 18, 24, 0.95) 100%)')
                                        : (isLight ? '#ffffff' : 'rgba(255, 255, 255, 0.03)'),
                                    border: active
                                        ? (isLight ? '1.5px solid rgba(2, 132, 199, 0.6)' : '1px solid rgba(2, 132, 199, 0.5)')
                                        : (isLight ? '1px solid rgba(226, 232, 240, 0.9)' : '1px solid rgba(255, 255, 255, 0.04)'),
                                    color: active
                                        ? (isLight ? '#0284c7' : '#38bdf8')
                                        : (isLight ? '#1E293B' : '#FFFFFF'),
                                    fontWeight: active ? '900' : '800',
                                    fontSize: '14px',
                                    transition: 'all 0.2s ease',
                                    boxShadow: active
                                        ? '0 4px 14px rgba(2, 132, 199, 0.15)'
                                        : 'none',
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    {/* Rounded blue icon badge */}
                                    <div style={{
                                        width: '34px',
                                        height: '34px',
                                        borderRadius: '10px',
                                        background: active
                                            ? 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)'
                                            : (isLight ? 'rgba(2, 132, 199, 0.1)' : 'rgba(2, 132, 199, 0.15)'),
                                        border: active
                                            ? '1px solid rgba(56, 189, 248, 0.6)'
                                            : (isLight ? '1px solid rgba(2, 132, 199, 0.2)' : '1px solid rgba(2, 132, 199, 0.25)'),
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: active ? '#FFFFFF' : (isLight ? '#0284c7' : '#38bdf8'),
                                        flexShrink: 0,
                                    }}>
                                        <item.icon size={17} />
                                    </div>
                                    <span>{item.label}</span>
                                </div>

                                {isRtl ? (
                                    <ChevronLeft size={16} color={isLight ? '#94A3B8' : '#64748B'} />
                                ) : (
                                    <ChevronRight size={16} color={isLight ? '#94A3B8' : '#64748B'} />
                                )}
                            </Link>
                        );
                    })}

                    {/* ── 7. Logout Button (Matches KA CARD Gold Framed Card) ── */}
                    {isAuthenticated && (
                        <button
                            onClick={handleLogout}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                width: '100%',
                                padding: '13px 16px',
                                marginTop: '12px',
                                borderRadius: '16px',
                                border: isLight ? '1.5px solid rgba(212, 165, 55, 0.6)' : '1px solid rgba(212, 165, 55, 0.4)',
                                background: isLight ? '#FFFDF8' : 'rgba(18, 18, 24, 0.95)',
                                color: isLight ? '#9a7210' : '#F5D061',
                                fontWeight: '900',
                                fontSize: '14.5px',
                                cursor: 'pointer',
                                boxShadow: isLight ? '0 4px 14px rgba(212, 165, 55, 0.15)' : '0 6px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(212, 165, 55, 0.1)',
                                transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#F5D061';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = isLight ? 'rgba(212, 165, 55, 0.6)' : 'rgba(212, 165, 55, 0.4)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <LogOut size={17} />
                            <span>{t('logout', 'تسجيل الخروج')}</span>
                        </button>
                    )}
                </nav>
            </aside>
        </>
    );
}
