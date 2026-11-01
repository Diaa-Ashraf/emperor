import React, { useState, useEffect, useMemo } from 'react';
import {
    DollarSign,
    RefreshCw,
    Plus,
    Edit3,
    Trash2,
    CheckCircle2,
    XCircle,
    Globe,
    Layers,
    X,
    TrendingUp,
    ShieldCheck
} from 'lucide-react';
import { adminApi } from '../../api/endpoints';
import { useToast } from '../../contexts/ToastContext';
import { useTheme } from '../../contexts/ThemeContext';
import AdminHeader from '../../components/admin/AdminHeader';

// Standard Predefined Supported Countries with currency codes & flags
const PREDEFINED_COUNTRIES = [
    { code: 'EG', name: 'مصر', currency: 'EGP', flag: '🇪🇬', defaultRate: 59.00 },
    { code: 'SA', name: 'المملكة العربية السعودية', currency: 'SAR', flag: '🇸🇦', defaultRate: 3.75 },
    { code: 'AE', name: 'الإمارات العربية المتحدة', currency: 'AED', flag: '🇦🇪', defaultRate: 3.67 },
    { code: 'JO', name: 'الأردن', currency: 'JOD', flag: '🇯🇴', defaultRate: 0.71 },
    { code: 'YE', name: 'اليمن', currency: 'YER', flag: '🇾🇪', defaultRate: 250.00 },
    { code: 'TR', name: 'تركيا', currency: 'TRY', flag: '🇹🇷', defaultRate: 34.00 },
    { code: 'KW', name: 'الكويت', currency: 'KWD', flag: '🇰🇼', defaultRate: 0.31 },
    { code: 'QA', name: 'قطر', currency: 'QAR', flag: '🇶🇦', defaultRate: 3.64 },
    { code: 'OM', name: 'سلطنة عمان', currency: 'OMR', flag: '🇴🇲', defaultRate: 0.38 },
    { code: 'BH', name: 'البحرين', currency: 'BHD', flag: '🇧🇭', defaultRate: 0.38 },
    { code: 'MA', name: 'المغرب', currency: 'MAD', flag: '🇲🇦', defaultRate: 10.10 },
    { code: 'IQ', name: 'العراق', currency: 'IQD', flag: '🇮🇶', defaultRate: 1310.00 },
    { code: 'DZ', name: 'الجزائر', currency: 'DZD', flag: '🇩🇿', defaultRate: 134.00 },
    { code: 'LY', name: 'ليبيا', currency: 'LYD', flag: '🇱🇾', defaultRate: 4.85 },
];

