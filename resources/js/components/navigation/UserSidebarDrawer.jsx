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
            iconBadgeBg: 'rgba(212, 165, 55, 0.15)',
            iconBadgeColor: 'var(--gold-400, #D4A537)'
        },
        {
            path: '/profile',
            label: t('myAccount', 'حسابي'),
            icon: User,
            iconBadgeBg: 'rgba(212, 165, 55, 0.15)',
            iconBadgeColor: 'var(--gold-400, #D4A537)',
            authRequired: true
        },
        {
            path: '/settings',
            label: t('security', 'حماية الحساب'),
            icon: Shield,
            iconBadgeBg: 'rgba(212, 165, 55, 0.15)',
            iconBadgeColor: 'var(--gold-400, #D4A537)',
            authRequired: true
        },
        {
            path: '/referrals',
            label: t('referrals', 'رابط الإحالة اكسب واسحب'),
            icon: Share2,
            iconBadgeBg: 'rgba(212, 165, 55, 0.15)',
            iconBadgeColor: 'var(--gold-400, #D4A537)',
            authRequired: true
        },
        {
            path: '/orders',
            label: t('myOrders', 'طلباتي'),
            icon: FileText,
            iconBadgeBg: 'rgba(212, 165, 55, 0.15)',
            iconBadgeColor: 'var(--gold-400, #D4A537)',
            authRequired: true
        },
        {
            path: '/target/apps',
            label: t('targetSelling', 'سحب وبيع التارجت'),
            icon: Target,
            iconBadgeBg: 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)',
            iconBadgeColor: '#000000'
        },
        {
            path: '/wallet',
            label: t('financialTransfers', 'التحويلات المالية'),
            icon: Wallet,
            iconBadgeBg: 'rgba(212, 165, 55, 0.15)',
            iconBadgeColor: 'var(--gold-400, #D4A537)',
            authRequired: true
        },
        {
            path: '/developer',
            label: t('developerApi', 'API للمطورين'),
            icon: Key,
            iconBadgeBg: 'rgba(212, 165, 55, 0.15)',
            iconBadgeColor: 'var(--gold-400, #D4A537)',
            authRequired: true,
            condition: (u) => Boolean(u?.has_api_access || u?.api_access_status === 'active' || u?.is_admin || u?.role === 'admin' || u?.role === 'api_client')
        },
        {
            path: '/created-by',
            label: t('createdBy', 'تم الإنشاء بواسطة'),
            icon: Code,
            iconBadgeBg: 'rgba(212, 165, 55, 0.15)',
            iconBadgeColor: 'var(--gold-400, #D4A537)'
        },
        {
            path: '/support',
            label: t('support', 'اتصل بنا والدعم'),
            icon: Headphones,
            iconBadgeBg: 'rgba(34, 197, 94, 0.15)',
            iconBadgeColor: '#22C55E'
        },
        {
            path: '/settings',
            label: t('settings', 'الإعدادات العامة'),
            icon: Settings,
            iconBadgeBg: 'rgba(212, 165, 55, 0.15)',
            iconBadgeColor: 'var(--gold-400, #D4A537)',
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

            {/* Slide-in Panel */}
            <aside
                className={`drawer-panel ${isRtl ? 'rtl' : 'ltr'}`}
                style={{
                    paddingTop: 'env(safe-area-inset-top, 0px)',
                    paddingBottom: 'env(safe-area-inset-bottom, 0px)',
                }}
            >
                {/* ── 1. Top Header: Collapse Arrow + Brand Logo + Theme Switcher (Sticky at top) ── */}
                <div style={{
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    position: 'sticky',
                    top: 0,
                    zIndex: 40,
                    background: isLight ? 'rgba(255, 255, 255, 0.94)' : 'rgba(12, 12, 18, 0.94)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    borderBottom: isLight ? '1px solid rgba(212, 165, 55, 0.2)' : '1px solid rgba(212, 165, 55, 0.12)',
                }}>
                    {/* Collapse Drawer Arrow Button (Circle) */}
                    <button
                        onClick={onClose}
                        title={t('close', 'إغلاق')}
                        style={{
                            width: '34px',
                            height: '34px',
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
                            width: '34px',
                            height: '34px',
                            borderRadius: '9px',
                            overflow: 'hidden',
                            border: '1.2px solid rgba(212, 165, 55, 0.6)',
                            boxShadow: '0 0 12px rgba(212, 165, 55, 0.35)',
                            background: isLight ? '#ffffff' : '#050508',
                        }}>
                            <img
                                src={getSiteLogo()}
                                alt="EMPEROR"
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            />
                        </div>
                        <span style={{
                            fontSize: '17px',
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
                            width: '34px',
                            height: '34px',
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
                        {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                    </button>
                </div>

                {/* ── 2. Language Switcher Pill (EN | AR 🌐) ── */}
                <div style={{ padding: '12px 16px 10px', display: 'flex', justifyContent: 'center' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        background: isLight ? '#ffffff' : 'rgba(255, 255, 255, 0.03)',
                        border: isLight ? '1px solid rgba(212, 165, 55, 0.35)' : '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '20px',
                        padding: '3px 12px',
                        gap: '8px',
                        fontSize: '11.5px',
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
                                fontSize: '11.5px',
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
                                fontSize: '11.5px',
                                cursor: 'pointer',
                                padding: 0,
                            }}
                        >
                            AR
                        </button>
                        <Globe size={13} color="var(--gold-400, #D4A537)" />
                    </div>
                </div>

                {/* ── 3. User Profile Card ── */}
                <div style={{ padding: '0 14px 10px' }}>
                    {isAuthenticated ? (
                        <div style={{
                            background: isLight ? '#ffffff' : 'rgba(18, 18, 24, 0.85)',
                            border: isLight ? '1.5px solid rgba(212, 165, 55, 0.4)' : '1px solid rgba(212, 165, 55, 0.22)',
                            borderRadius: '16px',
                            padding: '12px 14px',
                            position: 'relative',
                            boxShadow: isLight ? '0 4px 14px rgba(0, 0, 0, 0.04)' : '0 6px 18px rgba(0, 0, 0, 0.4)',
                        }}>
                            {/* Copy User ID Pill on Top Corner */}
                            <div style={{
                                position: 'absolute',
                                top: '10px',
                                [isRtl ? 'left' : 'right']: '10px',
                                zIndex: 2,
                            }}>
                                <button
                                    onClick={copyUserId}
                                    title={t('copyUserId', 'نسخ معرف المستخدم')}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        background: isLight ? 'rgba(212, 165, 55, 0.15)' : 'rgba(212, 165, 55, 0.12)',
                                        border: isLight ? '1px solid rgba(212, 165, 55, 0.45)' : '1px solid rgba(212, 165, 55, 0.35)',
                                        borderRadius: '7px',
                                        padding: '2px 6px',
                                        color: isLight ? '#9A7210' : '#F5D061',
                                        fontSize: '9.5px',
                                        fontWeight: '800',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <span>{userDisplayId}</span>
                                    {copiedId ? <Check size={10} color="#22C55E" /> : <Copy size={10} />}
                                </button>
                            </div>

                            {/* User details row */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
                                {/* Avatar with active status green circle */}
                                <div style={{ position: 'relative', flexShrink: 0 }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '12px',
                                        background: 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)',
                                        border: '1.5px solid rgba(212, 165, 55, 0.8)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#08080A',
                                        fontSize: '16px',
                                        fontWeight: '900',
                                        boxShadow: '0 4px 12px rgba(212, 165, 55, 0.35)',
                                    }}>
                                        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                    {/* Green Active Dot */}
                                    <span style={{
                                        position: 'absolute',
                                        bottom: '-2px',
                                        [isRtl ? 'left' : 'right']: '-2px',
                                        width: '10px',
                                        height: '10px',
                                        borderRadius: '50%',
                                        background: '#22c55e',
                                        border: isLight ? '2px solid #ffffff' : '2px solid #101015',
                                        boxShadow: '0 0 6px #22c55e',
                                    }} />
                                </div>

                                <div style={{
                                    minWidth: 0,
                                    flex: 1,
                                    paddingInlineEnd: '75px', // Guarantees zero overlap with the ID badge
                                }}>
                                    <h4 style={{
                                        margin: '0 0 2px',
                                        fontSize: '12.5px',
                                        fontWeight: '800',
                                        color: isLight ? '#0F172A' : '#FFFFFF',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        lineHeight: 1.25,
                                    }}>
                                        {user?.name || 'User'}
                                    </h4>
                                    <span style={{
                                        fontSize: '10.5px',
                                        fontWeight: '800',
                                        color: isLight ? '#9A7210' : '#F5D061',
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
                            padding: '14px',
                            textAlign: 'center',
                        }}>
                            <p style={{ margin: '0 0 10px', fontSize: '12.5px', color: isLight ? '#64748b' : '#A0A0B0', fontWeight: '600' }}>
                                {t('loginPrompt', 'سجل دخولك للوصول إلى محفظتك والشحن الفوري')}
                            </p>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <Link
                                    to="/login"
                                    onClick={onClose}
                                    style={{
                                        flex: 1,
                                        padding: '8px',
                                        borderRadius: '10px',
                                        background: 'rgba(212, 165, 55, 0.15)',
                                        border: '1px solid rgba(212, 165, 55, 0.4)',
                                        color: isLight ? '#9a7210' : '#F5D061',
                                        fontSize: '12.5px',
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
                                        padding: '8px',
                                        borderRadius: '10px',
                                        background: 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)',
                                        color: '#000000',
                                        fontSize: '12.5px',
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

                {/* ── 4. Wallet Card (Moves naturally in the scroll stream) ── */}
                <div style={{ padding: '0 14px 12px' }}>
                    <div style={{
                        background: isLight
                            ? 'linear-gradient(145deg, #ffffff 0%, #FFFDF5 100%)'
                            : 'linear-gradient(145deg, #161622 0%, #0e0e16 100%)',
                        border: isLight ? '1.5px solid rgba(212, 165, 55, 0.45)' : '1px solid rgba(212, 165, 55, 0.35)',
                        borderRadius: '16px',
                        padding: '14px',
                        boxShadow: isLight
                            ? '0 4px 16px rgba(0, 0, 0, 0.04)'
                            : '0 6px 20px rgba(0, 0, 0, 0.45), 0 0 12px rgba(212, 165, 55, 0.1)',
                    }}>
                        {/* Top row: Wallet Icon & Balance Text */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '12px',
                        }}>
                            {/* Gold Rounded Wallet Icon Frame */}
                            <div style={{
                                width: '38px',
                                height: '38px',
                                borderRadius: '11px',
                                background: 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)',
                                border: '1px solid rgba(212, 165, 55, 0.6)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#08080A',
                                boxShadow: '0 3px 12px rgba(212, 165, 55, 0.35)',
                                flexShrink: 0,
                            }}>
                                <Wallet size={19} />
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
                                    fontSize: '18px',
                                    fontWeight: '900',
                                    color: isLight ? '#0F172A' : '#FFFFFF',
                                    letterSpacing: '0.5px',
                                    fontFamily: 'var(--font-cairo)',
                                }}>
                                    {language === 'en' ? 'EGP' : 'ج.م'} {Number(user?.wallet?.balance || 0).toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 })}
                                </div>
                            </div>
                        </div>

                        {/* Gold Action Button: ↗ اشحن الآن */}
                        <Link
                            to="/deposit"
                            onClick={onClose}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '6px',
                                width: '100%',
                                padding: '9px 12px',
                                borderRadius: '11px',
                                background: 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)',
                                color: '#08080A',
                                fontSize: '13px',
                                fontWeight: '900',
                                textDecoration: 'none',
                                boxShadow: '0 3px 14px rgba(212, 165, 55, 0.35)',
                                boxSizing: 'border-box',
                                transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-1.5px)';
                                e.currentTarget.style.boxShadow = '0 5px 18px rgba(212, 165, 55, 0.5)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 3px 14px rgba(212, 165, 55, 0.35)';
                            }}
                        >
                            <span>↗ {t('chargeNow', 'اشحن الآن')}</span>
                        </Link>
                    </div>
                </div>

                {/* ── 5. Navigation Section Header: الحساب ⌄ ── */}
                <div style={{
                    padding: '2px 18px 6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '11.5px',
                    fontWeight: '800',
                    color: isLight ? '#64748B' : '#8E8E98',
                }}>
                    <span>{t('account', 'الحساب')}</span>
                    <ChevronDown size={13} />
                </div>

                {/* ── 6. Navigation Items (Flows in the single unified drawer scroll container) ── */}
                <nav style={{ padding: '0 12px 24px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
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
                                    padding: '9px 12px',
                                    borderRadius: '13px',
                                    textDecoration: 'none',
                                    background: active
                                        ? (isLight
                                            ? 'linear-gradient(135deg, rgba(212, 165, 55, 0.16) 0%, rgba(255, 255, 255, 0.95) 100%)'
                                            : 'linear-gradient(135deg, rgba(212, 165, 55, 0.22) 0%, rgba(18, 18, 24, 0.95) 100%)')
                                        : (isLight ? '#ffffff' : 'rgba(255, 255, 255, 0.03)'),
                                    border: active
                                        ? (isLight ? '1.5px solid rgba(212, 165, 55, 0.65)' : '1px solid rgba(212, 165, 55, 0.55)')
                                        : (isLight ? '1px solid rgba(226, 232, 240, 0.9)' : '1px solid rgba(255, 255, 255, 0.04)'),
                                    color: active
                                        ? (isLight ? '#9A7210' : '#F5D061')
                                        : (isLight ? '#1E293B' : '#FFFFFF'),
                                    fontWeight: active ? '900' : '800',
                                    fontSize: '13.5px',
                                    transition: 'all 0.2s ease',
                                    boxShadow: active
                                        ? '0 3px 12px rgba(212, 165, 55, 0.2)'
                                        : 'none',
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    {/* Rounded gold icon badge */}
                                    <div style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '9px',
                                        background: active
                                            ? 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)'
                                            : (isLight ? 'rgba(212, 165, 55, 0.12)' : 'rgba(212, 165, 55, 0.15)'),
                                        border: active
                                            ? '1px solid rgba(212, 165, 55, 0.8)'
                                            : (isLight ? '1px solid rgba(212, 165, 55, 0.25)' : '1px solid rgba(212, 165, 55, 0.25)'),
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: active ? '#08080A' : (isLight ? '#9A7210' : '#F5D061'),
                                        flexShrink: 0,
                                    }}>
                                        <item.icon size={16} />
                                    </div>
                                    <span>{item.label}</span>
                                </div>

                                {isRtl ? (
                                    <ChevronLeft size={15} color={isLight ? '#94A3B8' : '#64748B'} />
                                ) : (
                                    <ChevronRight size={15} color={isLight ? '#94A3B8' : '#64748B'} />
                                )}
                            </Link>
                        );
                    })}

                    {/* ── 7. Logout Button ── */}
                    {isAuthenticated && (
                        <button
                            onClick={handleLogout}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                width: '100%',
                                padding: '11px 14px',
                                marginTop: '10px',
                                borderRadius: '14px',
                                border: isLight ? '1.5px solid rgba(212, 165, 55, 0.6)' : '1px solid rgba(212, 165, 55, 0.4)',
                                background: isLight ? '#FFFDF8' : 'rgba(18, 18, 24, 0.95)',
                                color: isLight ? '#9a7210' : '#F5D061',
                                fontWeight: '900',
                                fontSize: '13.5px',
                                cursor: 'pointer',
                                boxShadow: isLight ? '0 3px 12px rgba(212, 165, 55, 0.15)' : '0 5px 18px rgba(0, 0, 0, 0.4), 0 0 12px rgba(212, 165, 55, 0.1)',
                                transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#F5D061';
                                e.currentTarget.style.transform = 'translateY(-1.5px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = isLight ? 'rgba(212, 165, 55, 0.6)' : 'rgba(212, 165, 55, 0.4)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <LogOut size={16} />
                            <span>{t('logout', 'تسجيل الخروج')}</span>
                        </button>
                    )}
                </nav>
            </aside>
        </>
    );
}
