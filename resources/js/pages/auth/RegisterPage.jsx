import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, Gift, ShieldCheck } from 'lucide-react';
import AuthLayout from '../../layouts/AuthLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { authApi } from '../../api/endpoints';

export default function RegisterPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { register, setSession } = useAuth();
    const { success, error: toastError } = useToast();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        referral_code: '',
        terms: true,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // Read ref code from URL query parameter if present
    useEffect(() => {
        const ref = searchParams.get('ref') || searchParams.get('referral');
        if (ref) {
            setFormData(prev => ({ ...prev, referral_code: ref.toUpperCase() }));
        }
    }, [searchParams]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        // Client validation
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = 'يرجى إدخال الاسم بالكامل';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'يرجى إدخال البريد الإلكتروني';
        }
        if (!formData.password) {
            newErrors.password = 'يرجى إدخال كلمة المرور';
        } else if (formData.password.length < 8) {
            newErrors.password = 'كلمة المرور يجب ألا تقل عن 8 أحرف';
        }
        if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = 'تأكيد كلمة المرور غير متطابق';
        }
        if (!formData.terms) {
            newErrors.terms = 'يجب الموافقة على الشروط والأحكام للمتابعة';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        try {
            const payload = {
                name: formData.name.trim(),
                email: formData.email.trim(),
                password: formData.password,
                password_confirmation: formData.password_confirmation,
            };

            if (formData.referral_code.trim()) {
                payload.referral_code = formData.referral_code.trim().toUpperCase();
            }

            const data = await register(payload);

            if (data) {
                success('تم إنشاء الحساب بنجاح! يرجى إكمال بيانات الملف الشخصي');
                navigate('/complete-profile', { replace: true });
            }
        } catch (err) {
            if (err.errors) {
                setErrors(err.errors);
            } else if (err.message) {
                toastError(err.message);
            } else {
                toastError('حدث خطأ أثناء إنشاء الحساب، يرجى المحاولة مرة أخرى');
            }
        } finally {
            setLoading(false);
        }
    };

    // Trigger Google OAuth Register
    const handleGoogleAuth = async () => {
        setGoogleLoading(true);
        try {
            const res = await authApi.getGoogleRedirectUrl();
            const url = res.data?.data?.url || res.data?.url;
            if (url) {
                window.location.href = url;
            } else {
                window.location.href = '/api/v1/auth/google/redirect';
            }
        } catch (err) {
            console.error('Google OAuth URL generation error:', err);
            window.location.href = '/api/v1/auth/google/redirect';
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <AuthLayout
            title="إنشاء حساب جديد"
            subtitle="انضم إلى نخبة تجار ومستخدمي إمبراطور وتمتع بأسرع شحن وأعلى أرباح"
        >
            {/* Google Sign In Quick Button */}
            <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={googleLoading || loading}
                style={{
                    width: '100%',
                    padding: '12px 18px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#FFFFFF',
                    fontSize: '14px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    marginBottom: '20px',
                    fontFamily: 'Cairo, sans-serif',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(212, 165, 55, 0.4)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                }}
            >
                <svg width="18" height="18" viewBox="0 0 24 24">
                    <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                </svg>
                <span>{googleLoading ? 'جاري التحويل إلى Google...' : 'تسجيل سريع بحساب Google'}</span>
            </button>

            {/* Divider */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                margin: '0 0 20px',
                gap: '12px',
            }}>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.08)' }} />
                <span style={{ fontSize: '12px', color: '#656570', fontWeight: '700' }}>أو أنشئ حسابك يدوياً</span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.08)' }} />
            </div>

            <form onSubmit={handleSubmit} noValidate>
                {/* Full Name Field */}
                <Input
                    label="الاسم الكامل"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="مثال: محمد أحمد"
                    icon={User}
                    error={errors.name}
                    autoComplete="name"
                    required
                />

                {/* Email Field */}
                <Input
                    label="البريد الإلكتروني"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    icon={Mail}
                    error={errors.email}
                    autoComplete="email"
                    required
                />

                {/* Password Field */}
                <div style={{ position: 'relative' }}>
                    <Input
                        label="كلمة المرور"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="8 أحرف أو أكثر"
                        icon={Lock}
                        error={errors.password}
                        autoComplete="new-password"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                            position: 'absolute',
                            left: '12px',
                            top: '38px',
                            background: 'transparent',
                            border: 'none',
                            color: '#8E8E98',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '4px',
                        }}
                        title={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>

                {/* Password Confirmation */}
                <Input
                    label="تأكيد كلمة المرور"
                    type={showPassword ? 'text' : 'password'}
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    placeholder="أعد إدخال كلمة المرور"
                    icon={Lock}
                    error={errors.password_confirmation}
                    autoComplete="new-password"
                    required
                />

                {/* Optional Referral Code */}
                <Input
                    label="كود الإحالة / الدعوة (اختياري)"
                    type="text"
                    name="referral_code"
                    value={formData.referral_code}
                    onChange={handleChange}
                    placeholder="كود دعوة من صديق إن وجد"
                    icon={Gift}
                    error={errors.referral_code}
                    helperText="أدخل كود صديقك للحصول على مكافآت ترحيبية فورية"
                />

                {/* Terms and Conditions Checkbox */}
                <div style={{ marginBottom: '24px' }}>
                    <label style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        cursor: 'pointer',
                        color: '#CBD5E1',
                        fontSize: '13px',
                        userSelect: 'none',
                    }}>
                        <input
                            type="checkbox"
                            name="terms"
                            checked={formData.terms}
                            onChange={handleChange}
                            style={{
                                width: '18px',
                                height: '18px',
                                accentColor: '#D4A537',
                                cursor: 'pointer',
                                marginTop: '2px',
                            }}
                        />
                        <span>
                            أوافق على <span style={{ color: '#D4A537', textDecoration: 'underline' }}>شروط الاستخدام</span> و <span style={{ color: '#D4A537', textDecoration: 'underline' }}>سياسة الخصوصية</span> لمنصة إمبراطور
                        </span>
                    </label>
                    {errors.terms && (
                        <span style={{ fontSize: '12px', color: '#EF4444', fontWeight: '600', display: 'block', marginTop: '6px' }}>
                            {errors.terms}
                        </span>
                    )}
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={loading}
                    icon={UserPlus}
                    style={{ width: '100%', marginBottom: '20px' }}
                >
                    إنشاء الحساب الآن
                </Button>

                {/* Login Link */}
                <div style={{
                    textAlign: 'center',
                    fontSize: '14px',
                    color: '#9E9EA8',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    paddingTop: '20px',
                }}>
                    لديك حساب بالفعل؟{' '}
                    <Link
                        to="/login"
                        style={{
                            color: '#D4A537',
                            fontWeight: '700',
                            textDecoration: 'none',
                            transition: 'color 0.2s',
                        }}
                    >
                        تسجيل الدخول
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
}
