import React, { useState, useEffect } from 'react';
import {
    Target,
    CheckCircle,
    XCircle,
    Eye,
    Clock,
    Search,
    RefreshCw,
    X,
    Filter,
    Plus,
    Layers,
    ClipboardList,
    Trash2,
    Edit3,
    UploadCloud,
    ExternalLink,
    Check,
    ArrowUpRight,
    ArrowLeft
} from 'lucide-react';
import { adminApi } from '../../api/endpoints';
import { useToast } from '../../contexts/ToastContext';
import { useTheme } from '../../contexts/ThemeContext';
import { formatCurrency } from '../../utils/currencyHelper';
import AdminHeader from '../../components/admin/AdminHeader';

export default function AdminTargetsPage() {
    const { theme } = useTheme();
    const isLight = theme === 'light';
    const { success, error: toastError } = useToast();

    const [activeTab, setActiveTab] = useState('apps'); // 'apps' or 'orders'
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Apps & Stats
    const [apps, setApps] = useState([]);
    const [stats, setStats] = useState({
        apps_count: 1,
        pending_orders: 0,
        approved_orders: 0,
    });

    // Target Orders
    const [orders, setOrders] = useState({ data: [], current_page: 1, last_page: 1 });
    const [ordersCount, setOrdersCount] = useState({ all: 0, pending: 0, paid: 0, rejected: 0 });
    const [orderStatusFilter, setOrderStatusFilter] = useState('all');
    const [orderSearch, setOrderSearch] = useState('');
    const [orderPage, setOrderPage] = useState(1);

    // Add / Edit App Modal
    const [isAppModalOpen, setIsAppModalOpen] = useState(false);
    const [editingApp, setEditingApp] = useState(null);
    const [appName, setAppName] = useState('');
    const [appRate, setAppRate] = useState('50');
    const [appReceivingId, setAppReceivingId] = useState('123456789');
    const [appImage, setAppImage] = useState('/images/artwork/hero_card_banner.png');
    const [appPaymentMethods, setAppPaymentMethods] = useState(['اتصالات كاش', 'أورانج كاش', 'محفظة الموقع']);
    const [appSubmitting, setAppSubmitting] = useState(false);

    // Reject Modal
    const [rejectingOrder, setRejectingOrder] = useState(null);
    const [rejectReason, setRejectReason] = useState('');
    const [submittingAction, setSubmittingAction] = useState(false);

    const availableMethods = [
        'فودافون كاش',
        'اتصالات كاش',
        'أورانج كاش',
        'إنستا باي',
        'محفظة الموقع',
    ];

    const fetchAppsAndStats = async () => {
        try {
            setLoading(true);
            const res = await adminApi.getTargetApps();
            if (res && res.data) {
                const data = res.data.data || res.data;
                setApps(data.apps || []);
                if (data.stats) setStats(data.stats);
            }
        } catch (err) {
            console.error('Failed fetching target apps:', err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const fetchOrders = async () => {
        try {
            const res = await adminApi.getTargets({
                page: orderPage,
                status: orderStatusFilter === 'all' ? undefined : orderStatusFilter,
                search: orderSearch.trim() || undefined,
            });
            if (res && res.data) {
                const resData = res.data.data || res.data;
                const rawOrders = resData.orders || resData;
                const rawList = Array.isArray(rawOrders)
                    ? rawOrders
                    : (Array.isArray(rawOrders?.data) ? rawOrders.data : []);
                setOrders({
                    data: rawList,
                    current_page: rawOrders?.current_page || 1,
                    last_page: rawOrders?.last_page || 1,
                    total: rawOrders?.total ?? rawList.length,
                });
                if (resData.counts) setOrdersCount(resData.counts);
            }
        } catch (err) {
            console.error('Failed fetching target orders:', err);
        }
    };

    useEffect(() => {
        fetchAppsAndStats();
        fetchOrders();
    }, [orderPage, orderStatusFilter]);

    const handleRefresh = async () => {
        setRefreshing(true);
        await Promise.all([fetchAppsAndStats(), fetchOrders()]);
        setRefreshing(false);
    };

    const openAddAppModal = () => {
        setEditingApp(null);
        setAppName('');
        setAppRate('50');
        setAppReceivingId('123456789');
        setAppImage('/images/artwork/hero_card_banner.png');
        setAppPaymentMethods(['اتصالات كاش', 'أورانج كاش', 'محفظة الموقع']);
        setIsAppModalOpen(true);
    };

    const openEditAppModal = (app) => {
        setEditingApp(app);
        setAppName(app.name || '');
        setAppRate((app.rate || 50).toString());
        setAppReceivingId(app.receiving_id || '123456789');
        setAppImage(app.image || '/images/artwork/hero_card_banner.png');
        setAppPaymentMethods(app.payment_methods || ['اتصالات كاش', 'أورانج كاش', 'محفظة الموقع']);
        setIsAppModalOpen(true);
    };

    const togglePaymentMethod = (method) => {
        if (appPaymentMethods.includes(method)) {
            setAppPaymentMethods(appPaymentMethods.filter(m => m !== method));
        } else {
            setAppPaymentMethods([...appPaymentMethods, method]);
        }
    };

    const handleSaveApp = async (e) => {
        e.preventDefault();
        if (!appName.trim()) {
            toastError('يرجى إدخال اسم التطبيق');
            return;
        }

        try {
            setAppSubmitting(true);
            await adminApi.saveTargetApp({
                name: appName.trim(),
                rate: parseFloat(appRate) || 50,
                receiving_id: appReceivingId.trim() || '123456789',
                payment_methods: appPaymentMethods,
                image: appImage,
                is_active: editingApp ? editingApp.is_active : false,
            }, editingApp?.id);

            success(editingApp ? 'تم تحديث بيانات التطبيق بنجاح' : 'تمت إضافة تطبيق التارجت بنجاح');
            setIsAppModalOpen(false);
            fetchAppsAndStats();
        } catch (err) {
            toastError(err.response?.data?.message || 'فشل حفظ التطبيق');
        } finally {
            setAppSubmitting(false);
        }
    };

    const handleDeleteApp = async (id) => {
        if (!window.confirm('هل أنت متأكد من حذف هذا التطبيق؟')) return;
        try {
            await adminApi.deleteTargetApp(id);
            success('تم حذف التطبيق بنجاح');
            fetchAppsAndStats();
        } catch (err) {
            toastError('فشل حذف التطبيق');
        }
    };

    const handleToggleApp = async (id) => {
        try {
            await adminApi.toggleTargetApp(id);
            success('تم تعديل حالة التطبيق');
            fetchAppsAndStats();
        } catch (err) {
            toastError('فشل تعديل حالة التطبيق');
        }
    };

    const handleApproveOrder = async (order) => {
        if (!window.confirm(`هل أنت متأكد من اعتماد استلام التارجت وإيداع ${order.net_payout} ${order.currency} في محفظة العميل؟`)) return;

        try {
            setSubmittingAction(true);
            await adminApi.approveTarget(order.id);
            success(`تم اعتماد طلب التارجت (#${order.public_id}) بنجاح`);
            fetchOrders();
            fetchAppsAndStats();
        } catch (err) {
            toastError(err.response?.data?.message || 'فشل اعتماد الطلب');
        } finally {
            setSubmittingAction(false);
        }
    };

    const handleRejectSubmit = async (e) => {
        e.preventDefault();
        if (!rejectReason.trim() || !rejectingOrder) return;

        try {
            setSubmittingAction(true);
            await adminApi.rejectTarget(rejectingOrder.id, { reason: rejectReason });
            success(`تم رفض طلب التارجت (#${rejectingOrder.public_id})`);
            setRejectingOrder(null);
            setRejectReason('');
            fetchOrders();
            fetchAppsAndStats();
        } catch (err) {
            toastError(err.response?.data?.message || 'فشل رفض الطلب');
        } finally {
            setSubmittingAction(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: isLight ? '#F8FAFC' : '#070709',
            color: isLight ? '#0F172A' : '#FFFFFF',
            paddingBottom: '80px',
            fontFamily: 'Cairo, sans-serif',
            direction: 'rtl',
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>
                <AdminHeader />

                {/* Back / Tab Toggle */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '16px 0' }}>
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '8px 16px',
                            borderRadius: '12px',
                            backgroundColor: isLight ? '#FFFFFF' : '#111827',
                            border: isLight ? '1px solid #CBD5E1' : '1px solid #1E293B',
                            color: isLight ? '#0F172A' : '#F5D061',
                            fontSize: '13px',
                            fontWeight: '800',
                            cursor: 'pointer',
                        }}
                    >
                        <ArrowLeft size={16} />
                        رجوع
                    </button>
                    <button
                        type="button"
                        onClick={handleRefresh}
                        disabled={refreshing}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '8px 16px',
                            borderRadius: '12px',
                            backgroundColor: isLight ? '#FFFFFF' : '#111827',
                            border: isLight ? '1px solid #CBD5E1' : '1px solid #1E293B',
                            color: '#94A3B8',
                            fontSize: '12px',
                            fontWeight: '700',
                            cursor: 'pointer',
                        }}
                    >
                        <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
                        تحديث
                    </button>
                </div>

                {/* ================= 1. HEADER CARD (Screenshot 2 top) ================= */}
                <div style={{
                    backgroundColor: isLight ? '#FFFFFF' : '#0B1528',
                    border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                    borderRadius: '24px',
                    padding: '22px',
                    marginBottom: '16px',
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
                        <div>
                            <h2 style={{ fontSize: '20px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF', margin: '0 0 6px' }}>
                                تطبيقات وطلبات التارجت
                            </h2>
                            <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0 }}>
                                إدارة تطبيقات التارجت ومراجعة طلبات العملاء من لوحة التحكم.
                            </p>
                        </div>
                        <div style={{
                            width: '46px',
                            height: '46px',
                            borderRadius: '50%',
                            backgroundColor: '#2563EB',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#FFFFFF',
                            flexShrink: 0,
                        }}>
                            <Target size={24} />
                        </div>
                    </div>

                    {/* 3 Counter Badges */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                        {/* Box 1: التطبيقات */}
                        <div style={{
                            backgroundColor: isLight ? '#F0F9FF' : '#070D1A',
                            border: '1px solid #1E3A8A',
                            borderRadius: '16px',
                            padding: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <div>
                                <span style={{ display: 'block', fontSize: '11px', color: '#94A3B8', fontWeight: '700' }}>التطبيقات</span>
                                <span style={{ fontSize: '20px', fontWeight: '900', color: '#38BDF8' }}>{stats.apps_count}</span>
                            </div>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38BDF8' }}>
                                <Layers size={16} />
                            </div>
                        </div>

                        {/* Box 2: قيد المراجعة */}
                        <div style={{
                            backgroundColor: isLight ? '#FFFBEB' : '#070D1A',
                            border: '1px solid #854D0E',
                            borderRadius: '16px',
                            padding: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <div>
                                <span style={{ display: 'block', fontSize: '11px', color: '#94A3B8', fontWeight: '700' }}>قيد المراجعة</span>
                                <span style={{ fontSize: '20px', fontWeight: '900', color: '#F59E0B' }}>{stats.pending_orders}</span>
                            </div>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B' }}>
                                <ClipboardList size={16} />
                            </div>
                        </div>

                        {/* Box 3: المقبولة */}
                        <div style={{
                            backgroundColor: isLight ? '#F0FDF4' : '#070D1A',
                            border: '1px solid #166534',
                            borderRadius: '16px',
                            padding: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <div>
                                <span style={{ display: 'block', fontSize: '11px', color: '#94A3B8', fontWeight: '700' }}>المقبولة</span>
                                <span style={{ fontSize: '20px', fontWeight: '900', color: '#10B981' }}>{stats.approved_orders}</span>
                            </div>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
                                <CheckCircle size={16} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= 2. CARD: طلبات التارجت (Screenshot 2 middle) ================= */}
                <div style={{
                    backgroundColor: isLight ? '#FFFFFF' : '#0B1528',
                    border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                    borderRadius: '24px',
                    padding: '20px',
                    marginBottom: '16px',
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                        <div>
                            <h3 style={{ fontSize: '17px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF', margin: '0 0 6px' }}>
                                طلبات التارجت
                            </h3>
                            <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0 }}>
                                افتح الطلبات في خانة مستقلة لمراجعة التحويلات والإثباتات بدون ازدحام الصفحة.
                            </p>
                        </div>
                        <div style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '50%',
                            backgroundColor: '#8B5CF6',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#FFFFFF',
                            flexShrink: 0,
                        }}>
                            <ClipboardList size={22} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                        <span style={{
                            padding: '6px 14px',
                            borderRadius: '100px',
                            backgroundColor: 'rgba(245, 158, 11, 0.15)',
                            border: '1px solid #F59E0B',
                            color: '#F59E0B',
                            fontSize: '12px',
                            fontWeight: '800',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                        }}>
                            <span>قيد المراجعة</span>
                            <span>{stats.pending_orders}</span>
                        </span>
                        <span style={{
                            padding: '6px 14px',
                            borderRadius: '100px',
                            backgroundColor: 'rgba(16, 185, 129, 0.15)',
                            border: '1px solid #10B981',
                            color: '#10B981',
                            fontSize: '12px',
                            fontWeight: '800',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                        }}>
                            <span>مقبولة</span>
                            <span>{stats.approved_orders}</span>
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={() => setActiveTab(activeTab === 'orders' ? 'apps' : 'orders')}
                        style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '14px',
                            backgroundColor: '#1E3A8A',
                            color: '#FFFFFF',
                            fontWeight: '800',
                            fontSize: '13px',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            cursor: 'pointer',
                        }}
                    >
                        <span>{activeTab === 'orders' ? 'إخفاء الطلبات' : 'فتح الطلبات'}</span>
                        <ArrowUpRight size={16} />
                    </button>
                </div>

                {/* Orders List View (Toggled) */}
                {activeTab === 'orders' && (
                    <div style={{
                        backgroundColor: isLight ? '#FFFFFF' : '#0B1222',
                        border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                        borderRadius: '20px',
                        padding: '18px',
                        marginBottom: '16px',
                    }}>
                        <div style={{ fontSize: '15px', fontWeight: '900', marginBottom: '14px' }}>
                            قائمة طلبات سحب التارجت الحالية ({orders.data?.length || 0})
                        </div>

                        {orders.data?.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '30px', color: '#94A3B8', fontSize: '13px' }}>
                                لا توجد طلبات تارجت معلقة حالياً.
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {orders.data?.map(ord => (
                                    <div key={ord.id} style={{
                                        backgroundColor: isLight ? '#F8FAFC' : '#070D1A',
                                        border: '1px solid #1E293B',
                                        borderRadius: '14px',
                                        padding: '12px 16px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}>
                                        <div>
                                            <div style={{ fontSize: '14px', fontWeight: '900', color: '#38BDF8' }}>#{ord.public_id}</div>
                                            <div style={{ fontSize: '12px', color: '#94A3B8' }}>{ord.user?.name} - {ord.product?.name}</div>
                                            <div style={{ fontSize: '11px', color: '#F5D061' }}>النقاط: {ord.target_points} | الصافي: {ord.net_payout} {ord.currency}</div>
                                        </div>
                                        {ord.status === 'pending' && (
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button
                                                    onClick={() => handleApproveOrder(ord)}
                                                    style={{ padding: '6px 12px', borderRadius: '8px', backgroundColor: '#10B981', color: '#FFFFFF', border: 'none', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                                                >
                                                    اعتماد
                                                </button>
                                                <button
                                                    onClick={() => { setRejectingOrder(ord); setRejectReason(''); }}
                                                    style={{ padding: '6px 12px', borderRadius: '8px', backgroundColor: '#EF4444', color: '#FFFFFF', border: 'none', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                                                >
                                                    رفض
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* ================= 3. CARD: تطبيقات التارجت (Screenshot 2 bottom & 3) ================= */}
                <div style={{
                    backgroundColor: isLight ? '#FFFFFF' : '#0B1528',
                    border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                    borderRadius: '24px',
                    padding: '20px',
                    marginBottom: '16px',
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                        <div>
                            <h3 style={{ fontSize: '17px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF', margin: '0 0 6px' }}>
                                تطبيقات التارجت
                            </h3>
                            <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0 }}>
                                إضافة التطبيقات وتعديل أسعار الدولار وطرق الاستلام.
                            </p>
                        </div>
                        <div style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '50%',
                            backgroundColor: '#0284C7',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#FFFFFF',
                            flexShrink: 0,
                        }}>
                            <Layers size={22} />
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={openAddAppModal}
                        style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '14px',
                            backgroundColor: isLight ? '#F0F9FF' : '#070D1A',
                            border: '1px solid #0284C7',
                            color: '#38BDF8',
                            fontWeight: '800',
                            fontSize: '13px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            cursor: 'pointer',
                            marginBottom: '20px',
                        }}
                    >
                        <Plus size={16} />
                        إضافة منتج / تطبيق
                    </button>

                    {/* Apps List (Screenshot 3) */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {apps.map(app => (
                            <div key={app.id} style={{
                                backgroundColor: isLight ? '#FFFFFF' : '#070D1A',
                                border: '1px solid #1E3A8A',
                                borderRadius: '20px',
                                overflow: 'hidden',
                            }}>
                                {/* Banner Area with Wings Logo & Badge */}
                                <div style={{
                                    height: '160px',
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'radial-gradient(circle at 50% 50%, #1E3A8A 0%, #070D1A 80%)',
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        top: '12px',
                                        left: '12px',
                                        padding: '4px 12px',
                                        borderRadius: '100px',
                                        backgroundColor: app.is_active ? 'rgba(16, 185, 129, 0.2)' : 'rgba(168, 85, 247, 0.2)',
                                        border: `1px solid ${app.is_active ? '#10B981' : '#A855F7'}`,
                                        color: app.is_active ? '#10B981' : '#A855F7',
                                        fontSize: '11px',
                                        fontWeight: '800',
                                    }}>
                                        {app.is_active ? 'نشط' : 'غير نشط'}
                                    </div>
                                    <img
                                        src={app.image || '/images/artwork/hero_card_banner.png'}
                                        alt=""
                                        style={{ width: '130px', height: '130px', objectFit: 'contain', filter: 'drop-shadow(0 0 15px rgba(212, 165, 55, 0.5))' }}
                                    />
                                </div>

                                {/* App Info Body */}
                                <div style={{ padding: '16px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                        <div>
                                            <h4 style={{ fontSize: '18px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF', margin: '0 0 4px' }}>
                                                {app.name}
                                            </h4>
                                            <div style={{ fontSize: '14px', fontWeight: '900', color: '#38BDF8', marginBottom: '4px' }}>
                                                {app.rate} {app.rate_currency} / دولار
                                            </div>
                                            <div style={{ fontSize: '11px', color: '#94A3B8' }}>
                                                ID الاستلام: <strong style={{ color: isLight ? '#334155' : '#CBD5E1' }}>{app.receiving_id}</strong>
                                            </div>
                                        </div>

                                        {/* Action Icons on Left: Delete & Edit */}
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteApp(app.id)}
                                                style={{
                                                    width: '36px',
                                                    height: '36px',
                                                    borderRadius: '50%',
                                                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                                    border: '1px solid rgba(239, 68, 68, 0.3)',
                                                    color: '#EF4444',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    cursor: 'pointer',
                                                }}
                                                title="حذف"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => openEditAppModal(app)}
                                                style={{
                                                    width: '36px',
                                                    height: '36px',
                                                    borderRadius: '50%',
                                                    backgroundColor: 'rgba(56, 189, 248, 0.1)',
                                                    border: '1px solid rgba(56, 189, 248, 0.3)',
                                                    color: '#38BDF8',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    cursor: 'pointer',
                                                }}
                                                title="تعديل"
                                            >
                                                <Edit3 size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Payment Methods Pills (Screenshot 3 bottom) */}
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', paddingTop: '10px', borderTop: isLight ? '1px solid #F1F5F9' : '1px solid #1E293B' }}>
                                        {app.payment_methods?.map((m, idx) => (
                                            <span key={idx} style={{
                                                padding: '4px 12px',
                                                borderRadius: '100px',
                                                backgroundColor: '#070D1A',
                                                border: '1px solid #1E3A8A',
                                                color: '#38BDF8',
                                                fontSize: '11px',
                                                fontWeight: '800',
                                            }}>
                                                {m}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ================= MODAL: إضافة منتج / تطبيق (Screenshot 4) ================= */}
            {isAppModalOpen && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 9999,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '16px',
                }}>
                    <div style={{
                        backgroundColor: isLight ? '#FFFFFF' : '#070D1A',
                        border: isLight ? '1px solid #CBD5E1' : '1px solid #1E3A8A',
                        borderRadius: '24px',
                        width: '100%',
                        maxWidth: '480px',
                        padding: '24px',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                    }}>
                        {/* Header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF', margin: 0 }}>
                                {editingApp ? 'تعديل تطبيق التارجت' : 'إضافة منتج / تطبيق'}
                            </h3>
                            <button
                                type="button"
                                onClick={() => setIsAppModalOpen(false)}
                                style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSaveApp}>
                            {/* Upload Image Box (Screenshot 4 top) */}
                            <div style={{
                                backgroundColor: isLight ? '#F0F9FF' : '#0B1528',
                                border: '1px dashed #0284C7',
                                borderRadius: '18px',
                                padding: '24px 16px',
                                textAlign: 'center',
                                marginBottom: '16px',
                                cursor: 'pointer',
                            }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    backgroundColor: 'rgba(56, 189, 248, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#38BDF8',
                                    margin: '0 auto 10px',
                                }}>
                                    <UploadCloud size={24} />
                                </div>
                                <div style={{ fontSize: '14px', fontWeight: '800', color: isLight ? '#0F172A' : '#FFFFFF', marginBottom: '4px' }}>
                                    اضغط لرفع صورة التحويل
                                </div>
                                <div style={{ fontSize: '11px', color: '#94A3B8' }}>
                                    PNG أو JPG أو WEBP
                                </div>
                            </div>

                            {/* App Name */}
                            <div style={{ marginBottom: '14px' }}>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#94A3B8', marginBottom: '4px' }}>
                                    اسم التطبيق
                                </label>
                                <input
                                    type="text"
                                    placeholder="مثال: اهلين شات"
                                    value={appName}
                                    onChange={(e) => setAppName(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '11px 14px',
                                        borderRadius: '12px',
                                        backgroundColor: isLight ? '#F8FAFC' : '#040711',
                                        border: isLight ? '1px solid #CBD5E1' : '1px solid #1E293B',
                                        color: isLight ? '#0F172A' : '#FFFFFF',
                                        fontSize: '13px',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                    }}
                                />
                            </div>

                            {/* Exchange Rate & Receiving ID */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#94A3B8', marginBottom: '4px' }}>
                                        سعر الصرف (EGP / دولار)
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="50"
                                        value={appRate}
                                        onChange={(e) => setAppRate(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '11px 14px',
                                            borderRadius: '12px',
                                            backgroundColor: isLight ? '#F8FAFC' : '#040711',
                                            border: isLight ? '1px solid #CBD5E1' : '1px solid #1E293B',
                                            color: isLight ? '#0F172A' : '#FFFFFF',
                                            fontSize: '13px',
                                            outline: 'none',
                                            boxSizing: 'border-box',
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#94A3B8', marginBottom: '4px' }}>
                                        ID الاستلام
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="123456789"
                                        value={appReceivingId}
                                        onChange={(e) => setAppReceivingId(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '11px 14px',
                                            borderRadius: '12px',
                                            backgroundColor: isLight ? '#F8FAFC' : '#040711',
                                            border: isLight ? '1px solid #CBD5E1' : '1px solid #1E293B',
                                            color: isLight ? '#0F172A' : '#FFFFFF',
                                            fontSize: '13px',
                                            outline: 'none',
                                            boxSizing: 'border-box',
                                        }}
                                    />
                                </div>
                            </div>

                            {/* طرق الدفع المتاحة (Screenshot 4 middle) */}
                            <div style={{ marginBottom: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    <label style={{ fontSize: '13px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                        طرق الدفع المتاحة
                                    </label>
                                    <span style={{ fontSize: '11px', color: '#94A3B8' }}>اختر طريقة أو أكثر</span>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {availableMethods.map((method) => {
                                        const isSelected = appPaymentMethods.includes(method);
                                        return (
                                            <button
                                                key={method}
                                                type="button"
                                                onClick={() => togglePaymentMethod(method)}
                                                style={{
                                                    padding: '12px 16px',
                                                    borderRadius: '14px',
                                                    backgroundColor: isSelected ? 'rgba(56, 189, 248, 0.15)' : (isLight ? '#F8FAFC' : '#070D1A'),
                                                    border: isSelected ? '2px solid #0284C7' : (isLight ? '1px solid #E2E8F0' : '1px solid #1E293B'),
                                                    color: isSelected ? '#38BDF8' : (isLight ? '#0F172A' : '#FFFFFF'),
                                                    fontWeight: '800',
                                                    fontSize: '13px',
                                                    textAlign: 'center',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.15s ease',
                                                }}
                                            >
                                                {method}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Bottom Buttons (Screenshot 4 bottom) */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <button
                                    type="submit"
                                    disabled={appSubmitting}
                                    style={{
                                        width: '100%',
                                        padding: '14px',
                                        borderRadius: '14px',
                                        background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B91C1C 100%)',
                                        color: '#FFFFFF',
                                        fontWeight: '900',
                                        fontSize: '14px',
                                        border: 'none',
                                        cursor: appSubmitting ? 'not-allowed' : 'pointer',
                                    }}
                                >
                                    {appSubmitting ? 'جاري الحفظ...' : 'حفظ التطبيق'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsAppModalOpen(false)}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: '#94A3B8',
                                        fontSize: '13px',
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                        padding: '6px',
                                    }}
                                >
                                    إلغاء
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
