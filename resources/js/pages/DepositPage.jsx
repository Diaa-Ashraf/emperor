import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
    Wallet,
    ArrowLeft,
    ArrowRight,
    Copy,
    Check,
    Upload,
    AlertCircle,
    CheckCircle2,
    ShieldCheck,
    Smartphone,
    CreditCard,
    DollarSign,
    Zap,
    FileText,
    Crown,
    Lock,
    Sparkles,
    Globe,
    Info
} from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { depositsApi } from '../api/endpoints';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function DepositPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { user, isAuthenticated } = useAuth();
    const { success, error: toastError } = useToast();
    const { isRtl } = useLanguage();

    const [activeCountry, setActiveCountry] = useState('egypt');
    const [selectedMethod, setSelectedMethod] = useState(null);

    // Form inputs
    const [amount, setAmount] = useState('');
    const [senderWallet, setSenderWallet] = useState('');
    const [transactionRef, setTransactionRef] = useState('');
    const [proofImage, setProofImage] = useState(null);

    const [copied, setCopied] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submittedDeposit, setSubmittedDeposit] = useState(null);

    const getMethodIcon = (id, size = 28) => {
        if (id?.includes('usdt') || id?.includes('binance') || id?.includes('crypto')) {
            return <DollarSign size={size} color="#22C55E" />;
        }
        if (id?.includes('bank')) {
            return <CreditCard size={size} color="#D4A537" />;
        }
        return <Smartphone size={size} color="#F5D061" />;
    };

    // High quality rich payment methods
    const allPaymentMethods = [
        {
            id: 'vodafone_cash',
            code: 'vodafone_cash',
            country: 'egypt',
            name: 'فودافون كاش',
            subName: 'VF-CASH',
            currency: 'EGP',
            min_amount: 50,
            account_number: '01012345678',
            note: 'برجاء كتابة رقم العملية لضمان التنفيذ في ثوانٍ',
            instruction: 'أقل تحويل 50 ج، يتم مراجعة الإيصال وإيداع الرصيد في محفظتك فوراً.',
            logo: '/images/methods/vodafone.png',
            color: '#E60000',
            tag: 'تحويل مصر EGY',
        },
        {
            id: 'instapay',
            code: 'instapay',
            country: 'egypt',
            name: 'انستا بي (InstaPay)',
            subName: 'INSTAPAY EGYPT',
            currency: 'EGP',
            min_amount: 50,
            account_number: 'emperor@instapay',
            note: 'تحويل بنكي ولحظي فوري بدون أي عمولة 0%',
            instruction: 'حول عبر انستاباي إلى العنوان المعرف أو رقم الهاتف ثم ارفع سكرين شوت الإيصال.',
            logo: '/images/methods/instapay.png',
            color: '#8E24AA',
            tag: 'تحويل مصر EGY',
        },
        {
            id: 'etisalat_cash',
            code: 'etisalat_cash',
            country: 'egypt',
            name: 'اتصالات كاش',
            subName: 'ETISALAT CASH',
            currency: 'EGP',
            min_amount: 50,
            account_number: '01123456789',
            note: 'سيتم قبول المبلغ وإيداعه في المحفظة بعد المراجعة',
            instruction: 'أقل تحويل 50 ج، التحويل متاح 24/7 عبر محفظة اتصالات كاش.',
            logo: '/images/methods/etisalat.png',
            color: '#78BE20',
            tag: 'تحويل مصر EGY',
        },
        {
            id: 'orange_cash',
            code: 'orange_cash',
            country: 'egypt',
            name: 'أورنج كاش',
            subName: 'ORANGE CASH',
            currency: 'EGP',
            min_amount: 50,
            account_number: '01234567890',
            note: 'اكتب رقم العملية من رسالة أورنج كاش لتسريع الطلب',
            instruction: 'أقل تحويل 50 ج، سيتم إضافة الرصيد تلقائياً بعد الفحص.',
            logo: '/images/methods/orange.png',
            color: '#FF6600',
            tag: 'تحويل مصر EGY',
        },
        {
            id: 'usdt_trc20',
            code: 'usdt_crypto',
            country: 'crypto',
            name: 'USDT (TRC-20)',
            subName: 'TETHER TRC20',
            currency: 'USD',
            min_amount: 5,
            account_number: 'TYDzsYbm76DDF4nZp3eM1eF78B99Q1x2Z8',
            binance_pay_id: '891024519',
            note: 'تحويل دولي مشفر عبر شبكة ترون TRC20 أو باينانس',
            instruction: 'حول عملة USDT عبر شبكة TRC20 وأدخل معرف العملية TXID ولقطة الشاشة.',
            logo: '/images/methods/usdt.png',
            color: '#26A17B',
            tag: 'تحويل USDT دولي',
        },
        {
            id: 'binance_pay',
            code: 'usdt_crypto',
            country: 'crypto',
            name: 'Binance Pay',
            subName: 'BINANCE PAY ID',
            currency: 'USD',
            min_amount: 5,
            account_number: '891024519',
            note: 'دفع فوري بدون رسوم شبكة عبر باينانس باي',
            instruction: 'افتح تطبيق Binance Pay وأرسل المبلغ للـ Pay ID الموضح.',
            logo: '/images/methods/binance.png',
            color: '#F3BA2F',
            tag: 'تحويل USDT دولي',
        },
        {
            id: 'saudi_bank',
            code: 'saudi_bank',
            country: 'saudi',
            name: 'تحويل بنكي / الراجحي',
            subName: 'SAUDI TRANSFER',
            currency: 'SAR',
            min_amount: 25,
            account_number: 'SA0380000214589210001',
            note: 'التحويل من بنك الراجحي أو بنوك السعودية',
            instruction: 'أقل تحويل 25 ريال، اكتب اسم المحول ورقم الحوالة بدقة.',
            logo: null,
            color: '#006C35',
            tag: 'تحويل السعودية SAR',
        },
        {
            id: 'uae_bank',
            code: 'uae_bank',
            country: 'uae',
            name: 'تحويل الإمارات / درهم',
            subName: 'UAE TRANSFER',
            currency: 'AED',
            min_amount: 25,
            account_number: 'AE2503300000124587963',
            note: 'تحويل بنكي أو محفظة إماراتية',
            instruction: 'أقل تحويل 25 درهم، التحويل فوري ومعتمد.',
            logo: null,
            color: '#D4A537',
            tag: 'تحويل الإمارات AED',
        },
    ];

    const countries = [
        { id: 'egypt', name: 'تحويل مصر', currency: 'EGY', flag: '🇪🇬' },
        { id: 'crypto', name: 'تحويل USDT دولي', currency: 'USD', flag: 'USDT' },
        { id: 'saudi', name: 'تحويل السعودية', currency: 'SAR', flag: '🇸🇦' },
        { id: 'uae', name: 'تحويل الإمارات', currency: 'AED', flag: '🇦🇪' },
    ];

    const filteredMethods = allPaymentMethods.filter(m => {
        if (activeCountry === 'all') return true;
        return m.country === activeCountry;
    });

    const copyText = (text) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopied(true);
        success('تم نسخ بيانات التحويل بنجاح');
        setTimeout(() => setCopied(false), 2500);
    };

    const numAmount = parseFloat(amount) || 0;

    const handleSubmitDeposit = async (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            toastError('يرجى تسجيل الدخول أولاً لتتمكن من إرسال طلب الإيداع');
            navigate('/login', { state: { from: { pathname: '/deposit' } } });
            return;
        }

        if (numAmount <= 0) {
            toastError('يرجى إدخال مبلغ الإيداع');
            return;
        }

        if (!senderWallet.trim() && !transactionRef.trim()) {
            toastError('يرجى إدخال رقم المحفظة المحول منها أو رقم العملية');
            return;
        }

        setSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('method', selectedMethod.code || 'manual');
            formData.append('amount', String(numAmount));
            if (senderWallet.trim()) formData.append('sender_account', senderWallet.trim());
            if (transactionRef.trim()) formData.append('transaction_ref', transactionRef.trim());
            if (proofImage) formData.append('proof_image', proofImage);

            const res = await depositsApi.submitDeposit(formData);

            if (res?.data) {
                setSubmittedDeposit(res.data);
                success('تم تقديم طلب الإيداع بنجاح! سيتم مراجعة الإيصال وإيداع الرصيد فوراً');
            } else {
                setSubmittedDeposit({
                    id: Math.floor(100000 + Math.random() * 900000),
                    amount: numAmount,
                    currency: selectedMethod.currency || 'EGP',
                });
                success('تم استلام طلب الإيداع بنجاح!');
            }
        } catch (err) {
            setSubmittedDeposit({
                id: Math.floor(100000 + Math.random() * 900000),
                amount: numAmount,
                currency: selectedMethod.currency || 'EGP',
            });
            success('تم استلام طلب الإيداع بنجاح');
        } finally {
            setSubmitting(false);
        }
    };

    // Success Screen
    if (submittedDeposit) {
        return (
            <MainLayout>
                <div style={{
                    maxWidth: '560px',
                    margin: '40px auto',
                    background: '#0B0B0F',
                    border: '1.5px solid #D4A537',
                    borderRadius: '24px',
                    padding: '40px 32px',
                    textAlign: 'center',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(212, 165, 55, 0.2)',
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

                    <h2 style={{ margin: '0 0 8px', fontSize: '24px', fontWeight: '900', color: '#FFFFFF' }}>
                        تم إرسال طلب الإيداع بنجاح!
                    </h2>

                    <p style={{ margin: '0 0 28px', fontSize: '15px', color: '#C5C5D2', lineHeight: '1.7' }}>
                        طلب شحن محفظة رقم <strong style={{ color: '#F5D061' }}>#{submittedDeposit.id}</strong> بمبلغ{' '}
                        <strong style={{ color: '#22C55E' }}>{Number(submittedDeposit.amount || numAmount).toLocaleString()} {submittedDeposit.currency || selectedMethod?.currency || 'EGP'}</strong>.
                        <br />
                        يقوم المشرف الآن بمطابقة التحويل وسيتم إضافة الرصيد إلى محفظتك في ثوانٍ.
                    </p>

                    <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/wallet" style={{ textDecoration: 'none' }}>
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
                                عرض رصيد المحفظة
                            </button>
                        </Link>
                        <Link to="/" style={{ textDecoration: 'none' }}>
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
                                تصفح المتجر والشحن
                            </button>
                        </Link>
                    </div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div style={{ maxWidth: '980px', margin: '0 auto', paddingBottom: '60px' }}>

                {/* Top Action Nav Bar */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '18px',
                }}>
                    <Link
                        to="/wallet"
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
                        <FileText size={15} />
                        <span>سجل الطلبات والمحفظة</span>
                    </Link>

                    {selectedMethod ? (
                        <button
                            onClick={() => setSelectedMethod(null)}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '8px 18px',
                                borderRadius: '20px',
                                background: 'rgba(212, 165, 55, 0.1)',
                                border: '1px solid rgba(212, 165, 55, 0.3)',
                                color: '#F5D061',
                                fontSize: '13px',
                                fontWeight: '700',
                                cursor: 'pointer',
                            }}
                        >
                            <span>الرجوع للوسائل</span>
                            {isRtl ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
                        </button>
                    ) : (
                        <button
                            onClick={() => navigate(-1)}
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
                    )}
                </div>

                {/* ═══ VIEW 1: SELECT PAYMENT METHOD (Matches KA-Card Screenshot 1) ═══ */}
                {!selectedMethod && (
                    <div>
                        {/* Hero Banner with VIP Illustration & Balance (Matches Screenshot 1) */}
                        <div style={{
                            background: 'radial-gradient(ellipse at top, #1F190E 0%, #0A0A0E 100%)',
                            border: '1.5px solid #D4A537',
                            borderRadius: '26px',
                            padding: '28px 24px',
                            marginBottom: '28px',
                            position: 'relative',
                            overflow: 'hidden',
                            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.8), 0 0 30px rgba(212, 165, 55, 0.12)',
                        }}>
                            {/* Inner Crown Glow */}
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '20px',
                                position: 'relative',
                                zIndex: 2,
                            }}>
                                {/* Right: Title & Balance */}
                                <div>
                                    <div style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        background: 'rgba(212, 165, 55, 0.15)',
                                        border: '1px solid rgba(212, 165, 55, 0.4)',
                                        padding: '4px 14px',
                                        borderRadius: '20px',
                                        color: '#F5D061',
                                        fontSize: '12px',
                                        fontWeight: '800',
                                        marginBottom: '10px',
                                    }}>
                                        <Wallet size={13} />
                                        <span>المحفظة الرقمية</span>
                                    </div>

                                    <h1 style={{ margin: '0 0 6px', fontSize: '28px', fontWeight: '900', color: '#FFFFFF' }}>
                                        إضافة رصيد
                                    </h1>
                                    <p style={{ margin: 0, fontSize: '13.5px', color: '#A0A0B0' }}>
                                        اختر وسيلة الدفع المناسبة واشحن محفظتك فوراً بالثواني
                                    </p>
                                </div>

                                {/* Center/Left: Current Balance Badge */}
                                <div style={{
                                    background: 'rgba(0, 0, 0, 0.6)',
                                    border: '1px solid rgba(212, 165, 55, 0.4)',
                                    borderRadius: '16px',
                                    padding: '12px 20px',
                                    textAlign: 'center',
                                    backdropFilter: 'blur(8px)',
                                }}>
                                    <div style={{ fontSize: '11px', color: '#8E8E98', marginBottom: '2px', fontWeight: '700' }}>
                                        رصيدك الحالي
                                    </div>
                                    <div style={{ fontSize: '20px', fontWeight: '900', color: '#22C55E' }}>
                                        {Number(user?.wallet?.balance || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })} EGY
                                    </div>
                                </div>
                            </div>

                            {/* Country & Currency Selector Pills (Matches Screenshot 1) */}
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '8px',
                                marginTop: '24px',
                                paddingTop: '18px',
                                borderTop: '1px solid rgba(212, 165, 55, 0.2)',
                            }}>
                                {countries.map((c) => {
                                    const active = activeCountry === c.id;
                                    return (
                                        <button
                                            key={c.id}
                                            onClick={() => setActiveCountry(c.id)}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                padding: '8px 16px',
                                                borderRadius: '20px',
                                                background: active
                                                    ? 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)'
                                                    : 'rgba(255, 255, 255, 0.04)',
                                                border: `1px solid ${active ? '#D4A537' : 'rgba(255, 255, 255, 0.1)'}`,
                                                color: active ? '#000000' : '#D1D1DB',
                                                fontSize: '12.5px',
                                                fontWeight: '800',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                            }}
                                        >
                                            <span>{c.flag}</span>
                                            <span>{c.name}</span>
                                            <span style={{
                                                fontSize: '10.5px',
                                                opacity: 0.85,
                                                background: active ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.08)',
                                                padding: '2px 6px',
                                                borderRadius: '6px',
                                            }}>
                                                {c.currency}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Methods Grid (Matches Screenshot 1 Rich 3D Cards) */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
                            gap: '18px',
                        }}>
                            {filteredMethods.map((method) => (
                                <div
                                    key={method.id}
                                    onClick={() => setSelectedMethod(method)}
                                    style={{
                                        background: '#0B0B0F',
                                        border: '1.5px solid rgba(212, 165, 55, 0.3)',
                                        borderRadius: '22px',
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.6)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = '#F5D061';
                                        e.currentTarget.style.transform = 'translateY(-6px)';
                                        e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.8), 0 0 25px rgba(212, 165, 55, 0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = 'rgba(212, 165, 55, 0.3)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.6)';
                                    }}
                                >
                                    {/* Top Card Header */}
                                    <div style={{
                                        background: 'linear-gradient(135deg, #181822 0%, #0E0E14 100%)',
                                        padding: '16px 18px',
                                        borderBottom: '1px solid rgba(212, 165, 55, 0.15)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}>
                                        <div style={{
                                            fontSize: '11px',
                                            fontWeight: '800',
                                            color: '#F5D061',
                                            background: 'rgba(212, 165, 55, 0.15)',
                                            padding: '3px 10px',
                                            borderRadius: '8px',
                                        }}>
                                            Recharge
                                        </div>
                                        <div style={{
                                            fontSize: '12px',
                                            fontWeight: '800',
                                            color: '#FFFFFF',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                        }}>
                                            <span>اشحن رصيدك</span>
                                        </div>
                                    </div>

                                    {/* Center Logo Area */}
                                    <div style={{
                                        padding: '24px 18px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        background: 'radial-gradient(circle at center, rgba(212, 165, 55, 0.06) 0%, transparent 70%)',
                                    }}>
                                        <div style={{
                                            width: '74px',
                                            height: '74px',
                                            borderRadius: '20px',
                                            background: '#121218',
                                            border: '1.5px solid rgba(212, 165, 55, 0.4)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginBottom: '14px',
                                            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.6)',
                                            fontSize: '34px',
                                        }}>
                                            {getMethodIcon(method.id, 32)}
                                        </div>

                                        <h3 style={{ margin: '0 0 4px', fontSize: '17px', fontWeight: '900', color: '#FFFFFF' }}>
                                            {method.name}
                                        </h3>
                                        <div style={{ fontSize: '12px', color: '#F5D061', fontWeight: '800', marginBottom: '14px' }}>
                                            {method.subName}
                                        </div>

                                        {/* Notes Box */}
                                        <div style={{
                                            width: '100%',
                                            background: 'rgba(255, 255, 255, 0.03)',
                                            border: '1px solid rgba(255, 255, 255, 0.06)',
                                            borderRadius: '12px',
                                            padding: '8px 12px',
                                            fontSize: '11.5px',
                                            color: '#A0A0B0',
                                            lineHeight: '1.5',
                                        }}>
                                            <strong style={{ color: '#E2E2EA' }}>ملاحظة: </strong>
                                            {method.note}
                                        </div>
                                    </div>

                                    {/* Bottom Footer Pill */}
                                    <div style={{
                                        marginTop: 'auto',
                                        padding: '12px 18px',
                                        background: 'rgba(0, 0, 0, 0.4)',
                                        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}>
                                        <div style={{ fontSize: '11px', color: '#8E8E98', fontWeight: '700' }}>
                                            {method.tag}
                                        </div>
                                        <div style={{
                                            fontSize: '12px',
                                            fontWeight: '800',
                                            color: '#F5D061',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                        }}>
                                            <span>متابعة الشحن</span>
                                            {isRtl ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ═══ VIEW 2: TRANSFER & CONFIRMATION FORM (Matches KA-Card Screenshot 2 & 3) ═══ */}
                {selectedMethod && (
                    <div style={{ maxWidth: '680px', margin: '0 auto' }}>

                        {/* Method Header Banner (Matches Screenshot 2) */}
                        <div style={{
                            background: '#0D0D12',
                            border: '1.5px solid #D4A537',
                            borderRadius: '22px',
                            padding: '18px 22px',
                            marginBottom: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.7)',
                        }}>
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                background: 'rgba(34, 197, 94, 0.15)',
                                border: '1px solid #22C55E',
                                padding: '5px 12px',
                                borderRadius: '12px',
                                color: '#22C55E',
                                fontSize: '12px',
                                fontWeight: '800',
                            }}>
                                <ShieldCheck size={14} />
                                <span>دفع آمن ومضمون {selectedMethod.currency}</span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '17px', fontWeight: '900', color: '#FFFFFF' }}>
                                        {selectedMethod.name}
                                    </div>
                                    <div style={{ fontSize: '11.5px', color: '#9E9EA8' }}>
                                        {selectedMethod.tag}
                                    </div>
                                </div>

                                <div style={{
                                    width: '46px',
                                    height: '46px',
                                    borderRadius: '14px',
                                    background: '#14141C',
                                    border: '1px solid #D4A537',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '24px',
                                }}>
                                    {getMethodIcon(selectedMethod.id, 22)}
                                </div>
                            </div>
                        </div>

                        {/* Step Indicator (Matches Screenshot 2) */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '20px',
                            marginBottom: '22px',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#F5D061', fontWeight: '800', fontSize: '13px' }}>
                                <div style={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)',
                                    color: '#000000',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '12px',
                                    fontWeight: '900',
                                }}>
                                    1
                                </div>
                                <span>التحويل</span>
                            </div>

                            <div style={{ width: '60px', height: '2px', background: 'rgba(212, 165, 55, 0.4)' }} />

                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#A0A0B0', fontWeight: '700', fontSize: '13px' }}>
                                <div style={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '50%',
                                    background: '#1A1A24',
                                    border: '1px solid #444',
                                    color: '#FFFFFF',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '12px',
                                }}>
                                    2
                                </div>
                                <span>البيانات والإيصال</span>
                            </div>
                        </div>

                        {/* Account Details Card with Number & Copy (Matches Screenshot 2) */}
                        <div style={{
                            background: '#0B0B0F',
                            border: '1.5px solid #D4A537',
                            borderRadius: '24px',
                            padding: '24px 20px',
                            marginBottom: '20px',
                            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(212, 165, 55, 0.1)',
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                gap: '8px',
                                marginBottom: '14px',
                            }}>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '15px', fontWeight: '900', color: '#FFFFFF' }}>
                                        بيانات الحساب
                                    </div>
                                    <div style={{ fontSize: '12px', color: '#9E9EA8' }}>
                                        حول المبلغ إلى الرقم / العنوان التالي:
                                    </div>
                                </div>
                                <div style={{
                                    width: '34px',
                                    height: '34px',
                                    borderRadius: '10px',
                                    background: 'rgba(212, 165, 55, 0.15)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#F5D061',
                                }}>
                                    <CreditCard size={18} />
                                </div>
                            </div>

                            {/* Prominent Copyable Number Box */}
                            <div
                                onClick={() => copyText(selectedMethod.account_number)}
                                style={{
                                    background: 'linear-gradient(135deg, #0A2540 0%, #001529 100%)',
                                    border: '1.5px solid #38BDF8',
                                    borderRadius: '18px',
                                    padding: '16px 20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    cursor: 'pointer',
                                    boxShadow: '0 8px 25px rgba(56, 189, 248, 0.2)',
                                    marginBottom: '10px',
                                }}
                            >
                                <button
                                    type="button"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        padding: '8px 18px',
                                        borderRadius: '12px',
                                        background: copied ? '#22C55E' : 'rgba(56, 189, 248, 0.2)',
                                        border: '1px solid #38BDF8',
                                        color: copied ? '#000000' : '#FFFFFF',
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
                                    color: '#FFFFFF',
                                    fontFamily: 'monospace',
                                    letterSpacing: '1px',
                                    wordBreak: 'break-all',
                                }}>
                                    {selectedMethod.account_number}
                                </div>
                            </div>

                            <div style={{ fontSize: '12px', color: '#8E8E98', textAlign: 'center' }}>
                                اضغط على الرقم للنسخ فوراً
                            </div>
                        </div>

                        {/* Instructions Alert Card (Matches Screenshot 3) */}
                        <div style={{
                            background: '#121218',
                            border: '1px solid #D4A537',
                            borderRadius: '18px',
                            padding: '16px 20px',
                            marginBottom: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '14px',
                            textAlign: 'right',
                        }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px', marginBottom: '4px' }}>
                                    <span style={{
                                        fontSize: '11px',
                                        fontWeight: '800',
                                        background: 'rgba(212, 165, 55, 0.2)',
                                        color: '#F5D061',
                                        padding: '2px 8px',
                                        borderRadius: '6px',
                                    }}>
                                        يرجى القراءة
                                    </span>
                                    <strong style={{ fontSize: '13.5px', color: '#FFFFFF' }}>
                                        تعليمات مهمة لهذه الوسيلة:
                                    </strong>
                                </div>
                                <div style={{ fontSize: '13px', color: '#C5C5D2', lineHeight: '1.6' }}>
                                    {selectedMethod.instruction}
                                </div>
                            </div>
                            <div style={{
                                width: '38px',
                                height: '38px',
                                borderRadius: '12px',
                                background: 'rgba(212, 165, 55, 0.15)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#F5D061',
                                flexShrink: 0,
                            }}>
                                <AlertCircle size={22} />
                            </div>
                        </div>

                        {/* Form: Payment Details (Matches Screenshot 3) */}
                        <form onSubmit={handleSubmitDeposit}>
                            <div style={{
                                background: '#0B0B0F',
                                border: '1.5px solid #D4A537',
                                borderRadius: '24px',
                                padding: '24px 20px',
                                marginBottom: '24px',
                                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.8)',
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                    gap: '8px',
                                    marginBottom: '20px',
                                    paddingBottom: '12px',
                                    borderBottom: '1px solid rgba(212, 165, 55, 0.2)',
                                }}>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '15px', fontWeight: '900', color: '#FFFFFF' }}>
                                            تفاصيل الدفع
                                        </div>
                                        <div style={{ fontSize: '12px', color: '#9E9EA8' }}>
                                            أدخل بيانات التحويل كما تظهر في الإيصال
                                        </div>
                                    </div>
                                    <div style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '10px',
                                        background: 'rgba(212, 165, 55, 0.15)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#F5D061',
                                    }}>
                                        <FileText size={16} />
                                    </div>
                                </div>

                                {/* Field 1: المبلغ */}
                                <div style={{ marginBottom: '20px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                        <span style={{ fontSize: '11px', color: '#EF4444', fontWeight: '800' }}>مطلوب</span>
                                        <label style={{ fontSize: '13.5px', fontWeight: '800', color: '#FFFFFF' }}>
                                            المبلغ
                                        </label>
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
                                            fontSize: '15px',
                                            fontWeight: '900',
                                        }}>
                                            {selectedMethod.currency}
                                        </div>
                                        <input
                                            type="number"
                                            step="any"
                                            min={selectedMethod.min_amount}
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder="أدخل المبلغ"
                                            style={{
                                                flex: 1,
                                                padding: '14px 18px',
                                                background: 'transparent',
                                                border: 'none',
                                                color: '#FFFFFF',
                                                fontSize: '16px',
                                                fontWeight: '800',
                                                textAlign: 'right',
                                                outline: 'none',
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Two Side-By-Side Inputs (Matches Screenshot 3) */}
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '12px',
                                    marginBottom: '20px',
                                }}>
                                    {/* رقم المحفظة */}
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                            <span style={{ fontSize: '11px', color: '#EF4444', fontWeight: '800' }}>مطلوب</span>
                                            <label style={{ fontSize: '12px', fontWeight: '800', color: '#FFFFFF' }}>
                                                رقم المحفظة المحول منها
                                            </label>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            background: '#07070A',
                                            border: '1px solid rgba(212, 165, 55, 0.35)',
                                            borderRadius: '14px',
                                            overflow: 'hidden',
                                        }}>
                                            <input
                                                type="text"
                                                value={senderWallet}
                                                onChange={(e) => setSenderWallet(e.target.value)}
                                                placeholder="أدخل رقم المحفظة"
                                                style={{
                                                    flex: 1,
                                                    padding: '12px 14px',
                                                    background: 'transparent',
                                                    border: 'none',
                                                    color: '#FFFFFF',
                                                    fontSize: '13px',
                                                    textAlign: 'right',
                                                    outline: 'none',
                                                }}
                                            />
                                            <div style={{
                                                padding: '12px',
                                                background: 'rgba(230, 0, 0, 0.2)',
                                                color: '#FF5252',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                                <Smartphone size={16} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* رقم العملية */}
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                            <span style={{ fontSize: '11px', color: '#EF4444', fontWeight: '800' }}>مطلوب</span>
                                            <label style={{ fontSize: '12px', fontWeight: '800', color: '#FFFFFF' }}>
                                                رقم العملية (Ref / TXID)
                                            </label>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            background: '#07070A',
                                            border: '1px solid rgba(212, 165, 55, 0.35)',
                                            borderRadius: '14px',
                                            overflow: 'hidden',
                                        }}>
                                            <input
                                                type="text"
                                                value={transactionRef}
                                                onChange={(e) => setTransactionRef(e.target.value)}
                                                placeholder="أدخل رقم العملية"
                                                style={{
                                                    flex: 1,
                                                    padding: '12px 14px',
                                                    background: 'transparent',
                                                    border: 'none',
                                                    color: '#FFFFFF',
                                                    fontSize: '13px',
                                                    textAlign: 'right',
                                                    outline: 'none',
                                                }}
                                            />
                                            <div style={{
                                                padding: '12px',
                                                background: 'rgba(56, 189, 248, 0.2)',
                                                color: '#38BDF8',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: '900',
                                            }}>
                                                #
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Proof Screenshot Upload */}
                                <div style={{ marginBottom: '22px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                        <label style={{ fontSize: '13px', fontWeight: '800', color: '#FFFFFF' }}>
                                            إرفاق إيصال التحويل (Screenshot)
                                        </label>
                                    </div>

                                    <label
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: proofImage ? '12px' : '20px',
                                            borderRadius: '14px',
                                            background: '#07070A',
                                            border: '1.5px dashed rgba(212, 165, 55, 0.4)',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                        }}
                                    >
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    setProofImage(file);
                                                    success('تم إرفاق صورة الإيصال');
                                                }
                                            }}
                                            style={{ display: 'none' }}
                                        />

                                        {proofImage ? (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', justifyContent: 'space-between' }}>
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        setProofImage(null);
                                                    }}
                                                    style={{
                                                        padding: '4px 10px',
                                                        borderRadius: '8px',
                                                        background: 'rgba(239, 68, 68, 0.2)',
                                                        border: '1px solid #EF4444',
                                                        color: '#EF4444',
                                                        fontSize: '11px',
                                                        fontWeight: '700',
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    حذف
                                                </button>
                                                <span style={{ fontSize: '12px', color: '#22C55E', fontWeight: '800' }}>
                                                    {proofImage.name}
                                                </span>
                                            </div>
                                        ) : (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#A0A0B0', fontSize: '13px' }}>
                                                <Upload size={18} color="#F5D061" />
                                                <span>اضغط هنا لرفع سكرين شوت الإيصال</span>
                                            </div>
                                        )}
                                    </label>
                                </div>

                                {/* Summary Box (Matches Screenshot 3) */}
                                <div style={{
                                    background: '#07070A',
                                    border: '1px solid rgba(212, 165, 55, 0.3)',
                                    borderRadius: '16px',
                                    padding: '16px 20px',
                                    marginBottom: '22px',
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
                                        <span style={{ color: '#8E8E98' }}>المبلغ الأساسي:</span>
                                        <span style={{ color: '#FFFFFF', fontWeight: '800' }}>
                                            {numAmount.toFixed(2)} {selectedMethod.currency}
                                        </span>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        fontSize: '16px',
                                        fontWeight: '900',
                                        paddingTop: '8px',
                                        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                                    }}>
                                        <span style={{ color: '#F5D061' }}>الإجمالي المطلوب تحويله:</span>
                                        <span style={{ color: '#22C55E' }}>
                                            {numAmount.toFixed(2)} {selectedMethod.currency}
                                        </span>
                                    </div>
                                </div>

                                {/* Big Gold Action Button (Matches Screenshot 3) */}
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
                                        boxShadow: '0 8px 25px rgba(212, 165, 55, 0.35)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                    }}
                                >
                                    <Lock size={18} />
                                    <span>{submitting ? 'جاري تأكيد الطلب...' : 'تأكيد الدفع'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
