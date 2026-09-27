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
    ChevronLeft
} from 'lucide-react';

export default function NotificationItem({ notification, onMarkAsRead }) {
    if (!notification) return null;

    const navigate = useNavigate();
    const isUnread = !notification.is_read && !notification.read_at;

    // Get notification type configuration
    const getTypeConfig = () => {
        const type = String(notification.type || '').toLowerCase();
        const title = String(notification.title || '').toLowerCase();

        if (type.includes('deposit') || title.includes('إيداع')) {
            return {
                icon: Wallet,
                color: '#22C55E',
                bg: 'rgba(34, 197, 94, 0.15)',
                border: 'rgba(34, 197, 94, 0.3)',
            };
        }
        if (type.includes('order_completed') || title.includes('اكتمل') || title.includes('نجاح')) {
            return {
                icon: Zap,
                color: '#D4A537',
                bg: 'rgba(212, 165, 55, 0.15)',
                border: 'rgba(212, 165, 55, 0.3)',
            };
        }
        if (type.includes('failed') || type.includes('rejected') || title.includes('فشل') || title.includes('مرفوض')) {
            return {
                icon: XCircle,
                color: '#EF4444',
                bg: 'rgba(239, 68, 68, 0.15)',
                border: 'rgba(239, 68, 68, 0.3)',
            };
        }
        if (type.includes('referral') || title.includes('إحالة') || title.includes('دعوة')) {
            return {
                icon: Gift,
                color: '#F59E0B',
                bg: 'rgba(245, 158, 11, 0.15)',
                border: 'rgba(245, 158, 11, 0.3)',
            };
        }
        if (type.includes('target') || title.includes('تارجت')) {
            return {
                icon: DollarSign,
                color: '#38BDF8',
                bg: 'rgba(56, 189, 248, 0.15)',
                border: 'rgba(56, 189, 248, 0.3)',
            };
        }

        return {
            icon: Bell,
            color: '#D4A537',
            bg: 'rgba(212, 165, 55, 0.15)',
            border: 'rgba(212, 165, 55, 0.3)',
        };
    };

    const config = getTypeConfig();
    const Icon = config.icon;

    const handleClick = () => {
        if (isUnread && onMarkAsRead) {
            onMarkAsRead(notification.id);
        }

        if (notification.link) {
            navigate(notification.link);
        }
    };

    let formattedDate = notification.time_ago || notification.created_at || '';
    try {
        if (notification.created_at && !notification.time_ago) {
            const d = new Date(notification.created_at);
            formattedDate = d.toLocaleDateString('ar-EG', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
        }
    } catch (e) {}

    return (
        <div
            onClick={handleClick}
            style={{
                background: isUnread
                    ? 'linear-gradient(135deg, rgba(35, 35, 50, 0.95) 0%, rgba(22, 22, 32, 0.95) 100%)'
                    : 'rgba(26, 26, 36, 0.65)',
                border: `1px solid ${isUnread ? 'rgba(212, 165, 55, 0.4)' : 'rgba(255, 255, 255, 0.08)'}`,
                borderRadius: '18px',
                padding: '18px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative',
                boxShadow: isUnread ? '0 8px 25px rgba(212, 165, 55, 0.1)' : 'none',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#D4A537';
                e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = isUnread ? 'rgba(212, 165, 55, 0.4)' : 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
            }}
        >
            {/* Unread Glow Dot */}
            {isUnread && (
                <div style={{
                    position: 'absolute',
                    top: '18px',
                    right: '12px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#D4A537',
                    boxShadow: '0 0 10px #D4A537',
                }} />
            )}

            {/* Left Content */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingRight: isUnread ? '8px' : '0' }}>
                <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '14px',
                    background: config.bg,
                    border: `1px solid ${config.border}`,
                    color: config.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                }}>
                    <Icon size={22} />
                </div>

                <div>
                    <h4 style={{
                        margin: '0 0 4px',
                        fontSize: '15px',
                        fontWeight: isUnread ? '900' : '700',
                        color: isUnread ? '#FFFFFF' : '#E2E8F0',
                    }}>
                        {notification.title || 'إشعار من إمبراطور'}
                    </h4>

                    <p style={{
                        margin: '0 0 6px',
                        fontSize: '13px',
                        color: '#9E9EA8',
                        lineHeight: '1.4',
                    }}>
                        {notification.body || ''}
                    </p>

                    <span style={{ fontSize: '11px', color: '#656570' }}>
                        {formattedDate}
                    </span>
                </div>
            </div>

            {/* Right Arrow */}
            {notification.link && (
                <div style={{ color: '#D4A537', flexShrink: 0 }}>
                    <ChevronLeft size={18} />
                </div>
            )}
        </div>
    );
}
