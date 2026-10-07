import React, { useState, useEffect } from 'react';
import {
    Shield,
    Key,
    QrCode,
    Copy,
    Check,
    Lock,
    AlertCircle,
    Download,
    CheckCircle2,
    RefreshCw,
    Smartphone,
    Eye,
    EyeOff
} from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { profileApi } from '../../api/endpoints';
import { useToast } from '../../contexts/ToastContext';

export default function TwoFactorModal({ isOpen, onClose, isEnabled, onStatusChange }) {
    const { addToast } = useToast();

    // Mode: 'setup' | 'recovery_codes' | 'disable'
    const [viewMode, setViewMode] = useState(isEnabled ? 'recovery_codes' : 'setup');

    // Setup State
    const [loadingSetup, setLoadingSetup] = useState(false);
    const [setupData, setSetupData] = useState({
        secret: '',
        qr_code_svg: '',
        qr_code_url: '',
        recovery_codes: [],
    });
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [verifying, setVerifying] = useState(false);
    const [setupCompleted, setSetupCompleted] = useState(false);
    const [copiedSecret, setCopiedSecret] = useState(false);
    const [copiedCodes, setCopiedCodes] = useState(false);

    // Disable State
    const [disablePassword, setDisablePassword] = useState('');
    const [showDisablePassword, setShowDisablePassword] = useState(false);
    const [disabling, setDisabling] = useState(false);

    // Recovery Codes State
    const [storedCodes, setStoredCodes] = useState([]);
    const [loadingCodes, setLoadingCodes] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setSetupCompleted(false);
            setCode(['', '', '', '', '', '']);
            setDisablePassword('');
            if (!isEnabled) {
                setViewMode('setup');
                fetchSetupData();
            } else {
                setViewMode('recovery_codes');
                fetchRecoveryCodes();
            }
        }
    }, [isOpen, isEnabled]);

    const fetchSetupData = async () => {
        setLoadingSetup(true);
        try {
            const res = await profileApi.enable2FA();
            const data = res.data?.data || res.data;
            setSetupData({
                secret: data.secret || '',
                qr_code_svg: data.qr_code_svg || '',
                qr_code_url: data.qr_code_url || '',
                recovery_codes: data.recovery_codes || [],
            });
        } catch (err) {
            console.error('Fetch 2FA setup error:', err);
            addToast('فشل في جلب بيانات إعداد المصادقة الثنائية', 'error');
        } finally {
            setLoadingSetup(false);
        }
    };

    const fetchRecoveryCodes = async () => {
        setLoadingCodes(true);
        try {
            const res = await profileApi.getRecoveryCodes();
            const codes = res.data?.data?.recovery_codes || res.data?.recovery_codes || [];
            setStoredCodes(codes);
        } catch (err) {
            console.error('Fetch recovery codes error:', err);
        } finally {
            setLoadingCodes(false);
        }
    };

    // OTP Input handlers
    const handleCodeChange = (index, value) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Auto move to next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`two-fa-code-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            const prevInput = document.getElementById(`two-fa-code-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        if (!pasted) return;

        const newCode = [...code];
        for (let i = 0; i < pasted.length; i++) {
            newCode[i] = pasted[i];
        }
        setCode(newCode);

        const targetIndex = Math.min(pasted.length, 5);
        const targetInput = document.getElementById(`two-fa-code-${targetIndex}`);
        if (targetInput) targetInput.focus();
    };

    // Verify 2FA
    const handleVerifySubmit = async (e) => {
        e?.preventDefault();
        const fullCode = code.join('');
        if (fullCode.length !== 6) {
            addToast('يرجى إدخال رمز التحقق المكون من 6 أرقام', 'error');
            return;
        }

        setVerifying(true);
        try {
            const res = await profileApi.verify2FA(fullCode);
            const data = res.data?.data || res.data;
            if (data.recovery_codes) {
                setSetupData((prev) => ({ ...prev, recovery_codes: data.recovery_codes }));
            }
            setSetupCompleted(true);
            addToast('تم تفعيل المصادقة الثنائية بنجاح!', 'success');
            if (onStatusChange) onStatusChange(true);
        } catch (err) {
            console.error('Verify 2FA error:', err);
            const msg = err.response?.data?.message || 'رمز التحقق غير صحيح أو منتهي الصلاحية';
            addToast(msg, 'error');
        } finally {
            setVerifying(false);
        }
    };

    // Disable 2FA
    const handleDisableSubmit = async (e) => {
        e.preventDefault();
        if (!disablePassword) {
            addToast('يرجى إدخال كلمة المرور لتأكيد التعطيل', 'error');
            return;
        }

        setDisabling(true);
        try {
            await profileApi.disable2FA(disablePassword);
            addToast('تم تعطيل المصادقة الثنائية بنجاح', 'success');
            if (onStatusChange) onStatusChange(false);
            onClose();
        } catch (err) {
            console.error('Disable 2FA error:', err);
            const msg = err.response?.data?.message || 'كلمة المرور غير صحيحة';
            addToast(msg, 'error');
        } finally {
            setDisabling(false);
        }
    };

    const handleCopySecret = () => {
        if (!setupData.secret) return;
        navigator.clipboard.writeText(setupData.secret);
        setCopiedSecret(true);
        addToast('تم نسخ المفتاح السري', 'success');
        setTimeout(() => setCopiedSecret(false), 2000);
    };

    const handleCopyRecoveryCodes = (codesList) => {
        const text = codesList.join('\n');
        navigator.clipboard.writeText(text);
        setCopiedCodes(true);
        addToast('تم نسخ رموز الاسترداد الاحتياطية', 'success');
        setTimeout(() => setCopiedCodes(false), 2000);
    };

    const handleDownloadRecoveryCodes = (codesList) => {
        const text = `رموز الاسترداد الاحتياطية لمنصة إمبراطور (2FA Backup Codes):\n\n` +
            codesList.map((c, i) => `${i + 1}. ${c}`).join('\n') +
            `\n\nتاريخ الإنشاء: ${new Date().toLocaleString('ar-EG')}\n* احتفظ بهذه الرموز في مكان آمن. كل رمز يستخدم لمرة واحدة فقط.`;

        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `emperor-2fa-recovery-codes.txt`;
        link.click();
        URL.revokeObjectURL(url);
        addToast('تم تحميل ملف رموز الاسترداد', 'success');
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={
                viewMode === 'disable'
                    ? 'تعطيل المصادقة الثنائية (2FA)'
                    : isEnabled || setupCompleted
                    ? 'رموز الاسترداد الاحتياطية (2FA)'
                    : 'إعداد المصادقة الثنائية (2FA)'
            }
        >
            <div style={{ padding: '4px 0' }}>
                {/* Mode 1: Enable 2FA Setup Flow */}
                {viewMode === 'setup' && !setupCompleted && (
                    <div>
                        {loadingSetup ? (
                            <div style={{ textAlign: 'center', padding: '40px 0', color: '#D4A537' }}>
                                <RefreshCw size={32} className="spin" style={{ margin: '0 auto 12px' }} />
                                <div style={{ fontSize: '14px', color: '#9E9EA8' }}>جاري توليد مفتاح الأمان والباركود...</div>
                            </div>
                        ) : (
                            <div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    background: 'rgba(212, 165, 55, 0.08)',
                                    border: '1px solid rgba(212, 165, 55, 0.2)',
                                    padding: '12px 16px',
                                    borderRadius: '12px',
                                    marginBottom: '20px',
                                }}>
                                    <Smartphone size={24} color="#D4A537" style={{ flexShrink: 0 }} />
                                    <p style={{ margin: 0, fontSize: '13px', color: '#E2E8F0', lineHeight: '1.5' }}>
                                        قم بمسح الباركود باستخدام تطبيق <strong>Google Authenticator</strong> أو أدخل المفتاح السري يدوياً في التطبيق.
                                    </p>
                                </div>

                                {/* QR Code & Secret Key Box */}
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '14px',
                                    background: '#0D0D0F',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '16px',
                                    padding: 'clamp(12px, 3vw, 18px)',
                                    marginBottom: '18px',
                                    maxWidth: '100%',
                                    boxSizing: 'border-box',
                                    overflow: 'hidden',
                                }}>
                                    {/* QR Code SVG */}
                                    {setupData.qr_code_svg ? (
                                        <div
                                            style={{
                                                background: '#FFFFFF',
                                                padding: '8px',
                                                borderRadius: '12px',
                                                boxShadow: '0 0 20px rgba(212, 165, 55, 0.2)',
                                                maxWidth: '100%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                boxSizing: 'border-box',
                                                overflow: 'hidden'
                                            }}
                                            dangerouslySetInnerHTML={{
                                                __html: setupData.qr_code_svg.replace(/<svg\b([^>]*)>/i, (match, attrs) => {
                                                    return `<svg ${attrs} style="max-width: clamp(140px, 44vw, 190px); height: auto; display: block; margin: 0 auto;">`;
                                                })
                                            }}
                                        />
                                    ) : (
                                        <div style={{
                                            width: 'clamp(140px, 44vw, 180px)',
                                            height: 'clamp(140px, 44vw, 180px)',
                                            background: '#1A1A22',
                                            borderRadius: '12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            <QrCode size={40} color="#D4A537" />
                                        </div>
                                    )}

                                    {/* Secret Key Display & Copy */}
                                    <div style={{ width: '100%', textAlign: 'center', maxWidth: '100%', boxSizing: 'border-box' }}>
                                        <span style={{ fontSize: '11px', color: '#9E9EA8', display: 'block', marginBottom: '6px' }}>
                                            المفتاح السري للإدخال اليدوي:
                                        </span>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '6px',
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            border: '1px dashed rgba(212, 165, 55, 0.4)',
                                            padding: '6px 10px',
                                            borderRadius: '10px',
                                            maxWidth: '100%',
                                            boxSizing: 'border-box',
                                        }}>
                                            <span style={{
                                                fontFamily: 'monospace',
                                                fontSize: 'clamp(10.5px, 2.8vw, 13px)',
                                                fontWeight: '800',
                                                color: '#D4A537',
                                                letterSpacing: '0.5px',
                                                wordBreak: 'break-all',
                                                lineHeight: 1.3,
                                                textAlign: 'center',
                                            }}>
                                                {setupData.secret}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={handleCopySecret}
                                                style={{
                                                    background: 'transparent',
                                                    border: 'none',
                                                    color: '#D4A537',
                                                    cursor: 'pointer',
                                                    padding: '2px',
                                                    flexShrink: 0,
                                                }}
                                                title="نسخ المفتاح"
                                            >
                                                {copiedSecret ? <Check size={16} color="#22C55E" /> : <Copy size={16} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 2: Enter 6-digit code */}
                                <form onSubmit={handleVerifySubmit}>
                                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: '#FFFFFF', marginBottom: '12px', textAlign: 'center', lineHeight: '1.4' }}>
                                        أدخل رمز التحقق (6 أرقام) من تطبيق Authenticator:
                                    </label>

                                    <div
                                        onPaste={handlePaste}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            gap: 'clamp(4px, 1.8vw, 8px)',
                                            direction: 'ltr',
                                            marginBottom: '20px',
                                            maxWidth: '100%',
                                            boxSizing: 'border-box',
                                            padding: '0 2px'
                                        }}
                                    >
                                        {code.map((digit, i) => (
                                            <input
                                                key={i}
                                                id={`two-fa-code-${i}`}
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleCodeChange(i, e.target.value)}
                                                onKeyDown={(e) => handleKeyDown(i, e)}
                                                style={{
                                                    width: 'clamp(32px, 11vw, 44px)',
                                                    height: 'clamp(42px, 13vw, 52px)',
                                                    borderRadius: '10px',
                                                    border: '1px solid rgba(212, 165, 55, 0.3)',
                                                    background: 'rgba(13, 13, 16, 0.8)',
                                                    color: '#FFFFFF',
                                                    fontSize: 'clamp(16px, 4.5vw, 22px)',
                                                    fontWeight: '900',
                                                    textAlign: 'center',
                                                    outline: 'none',
                                                    boxShadow: digit ? '0 0 10px rgba(212, 165, 55, 0.3)' : 'none',
                                                    transition: 'all 0.2s ease',
                                                    flexShrink: 1,
                                                    minWidth: 0,
                                                    boxSizing: 'border-box',
                                                }}
                                            />
                                        ))}
                                    </div>

                                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            isLoading={verifying}
                                            disabled={code.join('').length !== 6}
                                            style={{ flex: '1 1 140px' }}
                                        >
                                            تأكيد وتفعيل المصادقة
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            onClick={onClose}
                                            style={{ flex: '1 1 80px' }}
                                        >
                                            إلغاء
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                )}

                {/* Mode 1 Success / Mode 3: View Recovery Codes */}
                {(setupCompleted || viewMode === 'recovery_codes') && (
                    <div>
                        <div style={{
                            textAlign: 'center',
                            marginBottom: '20px',
                        }}>
                            <div style={{
                                width: '56px',
                                height: '56px',
                                borderRadius: '50%',
                                background: 'rgba(34, 197, 94, 0.15)',
                                border: '1px solid rgba(34, 197, 94, 0.3)',
                                color: '#22C55E',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 12px',
                            }}>
                                <CheckCircle2 size={32} />
                            </div>
                            <h4 style={{ margin: '0 0 6px', fontSize: '18px', fontWeight: '800', color: '#FFFFFF' }}>
                                {setupCompleted ? 'تم تفعيل المصادقة الثنائية بنجاح!' : 'المصادقة الثنائية مفعلة'}
                            </h4>
                            <p style={{ margin: 0, fontSize: '13px', color: '#9E9EA8', lineHeight: '1.5' }}>
                                احتفظ برموز الاسترداد الاحتياطية هذه في مكان آمن لاستخدامها في حال فقدت الوصول لتطبيق المصادقة.
                            </p>
                        </div>

                        {/* Recovery Codes Grid */}
                        <div style={{
                            background: '#0D0D0F',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '16px',
                            padding: '18px',
                            marginBottom: '20px',
                        }}>
                            {loadingCodes ? (
                                <div style={{ textAlign: 'center', padding: '20px 0', color: '#9E9EA8' }}>
                                    <RefreshCw size={24} className="spin" style={{ margin: '0 auto 8px' }} />
                                    <span style={{ fontSize: '13px' }}>جاري جلب رموز الاسترداد...</span>
                                </div>
                            ) : (
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(2, 1fr)',
                                    gap: '10px',
                                    direction: 'ltr',
                                }}>
                                    {(setupCompleted ? setupData.recovery_codes : storedCodes).map((c, idx) => (
                                        <div
                                            key={idx}
                                            style={{
                                                background: 'rgba(255, 255, 255, 0.04)',
                                                border: '1px solid rgba(212, 165, 55, 0.2)',
                                                padding: '8px 12px',
                                                borderRadius: '8px',
                                                textAlign: 'center',
                                                fontFamily: 'monospace',
                                                fontSize: '13px',
                                                fontWeight: '700',
                                                color: '#F3E5AB',
                                                letterSpacing: '1px',
                                            }}
                                        >
                                            {c}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Actions for Recovery Codes */}
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => handleCopyRecoveryCodes(setupCompleted ? setupData.recovery_codes : storedCodes)}
                                icon={copiedCodes ? Check : Copy}
                                style={{ flex: 1, borderColor: 'rgba(212, 165, 55, 0.3)', color: '#F3E5AB' }}
                            >
                                {copiedCodes ? 'تم النسخ' : 'نسخ الرموز'}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => handleDownloadRecoveryCodes(setupCompleted ? setupData.recovery_codes : storedCodes)}
                                icon={Download}
                                style={{ flex: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}
                            >
                                تحميل كملف
                            </Button>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px' }}>
                            {isEnabled && (
                                <button
                                    type="button"
                                    onClick={() => setViewMode('disable')}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: '#EF4444',
                                        fontSize: '13px',
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                        padding: 0,
                                    }}
                                >
                                    تعطيل المصادقة الثنائية
                                </button>
                            )}
                            <Button
                                type="button"
                                variant="primary"
                                onClick={onClose}
                                style={{ minWidth: '120px', marginRight: 'auto' }}
                            >
                                إغلاق
                            </Button>
                        </div>
                    </div>
                )}

                {/* Mode 2: Disable 2FA Flow */}
                {viewMode === 'disable' && (
                    <form onSubmit={handleDisableSubmit}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.25)',
                            padding: '12px 16px',
                            borderRadius: '12px',
                            marginBottom: '20px',
                        }}>
                            <AlertCircle size={24} color="#EF4444" style={{ flexShrink: 0 }} />
                            <p style={{ margin: 0, fontSize: '13px', color: '#FCA5A5', lineHeight: '1.5' }}>
                                تنبيه: تعطيل المصادقة الثنائية سيقلل من مستوى أمان حسابك وعمليات السحب والشحن.
                            </p>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#B8B8C2', marginBottom: '8px' }}>
                                أدخل كلمة المرور الحالية لتأكيد التعطيل:
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Input
                                    type={showDisablePassword ? 'text' : 'password'}
                                    value={disablePassword}
                                    onChange={(e) => setDisablePassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowDisablePassword(!showDisablePassword)}
                                    style={{
                                        position: 'absolute',
                                        left: '12px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'transparent',
                                        border: 'none',
                                        color: '#8E8E98',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {showDisablePassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <Button
                                type="submit"
                                variant="danger"
                                isLoading={disabling}
                                style={{ flex: 1 }}
                            >
                                تأكيد تعطيل 2FA
                            </Button>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => setViewMode('recovery_codes')}
                            >
                                تراجع
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        </Modal>
    );
}
