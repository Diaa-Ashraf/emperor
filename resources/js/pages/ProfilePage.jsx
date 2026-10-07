import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    User,
    Mail,
    Phone,
    Globe,
    CreditCard,
    Shield,
    Lock,
    Key,
    Camera,
    Check,
    Copy,
    Sparkles,
    CheckCircle2,
    AlertCircle,
    Eye,
    EyeOff,
    ExternalLink,
    Wallet,
    ShoppingBag,
    Users,
    Settings as SettingsIcon,
    RefreshCw,
    QrCode,
} from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { profileApi } from '../api/endpoints';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import Modal from '../components/ui/Modal';
import PhoneVerificationModal from '../components/auth/PhoneVerificationModal';
import TwoFactorModal from '../components/auth/TwoFactorModal';


export default function ProfilePage() {
    const { user, refreshProfile, setUser } = useAuth();
    const { addToast } = useToast();
    const { t, isRtl, language } = useLanguage();
    const { theme } = useTheme();
    const isLight = theme === 'light';
    const fileInputRef = useRef(null);

    const [activeTab, setActiveTab] = useState('info'); // 'info' | 'security'
    const [copiedRef, setCopiedRef] = useState(false);
    const [showPhoneModal, setShowPhoneModal] = useState(false);

    // Profile Form State
    const [formData, setFormData] = useState({
        name: user?.name || '',
        phone: user?.phone || '',
        country: user?.country || 'EG',
        currency: user?.currency || 'EGP',
    });
    const [savingProfile, setSavingProfile] = useState(false);
    const [uploadingAvatar, setUploadingAvatar] = useState(false);

    // Password Form State
    const [passwordData, setPasswordData] = useState({
        current_password: '',
        password: '',
        password_confirmation: '',
    });
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [savingPassword, setSavingPassword] = useState(false);

    // 2FA Modal State
    const [show2FAModal, setShow2FAModal] = useState(false);

    // Sync state if user changes
    React.useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                phone: user.phone || '',
                country: user.country || 'EG',
                currency: user.currency || 'EGP',
            });
        }
    }, [user]);

    // Handle Profile Form Submit
    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setSavingProfile(true);

        try {
            const res = await profileApi.updateProfile(formData);
            const updatedUser = res.data?.data || res.data;
            if (updatedUser) {
                setUser(updatedUser);
            }
            addToast(t('profileUpdatedSuccess', 'تم تحديث البيانات الشخصية بنجاح'), 'success');
        } catch (err) {
            console.error('Update profile error:', err);
            const msg = err.response?.data?.message || t('profileUpdateFailed', 'فشل تحديث البيانات، يرجى المحاولة لاحقاً');
            addToast(msg, 'error');
        } finally {
            setSavingProfile(false);
        }
    };

    // Handle Avatar Upload
    const handleAvatarChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            addToast(t('maxAvatarSize', 'الحد الأقصى لحجم الصورة هو 2 ميجابايت'), 'error');
            return;
        }

        setUploadingAvatar(true);
        const data = new FormData();
        data.append('avatar', file);

        try {
            const res = await profileApi.updateProfile(data);
            const updatedUser = res.data?.data || res.data;
            if (updatedUser) {
                setUser(updatedUser);
            }
            addToast(t('avatarUpdatedSuccess', 'تم تحديث الصورة الشخصية بنجاح'), 'success');
        } catch (err) {
            console.error('Avatar upload error:', err);
            addToast(t('avatarUploadFailed', 'فشل رفع الصورة الشخصية'), 'error');
        } finally {
            setUploadingAvatar(false);
        }
    };

    // Handle Password Change
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        if (passwordData.password !== passwordData.password_confirmation) {
            addToast(t('passwordMismatch', 'تأكيد كلمة المرور غير متطابق'), 'error');
            return;
        }

        if (passwordData.password.length < 8) {
            addToast(t('passwordMinLength', 'يجب ألا تقل كلمة المرور الجديدة عن 8 أحرف وأرقام'), 'error');
            return;
        }

        setSavingPassword(true);
        try {
            await profileApi.updatePassword(passwordData);
            addToast(t('passwordChangedSuccess', 'تم تغيير كلمة المرور بنجاح'), 'success');
            setPasswordData({
                current_password: '',
                password: '',
                password_confirmation: '',
            });
        } catch (err) {
            console.error('Password change error:', err);
            const msg = err.response?.data?.message || t('passwordChangeFailed', 'فشل تغيير كلمة المرور، يرجى التأكد من كلمة المرور الحالية');
            addToast(msg, 'error');
        } finally {
            setSavingPassword(false);
        }
    };



    const handleCopyReferral = () => {
        if (!user?.referral_code) return;
        navigator.clipboard.writeText(user.referral_code);
        setCopiedRef(true);
        addToast(t('copied', 'تم النسخ بنجاح'), 'success');
        setTimeout(() => setCopiedRef(false), 2000);
    };

    const countryOptions = [
        { value: 'EG', label: language === 'en' ? '🇪🇬 Egypt' : '🇪🇬 مصر' },
        { value: 'SA', label: language === 'en' ? '🇸🇦 Saudi Arabia' : '🇸🇦 السعودية' },
        { value: 'AE', label: language === 'en' ? '🇦🇪 UAE' : '🇦🇪 الإمارات' },
        { value: 'KW', label: language === 'en' ? '🇰🇼 Kuwait' : '🇰🇼 الكويت' },
        { value: 'SY', label: language === 'en' ? '🇸🇾 Syria' : '🇸🇾 سوريا' },
        { value: 'IQ', label: language === 'en' ? '🇮🇶 Iraq' : '🇮🇶 العراق' },
        { value: 'JO', label: language === 'en' ? '🇯🇴 Jordan' : '🇯🇴 الأردن' },
        { value: 'OTHER', label: language === 'en' ? 'Other' : 'دولة أخرى' },
    ];

    const currencyOptions = [
        { value: 'EGP', label: language === 'en' ? 'EGP — Egyptian Pound' : 'EGP — جنيه مصري' },
        { value: 'USD', label: language === 'en' ? 'USD — US Dollar' : 'USD — دولار أمريكي' },
        { value: 'SAR', label: language === 'en' ? 'SAR — Saudi Riyal' : 'SAR — ريال سعودي' },
        { value: 'SYP', label: language === 'en' ? 'SYP — Syrian Pound' : 'SYP — ليرة سورية' },
    ];

    return (
        <MainLayout>
            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '10px 0 60px' }}>
                {/* Top User Hero Card */}
                <div style={{
                    background: isLight ? '#FFFFFF' : 'linear-gradient(135deg, rgba(28, 28, 38, 0.95) 0%, rgba(18, 18, 24, 0.95) 100%)',
                    border: isLight ? '1.5px solid rgba(212, 165, 55, 0.45)' : '1px solid rgba(212, 165, 55, 0.25)',
                    borderRadius: '24px',
                    padding: 'clamp(18px, 3.5vw, 30px)',
                    marginBottom: '28px',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: isLight ? '0 10px 30px rgba(30, 80, 140, 0.08)' : '0 12px 30px rgba(0, 0, 0, 0.4)',
                }}>

                {/* Background Gold Glow */}
                <div style={{
                    position: 'absolute',
                    top: '-60px',
                    left: '-60px',
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(212, 165, 55, 0.15) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }} />

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '24px',
                    position: 'relative',
                    zIndex: 1,
                }}>
                    {/* User Info & Avatar */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                        {/* Avatar */}
                        <div style={{ position: 'relative' }}>
                            <div style={{
                                width: '84px',
                                height: '84px',
                                borderRadius: '24px',
                                background: user?.avatar_url
                                    ? `url(${user.avatar_url}) center/cover no-repeat`
                                    : (isLight ? '#FEFCE8' : 'linear-gradient(135deg, #2A2A35 0%, #1A1A22 100%)'),
                                border: '2px solid #D4A537',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: isLight ? '#B45309' : '#D4A537',
                                fontSize: '32px',
                                fontWeight: '900',
                                boxShadow: '0 0 20px rgba(212, 165, 55, 0.25)',
                                overflow: 'hidden',
                            }}>
                                {!user?.avatar_url && (user?.name ? user.name[0].toUpperCase() : 'U')}
                            </div>

                            {/* Camera Upload Button */}
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploadingAvatar}
                                title={t('changeAvatar', 'تغيير الصورة الشخصية')}
                                style={{
                                    position: 'absolute',
                                    bottom: '-4px',
                                    right: isRtl ? '-4px' : 'auto',
                                    left: isRtl ? 'auto' : '-4px',
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '10px',
                                    background: '#D4A537',
                                    color: '#0D0D0F',
                                    border: isLight ? '2px solid #FFFFFF' : '2px solid #1A1A22',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                                }}
                            >
                                {uploadingAvatar ? <RefreshCw size={14} className="spin" /> : <Camera size={14} />}
                            </button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                style={{ display: 'none' }}
                            />
                        </div>

                        {/* Name & Details */}
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                                <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                    {user?.name || t('emperorUser', 'مستخدم إمبراطور')}
                                </h2>
                                <span style={{
                                    padding: '2px 8px',
                                    borderRadius: '6px',
                                    background: 'linear-gradient(135deg, #D4A537 0%, #AA7C11 100%)',
                                    color: '#0D0D0F',
                                    fontSize: '11px',
                                    fontWeight: '800',
                                }}>
                                    {user?.role === 'admin' ? t('vipMember', 'VIP MEMBER') : t('storeMember', 'STORE MEMBER')}
                                </span>
                            </div>

                            <p style={{ margin: '0 0 8px', fontSize: '14px', color: isLight ? '#475569' : '#9E9EA8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Mail size={14} />
                                <span>{user?.email || '—'}</span>
                            </p>

                            {user?.referral_code && (
                                <div style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    background: isLight ? '#FEFCE8' : 'rgba(212, 165, 55, 0.1)',
                                    border: isLight ? '1px solid rgba(212, 165, 55, 0.4)' : '1px solid rgba(212, 165, 55, 0.25)',
                                    padding: '4px 10px',
                                    borderRadius: '8px',
                                    fontSize: '12px',
                                    color: isLight ? '#92400E' : '#F3E5AB',
                                    fontWeight: '700',
                                }}>
                                    <span>{t('referralCodeColon', 'كود الإحالة:')} {user.referral_code}</span>
                                    <button
                                        onClick={handleCopyReferral}
                                        style={{ background: 'transparent', border: 'none', color: isLight ? '#B45309' : '#D4A537', cursor: 'pointer', padding: 0 }}
                                    >
                                        {copiedRef ? <Check size={14} /> : <Copy size={14} />}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Wallet Stats Box */}
                    <div style={{
                        background: isLight ? '#F8FAFC' : 'rgba(13, 13, 16, 0.8)',
                        border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '16px',
                        padding: '16px 20px',
                        minWidth: '200px',
                        textAlign: 'center',
                        boxShadow: isLight ? '0 4px 12px rgba(30, 80, 140, 0.05)' : 'none',
                    }}>
                        <span style={{ fontSize: '12px', color: isLight ? '#64748B' : '#9E9EA8', display: 'block', marginBottom: '4px' }}>
                            {t('availableBalanceInWallet', 'الرصيد المتاح بالمحفظة')}
                        </span>
                        <div style={{ fontSize: '24px', fontWeight: '900', color: isLight ? '#B45309' : '#D4A537', marginBottom: '8px' }}>
                            {user?.wallet?.balance !== undefined ? Number(user.wallet.balance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}{' '}
                            <span style={{ fontSize: '14px' }}>{language === 'en' ? 'EGP' : 'ج.م'}</span>
                        </div>
                        <Link
                            to="/wallet"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                fontSize: '12px',
                                color: isLight ? '#92400E' : '#F3E5AB',
                                textDecoration: 'none',
                                fontWeight: '700',
                            }}
                        >
                            <span>{t('manageAndChargeWallet', 'شحن وإدارة المحفظة')}</span>
                            <ExternalLink size={12} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Quick Links Nav Ribbon */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '12px',
                marginBottom: '28px',
            }}>
                <Link
                    to="/orders"
                    style={{
                        background: isLight ? '#FFFFFF' : 'rgba(22, 22, 30, 0.7)',
                        border: isLight ? '1.5px solid rgba(212, 165, 55, 0.35)' : '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '14px',
                        padding: '14px 18px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        textDecoration: 'none',
                        color: isLight ? '#0F172A' : '#FFFFFF',
                        transition: 'all 0.2s ease',
                        boxShadow: isLight ? '0 4px 12px rgba(30, 80, 140, 0.05)' : 'none',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#D4A537')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = isLight ? 'rgba(212, 165, 55, 0.35)' : 'rgba(255, 255, 255, 0.08)')}
                >
                    <ShoppingBag size={20} color="#D4A537" />
                    <div>
                        <div style={{ fontSize: '14px', fontWeight: '700' }}>{t('myOrdersHistory', 'سجل طلباتي')}</div>
                        <div style={{ fontSize: '11px', color: isLight ? '#64748B' : '#9E9EA8' }}>{t('trackShippingStatus', 'تتبع حالة الشحن')}</div>
                    </div>
                </Link>

                <Link
                    to="/target/apps"
                    style={{
                        background: isLight ? '#FFFFFF' : 'rgba(22, 22, 30, 0.7)',
                        border: isLight ? '1.5px solid rgba(212, 165, 55, 0.35)' : '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '14px',
                        padding: '14px 18px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        textDecoration: 'none',
                        color: isLight ? '#0F172A' : '#FFFFFF',
                        transition: 'all 0.2s ease',
                        boxShadow: isLight ? '0 4px 12px rgba(30, 80, 140, 0.05)' : 'none',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#D4A537')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = isLight ? 'rgba(212, 165, 55, 0.35)' : 'rgba(255, 255, 255, 0.08)')}
                >
                    <CreditCard size={20} color="#38BDF8" />
                    <div>
                        <div style={{ fontSize: '14px', fontWeight: '700' }}>{t('targetSelling', 'بيع التارجت')}</div>
                        <div style={{ fontSize: '11px', color: isLight ? '#64748B' : '#9E9EA8' }}>{t('transferAppProfits', 'تحويل أرباح التطبيقات')}</div>
                    </div>
                </Link>

                <Link
                    to="/referrals"
                    style={{
                        background: isLight ? '#FFFFFF' : 'rgba(22, 22, 30, 0.7)',
                        border: isLight ? '1.5px solid rgba(212, 165, 55, 0.35)' : '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '14px',
                        padding: '14px 18px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        textDecoration: 'none',
                        color: isLight ? '#0F172A' : '#FFFFFF',
                        transition: 'all 0.2s ease',
                        boxShadow: isLight ? '0 4px 12px rgba(30, 80, 140, 0.05)' : 'none',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#D4A537')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = isLight ? 'rgba(212, 165, 55, 0.35)' : 'rgba(255, 255, 255, 0.08)')}
                >
                    <Users size={20} color="#22C55E" />
                    <div>
                        <div style={{ fontSize: '14px', fontWeight: '700' }}>{t('referralProgram', 'برنامج الإحالات')}</div>
                        <div style={{ fontSize: '11px', color: isLight ? '#64748B' : '#9E9EA8' }}>{t('profitsAndCommissions', 'الأرباح والعمولات')}</div>
                    </div>
                </Link>

                <Link
                    to="/settings"
                    style={{
                        background: isLight ? '#FFFFFF' : 'rgba(22, 22, 30, 0.7)',
                        border: isLight ? '1.5px solid rgba(212, 165, 55, 0.35)' : '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '14px',
                        padding: '14px 18px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        textDecoration: 'none',
                        color: isLight ? '#0F172A' : '#FFFFFF',
                        transition: 'all 0.2s ease',
                        boxShadow: isLight ? '0 4px 12px rgba(30, 80, 140, 0.05)' : 'none',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#D4A537')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = isLight ? 'rgba(212, 165, 55, 0.35)' : 'rgba(255, 255, 255, 0.08)')}
                >
                    <SettingsIcon size={20} color="#F59E0B" />
                    <div>
                        <div style={{ fontSize: '14px', fontWeight: '700' }}>{t('accountSettings', 'إعدادات الحساب')}</div>
                        <div style={{ fontSize: '11px', color: isLight ? '#64748B' : '#9E9EA8' }}>{t('preferencesAndAppearance', 'التفضيلات والمظهر')}</div>
                    </div>
                </Link>
            </div>

            {/* Profile Tabs (Personal Info vs Security) */}
            <div style={{
                display: 'flex',
                gap: '12px',
                marginBottom: '24px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                paddingBottom: '12px',
            }}>
                <button
                    onClick={() => setActiveTab('info')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 22px',
                        borderRadius: '12px',
                        fontSize: '14px',
                        fontWeight: '700',
                        fontFamily: 'var(--font-cairo)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        background: activeTab === 'info' ? 'linear-gradient(135deg, #D4A537 0%, #AA7C11 100%)' : (isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)'),
                        color: activeTab === 'info' ? '#0D0D0F' : (isLight ? '#475569' : '#9E9EA8'),
                        border: activeTab === 'info' ? 'none' : (isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)'),
                    }}
                >
                    <User size={16} />
                    <span>{t('basicInfo', 'البيانات الأساسية')}</span>
                </button>

                <button
                    onClick={() => setActiveTab('security')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 22px',
                        borderRadius: '12px',
                        fontSize: '14px',
                        fontWeight: '700',
                        fontFamily: 'var(--font-cairo)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        background: activeTab === 'security' ? 'linear-gradient(135deg, #D4A537 0%, #AA7C11 100%)' : (isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)'),
                        color: activeTab === 'security' ? '#0D0D0F' : (isLight ? '#475569' : '#9E9EA8'),
                        border: activeTab === 'security' ? 'none' : (isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)'),
                    }}
                >
                    <Shield size={16} />
                    <span>{t('securityAndPassword', 'الأمان وكلمة المرور')}</span>
                </button>
            </div>

            {/* Tab 1: Personal Info Form */}
            {activeTab === 'info' && (
                <div style={{
                    background: isLight ? '#FFFFFF' : 'rgba(22, 22, 30, 0.8)',
                    border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '20px',
                    padding: '28px',
                    boxShadow: isLight ? '0 4px 20px rgba(0, 0, 0, 0.04)' : 'none',
                }}>
                    <h3 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: '800', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                        {t('editPersonalInfo', 'تعديل البيانات الشخصية')}
                    </h3>

                    <form onSubmit={handleProfileSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '20px', marginBottom: '24px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: isLight ? '#475569' : '#B8B8C2', marginBottom: '8px' }}>
                                    {t('fullName', 'الاسم الكامل')}
                                </label>
                                <Input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder={t('enterFullName', 'أدخل اسمك الكامل')}
                                    required
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: isLight ? '#475569' : '#B8B8C2', marginBottom: '8px' }}>
                                    {t('emailNonEditable', 'البريد الإلكتروني (غير قابل للتعديل)')}
                                </label>
                                <Input
                                    type="email"
                                    value={user?.email || ''}
                                    disabled
                                    style={{ opacity: 0.6, cursor: 'not-allowed' }}
                                />
                            </div>

                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <label style={{ fontSize: '13px', fontWeight: '700', color: isLight ? '#475569' : '#B8B8C2' }}>
                                        {t('phoneWhatsapp', 'رقم الهاتف / الواتساب')}
                                    </label>
                                    {user?.phone_verified_at ? (
                                        <span style={{ fontSize: '11px', color: '#22C55E', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <CheckCircle2 size={13} /> {t('verifiedAndConfirmed', 'موثق ومؤكد')}
                                        </span>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => setShowPhoneModal(true)}
                                            style={{
                                                background: 'rgba(212, 165, 55, 0.15)',
                                                border: '1px solid rgba(212, 165, 55, 0.3)',
                                                color: '#D4A537',
                                                borderRadius: '6px',
                                                padding: '2px 8px',
                                                fontSize: '11px',
                                                fontWeight: '800',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {t('verifyPhoneSMS', 'تأكيد وتوثيق الرقم (SMS)')}
                                        </button>
                                    )}
                                </div>
                                <Input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="010XXXXXXXX"
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: isLight ? '#475569' : '#B8B8C2', marginBottom: '8px' }}>
                                    {t('country', 'الدولة')}
                                </label>
                                <Select
                                    value={formData.country}
                                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                    options={countryOptions}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: isLight ? '#475569' : '#B8B8C2', marginBottom: '8px' }}>
                                    {t('defaultCurrency', 'العملة الافتراضية')}
                                </label>
                                <Select
                                    value={formData.currency}
                                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                                    options={currencyOptions}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                type="submit"
                                variant="primary"
                                isLoading={savingProfile}
                                style={{ minWidth: '160px' }}
                            >
                                {t('saveChanges', 'حفظ التغييرات')}
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            {/* Tab 2: Security & Password */}
            {activeTab === 'security' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {/* Password Change Box */}
                    <div style={{
                        background: isLight ? '#FFFFFF' : 'rgba(22, 22, 30, 0.8)',
                        border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '20px',
                        padding: '28px',
                        boxShadow: isLight ? '0 4px 20px rgba(0, 0, 0, 0.04)' : 'none',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                            <Lock size={20} color="#D4A537" />
                            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: isLight ? '#0F172A' : '#FFFFFF' }}>
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

                    {/* 2FA Security Section */}
                    <div style={{
                        background: isLight ? '#FFFFFF' : 'rgba(22, 22, 30, 0.8)',
                        border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '20px',
                        padding: '28px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '20px',
                        boxShadow: isLight ? '0 4px 20px rgba(0, 0, 0, 0.04)' : 'none',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '14px',
                                background: user?.two_factor_confirmed_at ? 'rgba(34, 197, 94, 0.15)' : 'rgba(212, 165, 55, 0.15)',
                                border: `1px solid ${user?.two_factor_confirmed_at ? 'rgba(34, 197, 94, 0.3)' : 'rgba(212, 165, 55, 0.3)'}`,
                                color: user?.two_factor_confirmed_at ? '#22C55E' : '#D4A537',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Shield size={24} />
                            </div>
                            <div>
                                <h4 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: '800', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                    {t('twoFactorAuth', 'المصادقة الثنائية (2FA Authentication)')}
                                </h4>
                                <p style={{ margin: 0, fontSize: '13px', color: isLight ? '#64748B' : '#9E9EA8' }}>
                                    {user?.two_factor_confirmed_at
                                        ? t('twoFactorActiveDesc', 'المصادقة الثنائية مفعلة ونشطة لحماية معاملاتك المالية')
                                        : t('twoFactorInactiveDesc', 'تفعيل طبقة أمان إضافية لحماية حسابك عبر تطبيق Google Authenticator')}
                                </p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            {user?.two_factor_confirmed_at ? (
                                <>
                                    <span style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        padding: '8px 16px',
                                        borderRadius: '10px',
                                        background: 'rgba(34, 197, 94, 0.15)',
                                        color: '#16A34A',
                                        fontSize: '13px',
                                        fontWeight: '800',
                                    }}>
                                        <CheckCircle2 size={16} /> {t('activeSuccess', 'مفعلة بنجاح')}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setShow2FAModal(true)}
                                        style={{ borderColor: isLight ? '#CBD5E1' : 'rgba(255, 255, 255, 0.15)', color: isLight ? '#334155' : '#CBD5E1' }}
                                    >
                                        {t('manageRecoveryCodes', 'إدارة ورموز الاسترداد')}
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    variant="outline"
                                    onClick={() => setShow2FAModal(true)}
                                    style={{ borderColor: 'rgba(212, 165, 55, 0.4)', color: isLight ? '#92400E' : '#F3E5AB' }}
                                >
                                    {t('enable2FA', 'تفعيل المصادقة الثنائية')}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* 2FA Modal */}
            <TwoFactorModal
                isOpen={show2FAModal}
                onClose={() => setShow2FAModal(false)}
                isEnabled={!!user?.two_factor_confirmed_at}
                onStatusChange={() => {
                    refreshProfile();
                }}
            />

            {/* Phone Verification Modal */}
            <PhoneVerificationModal
                isOpen={showPhoneModal}
                onClose={() => setShowPhoneModal(false)}
                initialPhone={formData.phone}
                onVerified={(updated) => {
                    if (updated?.phone) {
                        setFormData((prev) => ({ ...prev, phone: updated.phone }));
                    }
                }}
            />
        </div>
    </MainLayout>
    );
}

