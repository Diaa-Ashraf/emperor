import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Globe, DollarSign, Gift, ArrowLeft, Check, Sparkles } from 'lucide-react';
import AuthLayout from '../../layouts/AuthLayout';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { useTheme } from '../../contexts/ThemeContext';
import { getSiteName } from '../../utils/settingsHelper';

const COUNTRIES = [
    { value: 'US', label: 'United States (أمريكا)', flag: '🇺🇸', defaultCurrency: 'USD', phoneCode: '+1' },
    { value: 'EG', label: 'مصر (Egypt)', flag: '🇪🇬', defaultCurrency: 'EGP', phoneCode: '+20' },
    { value: 'SA', label: 'المملكة العربية السعودية (Saudi Arabia)', flag: '🇸🇦', defaultCurrency: 'SAR', phoneCode: '+966' },
    { value: 'AE', label: 'الإمارات العربية المتحدة (UAE)', flag: '🇦🇪', defaultCurrency: 'AED', phoneCode: '+971' },
    { value: 'JO', label: 'الأردن (Jordan)', flag: '🇯🇴', defaultCurrency: 'JOD', phoneCode: '+962' },
    { value: 'YE', label: 'اليمن (Yemen)', flag: '🇾🇪', defaultCurrency: 'YER', phoneCode: '+967' },
    { value: 'TR', label: 'تركيا (Turkey)', flag: '🇹🇷', defaultCurrency: 'TRY', phoneCode: '+90' },
    { value: 'MA', label: 'المغرب (Morocco)', flag: '🇲🇦', defaultCurrency: 'MAD', phoneCode: '+212' },
    { value: 'DZ', label: 'الجزائر (Algeria)', flag: '🇩🇿', defaultCurrency: 'DZD', phoneCode: '+213' },
    { value: 'KW', label: 'الكويت (Kuwait)', flag: '🇰🇼', defaultCurrency: 'KWD', phoneCode: '+965' },
    { value: 'QA', label: 'قطر (Qatar)', flag: '🇶🇦', defaultCurrency: 'QAR', phoneCode: '+974' },
    { value: 'OM', label: 'سلطنة عمان (Oman)', flag: '🇴🇲', defaultCurrency: 'OMR', phoneCode: '+968' },
    { value: 'BH', label: 'البحرين (Bahrain)', flag: '🇧🇭', defaultCurrency: 'BHD', phoneCode: '+973' },
    { value: 'IQ', label: 'العراق (Iraq)', flag: '🇮🇶', defaultCurrency: 'IQD', phoneCode: '+964' },
    { value: 'SY', label: 'سوريا (Syria)', flag: '🇸🇾', defaultCurrency: 'SYP', phoneCode: '+963' },
    { value: 'LY', label: 'ليبيا (Libya)', flag: '🇱🇾', defaultCurrency: 'LYD', phoneCode: '+218' },
    { value: 'OTHER', label: 'دولة أخرى (Other Country)', flag: '🌐', defaultCurrency: 'USD', phoneCode: '' },
];

const CURRENCIES = [
    { value: 'USD', label: '($) USD' },
    { value: 'AED', label: 'AED (AED)' },
    { value: 'EGP', label: 'EGY (Egy)' },
    { value: 'JOD', label: 'JOD (1.20)' },
    { value: 'MAD', label: 'MAD (MAD)' },
    { value: 'SAR', label: 'SAR (Sar)' },
    { value: 'TRY', label: '(₺) TRY' },
    { value: 'YER', label: '(ريال) YER' },
    { value: 'KWD', label: 'KWD (Kuwait)' },
    { value: 'QAR', label: 'QAR (Qatar)' },
    { value: 'EUR', label: '(€) EUR' },
];

