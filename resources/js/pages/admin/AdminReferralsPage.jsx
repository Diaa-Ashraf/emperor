import React, { useState, useEffect } from 'react';
import {
    Gift,
    Percent,
    Users,
    DollarSign,
    Save,
    Search,
    Eye,
    TrendingUp,
    RefreshCw,
    CheckCircle2,
    Check,
    Wallet,
    Copy,
    ExternalLink,
    Share2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../../api/endpoints';
import { useToast } from '../../contexts/ToastContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import AdminHeader from '../../components/admin/AdminHeader';

export default function AdminReferralsPage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { theme } = useTheme();
    const isLight = theme === 'light';
    const { success, error: toastError } = useToast();

    const [activeTab, setActiveTab] = useState('referrals'); // 'referrals' or 'sub_agents'
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Admin personal referral link & code
    const [adminReferral, setAdminReferral] = useState({ code: '', link: '' });
    const [copiedCode, setCopiedCode] = useState(false);
    const [copiedLink, setCopiedLink] = useState(false);

    const [commissionRate, setCommissionRate] = useState(1);
    const [rateInput, setRateInput] = useState('1');
    const [savingRate, setSavingRate] = useState(false);

    const [stats, setStats] = useState({
        referral_code_owners: 2,
        total_invited: 5,
        total_deposits_formatted: '6,800 EGP',
        total_commission_paid_formatted: '68 EGP',
        sub_agent_requests_count: 0,
    });

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');

    const fetchData = async () => {
        try {
            setRefreshing(true);
            const res = await adminApi.getReferralsOverview({
                search: search.trim() || undefined,
            });

            if (res && res.data) {
                const data = res.data.data || res.data;
                const rate = data.commission_rate ?? 1;
                setCommissionRate(rate);
                setRateInput(rate.toString());
                setStats(data.stats || stats);
                setUsers(data.users || []);
                if (data.admin_referral) {
                    setAdminReferral(data.admin_referral);
                } else if (user?.referral_code) {
                    setAdminReferral({
                        code: user.referral_code,
                        link: `${window.location.origin}/register?ref=${user.referral_code}`,
                    });
                }
            }
        } catch (err) {
            toastError('فشل تحميل بيانات نظام المكافآت والإحالة');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const myCode = adminReferral.code || user?.referral_code || 'EMP_ADMIN';
    const myLink = adminReferral.link || `${window.location.origin}/register?ref=${myCode}`;

    const handleCopyCode = () => {
        navigator.clipboard.writeText(myCode);
        setCopiedCode(true);
        success('تم نسخ كود الإحالة الخاص بك');
        setTimeout(() => setCopiedCode(false), 2500);
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(myLink);
        setCopiedLink(true);
        success('تم نسخ رابط الإحالة الخاص بك بنجاح');
        setTimeout(() => setCopiedLink(false), 2500);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSaveRate = async (e) => {
        e.preventDefault();
        const val = parseFloat(rateInput);
        if (isNaN(val) || val < 0 || val > 100) {
            toastError('يرجى إدخال نسبة صحيحة بين 0 و 100%');
            return;
        }

        try {
            setSavingRate(true);
            await adminApi.updateReferralRate({ commission_rate: val });
            setCommissionRate(val);
            success('تم تحديث نسبة ربح الداعي بنجاح');
            fetchData();
        } catch (err) {
            toastError(err.response?.data?.message || 'فشل حفظ نسبة الربح');
        } finally {
            setSavingRate(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchData();
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
            {/* Header */}
            <AdminHeader
                title="إدارة نظام المكافآت"
                subtitle="أرباح كود الإحالة، نسب العمولة، وعوائد الشركاء"
                badge="المكافآت والعمولات"
                onRefresh={fetchData}
                refreshing={refreshing}
            />

            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 16px' }}>
                {/* ═══ Admin Personal Referral Card ═══ */}
                <div style={{
                    backgroundColor: isLight ? '#FFFFFF' : '#0B1222',
                    border: '1.5px solid rgba(245, 208, 97, 0.4)',
                    borderRadius: '24px',
                    padding: '20px',
                    marginBottom: '20px',
                    boxShadow: '0 8px 30px rgba(245, 208, 97, 0.15)',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '12px',
                        marginBottom: '16px',
                    }}>
                        <div>
                            <span style={{
                                display: 'inline-block',
                                padding: '3px 10px',
                                borderRadius: '9999px',
                                fontSize: '11px',
                                fontWeight: '800',
                                backgroundColor: 'rgba(245, 208, 97, 0.15)',
                                color: '#F5D061',
                                border: '1px solid rgba(245, 208, 97, 0.3)',
                                marginBottom: '6px',
                            }}>
                                رابط وكود الإحالة الخاص بك (حسابك كأدمن)
                            </span>
                            <h3 style={{ margin: 0, fontSize: '17px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                شارك رابطك واكسب العمولات عند تسجيل العملاء الجدد
                            </h3>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate('/referrals')}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '8px 14px',
                                borderRadius: '12px',
                                backgroundColor: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.06)',
                                border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.15)',
                                color: isLight ? '#0F172A' : '#FFFFFF',
                                fontSize: '12.5px',
                                fontWeight: '800',
                                cursor: 'pointer',
                            }}
                        >
                            <span>عرض صفحة الإحالة العامة</span>
                            <ExternalLink size={14} />
                        </button>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '12px',
                    }}>
                        {/* 1. Referral Code Box */}
                        <div style={{
                            backgroundColor: isLight ? '#F8FAFC' : '#040711',
                            border: isLight ? '1px solid #CBD5E1' : '1px solid #1E293B',
                            borderRadius: '16px',
                            padding: '12px 14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '10px',
                        }}>
                            <div>
                                <div style={{ fontSize: '11px', color: isLight ? '#64748B' : '#94A3B8', fontWeight: '700' }}>
                                    كود الإحالة الخاص بك
                                </div>
                                <div style={{ fontSize: '18px', fontWeight: '900', color: '#F5D061', letterSpacing: '1px' }}>
                                    {myCode}
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={handleCopyCode}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '8px 14px',
                                    borderRadius: '10px',
                                    backgroundColor: copiedCode ? '#10B981' : (isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)'),
                                    color: copiedCode ? '#FFFFFF' : (isLight ? '#0F172A' : '#FFFFFF'),
                                    border: 'none',
                                    fontSize: '12px',
                                    fontWeight: '800',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                }}
                            >
                                {copiedCode ? <Check size={14} /> : <Copy size={14} />}
                                <span>{copiedCode ? 'تم النسخ' : 'نسخ الكود'}</span>
                            </button>
                        </div>

                        {/* 2. Referral Link Box */}
                        <div style={{
                            backgroundColor: isLight ? '#F8FAFC' : '#040711',
                            border: isLight ? '1px solid #CBD5E1' : '1px solid #1E293B',
                            borderRadius: '16px',
                            padding: '12px 14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '10px',
                        }}>
                            <div style={{ minWidth: 0, flex: 1 }}>
                                <div style={{ fontSize: '11px', color: isLight ? '#64748B' : '#94A3B8', fontWeight: '700' }}>
                                    رابط التسجيل المباشر
                                </div>
                                <div style={{
                                    fontSize: '12px',
                                    fontFamily: 'monospace',
                                    color: isLight ? '#0F172A' : '#38BDF8',
                                    direction: 'ltr',
                                    textAlign: 'left',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}>
                                    {myLink}
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={handleCopyLink}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '8px 14px',
                                    borderRadius: '10px',
                                    background: copiedLink ? '#10B981' : 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                                    color: '#FFFFFF',
                                    border: 'none',
                                    fontSize: '12px',
                                    fontWeight: '800',
                                    cursor: 'pointer',
                                    flexShrink: 0,
                                    transition: 'all 0.2s',
                                }}
                            >
                                {copiedLink ? <Check size={14} /> : <Copy size={14} />}
                                <span>{copiedLink ? 'تم النسخ' : 'نسخ الرابط'}</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Banner / Tab Switcher (Matching Screenshot 5) */}
                <div style={{
                    backgroundColor: isLight ? '#FFFFFF' : '#0B1222',
                    border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                    borderRadius: '24px',
                    padding: '20px',
                    marginBottom: '20px',
                    boxShadow: isLight ? '0 4px 20px rgba(0,0,0,0.03)' : '0 10px 30px rgba(0,0,0,0.4)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <div style={{ fontSize: '18px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                            إدارة نظام المكافآت
                        </div>
                        <div style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '12px',
                            backgroundColor: 'rgba(245, 158, 11, 0.15)',
                            color: '#F59E0B',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Gift size={20} />
                        </div>
                    </div>

                    {/* Tabs matching Screenshot 5 */}
                    <div style={{
                        display: 'flex',
                        gap: '10px',
                        padding: '6px',
                        backgroundColor: isLight ? '#F1F5F9' : '#040711',
                        borderRadius: '16px',
                        border: isLight ? '1px solid #CBD5E1' : '1px solid #1E293B',
                    }}>
                        <button
                            onClick={() => setActiveTab('referrals')}
                            style={{
                                flex: 1,
                                padding: '10px 16px',
                                borderRadius: '12px',
                                fontSize: '14px',
                                fontWeight: '900',
                                border: 'none',
                                cursor: 'pointer',
                                background: activeTab === 'referrals'
                                    ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)'
                                    : 'transparent',
                                color: activeTab === 'referrals' ? '#FFFFFF' : (isLight ? '#64748B' : '#94A3B8'),
                                transition: 'all 0.2s ease',
                            }}
                        >
                            أرباح كود الإحالة
                        </button>

                        <button
                            onClick={() => setActiveTab('sub_agents')}
                            style={{
                                flex: 1,
                                padding: '10px 16px',
                                borderRadius: '12px',
                                fontSize: '14px',
                                fontWeight: '800',
                                border: 'none',
                                cursor: 'pointer',
                                background: activeTab === 'sub_agents'
                                    ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)'
                                    : 'transparent',
                                color: activeTab === 'sub_agents' ? '#FFFFFF' : (isLight ? '#64748B' : '#94A3B8'),
                                transition: 'all 0.2s ease',
                            }}
                        >
                            طلبات الوكلاء الفرعيين [{stats.sub_agent_requests_count}]
                        </button>
                    </div>
                </div>

                {activeTab === 'referrals' && (
                    <>
                        {/* Commission Rate Settings Card (Matching Screenshot 5) */}
                        <div style={{
                            backgroundColor: isLight ? '#FFFFFF' : '#0B1222',
                            border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                            borderRadius: '24px',
                            padding: '24px 20px',
                            marginBottom: '20px',
                            boxShadow: isLight ? '0 4px 20px rgba(0,0,0,0.03)' : '0 10px 30px rgba(0,0,0,0.4)',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '20px' }}>
                                <div>
                                    <div style={{ fontSize: '18px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF', marginBottom: '4px' }}>
                                        نسبة ربح الداعي
                                    </div>
                                    <p style={{ margin: 0, fontSize: '13px', color: isLight ? '#64748B' : '#94A3B8' }}>
                                        النسبة التي يحصل عليها صاحب كود الإحالة من إيداعات المدعوين.
                                    </p>
                                </div>

                                <div style={{
                                    width: '42px',
                                    height: '42px',
                                    borderRadius: '12px',
                                    backgroundColor: 'rgba(16, 185, 129, 0.12)',
                                    color: '#10B981',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Percent size={20} />
                                </div>
                            </div>

                            {/* Rate Input & Save Button */}
                            <form onSubmit={handleSaveRate} style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexWrap: 'wrap',
                                gap: '12px',
                                marginBottom: '20px',
                            }}>
                                <div style={{ fontSize: '13px', fontWeight: '800', color: isLight ? '#334155' : '#CBD5E1' }}>
                                    النسبة الحالية
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        backgroundColor: isLight ? '#F8FAFC' : '#040711',
                                        border: isLight ? '1px solid #CBD5E1' : '1px solid #1E293B',
                                        borderRadius: '12px',
                                        padding: '6px 14px',
                                        width: '100px',
                                    }}>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="100"
                                            value={rateInput}
                                            onChange={(e) => setRateInput(e.target.value)}
                                            style={{
                                                width: '100%',
                                                border: 'none',
                                                outline: 'none',
                                                backgroundColor: 'transparent',
                                                color: isLight ? '#0F172A' : '#FFFFFF',
                                                fontSize: '18px',
                                                fontWeight: '900',
                                                textAlign: 'center',
                                            }}
                                        />
                                        <span style={{ fontSize: '14px', fontWeight: '800', color: '#38BDF8' }}>%</span>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={savingRate}
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            padding: '9px 18px',
                                            borderRadius: '12px',
                                            backgroundColor: '#10B981',
                                            color: '#FFFFFF',
                                            fontWeight: '800',
                                            fontSize: '13px',
                                            border: 'none',
                                            cursor: savingRate ? 'not-allowed' : 'pointer',
                                            boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)',
                                        }}
                                    >
                                        <Save size={15} />
                                        {savingRate ? 'حفظ...' : 'حفظ'}
                                    </button>
                                </div>
                            </form>

                            {/* 2 Calculation Examples matching Screenshot 5 */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '12px',
                                backgroundColor: isLight ? '#F8FAFC' : '#040711',
                                border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                                borderRadius: '16px',
                                padding: '14px',
                            }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '700', marginBottom: '2px' }}>
                                        EGP 100
                                    </div>
                                    <div style={{ fontSize: '15px', fontWeight: '900', color: '#10B981' }}>
                                        +{((100 * commissionRate) / 100).toFixed(0)} EGP
                                    </div>
                                </div>

                                <div style={{ textAlign: 'center', borderRight: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B' }}>
                                    <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '700', marginBottom: '2px' }}>
                                        EGP 5,000
                                    </div>
                                    <div style={{ fontSize: '15px', fontWeight: '900', color: '#10B981' }}>
                                        +{((5000 * commissionRate) / 100).toFixed(0)} EGP
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 4 Stat Badges / Metrics (Matching Screenshot 5) */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                            gap: '12px',
                            marginBottom: '20px',
                        }}>
                            {/* 1. أصحاب أكواد الإحالة */}
                            <div style={{
                                backgroundColor: isLight ? '#EFF6FF' : '#0B1528',
                                border: isLight ? '1px solid #BFDBFE' : '1px solid #1E2E4A',
                                borderRadius: '20px',
                                padding: '16px',
                                textAlign: 'center',
                            }}>
                                <div style={{ fontSize: '12px', color: isLight ? '#475569' : '#94A3B8', fontWeight: '700', marginBottom: '4px' }}>
                                    أصحاب أكواد الإحالة
                                </div>
                                <div style={{ fontSize: '24px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                    {stats.referral_code_owners}
                                </div>
                            </div>

                            {/* 2. إجمالي المدعوين */}
                            <div style={{
                                backgroundColor: isLight ? '#EFF6FF' : '#0B1528',
                                border: isLight ? '1px solid #BFDBFE' : '1px solid #1E2E4A',
                                borderRadius: '20px',
                                padding: '16px',
                                textAlign: 'center',
                            }}>
                                <div style={{ fontSize: '12px', color: isLight ? '#475569' : '#94A3B8', fontWeight: '700', marginBottom: '4px' }}>
                                    إجمالي المدعوين
                                </div>
                                <div style={{ fontSize: '24px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                    {stats.total_invited}
                                </div>
                            </div>

                            {/* 3. إيداعات المدعوين */}
                            <div style={{
                                backgroundColor: isLight ? '#EFF6FF' : '#0B1528',
                                border: isLight ? '1px solid #BFDBFE' : '1px solid #1E2E4A',
                                borderRadius: '20px',
                                padding: '16px',
                                textAlign: 'center',
                            }}>
                                <div style={{ fontSize: '12px', color: isLight ? '#475569' : '#94A3B8', fontWeight: '700', marginBottom: '4px' }}>
                                    إيداعات المدعوين
                                </div>
                                <div style={{ fontSize: '20px', fontWeight: '900', color: '#10B981' }}>
                                    {stats.total_deposits_formatted}
                                </div>
                            </div>

                            {/* 4. إجمالي الأرباح الموزعة */}
                            <div style={{
                                backgroundColor: isLight ? '#EFF6FF' : '#0B1528',
                                border: isLight ? '1px solid #BFDBFE' : '1px solid #1E2E4A',
                                borderRadius: '20px',
                                padding: '16px',
                                textAlign: 'center',
                            }}>
                                <div style={{ fontSize: '12px', color: isLight ? '#475569' : '#94A3B8', fontWeight: '700', marginBottom: '4px' }}>
                                    إجمالي الأرباح الموزعة
                                </div>
                                <div style={{ fontSize: '20px', fontWeight: '900', color: '#F59E0B' }}>
                                    {stats.total_commission_paid_formatted}
                                </div>
                            </div>
                        </div>

                        {/* User Earnings Details Section (Matching Screenshot 5) */}
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
                                marginBottom: '20px',
                            }}>
                                <div>
                                    <h2 style={{ fontSize: '18px', fontWeight: '900', margin: 0, color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                        تفاصيل أرباح المستخدمين
                                    </h2>
                                    <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '2px' }}>
                                        {users.length} مستخدم
                                    </div>
                                </div>

                                {/* Search Bar matching Screenshot 5 */}
                                <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        backgroundColor: isLight ? '#F8FAFC' : '#040711',
                                        border: isLight ? '1px solid #CBD5E1' : '1px solid #1E293B',
                                        borderRadius: '9999px',
                                        padding: '6px 14px',
                                    }}>
                                        <Search size={14} color="#94A3B8" />
                                        <input
                                            type="text"
                                            placeholder="ابحث بالاسم..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            style={{
                                                border: 'none',
                                                outline: 'none',
                                                backgroundColor: 'transparent',
                                                color: isLight ? '#0F172A' : '#FFFFFF',
                                                fontSize: '12px',
                                                width: '120px',
                                            }}
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        style={{
                                            padding: '6px 14px',
                                            borderRadius: '9999px',
                                            backgroundColor: isLight ? '#0F172A' : '#1E293B',
                                            color: '#FFFFFF',
                                            fontSize: '12px',
                                            fontWeight: '800',
                                            border: 'none',
                                        }}
                                    >
                                        الكل
                                    </button>
                                </form>
                            </div>

                            {/* User Cards List matching Screenshot 5 */}
                            {loading ? (
                                <div style={{ padding: '60px 20px', textAlign: 'center', color: '#94A3B8' }}>
                                    <RefreshCw size={32} className="animate-spin" style={{ margin: '0 auto 12px auto', color: '#D4A537' }} />
                                    <div>جاري تحميل تفاصيل أرباح المستخدمين...</div>
                                </div>
                            ) : users.length === 0 ? (
                                <div style={{ padding: '60px 20px', textAlign: 'center', color: '#94A3B8' }}>
                                    <Users size={40} style={{ margin: '0 auto 12px auto', opacity: 0.5 }} />
                                    <div style={{ fontWeight: '700' }}>لا توجد بيانات أرباح مسجلة حالياً</div>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                    {users.map((u) => (
                                        <div
                                            key={u.id}
                                            style={{
                                                backgroundColor: isLight ? '#F8FAFC' : '#0F172A',
                                                border: isLight ? '1px solid #CBD5E1' : '1px solid #1E293B',
                                                borderRadius: '20px',
                                                padding: '18px 20px',
                                            }}
                                        >
                                            {/* Top Row: User Avatar, Name, Badge, Email, Eye button */}
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                marginBottom: '16px',
                                            }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                    <div style={{
                                                        width: '42px',
                                                        height: '42px',
                                                        borderRadius: '50%',
                                                        backgroundColor: 'rgba(245, 158, 11, 0.15)',
                                                        color: '#F59E0B',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontWeight: '900',
                                                        fontSize: '16px',
                                                        flexShrink: 0,
                                                    }}>
                                                        {u.name.charAt(0)}
                                                    </div>

                                                    <div>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                            <span style={{ fontSize: '16px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                                                {u.name}
                                                            </span>
                                                            <span style={{
                                                                padding: '2px 8px',
                                                                borderRadius: '6px',
                                                                fontSize: '11px',
                                                                fontWeight: '800',
                                                                backgroundColor: 'rgba(245, 158, 11, 0.15)',
                                                                color: '#F59E0B',
                                                            }}>
                                                                {u.badge}
                                                            </span>
                                                        </div>
                                                        <div style={{ fontSize: '12px', color: '#94A3B8' }}>
                                                            {u.email}
                                                        </div>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => navigate(`/admin/users/${u.id}/ledger`)}
                                                    title="عرض تفاصيل حركة الرصيد"
                                                    style={{
                                                        width: '36px',
                                                        height: '36px',
                                                        borderRadius: '50%',
                                                        backgroundColor: isLight ? '#EFF6FF' : 'rgba(56, 189, 248, 0.12)',
                                                        border: '1px solid rgba(56, 189, 248, 0.3)',
                                                        color: '#38BDF8',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    <Eye size={16} />
                                                </button>
                                            </div>

                                            {/* Bottom Row: Profit Stats & Referred Users Avatars matching Screenshot 5 */}
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                flexWrap: 'wrap',
                                                gap: '12px',
                                                backgroundColor: isLight ? '#FFFFFF' : '#040711',
                                                border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                                                borderRadius: '14px',
                                                padding: '12px 16px',
                                            }}>
                                                {/* Left side: Referred Users avatars group */}
                                                <div>
                                                    <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '700', marginBottom: '4px' }}>
                                                        المدعوون ({u.invited_count})
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        {u.invited_users && u.invited_users.length > 0 ? (
                                                            u.invited_users.slice(0, 4).map((inv, idx) => (
                                                                <div
                                                                    key={inv.id}
                                                                    title={inv.name}
                                                                    style={{
                                                                        width: '26px',
                                                                        height: '26px',
                                                                        borderRadius: '50%',
                                                                        backgroundColor: 'rgba(56, 189, 248, 0.2)',
                                                                        border: '2px solid #0B1222',
                                                                        color: '#38BDF8',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        fontSize: '10px',
                                                                        fontWeight: '800',
                                                                        marginRight: idx > 0 ? '-8px' : '0',
                                                                    }}
                                                                >
                                                                    {inv.name.charAt(0)}
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <span style={{ fontSize: '12px', color: '#64748B' }}>لا يوجد مدعوون</span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Middle: Available for Withdrawal */}
                                                <div>
                                                    <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '700', marginBottom: '2px' }}>
                                                        متاح للسحب
                                                    </div>
                                                    <div style={{ fontSize: '16px', fontWeight: '900', color: '#F59E0B' }}>
                                                        {u.available_formatted}
                                                    </div>
                                                    <div style={{ fontSize: '10px', color: '#64748B' }}>
                                                        تم سحب {u.withdrawn}
                                                    </div>
                                                </div>

                                                {/* Right: Total Profit */}
                                                <div style={{ textAlign: 'left' }}>
                                                    <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '700', marginBottom: '2px' }}>
                                                        إجمالي الربح
                                                    </div>
                                                    <div style={{ fontSize: '16px', fontWeight: '900', color: '#10B981', direction: 'ltr' }}>
                                                        {u.total_profit_formatted}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}

                {/* Tab 2: Sub Agents Requests */}
                {activeTab === 'sub_agents' && (
                    <div style={{
                        backgroundColor: isLight ? '#FFFFFF' : '#0B1222',
                        border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                        borderRadius: '24px',
                        padding: '60px 20px',
                        textAlign: 'center',
                        color: '#94A3B8',
                    }}>
                        <Users size={44} style={{ margin: '0 auto 12px auto', opacity: 0.5 }} />
                        <div style={{ fontWeight: '800', fontSize: '16px' }}>لا توجد طلبات وكلاء فرعيين معلقة</div>
                        <div style={{ fontSize: '13px', marginTop: '6px' }}>سيتم إشعارك فور تقديم أي عميل طلباً للترقية إلى وكيل فرعي.</div>
                    </div>
                )}
            </div>
        </div>
    );
}

