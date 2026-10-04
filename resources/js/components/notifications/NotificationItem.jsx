import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Bell,
    CheckCircle2,
    Zap,
    XCircle,
    Gift,
    Wallet,
    DollarSign,
    Info,
    ChevronLeft,
    Megaphone,
    Clock,
    CheckCheck,
    ExternalLink,
    AlertTriangle,
    PackageCheck,
    RotateCcw
} from 'lucide-react';

export default function NotificationItem({ notification, onMarkAsRead }) {
    if (!notification) return null;

    const navigate = useNavigate();
    const isUnread = !notification.is_read && !notification.read_at;

    // Comprehensive extraction of data
    const rawData = typeof notification.data === 'object' && notification.data !== null ? notification.data : {};

    const title = notification.title 
        || rawData.title 
        || rawData.subject 
        || rawData.heading 
        || 'إشعار من منصة إمبراطور';

    const body = notification.body 
        || notification.message 
        || rawData.body 
        || rawData.message 
        || rawData.content 
        || rawData.text 
        || rawData.description 
        || rawData.notes 
        || '';

    // Resolve valid link safely
    const resolveLink = (raw) => {
        if (!raw || typeof raw !== 'string') return null;
        const trimmed = raw.trim();
        if (!trimmed || trimmed.length < 2 || trimmed.includes(' ')) return null;

        if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('//')) {
            return { type: 'external', url: trimmed };
        }

        if (trimmed.startsWith('/admin')) {
            return { type: 'admin', url: trimmed };
        }

        if (trimmed.startsWith('/')) {
            return { type: 'internal', url: trimmed };
        }

        const knownRoutes = ['deposit', 'wallet', 'orders', 'profile', 'target-apps', 'target-orders', 'support', 'referrals', 'settings', 'developer', 'products', 'categories'];
        const firstSeg = trimmed.split('/')[0].split('?')[0];
        if (knownRoutes.includes(firstSeg)) {
            return { type: 'internal', url: '/' + trimmed };
        }

        return null;
    };

    const linkInfo = resolveLink(notification.link || rawData.link || rawData.action_url || rawData.url);

    // Resolve valid image safely
    const resolveImage = (raw) => {
        if (!raw || typeof raw !== 'string') return null;
        const trimmed = raw.trim();
        if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('/storage/') || trimmed.startsWith('data:image/')) {
            return trimmed;
        }
        if (trimmed.startsWith('storage/')) {
            return '/' + trimmed;
        }
        return null;
    };

    const imageUrl = resolveImage(notification.image_url || rawData.image_url || rawData.image);

    // Get notification type configuration & badge
    const getTypeConfig = () => {
        const type = String(notification.type || '').toLowerCase();
        const t = String(title).toLowerCase();

        if (type.includes('marketing') || type.includes('promo') || type.includes('campaign') || t.includes('عرض') || t.includes('خصم')) {
            return {
                icon: Megaphone,
                color: '#F59E0B',
                bg: 'rgba(245, 158, 11, 0.12)',
                border: 'rgba(245, 158, 11, 0.3)',
                badge: 'حملة تسويقية',
                badgeBg: 'rgba(245, 158, 11, 0.15)',
                badgeColor: '#FBBF24',
            };
        }
        if (type.includes('deposit') || t.includes('إيداع') || t.includes('شحن')) {
            return {
                icon: Wallet,
                color: '#22C55E',
                bg: 'rgba(34, 197, 94, 0.12)',
                border: 'rgba(34, 197, 94, 0.3)',
                badge: 'شحن المحفظة',
                badgeBg: 'rgba(34, 197, 94, 0.15)',
                badgeColor: '#4ADE80',
            };
        }
        if (type.includes('order_completed') || t.includes('اكتمل') || t.includes('نجاح')) {
            return {
                icon: PackageCheck,
                color: '#D4A537',
                bg: 'rgba(212, 165, 55, 0.12)',
                border: 'rgba(212, 165, 55, 0.3)',
                badge: 'طلب مكتمل',
                badgeBg: 'rgba(212, 165, 55, 0.15)',
                badgeColor: '#F3E5AB',
            };
        }
        if (type.includes('refund') || t.includes('استرداد') || t.includes('تعويض')) {
            return {
                icon: RotateCcw,
                color: '#38BDF8',
                bg: 'rgba(56, 189, 248, 0.12)',
                border: 'rgba(56, 189, 248, 0.3)',
                badge: 'استرداد مالي',
                badgeBg: 'rgba(56, 189, 248, 0.15)',
                badgeColor: '#38BDF8',
            };
        }
        if (type.includes('failed') || type.includes('rejected') || t.includes('فشل') || t.includes('مرفوض')) {
            return {
                icon: AlertTriangle,
                color: '#EF4444',
                bg: 'rgba(239, 68, 68, 0.12)',
                border: 'rgba(239, 68, 68, 0.3)',
                badge: 'تنبيه هـام',
                badgeBg: 'rgba(239, 68, 68, 0.15)',
                badgeColor: '#F87171',
            };
        }
        if (type.includes('referral') || t.includes('إحالة') || t.includes('عمولة')) {
            return {
                icon: Gift,
                color: '#EC4899',
                bg: 'rgba(236, 72, 153, 0.12)',
                border: 'rgba(236, 72, 153, 0.3)',
                badge: 'مكافأة إحالة',
                badgeBg: 'rgba(236, 72, 153, 0.15)',
                badgeColor: '#F472B6',
            };
        }
        if (type.includes('target') || t.includes('تارجت')) {
            return {
                icon: DollarSign,
                color: '#06B6D4',
                bg: 'rgba(6, 182, 212, 0.12)',
                border: 'rgba(6, 182, 212, 0.3)',
                badge: 'تارجت الرومات',
                badgeBg: 'rgba(6, 182, 212, 0.15)',
                badgeColor: '#22D3EE',
            };
        }

        return {
            icon: Bell,
            color: '#D4A537',
            bg: 'rgba(212, 165, 55, 0.12)',
            border: 'rgba(212, 165, 55, 0.3)',
            badge: 'إشعار عام',
            badgeBg: 'rgba(212, 165, 55, 0.15)',
            badgeColor: '#D4A537',
        };
    };

    const config = getTypeConfig();
    const Icon = config.icon;

    const handleCardClick = (e) => {
        // If clicking on a nested action button, don't trigger full card click
        if (e.target.closest('.no-card-nav')) return;

        if (isUnread && onMarkAsRead) {
            onMarkAsRead(notification.id);
        }

        if (linkInfo) {
            if (linkInfo.type === 'internal') {
                navigate(linkInfo.url);
            } else if (linkInfo.type === 'admin') {
                window.location.href = linkInfo.url;
            } else if (linkInfo.type === 'external') {
                window.open(linkInfo.url, '_blank', 'noopener,noreferrer');
            }
        }
    };

    const handleQuickRead = (e) => {
        e.stopPropagation();
        if (onMarkAsRead) {
            onMarkAsRead(notification.id);
        }
    };

    // Format human readable date
    let formattedDate = notification.time_ago || '';
    let exactTime = '';
    try {
        if (notification.created_at) {
            const d = new Date(notification.created_at);
            exactTime = d.toLocaleDateString('ar-EG', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
            if (!formattedDate) formattedDate = exactTime;
        }
    } catch (e) {}

    return (
        <div
            onClick={handleCardClick}
            style={{
                background: isUnread
                    ? 'linear-gradient(135deg, rgba(32, 32, 45, 0.95) 0%, rgba(20, 20, 30, 0.98) 100%)'
                    : 'rgba(22, 22, 30, 0.75)',
                border: `1px solid ${isUnread ? 'rgba(212, 165, 55, 0.45)' : 'rgba(255, 255, 255, 0.08)'}`,
                borderRadius: '20px',
                padding: '20px 22px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                cursor: linkInfo ? 'pointer' : 'default',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                boxShadow: isUnread ? '0 8px 30px rgba(212, 165, 55, 0.08)' : '0 4px 15px rgba(0, 0, 0, 0.2)',
                backdropFilter: 'blur(10px)',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = isUnread ? '#D4A537' : 'rgba(212, 165, 55, 0.35)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.35)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = isUnread ? 'rgba(212, 165, 55, 0.45)' : 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = isUnread ? '0 8px 30px rgba(212, 165, 55, 0.08)' : '0 4px 15px rgba(0, 0, 0, 0.2)';
            }}
        >
            {/* Top Bar: Icon + Type Badge + Timestamp + Unread Status */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                flexWrap: 'wrap',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {/* Icon container */}
                    <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '14px',
                        background: config.bg,
                        border: `1px solid ${config.border}`,
                        color: config.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: `0 0 15px ${config.bg}`,
                    }}>
                        <Icon size={22} />
                    </div>

                    {/* Badge & Timing */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{
                            padding: '3px 10px',
                            borderRadius: '20px',
                            fontSize: '11px',
                            fontWeight: '800',
                            background: config.badgeBg,
                            color: config.badgeColor,
                            border: `1px solid ${config.border}`,
                            letterSpacing: '0.2px',
                        }}>
                            {config.badge}
                        </span>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            fontSize: '12px',
                            color: '#94A3B8',
                        }}>
                            <Clock size={13} style={{ opacity: 0.7 }} />
                            <span>{formattedDate}</span>
                            {exactTime && exactTime !== formattedDate && (
                                <span style={{ opacity: 0.5, fontSize: '11px' }}>({exactTime})</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right actions: Unread Indicator & Mark Read button */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {isUnread && (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: 'rgba(212, 165, 55, 0.15)',
                            padding: '4px 10px',
                            borderRadius: '12px',
                            border: '1px solid rgba(212, 165, 55, 0.3)',
                        }}>
                            <span style={{
                                width: '7px',
                                height: '7px',
                                borderRadius: '50%',
                                background: '#D4A537',
                                boxShadow: '0 0 8px #D4A537',
                                display: 'inline-block',
                            }} />
                            <span style={{ fontSize: '11px', color: '#F3E5AB', fontWeight: '800' }}>جديد</span>
                        </div>
                    )}

                    {isUnread && onMarkAsRead && (
                        <button
                            type="button"
                            onClick={handleQuickRead}
                            className="no-card-nav"
                            title="تعليم كمقروء"
                            style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#94A3B8',
                                padding: '6px',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = '#22C55E';
                                e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.4)';
                                e.currentTarget.style.background = 'rgba(34, 197, 94, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = '#94A3B8';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                            }}
                        >
                            <CheckCheck size={16} />
                        </button>
                    )}
                </div>
            </div>

            {/* Notification Title & Body */}
            <div style={{ paddingRight: '4px' }}>
                <h4 style={{
                    margin: '0 0 8px',
                    fontSize: '16px',
                    fontWeight: isUnread ? '900' : '700',
                    color: isUnread ? '#FFFFFF' : '#F1F5F9',
                    lineHeight: '1.4',
                }}>
                    {title}
                </h4>

                {body && (
                    <p style={{
                        margin: 0,
                        fontSize: '14px',
                        color: '#CBD5E1',
                        lineHeight: '1.65',
                        whiteSpace: 'pre-line',
                    }}>
                        {body}
                    </p>
                )}
            </div>

            {/* Attached Image Preview if available */}
            {imageUrl && (
                <div style={{
                    borderRadius: '14px',
                    overflow: 'hidden',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    maxHeight: '240px',
                    background: '#0D0D12',
                }}>
                    <img
                        src={imageUrl}
                        alt="إشعار"
                        style={{
                            width: '100%',
                            height: '100%',
                            maxHeight: '240px',
                            objectFit: 'cover',
                            display: 'block',
                        }}
                        onError={(e) => {
                            e.currentTarget.parentElement.style.display = 'none';
                        }}
                    />
                </div>
            )}

            {/* Bottom Action Link CTA if available */}
            {linkInfo && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    paddingTop: '6px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '13px',
                        fontWeight: '800',
                        color: '#D4A537',
                    }}>
                        <span>انتقل إلى التفاصيل</span>
                        <ChevronLeft size={16} />
                    </div>
                </div>
            )}
        </div>
    );
}
