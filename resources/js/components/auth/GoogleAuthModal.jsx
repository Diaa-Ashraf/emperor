import React, { useState } from 'react';
import { ShieldCheck, Copy, Check, Zap, AlertCircle, X, ExternalLink } from 'lucide-react';
import { authApi } from '../../api/endpoints';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { useNavigate } from 'react-router-dom';

export default function GoogleAuthModal({ isOpen, onClose }) {
    const { setSession } = useAuth();
    const { success, error: toastError } = useToast();
    const navigate = useNavigate();

    const [copied, setCopied] = useState(false);
    const [demoLoading, setDemoLoading] = useState(false);

    if (!isOpen) return null;

    const redirectUri = `${window.location.origin}/api/v1/auth/google/callback`;

    const handleCopy = () => {
        navigator.clipboard.writeText(redirectUri);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDemoLogin = async () => {
        setDemoLoading(true);
        try {
            const res = await authApi.googleDemoLogin();
            const data = res.data?.data || res.data;
            if (data?.token) {
                setSession(data.token, data.user);
                success('تم تسجيل الدخول بنجاح بحساب Google!');
                onClose();
                if (data.is_new_user) {
                    navigate('/complete-profile', { replace: true });
                } else {
                    navigate('/', { replace: true });
                }
            } else {
                toastError('تعذر تسجيل الدخول التجريبي، حاول مجدداً');
            }
        } catch (err) {
            console.error('Demo Google login error:', err);
            toastError(err.response?.data?.message || 'حدث خطأ أثناء تسجيل الدخول التجريبي');
        } finally {
            setDemoLoading(false);
        }
    };

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 999999,
                backgroundColor: 'rgba(5, 5, 8, 0.82)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px',
                animation: 'googleModalFadeIn 0.25s ease-out',
                direction: 'rtl',
                fontFamily: 'Cairo, sans-serif',
            }}
            onClick={onClose}
        >
            <style>{`
                @keyframes googleModalFadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
            `}</style>

            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '480px',
                    backgroundColor: '#0F121A',
                    border: '1.5px solid rgba(212, 165, 55, 0.35)',
                    borderRadius: '24px',
                    padding: '28px 24px',
                    boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 35px rgba(66, 133, 244, 0.15)',
                    color: '#FFFFFF',
                }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    aria-label="إغلاق"
                    style={{
                        position: 'absolute',
                        top: '18px',
                        left: '18px',
                        width: '34px',
                        height: '34px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: '#94A3B8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                        e.currentTarget.style.color = '#FFFFFF';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                        e.currentTarget.style.color = '#94A3B8';
                    }}
                >
                    <X size={18} />
                </button>

                {/* Google Icon & Header */}
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '18px',
                        backgroundColor: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 14px',
                        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.35)',
                    }}>
                        <svg width="32" height="32" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                        </svg>
                    </div>

                    <h3 style={{ fontSize: '20px', fontWeight: '800', margin: '0 0 6px', color: '#FFFFFF' }}>
                        تسجيل الدخول عبر Google
                    </h3>
                    <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0, lineHeight: 1.6 }}>
                        مرحباً بك! لتفعيل الدخول الفعلي بحساب Google المباشر، يحتاج النظام إلى مفاتيح الربط في ملف <code style={{ color: '#D4A537', backgroundColor: 'rgba(212,165,55,0.1)', padding: '2px 6px', borderRadius: '4px' }}>.env</code>.
                    </p>
                </div>

                {/* Info Card with Callback URL */}
                <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '16px',
                    padding: '14px 16px',
                    marginBottom: '20px',
                    fontSize: '13px',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#F59E0B', fontWeight: '700', marginBottom: '8px' }}>
                        <AlertCircle size={16} />
                        <span>رابط الـ Redirect URI المطلوب في Google Cloud:</span>
                    </div>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: '#090B10',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: '10px',
                        padding: '8px 12px',
                        gap: '8px',
                    }}>
                        <span style={{
                            direction: 'ltr',
                            fontFamily: 'monospace',
                            fontSize: '12px',
                            color: '#38BDF8',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            flex: 1,
                        }}>
                            {redirectUri}
                        </span>
                        <button
                            onClick={handleCopy}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '4px 8px',
                                borderRadius: '6px',
                                backgroundColor: copied ? '#10B981' : 'rgba(255, 255, 255, 0.1)',
                                border: 'none',
                                color: '#FFFFFF',
                                fontSize: '11px',
                                fontWeight: '700',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                flexShrink: 0,
                            }}
                        >
                            {copied ? <Check size={12} /> : <Copy size={12} />}
                            <span>{copied ? 'تم النسخ' : 'نسخ'}</span>
                        </button>
                    </div>

                    <p style={{ margin: '8px 0 0', fontSize: '11px', color: '#64748B', lineHeight: 1.5 }}>
                        المفاتيح المطلوبة في ملف <code style={{ color: '#E2E8F0' }}>.env</code>: <br />
                        <code style={{ color: '#FCD34D' }}>GOOGLE_CLIENT_ID=...</code> <br />
                        <code style={{ color: '#FCD34D' }}>GOOGLE_CLIENT_SECRET=...</code>
                    </p>
                </div>

                {/* Instant Demo Login Button */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button
                        onClick={handleDemoLogin}
                        disabled={demoLoading}
                        style={{
                            width: '100%',
                            padding: '13px 18px',
                            borderRadius: '14px',
                            background: 'linear-gradient(90deg, #D4A537 0%, #E6B84A 50%, #C39226 100%)',
                            border: 'none',
                            color: '#0A0A0E',
                            fontSize: '15px',
                            fontWeight: '900',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            boxShadow: '0 4px 20px rgba(212, 165, 55, 0.4)',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        <Zap size={18} fill="#0A0A0E" />
                        <span>{demoLoading ? 'جاري الدخول...' : '⚡ تجربة الدخول الفوري بحساب Google (Demo)'}</span>
                    </button>

                    <button
                        onClick={onClose}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '12px',
                            backgroundColor: 'transparent',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: '#94A3B8',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer',
                        }}
                    >
                        إلغاء والعودة
                    </button>
                </div>
            </div>
        </div>
    );
}

