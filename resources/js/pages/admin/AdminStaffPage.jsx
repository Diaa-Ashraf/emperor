import React, { useState, useEffect } from 'react';
import {
    Users,
    UserPlus,
    Search,
    Shield,
    Check,
    X,
    Edit3,
    Trash2,
    RefreshCw,
    Sliders,
    UserCheck,
    Circle,
    KeyRound,
    Lock,
    CheckSquare,
    Square
} from 'lucide-react';
import { adminApi } from '../../api/endpoints';
import { useToast } from '../../contexts/ToastContext';
import { useTheme } from '../../contexts/ThemeContext';
import AdminHeader from '../../components/admin/AdminHeader';

export default function AdminStaffPage() {
    const { theme } = useTheme();
    const isLight = theme === 'light';
    const { success, error: toastError } = useToast();

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [supervisors, setSupervisors] = useState([]);
    const [totalStaff, setTotalStaff] = useState(0);

    // Dynamic Roles & Permission Groups from Backend
    const [availableRoles, setAvailableRoles] = useState([
        { key: 'operations_manager', name: 'مدير العمليات والطلبات', desc: 'متابعة الطلبات، التنفيذ، وإدارة المنتجات ومزامنة الموردين' },
        { key: 'finance_manager', name: 'مدير مالي وإيداعات', desc: 'مراجعة وتأكيد الإيداعات، السحوبات، طرق الدفع وأسعار الصرف' },
        { key: 'support_agent', name: 'مسؤول دعم فني وخدمة عملاء', desc: 'خدمة العملاء، استعراض الطلبات، وتأكيد الحسابات' },
        { key: 'admin', name: 'مشرف إداري عام', desc: 'صلاحيات إدارية شاملة ومخصصة حسب التحديد' },
        { key: 'super_admin', name: 'المدير العام (كامل الصلاحيات)', desc: 'الوصول لكافة أقسام المنصة بدون قيود' },
    ]);

    const [permissionGroups, setPermissionGroups] = useState({
        dashboard: {
            title: 'لوحة التحكم والتقارير المالية',
            permissions: [
                { key: 'dashboard.view', label: 'عرض لوحة التحكم الرئيسية', desc: 'الاطلاع على الإحصائيات العامة والمؤشرات الحية والرسوم البيانية' },
                { key: 'reports.view', label: 'عرض وتحميل التقارير المالية', desc: 'استعراض تقارير الأرباح والمبيعات ومعدلات النمو' },
            ],
        },
        users: {
            title: 'المستخدمون وإدارة المحافظ',
            permissions: [
                { key: 'users.view', label: 'عرض المستخدمين', desc: 'تصفح حسابات العملاء وسجلاتهم' },
                { key: 'users.create', label: 'إضافة عميل جديد', desc: 'إنشاء حساب مستخدم جديد يدوياً من اللوحة' },
                { key: 'users.edit', label: 'إدارة وتعديل المستخدمين', desc: 'تعديل بيانات المستخدمين والبريد والهاتف' },
                { key: 'users.ban', label: 'حظر وإلغاء حظر الحسابات', desc: 'إيقاف الحسابات المخالفة أو إعادة تفعيلها' },
                { key: 'users.verify', label: 'تأكيد الحسابات والتوثيق', desc: 'اعتماد وتوثيق الحسابات والهويات' },
                { key: 'users.balance', label: 'تعديل رصيد المحفظة (شحن / خصم)', desc: 'إضافة أو خصم رصيد مالي لحساب العميل' },
                { key: 'users.api_access', label: 'صلاحية الربط البرمجي (B2B API)', desc: 'تفعيل مفاتيح الـ API للموزعين' },
                { key: 'users.delete', label: 'حذف وتجميد الحسابات', desc: 'حذف الحسابات المعطلة أو تجميدها نهائياً' },
            ],
        },
        orders: {
            title: 'طلبات الشحن والعمليات',
            permissions: [
                { key: 'orders.view', label: 'عرض الطلبات', desc: 'متابعة تدفق طلبات الشحن وحالات التنفيذ' },
                { key: 'orders.process', label: 'تأكيد وتنفيذ الطلبات يدوياً', desc: 'تنفيذ الطلبات المعلقة وتحديث حالتها إلى مكتملة' },
                { key: 'orders.refund', label: 'إلغاء الطلبات واسترجاع المبالغ', desc: 'إعادة الأموال إلى محفظة العميل عند فشل الشحن' },
                { key: 'orders.retry', label: 'إعادة إرسال الطلب للمزود (Retry API)', desc: 'إعادة محاولة تنفيذ الطلب تلقائياً عبر مزود الخدمة' },
                { key: 'orders.edit', label: 'تعديل تفاصيل الطلب', desc: 'تعديل معرف اللاعب (Player ID) وملاحظات الطلب' },
            ],
        },
        categories: {
            title: 'الأقسام والكتالوج',
            permissions: [
                { key: 'categories.view', label: 'عرض الأقسام والكتالوج', desc: 'الاطلاع على تصنيفات الألعاب وتطبيقات الشات' },
                { key: 'categories.create', label: 'إضافة قسم جديد', desc: 'إنشاء تصنيف جديد للألعاب أو البطاقات' },
                { key: 'categories.edit', label: 'تعديل وترتيب الأقسام', desc: 'تغيير الصور، الأيقونات، ترتيب الظهور، وحالة العرض' },
                { key: 'categories.delete', label: 'حذف الأقسام', desc: 'حذف الأقسام غير النشطة' },
            ],
        },
        products: {
            title: 'المنتجات والباقات والتسعير',
            permissions: [
                { key: 'products.view', label: 'عرض المنتجات والباقات', desc: 'استعراض الألعاب والباقات والأسعار' },
                { key: 'products.create', label: 'إضافة منتجات وباقات جديدة', desc: 'إضافة لعبة جديدة وتحديد فئات الشحن' },
                { key: 'products.edit', label: 'إدارة المنتجات وتعديل الأسعار', desc: 'تعديل الأسعار والربط التلقائي وحقول الطلب' },
                { key: 'products.delete', label: 'حذف المنتجات والباقات', desc: 'حذف المنتجات والباقات من المتجر' },
                { key: 'pricing.manage', label: 'إدارة المجموعات والتسعير (Pricing Tiers)', desc: 'تحديد نسب الأرباح وهوامش فئات العملاء' },
                { key: 'vouchers.manage', label: 'إدارة مخزون الأكواد الرقمية (Vouchers)', desc: 'رفع وتوليد ومتابعة الأكواد الرقمية وبطاقات الهدايا' },
            ],
        },
        deposits: {
            title: 'الإيداعات والتحويلات المالية',
            permissions: [
                { key: 'deposits.view', label: 'عرض الإيداعات', desc: 'الاطلاع على إيصالات وإشعارات التحويل البنكي والمحافظ' },
                { key: 'deposits.approve', label: 'تأكيد وقبول الإيداعات', desc: 'تأكيد صحة الإيصال وإيداع الرصيد تلقائياً' },
                { key: 'deposits.reject', label: 'رفض الإيداعات غير الصحيحة', desc: 'رفض طلبات الإيداع الوهمية أو غير المكتملة' },
                { key: 'withdrawals.manage', label: 'إدارة طلبات السحب وصرف الأرباح', desc: 'معالجة طلبات تحويل الأرباح للمسوقين والوكلاء' },
            ],
        },
        targets: {
            title: 'بيع التارجت وسحب الكوينز',
            permissions: [
                { key: 'targets.view', label: 'عرض طلبات بيع التارجت', desc: 'الاطلاع على طلبات استبدال كوينز البث والصوت' },
                { key: 'targets.approve', label: 'الموافقة على بيع التارجت وصرف المبلغ', desc: 'تأكيد استلام الكوينز وصرف المبلغ لمحفظة العميل' },
                { key: 'targets.reject', label: 'رفض طلبات بيع التارجت', desc: 'إلغاء الطلب في حال عدم إتمام تحويل الكوينز' },
                { key: 'targets.rates', label: 'تعديل أسعار وتطبيقات التارجت', desc: 'تحديث تسعير المليون كوينز لكل تطبيق بث' },
            ],
        },
        providers: {
            title: 'الموردين والربط البرمجي (B2B API)',
            permissions: [
                { key: 'providers.view', label: 'عرض الموردين', desc: 'الاطلاع على بوابات الربط التلقائي وحساباتها' },
                { key: 'providers.manage', label: 'إدارة الموردين والـ API Keys', desc: 'ضبط الـ Endpoints ومفاتيح الربط لمزودي الخدمة' },
                { key: 'providers.sync', label: 'فحص الرصيد ومزامنة المنتجات', desc: 'سحب المنتجات والأسعار تلقائياً وفحص الرصيد' },
                { key: 'api_clients.manage', label: 'إدارة عملاء الـ API (الموزعين)', desc: 'التحكم في أسعار الموزعين وتوليد الـ Keys' },
            ],
        },
        payment_methods: {
            title: 'طرق الدفع وأسعار الصرف',
            permissions: [
                { key: 'payment_methods.view', label: 'عرض طرق الدفع', desc: 'الاطلاع على وسائل وحسابات الدفع المتاحة' },
                { key: 'payment_methods.manage', label: 'إدارة طرق الدفع وحسابات الاستقبال', desc: 'تعديل أرقام فودافون كاش، انستاباي، والتحويلات' },
                { key: 'exchange_rates.manage', label: 'إدارة أسعار صرف العملات', desc: 'تحديث سعر الدولار والريال مقابل الجنيه' },
            ],
        },
        roles: {
            title: 'إدارة المشرفين والأدوار (Spatie)',
            permissions: [
                { key: 'roles.view', label: 'عرض المشرفين والأدوار', desc: 'الاطلاع على قائمة المشرفين والأدوار المربوطة بهم' },
                { key: 'roles.manage', label: 'تخصيص وتعديل الصلاحيات', desc: 'تحديث مصفوفة الصلاحيات الممنوحة للمشرفين' },
                { key: 'admins.manage', label: 'إضافة وإدارة طاقم المشرفين', desc: 'إنشاء حسابات المشرفين وتعيين الأدوار الوظيفية' },
                { key: 'audit_logs.view', label: 'مراقبة سجل النشاطات الإدارية (Audit Trail)', desc: 'مراقبة كل العمليات والتعديلات التي يقوم بها المشرفون' },
            ],
        },
        marketing_support: {
            title: 'التسويق والدعم الفني والإشعارات',
            permissions: [
                { key: 'banners.manage', label: 'إدارة البانرات والعروض الترويجية', desc: 'إضافة وتعديل صور وشرائح السلايدر الإعلانية' },
                { key: 'notifications.send', label: 'إرسال الإشعارات الجماعية', desc: 'إرسال إشعارات فورية وتنبيهات لكافة العملاء' },
                { key: 'referrals.manage', label: 'إدارة نظام الإحالات ونسب العمولات', desc: 'تحديد نسب الأرباح ونظام المسوقين والوكلاء' },
                { key: 'support.manage', label: 'إدارة قنوات وتذاكر الدعم والشكاوى', desc: 'متابعة رسائل الدعم الفني وأرقام خدمة العملاء' },
            ],
        },
        system: {
            title: 'إعدادات المنصة والأمان',
            permissions: [
                { key: 'settings.view', label: 'عرض إعدادات المنصة', desc: 'الاطلاع على بيانات ومعلومات النظام' },
                { key: 'settings.edit', label: 'تعديل الإعدادات العامة والأمان', desc: 'تغيير اللوجو، الاسم، النصوص، والتكاملات' },
            ],
        },
    });

    // Filters & Search
    const [search, setSearch] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [editPermSearch, setEditPermSearch] = useState('');
    const [addPermSearch, setAddPermSearch] = useState('');

    // Permissions Edit Modal (Matching Screenshot media_1793381447815_a4ba1e40.jpg)
    const [isPermModalOpen, setIsPermModalOpen] = useState(false);
    const [activeStaffForPerms, setActiveStaffForPerms] = useState(null);
    const [selectedRoleForPerms, setSelectedRoleForPerms] = useState('admin');
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [permSubmitting, setPermSubmitting] = useState(false);

    // Add Supervisor Modal
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [staffName, setStaffName] = useState('');
    const [staffEmail, setStaffEmail] = useState('');
    const [staffPhone, setStaffPhone] = useState('');
    const [staffPassword, setStaffPassword] = useState('');
    const [staffRole, setStaffRole] = useState('operations_manager');
    const [staffPermissions, setStaffPermissions] = useState([]);
    const [addSubmitting, setAddSubmitting] = useState(false);

    // Role default permissions presets
    const getRolePresetPermissions = (roleKey) => {
        switch (roleKey) {
            case 'operations_manager':
                return [
                    'dashboard.view',
                    'categories.view', 'categories.create', 'categories.edit',
                    'products.view', 'products.create', 'products.edit', 'pricing.manage', 'vouchers.manage',
                    'orders.view', 'orders.process', 'orders.refund', 'orders.retry', 'orders.edit',
                    'targets.view', 'targets.approve', 'targets.reject', 'targets.rates',
                    'providers.view', 'providers.manage', 'providers.sync', 'api_clients.manage',
                ];
            case 'finance_manager':
                return [
                    'dashboard.view', 'reports.view',
                    'users.view', 'users.balance', 'users.verify',
                    'deposits.view', 'deposits.approve', 'deposits.reject',
                    'withdrawals.manage',
                    'payment_methods.view', 'payment_methods.manage', 'exchange_rates.manage',
                    'targets.view', 'targets.approve', 'targets.reject',
                ];
            case 'support_agent':
                return [
                    'dashboard.view',
                    'users.view', 'users.verify',
                    'orders.view',
                    'deposits.view',
                    'targets.view',
                    'banners.manage',
                    'notifications.send',
                    'support.manage',
                ];
            case 'super_admin':
            case 'admin':
            default:
                return getAllPermissionKeys();
        }
    };

    const getAllPermissionKeys = () => {
        const keys = [];
        Object.values(permissionGroups).forEach((group) => {
            group.permissions.forEach((p) => keys.push(p.key));
        });
        return keys;
    };

    const fetchStaff = async () => {
        try {
            setRefreshing(true);
            const res = await adminApi.getStaff({
                search: search.trim() || undefined,
                status: selectedStatus || undefined,
            });

            if (res && res.data) {
                const data = res.data.data || res.data;
                setSupervisors(data.supervisors || []);
                setTotalStaff(data.total_staff || 0);
                if (data.available_roles) setAvailableRoles(data.available_roles);
                if (data.permission_groups) setPermissionGroups(data.permission_groups);
            }
        } catch (err) {
            toastError('فشل تحميل قائمة المشرفين والصلاحيات');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchStaff();
    }, [selectedStatus]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchStaff();
    };

    // Open Permissions Modal for staff member (Matches Screenshot media_1793381447815_a4ba1e40.jpg)
    const openPermissionsModal = (staff) => {
        setActiveStaffForPerms(staff);
        setSelectedRoleForPerms(staff.role || 'admin');
        const currentPerms = Array.isArray(staff.permissions) ? staff.permissions : [];
        setSelectedPermissions([...currentPerms]);
        setIsPermModalOpen(true);
    };

    // Toggle permission in permissions modal
    const togglePermission = (permKey) => {
        setSelectedPermissions((prev) =>
            prev.includes(permKey) ? prev.filter((p) => p !== permKey) : [...prev, permKey]
        );
    };

    // Toggle permission in Add Supervisor modal
    const toggleAddPermission = (permKey) => {
        setStaffPermissions((prev) =>
            prev.includes(permKey) ? prev.filter((p) => p !== permKey) : [...prev, permKey]
        );
    };

    // Toggle entire group in Edit Permissions modal
    const toggleGroupInEdit = (groupPerms) => {
        const keys = groupPerms.map((p) => p.key);
        const allSelected = keys.every((k) => selectedPermissions.includes(k));
        if (allSelected) {
            setSelectedPermissions((prev) => prev.filter((k) => !keys.includes(k)));
        } else {
            setSelectedPermissions((prev) => Array.from(new Set([...prev, ...keys])));
        }
    };

    // Toggle entire group in Add Supervisor modal
    const toggleGroupInAdd = (groupPerms) => {
        const keys = groupPerms.map((p) => p.key);
        const allSelected = keys.every((k) => staffPermissions.includes(k));
        if (allSelected) {
            setStaffPermissions((prev) => prev.filter((k) => !keys.includes(k)));
        } else {
            setStaffPermissions((prev) => Array.from(new Set([...prev, ...keys])));
        }
    };

    // When role changes in Add Modal, preset default permissions
    const handleRoleChangeInAddModal = (newRole) => {
        setStaffRole(newRole);
        setStaffPermissions(getRolePresetPermissions(newRole));
    };

    // When role changes in Edit Perms Modal, optionally auto-fill
    const handleRoleChangeInEditModal = (newRole) => {
        setSelectedRoleForPerms(newRole);
        setSelectedPermissions(getRolePresetPermissions(newRole));
    };

    // Save Permissions
    const handleSavePermissions = async (e) => {
        e.preventDefault();
        if (!activeStaffForPerms) return;

        try {
            setPermSubmitting(true);
            await adminApi.updateStaffPermissions(activeStaffForPerms.id, {
                role: selectedRoleForPerms,
                permissions: selectedPermissions,
            });
            success(`تم حفظ صلاحيات المشرف ${activeStaffForPerms.name} بنجاح`);
            setIsPermModalOpen(false);
            fetchStaff();
        } catch (err) {
            toastError(err.response?.data?.message || 'فشل تحديث الصلاحيات');
        } finally {
            setPermSubmitting(false);
        }
    };

    // Toggle Supervisor Active / Suspended Status
    const handleToggleStatus = async (staffId) => {
        try {
            await adminApi.toggleStaffStatus(staffId);
            success('تم تعديل حالة المشرف');
            fetchStaff();
        } catch {
            toastError('فشل تعديل حالة المشرف');
        }
    };

    // Add Supervisor Submit
    const handleAddStaffSubmit = async (e) => {
        e.preventDefault();
        if (!staffName.trim() || !staffEmail.trim() || !staffPassword.trim()) {
            toastError('يرجى ملء جميع الحقول المطلوبة');
            return;
        }

        try {
            setAddSubmitting(true);
            await adminApi.createStaff({
                name: staffName.trim(),
                email: staffEmail.trim(),
                phone: staffPhone.trim() || undefined,
                password: staffPassword.trim(),
                role: staffRole,
                permissions: staffPermissions,
            });
            success('تمت إضافة المشرف بنجاح وتعيين الصلاحيات');
            setIsAddModalOpen(false);
            setStaffName('');
            setStaffEmail('');
            setStaffPhone('');
            setStaffPassword('');
            fetchStaff();
        } catch (err) {
            toastError(err.response?.data?.message || 'فشل إضافة المشرف');
        } finally {
            setAddSubmitting(false);
        }
    };

    // Open Add Modal with default preset
    const handleOpenAddModal = () => {
        setStaffRole('operations_manager');
        setStaffPermissions(getRolePresetPermissions('operations_manager'));
        setIsAddModalOpen(true);
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                backgroundColor: isLight ? '#F8FAFC' : '#040711',
                color: isLight ? '#0F172A' : '#F8FAFC',
                fontFamily: 'Cairo, sans-serif',
                direction: 'rtl',
                paddingBottom: '80px',
            }}
        >
            {/* Header */}
            <AdminHeader
                title="إدارة المشرفين والصلاحيات"
                subtitle="تعيين المشرفين، تحديد أدوارهم (Spatie Roles)، وضبط صلاحيات الوصول في النظام"
                badge="الأمان والتحكم"
                onRefresh={fetchStaff}
                refreshing={refreshing}
            />

            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 16px' }}>
                {/* Header Action Box */}
                <div
                    style={{
                        backgroundColor: isLight ? '#FFFFFF' : '#0B1222',
                        border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                        borderRadius: '24px',
                        padding: '24px 20px',
                        marginBottom: '20px',
                        boxShadow: isLight ? '0 4px 20px rgba(0,0,0,0.03)' : '0 10px 30px rgba(0,0,0,0.4)',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: '16px',
                            marginBottom: '20px',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div
                                style={{
                                    width: '46px',
                                    height: '46px',
                                    borderRadius: '14px',
                                    backgroundColor: 'rgba(56, 189, 248, 0.12)',
                                    border: '1px solid rgba(56, 189, 248, 0.3)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#38BDF8',
                                }}
                            >
                                <Users size={24} />
                            </div>
                            <div>
                                <h1 style={{ fontSize: '24px', fontWeight: '900', margin: 0, color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                    إدارة المشرفين والصلاحيات
                                </h1>
                                <p style={{ fontSize: '13px', color: isLight ? '#64748B' : '#94A3B8', margin: '2px 0 0' }}>
                                    فريق العمل ونظام الصلاحيات (Spatie Roles & Permissions)
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleOpenAddModal}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '12px 24px',
                                borderRadius: '16px',
                                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                                color: '#FFFFFF',
                                fontWeight: '800',
                                fontSize: '14px',
                                border: 'none',
                                cursor: 'pointer',
                                boxShadow: '0 6px 20px rgba(217, 119, 6, 0.4)',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            <UserPlus size={18} />
                            <span>+ إضافة مشرف جديد</span>
                        </button>
                    </div>

                    {/* Stat Badges */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '12px',
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: isLight ? '#F8FAFC' : '#040711',
                                border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                                borderRadius: '16px',
                                padding: '14px 18px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <span style={{ fontSize: '13px', color: isLight ? '#64748B' : '#94A3B8', fontWeight: '700' }}>
                                إجمالي المشرفين
                            </span>
                            <span style={{ fontSize: '20px', fontWeight: '900', color: '#F59E0B' }}>
                                {totalStaff}
                            </span>
                        </div>

                        <div
                            style={{
                                backgroundColor: isLight ? '#F8FAFC' : '#040711',
                                border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                                borderRadius: '16px',
                                padding: '14px 18px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <span style={{ fontSize: '13px', color: isLight ? '#64748B' : '#94A3B8', fontWeight: '700' }}>
                                أدوار النظام (Spatie)
                            </span>
                            <span style={{ fontSize: '20px', fontWeight: '900', color: '#38BDF8' }}>
                                {availableRoles.length}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Search & Filter Bar */}
                <div
                    style={{
                        backgroundColor: isLight ? '#FFFFFF' : '#0B1222',
                        border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                        borderRadius: '20px',
                        padding: '16px 20px',
                        marginBottom: '20px',
                    }}
                >
                    <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
                            <input
                                type="text"
                                placeholder="ابحث باسم المشرف، البريد الإلكتروني..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px 38px 10px 14px',
                                    borderRadius: '12px',
                                    backgroundColor: isLight ? '#F8FAFC' : '#040711',
                                    border: isLight ? '1px solid #CBD5E1' : '1px solid #1E293B',
                                    color: isLight ? '#0F172A' : '#FFFFFF',
                                    fontSize: '13px',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                }}
                            />
                            <Search
                                size={16}
                                color="#94A3B8"
                                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }}
                            />
                        </div>

                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            style={{
                                padding: '10px 14px',
                                borderRadius: '12px',
                                backgroundColor: isLight ? '#F8FAFC' : '#040711',
                                border: isLight ? '1px solid #CBD5E1' : '1px solid #1E293B',
                                color: isLight ? '#0F172A' : '#FFFFFF',
                                fontSize: '13px',
                                fontWeight: '700',
                                outline: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            <option value="">جميع الحالات</option>
                            <option value="active">نشط</option>
                            <option value="suspended">معطل / موقف</option>
                        </select>

                        <button
                            type="submit"
                            style={{
                                padding: '10px 20px',
                                borderRadius: '12px',
                                backgroundColor: isLight ? '#0F172A' : '#1E293B',
                                color: '#FFFFFF',
                                border: 'none',
                                fontSize: '13px',
                                fontWeight: '800',
                                cursor: 'pointer',
                            }}
                        >
                            بحث
                        </button>
                    </form>
                </div>

                {/* Supervisors List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {loading && supervisors.length === 0 ? (
                        <div style={{ padding: '60px 0', textAlign: 'center' }}>
                            <RefreshCw className="animate-spin" size={32} color="#D4A537" style={{ margin: '0 auto 12px' }} />
                            <p style={{ color: '#94A3B8' }}>جاري تحميل فريق الإشراف...</p>
                        </div>
                    ) : supervisors.length === 0 ? (
                        <div
                            style={{
                                backgroundColor: isLight ? '#FFFFFF' : '#0B1222',
                                border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                                borderRadius: '20px',
                                padding: '50px 20px',
                                textAlign: 'center',
                            }}
                        >
                            <Shield size={40} color="#64748B" style={{ margin: '0 auto 12px' }} />
                            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800' }}>لا يوجد مشرفين مطابقين للبحث</h3>
                        </div>
                    ) : (
                        supervisors.map((staff) => (
                            <div
                                key={staff.id}
                                style={{
                                    backgroundColor: isLight ? '#FFFFFF' : '#0B1222',
                                    border: isLight ? '1px solid #E2E8F0' : '1px solid #1E293B',
                                    borderRadius: '20px',
                                    padding: '18px 20px',
                                    boxShadow: isLight ? '0 4px 15px rgba(0,0,0,0.02)' : '0 10px 30px rgba(0,0,0,0.3)',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        flexWrap: 'wrap',
                                        gap: '14px',
                                        marginBottom: '14px',
                                    }}
                                >
                                    {/* Staff Profile */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                        <div
                                            style={{
                                                width: '46px',
                                                height: '46px',
                                                borderRadius: '50%',
                                                background: isLight ? '#E2E8F0' : 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                                                color: '#FFFFFF',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: '900',
                                                fontSize: '17px',
                                            }}
                                        >
                                            {staff.name?.charAt(0)?.toUpperCase() || 'S'}
                                        </div>

                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                                    {staff.name}
                                                </h3>
                                                <span
                                                    style={{
                                                        padding: '2px 8px',
                                                        borderRadius: '6px',
                                                        fontSize: '11px',
                                                        fontWeight: '800',
                                                        backgroundColor: 'rgba(56, 189, 248, 0.12)',
                                                        color: '#38BDF8',
                                                        border: '1px solid rgba(56, 189, 248, 0.3)',
                                                    }}
                                                >
                                                    {staff.role_label}
                                                </span>
                                            </div>
                                            <div style={{ fontSize: '12px', color: isLight ? '#64748B' : '#94A3B8', marginTop: '2px', direction: 'ltr', textAlign: 'right' }}>
                                                {staff.email}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Presence & Status */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <span
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                padding: '4px 10px',
                                                borderRadius: '20px',
                                                fontSize: '12px',
                                                fontWeight: '700',
                                                backgroundColor: staff.is_online ? 'rgba(16, 185, 129, 0.12)' : (isLight ? '#F1F5F9' : '#040711'),
                                                color: staff.is_online ? '#10B981' : '#94A3B8',
                                            }}
                                        >
                                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: staff.is_online ? '#10B981' : '#64748B' }} />
                                            <span>{staff.presence}</span>
                                        </span>

                                        <span
                                            style={{
                                                padding: '4px 12px',
                                                borderRadius: '20px',
                                                fontSize: '12px',
                                                fontWeight: '800',
                                                backgroundColor: staff.is_active ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                                color: staff.is_active ? '#10B981' : '#EF4444',
                                                border: `1px solid ${staff.is_active ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                                            }}
                                        >
                                            {staff.is_active ? 'نشط' : 'معطل'}
                                        </span>
                                    </div>
                                </div>

                                {/* Bottom Row: Permissions Count & Actions */}
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        paddingTop: '12px',
                                        borderTop: isLight ? '1px solid #F1F5F9' : '1px solid rgba(255, 255, 255, 0.05)',
                                        flexWrap: 'wrap',
                                        gap: '10px',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Shield size={15} color="#F59E0B" />
                                        <span style={{ fontSize: '13px', fontWeight: '800', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                            {staff.permissions_count || (staff.permissions || []).length} صلاحيات مفعلة (Spatie)
                                        </span>
                                    </div>

                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button
                                            type="button"
                                            onClick={() => openPermissionsModal(staff)}
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                padding: '7px 14px',
                                                borderRadius: '10px',
                                                backgroundColor: 'rgba(245, 158, 11, 0.12)',
                                                border: '1px solid rgba(245, 158, 11, 0.3)',
                                                color: '#F59E0B',
                                                fontSize: '12.5px',
                                                fontWeight: '800',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <Sliders size={14} />
                                            <span>تعديل الصلاحيات والدور</span>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleToggleStatus(staff.id)}
                                            style={{
                                                padding: '7px 12px',
                                                borderRadius: '10px',
                                                backgroundColor: isLight ? '#F1F5F9' : '#040711',
                                                border: isLight ? '1px solid #CBD5E1' : '1px solid #1E293B',
                                                color: staff.is_active ? '#EF4444' : '#10B981',
                                                fontSize: '12px',
                                                fontWeight: '800',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {staff.is_active ? 'تعطيل' : 'تفعيل'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* =================================================================
                MODAL: EDIT PERMISSIONS (Matching media_1793381447815_a4ba1e40.jpg)
               ================================================================= */}
            {isPermModalOpen && activeStaffForPerms && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 9999,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        backdropFilter: 'blur(8px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '16px',
                        direction: 'rtl',
                    }}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setIsPermModalOpen(false);
                    }}
                >
                    <div
                        style={{
                            backgroundColor: isLight ? '#FFFFFF' : '#080E1C',
                            border: isLight ? '1px solid #CBD5E1' : '1.5px solid rgba(56, 189, 248, 0.3)',
                            borderRadius: '24px',
                            width: '100%',
                            maxWidth: '480px',
                            maxHeight: '90vh',
                            overflowY: 'auto',
                            padding: '24px 20px',
                            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
                        }}
                    >
                        {/* Modal Header: Title matching Screenshot */}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: '20px',
                                paddingBottom: '12px',
                                borderBottom: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                            }}
                        >
                            <h2 style={{ fontSize: '19px', fontWeight: '900', margin: 0, color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                صلاحيات {activeStaffForPerms.name}
                            </h2>
                            <button
                                type="button"
                                onClick={() => setIsPermModalOpen(false)}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#94A3B8',
                                    cursor: 'pointer',
                                    padding: '4px',
                                    display: 'flex',
                                }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Spatie Role Selector */}
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: isLight ? '#334155' : '#CBD5E1', marginBottom: '6px' }}>
                                الدور الإداري (Spatie Role)
                            </label>
                            <select
                                value={selectedRoleForPerms}
                                onChange={(e) => handleRoleChangeInEditModal(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '11px 14px',
                                    borderRadius: '12px',
                                    backgroundColor: isLight ? '#F8FAFC' : '#030712',
                                    border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(56, 189, 248, 0.35)',
                                    color: isLight ? '#0F172A' : '#FFFFFF',
                                    fontSize: '13.5px',
                                    fontWeight: '700',
                                    outline: 'none',
                                    cursor: 'pointer',
                                    boxSizing: 'border-box',
                                }}
                            >
                                {availableRoles.map((role) => (
                                    <option key={role.key} value={role.key}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Quick Selection Buttons & Counters */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '12px' }}>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                    type="button"
                                    onClick={() => setSelectedPermissions(getAllPermissionKeys())}
                                    style={{
                                        padding: '6px 14px',
                                        borderRadius: '8px',
                                        backgroundColor: 'rgba(16, 185, 129, 0.12)',
                                        border: '1px solid rgba(16, 185, 129, 0.3)',
                                        color: '#10B981',
                                        fontSize: '12px',
                                        fontWeight: '800',
                                        cursor: 'pointer',
                                    }}
                                >
                                    تحديد الكل ({getAllPermissionKeys().length})
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setSelectedPermissions([])}
                                    style={{
                                        padding: '6px 14px',
                                        borderRadius: '8px',
                                        backgroundColor: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
                                        border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.1)',
                                        color: isLight ? '#64748B' : '#94A3B8',
                                        fontSize: '12px',
                                        fontWeight: '800',
                                        cursor: 'pointer',
                                    }}
                                >
                                    إلغاء التحديد
                                </button>
                            </div>
                            <span style={{ fontSize: '12.5px', fontWeight: '800', color: '#38BDF8' }}>
                                {selectedPermissions.length} من {getAllPermissionKeys().length} محددة
                            </span>
                        </div>

                        {/* Search Filter Inside Permissions Modal */}
                        <div style={{ position: 'relative', marginBottom: '16px' }}>
                            <input
                                type="text"
                                value={editPermSearch}
                                onChange={(e) => setEditPermSearch(e.target.value)}
                                placeholder="بحث سريع في الصلاحيات..."
                                style={{
                                    width: '100%',
                                    padding: '9px 36px 9px 14px',
                                    borderRadius: '12px',
                                    backgroundColor: isLight ? '#F8FAFC' : '#040711',
                                    border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(56, 189, 248, 0.25)',
                                    color: isLight ? '#0F172A' : '#FFFFFF',
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                }}
                            />
                            <Search
                                size={16}
                                style={{
                                    position: 'absolute',
                                    right: '12px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: '#94A3B8',
                                }}
                            />
                        </div>

                        <form onSubmit={handleSavePermissions}>
                            {/* Grouped Permission Cards matching uploaded screenshot with scroll & per-group actions */}
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '14px',
                                    marginBottom: '20px',
                                    maxHeight: '440px',
                                    overflowY: 'auto',
                                    paddingLeft: '4px',
                                    paddingRight: '2px',
                                }}
                            >
                                {Object.entries(permissionGroups).map(([groupKey, group]) => {
                                    const filteredPerms = group.permissions.filter((perm) => {
                                        if (!editPermSearch) return true;
                                        const q = editPermSearch.toLowerCase();
                                        return (
                                            perm.label.toLowerCase().includes(q) ||
                                            perm.key.toLowerCase().includes(q) ||
                                            (perm.desc && perm.desc.toLowerCase().includes(q)) ||
                                            group.title.toLowerCase().includes(q)
                                        );
                                    });

                                    if (filteredPerms.length === 0 && editPermSearch) return null;

                                    const groupKeys = group.permissions.map((p) => p.key);
                                    const selectedCountInGroup = groupKeys.filter((k) => selectedPermissions.includes(k)).length;
                                    const isAllGroupSelected = groupKeys.length > 0 && selectedCountInGroup === groupKeys.length;

                                    return (
                                        <div
                                            key={groupKey}
                                            style={{
                                                backgroundColor: isLight ? '#F8FAFC' : '#040711',
                                                border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(56, 189, 248, 0.25)',
                                                borderRadius: '18px',
                                                padding: '16px',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    marginBottom: '12px',
                                                    paddingBottom: '8px',
                                                    borderBottom: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.06)',
                                                }}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <span
                                                        style={{
                                                            fontSize: '14px',
                                                            fontWeight: '900',
                                                            color: isLight ? '#0F172A' : '#FFFFFF',
                                                        }}
                                                    >
                                                        {group.title}
                                                    </span>
                                                    <span
                                                        style={{
                                                            fontSize: '11px',
                                                            fontWeight: '800',
                                                            padding: '2px 8px',
                                                            borderRadius: '20px',
                                                            backgroundColor: selectedCountInGroup > 0 ? 'rgba(56, 189, 248, 0.15)' : 'rgba(148, 163, 184, 0.1)',
                                                            color: selectedCountInGroup > 0 ? '#38BDF8' : '#94A3B8',
                                                        }}
                                                    >
                                                        {selectedCountInGroup} / {groupKeys.length}
                                                    </span>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => toggleGroupInEdit(group.permissions)}
                                                    style={{
                                                        background: 'transparent',
                                                        border: 'none',
                                                        color: isAllGroupSelected ? '#EF4444' : '#38BDF8',
                                                        fontSize: '12px',
                                                        fontWeight: '800',
                                                        cursor: 'pointer',
                                                        padding: '2px 6px',
                                                    }}
                                                >
                                                    {isAllGroupSelected ? 'إلغاء القسم' : 'تحديد القسم'}
                                                </button>
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                {filteredPerms.map((perm) => {
                                                    const isChecked = selectedPermissions.includes(perm.key);
                                                    return (
                                                        <div
                                                            key={perm.key}
                                                            onClick={() => togglePermission(perm.key)}
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'space-between',
                                                                padding: '11px 16px',
                                                                borderRadius: '14px',
                                                                backgroundColor: isLight ? '#FFFFFF' : '#0B1528',
                                                                border: isChecked
                                                                    ? '1.5px solid #38BDF8'
                                                                    : isLight
                                                                    ? '1px solid #CBD5E1'
                                                                    : '1px solid rgba(255, 255, 255, 0.1)',
                                                                cursor: 'pointer',
                                                                transition: 'all 0.15s ease',
                                                            }}
                                                        >
                                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                                                <span
                                                                    style={{
                                                                        fontSize: '13.5px',
                                                                        fontWeight: '800',
                                                                        color: isChecked ? '#38BDF8' : isLight ? '#1E293B' : '#E2E8F0',
                                                                    }}
                                                                >
                                                                    {perm.label}
                                                                </span>
                                                                {perm.desc && (
                                                                    <span style={{ fontSize: '11px', color: isLight ? '#64748B' : '#94A3B8' }}>
                                                                        {perm.desc}
                                                                    </span>
                                                                )}
                                                            </div>

                                                            <input
                                                                type="checkbox"
                                                                checked={isChecked}
                                                                onChange={() => {}} // Controlled by outer div onClick
                                                                style={{
                                                                    width: '18px',
                                                                    height: '18px',
                                                                    accentColor: '#38BDF8',
                                                                    cursor: 'pointer',
                                                                    flexShrink: 0,
                                                                }}
                                                            />
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Buttons matching Screenshot media_1793381447815_a4ba1e40.jpg */}
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button
                                    type="submit"
                                    disabled={permSubmitting}
                                    style={{
                                        flex: 1,
                                        padding: '12px 20px',
                                        borderRadius: '14px',
                                        background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                                        color: '#FFFFFF',
                                        fontWeight: '800',
                                        fontSize: '14px',
                                        border: 'none',
                                        cursor: permSubmitting ? 'not-allowed' : 'pointer',
                                        boxShadow: '0 4px 15px rgba(217, 119, 6, 0.4)',
                                    }}
                                >
                                    {permSubmitting ? 'جاري الحفظ...' : 'حفظ الصلاحيات'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsPermModalOpen(false)}
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

            {/* =================================================================
                MODAL: ADD SUPERVISOR (With Spatie Role & Grouped Permissions)
               ================================================================= */}
            {isAddModalOpen && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 9999,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        backdropFilter: 'blur(8px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '16px',
                        direction: 'rtl',
                    }}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setIsAddModalOpen(false);
                    }}
                >
                    <div
                        style={{
                            backgroundColor: isLight ? '#FFFFFF' : '#080E1C',
                            border: isLight ? '1px solid #CBD5E1' : '1.5px solid rgba(56, 189, 248, 0.3)',
                            borderRadius: '24px',
                            width: '100%',
                            maxWidth: '520px',
                            maxHeight: '90vh',
                            overflowY: 'auto',
                            padding: '24px 20px',
                            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: '20px',
                                paddingBottom: '12px',
                                borderBottom: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                            }}
                        >
                            <h3 style={{ fontSize: '18px', fontWeight: '900', margin: 0, color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                إضافة مشرف جديد بنظام الأدوار والصلاحيات (Spatie)
                            </h3>
                            <button
                                type="button"
                                onClick={() => setIsAddModalOpen(false)}
                                style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleAddStaffSubmit}>
                            <div style={{ marginBottom: '14px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', marginBottom: '6px', color: isLight ? '#334155' : '#CBD5E1' }}>
                                    اسم المشرف <span style={{ color: '#EF4444' }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="مثال: أحمد مصطفى"
                                    value={staffName}
                                    onChange={(e) => setStaffName(e.target.value)}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '11px 16px',
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

                            <div style={{ marginBottom: '14px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', marginBottom: '6px', color: isLight ? '#334155' : '#CBD5E1' }}>
                                    البريد الإلكتروني <span style={{ color: '#EF4444' }}>*</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="supervisor@mohra-sand.store"
                                    value={staffEmail}
                                    onChange={(e) => setStaffEmail(e.target.value)}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '11px 16px',
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

                            <div style={{ marginBottom: '14px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', marginBottom: '6px', color: isLight ? '#334155' : '#CBD5E1' }}>
                                    رقم الهاتف (اختياري)
                                </label>
                                <input
                                    type="text"
                                    placeholder="مثال: 01012345678"
                                    value={staffPhone}
                                    onChange={(e) => setStaffPhone(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '11px 16px',
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

                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', marginBottom: '6px', color: isLight ? '#334155' : '#CBD5E1' }}>
                                    كلمة المرور <span style={{ color: '#EF4444' }}>*</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={staffPassword}
                                    onChange={(e) => setStaffPassword(e.target.value)}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '11px 16px',
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

                            {/* Spatie Role Selection */}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', marginBottom: '6px', color: '#F59E0B' }}>
                                    الدور الإداري (Spatie Role) <span style={{ color: '#EF4444' }}>*</span>
                                </label>
                                <select
                                    value={staffRole}
                                    onChange={(e) => handleRoleChangeInAddModal(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '12px 14px',
                                        borderRadius: '12px',
                                        backgroundColor: isLight ? '#F8FAFC' : '#040711',
                                        border: '1.5px solid #F59E0B',
                                        color: isLight ? '#0F172A' : '#FFFFFF',
                                        fontSize: '14px',
                                        fontWeight: '800',
                                        outline: 'none',
                                        cursor: 'pointer',
                                        boxSizing: 'border-box',
                                        marginBottom: '6px',
                                    }}
                                >
                                    {availableRoles.map((role) => (
                                        <option key={role.key} value={role.key}>
                                            {role.name}
                                        </option>
                                    ))}
                                </select>
                                <span style={{ fontSize: '12px', color: '#94A3B8' }}>
                                    {availableRoles.find((r) => r.key === staffRole)?.desc}
                                </span>
                            </div>

                            {/* Custom Permissions Checklist for New Staff */}
                            <div style={{ marginBottom: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <label style={{ fontSize: '13.5px', fontWeight: '800', color: isLight ? '#0F172A' : '#FFFFFF', margin: 0 }}>
                                        تخصيص الصلاحيات الممنوحة
                                    </label>
                                    <span style={{ fontSize: '12px', color: '#38BDF8', fontWeight: '800' }}>
                                        {staffPermissions.length} من {getAllPermissionKeys().length} محددة
                                    </span>
                                </div>

                                {/* Quick selection in Add Modal */}
                                <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                                    <button
                                        type="button"
                                        onClick={() => setStaffPermissions(getAllPermissionKeys())}
                                        style={{
                                            padding: '5px 12px',
                                            borderRadius: '8px',
                                            backgroundColor: 'rgba(16, 185, 129, 0.12)',
                                            border: '1px solid rgba(16, 185, 129, 0.3)',
                                            color: '#10B981',
                                            fontSize: '11.5px',
                                            fontWeight: '800',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        تحديد الكل ({getAllPermissionKeys().length})
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setStaffPermissions([])}
                                        style={{
                                            padding: '5px 12px',
                                            borderRadius: '8px',
                                            backgroundColor: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
                                            border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.1)',
                                            color: isLight ? '#64748B' : '#94A3B8',
                                            fontSize: '11.5px',
                                            fontWeight: '800',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        إلغاء التحديد
                                    </button>
                                </div>

                                {/* Search in Add Modal */}
                                <div style={{ position: 'relative', marginBottom: '12px' }}>
                                    <input
                                        type="text"
                                        value={addPermSearch}
                                        onChange={(e) => setAddPermSearch(e.target.value)}
                                        placeholder="بحث سريع في الصلاحيات..."
                                        style={{
                                            width: '100%',
                                            padding: '8px 34px 8px 12px',
                                            borderRadius: '10px',
                                            backgroundColor: isLight ? '#F8FAFC' : '#040711',
                                            border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(56, 189, 248, 0.25)',
                                            color: isLight ? '#0F172A' : '#FFFFFF',
                                            fontSize: '12.5px',
                                            fontWeight: '600',
                                            outline: 'none',
                                            boxSizing: 'border-box',
                                        }}
                                    />
                                    <Search
                                        size={15}
                                        style={{
                                            position: 'absolute',
                                            right: '10px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            color: '#94A3B8',
                                        }}
                                    />
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '320px', overflowY: 'auto', paddingRight: '4px' }}>
                                    {Object.entries(permissionGroups).map(([groupKey, group]) => {
                                        const filteredPerms = group.permissions.filter((perm) => {
                                            if (!addPermSearch) return true;
                                            const q = addPermSearch.toLowerCase();
                                            return (
                                                perm.label.toLowerCase().includes(q) ||
                                                perm.key.toLowerCase().includes(q) ||
                                                (perm.desc && perm.desc.toLowerCase().includes(q)) ||
                                                group.title.toLowerCase().includes(q)
                                            );
                                        });

                                        if (filteredPerms.length === 0 && addPermSearch) return null;

                                        const groupKeys = group.permissions.map((p) => p.key);
                                        const selectedCountInGroup = groupKeys.filter((k) => staffPermissions.includes(k)).length;
                                        const isAllGroupSelected = groupKeys.length > 0 && selectedCountInGroup === groupKeys.length;

                                        return (
                                            <div
                                                key={groupKey}
                                                style={{
                                                    backgroundColor: isLight ? '#F8FAFC' : '#040711',
                                                    border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(56, 189, 248, 0.2)',
                                                    borderRadius: '16px',
                                                    padding: '14px',
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        marginBottom: '10px',
                                                        paddingBottom: '6px',
                                                        borderBottom: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.06)',
                                                    }}
                                                >
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <span style={{ fontSize: '13px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                                            {group.title}
                                                        </span>
                                                        <span
                                                            style={{
                                                                fontSize: '11px',
                                                                fontWeight: '800',
                                                                padding: '1px 7px',
                                                                borderRadius: '20px',
                                                                backgroundColor: selectedCountInGroup > 0 ? 'rgba(56, 189, 248, 0.15)' : 'rgba(148, 163, 184, 0.1)',
                                                                color: selectedCountInGroup > 0 ? '#38BDF8' : '#94A3B8',
                                                            }}
                                                        >
                                                            {selectedCountInGroup} / {groupKeys.length}
                                                        </span>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() => toggleGroupInAdd(group.permissions)}
                                                        style={{
                                                            background: 'transparent',
                                                            border: 'none',
                                                            color: isAllGroupSelected ? '#EF4444' : '#38BDF8',
                                                            fontSize: '11.5px',
                                                            fontWeight: '800',
                                                            cursor: 'pointer',
                                                            padding: '2px 4px',
                                                        }}
                                                    >
                                                        {isAllGroupSelected ? 'إلغاء القسم' : 'تحديد القسم'}
                                                    </button>
                                                </div>

                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                                    {filteredPerms.map((perm) => {
                                                        const isChecked = staffPermissions.includes(perm.key);
                                                        return (
                                                            <div
                                                                key={perm.key}
                                                                onClick={() => toggleAddPermission(perm.key)}
                                                                style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'space-between',
                                                                    padding: '9px 12px',
                                                                    borderRadius: '10px',
                                                                    backgroundColor: isLight ? '#FFFFFF' : '#0B1528',
                                                                    border: isChecked
                                                                        ? '1px solid #38BDF8'
                                                                        : isLight
                                                                        ? '1px solid #CBD5E1'
                                                                        : '1px solid rgba(255, 255, 255, 0.08)',
                                                                    cursor: 'pointer',
                                                                    transition: 'all 0.15s ease',
                                                                }}
                                                            >
                                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                                                    <span style={{ fontSize: '12.5px', fontWeight: '700', color: isChecked ? '#38BDF8' : isLight ? '#1E293B' : '#CBD5E1' }}>
                                                                        {perm.label}
                                                                    </span>
                                                                    {perm.desc && (
                                                                        <span style={{ fontSize: '10.5px', color: isLight ? '#64748B' : '#94A3B8' }}>
                                                                            {perm.desc}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={isChecked}
                                                                    onChange={() => {}}
                                                                    style={{ width: '16px', height: '16px', accentColor: '#38BDF8', cursor: 'pointer', flexShrink: 0 }}
                                                                />
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button
                                    type="submit"
                                    disabled={addSubmitting}
                                    style={{
                                        flex: 1,
                                        padding: '12px 20px',
                                        borderRadius: '14px',
                                        background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                                        color: '#FFFFFF',
                                        fontWeight: '800',
                                        fontSize: '14px',
                                        border: 'none',
                                        cursor: addSubmitting ? 'not-allowed' : 'pointer',
                                        boxShadow: '0 4px 15px rgba(217, 119, 6, 0.4)',
                                    }}
                                >
                                    {addSubmitting ? 'جاري الإضافة...' : 'إضافة المشرف وحفظ الصلاحيات'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
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
        </div>
    );
}
