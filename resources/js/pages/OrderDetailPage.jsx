import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
    ShoppingBag,
    ArrowRight,
    ArrowLeft,
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
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

export default function OrderDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { success } = useToast();
    const { t, language, isRtl } = useLanguage();
    const { theme } = useTheme();
    const isLight = theme === 'light';

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
        success(t('copied', 'تم نسخ الرقم بنجاح'));
        setTimeout(() => setCopied(false), 3000);
    };

    if (loading) {
        return (
            <MainLayout>
                <div style={{ padding: '80px 0' }}>
                    <LoadingSpinner text={t('loadingOrderDetails', 'جاري جلب تفاصيل الطلب...')} />
                </div>
            </MainLayout>
        );
    }

    if (!order) {
        return (
            <MainLayout>
                <EmptyState
                    title={t('orderNotFound', 'الطلب غير موجود')}
                    description={t('orderNotFoundDesc', 'لم يتم العثور على تفاصيل الطلب المطلوب.')}
                    actionText={t('backToOrders', 'العودة لسجل الطلبات')}
                    onAction={() => navigate('/orders')}
                />
            </MainLayout>
        );
    }

    const getStatusBadge = (status) => {
        switch (status) {
            case 'completed':
                return { variant: 'success', label: t('completedSuccess', 'مكتمل بنجاح') };
            case 'processing':
                return { variant: 'warning', label: t('instantProcessing', 'جاري الشحن الفوري') };
            case 'failed':
                return { variant: 'danger', label: t('rechargeFailed', 'فشل الشحن') };
            case 'refunded':
                return { variant: 'info', label: t('refunded', 'مسترد') };
            default:
                return { variant: 'warning', label: t('pending', 'قيد الانتظار') };
        }
    };

    const statusBadge = getStatusBadge(order.status);
    const amount = Number(order.total_amount || 0).toLocaleString(language === 'en' ? 'en-US' : 'ar-EG', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    const unitPrice = Number(order.unit_price || 0).toLocaleString(language === 'en' ? 'en-US' : 'ar-EG', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    const currencySymbol = language === 'en' ? 'EGP' : 'ج.م';
    const orderPublicId = order.public_id || `#${order.id}`;

    return (
        <MainLayout>
            {/* Header & Breadcrumb */}
            <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: '13px', color: '#8E8E98' }}>
                    <Link to="/" style={{ color: '#D4A537', textDecoration: 'none' }}>{t('home', 'الرئيسية')}</Link>
                    <span>/</span>
                    <Link to="/orders" style={{ color: '#D4A537', textDecoration: 'none' }}>{t('myOrders', 'طلباتي')}</Link>
                    <span>/</span>
                    <span style={{ color: '#CBD5E1' }}>{t('order', 'طلب')} {orderPublicId}</span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                    <div>
                        <h1 style={{ margin: '0 0 4px', fontSize: '26px', fontWeight: '900', color: '#FFFFFF' }}>
                            {t('rechargeOrder', 'طلب شحن')} {orderPublicId}
                        </h1>
                        <span style={{ fontSize: '13px', color: '#9E9EA8' }}>
                            {t('createdAt', 'تاريخ الإنشاء')}: {order.created_at || t('now', 'الآن')}
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
                            <span>{t('orderAutoRefresh', 'يتم تحديث حالة الطلب تلقائياً كل 5 ثوانٍ...')}</span>
                        </div>
                    )}
                </div>

                {/* Left / Order Summary Details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Item Card */}
                    <div style={{
                        background: isLight ? '#FFFFFF' : 'rgba(26, 26, 36, 0.85)',
                        border: isLight ? '1.5px solid rgba(212, 165, 55, 0.35)' : '1px solid rgba(212, 165, 55, 0.25)',
                        borderRadius: '20px',
                        padding: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                        boxShadow: isLight ? '0 8px 24px rgba(0, 0, 0, 0.05)' : 'none',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '16px',
                                background: isLight ? '#F1F5F9' : '#121218',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '28px',
                                border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(212, 165, 55, 0.3)',
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
                                <h3 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: '800', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                    {order.product?.name || t('gameOrder', 'طلب لعبة')}
                                </h3>
                                <span style={{ fontSize: '14px', color: isLight ? '#B45309' : '#D4A537', fontWeight: '700' }}>
                                    {t('package', 'باقة')}: {order.tier?.name}
                                </span>
                            </div>
                        </div>

                        {/* Order Credentials Box */}
                        <div style={{
                            background: isLight ? '#F8FAFC' : 'rgba(18, 18, 24, 0.7)',
                            border: isLight ? '1px solid #E2E8F0' : 'none',
                            borderRadius: '14px',
                            padding: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                            fontSize: '13px',
                        }}>
                            {order.player_id && (
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: isLight ? '#475569' : '#8E8E98', fontWeight: isLight ? '700' : 'normal' }}>{t('playerId', 'معرف اللاعب (ID)')}:</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <strong style={{ color: isLight ? '#0F172A' : '#FFFFFF', letterSpacing: '0.5px' }}>{order.player_id}</strong>
                                        <button
                                            onClick={() => handleCopy(order.player_id)}
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                color: '#D4A537',
                                                cursor: 'pointer',
                                                padding: '2px',
                                            }}
                                            title={t('clickToCopy', 'نسخ')}
                                        >
                                            {copied ? <Check size={14} color="#16A34A" /> : <Copy size={14} />}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {order.server_id && (
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: isLight ? '#475569' : '#8E8E98' }}>{t('serverId', 'Zone ID / السيرفر')}:</span>
                                    <strong style={{ color: isLight ? '#0F172A' : '#FFFFFF' }}>{order.server_id}</strong>
                                </div>
                            )}

                            {order.account_region && (
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: isLight ? '#475569' : '#8E8E98' }}>{t('accountRegion', 'دولة الحساب')}:</span>
                                    <strong style={{ color: isLight ? '#0F172A' : '#FFFFFF' }}>{order.account_region}</strong>
                                </div>
                            )}

                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: isLight ? '#475569' : '#8E8E98' }}>{t('quantity', 'الكمية')}:</span>
                                <strong style={{ color: isLight ? '#0F172A' : '#FFFFFF' }}>{order.quantity}</strong>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: isLight ? '#475569' : '#8E8E98' }}>{t('unitPrice', 'سعر الوحدة')}:</span>
                                <strong style={{ color: isLight ? '#334155' : '#CBD5E1' }}>{unitPrice} {currencySymbol}</strong>
                            </div>

                            <div style={{
                                borderTop: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                                paddingTop: '10px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'baseline',
                            }}>
                                <span style={{ color: isLight ? '#0F172A' : '#CBD5E1', fontWeight: '800' }}>{t('totalPaid', 'إجمالي المبلغ المدفوع')}:</span>
                                <strong style={{ fontSize: '20px', color: '#D4A537' }}>
                                    {amount} {currencySymbol}
                                </strong>
                            </div>
                        </div>
                    </div>

                    {/* Vouchers / Digital Codes Delivered */}
                    {order.vouchers && order.vouchers.length > 0 && (
                        <div style={{
                            background: isLight ? '#FFFFFF' : 'linear-gradient(135deg, rgba(212, 165, 55, 0.15) 0%, rgba(26, 26, 36, 0.95) 100%)',
                            border: isLight ? '1.5px solid rgba(212, 165, 55, 0.4)' : '1.5px solid rgba(212, 165, 55, 0.5)',
                            borderRadius: '20px',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '14px',
                            boxShadow: isLight ? '0 8px 24px rgba(0, 0, 0, 0.05)' : '0 8px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(212, 165, 55, 0.1)',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '10px',
                                        background: 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)',
                                        color: '#000',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: '900',
                                    }}>
                                        <Zap size={20} />
                                    </div>
                                    <div>
                                        <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                            {t('digitalCodesDelivered', 'الأكواد الرقمية المستلمة (Vouchers)')}
                                        </h4>
                                        <span style={{ fontSize: '12px', color: '#16A34A', fontWeight: '700' }}>
                                            ✓ {t('codeReadyToRedeem', 'جاهز للاستخدام والشحن المباشر')}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {order.vouchers.map((voucher, idx) => (
                                    <div
                                        key={voucher.id || idx}
                                        style={{
                                            background: isLight ? '#F8FAFC' : '#0B0B0F',
                                            border: isLight ? '1.5px dashed rgba(212, 165, 55, 0.5)' : '1.5px dashed rgba(212, 165, 55, 0.45)',
                                            borderRadius: '14px',
                                            padding: '14px 16px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            gap: '12px',
                                            flexWrap: 'wrap',
                                        }}
                                    >
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                            <span style={{ fontSize: '11px', color: isLight ? '#64748B' : '#9CA3AF', fontWeight: '700' }}>
                                                {t('codeNumber', 'كود البطاقة')} #{idx + 1}
                                            </span>
                                            <span style={{
                                                fontFamily: 'monospace',
                                                fontSize: '17px',
                                                fontWeight: '900',
                                                color: isLight ? '#B45309' : '#F5D061',
                                                letterSpacing: '1px',
                                                wordBreak: 'break-all',
                                            }}>
                                                {voucher.code}
                                            </span>
                                            {voucher.serial_number && (
                                                <span style={{ fontSize: '11px', color: '#64748B', fontFamily: 'monospace' }}>
                                                    S/N: {voucher.serial_number}
                                                </span>
                                            )}
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => handleCopy(voucher.code)}
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                padding: '8px 16px',
                                                borderRadius: '10px',
                                                background: 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)',
                                                border: 'none',
                                                color: '#000000',
                                                fontSize: '13px',
                                                fontWeight: '800',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s',
                                                flexShrink: 0,
                                            }}
                                        >
                                            {copied ? <Check size={15} /> : <Copy size={15} />}
                                            <span>{copied ? t('copied', 'تم النسخ!') : t('copyCode', 'نسخ الكود')}</span>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* WhatsApp Complaint / Support Banner */}
                    <div style={{
                        background: isLight ? '#F0FDF4' : 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)',
                        border: isLight ? '1.5px solid rgba(34, 197, 94, 0.4)' : '1px solid rgba(34, 197, 94, 0.3)',
                        borderRadius: '16px',
                        padding: '16px 20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '14px',
                        flexWrap: 'wrap',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                                width: '42px',
                                height: '42px',
                                borderRadius: '12px',
                                background: '#22c55e',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#ffffff',
                                flexShrink: 0,
                                boxShadow: '0 4px 12px rgba(34, 197, 94, 0.35)',
                            }}>
                                <MessageCircle size={22} />
                            </div>
                            <div>
                                <h4 style={{ margin: '0 0 2px', fontSize: '15px', fontWeight: '800', color: isLight ? '#065F46' : '#FFFFFF' }}>
                                    {t('facingProblem', 'تواجه مشكلة في هذا الطلب؟')}
                                </h4>
                                <p style={{ margin: 0, fontSize: '12.5px', color: isLight ? '#166534' : '#94a3b8' }}>
                                    {t('customerSupportHelp', 'خدمة العملاء متواجدة لمساعدتك وحل أي استفسار فوراً')}
                                </p>
                            </div>
                        </div>

                        <a
                            href={`https://wa.me/201026042456?text=${encodeURIComponent(language === 'en' ? `Hello Support, I have an inquiry/complaint regarding Order #${orderPublicId}` : `مرحباً خدمة العملاء، لدي استفسار/شكوى بخصوص الطلب رقم: ${orderPublicId}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: '#22c55e',
                                color: '#FFFFFF',
                                fontWeight: '800',
                                fontSize: '13.5px',
                                padding: '10px 18px',
                                borderRadius: '10px',
                                textDecoration: 'none',
                                boxShadow: '0 4px 14px rgba(34, 197, 94, 0.3)',
                                transition: 'all 0.2s',
                            }}
                        >
                            <span>{t('complaintWhatsapp', 'للشكوى أو الاستفسار اضغط هنا')}</span>
                        </a>
                    </div>

                    {/* Support & Repeat Actions */}
                    <div style={{ display: 'flex', gap: '12px' }}>
                        {order.product?.id && (
                            <Link to={`/products/${order.product.id}`} style={{ flex: 1, textDecoration: 'none' }}>
                                <Button variant="primary" size="lg" icon={Zap} style={{ width: '100%' }}>
                                    {t('rechargeAgain', 'شحن مجدداً')}
                                </Button>
                            </Link>
                        )}

                        <Link to="/support" style={{ textDecoration: 'none' }}>
                            <Button
                                variant="secondary"
                                size="lg"
                                icon={MessageCircle}
                                style={{
                                    background: isLight ? '#F1F5F9' : undefined,
                                    color: isLight ? '#0F172A' : undefined,
                                    border: isLight ? '1px solid #CBD5E1' : undefined,
                                }}
                            >
                                {t('supportTicket', 'تذكرة دعم')}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

