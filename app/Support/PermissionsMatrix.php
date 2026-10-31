<?php

namespace App\Support;

class PermissionsMatrix
{
    /**
     * All system permissions organized by module with Arabic labels and descriptions.
     * Engineered for enterprise-level financial and operational security.
     */
    public static function all(): array
    {
        return [
            'dashboard' => [
                'name' => 'لوحة التحكم والتقارير المالية',
                'icon' => 'ti-layout-dashboard',
                'permissions' => [
                    'dashboard.view' => [
                        'label' => 'عرض لوحة التحكم الرئيسية',
                        'desc' => 'الاطلاع على الإحصائيات العامة والمؤشرات الحية والرسوم البيانية'
                    ],
                    'reports.view' => [
                        'label' => 'عرض وتحميل التقارير المالية',
                        'desc' => 'استعراض تقارير الأرباح والمبيعات ومعدلات النمو وحركة الأموال'
                    ],
                ]
            ],
            'users' => [
                'name' => 'المستخدمون وإدارة المحافظ',
                'icon' => 'ti-users',
                'permissions' => [
                    'users.view' => [
                        'label' => 'عرض المستخدمين',
                        'desc' => 'تصفح حسابات العملاء وسجلاتهم'
                    ],
                    'users.create' => [
                        'label' => 'إضافة عميل جديد',
                        'desc' => 'إنشاء حساب مستخدم جديد يدوياً من اللوحة'
                    ],
                    'users.edit' => [
                        'label' => 'إدارة المستخدمين',
                        'desc' => 'تعديل بيانات المستخدمين والبريد والهاتف'
                    ],
                    'users.ban' => [
                        'label' => 'حظر وإلغاء حظر الحسابات',
                        'desc' => 'إيقاف الحسابات المخالفة أو إعادة تفعيلها'
                    ],
                    'users.verify' => [
                        'label' => 'تأكيد الحسابات والتوثيق',
                        'desc' => 'اعتماد وتوثيق الحسابات والهويات'
                    ],
                    'users.balance' => [
                        'label' => 'تعديل رصيد المحفظة (شحن / خصم)',
                        'desc' => 'إضافة أو خصم رصيد مالي لحساب العميل مع توثيق السبب'
                    ],
                    'users.api_access' => [
                        'label' => 'منح / سحب صلاحية الربط البرمجي (B2B API)',
                        'desc' => 'تفعيل مفاتيح الـ API للمطورين والموزعين'
                    ],
                    'users.delete' => [
                        'label' => 'حذف وتجميد الحسابات',
                        'desc' => 'حذف الحسابات المعطلة أو تجميدها نهائياً'
                    ],
                ]
            ],
            'orders' => [
                'name' => 'طلبات الشحن والعمليات',
                'icon' => 'ti-shopping-cart',
                'permissions' => [
                    'orders.view' => [
                        'label' => 'عرض الطلبات',
                        'desc' => 'متابعة تدفق طلبات الشحن وحالات التنفيذ'
                    ],
                    'orders.process' => [
                        'label' => 'تأكيد وتنفيذ الطلبات يدوياً',
                        'desc' => 'تنفيذ الطلبات المعلقة وتحديث حالتها إلى مكتملة'
                    ],
                    'orders.refund' => [
                        'label' => 'إلغاء الطلبات واسترجاع المبالغ',
                        'desc' => 'إعادة الأموال إلى محفظة العميل عند فشل الشحن'
                    ],
                    'orders.retry' => [
                        'label' => 'إعادة إرسال الطلب للمزود (Retry API)',
                        'desc' => 'إعادة محاولة تنفيذ الطلب تلقائياً عبر مزود الخدمة'
                    ],
                    'orders.edit' => [
                        'label' => 'تعديل تفاصيل الطلب',
                        'desc' => 'تعديل معرف اللاعب (Player ID) وملاحظات الطلب'
                    ],
                ]
            ],
            'categories' => [
                'name' => 'الأقسام والكتالوج',
                'icon' => 'ti-category',
                'permissions' => [
                    'categories.view' => [
                        'label' => 'عرض الأقسام والكتالوج',
                        'desc' => 'الاطلاع على تصنيفات الألعاب وتطبيقات الشات'
                    ],
                    'categories.create' => [
                        'label' => 'إضافة قسم جديد',
                        'desc' => 'إنشاء تصنيف جديد للألعاب أو البطاقات'
                    ],
                    'categories.edit' => [
                        'label' => 'تعديل وترتيب الأقسام',
                        'desc' => 'تغيير الصور، الأيقونات، ترتيب الظهور، وحالة العرض'
                    ],
                    'categories.delete' => [
                        'label' => 'حذف الأقسام',
                        'desc' => 'حذف الأقسام غير النشطة'
                    ],
                ]
            ],
            'products' => [
                'name' => 'المنتجات والباقات والتسعير',
                'icon' => 'ti-device-gamepad-2',
                'permissions' => [
                    'products.view' => [
                        'label' => 'عرض المنتجات والباقات',
                        'desc' => 'استعراض الألعاب والباقات والأسعار'
                    ],
                    'products.create' => [
                        'label' => 'إضافة منتجات وباقات جديدة',
                        'desc' => 'إضافة لعبة جديدة وتحديد فئات الشحن'
                    ],
                    'products.edit' => [
                        'label' => 'إدارة المنتجات وتعديل الأسعار',
                        'desc' => 'تعديل الأسعار والربط التلقائي وحقول الطلب'
                    ],
                    'products.delete' => [
                        'label' => 'حذف المنتجات والباقات',
                        'desc' => 'حذف المنتجات والباقات من المتجر'
                    ],
                    'pricing.manage' => [
                        'label' => 'إدارة المجموعات والتسعير (Pricing Tiers)',
                        'desc' => 'تحديد نسب الأرباح وهوامش فئات العملاء والموزعين'
                    ],
                    'vouchers.manage' => [
                        'label' => 'إدارة مخزون الأكواد الرقمية (Vouchers)',
                        'desc' => 'رفع وتوليد ومتابعة الأكواد الرقمية وبطاقات الهدايا'
                    ],
                ]
            ],
            'deposits' => [
                'name' => 'الإيداعات والتحويلات المالية',
                'icon' => 'ti-wallet',
                'permissions' => [
                    'deposits.view' => [
                        'label' => 'عرض الإيداعات',
                        'desc' => 'الاطلاع على إيصالات وإشعارات التحويل البنكي وفودافون كاش'
                    ],
                    'deposits.approve' => [
                        'label' => 'تأكيد وقبول الإيداعات',
                        'desc' => 'تأكيد صحة الإيصال وإيداع الرصيد تلقائياً للعميل'
                    ],
                    'deposits.reject' => [
                        'label' => 'رفض الإيداعات غير الصحيحة',
                        'desc' => 'رفض طلبات الإيداع الوهمية أو غير المكتملة مع إرسال السبب'
                    ],
                    'withdrawals.manage' => [
                        'label' => 'إدارة طلبات السحب وصرف الأرباح',
                        'desc' => 'معالجة طلبات تحويل الأرباح للمسوقين والوكلاء'
                    ],
                ]
            ],
            'targets' => [
                'name' => 'بيع التارجت وسحب الكوينز',
                'icon' => 'ti-target-arrow',
                'permissions' => [
                    'targets.view' => [
                        'label' => 'عرض طلبات بيع التارجت',
                        'desc' => 'الاطلاع على طلبات استبدال كوينز البث والصوت'
                    ],
                    'targets.approve' => [
                        'label' => 'الموافقة على بيع التارجت وصرف المبلغ',
                        'desc' => 'تأكيد استلام الكوينز وصرف المبلغ لمحفظة العميل'
                    ],
                    'targets.reject' => [
                        'label' => 'رفض طلبات بيع التارجت',
                        'desc' => 'إلغاء الطلب في حال عدم إتمام تحويل الكوينز'
                    ],
                    'targets.rates' => [
                        'label' => 'تعديل أسعار وتطبيقات التارجت',
                        'desc' => 'تحديث تسعير المليون كوينز لكل تطبيق بث وتفعيل التطبيقات'
                    ],
                ]
            ],
            'providers' => [
                'name' => 'الموردين والربط البرمجي (B2B API)',
                'icon' => 'ti-server',
                'permissions' => [
                    'providers.view' => [
                        'label' => 'عرض الموردين',
                        'desc' => 'الاطلاع على بوابات الربط التلقائي وحساباتها'
                    ],
                    'providers.manage' => [
                        'label' => 'إدارة الموردين والـ API Keys',
                        'desc' => 'ضبط الـ Endpoints ومفاتيح الربط لمزودي الخدمة'
                    ],
                    'providers.sync' => [
                        'label' => 'فحص الرصيد ومزامنة المنتجات',
                        'desc' => 'سحب المنتجات والأسعار تلقائياً وفحص رصيد المنصة لدى المزود'
                    ],
                    'api_clients.manage' => [
                        'label' => 'إدارة عملاء الـ API (الموزعين)',
                        'desc' => 'التحكم في أسعار الموزعين وتوليد الـ Webhooks والـ Keys'
                    ],
                ]
            ],
            'payment_methods' => [
                'name' => 'طرق الدفع وأسعار الصرف',
                'icon' => 'ti-credit-card',
                'permissions' => [
                    'payment_methods.view' => [
                        'label' => 'عرض طرق الدفع',
                        'desc' => 'الاطلاع على وسائل وحسابات الدفع المتاحة'
                    ],
                    'payment_methods.manage' => [
                        'label' => 'إدارة طرق الدفع وحسابات الاستقبال',
                        'desc' => 'تعديل أرقام فودافون كاش، انستاباي، والتحويلات البنكية'
                    ],
                    'exchange_rates.manage' => [
                        'label' => 'إدارة أسعار صرف العملات',
                        'desc' => 'تحديث سعر الدولار والريال مقابل الجنيه المصري'
                    ],
                ]
            ],
            'roles' => [
                'name' => 'إدارة المشرفين والأدوار (Spatie)',
                'icon' => 'ti-shield-lock',
                'permissions' => [
                    'roles.view' => [
                        'label' => 'عرض المشرفين والأدوار',
                        'desc' => 'الاطلاع على قائمة المشرفين والأدوار المربوطة بهم'
                    ],
                    'roles.manage' => [
                        'label' => 'تخصيص وتعديل الصلاحيات',
                        'desc' => 'تحديث مصفوفة الصلاحيات الممنوحة للمشرفين'
                    ],
                    'admins.manage' => [
                        'label' => 'إضافة وإدارة طاقم المشرفين',
                        'desc' => 'إنشاء حسابات المشرفين، تجميدها، وتعيين الأدوار الوظيفية'
                    ],
                    'audit_logs.view' => [
                        'label' => 'مراقبة سجل النشاطات الإدارية (Audit Trail)',
                        'desc' => 'مراقبة كل العمليات والتعديلات التي يقوم بها المشرفون بالتفصيل'
                    ],
                ]
            ],
            'marketing_support' => [
                'name' => 'التسويق والدعم الفني والإشعارات',
                'icon' => 'ti-speakerphone',
                'permissions' => [
                    'banners.manage' => [
                        'label' => 'إدارة البانرات والعروض الترويجية',
                        'desc' => 'إضافة وتعديل صور وشرائح السلايدر الإعلانية'
                    ],
                    'notifications.send' => [
                        'label' => 'إرسال الإشعارات الجماعية',
                        'desc' => 'إرسال إشعارات فورية وتنبيهات لكافة العملاء'
                    ],
                    'referrals.manage' => [
                        'label' => 'إدارة نظام الإحالات ونسب العمولات',
                        'desc' => 'تحديد نسب الأرباح ونظام المسوقين والوكلاء'
                    ],
                    'support.manage' => [
                        'label' => 'إدارة قنوات وتذاكر الدعم والشكاوى',
                        'desc' => 'متابعة رسائل الدعم الفني وأرقام خدمة العملاء'
                    ],
                ]
            ],
            'system' => [
                'name' => 'إعدادات المنصة والأمان',
                'icon' => 'ti-settings',
                'permissions' => [
                    'settings.view' => [
                        'label' => 'عرض إعدادات المنصة',
                        'desc' => 'الاطلاع على بيانات ومعلومات النظام'
                    ],
                    'settings.edit' => [
                        'label' => 'تعديل الإعدادات العامة والأمان',
                        'desc' => 'تغيير اللوجو، الاسم، النصوص، والتكاملات وسياسات المنصة'
                    ],
                ]
            ],
        ];
    }