export default function CompleteProfilePage() {
    const navigate = useNavigate();
    const { user, completeProfile } = useAuth();
    const { theme } = useTheme();
    const isLight = theme === 'light';
    const { success, error: toastError } = useToast();

    const [formData, setFormData] = useState({
        phone: user?.phone || '',
        country: user?.country || 'EG',
        currency: user?.currency || 'EGP',
        invite_code: '',
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // When country changes, intelligently suggest/sync default currency
    const handleCountryChange = (e) => {
        const selectedCountryVal = e.target.value;
        const matchedCountry = COUNTRIES.find(c => c.value === selectedCountryVal);
        setFormData(prev => ({
            ...prev,
            country: selectedCountryVal,
            currency: matchedCountry ? matchedCountry.defaultCurrency : prev.currency
        }));
        if (errors.country) {
            setErrors(prev => ({ ...prev, country: null }));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const newErrors = {};
        if (!formData.country) {
            newErrors.country = 'يرجى اختيار الدولة';
        }
        if (!formData.currency) {
            newErrors.currency = 'يرجى اختيار العملة';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        try {
            const payload = {
                country: formData.country,
                currency: formData.currency,
            };

            if (formData.phone && formData.phone.trim()) {
                payload.phone = formData.phone.trim();
            }

            if (formData.invite_code.trim()) {
                payload.invite_code = formData.invite_code.trim().toUpperCase();
            }

            const updated = await completeProfile(payload);

            if (updated) {
                success('تم استكمال إعداد حسابك بنجاح! مرحباً بك في المنصة');
                navigate('/', { replace: true });
            }
        } catch (err) {
            if (err.errors) {
                setErrors(err.errors);
            } else if (err.message) {
                toastError(err.message);
            } else {
                toastError('حدث خطأ أثناء حفظ البيانات، يرجى التحقق والمحاولة ثانية');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="إعداد الحساب"
            subtitle="حدد الدولة والعملة المفضلة لتجهيز محفظتك وعرض الأسعار المناسبة لك"
        >
            {/* Step Indicators (Matching Screenshot 2 & 3: [1 Google] -> [2 إعداد الحساب]) */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
                marginBottom: '26px',
                direction: 'ltr',
            }}>
                {/* Step 1: التسجيل */}
                <div style={{
                    padding: '10px 14px',
                    borderRadius: '14px',
                    backgroundColor: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.04)',
                    border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    color: isLight ? '#64748B' : '#94A3B8',
                    fontSize: '13px',
                    fontWeight: '800',
                }}>
                    <span style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '11px',
                        fontWeight: '900',
                    }}>
                        1
                    </span>
                    <span>التسجيل</span>
                    <Check size={14} color="#10B981" />
                </div>

                {/* Step 2: إعداد الحساب (Active) */}
                <div style={{
                    padding: '10px 14px',
                    borderRadius: '14px',
                    backgroundColor: isLight ? '#FEF3C7' : 'rgba(245, 208, 97, 0.12)',
                    border: isLight ? '1.5px solid #F59E0B' : '1.5px solid rgba(245, 208, 97, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    color: isLight ? '#B45309' : '#F5D061',
                    fontSize: '13px',
                    fontWeight: '900',
                    boxShadow: isLight ? '0 2px 8px rgba(245, 158, 11, 0.15)' : '0 0 15px rgba(245, 208, 97, 0.2)',
                }}>
                    <span style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: isLight ? '#F59E0B' : '#F5D061',
                        color: isLight ? '#FFFFFF' : '#0B1222',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '11px',
                        fontWeight: '900',
                    }}>
                        2
                    </span>
                    <span>إعداد الحساب</span>
                </div>
            </div>

            <form onSubmit={handleSubmit} noValidate>
                {/* 1. Country Selection */}
                <div style={{ marginBottom: '18px' }}>
                    <label style={{
                        fontSize: '13px',
                        fontWeight: '800',
                        color: isLight ? '#334155' : '#CBD5E1',
                        display: 'block',
                        marginBottom: '8px',
                        textAlign: 'right',
                    }}>
                        الدولة
                    </label>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: isLight ? '#F8FAFC' : 'rgba(15, 23, 42, 0.7)',
                        border: errors.country
                            ? '1.5px solid #EF4444'
                            : isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '14px',
                        padding: '12px 14px',
                        position: 'relative',
                        transition: 'border-color 0.2s',
                    }}>
                        <select
                            name="country"
                            value={formData.country}
                            onChange={handleCountryChange}
                            style={{
                                width: '100%',
                                background: 'transparent',
                                border: 'none',
                                outline: 'none',
                                color: isLight ? '#0F172A' : '#FFFFFF',
                                fontSize: '14px',
                                fontWeight: '700',
                                fontFamily: 'Cairo, sans-serif',
                                cursor: 'pointer',
                                direction: 'rtl',
                            }}
                        >
                            {COUNTRIES.map(c => (
                                <option
                                    key={c.value}
                                    value={c.value}
                                    style={{
                                        backgroundColor: isLight ? '#FFFFFF' : '#0B1222',
                                        color: isLight ? '#0F172A' : '#FFFFFF',
                                    }}
                                >
                                    {c.flag} {c.label}
                                </option>
                            ))}
                        </select>
                        <Globe size={18} color={isLight ? '#64748B' : '#94A3B8'} style={{ marginRight: '8px' }} />
                    </div>
                    {errors.country && (
                        <span style={{ fontSize: '11.5px', color: '#EF4444', marginTop: '4px', display: 'block', textAlign: 'right' }}>
                            {errors.country}
                        </span>
                    )}
                </div>

                {/* 2. Preferred Currency */}
                <div style={{ marginBottom: '18px' }}>
                    <label style={{
                        fontSize: '13px',
                        fontWeight: '800',
                        color: isLight ? '#334155' : '#CBD5E1',
                        display: 'block',
                        marginBottom: '8px',
                        textAlign: 'right',
                    }}>
                        العملة
                    </label>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: isLight ? '#F8FAFC' : 'rgba(15, 23, 42, 0.7)',
                        border: errors.currency
                            ? '1.5px solid #EF4444'
                            : isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '14px',
                        padding: '12px 14px',
                        position: 'relative',
                        transition: 'border-color 0.2s',
                    }}>
                        <select
                            name="currency"
                            value={formData.currency}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                background: 'transparent',
                                border: 'none',
                                outline: 'none',
                                color: isLight ? '#0F172A' : '#FFFFFF',
                                fontSize: '14px',
                                fontWeight: '700',
                                fontFamily: 'Cairo, sans-serif',
                                cursor: 'pointer',
                                direction: 'rtl',
                            }}
                        >
                            {CURRENCIES.map(cur => (
                                <option
                                    key={cur.value}
                                    value={cur.value}
                                    style={{
                                        backgroundColor: isLight ? '#FFFFFF' : '#0B1222',
                                        color: isLight ? '#0F172A' : '#FFFFFF',
                                    }}
                                >
                                    {cur.label}
                                </option>
                            ))}
                        </select>
                        <DollarSign size={18} color={isLight ? '#64748B' : '#94A3B8'} style={{ marginRight: '8px' }} />
                    </div>
                    {errors.currency && (
                        <span style={{ fontSize: '11.5px', color: '#EF4444', marginTop: '4px', display: 'block', textAlign: 'right' }}>
                            {errors.currency}
                        </span>
                    )}
                </div>

                {/* 3. Optional Invite / Referral Code */}
                <div style={{ marginBottom: '26px' }}>
                    <label style={{
                        fontSize: '13px',
                        fontWeight: '800',
                        color: isLight ? '#334155' : '#CBD5E1',
                        display: 'block',
                        marginBottom: '8px',
                        textAlign: 'right',
                    }}>
                        كود الدعوة (اختياري)
                    </label>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: isLight ? '#F8FAFC' : 'rgba(15, 23, 42, 0.7)',
                        border: errors.invite_code
                            ? '1.5px solid #EF4444'
                            : isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '14px',
                        padding: '12px 14px',
                        transition: 'border-color 0.2s',
                    }}>
                        <input
                            type="text"
                            name="invite_code"
                            value={formData.invite_code}
                            onChange={handleChange}
                            placeholder="أدخل كود الدعوة إن وجد"
                            style={{
                                width: '100%',
                                background: 'transparent',
                                border: 'none',
                                outline: 'none',
                                color: isLight ? '#0F172A' : '#FFFFFF',
                                fontSize: '14px',
                                fontWeight: '700',
                                fontFamily: 'Cairo, sans-serif',
                                textAlign: 'right',
                            }}
                        />
                        <Gift size={18} color={isLight ? '#64748B' : '#94A3B8'} style={{ marginRight: '8px' }} />
                    </div>
                    {errors.invite_code && (
                        <span style={{ fontSize: '11.5px', color: '#EF4444', marginTop: '4px', display: 'block', textAlign: 'right' }}>
                            {errors.invite_code}
                        </span>
                    )}
                </div>

                {/* Submit Button (Matching Screenshot 2 & 3: [إكمال ->]) */}
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: '14px',
                        borderRadius: '14px',
                        background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                        color: '#FFFFFF',
                        border: 'none',
                        fontSize: '16px',
                        fontWeight: '900',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        boxShadow: '0 4px 20px rgba(245, 158, 11, 0.35)',
                        fontFamily: 'Cairo, sans-serif',
                        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                    }}
                >
                    <span>{loading ? 'جاري الحفظ...' : 'إكمال'}</span>
                    <ArrowLeft size={18} />
                </button>
            </form>
        </AuthLayout>
    );
}
