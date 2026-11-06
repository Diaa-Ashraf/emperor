import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
    Wallet,
    Users,
    TrendingUp,
    PlusCircle,
    Calendar,
    Filter,
    RefreshCw,
    CheckCircle,
    ArrowUpRight,
    ArrowDownLeft,
    Clock,
    DollarSign,
    Save,
    ChevronDown,
    Shield,
    Search,
    Eye,
    X,
    History,
    ArrowDown,
    ArrowUp,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { adminApi } from '../../api/endpoints';
import { useToast } from '../../contexts/ToastContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import AdminHeader from '../../components/admin/AdminHeader';
import { formatCurrency } from '../../utils/currencyHelper';

export default function AdminWalletPage() {
    const { theme } = useTheme();
    const { user, refreshUser } = useAuth();
    const isLight = theme === 'light';
    const { success, error: toastError } = useToast();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const targetUserId = searchParams.get('user_id');

    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState('30days'); // 30days, month, today, 7days, all
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);

    // Summary data for either Admin or specific User
    const [summary, setSummary] = useState({
        is_user_view: false,
        user: null,
        user_stats: null,
        admin_wallet: { balance: 0, currency: 'EGP', name: 'سند ومهره كارد' },
        admin_settings: { currency: 'EGP', group: 'VIP8 (1%)' },
        customer_stats: { total_balance_usd: 0, total_balance_egp: 0, wallets_count: 0 },
        profit_stats: { profit_usd: 0, profit_egp: 0 },
        period: { start_date: '', end_date: '', transactions_count: 0 },
    });

    const [transactions, setTransactions] = useState({ data: [], current_page: 1, last_page: 1, total: 0 });

    // Transaction Details Modal
    const [selectedTx, setSelectedTx] = useState(null);

    // Quick Add / Adjust Balance Form State (Admin)
    const [quickAmount, setQuickAmount] = useState('');
    const [quickAction, setQuickAction] = useState('credit'); // credit, debit, set
    const [quickDesc, setQuickDesc] = useState('');
    const [addingBalance, setAddingBalance] = useState(false);

    // Admin Settings Form State
    const [selectedCurrency, setSelectedCurrency] = useState('EGP');
    const [selectedGroup, setSelectedGroup] = useState('VIP8 (1%)');
    const [customerGroups, setCustomerGroups] = useState([]);
    const [savingSettings, setSavingSettings] = useState(false);

    // Date range helper for query params
    const getDateParams = () => {
        const now = new Date();
        const params = {};
        if (dateRange === 'today') {
            const todayStr = now.toISOString().split('T')[0];
            params.start_date = todayStr;
            params.end_date = todayStr;
        } else if (dateRange === '7days') {
            const d = new Date();
            d.setDate(d.getDate() - 7);
            params.start_date = d.toISOString().split('T')[0];
            params.end_date = now.toISOString().split('T')[0];
        } else if (dateRange === 'month') {
            params.start_date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
            params.end_date = now.toISOString().split('T')[0];
        } else if (dateRange === '30days') {
            const d = new Date();
            d.setDate(d.getDate() - 30);
            params.start_date = d.toISOString().split('T')[0];
            params.end_date = now.toISOString().split('T')[0];
        }
        return params;
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const dateParams = getDateParams();
            const queryParams = { ...dateParams };
            if (targetUserId) {
                queryParams.user_id = targetUserId;
            }

            const txParams = {
                page,
                ...dateParams,
            };
            if (targetUserId) {
                txParams.user_id = targetUserId;
            }
            if (searchQuery.trim()) {
                txParams.search = searchQuery.trim();
            }

            const [sumRes, txRes] = await Promise.all([
                adminApi.getWalletSummary(queryParams),
                adminApi.getWalletTransactions(txParams),
            ]);

            if (sumRes && sumRes.data) {
                const sumData = sumRes.data.data || sumRes.data;
                setSummary(sumData);
                if (sumData.admin_settings) {
                    setSelectedCurrency(sumData.admin_settings.currency || 'EGP');
                    setSelectedGroup(sumData.admin_settings.group || 'VIP8 (1%)');
                }
            }

            if (txRes && txRes.data) {
                const txData = txRes.data.data || txRes.data;
                const txList = Array.isArray(txData)
                    ? txData
                    : (Array.isArray(txData?.data) ? txData.data : []);

                setTransactions({
                    data: txList,
                    current_page: txData?.current_page || 1,
                    last_page: txData?.last_page || 1,
                    total: txData?.total ?? txList.length,
                });
            }
        } catch (err) {
            console.error('Wallet fetch error:', err);
            toastError('فشل تحميل بيانات المحفظة');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [dateRange, page, targetUserId]);

    useEffect(() => {
        adminApi.getPricingTiers().then((res) => {
            const payload = res?.data?.data || res?.data || {};
            setCustomerGroups(Array.isArray(payload.groups) ? payload.groups.filter((group) => group.is_active !== false) : []);
        }).catch(() => setCustomerGroups([]));
    }, []);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setPage(1);
        fetchData();
    };

    const handleClearUserFilter = () => {
        setSearchParams({});
        setPage(1);
    };

    // Format Arabic dates
    const formatDateArabic = (dateStr) => {
        if (!dateStr) return '';
        try {
            const d = new Date(dateStr);
            return new Intl.DateTimeFormat('ar-EG', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            }).format(d);
        } catch (e) {
            return dateStr;
        }
    };

    const formatDateShort = (dateStr) => {
        if (!dateStr) return '';
        try {
            const d = new Date(dateStr);
            return new Intl.DateTimeFormat('ar-EG', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            }).format(d);
        } catch (e) {
            return dateStr;
        }
    };

    // Quick add / adjust balance handler (Admin Mode)
    const handleQuickAddBalance = async (e) => {
        e.preventDefault();
        const amt = parseFloat(quickAmount);
        if (amt === undefined || isNaN(amt) || (quickAction !== 'set' && amt <= 0)) {
            toastError('يرجى إدخال مبلغ صحيح أكبر من صفر');
            return;
        }

        setAddingBalance(true);
        try {
            const res = await adminApi.adjustWalletBalance({
                amount: amt,
                action: quickAction,
                currency: selectedCurrency,
                description: quickDesc.trim() || undefined,
            });
            const newBal = res?.data?.data?.new_balance;
            if (newBal !== undefined) {
                setSummary(prev => ({
                    ...prev,
                    admin_wallet: {
                        ...prev.admin_wallet,
                        balance: parseFloat(newBal) || 0
                    }
                }));
            }
            const actionText = quickAction === 'credit' ? 'إضافة' : quickAction === 'debit' ? 'خصم' : 'تعديل';
            success(`تمت عملية ${actionText} رصيد الأدمن بنجاح`);
            setQuickAmount('');
            setQuickDesc('');
            fetchData();
            if (refreshUser) refreshUser();
            window.dispatchEvent(new CustomEvent('emperor:refresh-profile'));
        } catch (err) {
            console.error('Adjust balance error:', err);
            toastError(err.message || err.response?.data?.message || 'فشل تعديل الرصيد');
        } finally {
            setAddingBalance(false);
        }
    };

    // Admin settings save handler
    const handleSaveSettings = async (e) => {
        e.preventDefault();
        setSavingSettings(true);
        try {
            await adminApi.updateWalletSettings({
                currency: selectedCurrency,
                group: selectedGroup,
            });
            success('تم حفظ إعدادات حساب الأدمن بنجاح');
            fetchData();
            if (refreshUser) refreshUser();
        } catch (err) {
            console.error('Settings save error:', err);
            toastError('فشل حفظ الإعدادات');
        } finally {
            setSavingSettings(false);
        }
    };

    const isUserView = Boolean(targetUserId && summary.is_user_view);

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: isLight ? '#F8FAFC' : '#07090E',
            color: isLight ? '#0F172A' : '#FFFFFF',
            fontFamily: 'Cairo, sans-serif',
            direction: 'rtl',
            paddingBottom: '80px',
        }}>
            {/* Top Navigation Bar with Back Button + Menu Toggle */}
            <AdminHeader
                title={isUserView ? 'سجل حركة المستخدم' : 'محفظة الأدمن'}
                badge="المحفظة"
                onRefresh={fetchData}
                refreshing={loading}
            />

            <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 16px' }}>

                {/* ═══ Header Badge & Title Block (Matching Image 5 & User Mockups) ═══ */}
                <div style={{ textAlign: 'center', marginBottom: '22px' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 14px',
                        borderRadius: '20px',
                        backgroundColor: 'rgba(56, 189, 248, 0.12)',
                        border: '1px solid rgba(56, 189, 248, 0.3)',
                        color: '#38BDF8',
                        fontSize: '12.5px',
                        fontWeight: '800',
                        marginBottom: '10px',
                    }}>
                        <Wallet size={13} color="#38BDF8" />
                        <span>المحفظة</span>
                    </div>

                    <h1 style={{
                        fontSize: '28px',
                        fontWeight: '900',
                        color: isLight ? '#0F172A' : '#FFFFFF',
                        margin: '0 0 8px',
                        letterSpacing: '-0.5px',
                    }}>
                        {isUserView ? 'سجل حركة المستخدم' : 'محفظة الأدمن'}
                    </h1>

                    {/* If in User View, display Active User Badge + Clear Button (Image 5) */}
                    {isUserView && (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            marginBottom: '6px',
                        }}>
                            <span style={{
                                padding: '4px 12px',
                                borderRadius: '16px',
                                backgroundColor: 'rgba(56, 189, 248, 0.2)',
                                border: '1px solid rgba(56, 189, 248, 0.4)',
                                color: '#38BDF8',
                                fontSize: '13px',
                                fontWeight: '800',
                            }}>
                                {summary.user?.name || 'مستخدم'}
                            </span>
                            <button
                                onClick={handleClearUserFilter}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    padding: '4px 10px',
                                    borderRadius: '16px',
                                    backgroundColor: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.08)',
                                    border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.15)',
                                    color: isLight ? '#64748B' : '#94A3B8',
                                    fontSize: '12px',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    fontFamily: 'Cairo, sans-serif',
                                }}
                            >
                                <X size={13} />
                                <span>عرض كل المستخدمين</span>
                            </button>
                        </div>
                    )}

                    <p style={{
                        fontSize: '13px',
                        color: isLight ? '#64748B' : '#94A3B8',
                        margin: 0,
                    }}>
                        {isUserView
                            ? `حتى ${formatDateShort(summary.period?.end_date || new Date())}`
                            : (summary.period?.start_date && summary.period?.end_date
                                ? `من ${formatDateShort(summary.period.start_date)} إلى ${formatDateShort(summary.period.end_date)}`
                                : 'نظرة عامة على الرصيد والعمليات')}
                    </p>
                </div>

                {/* ═══ Date Filter Dropdown Bar (Matching Image 5 & Screenshots) ═══ */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '16px',
                }}>
                    <div style={{
                        flex: 1,
                        backgroundColor: isLight ? '#FFFFFF' : '#0B0F19',
                        border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(56, 189, 248, 0.25)',
                        borderRadius: '16px',
                        padding: '10px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                    }}>
                        <select
                            value={dateRange}
                            onChange={(e) => {
                                setDateRange(e.target.value);
                                setPage(1);
                            }}
                            style={{
                                width: '100%',
                                background: 'transparent',
                                border: 'none',
                                color: isLight ? '#0F172A' : '#FFFFFF',
                                fontSize: '13.5px',
                                fontWeight: '700',
                                outline: 'none',
                                cursor: 'pointer',
                                fontFamily: 'Cairo, sans-serif',
                            }}
                        >
                            <option value="30days" style={{ background: '#0B0F19', color: '#fff' }}>آخر 30 يوم</option>
                            <option value="month" style={{ background: '#0B0F19', color: '#fff' }}>الشهر الحالي</option>
                            <option value="7days" style={{ background: '#0B0F19', color: '#fff' }}>آخر 7 أيام</option>
                            <option value="today" style={{ background: '#0B0F19', color: '#fff' }}>اليوم فقط</option>
                        </select>
                        <Calendar size={18} color="#38BDF8" style={{ pointerEvents: 'none', marginRight: '6px' }} />
                    </div>

                    <button
                        onClick={fetchData}
                        style={{
                            padding: '12px 22px',
                            borderRadius: '16px',
                            background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                            color: '#FFFFFF',
                            border: 'none',
                            fontSize: '14px',
                            fontWeight: '900',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            boxShadow: '0 4px 15px rgba(245, 158, 11, 0.35)',
                            fontFamily: 'Cairo, sans-serif',
                            flexShrink: 0,
                        }}
                    >
                        <Filter size={15} />
                        <span>فلترة</span>
                    </button>
                </div>

                {/* ═══ Search by Operation Number (Matching Image 5) ═══ */}
                <form onSubmit={handleSearchSubmit} style={{ marginBottom: '20px' }}>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="بحث برقم العملية أو الوصف..."
                            style={{
                                width: '100%',
                                padding: '12px 42px 12px 16px',
                                borderRadius: '16px',
                                backgroundColor: isLight ? '#FFFFFF' : '#0B0F19',
                                border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(56, 189, 248, 0.25)',
                                color: isLight ? '#0F172A' : '#FFFFFF',
                                fontSize: '13px',
                                fontFamily: 'Cairo, sans-serif',
                                outline: 'none',
                            }}
                        />
                        <Search
                            size={18}
                            color={isLight ? '#64748B' : '#38BDF8'}
                            style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)' }}
                        />
                    </div>
                </form>

                {/* ══════════════════════════════════════════════════════════════
                    3 STACKED METRIC CARDS
                    (User View: Image 5 vs Admin View: General Admin)
                ══════════════════════════════════════════════════════════════ */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
                    {isUserView ? (
                        <>
                            {/* Card 1: الرصيد الحالي (User) */}
                            <div style={{
                                backgroundColor: isLight ? '#FFFFFF' : '#0B0F19',
                                border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(56, 189, 248, 0.2)',
                                borderRadius: '20px',
                                padding: '20px 22px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                boxShadow: isLight ? '0 4px 15px rgba(0, 0, 0, 0.04)' : '0 8px 24px rgba(0, 0, 0, 0.4)',
                            }}>
                                <div>
                                    <span style={{ fontSize: '12.5px', color: isLight ? '#64748B' : '#94A3B8', display: 'block', marginBottom: '4px' }}>
                                        الرصيد الحالي
                                    </span>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                                        <span style={{ fontSize: '26px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                            {formatCurrency(summary.user_stats?.current_balance || 0, summary.user_stats?.currency || 'EGP')}
                                        </span>
                                    </div>
                                    <span style={{ fontSize: '11px', color: '#38BDF8', fontWeight: '700' }}>
                                        {summary.user_stats?.currency || 'EGP'}
                                    </span>
                                </div>
                                <div style={{
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '14px',
                                    backgroundColor: 'rgba(56, 189, 248, 0.12)',
                                    border: '1px solid rgba(56, 189, 248, 0.3)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#38BDF8',
                                }}>
                                    <Wallet size={22} />
                                </div>
                            </div>

                            {/* Card 2: حركات المحفظة (User) */}
                            <div style={{
                                backgroundColor: isLight ? '#FFFFFF' : '#0B0F19',
                                border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(56, 189, 248, 0.2)',
                                borderRadius: '20px',
                                padding: '20px 22px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                boxShadow: isLight ? '0 4px 15px rgba(0, 0, 0, 0.04)' : '0 8px 24px rgba(0, 0, 0, 0.4)',
                            }}>
                                <div>
                                    <span style={{ fontSize: '12.5px', color: isLight ? '#64748B' : '#94A3B8', display: 'block', marginBottom: '4px' }}>
                                        حركات المحفظة
                                    </span>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                                        <span style={{ fontSize: '26px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                            {summary.user_stats?.movements_count || 0}
                                        </span>
                                    </div>
                                    <span style={{ fontSize: '11px', color: isLight ? '#64748B' : '#94A3B8' }}>
                                        السجل المباشر من مسار المحفظة
                                    </span>
                                </div>
                                <div style={{
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '14px',
                                    backgroundColor: 'rgba(56, 189, 248, 0.12)',
                                    border: '1px solid rgba(56, 189, 248, 0.3)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#38BDF8',
                                }}>
                                    <History size={22} />
                                </div>
                            </div>

                            {/* Card 3: إجمالي الإضافات (User) */}
                            <div style={{
                                backgroundColor: isLight ? '#FFFFFF' : '#0B0F19',
                                border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(56, 189, 248, 0.2)',
                                borderRadius: '20px',
                                padding: '20px 22px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                boxShadow: isLight ? '0 4px 15px rgba(0, 0, 0, 0.04)' : '0 8px 24px rgba(0, 0, 0, 0.4)',
                            }}>
                                <div>
                                    <span style={{ fontSize: '12.5px', color: isLight ? '#64748B' : '#94A3B8', display: 'block', marginBottom: '4px' }}>
                                        إجمالي الإضافات
                                    </span>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                                        <span style={{ fontSize: '26px', fontWeight: '900', color: '#10B981' }}>
                                            + {formatCurrency(summary.user_stats?.total_credits || 0, summary.user_stats?.currency || 'EGP')}
                                        </span>
                                    </div>
                                    <span style={{ fontSize: '11px', color: isLight ? '#64748B' : '#94A3B8' }}>
                                        إجمالي المبالغ المضافة للمحفظة
                                    </span>
                                </div>
                                <div style={{
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '14px',
                                    backgroundColor: 'rgba(16, 185, 129, 0.12)',
                                    border: '1px solid rgba(16, 185, 129, 0.3)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#10B981',
                                }}>
                                    <ArrowUpRight size={22} />
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Card 1: رصيد الأدمن */}
                            <div style={{
                                backgroundColor: isLight ? '#FFFFFF' : '#0B0F19',
                                border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(56, 189, 248, 0.2)',
                                borderRadius: '20px',
                                padding: '20px 22px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                boxShadow: isLight ? '0 4px 15px rgba(0, 0, 0, 0.04)' : '0 8px 24px rgba(0, 0, 0, 0.4)',
                            }}>
                                <div>
                                    <span style={{ fontSize: '12.5px', color: isLight ? '#64748B' : '#94A3B8', display: 'block', marginBottom: '4px' }}>
                                        رصيد الأدمن
                                    </span>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                                        <span style={{ fontSize: '26px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                            {formatCurrency(summary.admin_wallet?.balance || 0, summary.admin_wallet?.currency || summary.admin_settings?.currency || selectedCurrency || 'EGP')}
                                        </span>
                                    </div>
                                    <span style={{ fontSize: '11px', color: isLight ? '#64748B' : '#94A3B8' }}>
                                        {summary.admin_wallet?.name || 'سند ومهره كارد'}
                                    </span>
                                </div>
                                <div style={{
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '14px',
                                    backgroundColor: 'rgba(56, 189, 248, 0.12)',
                                    border: '1px solid rgba(56, 189, 248, 0.3)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#38BDF8',
                                }}>
                                    <Wallet size={22} />
                                </div>
                            </div>

                            {/* Card 2: رصيد العملاء */}
                            <div style={{
                                backgroundColor: isLight ? '#FFFFFF' : '#0B0F19',
                                border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(56, 189, 248, 0.2)',
                                borderRadius: '20px',
                                padding: '20px 22px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                boxShadow: isLight ? '0 4px 15px rgba(0, 0, 0, 0.04)' : '0 8px 24px rgba(0, 0, 0, 0.4)',
                            }}>
                                <div>
                                    <span style={{ fontSize: '12.5px', color: isLight ? '#64748B' : '#94A3B8', display: 'block', marginBottom: '4px' }}>
                                        رصيد العملاء
                                    </span>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                                        <span style={{ fontSize: '24px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                            $ {Number(summary.customer_stats?.total_balance_usd || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
                                        </span>
                                    </div>
                                    <span style={{ fontSize: '11px', color: isLight ? '#64748B' : '#94A3B8' }}>
                                        {summary.customer_stats?.wallets_count || 0} محفظة عميل
                                    </span>
                                </div>
                                <div style={{
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '14px',
                                    backgroundColor: 'rgba(56, 189, 248, 0.12)',
                                    border: '1px solid rgba(56, 189, 248, 0.3)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#38BDF8',
                                }}>
                                    <Users size={22} />
                                </div>
                            </div>

                            {/* Card 3: الأرباح */}
                            <div style={{
                                backgroundColor: isLight ? '#FFFFFF' : '#0B0F19',
                                border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(56, 189, 248, 0.2)',
                                borderRadius: '20px',
                                padding: '20px 22px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                boxShadow: isLight ? '0 4px 15px rgba(0, 0, 0, 0.04)' : '0 8px 24px rgba(0, 0, 0, 0.4)',
                            }}>
                                <div>
                                    <span style={{ fontSize: '12.5px', color: isLight ? '#64748B' : '#94A3B8', display: 'block', marginBottom: '4px' }}>
                                        الأرباح
                                    </span>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                                        <span style={{ fontSize: '24px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                            $ {Number(summary.profit_stats?.profit_usd || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
                                        </span>
                                    </div>
                                    <span style={{ fontSize: '11px', color: isLight ? '#64748B' : '#94A3B8' }}>
                                        من الطلبات المكتملة داخل المدة
                                    </span>
                                </div>
                                <div style={{
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '14px',
                                    backgroundColor: 'rgba(56, 189, 248, 0.12)',
                                    border: '1px solid rgba(56, 189, 248, 0.3)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#38BDF8',
                                }}>
                                    <TrendingUp size={22} />
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* ══════════════════════════════════════════════════════════════
                    USER VIEW HIGHLIGHTS: آخر إضافة & آخر خصم (Matching Image 2)
                ══════════════════════════════════════════════════════════════ */}
                {isUserView && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
                        {/* آخر إضافة */}
                        <div style={{
                            backgroundColor: isLight ? '#FFFFFF' : '#0B0F19',
                            border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(56, 189, 248, 0.2)',
                            borderRadius: '20px',
                            padding: '18px 20px',
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                            boxShadow: isLight ? '0 4px 15px rgba(0, 0, 0, 0.04)' : '0 8px 24px rgba(0, 0, 0, 0.4)',
                        }}>
                            <div>
                                <span style={{ fontSize: '12px', color: isLight ? '#64748B' : '#94A3B8', display: 'block', marginBottom: '4px' }}>
                                    آخر إضافة
                                </span>
                                <span style={{ fontSize: '22px', fontWeight: '900', color: '#10B981', display: 'block', marginBottom: '4px' }}>
                                    + {formatCurrency(summary.user_stats?.last_credit?.amount || 0, summary.user_stats?.currency || 'EGP')}
                                </span>
                                <span style={{ fontSize: '13px', fontWeight: '800', color: isLight ? '#0F172A' : '#FFFFFF', display: 'block', marginBottom: '2px' }}>
                                    {summary.user?.name || 'مستخدم'}
                                </span>
                                <span style={{ fontSize: '11px', color: isLight ? '#94A3B8' : '#64748B' }}>
                                    {formatDateArabic(summary.user_stats?.last_credit?.created_at)}
                                </span>
                            </div>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '12px',
                                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                                border: '1px solid rgba(16, 185, 129, 0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#10B981',
                            }}>
                                <ArrowUpRight size={20} />
                            </div>
                        </div>

                        {/* آخر خصم */}
                        <div style={{
                            backgroundColor: isLight ? '#FFFFFF' : '#0B0F19',
                            border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(56, 189, 248, 0.2)',
                            borderRadius: '20px',
                            padding: '18px 20px',
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                            boxShadow: isLight ? '0 4px 15px rgba(0, 0, 0, 0.04)' : '0 8px 24px rgba(0, 0, 0, 0.4)',
                        }}>
                            <div>
                                <span style={{ fontSize: '12px', color: isLight ? '#64748B' : '#94A3B8', display: 'block', marginBottom: '4px' }}>
                                    آخر خصم
                                </span>
                                <span style={{ fontSize: '22px', fontWeight: '900', color: '#EF4444', display: 'block', marginBottom: '4px' }}>
                                    {summary.user_stats?.last_debit?.amount != null
                                        ? formatCurrency(summary.user_stats.last_debit.amount, summary.user_stats?.currency || 'EGP')
                                        : `- ${formatCurrency(0, summary.user_stats?.currency || 'EGP')}`}
                                </span>
                                <span style={{ fontSize: '13px', fontWeight: '800', color: isLight ? '#0F172A' : '#FFFFFF', display: 'block', marginBottom: '2px' }}>
                                    {summary.user?.name || 'مستخدم'}
                                </span>
                                <span style={{ fontSize: '12px', color: isLight ? '#64748B' : '#94A3B8', display: 'block', marginBottom: '2px' }}>
                                    {summary.user_stats?.last_debit?.description || 'شراء خدمة'}
                                </span>
                                <span style={{ fontSize: '11px', color: isLight ? '#94A3B8' : '#64748B' }}>
                                    {formatDateArabic(summary.user_stats?.last_debit?.created_at)}
                                </span>
                            </div>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '12px',
                                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#EF4444',
                            }}>
                                <ArrowDownLeft size={20} />
                            </div>
                        </div>
                    </div>
                )}

                {/* ══════════════════════════════════════════════════════════════
                    ADMIN MODE SPECIFIC CARDS: Quick Add & Settings
                ══════════════════════════════════════════════════════════════ */}
                {!isUserView && (
                    <>
                        {/* Card: إضافة رصيد لحساب الأدمن */}
                        <div style={{
                            backgroundColor: isLight ? '#FFFFFF' : '#0B0F19',
                            border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '24px',
                            padding: '24px 20px',
                            marginBottom: '20px',
                            boxShadow: isLight ? '0 4px 15px rgba(0, 0, 0, 0.04)' : '0 10px 30px rgba(0, 0, 0, 0.5)',
                        }}>
                            <h2 style={{
                                fontSize: '18px',
                                fontWeight: '900',
                                color: isLight ? '#0F172A' : '#FFFFFF',
                                margin: '0 0 6px',
                            }}>
                                إدارة وتعديل رصيد محفظة الأدمن
                            </h2>
                            <p style={{
                                fontSize: '12.5px',
                                color: isLight ? '#64748B' : '#94A3B8',
                                margin: '0 0 16px',
                            }}>
                                يمكنك إضافة رصيد، خصم رصيد، أو تعيين رصيدك مباشرة بعملة {selectedCurrency}.
                            </p>

                            <form onSubmit={handleQuickAddBalance}>
                                {/* Action Selector Tabs */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', marginBottom: '12px' }}>
                                    {[
                                        { id: 'credit', label: '+ إضافة رصيد', color: '#10B981' },
                                        { id: 'debit', label: '- خصم رصيد', color: '#EF4444' },
                                        { id: 'set', label: '= تعيين الرصيد', color: '#38BDF8' },
                                    ].map(tab => {
                                        const sel = quickAction === tab.id;
                                        return (
                                            <button
                                                type="button"
                                                key={tab.id}
                                                onClick={() => setQuickAction(tab.id)}
                                                style={{
                                                    padding: '8px 4px',
                                                    borderRadius: '10px',
                                                    backgroundColor: sel ? `${tab.color}25` : isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
                                                    border: sel ? `2px solid ${tab.color}` : isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.1)',
                                                    color: sel ? tab.color : isLight ? '#64748B' : '#94A3B8',
                                                    fontSize: '11px',
                                                    fontWeight: '800',
                                                    cursor: 'pointer',
                                                    fontFamily: 'Cairo, sans-serif',
                                                }}
                                            >
                                                {tab.label}
                                            </button>
                                        );
                                    })}
                                </div>

                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    backgroundColor: isLight ? '#F1F5F9' : '#0F172A',
                                    border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(56, 189, 248, 0.3)',
                                    borderRadius: '14px',
                                    padding: '6px 14px',
                                    marginBottom: '10px',
                                }}>
                                    <span style={{
                                        fontSize: '13px',
                                        fontWeight: '800',
                                        color: isLight ? '#64748B' : '#38BDF8',
                                        marginLeft: '10px',
                                    }}>
                                        {selectedCurrency}
                                    </span>
                                    <input
                                        type="number"
                                        step="any"
                                        required
                                        value={quickAmount}
                                        onChange={(e) => setQuickAmount(e.target.value)}
                                        placeholder={quickAction === 'set' ? 'أدخل الرصيد الجديد مباشرة' : 'أدخل المبلغ'}
                                        style={{
                                            flex: 1,
                                            background: 'transparent',
                                            border: 'none',
                                            color: isLight ? '#0F172A' : '#FFFFFF',
                                            fontSize: '15px',
                                            fontWeight: '700',
                                            outline: 'none',
                                            fontFamily: 'Cairo, sans-serif',
                                        }}
                                    />
                                </div>

                                <input
                                    type="text"
                                    value={quickDesc}
                                    onChange={(e) => setQuickDesc(e.target.value)}
                                    placeholder="ملاحظات / سبب العملية (اختياري)..."
                                    style={{
                                        width: '100%',
                                        backgroundColor: isLight ? '#F1F5F9' : '#0F172A',
                                        border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.1)',
                                        borderRadius: '12px',
                                        padding: '10px 14px',
                                        color: isLight ? '#0F172A' : '#FFFFFF',
                                        fontSize: '12px',
                                        outline: 'none',
                                        marginBottom: '14px',
                                        fontFamily: 'Cairo, sans-serif',
                                    }}
                                />

                                <button
                                    type="submit"
                                    disabled={addingBalance}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        borderRadius: '14px',
                                        background: quickAction === 'credit'
                                            ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                                            : quickAction === 'debit'
                                            ? 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)'
                                            : 'linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)',
                                        color: '#FFFFFF',
                                        border: 'none',
                                        fontSize: '14px',
                                        fontWeight: '900',
                                        cursor: addingBalance ? 'not-allowed' : 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.25)',
                                        fontFamily: 'Cairo, sans-serif',
                                    }}
                                >
                                    <PlusCircle size={16} />
                                    <span>
                                        {addingBalance
                                            ? 'جاري التنفيذ...'
                                            : quickAction === 'credit'
                                            ? 'إضافة الرصيد إلى المحفظة'
                                            : quickAction === 'debit'
                                            ? 'خصم الرصيد من المحفظة'
                                            : 'تأكيد تعيين الرصيد'}
                                    </span>
                                </button>
                            </form>
                        </div>

                        {/* Card: إعدادات حساب الأدمن */}
                        <div style={{
                            backgroundColor: isLight ? '#FFFFFF' : '#0B0F19',
                            border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '24px',
                            padding: '24px 20px',
                            marginBottom: '20px',
                            boxShadow: isLight ? '0 4px 15px rgba(0, 0, 0, 0.04)' : '0 10px 30px rgba(0, 0, 0, 0.5)',
                        }}>
                            <h2 style={{
                                fontSize: '18px',
                                fontWeight: '900',
                                color: isLight ? '#0F172A' : '#FFFFFF',
                                margin: '0 0 6px',
                            }}>
                                إعدادات حساب الأدمن
                            </h2>
                            <p style={{
                                fontSize: '12.5px',
                                color: isLight ? '#64748B' : '#94A3B8',
                                margin: '0 0 16px',
                            }}>
                                يمكنك تغيير العملة والمجموعة الحالية مباشرة من هنا بدون الخروج من صفحة المحفظة.
                            </p>

                            <form onSubmit={handleSaveSettings}>
                                {/* العملة */}
                                <div style={{ marginBottom: '14px' }}>
                                    <label style={{ fontSize: '12.5px', color: isLight ? '#64748B' : '#94A3B8', display: 'block', marginBottom: '6px', fontWeight: '700' }}>
                                        العملة
                                    </label>
                                    <select
                                        value={selectedCurrency}
                                        onChange={(e) => setSelectedCurrency(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '12px 14px',
                                            borderRadius: '14px',
                                            backgroundColor: isLight ? '#F1F5F9' : '#0F172A',
                                            border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(56, 189, 248, 0.3)',
                                            color: isLight ? '#0F172A' : '#FFFFFF',
                                            fontSize: '14px',
                                            fontWeight: '700',
                                            outline: 'none',
                                            fontFamily: 'Cairo, sans-serif',
                                        }}
                                    >
                                        <option value="EGP">EGP - جنيه مصري</option>
                                        <option value="USD">USD - دولار أمريكي</option>
                                        <option value="SAR">SAR - ريال سعودي</option>
                                        <option value="AED">AED - درهم إماراتي</option>
                                        <option value="TRY">TRY - ليرة تركية</option>
                                    </select>
                                </div>

                                {/* المجموعة */}
                                <div style={{ marginBottom: '18px' }}>
                                    <label style={{ fontSize: '12.5px', color: isLight ? '#64748B' : '#94A3B8', display: 'block', marginBottom: '6px', fontWeight: '700' }}>
                                        المجموعة
                                    </label>
                                    <select
                                        value={selectedGroup}
                                        onChange={(e) => setSelectedGroup(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '12px 14px',
                                            borderRadius: '14px',
                                            backgroundColor: isLight ? '#F1F5F9' : '#0F172A',
                                            border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(56, 189, 248, 0.3)',
                                            color: isLight ? '#0F172A' : '#FFFFFF',
                                            fontSize: '14px',
                                            fontWeight: '700',
                                            outline: 'none',
                                            fontFamily: 'Cairo, sans-serif',
                                        }}
                                    >
                                        {selectedGroup && !customerGroups.some((group) => group.name === selectedGroup) && (
                                            <option value={selectedGroup}>{selectedGroup} (مجموعة قديمة)</option>
                                        )}
                                        {customerGroups.map((group) => (
                                            <option key={group.id} value={group.name}>
                                                {group.name} ({Number(group.discount_percentage || 0)}%)
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    disabled={savingSettings}
                                    style={{
                                        width: '100%',
                                        padding: '14px',
                                        borderRadius: '16px',
                                        background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                                        color: '#FFFFFF',
                                        border: 'none',
                                        fontSize: '15px',
                                        fontWeight: '900',
                                        cursor: savingSettings ? 'not-allowed' : 'pointer',
                                        boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)',
                                        fontFamily: 'Cairo, sans-serif',
                                    }}
                                >
                                    {savingSettings ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
                                </button>
                            </form>
                        </div>
                    </>
                )}

                {/* ══════════════════════════════════════════════════════════════
                    SECTION: العمليات / آخر الحركات (Matching Image 2)
                ══════════════════════════════════════════════════════════════ */}
                <div style={{
                    backgroundColor: isLight ? '#FFFFFF' : '#0B0F19',
                    border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '24px',
                    padding: '24px 20px',
                    boxShadow: isLight ? '0 4px 15px rgba(0, 0, 0, 0.04)' : '0 10px 30px rgba(0, 0, 0, 0.5)',
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '6px',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <h2 style={{
                                fontSize: '18px',
                                fontWeight: '900',
                                color: isLight ? '#0F172A' : '#FFFFFF',
                                margin: 0,
                            }}>
                                {isUserView ? 'آخر الحركات' : 'العمليات'}
                            </h2>
                            <div style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(56, 189, 248, 0.15)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#38BDF8',
                            }}>
                                <History size={16} />
                            </div>
                        </div>

                        <span style={{
                            padding: '4px 12px',
                            borderRadius: '16px',
                            backgroundColor: 'rgba(56, 189, 248, 0.15)',
                            border: '1px solid rgba(56, 189, 248, 0.3)',
                            color: '#38BDF8',
                            fontSize: '12px',
                            fontWeight: '800',
                        }}>
                            {transactions.total || 0} عملية
                        </span>
                    </div>

                    <p style={{
                        fontSize: '12.5px',
                        color: isLight ? '#64748B' : '#94A3B8',
                        margin: '0 0 16px',
                    }}>
                        {isUserView ? 'عرض مختصر لأحدث العمليات' : 'سجل تفصيلي لحركات الإيداع والخصم'}
                    </p>

                    {/* Transaction Items List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {loading && (!Array.isArray(transactions?.data) || transactions.data.length === 0) ? (
                            <div style={{ padding: '40px 0', textAlign: 'center' }}>
                                <RefreshCw className="animate-spin" size={26} color="#D4A537" style={{ margin: '0 auto 8px' }} />
                                <span style={{ fontSize: '13px', color: '#94A3B8' }}>جاري تحميل العمليات...</span>
                            </div>
                        ) : (!Array.isArray(transactions?.data) || transactions.data.length === 0) ? (
                            <div style={{ padding: '40px 0', textAlign: 'center', color: '#94A3B8', fontSize: '13px' }}>
                                لا توجد حركات مسجلة داخل الفترة المحددة.
                            </div>
                        ) : (
                            transactions.data.map((tx) => {
                                const isDebit = Number(tx.amount) < 0 || tx.type === 'manual_debit';
                                const userObj = tx.wallet?.user || {};
                                const txAmount = Number(tx.amount);
                                const absAmount = Math.abs(txAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

                                return (
                                    <div
                                        key={tx.id}
                                        style={{
                                            backgroundColor: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)',
                                            border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(56, 189, 248, 0.15)',
                                            borderRadius: '18px',
                                            padding: '14px 16px',
                                        }}
                                    >
                                        {/* Top Line: User Name + Badge + Arrow Icon */}
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            marginBottom: '8px',
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <span style={{ fontSize: '14px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                                    {userObj.name || summary.user?.name || 'مستخدم'}
                                                </span>
                                                <span style={{
                                                    fontSize: '11px',
                                                    fontWeight: '800',
                                                    padding: '2px 8px',
                                                    borderRadius: '6px',
                                                    backgroundColor: isDebit ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                                                    color: isDebit ? '#EF4444' : '#10B981',
                                                    border: `1px solid ${isDebit ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`,
                                                }}>
                                                    {isDebit ? 'خصم' : 'إضافة'}
                                                </span>
                                            </div>

                                            <div style={{
                                                width: '28px',
                                                height: '28px',
                                                borderRadius: '50%',
                                                backgroundColor: isDebit ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: isDebit ? '#EF4444' : '#10B981',
                                            }}>
                                                {isDebit ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                                            </div>
                                        </div>

                                        {/* Middle Line: Description / Product + Date */}
                                        <div style={{ marginBottom: '10px' }}>
                                            <span style={{ fontSize: '13px', fontWeight: '700', color: isLight ? '#334155' : '#CBD5E1', display: 'block', marginBottom: '2px' }}>
                                                {tx.description || (isDebit ? 'شراء منتج' : 'إيداع بالمحفظة')}
                                            </span>
                                            <span style={{ fontSize: '11px', color: isLight ? '#94A3B8' : '#64748B' }}>
                                                {formatDateArabic(tx.created_at)}
                                            </span>
                                        </div>

                                        {/* Bottom Line: Amount + عرض التفاصيل Button (Matching Image 2) */}
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            paddingTop: '8px',
                                            borderTop: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.05)',
                                        }}>
                                            <button
                                                onClick={() => setSelectedTx(tx)}
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    padding: '5px 14px',
                                                    borderRadius: '10px',
                                                    backgroundColor: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.05)',
                                                    border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(56, 189, 248, 0.3)',
                                                    color: isLight ? '#0F172A' : '#38BDF8',
                                                    fontSize: '12px',
                                                    fontWeight: '800',
                                                    cursor: 'pointer',
                                                    fontFamily: 'Cairo, sans-serif',
                                                }}
                                            >
                                                <Eye size={14} />
                                                <span>عرض التفاصيل</span>
                                            </button>

                                            <span style={{
                                                fontSize: '15px',
                                                fontWeight: '900',
                                                color: isDebit ? '#EF4444' : '#10B981',
                                                direction: 'ltr',
                                            }}>
                                                {isDebit ? '- ' : '+ '}{formatCurrency(absAmount, tx.currency || tx.wallet?.currency || (isUserView ? summary.user_stats?.currency : summary.admin_wallet?.currency) || selectedCurrency || 'EGP')}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* Pagination */}
                    {transactions.total > 20 && (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingTop: '16px',
                            marginTop: '16px',
                            borderTop: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                        }}>
                            <span style={{ fontSize: '12px', color: isLight ? '#64748B' : '#94A3B8' }}>
                                صفحة {transactions.current_page || 1} من {transactions.last_page || 1}
                            </span>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    disabled={transactions.current_page <= 1}
                                    style={{
                                        padding: '5px 12px',
                                        borderRadius: '8px',
                                        backgroundColor: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        color: isLight ? '#0F172A' : '#FFFFFF',
                                        fontSize: '12px',
                                        cursor: transactions.current_page <= 1 ? 'not-allowed' : 'pointer',
                                        opacity: transactions.current_page <= 1 ? 0.4 : 1,
                                    }}
                                >
                                    السابق
                                </button>
                                <button
                                    onClick={() => setPage((p) => Math.min(transactions.last_page, p + 1))}
                                    disabled={transactions.current_page >= transactions.last_page}
                                    style={{
                                        padding: '5px 12px',
                                        borderRadius: '8px',
                                        backgroundColor: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        color: isLight ? '#0F172A' : '#FFFFFF',
                                        fontSize: '12px',
                                        cursor: transactions.current_page >= transactions.last_page ? 'not-allowed' : 'pointer',
                                        opacity: transactions.current_page >= transactions.last_page ? 0.4 : 1,
                                    }}
                                >
                                    التالي
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ══════════════════════════════════════════════════════════════
                TRANSACTION DETAILS MODAL (نافذة تفاصيل الحركة)
            ══════════════════════════════════════════════════════════════ */}
            {selectedTx && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 1000,
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '16px',
                    direction: 'rtl',
                }}>
                    <div style={{
                        backgroundColor: isLight ? '#FFFFFF' : '#0B0F19',
                        border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(56, 189, 248, 0.3)',
                        borderRadius: '24px',
                        width: '100%',
                        maxWidth: '460px',
                        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)',
                        padding: '24px 20px',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                تفاصيل العملية #{selectedTx.id}
                            </h3>
                            <button
                                onClick={() => setSelectedTx(null)}
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '10px',
                                    backgroundColor: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.08)',
                                    border: 'none',
                                    color: isLight ? '#64748B' : '#FFFFFF',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                }}
                            >
                                <X size={17} />
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderRadius: '12px', backgroundColor: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)' }}>
                                <span style={{ color: isLight ? '#64748B' : '#94A3B8' }}>المستخدم:</span>
                                <strong style={{ color: isLight ? '#0F172A' : '#FFFFFF' }}>{selectedTx.wallet?.user?.name || summary.user?.name || '—'}</strong>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderRadius: '12px', backgroundColor: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)' }}>
                                <span style={{ color: isLight ? '#64748B' : '#94A3B8' }}>النوع:</span>
                                <strong style={{ color: selectedTx.amount < 0 ? '#EF4444' : '#10B981' }}>{selectedTx.amount < 0 ? 'خصم من المحفظة' : 'إيداع بالمحفظة'}</strong>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderRadius: '12px', backgroundColor: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)' }}>
                                <span style={{ color: isLight ? '#64748B' : '#94A3B8' }}>المبلغ:</span>
                                <strong style={{ color: selectedTx.amount < 0 ? '#EF4444' : '#10B981', direction: 'ltr' }}>{selectedTx.amount} {selectedTx.wallet?.currency || 'EGP'}</strong>
                            </div>

                            {selectedTx.balance_before !== undefined && (
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderRadius: '12px', backgroundColor: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)' }}>
                                    <span style={{ color: isLight ? '#64748B' : '#94A3B8' }}>الرصيد قبل:</span>
                                    <strong style={{ color: isLight ? '#0F172A' : '#FFFFFF', direction: 'ltr' }}>{selectedTx.balance_before}</strong>
                                </div>
                            )}

                            {selectedTx.balance_after !== undefined && (
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderRadius: '12px', backgroundColor: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)' }}>
                                    <span style={{ color: isLight ? '#64748B' : '#94A3B8' }}>الرصيد بعد:</span>
                                    <strong style={{ color: isLight ? '#0F172A' : '#FFFFFF', direction: 'ltr' }}>{selectedTx.balance_after}</strong>
                                </div>
                            )}

                            <div style={{ padding: '10px 14px', borderRadius: '12px', backgroundColor: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)' }}>
                                <span style={{ color: isLight ? '#64748B' : '#94A3B8', display: 'block', marginBottom: '4px' }}>البيان / الوصف:</span>
                                <span style={{ color: isLight ? '#0F172A' : '#FFFFFF', fontWeight: '700' }}>{selectedTx.description || '—'}</span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderRadius: '12px', backgroundColor: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)' }}>
                                <span style={{ color: isLight ? '#64748B' : '#94A3B8' }}>التاريخ والوقت:</span>
                                <strong style={{ color: isLight ? '#0F172A' : '#FFFFFF' }}>{formatDateArabic(selectedTx.created_at)}</strong>
                            </div>
                        </div>

                        <button
                            onClick={() => setSelectedTx(null)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '14px',
                                background: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)',
                                color: isLight ? '#0F172A' : '#FFFFFF',
                                border: 'none',
                                fontSize: '13px',
                                fontWeight: '900',
                                cursor: 'pointer',
                                marginTop: '16px',
                                fontFamily: 'Cairo, sans-serif',
                            }}
                        >
                            إغلاق
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
