import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Zap, Clock, CheckCircle2, XCircle, RefreshCw, Gamepad2 } from 'lucide-react';
import Badge from '../ui/Badge';

export default function OrderCard({ order }) {
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
                background: 'rgba(26, 26, 36, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '18px',
                padding: '20px 22px',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                textDecoration: 'none',
                transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#D4A537';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.4)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
            }}
        >
            {/* Left Column: Image & Details */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '14px',
                    background: '#121218',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '26px',
                    flexShrink: 0,
                    border: '1px solid rgba(212, 165, 55, 0.2)',
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

                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                        <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#FFFFFF' }}>
                            {order.product?.name || 'طلب شحن'}
                        </h4>
                        <span style={{ fontSize: '12px', color: '#D4A537', fontWeight: '700' }}>
                            {orderId}
                        </span>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#9E9EA8' }}>
                        <span>باقة: <strong style={{ color: '#E2E8F0' }}>{order.tier?.name || 'باقة مخصصة'}</strong></span>
                        <span>•</span>
                        <span>الكمية: <strong style={{ color: '#E2E8F0' }}>{order.quantity}</strong></span>
                        {order.player_id && (
                            <>
                                <span>•</span>
                                <span>ID: <strong style={{ color: '#CBD5E1' }}>{order.player_id}</strong></span>
                            </>
                        )}
                    </div>

                    <span style={{ fontSize: '11px', color: '#656570', display: 'block', marginTop: '4px' }}>
                        {formattedDate}
                    </span>
                </div>
            </div>

            {/* Right Column: Status & Price */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                    <Badge variant={statusConfig.variant} size="md">
                        {statusConfig.label}
                    </Badge>

                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
                        <span style={{ fontSize: '18px', fontWeight: '900', color: '#FFFFFF' }}>
                            {amount}
                        </span>
                        <span style={{ fontSize: '12px', color: '#D4A537', fontWeight: '700' }}>
                            ج.م
                        </span>
                    </div>
                </div>

                <div style={{ color: '#D4A537' }}>
                    <ChevronLeft size={20} />
                </div>
            </div>
        </Link>
    );
}
