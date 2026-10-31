import React, { useState, useEffect } from 'react';
import {
    DollarSign,
    RefreshCw,
    Plus,
    Edit3,
    Trash2,
    CheckCircle2,
    XCircle,
    ArrowRightLeft,
    TrendingUp,
    Shield,
    Calculator,
    AlertCircle,
    Layers,
    X
} from 'lucide-react';
import { adminApi } from '../../api/endpoints';
import { useToast } from '../../contexts/ToastContext';
import { useTheme } from '../../contexts/ThemeContext';
import AdminHeader from '../../components/admin/AdminHeader';

export default function AdminCurrenciesPage() {
    const { theme } = useTheme();
    const isLight = theme === 'light';
    const { success, error: toastError } = useToast();

    const [loading, setLoading] = useState(true);
    const [rates, setRates] = useState([]);
    const [supportedCurrencies, setSupportedCurrencies] = useState(['USD', 'EGP', 'SAR', 'AED', 'JOD', 'KWD', 'QAR', 'EUR', 'TRY', 'USDT']);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRate, setEditingRate] = useState(null);
    const [modalSubmitting, setModalSubmitting] = useState(false);

    // Form inputs
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EGP');
    const [rateValue, setRateValue] = useState('');
    const [feePercent, setFeePercent] = useState('0');
    const [isActive, setIsActive] = useState(true);

    // Quick conversion calculator state
    const [calcAmount, setCalcAmount] = useState('100');
    const [calcFrom, setCalcFrom] = useState('USD');
    const [calcTo, setCalcTo] = useState('EGP');

    const fetchRates = async () => {
        try {
            setLoading(true);
            const res = await adminApi.getCurrencies();
            if (res && res.data) {
                const payload = res.data.data || res.data;
                setRates(payload.rates || []);
                if (payload.supported_currencies) {
                    setSupportedCurrencies(payload.supported_currencies);
                }
            }
        } catch (err) {
            console.error('Fetch currencies error:', err);
            toastError('فشل جلب قائمة العملات وأسعار الصرف');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRates();
    }, []);

    const handleOpenAddModal = () => {
        setEditingRate(null);
        setFromCurrency('USD');
        setToCurrency('EGP');
        setRateValue('');
        setFeePercent('0');
        setIsActive(true);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (item) => {
        setEditingRate(item);
        setFromCurrency(item.from_currency);
        setToCurrency(item.to_currency);
        setRateValue(item.rate);
        setFeePercent(item.conversion_fee_percent || '0');
        setIsActive(Boolean(item.is_active));
        setIsModalOpen(true);
    };

    const handleSaveRate = async (e) => {
        e.preventDefault();
        const numRate = parseFloat(rateValue);
        if (!numRate || numRate <= 0) {
            toastError('يرجى إدخال سعر صرف صحيح أكبر من الصفر');
            return;
        }

        if (fromCurrency === toCurrency) {
            toastError('لا يمكن أن تكون عملة المصدر والهدف متطابقتين');
            return;
        }

        try {
            setModalSubmitting(true);
            if (editingRate) {
                await adminApi.updateCurrency(editingRate.id, {
                    rate: numRate,
                    conversion_fee_percent: parseFloat(feePercent) || 0,
                    is_active: isActive,
                });
                success(`تم تحديث سعر الصرف (${fromCurrency} ➔ ${toCurrency}) بنجاح`);
            } else {
                await adminApi.saveCurrency({
                    from_currency: fromCurrency,
                    to_currency: toCurrency,
                    rate: numRate,
                    conversion_fee_percent: parseFloat(feePercent) || 0,
                    is_active: isActive,
                });
                success(`تمت إضافة سعر الصرف (${fromCurrency} ➔ ${toCurrency}) بنجاح`);
            }

            setIsModalOpen(false);
            fetchRates();
        } catch (err) {
            toastError(err.response?.data?.message || 'فشل حفظ سعر الصرف');
        } finally {
            setModalSubmitting(false);
        }
    };

    const handleToggleRate = async (id, currentPair) => {
        try {
            await adminApi.toggleCurrency(id);
            success(`تم تغيير حالة سعر الصرف (${currentPair}) بنجاح`);
            fetchRates();
        } catch (err) {
            toastError(err.response?.data?.message || 'فشل تغيير حالة سعر الصرف');
        }
    };

    const handleDeleteRate = async (id, currentPair) => {
        if (!window.confirm(`هل أنت متأكد من حذف سعر الصرف (${currentPair}) نهائياً؟`)) {
            return;
        }

        try {
            await adminApi.deleteCurrency(id);
            success(`تم حذف سعر الصرف (${currentPair}) بنجاح`);
            fetchRates();
        } catch (err) {
            toastError(err.response?.data?.message || 'فشل حذف سعر الصرف');
        }
    };

    // Calculate quick conversion
    const calculatedResult = () => {
        const amt = parseFloat(calcAmount) || 0;
        if (calcFrom === calcTo) return amt.toFixed(2);

        const direct = rates.find(r => r.from_currency === calcFrom && r.to_currency === calcTo && r.is_active);
        if (direct) {
            const raw = amt * parseFloat(direct.rate);
            const fee = (parseFloat(direct.conversion_fee_percent) || 0) / 100;
            return (raw * (1 - fee)).toFixed(2);
        }

        const reverse = rates.find(r => r.from_currency === calcTo && r.to_currency === calcFrom && r.is_active);
        if (reverse && parseFloat(reverse.rate) > 0) {
            const raw = amt / parseFloat(reverse.rate);
            return raw.toFixed(2);
        }

        return 'غير متوفر';
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: isLight ? '#F8FAFC' : '#040711',
            color: isLight ? '#0F172A' : '#FFFFFF',
            fontFamily: 'Cairo, sans-serif',
            paddingBottom: '80px',
        }}>
            <AdminHeader />

            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 16px' }}>
                {/* ═══ Header Title Bar ═══ */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '16px',
                    marginBottom: '28px',
                    backgroundColor: isLight ? '#FFFFFF' : '#0B0F19',
                    padding: '20px 24px',
                    borderRadius: '24px',
                    border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: isLight ? '0 4px 15px rgba(0,0,0,0.03)' : '0 10px 30px rgba(0,0,0,0.4)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '16px',
                            backgroundColor: 'rgba(245, 208, 97, 0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#F5D061',
                        }}>
                            <DollarSign size={26} />
                        </div>
                        <div>
                            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                إدارة العملات وأسعار الصرف
                            </h1>
                            <p style={{ margin: '4px 0 0', fontSize: '13px', color: isLight ? '#64748B' : '#94A3B8' }}>
                                تحديد أسعار الصرف التلقائية واليدوية بين الجنيه المصري، الدولار، والعملات العربية
                            </p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <button
                            type="button"
                            onClick={fetchRates}
                            disabled={loading}
                            style={{
                                padding: '10px 16px',
                                borderRadius: '14px',
                                backgroundColor: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
                                border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.1)',
                                color: isLight ? '#0F172A' : '#FFFFFF',
                                fontSize: '13px',
                                fontWeight: '700',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                            <span>تحديث</span>
                        </button>

                        <button
                            type="button"
                            onClick={handleOpenAddModal}
                            style={{
                                padding: '10px 20px',
                                borderRadius: '14px',
                                background: 'linear-gradient(135deg, #F5D061 0%, #D4AF37 100%)',
                                color: '#040711',
                                border: 'none',
                                fontSize: '14px',
                                fontWeight: '900',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                boxShadow: '0 4px 15px rgba(245, 208, 97, 0.3)',
                            }}
                        >
                            <Plus size={18} />
                            <span>إضافة سعر صرف</span>
                        </button>
                    </div>
                </div>

                {/* ═══ Stats & Calculator Grid ═══ */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '20px',
                    marginBottom: '28px',
                }}>
                    {/* Stat Card 1 */}
                    <div style={{
                        backgroundColor: isLight ? '#FFFFFF' : '#0B0F19',
                        padding: '20px',
                        borderRadius: '20px',
                        border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                    }}>
                        <div style={{
                            width: '46px',
                            height: '46px',
                            borderRadius: '14px',
                            backgroundColor: 'rgba(56, 189, 248, 0.12)',
                            color: '#38BDF8',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <ArrowRightLeft size={22} />
                        </div>
                        <div>
                            <span style={{ fontSize: '12px', color: isLight ? '#64748B' : '#94A3B8', fontWeight: '700' }}>
                                إجمالي أزواج الصرف المسجلة
                            </span>
                            <div style={{ fontSize: '22px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                {rates.length} أزواج
                            </div>
                        </div>
                    </div>

                    {/* Stat Card 2 */}
                    <div style={{
                        backgroundColor: isLight ? '#FFFFFF' : '#0B0F19',
                        padding: '20px',
                        borderRadius: '20px',
                        border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                    }}>
                        <div style={{
                            width: '46px',
                            height: '46px',
                            borderRadius: '14px',
                            backgroundColor: 'rgba(34, 197, 94, 0.12)',
                            color: '#22C55E',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <CheckCircle2 size={22} />
                        </div>
                        <div>
                            <span style={{ fontSize: '12px', color: isLight ? '#64748B' : '#94A3B8', fontWeight: '700' }}>
                                الأزواج المفعلة حالياً
                            </span>
                            <div style={{ fontSize: '22px', fontWeight: '900', color: '#22C55E' }}>
                                {rates.filter(r => r.is_active).length} أزواج نشطة
                            </div>
                        </div>
                    </div>

                    {/* Quick Calculator Card */}
                    <div style={{
                        backgroundColor: isLight ? '#FFFFFF' : '#0B0F19',
                        padding: '20px',
                        borderRadius: '20px',
                        border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(245, 208, 97, 0.3)',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                            <Calculator size={18} color="#F5D061" />
                            <span style={{ fontSize: '13px', fontWeight: '800', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                محاكي التحويل المالي السريع
                            </span>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '10px' }}>
                            <input
                                type="number"
                                value={calcAmount}
                                onChange={(e) => setCalcAmount(e.target.value)}
                                style={{
                                    width: '90px',
                                    padding: '8px 10px',
                                    borderRadius: '10px',
                                    backgroundColor: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
                                    border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.12)',
                                    color: isLight ? '#0F172A' : '#FFFFFF',
                                    fontWeight: '800',
                                    fontSize: '13px',
                                    outline: 'none',
                                }}
                            />
                            <select
                                value={calcFrom}
                                onChange={(e) => setCalcFrom(e.target.value)}
                                style={{
                                    padding: '8px',
                                    borderRadius: '10px',
                                    backgroundColor: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
                                    border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.12)',
                                    color: isLight ? '#0F172A' : '#FFFFFF',
                                    fontWeight: '800',
                                    fontSize: '13px',
                                }}
                            >
                                {supportedCurrencies.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            <span style={{ color: '#F5D061', fontWeight: '900' }}>➔</span>
                            <select
                                value={calcTo}
                                onChange={(e) => setCalcTo(e.target.value)}
                                style={{
                                    padding: '8px',
                                    borderRadius: '10px',
                                    backgroundColor: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
                                    border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.12)',
                                    color: isLight ? '#0F172A' : '#FFFFFF',
                                    fontWeight: '800',
                                    fontSize: '13px',
                                }}
                            >
                                {supportedCurrencies.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div style={{
                            padding: '8px 12px',
                            borderRadius: '10px',
                            backgroundColor: 'rgba(245, 208, 97, 0.08)',
                            fontSize: '13px',
                            fontWeight: '800',
                            color: '#F5D061',
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                            <span>الناتج التقديري:</span>
                            <span>{calculatedResult()} {calcTo}</span>
                        </div>
                    </div>
                </div>

                {/* ═══ Exchange Rates Grid ═══ */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '20px',
                }}>
                    {rates.map((item) => {
                        const pairLabel = `${item.from_currency} ➔ ${item.to_currency}`;
                        return (
                            <div
                                key={item.id}
                                style={{
                                    backgroundColor: isLight ? '#FFFFFF' : '#0B0F19',
                                    borderRadius: '20px',
                                    border: isLight ? '1px solid #E2E8F0' : item.is_active ? '1px solid rgba(245, 208, 97, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
                                    padding: '20px',
                                    boxShadow: isLight ? '0 4px 15px rgba(0,0,0,0.03)' : '0 10px 30px rgba(0,0,0,0.3)',
                                    transition: 'all 0.2s ease',
                                    opacity: item.is_active ? 1 : 0.65,
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{
                                            padding: '4px 10px',
                                            borderRadius: '8px',
                                            backgroundColor: 'rgba(245, 208, 97, 0.15)',
                                            color: '#F5D061',
                                            fontSize: '14px',
                                            fontWeight: '900',
                                        }}>
                                            {item.from_currency}
                                        </span>
                                        <span style={{ color: isLight ? '#94A3B8' : '#64748B', fontWeight: '800' }}>➔</span>
                                        <span style={{
                                            padding: '4px 10px',
                                            borderRadius: '8px',
                                            backgroundColor: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.08)',
                                            color: isLight ? '#0F172A' : '#FFFFFF',
                                            fontSize: '14px',
                                            fontWeight: '900',
                                        }}>
                                            {item.to_currency}
                                        </span>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => handleToggleRate(item.id, pairLabel)}
                                        style={{
                                            padding: '4px 10px',
                                            borderRadius: '20px',
                                            backgroundColor: item.is_active ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                            color: item.is_active ? '#22C55E' : '#EF4444',
                                            border: 'none',
                                            fontSize: '11px',
                                            fontWeight: '800',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                        }}
                                    >
                                        {item.is_active ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                                        <span>{item.is_active ? 'مفعل' : 'معطل'}</span>
                                    </button>
                                </div>

                                <div style={{
                                    backgroundColor: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)',
                                    borderRadius: '14px',
                                    padding: '14px',
                                    marginBottom: '16px',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
                                        <span style={{ fontSize: '13px', color: isLight ? '#64748B' : '#94A3B8' }}>سعر الصرف:</span>
                                        <span style={{ fontSize: '20px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                            1 {item.from_currency} = {parseFloat(item.rate).toLocaleString('en-US', { maximumFractionDigits: 6 })} {item.to_currency}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: isLight ? '#64748B' : '#94A3B8' }}>
                                        <span>رسوم التحويل الإضافية:</span>
                                        <span style={{ fontWeight: '800', color: parseFloat(item.conversion_fee_percent) > 0 ? '#F59E0B' : '#10B981' }}>
                                            {item.conversion_fee_percent || '0'}%
                                        </span>
                                    </div>
                                    {item.updated_by && (
                                        <div style={{ fontSize: '11px', color: isLight ? '#94A3B8' : '#64748B', marginTop: '6px' }}>
                                            آخر تحديث بواسطة: {item.updated_by?.name || 'الإدارة'}
                                        </div>
                                    )}
                                </div>

                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button
                                        type="button"
                                        onClick={() => handleOpenEditModal(item)}
                                        style={{
                                            flex: 1,
                                            padding: '8px 12px',
                                            borderRadius: '10px',
                                            backgroundColor: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.06)',
                                            border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.1)',
                                            color: isLight ? '#0F172A' : '#FFFFFF',
                                            fontSize: '12px',
                                            fontWeight: '800',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '6px',
                                        }}
                                    >
                                        <Edit3 size={14} />
                                        <span>تعديل السعر</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleDeleteRate(item.id, pairLabel)}
                                        style={{
                                            padding: '8px 12px',
                                            borderRadius: '10px',
                                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                            border: '1px solid rgba(239, 68, 68, 0.2)',
                                            color: '#EF4444',
                                            fontSize: '12px',
                                            fontWeight: '800',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                        title="حذف"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ═══ Add / Edit Rate Modal ═══ */}
            {isModalOpen && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    backdropFilter: 'blur(6px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                    padding: '16px',
                }}>
                    <div style={{
                        width: '100%',
                        maxWidth: '480px',
                        backgroundColor: isLight ? '#FFFFFF' : '#0B0F19',
                        borderRadius: '24px',
                        border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.12)',
                        padding: '24px',
                        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                            <h3 style={{ margin: 0, fontSize: '17px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                {editingRate ? 'تعديل سعر الصرف' : 'إضافة سعر صرف جديد'}
                            </h3>
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: isLight ? '#64748B' : '#94A3B8',
                                    cursor: 'pointer',
                                    padding: '4px',
                                }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSaveRate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', marginBottom: '6px' }}>
                                        عملة المصدر (من)
                                    </label>
                                    <select
                                        value={fromCurrency}
                                        disabled={Boolean(editingRate)}
                                        onChange={(e) => setFromCurrency(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '10px 12px',
                                            borderRadius: '12px',
                                            backgroundColor: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
                                            border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.12)',
                                            color: isLight ? '#0F172A' : '#FFFFFF',
                                            fontWeight: '800',
                                            fontSize: '13px',
                                            outline: 'none',
                                        }}
                                    >
                                        {supportedCurrencies.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', marginBottom: '6px' }}>
                                        عملة الهدف (إلى)
                                    </label>
                                    <select
                                        value={toCurrency}
                                        disabled={Boolean(editingRate)}
                                        onChange={(e) => setToCurrency(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '10px 12px',
                                            borderRadius: '12px',
                                            backgroundColor: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
                                            border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.12)',
                                            color: isLight ? '#0F172A' : '#FFFFFF',
                                            fontWeight: '800',
                                            fontSize: '13px',
                                            outline: 'none',
                                        }}
                                    >
                                        {supportedCurrencies.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', marginBottom: '6px' }}>
                                    سعر الصرف (1 {fromCurrency} = كم {toCurrency}؟)
                                </label>
                                <input
                                    type="number"
                                    step="any"
                                    required
                                    value={rateValue}
                                    onChange={(e) => setRateValue(e.target.value)}
                                    placeholder="مثال: 50.00"
                                    style={{
                                        width: '100%',
                                        padding: '12px 14px',
                                        borderRadius: '12px',
                                        backgroundColor: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
                                        border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.12)',
                                        color: isLight ? '#0F172A' : '#FFFFFF',
                                        fontWeight: '800',
                                        fontSize: '14px',
                                        outline: 'none',
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', marginBottom: '6px' }}>
                                    نسبة عمولة/رسوم التحويل % (اختياري)
                                </label>
                                <input
                                    type="number"
                                    step="any"
                                    value={feePercent}
                                    onChange={(e) => setFeePercent(e.target.value)}
                                    placeholder="0"
                                    style={{
                                        width: '100%',
                                        padding: '12px 14px',
                                        borderRadius: '12px',
                                        backgroundColor: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
                                        border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.12)',
                                        color: isLight ? '#0F172A' : '#FFFFFF',
                                        fontWeight: '800',
                                        fontSize: '14px',
                                        outline: 'none',
                                    }}
                                />
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <input
                                    type="checkbox"
                                    id="modal_is_active"
                                    checked={isActive}
                                    onChange={(e) => setIsActive(e.target.checked)}
                                    style={{ width: '18px', height: '18px', accentColor: '#F5D061', cursor: 'pointer' }}
                                />
                                <label htmlFor="modal_is_active" style={{ fontSize: '13px', fontWeight: '800', cursor: 'pointer' }}>
                                    تفعيل سعر الصرف للاستخدام في المنصة
                                </label>
                            </div>

                            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    style={{
                                        flex: 1,
                                        padding: '12px',
                                        borderRadius: '12px',
                                        backgroundColor: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
                                        border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.1)',
                                        color: isLight ? '#64748B' : '#94A3B8',
                                        fontSize: '13px',
                                        fontWeight: '800',
                                        cursor: 'pointer',
                                    }}
                                >
                                    إلغاء
                                </button>
                                <button
                                    type="submit"
                                    disabled={modalSubmitting}
                                    style={{
                                        flex: 2,
                                        padding: '12px',
                                        borderRadius: '12px',
                                        background: 'linear-gradient(135deg, #F5D061 0%, #D4AF37 100%)',
                                        color: '#040711',
                                        border: 'none',
                                        fontSize: '14px',
                                        fontWeight: '900',
                                        cursor: modalSubmitting ? 'not-allowed' : 'pointer',
                                    }}
                                >
                                    {modalSubmitting ? 'جاري الحفظ...' : editingRate ? 'حفظ التعديلات' : 'إضافة السعر'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
