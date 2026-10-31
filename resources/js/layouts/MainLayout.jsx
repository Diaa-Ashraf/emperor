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
    Headphones,
    MessageCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../contexts/ToastContext';
import { notificationsApi } from '../api/endpoints';
import { onForegroundMessage } from '../services/firebaseMessaging';
import UserSidebarDrawer from '../components/navigation/UserSidebarDrawer';
import AppFooter from '../components/navigation/AppFooter';
import SupportContactModal from '../components/support/SupportContactModal';
import AppSplashScreen from '../components/ui/AppSplashScreen';
import PaymentNoticeModal from '../components/ui/PaymentNoticeModal';
import HomeBannerSlider from '../components/home/HomeBannerSlider';
import PromotionalPopup from '../components/ui/PromotionalPopup';
import { playNotificationSound } from '../utils/soundHelper';
import { getSiteLogo, getSiteName, getSiteDescription, getWhatsAppChannel } from '../utils/settingsHelper';

export default function MainLayout({ children, showBanner = false }) {
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
        if (!path || typeof path !== 'string' || path.startsWith('#')) return false;
        if (path === '/' && location.pathname === '/') return true;
        if (path !== '/' && location.pathname.startsWith(path)) return true;
        return false;
    };

    const rawBalanceNum = Number(user?.wallet?.balance || 0);
    const formattedBalance = user?.wallet?.balance !== undefined
        ? (rawBalanceNum % 1 === 0
            ? rawBalanceNum.toLocaleString('en-US', { maximumFractionDigits: 0 })
            : rawBalanceNum.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 2 }))
        : '0';

    const currency = language === 'en' ? 'EGP' : 'ج.م';

    const desktopNavLinks = [
        { to: '/', label: t('home', 'الرئيسية'), icon: Home },
        {
            to: '#whatsapp-channel',
            href: getWhatsAppChannel(),
            label: t('whatsappChannel', 'قناة الواتساب'),
            icon: MessageCircle,
            isExternal: true,
            badge: language === 'en' ? 'Updates' : 'تحديثات'
        },
        {
            to: '/target/apps',
            label: t('targetSelling', 'بيع التارجت'),
            icon: TrendingUp,
            badge: language === 'en' ? 'Instant Cash' : 'كاش فوري',
            isSpecial: true
        },
        { to: '/deposit', label: t('chargeWallet', 'شحن المحفظة'), icon: Wallet },
        { to: '/orders', label: t('myOrders', 'طلباتي'), icon: FileText, authRequired: true },
        { to: '/account-issues', label: t('support', 'الشكاوى'), icon: HelpCircle },
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
            {/* ═══ Full-Width Top Glass Navbar ═══ */}
            <header className="emperor-header" style={{
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                width: '100%',
                padding: 0,
            }}>
                <div className="emperor-navbar-container" style={{
                    background: isLight
                        ? (headerScrolled ? 'rgba(255, 255, 255, 0.96)' : 'rgba(240, 247, 255, 0.94)')
                        : (headerScrolled ? 'rgba(5, 12, 24, 0.98)' : 'rgba(6, 15, 30, 0.94)'),
                    backdropFilter: 'blur(20px) saturate(1.8)',
                    WebkitBackdropFilter: 'blur(20px) saturate(1.8)',
                    borderBottom: '1.5px solid rgba(56, 189, 248, 0.35)',
                    boxShadow: isLight
                        ? '0 10px 30px rgba(15, 23, 42, 0.08)'
                        : '0 10px 35px rgba(0, 0, 0, 0.8), 0 0 25px rgba(0, 130, 255, 0.12)',
                }}>
                    {/* ── Brand Logo ── */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0, flexShrink: 0 }}>
                        <Link
                            to="/"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                textDecoration: 'none',
                                minWidth: 0,
                                flexShrink: 0,
                            }}
                        >
                            <div className="header-logo-icon" style={{
                                width: '44px',
                                height: '44px',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                border: '1.5px solid rgba(56, 189, 248, 0.45)',
                                boxShadow: '0 0 15px rgba(56, 189, 248, 0.35)',
                                flexShrink: 0,
                                background: '#071325',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <img
                                    src={getSiteLogo()}
                                    alt={getSiteName()}
                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                        e.currentTarget.parentNode.innerHTML = '<span style="color:#F5D061;font-size:22px;font-weight:900;">👑</span>';
                                    }}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                                <span className="brand-title" style={{
                                    fontSize: '19px',
                                    fontWeight: '900',
                                    color: '#F5D061',
                                    letterSpacing: '0.3px',
                                    lineHeight: 1.15,
                                    whiteSpace: 'nowrap',
                                    textShadow: '0 2px 10px rgba(0,0,0,0.6), 0 0 15px rgba(245, 208, 97, 0.35)'
                                }}>
                                    {getSiteName()}
                                </span>
                                <span className="brand-subtitle" style={{
                                    fontSize: '10px',
                                    fontWeight: '800',
                                    color: '#38BDF8',
                                    letterSpacing: '0.2px',
                                    whiteSpace: 'nowrap',
                                }}>
                                    {getSiteDescription()}
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* ── Center Desktop Nav Links ── */}
                    <nav
                        className="desktop-nav-links"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            justifyContent: 'center',
                            flex: 1,
                            margin: '0 16px'
                        }}
                    >
                        {desktopNavLinks.map((link) => {
                            if (link.authRequired && !isAuthenticated) return null;
                            const active = !link.isModalTrigger && !link.isExternal && isActive(link.to);

                            if (link.isExternal) {
                                return (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="nav-link-item"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '5px',
                                            padding: '7px 14px',
                                            borderRadius: '10px',
                                            textDecoration: 'none',
                                            fontSize: '13.5px',
                                            fontWeight: '800',
                                            color: '#22c55e',
                                            background: 'rgba(34, 197, 94, 0.08)',
                                            border: '1px solid rgba(34, 197, 94, 0.25)',
                                            transition: 'all 0.2s',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        <link.icon size={15} color="#22c55e" />
                                        <span>{link.label}</span>
                                    </a>
                                );
                            }

                            return (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className="nav-link-item"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '5px',
                                        padding: '7px 15px',
                                        borderRadius: '10px',
                                        textDecoration: 'none',
                                        fontSize: '13.5px',
                                        fontWeight: active ? '900' : '800',
                                        color: active
                                            ? '#38BDF8'
                                            : '#F5D061',
                                        background: active
                                            ? 'rgba(14, 165, 233, 0.15)'
                                            : 'transparent',
                                        border: active
                                            ? '1px solid rgba(56, 189, 248, 0.45)'
                                            : '1px solid transparent',
                                        boxShadow: active ? '0 0 15px rgba(56, 189, 248, 0.2)' : 'none',
                                        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    <link.icon size={15} color={active ? '#38BDF8' : '#F5D061'} />
                                    <span>{link.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* ── Left Actions (Auth / User / Drawer) ── */}
                    <div className="header-actions">
                        {!isAuthenticated ? (
                            <>
                                <Link
                                    to="/register"
                                    className="header-register-btn"
                                >
                                    {t('createAccount', 'إنشاء حساب')}
                                </Link>

                                <Link
                                    to="/login"
                                    className="header-login-btn"
                                >
                                    <User size={15} color="#38BDF8" />
                                    <span>{t('login', 'دخول')}</span>
                                </Link>
                            </>
                        ) : (
                            <>
                                {/* Wallet Balance Badge */}
                                <Link
                                    to="/deposit"
                                    className="header-wallet-badge"
                                    title={t('walletBalance', 'رصيد المحفظة')}
                                >
                                    <Wallet size={14} color="#38BDF8" style={{ flexShrink: 0 }} />
                                    <span className="balance-num">{formattedBalance}</span>
                                    <span className="balance-curr">{currency}</span>
                                </Link>

                                {/* Notifications Icon with Badge */}
                                <Link
                                    to="/notifications"
                                    className="header-notif-btn"
                                    title={t('notifications', 'الإشعارات')}
                                >
                                    <Bell size={17} color="#F5D061" />
                                    {unreadNotifications > 0 && (
                                        <span className="notif-badge-dot">
                                            {unreadNotifications > 9 ? '9+' : unreadNotifications}
                                        </span>
                                    )}
                                </Link>
                            </>
                        )}

                        {/* Dedicated Hamburger / Drawer Toggle Button (ALWAYS VISIBLE) */}
                        <button
                            onClick={() => setDrawerOpen(true)}
                            title={t('mainMenu', 'القائمة الكاملة')}
                            className="header-hamburger-btn"
                        >
                            <Menu size={18} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Initial Luxury App Splash Screen / Preloader */}
            <AppSplashScreen />

            {/* Payment Warning Notice Modal (Shown on platform entry) */}
            <PaymentNoticeModal />

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
                    label={t('home', 'الرئيسية')}
                    active={isActive('/')}
                />
                <BottomNavItem
                    href={getWhatsAppChannel()}
                    icon={MessageCircle}
                    label={t('whatsappChannel', 'الواتساب')}
                    isExternal={true}
                    color="#25D366"
                />
                <BottomNavItem
                    to="/target/apps"
                    icon={Target}
                    label={t('targetSelling', 'التارجت')}
                    active={isActive('/target/apps')}
                />
                <BottomNavItem
                    to="/deposit"
                    icon={Wallet}
                    label={t('chargeWallet', 'المحفظة')}
                    active={isActive('/deposit')}
                />
                <button
                    type="button"
                    onClick={() => setDrawerOpen(true)}
                    className={`emperor-bottom-nav-item${drawerOpen ? ' active' : ''}`}
                    style={{
                        outline: 'none',
                        border: 'none',
                        background: 'transparent',
                        color: drawerOpen ? '#F5D061' : '#8E8E98',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                        cursor: 'pointer',
                        userSelect: 'none',
                        WebkitTapHighlightColor: 'transparent',
                    }}
                >
                    <User size={20} color={drawerOpen ? '#F5D061' : '#8E8E98'} />
                    <span style={{
                        fontSize: '11px',
                        fontWeight: drawerOpen ? '800' : '600',
                        whiteSpace: 'nowrap',
                        lineHeight: 1.1,
                        fontFamily: 'var(--font-cairo)',
                    }}>
                        {isAuthenticated ? t('myAccount', 'حسابي') : 'دخول'}
                    </span>
                </button>
            </nav>

            {/* ═══ Dynamic Premium Footer ═══ */}
            <AppFooter />
        </div>
    );
}

function BottomNavItem({ to, href, icon: Icon, label, active, isExternal, color }) {
    if (href || isExternal) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="emperor-bottom-nav-item"
                style={{
                    textDecoration: 'none',
                    color: color || '#8E8E98',
                    outline: 'none',
                    border: 'none',
                    background: 'transparent',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    userSelect: 'none',
                    WebkitTapHighlightColor: 'transparent',
                }}
            >
                <Icon size={20} color={color || '#8E8E98'} />
                <span style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    whiteSpace: 'nowrap',
                    lineHeight: 1.1,
                    fontFamily: 'var(--font-cairo)',
                    color: color || '#8E8E98',
                }}>
                    {label}
                </span>
            </a>
        );
    }

    return (
        <Link
            to={to}
            className={`emperor-bottom-nav-item${active ? ' active' : ''}`}
            style={{
                textDecoration: 'none',
                color: active ? '#F5D061' : '#8E8E98',
                outline: 'none',
                border: 'none',
                background: 'transparent',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                userSelect: 'none',
                WebkitTapHighlightColor: 'transparent',
            }}
        >
            <Icon size={20} color={active ? '#F5D061' : '#8E8E98'} />
            <span style={{
                fontSize: '11px',
                fontWeight: active ? '800' : '600',
                whiteSpace: 'nowrap',
                lineHeight: 1.1,
                fontFamily: 'var(--font-cairo)',
            }}>
                {label}
            </span>
        </Link>
    );
}
