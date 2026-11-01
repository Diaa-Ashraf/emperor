import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
    Wallet,
    Clock,
    Search,
    Filter,
    Plus,
    Minus,
    ArrowUpRight,
    ArrowDownLeft,
    CheckCircle2,
    Copy,
    Check,
    X,
    Calendar,
    RefreshCw,
    SlidersHorizontal,
    CreditCard
} from 'lucide-react';
import { adminApi } from '../../api/endpoints';
import { useToast } from '../../contexts/ToastContext';
import { useTheme } from '../../contexts/ThemeContext';
import AdminHeader from '../../components/admin/AdminHeader';

export default function AdminUserLedgerPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { theme } = useTheme();
    const isLight = theme === 'light';
    const { success, error: toastError } = useToast();

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [userData, setUserData] = useState(null);
    const [stats, setStats] = useState({
        current_balance: 0,
        current_balance_formatted: 'EGP 0.00',
        currency: 'EGP',
        operations_count: 0,
        total_credits: 0,
        total_credits_formatted: 'EGP 0.00',
        total_debits: 0,
        total_debits_formatted: 'EGP 0.00',
    });
    const [transactions, setTransactions] = useState([]);
    const [pagination, setPagination] = useState({ current_page: 1, last_page: 1, total: 0 });

    // Filter states
    const [search, setSearch] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [copiedHash, setCopiedHash] = useState(null);

    // Adjustment forms
    const [adjAmount, setAdjAmount] = useState('');
    const [adjSubmitting, setAdjSubmitting] = useState(false);
    const [setAmount, setSetAmount] = useState('');
    const [setSubmitting, setSetSubmitting] = useState(false);

    const fetchLedger = async () => {
        try {
            setRefreshing(true);
            const res = await adminApi.getUserLedger(id, {
                search: search.trim() || undefined,
                date_from: dateFrom || undefined,
                date_to: dateTo || undefined,
                page: pagination.current_page,
            });

            if (res && res.data) {
                const data = res.data.data || res.data;
                setUserData(data.user);
                setStats(data.stats || stats);
                const txPage = data.transactions || { data: [], current_page: 1, last_page: 1, total: 0 };
                setTransactions(txPage.data || []);
                setPagination({
                    current_page: txPage.current_page || 1,
                    last_page: txPage.last_page || 1,
                    total: txPage.total || 0,
                });
            }
        } catch (err) {
            toastError('فشل تحميل سجل حركة رصيد المستخدم');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchLedger();
    }, [id]);

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        fetchLedger();
    };

    // Quick Adjustment: Credit or Debit
    const handleAdjust = async (action) => {
        if (!userData) return;
        const val = parseFloat(adjAmount);
        if (!val || val <= 0) {
            toastError('يرجى إدخال مبلغ صحيح');
            return;
        }

        try {
            setAdjSubmitting(true);
            await adminApi.adjustUserBalance(userData.id, {
                amount: val,
                action: action, // 'credit' or 'debit'
                currency: stats.currency,
                description: action === 'credit'
                    ? 'إضافة رصيد لحساب المستخدم بواسطة الإدارة'
                    : 'خصم رصيد من حساب المستخدم بواسطة الإدارة',
            });
            success(action === 'credit' ? 'تمت إضافة الرصيد بنجاح' : 'تم خصم الرصيد بنجاح');
            setAdjAmount('');
            fetchLedger();
        } catch (err) {
            toastError(err.response?.data?.message || 'فشل تعديل الرصيد');
        } finally {
            setAdjSubmitting(false);
        }
    };

    // Set exact balance
    const handleSetBalance = async (e) => {
        e.preventDefault();
        if (!userData) return;
        const val = parseFloat(setAmount);
        if (isNaN(val) || val < 0) {
            toastError('يرجى إدخال رصيد مستهدف صحيح');
            return;
        }

        try {
            setSetSubmitting(true);
            await adminApi.setUserBalance(userData.id, {
                target_balance: val,
                currency: stats.currency,
                notes: `تعيين الرصيد إلى ${val} ${stats.currency} بواسطة الإدارة`,
            });
            success(`تم تعيين الرصيد بنجاح إلى ${val} ${stats.currency}`);
            setSetAmount('');
            fetchLedger();
        } catch (err) {
            toastError(err.response?.data?.message || 'فشل تعيين الرصيد');
        } finally {
            setSetSubmitting(false);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopiedHash(text);
        setTimeout(() => setCopiedHash(null), 2000);
    };

    const currentDateFormatted = new Date().toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: isLight ? '#F8FAFC' : '#040711',
            color: isLight ? '#0F172A' : '#F8FAFC',
            fontFamily: 'Cairo, sans-serif',
            direction: 'rtl',
            paddingBottom: '80px',
        }}>
            {/* Header with Back Button */}
            <AdminHeader
                title="سجل حركة المستخدم"
                subtitle={`حتى ${currentDateFormatted}`}
                badge="المحفظة"
                onRefresh={fetchLedger}
                refreshing={refreshing}
            />

            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 16px' }}>
                {/* Title & User Pill Card (Matching Screenshot 1) */}
                <div style={{
                    backgroundColor: isLight ? '#FFFFFF' : '#0B1222',
                    border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                    borderRadius: '24px',
                    padding: '24px 20px',
                    marginBottom: '20px',
                    boxShadow: isLight ? '0 4px 20px rgba(0,0,0,0.03)' : '0 10px 30px rgba(0,0,0,0.4)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '4px 12px',
                            borderRadius: '9999px',
                            fontSize: '12px',
                            fontWeight: '700',
                            backgroundColor: isLight ? '#EFF6FF' : 'rgba(56, 189, 248, 0.1)',
                            color: '#38BDF8',
                            border: '1px solid rgba(56, 189, 248, 0.25)',
                        }}>
                            <Wallet size={13} />
                            المحفظة
                        </span>
                    </div>

                    <h1 style={{
                        fontSize: '26px',
                        fontWeight: '900',
                        margin: '0 0 10px 0',
                        color: isLight ? '#0F172A' : '#FFFFFF',
                    }}>
                        سجل حركة المستخدم
                    </h1>

                    {/* Active User Pill with Remove Button */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '14px' }}>
                        {userData ? (
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '6px 14px',
                                borderRadius: '9999px',
                                backgroundColor: isLight ? '#F1F5F9' : '#0F172A',
                                border: '1px solid rgba(56, 189, 248, 0.4)',
                            }}>
                                <span style={{ color: '#38BDF8', fontWeight: '800', fontSize: '14px' }}>
                                    {userData.name}
                                </span>
                                <button
                                    onClick={() => navigate('/admin/users')}
                                    title="عرض كل المستخدمين"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        background: 'transparent',
                                        border: 'none',
                                        color: isLight ? '#64748B' : '#94A3B8',
                                        cursor: 'pointer',
                                        fontSize: '12px',
                                        padding: '0 4px',
                                    }}
                                >
                                    <X size={14} />
                                    <span>عرض كل المستخدمين</span>
                                </button>
                            </div>
                        ) : (
                            <span style={{ fontSize: '13px', color: '#94A3B8' }}>
                                عرض السجل لجميع المستخدمين
                            </span>
                        )}
                        <span style={{ fontSize: '13px', color: '#64748B' }}>
                            حتى {currentDateFormatted}
                        </span>
                    </div>

                    {/* Search & Date Filter Row matching Screenshot 1 */}
                    <form onSubmit={handleFilterSubmit} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        flexWrap: 'wrap',
                    }}>
                        <button
                            type="submit"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '11px 22px',
                                borderRadius: '14px',
                                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                                color: '#FFFFFF',
                                fontWeight: '800',
                                fontSize: '14px',
                                border: 'none',
                                cursor: 'pointer',
                                boxShadow: '0 4px 15px rgba(217, 119, 6, 0.35)',
                            }}
                        >
                            <Filter size={16} />
                            فلترة
                        </button>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            backgroundColor: isLight ? '#F8FAFC' : '#040711',
                            border: isLight ? '1px solid #CBD5E1' : '1px solid #1E293B',
                            borderRadius: '14px',
                            padding: '10px 14px',
                            flex: 1,
                            minWidth: '180px',
                        }}>
                            <Calendar size={16} color="#38BDF8" />
                            <input
                                type="date"
                                value={dateFrom}
                                onChange={(e) => setDateFrom(e.target.value)}
                                style={{
                                    border: 'none',
                                    outline: 'none',
                                    backgroundColor: 'transparent',
                                    color: isLight ? '#0F172A' : '#FFFFFF',
                                    fontSize: '13px',
                                    width: '100%',
                                }}
                            />
                        </div>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            backgroundColor: isLight ? '#F8FAFC' : '#040711',
                            border: isLight ? '1px solid #CBD5E1' : '1px solid #1E293B',
                            borderRadius: '14px',
                            padding: '10px 14px',
                            flex: 1.5,
                            minWidth: '220px',
                        }}>
                            <Search size={16} color="#94A3B8" />
                            <input
                                type="text"
                                placeholder="بحث برقم العملية أو الوصف..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{
                                    border: 'none',
                                    outline: 'none',
                                    backgroundColor: 'transparent',
                                    color: isLight ? '#0F172A' : '#FFFFFF',
                                    fontSize: '13px',
                                    width: '100%',
                                }}
                            />
                        </div>
                    </form>

                    {/* Metric Cards matching Screenshot 1 */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: '12px',
                        marginTop: '20px',
                    }}>
                        {/* 1. Current Balance */}
                        <div style={{
                            backgroundColor: isLight ? '#F8FAFC' : '#0F172A',
                            border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                            borderRadius: '18px',
                            padding: '18px 20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
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
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ fontSize: '12px', color: isLight ? '#64748B' : '#94A3B8', fontWeight: '700', marginBottom: '2px' }}>
                                    الرصيد الحالي
                                </div>
                                <div style={{ fontSize: '26px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF', lineHeight: 1 }}>
                                    {stats.current_balance_formatted}
                                </div>
                                <div style={{ fontSize: '11px', color: '#38BDF8', fontWeight: '700', marginTop: '4px' }}>
                                    {stats.currency}
                                </div>
                            </div>
                        </div>

                        {/* 2. Operations Count */}
                        <div style={{
                            backgroundColor: isLight ? '#F8FAFC' : '#0F172A',
                            border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                            borderRadius: '18px',
                            padding: '18px 20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
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
                                <Clock size={22} />
                            </div>
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ fontSize: '12px', color: isLight ? '#64748B' : '#94A3B8', fontWeight: '700', marginBottom: '2px' }}>
                                    حركات المحفظة
                                </div>
                                <div style={{ fontSize: '26px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF', lineHeight: 1 }}>
                                    {stats.operations_count}
                                </div>
                                <div style={{ fontSize: '11px', color: isLight ? '#64748B' : '#94A3B8', marginTop: '4px' }}>
                                    السجل المباشر من مسار المحفظة
                                </div>
                            </div>
                        </div>

                        {/* 3. Total Credits */}
                        <div style={{
                            backgroundColor: isLight ? '#F8FAFC' : '#0F172A',
                            border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                            borderRadius: '18px',
                            padding: '18px 20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <div style={{
                                width: '44px',
                                height: '44px',
                                borderRadius: '14px',
                                backgroundColor: 'rgba(245, 158, 11, 0.12)',
                                border: '1px solid rgba(245, 158, 11, 0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#F59E0B',
                            }}>
                                <Plus size={22} />
                            </div>
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ fontSize: '12px', color: isLight ? '#64748B' : '#94A3B8', fontWeight: '700', marginBottom: '2px' }}>
                                    إجمالي الإضافات
                                </div>
                                <div style={{ fontSize: '26px', fontWeight: '900', color: '#10B981', lineHeight: 1 }}>
                                    {stats.total_credits_formatted}
                                </div>
                                <div style={{ fontSize: '11px', color: isLight ? '#64748B' : '#94A3B8', marginTop: '4px' }}>
                                    الخصومات: {stats.total_debits_formatted}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Balance Adjustment Cards (Matching Screenshot 2) */}
                {userData && (
                    <div style={{
                        marginBottom: '24px',
                    }}>
                        {/* 1. Increase / Decrease (زيادة / خصم) */}
                        <div style={{
                            backgroundColor: isLight ? '#FFFFFF' : '#0B1222',
                            border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                            borderRadius: '24px',
                            padding: '20px',
                            boxShadow: isLight ? '0 4px 20px rgba(0,0,0,0.03)' : '0 10px 30px rgba(0,0,0,0.4)',
                        }}>
                            <div style={{ fontSize: '14px', fontWeight: '800', color: isLight ? '#0F172A' : '#FFFFFF', marginBottom: '12px' }}>
                                زيادة / خصم
                            </div>

                            <div style={{ marginBottom: '14px' }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    backgroundColor: isLight ? '#F8FAFC' : '#040711',
                                    border: isLight ? '1px solid #CBD5E1' : '1px solid #1E293B',
                                    borderRadius: '14px',
                                    padding: '10px 14px',
                                }}>
                                    <input
                                        type="number"
                                        min="0.01"
                                        step="0.01"
                                        placeholder="أدخل المبلغ"
                                        value={adjAmount}
                                        onChange={(e) => setAdjAmount(e.target.value)}
                                        style={{
                                            border: 'none',
                                            outline: 'none',
                                            backgroundColor: 'transparent',
                                            color: isLight ? '#0F172A' : '#FFFFFF',
                                            fontSize: '14px',
                                            width: '100%',
                                        }}
                                    />
                                    <span style={{ fontSize: '12px', fontWeight: '800', color: '#94A3B8' }}>
                                        {stats.currency}
                                    </span>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                <button
                                    onClick={() => handleAdjust('credit')}
                                    disabled={adjSubmitting}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '6px',
                                        padding: '11px',
                                        borderRadius: '14px',
                                        background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                                        color: '#FFFFFF',
                                        fontWeight: '800',
                                        fontSize: '14px',
                                        border: 'none',
                                        cursor: adjSubmitting ? 'not-allowed' : 'pointer',
                                    }}
                                >
                                    <Plus size={16} />
                                    زيادة
                                </button>

                                <button
                                    onClick={() => handleAdjust('debit')}
                                    disabled={adjSubmitting}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '6px',
                                        padding: '11px',
                                        borderRadius: '14px',
                                        backgroundColor: 'rgba(239, 68, 68, 0.15)',
                                        border: '1px solid rgba(239, 68, 68, 0.4)',
                                        color: '#EF4444',
                                        fontWeight: '800',
                                        fontSize: '14px',
                                        cursor: adjSubmitting ? 'not-allowed' : 'pointer',
                                    }}
                                >
                                    <Minus size={16} />
                                    خصم
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Operations Section Header (Matching Screenshot 2) */}
                <div style={{
                    backgroundColor: isLight ? '#FFFFFF' : '#0B1222',
                    border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                    borderRadius: '24px',
                    padding: '24px 20px',
                    boxShadow: isLight ? '0 4px 20px rgba(0,0,0,0.03)' : '0 10px 30px rgba(0,0,0,0.4)',
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '12px',
                        marginBottom: '16px',
                        borderBottom: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                        paddingBottom: '16px',
                    }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <h2 style={{ fontSize: '20px', fontWeight: '900', margin: 0, color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                    العمليات
                                </h2>
                                <span style={{
                                    display: 'inline-block',
                                    padding: '3px 10px',
                                    borderRadius: '9999px',
                                    fontSize: '12px',
                                    fontWeight: '800',
                                    backgroundColor: 'rgba(56, 189, 248, 0.12)',
                                    color: '#38BDF8',
                                    border: '1px solid rgba(56, 189, 248, 0.3)',
                                }}>
                                    {pagination.total || transactions.length} عملية
                                </span>
                            </div>
                            <p style={{ margin: '4px 0 0', fontSize: '13px', color: isLight ? '#64748B' : '#94A3B8' }}>
                                سجل العمليات وحركة الرصيد - كل معاملات المستخدم المسجلة
                            </p>
                        </div>
                    </div>

                    {/* Transactions Cards List */}
                    {loading ? (
                        <div style={{ padding: '60px 20px', textAlign: 'center', color: '#94A3B8' }}>
                            <RefreshCw size={32} className="animate-spin" style={{ margin: '0 auto 12px auto', color: '#D4A537' }} />
                            <div>جاري تحميل سجل العمليات...</div>
                        </div>
                    ) : transactions.length === 0 ? (
                        <div style={{ padding: '60px 20px', textAlign: 'center', color: '#94A3B8' }}>
                            <Clock size={40} style={{ margin: '0 auto 12px auto', opacity: 0.5 }} />
                            <div style={{ fontWeight: '700' }}>لا توجد أي معاملات مسجلة لهذا الحساب</div>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            {transactions.map((tx) => (
                                <div
                                    key={tx.id}
                                    style={{
                                        backgroundColor: isLight ? '#F8FAFC' : '#0F172A',
                                        border: isLight ? '1px solid #CBD5E1' : '1px solid #1E293B',
                                        borderRadius: '20px',
                                        padding: '18px 20px',
                                        transition: 'all 0.15s ease',
                                    }}
                                >
                                    {/* Top Line: Status pill & Title & Arrow */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        flexWrap: 'wrap',
                                        gap: '8px',
                                        marginBottom: '14px',
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '4px',
                                                padding: '3px 10px',
                                                borderRadius: '8px',
                                                fontSize: '11px',
                                                fontWeight: '800',
                                                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                                                border: '1px solid rgba(16, 185, 129, 0.4)',
                                                color: '#10B981',
                                            }}>
                                                <CheckCircle2 size={12} />
                                                {tx.status}
                                            </span>

                                            <div>
                                                <div style={{ fontSize: '16px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                                    {tx.title}
                                                </div>
                                                <div style={{ fontSize: '12px', color: isLight ? '#64748B' : '#94A3B8' }}>
                                                    {tx.subtitle}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Outgoing or Incoming Indicator */}
                                        <div style={{
                                            width: '36px',
                                            height: '36px',
                                            borderRadius: '12px',
                                            backgroundColor: tx.is_debit ? 'rgba(239, 68, 68, 0.12)' : 'rgba(16, 185, 129, 0.12)',
                                            color: tx.is_debit ? '#EF4444' : '#10B981',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            {tx.is_debit ? <ArrowUpRight size={18} /> : <ArrowDownLeft size={18} />}
                                        </div>
                                    </div>

                                    {/* Amount Box matching Screenshot 2 */}
                                    <div style={{
                                        backgroundColor: isLight ? '#EFF6FF' : '#070C18',
                                        border: isLight ? '1px solid #BFDBFE' : '1px solid #1E2E4A',
                                        borderRadius: '14px',
                                        padding: '12px 16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        marginBottom: '12px',
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <CreditCard size={16} color="#38BDF8" />
                                            <span style={{ fontSize: '13px', fontWeight: '800', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                                {tx.source}
                                            </span>
                                        </div>

                                        <div style={{ textAlign: 'left' }}>
                                            <div style={{ fontSize: '11px', color: isLight ? '#64748B' : '#94A3B8', fontWeight: '700' }}>
                                                {tx.is_debit ? 'المبلغ المخصوم' : 'المبلغ المضاف'}
                                            </div>
                                            <div style={{
                                                fontSize: '18px',
                                                fontWeight: '900',
                                                color: tx.is_debit ? '#EF4444' : '#10B981',
                                                direction: 'ltr',
                                            }}>
                                                {tx.amount_formatted}
                                            </div>
                                        </div>
                                    </div>

                                    {/* 3 Columns: Before, Change, After (Matching Screenshot 2) */}
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr 1fr',
                                        backgroundColor: isLight ? '#FFFFFF' : '#040711',
                                        border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                                        borderRadius: '14px',
                                        padding: '12px',
                                        textAlign: 'center',
                                        marginBottom: '12px',
                                    }}>
                                        <div>
                                            <div style={{ fontSize: '11px', color: isLight ? '#64748B' : '#94A3B8', fontWeight: '700', marginBottom: '2px' }}>
                                                قبل العملية
                                            </div>
                                            <div style={{ fontSize: '14px', fontWeight: '800', color: isLight ? '#0F172A' : '#FFFFFF', direction: 'ltr' }}>
                                                {tx.balance_before_formatted}
                                            </div>
                                        </div>

                                        <div style={{
                                            borderRight: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                                            borderLeft: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                                        }}>
                                            <div style={{ fontSize: '11px', color: isLight ? '#64748B' : '#94A3B8', fontWeight: '700', marginBottom: '2px' }}>
                                                التغيير
                                            </div>
                                            <div style={{
                                                fontSize: '14px',
                                                fontWeight: '900',
                                                color: tx.is_debit ? '#EF4444' : '#10B981',
                                                direction: 'ltr',
                                            }}>
                                                {tx.change}
                                            </div>
                                        </div>

                                        <div>
                                            <div style={{ fontSize: '11px', color: isLight ? '#64748B' : '#94A3B8', fontWeight: '700', marginBottom: '2px' }}>
                                                بعد العملية
                                            </div>
                                            <div style={{ fontSize: '14px', fontWeight: '800', color: '#38BDF8', direction: 'ltr' }}>
                                                {tx.balance_after_formatted}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer: Hash ID & Date (Matching Screenshot 2) */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        flexWrap: 'wrap',
                                        gap: '8px',
                                        fontSize: '12px',
                                        color: '#64748B',
                                    }}>
                                        <div
                                            onClick={() => copyToClipboard(tx.hash)}
                                            title="اضغط لنسخ المعرف"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                cursor: 'pointer',
                                                fontFamily: 'monospace',
                                                color: isLight ? '#475569' : '#94A3B8',
                                            }}
                                        >
                                            {copiedHash === tx.hash ? <Check size={13} color="#10B981" /> : <Copy size={13} />}
                                            <span># {tx.hash}</span>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <Calendar size={13} />
                                            <span>{tx.date_formatted}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

