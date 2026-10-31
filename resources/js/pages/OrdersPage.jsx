import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Filter, Gamepad2, PlusCircle, RefreshCw } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import OrderCard from '../components/orders/OrderCard';
import EmptyState from '../components/ui/EmptyState';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Pagination from '../components/ui/Pagination';
import Button from '../components/ui/Button';
import { ordersApi } from '../api/endpoints';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import VideoBackground from "../components/home/VideoBackground";

export default function OrdersPage() {
    const { t, isRtl } = useLanguage();
    const { theme } = useTheme();
    const isLight = theme === 'light';
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

        ordersApi.getOrders(params)
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

    const filterTabs = [
        { key: 'all', label: t('allOrders', 'جميع الطلبات') },
        { key: 'processing', label: t('processing', 'جاري الشحن') },
        { key: 'completed', label: t('completed', 'المكتملة') },
        { key: 'failed', label: t('failed', 'الملغية والمستردة') },
    ];

    return (
        <MainLayout>
            {/* Header */}
            <div style={{ marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: '13px', color: isLight ? '#64748B' : '#8E8E98' }}>
                    <Link to="/" style={{ color: isLight ? '#B45309' : '#D4A537', textDecoration: 'none' }}>{t('home', 'الرئيسية')}</Link>
                    <span>/</span>
                    <span style={{ color: isLight ? '#334155' : '#CBD5E1' }}>{t('ordersAndShippingLog', 'سجل طلبات الشحن')}</span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                    <div>
                        <h1 style={{ margin: '0 0 6px', fontSize: '26px', fontWeight: '900', color: isLight ? '#0F172A' : '#F5D061' }}>
                            {t('ordersAndShippingLog', 'طلباتي وسجل الشحن')}
                        </h1>
                        <p style={{ margin: 0, fontSize: '14px', color: isLight ? '#475569' : '#94A3B8' }}>
                            {t('ordersSubtitle', 'تابع حالة تنفيذ شحن ألعابك وبطاقاتك الرقمية لحظة بلحظة')}
                        </p>
                    </div>

                    <Link to="/category/games" style={{ textDecoration: 'none' }}>
                        <Button variant="primary" size="md" icon={Gamepad2}>
                            {t('rechargeNewGame', 'شحن لعبة جديدة')}
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Filter Tabs Bar */}
            <div style={{
                display: 'flex',
                gap: '8px',
                overflowX: 'auto',
                paddingBottom: '8px',
                marginBottom: '28px',
                flexWrap: 'wrap',
            }}>
                {filterTabs.map((tab) => {
                    const isActive = statusFilter === tab.key;
                    return (
                        <button
                            key={tab.key}
                            onClick={() => {
                                setStatusFilter(tab.key);
                                setCurrentPage(1);
                            }}
                            style={{
                                padding: '8px 18px',
                                borderRadius: '12px',
                                background: isActive
                                    ? 'linear-gradient(135deg, #0284C7 0%, #38BDF8 100%)'
                                    : (isLight ? '#FFFFFF' : 'rgba(9, 23, 46, 0.85)'),
                                color: isActive
                                    ? '#FFFFFF'
                                    : (isLight ? '#334155' : '#CBD5E1'),
                                fontWeight: '700',
                                fontSize: '14px',
                                border: isActive
                                    ? 'none'
                                    : (isLight ? '1px solid #CBD5E1' : '1px solid rgba(56, 189, 248, 0.25)'),
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.2s',
                                fontFamily: 'var(--font-cairo)',
                                boxShadow: isActive ? '0 4px 15px rgba(2, 132, 199, 0.35)' : (isLight ? '0 2px 6px rgba(0,0,0,0.03)' : 'none'),
                            }}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Orders List */}
            <VideoBackground>
                {loading ? (
                    <div style={{ padding: '80px 0' }}>
                        <LoadingSpinner text={t('loadingOrders', 'جاري جلب سجل الطلبات...')} />
                    </div>
                ) : orders.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
                        {orders.map((order) => (
                            <OrderCard key={order.id} order={order} />
                        ))}

                        {meta && meta.last_page > 1 && (
                            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                                <Pagination
                                    currentPage={currentPage}
                                    lastPage={meta.last_page}
                                    onPageChange={(p) => setCurrentPage(p)}
                                />
                            </div>
                        )}
                    </div>
                ) : (
                    <EmptyState
                        title={t('noOrdersYet', 'لا توجد طلبات شحن حالياً')}
                        description={t('noOrdersDesc', 'لم تقم بإجراء أي طلبات شحن بهذا التصنيف حتى الآن.')}
                        actionText={t('browseGamesAndRecharge', 'تصفح الألعاب واشحن الآن')}
                        onAction={() => window.location.href = '/category/games'}
                    />
                )}
            </VideoBackground>
        </MainLayout>
    );
}
