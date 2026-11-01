import React, { useState, useEffect } from 'react';
import {
    Server,
    Wallet,
    RefreshCw,
    CheckCircle,
    XCircle,
    CreditCard,
    DollarSign,
    Zap,
    AlertCircle,
    Search,
    Eye,
    Wrench,
    Edit3,
    Power,
    ArrowUp,
    Check,
    X,
    Plus
} from 'lucide-react';
import { adminApi } from '../../api/endpoints';
import { useToast } from '../../contexts/ToastContext';
import { useTheme } from '../../contexts/ThemeContext';
import { formatCurrency } from '../../utils/currencyHelper';
import AdminHeader from '../../components/admin/AdminHeader';

export default function AdminProvidersPage() {
    const { theme } = useTheme();
    const isLight = theme === 'light';
    const { success, error: toastError } = useToast();

    const [loading, setLoading] = useState(true);
    const [providers, setProviders] = useState([]);
    const [search, setSearch] = useState('');
    const [checkingId, setCheckingId] = useState(null);
    const [selectedProviderProducts, setSelectedProviderProducts] = useState(null);
    const [productsList, setProductsList] = useState([]);
    const [editingProvider, setEditingProvider] = useState(null);
    const [editBalance, setEditBalance] = useState('');
    const [submittingEdit, setSubmittingEdit] = useState(false);

    // Add Provider Modal State (Matching Screenshot 1 & 9)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [submittingAdd, setSubmittingAdd] = useState(false);
    const [providerForm, setProviderForm] = useState({
        name: '',
        driver: '',
        base_url: '',
        api_type: 'API (واجهة برمجة)',
        integration_type: 'التكامل الافتراضي',
        auth_type: 'بدون توثيق',
        api_token: '',
        is_active: true,
        auto_fulfill: true,
    });

    const fetchProviders = async () => {
        try {
            setLoading(true);
            const res = await adminApi.getProviders();
            if (res && res.data) {
                const list = res.data.data || res.data;
                setProviders(Array.isArray(list) ? list : []);
            }
        } catch (err) {
            toastError('فشل تحميل قائمة المزودين');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProviders();
    }, []);

    const handleCheckBalance = async (providerId) => {
        try {
            setCheckingId(providerId);
            const res = await adminApi.checkProviderBalance(providerId);
            success(res.data?.message || 'تم اختبار الاتصال وتحديث رصيد المورد بنجاح');
            fetchProviders();
        } catch (err) {
            toastError(err.response?.data?.message || 'فشل الاتصال بالمورد');
        } finally {
            setCheckingId(null);
        }
    };

    const handleToggleProvider = async (providerId) => {
        try {
            await adminApi.toggleProvider(providerId);
            success('تم تعديل حالة المورد');
            fetchProviders();
        } catch (err) {
            toastError('فشل تعديل حالة المورد');
        }
    };

    const handleViewProducts = async (provider) => {
        try {
            setSelectedProviderProducts(provider);
            const isAdCard = ['ad_card', 'ad-card', 'adcard'].includes(provider.driver);
            const res = isAdCard
                ? await adminApi.getProviderProducts(provider.id)
                : await adminApi.getProviderCatalog({ provider_id: provider.id });
            if (res && res.data) {
                const data = res.data.data || res.data;
                setProductsList(Array.isArray(data) ? data : data.items || []);
            }
        } catch (err) {
            toastError('فشل جلب منتجات المزود');
        }
    };

    const handleSync = async (provider) => {
        try {
            setCheckingId(provider.id);
            await adminApi.checkProviderBalance(provider.id);
            success(`تمت مزامنة بيانات ${provider.name} بنجاح`);
        } catch (err) {
            toastError('فشل مزامنة المورد');
        } finally {
            setCheckingId(null);
        }
    };

    const handleAddProviderSubmit = async (e) => {
        e.preventDefault();
        if (!providerForm.name.trim() || !providerForm.driver.trim()) {
            toastError('يرجى ملء اسم المورد وكود المورد');
            return;
        }

        setSubmittingAdd(true);
        try {
            const payload = {
                ...providerForm,
                driver: providerForm.api_type === 'AD Card API' ? 'ad_card' : providerForm.driver,
                base_url: providerForm.base_url || (providerForm.api_type === 'AD Card API' ? 'https://ad-card.com/client/api' : ''),
            };
            await adminApi.createProvider(payload);
            success('تم حفظ المورد بنجاح');
            setIsAddModalOpen(false);
            setProviderForm({
                name: '',
                driver: '',
                base_url: '',
                api_type: 'API (واجهة برمجة)',
                integration_type: 'التكامل الافتراضي',
                auth_type: 'بدون توثيق',
                api_token: '',
                is_active: true,
                auto_fulfill: true,
            });
            fetchProviders();
        } catch (err) {
            console.error(err);
            toastError(err.response?.data?.message || 'فشل حفظ المورد');
        } finally {
            setSubmittingAdd(false);
        }
    };

    const handleSaveProviderSettings = async (e) => {
        e.preventDefault();
        if (!editingProvider) return;
        setSubmittingEdit(true);
        try {
            await adminApi.updateProvider(editingProvider.id, {
                name: editingProvider.name,
                base_url: editingProvider.base_url || undefined,
                api_token: editingProvider.api_token || undefined,
            });
            success('تم تحديث إعدادات المورد');
            setEditingProvider(null);
            fetchProviders();
        } catch (err) {
            toastError(err.response?.data?.message || 'تعذر تحديث إعدادات المورد');
        } finally {
            setSubmittingEdit(false);
        }
    };

    const filteredProviders = providers.filter(p => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return (
            p.name?.toLowerCase().includes(q) ||
            p.driver?.toLowerCase().includes(q) ||
            p.id?.toString().includes(q)
        );
    });

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: isLight ? '#F8FAFC' : '#070709',
            color: isLight ? '#0F172A' : '#FFFFFF',
            paddingBottom: '80px',
            fontFamily: 'Cairo, sans-serif',
            direction: 'rtl',
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>
                <AdminHeader />

                {/* ================= SEARCH & ACTION BOX (Screenshot 5 top) ================= */}
                <div style={{
                    backgroundColor: isLight ? '#FFFFFF' : '#0B1222',
                    border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                    borderRadius: '20px',
                    padding: '16px',
                    margin: '20px 0',
                }}>
                    <div style={{ position: 'relative', marginBottom: '10px' }}>
                        <input
                            type="text"
                            placeholder="ابحث باسم المنتج أو كود المنتج أو اسم المورد..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 42px 12px 16px',
                                borderRadius: '14px',
                                backgroundColor: isLight ? '#F8FAFC' : '#040711',
                                border: isLight ? '1px solid #CBD5E1' : '1px solid #1E293B',
                                color: isLight ? '#0F172A' : '#FFFFFF',
                                fontSize: '13px',
                                outline: 'none',
                                boxSizing: 'border-box',
                            }}
                        />
                        <Search
                            size={18}
                            style={{
                                position: 'absolute',
                                right: '14px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#94A3B8',
                                pointerEvents: 'none',
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <button
                            type="button"
                            onClick={() => setIsAddModalOpen(true)}
                            style={{
                                padding: '11px 20px',
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                                color: '#FFFFFF',
                                fontSize: '13px',
                                fontWeight: '800',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                boxShadow: '0 4px 15px rgba(245, 158, 11, 0.35)',
                                flexShrink: 0,
                            }}
                        >
                            <Plus size={16} />
                            <span>إضافة مورد جديد</span>
                        </button>

                        <button
                            type="button"
                            onClick={fetchProviders}
                            style={{
                                flex: 1,
                                padding: '11px',
                                borderRadius: '12px',
                                backgroundColor: isLight ? '#F1F5F9' : '#070D1A',
                                border: isLight ? '1px solid #CBD5E1' : '1px solid #1E3A8A',
                                color: '#38BDF8',
                                fontSize: '12px',
                                fontWeight: '800',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '6px',
                            }}
                        >
                            اضغط بحث كل المنتجات للبدء
                        </button>
                    </div>
                </div>

                {/* ================= PROVIDERS CARDS LIST (Screenshot 5) ================= */}
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '60px 0', color: '#94A3B8' }}>
                        <RefreshCw size={32} className="animate-spin" style={{ margin: '0 auto 12px' }} />
                        <div style={{ fontWeight: '700', fontSize: '14px' }}>جاري تحميل المزودين...</div>
                    </div>
                ) : filteredProviders.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '60px 20px',
                        backgroundColor: isLight ? '#FFFFFF' : '#0B1222',
                        borderRadius: '20px',
                        border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                    }}>
                        <Server size={48} style={{ color: '#64748B', margin: '0 auto 12px' }} />
                        <h3 style={{ fontSize: '16px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF', marginBottom: '6px' }}>
                            لا يوجد مزودين مضافين حالياً
                        </h3>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {filteredProviders.map((prov) => {
                            const codeName = (prov.driver || prov.name || 'API').toUpperCase().replace(/\s+/g, '-');
                            return (
                                <div
                                    key={prov.id}
                                    style={{
                                        backgroundColor: isLight ? '#FFFFFF' : '#0B1528',
                                        border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                                        borderRadius: '20px',
                                        padding: '18px',
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    {/* Top Line: Name, Code & Status Badge */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                                        <div>
                                            <h3 style={{ fontSize: '18px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF', margin: '0 0 2px' }}>
                                                {prov.name}
                                            </h3>
                                            <div style={{ fontSize: '11px', fontWeight: '800', color: '#64748B', letterSpacing: '0.5px' }}>
                                                {codeName}
                                            </div>
                                        </div>

                                        <span style={{
                                            padding: '4px 12px',
                                            borderRadius: '100px',
                                            backgroundColor: prov.is_active ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                            border: `1px solid ${prov.is_active ? '#10B981' : '#EF4444'}`,
                                            color: prov.is_active ? '#10B981' : '#EF4444',
                                            fontSize: '11px',
                                            fontWeight: '800',
                                        }}>
                                            {prov.is_active ? 'نشط' : 'معطل'}
                                        </span>
                                    </div>

                                    {/* Badges Row: API, Sync status */}
                                    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                                        <span style={{
                                            padding: '4px 10px',
                                            borderRadius: '100px',
                                            backgroundColor: 'rgba(2, 132, 199, 0.2)',
                                            border: '1px solid #0284C7',
                                            color: '#38BDF8',
                                            fontSize: '11px',
                                            fontWeight: '800',
                                        }}>
                                            API
                                        </span>
                                        <span style={{
                                            padding: '4px 12px',
                                            borderRadius: '100px',
                                            backgroundColor: '#070D1A',
                                            border: '1px solid #1E293B',
                                            color: '#94A3B8',
                                            fontSize: '11px',
                                            fontWeight: '700',
                                        }}>
                                            المزامنة غير مفعلة
                                        </span>
                                    </div>

                                    {/* 6 Action Buttons Grid (Screenshot 5) */}
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                                        gap: '8px',
                                    }}>
                                        {/* Button 1: اختبار الاتصال */}
                                        <button
                                            type="button"
                                            disabled={checkingId === prov.id}
                                            onClick={() => handleCheckBalance(prov.id)}
                                            style={{
                                                padding: '9px 12px',
                                                borderRadius: '12px',
                                                backgroundColor: '#1E3A8A',
                                                color: '#FFFFFF',
                                                border: 'none',
                                                fontSize: '12px',
                                                fontWeight: '800',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '6px',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <Zap size={14} className={checkingId === prov.id ? 'animate-spin' : ''} />
                                            اختبار الاتصال
                                        </button>

                                        {/* Button 2: عرض المنتجات */}
                                        <button
                                            type="button"
                                            onClick={() => handleViewProducts(prov)}
                                            style={{
                                                padding: '9px 12px',
                                                borderRadius: '12px',
                                                backgroundColor: '#1E3A8A',
                                                color: '#FFFFFF',
                                                border: 'none',
                                                fontSize: '12px',
                                                fontWeight: '800',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '6px',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <Eye size={14} />
                                            عرض المنتجات
                                        </button>

                                        {/* Button 3: مزامنة */}
                                        <button
                                            type="button"
                                            onClick={() => handleSync(prov)}
                                            style={{
                                                padding: '9px 12px',
                                                borderRadius: '12px',
                                                backgroundColor: '#1E3A8A',
                                                color: '#FFFFFF',
                                                border: 'none',
                                                fontSize: '12px',
                                                fontWeight: '800',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '6px',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <RefreshCw size={14} />
                                            مزامنة
                                        </button>

                                        {/* Button 4: أدوات الفحص */}
                                        <button
                                            type="button"
                                            onClick={() => success(`أدوات الفحص نشطة للمزود ${prov.name}`)}
                                            style={{
                                                padding: '9px 12px',
                                                borderRadius: '12px',
                                                backgroundColor: '#1E3A8A',
                                                color: '#FFFFFF',
                                                border: 'none',
                                                fontSize: '12px',
                                                fontWeight: '800',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '6px',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <Wrench size={14} />
                                            أدوات الفحص
                                        </button>

                                        {/* Button 5: تعديل */}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setEditingProvider({ ...prov, base_url: prov.base_url || (prov.driver === 'ad_card' ? 'https://ad-card.com/client/api' : ''), api_token: '', has_api_token: prov.has_api_token || prov.driver === 'ad_card' });
                                                setEditBalance(prov.balance?.toString() || '0');
                                            }}
                                            style={{
                                                padding: '9px 12px',
                                                borderRadius: '12px',
                                                backgroundColor: '#1E3A8A',
                                                color: '#FFFFFF',
                                                border: 'none',
                                                fontSize: '12px',
                                                fontWeight: '800',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '6px',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <Edit3 size={14} />
                                            تعديل
                                        </button>

                                        {/* Button 6: تعطيل / تفعيل */}
                                        <button
                                            type="button"
                                            onClick={() => handleToggleProvider(prov.id)}
                                            style={{
                                                padding: '9px 12px',
                                                borderRadius: '12px',
                                                backgroundColor: prov.is_active ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                                                border: `1px solid ${prov.is_active ? '#EF4444' : '#10B981'}`,
                                                color: prov.is_active ? '#EF4444' : '#10B981',
                                                fontSize: '12px',
                                                fontWeight: '800',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '6px',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <Power size={14} />
                                            {prov.is_active ? 'تعطيل' : 'تفعيل'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Floating Scroll To Top Button (Screenshot 5 bottom-left) */}
            <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                style={{
                    position: 'fixed',
                    bottom: '24px',
                    left: '24px',
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #A3E635 0%, #FACC15 100%)',
                    border: 'none',
                    boxShadow: '0 8px 20px rgba(163, 230, 53, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0F172A',
                    cursor: 'pointer',
                    zIndex: 900,
                }}
                title="للأعلى"
            >
                <ArrowUp size={22} strokeWidth={2.5} />
            </button>

            {/* Modal: View Provider Catalog Products */}
            {selectedProviderProducts && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 9999,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '16px',
                }}>
                    <div style={{
                        backgroundColor: isLight ? '#FFFFFF' : '#0B1222',
                        border: isLight ? '1px solid #CBD5E1' : '1px solid #1E293B',
                        borderRadius: '24px',
                        width: '100%',
                        maxWidth: '520px',
                        padding: '24px',
                        maxHeight: '85vh',
                        overflowY: 'auto',
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF', margin: 0 }}>
                                منتجات المورد: {selectedProviderProducts.name}
                            </h3>
                            <button
                                type="button"
                                onClick={() => setSelectedProviderProducts(null)}
                                style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {productsList.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '30px', color: '#94A3B8' }}>
                                لا توجد منتجات مسجلة لهذا المزود حالياً.
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {productsList.map(item => (
                                    <div key={item.id} style={{
                                        backgroundColor: isLight ? '#F8FAFC' : '#070D1A',
                                        border: '1px solid #1E293B',
                                        borderRadius: '14px',
                                        padding: '12px 14px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}>
                                        <div>
                                            <div style={{ fontSize: '13px', fontWeight: '800', color: isLight ? '#0F172A' : '#FFFFFF' }}>{item.name}</div>
                                            <div style={{ fontSize: '11px', color: '#94A3B8' }}>كود: {item.id}</div>
                                        </div>
                                        <div style={{ fontSize: '13px', fontWeight: '900', color: '#10B981' }}>
                                            ${item.price}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {editingProvider && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(0,0,0,.82)', display: 'grid', placeItems: 'center', padding: 16 }}>
                    <form onSubmit={handleSaveProviderSettings} style={{ width: '100%', maxWidth: 460, background: '#0A0F1D', border: '1px solid rgba(56,189,248,.35)', borderRadius: 20, padding: 24 }}>
                        <h3 style={{ color: '#F5D061', marginTop: 0 }}>إعدادات {editingProvider.name}</h3>
                        <p style={{ color: '#94A3B8', fontSize: 12 }}>حالة التوكن: {editingProvider.has_api_token ? 'مُسجل' : 'غير مُسجل'}. لا نعرض قيمته لأسباب أمنية.</p>
                        <label style={{ display: 'block', color: '#CBD5E1', marginBottom: 12 }}>رابط API
                            <input value={editingProvider.base_url || ''} onChange={e => setEditingProvider({ ...editingProvider, base_url: e.target.value })} style={{ display: 'block', width: '100%', marginTop: 6, padding: 10 }} />
                        </label>
                        <label style={{ display: 'block', color: '#CBD5E1', marginBottom: 16 }}>API Token (اتركه فارغًا للإبقاء على الحالي)
                            <input type="password" autoComplete="new-password" value={editingProvider.api_token || ''} onChange={e => setEditingProvider({ ...editingProvider, api_token: e.target.value })} style={{ display: 'block', width: '100%', marginTop: 6, padding: 10 }} />
                        </label>
                        <div style={{ display: 'flex', gap: 10 }}>
                            <button disabled={submittingEdit} style={{ flex: 1, padding: 11 }}>حفظ</button>
                            <button type="button" onClick={() => setEditingProvider(null)} style={{ flex: 1, padding: 11 }}>إلغاء</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Modal: إضافة مورد جديد (Matching Screenshot 1 & 9) */}
            {isAddModalOpen && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 9999,
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '16px',
                }}>
                    <div style={{
                        backgroundColor: '#0A0F1D',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '24px',
                        width: '100%',
                        maxWidth: '460px',
                        padding: '24px 22px',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
                        fontFamily: 'Cairo, sans-serif',
                        direction: 'rtl',
                    }}>
                        {/* Header */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '16px',
                        }}>
                            <h2 style={{
                                fontSize: '20px',
                                fontWeight: '900',
                                color: '#FFFFFF',
                                margin: 0,
                            }}>
                                إضافة مورد جديد
                            </h2>
                            <button
                                type="button"
                                onClick={() => setIsAddModalOpen(false)}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#94A3B8',
                                    cursor: 'pointer',
                                    padding: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Info Banner */}
                        <div style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '16px',
                            padding: '12px 14px',
                            marginBottom: '20px',
                            fontSize: '12px',
                            lineHeight: '1.6',
                            color: '#94A3B8',
                        }}>
                            تم ترك الحقول الضرورية فقط لإضافة مورد بسرعة. يمكنك تعديل باقي الإعدادات لاحقًا من شاشة التعديل.
                        </div>

                        <form onSubmit={handleAddProviderSubmit}>
                            {/* اسم المورد */}
                            <div style={{ marginBottom: '14px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#CBD5E1', marginBottom: '6px' }}>
                                    اسم المورد
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={providerForm.name}
                                    onChange={(e) => setProviderForm({ ...providerForm, name: e.target.value })}
                                    placeholder="اسم المورد"
                                    style={{
                                        width: '100%',
                                        padding: '12px 14px',
                                        borderRadius: '14px',
                                        backgroundColor: '#060B18',
                                        border: '1px solid rgba(56, 189, 248, 0.35)',
                                        color: '#FFFFFF',
                                        fontSize: '13.5px',
                                        outline: 'none',
                                        fontFamily: 'Cairo, sans-serif',
                                        boxSizing: 'border-box',
                                    }}
                                />
                            </div>

                            {/* كود المورد */}
                            <div style={{ marginBottom: '14px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#CBD5E1', marginBottom: '6px' }}>
                                    كود المورد
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={providerForm.driver}
                                    onChange={(e) => setProviderForm({ ...providerForm, driver: e.target.value })}
                                    placeholder="كود المورد (مثال: embrator_reseller_api)"
                                    style={{
                                        width: '100%',
                                        padding: '12px 14px',
                                        borderRadius: '14px',
                                        backgroundColor: '#060B18',
                                        border: '1px solid rgba(56, 189, 248, 0.35)',
                                        color: '#FFFFFF',
                                        fontSize: '13.5px',
                                        outline: 'none',
                                        fontFamily: 'Cairo, sans-serif',
                                        boxSizing: 'border-box',
                                    }}
                                />
                            </div>

                            {/* رابط الـ API الأساسي */}
                            <div style={{ marginBottom: '14px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#CBD5E1', marginBottom: '6px' }}>
                                    رابط الـ API الأساسي
                                </label>
                                <input
                                    type="url"
                                    value={providerForm.base_url}
                                    onChange={(e) => setProviderForm({ ...providerForm, base_url: e.target.value })}
                                    placeholder="https://api.provider.com/v1"
                                    style={{
                                        width: '100%',
                                        padding: '12px 14px',
                                        borderRadius: '14px',
                                        backgroundColor: '#060B18',
                                        border: '1px solid rgba(56, 189, 248, 0.35)',
                                        color: '#FFFFFF',
                                        fontSize: '13.5px',
                                        outline: 'none',
                                        fontFamily: 'Cairo, sans-serif',
                                        boxSizing: 'border-box',
                                        direction: 'ltr',
                                        textAlign: 'right',
                                    }}
                                />
                            </div>

                            {/* نوع الواجهة API */}
                            <div style={{ marginBottom: '14px' }}>
                                <select
                                    value={providerForm.api_type}
                                    onChange={(e) => setProviderForm({ ...providerForm, api_type: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '12px 14px',
                                        borderRadius: '14px',
                                        backgroundColor: '#060B18',
                                        border: '1px solid rgba(56, 189, 248, 0.35)',
                                        color: '#FFFFFF',
                                        fontSize: '13.5px',
                                        outline: 'none',
                                        fontFamily: 'Cairo, sans-serif',
                                        cursor: 'pointer',
                                        boxSizing: 'border-box',
                                    }}
                                >
                                    <option value="Embrator Reseller API">Embrator Reseller API (منصة إمبراطور)</option>
                                    <option value="AD Card API">AD Card API (منصة AD Card)</option>
                                    <option value="API (واجهة برمجة)">API (واجهة برمجة)</option>
                                    <option value="Custom Webhook">Custom Webhook</option>
                                </select>
                            </div>

                            <div style={{ marginBottom: '14px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#CBD5E1', marginBottom: '6px' }}>API Token للمورد</label>
                                <input type="password" autoComplete="new-password" value={providerForm.api_token}
                                    onChange={(e) => setProviderForm({ ...providerForm, api_token: e.target.value })}
                                    placeholder="أدخل التوكن الخاص بالمورد" style={{ width: '100%', padding: '12px 14px', borderRadius: '14px', backgroundColor: '#060B18', border: '1px solid rgba(56, 189, 248, 0.35)', color: '#FFFFFF', boxSizing: 'border-box' }} />
                            </div>

                            {/* نوع التكامل */}
                            <div style={{ marginBottom: '14px' }}>
                                <select
                                    value={providerForm.integration_type}
                                    onChange={(e) => setProviderForm({ ...providerForm, integration_type: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '12px 14px',
                                        borderRadius: '14px',
                                        backgroundColor: '#060B18',
                                        border: '1px solid rgba(56, 189, 248, 0.35)',
                                        color: '#FFFFFF',
                                        fontSize: '13.5px',
                                        outline: 'none',
                                        fontFamily: 'Cairo, sans-serif',
                                        cursor: 'pointer',
                                        boxSizing: 'border-box',
                                    }}
                                >
                                    <option value="التكامل الافتراضي">التكامل الافتراضي</option>
                                    <option value="تكامل مباشر">تكامل مباشر</option>
                                    <option value="وسيط بروتوكول">وسيط بروتوكول</option>
                                </select>
                            </div>

                            {/* التوثيق */}
                            <div style={{ marginBottom: '18px' }}>
                                <select
                                    value={providerForm.auth_type}
                                    onChange={(e) => setProviderForm({ ...providerForm, auth_type: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '12px 14px',
                                        borderRadius: '14px',
                                        backgroundColor: '#060B18',
                                        border: '1px solid rgba(56, 189, 248, 0.35)',
                                        color: '#FFFFFF',
                                        fontSize: '13.5px',
                                        outline: 'none',
                                        fontFamily: 'Cairo, sans-serif',
                                        cursor: 'pointer',
                                        boxSizing: 'border-box',
                                    }}
                                >
                                    <option value="بدون توثيق">بدون توثيق</option>
                                    <option value="Bearer Token">توثيق Bearer Token</option>
                                    <option value="API Key Header">توثيق API Key</option>
                                </select>
                            </div>

                            {/* Checkboxes */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={providerForm.is_active}
                                        onChange={(e) => setProviderForm({ ...providerForm, is_active: e.target.checked })}
                                        style={{ width: '18px', height: '18px', accentColor: '#38BDF8', cursor: 'pointer' }}
                                    />
                                    <span style={{ fontSize: '13.5px', fontWeight: '800', color: '#F1F5F9' }}>المورد نشط</span>
                                </label>

                                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={providerForm.auto_fulfill}
                                        onChange={(e) => setProviderForm({ ...providerForm, auto_fulfill: e.target.checked })}
                                        style={{ width: '18px', height: '18px', accentColor: '#38BDF8', cursor: 'pointer' }}
                                    />
                                    <span style={{ fontSize: '13.5px', fontWeight: '800', color: '#F1F5F9' }}>تفعيل التنفيذ التلقائي</span>
                                </label>
                            </div>

                            {/* Bottom Buttons */}
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <button
                                    type="submit"
                                    disabled={submittingAdd}
                                    style={{
                                        flex: 1,
                                        padding: '13px',
                                        borderRadius: '16px',
                                        background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                                        color: '#FFFFFF',
                                        border: 'none',
                                        fontSize: '15px',
                                        fontWeight: '900',
                                        cursor: submittingAdd ? 'not-allowed' : 'pointer',
                                        boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)',
                                        fontFamily: 'Cairo, sans-serif',
                                    }}
                                >
                                    {submittingAdd ? 'جاري الحفظ...' : 'حفظ المورد'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    style={{
                                        padding: '13px 20px',
                                        borderRadius: '16px',
                                        backgroundColor: 'transparent',
                                        color: '#94A3B8',
                                        border: 'none',
                                        fontSize: '14px',
                                        fontWeight: '800',
                                        cursor: 'pointer',
                                        fontFamily: 'Cairo, sans-serif',
                                    }}
                                >
                                    إلغاء
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
