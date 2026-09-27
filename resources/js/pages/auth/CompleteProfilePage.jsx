import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Globe, DollarSign, Gift, CheckCircle2, ArrowLeft } from 'lucide-react';
import AuthLayout from '../../layouts/AuthLayout';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

const COUNTRIES = [
    { value: 'EG', label: '🇪🇬 مصر (Egypt)' },
    { value: 'SA', label: '🇸🇦 المملكة العربية السعودية (Saudi Arabia)' },
    { value: 'AE', label: '🇦🇪 الإمارات العربية المتحدة (UAE)' },
    { value: 'KW', label: '🇰🇼 الكويت (Kuwait)' },
    { value: 'QA', label: '🇶🇦 قطر (Qatar)' },
    { value: 'OM', label: '🇴🇲 سلطنة عمان (Oman)' },
    { value: 'BH', label: '🇧🇭 البحرين (Bahrain)' },
    { value: 'IQ', label: '🇮🇶 العراق (Iraq)' },
    { value: 'JO', label: '🇯🇴 الأردن (Jordan)' },
    { value: 'LY', label: '🇱🇾 ليبيا (Libya)' },
    { value: 'DZ', label: '🇩🇿 الجزائر (Algeria)' },
    { value: 'MA', label: '🇲🇦 المغرب (Morocco)' },
    { value: 'OTHER', label: 'دولة أخرى (Other Country)' },
];

const CURRENCIES = [
    { value: 'EGP', label: 'ج.م (EGP) - الجنيه المصري' },
    { value: 'USD', label: '$ (USD) - الدولار الأمريكي' },
    { value: 'SAR', label: 'ر.س (SAR) - الريال السعودي' },
    { value: 'AED', label: 'د.إ (AED) - الدرهم الإماراتي' },
    { value: 'KWD', label: 'د.ك (KWD) - الدينار الكويتي' },
    { value: 'EUR', label: '€ (EUR) - اليورو' },
];

export default function CompleteProfilePage() {
    const navigate = useNavigate();
    const { user, completeProfile } = useAuth();
    const { success, error: toastError } = useToast();

    const [formData, setFormData] = useState({
        phone: user?.phone || '',
        country: user?.country || 'EG',
        currency: user?.currency || 'EGP',
        invite_code: '',
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // Update state if user object updates
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                phone: user.phone || prev.phone,
                country: user.country || prev.country,
                currency: user.currency || prev.currency,
            }));
        }
    }, [user]);

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

        // Client validation
        const newErrors = {};
        if (!formData.phone.trim()) {
            newErrors.phone = 'يرجى إدخال رقم الهاتف / الواتساب';
        }
        if (!formData.country) {
            newErrors.country = 'يرجى اختيار الدولة';
        }
        if (!formData.currency) {
            newErrors.currency = 'يرجى اختيار العملة الافتراضية';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        try {
            const payload = {
                phone: formData.phone.trim(),
                country: formData.country,
                currency: formData.currency,
            };

            if (formData.invite_code.trim()) {
                payload.invite_code = formData.invite_code.trim().toUpperCase();
            }

            const updated = await completeProfile(payload);

            if (updated) {
                success('تم استكمال الملف الشخصي بنجاح! أهلاً بك في منصة إمبراطور');
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
            title="إكمال الملف الشخصي"
            subtitle="خطوة أخيرة لتخصيص محفظتك وعملتك وتأكيد استلام الطلبات"
        >
            <form onSubmit={handleSubmit} noValidate>
                {/* Phone Number Field */}
                <Input
                    label="رقم الهاتف / الواتساب"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="مثال: 01012345678"
                    icon={Phone}
                    error={errors.phone}
                    helperText="سنرسل إشعارات استلام وتنفيذ الطلبات على هذا الرقم"
                    required
                />

                {/* Country Selection */}
                <Select
                    label="الدولة"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    options={COUNTRIES}
                    error={errors.country}
                    helperText="تحديد الدولة يساعد في عرض طرق الإيداع المحلية المناسبة"
                    required
                />

                {/* Preferred Currency */}
                <Select
                    label="العملة المفضلة"
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    options={CURRENCIES}
                    error={errors.currency}
                    helperText="العملة الأساسية لحساب رصيدك وعمليات الشراء"
                    required
                />

                {/* Optional Referral Code */}
                <Input
                    label="كود الدعوة (إن وجد)"
                    type="text"
                    name="invite_code"
                    value={formData.invite_code}
                    onChange={handleChange}
                    placeholder="كود دعوة من صديق"
                    icon={Gift}
                    error={errors.invite_code}
                    helperText="إذا لم تدخل كود الدعوة عند التسجيل، يمكنك ربطه الآن"
                />

                {/* Buttons Container */}
                <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        loading={loading}
                        icon={CheckCircle2}
                        style={{ flex: 1 }}
                    >
                        حفظ ومتابعة
                    </Button>

                    <Button
                        type="button"
                        variant="ghost"
                        size="lg"
                        onClick={() => navigate('/')}
                        style={{ color: '#8E8E98' }}
                    >
                        تخطي الآن
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
