import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Menu, Sun, Moon, Bell, RefreshCw, Shield, Wallet } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import UserSidebarDrawer from '../navigation/UserSidebarDrawer';
import { getSiteLogo, getSiteName } from '../../utils/settingsHelper';
import { getCurrencyLabel } from '../../utils/currencyHelper';
import { notificationsApi } from '../../api/endpoints';
import { playNotificationSound } from '../../utils/soundHelper';

const seenAdminNotificationIds = new Set();
let adminNotificationsInitialized = false;
const adminNotificationSoundEnabled = window.localStorage.getItem('adminNotificationSoundEnabled') === 'true';

export default function AdminHeader({ title, subtitle, onRefresh, refreshing = false, badge = 'لوحة القيادة الإدارية' }) {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const { user } = useAuth();
    const isLight = theme === 'light';
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);
    const [adminNotifications, setAdminNotifications] = useState([]);
    const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);
    const [notificationSoundEnabled, setNotificationSoundEnabled] = useState(adminNotificationSoundEnabled);
    const notificationMenuRef = useRef(null);

    useEffect(() => {
        let mounted = true;
        let requestInProgress = false;

        const syncAdminNotifications = async () => {
            if (requestInProgress || document.visibilityState !== 'visible') return;
            requestInProgress = true;

            try {
                const res = await notificationsApi.checkLatest();
                const payload = res?.data?.data;
                if (!mounted || !payload) return;

                const items = Array.isArray(payload.notifications) ? payload.notifications : [];
                const newlyArrived = adminNotificationsInitialized
                    ? items.filter((item) => item.id && !seenAdminNotificationIds.has(item.id))
                    : [];

                items.forEach((item) => {
                    if (item.id) seenAdminNotificationIds.add(item.id);
                });

                if (newlyArrived.length > 0) {
                    if (notificationSoundEnabled) playNotificationSound('default');
                    if (document.hidden && 'Notification' in window && Notification.permission === 'granted') {
                        const newest = newlyArrived[0];
                        new Notification(newest.title || 'إشعار إداري جديد', {
                            body: newest.body || '',
                            icon: getSiteLogo(),
                        });
                    }
                }

                adminNotificationsInitialized = true;
                setAdminNotifications(items);
                setUnreadNotificationCount(Number(payload.unread_count) || 0);
            } catch {
                // Retry silently on the next poll.
            } finally {
                requestInProgress = false;
            }
        };

        syncAdminNotifications();
        const interval = window.setInterval(syncAdminNotifications, 5000);
        const syncWhenVisible = () => {
            if (document.visibilityState === 'visible') syncAdminNotifications();
        };
        window.addEventListener('focus', syncWhenVisible);
        document.addEventListener('visibilitychange', syncWhenVisible);

        return () => {
            mounted = false;
            window.clearInterval(interval);
            window.removeEventListener('focus', syncWhenVisible);
            document.removeEventListener('visibilitychange', syncWhenVisible);
        };
    }, [user?.id, notificationSoundEnabled]);

    useEffect(() => {
        if (!notificationMenuOpen) return undefined;
        const closeOnOutsideClick = (event) => {
            if (!notificationMenuRef.current?.contains(event.target)) setNotificationMenuOpen(false);
        };
        document.addEventListener('pointerdown', closeOnOutsideClick);
        return () => document.removeEventListener('pointerdown', closeOnOutsideClick);
    }, [notificationMenuOpen]);

    const handleAdminNotificationClick = async (notification) => {
        setNotificationMenuOpen(false);

        if (!notification.is_read && !notification.read_at) {
            setAdminNotifications((current) => current.map((item) =>
                item.id === notification.id ? { ...item, is_read: true, read_at: new Date().toISOString() } : item
            ));
            setUnreadNotificationCount((current) => Math.max(0, current - 1));
            notificationsApi.markAsRead(notification.id).catch(() => {});
        }

        const rawLink = notification.link || '';
        const adminRoute = rawLink.match(/^\/admin\/(deposits|orders|targets)(?:\/.*)?$/)?.[1];
        const target = adminRoute ? `/admin/${adminRoute}` : (rawLink.startsWith('/') ? rawLink : '/notifications');
        navigate(target);
    };

    const enableNotificationSound = () => {
        playNotificationSound('default');
        window.localStorage.setItem('adminNotificationSoundEnabled', 'true');
        setNotificationSoundEnabled(true);
    };

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate('/admin');
        }
    };

    const logoSrc = getSiteLogo() || '/images/mohra_sand_logo.png';
    const siteName = getSiteName() || 'سند ومهره كارد';
    
    // Format balance cleanly (e.g. 81,300 instead of 81,300.00 if .00)
    const rawBal = Number(user?.wallet?.balance || 0);
    const userBalance = rawBal % 1 === 0
        ? rawBal.toLocaleString('en-US', { maximumFractionDigits: 0 })
        : rawBal.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 2 });
    const userCurrencyLabel = getCurrencyLabel(user?.currency || user?.wallet?.currency || 'EGP');

    return (
        <>
            <style>{`
                .admin-header-wrapper {
                    position: sticky;
                    top: 0;
                    z-index: 900;
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    transition: background-color 0.2s ease, border-color 0.2s ease;
                    margin-bottom: 20px;
                    width: 100%;
                }
                .admin-header-inner {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 10px 16px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 12px;
                    direction: rtl;
                    font-family: 'Cairo', sans-serif;
                    box-sizing: border-box;
                }
                .admin-header-right {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    min-width: 0;
                    flex-shrink: 1;
                }
                .admin-header-back-btn {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 7px 12px;
                    border-radius: 12px;
                    font-size: 13px;
                    font-weight: 800;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    flex-shrink: 0;
                }
                .admin-header-title-wrapper {
                    min-width: 0;
                    display: flex;
                    flex-direction: column;
                }
                .admin-header-badge {
                    font-size: 11px;
                    font-weight: 800;
                    color: #38BDF8;
                    background-color: rgba(56, 189, 248, 0.12);
                    padding: 1px 7px;
                    border-radius: 6px;
                    border: 1px solid rgba(56, 189, 248, 0.25);
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    width: fit-content;
                }
                .admin-header-title {
                    font-size: 15px;
                    font-weight: 900;
                    margin: 2px 0 0;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .admin-header-logo-link {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    text-decoration: none;
                    flex-shrink: 0;
                }
                .admin-header-logo-img {
                    width: 36px;
                    height: 36px;
                    border-radius: 10px;
                    object-fit: contain;
                    filter: drop-shadow(0 0 8px rgba(56, 189, 248, 0.35));
                }
                .admin-header-left {
                    display: flex;
                    align-items: center;
                    gap: 7px;
                    flex-shrink: 0;
                }
                .admin-header-wallet-pill {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    padding: 6px 10px;
                    border-radius: 11px;
                    text-decoration: none;
                    color: #38BDF8;
                    font-size: 12px;
                    font-weight: 900;
                    white-space: nowrap;
                    transition: all 0.2s ease;
                }
                .admin-header-action-btn {
                    width: 34px;
                    height: 34px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    flex-shrink: 0;
                    transition: all 0.2s ease;
                }
                @media (max-width: 768px) {
                    .admin-header-inner {
                        padding: 8px 10px !important;
                        gap: 6px !important;
                    }
                    .admin-header-back-text {
                        display: none !important;
                    }
                    .admin-header-back-btn {
                        width: 34px !important;
                        height: 34px !important;
                        padding: 0 !important;
                        justify-content: center !important;
                        border-radius: 10px !important;
                    }
                    .admin-header-badge {
                        display: none !important;
                    }
                    .admin-header-logo-link {
                        display: none !important;
                    }
                    .admin-header-title {
                        font-size: 13.5px !important;
                        max-width: 120px !important;
                    }
                    .admin-header-wallet-pill {
                        padding: 4px 7px !important;
                        font-size: 11px !important;
                        gap: 3px !important;
                    }
                    .admin-header-action-btn {
                        width: 32px !important;
                        height: 32px !important;
                    }
                }
                @media (max-width: 420px) {
                    .admin-header-inner {
                        padding: 6px 8px !important;
                        gap: 4px !important;
                    }
                    .admin-header-title {
                        font-size: 13px !important;
                        max-width: 95px !important;
                    }
                    .admin-header-refresh-btn {
                        display: none !important;
                    }
                    .admin-header-balance-curr {
                        display: none !important;
                    }
                    .admin-header-wallet-pill {
                        padding: 4px 6px !important;
                        font-size: 10.5px !important;
                    }
                    .admin-header-action-btn {
                        width: 30px !important;
                        height: 30px !important;
                    }
                }
            `}</style>
            <div
                className="admin-header-wrapper"
                style={{
                    backgroundColor: isLight ? 'rgba(255, 255, 255, 0.96)' : 'rgba(7, 10, 18, 0.96)',
                    borderBottom: isLight ? '1px solid #E2E8F0' : '1px solid rgba(56, 189, 248, 0.2)',
                    boxShadow: isLight ? '0 4px 20px rgba(0, 0, 0, 0.05)' : '0 4px 25px rgba(0, 0, 0, 0.6)',
                }}
            >
                <div className="admin-header-inner">
                    {/* Right side: Back Button & Page Title */}
                    <div className="admin-header-right">
                        <button
                            onClick={handleBack}
                            title="رجوع للصفحة السابقة"
                            className="admin-header-back-btn"
                            style={{
                                backgroundColor: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.08)',
                                border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.15)',
                                color: isLight ? '#0F172A' : '#FFFFFF',
                            }}
                        >
                            <ArrowRight size={16} />
                            <span className="admin-header-back-text">رجوع</span>
                        </button>

                        <div className="admin-header-title-wrapper">
                            <span className="admin-header-badge hidden sm:inline-flex">
                                <Shield size={11} />
                                <span>{badge}</span>
                            </span>
                            <h2
                                className="admin-header-title"
                                style={{ color: isLight ? '#0F172A' : '#FFFFFF' }}
                                title={title}
                            >
                                {title}
                            </h2>
                        </div>
                    </div>

                    {/* Center: Brand Logo (Desktop only) */}
                    <Link
                        to="/"
                        className="admin-header-logo-link hidden md:flex"
                        title={siteName}
                    >
                        <img
                            src={logoSrc}
                            alt={siteName}
                            className="admin-header-logo-img"
                        />
                    </Link>

                    {/* Left side: Balance pill, Theme Toggle & Menu Drawer Toggle */}
                    <div className="admin-header-left">
                        {/* Balance pill */}
                        <Link
                            to="/wallet"
                            className="admin-header-wallet-pill"
                            style={{
                                backgroundColor: isLight ? '#F1F5F9' : '#0B1322',
                                border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(56, 189, 248, 0.3)',
                            }}
                            title="رصيد المحفظة"
                        >
                            <Wallet size={13} color="#38BDF8" />
                            <span className="admin-header-balance-val">{userBalance}</span>
                            <span className="admin-header-balance-curr">{userCurrencyLabel}</span>
                        </Link>

                        <div ref={notificationMenuRef} style={{ position: 'relative' }}>
                            <button
                                type="button"
                                onClick={() => setNotificationMenuOpen((open) => !open)}
                                aria-label={`إشعارات الإدارة${unreadNotificationCount ? `، ${unreadNotificationCount} غير مقروء` : ''}`}
                                aria-expanded={notificationMenuOpen}
                                title="إشعارات الإدارة"
                                className="admin-header-action-btn"
                                style={{
                                    position: 'relative',
                                    backgroundColor: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.08)',
                                    border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(56, 189, 248, 0.3)',
                                    color: '#38BDF8',
                                }}
                            >
                                <Bell size={16} />
                                {unreadNotificationCount > 0 && (
                                    <span style={{
                                        position: 'absolute',
                                        top: '-6px',
                                        right: '-7px',
                                        minWidth: '17px',
                                        height: '17px',
                                        padding: '0 4px',
                                        borderRadius: '999px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: '#EF4444',
                                        color: '#FFFFFF',
                                        border: `2px solid ${isLight ? '#FFFFFF' : '#070A12'}`,
                                        fontSize: '9px',
                                        fontWeight: 900,
                                        lineHeight: 1,
                                    }}>
                                        {unreadNotificationCount > 99 ? '99+' : unreadNotificationCount}
                                    </span>
                                )}
                            </button>

                            {notificationMenuOpen && (
                                <div style={{
                                    position: 'absolute',
                                    top: 'calc(100% + 10px)',
                                    left: 0,
                                    width: 'min(360px, calc(100vw - 24px))',
                                    maxHeight: 'min(480px, calc(100dvh - 90px))',
                                    overflowY: 'auto',
                                    zIndex: 1300,
                                    borderRadius: '16px',
                                    background: isLight ? '#FFFFFF' : '#0B1322',
                                    border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(56, 189, 248, 0.35)',
                                    boxShadow: '0 18px 45px rgba(0,0,0,0.45)',
                                    color: isLight ? '#0F172A' : '#FFFFFF',
                                    direction: 'rtl',
                                }}>
                                    <div style={{
                                        position: 'sticky',
                                        top: 0,
                                        zIndex: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        gap: '8px',
                                        padding: '12px 14px',
                                        background: isLight ? '#FFFFFF' : '#0B1322',
                                        borderBottom: isLight ? '1px solid #E2E8F0' : '1px solid rgba(148, 163, 184, 0.16)',
                                    }}>
                                        <strong style={{ fontSize: '13px', fontWeight: 900 }}>إشعارات الإدارة</strong>
                                        <span style={{ fontSize: '11px', color: unreadNotificationCount ? '#EF4444' : '#94A3B8', fontWeight: 800 }}>
                                            {unreadNotificationCount} غير مقروء
                                        </span>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', padding: '8px 14px', borderBottom: isLight ? '1px solid #E2E8F0' : '1px solid rgba(148, 163, 184, 0.1)' }}>
                                        <span style={{ fontSize: '11px', color: '#94A3B8' }}>تنبيه صوتي عند وصول جديد</span>
                                        <button type="button" onClick={enableNotificationSound} style={{ border: '1px solid rgba(34, 197, 94, 0.35)', borderRadius: '8px', padding: '5px 9px', background: notificationSoundEnabled ? 'rgba(34, 197, 94, 0.12)' : 'transparent', color: notificationSoundEnabled ? '#22C55E' : '#38BDF8', fontSize: '10px', fontWeight: 900, cursor: 'pointer', fontFamily: 'Cairo, sans-serif' }}>
                                            {notificationSoundEnabled ? 'الصوت مفعّل' : 'تفعيل الصوت'}
                                        </button>
                                    </div>

                                    {adminNotifications.length === 0 ? (
                                        <div style={{ padding: '24px 16px', textAlign: 'center', fontSize: '12px', color: '#94A3B8' }}>
                                            لا توجد إشعارات جديدة حالياً
                                        </div>
                                    ) : (
                                        adminNotifications.slice(0, 8).map((notification) => (
                                            <button
                                                key={notification.id}
                                                type="button"
                                                onClick={() => handleAdminNotificationClick(notification)}
                                                style={{
                                                    width: '100%',
                                                    display: 'block',
                                                    padding: '12px 14px',
                                                    textAlign: 'right',
                                                    background: notification.is_read ? 'transparent' : (isLight ? '#F8FAFC' : 'rgba(56, 189, 248, 0.07)'),
                                                    border: 'none',
                                                    borderBottom: isLight ? '1px solid #E2E8F0' : '1px solid rgba(148, 163, 184, 0.1)',
                                                    color: isLight ? '#0F172A' : '#FFFFFF',
                                                    cursor: 'pointer',
                                                    fontFamily: 'Cairo, sans-serif',
                                                }}
                                            >
                                                <span style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', alignItems: 'flex-start' }}>
                                                    <strong style={{ fontSize: '12px', lineHeight: 1.5 }}>{notification.title || 'إشعار إداري جديد'}</strong>
                                                    {!notification.is_read && <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#38BDF8', flexShrink: 0, marginTop: '5px' }} />}
                                                </span>
                                                {notification.body && (
                                                    <span style={{ display: 'block', marginTop: '4px', fontSize: '11px', color: '#94A3B8', lineHeight: 1.6 }}>
                                                        {notification.body}
                                                    </span>
                                                )}
                                                {notification.time_ago && (
                                                    <span style={{ display: 'block', marginTop: '5px', fontSize: '10px', color: '#64748B' }}>
                                                        {notification.time_ago}
                                                    </span>
                                                )}
                                            </button>
                                        ))
                                    )}

                                    <button
                                        type="button"
                                        onClick={() => { setNotificationMenuOpen(false); navigate('/notifications'); }}
                                        style={{
                                            width: '100%',
                                            padding: '11px',
                                            border: 'none',
                                            background: 'transparent',
                                            color: '#38BDF8',
                                            fontSize: '11px',
                                            fontWeight: 900,
                                            cursor: 'pointer',
                                            fontFamily: 'Cairo, sans-serif',
                                        }}
                                    >
                                        فتح مركز الإشعارات
                                    </button>
                                </div>
                            )}
                        </div>

                        {onRefresh && (
                            <button
                                onClick={onRefresh}
                                disabled={refreshing}
                                title="تحديث البيانات"
                                className="admin-header-action-btn admin-header-refresh-btn"
                                style={{
                                    backgroundColor: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.08)',
                                    border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.12)',
                                    color: isLight ? '#64748B' : '#E2E8F0',
                                }}
                            >
                                <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
                            </button>
                        )}

                        <button
                            onClick={toggleTheme}
                            title={isLight ? 'الوضع الليلي' : 'الوضع النهاري'}
                            className="admin-header-action-btn admin-header-theme-btn"
                            style={{
                                backgroundColor: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.08)',
                                border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.12)',
                                color: isLight ? '#D97706' : '#FDE047',
                            }}
                        >
                            {isLight ? <Moon size={14} /> : <Sun size={14} />}
                        </button>

                        {/* Hamburger Drawer Toggle Button */}
                        <button
                            onClick={() => setDrawerOpen(true)}
                            title="قائمة الإدارة والتنقل"
                            className="admin-header-action-btn admin-header-menu-btn"
                            style={{
                                backgroundColor: isLight ? '#0F172A' : '#0B1322',
                                border: '1px solid rgba(56, 189, 248, 0.4)',
                                color: '#38BDF8',
                                boxShadow: '0 0 12px rgba(56, 189, 248, 0.25)',
                            }}
                        >
                            <Menu size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Sidebar Drawer with all 16 Admin pages + Customer links */}
            <UserSidebarDrawer
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            />
        </>
    );
}
