import React, { useState, useEffect } from 'react';
import {
    CreditCard,
    CheckCircle,
    XCircle,
    Eye,
    Clock,
    Search,
    RefreshCw,
    X,
    Filter,
    AlertCircle,
    ArrowUp,
    Copy
} from 'lucide-react';
import { adminApi } from '../../api/endpoints';
import { useToast } from '../../contexts/ToastContext';
import { useTheme } from '../../contexts/ThemeContext';
import { formatCurrency } from '../../utils/currencyHelper';
import AdminHeader from '../../components/admin/AdminHeader';

export default function AdminDepositsPage() {
    const { theme } = useTheme();
    const isLight = theme === 'light';
    const { success, error: toastError } = useToast();

    const [loading, setLoading] = useState(true);
    const [deposits, setDeposits] = useState({ data: [], current_page: 1, last_page: 1 });
    const [counts, setCounts] = useState({ all: 0, pending: 0, approved: 0, rejected: 0 });
    const [statusFilter, setStatusFilter] = useState('pending');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    // Receipt preview modal
    const [previewImage, setPreviewImage] = useState(null);

    // Reject reason modal
    const [rejectingDeposit, setRejectingDeposit] = useState(null);
    const [rejectReason, setRejectReason] = useState('');
    const [submittingAction, setSubmittingAction] = useState(false);

    const fetchDeposits = async () => {
        try {
            setLoading(true);
            const res = await adminApi.getDeposits({
                page,
                status: statusFilter === 'all' ? undefined : statusFilter,
                search: search.trim() || undefined,
            });
            if (res && res.data) {
                const responseData = res.data.data || res.data;
                const depList = responseData.deposits || responseData;
                const rawList = Array.isArray(depList)
                    ? depList
                    : (Array.isArray(depList?.data) ? depList.data : []);

                setDeposits({
                    data: rawList,
                    current_page: depList?.current_page || 1,
                    last_page: depList?.last_page || 1,
                    total: depList?.total ?? rawList.length,
                });
                if (responseData.counts) {
                    setCounts(responseData.counts);
                }
            }
        } catch (err) {
            toastError('فشل تحميل طلبات الإيداع');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDeposits();
    }, [page, statusFilter]);

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        fetchDeposits();
    };

    const handleApprove = async (deposit) => {
        if (!window.confirm(`هل أنت متأكد من قبول طلب الإيداع وشحن ${deposit.final_amount} ${deposit.currency} لمحفظة العميل؟`)) {
            return;
        }

        try {
            setSubmittingAction(true);
            await adminApi.approveDeposit(deposit.id);
            success(`تم قبول طلب الإيداع (#${deposit.id}) وشحن المحفظة بنجاح!`);
            fetchDeposits();
        } catch (err) {
            toastError(err.response?.data?.message || 'فشل اعتماد الإيداع');
        } finally {
            setSubmittingAction(false);
        }
    };

    const handleRejectSubmit = async (e) => {
        e.preventDefault();
        if (!rejectReason.trim()) {
            toastError('يرجى إدخال سبب الرفض');
            return;
        }

        try {
            setSubmittingAction(true);
            await adminApi.rejectDeposit(rejectingDeposit.id, { reason: rejectReason });
            success(`تم رفض طلب الإيداع (#${rejectingDeposit.id}) بنجاح`);
            setRejectingDeposit(null);
            setRejectReason('');
            fetchDeposits();
        } catch (err) {
            toastError(err.response?.data?.message || 'فشل رفض الطلب');
        } finally {
            setSubmittingAction(false);
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'approved':
                return { label: 'مقبول ومشحون', bg: 'rgba(16, 185, 129, 0.15)', color: '#10B981' };
            case 'pending':
                return { label: 'قيد المراجعة', bg: 'rgba(245, 208, 97, 0.15)', color: '#F5D061' };
            case 'rejected':
                return { label: 'مرفوض', bg: 'rgba(239, 68, 68, 0.15)', color: '#EF4444' };
            default:
                return { label: status, bg: 'rgba(148, 163, 184, 0.15)', color: '#94A3B8' };
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: isLight ? '#F8FAFC' : '#07090E',
            color: isLight ? '#0F172A' : '#FFFFFF',
            fontFamily: 'Cairo, sans-serif',
            direction: 'rtl',
            paddingBottom: '80px',
        }}>
            <AdminHeader
                title="طلبات الشحن اليدوي"
                badge="إيداعات ومحافظ"
                onRefresh={fetchDeposits}
                refreshing={loading}
            />

            <div style={{
                maxWidth: '1280px',
                margin: '0 auto',
                padding: '0 16px',
            }}>
                {/* Header */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '12px',
                    marginBottom: '20px',
                }}>
                <div>
                    <h1 style={{
                        fontSize: '22px',
                        fontWeight: '900',
                        margin: '0 0 6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        color: isLight ? '#9A7210' : '#F5D061',
                    }}>
                        <CreditCard size={24} />
                        <span>طلبات الشحن اليدوي والإيداعات</span>
                    </h1>
                    <p style={{ margin: 0, fontSize: '13px', color: isLight ? '#64748B' : '#94A3B8' }}>
                        مراجعة إيصالات التحويل البنكي والمحافظ الإلكترونية واعتماد شحن المحافظ
                    </p>
                </div>

                <button
                    onClick={fetchDeposits}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '9px 16px',
                        borderRadius: '12px',
                        background: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.05)',
                        border: isLight ? '1px solid rgba(212, 165, 55, 0.5)' : '1px solid rgba(245, 208, 97, 0.3)',
                        color: isLight ? '#9A7210' : '#F5D061',
                        fontSize: '13px',
                        fontWeight: '800',
                        cursor: 'pointer',
                    }}
                >
                    <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
                    <span>تحديث الطلبات</span>
                </button>
            </div>

            {/* Filter Tabs */}
            <div style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '20px',
                overflowX: 'auto',
                paddingBottom: '4px',
            }}>
                {[
                    { key: 'pending', label: 'قيد الانتظار', count: counts.pending, color: '#F5D061' },
                    { key: 'approved', label: 'المقبولة', count: counts.approved, color: '#10B981' },
                    { key: 'rejected', label: 'المرفوضة', count: counts.rejected, color: '#EF4444' },
                    { key: 'all', label: 'كافة الطلبات', count: counts.all, color: '#38BDF8' },
                ].map((tab) => {
                    const active = statusFilter === tab.key;
                    return (
                        <button
                            key={tab.key}
                            onClick={() => {
                                setStatusFilter(tab.key);
                                setPage(1);
                            }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '8px 16px',
                                borderRadius: '12px',
                                background: active
                                    ? 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)'
                                    : (isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.04)'),
                                border: active
                                    ? '1px solid #D4A537'
                                    : (isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.08)'),
                                color: active ? '#08080A' : (isLight ? '#1E293B' : '#FFFFFF'),
                                fontWeight: active ? '900' : '700',
                                fontSize: '13px',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            <span>{tab.label}</span>
                            <span style={{
                                padding: '2px 6px',
                                borderRadius: '6px',
                                fontSize: '11px',
                                fontWeight: '900',
                                background: active ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.08)',
                                color: active ? '#000' : tab.color,
                            }}>
                                {tab.count || 0}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Deposits Cards List (Matching Screenshot 2 & 10) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                {loading && (!Array.isArray(deposits?.data) || deposits.data.length === 0) ? (
                    <div style={{
                        padding: '60px 20px',
                        textAlign: 'center',
                        backgroundColor: isLight ? '#FFFFFF' : '#0B0F19',
                        borderRadius: '20px',
                        border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                    }}>
                        <RefreshCw className="animate-spin" size={32} color="#D4A537" style={{ margin: '0 auto 12px' }} />
                        <p style={{ margin: 0, fontSize: '14px', color: isLight ? '#64748B' : '#94A3B8' }}>جاري تحميل طلبات الشحن...</p>
                    </div>
                ) : (!Array.isArray(deposits?.data) || deposits.data.length === 0) ? (
                    <div style={{
                        padding: '60px 20px',
                        textAlign: 'center',
                        backgroundColor: isLight ? '#FFFFFF' : '#0B0F19',
                        borderRadius: '20px',
                        border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                    }}>
                        <CreditCard size={40} color={isLight ? '#94A3B8' : '#334155'} style={{ margin: '0 auto 14px' }} />
                        <h3 style={{ margin: '0 0 6px', fontSize: '17px', fontWeight: '800' }}>لا توجد طلبات إيداع في هذا القسم</h3>
                        <p style={{ margin: 0, fontSize: '13px', color: isLight ? '#64748B' : '#94A3B8' }}>جرّب تغيير التبويب أو كلمات البحث.</p>
                    </div>
                ) : (
                    (deposits?.data || []).map((dep) => {
                        const isApproved = dep.status === 'approved';
                        const isRejected = dep.status === 'rejected';
                        const isPending = dep.status === 'pending';
                        const publicId = dep.public_id || `dep_${dep.id}`;
                        const displayAmount = dep.amount || dep.final_amount || 0;

                        return (
                            <div
                                key={dep.id}
                                style={{
                                    backgroundColor: isLight ? '#FFFFFF' : '#090D1A',
                                    border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(56, 189, 248, 0.25)',
                                    borderRadius: '24px',
                                    padding: '20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '14px',
                                    boxShadow: isLight ? '0 4px 15px rgba(0, 0, 0, 0.04)' : '0 10px 30px rgba(0, 0, 0, 0.45)',
                                    position: 'relative',
                                }}
                            >
                                {/* Top Row: Amount & Currency on right, Status & Public ID on left */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    gap: '12px',
                                }}>
                                    <div>
                                        <div style={{
                                            fontSize: '28px',
                                            fontWeight: '900',
                                            color: isLight ? '#0F172A' : '#FFFFFF',
                                            lineHeight: 1,
                                        }}>
                                            {displayAmount}
                                        </div>
                                        <div style={{
                                            fontSize: '12px',
                                            fontWeight: '800',
                                            color: isLight ? '#64748B' : '#94A3B8',
                                            marginTop: '4px',
                                        }}>
                                            {dep.currency || 'EGP'}
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                        <span style={{
                                            padding: '4px 14px',
                                            borderRadius: '100px',
                                            backgroundColor: isApproved
                                                ? 'rgba(16, 185, 129, 0.15)'
                                                : isRejected
                                                ? 'rgba(239, 68, 68, 0.15)'
                                                : 'rgba(245, 158, 11, 0.15)',
                                            border: `1px solid ${
                                                isApproved ? '#10B981' : isRejected ? '#EF4444' : '#F59E0B'
                                            }`,
                                            color: isApproved ? '#10B981' : isRejected ? '#EF4444' : '#F59E0B',
                                            fontSize: '12px',
                                            fontWeight: '800',
                                        }}>
                                            {isApproved ? 'معتمد' : isRejected ? 'مرفوض' : 'قيد المراجعة'}
                                        </span>

                                        <span style={{
                                            padding: '4px 12px',
                                            borderRadius: '100px',
                                            backgroundColor: isLight ? '#F1F5F9' : '#060B18',
                                            border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(56, 189, 248, 0.3)',
                                            color: '#38BDF8',
                                            fontSize: '12px',
                                            fontFamily: 'monospace',
                                            fontWeight: '700',
                                            direction: 'ltr',
                                        }}>
                                            #{publicId}
                                        </span>
                                    </div>
                                </div>

                                {/* Customer Name and Email */}
                                <div>
                                    <div style={{
                                        fontSize: '17px',
                                        fontWeight: '900',
                                        color: isLight ? '#0F172A' : '#FFFFFF',
                                        marginBottom: '2px',
                                    }}>
                                        {dep.user?.name || 'عميل'}
                                    </div>
                                    <div style={{
                                        fontSize: '12.5px',
                                        color: isLight ? '#64748B' : '#94A3B8',
                                        direction: 'ltr',
                                        textAlign: 'right',
                                    }}>
                                        {dep.user?.email || dep.user?.phone}
                                    </div>
                                </div>

                                {/* 2x2 Grid of dark inner boxes */}
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(2, 1fr)',
                                    gap: '10px',
                                }}>
                                    {/* Box 1: التاريخ */}
                                    <div style={{
                                        backgroundColor: isLight ? '#F8FAFC' : '#060B18',
                                        border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(56, 189, 248, 0.2)',
                                        borderRadius: '14px',
                                        padding: '12px',
                                    }}>
                                        <div style={{ fontSize: '11px', color: isLight ? '#64748B' : '#64748B', fontWeight: '700', marginBottom: '4px' }}>
                                            التاريخ
                                        </div>
                                        <div style={{ fontSize: '12.5px', color: isLight ? '#0F172A' : '#F1F5F9', fontWeight: '800' }}>
                                            {formatDateArabic(dep.created_at)}
                                        </div>
                                    </div>

                                    {/* Box 2: قناة الدفع */}
                                    <div style={{
                                        backgroundColor: isLight ? '#F8FAFC' : '#060B18',
                                        border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(56, 189, 248, 0.2)',
                                        borderRadius: '14px',
                                        padding: '12px',
                                    }}>
                                        <div style={{ fontSize: '11px', color: isLight ? '#64748B' : '#64748B', fontWeight: '700', marginBottom: '4px' }}>
                                            قناة الدفع
                                        </div>
                                        <div style={{ fontSize: '12.5px', color: isLight ? '#0F172A' : '#F1F5F9', fontWeight: '800' }}>
                                            {dep.payment_method?.name || dep.paymentMethod?.name || 'محفظة كاش'}
                                        </div>
                                    </div>

                                    {/* Box 3: رقم الهاتف المحول منه */}
                                    <div style={{
                                        backgroundColor: isLight ? '#F8FAFC' : '#060B18',
                                        border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(56, 189, 248, 0.2)',
                                        borderRadius: '14px',
                                        padding: '12px',
                                    }}>
                                        <div style={{ fontSize: '11px', color: isLight ? '#64748B' : '#64748B', fontWeight: '700', marginBottom: '4px' }}>
                                            رقم الهاتف المحول منه
                                        </div>
                                        <div style={{ fontSize: '13px', color: '#38BDF8', fontWeight: '900', direction: 'ltr', textAlign: 'right' }}>
                                            {dep.sender_account_number || dep.sender_account || dep.user?.phone || '—'}
                                        </div>
                                    </div>

                                    {/* Box 4: المبلغ الفعلي */}
                                    <div style={{
                                        backgroundColor: isLight ? '#F8FAFC' : '#060B18',
                                        border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(56, 189, 248, 0.2)',
                                        borderRadius: '14px',
                                        padding: '12px',
                                    }}>
                                        <div style={{ fontSize: '11px', color: isLight ? '#64748B' : '#64748B', fontWeight: '700', marginBottom: '4px' }}>
                                            المبلغ الفعلي
                                        </div>
                                        <div style={{ fontSize: '13px', color: isLight ? '#0F172A' : '#F1F5F9', fontWeight: '900' }}>
                                            {displayAmount}
                                        </div>
                                    </div>
                                </div>

                                {/* Group / Currency Box */}
                                <div style={{
                                    backgroundColor: isLight ? '#F8FAFC' : '#060B18',
                                    border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(56, 189, 248, 0.2)',
                                    borderRadius: '14px',
                                    padding: '12px 14px',
                                }}>
                                    <div style={{ fontSize: '11px', color: isLight ? '#64748B' : '#64748B', fontWeight: '700', marginBottom: '4px' }}>
                                        مجموعة الدفع / العملة
                                    </div>
                                    <div style={{ fontSize: '13px', color: isLight ? '#0F172A' : '#F1F5F9', fontWeight: '800' }}>
                                        {(dep.payment_method?.name || dep.paymentMethod?.name) ? `تحويل مصر (${dep.currency || 'EGP'})` : `تحويل (${dep.currency || 'EGP'})`}
                                    </div>
                                </div>

                                {/* Footer actions */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingTop: '4px',
                                    flexWrap: 'wrap',
                                    gap: '10px',
                                }}>
                                    {isPending ? (
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button
                                                type="button"
                                                onClick={() => handleApprove(dep)}
                                                disabled={submittingAction}
                                                style={{
                                                    padding: '9px 18px',
                                                    borderRadius: '12px',
                                                    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                                                    color: '#FFFFFF',
                                                    border: 'none',
                                                    fontSize: '13px',
                                                    fontWeight: '900',
                                                    cursor: 'pointer',
                                                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                                                }}
                                            >
                                                قبول وشحن
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setRejectingDeposit(dep)}
                                                disabled={submittingAction}
                                                style={{
                                                    padding: '9px 18px',
                                                    borderRadius: '12px',
                                                    background: 'rgba(239, 68, 68, 0.15)',
                                                    border: '1px solid rgba(239, 68, 68, 0.4)',
                                                    color: '#EF4444',
                                                    fontSize: '13px',
                                                    fontWeight: '800',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                رفض
                                            </button>
                                        </div>
                                    ) : (
                                        <span style={{ fontSize: '13px', fontWeight: '800', color: isLight ? '#64748B' : '#64748B' }}>
                                            {isApproved ? 'تمت المراجعة' : 'تم الرفض'}
                                        </span>
                                    )}

                                    {dep.proof_image ? (
                                        <button
                                            type="button"
                                            onClick={() => setPreviewImage(dep.proof_image.startsWith('http') ? dep.proof_image : `/storage/${dep.proof_image}`)}
                                            style={{
                                                padding: '9px 16px',
                                                borderRadius: '12px',
                                                backgroundColor: isLight ? '#EFF6FF' : '#060B18',
                                                border: isLight ? '1px solid #BFDBFE' : '1px solid #1E3A8A',
                                                color: '#38BDF8',
                                                fontSize: '13px',
                                                fontWeight: '800',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                            }}
                                        >
                                            <Eye size={15} />
                                            <span>عرض الإيصال</span>
                                        </button>
                                    ) : (
                                        <span style={{ fontSize: '12px', color: '#64748B' }}>لا يوجد إيصال مرفق</span>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Pagination */}
            {deposits.last_page > 1 && (
                <div style={{
                    padding: '14px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    backgroundColor: isLight ? '#FFFFFF' : '#0B0F19',
                    borderRadius: '16px',
                    border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                    marginBottom: '20px',
                }}>
                    <button
                        disabled={page <= 1}
                        onClick={() => setPage(p => p - 1)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '10px',
                            background: isLight ? '#F1F5F9' : 'rgba(255,255,255,0.05)',
                            border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255,255,255,0.1)',
                            color: isLight ? '#0F172A' : '#FFF',
                            cursor: 'pointer',
                            fontSize: '13px',
                            fontWeight: '700',
                        }}
                    >
                        السابق
                    </button>
                    <span style={{ fontSize: '13px', fontWeight: '800' }}>
                        صفحة {page} من {deposits.last_page}
                    </span>
                    <button
                        disabled={page >= deposits.last_page}
                        onClick={() => setPage(p => p + 1)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '10px',
                            background: isLight ? '#F1F5F9' : 'rgba(255,255,255,0.05)',
                            border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255,255,255,0.1)',
                            color: isLight ? '#0F172A' : '#FFF',
                            cursor: 'pointer',
                            fontSize: '13px',
                            fontWeight: '700',
                        }}
                    >
                        التالي
                    </button>
                </div>
            )}

            {/* Floating Scroll To Top Button (Screenshot 2 / 10 bottom-left) */}
            <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                style={{
                    position: 'fixed',
                    bottom: '24px',
                    left: '24px',
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #A3E635 0%, #FACC15 100%)',
                    border: 'none',
                    boxShadow: '0 8px 20px rgba(163, 230, 53, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0F172A',
                    cursor: 'pointer',
                    zIndex: 900,
                }}
                title="للأعلى"
            >
                <ArrowUp size={22} strokeWidth={2.5} />
            </button>

            {/* Receipt Zoom Modal */}
            {previewImage && (
                <div
                    onClick={() => setPreviewImage(null)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.88)',
                        backdropFilter: 'blur(8px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 130,
                        padding: '20px',
                    }}
                >
                    <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }}>
                        <img
                            src={previewImage}
                            alt="إيصال التحويل"
                            style={{
                                maxWidth: '100%',
                                maxHeight: '85vh',
                                objectFit: 'contain',
                                borderRadius: '14px',
                                border: '2px solid rgba(245, 208, 97, 0.5)',
                            }}
                        />
                        <button
                            onClick={() => setPreviewImage(null)}
                            style={{
                                position: 'absolute',
                                top: '-14px',
                                left: '-14px',
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                background: '#EF4444',
                                color: '#FFF',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>
            )}

            {/* Reject Reason Modal */}
            {rejectingDeposit && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.75)',
                    backdropFilter: 'blur(6px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 120,
                    padding: '16px',
                }}>
                    <div style={{
                        width: '100%',
                        maxWidth: '440px',
                        borderRadius: '20px',
                        background: isLight ? '#FFFFFF' : '#0B1728',
                        border: '1px solid rgba(239, 68, 68, 0.4)',
                        padding: '24px',
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '900', color: '#EF4444' }}>
                                رفض طلب الإيداع (#{rejectingDeposit.id})
                            </h3>
                            <button onClick={() => setRejectingDeposit(null)} style={{ background: 'none', border: 'none', color: '#8E8E98' }}>
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleRejectSubmit}>
                            <p style={{ margin: '0 0 12px', fontSize: '13px', color: isLight ? '#64748B' : '#94A3B8' }}>
                                يرجى كتابة سبب الرفض بوضوح ليظهر للعميل في الإشعار:
                            </p>
                            <textarea
                                required
                                rows={3}
                                value={rejectReason}
                                onChange={(e) => setRejectReason(e.target.value)}
                                placeholder="مثال: الإيصال غير واضح، أو لم يتم استلام التحويل بالرقم المرجعي المذكور..."
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    borderRadius: '10px',
                                    background: isLight ? '#F8FAFC' : 'rgba(255,255,255,0.06)',
                                    border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255,255,255,0.15)',
                                    color: isLight ? '#0F172A' : '#FFFFFF',
                                    fontSize: '13px',
                                    marginBottom: '16px',
                                }}
                            />

                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                    type="button"
                                    onClick={() => setRejectingDeposit(null)}
                                    style={{
                                        flex: 1,
                                        padding: '10px',
                                        borderRadius: '10px',
                                        background: 'rgba(255,255,255,0.08)',
                                        border: 'none',
                                        color: '#CBD5E1',
                                        fontSize: '13px',
                                    }}
                                >
                                    إلغاء
                                </button>
                                <button
                                    type="submit"
                                    disabled={submittingAction}
                                    style={{
                                        flex: 2,
                                        padding: '10px',
                                        borderRadius: '10px',
                                        background: '#EF4444',
                                        color: '#FFFFFF',
                                        border: 'none',
                                        fontSize: '13px',
                                        fontWeight: '900',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {submittingAction ? 'جاري الرفض...' : 'تأكيد الرفض'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            </div>
        </div>
    );
}

