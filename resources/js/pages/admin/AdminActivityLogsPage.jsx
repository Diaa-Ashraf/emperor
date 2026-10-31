import React, { useState, useEffect } from 'react';
import {
    ShieldCheck,
    Search,
    RefreshCw,
    Activity,
    UserCheck,
    Wallet,
    CheckCircle2,
    XCircle,
    Clock,
    AlertCircle,
    User,
    ChevronLeft,
    ChevronRight,
    Filter
} from 'lucide-react';
import { adminApi } from '../../api/endpoints';
import { useToast } from '../../contexts/ToastContext';
import { useTheme } from '../../contexts/ThemeContext';
import AdminHeader from '../../components/admin/AdminHeader';

export default function AdminActivityLogsPage() {
    const { theme } = useTheme();
    const isLight = theme === 'light';
    const { toastError } = useToast();

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [logs, setLogs] = useState([]);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        total: 0,
        per_page: 20,
    });

    const [search, setSearch] = useState('');
    const [selectedAction, setSelectedAction] = useState('');
    const [page, setPage] = useState(1);

    const fetchLogs = async () => {
        try {
            setRefreshing(true);
            const res = await adminApi.getActivityLogs({
                page,
                search: search.trim() || undefined,
                action: selectedAction || undefined,
            });

            if (res && res.data) {
                const data = res.data.data || res.data;
                setLogs(data.data || []);
                setPagination({
                    current_page: data.current_page || 1,
                    last_page: data.last_page || 1,
                    total: data.total || 0,
                    per_page: data.per_page || 20,
                });
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, [page, selectedAction]);

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        fetchLogs();
    };

    // Helper for action badge icon & colors
    const getActionVisuals = (action) => {
        const act = (action || '').toLowerCase();
        if (act.includes('balance') || act.includes('wallet') || act.includes('رصيد') || act.includes('محفظة')) {
            return {
                icon: Wallet,
                color: '#10B981',
                bg: 'rgba(16, 185, 129, 0.12)',
                border: 'rgba(16, 185, 129, 0.3)',
            };
        }
        if (act.includes('role') || act.includes('permission') || act.includes('صلاحي')) {
            return {
                icon: ShieldCheck,
                color: '#F59E0B',
                bg: 'rgba(245, 158, 11, 0.12)',
                border: 'rgba(245, 158, 11, 0.3)',
            };
        }
        if (act.includes('reject') || act.includes('delete') || act.includes('حذف') || act.includes('رفض')) {
            return {
                icon: XCircle,
                color: '#EF4444',
                bg: 'rgba(239, 68, 68, 0.12)',
                border: 'rgba(239, 68, 68, 0.3)',
            };
        }
        if (act.includes('approve') || act.includes('complete') || act.includes('قبول') || act.includes('موافق')) {
            return {
                icon: CheckCircle2,
                color: '#10B981',
                bg: 'rgba(16, 185, 129, 0.12)',
                border: 'rgba(16, 185, 129, 0.3)',
            };
        }
        return {
            icon: Activity,
            color: '#38BDF8',
            bg: 'rgba(56, 189, 248, 0.12)',
            border: 'rgba(56, 189, 248, 0.3)',
        };
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: isLight ? '#F8FAFC' : '#040711',
            color: isLight ? '#0F172A' : '#F8FAFC',
            fontFamily: 'Cairo, sans-serif',
            direction: 'rtl',
            paddingBottom: '80px',
        }}>
            {/* Admin Header with Back Button */}
            <AdminHeader
                title="مراقبة المشرفين"
                subtitle="سجل تفصيلي ومباشر لكافة العمليات التي يقوم بها المشرفون والمدراء في المنصة"
                badge="الأمان والتدقيق الإداري"
                onRefresh={fetchLogs}
                refreshing={refreshing}
            />

            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 16px' }}>
                {/* Header Card matching Screenshot 1 */}
                <div style={{
                    backgroundColor: isLight ? '#FFFFFF' : '#0B1222',
                    border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                    borderRadius: '24px',
                    padding: '24px 20px',
                    marginBottom: '20px',
                    boxShadow: isLight ? '0 4px 20px rgba(0,0,0,0.03)' : '0 10px 30px rgba(0,0,0,0.4)',
                    textAlign: 'center',
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '16px',
                        marginBottom: '16px',
                    }}>
                        <div style={{ textAlign: 'right', flex: 1 }}>
                            <h1 style={{
                                fontSize: '24px',
                                fontWeight: '900',
                                margin: '0 0 6px 0',
                                color: isLight ? '#0F172A' : '#FFFFFF',
                            }}>
                                مراقبة المشرفين
                            </h1>
                            <p style={{
                                fontSize: '13px',
                                color: isLight ? '#64748B' : '#94A3B8',
                                margin: 0,
                                lineHeight: '1.6',
                            }}>
                                تتبع الطلبات والعمليات ومن قام بإضافتها أو قبولها من المشرفين.
                            </p>
                        </div>

                        <div style={{
                            width: '46px',
                            height: '46px',
                            borderRadius: '14px',
                            backgroundColor: 'rgba(56, 189, 248, 0.12)',
                            border: '1px solid rgba(56, 189, 248, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#38BDF8',
                            flexShrink: 0,
                        }}>
                            <ShieldCheck size={24} />
                        </div>
                    </div>

                    {/* Refresh Button Centered matching Screenshot 1 */}
                    <button
                        onClick={fetchLogs}
                        disabled={refreshing}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            padding: '10px 24px',
                            borderRadius: '14px',
                            backgroundColor: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
                            border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.15)',
                            color: isLight ? '#0F172A' : '#FFFFFF',
                            fontSize: '13px',
                            fontWeight: '800',
                            cursor: refreshing ? 'not-allowed' : 'pointer',
                            width: '100%',
                            maxWidth: '400px',
                            margin: '0 auto',
                        }}
                    >
                        <RefreshCw size={15} className={refreshing ? 'animate-spin' : ''} />
                        <span>تحديث</span>
                    </button>
                </div>

                {/* Search & Filter Card matching Screenshot 1 */}
                <div style={{
                    backgroundColor: isLight ? '#FFFFFF' : '#0B1222',
                    border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                    borderRadius: '24px',
                    padding: '20px',
                    marginBottom: '20px',
                    boxShadow: isLight ? '0 4px 20px rgba(0,0,0,0.03)' : '0 10px 30px rgba(0,0,0,0.4)',
                }}>
                    <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {/* Search Input */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            backgroundColor: isLight ? '#F8FAFC' : '#040711',
                            border: isLight ? '1px solid #CBD5E1' : '1px solid #1E293B',
                            borderRadius: '14px',
                            padding: '11px 16px',
                        }}>
                            <Search size={18} color="#94A3B8" />
                            <input
                                type="text"
                                placeholder="ابحث باسم المشرف، رقم الطلب، نوع العملية..."
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

                        {/* Action Filter Dropdown below input matching Screenshot 1 */}
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <select
                                value={selectedAction}
                                onChange={(e) => {
                                    setSelectedAction(e.target.value);
                                    setPage(1);
                                }}
                                style={{
                                    flex: 1,
                                    padding: '11px 16px',
                                    borderRadius: '14px',
                                    backgroundColor: isLight ? '#F8FAFC' : '#040711',
                                    border: isLight ? '1px solid #CBD5E1' : '1px solid #1E293B',
                                    color: isLight ? '#0F172A' : '#FFFFFF',
                                    fontSize: '13px',
                                    fontWeight: '700',
                                    outline: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                <option value="">كل العمليات</option>
                                <option value="update_user_permissions">تحديث صلاحيات مستخدم</option>
                                <option value="adjust_balance">تعديل رصيد محفظة</option>
                                <option value="approve_deposit">معالجة طلب إيداع</option>
                                <option value="update_order_status">تحديث حالة طلب</option>
                                <option value="update_pricing_tier">تعديل شريحة عملاء</option>
                            </select>

                            <button
                                type="submit"
                                style={{
                                    padding: '11px 22px',
                                    borderRadius: '14px',
                                    background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                                    color: '#FFFFFF',
                                    fontSize: '13px',
                                    fontWeight: '800',
                                    border: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                بحث
                            </button>
                        </div>
                    </form>
                </div>

                {/* Operations List Table matching Screenshot 5 */}
                <div style={{
                    backgroundColor: isLight ? '#FFFFFF' : '#0B1222',
                    border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: isLight ? '0 4px 20px rgba(0,0,0,0.03)' : '0 10px 30px rgba(0,0,0,0.4)',
                }}>
                    {/* Header Columns */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px 20px',
                        backgroundColor: isLight ? '#F1F5F9' : '#0D1528',
                        borderBottom: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                        fontSize: '14px',
                        fontWeight: '800',
                        color: '#38BDF8',
                    }}>
                        <div>العملية</div>
                        <div>المشرف / المنفذ</div>
                    </div>

                    {loading ? (
                        <div style={{ padding: '60px 20px', textAlign: 'center', color: '#94A3B8' }}>
                            <RefreshCw size={32} className="animate-spin" style={{ margin: '0 auto 12px auto', color: '#D4A537' }} />
                            <div>جاري جلب سجل المشرفين...</div>
                        </div>
                    ) : logs.length === 0 ? (
                        <div style={{ padding: '60px 20px', textAlign: 'center', color: '#94A3B8' }}>
                            <ShieldCheck size={40} style={{ margin: '0 auto 12px auto', opacity: 0.5 }} />
                            <div style={{ fontWeight: '700' }}>لا توجد عمليات مسجلة تطابق البحث</div>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {logs.map((log) => {
                                const visual = getActionVisuals(log.action);
                                const IconComponent = visual.icon;

                                return (
                                    <div
                                        key={log.id}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '18px 20px',
                                            borderBottom: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.05)',
                                            transition: 'background-color 0.15s ease',
                                        }}
                                    >
                                        {/* Right Side: Operation details */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                            <div style={{
                                                width: '44px',
                                                height: '44px',
                                                borderRadius: '12px',
                                                backgroundColor: visual.bg,
                                                border: `1px solid ${visual.border}`,
                                                color: visual.color,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0,
                                            }}>
                                                <IconComponent size={22} />
                                            </div>

                                            <div>
                                                <div style={{
                                                    fontSize: '15px',
                                                    fontWeight: '900',
                                                    color: isLight ? '#0F172A' : '#FFFFFF',
                                                    marginBottom: '3px',
                                                }}>
                                                    {log.action_formatted || log.action}
                                                </div>

                                                <div style={{
                                                    fontSize: '12px',
                                                    color: isLight ? '#64748B' : '#94A3B8',
                                                    marginBottom: '4px',
                                                    lineHeight: '1.4',
                                                }}>
                                                    {log.description || 'تم تنفيذ العملية بنجاح عبر لوحة الإدارة'}
                                                </div>

                                                <div style={{
                                                    fontSize: '11px',
                                                    color: '#64748B',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '4px',
                                                }}>
                                                    <Clock size={11} />
                                                    <span>{log.date_formatted || log.created_at}</span>
                                                    {log.ip_address && (
                                                        <>
                                                            <span>•</span>
                                                            <span>IP: {log.ip_address}</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Left Side: Supervisor info matching Screenshot 5 */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}>
                                            <div>
                                                <div style={{
                                                    fontSize: '14px',
                                                    fontWeight: '800',
                                                    color: isLight ? '#0F172A' : '#FFFFFF',
                                                }}>
                                                    {log.admin_name || 'سند ومهره كارد'}
                                                </div>
                                                <div style={{
                                                    fontSize: '11px',
                                                    color: '#38BDF8',
                                                    fontWeight: '700',
                                                }}>
                                                    {log.admin_id ? `ID: ${log.admin_id}` : 'مدير النظام'}
                                                </div>
                                            </div>

                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '50%',
                                                backgroundColor: isLight ? '#EFF6FF' : 'rgba(56, 189, 248, 0.12)',
                                                border: '1px solid rgba(56, 189, 248, 0.3)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#38BDF8',
                                                fontWeight: '800',
                                                fontSize: '14px',
                                                flexShrink: 0,
                                            }}>
                                                {log.user?.avatar ? (
                                                    <img
                                                        src={log.user.avatar}
                                                        alt={log.admin_name}
                                                        style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                                                    />
                                                ) : (
                                                    <User size={20} />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Pagination */}
                    {pagination.last_page > 1 && (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '16px 20px',
                            backgroundColor: isLight ? '#F1F5F9' : '#0D1528',
                            borderTop: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                            fontSize: '13px',
                        }}>
                            <div style={{ color: '#94A3B8' }}>
                                صفحة {pagination.current_page} من {pagination.last_page} (إجمالي {pagination.total} عملية)
                            </div>

                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={pagination.current_page <= 1}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        padding: '6px 12px',
                                        borderRadius: '8px',
                                        backgroundColor: isLight ? '#FFFFFF' : '#1E293B',
                                        border: isLight ? '1px solid #CBD5E1' : '1px solid #334155',
                                        color: isLight ? '#0F172A' : '#FFFFFF',
                                        cursor: pagination.current_page <= 1 ? 'not-allowed' : 'pointer',
                                        opacity: pagination.current_page <= 1 ? 0.5 : 1,
                                    }}
                                >
                                    <ChevronRight size={14} />
                                    السابق
                                </button>

                                <button
                                    onClick={() => setPage(p => Math.min(pagination.last_page, p + 1))}
                                    disabled={pagination.current_page >= pagination.last_page}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        padding: '6px 12px',
                                        borderRadius: '8px',
                                        backgroundColor: isLight ? '#FFFFFF' : '#1E293B',
                                        border: isLight ? '1px solid #CBD5E1' : '1px solid #334155',
                                        color: isLight ? '#0F172A' : '#FFFFFF',
                                        cursor: pagination.current_page >= pagination.last_page ? 'not-allowed' : 'pointer',
                                        opacity: pagination.current_page >= pagination.last_page ? 0.5 : 1,
                                    }}
                                >
                                    التالي
                                    <ChevronLeft size={14} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

