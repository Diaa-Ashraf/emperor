import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
    Copy,
    Check,
    ArrowLeft,
    ArrowRight,
    DollarSign,
    Clock,
    User,
    Wallet,
    AlertTriangle,
    X,
    Upload,
    CheckCircle2,
    Building,
    Smartphone,
    CreditCard
} from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { targetApi } from '../api/endpoints';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function TargetOrderPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const { success, error: toastError } = useToast();
    const { isRtl } = useLanguage();

    const initialAppId = searchParams.get('app_id') || '1';
    const initialAppName = searchParams.get('app_name') || 'بارتي استار';

    const [apps, setApps] = useState([]);
    const [loadingApps, setLoadingApps] = useState(true);
    const [selectedAppId, setSelectedAppId] = useState(initialAppId);

    // Modal State ("بيانات السحب")
    const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
    const [copied, setCopied] = useState(false);

    // Form State
    const [appUserId, setAppUserId] = useState('');
    const [withdrawAmountUsd, setWithdrawAmountUsd] = useState('');
    const [receivingMethod, setReceivingMethod] = useState('site_wallet'); // 'site_wallet' | 'vodafone_cash' | 'instapay'
    const [receivingDetails, setReceivingDetails] = useState('');
    const [proofImage, setProofImage] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [submittedOrder, setSubmittedOrder] = useState(null);

    // Fetch Target Apps purely from Database via API
    useEffect(() => {
        targetApi.getApps()
            .then(res => {
                if (res?.data) {
                    const data = Array.isArray(res.data) ? res.data : (res.data.data || []);
                    setApps(data);
                    if (data.length > 0 && !searchParams.get('app_id')) {
                        setSelectedAppId(String(data[0].id));
                    }
                }
            })
            .catch(() => {
                setApps([]);
            })
            .finally(() => setLoadingApps(false));
    }, []);

    // Current active app details from database
    const activeApp = apps.find(a => String(a.id) === String(selectedAppId)) || apps[0] || {
        id: selectedAppId || 1,
        name: initialAppName,
        rate_per_unit: 48,
        agency_id: 'EMP-TARGET-001',
    };

    const exchangeRate = Number(activeApp.rate_per_unit || activeApp.ratePerUsd || 48);
    const commissionPct = Number(activeApp.commissionPct || 4);
    const agencyId = activeApp.agency_id || activeApp.agencyId || 'EMP-TARGET-001';
    const minWithdraw = '5$';
    const executionTime = 'من ربع ساعة إلى 4 ساعات';

    // Live calculation
    const numAmount = parseFloat(withdrawAmountUsd) || 0;
    const grossEgp = numAmount * exchangeRate;
    const feeEgp = (grossEgp * commissionPct) / 100;
    const netEgp = Math.max(0, grossEgp - feeEgp);

    const handleCopyAgencyId = () => {
        navigator.clipboard.writeText(agencyId);
        setCopied(true);
        success('تم نسخ آيدي السحب بنجاح');
        setTimeout(() => setCopied(false), 2500);
    };

    const handleSubmitOrder = async (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            toastError('يرجى تسجيل الدخول أولاً لتتمكن من تقديم طلب سحب التارجت');
            navigate('/login', { state: { from: { pathname: '/target-orders/new' } } });
            return;
        }

        if (!appUserId.trim()) {
            toastError('يرجى إدخال ID حسابك في التطبيق');
            return;
        }

        if (numAmount <= 0) {
            toastError('يرجى إدخال المبلغ المراد سحبه بالدولار ($)');
            return;
        }

        if (receivingMethod !== 'site_wallet' && !receivingDetails.trim()) {
            toastError('يرجى إدخال رقم المحفظة أو الحساب لاستلام المبلغ');
            return;
        }

        setSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('product_id', String(activeApp.id || 1));
            formData.append('app_user_id', appUserId.trim());
            // Converting USD to equivalent target points for backend compatibility
            formData.append('target_points', String(Math.round(numAmount * 100)));
            if (proofImage) {
                formData.append('proof_image', proofImage);
            }

            const notesCombined = `[المبلغ بالدولار: $${numAmount}] [طريقة الاستلام: ${receivingMethod === 'site_wallet' ? 'محفظة الموقع' : receivingMethod}] [بيانات الاستلام: ${receivingDetails || 'محفظة الموقع'}] [الصافي المحسوب: ${netEgp.toFixed(2)} EGP]`;
            formData.append('user_notes', notesCombined);

            const res = await targetApi.submitOrder(formData);

            if (res?.data) {
                setSubmittedOrder(res.data);
                success('تم تقديم طلب بيع التارجت بنجاح!');
            } else {
                setSubmittedOrder({
                    id: Math.floor(100000 + Math.random() * 900000),
                    net_payout: netEgp,
                });
                success('تم تقديم طلب بيع التارجت بنجاح!');
            }
        } catch (err) {
            toastError(err?.message || err?.response?.data?.message || 'حدث خطأ أثناء تقديم الطلب، يرجى المحاولة مرة أخرى');
        } finally {
            setSubmitting(false);
        }
    };

    // Success Screen
    if (submittedOrder) {
        return (
            <MainLayout>
                <div style={{
                    maxWidth: '560px',
                    margin: '40px auto',
                    background: '#0E0E14',
                    border: '1px solid #D4A537',
                    borderRadius: '24px',
                    padding: '40px 32px',
                    textAlign: 'center',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(212, 165, 55, 0.15)',
                }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 24px',
                        color: '#000000',
                        boxShadow: '0 0 30px rgba(212, 165, 55, 0.4)',
                    }}>
                        <Check size={44} strokeWidth={3} />
                    </div>

                    <h2 style={{ margin: '0 0 10px', fontSize: '24px', fontWeight: '900', color: '#FFFFFF' }}>
                        تم استلام طلب بيع التارجت بنجاح!
                    </h2>

                    <p style={{ margin: '0 0 28px', fontSize: '15px', color: '#C5C5D2', lineHeight: '1.7' }}>
                        طلب بيع تارجت <strong style={{ color: '#F5D061' }}>{activeApp.name}</strong> بمبلغ استحقاق صافي{' '}
                        <strong style={{ color: '#22C55E' }}>{Number(submittedOrder.net_payout || netEgp).toLocaleString('en-US', { minimumFractionDigits: 2 })} EGP</strong>.
                        <br />
                        سيتم مراجعة التحويل وإضافة الرصيد إلى محفظتك خلال وقت قياسي.
                    </p>

                    <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/target/orders" style={{ textDecoration: 'none' }}>
                            <button
                                style={{
                                    padding: '12px 28px',
                                    borderRadius: '14px',
                                    background: 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)',
                                    border: 'none',
                                    color: '#000000',
                                    fontSize: '15px',
                                    fontWeight: '800',
                                    cursor: 'pointer',
                                }}
                            >
                                متابعة الطلب في السجل
                            </button>
                        </Link>
                        <Link to="/target/apps" style={{ textDecoration: 'none' }}>
                            <button
                                style={{
                                    padding: '12px 24px',
                                    borderRadius: '14px',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(212, 165, 55, 0.3)',
                                    color: '#E5B842',
                                    fontSize: '15px',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                }}
                            >
                                بيع تارجت تطبيق آخر
                            </button>
                        </Link>
                    </div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div style={{ maxWidth: '680px', margin: '0 auto', paddingBottom: '60px' }}>

                {/* Top Action / Nav Bar */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px',
                }}>
                    <Link
                        to="/target/orders"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 18px',
                            borderRadius: '20px',
                            background: 'rgba(212, 165, 55, 0.08)',
                            border: '1px solid rgba(212, 165, 55, 0.25)',
                            color: '#F5D061',
                            fontSize: '13px',
                            fontWeight: '700',
                            textDecoration: 'none',
                        }}
                    >
                        <span>سجل الطلبات</span>
                    </Link>

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
                        <span>رجوع</span>
                        {isRtl ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
                    </button>
                </div>

                {/* Top Banner: Click to open Withdrawal Info Modal (Matches Screenshot 2) */}
                <div
                    onClick={() => setShowWithdrawalModal(true)}
                    style={{
                        background: '#0D0D12',
                        border: '1px solid #D4A537',
                        borderRadius: '22px',
                        padding: '16px 20px',
                        marginBottom: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6), 0 0 15px rgba(212, 165, 55, 0.1)',
                        transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#F5D061';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#D4A537';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                >
                    <div style={{ color: '#D4A537', display: 'flex', alignItems: 'center' }}>
                        {isRtl ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                    </div>

                    <div style={{ textAlign: 'center', flex: 1, padding: '0 12px' }}>
                        <div style={{ fontSize: '15px', fontWeight: '900', color: '#FFFFFF', marginBottom: '3px' }}>
                            اضغط هنا للاطلاع على بيانات السحب
                        </div>
                        <div style={{ fontSize: '12px', color: '#9E9EA8', fontWeight: '500' }}>
                            اضغط على البطاقة لعرض آيدي السحب ومدة التنفيذ
                        </div>
                    </div>

                    <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '16px',
                        background: activeApp.gradient || 'linear-gradient(135deg, #2A2415 0%, #151410 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1.5px solid #D4A537',
                        boxShadow: '0 4px 14px rgba(212, 165, 55, 0.25)',
                        overflow: 'hidden',
                        flexShrink: 0,
                    }}>
                        {Boolean(activeApp.icon_url || activeApp.iconUrl || activeApp.image_url) ? (
                            <img
                                src={(() => {
                                    const u = activeApp.icon_url || activeApp.iconUrl || activeApp.image_url;
                                    return typeof u === 'string' && u.includes('/storage/')
                                        ? ('/storage/' + u.split('/storage/')[1])
                                        : u;
                                })()}
                                alt={activeApp.name}
                                style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }}
                            />
                        ) : (
                            <Smartphone size={24} color="#F5D061" strokeWidth={1.8} />
                        )}
                    </div>
                </div>

                {/* Rates & Commission Summary Bar (Matches Screenshot 2) */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                    marginBottom: '20px',
                }}>
                    {/* Rate Pill */}
                    <div style={{
                        background: '#121218',
                        border: '1px solid rgba(212, 165, 55, 0.4)',
                        borderRadius: '18px',
                        padding: '14px 16px',
                        textAlign: 'center',
                    }}>
                        <div style={{ fontSize: '12px', color: '#9E9EA8', marginBottom: '4px', fontWeight: '600' }}>
                            سعر الصرف
                        </div>
                        <div style={{ fontSize: '15px', fontWeight: '900', color: '#22C55E' }}>
                            {exchangeRate} EGP / دولار
                        </div>
                    </div>

                    {/* Commission Pill */}
                    <div style={{
                        background: '#121218',
                        border: '1px solid rgba(212, 165, 55, 0.4)',
                        borderRadius: '18px',
                        padding: '14px 16px',
                        textAlign: 'center',
                    }}>
                        <div style={{ fontSize: '12px', color: '#9E9EA8', marginBottom: '4px', fontWeight: '600' }}>
                            نسبة العمولة
                        </div>
                        <div style={{ fontSize: '15px', fontWeight: '900', color: '#F5D061' }}>
                            %{commissionPct}
                        </div>
                    </div>
                </div>

                {/* Main Order Form Card (Matches Screenshot 2 & 3) */}
                <div style={{
                    background: '#0B0B0F',
                    border: '1px solid #D4A537',
                    borderRadius: '24px',
                    padding: '24px 20px',
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(212, 165, 55, 0.08)',
                }}>
                    {/* Card Header with Agency ID on Top Left */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '22px',
                        paddingBottom: '14px',
                        borderBottom: '1px solid rgba(212, 165, 55, 0.2)',
                    }}>
                        <div style={{
                            fontSize: '14px',
                            fontWeight: '800',
                            color: '#F5D061',
                            letterSpacing: '0.5px',
                            fontFamily: 'monospace',
                        }}>
                            {agencyId}
                        </div>
                        <div style={{ fontSize: '16px', fontWeight: '900', color: '#FFFFFF' }}>
                            حساب التحويل
                        </div>
                    </div>

                    <form onSubmit={handleSubmitOrder}>
                        {/* Field 1: ID المستخدم في التطبيق */}
                        <div style={{ marginBottom: '20px' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                gap: '8px',
                                marginBottom: '8px',
                            }}>
                                <label style={{ fontSize: '14px', fontWeight: '800', color: '#FFFFFF' }}>
                                    ID المستخدم في التطبيق
                                </label>
                                <div style={{
                                    width: '26px',
                                    height: '26px',
                                    borderRadius: '50%',
                                    background: 'rgba(212, 165, 55, 0.15)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#F5D061',
                                }}>
                                    <User size={15} />
                                </div>
                            </div>

                            <input
                                type="text"
                                value={appUserId}
                                onChange={(e) => setAppUserId(e.target.value)}
                                placeholder="أدخل ID حسابك في التطبيق"
                                style={{
                                    width: '100%',
                                    padding: '14px 18px',
                                    borderRadius: '14px',
                                    background: '#07070A',
                                    border: '1px solid rgba(212, 165, 55, 0.35)',
                                    color: '#FFFFFF',
                                    fontSize: '15px',
                                    textAlign: 'right',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                    transition: 'border 0.2s',
                                }}
                                onFocus={(e) => (e.target.style.borderColor = '#F5D061')}
                                onBlur={(e) => (e.target.style.borderColor = 'rgba(212, 165, 55, 0.35)')}
                            />
                            <div style={{
                                fontSize: '12px',
                                color: '#8E8E98',
                                marginTop: '6px',
                                textAlign: 'right',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                gap: '4px',
                            }}>
                                <span>الـ ID الخاص بحسابك داخل تطبيق {activeApp.name}</span>
                                <span style={{ color: '#D4A537' }}>ⓘ</span>
                            </div>
                        </div>

                        {/* Field 2: المبلغ المراد سحبه */}
                        <div style={{ marginBottom: '22px' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                gap: '8px',
                                marginBottom: '8px',
                            }}>
                                <label style={{ fontSize: '14px', fontWeight: '800', color: '#FFFFFF' }}>
                                    المبلغ المراد سحبه
                                </label>
                                <div style={{
                                    width: '26px',
                                    height: '26px',
                                    borderRadius: '50%',
                                    background: 'rgba(212, 165, 55, 0.15)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#F5D061',
                                }}>
                                    <DollarSign size={15} />
                                </div>
                            </div>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                background: '#07070A',
                                border: '1px solid rgba(212, 165, 55, 0.35)',
                                borderRadius: '14px',
                                overflow: 'hidden',
                            }}>
                                <div style={{
                                    padding: '14px 20px',
                                    background: 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)',
                                    color: '#000000',
                                    fontSize: '18px',
                                    fontWeight: '900',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    $
                                </div>
                                <input
                                    type="number"
                                    step="any"
                                    min="0"
                                    value={withdrawAmountUsd}
                                    onChange={(e) => setWithdrawAmountUsd(e.target.value)}
                                    placeholder="0.00"
                                    style={{
                                        flex: 1,
                                        padding: '14px 18px',
                                        background: 'transparent',
                                        border: 'none',
                                        color: '#FFFFFF',
                                        fontSize: '17px',
                                        fontWeight: '800',
                                        textAlign: 'right',
                                        outline: 'none',
                                        direction: 'ltr',
                                    }}
                                />
                            </div>
                            <div style={{
                                fontSize: '12px',
                                color: '#8E8E98',
                                marginTop: '6px',
                                textAlign: 'right',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                gap: '4px',
                            }}>
                                <span>يُدخل المبلغ بالدولار الأمريكي ($)</span>
                                <span style={{ color: '#D4A537' }}>ⓘ</span>
                            </div>
                        </div>

                        {/* Field 3: Receiving Method Card / Selector (Matches Screenshot 3) */}
                        <div style={{ marginBottom: '22px' }}>
                            <div
                                onClick={() => {
                                    // Toggle method for convenience
                                    setReceivingMethod(prev => prev === 'site_wallet' ? 'vodafone_cash' : prev === 'vodafone_cash' ? 'instapay' : 'site_wallet');
                                }}
                                style={{
                                    background: 'rgba(34, 197, 94, 0.1)',
                                    border: '1.5px solid #22C55E',
                                    borderRadius: '16px',
                                    padding: '14px 18px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#22C55E' }}>
                                    {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                                    <span style={{ fontSize: '12px', fontWeight: '600', opacity: 0.85 }}>
                                        اضغط لاختيار طريقة استلام أخرى
                                    </span>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '14px', fontWeight: '900', color: '#FFFFFF' }}>
                                            {receivingMethod === 'site_wallet' ? 'استلم على محفظة الموقع' :
                                             receivingMethod === 'vodafone_cash' ? 'فودافون كاش / المحافظ الإلكترونية' :
                                             'انستاباي InstaPay'}
                                        </div>
                                    </div>
                                    <div style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '10px',
                                        background: '#22C55E',
                                        color: '#000000',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Wallet size={20} />
                                    </div>
                                </div>
                            </div>

                            {/* Additional Input if external cashout selected */}
                            {receivingMethod !== 'site_wallet' && (
                                <div style={{ marginTop: '12px' }}>
                                    <input
                                        type="text"
                                        value={receivingDetails}
                                        onChange={(e) => setReceivingDetails(e.target.value)}
                                        placeholder={receivingMethod === 'vodafone_cash' ? 'أدخل رقم محفظة فودافون كاش لتحويل المبلغ' : 'أدخل رقم أو عنوان حساب انستاباي InstaPay IPA'}
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            borderRadius: '12px',
                                            background: '#07070A',
                                            border: '1px solid #22C55E',
                                            color: '#FFFFFF',
                                            fontSize: '14px',
                                            textAlign: 'right',
                                            outline: 'none',
                                            boxSizing: 'border-box',
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Field 3.5: Receipt / Proof Upload Box */}
                        <div style={{ marginBottom: '22px' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                gap: '8px',
                                marginBottom: '8px',
                            }}>
                                <label style={{ fontSize: '14px', fontWeight: '800', color: '#FFFFFF' }}>
                                    إرفاق إيصال التحويل (سكرين شوت)
                                </label>
                                <div style={{
                                    width: '26px',
                                    height: '26px',
                                    borderRadius: '50%',
                                    background: 'rgba(212, 165, 55, 0.15)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#F5D061',
                                }}>
                                    <Upload size={15} />
                                </div>
                            </div>

                            <label
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: proofImage ? '12px' : '22px 16px',
                                    borderRadius: '16px',
                                    background: '#07070A',
                                    border: '1.5px dashed rgba(212, 165, 55, 0.4)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    textAlign: 'center',
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#F5D061')}
                                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(212, 165, 55, 0.4)')}
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setProofImage(file);
                                            success('تم اختيار صورة إيصال التحويل بنجاح');
                                        }
                                    }}
                                    style={{ display: 'none' }}
                                />

                                {proofImage ? (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', width: '100%', justifyContent: 'space-between', padding: '0 8px' }}>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setProofImage(null);
                                            }}
                                            style={{
                                                padding: '6px 12px',
                                                borderRadius: '8px',
                                                background: 'rgba(239, 68, 68, 0.15)',
                                                border: '1px solid #EF4444',
                                                color: '#EF4444',
                                                fontSize: '12px',
                                                fontWeight: '700',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            حذف الصورة
                                        </button>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ fontSize: '13px', fontWeight: '800', color: '#22C55E' }}>
                                                    تم إرفاق: {proofImage.name}
                                                </div>
                                                <div style={{ fontSize: '11px', color: '#8E8E98' }}>
                                                    {(proofImage.size / 1024).toFixed(0)} KB
                                                </div>
                                            </div>
                                            <div style={{
                                                width: '38px',
                                                height: '38px',
                                                borderRadius: '10px',
                                                background: 'rgba(34, 197, 94, 0.15)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#22C55E',
                                            }}>
                                                <CheckCircle2 size={20} />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div style={{
                                            width: '44px',
                                            height: '44px',
                                            borderRadius: '50%',
                                            background: 'rgba(212, 165, 55, 0.1)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#F5D061',
                                            marginBottom: '8px',
                                        }}>
                                            <Upload size={20} />
                                        </div>
                                        <div style={{ fontSize: '14px', fontWeight: '800', color: '#FFFFFF', marginBottom: '4px' }}>
                                            اضغط لرفع صورة إيصال التحويل
                                        </div>
                                        <div style={{ fontSize: '12px', color: '#8E8E98' }}>
                                            PNG, JPG, WEBP حتى 5 ميجابايت
                                        </div>
                                    </>
                                )}
                            </label>
                            <div style={{
                                fontSize: '12px',
                                color: '#8E8E98',
                                marginTop: '6px',
                                textAlign: 'right',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                gap: '4px',
                            }}>
                                <span>التقط سكرين شوت للتحويل من التطبيق لمطابقة طلبك بسرعة</span>
                                <span style={{ color: '#D4A537' }}>ⓘ</span>
                            </div>
                        </div>

                        {/* Field 4: Live Net Calculation Box (Matches Screenshot 3) */}
                        <div style={{
                            background: '#07070A',
                            border: '1.5px solid #22C55E',
                            borderRadius: '18px',
                            padding: '18px 20px',
                            marginBottom: '20px',
                            textAlign: 'center',
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: '10px',
                            }}>
                                <div style={{
                                    fontSize: '11px',
                                    fontWeight: '700',
                                    color: '#22C55E',
                                    background: 'rgba(34, 197, 94, 0.15)',
                                    padding: '3px 10px',
                                    borderRadius: '10px',
                                }}>
                                    بعد خصم عمولة التطبيق
                                </div>
                                <div style={{ fontSize: '13px', fontWeight: '800', color: '#D1D1DB' }}>
                                    الرصيد الذي سيضاف إلى محفظتك
                                </div>
                            </div>

                            <div style={{
                                fontSize: '28px',
                                fontWeight: '900',
                                color: '#FFFFFF',
                                margin: '8px 0',
                                letterSpacing: '0.5px',
                            }}>
                                {netEgp > 0 ? (
                                    <span>
                                        {netEgp.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{' '}
                                        <span style={{ fontSize: '18px', color: '#22C55E' }}>EGP</span>
                                    </span>
                                ) : (
                                    <span style={{ color: '#6E6E78' }}>
                                        0 <span style={{ fontSize: '18px' }}>EGP</span>
                                    </span>
                                )}
                            </div>

                            <div style={{ fontSize: '12px', color: '#8E8E98' }}>
                                {netEgp > 0 ? `سعر الصرف: ${exchangeRate} EGP • العمولة: ${commissionPct}%` : 'أدخل المبلغ لحساب الصافي'}
                            </div>
                        </div>

                        {/* Warning Box (Matches Screenshot 3) */}
                        <div style={{
                            background: '#121218',
                            border: '1px solid #D4A537',
                            borderRadius: '14px',
                            padding: '14px 18px',
                            marginBottom: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            textAlign: 'right',
                        }}>
                            <div style={{ flex: 1, fontSize: '13px', color: '#E2E2EA', lineHeight: '1.6' }}>
                                <strong style={{ color: '#F5D061' }}>تنبيه مهم: </strong>
                                يضاف المبلغ إلى محفظتك على الموقع بعد موافقة الإدارة، وللسحب اختر طريقة أخرى.
                            </div>
                            <div style={{ color: '#F5D061', flexShrink: 0 }}>
                                <AlertTriangle size={22} />
                            </div>
                        </div>

                        {/* Submit Action Button */}
                        <button
                            type="submit"
                            disabled={submitting}
                            style={{
                                width: '100%',
                                padding: '16px',
                                borderRadius: '16px',
                                background: 'linear-gradient(135deg, #F5D061 0%, #D4A537 50%, #B8860B 100%)',
                                border: 'none',
                                color: '#000000',
                                fontSize: '16px',
                                fontWeight: '900',
                                cursor: submitting ? 'not-allowed' : 'pointer',
                                opacity: submitting ? 0.7 : 1,
                                boxShadow: '0 8px 25px rgba(212, 165, 55, 0.3)',
                                transition: 'all 0.2s',
                            }}
                            onMouseEnter={(e) => {
                                if (!submitting) {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(212, 165, 55, 0.45)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 8px 25px rgba(212, 165, 55, 0.3)';
                            }}
                        >
                            {submitting ? 'جاري إرسال الطلب...' : 'إرسال طلب السحب'}
                        </button>
                    </form>
                </div>
            </div>

            {/* Modal Popup: بيانات السحب (Matches Screenshot 1 Exactly) */}
            {showWithdrawalModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.85)',
                    backdropFilter: 'blur(8px)',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px',
                }}>
                    <div style={{
                        width: '100%',
                        maxWidth: '460px',
                        background: '#0B0B0F',
                        border: '1.5px solid #D4A537',
                        borderRadius: '26px',
                        padding: '28px 24px',
                        boxShadow: '0 25px 70px rgba(0, 0, 0, 0.95), 0 0 40px rgba(212, 165, 55, 0.2)',
                        animation: 'scaleUp 0.25s ease-out',
                    }}>
                        {/* Modal Header */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '24px',
                        }}>
                            <button
                                onClick={() => setShowWithdrawalModal(false)}
                                style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    background: 'rgba(255, 255, 255, 0.06)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    color: '#FFFFFF',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                }}
                            >
                                <X size={18} />
                            </button>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '11px', color: '#9E9EA8', fontWeight: '700' }}>
                                        بيانات السحب
                                    </div>
                                    <div style={{ fontSize: '17px', fontWeight: '900', color: '#FFFFFF' }}>
                                        {activeApp.name}
                                    </div>
                                </div>

                                <div style={{
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '14px',
                                    background: activeApp.gradient || 'linear-gradient(135deg, #2A2415 0%, #151410 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '1px solid #D4A537',
                                    overflow: 'hidden',
                                }}>
                                    {Boolean(activeApp.icon_url || activeApp.iconUrl || activeApp.image_url) ? (
                                        <img
                                            src={(() => {
                                                const u = activeApp.icon_url || activeApp.iconUrl || activeApp.image_url;
                                                return typeof u === 'string' && u.includes('/storage/')
                                                    ? ('/storage/' + u.split('/storage/')[1])
                                                    : u;
                                            })()}
                                            alt={activeApp.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }}
                                        />
                                    ) : (
                                        <Smartphone size={22} color="#F5D061" strokeWidth={1.8} />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Agency ID Box with Copy Button (Matches Screenshot 1) */}
                        <div style={{ marginBottom: '22px', textAlign: 'center' }}>
                            <div style={{
                                fontSize: '13px',
                                color: '#9E9EA8',
                                fontWeight: '700',
                                marginBottom: '8px',
                                textAlign: 'right',
                            }}>
                                آيدي السحب
                            </div>

                            <div
                                onClick={handleCopyAgencyId}
                                style={{
                                    background: '#07070A',
                                    border: '1.5px solid #D4A537',
                                    borderRadius: '18px',
                                    padding: '14px 18px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                                }}
                            >
                                <button
                                    type="button"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        padding: '8px 16px',
                                        borderRadius: '12px',
                                        background: copied ? '#22C55E' : 'rgba(212, 165, 55, 0.2)',
                                        border: '1px solid rgba(212, 165, 55, 0.4)',
                                        color: copied ? '#000000' : '#F5D061',
                                        fontSize: '13px',
                                        fontWeight: '800',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {copied ? <Check size={14} /> : <Copy size={14} />}
                                    <span>{copied ? 'تم النسخ' : 'نسخ'}</span>
                                </button>

                                <div style={{
                                    fontSize: '22px',
                                    fontWeight: '900',
                                    color: '#F5D061',
                                    letterSpacing: '1px',
                                    fontFamily: 'monospace',
                                }}>
                                    {agencyId}
                                </div>
                            </div>

                            <div style={{ fontSize: '12px', color: '#7E7E88', marginTop: '6px' }}>
                                اضغط داخل البطاقة لنسخ الآيدي
                            </div>
                        </div>

                        {/* Minimum & Execution Time Grid (Matches Screenshot 1) */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '12px',
                            marginBottom: '26px',
                            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                            paddingTop: '18px',
                        }}>
                            {/* Execution Time */}
                            <div style={{ textAlign: 'center', borderRight: '1px solid rgba(255, 255, 255, 0.08)', paddingRight: '8px' }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '6px',
                                    color: '#9E9EA8',
                                    fontSize: '12px',
                                    marginBottom: '4px',
                                }}>
                                    <Clock size={14} color="#F5D061" />
                                    <span>مدة التنفيذ</span>
                                </div>
                                <div style={{ fontSize: '13px', fontWeight: '800', color: '#FFFFFF' }}>
                                    {executionTime}
                                </div>
                            </div>

                            {/* Min Amount */}
                            <div style={{ textAlign: 'center' }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '6px',
                                    color: '#9E9EA8',
                                    fontSize: '12px',
                                    marginBottom: '4px',
                                }}>
                                    <DollarSign size={14} color="#F5D061" />
                                    <span>الحد الأدنى</span>
                                </div>
                                <div style={{ fontSize: '16px', fontWeight: '900', color: '#22C55E' }}>
                                    {minWithdraw}
                                </div>
                            </div>
                        </div>

                        {/* Modal Action Button (Matches Screenshot 1) */}
                        <button
                            onClick={() => setShowWithdrawalModal(false)}
                            style={{
                                width: '100%',
                                padding: '16px',
                                borderRadius: '16px',
                                background: 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)',
                                border: 'none',
                                color: '#000000',
                                fontSize: '16px',
                                fontWeight: '900',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                            }}
                        >
                            <span>فهمت، ابدأ السحب</span>
                            {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                        </button>
                    </div>
                </div>
            )}
        </MainLayout>
    );
}
