import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Filter, ChevronLeft, Clock, CheckCircle2, XCircle, PlusCircle, ArrowLeft, ArrowRight, FileText, Smartphone } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import Badge from '../components/ui/Badge';
import EmptyState from '../components/ui/EmptyState';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Pagination from '../components/ui/Pagination';
import Button from '../components/ui/Button';
import { targetApi } from '../api/endpoints';
import { useLanguage } from '../contexts/LanguageContext';
import VideoBackground from '../components/home/VideoBackground';

export default function TargetOrdersPage() {
    const { isRtl, t, language } = useLanguage();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [meta, setMeta] = useState(null);

    const fetchOrders = (page = 1, status = 'all') => {
        setLoading(true);
        const params = { page };
        if (status !== 'all') {
            params.status = status;
        }

        targetApi.getOrders(params)
            .then(res => {
                if (res?.data?.data) {
                    setOrders(res.data.data);
                    setMeta(res.data.meta || { current_page: page, last_page: res.data.last_page || 1, total: res.data.total });
                } else if (Array.isArray(res?.data)) {
                    setOrders(res.data);
                }
            })
            .catch(() => {
                setOrders([]);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchOrders(currentPage, statusFilter);
    }, [currentPage, statusFilter]);

    const getStatusConfig = (status) => {
        switch (status) {
            case 'approved':
            case 'paid':
                return { variant: 'success', label: t('approvedAndTransferred', 'معتمد ومحول'), color: '#22C55E' };
            case 'rejected':
                return { variant: 'danger', label: t('rejected', 'مرفوض'), color: '#EF4444' };
            default:
                return { variant: 'warning', label: t('underReview', 'قيد المراجعة'), color: '#F5D061' };
        }
    };

    return (
        <MainLayout>
            {/* Header */}
            <div style={{ marginBottom: '24px' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#8E8E98' }}>
                        <Link to="/" style={{ color: '#D4A537', textDecoration: 'none' }}>{t('home', 'الرئيسية')}</Link>
                        <span>/</span>
                        <Link to="/target/apps" style={{ color: '#D4A537', textDecoration: 'none' }}>{t('targetSelling', 'بيع التارجت')}</Link>
                        <span>/</span>
                        <span style={{ color: '#CBD5E1' }}>{t('ordersHistory', 'سجل الطلبات')}</span>
                    </div>

                    <button
                        onClick={() => navigate('/target/apps')}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '8px 18px',
                            borderRadius: '20px',
                            background: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: '#D1D1DB',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer',
                        }}
                    >
                        <span>{t('back', 'رجوع')}</span>
                        {isRtl ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
                    </button>
                </div>

                <div style={{
                    background: '#0D0D12',
                    border: '1px solid #D4A537',
                    borderRadius: '22px',
                    padding: '22px 24px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
                }}>
                    <div>
                        <h1 style={{ margin: '0 0 6px', fontSize: '22px', fontWeight: '900', color: '#FFFFFF' }}>
                            {t('targetOrdersHistory', 'سجل طلبات بيع التارجت')}
                        </h1>
                        <p style={{ margin: 0, fontSize: '13px', color: '#9E9EA8' }}>
                            {t('trackTargetStatus', 'متابعة حالة تحويل الكاش ومراجعة طلبات التارجت')}
                        </p>
                    </div>

                    <Link to="/target/apps" preventScrollReset={true} style={{ textDecoration: 'none' }}>
                        <button
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '12px 22px',
                                borderRadius: '14px',
                                background: 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)',
                                border: 'none',
                                color: '#000000',
                                fontSize: '14px',
                                fontWeight: '800',
                                cursor: 'pointer',
                                boxShadow: '0 4px 15px rgba(212, 165, 55, 0.3)',
                            }}
                        >
                            <PlusCircle size={16} />
                            <span>{t('sellNewTarget', 'طلب بيع جديد')}</span>
                        </button>
                    </Link>
                </div>
            </div>

            {/* Orders List */}
            <VideoBackground>
                {loading ? (
                    <div style={{ padding: '80px 0' }}>
                        <LoadingSpinner text={t('loadingTargetOrders', 'جاري جلب سجل مبيعات التارجت...')} />
                    </div>
                ) : orders.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
                        {orders.map((order) => {
                            const statusConfig = getStatusConfig(order.status);
                            const netPayout = Number(order.net_payout || 0).toLocaleString(language === 'en' ? 'en-US' : 'ar-EG', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            });

                            return (
                                <Link
                                    key={order.id}
                                    to={`/target/orders/${order.id}`}
                                    style={{
                                        background: 'var(--bg-card)',
                                        border: '1px solid var(--border-medium)',
                                        borderRadius: '18px',
                                        padding: 'clamp(14px, 2.5vw, 18px) clamp(14px, 2.5vw, 22px)',
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        gap: '14px',
                                        textDecoration: 'none',
                                        transition: 'all 0.25s ease',
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
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: '1 1 200px', minWidth: 0 }}>
                                        <div style={{
                                            width: '46px',
                                            height: '46px',
                                            borderRadius: '14px',
                                            background: 'var(--gold-metallic-soft)',
                                            border: '1px solid var(--border-medium)',
                                            color: 'var(--gold-400)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '20px',
                                            flexShrink: 0,
                                        }}>
                                            <Smartphone size={20} color="var(--gold-400)" />
                                        </div>

                                        <div style={{ minWidth: 0, flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                                                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                    {order.product?.name || t('targetSelling', 'بيع تارجت')}
                                                </h4>
                                                <span style={{ fontSize: '12px', color: 'var(--gold-400)', fontWeight: '700', fontFamily: 'monospace' }}>
                                                    #{order.id}
                                                </span>
                                            </div>
                                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                                                {new Date(order.created_at).toLocaleDateString(language === 'en' ? 'en-US' : 'ar-EG', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexShrink: 0 }}>
                                        <div style={{ textAlign: isRtl ? 'left' : 'right' }}>
                                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '2px' }}>
                                                {t('netPayout', 'الصافي المستحق')}
                                            </div>
                                            <div style={{ fontSize: '16px', fontWeight: '900', color: '#22C55E', direction: 'ltr', fontFamily: 'Outfit, Cairo, sans-serif' }}>
                                                {netPayout} {language === 'en' ? 'EGP' : 'ج.م'}
                                            </div>
                                        </div>

                                        <div style={{
                                            padding: '6px 14px',
                                            borderRadius: '12px',
                                            fontSize: '12px',
                                            fontWeight: '800',
                                            background: `${statusConfig.color}15`,
                                            color: statusConfig.color,
                                            border: `1px solid ${statusConfig.color}40`,
                                        }}>
                                            {statusConfig.label}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <EmptyState
                        title={t('noTargetOrders', 'لا توجد طلبات سابقة')}
                        description={t('noTargetOrdersDesc', 'لم تقم بإنشاء أي طلبات بيع تارجت بعد. اختر تطبيقك الآن وابدأ التحويل.')}
                        actionText={t('browseTargetApps', 'بدء بيع تارجت')}
                        onAction={() => navigate('/target/apps')}
                    />
                )}
            </VideoBackground>
        </MainLayout>
    );
}