    /**
     * Get permission groups formatted specifically for UI rendering.
     */
    public static function getUiPermissionGroups(): array
    {
        $formatted = [];
        foreach (self::all() as $moduleKey => $module) {
            $permsList = [];
            foreach ($module['permissions'] as $key => $permData) {
                $permsList[] = [
                    'key' => $key,
                    'label' => $permData['label'],
                    'desc' => $permData['desc'] ?? '',
                ];
            }
            $formatted[$moduleKey] = [
                'title' => $module['name'],
                'icon' => $module['icon'] ?? 'ti-shield',
                'permissions' => $permsList,
            ];
        }
        return $formatted;
    }

    /**
     * Flattened array of all permission keys.
     */
    public static function allPermissionKeys(): array
    {
        $keys = [];
        foreach (self::all() as $group) {
            foreach ($group['permissions'] as $key => $perm) {
                $keys[] = $key;
            }
        }
        return $keys;
    }

    /**
     * System predefined roles and their default assigned permissions.
     */
    public static function defaultRolePermissions(): array
    {
        return [
            'super_admin' => self::allPermissionKeys(),
            'admin' => self::allPermissionKeys(),
            'operations_manager' => [
                'dashboard.view',
                'categories.view', 'categories.create', 'categories.edit',
                'products.view', 'products.create', 'products.edit', 'pricing.manage', 'vouchers.manage',
                'orders.view', 'orders.process', 'orders.refund', 'orders.retry', 'orders.edit',
                'targets.view', 'targets.approve', 'targets.reject', 'targets.rates',
                'providers.view', 'providers.manage', 'providers.sync', 'api_clients.manage',
            ],
            'finance_manager' => [
                'dashboard.view', 'reports.view',
                'users.view', 'users.balance', 'users.verify',
                'deposits.view', 'deposits.approve', 'deposits.reject',
                'withdrawals.manage',
                'payment_methods.view', 'payment_methods.manage', 'exchange_rates.manage',
                'targets.view', 'targets.approve', 'targets.reject',
            ],
            'support_agent' => [
                'dashboard.view',
                'users.view', 'users.verify',
                'orders.view',
                'deposits.view',
                'targets.view',
                'banners.manage',
                'notifications.send',
                'support.manage',
            ],
        ];
    }

