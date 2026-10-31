import React, { useState, useEffect } from 'react';
import {
    MessageSquare,
    Send,
    CheckCircle2,
    XCircle,
    AlertCircle,
    Save,
    RefreshCw,
    Shield,
    PhoneCall,
    Radio,
    Zap,
    ExternalLink,
    Bell,
    Smartphone,
    Share2
} from 'lucide-react';
import { adminApi } from '../../api/endpoints';
import { useToast } from '../../contexts/ToastContext';
import { useTheme } from '../../contexts/ThemeContext';
import AdminHeader from '../../components/admin/AdminHeader';

export default function AdminWhatsAppPage() {
    const { theme } = useTheme();
    const isLight = theme === 'light';
    const { success, error: toastError } = useToast();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [testing, setTesting] = useState(false);

    // Settings state
    const [settings, setSettings] = useState({
        enabled: true,
        provider: 'meta', // meta, ultramsg, custom
        api_token: '',
        phone_number_id: '',
        instance_id: '',
        custom_endpoint: '',
        admin_phone: '',
        notify_orders: true,
        notify_deposits: true,
        notify_targets: true,
        whatsapp_channel: 'https://whatsapp.com/channel/',
        whatsapp_support: '+201000000000',
    });

    // Test message state
    const [testPhone, setTestPhone] = useState('');
    const [testMessage, setTestMessage] = useState('مرحباً بك! هذه رسالة تجريبية لتأكيد نجاح ربط بوابة الواتساب في منصة سند ومهره كارد بنجاح! 🚀');

    const fetchSettings = async () => {
        try {
            setLoading(true);
            const res = await adminApi.getWhatsAppSettings();
            if (res && res.data) {
                const data = res.data.data || res.data;
                setSettings(prev => ({
                    ...prev,
                    ...data,
                }));
            }
        } catch (err) {
            console.error('Fetch whatsapp settings error:', err);
            toastError('فشل جلب إعدادات الواتساب');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            await adminApi.saveWhatsAppSettings(settings);
            success('تم حفظ إعدادات الواتساب بنجاح');
        } catch (err) {
            toastError(err.response?.data?.message || 'فشل حفظ الإعدادات');
        } finally {
            setSaving(false);
        }
    };

    const handleSendTest = async (e) => {
        e.preventDefault();
        if (!testPhone.trim()) {
            toastError('يرجى إدخال رقم الهاتف لإرسال الرسالة التجريبية');
            return;
        }

        try {
            setTesting(true);
            await adminApi.sendTestWhatsApp({
                phone: testPhone.trim(),
                message: testMessage.trim(),
            });
            success(`تم إرسال الرسالة التجريبية إلى الرقم (${testPhone}) بنجاح`);
        } catch (err) {
            toastError(err.response?.data?.message || 'فشل إرسال الرسالة التجريبية. يرجى التحقق من المفاتيح والاتصال');
        } finally {
            setTesting(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: isLight ? '#F8FAFC' : '#040711',
            color: isLight ? '#0F172A' : '#FFFFFF',
            fontFamily: 'Cairo, sans-serif',
            paddingBottom: '80px',
        }}>
            <AdminHeader />

            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 16px' }}>
                {/* ═══ Header Title Bar ═══ */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '16px',
                    marginBottom: '28px',
                    backgroundColor: isLight ? '#FFFFFF' : '#0B0F19',
                    padding: '20px 24px',
                    borderRadius: '24px',
                    border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: isLight ? '0 4px 15px rgba(0,0,0,0.03)' : '0 10px 30px rgba(0,0,0,0.4)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '16px',
                            backgroundColor: 'rgba(34, 197, 94, 0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#22C55E',
                        }}>
                            <MessageSquare size={26} />
                        </div>
                        <div>
                            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                تكامل الواتساب والإشعارات التلقائية
                            </h1>
                            <p style={{ margin: '4px 0 0', fontSize: '13px', color: isLight ? '#64748B' : '#94A3B8' }}>
                                ربط بوابات الواتساب السحابية لإرسال فواتير الشحن، إشعارات الطلبات، وتأكيدات الدفع
                            </p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <button
                            type="button"
                            onClick={fetchSettings}
                            disabled={loading}
                            style={{
                                padding: '10px 16px',
                                borderRadius: '14px',
                                backgroundColor: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
                                border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.1)',
                                color: isLight ? '#0F172A' : '#FFFFFF',
                                fontSize: '13px',
                                fontWeight: '700',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                            <span>تحديث</span>
                        </button>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
                    {/* ═══ Main Settings Form ═══ */}
                    <div style={{
                        backgroundColor: isLight ? '#FFFFFF' : '#0B0F19',
                        borderRadius: '24px',
                        border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                        padding: '24px',
                        boxShadow: isLight ? '0 4px 15px rgba(0,0,0,0.03)' : '0 10px 30px rgba(0,0,0,0.3)',
                    }}>
                        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {/* Service Status Toggle */}
                            <div style={{
                                padding: '16px',
                                borderRadius: '16px',
                                backgroundColor: settings.enabled ? 'rgba(34, 197, 94, 0.08)' : 'rgba(239, 68, 68, 0.08)',
                                border: settings.enabled ? '1px solid rgba(34, 197, 94, 0.25)' : '1px solid rgba(239, 68, 68, 0.25)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                                <div>
                                    <div style={{ fontSize: '14px', fontWeight: '900', color: settings.enabled ? '#22C55E' : '#EF4444' }}>
                                        حالة خدمة الواتساب: {settings.enabled ? 'مفعلة وتعمل الآن' : 'معطلة مؤقتاً'}
                                    </div>
                                    <div style={{ fontSize: '12px', color: isLight ? '#64748B' : '#94A3B8', marginTop: '2px' }}>
                                        عند التعطيل لن يتم إرسال أي رسائل واتساب للعملاء
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setSettings(s => ({ ...s, enabled: !s.enabled }))}
                                    style={{
                                        padding: '8px 18px',
                                        borderRadius: '12px',
                                        backgroundColor: settings.enabled ? '#22C55E' : '#EF4444',
                                        color: '#FFFFFF',
                                        border: 'none',
                                        fontSize: '13px',
                                        fontWeight: '800',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {settings.enabled ? 'تعطيل' : 'تفعيل'}
                                </button>
                            </div>

                            {/* Provider Selection */}
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', marginBottom: '8px' }}>
                                    مزود خدمة الواتساب (Gateway Provider)
                                </label>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                                    {[
                                        { id: 'meta', name: 'Meta Cloud API', badge: 'رسمي' },
                                        { id: 'ultramsg', name: 'UltraMsg', badge: 'سريع' },
                                        { id: 'custom', name: 'بوابة مخصصة', badge: 'Webhook' },
                                    ].map(p => {
                                        const selected = settings.provider === p.id;
                                        return (
                                            <button
                                                type="button"
                                                key={p.id}
                                                onClick={() => setSettings(s => ({ ...s, provider: p.id }))}
                                                style={{
                                                    padding: '12px 10px',
                                                    borderRadius: '14px',
                                                    backgroundColor: selected ? 'rgba(34, 197, 94, 0.15)' : isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
                                                    border: selected ? '2px solid #22C55E' : isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.1)',
                                                    color: selected ? '#22C55E' : isLight ? '#0F172A' : '#FFFFFF',
                                                    fontWeight: '800',
                                                    fontSize: '12px',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    gap: '4px',
                                                }}
                                            >
                                                <span>{p.name}</span>
                                                <span style={{ fontSize: '10px', opacity: 0.8 }}>({p.badge})</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Meta Credentials */}
                            {settings.provider === 'meta' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', marginBottom: '6px' }}>
                                            Meta System User Permanent Token (رمز الوصول الدائم)
                                        </label>
                                        <input
                                            type="password"
                                            value={settings.api_token}
                                            onChange={(e) => setSettings(s => ({ ...s, api_token: e.target.value }))}
                                            placeholder="EAAGm..."
                                            style={{
                                                width: '100%',
                                                padding: '12px',
                                                borderRadius: '12px',
                                                backgroundColor: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
                                                border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.12)',
                                                color: isLight ? '#0F172A' : '#FFFFFF',
                                                fontSize: '13px',
                                                outline: 'none',
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', marginBottom: '6px' }}>
                                            Phone Number ID (معرّف رقم الهاتف في ميتا)
                                        </label>
                                        <input
                                            type="text"
                                            value={settings.phone_number_id}
                                            onChange={(e) => setSettings(s => ({ ...s, phone_number_id: e.target.value }))}
                                            placeholder="مثال: 104598234857291"
                                            style={{
                                                width: '100%',
                                                padding: '12px',
                                                borderRadius: '12px',
                                                backgroundColor: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
                                                border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.12)',
                                                color: isLight ? '#0F172A' : '#FFFFFF',
                                                fontSize: '13px',
                                                outline: 'none',
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* UltraMsg Credentials */}
                            {settings.provider === 'ultramsg' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', marginBottom: '6px' }}>
                                            UltraMsg Instance ID (معرّف النسخة)
                                        </label>
                                        <input
                                            type="text"
                                            value={settings.instance_id}
                                            onChange={(e) => setSettings(s => ({ ...s, instance_id: e.target.value }))}
                                            placeholder="مثال: instance98234"
                                            style={{
                                                width: '100%',
                                                padding: '12px',
                                                borderRadius: '12px',
                                                backgroundColor: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
                                                border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.12)',
                                                color: isLight ? '#0F172A' : '#FFFFFF',
                                                fontSize: '13px',
                                                outline: 'none',
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', marginBottom: '6px' }}>
                                            UltraMsg API Token
                                        </label>
                                        <input
                                            type="password"
                                            value={settings.api_token}
                                            onChange={(e) => setSettings(s => ({ ...s, api_token: e.target.value }))}
                                            placeholder="رمز التوكن الخاص بحسابك..."
                                            style={{
                                                width: '100%',
                                                padding: '12px',
                                                borderRadius: '12px',
                                                backgroundColor: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
                                                border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.12)',
                                                color: isLight ? '#0F172A' : '#FFFFFF',
                                                fontSize: '13px',
                                                outline: 'none',
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Custom Endpoint Credentials */}
                            {settings.provider === 'custom' && (
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', marginBottom: '6px' }}>
                                        Custom Webhook / API URL
                                    </label>
                                    <input
                                        type="url"
                                        value={settings.custom_endpoint}
                                        onChange={(e) => setSettings(s => ({ ...s, custom_endpoint: e.target.value }))}
                                        placeholder="https://api.yourgateway.com/send"
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            borderRadius: '12px',
                                            backgroundColor: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
                                            border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.12)',
                                            color: isLight ? '#0F172A' : '#FFFFFF',
                                            fontSize: '13px',
                                            outline: 'none',
                                        }}
                                    />
                                </div>
                            )}

                            {/* WhatsApp Channel & Support Quick Link */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', marginBottom: '6px' }}>
                                        رقم الدعم الفني بالواتساب
                                    </label>
                                    <input
                                        type="text"
                                        value={settings.whatsapp_support}
                                        onChange={(e) => setSettings(s => ({ ...s, whatsapp_support: e.target.value }))}
                                        placeholder="+201000000000"
                                        style={{
                                            width: '100%',
                                            padding: '10px 12px',
                                            borderRadius: '12px',
                                            backgroundColor: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
                                            border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.12)',
                                            color: isLight ? '#0F172A' : '#FFFFFF',
                                            fontSize: '13px',
                                            outline: 'none',
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', marginBottom: '6px' }}>
                                        رابط قناة الواتساب الرسمية
                                    </label>
                                    <input
                                        type="text"
                                        value={settings.whatsapp_channel}
                                        onChange={(e) => setSettings(s => ({ ...s, whatsapp_channel: e.target.value }))}
                                        placeholder="https://whatsapp.com/channel/..."
                                        style={{
                                            width: '100%',
                                            padding: '10px 12px',
                                            borderRadius: '12px',
                                            backgroundColor: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
                                            border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.12)',
                                            color: isLight ? '#0F172A' : '#FFFFFF',
                                            fontSize: '13px',
                                            outline: 'none',
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Notification Triggers */}
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', marginBottom: '8px' }}>
                                    الإشعارات الفورية التلقائية للعملاء
                                </label>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {[
                                        { key: 'notify_orders', label: 'إرسال إشعار فوري عند اكتمال أو تسليم طلب شحن' },
                                        { key: 'notify_deposits', label: 'إرسال إشعار فوري عند تأكيد وقبول شحن المحفظة' },
                                        { key: 'notify_targets', label: 'إرسال إشعار عند تحديث حالة طلبات بيع التارجت' },
                                    ].map(item => (
                                        <label key={item.key} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px' }}>
                                            <input
                                                type="checkbox"
                                                checked={Boolean(settings[item.key])}
                                                onChange={(e) => setSettings(s => ({ ...s, [item.key]: e.target.checked }))}
                                                style={{ width: '18px', height: '18px', accentColor: '#22C55E', cursor: 'pointer' }}
                                            />
                                            <span>{item.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={saving}
                                style={{
                                    padding: '14px',
                                    borderRadius: '14px',
                                    background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
                                    color: '#FFFFFF',
                                    border: 'none',
                                    fontSize: '14px',
                                    fontWeight: '900',
                                    cursor: saving ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    boxShadow: '0 4px 15px rgba(34, 197, 94, 0.3)',
                                }}
                            >
                                <Save size={18} />
                                <span>{saving ? 'جاري حفظ الإعدادات...' : 'حفظ إعدادات الواتساب'}</span>
                            </button>
                        </form>
                    </div>

                    {/* ═══ Test Sandbox Card ═══ */}
                    <div style={{
                        backgroundColor: isLight ? '#FFFFFF' : '#0B0F19',
                        borderRadius: '24px',
                        border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                        padding: '24px',
                        boxShadow: isLight ? '0 4px 15px rgba(0,0,0,0.03)' : '0 10px 30px rgba(0,0,0,0.3)',
                        height: 'fit-content',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '12px',
                                backgroundColor: 'rgba(56, 189, 248, 0.15)',
                                color: '#38BDF8',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Send size={20} />
                            </div>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                    اختبار إرسال رسالة واتساب
                                </h3>
                                <p style={{ margin: 0, fontSize: '12px', color: isLight ? '#64748B' : '#94A3B8' }}>
                                    تأكد من عمل البوابة بإرسال رسالة تجريبية لهاتفك فوراً
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleSendTest} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', marginBottom: '6px' }}>
                                    رقم الهاتف المستلم (مثال: 01012345678 أو 201012345678)
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={testPhone}
                                    onChange={(e) => setTestPhone(e.target.value)}
                                    placeholder="010xxxxxxxx"
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        borderRadius: '12px',
                                        backgroundColor: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
                                        border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.12)',
                                        color: isLight ? '#0F172A' : '#FFFFFF',
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        outline: 'none',
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', marginBottom: '6px' }}>
                                    نص الرسالة التجريبية
                                </label>
                                <textarea
                                    rows={4}
                                    value={testMessage}
                                    onChange={(e) => setTestMessage(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        borderRadius: '12px',
                                        backgroundColor: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
                                        border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.12)',
                                        color: isLight ? '#0F172A' : '#FFFFFF',
                                        fontSize: '13px',
                                        outline: 'none',
                                        resize: 'none',
                                        lineHeight: 1.6,
                                    }}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={testing}
                                style={{
                                    padding: '12px',
                                    borderRadius: '12px',
                                    background: 'linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)',
                                    color: '#FFFFFF',
                                    border: 'none',
                                    fontSize: '14px',
                                    fontWeight: '900',
                                    cursor: testing ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    boxShadow: '0 4px 15px rgba(56, 189, 248, 0.3)',
                                }}
                            >
                                <Send size={16} />
                                <span>{testing ? 'جاري الإرسال...' : 'إرسال الرسالة التجريبية'}</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
