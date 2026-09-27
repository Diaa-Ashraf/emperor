import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn, Shield, ArrowRight, Key, ArrowLeft } from 'lucide-react';
import AuthLayout from '../../layouts/AuthLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { authApi } from '../../api/endpoints';

export default function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { login, login2FA, setSession } = useAuth();
    const { success, error: toastError } = useToast();

    const from = location.state?.from?.pathname || '/';

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // 2FA Challenge State
    const [requires2FA, setRequires2FA] = useState(false);
    const [twoFactorCode, setTwoFactorCode] = useState(['', '', '', '', '', '']);
    const [isUsingRecoveryCode, setIsUsingRecoveryCode] = useState(false);
    const [recoveryCode, setRecoveryCode] = useState('');
    const [verifying2FA, setVerifying2FA] = useState(false);

    // Check for OAuth Token in URL parameters (from Google redirect callback)
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const oauthToken = queryParams.get('oauth_token');
        const oauthError = queryParams.get('error');

        if (oauthToken) {
            setSession(oauthToken, null);
            success('تم تسجيل الدخول بنجاح عبر Google');
            navigate('/', { replace: true });
        } else if (oauthError) {
            toastError(decodeURIComponent(oauthError));
        }
    }, [location.search, setSession, success, toastError, navigate]);

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
        if (!formData.email.trim()) {
            newErrors.email = 'يرجى إدخال البريد الإلكتروني';
        }
        if (!formData.password) {
            newErrors.password = 'يرجى إدخال كلمة المرور';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        try {
            const data = await login({
                email: formData.email.trim(),
                password: formData.password,
                remember: formData.remember,
            });

            if (data?.requires_2fa) {
                setRequires2FA(true);
                success('يرجى إدخال رمز التحقق بخطوتين (2FA) للمتابعة');
                return;
            }

            if (data?.token) {
                success('تم تسجيل الدخول بنجاح، مرحباً بك');
                navigate(from, { replace: true });
            }
        } catch (err) {
            if (err.errors) {
                setErrors(err.errors);
            } else if (err.message) {
                toastError(err.message);
            } else {
                toastError('حدث خطأ أثناء تسجيل الدخول، يرجى المحاولة مرة أخرى');
            }
        } finally {
            setLoading(false);
        }
    };

    // 2FA OTP Digit change handlers
    const handleDigitChange = (index, value) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newCode = [...twoFactorCode];
        newCode[index] = value;
        setTwoFactorCode(newCode);

        if (value && index < 5) {
            const nextInput = document.getElementById(`login-2fa-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !twoFactorCode[index] && index > 0) {
            const prevInput = document.getElementById(`login-2fa-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    const handlePasteDigits = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        if (!pasted) return;

        const newCode = [...twoFactorCode];
        for (let i = 0; i < pasted.length; i++) {
            newCode[i] = pasted[i];
        }
        setTwoFactorCode(newCode);

        const targetIndex = Math.min(pasted.length, 5);
        const targetInput = document.getElementById(`login-2fa-${targetIndex}`);
        if (targetInput) targetInput.focus();
    };

    // Submit 2FA code / recovery code
    const handle2FASubmit = async (e) => {
        e.preventDefault();
        const fullCode = twoFactorCode.join('');

        if (!isUsingRecoveryCode && fullCode.length !== 6) {
            toastError('يرجى إدخال رمز التحقق المكون من 6 أرقام');
            return;
        }

        if (isUsingRecoveryCode && !recoveryCode.trim()) {
            toastError('يرجى إدخال رمز الاسترداد الاحتياطي');
            return;
        }

        setVerifying2FA(true);
        try {
            const payload = {
                email: formData.email.trim(),
                password: formData.password,
                device_name: 'Web Application (2FA)',
            };

            if (isUsingRecoveryCode) {
                payload.recovery_code = recoveryCode.trim();
            } else {
                payload.two_factor_code = fullCode;
            }

            const data = await login2FA(payload);
            if (data?.token) {
                success('تم التحقق وتسجيل الدخول بنجاح');
                navigate(from, { replace: true });
            }
        } catch (err) {
            console.error('2FA login error:', err);
            const msg = err.response?.data?.message || err.message || 'رمز المصادقة الثنائية غير صحيح';
            toastError(msg);
        } finally {
            setVerifying2FA(false);
        }
    };

    // Trigger Google OAuth Login
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
            title={requires2FA ? 'المصادقة الثنائية (2FA)' : 'تسجيل الدخول'}
            subtitle={
                requires2FA
                    ? 'أدخل رمز الأمان من تطبيق Google Authenticator للمتابعة'
                    : 'أهلاً بك مجدداً في إمبراطور، سجل دخولك للوصول إلى محفظتك'
            }
        >
            {/* 2FA Challenge View */}
            {requires2FA ? (
                <form onSubmit={handle2FASubmit} noValidate>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '24px',
                    }}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '20px',
                            background: 'rgba(212, 165, 55, 0.15)',
                            border: '1px solid rgba(212, 165, 55, 0.3)',
                            color: '#D4A537',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 0 25px rgba(212, 165, 55, 0.2)',
                        }}>
                            <Shield size={32} />
                        </div>
                    </div>

                    {!isUsingRecoveryCode ? (
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '13px',
                                fontWeight: '700',
                                color: '#FFFFFF',
                                marginBottom: '16px',
                                textAlign: 'center',
                            }}>
                                أدخل رمز التحقق المكون من 6 أرقام:
                            </label>

                            <div
                                onPaste={handlePasteDigits}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    direction: 'ltr',
                                    marginBottom: '24px',
                                }}
                            >
                                {twoFactorCode.map((digit, i) => (
                                    <input
                                        key={i}
                                        id={`login-2fa-${i}`}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleDigitChange(i, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(i, e)}
                                        style={{
                                            width: '46px',
                                            height: '54px',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(212, 165, 55, 0.3)',
                                            background: 'rgba(13, 13, 16, 0.8)',
                                            color: '#FFFFFF',
                                            fontSize: '22px',
                                            fontWeight: '900',
                                            textAlign: 'center',
                                            outline: 'none',
                                            boxShadow: digit ? '0 0 12px rgba(212, 165, 55, 0.35)' : 'none',
                                            transition: 'all 0.2s ease',
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#FFFFFF', marginBottom: '8px' }}>
                                رمز الاسترداد الاحتياطي (Recovery Code):
                            </label>
                            <Input
                                type="text"
                                value={recoveryCode}
                                onChange={(e) => setRecoveryCode(e.target.value)}
                                placeholder="XXXXX-XXXXX"
                                icon={Key}
                                style={{ direction: 'ltr', textAlign: 'center', fontFamily: 'monospace', letterSpacing: '2px' }}
                                required
                            />
                        </div>
                    )}

                    {/* Toggle Recovery Code vs Authenticator */}
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <button
                            type="button"
                            onClick={() => setIsUsingRecoveryCode(!isUsingRecoveryCode)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#D4A537',
                                fontSize: '13px',
                                fontWeight: '700',
                                cursor: 'pointer',
                                textDecoration: 'underline',
                                padding: 0,
                            }}
                        >
                            {isUsingRecoveryCode
                                ? 'الرجوع لاستخدام تطبيق Authenticator'
                                : 'فقدت الوصول؟ استخدم رمز الاسترداد الاحتياطي'}
                        </button>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        loading={verifying2FA}
                        icon={LogIn}
                        style={{ width: '100%', marginBottom: '16px' }}
                    >
                        تأكيد وتسجيل الدخول
                    </Button>

                    {/* Back to password login */}
                    <button
                        type="button"
                        onClick={() => setRequires2FA(false)}
                        style={{
                            width: '100%',
                            background: 'transparent',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '12px',
                            color: '#9E9EA8',
                            fontSize: '13px',
                            fontWeight: '700',
                            padding: '10px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                        }}
                    >
                        <ArrowRight size={16} />
                        <span>العودة لإدخال البريد وكلمة المرور</span>
                    </button>
                </form>
            ) : (
                /* Standard Login View */
                <>
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
                        <span>{googleLoading ? 'جاري التحويل إلى Google...' : 'متابعة باستخدام حساب Google'}</span>
                    </button>

                    {/* Divider */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        margin: '0 0 20px',
                        gap: '12px',
                    }}>
                        <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.08)' }} />
                        <span style={{ fontSize: '12px', color: '#656570', fontWeight: '700' }}>أو عبر البريد الإلكتروني</span>
                        <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.08)' }} />
                    </div>

                    <form onSubmit={handleSubmit} noValidate>
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

                        {/* Password Field with Show/Hide Toggle */}
                        <div style={{ position: 'relative' }}>
                            <Input
                                label="كلمة المرور"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                icon={Lock}
                                error={errors.password}
                                autoComplete="current-password"
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

                        {/* Options: Remember Me & Forgot Password */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '24px',
                            fontSize: '13px',
                        }}>
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                cursor: 'pointer',
                                color: '#CBD5E1',
                                userSelect: 'none',
                            }}>
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={formData.remember}
                                    onChange={handleChange}
                                    style={{
                                        width: '16px',
                                        height: '16px',
                                        accentColor: '#D4A537',
                                        cursor: 'pointer',
                                    }}
                                />
                                تذكرني على هذا الجهاز
                            </label>

                            <Link to="/support" style={{ color: '#8E8E98', fontSize: '12px', textDecoration: 'none' }}>
                                نسيت كلمة المرور؟
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            loading={loading}
                            icon={LogIn}
                            style={{ width: '100%', marginBottom: '20px' }}
                        >
                            تسجيل الدخول
                        </Button>

                        {/* Register Link */}
                        <div style={{
                            textAlign: 'center',
                            fontSize: '14px',
                            color: '#9E9EA8',
                            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                            paddingTop: '20px',
                        }}>
                            ليس لديك حساب؟{' '}
                            <Link
                                to="/register"
                                style={{
                                    color: '#D4A537',
                                    fontWeight: '700',
                                    textDecoration: 'none',
                                    transition: 'color 0.2s',
                                }}
                            >
                                إنشاء حساب جديد
                            </Link>
                        </div>
                    </form>
                </>
            )}
        </AuthLayout>
    );
}
