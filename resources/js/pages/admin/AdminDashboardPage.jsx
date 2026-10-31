import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    TrendingUp,
    DollarSign,
    Users,
    ShoppingBag,
    CreditCard,
    AlertTriangle,
    RefreshCw,
    ArrowUpRight,
    CheckCircle,
    Clock,
    XCircle,
    Eye,
    Target,
    Calendar,
    Filter,
    Shield,
    Wallet,
    Package,
    UserCheck,
    Hourglass,
    ArrowRight
} from 'lucide-react';
import { adminApi } from '../../api/endpoints';
import { useToast } from '../../contexts/ToastContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { formatCurrency } from '../../utils/currencyHelper';
import AdminHeader from '../../components/admin/AdminHeader';

export default function AdminDashboardPage() {
    const { theme } = useTheme();
    const { user } = useAuth();
    const isLight = theme === 'light';
    const { success, error: toastError } = useToast();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState('month'); // today, 7days, month, year, custom
    const [data, setData] = useState({
        metrics: {
            net_profit_usd: 0,
            gross_revenue_usd: 0,
            total_orders: 0,
            completed_orders: 0,
            pending_orders: 0,
            total_users: 0,
            active_users: 0,
            pending_users: 0,
            total_products: 0,
            pending_manual_deposits: 0,
            total_wallets_balance: 0,
            target: {
                goal_usd: 100,
                achieved_usd: 0,
                remaining_usd: 100,
                progress_percent: 0,
            },
            filter: {
                start_date: '',
                end_date: '',
            }
        },
        summary: {},
        recent_orders: [],
        recent_targets: [],
        low_balance_providers: [],
    });

    const fetchStats = async () => {
        try {
            setLoading(true);
            const params = {};
            if (dateRange === 'today') {
                const todayStr = new Date().toISOString().split('T')[0];
                params.start_date = todayStr;
                params.end_date = todayStr;
            } else if (dateRange === '7days') {
                const d = new Date();
                d.setDate(d.getDate() - 7);
                params.start_date = d.toISOString().split('T')[0];
                params.end_date = new Date().toISOString().split('T')[0];
            } else if (dateRange === 'month') {
                const now = new Date();
                params.start_date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
                params.end_date = now.toISOString().split('T')[0];
            }

            const res = await adminApi.getDashboardStats(params);
            if (res && res.data) {
                setData(res.data.data || res.data);
            }
        } catch (err) {
            console.error('Stats error:', err);
            toastError('فشل تحميل إحصائيات لوحة التحكم، يرجى المحاولة لاحقاً');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, [dateRange]);

    const metrics = data.metrics || {};
    const target = metrics.target || {
        goal_usd: 100,
        achieved_usd: 0,
        remaining_usd: 100,
        progress_percent: 0,
    };

    // Arabic Today Date string
    const todayFormatted = new Intl.DateTimeFormat('ar-EG', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date());

    // Stat Cards matching the user's screenshots exactly
    const statCards = [
        {
            title: 'صافي الأرباح (USD)',
            value: `$US ${Number(metrics.net_profit_usd || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            subtext: 'الأرباح من الطلبات المكتملة داخل الفترة المحددة',
            icon: DollarSign,
            color: '#38BDF8',
            progress: Math.min(100, Math.max(10, ((metrics.net_profit_usd || 0) / 100) * 100)),
        },
        {
            title: 'إجمالي الإيرادات (USD)',
            value: `$US ${Number(metrics.gross_revenue_usd || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            subtext: 'الإيرادات من الطلبات المكتملة داخل الفترة...',
            icon: TrendingUp,
            color: '#38BDF8',
            progress: Math.min(100, Math.max(15, ((metrics.gross_revenue_usd || 0) / 500) * 100)),
        },
        {
            title: 'إجمالي الطلبات',
            value: metrics.total_orders || 0,
            subtext: 'كل الطلبات المطابقة للفترة الحالية',
            icon: ShoppingBag,
            color: '#38BDF8',
            progress: Math.min(100, Math.max(10, (metrics.total_orders || 0) * 2)),
        },
        {
            title: 'إجمالي المستخدمين',
            value: metrics.total_users || 0,
            subtext: `${metrics.active_users || 0} مستخدم مفعل`,
            icon: Users,
            color: '#38BDF8',
            progress: Math.min(100, Math.max(15, ((metrics.active_users || 0) / Math.max(1, metrics.total_users || 1)) * 100)),
        },
        {
            title: 'حسابات بانتظار التفعيل',
            value: metrics.pending_users || 0,
            subtext: 'حسابات جديدة ما زالت بانتظار المراجعة',
            icon: Hourglass,
            color: '#38BDF8',
            progress: (metrics.pending_users || 0) > 0 ? 60 : 0,
        },
        {
            title: 'إجمالي المنتجات',
            value: metrics.total_products || 0,
            subtext: 'إجمالي المنتجات الحالية المتاحة في المتجر',
            icon: Package,
            color: '#38BDF8',
            progress: Math.min(100, Math.max(15, (metrics.total_products || 0) * 5)),
        },
        {
            title: 'الطلبات المعلقة',
            value: metrics.pending_orders || 0,
            subtext: 'طلبات تحتاج متابعة داخل الفترة الحالية',
            icon: Clock,
            color: '#F59E0B',
            progress: (metrics.pending_orders || 0) > 0 ? 80 : 0,
        },
        {
            title: 'الطلبات المكتملة',
            value: metrics.completed_orders || 0,
            subtext: 'طلبات تم تنفيذها داخل الفترة المحددة',
            icon: CheckCircle,
            color: '#10B981',
            progress: Math.min(100, Math.max(10, (metrics.completed_orders || 0) * 2)),
        },
        {
            title: 'طلبات الشحن اليدوي المعلقة',
            value: metrics.pending_manual_deposits || 0,
            subtext: 'طلبات شحن يدوي بانتظار المراجعة في الفترة الحالية',
            icon: CreditCard,
            color: '#F59E0B',
            progress: (metrics.pending_manual_deposits || 0) > 0 ? 70 : 0,
        },
        {
            title: 'إجمالي أرصدة المحافظ',
            value: Number(metrics.total_wallets_balance || 0).toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 2 }),
            subtext: 'إجمالي أرصدة العملاء الحالية كما هي مخزنة في قاعدة البيانات',
            icon: Wallet,
            color: '#38BDF8',
            progress: Math.min(100, Math.max(20, ((metrics.total_wallets_balance || 0) / 2000) * 100)),
        },
    ];

    const getStatusBadge = (status) => {
        switch (status) {
            case 'completed':
                return { label: 'مكتمل', bg: 'rgba(16, 185, 129, 0.15)', color: '#10B981', border: 'rgba(16, 185, 129, 0.3)' };
            case 'processing':
                return { label: 'قيد التنفيذ', bg: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8', border: 'rgba(56, 189, 248, 0.3)' };
            case 'pending':
            case 'manual_review':
                return { label: 'معلق', bg: 'rgba(245, 208, 97, 0.15)', color: '#F5D061', border: 'rgba(245, 208, 97, 0.3)' };
            case 'failed':
            case 'rejected':
                return { label: 'مرفوض', bg: 'rgba(239, 68, 68, 0.15)', color: '#EF4444', border: 'rgba(239, 68, 68, 0.3)' };
            default:
                return { label: status, bg: 'rgba(148, 163, 184, 0.15)', color: '#94A3B8', border: 'rgba(148, 163, 184, 0.3)' };
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
            {/* Top Navigation Bar with Back Button + Menu Toggle */}
            <AdminHeader
                title="لوحة تحكم الإدارة"
                badge="لوحة القيادة الإدارية"
                onRefresh={fetchStats}
                refreshing={loading}
            />

            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
                {/* ═══ Header Welcome & Date Section ═══ */}
                <div style={{
                    backgroundColor: isLight ? '#FFFFFF' : '#0B0F19',
                    border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '24px',
                    padding: '24px',
                    marginBottom: '20px',
                    boxShadow: isLight ? '0 4px 20px rgba(0, 0, 0, 0.04)' : '0 10px 30px rgba(0, 0, 0, 0.4)',
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '10px',
                    }}>
                        <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '4px 14px',
                            borderRadius: '20px',
                            backgroundColor: 'rgba(56, 189, 248, 0.12)',
                            border: '1px solid rgba(56, 189, 248, 0.3)',
                            color: '#38BDF8',
                            fontSize: '13px',
                            fontWeight: '800',
                        }}>
                            <Shield size={14} />
                            <span>لوحة القيادة الإدارية</span>
                        </span>
                    </div>

                    <h1 style={{
                        textAlign: 'center',
                        fontSize: '26px',
                        fontWeight: '900',
                        margin: '0 0 8px',
                        color: isLight ? '#0F172A' : '#FFFFFF',
                    }}>
                        لوحة تحكم الإدارة
                    </h1>

                    <p style={{
                        textAlign: 'center',
                        fontSize: '13.5px',
                        color: isLight ? '#64748B' : '#94A3B8',
                        margin: '0 0 24px',
                        lineHeight: 1.6,
                        maxWidth: '700px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}>
                        نظرة عامة سريعة على أداء المتجر، آخر الطلبات، الشحن اليدوي، والإجراءات الأساسية التي يحتاجها الأدمن يوميًا.
                    </p>

                    {/* Dual Info Boxes: مرحبًا بعودتك & تاريخ اليوم */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                        gap: '14px',
                    }}>
                        {/* Welcome Card */}
                        <div style={{
                            backgroundColor: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)',
                            border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '16px',
                            padding: '16px',
                            textAlign: 'center',
                        }}>
                            <span style={{ fontSize: '12px', color: isLight ? '#64748B' : '#94A3B8', display: 'block', marginBottom: '4px' }}>
                                مرحبًا بعودتك
                            </span>
                            <span style={{ fontSize: '18px', fontWeight: '900', color: isLight ? '#B8860B' : '#F5D061' }}>
                                {user?.name || 'سند ومهره كارد'}
                            </span>
                        </div>

                        {/* Today Date Card */}
                        <div style={{
                            backgroundColor: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)',
                            border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '16px',
                            padding: '16px',
                            textAlign: 'center',
                        }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: isLight ? '#64748B' : '#94A3B8', marginBottom: '4px' }}>
                                <Calendar size={14} color="#38BDF8" />
                                <span>تاريخ اليوم</span>
                            </div>
                            <span style={{ fontSize: '15px', fontWeight: '800', color: isLight ? '#0F172A' : '#FFFFFF', display: 'block' }}>
                                {todayFormatted}
                            </span>
                        </div>
                    </div>
                </div>

                {/* ═══ Date Range Filter Bar ═══ */}
                <div style={{
                    backgroundColor: isLight ? '#FFFFFF' : '#0B0F19',
                    border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '20px',
                    padding: '16px 20px',
                    marginBottom: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '14px',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '220px' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            backgroundColor: isLight ? '#F1F5F9' : '#080C14',
                            border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(56, 189, 248, 0.25)',
                            borderRadius: '12px',
                            padding: '10px 14px',
                            width: '100%',
                        }}>
                            <Calendar size={18} color="#38BDF8" />
                            <select
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                                style={{
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    outline: 'none',
                                    color: isLight ? '#0F172A' : '#FFFFFF',
                                    fontSize: '13.5px',
                                    fontWeight: '800',
                                    width: '100%',
                                    cursor: 'pointer',
                                    fontFamily: 'Cairo, sans-serif',
                                }}
                            >
                                <option value="month" style={{ background: '#0F172A', color: '#fff' }}>هذا الشهر (الأول من الشهر وحتى اليوم)</option>
                                <option value="today" style={{ background: '#0F172A', color: '#fff' }}>اليوم فقط</option>
                                <option value="7days" style={{ background: '#0F172A', color: '#fff' }}>آخر 7 أيام</option>
                                <option value="all" style={{ background: '#0F172A', color: '#fff' }}>كافة الفترات (الكل)</option>
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={fetchStats}
                        disabled={loading}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '11px 24px',
                            borderRadius: '12px',
                            background: 'linear-gradient(90deg, #E28710 0%, #D4690C 50%, #C35005 100%)',
                            border: 'none',
                            color: '#FFFFFF',
                            fontSize: '14px',
                            fontWeight: '900',
                            cursor: 'pointer',
                            boxShadow: '0 4px 15px rgba(212, 105, 12, 0.35)',
                            transition: 'all 0.2s',
                        }}
                    >
                        <Filter size={16} />
                        <span>{loading ? 'جاري التحديث...' : 'فلترة'}</span>
                    </button>
                </div>

                {/* ═══ 10 Statistics Cards Grid ═══ */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '16px',
                    marginBottom: '28px',
                }}>
                    {statCards.map((card, idx) => {
                        const Icon = card.icon;
                        return (
                            <div
                                key={idx}
                                style={{
                                    backgroundColor: isLight ? '#FFFFFF' : '#0B0F19',
                                    border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                                    borderRadius: '20px',
                                    padding: '20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    boxShadow: isLight ? '0 4px 15px rgba(0,0,0,0.03)' : '0 8px 25px rgba(0,0,0,0.3)',
                                    transition: 'transform 0.2s, border-color 0.2s',
                                }}
                            >
                                <div>
                                    {/* Top: Icon & Title */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                                        <div style={{
                                            width: '42px',
                                            height: '42px',
                                            borderRadius: '12px',
                                            backgroundColor: 'rgba(56, 189, 248, 0.12)',
                                            border: '1px solid rgba(56, 189, 248, 0.25)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: card.color || '#38BDF8',
                                            flexShrink: 0,
                                        }}>
                                            <Icon size={20} />
                                        </div>
                                        <span style={{
                                            fontSize: '13.5px',
                                            fontWeight: '800',
                                            color: isLight ? '#64748B' : '#94A3B8',
                                            lineHeight: 1.4,
                                        }}>
                                            {card.title}
                                        </span>
                                    </div>

                                    {/* Value */}
                                    <div style={{
                                        fontSize: '24px',
                                        fontWeight: '900',
                                        color: isLight ? '#0F172A' : '#FFFFFF',
                                        marginBottom: '6px',
                                        letterSpacing: '0.5px',
                                    }}>
                                        {card.value}
                                    </div>

                                    {/* Subtext */}
                                    <p style={{
                                        fontSize: '12px',
                                        color: isLight ? '#94A3B8' : '#64748B',
                                        margin: '0 0 16px',
                                        lineHeight: 1.5,
                                    }}>
                                        {card.subtext}
                                    </p>
                                </div>

                                {/* Progress bar bottom line */}
                                <div style={{
                                    width: '100%',
                                    height: '5px',
                                    borderRadius: '10px',
                                    backgroundColor: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)',
                                    overflow: 'hidden',
                                }}>
                                    <div style={{
                                        width: `${card.progress || 15}%`,
                                        height: '100%',
                                        borderRadius: '10px',
                                        background: 'linear-gradient(90deg, #38BDF8 0%, #0284C7 100%)',
                                        boxShadow: '0 0 8px rgba(56, 189, 248, 0.6)',
                                        transition: 'width 0.6s ease-in-out',
                                    }} />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ═══ Monthly Target Goal Section (تارجت الشهر) ═══ */}
                <div style={{
                    backgroundColor: isLight ? '#FFFFFF' : '#0B0F19',
                    border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '24px',
                    padding: '24px',
                    marginBottom: '28px',
                    boxShadow: isLight ? '0 4px 20px rgba(0, 0, 0, 0.04)' : '0 10px 30px rgba(0, 0, 0, 0.4)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
                        <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(56, 189, 248, 0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#38BDF8',
                        }}>
                            <Target size={20} />
                        </div>
                        <h3 style={{ fontSize: '18px', fontWeight: '900', margin: 0, color: isLight ? '#0F172A' : '#FFFFFF' }}>
                            تارجت الشهر
                        </h3>
                    </div>

                    <div style={{
                        textAlign: 'center',
                        fontSize: '28px',
                        fontWeight: '900',
                        color: isLight ? '#B8860B' : '#F5D061',
                        marginBottom: '6px',
                        letterSpacing: '1px',
                    }}>
                        $US {target.goal_usd} / $US {target.achieved_usd}
                    </div>

                    <p style={{
                        textAlign: 'center',
                        fontSize: '13px',
                        color: isLight ? '#64748B' : '#94A3B8',
                        margin: '0 0 18px',
                    }}>
                        متبقي $US {target.remaining_usd} للوصول لهدف ربح الشهر ({target.progress_percent}%)
                    </p>

                    {/* Target Progress Bar */}
                    <div style={{
                        width: '100%',
                        height: '10px',
                        borderRadius: '20px',
                        backgroundColor: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)',
                        overflow: 'hidden',
                    }}>
                        <div style={{
                            width: `${Math.min(100, Math.max(5, target.progress_percent))}%`,
                            height: '100%',
                            borderRadius: '20px',
                            background: 'linear-gradient(90deg, #38BDF8 0%, #D4A537 100%)',
                            boxShadow: '0 0 15px rgba(56, 189, 248, 0.7)',
                            transition: 'width 0.8s ease',
                        }} />
                    </div>
                </div>

                {/* ═══ Quick Management Shortcuts ═══ */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '12px',
                    marginBottom: '28px',
                }}>
                    {[
                        { label: 'إدارة المستخدمين', path: '/admin/users', icon: Users, color: '#38BDF8' },
                        { label: 'طلبات الشحن اليدوي', path: '/admin/deposits', icon: CreditCard, color: '#F5D061' },
                        { label: 'طلبات بيع التارجت', path: '/admin/targets', icon: Target, color: '#10B981' },
                        { label: 'إدارة الطلبات', path: '/admin/orders', icon: ShoppingBag, color: '#A855F7' },
                    ].map((btn, idx) => {
                        const Icon = btn.icon;
                        return (
                            <Link
                                key={idx}
                                to={btn.path}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '14px 18px',
                                    borderRadius: '16px',
                                    backgroundColor: isLight ? '#FFFFFF' : '#0B0F19',
                                    border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                                    textDecoration: 'none',
                                    color: isLight ? '#0F172A' : '#FFFFFF',
                                    fontSize: '14px',
                                    fontWeight: '800',
                                    transition: 'all 0.2s',
                                    boxShadow: isLight ? '0 2px 10px rgba(0,0,0,0.03)' : '0 4px 15px rgba(0,0,0,0.2)',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = btn.color;
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Icon size={18} color={btn.color} />
                                    <span>{btn.label}</span>
                                </div>
                                <ArrowUpRight size={16} color="#64748B" />
                            </Link>
                        );
                    })}
                </div>

                {/* ═══ Recent Orders Section (آخر الطلبات) ═══ */}
                <div style={{
                    backgroundColor: isLight ? '#FFFFFF' : '#0B0F19',
                    border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '24px',
                    padding: '24px',
                    marginBottom: '28px',
                    boxShadow: isLight ? '0 4px 20px rgba(0, 0, 0, 0.04)' : '0 10px 30px rgba(0, 0, 0, 0.4)',
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '10px',
                        marginBottom: '16px',
                    }}>
                        <div>
                            <h3 style={{ fontSize: '18px', fontWeight: '900', margin: '0 0 4px', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                آخر الطلبات
                            </h3>
                            <p style={{ margin: 0, fontSize: '12.5px', color: isLight ? '#64748B' : '#94A3B8' }}>
                                ملخص للعميل والمنتج والبريد والعدد.
                            </p>
                        </div>

                        <Link
                            to="/admin/orders"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                fontSize: '13px',
                                fontWeight: '800',
                                color: '#38BDF8',
                                textDecoration: 'none',
                            }}
                        >
                            <span>عرض الكل ({data.recent_orders?.length || 0})</span>
                            <ArrowRight size={14} />
                        </Link>
                    </div>

                    {/* Order Cards List matching mobile screenshots */}
                    {data.recent_orders && data.recent_orders.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {data.recent_orders.map((order) => {
                                const st = getStatusBadge(order.status);
                                return (
                                    <div
                                        key={order.id}
                                        style={{
                                            backgroundColor: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)',
                                            border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.07)',
                                            borderRadius: '16px',
                                            padding: '16px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '10px',
                                            transition: 'all 0.2s',
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ fontSize: '15px', fontWeight: '800', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                                    {order.user?.name || 'عميل'}
                                                </span>
                                                <span style={{
                                                    fontSize: '11px',
                                                    fontWeight: '800',
                                                    color: '#38BDF8',
                                                    backgroundColor: 'rgba(56, 189, 248, 0.12)',
                                                    border: '1px solid rgba(56, 189, 248, 0.25)',
                                                    padding: '2px 8px',
                                                    borderRadius: '6px',
                                                }}>
                                                    العدد {order.quantity || 1}
                                                </span>
                                            </div>

                                            <span style={{
                                                fontSize: '12px',
                                                fontWeight: '800',
                                                color: st.color,
                                                backgroundColor: st.bg,
                                                border: `1px solid ${st.border}`,
                                                padding: '3px 10px',
                                                borderRadius: '20px',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '5px',
                                            }}>
                                                <span>•</span>
                                                <span>{st.label}</span>
                                            </span>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                                            <div>
                                                <span style={{ fontSize: '13px', fontWeight: '700', color: isLight ? '#334155' : '#E2E8F0' }}>
                                                    {order.product?.name || 'منتج رقمي'} {order.tier?.name ? `- ${order.tier.name}` : ''}
                                                </span>
                                                <span style={{ display: 'block', fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                                                    {order.user?.email || order.player_id || 'بدون بريد'}
                                                </span>
                                            </div>

                                            <Link
                                                to={`/admin/orders?search=${order.public_id || order.id}`}
                                                style={{
                                                    fontSize: '12.5px',
                                                    fontWeight: '800',
                                                    color: '#F5D061',
                                                    textDecoration: 'none',
                                                    padding: '6px 14px',
                                                    borderRadius: '8px',
                                                    backgroundColor: 'rgba(245, 208, 97, 0.1)',
                                                    border: '1px solid rgba(245, 208, 97, 0.25)',
                                                    transition: 'all 0.2s',
                                                }}
                                            >
                                                تفاصيل العملية
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '36px 16px', color: '#64748B' }}>
                            <ShoppingBag size={32} style={{ margin: '0 auto 10px', opacity: 0.5 }} />
                            <p style={{ margin: 0, fontSize: '14px', fontWeight: '700' }}>لا توجد طلبات مسجلة في هذه الفترة</p>
                        </div>
                    )}
                </div>

                {/* ═══ Recent Target Sell Orders (طلبات بيع التارجت) ═══ */}
                {data.recent_targets && data.recent_targets.length > 0 && (
                    <div style={{
                        backgroundColor: isLight ? '#FFFFFF' : '#0B0F19',
                        border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '24px',
                        padding: '24px',
                        boxShadow: isLight ? '0 4px 20px rgba(0, 0, 0, 0.04)' : '0 10px 30px rgba(0, 0, 0, 0.4)',
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: '10px',
                            marginBottom: '16px',
                        }}>
                            <div>
                                <h3 style={{ fontSize: '18px', fontWeight: '900', margin: '0 0 4px', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                    أحدث طلبات بيع التارجت
                                </h3>
                                <p style={{ margin: 0, fontSize: '12.5px', color: isLight ? '#64748B' : '#94A3B8' }}>
                                    الطلبات المقدمة من صناع المحتوى ووكالات التارجت لمراجعتها واعتماد الصرف.
                                </p>
                            </div>

                            <Link
                                to="/admin/targets"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    fontSize: '13px',
                                    fontWeight: '800',
                                    color: '#10B981',
                                    textDecoration: 'none',
                                }}
                            >
                                <span>عرض الكل ({data.recent_targets.length})</span>
                                <ArrowRight size={14} />
                            </Link>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {data.recent_targets.map((tgt) => {
                                const st = getStatusBadge(tgt.status);
                                return (
                                    <div
                                        key={tgt.id}
                                        style={{
                                            backgroundColor: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)',
                                            border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.07)',
                                            borderRadius: '16px',
                                            padding: '16px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            flexWrap: 'wrap',
                                            gap: '12px',
                                        }}
                                    >
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ fontSize: '15px', fontWeight: '800', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                                    {tgt.user?.name || 'مستخدم التارجت'}
                                                </span>
                                                <span style={{ fontSize: '12px', color: '#10B981', fontWeight: '800' }}>
                                                    {Number(tgt.target_points || 0).toLocaleString()} نقطة
                                                </span>
                                            </div>
                                            <span style={{ fontSize: '12px', color: '#64748B' }}>
                                                المبلغ المستحق: {tgt.net_payout || tgt.gross_amount} {tgt.currency || 'EGP'}
                                            </span>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{
                                                fontSize: '12px',
                                                fontWeight: '800',
                                                color: st.color,
                                                backgroundColor: st.bg,
                                                border: `1px solid ${st.border}`,
                                                padding: '3px 10px',
                                                borderRadius: '20px',
                                            }}>
                                                {st.label}
                                            </span>
                                            <Link
                                                to={`/admin/targets?search=${tgt.public_id || tgt.id}`}
                                                style={{
                                                    fontSize: '12px',
                                                    fontWeight: '800',
                                                    color: '#38BDF8',
                                                    textDecoration: 'none',
                                                    padding: '6px 12px',
                                                    borderRadius: '8px',
                                                    backgroundColor: 'rgba(56, 189, 248, 0.1)',
                                                }}
                                            >
                                                مراجعة
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
