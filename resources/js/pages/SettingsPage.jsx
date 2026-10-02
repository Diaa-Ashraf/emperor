import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Settings as SettingsIcon,
    Moon,
    Sun,
    Bell,
    Globe,
    Shield,
    DollarSign,
    LogOut,
    Check,
    Save,
    Lock,
    Smartphone,
    Mail,
    Sliders,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useToast } from '../contexts/ToastContext';
import { settingsApi } from '../api/endpoints';
import { requestNotificationPermission } from '../services/firebaseMessaging';
import Button from '../components/ui/Button';


export default function SettingsPage() {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const { addToast } = useToast();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [preferences, setPreferences] = useState({
        theme: theme || 'dark',
        locale: 'ar',
        push_notifications: true,
        email_notifications: true,
        sms_notifications: false,
        target_alerts: true,
    });

    useEffect(() => {
        const fetchSettings = async () => {
            setLoading(true);
            try {
                const res = await settingsApi.getUserSettings();
                const data = res.data?.data || res.data;
                if (data?.preferences) {
                    setPreferences((prev) => ({
                        ...prev,
                        ...data.preferences,
                    }));
                }
            } catch (err) {
                console.error('Error fetching settings:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    const handleToggle = async (key) => {
        const nextValue = !preferences[key];
        setPreferences((prev) => ({
            ...prev,
            [key]: nextValue,
        }));

        if (key === 'push_notifications' && nextValue) {
            const token = await requestNotificationPermission();
            if (token) {
                addToast('تم تفعيل إشعارات المتصفح وتسجيل جهازك بنجاح', 'success');
            }
        }
    };

    const handleThemeChange = (newTheme) => {
        setPreferences((prev) => ({ ...prev, theme: newTheme }));
        if (newTheme !== theme) {
            toggleTheme();
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await settingsApi.updateUserSettings(preferences);
            addToast('تم حفظ التفضيلات والإعدادات بنجاح', 'success');
        } catch (err) {
            console.error('Error saving settings:', err);
            addToast('فشل حفظ الإعدادات، يرجى المحاولة لاحقاً', 'error');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px 16px 80px' }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
                marginBottom: '28px',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '16px',
                        background: 'linear-gradient(135deg, rgba(212, 165, 55, 0.2) 0%, rgba(212, 165, 55, 0.05) 100%)',
                        border: '1px solid rgba(212, 165, 55, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#D4A537',
                        boxShadow: '0 0 20px rgba(212, 165, 55, 0.15)',
                    }}>
                        <SettingsIcon size={26} />
                    </div>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '900', color: '#FFFFFF' }}>
                            إعدادات الحساب والتفضيلات
                        </h1>
                        <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#9E9EA8' }}>
                            خصص تجربة استخدام منصة إمبراطور حسب رغبتك
                        </p>
                    </div>
                </div>

                <Button
                    variant="primary"
                    onClick={handleSave}
                    loading={saving}
                    style={{ minWidth: '150px' }}
                >
                    <Save size={16} />
                    <span>حفظ التعديلات</span>
                </Button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Section 1: Appearance & Theme */}
                <div style={{
                    background: 'rgba(22, 22, 30, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '20px',
                    padding: '24px 28px',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                        <Moon size={20} color="#D4A537" />
                        <h3 style={{ margin: 0, fontSize: '17px', fontWeight: '800', color: '#FFFFFF' }}>
                            المظهر والتصميم
                        </h3>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '16px' }}>
                        {/* Dark Theme Card */}
                        <div
                            onClick={() => handleThemeChange('dark')}
                            style={{
                                padding: '16px',
                                borderRadius: '14px',
                                border: `2px solid ${preferences.theme === 'dark' ? '#D4A537' : 'rgba(255, 255, 255, 0.08)'}`,
                                background: preferences.theme === 'dark' ? 'rgba(212, 165, 55, 0.1)' : 'rgba(13, 13, 16, 0.6)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '10px',
                                    background: '#1A1A24',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#D4A537',
                                }}>
                                    <Moon size={18} />
                                </div>
                                <div>
                                    <div style={{ fontSize: '14px', fontWeight: '800', color: '#FFFFFF' }}>الوضع الليلي الفاخر (افتراضي)</div>
                                    <div style={{ fontSize: '11px', color: '#9E9EA8' }}>الأسود والذهبي الملكي</div>
                                </div>
                            </div>
                            {preferences.theme === 'dark' && <Check size={18} color="#D4A537" />}
                        </div>

                        {/* Light Theme Card */}
                        <div
                            onClick={() => handleThemeChange('light')}
                            style={{
                                padding: '16px',
                                borderRadius: '14px',
                                border: `2px solid ${preferences.theme === 'light' ? '#D4A537' : 'rgba(255, 255, 255, 0.08)'}`,
                                background: preferences.theme === 'light' ? 'rgba(212, 165, 55, 0.1)' : 'rgba(13, 13, 16, 0.6)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '10px',
                                    background: '#1A1A24',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#F59E0B',
                                }}>
                                    <Sun size={18} />
                                </div>
                                <div>
                                    <div style={{ fontSize: '14px', fontWeight: '800', color: '#FFFFFF' }}>الوضع النهاري المضيء</div>
                                    <div style={{ fontSize: '11px', color: '#9E9EA8' }}>خلفية بيضاء فاتحة</div>
                                </div>
                            </div>
                            {preferences.theme === 'light' && <Check size={18} color="#D4A537" />}
                        </div>
                    </div>
                </div>

                {/* Section 2: Notifications Preferences */}
                <div style={{
                    background: 'rgba(22, 22, 30, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '20px',
                    padding: '24px 28px',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                        <Bell size={20} color="#D4A537" />
                        <h3 style={{ margin: 0, fontSize: '17px', fontWeight: '800', color: '#FFFFFF' }}>
                            تفضيلات الإشعارات والتنبيهات
                        </h3>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {/* Toggle Item: Push */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '12px 16px',
                            background: 'rgba(13, 13, 16, 0.5)',
                            borderRadius: '12px',
                        }}>
                            <div>
                                <div style={{ fontSize: '14px', fontWeight: '700', color: '#FFFFFF' }}>
                                    إشعارات الموقع الفورية (In-App Push)
                                </div>
                                <div style={{ fontSize: '12px', color: '#9E9EA8' }}>
                                    تنبيهات فورية عند تغيير حالة طلبك أو قبول الإيداع
                                </div>
                            </div>
                            <input
                                type="checkbox"
                                checked={preferences.push_notifications}
                                onChange={() => handleToggle('push_notifications')}
                                style={{ width: '20px', height: '20px', accentColor: '#D4A537', cursor: 'pointer' }}
                            />
                        </div>

                        {/* Toggle Item: Email */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '12px 16px',
                            background: 'rgba(13, 13, 16, 0.5)',
                            borderRadius: '12px',
                        }}>
                            <div>
                                <div style={{ fontSize: '14px', fontWeight: '700', color: '#FFFFFF' }}>
                                    إشعارات البريد الإلكتروني (Email Alerts)
                                </div>
                                <div style={{ fontSize: '12px', color: '#9E9EA8' }}>
                                    إرسال إيصالات الطلبات وتأكيد الشحن إلى {user?.email}
                                </div>
                            </div>
                            <input
                                type="checkbox"
                                checked={preferences.email_notifications}
                                onChange={() => handleToggle('email_notifications')}
                                style={{ width: '20px', height: '20px', accentColor: '#D4A537', cursor: 'pointer' }}
                            />
                        </div>

                        {/* Toggle Item: Target & Deals */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '12px 16px',
                            background: 'rgba(13, 13, 16, 0.5)',
                            borderRadius: '12px',
                        }}>
                            <div>
                                <div style={{ fontSize: '14px', fontWeight: '700', color: '#FFFFFF' }}>
                                    تحديثات أسعار بيع التارجت والعروض
                                </div>
                                <div style={{ fontSize: '12px', color: '#9E9EA8' }}>
                                    تنبيه عند ارتفاع أسعار صرف تارجت التطبيقات أو إطلاق عروض حصرية
                                </div>
                            </div>
                            <input
                                type="checkbox"
                                checked={preferences.target_alerts}
                                onChange={() => handleToggle('target_alerts')}
                                style={{ width: '20px', height: '20px', accentColor: '#D4A537', cursor: 'pointer' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Section 3: Security & Session */}
                <div style={{
                    background: 'rgba(22, 22, 30, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '20px',
                    padding: '24px 28px',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                        <Shield size={20} color="#D4A537" />
                        <h3 style={{ margin: 0, fontSize: '17px', fontWeight: '800', color: '#FFFFFF' }}>
                            الأمان وإدارة الحساب
                        </h3>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                        <div>
                            <div style={{ fontSize: '14px', fontWeight: '700', color: '#FFFFFF', marginBottom: '4px' }}>
                                كلمة المرور والمصادقة الثنائية 2FA
                            </div>
                            <div style={{ fontSize: '12px', color: '#9E9EA8' }}>
                                يمكنك تغيير كلمة المرور وتفعيل حماية 2FA من صفحة الملف الشخصي
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Link
                                to="/profile"
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '10px',
                                    background: 'rgba(212, 165, 55, 0.15)',
                                    border: '1px solid rgba(212, 165, 55, 0.3)',
                                    color: '#F3E5AB',
                                    fontSize: '13px',
                                    fontWeight: '700',
                                    textDecoration: 'none',
                                }}
                            >
                                إدارة الأمان
                            </Link>

                            <button
                                onClick={logout}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '8px 16px',
                                    borderRadius: '10px',
                                    background: 'rgba(239, 68, 68, 0.15)',
                                    border: '1px solid rgba(239, 68, 68, 0.3)',
                                    color: '#EF4444',
                                    fontSize: '13px',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    fontFamily: 'Cairo, sans-serif',
                                }}
                            >
                                <LogOut size={14} />
                                <span>تسجيل الخروج</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
