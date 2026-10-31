import React, { useState, useEffect } from 'react';
import {
    CreditCard,
    Plus,
    Trash2,
    Edit3,
    Eye,
    QrCode,
    Check,
    X,
    RefreshCw,
    FolderPlus,
    Upload,
    ArrowUp,
    ShieldCheck,
    Layers,
    ChevronDown,
    Building2,
    FileText,
    Image as ImageIcon
} from 'lucide-react';
import { adminApi } from '../../api/endpoints';
import { useToast } from '../../contexts/ToastContext';
import { useTheme } from '../../contexts/ThemeContext';
import AdminHeader from '../../components/admin/AdminHeader';

export default function AdminPaymentMethodsPage() {
    const { theme } = useTheme();
    const isLight = theme === 'light';
    const { success, error: toastError } = useToast();

    const [loading, setLoading] = useState(true);
    const [groups, setGroups] = useState([]);
    const [standaloneMethods, setStandaloneMethods] = useState([]);
    const [stats, setStats] = useState({ total_methods: 0, active_methods: 0, total_groups: 0 });

    // Modal: إضافة مجموعة دفع (Screenshot 4)
    const [isAddGroupModalOpen, setIsAddGroupModalOpen] = useState(false);
    const [groupForm, setGroupForm] = useState({
        name: '',
        currency: 'EGP',
        description: '',
        image: '1000299968.png',
        is_active: true,
    });
    const [submittingGroup, setSubmittingGroup] = useState(false);

    // Modal: إضافة طريقة دفع (Screenshot 5 & Uploaded Image)
    const [isAddMethodModalOpen, setIsAddMethodModalOpen] = useState(false);
    const [selectedGroupId, setSelectedGroupId] = useState('');
    const [methodForm, setMethodForm] = useState({
        payment_group_id: '',
        name: '',
        description: '',
        type: 'محفظة إلكترونية',
        percent_fee: '0',
        account_number: '',
        bank_name: '',
        account_holder_name: '',
        instruction: '',
        logo: '1000299996.png',
        qr_code: '1000299993.jpg',
        is_active: true,
    });
    const [submittingMethod, setSubmittingMethod] = useState(false);

    // Modal: Preview Image
    const [previewImage, setPreviewImage] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await adminApi.getPaymentMethods();
            if (res && res.data) {
                const data = res.data.data || res.data;
                setGroups(data.groups || []);
                setStandaloneMethods(data.standalone_methods || []);
                setStats(data.stats || { total_methods: 0, active_methods: 0, total_groups: 0 });
            }
        } catch (err) {
            console.error('Fetch payment methods error:', err);
            toastError('فشل تحميل طرق ومجموعات الدفع');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Handle Create Group (Screenshot 4)
    const handleCreateGroup = async (e) => {
        e.preventDefault();
        if (!groupForm.name.trim()) {
            toastError('يرجى إدخال اسم المجموعة');
            return;
        }

        setSubmittingGroup(true);
        try {
            await adminApi.createPaymentGroup(groupForm);
            success('تمت إضافة مجموعة الدفع بنجاح');
            setIsAddGroupModalOpen(false);
            setGroupForm({
                name: '',
                currency: 'EGP',
                description: '',
                image: '1000299968.png',
                is_active: true,
            });
            fetchData();
        } catch (err) {
            console.error(err);
            toastError(err.response?.data?.message || 'فشل إضافة مجموعة الدفع');
        } finally {
            setSubmittingGroup(false);
        }
    };

    // Handle Create Method (Screenshot 5 & Latest Screenshot)
    const handleCreateMethod = async (e) => {
        e.preventDefault();
        if (!methodForm.name.trim()) {
            toastError('يرجى إدخال اسم طريقة الدفع');
            return;
        }

        setSubmittingMethod(true);
        try {
            await adminApi.createPaymentMethod({
                ...methodForm,
                payment_group_id: selectedGroupId || methodForm.payment_group_id || null,
            });
            success('تمت إضافة طريقة الدفع بنجاح');
            setIsAddMethodModalOpen(false);
            setMethodForm({
                payment_group_id: '',
                name: '',
                description: '',
                type: 'محفظة إلكترونية',
                percent_fee: '0',
                account_number: '',
                bank_name: '',
                account_holder_name: '',
                instruction: '',
                logo: '1000299996.png',
                qr_code: '1000299993.jpg',
                is_active: true,
            });
            fetchData();
        } catch (err) {
            console.error(err);
            toastError(err.response?.data?.message || 'فشل إضافة طريقة الدفع');
        } finally {
            setSubmittingMethod(false);
        }
    };

    const handleToggleMethod = async (id) => {
        try {
            await adminApi.togglePaymentMethod(id);
            success('تم تحديث حالة طريقة الدفع');
            fetchData();
        } catch (err) {
            toastError('فشل تحديث حالة طريقة الدفع');
        }
    };

    const handleDeleteMethod = async (id) => {
        if (!window.confirm('هل أنت متأكد من حذف طريقة الدفع هذه؟')) return;
        try {
            await adminApi.deletePaymentMethod(id);
            success('تم حذف طريقة الدفع بنجاح');
            fetchData();
        } catch (err) {
            toastError('فشل حذف طريقة الدفع');
        }
    };

    const handleDeleteGroup = async (id) => {
        if (!window.confirm('هل أنت متأكد من حذف مجموعة الدفع؟ سيتم فك ارتباط طرق الدفع التابعة لها.')) return;
        try {
            await adminApi.deletePaymentGroup(id);
            success('تم حذف مجموعة الدفع بنجاح');
            fetchData();
        } catch (err) {
            toastError('فشل حذف مجموعة الدفع');
        }
    };

    const openAddMethodModalWithGroup = (groupId = '') => {
        setSelectedGroupId(groupId || (groups[0]?.id ? String(groups[0].id) : ''));
        setIsAddMethodModalOpen(true);
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: isLight ? '#F8FAFC' : '#07090E',
            color: isLight ? '#0F172A' : '#FFFFFF',
            fontFamily: 'Cairo, sans-serif',
            direction: 'rtl',
            paddingBottom: '80px',
        }}>
            <AdminHeader
                title="طرق ومجموعات الدفع"
                badge="إدارة بوابات الدفع"
                onRefresh={fetchData}
                refreshing={loading}
            />

            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 16px' }}>
                {/* Top Action Bar */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '12px',
                    marginBottom: '20px',
                }}>
                    <div>
                        <h1 style={{ fontSize: '22px', fontWeight: '900', margin: '0 0 4px', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                            إدارة طرق ومجموعات الدفع
                        </h1>
                        <p style={{ margin: 0, fontSize: '13px', color: isLight ? '#64748B' : '#94A3B8' }}>
                            إجمالي الطرق: {stats.total_methods} | المجموعات: {stats.total_groups}
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                            type="button"
                            onClick={() => setIsAddGroupModalOpen(true)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '10px 18px',
                                borderRadius: '14px',
                                backgroundColor: isLight ? '#EFF6FF' : '#0B1528',
                                border: '1px solid #1E3A8A',
                                color: '#38BDF8',
                                fontSize: '13px',
                                fontWeight: '800',
                                cursor: 'pointer',
                            }}
                        >
                            <FolderPlus size={16} />
                            <span>+ إضافة مجموعة</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => openAddMethodModalWithGroup()}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '10px 18px',
                                borderRadius: '14px',
                                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                                border: 'none',
                                color: '#FFFFFF',
                                fontSize: '13px',
                                fontWeight: '800',
                                cursor: 'pointer',
                                boxShadow: '0 4px 15px rgba(245, 158, 11, 0.35)',
                            }}
                        >
                            <Plus size={16} />
                            <span>+ إضافة طريقة</span>
                        </button>
                    </div>
                </div>

                {/* Groups List */}
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '60px 0', color: '#94A3B8' }}>
                        <RefreshCw size={32} className="animate-spin" style={{ margin: '0 auto 12px' }} />
                        <div style={{ fontWeight: '700', fontSize: '14px' }}>جاري تحميل طرق الدفع...</div>
                    </div>
                ) : groups.length === 0 && standaloneMethods.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '60px 20px',
                        backgroundColor: isLight ? '#FFFFFF' : '#0B0F19',
                        borderRadius: '20px',
                        border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                    }}>
                        <CreditCard size={40} color="#64748B" style={{ margin: '0 auto 12px' }} />
                        <h3 style={{ fontSize: '16px', fontWeight: '800', color: isLight ? '#0F172A' : '#FFFFFF', margin: '0 0 6px' }}>
                            لا توجد مجموعات أو طرق دفع مضافة
                        </h3>
                        <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0 }}>
                            اضغط على "+ إضافة مجموعة" أو "+ إضافة طريقة" للبدء.
                        </p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {groups.map((grp) => {
                            const methodsCount = grp.payment_methods?.length || 0;
                            return (
                                <div
                                    key={grp.id}
                                    style={{
                                        backgroundColor: isLight ? '#FFFFFF' : '#0B0F19',
                                        border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(56, 189, 248, 0.25)',
                                        borderRadius: '24px',
                                        padding: '20px',
                                        boxShadow: isLight ? '0 4px 15px rgba(0,0,0,0.04)' : '0 10px 30px rgba(0,0,0,0.45)',
                                    }}
                                >
                                    {/* Group Header (Matching Screenshot 3 top) */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        flexWrap: 'wrap',
                                        gap: '12px',
                                        marginBottom: '18px',
                                        paddingBottom: '14px',
                                        borderBottom: isLight ? '1px solid #F1F5F9' : '1px solid rgba(255, 255, 255, 0.06)',
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{
                                                width: '44px',
                                                height: '44px',
                                                borderRadius: '14px',
                                                backgroundColor: 'rgba(56, 189, 248, 0.1)',
                                                border: '1px solid rgba(56, 189, 248, 0.25)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#38BDF8',
                                            }}>
                                                <Layers size={22} />
                                            </div>
                                            <div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <h3 style={{ fontSize: '18px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF', margin: 0 }}>
                                                        {grp.name}
                                                    </h3>
                                                    <span style={{
                                                        padding: '2px 8px',
                                                        borderRadius: '100px',
                                                        backgroundColor: 'rgba(56, 189, 248, 0.15)',
                                                        color: '#38BDF8',
                                                        fontSize: '11px',
                                                        fontWeight: '800',
                                                    }}>
                                                        {grp.currency}
                                                    </span>
                                                </div>
                                                <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '3px' }}>
                                                    {methodsCount} طرق دفع | الصورة: {grp.image || '1000299968.png'}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Bar for Group (Screenshot 3 icons: Delete, Edit, View, + Add Method) */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteGroup(grp.id)}
                                                style={{
                                                    width: '36px',
                                                    height: '36px',
                                                    borderRadius: '10px',
                                                    backgroundColor: 'rgba(239, 68, 68, 0.15)',
                                                    border: '1px solid rgba(239, 68, 68, 0.35)',
                                                    color: '#EF4444',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    cursor: 'pointer',
                                                }}
                                                title="حذف المجموعة"
                                            >
                                                <Trash2 size={16} />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => openAddMethodModalWithGroup(String(grp.id))}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    padding: '8px 14px',
                                                    borderRadius: '12px',
                                                    backgroundColor: '#070D1A',
                                                    border: '1px solid #F59E0B',
                                                    color: '#F5D061',
                                                    fontSize: '12.5px',
                                                    fontWeight: '800',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                <Plus size={14} />
                                                <span>+ إضافة طريقة</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Payment Methods Cards inside this Group (Matching Screenshot 3) */}
                                    {methodsCount === 0 ? (
                                        <div style={{ textAlign: 'center', padding: '24px', color: '#94A3B8', fontSize: '13px' }}>
                                            لا توجد طرق دفع مسجلة داخل هذه المجموعة بعد.
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                            {grp.payment_methods.map((method) => {
                                                const hasQr = Boolean(method.qr_code);
                                                return (
                                                    <div
                                                        key={method.id}
                                                        style={{
                                                            backgroundColor: isLight ? '#F8FAFC' : '#060B18',
                                                            border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(56, 189, 248, 0.2)',
                                                            borderRadius: '20px',
                                                            padding: '18px 20px',
                                                            boxShadow: isLight ? '0 2px 8px rgba(0,0,0,0.03)' : '0 4px 15px rgba(0,0,0,0.3)',
                                                        }}
                                                    >
                                                        {/* Top Row: Method Title & Action Icons (Screenshot 3) */}
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                                <div style={{
                                                                    width: '42px',
                                                                    height: '42px',
                                                                    borderRadius: '50%',
                                                                    background: 'linear-gradient(135deg, #7C3AED 0%, #D97706 100%)',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    color: '#FFFFFF',
                                                                    boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)',
                                                                }}>
                                                                    <CreditCard size={20} />
                                                                </div>

                                                                <div>
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                                                        <h4 style={{ fontSize: '16px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF', margin: 0 }}>
                                                                            {method.name}
                                                                        </h4>
                                                                        <span style={{
                                                                            padding: '2px 10px',
                                                                            borderRadius: '100px',
                                                                            backgroundColor: method.is_active ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                                                            border: `1px solid ${method.is_active ? '#10B981' : '#EF4444'}`,
                                                                            color: method.is_active ? '#10B981' : '#EF4444',
                                                                            fontSize: '11px',
                                                                            fontWeight: '800',
                                                                        }}>
                                                                            {method.is_active ? 'نشطة' : 'معطلة'}
                                                                        </span>
                                                                        {hasQr && (
                                                                            <span style={{
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                gap: '4px',
                                                                                padding: '2px 8px',
                                                                                borderRadius: '100px',
                                                                                backgroundColor: '#0F172A',
                                                                                border: '1px solid #334155',
                                                                                color: '#38BDF8',
                                                                                fontSize: '11px',
                                                                                fontWeight: '800',
                                                                            }}>
                                                                                <QrCode size={12} />
                                                                                <span>QR متاح</span>
                                                                            </span>
                                                                        )}
                                                                    </div>

                                                                    {/* Sub badges */}
                                                                    <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                                                                        <span style={{ padding: '2px 8px', borderRadius: '6px', backgroundColor: 'rgba(56, 189, 248, 0.1)', color: '#38BDF8', fontSize: '11px', fontWeight: '700' }}>
                                                                            سريع وآمن
                                                                        </span>
                                                                        <span style={{ padding: '2px 8px', borderRadius: '6px', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B', fontSize: '11px', fontWeight: '700' }}>
                                                                            {method.type || 'محفظة إلكترونية'}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Method Actions (Delete / Toggle) */}
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleToggleMethod(method.id)}
                                                                    style={{
                                                                        width: '32px',
                                                                        height: '32px',
                                                                        borderRadius: '8px',
                                                                        backgroundColor: isLight ? '#EFF6FF' : '#0B1528',
                                                                        border: '1px solid #1E3A8A',
                                                                        color: '#38BDF8',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        cursor: 'pointer',
                                                                    }}
                                                                    title="تبديل الحالة"
                                                                >
                                                                    <Edit3 size={14} />
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleDeleteMethod(method.id)}
                                                                    style={{
                                                                        width: '32px',
                                                                        height: '32px',
                                                                        borderRadius: '8px',
                                                                        backgroundColor: 'rgba(239, 68, 68, 0.15)',
                                                                        border: '1px solid rgba(239, 68, 68, 0.35)',
                                                                        color: '#EF4444',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        cursor: 'pointer',
                                                                    }}
                                                                    title="حذف الطريقة"
                                                                >
                                                                    <Trash2 size={14} />
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* Details Text lines (Matching Screenshot 3) */}
                                                        <div style={{
                                                            fontSize: '12.5px',
                                                            lineHeight: '1.8',
                                                            color: isLight ? '#334155' : '#CBD5E1',
                                                            borderTop: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.05)',
                                                            paddingTop: '10px',
                                                        }}>
                                                            {method.account_number && (
                                                                <div>
                                                                    <strong style={{ color: '#94A3B8' }}>رقم الحساب: </strong>
                                                                    <span style={{ color: '#38BDF8', fontWeight: '900', direction: 'ltr', display: 'inline-block' }}>
                                                                        {method.account_number}
                                                                    </span>
                                                                </div>
                                                            )}
                                                            <div>
                                                                <strong style={{ color: '#94A3B8' }}>رسوم الطريقة: </strong>
                                                                <span>{method.percent_fee || 0}%</span>
                                                            </div>
                                                            {method.bank_name && (
                                                                <div>
                                                                    <strong style={{ color: '#94A3B8' }}>اسم البنك: </strong>
                                                                    <span>{method.bank_name}</span>
                                                                </div>
                                                            )}
                                                            {method.account_holder_name && (
                                                                <div>
                                                                    <strong style={{ color: '#94A3B8' }}>اسم صاحب الحساب: </strong>
                                                                    <span>{method.account_holder_name}</span>
                                                                </div>
                                                            )}
                                                            {(method.instruction || method.instructions) && (
                                                                <div>
                                                                    <strong style={{ color: '#94A3B8' }}>تعليمات: </strong>
                                                                    <span>{method.instruction || method.instructions}</span>
                                                                </div>
                                                            )}
                                                            {method.logo && (
                                                                <div>
                                                                    <strong style={{ color: '#94A3B8' }}>اسم الصورة: </strong>
                                                                    <span style={{ color: '#94A3B8', fontFamily: 'monospace' }}>{method.logo}</span>
                                                                </div>
                                                            )}
                                                            {method.qr_code && (
                                                                <div>
                                                                    <strong style={{ color: '#94A3B8' }}>ملف QR: </strong>
                                                                    <span style={{ color: '#94A3B8', fontFamily: 'monospace' }}>{method.qr_code}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* ================= MODAL: إضافة مجموعة دفع (Screenshot 4) ================= */}
            {isAddGroupModalOpen && (
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
                        padding: '24px',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
                        direction: 'rtl',
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                            <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#FFFFFF', margin: 0 }}>
                                إضافة مجموعة دفع
                            </h2>
                            <button
                                type="button"
                                onClick={() => setIsAddGroupModalOpen(false)}
                                style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleCreateGroup}>
                            {/* اسم المجموعة */}
                            <div style={{ marginBottom: '14px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#CBD5E1', marginBottom: '6px' }}>
                                    اسم المجموعة
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={groupForm.name}
                                    onChange={(e) => setGroupForm({ ...groupForm, name: e.target.value })}
                                    placeholder="مثال: تحويل السعودية"
                                    style={{
                                        width: '100%',
                                        padding: '12px 14px',
                                        borderRadius: '14px',
                                        backgroundColor: '#060B18',
                                        border: '1px solid rgba(56, 189, 248, 0.35)',
                                        color: '#FFFFFF',
                                        fontSize: '13.5px',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                    }}
                                />
                            </div>

                            {/* تحديد العملة */}
                            <div style={{ marginBottom: '14px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#CBD5E1', marginBottom: '6px' }}>
                                    تحديد العملة
                                </label>
                                <select
                                    value={groupForm.currency}
                                    onChange={(e) => setGroupForm({ ...groupForm, currency: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '12px 14px',
                                        borderRadius: '14px',
                                        backgroundColor: '#060B18',
                                        border: '1px solid rgba(56, 189, 248, 0.35)',
                                        color: '#FFFFFF',
                                        fontSize: '13.5px',
                                        outline: 'none',
                                        cursor: 'pointer',
                                        boxSizing: 'border-box',
                                    }}
                                >
                                    <option value="EGP">EGP - جنيه مصري</option>
                                    <option value="SAR">SAR - ريال سعودي</option>
                                    <option value="USD">USD - دولار أمريكي</option>
                                    <option value="AED">AED - درهم إماراتي</option>
                                    <option value="KWD">KWD - دينار كويتي</option>
                                    <option value="JOD">JOD - دينار أردني</option>
                                </select>
                            </div>

                            {/* وصف المجموعة */}
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#CBD5E1', marginBottom: '6px' }}>
                                    وصف المجموعة
                                </label>
                                <textarea
                                    rows={3}
                                    value={groupForm.description}
                                    onChange={(e) => setGroupForm({ ...groupForm, description: e.target.value })}
                                    placeholder="اكتب وصفًا مختصرًا لما تحتويه هذه المجموعة"
                                    style={{
                                        width: '100%',
                                        padding: '12px 14px',
                                        borderRadius: '14px',
                                        backgroundColor: '#060B18',
                                        border: '1px solid rgba(56, 189, 248, 0.35)',
                                        color: '#FFFFFF',
                                        fontSize: '13.5px',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                    }}
                                />
                            </div>

                            {/* صورة المجموعة Box (Screenshot 4) */}
                            <div style={{
                                backgroundColor: '#060B18',
                                border: '1px solid rgba(56, 189, 248, 0.25)',
                                borderRadius: '18px',
                                padding: '16px',
                                marginBottom: '16px',
                            }}>
                                <div style={{ fontSize: '13px', fontWeight: '800', color: '#FFFFFF', marginBottom: '4px' }}>
                                    صورة المجموعة
                                </div>
                                <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '12px' }}>
                                    ارفع صورة أو شعار يظهر للعملاء مع مجموعة الدفع
                                </div>
                                <div style={{
                                    border: '2px dashed rgba(56, 189, 248, 0.3)',
                                    borderRadius: '14px',
                                    padding: '18px',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                }}>
                                    <Upload size={24} color="#38BDF8" style={{ margin: '0 auto 8px' }} />
                                    <div style={{ fontSize: '13px', fontWeight: '800', color: '#FFFFFF' }}>رفع صورة جديدة</div>
                                    <div style={{ fontSize: '11px', color: '#94A3B8' }}>GIF أو PNG, JPG, WEBP</div>
                                </div>
                            </div>

                            {/* تفعيل المجموعة */}
                            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={groupForm.is_active}
                                    onChange={(e) => setGroupForm({ ...groupForm, is_active: e.target.checked })}
                                    style={{ width: '18px', height: '18px', accentColor: '#38BDF8' }}
                                />
                                <span style={{ fontSize: '13.5px', fontWeight: '800', color: '#FFFFFF' }}>
                                    تفعيل المجموعة
                                </span>
                            </label>

                            {/* Buttons */}
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button
                                    type="submit"
                                    disabled={submittingGroup}
                                    style={{
                                        flex: 1,
                                        padding: '13px',
                                        borderRadius: '16px',
                                        background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                                        color: '#FFFFFF',
                                        border: 'none',
                                        fontSize: '15px',
                                        fontWeight: '900',
                                        cursor: submittingGroup ? 'not-allowed' : 'pointer',
                                    }}
                                >
                                    {submittingGroup ? 'جاري الإضافة...' : 'إضافة المجموعة'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsAddGroupModalOpen(false)}
                                    style={{
                                        padding: '13px 20px',
                                        borderRadius: '16px',
                                        backgroundColor: 'transparent',
                                        color: '#94A3B8',
                                        border: 'none',
                                        fontSize: '14px',
                                        fontWeight: '800',
                                        cursor: 'pointer',
                                    }}
                                >
                                    إلغاء
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ================= MODAL: إضافة طريقة دفع (Screenshot 5 & Uploaded Image) ================= */}
            {isAddMethodModalOpen && (
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
                        maxWidth: '480px',
                        padding: '24px',
                        maxHeight: '92vh',
                        overflowY: 'auto',
                        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
                        direction: 'rtl',
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                            <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#FFFFFF', margin: 0 }}>
                                إضافة طريقة دفع
                            </h2>
                            <button
                                type="button"
                                onClick={() => setIsAddMethodModalOpen(false)}
                                style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleCreateMethod}>
                            {/* المجموعة */}
                            <div style={{ marginBottom: '14px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#CBD5E1', marginBottom: '6px' }}>
                                    المجموعة
                                </label>
                                <select
                                    value={selectedGroupId}
                                    onChange={(e) => setSelectedGroupId(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '12px 14px',
                                        borderRadius: '14px',
                                        backgroundColor: '#060B18',
                                        border: '1px solid rgba(56, 189, 248, 0.35)',
                                        color: '#FFFFFF',
                                        fontSize: '13.5px',
                                        outline: 'none',
                                        cursor: 'pointer',
                                        boxSizing: 'border-box',
                                    }}
                                >
                                    <option value="">اختر المجموعة (أو بدون مجموعة)</option>
                                    {groups.map(g => (
                                        <option key={g.id} value={g.id}>{g.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* اسم طريقة الدفع */}
                            <div style={{ marginBottom: '14px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#CBD5E1', marginBottom: '6px' }}>
                                    اسم طريقة الدفع
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={methodForm.name}
                                    onChange={(e) => setMethodForm({ ...methodForm, name: e.target.value })}
                                    placeholder="مثال: تحويل الراجحي أو انستا بي"
                                    style={{
                                        width: '100%',
                                        padding: '12px 14px',
                                        borderRadius: '14px',
                                        backgroundColor: '#060B18',
                                        border: '1px solid rgba(56, 189, 248, 0.35)',
                                        color: '#FFFFFF',
                                        fontSize: '13.5px',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                    }}
                                />
                            </div>

                            {/* نوع الطريقة */}
                            <div style={{ marginBottom: '14px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#CBD5E1', marginBottom: '6px' }}>
                                    نوع الطريقة
                                </label>
                                <select
                                    value={methodForm.type}
                                    onChange={(e) => setMethodForm({ ...methodForm, type: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '12px 14px',
                                        borderRadius: '14px',
                                        backgroundColor: '#060B18',
                                        border: '1px solid rgba(56, 189, 248, 0.35)',
                                        color: '#FFFFFF',
                                        fontSize: '13.5px',
                                        outline: 'none',
                                        cursor: 'pointer',
                                        boxSizing: 'border-box',
                                    }}
                                >
                                    <option value="محفظة إلكترونية">محفظة إلكترونية</option>
                                    <option value="تحويل بنكي">تحويل بنكي</option>
                                    <option value="عملات رقمية">عملات رقمية (Crypto)</option>
                                    <option value="بطاقات مسبقة الدفع">بطاقات مسبقة الدفع</option>
                                </select>
                            </div>

                            {/* نسبة رسوم الطريقة (%) */}
                            <div style={{ marginBottom: '14px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#CBD5E1', marginBottom: '6px' }}>
                                    نسبة رسوم الطريقة (%)
                                </label>
                                <input
                                    type="number"
                                    step="any"
                                    value={methodForm.percent_fee}
                                    onChange={(e) => setMethodForm({ ...methodForm, percent_fee: e.target.value })}
                                    placeholder="0"
                                    style={{
                                        width: '100%',
                                        padding: '12px 14px',
                                        borderRadius: '14px',
                                        backgroundColor: '#060B18',
                                        border: '1px solid rgba(56, 189, 248, 0.35)',
                                        color: '#FFFFFF',
                                        fontSize: '13.5px',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                    }}
                                />
                            </div>

                            {/* رقم الحساب أو المحفظة */}
                            <div style={{ marginBottom: '14px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#CBD5E1', marginBottom: '6px' }}>
                                    رقم الحساب أو المحفظة
                                </label>
                                <input
                                    type="text"
                                    value={methodForm.account_number}
                                    onChange={(e) => setMethodForm({ ...methodForm, account_number: e.target.value })}
                                    placeholder="أدخل الرقم الذي سيحوّل إليه العميل"
                                    style={{
                                        width: '100%',
                                        padding: '12px 14px',
                                        borderRadius: '14px',
                                        backgroundColor: '#060B18',
                                        border: '1px solid rgba(56, 189, 248, 0.35)',
                                        color: '#FFFFFF',
                                        fontSize: '13.5px',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                    }}
                                />
                            </div>

                            {/* اسم البنك (Matching Uploaded Screenshot) */}
                            <div style={{ marginBottom: '14px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#CBD5E1', marginBottom: '6px' }}>
                                    اسم البنك
                                </label>
                                <input
                                    type="text"
                                    value={methodForm.bank_name}
                                    onChange={(e) => setMethodForm({ ...methodForm, bank_name: e.target.value })}
                                    placeholder="يستخدم مع التحويل البنكي فقط"
                                    style={{
                                        width: '100%',
                                        padding: '12px 14px',
                                        borderRadius: '14px',
                                        backgroundColor: '#060B18',
                                        border: '1px solid rgba(56, 189, 248, 0.35)',
                                        color: '#FFFFFF',
                                        fontSize: '13.5px',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                    }}
                                />
                            </div>

                            {/* اسم صاحب الحساب (اختياري) (Matching Uploaded Screenshot) */}
                            <div style={{ marginBottom: '14px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#CBD5E1', marginBottom: '6px' }}>
                                    اسم صاحب الحساب (اختياري)
                                </label>
                                <input
                                    type="text"
                                    value={methodForm.account_holder_name}
                                    onChange={(e) => setMethodForm({ ...methodForm, account_holder_name: e.target.value })}
                                    placeholder="مثال: محمد أحمد"
                                    style={{
                                        width: '100%',
                                        padding: '12px 14px',
                                        borderRadius: '14px',
                                        backgroundColor: '#060B18',
                                        border: '1px solid rgba(56, 189, 248, 0.35)',
                                        color: '#FFFFFF',
                                        fontSize: '13.5px',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                    }}
                                />
                            </div>

                            {/* تعليمات العميل (Matching Uploaded Screenshot) */}
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#CBD5E1', marginBottom: '6px' }}>
                                    تعليمات العميل
                                </label>
                                <textarea
                                    rows={3}
                                    value={methodForm.instruction}
                                    onChange={(e) => setMethodForm({ ...methodForm, instruction: e.target.value })}
                                    placeholder="ما الذي يجب أن يفعله العميل قبل رفع الإيصال؟"
                                    style={{
                                        width: '100%',
                                        padding: '12px 14px',
                                        borderRadius: '14px',
                                        backgroundColor: '#060B18',
                                        border: '1px solid rgba(56, 189, 248, 0.35)',
                                        color: '#FFFFFF',
                                        fontSize: '13.5px',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                    }}
                                />
                            </div>

                            {/* صورة طريقة الدفع Box (Matching Uploaded Screenshot) */}
                            <div style={{
                                backgroundColor: '#060B18',
                                border: '1px solid rgba(56, 189, 248, 0.25)',
                                borderRadius: '18px',
                                padding: '16px',
                                marginBottom: '20px',
                            }}>
                                <div style={{ fontSize: '13px', fontWeight: '800', color: '#FFFFFF', marginBottom: '4px' }}>
                                    صورة طريقة الدفع
                                </div>
                                <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '12px' }}>
                                    ارفع شعارًا أو صورة تعريفية واضحة للطريقة. الحد الأقصى 2MB.
                                </div>
                                <div style={{
                                    border: '2px dashed rgba(56, 189, 248, 0.3)',
                                    borderRadius: '14px',
                                    padding: '18px',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                }}>
                                    <div style={{
                                        width: '44px',
                                        height: '44px',
                                        borderRadius: '50%',
                                        backgroundColor: '#38BDF8',
                                        color: '#0A0F1D',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 8px',
                                    }}>
                                        <ImageIcon size={22} />
                                    </div>
                                    <div style={{ fontSize: '13px', fontWeight: '800', color: '#FFFFFF' }}>رفع صورة جديدة</div>
                                    <div style={{ fontSize: '11px', color: '#94A3B8' }}>GIF أو PNG, JPG, WEBP</div>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <button
                                    type="submit"
                                    disabled={submittingMethod}
                                    style={{
                                        width: '100%',
                                        padding: '14px',
                                        borderRadius: '16px',
                                        background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                                        color: '#FFFFFF',
                                        border: 'none',
                                        fontSize: '15px',
                                        fontWeight: '900',
                                        cursor: submittingMethod ? 'not-allowed' : 'pointer',
                                        boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)',
                                    }}
                                >
                                    {submittingMethod ? 'جاري الإضافة...' : 'إضافة الطريقة'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsAddMethodModalOpen(false)}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        borderRadius: '16px',
                                        backgroundColor: 'transparent',
                                        color: '#94A3B8',
                                        border: 'none',
                                        fontSize: '14px',
                                        fontWeight: '800',
                                        cursor: 'pointer',
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

