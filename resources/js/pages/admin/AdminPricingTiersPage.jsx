import React, { useState, useEffect } from 'react';
import {
    Users,
    Shield,
    Repeat,
    Plus,
    Edit3,
    Trash2,
    RefreshCw,
    X,
    CheckCircle2,
    AlertCircle,
    ArrowRightLeft,
    Check
} from 'lucide-react';
import { adminApi } from '../../api/endpoints';
import { useToast } from '../../contexts/ToastContext';
import { useTheme } from '../../contexts/ThemeContext';
import AdminHeader from '../../components/admin/AdminHeader';

export default function AdminPricingTiersPage() {
    const { theme } = useTheme();
    const isLight = theme === 'light';
    const { success, error: toastError } = useToast();

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [stats, setStats] = useState({
        total_groups: 0,
        active_groups: 0,
        empty_groups: 0,
    });
    const [groups, setGroups] = useState([]);

    // Create / Edit Modal
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [editingGroup, setEditingGroup] = useState(null);
    const [formName, setFormName] = useState('');
    const [formDiscount, setFormDiscount] = useState('0');
    const [formSubmitting, setFormSubmitting] = useState(false);

    // Transfer Modal
    const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
    const [transferSourceGroup, setTransferSourceGroup] = useState(null);
    const [transferTargetId, setTransferTargetId] = useState('');
    const [transferSubmitting, setTransferSubmitting] = useState(false);

    // Delete Modal
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deletingGroup, setDeletingGroup] = useState(null);
    const [deleteSubmitting, setDeleteSubmitting] = useState(false);

    const fetchGroups = async () => {
        try {
            setRefreshing(true);
            const res = await adminApi.getPricingTiers();
            if (res && res.data) {
                const data = res.data.data || res.data;
                setStats(data.stats || { total_groups: 0, active_groups: 0, empty_groups: 0 });
                setGroups(data.groups || []);
            }
        } catch (err) {
            toastError('فشل تحميل مجموعات وشرائح العملاء');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    const openCreateModal = () => {
        setEditingGroup(null);
        setFormName('');
        setFormDiscount('0');
        setIsFormModalOpen(true);
    };

    const openEditModal = (group) => {
        setEditingGroup(group);
        setFormName(group.name);
        setFormDiscount(group.discount_percentage.toString());
        setIsFormModalOpen(true);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!formName.trim()) {
            toastError('يرجى إدخال اسم المجموعة');
            return;
        }

        try {
            setFormSubmitting(true);
            const payload = {
                name: formName.trim(),
                discount_percentage: parseFloat(formDiscount) || 0,
            };

            if (editingGroup) {
                await adminApi.updatePricingTier(editingGroup.id, payload);
                success('تم تحديث المجموعة بنجاح');
            } else {
                await adminApi.createPricingTier(payload);
                success('تم إنشاء المجموعة بنجاح');
            }

            setIsFormModalOpen(false);
            fetchGroups();
        } catch (err) {
            const msg = err.response?.data?.message || 'حدث خطأ أثناء حفظ المجموعة';
            toastError(msg);
        } finally {
            setFormSubmitting(false);
        }
    };

    const openTransferModal = (group) => {
        setTransferSourceGroup(group);
        // Find a candidate target group different from source
        const candidate = groups.find(g => g.id !== group.id);
        setTransferTargetId(candidate ? candidate.id : '');
        setIsTransferModalOpen(true);
    };

    const handleTransferSubmit = async (e) => {
        e.preventDefault();
        if (!transferTargetId) {
            toastError('يرجى اختيار المجموعة المستهدفة للنقل');
            return;
        }

        try {
            setTransferSubmitting(true);
            await adminApi.transferPricingTierMembers(transferSourceGroup.id, {
                target_group_id: transferTargetId,
            });
            success('تم نقل أعضاء المجموعة بنجاح');
            setIsTransferModalOpen(false);
            fetchGroups();
        } catch (err) {
            const msg = err.response?.data?.message || 'حدث خطأ أثناء نقل الأعضاء';
            toastError(msg);
        } finally {
            setTransferSubmitting(false);
        }
    };

    const openDeleteModal = (group) => {
        if (!group.can_delete) {
            openTransferModal(group);
            return;
        }
        setDeletingGroup(group);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteSubmit = async () => {
        if (!deletingGroup) return;

        try {
            setDeleteSubmitting(true);
            await adminApi.deletePricingTier(deletingGroup.id);
            success('تم حذف المجموعة بنجاح');
            setIsDeleteModalOpen(false);
            setDeletingGroup(null);
            fetchGroups();
        } catch (err) {
            const msg = err.response?.data?.message || 'تعذر حذف المجموعة';
            toastError(msg);
        } finally {
            setDeleteSubmitting(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: isLight ? '#F8FAFC' : '#040711',
            color: isLight ? '#0F172A' : '#F8FAFC',
            fontFamily: 'Cairo, sans-serif',
            direction: 'rtl',
            paddingBottom: '80px',
        }}>
            {/* Top Admin Header */}
            <AdminHeader
                title="إدارة المجموعات"
                subtitle="عدّل أسماء وخصومات المجموعات مع مشاهدة أعضائها الحاليين، وأي حذف لمجموعة فيها مستخدمون يتم فقط بعد نقلهم إلى مجموعة أخرى."
                badge="إدارة شرائح العملاء"
                onRefresh={fetchGroups}
                refreshing={refreshing}
            />

            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 16px' }}>
                {/* Header Description Box with Button */}
                <div style={{
                    backgroundColor: isLight ? '#FFFFFF' : '#0B1222',
                    border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                    borderRadius: '24px',
                    padding: '24px 20px',
                    marginBottom: '20px',
                    boxShadow: isLight ? '0 4px 20px rgba(0,0,0,0.03)' : '0 10px 30px rgba(0,0,0,0.4)',
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '16px',
                        marginBottom: '20px',
                    }}>
                        <div>
                            <span style={{
                                display: 'inline-block',
                                padding: '4px 12px',
                                borderRadius: '9999px',
                                fontSize: '12px',
                                fontWeight: '700',
                                backgroundColor: isLight ? '#EFF6FF' : 'rgba(56, 189, 248, 0.1)',
                                color: '#38BDF8',
                                border: '1px solid rgba(56, 189, 248, 0.25)',
                                marginBottom: '8px',
                            }}>
                                إدارة شرائح العملاء
                            </span>
                            <h1 style={{
                                fontSize: '24px',
                                fontWeight: '900',
                                margin: '0 0 6px 0',
                                color: isLight ? '#0F172A' : '#FFFFFF',
                            }}>
                                إدارة المجموعات
                            </h1>
                            <p style={{
                                fontSize: '13px',
                                color: isLight ? '#64748B' : '#94A3B8',
                                margin: 0,
                                maxWidth: '650px',
                                lineHeight: '1.6',
                            }}>
                                عدّل أسماء وخصومات المجموعات مع مشاهدة أعضائها الحاليين، وأي حذف لمجموعة فيها مستخدمون يتم فقط بعد نقلهم إلى مجموعة أخرى.
                            </p>
                        </div>

                        <button
                            onClick={openCreateModal}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                padding: '12px 24px',
                                borderRadius: '16px',
                                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B45309 100%)',
                                color: '#FFFFFF',
                                fontWeight: '800',
                                fontSize: '14px',
                                border: 'none',
                                cursor: 'pointer',
                                boxShadow: '0 6px 20px rgba(217, 119, 6, 0.4)',
                                transition: 'all 0.2s ease',
                                width: '100%',
                                maxWidth: '320px',
                            }}
                        >
                            <Plus size={18} strokeWidth={2.5} />
                            + إضافة مجموعة
                        </button>
                    </div>

                    {/* 3 Metric Cards matching Screenshot 1 */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: '14px',
                    }}>
                        {/* 1. Total Groups */}
                        <div style={{
                            backgroundColor: isLight ? '#F8FAFC' : '#0F172A',
                            border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                            borderRadius: '18px',
                            padding: '18px 20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <div style={{
                                width: '46px',
                                height: '46px',
                                borderRadius: '14px',
                                backgroundColor: 'rgba(56, 189, 248, 0.12)',
                                border: '1px solid rgba(56, 189, 248, 0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#38BDF8',
                            }}>
                                <Shield size={22} />
                            </div>
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ fontSize: '12px', color: isLight ? '#64748B' : '#94A3B8', fontWeight: '700', marginBottom: '2px' }}>
                                    إجمالي المجموعات
                                </div>
                                <div style={{ fontSize: '28px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF', lineHeight: 1 }}>
                                    {stats.total_groups}
                                </div>
                            </div>
                        </div>

                        {/* 2. Groups with Members */}
                        <div style={{
                            backgroundColor: isLight ? '#F8FAFC' : '#0F172A',
                            border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                            borderRadius: '18px',
                            padding: '18px 20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <div style={{
                                width: '46px',
                                height: '46px',
                                borderRadius: '14px',
                                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                                border: '1px solid rgba(16, 185, 129, 0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#10B981',
                            }}>
                                <Users size={22} />
                            </div>
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ fontSize: '12px', color: isLight ? '#64748B' : '#94A3B8', fontWeight: '700', marginBottom: '2px' }}>
                                    مجموعات بها أعضاء
                                </div>
                                <div style={{ fontSize: '28px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF', lineHeight: 1 }}>
                                    {stats.active_groups}
                                </div>
                            </div>
                        </div>

                        {/* 3. Ready for direct deletion */}
                        <div style={{
                            backgroundColor: isLight ? '#F8FAFC' : '#0F172A',
                            border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                            borderRadius: '18px',
                            padding: '18px 20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <div style={{
                                width: '46px',
                                height: '46px',
                                borderRadius: '14px',
                                backgroundColor: 'rgba(99, 102, 241, 0.12)',
                                border: '1px solid rgba(99, 102, 241, 0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#818CF8',
                            }}>
                                <Repeat size={22} />
                            </div>
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ fontSize: '12px', color: isLight ? '#64748B' : '#94A3B8', fontWeight: '700', marginBottom: '2px' }}>
                                    جاهزة للحذف المباشر
                                </div>
                                <div style={{ fontSize: '28px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF', lineHeight: 1 }}>
                                    {stats.empty_groups}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Groups Table / List matching Screenshots 1 & 2 */}
                <div style={{
                    backgroundColor: isLight ? '#FFFFFF' : '#0B1222',
                    border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: isLight ? '0 4px 20px rgba(0,0,0,0.03)' : '0 10px 30px rgba(0,0,0,0.4)',
                }}>
                    {/* Header Columns */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1.4fr 0.8fr 1.8fr 1.2fr',
                        padding: '16px 20px',
                        backgroundColor: isLight ? '#F1F5F9' : '#0D1528',
                        borderBottom: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                        fontSize: '13px',
                        fontWeight: '800',
                        color: '#38BDF8',
                    }}>
                        <div>اسم المجموعة</div>
                        <div style={{ textAlign: 'center' }}>نسبة الخصم</div>
                        <div>الأعضاء الحاليون</div>
                        <div style={{ textAlign: 'left' }}>الإجراءات</div>
                    </div>

                    {loading ? (
                        <div style={{ padding: '60px 20px', textAlign: 'center', color: '#94A3B8' }}>
                            <RefreshCw size={32} className="animate-spin" style={{ margin: '0 auto 12px auto', color: '#D4A537' }} />
                            <div>جاري تحميل مجموعات العملاء...</div>
                        </div>
                    ) : groups.length === 0 ? (
                        <div style={{ padding: '60px 20px', textAlign: 'center', color: '#94A3B8' }}>
                            <Users size={40} style={{ margin: '0 auto 12px auto', opacity: 0.5 }} />
                            <div style={{ fontWeight: '700' }}>لا توجد أي مجموعات حالياً</div>
                            <div style={{ fontSize: '13px', marginTop: '6px' }}>اضغط على "إضافة مجموعة" للبدء في تقسيم العملاء وتحديد خصوماتهم.</div>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {groups.map((group) => {
                                const hasMembers = group.members_count > 0;

                                return (
                                    <div
                                        key={group.id}
                                        style={{
                                            display: 'grid',
                                            gridTemplateColumns: '1.4fr 0.8fr 1.8fr 1.2fr',
                                            alignItems: 'center',
                                            padding: '18px 20px',
                                            borderBottom: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.05)',
                                            transition: 'background-color 0.15s ease',
                                        }}
                                    >
                                        {/* Column 1: Group Name & Protection Status */}
                                        <div>
                                            <div style={{
                                                fontSize: '16px',
                                                fontWeight: '900',
                                                color: isLight ? '#0F172A' : '#FFFFFF',
                                                marginBottom: '4px',
                                            }}>
                                                {group.name}
                                            </div>
                                            <div style={{
                                                fontSize: '12px',
                                                fontWeight: '700',
                                                color: hasMembers ? '#F59E0B' : '#94A3B8',
                                            }}>
                                                {hasMembers ? 'محمي بنقل الأعضاء' : 'بدون أعضاء'}
                                            </div>
                                        </div>

                                        {/* Column 2: Discount Badge */}
                                        <div style={{ textAlign: 'center' }}>
                                            <span style={{
                                                display: 'inline-block',
                                                padding: '4px 14px',
                                                borderRadius: '10px',
                                                fontSize: '13px',
                                                fontWeight: '800',
                                                backgroundColor: 'rgba(56, 189, 248, 0.1)',
                                                border: '1px solid rgba(56, 189, 248, 0.25)',
                                                color: '#38BDF8',
                                            }}>
                                                {group.discount_formatted || `${group.discount_percentage}%`}
                                            </span>
                                        </div>

                                        {/* Column 3: Current Members & Transfer Pill */}
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
                                                {/* Members count badge */}
                                                <span style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '4px',
                                                    padding: '3px 10px',
                                                    borderRadius: '8px',
                                                    fontSize: '12px',
                                                    fontWeight: '700',
                                                    backgroundColor: hasMembers ? 'rgba(56, 189, 248, 0.12)' : 'rgba(148, 163, 184, 0.1)',
                                                    color: hasMembers ? '#38BDF8' : '#94A3B8',
                                                    border: hasMembers ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid rgba(148, 163, 184, 0.2)',
                                                }}>
                                                    <Users size={13} />
                                                    {group.members_count} عضو
                                                </span>

                                                {/* Transfer button pill matching screenshot */}
                                                {hasMembers && (
                                                    <button
                                                        onClick={() => openTransferModal(group)}
                                                        title="نقل الأعضاء لمجموعة أخرى قبل حذف المجموعة"
                                                        style={{
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: '6px',
                                                            padding: '4px 10px',
                                                            borderRadius: '8px',
                                                            fontSize: '11px',
                                                            fontWeight: '800',
                                                            backgroundColor: 'rgba(217, 119, 6, 0.15)',
                                                            border: '1px solid rgba(245, 158, 11, 0.4)',
                                                            color: '#FBBF24',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.15s ease',
                                                        }}
                                                    >
                                                        <span>يلزم نقل قبل الحذف</span>
                                                        <ArrowRightLeft size={12} />
                                                    </button>
                                                )}
                                            </div>

                                            {/* Preview Names */}
                                            <div style={{
                                                fontSize: '12px',
                                                color: hasMembers ? (isLight ? '#475569' : '#CBD5E1') : '#64748B',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                maxWidth: '300px',
                                            }}>
                                                {group.members_preview}
                                            </div>
                                        </div>

                                        {/* Column 4: Actions (Edit & Delete) */}
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                                            <button
                                                onClick={() => openEditModal(group)}
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '5px',
                                                    padding: '7px 12px',
                                                    borderRadius: '10px',
                                                    fontSize: '12px',
                                                    fontWeight: '800',
                                                    backgroundColor: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.06)',
                                                    border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.12)',
                                                    color: isLight ? '#0F172A' : '#FFFFFF',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.15s ease',
                                                }}
                                            >
                                                <Edit3 size={13} />
                                                تعديل
                                            </button>

                                            <button
                                                onClick={() => openDeleteModal(group)}
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '5px',
                                                    padding: '7px 12px',
                                                    borderRadius: '10px',
                                                    fontSize: '12px',
                                                    fontWeight: '800',
                                                    backgroundColor: hasMembers ? 'rgba(239, 68, 68, 0.08)' : 'rgba(239, 68, 68, 0.15)',
                                                    border: '1px solid rgba(239, 68, 68, 0.3)',
                                                    color: '#F87171',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.15s ease',
                                                }}
                                            >
                                                <Trash2 size={13} />
                                                حذف
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal 1: Add / Edit Group */}
            {isFormModalOpen && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 9999,
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
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
                        maxWidth: '460px',
                        padding: '24px',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
                        direction: 'rtl',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '900', margin: 0, color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                {editingGroup ? 'تعديل بيانات المجموعة' : 'إضافة مجموعة عملاء جديدة'}
                            </h3>
                            <button
                                onClick={() => setIsFormModalOpen(false)}
                                style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleFormSubmit}>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', marginBottom: '8px', color: isLight ? '#334155' : '#CBD5E1' }}>
                                    اسم المجموعة <span style={{ color: '#EF4444' }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="مثال: VIP 10 أو تجار الجملة"
                                    value={formName}
                                    onChange={(e) => setFormName(e.target.value)}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        borderRadius: '12px',
                                        backgroundColor: isLight ? '#F8FAFC' : '#040711',
                                        border: isLight ? '1px solid #CBD5E1' : '1px solid #1E293B',
                                        color: isLight ? '#0F172A' : '#FFFFFF',
                                        fontSize: '14px',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: '24px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', marginBottom: '8px', color: isLight ? '#334155' : '#CBD5E1' }}>
                                    نسبة الخصم المئوية (%) <span style={{ color: '#EF4444' }}>*</span>
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="100"
                                    placeholder="مثال: 1.75"
                                    value={formDiscount}
                                    onChange={(e) => setFormDiscount(e.target.value)}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        borderRadius: '12px',
                                        backgroundColor: isLight ? '#F8FAFC' : '#040711',
                                        border: isLight ? '1px solid #CBD5E1' : '1px solid #1E293B',
                                        color: isLight ? '#0F172A' : '#FFFFFF',
                                        fontSize: '14px',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                    }}
                                />
                                <span style={{ display: 'block', fontSize: '11px', color: '#94A3B8', marginTop: '6px' }}>
                                    يتم تطبيق هذا الخصم تلقائياً لجميع المشتركين داخل المجموعة عند شراء المنتجات.
                                </span>
                            </div>

                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button
                                    type="submit"
                                    disabled={formSubmitting}
                                    style={{
                                        flex: 1,
                                        padding: '12px 20px',
                                        borderRadius: '14px',
                                        background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                                        color: '#FFFFFF',
                                        fontWeight: '800',
                                        fontSize: '14px',
                                        border: 'none',
                                        cursor: formSubmitting ? 'not-allowed' : 'pointer',
                                    }}
                                >
                                    {formSubmitting ? 'جاري الحفظ...' : (editingGroup ? 'حفظ التعديلات' : 'إضافة المجموعة')}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsFormModalOpen(false)}
                                    style={{
                                        padding: '12px 20px',
                                        borderRadius: '14px',
                                        backgroundColor: isLight ? '#F1F5F9' : '#1E293B',
                                        color: isLight ? '#475569' : '#94A3B8',
                                        fontWeight: '700',
                                        fontSize: '14px',
                                        border: 'none',
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

            {/* Modal 2: Transfer Members Before Deletion */}
            {isTransferModalOpen && transferSourceGroup && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 9999,
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
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
                        maxWidth: '480px',
                        padding: '24px',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
                        direction: 'rtl',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '12px',
                                backgroundColor: 'rgba(245, 158, 11, 0.15)',
                                color: '#F59E0B',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <ArrowRightLeft size={20} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '18px', fontWeight: '900', margin: 0, color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                    نقل أعضاء المجموعة
                                </h3>
                                <div style={{ fontSize: '12px', color: '#94A3B8' }}>
                                    المجموعة: <strong style={{ color: '#F59E0B' }}>{transferSourceGroup.name}</strong> ({transferSourceGroup.members_count} عضو)
                                </div>
                            </div>
                        </div>

                        <p style={{ fontSize: '13px', color: isLight ? '#475569' : '#CBD5E1', lineHeight: '1.6', marginBottom: '20px' }}>
                            لحماية حسابات المستخدمين والحفاظ على استمرارية التسعير، لا يمكن حذف مجموعة تحتوي على أعضاء. يرجى اختيار مجموعة بديلة لنقل جميع الأعضاء إليها أولاً.
                        </p>

                        <form onSubmit={handleTransferSubmit}>
                            <div style={{ marginBottom: '24px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', marginBottom: '8px', color: isLight ? '#334155' : '#CBD5E1' }}>
                                    المجموعة البديلة (الوجهة) <span style={{ color: '#EF4444' }}>*</span>
                                </label>
                                <select
                                    value={transferTargetId}
                                    onChange={(e) => setTransferTargetId(e.target.value)}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        borderRadius: '12px',
                                        backgroundColor: isLight ? '#F8FAFC' : '#040711',
                                        border: isLight ? '1px solid #CBD5E1' : '1px solid #1E293B',
                                        color: isLight ? '#0F172A' : '#FFFFFF',
                                        fontSize: '14px',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                    }}
                                >
                                    <option value="">-- اختر المجموعة البديلة --</option>
                                    {groups.filter(g => g.id !== transferSourceGroup.id).map(g => (
                                        <option key={g.id} value={g.id}>
                                            {g.name} ({g.discount_percentage}% خصم - {g.members_count} عضو)
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button
                                    type="submit"
                                    disabled={transferSubmitting || !transferTargetId}
                                    style={{
                                        flex: 1,
                                        padding: '12px 20px',
                                        borderRadius: '14px',
                                        background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                                        color: '#FFFFFF',
                                        fontWeight: '800',
                                        fontSize: '14px',
                                        border: 'none',
                                        cursor: (transferSubmitting || !transferTargetId) ? 'not-allowed' : 'pointer',
                                    }}
                                >
                                    {transferSubmitting ? 'جاري نقل الأعضاء...' : 'تأكيد نقل الأعضاء'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsTransferModalOpen(false)}
                                    style={{
                                        padding: '12px 20px',
                                        borderRadius: '14px',
                                        backgroundColor: isLight ? '#F1F5F9' : '#1E293B',
                                        color: isLight ? '#475569' : '#94A3B8',
                                        fontWeight: '700',
                                        fontSize: '14px',
                                        border: 'none',
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

            {/* Modal 3: Confirm Deletion */}
            {isDeleteModalOpen && deletingGroup && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 9999,
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
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
                        maxWidth: '420px',
                        padding: '24px',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
                        direction: 'rtl',
                        textAlign: 'center',
                    }}>
                        <div style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '16px',
                            backgroundColor: 'rgba(239, 68, 68, 0.15)',
                            color: '#EF4444',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 16px auto',
                        }}>
                            <Trash2 size={26} />
                        </div>

                        <h3 style={{ fontSize: '18px', fontWeight: '900', margin: '0 0 8px 0', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                            تأكيد حذف المجموعة
                        </h3>
                        <p style={{ fontSize: '13px', color: isLight ? '#64748B' : '#94A3B8', lineHeight: '1.6', marginBottom: '24px' }}>
                            هل أنت متأكد من رغبتك في حذف المجموعة <strong style={{ color: '#EF4444' }}>"{deletingGroup.name}"</strong>؟ هذا الإجراء نهائي ولا يمكن التراجع عنه.
                        </p>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                                onClick={handleDeleteSubmit}
                                disabled={deleteSubmitting}
                                style={{
                                    flex: 1,
                                    padding: '12px 20px',
                                    borderRadius: '14px',
                                    backgroundColor: '#DC2626',
                                    color: '#FFFFFF',
                                    fontWeight: '800',
                                    fontSize: '14px',
                                    border: 'none',
                                    cursor: deleteSubmitting ? 'not-allowed' : 'pointer',
                                }}
                            >
                                {deleteSubmitting ? 'جاري الحذف...' : 'نعم، احذف الآن'}
                            </button>
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                style={{
                                    padding: '12px 20px',
                                    borderRadius: '14px',
                                    backgroundColor: isLight ? '#F1F5F9' : '#1E293B',
                                    color: isLight ? '#475569' : '#94A3B8',
                                    fontWeight: '700',
                                    fontSize: '14px',
                                    border: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                إلغاء
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

