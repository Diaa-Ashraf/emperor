import React, { useState, useEffect } from 'react';
import {
    Globe,
    PhoneCall,
    Share2,
    DollarSign,
    Upload,
    Save,
    CheckCircle2,
    AlertCircle,
    Megaphone,
    CreditCard,
    ExternalLink,
    FileText,
    Image as ImageIcon,
    RefreshCw,
    Sparkles,
    ShieldCheck,
    Clock,
    Mail,
    Send
} from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminHeader from '../../components/admin/AdminHeader';
import { adminApi } from '../../api/endpoints';
import { useToast } from '../../contexts/ToastContext';
import { useTheme } from '../../contexts/ThemeContext';

export default function AdminSettingsPage() {
    const { theme } = useTheme();
    const isLight = theme === 'light';
    const { success, error: toastError } = useToast();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('general');

    // Settings State
    const [settings, setSettings] = useState({
        site_name: 'سند ومهره كارد',
        site_description: 'خدماتك الرقمية والمالية في مكان واحد',
        footer_slogan: 'سند ومهره كارد — المنصة الرائدة والأولى لشحن الألعاب والبطاقات الرقمية وبيع التارجت بأفضل الأسعار.',
        site_logo: '/images/mohra_sand_logo.png',
        site_favicon: '/images/mohra_sand_logo.png',
        whatsapp_support: '+201000000000',
        whatsapp_channel: 'https://whatsapp.com/channel/',
        telegram_support: 'https://t.me/',
        support_email: 'support@sm-cards.online',
        support_phone: '',
        working_hours: 'على مدار 24 ساعة طوال أيام الأسبوع',
        announcement_enabled: false,
        announcement_text: '',
        target_agency_id: 'EMP-TARGET-001',
        target_agency_name: 'وكالة سند ومهره الرسمية',
        min_wallet_deposit: 50,
        referral_is_active: true,
        referral_percentage: 2.5,
        referral_terms: 'يحصل المحيل على نسبة عمولة تلقائية تُضاف لمحفظته فور تأكيد شحن الرصيد من قِبل الصديق المدعو.',
        about_us_text: '',
        terms_conditions: '',
        privacy_policy: '',
    });

    // File Uploads & Previews
    const [logoFile, setLogoFile] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);
    const [favFile, setFavFile] = useState(null);
    const [favPreview, setFavPreview] = useState(null);

    const fetchSettings = async () => {
        try {
            setLoading(true);
            const res = await adminApi.getSettings();
            if (res.data?.data) {
                const data = res.data.data;
                setSettings(prev => ({
                    ...prev,
                    ...data,
                    announcement_enabled: Boolean(data.announcement_enabled),
                    referral_is_active: Boolean(data.referral_is_active),
                }));
                if (data.site_logo) setLogoPreview(data.site_logo);
                if (data.site_favicon) setFavPreview(data.site_favicon);
            }
        } catch (err) {
            console.error('Fetch settings error:', err);
            toastError('تعذر تحميل إعدادات المنصة');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    const handleChange = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleLogoChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setLogoFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setLogoPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleFavChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setFavFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setFavPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            const formData = new FormData();

            Object.entries(settings).forEach(([key, val]) => {
                if (key === 'site_logo' || key === 'site_favicon') return;
                if (typeof val === 'boolean') {
                    formData.append(key, val ? '1' : '0');
                } else if (val !== null && val !== undefined) {
                    formData.append(key, val);
                }
            });

            if (logoFile) {
                formData.append('site_logo', logoFile);
            }
            if (favFile) {
                formData.append('site_favicon', favFile);
            }

            await adminApi.updateSettings(formData);
            success('تم حفظ إعدادات المنصة بنجاح وتحديث كافة الأقسام');
            fetchSettings();
        } catch (err) {
            toastError(err.response?.data?.message || 'فشل حفظ الإعدادات، يرجى مراجعة البيانات');
        } finally {
            setSaving(false);
        }
    };

    const tabs = [
        { id: 'general', label: 'البيانات الأساسية والهوية', icon: Globe },
        { id: 'contacts', label: 'الدعم الفني وقنوات التواصل', icon: PhoneCall },
        { id: 'announcements', label: 'شريط التنبيهات والإعلانات', icon: Megaphone },
        { id: 'referrals', label: 'برنامج الإحالة والعمولات', icon: Share2 },
        { id: 'finance', label: 'المالية واستلام التارجت', icon: DollarSign },
        { id: 'legal', label: 'الشروط وسياسة الخصوصية', icon: FileText },
    ];

    // Shared style constants
    const cardBg = isLight ? '#FFFFFF' : '#0B0F19';
    const subCardBg = isLight ? '#F8FAFC' : '#050A14';
    const inputBg = isLight ? '#F1F5F9' : '#040711';
    const borderCol = isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)';
    const inputBorder = isLight ? '#CBD5E1' : 'rgba(255, 255, 255, 0.12)';
    const textMain = isLight ? '#0F172A' : '#FFFFFF';
    const textSub = isLight ? '#64748B' : '#94A3B8';

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                backgroundColor: isLight ? '#F8FAFC' : '#040711',
                color: textMain,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Cairo, sans-serif'
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        border: '3px solid rgba(245, 208, 97, 0.2)',
                        borderTopColor: '#F5D061',
                        borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite'
                    }} />
                    <span style={{ color: textSub, fontSize: '14px', fontWeight: '700' }}>جاري تحميل إعدادات المنصة...</span>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: isLight ? '#F8FAFC' : '#040711',
            color: textMain,
            fontFamily: 'Cairo, sans-serif',
            paddingBottom: '100px',
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
                    marginBottom: '24px',
                    backgroundColor: cardBg,
                    padding: '20px 24px',
                    borderRadius: '24px',
                    border: `1px solid ${borderCol}`,
                    boxShadow: isLight ? '0 4px 15px rgba(0,0,0,0.03)' : '0 10px 30px rgba(0,0,0,0.4)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '16px',
                            backgroundColor: 'rgba(245, 208, 97, 0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#F5D061',
                        }}>
                            <Globe size={26} />
                        </div>
                        <div>
                            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '900', color: textMain }}>
                                الإعدادات العامة للمنصة
                            </h1>
                            <p style={{ margin: '4px 0 0', fontSize: '13px', color: textSub }}>
                                التحكم في هوية الموقع، الشعار، أرقام الدعم، الإعلانات، ونسب برنامج الإحالة
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
                                border: `1px solid ${borderCol}`,
                                color: textMain,
                                fontSize: '13px',
                                fontWeight: '700',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            <RefreshCw size={16} />
                            <span>تحديث</span>
                        </button>
                    </div>
                </div>

                {/* ═══ Notice Banner: Payment Methods & Cash Numbers ═══ */}
                <div style={{
                    marginBottom: '24px',
                    padding: '16px 20px',
                    borderRadius: '20px',
                    background: isLight
                        ? 'linear-gradient(135deg, rgba(245, 208, 97, 0.12) 0%, rgba(212, 175, 55, 0.04) 100%)'
                        : 'linear-gradient(135deg, rgba(245, 208, 97, 0.08) 0%, rgba(0, 0, 0, 0.3) 100%)',
                    border: '1px solid rgba(245, 208, 97, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '16px',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '12px',
                            backgroundColor: 'rgba(245, 208, 97, 0.18)',
                            color: '#F5D061',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                        }}>
                            <CreditCard size={22} />
                        </div>
                        <div>
                            <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '900', color: textMain }}>
                                هل تريد تعديل أرقام فودافون كاش، إنستاباي، والتحويلات البنكية؟
                            </h4>
                            <p style={{ margin: '2px 0 0', fontSize: '12px', color: textSub }}>
                                يمكنك إضافة وتعديل وإلغاء أرقام محافظ الشحن اليدوي والعمولات مباشرة من قسم طرق الدفع المستقل.
                            </p>
                        </div>
                    </div>

                    <Link
                        to="/admin/payment-methods"
                        style={{
                            padding: '9px 18px',
                            borderRadius: '12px',
                            backgroundColor: '#F5D061',
                            color: '#040711',
                            textDecoration: 'none',
                            fontSize: '13px',
                            fontWeight: '900',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            boxShadow: '0 4px 14px rgba(245, 208, 97, 0.3)',
                        }}
                    >
                        <span>إدارة طرق الدفع وأرقام الكاش</span>
                        <ExternalLink size={15} />
                    </Link>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* ═══ Modern Navigation Tabs (Responsive Pills) ═══ */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        overflowX: 'auto',
                        paddingBottom: '12px',
                        marginBottom: '24px',
                        WebkitOverflowScrolling: 'touch',
                    }}>
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    type="button"
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    style={{
                                        padding: '10px 18px',
                                        borderRadius: '14px',
                                        backgroundColor: isActive
                                            ? 'rgba(245, 208, 97, 0.15)'
                                            : isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.04)',
                                        border: isActive
                                            ? '1.5px solid #F5D061'
                                            : `1px solid ${borderCol}`,
                                        color: isActive ? '#F5D061' : textSub,
                                        fontSize: '13px',
                                        fontWeight: '800',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        whiteSpace: 'nowrap',
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    <Icon size={16} />
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* ═══ Main Tab Content Container ═══ */}
                    <div style={{
                        backgroundColor: cardBg,
                        borderRadius: '24px',
                        border: `1px solid ${borderCol}`,
                        padding: '28px 24px',
                        boxShadow: isLight ? '0 4px 15px rgba(0,0,0,0.03)' : '0 10px 30px rgba(0,0,0,0.4)',
                        marginBottom: '28px',
                    }}>
                        {/* ═══ TAB 1: GENERAL & IDENTITY ═══ */}
                        {activeTab === 'general' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <div style={{ borderBottom: `1px solid ${borderCol}`, paddingBottom: '14px' }}>
                                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '900', color: textMain, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Globe size={18} color="#F5D061" />
                                        <span>هوية المنصة والبيانات الأساسية</span>
                                    </h3>
                                    <p style={{ margin: '4px 0 0', fontSize: '12px', color: textSub }}>
                                        الاسم الرسمي للمنصة، الأوصاف التعريبية، والشعارات الرسمية
                                    </p>
                                </div>

                                {/* Logo & Favicon Upload Cards */}
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                                    gap: '16px',
                                }}>
                                    {/* Logo Card */}
                                    <div style={{
                                        backgroundColor: subCardBg,
                                        border: `1px solid ${borderCol}`,
                                        borderRadius: '18px',
                                        padding: '18px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '12px',
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span style={{ fontSize: '13px', fontWeight: '800', color: textMain }}>شعار الموقع (Logo)</span>
                                            <span style={{ fontSize: '11px', color: textSub }}>PNG / WEBP</span>
                                        </div>

                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: '16px',
                                            backgroundColor: inputBg,
                                            borderRadius: '14px',
                                            border: `1px dashed ${inputBorder}`,
                                            minHeight: '90px',
                                        }}>
                                            {logoPreview ? (
                                                <img src={logoPreview} alt="Logo Preview" style={{ maxHeight: '60px', maxWidth: '100%', objectFit: 'contain' }} />
                                            ) : (
                                                <ImageIcon size={32} color={textSub} />
                                            )}
                                        </div>

                                        <label style={{
                                            padding: '9px',
                                            borderRadius: '12px',
                                            backgroundColor: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.06)',
                                            border: `1px solid ${borderCol}`,
                                            color: textMain,
                                            fontSize: '12px',
                                            fontWeight: '800',
                                            textAlign: 'center',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '6px',
                                        }}>
                                            <Upload size={14} />
                                            <span>اختر شعار جديد للرفع</span>
                                            <input type="file" accept="image/*" onChange={handleLogoChange} style={{ display: 'none' }} />
                                        </label>
                                    </div>

                                    {/* Favicon Card */}
                                    <div style={{
                                        backgroundColor: subCardBg,
                                        border: `1px solid ${borderCol}`,
                                        borderRadius: '18px',
                                        padding: '18px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '12px',
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span style={{ fontSize: '13px', fontWeight: '800', color: textMain }}>أيقونة المتصفح (Favicon)</span>
                                            <span style={{ fontSize: '11px', color: textSub }}>PNG / ICO</span>
                                        </div>

                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: '16px',
                                            backgroundColor: inputBg,
                                            borderRadius: '14px',
                                            border: `1px dashed ${inputBorder}`,
                                            minHeight: '90px',
                                        }}>
                                            {favPreview ? (
                                                <img src={favPreview} alt="Favicon Preview" style={{ width: '42px', height: '42px', objectFit: 'contain' }} />
                                            ) : (
                                                <ImageIcon size={32} color={textSub} />
                                            )}
                                        </div>

                                        <label style={{
                                            padding: '9px',
                                            borderRadius: '12px',
                                            backgroundColor: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.06)',
                                            border: `1px solid ${borderCol}`,
                                            color: textMain,
                                            fontSize: '12px',
                                            fontWeight: '800',
                                            textAlign: 'center',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '6px',
                                        }}>
                                            <Upload size={14} />
                                            <span>اختر أيقونة متصفح جديدة</span>
                                            <input type="file" accept="image/*" onChange={handleFavChange} style={{ display: 'none' }} />
                                        </label>
                                    </div>
                                </div>

                                {/* Text Fields Grid */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', marginBottom: '6px', color: textMain }}>
                                            اسم المنصة الرسمي <span style={{ color: '#EF4444' }}>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={settings.site_name}
                                            onChange={(e) => handleChange('site_name', e.target.value)}
                                            placeholder="سند ومهره كارد"
                                            style={{
                                                width: '100%',
                                                padding: '11px 14px',
                                                borderRadius: '12px',
                                                backgroundColor: inputBg,
                                                border: `1px solid ${inputBorder}`,
                                                color: textMain,
                                                fontSize: '13px',
                                                fontWeight: '700',
                                                outline: 'none',
                                                boxSizing: 'border-box',
                                            }}
                                        />
                                        <span style={{ fontSize: '11px', color: textSub, marginTop: '4px', display: 'block' }}>
                                            يظهر في الهيدر، عنوان المتصفح، ورسائل الإشعارات.
                                        </span>
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', marginBottom: '6px', color: textMain }}>
                                            الوصف التعريفي المختصر (Slogan)
                                        </label>
                                        <input
                                            type="text"
                                            value={settings.site_description}
                                            onChange={(e) => handleChange('site_description', e.target.value)}
                                            placeholder="خدماتك الرقمية والمالية في مكان واحد"
                                            style={{
                                                width: '100%',
                                                padding: '11px 14px',
                                                borderRadius: '12px',
                                                backgroundColor: inputBg,
                                                border: `1px solid ${inputBorder}`,
                                                color: textMain,
                                                fontSize: '13px',
                                                fontWeight: '700',
                                                outline: 'none',
                                                boxSizing: 'border-box',
                                            }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', marginBottom: '6px', color: textMain }}>
                                        شعار الفوتر التعريفي (أسفل الموقع)
                                    </label>
                                    <textarea
                                        rows={2}
                                        value={settings.footer_slogan}
                                        onChange={(e) => handleChange('footer_slogan', e.target.value)}
                                        placeholder="سند ومهره كارد — المنصة الرائدة والأولى لشحن الألعاب والبطاقات الرقمية وبيع التارجت بأفضل الأسعار."
                                        style={{
                                            width: '100%',
                                            padding: '11px 14px',
                                            borderRadius: '12px',
                                            backgroundColor: inputBg,
                                            border: `1px solid ${inputBorder}`,
                                            color: textMain,
                                            fontSize: '13px',
                                            outline: 'none',
                                            boxSizing: 'border-box',
                                            resize: 'vertical',
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', marginBottom: '6px', color: textMain }}>
                                        نبذة عن المنصة (صفحة من نحن)
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={settings.about_us_text}
                                        onChange={(e) => handleChange('about_us_text', e.target.value)}
                                        placeholder="اكتب نبذة تعريفية شاملة عن منصة سند ومهره كارد وتاريخها ومميزاتها..."
                                        style={{
                                            width: '100%',
                                            padding: '11px 14px',
                                            borderRadius: '12px',
                                            backgroundColor: inputBg,
                                            border: `1px solid ${inputBorder}`,
                                            color: textMain,
                                            fontSize: '13px',
                                            outline: 'none',
                                            boxSizing: 'border-box',
                                            resize: 'vertical',
                                        }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* ═══ TAB 2: SUPPORT & CONTACTS ═══ */}
                        {activeTab === 'contacts' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ borderBottom: `1px solid ${borderCol}`, paddingBottom: '14px' }}>
                                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '900', color: textMain, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <PhoneCall size={18} color="#22C55E" />
                                        <span>أرقام وقنوات الدعم الفني المباشر</span>
                                    </h3>
                                    <p style={{ margin: '4px 0 0', fontSize: '12px', color: textSub }}>
                                        روابط التواصل المباشر مع العملاء عبر الواتساب والتليجرام والبريد الإلكتروني
                                    </p>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', marginBottom: '6px', color: textMain }}>
                                            رقم الواتساب الأساسي للدعم <span style={{ color: '#EF4444' }}>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={settings.whatsapp_support}
                                            onChange={(e) => handleChange('whatsapp_support', e.target.value)}
                                            placeholder="+201000000000"
                                            style={{
                                                width: '100%',
                                                padding: '11px 14px',
                                                borderRadius: '12px',
                                                backgroundColor: inputBg,
                                                border: `1px solid ${inputBorder}`,
                                                color: textMain,
                                                fontSize: '13px',
                                                fontWeight: '700',
                                                outline: 'none',
                                                boxSizing: 'border-box',
                                            }}
                                        />
                                        <span style={{ fontSize: '11px', color: textSub, marginTop: '4px', display: 'block' }}>
                                            يُستخدم لزر الواتساب العائم في أسفل الموقع للتواصل المباشر.
                                        </span>
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', marginBottom: '6px', color: textMain }}>
                                            رابط قناة الواتساب الرسمية
                                        </label>
                                        <input
                                            type="url"
                                            value={settings.whatsapp_channel}
                                            onChange={(e) => handleChange('whatsapp_channel', e.target.value)}
                                            placeholder="https://whatsapp.com/channel/..."
                                            style={{
                                                width: '100%',
                                                padding: '11px 14px',
                                                borderRadius: '12px',
                                                backgroundColor: inputBg,
                                                border: `1px solid ${inputBorder}`,
                                                color: textMain,
                                                fontSize: '13px',
                                                fontWeight: '700',
                                                outline: 'none',
                                                boxSizing: 'border-box',
                                            }}
                                        />
                                        <span style={{ fontSize: '11px', color: textSub, marginTop: '4px', display: 'block' }}>
                                            يفتح مباشرة عند نقر الزائر على زر 'قناة الواتساب' في الهيدر العلوي.
                                        </span>
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', marginBottom: '6px', color: textMain }}>
                                            حساب التليجرام الرسمي للدعم
                                        </label>
                                        <input
                                            type="text"
                                            value={settings.telegram_support}
                                            onChange={(e) => handleChange('telegram_support', e.target.value)}
                                            placeholder="https://t.me/sm_support"
                                            style={{
                                                width: '100%',
                                                padding: '11px 14px',
                                                borderRadius: '12px',
                                                backgroundColor: inputBg,
                                                border: `1px solid ${inputBorder}`,
                                                color: textMain,
                                                fontSize: '13px',
                                                fontWeight: '700',
                                                outline: 'none',
                                                boxSizing: 'border-box',
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', marginBottom: '6px', color: textMain }}>
                                            البريد الإلكتروني للدعم الفني
                                        </label>
                                        <input
                                            type="email"
                                            value={settings.support_email}
                                            onChange={(e) => handleChange('support_email', e.target.value)}
                                            placeholder="support@sm-cards.online"
                                            style={{
                                                width: '100%',
                                                padding: '11px 14px',
                                                borderRadius: '12px',
                                                backgroundColor: inputBg,
                                                border: `1px solid ${inputBorder}`,
                                                color: textMain,
                                                fontSize: '13px',
                                                fontWeight: '700',
                                                outline: 'none',
                                                boxSizing: 'border-box',
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', marginBottom: '6px', color: textMain }}>
                                            رقم الهاتف المباشر (اختياري)
                                        </label>
                                        <input
                                            type="text"
                                            value={settings.support_phone}
                                            onChange={(e) => handleChange('support_phone', e.target.value)}
                                            placeholder="010xxxxxxxx"
                                            style={{
                                                width: '100%',
                                                padding: '11px 14px',
                                                borderRadius: '12px',
                                                backgroundColor: inputBg,
                                                border: `1px solid ${inputBorder}`,
                                                color: textMain,
                                                fontSize: '13px',
                                                outline: 'none',
                                                boxSizing: 'border-box',
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', marginBottom: '6px', color: textMain }}>
                                            مواعيد وساعات العمل
                                        </label>
                                        <input
                                            type="text"
                                            value={settings.working_hours}
                                            onChange={(e) => handleChange('working_hours', e.target.value)}
                                            placeholder="على مدار 24 ساعة طوال أيام الأسبوع"
                                            style={{
                                                width: '100%',
                                                padding: '11px 14px',
                                                borderRadius: '12px',
                                                backgroundColor: inputBg,
                                                border: `1px solid ${inputBorder}`,
                                                color: textMain,
                                                fontSize: '13px',
                                                fontWeight: '700',
                                                outline: 'none',
                                                boxSizing: 'border-box',
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ═══ TAB 3: ANNOUNCEMENT BAR ═══ */}
                        {activeTab === 'announcements' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ borderBottom: `1px solid ${borderCol}`, paddingBottom: '14px' }}>
                                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '900', color: textMain, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Megaphone size={18} color="#F59E0B" />
                                        <span>شريط التنبيهات والإعلانات العاجلة</span>
                                    </h3>
                                    <p style={{ margin: '4px 0 0', fontSize: '12px', color: textSub }}>
                                        إظهار شريط إعلاني ملفت في أعلى كافة صفحات الموقع لتنبيه العملاء بالعروض أو التحديثات
                                    </p>
                                </div>

                                {/* Toggle Card */}
                                <div style={{
                                    backgroundColor: subCardBg,
                                    border: `1px solid ${borderCol}`,
                                    borderRadius: '18px',
                                    padding: '18px 20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: '16px',
                                }}>
                                    <div>
                                        <span style={{ fontSize: '14px', fontWeight: '900', color: textMain, display: 'block' }}>
                                            تفعيل الشريط الإعلاني في أعلى الموقع
                                        </span>
                                        <span style={{ fontSize: '12px', color: textSub }}>
                                            عند تفعيله يظهر شريط عريض متناسق في قمة الصفحات لجميع الزوار.
                                        </span>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => handleChange('announcement_enabled', !settings.announcement_enabled)}
                                        style={{
                                            padding: '8px 20px',
                                            borderRadius: '12px',
                                            backgroundColor: settings.announcement_enabled ? '#10B981' : isLight ? '#E2E8F0' : '#1E293B',
                                            color: settings.announcement_enabled ? '#FFFFFF' : textSub,
                                            border: 'none',
                                            fontSize: '13px',
                                            fontWeight: '900',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                        }}
                                    >
                                        {settings.announcement_enabled ? 'مفعّل الآن' : 'معطّل'}
                                    </button>
                                </div>

                                {/* Announcement Text */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', marginBottom: '6px', color: textMain }}>
                                        نص الإعلان أو التنبيه العاجل
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={settings.announcement_text}
                                        onChange={(e) => handleChange('announcement_text', e.target.value)}
                                        placeholder="مثال: مرحباً بكم في منصة سند ومهره كارد! خصم خاص 5% بمناسبة الافتتاح على جميع بطاقات الألعاب..."
                                        style={{
                                            width: '100%',
                                            padding: '12px 14px',
                                            borderRadius: '12px',
                                            backgroundColor: inputBg,
                                            border: `1px solid ${inputBorder}`,
                                            color: textMain,
                                            fontSize: '13px',
                                            outline: 'none',
                                            boxSizing: 'border-box',
                                            resize: 'vertical',
                                            lineHeight: 1.6,
                                        }}
                                    />
                                </div>

                                {/* Live Preview Box */}
                                <div>
                                    <span style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: textSub, marginBottom: '8px' }}>
                                        معاينة مباشرة لما سيظهر للزوار:
                                    </span>
                                    <div style={{
                                        padding: '12px 20px',
                                        borderRadius: '14px',
                                        background: 'linear-gradient(90deg, #F5D061 0%, #D4AF37 100%)',
                                        color: '#040711',
                                        fontWeight: '800',
                                        fontSize: '13px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        boxShadow: '0 4px 15px rgba(245, 208, 97, 0.25)',
                                    }}>
                                        <Megaphone size={16} />
                                        <span>{settings.announcement_text.trim() || 'لا يوجد نص إعلاني مكتوب حالياً'}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ═══ TAB 4: REFERRALS ═══ */}
                        {activeTab === 'referrals' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ borderBottom: `1px solid ${borderCol}`, paddingBottom: '14px' }}>
                                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '900', color: textMain, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Share2 size={18} color="#38BDF8" />
                                        <span>نظام الإحالة وعمولات الأصدقاء</span>
                                    </h3>
                                    <p style={{ margin: '4px 0 0', fontSize: '12px', color: textSub }}>
                                        التحكم في نسبة العمولة التي يحصل عليها المستخدم عند دعوة أصدقائه للشحن
                                    </p>
                                </div>

                                <div style={{
                                    backgroundColor: subCardBg,
                                    border: `1px solid ${borderCol}`,
                                    borderRadius: '18px',
                                    padding: '18px 20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: '16px',
                                }}>
                                    <div>
                                        <span style={{ fontSize: '14px', fontWeight: '900', color: textMain, display: 'block' }}>
                                            تفعيل برنامج الإحالة والمكافآت
                                        </span>
                                        <span style={{ fontSize: '12px', color: textSub }}>
                                            عند التعطيل لن يتم احتساب أي عمولات جديدة للمستخدمين.
                                        </span>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => handleChange('referral_is_active', !settings.referral_is_active)}
                                        style={{
                                            padding: '8px 20px',
                                            borderRadius: '12px',
                                            backgroundColor: settings.referral_is_active ? '#38BDF8' : isLight ? '#E2E8F0' : '#1E293B',
                                            color: settings.referral_is_active ? '#040711' : textSub,
                                            border: 'none',
                                            fontSize: '13px',
                                            fontWeight: '900',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                        }}
                                    >
                                        {settings.referral_is_active ? 'البرنامج نشط' : 'معطّل'}
                                    </button>
                                </div>

                                <div style={{ maxWidth: '400px' }}>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', marginBottom: '6px', color: textMain }}>
                                        نسبة عمولة المحيل % من قيمة كل عملية شحن
                                    </label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="100"
                                            value={settings.referral_percentage}
                                            onChange={(e) => handleChange('referral_percentage', e.target.value)}
                                            style={{
                                                width: '100%',
                                                padding: '11px 14px',
                                                borderRadius: '12px',
                                                backgroundColor: inputBg,
                                                border: `1px solid ${inputBorder}`,
                                                color: textMain,
                                                fontSize: '14px',
                                                fontWeight: '900',
                                                outline: 'none',
                                                boxSizing: 'border-box',
                                            }}
                                        />
                                        <span style={{ fontSize: '16px', fontWeight: '900', color: '#F5D061' }}>%</span>
                                    </div>
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', marginBottom: '6px', color: textMain }}>
                                        الشروط والأحكام الخاصة ببرنامج الإحالة
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={settings.referral_terms}
                                        onChange={(e) => handleChange('referral_terms', e.target.value)}
                                        placeholder="تظهر للعميل في صفحة الإحالة لمعرفة كيفية احتساب الأرباح..."
                                        style={{
                                            width: '100%',
                                            padding: '11px 14px',
                                            borderRadius: '12px',
                                            backgroundColor: inputBg,
                                            border: `1px solid ${inputBorder}`,
                                            color: textMain,
                                            fontSize: '13px',
                                            outline: 'none',
                                            boxSizing: 'border-box',
                                            resize: 'vertical',
                                        }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* ═══ TAB 5: FINANCE & TARGET AGENCY ═══ */}
                        {activeTab === 'finance' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ borderBottom: `1px solid ${borderCol}`, paddingBottom: '14px' }}>
                                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '900', color: textMain, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <DollarSign size={18} color="#F5D061" />
                                        <span>المالية ووكالة استلام التارجت</span>
                                    </h3>
                                    <p style={{ margin: '4px 0 0', fontSize: '12px', color: textSub }}>
                                        الحد الأدنى لعمليات شحن المحفظة، وبيانات وكالة استلام التارجت من التطبيقات
                                    </p>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', marginBottom: '6px', color: textMain }}>
                                            الحد الأدنى لشحن المحفظة (جنيه مصري)
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={settings.min_wallet_deposit}
                                            onChange={(e) => handleChange('min_wallet_deposit', e.target.value)}
                                            placeholder="50"
                                            style={{
                                                width: '100%',
                                                padding: '11px 14px',
                                                borderRadius: '12px',
                                                backgroundColor: inputBg,
                                                border: `1px solid ${inputBorder}`,
                                                color: textMain,
                                                fontSize: '14px',
                                                fontWeight: '900',
                                                outline: 'none',
                                                boxSizing: 'border-box',
                                            }}
                                        />
                                        <span style={{ fontSize: '11px', color: textSub, marginTop: '4px', display: 'block' }}>
                                            أقل مبلغ يُسمح للعميل بطلبه عند إنشاء إيداع يدوي.
                                        </span>
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', marginBottom: '6px', color: textMain }}>
                                            كود وكالة التارجت الرسمية (Agency ID)
                                        </label>
                                        <input
                                            type="text"
                                            value={settings.target_agency_id}
                                            onChange={(e) => handleChange('target_agency_id', e.target.value)}
                                            placeholder="EMP-TARGET-001"
                                            style={{
                                                width: '100%',
                                                padding: '11px 14px',
                                                borderRadius: '12px',
                                                backgroundColor: inputBg,
                                                border: `1px solid ${inputBorder}`,
                                                color: textMain,
                                                fontSize: '13px',
                                                fontWeight: '700',
                                                outline: 'none',
                                                boxSizing: 'border-box',
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', marginBottom: '6px', color: textMain }}>
                                            اسم وكالة استلام التارجت
                                        </label>
                                        <input
                                            type="text"
                                            value={settings.target_agency_name}
                                            onChange={(e) => handleChange('target_agency_name', e.target.value)}
                                            placeholder="وكالة سند ومهره الرسمية"
                                            style={{
                                                width: '100%',
                                                padding: '11px 14px',
                                                borderRadius: '12px',
                                                backgroundColor: inputBg,
                                                border: `1px solid ${inputBorder}`,
                                                color: textMain,
                                                fontSize: '13px',
                                                fontWeight: '700',
                                                outline: 'none',
                                                boxSizing: 'border-box',
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ═══ TAB 6: LEGAL & POLICIES ═══ */}
                        {activeTab === 'legal' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ borderBottom: `1px solid ${borderCol}`, paddingBottom: '14px' }}>
                                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '900', color: textMain, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <FileText size={18} color="#A855F7" />
                                        <span>الشروط والأحكام وسياسة الخصوصية</span>
                                    </h3>
                                    <p style={{ margin: '4px 0 0', fontSize: '12px', color: textSub }}>
                                        النصوص القانونية التي يوافق عليها المستخدمون في صفحات الشروط والسياسات
                                    </p>
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', marginBottom: '6px', color: textMain }}>
                                        الشروط والأحكام (Terms & Conditions)
                                    </label>
                                    <textarea
                                        rows={6}
                                        value={settings.terms_conditions}
                                        onChange={(e) => handleChange('terms_conditions', e.target.value)}
                                        placeholder="اكتب بنود الشروط والأحكام الخاصة بالاستخدام وشحن الرصيد والطلبات..."
                                        style={{
                                            width: '100%',
                                            padding: '12px 14px',
                                            borderRadius: '12px',
                                            backgroundColor: inputBg,
                                            border: `1px solid ${inputBorder}`,
                                            color: textMain,
                                            fontSize: '13px',
                                            outline: 'none',
                                            boxSizing: 'border-box',
                                            resize: 'vertical',
                                            lineHeight: 1.6,
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', marginBottom: '6px', color: textMain }}>
                                        سياسة الخصوصية (Privacy Policy)
                                    </label>
                                    <textarea
                                        rows={6}
                                        value={settings.privacy_policy}
                                        onChange={(e) => handleChange('privacy_policy', e.target.value)}
                                        placeholder="اكتب بنود سياسة الخصوصية وحماية بيانات المستخدمين..."
                                        style={{
                                            width: '100%',
                                            padding: '12px 14px',
                                            borderRadius: '12px',
                                            backgroundColor: inputBg,
                                            border: `1px solid ${inputBorder}`,
                                            color: textMain,
                                            fontSize: '13px',
                                            outline: 'none',
                                            boxSizing: 'border-box',
                                            resize: 'vertical',
                                            lineHeight: 1.6,
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ═══ Floating / Sticky Save Action Bar ═══ */}
                    <div style={{
                        position: 'sticky',
                        bottom: '20px',
                        backgroundColor: isLight ? 'rgba(255, 255, 255, 0.95)' : 'rgba(11, 15, 25, 0.95)',
                        backdropFilter: 'blur(10px)',
                        padding: '14px 20px',
                        borderRadius: '20px',
                        border: `1px solid ${isLight ? '#CBD5E1' : 'rgba(245, 208, 97, 0.25)'}`,
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '16px',
                        flexWrap: 'wrap',
                        zIndex: 40,
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <CheckCircle2 size={16} color="#10B981" />
                            <span style={{ fontSize: '13px', fontWeight: '700', color: textSub }}>
                                يتم تطبيق كافة التغييرات فوراً في الموقع بمجرد الحفظ.
                            </span>
                        </div>

                        <button
                            type="submit"
                            disabled={saving}
                            style={{
                                padding: '12px 28px',
                                borderRadius: '14px',
                                background: 'linear-gradient(135deg, #F5D061 0%, #D4AF37 100%)',
                                color: '#040711',
                                border: 'none',
                                fontSize: '14px',
                                fontWeight: '900',
                                cursor: saving ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                boxShadow: '0 4px 18px rgba(245, 208, 97, 0.4)',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            <Save size={18} />
                            <span>{saving ? 'جاري حفظ التغييرات...' : 'حفظ إعدادات المنصة'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