export default function AdminCurrenciesPage() {
    const { theme } = useTheme();
    const isLight = theme === 'light';
    const { success, error: toastError } = useToast();

    const [loading, setLoading] = useState(true);
    const [rawRates, setRawRates] = useState([]);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCurrency, setEditingCurrency] = useState(null);
    const [modalSubmitting, setModalSubmitting] = useState(false);

    // Form inputs
    const [selectedCountryCode, setSelectedCountryCode] = useState('EG');
    const [customCountryName, setCustomCountryName] = useState('');
    const [customCurrencyCode, setCustomCurrencyCode] = useState('');
    const [usdRateValue, setUsdRateValue] = useState('');
    const [isActive, setIsActive] = useState(true);

    const fetchRates = async () => {
        try {
            setLoading(true);
            const res = await adminApi.getCurrencies();
            if (res && res.data) {
                const payload = res.data.data || res.data;
                setRawRates(payload.rates || []);
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

    // Filter and group rates into clean "Country/Currency vs $1 USD" list
    const countryCurrencies = useMemo(() => {
        const list = [];
        const seen = new Set();
        PREDEFINED_COUNTRIES.forEach(def => {
            const direct = rawRates.find(rate => rate.from_currency === 'USD' && rate.to_currency === def.currency);
            const reverse = rawRates.find(rate => rate.from_currency === def.currency && rate.to_currency === 'USD');
            const record = direct || reverse;
            if (record) seen.add(def.currency);
            list.push({
                rateId: direct?.id || null,
                reverseRateId: reverse?.id || null,
                currency: def.currency,
                countryName: def.name,
                flag: def.flag,
                ratePerUsd: direct ? parseFloat(direct.rate) : reverse && Number(reverse.rate) > 0 ? roundNumber(1 / Number(reverse.rate), 6) : def.defaultRate,
                isActive: record ? Boolean(record.is_active) : false,
                isPreset: !record,
                updatedAt: record?.updated_at,
                updatedBy: record?.updated_by?.name || 'الإدارة',
            });
        });

        rawRates.filter(rate => rate.from_currency === 'USD' && rate.to_currency !== 'USD').forEach(rate => {
            if (seen.has(rate.to_currency)) return;
            const meta = PREDEFINED_COUNTRIES.find(country => country.currency === rate.to_currency) || {
                name: `دولة (${rate.to_currency})`, currency: rate.to_currency, flag: '🌐',
            };
            list.push({
                rateId: rate.id,
                reverseRateId: null,
                currency: rate.to_currency,
                countryName: meta.name,
                flag: meta.flag,
                ratePerUsd: Number(rate.rate),
                isActive: Boolean(rate.is_active),
                updatedAt: rate.updated_at,
                updatedBy: rate.updated_by?.name || 'الإدارة',
            });
        });

        return list;
    }, [rawRates]);

    function roundNumber(num, dec) {
        return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    }

    const handleOpenAddModal = () => {
        setEditingCurrency(null);
        setSelectedCountryCode('EG');
        const defaultSelected = PREDEFINED_COUNTRIES.find(c => c.code === 'EG');
        setCustomCountryName(defaultSelected?.name || '');
        setCustomCurrencyCode(defaultSelected?.currency || 'EGP');
        setUsdRateValue(String(defaultSelected?.defaultRate || '50.00'));
        setIsActive(true);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (item) => {
        setEditingCurrency(item);
        setCustomCountryName(item.countryName);
        setCustomCurrencyCode(item.currency);
        setUsdRateValue(String(item.ratePerUsd));
        setIsActive(item.isActive);
        setIsModalOpen(true);
    };

    const handleCountrySelectChange = (e) => {
        const code = e.target.value;
        setSelectedCountryCode(code);
        if (code === 'CUSTOM') {
            setCustomCountryName('');
            setCustomCurrencyCode('');
            setUsdRateValue('');
        } else {
            const found = PREDEFINED_COUNTRIES.find(c => c.code === code);
            if (found) {
                setCustomCountryName(found.name);
                setCustomCurrencyCode(found.currency);
                setUsdRateValue(String(found.defaultRate));
            }
        }
    };

    const handleSaveRate = async (e) => {
        e.preventDefault();
        const numRate = parseFloat(usdRateValue);
        if (!numRate || numRate <= 0) {
            toastError('يرجى إدخال سعر صرف صحيح أكبر من الصفر');
            return;
        }

        const curr = customCurrencyCode.toUpperCase().trim();
        if (!curr || curr.length < 2) {
            toastError('يرجى إدخال كود العملة بشكل صحيح (مثال: EGP, SAR)');
            return;
        }

        try {
            setModalSubmitting(true);

            // Always save as standard base: 1 USD = X Currency
            await adminApi.saveCurrency({
                from_currency: 'USD',
                to_currency: curr,
                rate: numRate,
                conversion_fee_percent: 0,
                is_active: isActive,
            });

            success(`تم حفظ سعر الدولار مقابل (${curr}) بنجاح: 1 دولار = ${numRate} ${curr}`);
            setIsModalOpen(false);
            fetchRates();
        } catch (err) {
            toastError(err.response?.data?.message || 'فشل حفظ سعر الصرف');
        } finally {
            setModalSubmitting(false);
        }
    };

    const handleToggleRate = async (item) => {
        if (!item.rateId) {
            // Save as new active
            try {
                await adminApi.saveCurrency({
                    from_currency: 'USD',
                    to_currency: item.currency,
                    rate: item.ratePerUsd,
                    is_active: true,
                });
                success(`تم تفعيل سعر الدولار مقابل (${item.currency}) بنجاح`);
                fetchRates();
            } catch (err) {
                toastError('فشل التفعيل');
            }
            return;
        }

        try {
            await adminApi.toggleCurrency(item.rateId);
            if (item.reverseRateId) await adminApi.toggleCurrency(item.reverseRateId);
            success(`تم تحديث حالة سعر (${item.currency}) بنجاح`);
            fetchRates();
        } catch (err) {
            toastError('فشل تغيير حالة سعر الصرف');
        }
    };

    const handleDeleteRate = async (item) => {
        if (!item.rateId) return;
        if (!window.confirm(`هل أنت متأكد من حذف سعر صرف (${item.currency}) مقابل الدولار؟`)) {
            return;
        }

        try {
            await adminApi.deleteCurrency(item.rateId);
            if (item.reverseRateId) await adminApi.deleteCurrency(item.reverseRateId);
            success(`تم حذف سعر (${item.currency}) بنجاح`);
            fetchRates();
        } catch (err) {
            toastError('فشل الحذف');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: isLight ? '#F8FAFC' : '#030712',
            color: isLight ? '#0F172A' : '#FFFFFF',
            fontFamily: 'Cairo, sans-serif',
            direction: 'rtl',
        }}>
            <AdminHeader />

            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 16px 80px' }}>
                {/* ═══ Top Action Bar ═══ */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '16px',
                    marginBottom: '28px',
                    padding: '24px 28px',
                    backgroundColor: isLight ? '#FFFFFF' : '#09172e',
                    borderRadius: '24px',
                    border: isLight ? '1px solid #E2E8F0' : '1.5px solid rgba(56, 189, 248, 0.35)',
                    boxShadow: isLight ? '0 4px 15px rgba(0,0,0,0.03)' : '0 10px 35px rgba(0,0,0,0.5)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '16px',
                            backgroundColor: 'rgba(245, 208, 97, 0.15)',
                            border: '1px solid rgba(245, 208, 97, 0.4)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#F5D061',
                        }}>
                            <DollarSign size={28} />
                        </div>
                        <div>
                            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '900', color: isLight ? '#0F172A' : '#F5D061' }}>
                                أسعار الدولار مقابل عملات الدول
                            </h1>
                            <p style={{ margin: '4px 0 0', fontSize: '13px', color: isLight ? '#64748B' : '#94A3B8' }}>
                                أضف الدولة وحدد سعر صرف عملتها مقابل 1 دولار أمريكي (مثال: $1 = 59 جنيه مصري)
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
                                boxShadow: '0 4px 15px rgba(245, 208, 97, 0.35)',
                            }}
                        >
                            <Plus size={18} />
                            <span>إضافة دولة / عملة جديدة</span>
                        </button>
                    </div>
                </div>

                {/* ═══ Overview Quick Counter ═══ */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '16px',
                    marginBottom: '28px',
                }}>
                    <div style={{
                        backgroundColor: isLight ? '#FFFFFF' : '#09172e',
                        padding: '18px 22px',
                        borderRadius: '20px',
                        border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(56, 189, 248, 0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <div>
                            <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: '800', display: 'block', marginBottom: '4px' }}>
                                العملة الأساسية للمنصة
                            </span>
                            <span style={{ fontSize: '19px', fontWeight: '900', color: '#F5D061' }}>
                                الدولار الأمريكي ($ USD)
                            </span>
                        </div>
                        <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(245, 208, 97, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F5D061' }}>
                            <Globe size={22} />
                        </div>
                    </div>

                    <div style={{
                        backgroundColor: isLight ? '#FFFFFF' : '#09172e',
                        padding: '18px 22px',
                        borderRadius: '20px',
                        border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(56, 189, 248, 0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <div>
                            <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: '800', display: 'block', marginBottom: '4px' }}>
                                الدول والعملات المفعلة
                            </span>
                            <span style={{ fontSize: '19px', fontWeight: '900', color: '#22c55e' }}>
                                {countryCurrencies.filter(c => c.isActive).length} دول نشطة
                            </span>
                        </div>
                        <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(34, 197, 94, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22c55e' }}>
                            <CheckCircle2 size={22} />
                        </div>
                    </div>
                </div>

                {/* ═══ Countries & Exchange Rates Grid (Simple & Clean) ═══ */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '20px',
                }}>
                    {countryCurrencies.map((item) => (
                        <div
                            key={item.currency}
                            style={{
                                backgroundColor: isLight ? '#FFFFFF' : '#09172e',
                                borderRadius: '22px',
                                border: isLight
                                    ? '1px solid #E2E8F0'
                                    : item.isActive ? '1.5px solid rgba(245, 208, 97, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                                padding: '22px',
                                boxShadow: isLight ? '0 4px 15px rgba(0,0,0,0.03)' : '0 10px 30px rgba(0,0,0,0.4)',
                                opacity: item.isActive ? 1 : 0.7,
                                transition: 'all 0.2s ease',
                            }}
                        >
                            {/* Card Header: Flag + Country Name + Status Toggle */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ fontSize: '24px' }}>{item.flag}</span>
                                    <div>
                                        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                            {item.countryName}
                                        </h3>
                                        <span style={{ fontSize: '12px', fontWeight: '800', color: '#38BDF8' }}>
                                            {item.currency}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => handleToggleRate(item)}
                                    style={{
                                        padding: '5px 12px',
                                        borderRadius: '20px',
                                        backgroundColor: item.isActive ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                        border: item.isActive ? '1px solid rgba(34, 197, 94, 0.35)' : '1px solid rgba(239, 68, 68, 0.35)',
                                        color: item.isActive ? '#22C55E' : '#EF4444',
                                        fontSize: '11.5px',
                                        fontWeight: '800',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '5px',
                                    }}
                                >
                                    {item.isActive ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
                                    <span>{item.isActive ? 'مفعل' : 'معطل'}</span>
                                </button>
                            </div>

                            {/* Prominent Exchange Rate Display ($1 USD = X Currency) */}
                            <div style={{
                                backgroundColor: isLight ? '#F8FAFC' : 'rgba(3, 7, 18, 0.5)',
                                borderRadius: '16px',
                                padding: '16px',
                                marginBottom: '16px',
                                border: '1px solid rgba(56, 189, 248, 0.15)',
                            }}>
                                <span style={{ display: 'block', fontSize: '11.5px', fontWeight: '800', color: '#94A3B8', marginBottom: '6px' }}>
                                    سعر الصرف مقابل الدولار الأمريكي:
                                </span>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                    <span style={{ fontSize: '24px', fontWeight: '900', color: '#F5D061', fontFamily: 'Cairo, sans-serif' }}>
                                        $1 USD = {item.ratePerUsd.toLocaleString('en-US', { maximumFractionDigits: 4 })}
                                    </span>
                                    <span style={{ fontSize: '14px', fontWeight: '800', color: '#38BDF8' }}>
                                        {item.currency}
                                    </span>
                                </div>
                            </div>

                            {/* Card Actions */}
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                    type="button"
                                    onClick={() => handleOpenEditModal(item)}
                                    style={{
                                        flex: 1,
                                        padding: '9px 14px',
                                        borderRadius: '12px',
                                        backgroundColor: 'rgba(56, 189, 248, 0.12)',
                                        border: '1px solid rgba(56, 189, 248, 0.35)',
                                        color: '#38BDF8',
                                        fontSize: '13px',
                                        fontWeight: '800',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '6px',
                                        transition: 'all 0.15s',
                                    }}
                                >
                                    <Edit3 size={15} />
                                    <span>تعديل السعر</span>
                                </button>

                                {item.rateId && (
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteRate(item)}
                                        style={{
                                            padding: '9px 14px',
                                            borderRadius: '12px',
                                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                            border: '1px solid rgba(239, 68, 68, 0.25)',
                                            color: '#EF4444',
                                            fontSize: '13px',
                                            fontWeight: '800',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                        title="حذف"
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ═══ Add / Edit Modal (Clear & Simple: Country + Currency + Rate vs 1 USD) ═══ */}
            {isModalOpen && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    backdropFilter: 'blur(6px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                    padding: '16px',
                }}>
                    <div style={{
                        width: '100%',
                        maxWidth: '460px',
                        backgroundColor: isLight ? '#FFFFFF' : '#09172e',
                        borderRadius: '24px',
                        border: isLight ? '1px solid #E2E8F0' : '1.5px solid rgba(56, 189, 248, 0.35)',
                        padding: '26px',
                        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(245, 208, 97, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F5D061' }}>
                                    <DollarSign size={20} />
                                </div>
                                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '900', color: isLight ? '#0F172A' : '#F5D061' }}>
                                    {editingCurrency ? `تعديل سعر صرف ${customCurrencyCode}` : 'إضافة دولة / عملة جديدة'}
                                </h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '4px' }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSaveRate} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                            {!editingCurrency && (
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', marginBottom: '6px', color: '#E2E8F0' }}>
                                        اختر الدولة
                                    </label>
                                    <select
                                        value={selectedCountryCode}
                                        onChange={handleCountrySelectChange}
                                        style={{
                                            width: '100%',
                                            padding: '12px 14px',
                                            borderRadius: '12px',
                                            backgroundColor: '#030712',
                                            border: '1.5px solid rgba(56, 189, 248, 0.4)',
                                            color: '#FFFFFF',
                                            fontWeight: '800',
                                            fontSize: '14px',
                                            outline: 'none',
                                            fontFamily: 'Cairo, sans-serif'
                                        }}
                                    >
                                        {PREDEFINED_COUNTRIES.map(c => (
                                            <option key={c.code} value={c.code} style={{ backgroundColor: '#09172e', color: '#FFFFFF' }}>
                                                {c.flag} {c.name} ({c.currency})
                                            </option>
                                        ))}
                                        <option value="CUSTOM" style={{ backgroundColor: '#09172e', color: '#F5D061' }}>
                                            ➕ دولة أخرى مخصصة...
                                        </option>
                                    </select>
                                </div>
                            )}

                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', marginBottom: '6px', color: '#E2E8F0' }}>
                                    كود العملة (مثال: EGP, SAR, AED)
                                </label>
                                <input
                                    type="text"
                                    required
                                    disabled={Boolean(editingCurrency)}
                                    value={customCurrencyCode}
                                    onChange={(e) => setCustomCurrencyCode(e.target.value.toUpperCase())}
                                    placeholder="EGP"
                                    style={{
                                        width: '100%',
                                        padding: '12px 14px',
                                        borderRadius: '12px',
                                        backgroundColor: '#030712',
                                        border: '1.5px solid rgba(56, 189, 248, 0.4)',
                                        color: '#F5D061',
                                        fontWeight: '900',
                                        fontSize: '15px',
                                        outline: 'none',
                                        fontFamily: 'monospace'
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', marginBottom: '6px', color: '#E2E8F0' }}>
                                    سعر الصرف مقابل الدولار ($1 USD = كم {customCurrencyCode || 'عملة'}؟)
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type="number"
                                        step="any"
                                        required
                                        value={usdRateValue}
                                        onChange={(e) => setUsdRateValue(e.target.value)}
                                        placeholder="مثال: 59.00"
                                        style={{
                                            width: '100%',
                                            padding: '12px 14px',
                                            borderRadius: '12px',
                                            backgroundColor: '#030712',
                                            border: '1.5px solid rgba(245, 208, 97, 0.5)',
                                            color: '#FFFFFF',
                                            fontWeight: '900',
                                            fontSize: '18px',
                                            outline: 'none',
                                            fontFamily: 'Cairo, sans-serif'
                                        }}
                                    />
                                </div>
                                <span style={{ display: 'block', fontSize: '11.5px', color: '#94A3B8', marginTop: '5px' }}>
                                    اكتب القيمة التي تساويها 1 دولار من عملة الدولة (مثلاً في مصر: 59، في السعودية: 3.75)
                                </span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
                                <input
                                    type="checkbox"
                                    id="modal_is_active"
                                    checked={isActive}
                                    onChange={(e) => setIsActive(e.target.checked)}
                                    style={{ width: '18px', height: '18px', accentColor: '#F5D061', cursor: 'pointer' }}
                                />
                                <label htmlFor="modal_is_active" style={{ fontSize: '13px', fontWeight: '800', cursor: 'pointer', color: '#FFFFFF' }}>
                                    تفعيل هذه العملة للاستخدام في الموقع وشحن المحفظة
                                </label>
                            </div>

                            <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                                <button
                                    type="submit"
                                    disabled={modalSubmitting}
                                    style={{
                                        flex: 2,
                                        padding: '13px',
                                        borderRadius: '14px',
                                        background: 'linear-gradient(135deg, #F5D061 0%, #D4AF37 100%)',
                                        color: '#08080A',
                                        border: 'none',
                                        fontSize: '14.5px',
                                        fontWeight: '900',
                                        cursor: modalSubmitting ? 'not-allowed' : 'pointer',
                                        boxShadow: '0 4px 15px rgba(245, 208, 97, 0.35)',
                                    }}
                                >
                                    {modalSubmitting ? 'جاري الحفظ...' : 'حفظ سعر الصرف'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    style={{
                                        flex: 1,
                                        padding: '13px',
                                        borderRadius: '14px',
                                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        color: '#94A3B8',
                                        fontSize: '13px',
                                        fontWeight: '800',
                                        cursor: 'pointer',
                                    }}
                                >
                                    إلغاء
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
