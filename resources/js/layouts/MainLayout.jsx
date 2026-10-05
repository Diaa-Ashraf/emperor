import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    Home,
    CreditCard,
    ShoppingBag,
    Target,
    User,
    Bell,
    Moon,
    Sun,
    Menu,
    Search,
    Crown,
    Wallet,
    Globe,
    Gamepad2,
    Smartphone,
    TrendingUp,
    Plus,
    Sparkles,
    ChevronDown,
    LogIn,
    FileText,
    HelpCircle,
    ShieldCheck,
    Headphones
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../contexts/ToastContext';
import { notificationsApi } from '../api/endpoints';
import { onForegroundMessage } from '../services/firebaseMessaging';
import UserSidebarDrawer from '../components/navigation/UserSidebarDrawer';
import SupportContactModal from '../components/support/SupportContactModal';
import AppSplashScreen from '../components/ui/AppSplashScreen';
import HomeBannerSlider from '../components/home/HomeBannerSlider';
import PromotionalPopup from '../components/ui/PromotionalPopup';
import { playNotificationSound } from '../utils/soundHelper';

export default function MainLayout({ children, showBanner = true }) {
    const { user, isAuthenticated } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const { language, switchLanguage, t, isRtl } = useLanguage();
    const { addToast } = useToast();
    const location = useLocation();
    const navigate = useNavigate();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [supportModalOpen, setSupportModalOpen] = useState(false);
    const [unreadNotifications, setUnreadNotifications] = useState(0);
    const [headerScrolled, setHeaderScrolled] = useState(false);

    // Global listener for opening support modal from anywhere
    useEffect(() => {
        const handleOpenSupport = () => setSupportModalOpen(true);
        window.addEventListener('emperor:open-support-modal', handleOpenSupport);
        return () => window.removeEventListener('emperor:open-support-modal', handleOpenSupport);
    }, []);

    // Track scroll for header glass effect
    useEffect(() => {
        const onScroll = () => setHeaderScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Real-Time Notification & Live Sync Listener
    useEffect(() => {
        if (!isAuthenticated) {
            setUnreadNotifications(0);
            return;
        }

        let isMounted = true;
        const seenIds = new Set();
        let isInitialLoad = true;
        let prevCount = null;

        const syncNotifications = async () => {
            try {
                const res = await notificationsApi.checkLatest();
                if (!isMounted || !res?.data?.data) return;

                const { unread_count, notifications: unreadList } = res.data.data;
                const items = Array.isArray(unreadList) ? unreadList : [];

                if (typeof unread_count === 'number') {
                    setUnreadNotifications(unread_count);

                    if (isInitialLoad) {
                        // On initial mount, register existing IDs so we don't spam sounds
                        items.forEach(n => seenIds.add(n.id));
                        prevCount = unread_count;
                        isInitialLoad = false;
                        return;
                    }

                    // Check for newly arrived unread notifications
                    const brandNewItems = items.filter(n => !seenIds.has(n.id));

                    if (brandNewItems.length > 0 || (prevCount !== null && unread_count > prevCount)) {
                        // 1. Play real-time notification chime
                        playNotificationSound('default');

                        // 2. Add to seen IDs and trigger toasts + events
                        brandNewItems.forEach(n => {
                            seenIds.add(n.id);
                            const title = n.title || 'إشعار جديد';
                            const body = n.body ? ` - ${n.body}` : '';
                            addToast(`${title}${body}`, 'info');

                            // Broadcast live event to active page (e.g. NotificationsPage)
                            window.dispatchEvent(new CustomEvent('emperor:new-notification', { detail: n }));
                        });

                        window.dispatchEvent(new CustomEvent('emperor:refresh-notifications'));
                    }

                    prevCount = unread_count;
                }
            } catch (err) {
                // Silently retry on next tick
            }
        };

        // Immediate initial check
        syncNotifications();

        // Throttled visibility-aware polling (every 15s when tab is active)
        const interval = setInterval(() => {
            if (document.visibilityState === 'visible') {
                syncNotifications();
            }
        }, 15000);

        const handleVisibilityOrFocus = () => {
            if (document.visibilityState === 'visible') {
                syncNotifications();
            }
        };

        window.addEventListener('focus', handleVisibilityOrFocus);
        document.addEventListener('visibilitychange', handleVisibilityOrFocus);

        // Firebase Push Foreground Listener
        let unsubscribe = null;
        onForegroundMessage((payload) => {
            const title = payload.notification?.title || payload.data?.title || 'إشعار جديد';
            const body = payload.notification?.body || payload.data?.body || '';
            playNotificationSound('default');
            addToast(`${title}: ${body}`, 'info');
            syncNotifications();
        }).then((unsub) => {
            unsubscribe = unsub;
        });

        return () => {
            isMounted = false;
            clearInterval(interval);
            window.removeEventListener('focus', handleVisibilityOrFocus);
            document.removeEventListener('visibilitychange', handleVisibilityOrFocus);
            if (typeof unsubscribe === 'function') unsubscribe();
        };
    }, [isAuthenticated, addToast]);

    const isActive = (path) => {
        if (path === '/' && location.pathname === '/') return true;
        if (path !== '/' && location.pathname.startsWith(path)) return true;
        return false;
    };

    const formattedBalance = user?.wallet?.balance !== undefined
        ? Number(user.wallet.balance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : '0.00';

    const currency = language === 'en' ? 'EGP' : 'ج.م';

    const desktopNavLinks = [
        { to: '/', label: 'الرئيسية', icon: Home },
        { to: '#support', label: 'خدمة العملاء', icon: Headphones, isModalTrigger: true },
        { to: '/category/apps', label: 'تطبيقات البث', icon: Smartphone },
        {
            to: '/target/apps',
            label: 'بيع التارجت',
            icon: TrendingUp,
            badge: 'كاش فوري',
            isSpecial: true
        },
        { to: '/deposit', label: 'شحن المحفظة', icon: Wallet },
        { to: '/orders', label: 'طلباتي', icon: FileText, authRequired: true },
        { to: '/account-issues', label: 'الشكاوى', icon: HelpCircle },
    ];

    const isLight = theme === 'light';

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: isLight ? 'var(--bg-main)' : '#070709',
            color: isLight ? 'var(--text-primary)' : '#FFFFFF',
            fontFamily: 'var(--font-cairo)',
            direction: isRtl ? 'rtl' : 'ltr',
        }}>
            {/* ═══ Ultra-Chic Floating Glass Navbar ═══ */}
            <header className="emperor-header" style={{
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}>
                <div className="emperor-navbar-container" style={{
                    maxWidth: '1440px',
                    margin: '0 auto',
                    padding: '8px 18px',
                    background: isLight
                        ? (headerScrolled ? 'rgba(255, 255, 255, 0.96)' : 'rgba(240, 247, 255, 0.94)')
                        : (headerScrolled ? 'rgba(11, 11, 15, 0.95)' : 'rgba(14, 14, 20, 0.90)'),
                    backdropFilter: 'blur(20px) saturate(1.8)',
                    WebkitBackdropFilter: 'blur(20px) saturate(1.8)',
                    border: isLight ? '1.5px solid rgba(212, 165, 55, 0.45)' : '1.5px solid rgba(229, 195, 120, 0.75)',
                    borderRadius: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: isLight
                        ? '0 10px 30px rgba(15, 23, 42, 0.08), 0 0 20px rgba(212, 165, 55, 0.12)'
                        : (headerScrolled
                            ? '0 12px 40px rgba(0, 0, 0, 0.85), 0 0 25px rgba(212, 165, 55, 0.22)'
                            : '0 6px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(212, 165, 55, 0.15)'),
                    transition: 'all 0.3s ease',
                }}>
                    {/* ── Brand Logo ── */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: 0, flexShrink: 1 }}>
                        <Link
                            to="/"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                textDecoration: 'none',
                                minWidth: 0,
                                flexShrink: 0,
                            }}
                        >
                            <div className="header-logo-icon" style={{
                                width: '38px',
                                height: '38px',
                                borderRadius: '10px',
                                overflow: 'hidden',
                                border: '1.2px solid rgba(212, 165, 55, 0.6)',
                                boxShadow: '0 0 15px rgba(212, 165, 55, 0.4)',
                                flexShrink: 0,
                                background: isLight ? '#ffffff' : '#050508',
                            }}>
                                <img
                                    src="/images/logo.png"
                                    alt="EMPEROR CARD"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                                <span className="brand-title" style={{
                                    fontSize: '17px',
                                    fontWeight: '900',
                                    color: isLight ? '#0f172a' : '#FFFFFF',
                                    letterSpacing: '1px',
                                    lineHeight: 1.1,
                                    whiteSpace: 'nowrap',
                                }}>
                                    EMPEROR
                                </span>
                                <span className="brand-subtitle" style={{
                                    fontSize: '9px',
                                    fontWeight: '800',
                                    color: isLight ? '#b45309' : '#D4A537',
                                    letterSpacing: '0.4px',
                                    whiteSpace: 'nowrap',
                                }}>
                                    إمبراطور للشحن الرقمي
                                </span>
                            </div>
                        </Link>

                        {/* ── Desktop Nav Links ── */}
                        <nav
                            className="desktop-nav-links"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '3px',
                            }}
                        >
                            {desktopNavLinks.map((link) => {
                                if (link.authRequired && !isAuthenticated) return null;
                                const active = !link.isModalTrigger && isActive(link.to);
                                const isExtra = link.to === '/orders' || link.to === '/account-issues' || link.to === '/deposit';

                                if (link.isModalTrigger) {
                                    return (
                                        <button
                                            key={link.label}
                                            type="button"
                                            onClick={() => setSupportModalOpen(true)}
                                            className="nav-link-item"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px',
                                                padding: '7px 11px',
                                                borderRadius: '12px',
                                                border: '1px solid transparent',
                                                background: 'transparent',
                                                fontSize: '13px',
                                                fontWeight: '700',
                                                color: isLight ? '#475569' : '#D1D1DB',
                                                cursor: 'pointer',
                                                fontFamily: 'inherit',
                                                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                                                whiteSpace: 'nowrap',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.color = isLight ? '#b45309' : '#F5D061';
                                                e.currentTarget.style.background = isLight ? 'rgba(212, 165, 55, 0.12)' : 'rgba(212, 165, 55, 0.08)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.color = isLight ? '#475569' : '#D1D1DB';
                                                e.currentTarget.style.background = 'transparent';
                                            }}
                                        >
                                            <link.icon size={14} color={isLight ? '#64748b' : '#A0A0B0'} />
                                            <span>{link.label}</span>
                                        </button>
                                    );
                                }

                                return (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        className={`nav-link-item ${isExtra ? 'nav-link-extra' : ''}`}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '5px',
                                            padding: '7px 11px',
                                            borderRadius: '12px',
                                            textDecoration: 'none',
                                            fontSize: '13px',
                                            fontWeight: active ? '900' : '700',
                                            color: active
                                                ? (isLight ? '#b45309' : '#F5D061')
                                                : (isLight ? '#334155' : '#D1D1DB'),
                                            background: active
                                                ? (isLight ? 'rgba(212, 165, 55, 0.16)' : 'rgba(212, 165, 55, 0.12)')
                                                : link.isSpecial
                                                    ? (isLight ? 'rgba(212, 165, 55, 0.09)' : 'rgba(212, 165, 55, 0.06)')
                                                    : 'transparent',
                                            border: active
                                                ? (isLight ? '1px solid rgba(212, 165, 55, 0.5)' : '1px solid rgba(212, 165, 55, 0.35)')
                                                : link.isSpecial
                                                    ? '1px solid rgba(212, 165, 55, 0.2)'
                                                    : '1px solid transparent',
                                            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                                            position: 'relative',
                                            whiteSpace: 'nowrap',
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!active) {
                                                e.currentTarget.style.color = isLight ? '#b45309' : '#F5D061';
                                                e.currentTarget.style.background = isLight ? 'rgba(212, 165, 55, 0.12)' : 'rgba(212, 165, 55, 0.08)';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!active) {
                                                e.currentTarget.style.color = isLight ? '#334155' : '#D1D1DB';
                                                e.currentTarget.style.background = link.isSpecial ? (isLight ? 'rgba(212, 165, 55, 0.09)' : 'rgba(212, 165, 55, 0.06)') : 'transparent';
                                            }
                                        }}
                                    >
                                        <link.icon size={14} color={active || link.isSpecial ? (isLight ? '#b45309' : '#F5D061') : (isLight ? '#64748b' : '#A0A0B0')} />
                                        <span>{link.label}</span>
                                        {link.badge && (
                                            <span style={{
                                                fontSize: '9.5px',
                                                fontWeight: '900',
                                                background: 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)',
                                                color: '#000000',
                                                padding: '1px 5px',
                                                borderRadius: '5px',
                                                marginRight: '2px',
                                            }}>
                                                {link.badge}
                                            </span>
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    {/* ── Left Actions (Theme + Notifications + Wallet + User) ── */}
                    <div className="header-actions" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        flexShrink: 0,
                    }}>
                        {/* Theme Toggle (Sun / Moon) */}
                        <button
                            onClick={toggleTheme}
                            title={theme === 'dark' ? 'الوضع النهاري' : 'الوضع الليلي'}
                            className="header-action-circle-btn header-theme-btn"
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '11px',
                                background: isLight ? '#ffffff' : 'rgba(255, 255, 255, 0.04)',
                                border: isLight ? '1px solid rgba(212, 165, 55, 0.35)' : '1px solid rgba(212, 165, 55, 0.25)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: isLight ? '#b45309' : '#F5D061',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                flexShrink: 0,
                                boxShadow: isLight ? '0 2px 8px rgba(15, 23, 42, 0.05)' : 'none',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = isLight ? '#b45309' : '#F5D061';
                                e.currentTarget.style.background = isLight ? 'rgba(212, 165, 55, 0.15)' : 'rgba(212, 165, 55, 0.12)';
                                e.currentTarget.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = isLight ? 'rgba(212, 165, 55, 0.35)' : 'rgba(212, 165, 55, 0.25)';
                                e.currentTarget.style.background = isLight ? '#ffffff' : 'rgba(255, 255, 255, 0.04)';
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >
                            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                        </button>

                        {/* Notifications Bell */}
                        <Link
                            to={isAuthenticated ? "/notifications" : "/login"}
                            title="الإشعارات"
                            className="header-action-circle-btn header-notifications-btn"
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '11px',
                                background: isLight ? '#ffffff' : 'rgba(255, 255, 255, 0.04)',
                                border: isLight ? '1px solid rgba(212, 165, 55, 0.35)' : '1px solid rgba(212, 165, 55, 0.25)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: unreadNotifications > 0 ? (isLight ? '#b45309' : '#F5D061') : (isLight ? '#64748b' : '#D1D1DB'),
                                textDecoration: 'none',
                                position: 'relative',
                                transition: 'all 0.2s ease',
                                flexShrink: 0,
                                boxShadow: isLight ? '0 2px 8px rgba(15, 23, 42, 0.05)' : 'none',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = isLight ? '#b45309' : '#F5D061';
                                e.currentTarget.style.background = isLight ? 'rgba(212, 165, 55, 0.15)' : 'rgba(212, 165, 55, 0.12)';
                                e.currentTarget.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = isLight ? 'rgba(212, 165, 55, 0.35)' : 'rgba(212, 165, 55, 0.25)';
                                e.currentTarget.style.background = isLight ? '#ffffff' : 'rgba(255, 255, 255, 0.04)';
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >
                            <Bell size={16} />
                            {unreadNotifications > 0 && (
                                <span style={{
                                    position: 'absolute',
                                    top: '-3px',
                                    right: '-3px',
                                    minWidth: '15px',
                                    height: '15px',
                                    borderRadius: '7.5px',
                                    background: '#EF4444',
                                    color: '#FFFFFF',
                                    fontSize: '8.5px',
                                    fontWeight: '900',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '0 3px',
                                    border: isLight ? '2px solid #ffffff' : '2px solid #070709',
                                }}>
                                    {unreadNotifications > 99 ? '99+' : unreadNotifications}
                                </span>
                            )}
                        </Link>

                        {/* Luxury Wallet Capsule with Direct "+ اشحن" Button */}
                        <div className="header-wallet-capsule" style={{
                            display: 'flex',
                            alignItems: 'center',
                            background: isLight ? '#ffffff' : 'rgba(15, 15, 22, 0.95)',
                            border: isLight ? '1.2px solid rgba(212, 165, 55, 0.5)' : '1.2px solid rgba(212, 165, 55, 0.45)',
                            borderRadius: '13px',
                            padding: '3px 4px 3px 10px',
                            gap: '6px',
                            boxShadow: isLight
                                ? '0 4px 16px rgba(15, 23, 42, 0.06), 0 0 10px rgba(212, 165, 55, 0.08)'
                                : '0 4px 15px rgba(0, 0, 0, 0.5), 0 0 10px rgba(212, 165, 55, 0.1)',
                            flexShrink: 0,
                        }}>
                            <Link
                                to={isAuthenticated ? "/wallet" : "/login"}
                                title="المحفظة والرصيد"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    textDecoration: 'none',
                                    color: isLight ? '#0f172a' : '#FFFFFF',
                                    fontSize: '12.5px',
                                    fontWeight: '800',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    borderRadius: '6px',
                                    background: isLight ? 'rgba(212, 165, 55, 0.2)' : 'rgba(212, 165, 55, 0.15)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Wallet size={13} color={isLight ? '#b45309' : '#F5D061'} />
                                </div>
                                <span style={{ letterSpacing: '0.3px' }}>{formattedBalance}</span>
                                <span className="wallet-currency-label" style={{ fontSize: '10.5px', color: '#16a34a', fontWeight: '900' }}>{currency}</span>
                            </Link>

                            <Link
                                to="/deposit"
                                title="شحن رصيد المحفظة"
                                className="header-recharge-btn"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '3px',
                                    padding: '4px 8px',
                                    borderRadius: '8px',
                                    background: 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)',
                                    color: '#000000',
                                    fontSize: '11px',
                                    fontWeight: '900',
                                    textDecoration: 'none',
                                    boxShadow: '0 2px 8px rgba(212, 165, 55, 0.25)',
                                    transition: 'all 0.15s ease',
                                    whiteSpace: 'nowrap',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(212, 165, 55, 0.45)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(212, 165, 55, 0.25)';
                                }}
                            >
                                <Plus size={12} strokeWidth={3} />
                                <span className="recharge-btn-text">اشحن</span>
                            </Link>
                        </div>

                        {/* User Profile Pill (Desktop only) or Login Button */}
                        {isAuthenticated ? (
                            <Link
                                to="/profile"
                                className="user-profile-header-btn"
                                title="الملف الشخصي"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '4px 8px',
                                    borderRadius: '11px',
                                    background: isLight ? '#ffffff' : 'rgba(212, 165, 55, 0.08)',
                                    border: isLight ? '1.2px solid rgba(212, 165, 55, 0.45)' : '1.2px solid rgba(212, 165, 55, 0.35)',
                                    color: isLight ? '#0f172a' : '#FFFFFF',
                                    textDecoration: 'none',
                                    transition: 'all 0.2s ease',
                                    flexShrink: 0,
                                    boxShadow: isLight ? '0 2px 8px rgba(15, 23, 42, 0.05)' : 'none',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = isLight ? '#f8fafc' : 'rgba(212, 165, 55, 0.18)';
                                    e.currentTarget.style.borderColor = '#D4A537';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = isLight ? '#ffffff' : 'rgba(212, 165, 55, 0.08)';
                                    e.currentTarget.style.borderColor = isLight ? 'rgba(212, 165, 55, 0.45)' : 'rgba(212, 165, 55, 0.35)';
                                }}
                            >
                                <div style={{
                                    width: '26px',
                                    height: '26px',
                                    borderRadius: '8px',
                                    background: 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#070709',
                                    fontSize: '12px',
                                    fontWeight: '900',
                                }}>
                                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                </div>
                                <span className="user-profile-name" style={{
                                    fontSize: '12px',
                                    fontWeight: '800',
                                    maxWidth: '75px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    color: isLight ? '#0f172a' : '#FFFFFF',
                                }}>
                                    {user?.name?.split(' ')[0] || 'حسابي'}
                                </span>
                            </Link>
                        ) : (
                            <Link
                                to="/login"
                                className="header-login-btn"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    padding: '6px 12px',
                                    borderRadius: '11px',
                                    background: isLight ? 'linear-gradient(135deg, #F8E8B8 0%, #D4A537 100%)' : 'rgba(212, 165, 55, 0.12)',
                                    border: isLight ? '1.2px solid rgba(212, 165, 55, 0.5)' : '1.2px solid rgba(212, 165, 55, 0.4)',
                                    color: isLight ? '#0f172a' : '#F5D061',
                                    fontSize: '12.5px',
                                    fontWeight: '800',
                                    textDecoration: 'none',
                                    transition: 'all 0.2s ease',
                                    flexShrink: 0,
                                }}
                            >
                                <LogIn size={14} />
                                <span>دخول</span>
                            </Link>
                        )}

                        {/* Dedicated Hamburger / Drawer Toggle Button (ALWAYS VISIBLE) */}
                        <button
                            onClick={() => setDrawerOpen(true)}
                            title="القائمة الكاملة"
                            className="header-hamburger-btn"
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '11px',
                                background: 'rgba(212, 165, 55, 0.15)',
                                border: '1.2px solid #D4A537',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#F5D061',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                flexShrink: 0,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(212, 165, 55, 0.3)';
                                e.currentTarget.style.transform = 'scale(1.05)';
                                e.currentTarget.style.boxShadow = '0 0 12px rgba(212, 165, 55, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(212, 165, 55, 0.15)';
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <Menu size={18} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Initial Luxury App Splash Screen / Preloader */}
            <AppSplashScreen />

            {/* Sidebar Drawer */}
            <UserSidebarDrawer
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            />

            {/* Support Contact Modal (WhatsApp & Live Help) */}
            <SupportContactModal
                isOpen={supportModalOpen}
                onClose={() => setSupportModalOpen(false)}
            />

            {/* Promotional Popup Modal (Active if a popup banner is created) */}
            <PromotionalPopup />

            {/* ═══ Main Content ═══ */}
            <main className="emperor-main-layout-content" style={{ flex: 1, paddingBottom: '80px', width: '100%', overflowX: 'hidden' }}>
                <div className="emperor-main-container">
                    {showBanner && <HomeBannerSlider />}
                    {children}
                </div>
            </main>

            {/* ═══ Bottom Navigation (Mobile Only) ═══ */}
            <nav className="emperor-bottom-nav mobile-bottom-bar">
                <BottomNavItem
                    to="/"
                    icon={Home}
                    label="الرئيسية"
                    active={isActive('/')}
                />
                <BottomNavItem
                    to="/category/games"
                    icon={Gamepad2}
                    label="الألعاب"
                    active={isActive('/category/games')}
                />
                <BottomNavItem
                    to="/target/apps"
                    icon={Target}
                    label="بيع التارجت"
                    active={isActive('/target/apps')}
                />
                <BottomNavItem
                    to="/deposit"
                    icon={Wallet}
                    label="شحن المحفظة"
                    active={isActive('/deposit')}
                />
                <button
                    onClick={() => setDrawerOpen(true)}
                    className={`emperor-bottom-nav-item${drawerOpen ? ' active' : ''}`}
                >
                    <User size={19} />
                    <span>{isAuthenticated ? 'حسابي' : 'دخول'}</span>
                </button>
            </nav>

            {/* ═══ Premium Footer ═══ */}
            <footer style={{
                backgroundColor: isLight ? '#f1f7fc' : '#0A0A0F',
                borderTop: isLight ? '1px solid rgba(212, 165, 55, 0.35)' : '1px solid rgba(212, 165, 55, 0.2)',
                padding: '48px 20px 88px',
                marginTop: 'auto',
            }}>
                <div style={{
                    maxWidth: '1360px',
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
                    gap: '36px',
                }}>
                    {/* Brand Column */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                            <div style={{
                                width: '38px',
                                height: '38px',
                                borderRadius: '10px',
                                overflow: 'hidden',
                                border: '1.2px solid rgba(212, 165, 55, 0.5)',
                                boxShadow: '0 0 15px rgba(212, 165, 55, 0.4)',
                                background: isLight ? '#ffffff' : '#050508',
                            }}>
                                <img
                                    src="/images/logo.png"
                                    alt="EMPEROR CARD"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            </div>
                            <span style={{
                                fontSize: '18px',
                                fontWeight: '900',
                                color: isLight ? '#0f172a' : '#FFFFFF',
                                letterSpacing: '1px',
                            }}>
                                EMPEROR
                            </span>
                        </div>
                        <p style={{
                            color: isLight ? '#475569' : '#A0A0B0',
                            fontSize: '13px',
                            lineHeight: '1.8',
                            margin: 0,
                            maxWidth: '320px',
                        }}>
                            منصة إمبراطور — المنصة الأولى في مصر والشرق الأوسط لشحن الألعاب، بطاقات الهدايا الرقمية، وتسييل التارجت بأعلى سعر وأمان تام.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{
                            color: isLight ? '#b45309' : '#F5D061',
                            fontSize: '14px',
                            fontWeight: '800',
                            marginBottom: '14px',
                        }}>
                            أقسام المنصة والخدمات
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {[
                                { to: '/category/games', label: 'شحن الألعاب والبطاقات' },
                                { to: '/category/apps', label: 'تطبيقات البث والشات' },
                                { to: '/target/apps', label: 'بيع واستبدال التارجت' },
                                { to: '/deposit', label: 'شحن رصيد المحفظة (إيداع)' },
                                { to: '/referrals', label: 'برنامج الإحالة والعمولات' },
                                { to: '/about', label: 'من نحن (عن إمبراطور)' },
                                { to: '/account-issues', label: 'مشاكل الحساب والشكاوى' },
                                { to: '/support', label: 'الدعم الفني المباشر' },
                            ].map(link => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    style={{
                                        color: isLight ? '#64748b' : '#8E8E98',
                                        textDecoration: 'none',
                                        fontSize: '13px',
                                        fontWeight: '600',
                                        transition: 'color 0.2s',
                                    }}
                                    onMouseEnter={e => e.target.style.color = isLight ? '#b45309' : '#F5D061'}
                                    onMouseLeave={e => e.target.style.color = isLight ? '#64748b' : '#8E8E98'}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Payment Methods */}
                    <div>
                        <h4 style={{
                            color: isLight ? '#b45309' : '#F5D061',
                            fontSize: '14px',
                            fontWeight: '800',
                            marginBottom: '14px',
                        }}>
                            بوابات الدفع والتحويل المعتمدة
                        </h4>
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '6px',
                        }}>
                            {['Vodafone Cash', 'InstaPay Egypt', 'Orange Cash', 'Etisalat Cash', 'USDT TRC20', 'Binance Pay', 'تحويل بنكي'].map(pm => (
                                <span key={pm} style={{
                                    fontSize: '11px',
                                    fontWeight: '700',
                                    color: isLight ? '#92400e' : '#F5D061',
                                    background: isLight ? 'rgba(212, 165, 55, 0.15)' : 'rgba(212, 165, 55, 0.1)',
                                    border: isLight ? '1px solid rgba(212, 165, 55, 0.4)' : '1px solid rgba(212, 165, 55, 0.25)',
                                    padding: '4px 10px',
                                    borderRadius: '8px',
                                }}>
                                    {pm}
                                </span>
                            ))}
                        </div>
                        <div style={{
                            marginTop: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: '#16a34a',
                            fontSize: '12px',
                            fontWeight: '700',
                        }}>
                            <ShieldCheck size={16} />
                            <span>نظام مشفر بالكامل — أمان وحماية للعمليات 100%</span>
                        </div>
                    </div>
                </div>

                {/* Copyright & Created By */}
                <div style={{
                    maxWidth: '1360px',
                    margin: '32px auto 0',
                    paddingTop: '20px',
                    borderTop: isLight ? '1px solid rgba(210, 228, 245, 0.8)' : '1px solid rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    fontSize: '12.5px',
                    color: isLight ? '#64748b' : '#8E8E98',
                }}>
                    <div>
                        جميع الحقوق محفوظة © {new Date().getFullYear()} — منصة إمبراطور
                    </div>
                    <div>
                        <Link
                            to="/created-by"
                            style={{
                                color: isLight ? '#b45309' : '#D4A537',
                                textDecoration: 'none',
                                fontWeight: '700',
                            }}
                        >
                            تم التطوير بواسطة فريق العمل
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function BottomNavItem({ to, icon: Icon, label, active }) {
    return (
        <Link
            to={to}
            className={`emperor-bottom-nav-item${active ? ' active' : ''}`}
            style={{
                textDecoration: 'none',
                color: active ? '#F5D061' : '#8E8E98',
            }}
        >
            <Icon size={19} color={active ? '#F5D061' : '#8E8E98'} />
            <span style={{ fontSize: '11px', fontWeight: active ? '800' : '600' }}>{label}</span>
        </Link>
    );
}