    /**
     * System predefined roles labels and metadata.
     */
    public static function rolePresets(): array
    {
        return [
            'super_admin' => [
                'key' => 'super_admin',
                'name' => 'المدير العام (كامل الصلاحيات)',
                'label' => 'المدير العام (Super Admin)',
                'badge' => 'bg-danger text-white',
                'desc' => 'الوصول لكافة أقسام المنصة بدون قيود وصلاحيات مطلقة على العمليات والمالية والمشرفين',
            ],
            'admin' => [
                'key' => 'admin',
                'name' => 'مشرف إداري عام',
                'label' => 'مشرف إداري عام (Admin)',
                'badge' => 'bg-warning text-dark',
                'desc' => 'صلاحيات إدارية متعددة وشاملة حسب التحديد والتخصيص',
            ],
            'operations_manager' => [
                'key' => 'operations_manager',
                'name' => 'مدير العمليات والطلبات',
                'label' => 'مدير العمليات والتنفيذ (Operations)',
                'badge' => 'bg-primary text-white',
                'desc' => 'متابعة الطلبات، التنفيذ، إدارة المنتجات، الأقسام، التارجت، ومزامنة الموردين',
            ],
            'finance_manager' => [
                'key' => 'finance_manager',
                'name' => 'مدير مالي وإيداعات',
                'label' => 'المدير المالي والمحاسبي (Finance)',
                'badge' => 'bg-success text-white',
                'desc' => 'مراجعة وتأكيد الإيداعات، تعديل الأرصدة، السحوبات، طرق الدفع وأسعار الصرف',
            ],
            'support_agent' => [
                'key' => 'support_agent',
                'name' => 'مسؤول دعم فني وخدمة عملاء',
                'label' => 'مسؤول الدعم الفني (Support)',
                'badge' => 'bg-info text-dark',
                'desc' => 'خدمة العملاء، استعراض الطلبات، وتأكيد الحسابات وإرسال الإشعارات',
            ],
        ];
    }
}
