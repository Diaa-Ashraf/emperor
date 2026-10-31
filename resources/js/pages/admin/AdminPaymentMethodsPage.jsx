import React, { useState, useEffect, useRef } from 'react';
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
    const [groupImageFile, setGroupImageFile] = useState(null);
    const [groupImagePreview, setGroupImagePreview] = useState(null);
    const groupImageRef = useRef(null);
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
        qr_code: '',
        is_active: true,
    });
    const [methodLogoFile, setMethodLogoFile] = useState(null);
    const [methodLogoPreview, setMethodLogoPreview] = useState(null);
    const [methodQrFile, setMethodQrFile] = useState(null);
    const [methodQrPreview, setMethodQrPreview] = useState(null);
    const methodLogoRef = useRef(null);
    const methodQrRef = useRef(null);
    const [submittingMethod, setSubmittingMethod] = useState(false);

    // Modal: تعديل طريقة دفع
    const [isEditMethodModalOpen, setIsEditMethodModalOpen] = useState(false);
    const [editingMethod, setEditingMethod] = useState(null);
    const [editMethodForm, setEditMethodForm] = useState({
        payment_group_id: '',
        name: '',
        type: 'محفظة إلكترونية',
        percent_fee: '0',
        account_number: '',
        bank_name: '',
        account_holder_name: '',
        instruction: '',
        logo: '',
        qr_code: '',
        is_active: true,
    });
    const [editMethodLogoFile, setEditMethodLogoFile] = useState(null);
    const [editMethodLogoPreview, setEditMethodLogoPreview] = useState(null);
    const [editMethodQrFile, setEditMethodQrFile] = useState(null);
    const [editMethodQrPreview, setEditMethodQrPreview] = useState(null);
    const editMethodLogoRef = useRef(null);
    const editMethodQrRef = useRef(null);
    const [submittingEditMethod, setSubmittingEditMethod] = useState(false);

    // Cleaning demo methods
    const [cleaningDemo, setCleaningDemo] = useState(false);

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
            const formData = new FormData();
            formData.append('name', groupForm.name.trim());
            formData.append('currency', groupForm.currency.trim());
            if (groupForm.description) formData.append('description', groupForm.description);
            if (groupImageFile) {
                formData.append('image', groupImageFile);
            } else if (groupForm.image) {
                formData.append('image', groupForm.image);
            }
            formData.append('is_active', groupForm.is_active ? '1' : '0');

            await adminApi.createPaymentGroup(formData);
            success('تمت إضافة مجموعة الدفع بنجاح');
            setIsAddGroupModalOpen(false);
            setGroupForm({
                name: '',
                currency: 'EGP',
                description: '',
                image: '1000299968.png',
                is_active: true,
            });
            setGroupImageFile(null);
            setGroupImagePreview(null);
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
            const formData = new FormData();
            const targetGroupId = selectedGroupId || methodForm.payment_group_id;
            if (targetGroupId) formData.append('payment_group_id', targetGroupId);
            formData.append('name', methodForm.name.trim());
            if (methodForm.description) formData.append('description', methodForm.description);
            formData.append('type', methodForm.type || 'محفظة إلكترونية');
            formData.append('percent_fee', methodForm.percent_fee || '0');
            if (methodForm.account_number) formData.append('account_number', methodForm.account_number.trim());
            if (methodForm.bank_name) formData.append('bank_name', methodForm.bank_name.trim());
            if (methodForm.account_holder_name) formData.append('account_holder_name', methodForm.account_holder_name.trim());
            if (methodForm.instruction) formData.append('instruction', methodForm.instruction.trim());
            if (methodLogoFile) {
                formData.append('logo', methodLogoFile);
            } else if (methodForm.logo) {
                formData.append('logo', methodForm.logo);
            }
            if (methodQrFile) {
                formData.append('qr_code', methodQrFile);
            }
            formData.append('is_active', methodForm.is_active ? '1' : '0');

            await adminApi.createPaymentMethod(formData);
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
                qr_code: '',
                is_active: true,
            });
            setMethodLogoFile(null);
            setMethodLogoPreview(null);
            setMethodQrFile(null);
            setMethodQrPreview(null);
            fetchData();
        } catch (err) {
            console.error(err);
            toastError(err.response?.data?.message || 'فشل إضافة طريقة الدفع');
        } finally {
            setSubmittingMethod(false);
        }
    };

    // Open Edit Method Modal
    const openEditMethodModal = (method) => {
        setEditingMethod(method);
        setEditMethodForm({
            payment_group_id: method.payment_group_id ? String(method.payment_group_id) : '',
            name: method.name || '',
            type: method.type || 'محفظة إلكترونية',
            percent_fee: method.percent_fee || '0',
            account_number: method.account_number || '',
            bank_name: method.bank_name || '',
            account_holder_name: method.account_holder_name || '',
            instruction: method.instruction || method.instructions || '',
            logo: method.logo || '',
            qr_code: method.qr_code || '',
            is_active: Boolean(method.is_active),
        });
        setEditMethodLogoFile(null);
        setEditMethodLogoPreview(method.logo || null);
        setEditMethodQrFile(null);
        setEditMethodQrPreview(method.qr_code || null);
        setIsEditMethodModalOpen(true);
    };

    // Handle Update Method
    const handleUpdateMethod = async (e) => {
        e.preventDefault();
        if (!editMethodForm.name.trim()) {
            toastError('يرجى إدخال اسم طريقة الدفع');
            return;
        }

        setSubmittingEditMethod(true);
        try {
            const formData = new FormData();
            if (editMethodForm.payment_group_id) {
                formData.append('payment_group_id', editMethodForm.payment_group_id);
            }
            formData.append('name', editMethodForm.name.trim());
            formData.append('type', editMethodForm.type || 'محفظة إلكترونية');
            formData.append('percent_fee', editMethodForm.percent_fee || '0');
            if (editMethodForm.account_number) formData.append('account_number', editMethodForm.account_number.trim());
            if (editMethodForm.bank_name) formData.append('bank_name', editMethodForm.bank_name.trim());
            if (editMethodForm.account_holder_name) formData.append('account_holder_name', editMethodForm.account_holder_name.trim());
            if (editMethodForm.instruction) formData.append('instruction', editMethodForm.instruction.trim());
            if (editMethodLogoFile) {
                formData.append('logo', editMethodLogoFile);
            } else if (editMethodForm.logo) {
                formData.append('logo', editMethodForm.logo);
            }
            if (editMethodQrFile) {
                formData.append('qr_code', editMethodQrFile);
            } else if (editMethodForm.qr_code) {
                formData.append('qr_code', editMethodForm.qr_code);
            }
            formData.append('is_active', editMethodForm.is_active ? '1' : '0');

            await adminApi.updatePaymentMethod(editingMethod.id, formData);
            success('تم تحديث طريقة الدفع بنجاح');
            setIsEditMethodModalOpen(false);
            fetchData();
        } catch (err) {
            console.error(err);
            toastError(err.response?.data?.message || 'فشل تحديث طريقة الدفع');
        } finally {
            setSubmittingEditMethod(false);
        }
    };

    // Handle Delete Demo Payment Methods (the 12 unassigned methods)
    const handleDeleteDemoMethods = async () => {
        if (!window.confirm('هل أنت متأكد من حذف طرق الدفع التجريبية غير المرتبطة بمجموعة؟')) return;
        try {
            setCleaningDemo(true);
            await adminApi.deleteDemoPaymentMethods();
            success('تم حذف كافة طرق الدفع التجريبية بنجاح');
            fetchData();
        } catch (err) {
            toastError('فشل حذف الطرق التجريبية');
        } finally {
            setCleaningDemo(false);
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
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                            {/* Flag or Icon */}
                                            <div style={{
                                                width: '46px',
                                                height: '46px',
                                                borderRadius: '50%',
                                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                                border: '1.5px solid rgba(245, 208, 97, 0.4)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '22px',
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                                            }}>
                                                {grp.currency === 'EGP' ? '🇪🇬' : (grp.currency === 'SAR' ? '🇸🇦' : (grp.currency === 'AED' ? '🇦🇪' : '🌐'))}
                                            </div>

                                            <div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <h3 style={{ fontSize: '18px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF', margin: 0 }}>
                                                        {grp.name}
                                                    </h3>
                                                    <span style={{
                                                        padding: '2px 10px',
                                                        borderRadius: '100px',
                                                        backgroundColor: grp.is_active ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                                        border: `1px solid ${grp.is_active ? '#10B981' : '#EF4444'}`,
                                                        color: grp.is_active ? '#10B981' : '#EF4444',
                                                        fontSize: '11px',
                                                        fontWeight: '800',
                                                    }}>
                                                        {grp.is_active ? 'نشطة' : 'معطلة'}
                                                    </span>
                                                </div>

                                                <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px', lineHeight: '1.6' }}>
                                                    {grp.description && <div>{grp.description}</div>}
                                                    <div>العملة: <strong style={{ color: '#38BDF8' }}>{grp.currency}</strong></div>
                                                    <div>الصورة: <span style={{ fontFamily: 'monospace' }}>{grp.image || '1000299968.png'}</span></div>
                                                    <div style={{ color: '#F5D061', fontWeight: '800', marginTop: '2px' }}>{methodsCount} طرق دفع</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Bar for Group (Matching Embrator Screenshot: Delete, Edit, Eye, + إضافة طريقة) */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteGroup(grp.id)}
                                                style={{
                                                    width: '34px',
                                                    height: '34px',
                                                    borderRadius: '10px',
                                                    backgroundColor: 'rgba(239, 68, 68, 0.12)',
                                                    border: '1px solid rgba(239, 68, 68, 0.3)',
                                                    color: '#EF4444',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    cursor: 'pointer',
                                                }}
                                                title="حذف المجموعة"
                                            >
                                                <Trash2 size={15} />
                                            </button>

                                            <button
                                                type="button"
                                                style={{
                                                    width: '34px',
                                                    height: '34px',
                                                    borderRadius: '10px',
                                                    backgroundColor: isLight ? '#EFF6FF' : '#0B1528',
                                                    border: isLight ? '1px solid #CBD5E1' : '1px solid #1E2E4A',
                                                    color: '#94A3B8',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    cursor: 'pointer',
                                                }}
                                                title="تعديل المجموعة"
                                            >
                                                <Edit3 size={15} />
                                            </button>

                                            <button
                                                type="button"
                                                style={{
                                                    width: '34px',
                                                    height: '34px',
                                                    borderRadius: '10px',
                                                    backgroundColor: isLight ? '#EFF6FF' : '#0B1528',
                                                    border: isLight ? '1px solid #CBD5E1' : '1px solid #1E2E4A',
                                                    color: '#94A3B8',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    cursor: 'pointer',
                                                }}
                                                title="معاينة"
                                            >
                                                <Eye size={15} />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => openAddMethodModalWithGroup(String(grp.id))}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    padding: '8px 16px',
                                                    borderRadius: '12px',
                                                    backgroundColor: isLight ? '#0F172A' : '#070D1A',
                                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                                    color: '#FFFFFF',
                                                    fontSize: '13px',
                                                    fontWeight: '800',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                <Plus size={14} />
                                                <span>+ إضافة طريقة</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Payment Methods Cards inside this Group (Matching Embrator Screenshot: 2-column Grid) */}
                                    {methodsCount === 0 ? (
                                        <div style={{ textAlign: 'center', padding: '24px', color: '#94A3B8', fontSize: '13px' }}>
                                            لا توجد طرق دفع مسجلة داخل هذه المجموعة بعد.
                                        </div>
                                    ) : (
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
                                            gap: '16px',
                                        }}>
                                            {grp.payment_methods.map((method) => {
                                                const hasQr = Boolean(method.qr_code);
                                                return (
                                                    <div
                                                        key={method.id}
                                                        style={{
                                                            backgroundColor: isLight ? '#F8FAFC' : '#0B1528',
                                                            border: isLight ? '1px solid #E2E8F0' : '1px solid #1E2E4A',
                                                            borderRadius: '20px',
                                                            padding: '20px',
                                                            boxShadow: isLight ? '0 2px 8px rgba(0,0,0,0.03)' : '0 4px 15px rgba(0,0,0,0.3)',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            justifyContent: 'space-between',
                                                        }}
                                                    >
                                                        <div>
                                                            {/* Top Row: Method Title & Action Icons (Screenshot) */}
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                                    <div style={{
                                                                        width: '42px',
                                                                        height: '42px',
                                                                        borderRadius: '50%',
                                                                        background: method.name?.includes('فودافون') || method.name?.includes('فدفون')
                                                                            ? '#EF4444'
                                                                            : 'linear-gradient(135deg, #7C3AED 0%, #D97706 100%)',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        color: '#FFFFFF',
                                                                        fontWeight: '900',
                                                                        fontSize: '12px',
                                                                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                                                                        flexShrink: 0,
                                                                    }}>
                                                                        {method.name?.includes('فودافون') || method.name?.includes('فدفون') ? 'VF' : 'IP'}
                                                                    </div>

                                                                    <div>
                                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                                                            <h4 style={{ fontSize: '15px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF', margin: 0 }}>
                                                                                {method.name}
                                                                            </h4>
                                                                            <span style={{
                                                                                padding: '2px 8px',
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
                                                                                    padding: '2px 6px',
                                                                                    borderRadius: '100px',
                                                                                    backgroundColor: 'rgba(245, 208, 97, 0.15)',
                                                                                    border: '1px solid rgba(245, 208, 97, 0.4)',
                                                                                    color: '#F5D061',
                                                                                    fontSize: '10.5px',
                                                                                    fontWeight: '800',
                                                                                }}>
                                                                                    <QrCode size={11} />
                                                                                    <span>QR متاح</span>
                                                                                </span>
                                                                            )}
                                                                        </div>

                                                                        {/* Sub description / Type */}
                                                                        <div style={{ display: 'flex', gap: '8px', marginTop: '4px', alignItems: 'center' }}>
                                                                            {method.sub_name && (
                                                                                <span style={{ fontSize: '12px', color: isLight ? '#475569' : '#CBD5E1', fontWeight: '700' }}>
                                                                                    {method.sub_name}
                                                                                </span>
                                                                            )}
                                                                            <span style={{ fontSize: '11px', color: '#38BDF8', fontWeight: '700' }}>
                                                                                {method.type || 'محفظة إلكترونية'}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {/* Method Actions: Delete, Edit, Toggle (Matching Screenshot order) */}
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleDeleteMethod(method.id)}
                                                                        style={{
                                                                            width: '30px',
                                                                            height: '30px',
                                                                            borderRadius: '8px',
                                                                            backgroundColor: 'rgba(239, 68, 68, 0.12)',
                                                                            border: '1px solid rgba(239, 68, 68, 0.3)',
                                                                            color: '#EF4444',
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'center',
                                                                            cursor: 'pointer',
                                                                        }}
                                                                        title="حذف الطريقة"
                                                                    >
                                                                        <Trash2 size={13} />
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => openEditMethodModal(method)}
                                                                        style={{
                                                                            width: '30px',
                                                                            height: '30px',
                                                                            borderRadius: '8px',
                                                                            backgroundColor: isLight ? '#EFF6FF' : '#040711',
                                                                            border: isLight ? '1px solid #CBD5E1' : '1px solid #1E2E4A',
                                                                            color: '#94A3B8',
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'center',
                                                                            cursor: 'pointer',
                                                                        }}
                                                                        title="تعديل طريقة الدفع"
                                                                    >
                                                                        <Edit3 size={13} />
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleToggleMethod(method.id)}
                                                                        style={{
                                                                            width: '30px',
                                                                            height: '30px',
                                                                            borderRadius: '8px',
                                                                            backgroundColor: isLight ? '#EFF6FF' : '#040711',
                                                                            border: isLight ? '1px solid #CBD5E1' : '1px solid #1E2E4A',
                                                                            color: method.is_active ? '#38BDF8' : '#94A3B8',
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'center',
                                                                            cursor: 'pointer',
                                                                        }}
                                                                        title={method.is_active ? 'تعطيل الطريقة' : 'تفعيل الطريقة'}
                                                                    >
                                                                        <Eye size={13} />
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            {/* Details Text lines (Matching Screenshot 1) */}
                                                            <div style={{
                                                                fontSize: '12.5px',
                                                                lineHeight: '1.9',
                                                                color: isLight ? '#334155' : '#CBD5E1',
                                                                borderTop: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.06)',
                                                                paddingTop: '10px',
                                                                textAlign: 'right',
                                                            }}>
                                                                {method.account_number && (
                                                                    <div>
                                                                        <strong style={{ color: '#94A3B8' }}>رقم الحساب: </strong>
                                                                        <span style={{ color: '#FFFFFF', fontWeight: '800', direction: 'ltr', display: 'inline-block' }}>
                                                                            {method.account_number}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                                <div>
                                                                    <strong style={{ color: '#94A3B8' }}>رسوم الطريقة: </strong>
                                                                    <span style={{ color: '#FFFFFF', fontWeight: '800' }}>{method.percent_fee || 0}%</span>
                                                                </div>
                                                                {method.bank_name && (
                                                                    <div>
                                                                        <strong style={{ color: '#94A3B8' }}>اسم البنك: </strong>
                                                                        <span style={{ color: '#FFFFFF', fontWeight: '700' }}>{method.bank_name}</span>
                                                                    </div>
                                                                )}
                                                                {method.account_holder_name && (
                                                                    <div>
                                                                        <strong style={{ color: '#94A3B8' }}>اسم صاحب الحساب: </strong>
                                                                        <span style={{ color: '#FFFFFF', fontWeight: '700' }}>{method.account_holder_name}</span>
                                                                    </div>
                                                                )}
                                                                {(method.instruction || method.instructions) && (
                                                                    <div style={{ marginTop: '2px' }}>
                                                                        <strong style={{ color: '#94A3B8' }}>تعليمات: </strong>
                                                                        <span style={{ color: '#94A3B8', fontSize: '11.5px', lineHeight: '1.6' }}>
                                                                            {typeof method.instruction === 'string' ? method.instruction : (method.instructions?.ar || '')}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                                {method.logo && (
                                                                    <div style={{ marginTop: '4px' }}>
                                                                        <strong style={{ color: '#94A3B8' }}>اسم الصورة: </strong>
                                                                        <span style={{ color: '#64748B', fontFamily: 'monospace', fontSize: '11px' }}>{method.logo}</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {/* Standalone Payment Methods (Unassigned to any group) */}
                        {standaloneMethods.length > 0 && (
                            <div
                                style={{
                                    backgroundColor: isLight ? '#FFFFFF' : '#0B0F19',
                                    border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(245, 158, 11, 0.35)',
                                    borderRadius: '24px',
                                    padding: '20px',
                                    boxShadow: isLight ? '0 4px 15px rgba(0,0,0,0.04)' : '0 10px 30px rgba(0,0,0,0.45)',
                                }}
                            >
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
                                            backgroundColor: 'rgba(245, 158, 11, 0.1)',
                                            border: '1px solid rgba(245, 158, 11, 0.25)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#F59E0B',
                                        }}>
                                            <CreditCard size={22} />
                                        </div>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <h3 style={{ fontSize: '18px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF', margin: 0 }}>
                                                    طرق دفع عامة (بدون مجموعة)
                                                </h3>
                                                <span style={{
                                                    padding: '2px 8px',
                                                    borderRadius: '100px',
                                                    backgroundColor: 'rgba(245, 158, 11, 0.15)',
                                                    color: '#F5D061',
                                                    fontSize: '11px',
                                                    fontWeight: '800',
                                                }}>
                                                    {standaloneMethods.length} طريقة مسجلة
                                                </span>
                                            </div>
                                            <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '3px' }}>
                                                طرق دفع موجودة في النظام يمكنك تعديلها أو ربطها بمجموعة أو حذف الطرق التجريبية.
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleDeleteDemoMethods}
                                        disabled={cleaningDemo}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            padding: '8px 14px',
                                            borderRadius: '12px',
                                            backgroundColor: 'rgba(239, 68, 68, 0.12)',
                                            border: '1px solid rgba(239, 68, 68, 0.35)',
                                            color: '#EF4444',
                                            fontSize: '12.5px',
                                            fontWeight: '800',
                                            cursor: cleaningDemo ? 'not-allowed' : 'pointer',
                                        }}
                                    >
                                        <Trash2 size={14} />
                                        <span>{cleaningDemo ? 'جاري الحذف...' : `حذف الطرق التجريبية (${standaloneMethods.length})`}</span>
                                    </button>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                    {standaloneMethods.map((method) => {
                                        const hasQr = Boolean(method.qr_code);
                                        return (
                                            <div
                                                key={method.id}
                                                style={{
                                                    backgroundColor: isLight ? '#F8FAFC' : '#060B18',
                                                    border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(245, 158, 11, 0.2)',
                                                    borderRadius: '20px',
                                                    padding: '18px 20px',
                                                }}
                                            >
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                        <div style={{
                                                            width: '42px',
                                                            height: '42px',
                                                            borderRadius: '50%',
                                                            background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            color: '#FFFFFF',
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
                                                            </div>
                                                            <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                                                                <span style={{ padding: '2px 8px', borderRadius: '6px', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B', fontSize: '11px', fontWeight: '700' }}>
                                                                    {method.type || 'محفظة إلكترونية'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                        <button
                                                            type="button"
                                                            onClick={() => openEditMethodModal(method)}
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
                                                            title="تعديل طريقة الدفع"
                                                        >
                                                            <Edit3 size={14} />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleToggleMethod(method.id)}
                                                            style={{
                                                                width: '32px',
                                                                height: '32px',
                                                                borderRadius: '8px',
                                                                backgroundColor: method.is_active ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                                                border: `1px solid ${method.is_active ? 'rgba(16, 185, 129, 0.35)' : 'rgba(239, 68, 68, 0.35)'}`,
                                                                color: method.is_active ? '#10B981' : '#EF4444',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                cursor: 'pointer',
                                                            }}
                                                            title={method.is_active ? 'تعطيل الطريقة' : 'تفعيل الطريقة'}
                                                        >
                                                            <Check size={14} />
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

                                                <div style={{
                                                    fontSize: '12.5px',
                                                    lineHeight: '1.8',
                                                    color: isLight ? '#334155' : '#CBD5E1',
                                                    borderTop: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.05)',
                                                    paddingTop: '10px',
                                                }}>
                                                    {method.account_number && (
                                                        <div>
                                                            <strong style={{ color: '#94A3B8' }}>رقم الحساب / المحفظة: </strong>
                                                            <span style={{ color: '#38BDF8', fontWeight: '900', direction: 'ltr', display: 'inline-block' }}>
                                                                {method.account_number}
                                                            </span>
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
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
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

                            {/* Hidden File Input for Group Image */}
                            <input
                                type="file"
                                ref={groupImageRef}
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setGroupImageFile(file);
                                        const reader = new FileReader();
                                        reader.onloadend = () => setGroupImagePreview(reader.result);
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />

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
                                <div
                                    onClick={() => groupImageRef.current?.click()}
                                    style={{
                                        border: '2px dashed rgba(56, 189, 248, 0.3)',
                                        borderRadius: '14px',
                                        padding: '18px',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {groupImagePreview ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <img
                                                src={groupImagePreview}
                                                alt="Group Preview"
                                                style={{ maxHeight: '80px', maxWidth: '100%', objectFit: 'contain', borderRadius: '10px', marginBottom: '8px' }}
                                            />
                                            <div style={{ fontSize: '12px', fontWeight: '800', color: '#38BDF8' }}>اضغط لتغيير الصورة</div>
                                        </div>
                                    ) : (
                                        <>
                                            <Upload size={24} color="#38BDF8" style={{ margin: '0 auto 8px' }} />
                                            <div style={{ fontSize: '13px', fontWeight: '800', color: '#FFFFFF' }}>رفع صورة جديدة</div>
                                            <div style={{ fontSize: '11px', color: '#94A3B8' }}>GIF أو PNG, JPG, WEBP</div>
                                        </>
                                    )}
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

                            {/* Hidden File Input for Method Logo */}
                            <input
                                type="file"
                                ref={methodLogoRef}
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setMethodLogoFile(file);
                                        const reader = new FileReader();
                                        reader.onloadend = () => setMethodLogoPreview(reader.result);
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />

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
                                <div
                                    onClick={() => methodLogoRef.current?.click()}
                                    style={{
                                        border: '2px dashed rgba(56, 189, 248, 0.3)',
                                        borderRadius: '14px',
                                        padding: '18px',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {methodLogoPreview ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <img
                                                src={methodLogoPreview}
                                                alt="Method Preview"
                                                style={{ maxHeight: '80px', maxWidth: '100%', objectFit: 'contain', borderRadius: '10px', marginBottom: '8px' }}
                                            />
                                            <div style={{ fontSize: '12px', fontWeight: '800', color: '#38BDF8' }}>اضغط لتغيير الصورة</div>
                                        </div>
                                    ) : (
                                        <>
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
                                        </>
                                    )}
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

            {/* ================= MODAL: تعديل طريقة دفع ================= */}
            {isEditMethodModalOpen && editingMethod && (
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
                                تعديل طريقة الدفع: {editingMethod.name}
                            </h2>
                            <button
                                type="button"
                                onClick={() => setIsEditMethodModalOpen(false)}
                                style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleUpdateMethod}>
                            {/* المجموعة */}
                            <div style={{ marginBottom: '14px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#CBD5E1', marginBottom: '6px' }}>
                                    المجموعة
                                </label>
                                <select
                                    value={editMethodForm.payment_group_id}
                                    onChange={(e) => setEditMethodForm({ ...editMethodForm, payment_group_id: e.target.value })}
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
                                    <option value="">بدون مجموعة (طريقة عامة)</option>
                                    {groups.map((g) => (
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
                                    value={editMethodForm.name}
                                    onChange={(e) => setEditMethodForm({ ...editMethodForm, name: e.target.value })}
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
                                    value={editMethodForm.type}
                                    onChange={(e) => setEditMethodForm({ ...editMethodForm, type: e.target.value })}
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
                                    <option value="محفظة إلكترونية">محفظة إلكترونية (فودافون كاش / إنستاباي)</option>
                                    <option value="تحويل بنكي">تحويل بنكي</option>
                                    <option value="عملات رقمية">عملات رقمية (USDT / باينانس)</option>
                                    <option value="دفع إلكتروني">بطاقة بنكية / فيزا</option>
                                </select>
                            </div>

                            {/* نسبة الرسوم */}
                            <div style={{ marginBottom: '14px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#CBD5E1', marginBottom: '6px' }}>
                                    نسبة الرسوم الإضافية (%)
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={editMethodForm.percent_fee}
                                    onChange={(e) => setEditMethodForm({ ...editMethodForm, percent_fee: e.target.value })}
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

                            {/* رقم الحساب / المحفظة */}
                            <div style={{ marginBottom: '14px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#CBD5E1', marginBottom: '6px' }}>
                                    رقم الحساب أو المحفظة (فودافون كاش / عنوان المحفظة)
                                </label>
                                <input
                                    type="text"
                                    value={editMethodForm.account_number}
                                    onChange={(e) => setEditMethodForm({ ...editMethodForm, account_number: e.target.value })}
                                    placeholder="مثال: 01012345678"
                                    style={{
                                        width: '100%',
                                        padding: '12px 14px',
                                        borderRadius: '14px',
                                        backgroundColor: '#060B18',
                                        border: '1.5px solid #F59E0B',
                                        color: '#F5D061',
                                        fontSize: '14px',
                                        fontWeight: '800',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                    }}
                                />
                            </div>

                            {/* اسم صاحب الحساب */}
                            <div style={{ marginBottom: '14px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#CBD5E1', marginBottom: '6px' }}>
                                    اسم صاحب الحساب (اختياري)
                                </label>
                                <input
                                    type="text"
                                    value={editMethodForm.account_holder_name}
                                    onChange={(e) => setEditMethodForm({ ...editMethodForm, account_holder_name: e.target.value })}
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

                            {/* تعليمات العميل */}
                            <div style={{ marginBottom: '14px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#CBD5E1', marginBottom: '6px' }}>
                                    تعليمات العميل
                                </label>
                                <textarea
                                    rows={3}
                                    value={editMethodForm.instruction}
                                    onChange={(e) => setEditMethodForm({ ...editMethodForm, instruction: e.target.value })}
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

                            {/* Hidden File Input for Edit Method Logo */}
                            <input
                                type="file"
                                ref={editMethodLogoRef}
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setEditMethodLogoFile(file);
                                        const reader = new FileReader();
                                        reader.onloadend = () => setEditMethodLogoPreview(reader.result);
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />

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
                                <div
                                    onClick={() => editMethodLogoRef.current?.click()}
                                    style={{
                                        border: '2px dashed rgba(56, 189, 248, 0.3)',
                                        borderRadius: '14px',
                                        padding: '18px',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {editMethodLogoPreview ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <img
                                                src={editMethodLogoPreview}
                                                alt="Method Preview"
                                                style={{ maxHeight: '80px', maxWidth: '100%', objectFit: 'contain', borderRadius: '10px', marginBottom: '8px' }}
                                            />
                                            <div style={{ fontSize: '12px', fontWeight: '800', color: '#38BDF8' }}>اضغط لتغيير الصورة</div>
                                        </div>
                                    ) : (
                                        <>
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
                                            <div style={{ fontSize: '13px', fontWeight: '800', color: '#FFFFFF' }}>تغيير صورة الطريقة</div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Buttons */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <button
                                    type="submit"
                                    disabled={submittingEditMethod}
                                    style={{
                                        width: '100%',
                                        padding: '14px',
                                        borderRadius: '16px',
                                        background: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)',
                                        color: '#FFFFFF',
                                        fontSize: '15px',
                                        fontWeight: '900',
                                        border: 'none',
                                        cursor: submittingEditMethod ? 'not-allowed' : 'pointer',
                                        boxShadow: '0 4px 15px rgba(2, 132, 199, 0.4)',
                                    }}
                                >
                                    {submittingEditMethod ? 'جاري الحفظ...' : 'حفظ التعديلات'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsEditMethodModalOpen(false)}
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
        </div>
    );
}

