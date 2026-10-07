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
    Info,
    Flame
} from 'lucide-react';
import "../../css/depositePage.css";
import MainLayout from '../layouts/MainLayout';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import PaymentBrandLogo from '../components/payments/PaymentBrandLogo';
import { depositsApi } from '../api/endpoints';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

export default function DepositPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { user, isAuthenticated } = useAuth();
    const { success, error: toastError } = useToast();
    const { isRtl, t, language } = useLanguage();
    const { theme } = useTheme();
    const isLight = theme === 'light';

    const [activeCountry, setActiveCountry] = useState('egypt');
    const [selectedMethod, setSelectedMethod] = useState(null);

    // Form inputs
    const [amount, setAmount] = useState('');
    const [senderWallet, setSenderWallet] = useState('');
    const [transactionRef, setTransactionRef] = useState('');
    const [proofImage, setProofImage] = useState(null);
    const [proofPreview, setProofPreview] = useState(null);

    const [copied, setCopied] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submittedDeposit, setSubmittedDeposit] = useState(null);
    const [dbMethods, setDbMethods] = useState([]);

    useEffect(() => {
        depositsApi.getMethods()
            .then(res => {
                const data = res?.data || res;
                if (Array.isArray(data)) {
                    setDbMethods(data);
                }
            })
            .catch(() => {});
    }, []);

    // Comprehensive list of rich payment methods matching KA-CARDS layout
    const allPaymentMethods = [
        // 🇪🇬 EGYPT
        {
            id: 'vodafone_cash',
            code: 'vodafone_cash',
            country: 'egypt',
            name: 'فودافون كاش',
            subName: 'VF-CASH',
            currency: 'EGY',
            min_amount: 50,
            account_number: '01025515743',
            note: 'برجاء كتابة رقم العملية لضمان التنفيذ 0 ثانيه',
            instruction: 'أقل تحويل 50 ج، يتم مراجعة الإيصال وإيداع الرصيد في محفظتك فوراً.',
            tag: 'تحويل مصر',
        },
        {
            id: 'etisalat_cash',
            code: 'etisalat_cash',
            country: 'egypt',
            name: 'اتصالات كاش',
            subName: 'اتصالات كاش',
            currency: 'EGY',
            min_amount: 50,
            account_number: '01123456789',
            note: 'سيتم قبول المبلغ بعد المراجعه من قبل الادارة',
            instruction: 'أقل تحويل 50 ج، التحويل متاح 24/7 عبر محفظة اتصالات كاش.',
            tag: 'تحويل مصر',
        },
        {
            id: 'instapay',
            code: 'instapay',
            country: 'egypt',
            name: 'انستا بي (InstaPay)',
            subName: 'انستا بي',
            currency: 'EGY',
            min_amount: 50,
            account_number: 'emperor@instapay',
            note: 'تحويل بنكي ولحظي فوري بدون أي عمولة 0%',
            instruction: 'حول عبر انستاباي إلى العنوان المعرف أو رقم الهاتف ثم ارفع سكرين شوت الإيصال.',
            tag: 'تحويل مصر',
        },
        {
            id: 'orange_cash',
            code: 'orange_cash',
            country: 'egypt',
            name: 'أورنج كاش',
            subName: 'أورنج كاش',
            currency: 'EGY',
            min_amount: 50,
            account_number: '01234567890',
            note: 'برجاء كتابة رقم العملية لضمان التنفيذ 0 ثانيه',
            instruction: 'أقل تحويل 50 ج، سيتم إضافة الرصيد تلقائياً بعد الفحص.',
            tag: 'تحويل مصر',
        },

        // 🇸🇾 SYRIA
        {
            id: 'sham_cash',
            code: 'sham_cash',
            country: 'syria',
            name: 'شام كاش (Sham Cash)',
            subName: 'شام كاش',
            currency: 'USD',
            min_amount: 5,
            account_number: '963987654321',
            note: 'تحويل مباشر وسريع داخل سوريا بالدولار الأمريكي',
            instruction: 'اكتب رقم الحوالة واسم المستلم لسرعة الإيداع في المحفظة.',
            tag: 'تحويل سوريا',
        },

        // 🇯🇴 JORDAN
        {
            id: 'cliq_jordan',
            code: 'cliq_jordan',
            country: 'jordan',
            name: 'كليك (CliQ Jordan)',
            subName: 'CliQ الأردن',
            currency: 'JOD',
            min_amount: 5,
            account_number: 'EMPEROR_CLIQ',
            note: 'تحويل فوري عبر نظام كليك الأردني بدون عمولات',
            instruction: 'حول عبر اسم المستخدم أو الآيبان ثم أرفق إشعار التحويل.',
            tag: 'تحويل الاردن',
        },
        {
            id: 'zain_cash_jo',
            code: 'zain_cash',
            country: 'jordan',
            name: 'زين كاش الأردن',
            subName: 'زين كاش',
            currency: 'JOD',
            min_amount: 5,
            account_number: '0791234567',
            note: 'شحن فوري ومباشر عبر محفظة زين كاش',
            instruction: 'أدخل رقم المحفظة المحول منها ورقم الإشعار.',
            tag: 'تحويل الاردن',
        },

        // 🇸🇦 SAUDI ARABIA
        {
            id: 'stc_pay_sa',
            code: 'stc_pay',
            country: 'saudi',
            name: 'STC Pay / الراجحي',
            subName: 'stc pay السعودية',
            currency: 'SAR',
            min_amount: 25,
            account_number: '0501234567',
            note: 'تحويل فوري من stc pay أو الحسابات البنكية السعودية',
            instruction: 'أقل تحويل 25 ريال، اكتب اسم المحول ورقم الحوالة بدقة.',
            tag: 'تحويل السعودية',
        },

        // 🇦🇪 UAE
        {
            id: 'uae_bank',
            code: 'uae_bank',
            country: 'uae',
            name: 'تحويل الإمارات / درهم',
            subName: 'درهم إماراتي',
            currency: 'AED',
            min_amount: 25,
            account_number: 'AE2503300000124587963',
            note: 'تحويل بنكي أو محفظة إماراتية معتمدة',
            instruction: 'أقل تحويل 25 درهم، التحويل فوري ومعتمد.',
            tag: 'تحويل الامارات',
        },

        // 🇾🇪 YEMEN
        {
            id: 'kuraimi_ye',
            code: 'kuraimi',
            country: 'yemen',
            name: 'الكريمي إكسبرس (اليمن)',
            subName: 'الكريمي جوال',
            currency: 'YER',
            min_amount: 5000,
            account_number: '12345678',
            note: 'تحويل عبر الكريمي أو ون كاش بالريال اليمني',
            instruction: 'أدخل رقم الحوالة ورقم هاتف المرسل بدقة.',
            tag: 'تحويل اليمن',
        },

        // 🇹🇷 TURKEY
        {
            id: 'ziraat_bank',
            code: 'ziraat_bank',
            country: 'turkey',
            name: 'Ziraat Bankası (تركيا)',
            subName: 'Ziraat Bankası',
            currency: 'TRY',
            min_amount: 50,
            account_number: 'TR120001000254879654123547',
            note: 'Havale / EFT تحويل فوري ليرة تركية',
            instruction: 'اكتب اسم المحول في خانة الملاحظات وأرفق إيصال البنك.',
            tag: 'تحويل تركيا',
        },

        // 🌐 GLOBAL / CRYPTO
        {
            id: 'usdt_trc20',
            code: 'usdt_crypto',
            country: 'crypto',
            name: 'USDT (TRC-20)',
            subName: 'USDT TRC20',
            currency: 'USD',
            min_amount: 5,
            account_number: 'TYDzsYbm76DDF4nZp3eM1eF78B99Q1x2Z8',
            note: 'تحويل دولي مشفر عبر شبكة ترون TRC20',
            instruction: 'حول عملة USDT عبر شبكة TRC20 وأدخل معرف العملية TXID ولقطة الشاشة.',
            tag: 'تحويل USDT دولي',
        },
        {
            id: 'binance_pay',
            code: 'binance_pay',
            country: 'crypto',
            name: 'Binance Pay (باينانس)',
            subName: 'BINANCE PAY ID',
            currency: 'USD',
            min_amount: 5,
            account_number: '891024519',
            note: 'دفع فوري بدون رسوم شبكة 0% عبر باينانس باي',
            instruction: 'افتح تطبيق Binance Pay وأرسل المبلغ للـ Pay ID الموضح.',
            tag: 'تحويل USDT دولي',
        },
    ];

    const countries = [
        { id: 'egypt', name: language === 'en' ? 'Egypt' : 'تحويل مصر', currency: 'EGY' },
        { id: 'jordan', name: language === 'en' ? 'Jordan' : 'تحويل الاردن', currency: 'JOD' },
        { id: 'syria', name: language === 'en' ? 'Syria' : 'تحويل سوريا', currency: 'USD' },
        { id: 'saudi', name: language === 'en' ? 'Saudi Arabia' : 'تحويل السعودية', currency: 'SAR' },
        { id: 'uae', name: language === 'en' ? 'UAE' : 'تحويل الامارات', currency: 'AED' },
        { id: 'yemen', name: language === 'en' ? 'Yemen' : 'تحويل اليمن', currency: 'YER' },
        { id: 'turkey', name: language === 'en' ? 'Turkey' : 'تحويل تركيا', currency: 'TRY' },
        { id: 'crypto', name: language === 'en' ? 'Global USDT' : 'تحويل USDT دولي', currency: 'USD' },
    ];

    const filteredMethods = allPaymentMethods.filter(m => {
        if (activeCountry === 'all') return true;
        return m.country === activeCountry;
    });

    const copyText = (text) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopied(true);
        success(t('copied', 'تم نسخ بيانات التحويل بنجاح'));
        setTimeout(() => setCopied(false), 2500);
    };

    const numAmount = parseFloat(amount) || 0;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProofImage(file);
            setProofPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmitDeposit = async (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            toastError(language === 'en' ? 'Please log in first to submit deposit request' : 'يرجى تسجيل الدخول أولاً لتتمكن من إرسال طلب الإيداع');
            navigate('/login', { state: { from: { pathname: '/deposit' } } });
            return;
        }

        if (numAmount <= 0) {
            toastError(language === 'en' ? 'Please enter deposit amount' : 'يرجى إدخال مبلغ الإيداع');
            return;
        }

        if (!senderWallet.trim() && !transactionRef.trim()) {
            toastError(language === 'en' ? 'Please enter sender wallet number or transaction ID' : 'يرجى إدخال رقم المحفظة المحول منها أو رقم العملية');
            return;
        }

        setSubmitting(true);
        try {
            const formData = new FormData();
            
            const matchedDbMethod = dbMethods.find(m => m.code === selectedMethod?.code || m.id === selectedMethod?.id);
            if (matchedDbMethod) {
                formData.append('payment_method_id', matchedDbMethod.id);
            }
            formData.append('method', selectedMethod?.code || 'vodafone_cash');
            formData.append('amount', String(numAmount));
            if (senderWallet.trim()) {
                formData.append('sender_account', senderWallet.trim());
                formData.append('sender_wallet', senderWallet.trim());
            }
            if (transactionRef.trim()) {
                formData.append('transaction_reference', transactionRef.trim());
                formData.append('transaction_ref', transactionRef.trim());
            }
            if (proofImage) {
                formData.append('proof_image', proofImage);
            }

            const res = await depositsApi.submitDeposit(formData);
            const data = res?.data || res;

            if (data?.id) {
                setSubmittedDeposit(data);
                success(language === 'en' ? 'Deposit request submitted successfully! Your receipt is under review.' : 'تم تقديم طلب الإيداع بنجاح! سيتم مراجعة الإيصال وإيداع الرصيد فوراً');
            } else {
                setSubmittedDeposit({
                    id: data?.id || Math.floor(100000 + Math.random() * 900000),
                    amount: numAmount,
                    currency: selectedMethod?.currency || 'EGP',
                });
                success(language === 'en' ? 'Deposit request received successfully!' : 'تم استلام طلب الإيداع بنجاح!');
            }
        } catch (err) {
            toastError(err?.message || (language === 'en' ? 'Failed to submit deposit, please try again' : 'تعذر إرسال طلب الإيداع، يرجى المحاولة مجدداً'));
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
                    background: isLight ? '#FFFFFF' : '#0B0B0F',
                    border: isLight ? '1.5px solid #D4A537' : '1.5px solid #D4A537',
                    borderRadius: '24px',
                    padding: '40px 32px',
                    textAlign: 'center',
                    boxShadow: isLight ? '0 10px 40px rgba(0, 0, 0, 0.08)' : '0 20px 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(212, 165, 55, 0.2)',
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

                    <h2 style={{ margin: '0 0 8px', fontSize: '24px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                        {t('depositSuccessTitle', 'تم إرسال طلب الإيداع بنجاح!')}
                    </h2>

                    <p style={{ margin: '0 0 28px', fontSize: '15px', color: isLight ? '#475569' : '#C5C5D2', lineHeight: '1.7' }}>
                        {language === 'en' ? (
                            <>
                                Deposit request <strong style={{ color: isLight ? '#B45309' : '#F5D061' }}>#{submittedDeposit.id}</strong> for{' '}
                                <strong style={{ color: '#16A34A' }}>{Number(submittedDeposit.amount || numAmount).toLocaleString()} {submittedDeposit.currency || selectedMethod?.currency || 'EGP'}</strong> has been created.
                                <br />
                                The team is matching your transfer and funds will be credited immediately.
                            </>
                        ) : (
                            <>
                                طلب شحن محفظة رقم <strong style={{ color: isLight ? '#B45309' : '#F5D061' }}>#{submittedDeposit.id}</strong> بمبلغ{' '}
                                <strong style={{ color: '#16A34A' }}>{Number(submittedDeposit.amount || numAmount).toLocaleString()} {submittedDeposit.currency || selectedMethod?.currency || 'EGP'}</strong>.
                                <br />
                                يقوم المشرف الآن بمطابقة التحويل وسيتم إضافة الرصيد إلى محفظتك فوراً.
                            </>
                        )}
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
                                    boxShadow: '0 4px 15px rgba(212, 165, 55, 0.3)',
                                }}
                            >
                                {t('viewWalletBalance', 'عرض رصيد المحفظة')}
                            </button>
                        </Link>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <button
                                style={{
                                    padding: '12px 24px',
                                    borderRadius: '14px',
                                    background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
                                    border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(212, 165, 55, 0.3)',
                                    color: isLight ? '#0F172A' : '#E5B842',
                                    fontSize: '15px',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                }}
                            >
                                {t('browseStoreAndRecharge', 'تصفح المتجر والشحن')}
                            </button>
                        </Link>
                    </div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="emperor-deposit-container">

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
                        <span>{t('depositHistory', 'سجل المعاملات والمحفظة')}</span>
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
                            <span>{t('backToPaymentMethods', 'الرجوع لطرق الدفع')}</span>
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
                            <span>{t('back', 'رجوع')}</span>
                            {isRtl ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
                        </button>
                    )}
                </div>

                {/* ═══ VIEW 1: SELECT PAYMENT METHOD ═══ */}
                {!selectedMethod && (
                    <div>
                        {/* Hero Banner */}
                        <div className="deposit-hero-banner">
                            <div className="deposit-hero-content">
                                {/* Right/Left: Title & Intro */}
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
                                        <span>{t('royalDigitalWallet', 'المحفظة الرقمية الملكية')}</span>
                                    </div>

                                    <h1 className="deposit-hero-title">
                                        <Sparkles size={24} color="#D4A537" />
                                        {t('addBalance', 'إضافة رصيد')}
                                    </h1>
                                    <p className="deposit-hero-desc">
                                        {t('depositPageDesc', 'اختر الدولة وطريقة الدفع المناسبة للتحويل، ثم ارفع إشعار العملية لإيداع الرصيد فوراً.')}
                                    </p>
                                </div>

                                {/* Current Balance Badge */}
                                <div className="deposit-balance-capsule">
                                    <div className="deposit-balance-label">
                                        {t('availableBalance', 'رصيدك الحالي')}
                                    </div>
                                    <div className="deposit-balance-val">
                                        {Number(user?.wallet?.balance || 0).toLocaleString(language === 'en' ? 'en-US' : 'ar-EG', { minimumFractionDigits: 2 })} {user?.currency || (language === 'en' ? 'EGP' : 'ج.م')}
                                    </div>
                                </div>
                            </div>

                            {/* Country & Currency Selector Pills */}
                            <div className="deposit-filter-pills-row" style={{ flexWrap: 'wrap' }}>
                                {countries.map((c) => {
                                    const active = activeCountry === c.id;
                                    return (
                                        <button
                                            key={c.id}
                                            onClick={() => setActiveCountry(c.id)}
                                            className={`deposit-filter-pill ${active ? 'active' : ''}`}
                                        >
                                            <span>{c.name}</span>
                                            <span className="deposit-filter-pill-cur">
                                                {c.currency}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Cards Grid */}
                        <div className="deposit-cards-grid">
                            {filteredMethods.map((method) => (
                                <div
                                    key={method.id}
                                    className="ka-deposit-card"
                                    onClick={() => setSelectedMethod(method)}
                                >
                                    {/* Top Bar with Recharge & Flame */}
                                    <div className="ka-card-top-bar">
                                        <span className="ka-card-recharge-tag">
                                            {language === 'en' ? 'Recharge' : 'شحن'}
                                        </span>
                                        <span className="ka-card-flame-tag">
                                            <Flame size={14} color="#F5D061" />
                                            {t('chargeNow', 'اشحن رصيدك')}
                                        </span>
                                    </div>

                                    {/* Elevated White Capsule with Brand Logo */}
                                    <div className="ka-card-white-capsule">
                                        <div className="ka-card-logo-circle">
                                            <PaymentBrandLogo methodId={method.id} size={64} />
                                        </div>
                                    </div>

                                    {/* Golden 0000 Pins */}
                                    <div className="ka-card-pins-box">
                                        0000
                                    </div>

                                    {/* Method Name Badge */}
                                    <div className="ka-card-name-pill">
                                        {method.subName || method.name}
                                    </div>

                                    {/* Translucent Note Box */}
                                    <div className="ka-card-note-box">
                                        <span className="ka-card-note-title">{t('notes', 'ملاحظة')}:</span>
                                        <span>{method.note}</span>
                                    </div>

                                    {/* Bottom Footer Bar */}
                                    <div className="ka-card-footer-bar">
                                        <span className="ka-card-cur-badge">
                                            {method.currency}
                                        </span>
                                        <span className="ka-card-action-text">
                                            <span>{method.tag}</span>
                                            {isRtl ? <ArrowLeft size={12} /> : <ArrowRight size={12} />}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ═══ VIEW 2: DEPOSIT SUBMIT FORM (When Method is Selected) ═══ */}
                {selectedMethod && (
                    <div style={{ maxWidth: '680px', margin: '0 auto' }}>
                        <div className="deposit-form-card">
                            {/* Selected Header */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                marginBottom: '24px',
                                paddingBottom: '18px',
                                borderBottom: isLight ? '1px solid rgba(212, 165, 55, 0.3)' : '1px solid rgba(212, 165, 55, 0.25)',
                            }}>
                                <div style={{
                                    width: '64px',
                                    height: '64px',
                                    borderRadius: '50%',
                                    background: '#FFFFFF',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: isLight ? '0 4px 15px rgba(15, 23, 42, 0.1)' : '0 4px 15px rgba(0, 0, 0, 0.5)',
                                    flexShrink: 0,
                                }}>
                                    <PaymentBrandLogo methodId={selectedMethod.id} size={56} />
                                </div>

                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '900', color: isLight ? '#0f172a' : '#FFFFFF' }}>
                                            {selectedMethod.name}
                                        </h2>
                                        <span className="ka-card-cur-badge">
                                            {selectedMethod.currency}
                                        </span>
                                    </div>
                                    <p style={{ margin: '4px 0 0', fontSize: '13px', color: isLight ? '#475569' : '#A0A0B0' }}>
                                        {selectedMethod.instruction}
                                    </p>
                                </div>
                            </div>

                            {/* Account Details & Copy Box */}
                            <div className="deposit-account-box">
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span style={{ fontSize: '12px', fontWeight: '800', color: isLight ? '#b45309' : '#F5D061' }}>
                                        {selectedMethod.id.includes('usdt') ? (language === 'en' ? 'TRC-20 Wallet Address:' : 'عنوان المحفظة (TRC-20 Address):') : (selectedMethod.id.includes('binance') ? 'Binance Pay ID:' : (language === 'en' ? 'Account / Receiving Wallet Number:' : 'رقم الحساب / المحفظة للتحويل:'))}
                                    </span>
                                    <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: '700' }}>
                                        ✓ {language === 'en' ? 'Verified & Active Now' : 'معتمد ونشط الآن'}
                                    </span>
                                </div>

                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    background: isLight ? '#ffffff' : '#0D0C09',
                                    border: isLight ? '1.5px solid rgba(212, 165, 55, 0.4)' : '1px solid rgba(212, 165, 55, 0.3)',
                                    borderRadius: '12px',
                                    padding: '10px 14px',
                                    gap: '10px',
                                }}>
                                    <span style={{
                                        fontSize: '17px',
                                        fontWeight: '900',
                                        color: isLight ? '#0f172a' : '#FFFFFF',
                                        fontFamily: 'monospace',
                                        letterSpacing: '1px',
                                        wordBreak: 'break-all',
                                    }}>
                                        {selectedMethod.account_number}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() => copyText(selectedMethod.account_number)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            padding: '8px 16px',
                                            borderRadius: '8px',
                                            background: copied ? '#22C55E' : 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)',
                                            border: 'none',
                                            color: '#000000',
                                            fontSize: '13px',
                                            fontWeight: '800',
                                            cursor: 'pointer',
                                            flexShrink: 0,
                                            transition: 'all 0.2s',
                                        }}
                                    >
                                        {copied ? <Check size={14} strokeWidth={3} /> : <Copy size={14} />}
                                        <span>{copied ? t('copied', 'تم النسخ!') : t('copyCode', 'نسخ')}</span>
                                    </button>
                                </div>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmitDeposit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                                {/* Amount Input */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: isLight ? '#0f172a' : '#F3F4F6', marginBottom: '8px' }}>
                                        {t('depositAmountRequired', 'المبلغ المحول')} ({selectedMethod.currency}): <span style={{ color: '#EF4444' }}>*</span>
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type="number"
                                            required
                                            min={selectedMethod.min_amount || 1}
                                            step="any"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder={language === 'en' ? `Enter amount (min ${selectedMethod.min_amount} ${selectedMethod.currency})` : `أدخل المبلغ (الحد الأدنى ${selectedMethod.min_amount} ${selectedMethod.currency})`}
                                            style={{
                                                width: '100%',
                                                boxSizing: 'border-box',
                                                background: isLight ? '#ffffff' : '#0D0C09',
                                                border: isLight ? '1.5px solid rgba(212, 165, 55, 0.45)' : '1.5px solid rgba(255, 255, 255, 0.15)',
                                                borderRadius: '12px',
                                                padding: '12px 16px',
                                                color: isLight ? '#0f172a' : '#FFFFFF',
                                                fontSize: '16px',
                                                fontWeight: '800',
                                                outline: 'none',
                                            }}
                                        />
                                    </div>

                                    {/* Quick Amount Preset Chips */}
                                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '10px' }}>
                                        {[100, 250, 500, 1000, 2000].map((val) => (
                                            <button
                                                key={val}
                                                type="button"
                                                className="deposit-amount-preset-btn"
                                                onClick={() => setAmount(String(val))}
                                            >
                                                +{val} {selectedMethod.currency}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Sender Phone / Account Number */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: isLight ? '#0f172a' : '#F3F4F6', marginBottom: '8px' }}>
                                        {t('senderWalletLabel', 'رقم المحفظة أو الحساب المحول منه')}: <span style={{ color: '#EF4444' }}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={senderWallet}
                                        onChange={(e) => setSenderWallet(e.target.value)}
                                        placeholder={language === 'en' ? 'e.g. 01012345678 or sender account name' : 'مثال: 01012345678 أو اسم المحول'}
                                        style={{
                                            width: '100%',
                                            boxSizing: 'border-box',
                                            background: isLight ? '#ffffff' : '#0D0C09',
                                            border: isLight ? '1.5px solid rgba(212, 165, 55, 0.45)' : '1.5px solid rgba(255, 255, 255, 0.15)',
                                            borderRadius: '12px',
                                            padding: '12px 16px',
                                            color: isLight ? '#0f172a' : '#FFFFFF',
                                            fontSize: '14px',
                                            outline: 'none',
                                        }}
                                    />
                                </div>

                                {/* Transaction Reference / ID */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: isLight ? '#0f172a' : '#F3F4F6', marginBottom: '8px' }}>
                                        {t('transactionRefLabel', 'رقم العملية أو المرجع (إن وجد)')}:
                                    </label>
                                    <input
                                        type="text"
                                        value={transactionRef}
                                        onChange={(e) => setTransactionRef(e.target.value)}
                                        placeholder={language === 'en' ? 'e.g. Transfer Ref # or TXID' : 'مثال: رقم الحوالة أو الـ TXID من الرسالة'}
                                        style={{
                                            width: '100%',
                                            boxSizing: 'border-box',
                                            background: isLight ? '#ffffff' : '#0D0C09',
                                            border: isLight ? '1.5px solid rgba(212, 165, 55, 0.45)' : '1.5px solid rgba(255, 255, 255, 0.15)',
                                            borderRadius: '12px',
                                            padding: '12px 16px',
                                            color: isLight ? '#0f172a' : '#FFFFFF',
                                            fontSize: '14px',
                                            outline: 'none',
                                        }}
                                    />
                                </div>

                                {/* Receipt Proof Image Upload */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: isLight ? '#0f172a' : '#F3F4F6', marginBottom: '8px' }}>
                                        {t('attachProofReceipt', 'صورة إيصال التحويل (Screenshot)')}:
                                    </label>
                                    <label style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '20px',
                                        border: isLight ? '2px dashed rgba(212, 165, 55, 0.6)' : '2px dashed rgba(212, 165, 55, 0.4)',
                                        borderRadius: '14px',
                                        background: isLight ? '#ffffff' : 'rgba(0, 0, 0, 0.4)',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                    }}>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            style={{ display: 'none' }}
                                        />
                                        {proofPreview ? (
                                            <div style={{ textAlign: 'center' }}>
                                                <img
                                                    src={proofPreview}
                                                    alt="إيصال التحويل"
                                                    style={{ maxHeight: '120px', borderRadius: '8px', marginBottom: '8px' }}
                                                />
                                                <div style={{ color: '#16a34a', fontSize: '12px', fontWeight: '800' }}>
                                                    ✓ {language === 'en' ? 'Image selected (click to change)' : 'تم اختيار الصورة (انقر للتغيير)'}
                                                </div>
                                            </div>
                                        ) : (
                                            <div style={{ textAlign: 'center', color: isLight ? '#64748b' : '#9CA3AF' }}>
                                                <Upload size={24} color="#D4A537" style={{ marginBottom: '6px' }} />
                                                <div style={{ fontSize: '13px', fontWeight: '700', color: isLight ? '#0f172a' : '#E2E8F0' }}>
                                                    {language === 'en' ? 'Click to upload receipt screenshot' : 'اضغط لرفع لقطة شاشة الإيصال'}
                                                </div>
                                                <div style={{ fontSize: '11px', marginTop: '3px' }}>
                                                    {language === 'en' ? 'PNG, JPG up to 5MB' : 'PNG, JPG حتى 5 ميجابايت'}
                                                </div>
                                            </div>
                                        )}
                                    </label>
                                </div>

                                {/* Submit & Cancel Buttons */}
                                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px', marginTop: '10px' }}>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        style={{
                                            padding: '14px 20px',
                                            borderRadius: '14px',
                                            background: 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)',
                                            border: 'none',
                                            color: '#08080a',
                                            fontSize: '15px',
                                            fontWeight: '900',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px',
                                            boxShadow: '0 8px 24px rgba(212, 165, 55, 0.4)',
                                            opacity: submitting ? 0.7 : 1,
                                        }}
                                    >
                                        <Zap size={18} />
                                        <span>{submitting ? (language === 'en' ? 'Submitting request...' : 'جاري إرسال الطلب...') : (language === 'en' ? `Confirm Deposit (${numAmount || 0} ${selectedMethod.currency})` : `تأكيد إيداع (${numAmount || 0} ${selectedMethod.currency})`)}</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setSelectedMethod(null)}
                                        style={{
                                            padding: '14px',
                                            borderRadius: '14px',
                                            background: isLight ? '#ffffff' : 'rgba(255, 255, 255, 0.05)',
                                            border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255, 255, 255, 0.15)',
                                            color: isLight ? '#475569' : '#CBD5E1',
                                            fontSize: '14px',
                                            fontWeight: '800',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {t('cancel', 'إلغاء')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}

