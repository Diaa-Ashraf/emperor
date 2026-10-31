import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, RefreshCw, Eye, Wallet } from 'lucide-react';
import { adminApi } from '../../api/endpoints';
import { useToast } from '../../contexts/ToastContext';

// Shared Arabic date formatter instance (allocated once)
const arabicDateFormatter = new Intl.DateTimeFormat('ar-EG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
});

function formatDate(dateStr) {
    if (!dateStr) return '—';
    try {
        return arabicDateFormatter.format(new Date(dateStr));
    } catch {
        return dateStr;
    }
}

export default function AdminUserDetailsModal({ user, onClose, onUserUpdated, isLight }) {
    const navigate = useNavigate();
    const { success, error: toastError } = useToast();

    const [loadingDetails, setLoadingDetails] = useState(true);
    const [userDetails, setUserDetails] = useState(null);

    // Dynamic Edit States
    const [userGroup, setUserGroup] = useState('VIP8 (1%)');
    const [userCurrency, setUserCurrency] = useState(user.currency || 'EGP');
    const [userDebtLimit, setUserDebtLimit] = useState(0);
    const [savingSettings, setSavingSettings] = useState(false);

    // Balance adjust state
    const [balanceAction, setBalanceAction] = useState('credit');
    const [balanceAmount, setBalanceAmount] = useState('');
    const [balanceDesc, setBalanceDesc] = useState('');
    const [submittingBalance, setSubmittingBalance] = useState(false);

    // Password state
    const [newPassword, setNewPassword] = useState('');
    const [submittingPass, setSubmittingPass] = useState(false);

    const [togglingApi, setTogglingApi] = useState(false);
    const [updatingStatus, setUpdatingStatus] = useState(false);

    const fetchDetails = async () => {
        try {
            setLoadingDetails(true);
            const res = await adminApi.getUser(user.id);
            if (res && res.data) {
                const fetchedData = res.data.data || res.data;
                setUserDetails(fetchedData);
                const stats = fetchedData.stats || {};
                setUserGroup(stats.group || 'VIP8 (1%)');
                setUserCurrency(stats.currency || user.currency || 'EGP');
                setUserDebtLimit(stats.debt_limit || 0);
            }
        } catch (err) {
            console.error('User details error:', err);
            toastError('فشل جلب تفاصيل المستخدم');
        } finally {
            setLoadingDetails(false);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, [user.id]);

    const handleSaveSettings = async (field) => {
        try {
            setSavingSettings(true);
            const payload = {};
            if (field === 'group' || !field) payload.group = userGroup;
            if (field === 'currency' || !field) payload.currency = userCurrency;
            if (field === 'debt_limit' || !field) payload.debt_limit = userDebtLimit;

            const res = await adminApi.updateUserSettings(user.id, payload);
            if (res && res.data) {
                success('تم حفظ الإعداد بنجاح');
                fetchDetails();
                if (onUserUpdated) onUserUpdated();
            }
        } catch (err) {
            toastError(err.response?.data?.message || 'فشل حفظ الإعدادات');
        } finally {
            setSavingSettings(false);
        }
    };

    const handleToggleApi = async () => {
        if (togglingApi) return;
        try {
            setTogglingApi(true);
            const res = await adminApi.toggleUserApi(user.id);
            if (res && res.data) {
                const newStatus = res.data.data?.api_access_status || 'active';
                success(`تم تحديث صلاحية الـ API: ${newStatus === 'active' ? 'مفعل' : 'معطل'}`);
                if (userDetails?.user) {
                    setUserDetails((prev) => ({
                        ...prev,
                        user: { ...prev.user, api_access_status: newStatus },
                    }));
                }
                if (onUserUpdated) onUserUpdated();
            }
        } catch {
            toastError('فشل تعديل صلاحية الـ API');
        } finally {
            setTogglingApi(false);
        }
    };

    const handleStatusAction = async (targetStatus) => {
        if (updatingStatus) return;
        try {
            setUpdatingStatus(true);
            const res = await adminApi.updateUserStatus(user.id, { status: targetStatus });
            if (res && res.data) {
                success(`تم تحديث حالة الحساب إلى: ${targetStatus === 'active' ? 'مفعل' : 'مرفوض/محظور'}`);
                if (userDetails?.user) {
                    setUserDetails((prev) => ({
                        ...prev,
                        user: { ...prev.user, status: targetStatus },
                    }));
                }
                if (onUserUpdated) onUserUpdated();
            }
        } catch {
            toastError('فشل تحديث حالة الحساب');
        } finally {
            setUpdatingStatus(false);
        }
    };

    const handleBalanceSubmit = async (e) => {
        e.preventDefault();
        if (!balanceAmount || Number(balanceAmount) <= 0) {
            toastError('يرجى إدخال مبلغ صحيح أكبر من صفر');
            return;
        }

        try {
            setSubmittingBalance(true);
            const res = await adminApi.adjustUserBalance(user.id, {
                amount: parseFloat(balanceAmount),
                action: balanceAction,
                currency: userCurrency,
                description: balanceDesc.trim() || undefined,
            });

            if (res && res.data) {
                success('تم تعديل رصيد المستخدم بنجاح');
                setBalanceAmount('');
                setBalanceDesc('');
                fetchDetails();
                if (onUserUpdated) onUserUpdated();
            }
        } catch (err) {
            toastError(err.response?.data?.message || 'فشل تعديل الرصيد');
        } finally {
            setSubmittingBalance(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (!newPassword || newPassword.length < 6) {
            toastError('كلمة المرور يجب ألا تقل عن 6 أحرف');
            return;
        }

        try {
            setSubmittingPass(true);
            const res = await adminApi.updateUserStatus(user.id, {
                password: newPassword,
            });

            if (res && res.data) {
                success('تم تغيير كلمة مرور المستخدم بنجاح');
                setNewPassword('');
            }
        } catch {
            toastError('فشل تغيير كلمة المرور');
        } finally {
            setSubmittingPass(false);
        }
    };

    const currentStatus = userDetails?.user?.status || user.status;
    const isUserActive = currentStatus === 'active';
    const activeApiStatus = userDetails?.user?.api_access_status || user.api_access_status;

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 1000,
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px',
                direction: 'rtl',
            }}
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div
                style={{
                    backgroundColor: isLight ? '#FFFFFF' : '#0B0F19',
                    border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(56, 189, 248, 0.3)',
                    borderRadius: '24px',
                    width: '100%',
                    maxWidth: '520px',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)',
                    padding: '24px 20px',
                }}
            >
                {/* Modal Header */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        marginBottom: '20px',
                    }}
                >
                    <div>
                        <h2
                            style={{
                                margin: '0 0 4px',
                                fontSize: '19px',
                                fontWeight: '900',
                                color: isLight ? '#0F172A' : '#FFFFFF',
                            }}
                        >
                            بيانات الحساب - {user.name}
                        </h2>
                        <span
                            style={{
                                fontSize: '11.5px',
                                fontFamily: 'monospace',
                                color: isLight ? '#64748B' : '#94A3B8',
                                direction: 'ltr',
                                display: 'inline-block',
                            }}
                        >
                            ID: {userDetails?.stats?.public_id || user.public_id || user.id}
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        style={{
                            width: '34px',
                            height: '34px',
                            borderRadius: '10px',
                            backgroundColor: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.08)',
                            border: 'none',
                            color: isLight ? '#64748B' : '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                        }}
                    >
                        <X size={18} />
                    </button>
                </div>

                {loadingDetails ? (
                    <div style={{ padding: '50px 0', textAlign: 'center' }}>
                        <RefreshCw className="animate-spin" size={28} color="#D4A537" style={{ margin: '0 auto 10px' }} />
                        <span style={{ fontSize: '13px', color: '#94A3B8' }}>جاري جلب تفاصيل الحساب...</span>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {/* Status Pill */}
                        <div
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '7px 16px',
                                borderRadius: '10px',
                                backgroundColor: isUserActive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                border: `1px solid ${isUserActive ? 'rgba(16, 185, 129, 0.35)' : 'rgba(239, 68, 68, 0.35)'}`,
                                color: isUserActive ? '#10B981' : '#EF4444',
                                fontWeight: '900',
                                fontSize: '13.5px',
                            }}
                        >
                            {isUserActive ? 'مفعل' : 'مرفوض / محظور'}
                        </div>

                        {/* 1. الرصيد الحالي */}
                        <div
                            style={{
                                backgroundColor: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)',
                                border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(56, 189, 248, 0.2)',
                                borderRadius: '16px',
                                padding: '14px 16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <span style={{ fontSize: '13px', color: isLight ? '#64748B' : '#94A3B8', fontWeight: '700' }}>
                                الرصيد الحالي
                            </span>
                            <span style={{ fontSize: '17px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                {userDetails?.stats?.currency || userCurrency}{' '}
                                {Number(userDetails?.stats?.balance ?? user.balance ?? 0).toLocaleString('en-US', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </span>
                        </div>

                        {/* 2. حد الدين */}
                        <div
                            style={{
                                backgroundColor: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)',
                                border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                                borderRadius: '16px',
                                padding: '14px 16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <span style={{ fontSize: '13px', color: isLight ? '#64748B' : '#94A3B8', fontWeight: '700' }}>
                                حد الدين
                            </span>
                            <span style={{ fontSize: '15px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                {userDetails?.stats?.currency || userCurrency} {userDetails?.stats?.debt_limit || 0}
                            </span>
                        </div>

                        {/* 3. حالة البريد */}
                        <div
                            style={{
                                backgroundColor: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)',
                                border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                                borderRadius: '16px',
                                padding: '14px 16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <span style={{ fontSize: '13px', color: isLight ? '#64748B' : '#94A3B8', fontWeight: '700' }}>
                                حالة البريد
                            </span>
                            <span style={{ fontSize: '14px', fontWeight: '800', color: '#10B981' }}>
                                {userDetails?.stats?.email_verified ? 'مؤكد' : 'غير مؤكد'}
                            </span>
                        </div>

                        {/* 4. عمليات المحفظة */}
                        <div
                            style={{
                                backgroundColor: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)',
                                border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                                borderRadius: '16px',
                                padding: '14px 16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <span style={{ fontSize: '13px', color: isLight ? '#64748B' : '#94A3B8', fontWeight: '700' }}>
                                عمليات المحفظة
                            </span>
                            <span style={{ fontSize: '15px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                {userDetails?.stats?.operations_count || 0}
                            </span>
                        </div>

                        {/* 5. آخر حركة */}
                        <div
                            style={{
                                backgroundColor: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)',
                                border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                                borderRadius: '16px',
                                padding: '14px 16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <span style={{ fontSize: '13px', color: isLight ? '#64748B' : '#94A3B8', fontWeight: '700' }}>
                                آخر حركة
                            </span>
                            <span style={{ fontSize: '12.5px', fontWeight: '700', color: isLight ? '#0F172A' : '#94A3B8' }}>
                                {formatDate(userDetails?.stats?.last_movement_at)}
                            </span>
                        </div>

                        {/* 6. آخر عملية محفوظة */}
                        <div
                            style={{
                                backgroundColor: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)',
                                border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                                borderRadius: '16px',
                                padding: '14px 16px',
                            }}
                        >
                            <span style={{ fontSize: '12px', color: isLight ? '#64748B' : '#94A3B8', display: 'block', marginBottom: '8px', fontWeight: '700' }}>
                                آخر عملية محفوظة بالمحفظة
                            </span>
                            {userDetails?.stats?.last_transaction ? (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
                                    <div style={{ minWidth: 0 }}>
                                        <span style={{ fontSize: '13px', fontWeight: '800', color: isLight ? '#0F172A' : '#FFFFFF', display: 'block' }}>
                                            {userDetails.stats.last_transaction.description || 'عملية محفظة'}
                                        </span>
                                        <span style={{ fontSize: '11px', color: isLight ? '#94A3B8' : '#64748B' }}>
                                            {formatDate(userDetails.stats.last_transaction.created_at)}
                                        </span>
                                    </div>
                                    <span
                                        style={{
                                            fontSize: '13px',
                                            fontWeight: '900',
                                            padding: '4px 10px',
                                            borderRadius: '8px',
                                            backgroundColor: userDetails.stats.last_transaction.amount < 0 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                                            color: userDetails.stats.last_transaction.amount < 0 ? '#EF4444' : '#10B981',
                                            direction: 'ltr',
                                        }}
                                    >
                                        {userDetails.stats.last_transaction.amount} {userDetails.stats.currency}
                                    </span>
                                </div>
                            ) : (
                                <span style={{ fontSize: '12.5px', color: isLight ? '#94A3B8' : '#64748B' }}>
                                    لا توجد حركات محفوظة سابقة
                                </span>
                            )}
                        </div>

                        {/* 7. زر المحفظة والسجل */}
                        <button
                            type="button"
                            onClick={() => {
                                navigate(`/admin/users/${user.id}/ledger`);
                                onClose();
                            }}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '14px',
                                backgroundColor: 'rgba(56, 189, 248, 0.12)',
                                border: '1.5px solid rgba(56, 189, 248, 0.4)',
                                color: '#38BDF8',
                                fontSize: '14px',
                                fontWeight: '900',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                fontFamily: 'Cairo, sans-serif',
                                marginTop: '4px',
                                marginBottom: '6px',
                            }}
                        >
                            <Eye size={17} />
                            <span>المحفظة والسجل</span>
                        </button>

                        {/* Metadata */}
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '10px 14px',
                                fontSize: '12px',
                                color: isLight ? '#64748B' : '#94A3B8',
                                borderBottom: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                            }}
                        >
                            <span>
                                طريقة التسجيل: <strong style={{ color: isLight ? '#0F172A' : '#FFFFFF' }}>{userDetails?.stats?.registration_method || 'بريد إلكتروني'}</strong>
                            </span>
                            <span>
                                تاريخ التسجيل: <strong style={{ color: isLight ? '#0F172A' : '#FFFFFF' }}>{formatDate(userDetails?.user?.created_at || user.created_at)}</strong>
                            </span>
                        </div>

                        {/* 8. قرار التفعيل */}
                        <div
                            style={{
                                backgroundColor: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)',
                                border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                                borderRadius: '16px',
                                padding: '16px',
                            }}
                        >
                            <h4 style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                قرار التفعيل
                            </h4>
                            <p style={{ margin: '0 0 12px', fontSize: '12px', color: isLight ? '#64748B' : '#94A3B8' }}>
                                اعتماد أو رفض الحساب مع تحديث حالته فورًا في النظام.
                            </p>

                            {isUserActive ? (
                                <button
                                    type="button"
                                    disabled={updatingStatus}
                                    onClick={() => handleStatusAction('banned')}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '12px',
                                        backgroundColor: 'rgba(239, 68, 68, 0.15)',
                                        border: '1px solid rgba(239, 68, 68, 0.4)',
                                        color: '#EF4444',
                                        fontSize: '13px',
                                        fontWeight: '900',
                                        cursor: updatingStatus ? 'not-allowed' : 'pointer',
                                        fontFamily: 'Cairo, sans-serif',
                                    }}
                                >
                                    {updatingStatus ? 'جاري التحديث...' : 'رفض الحساب / حظر'}
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    disabled={updatingStatus}
                                    onClick={() => handleStatusAction('active')}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '12px',
                                        backgroundColor: 'rgba(16, 185, 129, 0.15)',
                                        border: '1px solid rgba(16, 185, 129, 0.4)',
                                        color: '#10B981',
                                        fontSize: '13px',
                                        fontWeight: '900',
                                        cursor: updatingStatus ? 'not-allowed' : 'pointer',
                                        fontFamily: 'Cairo, sans-serif',
                                    }}
                                >
                                    {updatingStatus ? 'جاري الاعتماد...' : 'اعتماد وتفعيل الحساب'}
                                </button>
                            )}
                        </div>

                        {/* 9. السماح باستخدام الـ API */}
                        <div
                            style={{
                                backgroundColor: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)',
                                border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                                borderRadius: '16px',
                                padding: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <div>
                                <span style={{ fontSize: '14px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF', display: 'block' }}>
                                    السماح باستخدام الـ API
                                </span>
                                <span style={{ fontSize: '11px', color: isLight ? '#64748B' : '#94A3B8' }}>
                                    Enable API Access
                                </span>
                            </div>

                            <button
                                type="button"
                                disabled={togglingApi}
                                onClick={handleToggleApi}
                                style={{
                                    width: '50px',
                                    height: '28px',
                                    borderRadius: '14px',
                                    backgroundColor: activeApiStatus === 'active' ? '#38BDF8' : isLight ? '#CBD5E1' : '#334155',
                                    border: 'none',
                                    cursor: togglingApi ? 'not-allowed' : 'pointer',
                                    position: 'relative',
                                    transition: 'background-color 0.2s ease',
                                }}
                            >
                                <div
                                    style={{
                                        width: '22px',
                                        height: '22px',
                                        borderRadius: '50%',
                                        backgroundColor: '#FFFFFF',
                                        position: 'absolute',
                                        top: '3px',
                                        right: activeApiStatus === 'active' ? '4px' : '24px',
                                        transition: 'right 0.2s ease',
                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                                    }}
                                />
                            </button>
                        </div>

                        {/* 10. المجموعة والعملة */}
                        <div
                            style={{
                                backgroundColor: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)',
                                border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                                borderRadius: '16px',
                                padding: '16px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px',
                            }}
                        >
                            <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                المجموعة والعملة
                            </h4>

                            {/* Group */}
                            <div>
                                <label style={{ fontSize: '12px', color: isLight ? '#64748B' : '#94A3B8', display: 'block', marginBottom: '6px' }}>
                                    المجموعة
                                </label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <select
                                        value={userGroup}
                                        onChange={(e) => setUserGroup(e.target.value)}
                                        style={{
                                            flex: 1,
                                            padding: '9px 12px',
                                            borderRadius: '10px',
                                            backgroundColor: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.05)',
                                            border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(56, 189, 248, 0.3)',
                                            color: isLight ? '#0F172A' : '#FFFFFF',
                                            fontSize: '13px',
                                            fontWeight: '700',
                                            fontFamily: 'Cairo, sans-serif',
                                            outline: 'none',
                                        }}
                                    >
                                        <option value="VIP8 (1%)">VIP8 (1%)</option>
                                        <option value="VIP5 (2%)">VIP5 (2%)</option>
                                        <option value="VIP3 (3%)">VIP3 (3%)</option>
                                        <option value="VIP1 (5%)">VIP1 (5%)</option>
                                        <option value="عضو متجر عادي">عضو متجر عادي</option>
                                    </select>
                                    <button
                                        type="button"
                                        disabled={savingSettings}
                                        onClick={() => handleSaveSettings('group')}
                                        style={{
                                            padding: '9px 18px',
                                            borderRadius: '10px',
                                            backgroundColor: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)',
                                            border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.15)',
                                            color: isLight ? '#0F172A' : '#FFFFFF',
                                            fontSize: '12px',
                                            fontWeight: '800',
                                            cursor: 'pointer',
                                            fontFamily: 'Cairo, sans-serif',
                                        }}
                                    >
                                        حفظ
                                    </button>
                                </div>
                            </div>

                            {/* Currency */}
                            <div>
                                <label style={{ fontSize: '12px', color: isLight ? '#64748B' : '#94A3B8', display: 'block', marginBottom: '6px' }}>
                                    العملة
                                </label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <select
                                        value={userCurrency}
                                        onChange={(e) => setUserCurrency(e.target.value)}
                                        style={{
                                            flex: 1,
                                            padding: '9px 12px',
                                            borderRadius: '10px',
                                            backgroundColor: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.05)',
                                            border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(56, 189, 248, 0.3)',
                                            color: isLight ? '#0F172A' : '#FFFFFF',
                                            fontSize: '13px',
                                            fontWeight: '700',
                                            fontFamily: 'Cairo, sans-serif',
                                            outline: 'none',
                                        }}
                                    >
                                        <option value="EGP">EGP - جنيه مصري</option>
                                        <option value="USD">USD - دولار أمريكي</option>
                                        <option value="SAR">SAR - ريال سعودي</option>
                                        <option value="AED">AED - درهم إماراتي</option>
                                        <option value="TRY">TRY - ليرة تركية</option>
                                    </select>
                                    <button
                                        type="button"
                                        disabled={savingSettings}
                                        onClick={() => handleSaveSettings('currency')}
                                        style={{
                                            padding: '9px 18px',
                                            borderRadius: '10px',
                                            backgroundColor: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)',
                                            border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.15)',
                                            color: isLight ? '#0F172A' : '#FFFFFF',
                                            fontSize: '12px',
                                            fontWeight: '800',
                                            cursor: 'pointer',
                                            fontFamily: 'Cairo, sans-serif',
                                        }}
                                    >
                                        حفظ
                                    </button>
                                </div>
                            </div>

                            {/* Debt Limit */}
                            <div>
                                <label style={{ fontSize: '12px', color: isLight ? '#64748B' : '#94A3B8', display: 'block', marginBottom: '6px' }}>
                                    حد الدين
                                </label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <input
                                        type="number"
                                        value={userDebtLimit}
                                        onChange={(e) => setUserDebtLimit(e.target.value)}
                                        style={{
                                            flex: 1,
                                            padding: '9px 12px',
                                            borderRadius: '10px',
                                            backgroundColor: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.05)',
                                            border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(56, 189, 248, 0.3)',
                                            color: isLight ? '#0F172A' : '#FFFFFF',
                                            fontSize: '13px',
                                            fontWeight: '700',
                                            fontFamily: 'Cairo, sans-serif',
                                            outline: 'none',
                                        }}
                                    />
                                    <button
                                        type="button"
                                        disabled={savingSettings}
                                        onClick={() => handleSaveSettings('debt_limit')}
                                        style={{
                                            padding: '9px 18px',
                                            borderRadius: '10px',
                                            backgroundColor: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)',
                                            border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.15)',
                                            color: isLight ? '#0F172A' : '#FFFFFF',
                                            fontSize: '12px',
                                            fontWeight: '800',
                                            cursor: 'pointer',
                                            fontFamily: 'Cairo, sans-serif',
                                        }}
                                    >
                                        حفظ
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* 11. الرصيد وكلمة المرور */}
                        <div
                            style={{
                                backgroundColor: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)',
                                border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                                borderRadius: '16px',
                                padding: '16px',
                            }}
                        >
                            <h4
                                style={{
                                    margin: '0 0 12px',
                                    fontSize: '14px',
                                    fontWeight: '900',
                                    color: isLight ? '#0F172A' : '#FFFFFF',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                }}
                            >
                                <Wallet size={16} color="#38BDF8" />
                                <span>الرصيد وكلمة المرور</span>
                            </h4>

                            {/* Balance Adjust Form */}
                            <form onSubmit={handleBalanceSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <select
                                        value={balanceAction}
                                        onChange={(e) => setBalanceAction(e.target.value)}
                                        style={{
                                            padding: '8px 10px',
                                            borderRadius: '8px',
                                            backgroundColor: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.06)',
                                            border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.12)',
                                            color: balanceAction === 'credit' ? '#10B981' : '#EF4444',
                                            fontWeight: '800',
                                            fontSize: '12px',
                                            fontFamily: 'Cairo, sans-serif',
                                        }}
                                    >
                                        <option value="credit">+ إضافة رصيد</option>
                                        <option value="debit">- خصم رصيد</option>
                                    </select>

                                    <input
                                        type="number"
                                        step="any"
                                        value={balanceAmount}
                                        onChange={(e) => setBalanceAmount(e.target.value)}
                                        placeholder="أدخل المبلغ..."
                                        style={{
                                            flex: 1,
                                            padding: '8px 12px',
                                            borderRadius: '8px',
                                            backgroundColor: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.05)',
                                            border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.12)',
                                            color: isLight ? '#0F172A' : '#FFFFFF',
                                            fontSize: '13px',
                                            outline: 'none',
                                        }}
                                    />

                                    <button
                                        type="submit"
                                        disabled={submittingBalance}
                                        style={{
                                            padding: '8px 14px',
                                            borderRadius: '8px',
                                            background: balanceAction === 'credit' ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' : 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                                            color: '#FFFFFF',
                                            border: 'none',
                                            fontSize: '12px',
                                            fontWeight: '800',
                                            cursor: submittingBalance ? 'not-allowed' : 'pointer',
                                            fontFamily: 'Cairo, sans-serif',
                                        }}
                                    >
                                        {submittingBalance ? '...' : 'تنفيذ'}
                                    </button>
                                </div>

                                <input
                                    type="text"
                                    value={balanceDesc}
                                    onChange={(e) => setBalanceDesc(e.target.value)}
                                    placeholder="ملاحظات / بيان العملية (اختياري)..."
                                    style={{
                                        padding: '7px 12px',
                                        borderRadius: '8px',
                                        backgroundColor: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.04)',
                                        border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.08)',
                                        color: isLight ? '#0F172A' : '#FFFFFF',
                                        fontSize: '12px',
                                        outline: 'none',
                                    }}
                                />
                            </form>

                            {/* Password Reset Form */}
                            <form onSubmit={handlePasswordSubmit} style={{ display: 'flex', gap: '8px', paddingTop: '12px', borderTop: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.06)' }}>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="كلمة مرور جديدة للمستخدم..."
                                    style={{
                                        flex: 1,
                                        padding: '8px 12px',
                                        borderRadius: '8px',
                                        backgroundColor: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.05)',
                                        border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.12)',
                                        color: isLight ? '#0F172A' : '#FFFFFF',
                                        fontSize: '13px',
                                        outline: 'none',
                                    }}
                                />
                                <button
                                    type="submit"
                                    disabled={submittingPass}
                                    style={{
                                        padding: '8px 14px',
                                        borderRadius: '8px',
                                        backgroundColor: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)',
                                        border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.15)',
                                        color: isLight ? '#0F172A' : '#FFFFFF',
                                        fontSize: '12px',
                                        fontWeight: '800',
                                        cursor: submittingPass ? 'not-allowed' : 'pointer',
                                        fontFamily: 'Cairo, sans-serif',
                                    }}
                                >
                                    {submittingPass ? '...' : 'تحديث المرور'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

