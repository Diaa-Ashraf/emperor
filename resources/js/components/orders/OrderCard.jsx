import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Zap, Clock, CheckCircle2, XCircle, RefreshCw, Gamepad2 } from 'lucide-react';
import Badge from '../ui/Badge';
import { useLanguage } from '../../contexts/LanguageContext';

export default function OrderCard({ order }) {
    const { isRtl } = useLanguage();
    if (!order) return null;

    const getStatusConfig = (status) => {
        switch (status) {
            case 'completed':
                return { variant: 'success', label: 'مكتمل بنجاح' };
            case 'processing':
                return { variant: 'warning', label: 'جاري الشحن' };
            case 'failed':
                return { variant: 'danger', label: 'فشل الشحن' };
            case 'refunded':
                return { variant: 'info', label: 'مسترد' };
            default:
                return { variant: 'warning', label: 'قيد الانتظار' };
        }
    };

    const statusConfig = getStatusConfig(order.status);
    const amount = Number(order.total_amount || 0).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    let formattedDate = order.created_at || '';
    try {
        if (order.created_at) {
            const d = new Date(order.created_at);
            formattedDate = d.toLocaleDateString('ar-EG', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
        }
    } catch (e) {
        formattedDate = order.created_at;
    }

    const orderId = order.public_id || `#${order.id}`;

    return (
        <Link
            to={`/orders/${order.public_id || order.id}`}
            style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-medium)',
                borderRadius: '18px',
                padding: 'clamp(14px, 2.5vw, 20px)',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '14px',
                textDecoration: 'none',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                boxSizing: 'border-box',
                width: '100%',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--gold-400)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-gold)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-medium)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
            }}
        >
            {/* Left Column: Image & Details */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: '1 1 240px', minWidth: 0 }}>
                <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    background: 'var(--bg-elevated)',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    border: '1px solid var(--border-subtle)',
                }}>
                    {order.product?.image_url ? (
                        <img
                            src={order.product.image_url}
                            alt={order.product?.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    ) : (
                        <Gamepad2 size={24} color="#D4A537" />
                    )}
                </div>

                <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                        <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {order.product?.name || 'طلب شحن'}
                        </h4>
                        <span style={{ fontSize: '12px', color: 'var(--gold-400)', fontWeight: '700', fontFamily: 'monospace' }}>
                            {orderId}
                        </span>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                        <span>باقة: <strong style={{ color: 'var(--text-primary)' }}>{order.tier?.name || 'باقة مخصصة'}</strong></span>
                        <span>•</span>
                        <span>الكمية: <strong style={{ color: 'var(--text-primary)' }}>{order.quantity}</strong></span>
                        {order.player_id && (
                            <>
                                <span>•</span>
                                <span>ID: <strong style={{ color: 'var(--text-primary)', fontFamily: 'monospace' }}>{order.player_id}</strong></span>
                            </>
                        )}
                    </div>

                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>
                        {formattedDate}
                    </span>
                </div>
            </div>

            {/* Right Column: Status & Price */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexShrink: 0 }}>
                <div style={{ textAlign: isRtl ? 'left' : 'right', display: 'flex', flexDirection: 'column', alignItems: isRtl ? 'flex-end' : 'flex-start', gap: '6px' }}>
                    <Badge variant={statusConfig.variant} size="md">
                        {statusConfig.label}
                    </Badge>

                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
                        <span style={{ fontSize: '17px', fontWeight: '900', color: 'var(--text-primary)' }}>
                            {amount}
                        </span>
                        <span style={{ fontSize: '12px', color: 'var(--gold-400)', fontWeight: '700' }}>
                            ج.م
                        </span>
                    </div>
                </div>

                <div style={{ color: 'var(--gold-400)', flexShrink: 0 }}>
                    <ChevronLeft size={18} />
                </div>
            </div>
        </Link>
    );
}
