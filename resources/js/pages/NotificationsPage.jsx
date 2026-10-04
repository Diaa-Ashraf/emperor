import React, { useState, useEffect, useCallback } from 'react';
import {
    Bell,
    CheckCheck,
    RefreshCw,
    Inbox,
    Filter,
    Sparkles,
    AlertCircle,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { notificationsApi } from '../api/endpoints';
import { useToast } from '../contexts/ToastContext';
import NotificationItem from '../components/notifications/NotificationItem';

export default function NotificationsPage() {
    const { addToast } = useToast();
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [filter, setFilter] = useState('all'); // 'all' | 'unread'
    const [page, setPage] = useState(1);
    const [meta, setMeta] = useState(null);
    const [loading, setLoading] = useState(true);
    const [markingAll, setMarkingAll] = useState(false);

    // Fetch unread count
    const fetchUnreadCount = useCallback(async () => {
        try {
            const res = await notificationsApi.getUnreadCount();
            if (res.data?.data?.unread_count !== undefined) {
                setUnreadCount(res.data.data.unread_count);
            }
        } catch (e) {
            // Silently ignore or retry
        }
    }, []);

    // Fetch notifications
    const fetchNotifications = useCallback(async (targetPage = 1, currentFilter = filter) => {
        setLoading(true);
        try {
            const params = {
                page: targetPage,
                ...(currentFilter === 'unread' ? { unread_only: 1 } : {}),
            };

            const res = await notificationsApi.getNotifications(params);
            const responseData = res.data?.data || res.data;
            const items = responseData?.data || (Array.isArray(responseData) ? responseData : []);
            setNotifications(items);

            if (responseData?.meta) {
                setMeta(responseData.meta);
            } else if (responseData?.current_page) {
                setMeta({
                    current_page: responseData.current_page,
                    last_page: responseData.last_page,
                    total: responseData.total,
                    per_page: responseData.per_page,
                });
            } else {
                setMeta(null);
            }
        } catch (err) {
            console.error('Error fetching notifications:', err);
            addToast('حدث خطأ أثناء تحميل الإشعارات', 'error');
        } finally {
            setLoading(false);
        }
    }, [filter, addToast]);

    useEffect(() => {
        fetchNotifications(page, filter);
        fetchUnreadCount();

        const handleLiveNotification = (e) => {
            const newNotif = e.detail;
            if (!newNotif) return;

            setNotifications((prev) => {
                if (prev.some((n) => n.id === newNotif.id)) return prev;
                return [newNotif, ...prev];
            });
            setUnreadCount((prev) => prev + 1);
        };

        window.addEventListener('emperor:new-notification', handleLiveNotification);
        return () => window.removeEventListener('emperor:new-notification', handleLiveNotification);
    }, [page, filter, fetchNotifications, fetchUnreadCount]);

    // Handle marking single notification as read
    const handleMarkAsRead = async (id) => {
        try {
            // Optimistic update
            setNotifications((prev) =>
                prev.map((n) => (n.id === id ? { ...n, is_read: true, read_at: new Date().toISOString() } : n))
            );
            setUnreadCount((prev) => Math.max(0, prev - 1));

            await notificationsApi.markAsRead(id);
        } catch (err) {
            console.error('Failed to mark notification as read:', err);
        }
    };

    // Handle marking all as read
    const handleMarkAllAsRead = async () => {
        if (unreadCount === 0 && notifications.every((n) => n.is_read)) {
            addToast('جميع الإشعارات مقروءة بالفعل', 'info');
            return;
        }

        setMarkingAll(true);
        try {
            await notificationsApi.markAllAsRead();
            setNotifications((prev) =>
                prev.map((n) => ({ ...n, is_read: true, read_at: new Date().toISOString() }))
            );
            setUnreadCount(0);
            addToast('تم تعليم جميع الإشعارات كمقروءة بنجاح', 'success');
        } catch (err) {
            console.error('Failed to mark all as read:', err);
            addToast('فشل تعليم الإشعارات كمقروءة', 'error');
        } finally {
            setMarkingAll(false);
        }
    };

    const handleFilterChange = (newFilter) => {
        if (newFilter !== filter) {
            setFilter(newFilter);
            setPage(1);
        }
    };

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px 16px 80px' }}>
            {/* Header Title Section */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
                marginBottom: '24px',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '16px',
                        background: 'linear-gradient(135deg, rgba(212, 165, 55, 0.2) 0%, rgba(212, 165, 55, 0.05) 100%)',
                        border: '1px solid rgba(212, 165, 55, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#D4A537',
                        boxShadow: '0 0 20px rgba(212, 165, 55, 0.15)',
                    }}>
                        <Bell size={26} />
                    </div>
                    <div>
                        <h1 style={{
                            margin: 0,
                            fontSize: '24px',
                            fontWeight: '900',
                            color: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        }}>
                            مركز الإشعارات
                            {unreadCount > 0 && (
                                <span style={{
                                    fontSize: '12px',
                                    padding: '2px 8px',
                                    borderRadius: '12px',
                                    background: '#D4A537',
                                    color: '#0D0D0F',
                                    fontWeight: '800',
                                }}>
                                    {unreadCount} جديد
                                </span>
                            )}
                        </h1>
                        <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#9E9EA8' }}>
                            تابع أحدث تحديثات طلباتك، الإيداعات، والأرباح في مكان واحد
                        </p>
                    </div>
                </div>

                {/* Mark all as read button */}
                <button
                    onClick={handleMarkAllAsRead}
                    disabled={markingAll || unreadCount === 0}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 18px',
                        borderRadius: '12px',
                        background: unreadCount > 0 ? 'rgba(212, 165, 55, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                        border: `1px solid ${unreadCount > 0 ? 'rgba(212, 165, 55, 0.35)' : 'rgba(255, 255, 255, 0.1)'}`,
                        color: unreadCount > 0 ? '#F3E5AB' : '#656570',
                        fontSize: '13px',
                        fontWeight: '700',
                        cursor: unreadCount > 0 ? 'pointer' : 'default',
                        transition: 'all 0.2s ease',
                        fontFamily: 'Cairo, sans-serif',
                    }}
                >
                    <CheckCheck size={16} />
                    <span>{markingAll ? 'جاري التحديث...' : 'تعليم الكل كمقروء'}</span>
                </button>
            </div>

            {/* Filter Tabs */}
            <div style={{
                display: 'flex',
                gap: '10px',
                marginBottom: '20px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                paddingBottom: '12px',
            }}>
                <button
                    onClick={() => handleFilterChange('all')}
                    style={{
                        padding: '8px 18px',
                        borderRadius: '10px',
                        fontSize: '14px',
                        fontWeight: '700',
                        fontFamily: 'Cairo, sans-serif',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        background: filter === 'all' ? 'linear-gradient(135deg, #D4A537 0%, #AA7C11 100%)' : 'rgba(255, 255, 255, 0.05)',
                        color: filter === 'all' ? '#0D0D0F' : '#9E9EA8',
                        border: filter === 'all' ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                >
                    جميع الإشعارات
                </button>

                <button
                    onClick={() => handleFilterChange('unread')}
                    style={{
                        padding: '8px 18px',
                        borderRadius: '10px',
                        fontSize: '14px',
                        fontWeight: '700',
                        fontFamily: 'Cairo, sans-serif',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: filter === 'unread' ? 'linear-gradient(135deg, #D4A537 0%, #AA7C11 100%)' : 'rgba(255, 255, 255, 0.05)',
                        color: filter === 'unread' ? '#0D0D0F' : '#9E9EA8',
                        border: filter === 'unread' ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                >
                    <span>غير المقروءة فقط</span>
                    {unreadCount > 0 && (
                        <span style={{
                            padding: '1px 6px',
                            borderRadius: '8px',
                            background: filter === 'unread' ? '#0D0D0F' : '#D4A537',
                            color: filter === 'unread' ? '#D4A537' : '#0D0D0F',
                            fontSize: '11px',
                            fontWeight: '800',
                        }}>
                            {unreadCount}
                        </span>
                    )}
                </button>
            </div>

            {/* Notifications Content */}
            {loading ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div
                            key={i}
                            style={{
                                height: '80px',
                                borderRadius: '18px',
                                background: 'rgba(255, 255, 255, 0.03)',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                animation: 'pulse 1.5s infinite',
                            }}
                        />
                    ))}
                </div>
            ) : notifications.length === 0 ? (
                /* Empty State */
                <div style={{
                    background: 'rgba(22, 22, 29, 0.7)',
                    border: '1px dashed rgba(212, 165, 55, 0.25)',
                    borderRadius: '24px',
                    padding: '60px 20px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '16px',
                }}>
                    <div style={{
                        width: '70px',
                        height: '70px',
                        borderRadius: '20px',
                        background: 'rgba(212, 165, 55, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#D4A537',
                    }}>
                        <Inbox size={36} />
                    </div>
                    <div>
                        <h3 style={{ margin: '0 0 6px', fontSize: '18px', fontWeight: '800', color: '#FFFFFF' }}>
                            {filter === 'unread' ? 'لا توجد إشعارات غير مقروءة' : 'لا توجد أي إشعارات حالياً'}
                        </h3>
                        <p style={{ margin: 0, fontSize: '14px', color: '#9E9EA8', maxWidth: '400px', lineHeight: '1.6' }}>
                            {filter === 'unread'
                                ? 'رائع! لقد قمت بقراءة جميع الإشعارات والتحديثات الخاصة بحسابك.'
                                : 'ستصلك هنا إشعارات فورية بكل ما يخص طلبات الشحن، قبول الإيداعات، وتحديثات بيع التارجت.'}
                        </p>
                    </div>
                </div>
            ) : (
                /* Notifications List */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {notifications.map((notification) => (
                        <NotificationItem
                            key={notification.id}
                            notification={notification}
                            onMarkAsRead={handleMarkAsRead}
                        />
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            {meta && meta.last_page > 1 && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '16px',
                    marginTop: '32px',
                }}>
                    <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page <= 1}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '8px 16px',
                            borderRadius: '10px',
                            background: page <= 1 ? 'rgba(255, 255, 255, 0.03)' : 'rgba(212, 165, 55, 0.15)',
                            border: `1px solid ${page <= 1 ? 'rgba(255, 255, 255, 0.05)' : 'rgba(212, 165, 55, 0.3)'}`,
                            color: page <= 1 ? '#656570' : '#F3E5AB',
                            fontSize: '13px',
                            fontWeight: '700',
                            cursor: page <= 1 ? 'default' : 'pointer',
                            fontFamily: 'Cairo, sans-serif',
                        }}
                    >
                        <ChevronRight size={16} />
                        <span>الصفحة السابقة</span>
                    </button>

                    <span style={{ fontSize: '13px', color: '#9E9EA8', fontWeight: '600' }}>
                        صفحة {meta.current_page} من {meta.last_page}
                    </span>

                    <button
                        onClick={() => setPage((p) => Math.min(meta.last_page, p + 1))}
                        disabled={page >= meta.last_page}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '8px 16px',
                            borderRadius: '10px',
                            background: page >= meta.last_page ? 'rgba(255, 255, 255, 0.03)' : 'rgba(212, 165, 55, 0.15)',
                            border: `1px solid ${page >= meta.last_page ? 'rgba(255, 255, 255, 0.05)' : 'rgba(212, 165, 55, 0.3)'}`,
                            color: page >= meta.last_page ? '#656570' : '#F3E5AB',
                            fontSize: '13px',
                            fontWeight: '700',
                            cursor: page >= meta.last_page ? 'default' : 'pointer',
                            fontFamily: 'Cairo, sans-serif',
                        }}
                    >
                        <span>الصفحة التالية</span>
                        <ChevronLeft size={16} />
                    </button>
                </div>
            )}
        </div>
    );
}
