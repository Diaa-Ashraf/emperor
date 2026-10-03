import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
    ShoppingBag,
    ArrowRight,
    Gamepad2,
    Clock,
    CheckCircle2,
    XCircle,
    RefreshCw,
    MessageCircle,
    Zap,
    Copy,
    Check
} from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import StatusTimeline from '../components/orders/StatusTimeline';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import EmptyState from '../components/ui/EmptyState';
import { ordersApi } from '../api/endpoints';
import { useToast } from '../contexts/ToastContext';

export default function OrderDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { success } = useToast();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const pollingRef = useRef(null);

    const fetchOrder = (showLoading = true) => {
        if (showLoading) setLoading(true);
        ordersApi.getOrder(id)
            .then(res => {
                if (res?.data) {
                    setOrder(res.data);
                }
            })
            .catch(() => {
                setOrder(null);
            })
            .finally(() => {
                if (showLoading) setLoading(false);
            });
    };

    useEffect(() => {
        fetchOrder(true);

        // Auto-refresh polling if order is processing or pending
        pollingRef.current = setInterval(() => {
            if (order && (order.status === 'pending' || order.status === 'processing')) {
                fetchOrder(false);
            }
        }, 5000);

        return () => {
            if (pollingRef.current) clearInterval(pollingRef.current);
        };
    }, [id, order?.status]);

    const handleCopy = (text) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopied(true);
        success('تم نسخ الرقم بنجاح');
        setTimeout(() => setCopied(false), 3000);
    };

    if (loading) {
        return (
            <MainLayout>
                <div style={{ padding: '80px 0' }}>
                    <LoadingSpinner text="جاري جلب تفاصيل الطلب..." />
                </div>
            </MainLayout>
        );
    }

    if (!order) {
        return (
            <MainLayout>
                <EmptyState
                    title="الطلب غير موجود"
                    description="لم يتم العثور على تفاصيل الطلب المطلوب."
                    actionText="العودة لسجل الطلبات"
                    onAction={() => navigate('/orders')}
                />
            </MainLayout>
        );
    }

    const getStatusBadge = (status) => {
        switch (status) {
            case 'completed':
                return { variant: 'success', label: 'مكتمل بنجاح' };
            case 'processing':
                return { variant: 'warning', label: 'جاري الشحن الفوري' };
            case 'failed':
                return { variant: 'danger', label: 'فشل الشحن' };
            case 'refunded':
                return { variant: 'info', label: 'مسترد' };
            default:
                return { variant: 'warning', label: 'قيد الانتظار' };
        }
    };

    const statusBadge = getStatusBadge(order.status);
    const amount = Number(order.total_amount || 0).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    const unitPrice = Number(order.unit_price || 0).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    const orderPublicId = order.public_id || `#${order.id}`;

    return (
        <MainLayout>
            {/* Header & Breadcrumb */}
            <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: '13px', color: '#8E8E98' }}>
                    <Link to="/" style={{ color: '#D4A537', textDecoration: 'none' }}>الرئيسية</Link>
                    <span>/</span>
                    <Link to="/orders" style={{ color: '#D4A537', textDecoration: 'none' }}>طلباتي</Link>
                    <span>/</span>
                    <span style={{ color: '#CBD5E1' }}>طلب {orderPublicId}</span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                    <div>
                        <h1 style={{ margin: '0 0 4px', fontSize: '26px', fontWeight: '900', color: '#FFFFFF' }}>
                            طلب شحن {orderPublicId}
                        </h1>
                        <span style={{ fontSize: '13px', color: '#9E9EA8' }}>
                            تاريخ الإنشاء: {order.created_at || 'الآن'}
                        </span>
                    </div>

                    <Badge variant={statusBadge.variant} size="lg">
                        {statusBadge.label}
                    </Badge>
                </div>
            </div>

            {/* Layout Grid */}
            <div className="responsive-grid-2col" style={{
                gap: '24px',
                marginBottom: '32px',
            }}>
                {/* Right / Status Timeline Column */}
                <div>
                    <StatusTimeline
                        status={order.status}
                        createdAt={order.created_at}
                        completedAt={order.completed_at}
                        failureReason={order.failure_reason}
                    />

                    {/* Auto-Refresh Status Note */}
                    {(order.status === 'pending' || order.status === 'processing') && (
                        <div style={{
                            background: 'rgba(56, 189, 248, 0.1)',
                            border: '1px solid rgba(56, 189, 248, 0.25)',
                            borderRadius: '14px',
                            padding: '12px 16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            fontSize: '13px',
                            color: '#38BDF8',
                        }}>
                            <RefreshCw size={16} style={{ animation: 'spin 3s linear infinite' }} />
                            <span>يتم تحديث حالة الطلب تلقائياً كل 5 ثوانٍ...</span>
                        </div>
                    )}
                </div>

                {/* Left / Order Summary Details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Item Card */}
                    <div style={{
                        background: 'rgba(26, 26, 36, 0.85)',
                        border: '1px solid rgba(212, 165, 55, 0.25)',
                        borderRadius: '20px',
                        padding: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '16px',
                                background: '#121218',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '28px',
                                border: '1px solid rgba(212, 165, 55, 0.3)',
                                flexShrink: 0,
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
                                <h3 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: '800', color: '#FFFFFF' }}>
                                    {order.product?.name || 'طلب لعبة'}
                                </h3>
                                <span style={{ fontSize: '14px', color: '#D4A537', fontWeight: '700' }}>
                                    باقة: {order.tier?.name}
                                </span>
                            </div>
                        </div>

                        {/* Order Credentials Box */}
                        <div style={{
                            background: 'rgba(18, 18, 24, 0.7)',
                            borderRadius: '14px',
                            padding: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                            fontSize: '13px',
                        }}>
                            {order.player_id && (
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: '#8E8E98' }}>معرف اللاعب (ID):</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <strong style={{ color: '#FFFFFF', letterSpacing: '0.5px' }}>{order.player_id}</strong>
                                        <button
                                            onClick={() => handleCopy(order.player_id)}
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                color: '#D4A537',
                                                cursor: 'pointer',
                                                padding: '2px',
                                            }}
                                            title="نسخ"
                                        >
                                            {copied ? <Check size={14} /> : <Copy size={14} />}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {order.server_id && (
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#8E8E98' }}>Zone ID / السيرفر:</span>
                                    <strong style={{ color: '#FFFFFF' }}>{order.server_id}</strong>
                                </div>
                            )}

                            {order.account_region && (
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#8E8E98' }}>دولة الحساب:</span>
                                    <strong style={{ color: '#FFFFFF' }}>{order.account_region}</strong>
                                </div>
                            )}

                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#8E8E98' }}>الكمية:</span>
                                <strong style={{ color: '#FFFFFF' }}>{order.quantity}</strong>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#8E8E98' }}>سعر الوحدة:</span>
                                <strong style={{ color: '#CBD5E1' }}>{unitPrice} ج.م</strong>
                            </div>

                            <div style={{
                                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                                paddingTop: '10px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'baseline',
                            }}>
                                <span style={{ color: '#CBD5E1', fontWeight: '700' }}>إجمالي المبلغ المدفوع:</span>
                                <strong style={{ fontSize: '20px', color: '#D4A537' }}>
                                    {amount} ج.م
                                </strong>
                            </div>
                        </div>
                    </div>

                    {/* Support & Repeat Actions */}
                    <div style={{ display: 'flex', gap: '12px' }}>
                        {order.product?.id && (
                            <Link to={`/products/${order.product.id}`} style={{ flex: 1, textDecoration: 'none' }}>
                                <Button variant="primary" size="lg" icon={Zap} style={{ width: '100%' }}>
                                    شحن مجدداً
                                </Button>
                            </Link>
                        )}

                        <Link to="/support" style={{ textDecoration: 'none' }}>
                            <Button variant="secondary" size="lg" icon={MessageCircle}>
                                مساعدة الدعم
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
