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
import { getCurrencyLabel } from '../utils/currencyHelper';

export default function DepositPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { user, isAuthenticated } = useAuth();
    const { success, error: toastError } = useToast();
    const { isRtl, t, language } = useLanguage();
    const { theme } = useTheme();
    const isLight = theme === 'light';

    const [activeCountry, setActiveCountry] = useState('all');
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 640 : false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 640);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
    const [loadingMethods, setLoadingMethods] = useState(true);
    const [ratesList, setRatesList] = useState([]);
    const [balanceData, setBalanceData] = useState(null);

    // Initial fallback if database is empty or loading
    const fallbackPaymentMethods = [
        {
            id: 1,
            code: 'vodafone_cash',
            country: 'egypt',
            country_name: 'تحويل مصر',
            name: 'فودافون كاش',
            subName: 'VF-CASH',
            currency: 'EGP',
            min_amount: 50,
            account_number: '01025515743',
            note: 'أدخل رقم المحفظة المحول منها، ويمكن إضافة رقم العملية والإيصال لتسريع المراجعة.',
            instruction: 'أقل تحويل 50 ج، يتم مراجعة الإيصال وإيداع الرصيد في محفظتك فوراً.',
            tag: 'تحويل مصر',
        },
        {
            id: 2,
            code: 'cliq_jordan',
            country: 'jordan',
            country_name: 'تحويل الأردن',
            name: 'كليك (CliQ Jordan)',
            subName: 'CliQ الأردن',
            currency: 'JOD',
            min_amount: 5,
            account_number: 'EMPEROR_CLIQ',
            note: 'تحويل فوري عبر نظام كليك الأردني بدون عمولات',
            instruction: 'حول عبر اسم المستخدم أو الآيبان ثم أرفق إشعار التحويل.',
            tag: 'تحويل الأردن',
        },
        {
            id: 3,
            code: 'instapay',
            country: 'egypt',
            country_name: 'تحويل مصر',
            name: 'انستا بي (InstaPay)',
            subName: 'انستا بي',
            currency: 'EGP',
            min_amount: 50,
            account_number: 'ahmedsalah@instapay',
            note: 'ahmedsalah',
            instruction: 'حول عبر انستاباي إلى العنوان المعرف ثم ارفع سكرين شوت الإيصال.',
            tag: 'تحويل مصر',
        },
        {
            id: 4,
            code: 'usdt_crypto',
            country: 'crypto',
            country_name: 'تحويل USDT دولي',
            name: 'USDT (TRC-20)',
            subName: 'USDT TRC20',
            currency: 'USD',
            min_amount: 5,
            account_number: 'TYDzsYbm76DDF4nZp3eM1eF78B99Q1x2Z8',
            note: 'تحويل دولي مشفر عبر شبكة ترون TRC20',
            instruction: 'حول عملة USDT عبر شبكة TRC20 وأدخل معرف العملية TXID ولقطة الشاشة.',
            tag: 'تحويل USDT دولي',
        },
    ];

    useEffect(() => {
        fetch('/api/v1/wallet/balance', { headers: { Accept: 'application/json', Authorization: `Bearer ${localStorage.getItem('emperor_token') || ''}` } })
            .then(res => res.ok ? res.json() : null)
            .then(json => setBalanceData(json?.data || null))
            .catch(() => {});
        setLoadingMethods(true);
        depositsApi.getMethods()
            .then(res => {
                const data = res?.data || res;
                if (Array.isArray(data) && data.length > 0) {
                    setDbMethods(data);
                }
            })
            .catch(() => {})
            .finally(() => {
                setLoadingMethods(false);
            });

        // Fetch currency exchange rates to show USD equivalence
        fetch('/api/v1/currencies/rates')
            .then(res => res.json())
            .then(json => {
                if (json?.data && Array.isArray(json.data)) {
                    setRatesList(json.data);
                }
            })
            .catch(() => {});
    }, []);

    // Current active payment methods source (DB first, fallback second)
    const activeMethods = dbMethods.length > 0 ? dbMethods : fallbackPaymentMethods;

    // Start with the deposit rails for the customer's registered country so
    // Saudi users see SAR methods instead of the first Egyptian method.
    useEffect(() => {
        const country = String(user?.country || '').trim().toLowerCase();
        const preferred = ({
            sa: { countries: ['saudi', 'saudiarabia'], currency: 'SAR' }, 'saudi arabia': { countries: ['saudi', 'saudiarabia'], currency: 'SAR' }, السعودية: { countries: ['saudi', 'saudiarabia'], currency: 'SAR' },
            eg: { countries: ['egypt'], currency: 'EGP' }, egypt: { countries: ['egypt'], currency: 'EGP' }, مصر: { countries: ['egypt'], currency: 'EGP' },
            ae: { countries: ['uae', 'emirates'], currency: 'AED' }, uae: { countries: ['uae', 'emirates'], currency: 'AED' }, 'united arab emirates': { countries: ['uae', 'emirates'], currency: 'AED' }, الإمارات: { countries: ['uae', 'emirates'], currency: 'AED' },
            jo: { countries: ['jordan'], currency: 'JOD' }, jordan: { countries: ['jordan'], currency: 'JOD' }, الأردن: { countries: ['jordan'], currency: 'JOD' },
            ye: { countries: ['yemen'], currency: 'YER' }, yemen: { countries: ['yemen'], currency: 'YER' }, اليمن: { countries: ['yemen'], currency: 'YER' },
        })[country];
        if (!preferred) return;

        const normalize = (value) => String(value || '').toLowerCase().replace(/[^a-z]/g, '');
        const countryMethod = activeMethods.find((method) => preferred.countries.includes(normalize(method.country)));
        const matchingMethod = countryMethod || activeMethods.find((method) => String(method.currency || '').toUpperCase() === preferred.currency);
        if (matchingMethod?.country) setActiveCountry(matchingMethod.country);
    }, [user?.country, dbMethods]);

    // Dynamically generate the country tabs from whatever the Admin created in Dashboard
    const countries = React.useMemo(() => {
        const list = [
            { id: 'all', name: language === 'en' ? 'Wallet' : 'المحفظة', currency: 'USD' }
        ];
        const seen = new Set();

        activeMethods.forEach((m) => {
            const countryKey = m.country || 'other';
            if (!seen.has(countryKey)) {
                seen.add(countryKey);
                list.push({
                    id: countryKey,
                    name: m.country_name || m.tag || m.country,
                    currency: m.currency || 'USD',
                });
            }
        });
        return list;
    }, [activeMethods, language]);

    const filteredMethods = activeMethods.filter(m => {
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

    const enteredAmount = parseFloat(amount) || 0;
    const displayCurrency = String(user?.currency || balanceData?.preferred_currency || user?.wallet?.currency || 'EGP').toUpperCase();
    const numAmount = (() => {
        if (!selectedMethod || !enteredAmount) return enteredAmount;
        const source = displayCurrency === 'EGY' ? 'EGP' : displayCurrency;
        const target = String(selectedMethod.currency || 'EGP').toUpperCase();
        if (source === target) return enteredAmount;
        const direct = ratesList.find(rate => rate.from_currency === source && rate.to_currency === target && rate.is_active && Number(rate.rate) > 0);
        if (direct) return enteredAmount * Number(direct.rate);
        const inverse = ratesList.find(rate => rate.from_currency === target && rate.to_currency === source && rate.is_active && Number(rate.rate) > 0);
        if (inverse) return enteredAmount / Number(inverse.rate);
        const sourceToUsd = ratesList.find(rate => rate.from_currency === source && rate.to_currency === 'USD' && rate.is_active && Number(rate.rate) > 0);
        const usdToTarget = ratesList.find(rate => rate.from_currency === 'USD' && rate.to_currency === target && rate.is_active && Number(rate.rate) > 0);
        if (sourceToUsd && usdToTarget) return enteredAmount * Number(sourceToUsd.rate) * Number(usdToTarget.rate);
        const targetToUsd = ratesList.find(rate => rate.from_currency === target && rate.to_currency === 'USD' && rate.is_active && Number(rate.rate) > 0);
        const usdToSource = ratesList.find(rate => rate.from_currency === 'USD' && rate.to_currency === source && rate.is_active && Number(rate.rate) > 0);
        if (targetToUsd && usdToSource) return enteredAmount * Number(usdToSource.rate) / Number(targetToUsd.rate);
        return null;
    })();
    const convertFromUsd = (usd) => {
        const targetCurrency = displayCurrency === 'EGY' ? 'EGP' : displayCurrency;
        if (targetCurrency === 'USD') return usd;
        const direct = ratesList.find(rate => rate.from_currency === 'USD' && rate.to_currency === targetCurrency && rate.is_active);
        const inverse = ratesList.find(rate => rate.from_currency === targetCurrency && rate.to_currency === 'USD' && rate.is_active);
        if (direct && Number(direct.rate) > 0) return usd * Number(direct.rate);
        if (inverse && Number(inverse.rate) > 0) return usd / Number(inverse.rate);
        return targetCurrency === 'EGP' ? usd * 59 : null;
    };
    const displayedBalance = (balanceData?.wallets || []).reduce((total, wallet) => {
        const currency = String(wallet.currency || '').toUpperCase();
        const balance = Number(wallet.available_balance ?? wallet.balance ?? 0);
        if (currency === 'USD' || currency === 'USDT') return total + convertFromUsd(balance);
        const toUsd = ratesList.find(rate => rate.from_currency === currency && rate.to_currency === 'USD' && rate.is_active);
        const fromUsd = ratesList.find(rate => rate.from_currency === 'USD' && rate.to_currency === currency && rate.is_active);
        const usd = toUsd && Number(toUsd.rate) > 0 ? balance * Number(toUsd.rate) : fromUsd && Number(fromUsd.rate) > 0 ? balance / Number(fromUsd.rate) : (currency === 'EGP' || currency === 'EGY' ? balance / 59 : null);
        return usd === null ? total : total + (convertFromUsd(usd) || 0);
    }, 0);
    const walletDisplayBalance = balanceData?.preferred_currency === displayCurrency
        ? Number(balanceData.preferred_balance)
        : displayedBalance;

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

        if (numAmount === null || !Number.isFinite(numAmount)) {
            toastError(language === 'en' ? `No active exchange rate from ${displayCurrency} to ${selectedMethod?.currency || 'EGP'}` : `سعر التحويل من ${displayCurrency} إلى ${selectedMethod?.currency || 'EGP'} غير متاح حالياً`);
            return;
        }

        if (numAmount <= 0) {
            toastError(language === 'en' ? 'Please enter deposit amount' : 'يرجى إدخال مبلغ الإيداع');
            return;
        }

        if (!senderWallet.trim()) {
            toastError(language === 'en' ? 'Please enter the sender wallet number' : 'يرجى إدخال رقم المحفظة المحول منها');
            return;
        }

        setSubmitting(true);
        try {
            const formData = new FormData();
            
            if (selectedMethod?.id) {
                formData.append('payment_method_id', String(selectedMethod.id));
            }
            formData.append('method', selectedMethod?.code || selectedMethod?.name || 'manual');
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
                            className="ka-top-back-btn"
                        >
                            <span>{t('backToPaymentMethods', 'الرجوع لطرق الدفع')}</span>
                            {isRtl ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
                        </button>
                    ) : (
                        <button
                            onClick={() => navigate(-1)}
                            className="ka-top-back-btn"
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
                                        {Number(walletDisplayBalance ?? user?.wallet?.balance ?? 0).toLocaleString(language === 'en' ? 'en-US' : 'ar-EG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {getCurrencyLabel(displayCurrency, language)}
                                    </div>
                                </div>
                            </div>

                            {/* Country & Currency Selector Pills */}
                            <div className="deposit-filter-pills-row">
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
                                    <div className="ka-deposit-card-inner">
                                        {/* Top Bar with Recharge & Flame */}
                                        <div className="ka-card-top-bar">
                                            <span className="ka-card-recharge-tag">
                                                Recharge
                                            </span>
                                            <span className="ka-card-flame-tag">
                                                <Flame size={isMobile ? 11 : 13} color="#FCD34D" fill="#FCD34D" />
                                                <span>{t('chargeNow', 'اشحن رصيدك')}</span>
                                            </span>
                                        </div>

                                        {/* Elevated Capsule with Brand Logo (Replaced stark white box) */}
                                        <div className="ka-card-white-capsule">
                                            <div className="ka-card-logo-circle">
                                                {method.logo ? (
                                                    <img
                                                        src={method.logo}
                                                        alt={method.name}
                                                        onError={(e) => {
                                                            e.currentTarget.style.display = 'none';
                                                            const fallback = e.currentTarget.parentElement?.querySelector('.brand-vector-fallback');
                                                            if (fallback) fallback.style.display = 'flex';
                                                        }}
                                                        style={{
                                                            maxWidth: isMobile ? '46px' : '62px',
                                                            maxHeight: isMobile ? '46px' : '62px',
                                                            objectFit: 'contain',
                                                            borderRadius: '8px'
                                                        }}
                                                    />
                                                ) : null}
                                                <div className="brand-vector-fallback" style={{ display: method.logo ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <PaymentBrandLogo methodId={method.code || method.id} size={isMobile ? 48 : 64} />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Outlined 0000 Pins Box */}
                                        <div className="ka-card-pins-box">
                                            <span className="ka-card-pins-badge">0000</span>
                                        </div>

                                        {/* Method Name Text */}
                                        <div className="ka-card-name-text">
                                            {method.subName || method.sub_name || method.name}
                                        </div>

                                        {/* Translucent Note Box */}
                                        <div className="ka-card-note-box">
                                            <span className="ka-card-note-title">{t('notes', 'ملاحظة')}</span>
                                            <span className="ka-card-note-text">{method.note || t('instantTransfer', 'تحويل فوري ومعتمد')}</span>
                                        </div>

                                        {/* Bottom Footer Bar */}
                                        <div className="ka-card-footer-bar">
                                            <span className="ka-card-cur-badge">
                                                {method.currency}
                                            </span>
                                            <span className="ka-card-action-text">
                                                <span>{method.country_name || method.tag || method.name}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ═══ VIEW 2: DEPOSIT SUBMIT FORM (Matching SM-Cards Luxury Royal Navy & Gold Theme) ═══ */}
                {selectedMethod && (
                    <div style={{ maxWidth: '780px', margin: '0 auto', direction: 'rtl' }}>
                        {/* Header Box: "تفاصيل الدفع - أدخل بيانات التحويل كما تظهر في الإيصال" */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            marginBottom: '26px',
                            textAlign: 'center',
                        }}>
                            <div style={{
                                width: '42px',
                                height: '42px',
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, rgba(245, 208, 97, 0.2) 0%, rgba(56, 189, 248, 0.2) 100%)',
                                border: '1px solid rgba(245, 208, 97, 0.4)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#F5D061',
                                flexShrink: 0
                            }}>
                                <FileText size={22} />
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '900', color: isLight ? '#0F172A' : '#F5D061' }}>
                                    تفاصيل الدفع
                                </h2>
                                <p style={{ margin: '3px 0 0', fontSize: '13px', color: isLight ? '#64748B' : '#94A3B8' }}>
                                    أدخل بيانات التحويل كما تظهر في الإيصال
                                </p>
                            </div>
                        </div>

                        {/* Account Number Banner */}
                        <div style={{
                            background: isLight ? '#F8FAFC' : 'linear-gradient(145deg, #09172e 0%, #060e1d 100%)',
                            border: isLight ? '1px solid #E2E8F0' : '1.5px solid rgba(56, 189, 248, 0.35)',
                            borderRadius: '18px',
                            padding: '14px 20px',
                            marginBottom: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '14px',
                            boxShadow: '0 8px 25px rgba(0,0,0,0.4), 0 0 15px rgba(56, 189, 248, 0.1)'
                        }}>
                            <div>
                                <span style={{ display: 'block', fontSize: '11.5px', fontWeight: '800', color: '#F5D061', marginBottom: '4px' }}>
                                    {selectedMethod.name} — رقم الحساب / المحفظة المحول إليها:
                                </span>
                                <span style={{ fontSize: '17px', fontWeight: '900', color: '#38BDF8', fontFamily: 'monospace', letterSpacing: '1px' }}>
                                    {selectedMethod.account_number}
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => copyText(selectedMethod.account_number)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '8px 16px',
                                    borderRadius: '10px',
                                    background: copied ? '#22C55E' : 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)',
                                    border: 'none',
                                    color: '#08080A',
                                    fontSize: '13px',
                                    fontWeight: '900',
                                    cursor: 'pointer',
                                    flexShrink: 0,
                                    boxShadow: '0 4px 15px rgba(245, 208, 97, 0.35)',
                                }}
                            >
                                {copied ? <Check size={14} strokeWidth={3} /> : <Copy size={14} />}
                                <span>{copied ? 'تم النسخ!' : 'نسخ'}</span>
                            </button>
                        </div>

                        <form onSubmit={handleSubmitDeposit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                            {/* ══ 1. Amount Input with Integrated Currency Pill & Live USD Equivalency ══ */}
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    <span style={{ fontSize: '13.5px', fontWeight: '800', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                        المبلغ
                                    </span>
                                    {amount && numAmount !== null && numAmount >= (selectedMethod.min_amount || 1) && (
                                        <span style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            fontSize: '12px',
                                            fontWeight: '800',
                                            color: '#22c55e',
                                        }}>
                                            <Check size={14} strokeWidth={3} />
                                            <span>تم</span>
                                        </span>
                                    )}
                                </div>

                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    background: isLight ? '#FFFFFF' : 'linear-gradient(145deg, #09172e 0%, #060e1d 100%)',
                                    border: isLight ? '1.5px solid #CBD5E1' : '1.5px solid rgba(56, 189, 248, 0.45)',
                                    borderRadius: '24px',
                                    padding: '6px 8px 6px 20px',
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.4), 0 0 15px rgba(56, 189, 248, 0.1)',
                                    transition: 'all 0.2s',
                                }}>
                                    <input
                                        type="number"
                                        required
                                        min={displayCurrency === (selectedMethod.currency || 'EGP').toUpperCase() ? (selectedMethod.min_amount || 1) : undefined}
                                        step="any"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder={`أدخل المبلغ (${getCurrencyLabel(displayCurrency, language)})`}
                                        style={{
                                            flex: 1,
                                            background: 'transparent',
                                            border: 'none',
                                            outline: 'none',
                                            color: '#FFFFFF',
                                            fontSize: '22px',
                                            fontWeight: '900',
                                            fontFamily: 'Cairo, sans-serif',
                                            textAlign: 'left',
                                            direction: 'ltr',
                                            padding: '8px 10px',
                                        }}
                                    />

                                    {/* Currency Pill Tag (Matching SM-Cards Gold Pill) */}
                                    <div style={{
                                        background: 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)',
                                        color: '#08080A',
                                        fontSize: '16px',
                                        fontWeight: '900',
                                        padding: '10px 22px',
                                        borderRadius: '18px',
                                        letterSpacing: '0.5px',
                                        boxShadow: '0 4px 15px rgba(245, 208, 97, 0.35)',
                                        flexShrink: 0
                                    }}>
                                        {getCurrencyLabel(displayCurrency, language)}
                                    </div>
                                </div>

                                {/* Live USD Equivalence Badge (Directly below amount input on the left) */}
                                {(() => {
                                    let cur = displayCurrency.toUpperCase();
                                    if (cur === 'EGY') cur = 'EGP';
                                    const val = enteredAmount;
                                    if (!val || val <= 0) return null;

                                    let usdEquivalent = null;
                                    if (cur === 'USD' || cur === 'USDT') {
                                        usdEquivalent = val;
                                    } else {
                                        const directRate = ratesList.find(r => (r.from_currency === cur || (cur === 'EGP' && r.from_currency === 'EGY')) && r.to_currency === 'USD' && r.is_active);
                                        if (directRate && Number(directRate.rate) > 0) {
                                            usdEquivalent = val * Number(directRate.rate);
                                        } else {
                                            const inverseRate = ratesList.find(r => r.from_currency === 'USD' && (r.to_currency === cur || (cur === 'EGP' && r.to_currency === 'EGY')) && r.is_active);
                                            if (inverseRate && Number(inverseRate.rate) > 0) {
                                                usdEquivalent = val / Number(inverseRate.rate);
                                            }
                                        }
                                    }

                                    if (usdEquivalent === null) return null;
                                    const convertedMethodAmount = selectedMethod
                                        ? (() => {
                                            const source = cur;
                                            const target = String(selectedMethod.currency || 'EGP').toUpperCase();
                                            if (source === target) return val;
                                            const direct = ratesList.find(r => r.from_currency === source && r.to_currency === target && r.is_active && Number(r.rate) > 0);
                                            if (direct) return val * Number(direct.rate);
                                            const inverse = ratesList.find(r => r.from_currency === target && r.to_currency === source && r.is_active && Number(r.rate) > 0);
                                            if (inverse) return val / Number(inverse.rate);
                                            const sourceToUsd = ratesList.find(r => r.from_currency === source && r.to_currency === 'USD' && r.is_active && Number(r.rate) > 0);
                                            const usdToTarget = ratesList.find(r => r.from_currency === 'USD' && r.to_currency === target && r.is_active && Number(r.rate) > 0);
                                            return sourceToUsd && usdToTarget ? val * Number(sourceToUsd.rate) * Number(usdToTarget.rate) : null;
                                        })()
                                        : null;
                                    const usdToUserRate = ratesList.find(r => r.from_currency === 'USD' && (r.to_currency === cur || (cur === 'EGP' && r.to_currency === 'EGY')) && r.is_active && Number(r.rate) > 0);
                                    const rateInfo = usdToUserRate ? ` • 1 USD ≈ ${Number(usdToUserRate.rate).toLocaleString('en-US', { maximumFractionDigits: 2 })} ${getCurrencyLabel(cur, language)}` : '';
                                    return (
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            marginTop: '8px',
                                            direction: 'ltr',
                                            flexWrap: 'wrap',
                                            gap: '8px'
                                        }}>
                                            <span style={{
                                                fontSize: '13px',
                                                fontWeight: '900',
                                                color: '#38BDF8',
                                                background: 'rgba(56, 189, 248, 0.12)',
                                                border: '1px solid rgba(56, 189, 248, 0.35)',
                                                padding: '4px 12px',
                                                borderRadius: '8px',
                                                fontFamily: 'monospace',
                                                boxShadow: '0 0 10px rgba(56, 189, 248, 0.15)'
                                            }}>
                                                ≈ {usdEquivalent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD{rateInfo}
                                            </span>
                                        </div>
                                    );
                                })()}
                            </div>

                            {/* ══ 2. Two-Column Row: [ رقم العملية ] & [ رقم المحفظة المحول منها ] ══ */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                                gap: '16px',
                            }}>
                                {/* Right Box: رقم المحفظة المحول منها */}
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                        <span style={{ fontSize: '13.5px', fontWeight: '800', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                            رقم المحفظة المحول منها
                                        </span>
                                        <span style={{
                                            fontSize: '10.5px',
                                            fontWeight: '800',
                                            color: '#F5D061',
                                            background: 'rgba(245, 208, 97, 0.15)',
                                            border: '1px solid rgba(245, 208, 97, 0.3)',
                                            padding: '2px 8px',
                                            borderRadius: '6px',
                                        }}>
                                            مطلوب
                                        </span>
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        background: isLight ? '#FFFFFF' : 'linear-gradient(145deg, #09172e 0%, #060e1d 100%)',
                                        border: isLight ? '1.5px solid #CBD5E1' : '1.5px solid rgba(56, 189, 248, 0.4)',
                                        borderRadius: '20px',
                                        padding: '6px 8px 6px 14px',
                                    }}>
                                        <input
                                            type="text"
                                            required
                                            value={senderWallet}
                                            onChange={(e) => setSenderWallet(e.target.value)}
                                            placeholder="أدخل رقم المحفظة التي تم التحويل منها"
                                            style={{
                                                flex: 1,
                                                background: 'transparent',
                                                border: 'none',
                                                outline: 'none',
                                                color: '#FFFFFF',
                                                fontSize: '13.5px',
                                                fontWeight: '700',
                                                fontFamily: 'Cairo, sans-serif',
                                                padding: '8px 6px',
                                            }}
                                        />
                                        <div style={{
                                            width: '38px',
                                            height: '38px',
                                            borderRadius: '12px',
                                            background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2) 0%, rgba(14, 165, 233, 0.2) 100%)',
                                            border: '1px solid rgba(56, 189, 248, 0.4)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#38BDF8',
                                            flexShrink: 0
                                        }}>
                                            <Smartphone size={18} />
                                        </div>
                                    </div>
                                </div>

                                {/* Left Box: رقم العملية (اختياري) */}
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                        <span style={{ fontSize: '13.5px', fontWeight: '800', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                            رقم العملية (اختياري)
                                        </span>
                                        <span style={{
                                            fontSize: '10.5px',
                                            fontWeight: '800',
                                            color: '#F5D061',
                                            background: 'rgba(245, 208, 97, 0.15)',
                                            border: '1px solid rgba(245, 208, 97, 0.3)',
                                            padding: '2px 8px',
                                            borderRadius: '6px',
                                        }}>
                                            اختياري
                                        </span>
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        background: isLight ? '#FFFFFF' : 'linear-gradient(145deg, #09172e 0%, #060e1d 100%)',
                                        border: isLight ? '1.5px solid #CBD5E1' : '1.5px solid rgba(56, 189, 248, 0.4)',
                                        borderRadius: '20px',
                                        padding: '6px 8px 6px 14px',
                                    }}>
                                        <input
                                            type="text"
                                            value={transactionRef}
                                            onChange={(e) => setTransactionRef(e.target.value)}
                                            placeholder="أدخل رقم العملية إن وجد"
                                            style={{
                                                flex: 1,
                                                background: 'transparent',
                                                border: 'none',
                                                outline: 'none',
                                                color: '#FFFFFF',
                                                fontSize: '13.5px',
                                                fontWeight: '700',
                                                fontFamily: 'Cairo, sans-serif',
                                                padding: '8px 6px',
                                            }}
                                        />
                                        <div style={{
                                            width: '38px',
                                            height: '38px',
                                            borderRadius: '12px',
                                            background: 'linear-gradient(135deg, rgba(245, 208, 97, 0.2) 0%, rgba(212, 165, 55, 0.2) 100%)',
                                            border: '1px solid rgba(245, 208, 97, 0.4)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#F5D061',
                                            fontWeight: '900',
                                            fontSize: '18px',
                                            flexShrink: 0
                                        }}>
                                            #
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ══ 3. Receipt Upload Area ══ */}
                            <div>
                                <label style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '16px',
                                    border: isLight ? '2px dashed #CBD5E1' : '2px dashed rgba(56, 189, 248, 0.4)',
                                    borderRadius: '18px',
                                    background: isLight ? '#F8FAFC' : 'rgba(56, 189, 248, 0.04)',
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
                                                style={{ maxHeight: '100px', borderRadius: '10px', marginBottom: '6px' }}
                                            />
                                            <div style={{ color: '#22c55e', fontSize: '12px', fontWeight: '800' }}>
                                                ✓ تم إرفاق صورة الإيصال (اضغط للتغيير)
                                            </div>
                                        </div>
                                    ) : (
                                        <div style={{ textAlign: 'center', color: isLight ? '#64748B' : '#9CA3AF' }}>
                                            <Upload size={22} color="#38BDF8" style={{ marginBottom: '4px' }} />
                                            <div style={{ fontSize: '13px', fontWeight: '800', color: isLight ? '#0F172A' : '#E2E8F0' }}>
                                                اضغط لرفع لقطة شاشة الإيصال (اختياري / لتسريع التأكيد)
                                            </div>
                                        </div>
                                    )}
                                </label>
                            </div>

                            {/* ══ 4. Summary Box: [المبلغ الأساسي] & [الإجمالي المطلوب تحويله] ══ */}
                            <div style={{
                                background: isLight ? '#F8FAFC' : 'linear-gradient(145deg, #09172e 0%, #060e1d 100%)',
                                border: isLight ? '1px solid #E2E8F0' : '1.5px solid rgba(56, 189, 248, 0.3)',
                                borderRadius: '20px',
                                padding: '18px 24px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '14px',
                                boxShadow: '0 8px 25px rgba(0,0,0,0.4)'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '14px', fontWeight: '800', color: isLight ? '#64748B' : '#A0A0B0' }}>
                                        المبلغ الأساسي ({getCurrencyLabel(displayCurrency, language)})
                                    </span>
                                    <span style={{ fontSize: '15px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF', fontFamily: 'monospace' }}>
                                        {numAmount !== null && numAmount > 0 ? enteredAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'} {getCurrencyLabel(displayCurrency, language)}
                                    </span>
                                </div>

                                <div style={{
                                    height: '1px',
                                    background: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)'
                                }} />

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '15px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                        الإجمالي المطلوب تحويله عبر طريقة الدفع
                                    </span>
                                    <span style={{ fontSize: '20px', fontWeight: '900', color: '#F5D061', fontFamily: 'monospace' }}>
                                        {numAmount !== null && numAmount > 0 ? numAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'} {selectedMethod.currency}
                                    </span>
                                </div>
                            </div>

                            {/* ══ 5. Submit Button: [تأكيد الدفع ✔] (SM-Cards Golden Glow Gradient) ══ */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    style={{
                                        width: '100%',
                                        padding: '16px',
                                        borderRadius: '24px',
                                        background: 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)',
                                        border: 'none',
                                        color: '#08080A',
                                        fontSize: '16px',
                                        fontWeight: '900',
                                        cursor: submitting ? 'not-allowed' : 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '10px',
                                        boxShadow: '0 8px 30px rgba(245, 208, 97, 0.4)',
                                        fontFamily: 'Cairo, sans-serif',
                                        opacity: submitting ? 0.7 : 1,
                                    }}
                                >
                                    <CheckCircle2 size={20} />
                                    <span>{submitting ? 'جاري إرسال الطلب...' : 'تأكيد الدفع'}</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setSelectedMethod(null)}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: isLight ? '#64748B' : '#9CA3AF',
                                        fontSize: '13.5px',
                                        fontWeight: '800',
                                        cursor: 'pointer',
                                        padding: '8px',
                                        textAlign: 'center',
                                    }}
                                >
                                    الرجوع لاختيار طريقة دفع أخرى
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}

