import React, { useState } from 'react';
import { Shield, Mail, AlertCircle, CheckCircle2, Lock, Key, Copy, Check, Eye, EyeOff } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import TwoFactorModal from '../components/auth/TwoFactorModal';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { profileApi } from '../api/endpoints';

export default function AccountSecurityPage() {
    const { user, refreshProfile } = useAuth();
    const { addToast } = useToast();
    const { t, isRtl } = useLanguage();
    const { theme } = useTheme();
    const isLight = theme === 'light';

    // 2FA modal state
    const [show2FAModal, setShow2FAModal] = useState(false);

    // Change Password Form State
    const [passwordData, setPasswordData] = useState({
        current_password: '',
        password: '',
        password_confirmation: '',
    });
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [savingPassword, setSavingPassword] = useState(false);

    const is2FAEnabled = Boolean(user?.two_factor_confirmed_at);

    // Mask user email for display (e.g. el***@gmail.com)
    const maskedEmail = (() => {
        if (!user?.email) return '***@gmail.com';
        const [localPart, domain] = user.email.split('@');
        if (!domain) return user.email;
        const visiblePrefix = localPart.slice(0, 2);
        return `${visiblePrefix}***@${domain}`;
    })();

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (passwordData.password !== passwordData.password_confirmation) {
            addToast(t('passwordMismatch', 'كلمة المرور الجديدة وتأكيدها غير متطابقين'), 'error');
            return;
        }

        setSavingPassword(true);
        try {
            await profileApi.updatePassword(passwordData);
            addToast(t('passwordUpdatedSuccessfully', 'تم تحديث كلمة المرور بنجاح!'), 'success');
            setPasswordData({
                current_password: '',
                password: '',
                password_confirmation: '',
            });
        } catch (err) {
            const errorMsg = err?.message || (err?.errors ? Object.values(err.errors)[0]?.[0] : null) || t('passwordUpdateFailed', 'فشل تحديث كلمة المرور');
            addToast(errorMsg, 'error');
        } finally {
            setSavingPassword(false);
        }
    };

    return (
        <MainLayout>
            <div style={{
                maxWidth: '900px',
                margin: '0 auto',
                padding: '24px 16px 60px',
                fontFamily: 'var(--font-cairo)',
            }}>
                {/* ── 1. Page Header Card (Matching Reference: ملخص الأمان - حماية الحساب) ── */}
                <div style={{
                    background: isLight
                        ? 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)'
                        : 'linear-gradient(135deg, #121927 0%, #0d121c 100%)',
                    border: isLight ? '1.5px solid rgba(212, 165, 55, 0.35)' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '20px',
                    padding: '24px 28px',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: isLight ? '0 4px 20px rgba(0, 0, 0, 0.04)' : '0 8px 30px rgba(0, 0, 0, 0.45)',
                }}>
                    <div>
                        <span style={{
                            display: 'inline-block',
                            fontSize: '12px',
                            fontWeight: '700',
                            color: '#38BDF8',
                            marginBottom: '4px',
                            letterSpacing: '0.3px',
                        }}>
                            ملخص الأمان
                        </span>
                        <h1 style={{
                            margin: '0 0 6px',
                            fontSize: '24px',
                            fontWeight: '900',
                            color: isLight ? '#0F172A' : '#FFFFFF',
                        }}>
                            حماية الحساب
                        </h1>
                        <p style={{
                            margin: 0,
                            fontSize: '13px',
                            color: isLight ? '#64748B' : '#94A3B8',
                        }}>
                            إدارة إعدادات الأمان المتقدمة الخاصة بحسابك.
                        </p>
                    </div>

                    <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        background: isLight ? 'rgba(56, 189, 248, 0.12)' : 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isLight ? '#0284C7' : '#FFFFFF',
                        flexShrink: 0,
                    }}>
                        <Shield size={28} />
                    </div>
                </div>

                {/* ── 2. Security Alert Banner ── */}
                <div style={{
                    background: isLight
                        ? 'rgba(245, 158, 11, 0.08)'
                        : 'rgba(245, 158, 11, 0.08)',
                    border: '1px solid rgba(245, 158, 11, 0.35)',
                    borderRadius: '16px',
                    padding: '16px 20px',
                    marginBottom: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                }}>
                    <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: 'rgba(245, 158, 11, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#F59E0B',
                        flexShrink: 0,
                    }}>
                        <AlertCircle size={20} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{
                            fontSize: '14px',
                            fontWeight: '800',
                            color: isLight ? '#92400E' : '#FBBF24',
                            marginBottom: '2px',
                        }}>
                            الحفاظ على تفعيل المصادقة الثنائية يساعد في حماية حسابك من الوصول غير المصرح به.
                        </div>
                        <div style={{
                            fontSize: '12px',
                            color: isLight ? '#B45309' : '#D97706',
                        }}>
                            فعّل المصادقة الثنائية لإضافة طبقة أمان إضافية لحسابك.
                        </div>
                    </div>
                </div>

                {/* ── 3. Two-Factor Authentication Card (Exact Match to Screenshot) ── */}
                <div style={{
                    background: isLight ? '#FFFFFF' : 'linear-gradient(145deg, #101622 0%, #0d121c 100%)',
                    border: isLight ? '1.5px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '20px',
                    padding: '24px 28px',
                    marginBottom: '24px',
                    boxShadow: isLight ? '0 4px 20px rgba(0, 0, 0, 0.03)' : '0 8px 30px rgba(0, 0, 0, 0.45)',
                }}>
                    {/* Header Row: Title & Badge */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '10px',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Mail size={18} color="#38BDF8" />
                            <h3 style={{
                                margin: 0,
                                fontSize: '17px',
                                fontWeight: '900',
                                color: isLight ? '#0F172A' : '#FFFFFF',
                            }}>
                                المصادقة الثنائية
                            </h3>
                        </div>

                        <span style={{
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '800',
                            background: is2FAEnabled ? 'rgba(34, 197, 94, 0.15)' : 'rgba(255, 255, 255, 0.08)',
                            color: is2FAEnabled ? '#22C55E' : (isLight ? '#64748B' : '#94A3B8'),
                            border: `1px solid ${is2FAEnabled ? 'rgba(34, 197, 94, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
                        }}>
                            {is2FAEnabled ? 'مفعلة' : 'غير مفعلة'}
                        </span>
                    </div>

                    <p style={{
                        margin: '0 0 20px',
                        fontSize: '13px',
                        color: isLight ? '#64748B' : '#94A3B8',
                    }}>
                        استلم رمز تحقق لمرة واحدة عبر بريدك الإلكتروني كخطوة أمان إضافية عند تسجيل الدخول.
                    </p>

                    {/* Email preview bar */}
                    <div style={{
                        background: isLight ? '#F1F5F9' : 'rgba(6, 11, 20, 0.75)',
                        border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.06)',
                        borderRadius: '12px',
                        padding: '12px 18px',
                        marginBottom: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '13px',
                        color: isLight ? '#334155' : '#CBD5E1',
                    }}>
                        <span style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: '#38BDF8',
                        }} />
                        <span>سيتم إرسال رموز التحقق عند تسجيل الدخول إلى <strong>{maskedEmail}</strong></span>
                    </div>

                    {/* Action Button: تفعيل المصادقة الثنائية */}
                    <button
                        type="button"
                        onClick={() => setShow2FAModal(true)}
                        style={{
                            width: '100%',
                            padding: '12px 20px',
                            borderRadius: '12px',
                            background: is2FAEnabled
                                ? 'rgba(239, 68, 68, 0.12)'
                                : 'linear-gradient(135deg, rgba(56, 189, 248, 0.18) 0%, rgba(30, 80, 140, 0.25) 100%)',
                            border: is2FAEnabled
                                ? '1px solid rgba(239, 68, 68, 0.4)'
                                : '1px solid rgba(56, 189, 248, 0.45)',
                            color: is2FAEnabled ? '#EF4444' : '#38BDF8',
                            fontSize: '14px',
                            fontWeight: '800',
                            fontFamily: 'var(--font-cairo)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-1px)';
                            e.currentTarget.style.borderColor = is2FAEnabled ? '#EF4444' : '#38BDF8';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.borderColor = is2FAEnabled ? 'rgba(239, 68, 68, 0.4)' : 'rgba(56, 189, 248, 0.45)';
                        }}
                    >
                        <Mail size={16} />
                        <span>{is2FAEnabled ? 'إدارة / إلغاء المصادقة الثنائية' : 'تفعيل المصادقة الثنائية'}</span>
                    </button>
                </div>

                {/* ── 4. Change Password Card ── */}
                <div style={{
                    background: isLight ? '#FFFFFF' : 'linear-gradient(145deg, #101622 0%, #0d121c 100%)',
                    border: isLight ? '1.5px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '20px',
                    padding: '24px 28px',
                    boxShadow: isLight ? '0 4px 20px rgba(0, 0, 0, 0.03)' : '0 8px 30px rgba(0, 0, 0, 0.45)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                        <Lock size={18} color="#D4A537" />
                        <h3 style={{ margin: 0, fontSize: '17px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                            {t('changePassword', 'تغيير كلمة المرور')}
                        </h3>
                    </div>

                    <form onSubmit={handlePasswordSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '20px', marginBottom: '24px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: isLight ? '#475569' : '#B8B8C2', marginBottom: '8px' }}>
                                    {t('currentPassword', 'كلمة المرور الحالية')}
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <Input
                                        type={showCurrentPassword ? 'text' : 'password'}
                                        value={passwordData.current_password}
                                        onChange={(e) => setPasswordData({ ...passwordData, current_password: e.target.value })}
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                        style={{
                                            position: 'absolute',
                                            left: isRtl ? '12px' : 'auto',
                                            right: isRtl ? 'auto' : '12px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            background: 'none',
                                            border: 'none',
                                            color: '#8E8E98',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: isLight ? '#475569' : '#B8B8C2', marginBottom: '8px' }}>
                                    {t('newPassword', 'كلمة المرور الجديدة')}
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <Input
                                        type={showNewPassword ? 'text' : 'password'}
                                        value={passwordData.password}
                                        onChange={(e) => setPasswordData({ ...passwordData, password: e.target.value })}
                                        placeholder={t('newPasswordHint', '8 أحرف وأرقام على الأقل')}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        style={{
                                            position: 'absolute',
                                            left: isRtl ? '12px' : 'auto',
                                            right: isRtl ? 'auto' : '12px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            background: 'none',
                                            border: 'none',
                                            color: '#8E8E98',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: isLight ? '#475569' : '#B8B8C2', marginBottom: '8px' }}>
                                    {t('confirmNewPassword', 'تأكيد كلمة المرور الجديدة')}
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <Input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={passwordData.password_confirmation}
                                        onChange={(e) => setPasswordData({ ...passwordData, password_confirmation: e.target.value })}
                                        placeholder={t('reenterPassword', 'أعد كتابة كلمة المرور')}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        style={{
                                            position: 'absolute',
                                            left: isRtl ? '12px' : 'auto',
                                            right: isRtl ? 'auto' : '12px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            background: 'none',
                                            border: 'none',
                                            color: '#8E8E98',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                type="submit"
                                variant="primary"
                                isLoading={savingPassword}
                                style={{ minWidth: '160px' }}
                            >
                                {t('updatePassword', 'تحديث كلمة المرور')}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>

            {/* 2FA Modal */}
            <TwoFactorModal
                isOpen={show2FAModal}
                onClose={() => setShow2FAModal(false)}
                isEnabled={is2FAEnabled}
                onStatusChange={() => {
                    refreshProfile();
                }}
            />
        </MainLayout>
    );
}

