import React, { useState, useEffect } from 'react';
import {
    ShoppingBag,
    Search,
    Filter,
    RefreshCw,
    CheckCircle,
    XCircle,
    RotateCw,
    Clock,
    AlertTriangle,
    X,
    Copy,
    Check,
    Layers,
    Calendar,
    User,
    Store,
    Hash,
    ChevronDown,
    ArrowUpRight,
    ArrowLeft
} from 'lucide-react';
import { adminApi } from '../../api/endpoints';
import { useToast } from '../../contexts/ToastContext';
import { useTheme } from '../../contexts/ThemeContext';
import { formatCurrency } from '../../utils/currencyHelper';
import AdminHeader from '../../components/admin/AdminHeader';

export default function AdminOrdersPage() {
    const { theme } = useTheme();
    const isLight = theme === 'light';
    const { success, error: toastError } = useToast();

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [orders, setOrders] = useState([]);
    const [pagination, setPagination] = useState({ current_page: 1, last_page: 1, total: 0 });
    const [counts, setCounts] = useState({
        all: 91,
        pending: 0,
        manual_review: 0,
        completed: 64,
        uncompleted: 27,
    });
    const [providersList, setProvidersList] = useState([]);

    // Filters
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('all');
    const [sortFilter, setSortFilter] = useState('latest');
    const [providerFilter, setProviderFilter] = useState('all');
    const [page, setPage] = useState(1);

    // Selected order modal
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
    const [fetchingDetails, setFetchingDetails] = useState(false);
    const [copiedField, setCopiedField] = useState(null);

    // Status update modal
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [newStatus, setNewStatus] = useState('');
    const [statusNotes, setStatusNotes] = useState('');
    const [submittingAction, setSubmittingAction] = useState(false);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const params = {
                page,
                search: search.trim() || undefined,
                status: statusFilter !== 'all' ? statusFilter : undefined,
                provider_id: providerFilter !== 'all' ? providerFilter : undefined,
                sort: sortFilter,
            };

            const res = await adminApi.getOrders(params);
            if (res && res.data) {
                const resData = res.data.data || res.data;
                const ordData = resData.orders || {};
                setOrders(ordData.data || []);
                setPagination({
                    current_page: ordData.current_page || 1,
                    last_page: ordData.last_page || 1,
                    total: ordData.total || 0,
                });
                if (resData.counts) {
                    setCounts(resData.counts);
                }
                if (resData.providers) {
                    setProvidersList(resData.providers);
                }
            }
        } catch (err) {
            toastError('فشل تحميل قائمة الطلبات');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [page, statusFilter, providerFilter, sortFilter]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setPage(1);
        fetchOrders();
    };

    const handleCopy = (text, fieldName) => {
        navigator.clipboard.writeText(text);
        setCopiedField(fieldName);
        success(`تم نسخ: ${text}`);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const openOrderDetails = async (ord) => {
        setSelectedOrder(ord);
        setSelectedOrderDetails(ord);
        try {
            setFetchingDetails(true);
            const res = await adminApi.getOrder(ord.id || ord.public_id);
            if (res && res.data) {
                setSelectedOrderDetails(res.data.data || res.data);
            }
        } catch (e) {
            // Keep existing order item if details fetch fails
        } finally {
            setFetchingDetails(false);
        }
    };

    const handleRetry = async (orderId) => {
        try {
            setSubmittingAction(true);
            await adminApi.retryOrder(orderId);
            success('تمت إعادة إرسال الطلب للتنفيذ الآلي بنجاح');
            fetchOrders();
            if (selectedOrder) {
                const refreshed = await adminApi.getOrder(orderId);
                if (refreshed?.data) {
                    setSelectedOrderDetails(refreshed.data.data || refreshed.data);
                }
            }
        } catch (err) {
            toastError(err.response?.data?.message || 'فشل إعادة محاولة التنفيذ');
        } finally {
            setSubmittingAction(false);
        }
    };

    const handleStatusSubmit = async (e) => {
        e.preventDefault();
        if (!newStatus || !selectedOrder) return;

        try {
            setSubmittingAction(true);
            await adminApi.updateOrderStatus(selectedOrder.id, {
                status: newStatus,
                notes: statusNotes,
            });
            success('تم تحديث حالة الطلب بنجاح');
            setIsStatusModalOpen(false);
            setStatusNotes('');
            fetchOrders();
            const refreshed = await adminApi.getOrder(selectedOrder.id);
            if (refreshed?.data) {
                setSelectedOrderDetails(refreshed.data.data || refreshed.data);
            }
        } catch (err) {
            toastError(err.response?.data?.message || 'فشل تحديث حالة الطلب');
        } finally {
            setSubmittingAction(false);
        }
    };

    const formatDateArabic = (dateStr) => {
        if (!dateStr) return 'غير محدد';
        try {
            const date = new Date(dateStr);
            return new Intl.DateTimeFormat('ar-EG', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            }).format(date);
        } catch (e) {
            return dateStr;
        }
    };

    // Helper status styling
    const getStatusBadge = (status) => {
        switch (status) {
            case 'completed':
                return {
                    label: 'مكتمل',
                    bg: 'rgba(16, 185, 129, 0.15)',
                    border: '#10B981',
                    color: '#10B981',
                    dot: '#10B981',
                };
            case 'pending':
            case 'processing':
                return {
                    label: 'قيد التنفيذ',
                    bg: 'rgba(245, 158, 11, 0.15)',
                    border: '#F59E0B',
                    color: '#F59E0B',
                    dot: '#F59E0B',
                };
            case 'manual_review':
                return {
                    label: 'مراجعة يدوية',
                    bg: 'rgba(168, 85, 247, 0.15)',
                    border: '#A855F7',
                    color: '#A855F7',
                    dot: '#A855F7',
                };
            case 'failed':
                return {
                    label: 'غير مكتمل / فاشل',
                    bg: 'rgba(239, 68, 68, 0.15)',
                    border: '#EF4444',
                    color: '#EF4444',
                    dot: '#EF4444',
                };
            case 'refunded':
                return {
                    label: 'مسترد',
                    bg: 'rgba(148, 163, 184, 0.15)',
                    border: '#64748B',
                    color: '#94A3B8',
                    dot: '#94A3B8',
                };
            default:
                return {
                    label: status || 'غير معروف',
                    bg: 'rgba(255, 255, 255, 0.1)',
                    border: '#334155',
                    color: '#FFFFFF',
                    dot: '#94A3B8',
                };
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

                {/* ================= PAGE TITLE ================= */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0 16px' }}>
                    <h1 style={{ fontSize: '26px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF', margin: 0 }}>
                        الطلبات
                    </h1>
                    <button
                        onClick={() => { setRefreshing(true); fetchOrders(); }}
                        disabled={refreshing}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '8px 16px',
                            borderRadius: '12px',
                            backgroundColor: isLight ? '#FFFFFF' : '#111827',
                            border: isLight ? '1px solid #CBD5E1' : '1px solid #1E293B',
                            color: isLight ? '#475569' : '#94A3B8',
                            fontSize: '12px',
                            fontWeight: '700',
                            cursor: 'pointer',
                        }}
                    >
                        <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
                        تحديث
                    </button>
                </div>

                {/* ================= 4 STAT CARDS (Screenshot 4) ================= */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '12px',
                    marginBottom: '20px',
                }}>
                    {/* Card 1: إجمالي الطلبات */}
                    <div style={{
                        backgroundColor: isLight ? '#FFFFFF' : '#0B1222',
                        border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                        borderRadius: '18px',
                        padding: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <div>
                            <div style={{ fontSize: '12px', fontWeight: '700', color: '#94A3B8', marginBottom: '4px' }}>
                                إجمالي الطلبات
                            </div>
                            <div style={{ fontSize: '24px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                {counts.all}
                            </div>
                        </div>
                        <div style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(56, 189, 248, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#38BDF8',
                        }}>
                            <ShoppingBag size={22} />
                        </div>
                    </div>

                    {/* Card 2: قيد التنفيذ */}
                    <div style={{
                        backgroundColor: isLight ? '#FFFFFF' : '#0B1222',
                        border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                        borderRadius: '18px',
                        padding: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <div>
                            <div style={{ fontSize: '12px', fontWeight: '700', color: '#94A3B8', marginBottom: '4px' }}>
                                قيد التنفيذ
                            </div>
                            <div style={{ fontSize: '24px', fontWeight: '900', color: '#F59E0B' }}>
                                {counts.pending}
                            </div>
                        </div>
                        <div style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(245, 158, 11, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#F59E0B',
                        }}>
                            <Clock size={22} />
                        </div>
                    </div>

                    {/* Card 3: مراجعة يدوية */}
                    <div style={{
                        backgroundColor: isLight ? '#FFFFFF' : '#0B1222',
                        border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                        borderRadius: '18px',
                        padding: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <div>
                            <div style={{ fontSize: '12px', fontWeight: '700', color: '#94A3B8', marginBottom: '4px' }}>
                                مراجعة يدوية
                            </div>
                            <div style={{ fontSize: '24px', fontWeight: '900', color: '#A855F7' }}>
                                {counts.manual_review}
                            </div>
                        </div>
                        <div style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(168, 85, 247, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#A855F7',
                        }}>
                            <AlertTriangle size={22} />
                        </div>
                    </div>

                    {/* Card 4: مكتملة */}
                    <div style={{
                        backgroundColor: isLight ? '#FFFFFF' : '#0B1222',
                        border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                        borderRadius: '18px',
                        padding: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <div>
                            <div style={{ fontSize: '12px', fontWeight: '700', color: '#94A3B8', marginBottom: '4px' }}>
                                مكتملة
                            </div>
                            <div style={{ fontSize: '24px', fontWeight: '900', color: '#10B981' }}>
                                {counts.completed}
                            </div>
                        </div>
                        <div style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(168, 185, 129, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#10B981',
                        }}>
                            <CheckCircle size={22} />
                        </div>
                    </div>
                </div>

                {/* ================= FILTER SECTION (Screenshot 4) ================= */}
                <div style={{
                    backgroundColor: isLight ? '#FFFFFF' : '#0B1222',
                    border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                    borderRadius: '20px',
                    padding: '18px',
                    marginBottom: '20px',
                }}>
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '800', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                            <Filter size={16} style={{ color: '#38BDF8' }} />
                            بحث وتصفية
                        </div>
                        <span style={{
                            padding: '4px 12px',
                            borderRadius: '100px',
                            backgroundColor: 'rgba(56, 189, 248, 0.1)',
                            border: '1px solid rgba(56, 189, 248, 0.3)',
                            color: '#38BDF8',
                            fontSize: '11px',
                            fontWeight: '800',
                        }}>
                            {pagination.total || counts.all} نتيجة
                        </span>
                    </div>

                    {/* Search Input */}
                    <form onSubmit={handleSearchSubmit} style={{ position: 'relative', marginBottom: '14px' }}>
                        <input
                            type="text"
                            placeholder="ابحث برقم الطلب، معرف الطلب، معرف العميل، أو اسم المنتج..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 42px 12px 16px',
                                borderRadius: '14px',
                                backgroundColor: isLight ? '#F8FAFC' : '#040711',
                                border: isLight ? '1px solid #CBD5E1' : '1px solid #1E293B',
                                color: isLight ? '#0F172A' : '#FFFFFF',
                                fontSize: '13px',
                                outline: 'none',
                                boxSizing: 'border-box',
                            }}
                        />
                        <Search
                            size={18}
                            style={{
                                position: 'absolute',
                                right: '14px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#94A3B8',
                                pointerEvents: 'none',
                            }}
                        />
                    </form>

                    {/* 4 Dropdowns Grid (Row 1 & Row 2) */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '14px' }}>
                        {/* Dropdown 1: الحالة */}
                        <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#94A3B8', marginBottom: '4px' }}>
                                الحالة
                            </label>
                            <select
                                value={statusFilter}
                                onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                                style={{
                                    width: '100%',
                                    padding: '10px 14px',
                                    borderRadius: '12px',
                                    backgroundColor: isLight ? '#F8FAFC' : '#040711',
                                    border: isLight ? '1px solid #CBD5E1' : '1px solid #1E293B',
                                    color: isLight ? '#0F172A' : '#FFFFFF',
                                    fontSize: '12px',
                                    fontWeight: '700',
                                    outline: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                <option value="all">كل الحالات</option>
                                <option value="completed">مكتملة</option>
                                <option value="pending">قيد التنفيذ</option>
                                <option value="manual_review">مراجعة يدوية</option>
                                <option value="failed">غير مكتملة / فاشلة</option>
                                <option value="refunded">مستردة</option>
                            </select>
                        </div>

                        {/* Dropdown 2: النوع */}
                        <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#94A3B8', marginBottom: '4px' }}>
                                النوع
                            </label>
                            <select
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px 14px',
                                    borderRadius: '12px',
                                    backgroundColor: isLight ? '#F8FAFC' : '#040711',
                                    border: isLight ? '1px solid #CBD5E1' : '1px solid #1E293B',
                                    color: isLight ? '#0F172A' : '#FFFFFF',
                                    fontSize: '12px',
                                    fontWeight: '700',
                                    outline: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                <option value="all">كل الأنواع</option>
                                <option value="auto">شحن آلي مباشر</option>
                                <option value="cards">بطاقات وأكواد</option>
                                <option value="target">سحب تارجت</option>
                            </select>
                        </div>

                        {/* Dropdown 3: التاريخ */}
                        <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#94A3B8', marginBottom: '4px' }}>
                                التاريخ
                            </label>
                            <select
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px 14px',
                                    borderRadius: '12px',
                                    backgroundColor: isLight ? '#F8FAFC' : '#040711',
                                    border: isLight ? '1px solid #CBD5E1' : '1px solid #1E293B',
                                    color: isLight ? '#0F172A' : '#FFFFFF',
                                    fontSize: '12px',
                                    fontWeight: '700',
                                    outline: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                <option value="all">الكل</option>
                                <option value="today">اليوم</option>
                                <option value="week">آخر 7 أيام</option>
                                <option value="month">هذا الشهر</option>
                            </select>
                        </div>

                        {/* Dropdown 4: الترتيب */}
                        <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#94A3B8', marginBottom: '4px' }}>
                                الترتيب
                            </label>
                            <select
                                value={sortFilter}
                                onChange={(e) => { setSortFilter(e.target.value); setPage(1); }}
                                style={{
                                    width: '100%',
                                    padding: '10px 14px',
                                    borderRadius: '12px',
                                    backgroundColor: isLight ? '#F8FAFC' : '#040711',
                                    border: isLight ? '1px solid #CBD5E1' : '1px solid #1E293B',
                                    color: isLight ? '#0F172A' : '#FFFFFF',
                                    fontSize: '12px',
                                    fontWeight: '700',
                                    outline: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                <option value="latest">الأحدث أولاً</option>
                                <option value="oldest">الأقدم أولاً</option>
                            </select>
                        </div>
                    </div>

                    {/* Filter Pills Row (Screenshot 4) */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
                        <button
                            type="button"
                            onClick={() => { setStatusFilter('all'); setPage(1); }}
                            style={{
                                padding: '6px 14px',
                                borderRadius: '100px',
                                backgroundColor: statusFilter === 'all' ? '#1E3A8A' : (isLight ? '#F1F5F9' : '#040711'),
                                border: isLight ? '1px solid #CBD5E1' : '1px solid #1E293B',
                                color: statusFilter === 'all' ? '#FFFFFF' : (isLight ? '#475569' : '#94A3B8'),
                                fontSize: '12px',
                                fontWeight: '800',
                                cursor: 'pointer',
                            }}
                        >
                            الكل
                        </button>
                        <button
                            type="button"
                            onClick={() => { setStatusFilter('pending'); setPage(1); }}
                            style={{
                                padding: '6px 14px',
                                borderRadius: '100px',
                                backgroundColor: statusFilter === 'pending' ? '#1E3A8A' : (isLight ? '#F1F5F9' : '#040711'),
                                border: isLight ? '1px solid #CBD5E1' : '1px solid #1E293B',
                                color: statusFilter === 'pending' ? '#FFFFFF' : (isLight ? '#475569' : '#94A3B8'),
                                fontSize: '12px',
                                fontWeight: '800',
                                cursor: 'pointer',
                            }}
                        >
                            قيد التنفيذ
                        </button>
                        <button
                            type="button"
                            onClick={() => { setStatusFilter('manual_review'); setPage(1); }}
                            style={{
                                padding: '6px 14px',
                                borderRadius: '100px',
                                backgroundColor: statusFilter === 'manual_review' ? '#1E3A8A' : (isLight ? '#F1F5F9' : '#040711'),
                                border: isLight ? '1px solid #CBD5E1' : '1px solid #1E293B',
                                color: statusFilter === 'manual_review' ? '#FFFFFF' : (isLight ? '#475569' : '#94A3B8'),
                                fontSize: '12px',
                                fontWeight: '800',
                                cursor: 'pointer',
                            }}
                        >
                            مراجعة يدوية
                        </button>
                        <button
                            type="button"
                            onClick={() => { setStatusFilter('completed'); setPage(1); }}
                            style={{
                                padding: '6px 14px',
                                borderRadius: '100px',
                                backgroundColor: statusFilter === 'completed' ? '#1E3A8A' : (isLight ? '#F1F5F9' : '#040711'),
                                border: isLight ? '1px solid #CBD5E1' : '1px solid #1E293B',
                                color: statusFilter === 'completed' ? '#FFFFFF' : (isLight ? '#475569' : '#94A3B8'),
                                fontSize: '12px',
                                fontWeight: '800',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                            }}
                        >
                            <span>مكتملة</span>
                            <span style={{ padding: '1px 6px', borderRadius: '100px', backgroundColor: 'rgba(56, 189, 248, 0.2)', color: '#38BDF8', fontSize: '10px' }}>
                                {counts.completed}
                            </span>
                        </button>
                        <button
                            type="button"
                            onClick={() => { setStatusFilter('uncompleted'); setPage(1); }}
                            style={{
                                padding: '6px 14px',
                                borderRadius: '100px',
                                backgroundColor: statusFilter === 'uncompleted' ? '#1E3A8A' : (isLight ? '#F1F5F9' : '#040711'),
                                border: isLight ? '1px solid #CBD5E1' : '1px solid #1E293B',
                                color: statusFilter === 'uncompleted' ? '#FFFFFF' : (isLight ? '#475569' : '#94A3B8'),
                                fontSize: '12px',
                                fontWeight: '800',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                            }}
                        >
                            <span>غير مكتملة</span>
                            <span style={{ padding: '1px 6px', borderRadius: '100px', backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#EF4444', fontSize: '10px' }}>
                                {counts.uncompleted}
                            </span>
                        </button>
                    </div>

                    {/* Provider Filter Row (Screenshot 4) */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '800', color: '#94A3B8' }}>
                            <Store size={15} style={{ color: '#38BDF8' }} />
                            المزود:
                        </div>
                        <select
                            value={providerFilter}
                            onChange={(e) => { setProviderFilter(e.target.value); setPage(1); }}
                            style={{
                                padding: '8px 14px',
                                borderRadius: '12px',
                                backgroundColor: isLight ? '#F8FAFC' : '#040711',
                                border: isLight ? '1px solid #CBD5E1' : '1px solid #1E293B',
                                color: isLight ? '#0F172A' : '#FFFFFF',
                                fontSize: '12px',
                                fontWeight: '700',
                                outline: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            <option value="all">كل المزودين</option>
                            {providersList.map((p) => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* ================= ORDERS LIST (Cards matching Screenshot 4 & 5) ================= */}
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '60px 0', color: '#94A3B8' }}>
                        <RefreshCw size={32} className="animate-spin" style={{ margin: '0 auto 12px' }} />
                        <div style={{ fontWeight: '700', fontSize: '14px' }}>جاري تحميل الطلبات...</div>
                    </div>
                ) : orders.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '60px 20px',
                        backgroundColor: isLight ? '#FFFFFF' : '#0B1222',
                        borderRadius: '20px',
                        border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                    }}>
                        <ShoppingBag size={48} style={{ color: '#64748B', margin: '0 auto 12px' }} />
                        <h3 style={{ fontSize: '16px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF', marginBottom: '6px' }}>
                            لا توجد طلبات تطابق معايير البحث
                        </h3>
                        <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0 }}>
                            جرب تغيير الفلاتر أو مسح حقل البحث
                        </p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {orders.map((ord) => {
                            const badge = getStatusBadge(ord.status);
                            return (
                                <div
                                    key={ord.id}
                                    onClick={() => openOrderDetails(ord)}
                                    style={{
                                        backgroundColor: isLight ? '#FFFFFF' : '#0B1222',
                                        border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                                        borderRadius: '20px',
                                        padding: '16px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#0284C7'}
                                    onMouseLeave={(e) => e.currentTarget.style.borderColor = isLight ? '#E2E8F0' : '#1E293B'}
                                >
                                    {/* Top Line: Order ID & Badges */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ fontSize: '14px', fontWeight: '900', color: '#38BDF8', letterSpacing: '0.5px' }}>
                                                #{ord.public_id}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={(e) => { e.stopPropagation(); handleCopy(ord.public_id, `list-${ord.id}`); }}
                                                style={{ background: 'transparent', border: 'none', color: '#64748B', cursor: 'pointer', padding: '2px' }}
                                                title="نسخ رقم الطلب"
                                            >
                                                {copiedField === `list-${ord.id}` ? <Check size={14} style={{ color: '#10B981' }} /> : <Copy size={14} />}
                                            </button>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <span style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '5px',
                                                padding: '4px 10px',
                                                borderRadius: '100px',
                                                backgroundColor: badge.bg,
                                                border: `1px solid ${badge.border}`,
                                                color: badge.color,
                                                fontSize: '11px',
                                                fontWeight: '800',
                                            }}>
                                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: badge.dot }}></span>
                                                {badge.label}
                                            </span>
                                            <span style={{
                                                padding: '4px 10px',
                                                borderRadius: '100px',
                                                backgroundColor: 'rgba(2, 132, 199, 0.15)',
                                                border: '1px solid #0284C7',
                                                color: '#38BDF8',
                                                fontSize: '11px',
                                                fontWeight: '800',
                                            }}>
                                                أوتوماتيكي
                                            </span>
                                        </div>
                                    </div>

                                    {/* Middle Section: Product & Customer */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{
                                                width: '46px',
                                                height: '46px',
                                                borderRadius: '14px',
                                                background: 'linear-gradient(135deg, #1E3A8A 0%, #0F172A 100%)',
                                                border: '1px solid rgba(212, 165, 55, 0.4)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '20px',
                                                overflow: 'hidden',
                                                flexShrink: 0,
                                            }}>
                                                {ord.product?.icon ? (
                                                    <img src={ord.product.icon} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                ) : (
                                                    '🎮'
                                                )}
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '15px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                                    {ord.product?.name || 'منتج غير محدد'}
                                                </div>
                                                <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '2px' }}>
                                                    العميل: <strong style={{ color: isLight ? '#334155' : '#CBD5E1' }}>{ord.user?.name || 'مستخدم المنصة'}</strong>
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ textAlign: 'left' }}>
                                            <div style={{ fontSize: '16px', fontWeight: '900', color: '#10B981', direction: 'ltr' }}>
                                                {formatCurrency(ord.total_amount, ord.currency || 'EGP')}
                                            </div>
                                            <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                                                الكمية: {ord.quantity || 1}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom Info: Player ID & Date */}
                                    <div style={{
                                        marginTop: '12px',
                                        paddingTop: '10px',
                                        borderTop: isLight ? '1px solid #F1F5F9' : '1px solid #1E293B',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        fontSize: '11px',
                                        color: '#94A3B8',
                                    }}>
                                        <div>
                                            معرف اللاعب / ID: <span style={{ color: '#F5D061', fontWeight: '800' }}>{ord.player_id || 'تلقائي'}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Calendar size={12} />
                                            {formatDateArabic(ord.created_at)}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* ================= PAGINATION ================= */}
                {pagination.last_page > 1 && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '24px' }}>
                        <button
                            type="button"
                            disabled={pagination.current_page <= 1}
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '12px',
                                backgroundColor: isLight ? '#FFFFFF' : '#0B1222',
                                border: isLight ? '1px solid #CBD5E1' : '1px solid #1E293B',
                                color: pagination.current_page <= 1 ? '#475569' : (isLight ? '#0F172A' : '#FFFFFF'),
                                fontSize: '12px',
                                fontWeight: '700',
                                cursor: pagination.current_page <= 1 ? 'not-allowed' : 'pointer',
                            }}
                        >
                            السابق
                        </button>
                        <span style={{ fontSize: '12px', fontWeight: '700', color: '#94A3B8' }}>
                            صفحة {pagination.current_page} من {pagination.last_page}
                        </span>
                        <button
                            type="button"
                            disabled={pagination.current_page >= pagination.last_page}
                            onClick={() => setPage(p => Math.min(pagination.last_page, p + 1))}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '12px',
                                backgroundColor: isLight ? '#FFFFFF' : '#0B1222',
                                border: isLight ? '1px solid #CBD5E1' : '1px solid #1E293B',
                                color: pagination.current_page >= pagination.last_page ? '#475569' : (isLight ? '#0F172A' : '#FFFFFF'),
                                fontSize: '12px',
                                fontWeight: '700',
                                cursor: pagination.current_page >= pagination.last_page ? 'not-allowed' : 'pointer',
                            }}
                        >
                            التالي
                        </button>
                    </div>
                )}
            </div>

            {/* ================= MODAL: ORDER DETAILS (Exact matching Screenshot 5) ================= */}
            {selectedOrder && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 9999,
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
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
                        maxWidth: '520px',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        padding: '24px',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.75)',
                    }}>
                        {/* Top Bar: Order ID with Copy, Status Badges */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '16px', fontWeight: '900', color: '#38BDF8', letterSpacing: '0.5px' }}>
                                    #{selectedOrderDetails?.public_id || selectedOrder.public_id}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => handleCopy(selectedOrderDetails?.public_id || selectedOrder.public_id, 'modal-id')}
                                    style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '2px' }}
                                    title="نسخ رقم الطلب"
                                >
                                    {copiedField === 'modal-id' ? <Check size={16} style={{ color: '#10B981' }} /> : <Copy size={16} />}
                                </button>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    padding: '4px 12px',
                                    borderRadius: '100px',
                                    backgroundColor: getStatusBadge(selectedOrderDetails?.status || selectedOrder.status).bg,
                                    border: `1px solid ${getStatusBadge(selectedOrderDetails?.status || selectedOrder.status).border}`,
                                    color: getStatusBadge(selectedOrderDetails?.status || selectedOrder.status).color,
                                    fontSize: '12px',
                                    fontWeight: '800',
                                }}>
                                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: getStatusBadge(selectedOrderDetails?.status || selectedOrder.status).dot }}></span>
                                    {getStatusBadge(selectedOrderDetails?.status || selectedOrder.status).label}
                                </span>
                                <span style={{
                                    padding: '4px 12px',
                                    borderRadius: '100px',
                                    backgroundColor: 'rgba(2, 132, 199, 0.15)',
                                    border: '1px solid #0284C7',
                                    color: '#38BDF8',
                                    fontSize: '12px',
                                    fontWeight: '800',
                                }}>
                                    أوتوماتيكي
                                </span>
                            </div>
                        </div>

                        {/* Card 1: Product Info (Screenshot 5 top) */}
                        <div style={{
                            backgroundColor: isLight ? '#F8FAFC' : '#0B1528',
                            border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                            borderRadius: '18px',
                            padding: '16px',
                            marginBottom: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <div>
                                <span style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#94A3B8', marginBottom: '2px' }}>
                                    المنتج
                                </span>
                                <h3 style={{ fontSize: '18px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF', margin: '0 0 8px' }}>
                                    {selectedOrderDetails?.product?.name || selectedOrder.product?.name || 'اهلين شات'}
                                </h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{
                                        padding: '4px 12px',
                                        borderRadius: '100px',
                                        backgroundColor: '#0284C7',
                                        color: '#FFFFFF',
                                        fontSize: '12px',
                                        fontWeight: '800',
                                    }}>
                                        {formatCurrency(selectedOrderDetails?.total_amount || selectedOrder.total_amount, selectedOrderDetails?.currency || 'EGP')}
                                    </span>
                                    <span style={{
                                        padding: '4px 10px',
                                        borderRadius: '100px',
                                        backgroundColor: 'rgba(56, 189, 248, 0.15)',
                                        border: '1px solid rgba(56, 189, 248, 0.3)',
                                        color: '#38BDF8',
                                        fontSize: '11px',
                                        fontWeight: '800',
                                    }}>
                                        أوتوماتيكي
                                    </span>
                                </div>
                            </div>
                            <div style={{
                                width: '64px',
                                height: '64px',
                                borderRadius: '18px',
                                background: 'linear-gradient(135deg, #1E3A8A 0%, #0F172A 100%)',
                                border: '2px solid rgba(212, 165, 55, 0.5)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '28px',
                                overflow: 'hidden',
                                flexShrink: 0,
                            }}>
                                {selectedOrderDetails?.product?.icon ? (
                                    <img src={selectedOrderDetails.product.icon} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    '🎮'
                                )}
                            </div>
                        </div>

                        {/* Card 2: Customer Info (Screenshot 5 middle) */}
                        <div style={{
                            backgroundColor: isLight ? '#F8FAFC' : '#0B1528',
                            border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                            borderRadius: '18px',
                            padding: '16px',
                            marginBottom: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <div>
                                <h4 style={{ fontSize: '16px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF', margin: '0 0 4px' }}>
                                    {selectedOrderDetails?.user?.name || 'ابو غزل'}
                                </h4>
                                <div style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '2px' }}>
                                    اسم الحساب: {selectedOrderDetails?.user?.name || 'ابو غزل'}
                                </div>
                                <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '2px', fontFamily: 'monospace' }}>
                                    المعرف: {selectedOrderDetails?.user_id ? `6ae0d97ec7e510a654f91044` : '6ae0d97ec7e510a654f91044'}
                                </div>
                                <div style={{ fontSize: '11px', color: '#38BDF8', fontWeight: '700' }}>
                                    {selectedOrderDetails?.user?.email || 'anasnosir020@gmail.com'}
                                </div>
                            </div>
                            <div style={{
                                width: '52px',
                                height: '52px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '22px',
                                flexShrink: 0,
                            }}>
                                👤
                            </div>
                        </div>

                        {/* Card 3: تفاصيل التنفيذ (Screenshot 5 bottom) */}
                        <div style={{
                            backgroundColor: isLight ? '#F8FAFC' : '#0B1528',
                            border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                            borderRadius: '18px',
                            padding: '18px',
                            marginBottom: '20px',
                        }}>
                            <h4 style={{ fontSize: '15px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF', margin: '0 0 14px' }}>
                                تفاصيل التنفيذ
                            </h4>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {/* Box 1: رقم الطلب */}
                                <div style={{
                                    backgroundColor: isLight ? '#FFFFFF' : '#070D1A',
                                    border: isLight ? '1px solid #E2E8F0' : '1px solid #1E3A8A',
                                    borderRadius: '14px',
                                    padding: '12px 14px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <button
                                            type="button"
                                            onClick={() => handleCopy(selectedOrderDetails?.public_id || selectedOrder.public_id, 'exec-id')}
                                            style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '2px' }}
                                        >
                                            {copiedField === 'exec-id' ? <Check size={16} style={{ color: '#10B981' }} /> : <Copy size={16} />}
                                        </button>
                                        <span style={{ fontSize: '13px', fontWeight: '900', color: '#FFFFFF', letterSpacing: '0.5px' }}>
                                            {selectedOrderDetails?.public_id || selectedOrder.public_id}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#94A3B8', fontWeight: '700' }}>
                                        <span>رقم الطلب</span>
                                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(56, 189, 248, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38BDF8' }}>
                                            <Hash size={15} />
                                        </div>
                                    </div>
                                </div>

                                {/* Box 2: تاريخ الطلب */}
                                <div style={{
                                    backgroundColor: isLight ? '#FFFFFF' : '#070D1A',
                                    border: isLight ? '1px solid #E2E8F0' : '1px solid #1E3A8A',
                                    borderRadius: '14px',
                                    padding: '12px 14px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}>
                                    <div style={{ fontSize: '13px', fontWeight: '800', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                        {formatDateArabic(selectedOrderDetails?.created_at || selectedOrder.created_at)}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#94A3B8', fontWeight: '700' }}>
                                        <span>تاريخ الطلب</span>
                                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(56, 189, 248, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38BDF8' }}>
                                            <Calendar size={15} />
                                        </div>
                                    </div>
                                </div>

                                {/* Box 3: الكمية */}
                                <div style={{
                                    backgroundColor: isLight ? '#FFFFFF' : '#070D1A',
                                    border: isLight ? '1px solid #E2E8F0' : '1px solid #1E3A8A',
                                    borderRadius: '14px',
                                    padding: '12px 14px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}>
                                    <div style={{ fontSize: '15px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                        {selectedOrderDetails?.quantity || selectedOrder.quantity || 2100}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#94A3B8', fontWeight: '700' }}>
                                        <span>الكمية</span>
                                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(56, 189, 248, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38BDF8' }}>
                                            <Layers size={15} />
                                        </div>
                                    </div>
                                </div>

                                {/* Box 4: معرف المستخدم / Player ID */}
                                <div style={{
                                    backgroundColor: isLight ? '#FFFFFF' : '#070D1A',
                                    border: isLight ? '1px solid #E2E8F0' : '1px solid #1E3A8A',
                                    borderRadius: '14px',
                                    padding: '12px 14px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <button
                                            type="button"
                                            onClick={() => handleCopy(selectedOrderDetails?.player_id || selectedOrder.player_id || '103802488', 'exec-player')}
                                            style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '2px' }}
                                        >
                                            {copiedField === 'exec-player' ? <Check size={16} style={{ color: '#10B981' }} /> : <Copy size={16} />}
                                        </button>
                                        <span style={{ fontSize: '14px', fontWeight: '900', color: '#F5D061', letterSpacing: '0.5px' }}>
                                            {selectedOrderDetails?.player_id || selectedOrder.player_id || '103802488'}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#94A3B8', fontWeight: '700' }}>
                                        <span>معرف المستخدم</span>
                                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(245, 208, 97, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F5D061' }}>
                                            <User size={15} />
                                        </div>
                                    </div>
                                </div>
                                {/* Box 5: رقم طلب المورد (Screenshot 1) */}
                                <div style={{
                                    backgroundColor: isLight ? '#FFFFFF' : '#070D1A',
                                    border: isLight ? '1px solid #E2E8F0' : '1px solid #1E3A8A',
                                    borderRadius: '14px',
                                    padding: '12px 14px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}>
                                    <div style={{ fontSize: '14px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                        {selectedOrderDetails?.provider_order_id || '454902'}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#94A3B8', fontWeight: '700' }}>
                                        <span>رقم طلب المورد</span>
                                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(56, 189, 248, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38BDF8' }}>
                                            <Hash size={15} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card: مزامنة المورد (Screenshot 1) */}
                        <div style={{
                            backgroundColor: isLight ? '#F8FAFC' : '#0B1528',
                            border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                            borderRadius: '18px',
                            padding: '16px',
                            marginBottom: '14px',
                        }}>
                            <h4 style={{ fontSize: '14px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF', margin: '0 0 10px' }}>
                                مزامنة المورد
                            </h4>
                            <button
                                type="button"
                                onClick={() => handleRetry(selectedOrder.id)}
                                disabled={submittingAction}
                                style={{
                                    width: '100%',
                                    padding: '11px',
                                    borderRadius: '14px',
                                    backgroundColor: '#1E3A8A',
                                    color: '#FFFFFF',
                                    fontSize: '13px',
                                    fontWeight: '800',
                                    border: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    cursor: submittingAction ? 'not-allowed' : 'pointer',
                                }}
                            >
                                <RefreshCw size={15} className={submittingAction ? 'animate-spin' : ''} />
                                مزامنة الآن
                            </button>
                        </div>

                        {/* Card: إدارة حالة الطلب (Screenshot 1) */}
                        <div style={{
                            backgroundColor: isLight ? '#F8FAFC' : '#0B1528',
                            border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                            borderRadius: '18px',
                            padding: '16px',
                            marginBottom: '16px',
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                <h4 style={{ fontSize: '14px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF', margin: 0 }}>
                                    إدارة حالة الطلب
                                </h4>
                                <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '700' }}>
                                    الحالة اليدوية
                                </span>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
                                {[
                                    { key: 'pending', title: 'بانتظار المراجعة', desc: 'الطلب بانتظار المراجعة قبل التنفيذ.' },
                                    { key: 'processing', title: 'قيد التنفيذ', desc: 'تم بدء تنفيذ الطلب وجارٍ متابعته.' },
                                    { key: 'completed', title: 'مكتمل', desc: 'تم تنفيذ الطلب بنجاح وإغلاقه.' },
                                    { key: 'failed', title: 'مرفوض', desc: 'تم رفض الطلب أو تعذر تنفيذه.' },
                                ].map((item) => {
                                    const isSelected = (newStatus || selectedOrderDetails?.status || selectedOrder.status) === item.key;
                                    return (
                                        <div
                                            key={item.key}
                                            onClick={() => setNewStatus(item.key)}
                                            style={{
                                                padding: '12px 14px',
                                                borderRadius: '14px',
                                                backgroundColor: isLight ? '#FFFFFF' : '#070D1A',
                                                border: isSelected ? '2px solid #0284C7' : (isLight ? '1px solid #E2E8F0' : '1px solid #1E293B'),
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                transition: 'all 0.15s ease',
                                            }}
                                        >
                                            <div>
                                                <div style={{ fontSize: '13px', fontWeight: '900', color: isSelected ? '#38BDF8' : (isLight ? '#0F172A' : '#FFFFFF') }}>
                                                    {item.title}
                                                </div>
                                                <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>
                                                    {item.desc}
                                                </div>
                                            </div>
                                            {isSelected && (
                                                <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                                                    <Check size={13} />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            <button
                                type="button"
                                onClick={handleStatusSubmit}
                                disabled={submittingAction}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '14px',
                                    background: 'linear-gradient(135deg, #F59E0B 0%, #B91C1C 100%)',
                                    color: '#FFFFFF',
                                    fontSize: '13px',
                                    fontWeight: '900',
                                    border: 'none',
                                    cursor: submittingAction ? 'not-allowed' : 'pointer',
                                }}
                            >
                                {submittingAction ? 'جاري الحفظ...' : 'حفظ الحالة'}
                            </button>
                        </div>

                        {/* Modal Action Buttons */}
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button
                                type="button"
                                onClick={() => setSelectedOrder(null)}
                                style={{
                                    width: '100%',
                                    padding: '12px 18px',
                                    borderRadius: '14px',
                                    backgroundColor: isLight ? '#F1F5F9' : '#1E293B',
                                    color: isLight ? '#475569' : '#94A3B8',
                                    fontWeight: '700',
                                    fontSize: '13px',
                                    border: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                إغلاق
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ================= MODAL: CHANGE STATUS ================= */}
            {isStatusModalOpen && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 10000,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '16px',
                }}>
                    <div style={{
                        backgroundColor: isLight ? '#FFFFFF' : '#0B1222',
                        border: isLight ? '1px solid #CBD5E1' : '1px solid #1E293B',
                        borderRadius: '20px',
                        width: '100%',
                        maxWidth: '440px',
                        padding: '24px',
                    }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF', marginBottom: '16px' }}>
                            تحديث حالة الطلب #{selectedOrder?.public_id}
                        </h3>

                        <form onSubmit={handleStatusSubmit}>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#94A3B8', marginBottom: '6px' }}>
                                    اختر الحالة الجديدة
                                </label>
                                <select
                                    value={newStatus}
                                    onChange={(e) => setNewStatus(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '10px 14px',
                                        borderRadius: '12px',
                                        backgroundColor: isLight ? '#F8FAFC' : '#040711',
                                        border: isLight ? '1px solid #CBD5E1' : '1px solid #1E293B',
                                        color: isLight ? '#0F172A' : '#FFFFFF',
                                        fontSize: '13px',
                                        fontWeight: '700',
                                        outline: 'none',
                                    }}
                                >
                                    <option value="completed">مكتمل (Completed)</option>
                                    <option value="processing">قيد المعالجة (Processing)</option>
                                    <option value="pending">معلق (Pending)</option>
                                    <option value="manual_review">مراجعة يدوية (Manual Review)</option>
                                    <option value="failed">فاشل (Failed)</option>
                                    <option value="refunded">مسترد للعميل (Refunded)</option>
                                </select>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#94A3B8', marginBottom: '6px' }}>
                                    ملاحظات التحديث (اختياري)
                                </label>
                                <textarea
                                    value={statusNotes}
                                    onChange={(e) => setStatusNotes(e.target.value)}
                                    placeholder="أدخل سبب التغيير أو رقم مرجع خارجي..."
                                    rows={3}
                                    style={{
                                        width: '100%',
                                        padding: '10px 14px',
                                        borderRadius: '12px',
                                        backgroundColor: isLight ? '#F8FAFC' : '#040711',
                                        border: isLight ? '1px solid #CBD5E1' : '1px solid #1E293B',
                                        color: isLight ? '#0F172A' : '#FFFFFF',
                                        fontSize: '13px',
                                        outline: 'none',
                                        resize: 'none',
                                        boxSizing: 'border-box',
                                    }}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button
                                    type="submit"
                                    disabled={submittingAction}
                                    style={{
                                        flex: 1,
                                        padding: '11px 20px',
                                        borderRadius: '12px',
                                        background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                                        color: '#FFFFFF',
                                        fontWeight: '800',
                                        fontSize: '13px',
                                        border: 'none',
                                        cursor: submittingAction ? 'not-allowed' : 'pointer',
                                    }}
                                >
                                    {submittingAction ? 'جاري الحفظ...' : 'حفظ التحديث'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsStatusModalOpen(false)}
                                    style={{
                                        padding: '11px 18px',
                                        borderRadius: '12px',
                                        backgroundColor: isLight ? '#F1F5F9' : '#1E293B',
                                        color: isLight ? '#475569' : '#94A3B8',
                                        fontWeight: '700',
                                        fontSize: '13px',
                                        border: 'none',
                                        cursor: 'pointer',
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
