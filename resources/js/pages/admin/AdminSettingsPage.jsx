import React, { useState, useEffect } from 'react';
import {
    Settings,
    Globe,
    PhoneCall,
    Share2,
    Shield,
    DollarSign,
    Upload,
    Save,
    CheckCircle2,
    AlertCircle,
    Megaphone,
    CreditCard,
    ExternalLink,
    HelpCircle,
    FileText,
    Image as ImageIcon
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

    // File Uploads
    const [logoFile, setLogoFile] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);
    const [favFile, setFavFile] = useState(null);
    const [favPreview, setFavPreview] = useState(null);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            setLoading(true);
            const res = await adminApi.getSettings();
            if (res.data?.data) {
                setSettings(prev => ({
                    ...prev,
                    ...res.data.data
                }));
                if (res.data.data.site_logo) setLogoPreview(res.data.data.site_logo);
                if (res.data.data.site_favicon) setFavPreview(res.data.data.site_favicon);
            }
        } catch (err) {
            toastError('تعذر تحميل إعدادات المنصة');
        } finally {
            setLoading(false);
        }
    };

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
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-[#040711] text-white flex items-center justify-center p-6">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-[#F5D061]/20 border-t-[#F5D061] rounded-full animate-spin" />
                    <span className="text-gray-400 font-medium">جاري تحميل إعدادات المنصة...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#040711] text-white pb-20">
            {/* Header */}
            <AdminHeader
                title="الإعدادات العامة للمنصة"
                subtitle="التحكم الكامل في اسم المنصة، الشعار، أرقام الدعم، الإعلانات، وعمولات الإحالة"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                {/* Notice Banner for Vodafone Cash & Payment Methods */}
                <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-transparent border border-[#F5D061]/25 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#F5D061]/15 text-[#F5D061] flex items-center justify-center shrink-0">
                            <CreditCard className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-white">تعديل أرقام فودافون كاش وإنستاباي والحسابات البنكية؟</h4>
                            <p className="text-xs text-gray-400 mt-0.5">يمكنك إضافة أو تعديل أرقام محافظ الشحن اليدوي والعمولات مباشرة من قسم طرق الدفع.</p>
                        </div>
                    </div>
                    <Link
                        to="/admin/payment-methods"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F5D061] text-[#040711] text-xs font-bold hover:bg-[#ffe28a] transition-all shrink-0 shadow-lg shadow-[#F5D061]/20"
                    >
                        <span>إدارة طرق الدفع وأرقام الكاش</span>
                        <ExternalLink className="w-4 h-4" />
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Navigation Tabs */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-white/5">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                                        isActive
                                            ? 'bg-[#F5D061] text-[#040711] shadow-lg shadow-[#F5D061]/15'
                                            : 'bg-[#080D1A] text-gray-400 hover:text-white hover:bg-[#0D152A] border border-white/5'
                                    }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* TAB 1: GENERAL & IDENTITY */}
                    {activeTab === 'general' && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Visual Assets (Logo & Favicon) */}
                            <div className="lg:col-span-1 space-y-6">
                                {/* Site Logo */}
                                <div className="p-5 rounded-2xl bg-[#080D1A] border border-white/5 space-y-4">
                                    <div className="flex items-center gap-2 text-sm font-bold text-white">
                                        <ImageIcon className="w-4 h-4 text-[#F5D061]" />
                                        <span>شعار المنصة (Logo)</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#040711] border border-dashed border-white/10 relative group">
                                        {logoPreview ? (
                                            <img
                                                src={logoPreview}
                                                alt="Site Logo"
                                                className="max-h-24 max-w-full object-contain mb-3 drop-shadow-md"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 mb-3">
                                                <ImageIcon className="w-8 h-8" />
                                            </div>
                                        )}
                                        <label className="cursor-pointer px-4 py-2 rounded-xl bg-[#F5D061]/15 text-[#F5D061] hover:bg-[#F5D061]/25 text-xs font-bold transition-all flex items-center gap-2">
                                            <Upload className="w-3.5 h-3.5" />
                                            <span>تغيير الشعار</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleLogoChange}
                                                className="hidden"
                                            />
                                        </label>
                                        <span className="text-[10px] text-gray-500 mt-2">يفضل خلفية شفافة بصيغة PNG أو SVG</span>
                                    </div>
                                </div>

                                {/* Site Favicon */}
                                <div className="p-5 rounded-2xl bg-[#080D1A] border border-white/5 space-y-4">
                                    <div className="flex items-center gap-2 text-sm font-bold text-white">
                                        <Globe className="w-4 h-4 text-[#38BDF8]" />
                                        <span>أيقونة المتصفح (Favicon)</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#040711] border border-dashed border-white/10 relative group">
                                        {favPreview ? (
                                            <img
                                                src={favPreview}
                                                alt="Site Favicon"
                                                className="w-12 h-12 object-contain mb-3 drop-shadow"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 mb-3">
                                                <Globe className="w-6 h-6" />
                                            </div>
                                        )}
                                        <label className="cursor-pointer px-4 py-2 rounded-xl bg-[#38BDF8]/15 text-[#38BDF8] hover:bg-[#38BDF8]/25 text-xs font-bold transition-all flex items-center gap-2">
                                            <Upload className="w-3.5 h-3.5" />
                                            <span>تغيير الأيقونة</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFavChange}
                                                className="hidden"
                                            />
                                        </label>
                                        <span className="text-[10px] text-gray-500 mt-2">مقاس مربع 32x32 أو 64x64</span>
                                    </div>
                                </div>
                            </div>

                            {/* Text Details */}
                            <div className="lg:col-span-2 space-y-6">
                                <div className="p-6 rounded-2xl bg-[#080D1A] border border-white/5 space-y-5">
                                    <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3">
                                        <Globe className="w-4 h-4 text-[#F5D061]" />
                                        <span>بيانات الموقع العامة</span>
                                    </h3>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-300 mb-1.5">
                                            اسم المنصة الرسمي <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={settings.site_name}
                                            onChange={(e) => handleChange('site_name', e.target.value)}
                                            required
                                            placeholder="مثال: سند ومهره كارد"
                                            className="w-full px-4 py-2.5 rounded-xl bg-[#040711] border border-white/10 text-white text-xs focus:border-[#F5D061] focus:outline-none transition-colors"
                                        />
                                        <span className="text-[10px] text-gray-500 mt-1 block">يظهر في الشريط العلوي ورسائل التأكيد وعنوان المتصفح.</span>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-300 mb-1.5">
                                            الوصف التعريفي (Slogan)
                                        </label>
                                        <input
                                            type="text"
                                            value={settings.site_description}
                                            onChange={(e) => handleChange('site_description', e.target.value)}
                                            placeholder="مثال: خدماتك الرقمية والمالية في مكان واحد"
                                            className="w-full px-4 py-2.5 rounded-xl bg-[#040711] border border-white/10 text-white text-xs focus:border-[#F5D061] focus:outline-none transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-300 mb-1.5">
                                            شعار الفوتر (أسفل الموقع)
                                        </label>
                                        <textarea
                                            rows={2}
                                            value={settings.footer_slogan}
                                            onChange={(e) => handleChange('footer_slogan', e.target.value)}
                                            placeholder="نبذة مختصرة تظهر في الفوتر السفلي للزوار..."
                                            className="w-full px-4 py-2.5 rounded-xl bg-[#040711] border border-white/10 text-white text-xs focus:border-[#F5D061] focus:outline-none transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB 2: SUPPORT & CONTACTS */}
                    {activeTab === 'contacts' && (
                        <div className="p-6 rounded-2xl bg-[#080D1A] border border-white/5 space-y-6">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3">
                                <PhoneCall className="w-4 h-4 text-[#22C55E]" />
                                <span>أرقام وقنوات الدعم الفني المباشر</span>
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-bold text-gray-300 mb-1.5">
                                        رقم الواتساب الأساسي للدعم <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={settings.whatsapp_support}
                                        onChange={(e) => handleChange('whatsapp_support', e.target.value)}
                                        placeholder="مثال: +201012345678"
                                        className="w-full px-4 py-2.5 rounded-xl bg-[#040711] border border-white/10 text-white text-xs focus:border-[#22C55E] focus:outline-none transition-colors"
                                    />
                                    <span className="text-[10px] text-gray-500 mt-1 block">يُستخدم لزر الواتساب العائم في أسفل الموقع.</span>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-300 mb-1.5">
                                        رابط قناة الواتساب الرسمية
                                    </label>
                                    <input
                                        type="url"
                                        value={settings.whatsapp_channel}
                                        onChange={(e) => handleChange('whatsapp_channel', e.target.value)}
                                        placeholder="مثال: https://whatsapp.com/channel/0029Va..."
                                        className="w-full px-4 py-2.5 rounded-xl bg-[#040711] border border-white/10 text-white text-xs focus:border-[#22C55E] focus:outline-none transition-colors"
                                    />
                                    <span className="text-[10px] text-gray-500 mt-1 block">يفتح عند النقر على زر 'قناة الواتساب' في الهيدر.</span>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-300 mb-1.5">
                                        حساب التليجرام الرسمي للدعم
                                    </label>
                                    <input
                                        type="text"
                                        value={settings.telegram_support}
                                        onChange={(e) => handleChange('telegram_support', e.target.value)}
                                        placeholder="مثال: https://t.me/sm_support أو معرف التليجرام"
                                        className="w-full px-4 py-2.5 rounded-xl bg-[#040711] border border-white/10 text-white text-xs focus:border-[#38BDF8] focus:outline-none transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-300 mb-1.5">
                                        البريد الإلكتروني للدعم الفني
                                    </label>
                                    <input
                                        type="email"
                                        value={settings.support_email}
                                        onChange={(e) => handleChange('support_email', e.target.value)}
                                        placeholder="support@sm-cards.online"
                                        className="w-full px-4 py-2.5 rounded-xl bg-[#040711] border border-white/10 text-white text-xs focus:border-[#F5D061] focus:outline-none transition-colors"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-gray-300 mb-1.5">
                                        مواعيد وساعات العمل
                                    </label>
                                    <input
                                        type="text"
                                        value={settings.working_hours}
                                        onChange={(e) => handleChange('working_hours', e.target.value)}
                                        placeholder="مثال: متاحين 24/7 طوال أيام الأسبوع"
                                        className="w-full px-4 py-2.5 rounded-xl bg-[#040711] border border-white/10 text-white text-xs focus:border-[#F5D061] focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB 3: ANNOUNCEMENTS */}
                    {activeTab === 'announcements' && (
                        <div className="p-6 rounded-2xl bg-[#080D1A] border border-white/5 space-y-6">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3">
                                <Megaphone className="w-4 h-4 text-[#F5D061]" />
                                <span>شريط التنبيهات والإعلانات العاجلة</span>
                            </h3>

                            <div className="flex items-center justify-between p-4 rounded-xl bg-[#040711] border border-white/10">
                                <div>
                                    <h4 className="text-xs font-bold text-white">تفعيل الشريط الإعلاني في أعلى الموقع</h4>
                                    <p className="text-[11px] text-gray-400 mt-0.5">عند تفعيله، يظهر شريط عريض في قمة كافة الصفحات لتنبيه العملاء.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.announcement_enabled}
                                        onChange={(e) => handleChange('announcement_enabled', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F5D061]"></div>
                                </label>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-300 mb-1.5">
                                    نص الإعلان أو التنبيه العاجل
                                </label>
                                <textarea
                                    rows={3}
                                    value={settings.announcement_text}
                                    onChange={(e) => handleChange('announcement_text', e.target.value)}
                                    placeholder="مثال: مرحباً بكم في منصة سند ومهره كارد! بمناسبة الافتتاح خصم 5% على كافة بطاقات الألعاب..."
                                    className="w-full px-4 py-2.5 rounded-xl bg-[#040711] border border-white/10 text-white text-xs focus:border-[#F5D061] focus:outline-none transition-colors"
                                />
                            </div>
                        </div>
                    )}

                    {/* TAB 4: REFERRALS */}
                    {activeTab === 'referrals' && (
                        <div className="p-6 rounded-2xl bg-[#080D1A] border border-white/5 space-y-6">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3">
                                <Share2 className="w-4 h-4 text-[#38BDF8]" />
                                <span>نظام كود الإحالة وأرباح الدعوات</span>
                            </h3>

                            <div className="flex items-center justify-between p-4 rounded-xl bg-[#040711] border border-white/10">
                                <div>
                                    <h4 className="text-xs font-bold text-white">تفعيل نظام الإحالة للعملاء</h4>
                                    <p className="text-[11px] text-gray-400 mt-0.5">السماح للمستخدمين بمشاركة روابطهم وكسب عمولات تلقائية.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.referral_is_active}
                                        onChange={(e) => handleChange('referral_is_active', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#38BDF8]"></div>
                                </label>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-bold text-gray-300 mb-1.5">
                                        نسبة العمولة الافتراضية (%) <span className="text-red-400">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="100"
                                            value={settings.referral_percentage}
                                            onChange={(e) => handleChange('referral_percentage', e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl bg-[#040711] border border-white/10 text-white text-xs focus:border-[#38BDF8] focus:outline-none transition-colors"
                                        />
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">%</span>
                                    </div>
                                    <span className="text-[10px] text-gray-500 mt-1 block">تُمنح للمستخدم عند إتمام الصديق شحن المحفظة.</span>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-gray-300 mb-1.5">
                                        شروط وأحكام برنامج الإحالة
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={settings.referral_terms}
                                        onChange={(e) => handleChange('referral_terms', e.target.value)}
                                        placeholder="شروط استحقاق العمولة للعملاء..."
                                        className="w-full px-4 py-2.5 rounded-xl bg-[#040711] border border-white/10 text-white text-xs focus:border-[#38BDF8] focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB 5: FINANCE & TARGET */}
                    {activeTab === 'finance' && (
                        <div className="p-6 rounded-2xl bg-[#080D1A] border border-white/5 space-y-6">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3">
                                <DollarSign className="w-4 h-4 text-[#F5D061]" />
                                <span>الحدود المالية ووكالة استلام التارجت</span>
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-bold text-gray-300 mb-1.5">
                                        الحد الأدنى للشحن اليدوي (ج.م) <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={settings.min_wallet_deposit}
                                        onChange={(e) => handleChange('min_wallet_deposit', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-[#040711] border border-white/10 text-white text-xs focus:border-[#F5D061] focus:outline-none transition-colors"
                                    />
                                    <span className="text-[10px] text-gray-500 mt-1 block">أقل مبلغ يقبله النظام عند تقديم طلب شحن رصيد جديد.</span>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-300 mb-1.5">
                                        كود وكالة استلام التارجت (Agency ID)
                                    </label>
                                    <input
                                        type="text"
                                        value={settings.target_agency_id}
                                        onChange={(e) => handleChange('target_agency_id', e.target.value)}
                                        placeholder="مثال: EMP-TARGET-001"
                                        className="w-full px-4 py-2.5 rounded-xl bg-[#040711] border border-white/10 text-white text-xs focus:border-[#F5D061] focus:outline-none transition-colors"
                                    />
                                    <span className="text-[10px] text-gray-500 mt-1 block">يظهر للمستخدم عند إرسال كوينز التارجت للوكالة.</span>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-gray-300 mb-1.5">
                                        اسم الوكالة المعتمد
                                    </label>
                                    <input
                                        type="text"
                                        value={settings.target_agency_name}
                                        onChange={(e) => handleChange('target_agency_name', e.target.value)}
                                        placeholder="مثال: وكالة سند ومهره الرسمية"
                                        className="w-full px-4 py-2.5 rounded-xl bg-[#040711] border border-white/10 text-white text-xs focus:border-[#F5D061] focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Bottom Floating Save Action Bar */}
                    <div className="sticky bottom-4 z-20 p-4 rounded-2xl bg-[#080D1A]/95 backdrop-blur-md border border-[#F5D061]/30 flex items-center justify-between gap-4 shadow-2xl">
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                            <CheckCircle2 className="w-4 h-4 text-[#F5D061]" />
                            <span>يتم تطبيق كافة التغييرات فورياً في الموقع وتحديث الـ Cache.</span>
                        </div>

                        <button
                            type="submit"
                            disabled={saving}
                            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#F5D061] to-[#E5BE4B] text-[#040711] text-xs font-bold hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-[#F5D061]/25"
                        >
                            {saving ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-[#040711]/30 border-t-[#040711] rounded-full animate-spin" />
                                    <span>جاري الحفظ...</span>
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    <span>حفظ التعديلات</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

