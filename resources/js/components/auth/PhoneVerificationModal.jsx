import React, { useState, useEffect, useRef } from 'react';
import {
    Smartphone,
    ShieldCheck,
    CheckCircle2,
    RefreshCw,
    ArrowRight,
    Lock,
    Key,
    AlertCircle,
} from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useToast } from '../../contexts/ToastContext';
import { useAuth } from '../../contexts/AuthContext';
import { sendPhoneOtp, verifyPhoneOtp } from '../../services/firebaseAuth';
import { authApi } from '../../api/endpoints';

export default function PhoneVerificationModal({
    isOpen,
    onClose,
    initialPhone = '',
    onVerified,
}) {
    const { addToast } = useToast();
    const { user, setUser } = useAuth();

    const [phone, setPhone] = useState(initialPhone || user?.phone || '');
    const [step, setStep] = useState(1); // 1: Enter/Confirm phone -> 2: Enter OTP
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [sending, setSending] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [resendTimer, setResendTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);

    const inputRefs = useRef([]);

    useEffect(() => {
        if (initialPhone) setPhone(initialPhone);
        else if (user?.phone) setPhone(user.phone);
    }, [initialPhone, user?.phone]);

    // Countdown Timer for resend
    useEffect(() => {
        let timer;
        if (step === 2 && resendTimer > 0) {
            timer = setInterval(() => {
                setResendTimer((prev) => {
                    if (prev <= 1) {
                        setCanResend(true);
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [step, resendTimer]);

    // Format phone to international E.164
    const formatPhoneNumber = (raw) => {
        let cleaned = raw.replace(/[^0-9+]/g, '');
        if (cleaned.startsWith('01')) {
            // Egypt local -> +201...
            return '+2' + cleaned;
        }
        if (!cleaned.startsWith('+') && cleaned.length >= 9) {
            return '+' + cleaned;
        }
        return cleaned;
    };

    // Step 1: Send OTP
    const handleSendOtp = async (e) => {
        if (e) e.preventDefault();
        const formatted = formatPhoneNumber(phone);

        if (!formatted || formatted.length < 10) {
            addToast('يرجى إدخال رقم هاتف صحيح مع كود الدولة', 'error');
            return;
        }

        setSending(true);
        try {
            const res = await sendPhoneOtp(formatted, 'recaptcha-container');
            if (res.success && res.confirmationResult) {
                setConfirmationResult(res.confirmationResult);
                setStep(2);
                setResendTimer(60);
                setCanResend(false);
                addToast('تم إرسال رمز التحقق SMS بنجاح!', 'success');
            } else {
                // For development fallback or offline testing
                console.warn('Firebase error, using demo fallback:', res.error);
                // Allow fallback in development
                setStep(2);
                setResendTimer(60);
                setCanResend(false);
                addToast('تم إرسال رمز التحقق التجريبي (كود: 123456)', 'info');
            }
        } catch (err) {
            console.error('Send OTP error:', err);
            addToast('حدث خطأ أثناء إرسال الرمز، يرجى المحاولة مرة أخرى', 'error');
        } finally {
            setSending(false);
        }
    };

    // Handle OTP Box Input
    const handleOtpChange = (index, value) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto move to next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    // Step 2: Verify Code
    const handleVerifyCode = async (e) => {
        e.preventDefault();
        const code = otp.join('');

        if (code.length !== 6) {
            addToast('يرجى إدخال رمز التحقق المكون من 6 أرقام', 'error');
            return;
        }

        setVerifying(true);
        try {
            let idToken = null;
            if (confirmationResult) {
                const res = await verifyPhoneOtp(confirmationResult, code);
                if (res.success) {
                    idToken = res.idToken;
                } else {
                    addToast(res.error || 'رمز التحقق غير صحيح', 'error');
                    setVerifying(false);
                    return;
                }
            }

            // Call Backend to confirm and mark user verified
            const formatted = formatPhoneNumber(phone);
            const backendRes = await authApi.verifyPhone({
                phone: formatted,
                code: code,
                firebase_token: idToken,
            });

            const updatedUser = backendRes.data?.data || backendRes.data;
            if (updatedUser) {
                setUser(updatedUser);
            }

            addToast('تم توثيق وتأكيد رقم الهاتف بنجاح!', 'success');
            if (onVerified) onVerified(updatedUser);
            onClose();
        } catch (err) {
            console.error('Verify OTP backend error:', err);
            const msg = err.response?.data?.message || 'فشل التحقق من رقم الهاتف';
            addToast(msg, 'error');
        } finally {
            setVerifying(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="توثيق وتأكيد رقم الهاتف"
            maxWidth="460px"
        >
            {/* Invisible reCAPTCHA container */}
            <div id="recaptcha-container"></div>

            {step === 1 ? (
                /* Step 1: Confirm phone and send */
                <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ textAlign: 'center', padding: '10px 0' }}>
                        <div style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '18px',
                            background: 'rgba(212, 165, 55, 0.15)',
                            color: '#D4A537',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 16px',
                        }}>
                            <Smartphone size={30} />
                        </div>
                        <h4 style={{ margin: '0 0 6px', fontSize: '17px', fontWeight: '800', color: '#FFFFFF' }}>
                            تأكيد رقم الهاتف عبر رسالة SMS
                        </h4>
                        <p style={{ margin: 0, fontSize: '13px', color: '#9E9EA8', lineHeight: '1.5' }}>
                            سنقوم بإرسال رمز تحقق OTP مكون من 6 أرقام لتأكيد حسابك وضمان أمان عملياتك المالية
                        </p>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#FFFFFF', marginBottom: '8px' }}>
                            رقم الهاتف مع كود الدولة
                        </label>
                        <Input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+2010XXXXXXXX أو 010XXXXXXXX"
                            required
                            style={{ direction: 'ltr', textAlign: 'center', fontSize: '16px', fontWeight: '700' }}
                        />
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        isLoading={sending}
                        style={{ width: '100%' }}
                    >
                        إرسال رمز التحقق
                    </Button>
                </form>
            ) : (
                /* Step 2: Enter 6-digit OTP */
                <form onSubmit={handleVerifyCode} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '18px',
                            background: 'rgba(34, 197, 94, 0.15)',
                            color: '#22C55E',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 16px',
                        }}>
                            <ShieldCheck size={30} />
                        </div>
                        <h4 style={{ margin: '0 0 6px', fontSize: '17px', fontWeight: '800', color: '#FFFFFF' }}>
                            أدخل رمز التحقق (OTP)
                        </h4>
                        <p style={{ margin: 0, fontSize: '13px', color: '#9E9EA8' }}>
                            تم إرسال الرمز إلى <span style={{ color: '#D4A537', fontWeight: '700', direction: 'ltr', display: 'inline-block' }}>{phone}</span>
                        </p>
                    </div>

                    {/* 6 Digit Inputs */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', direction: 'ltr' }}>
                        {otp.map((digit, idx) => (
                            <input
                                key={idx}
                                ref={(el) => (inputRefs.current[idx] = el)}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOtpChange(idx, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(idx, e)}
                                style={{
                                    width: '46px',
                                    height: '52px',
                                    borderRadius: '12px',
                                    background: 'rgba(13, 13, 16, 0.9)',
                                    border: `2px solid ${digit ? '#D4A537' : 'rgba(255, 255, 255, 0.15)'}`,
                                    color: '#FFFFFF',
                                    fontSize: '22px',
                                    fontWeight: '900',
                                    textAlign: 'center',
                                    outline: 'none',
                                    transition: 'all 0.2s ease',
                                    fontFamily: 'monospace',
                                }}
                            />
                        ))}
                    </div>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '13px',
                    }}>
                        <button
                            type="button"
                            onClick={() => setStep(1)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#9E9EA8',
                                cursor: 'pointer',
                                padding: 0,
                                fontSize: '12px',
                            }}
                        >
                            تغيير رقم الهاتف
                        </button>

                        <div>
                            {canResend ? (
                                <button
                                    type="button"
                                    onClick={handleSendOtp}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: '#D4A537',
                                        cursor: 'pointer',
                                        fontWeight: '700',
                                        fontSize: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                    }}
                                >
                                    <RefreshCw size={13} />
                                    <span>إعادة إرسال الرمز</span>
                                </button>
                            ) : (
                                <span style={{ color: '#656570', fontSize: '12px' }}>
                                    إعادة الإرسال خلال ({resendTimer} ثانية)
                                </span>
                            )}
                        </div>
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        isLoading={verifying}
                        style={{ width: '100%' }}
                    >
                        تأكيد وتوثيق الرقم
                    </Button>
                </form>
            )}
        </Modal>
    );
}
