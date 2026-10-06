<?php

namespace App\Support;

class PermissionsMatrix
{
    /**
     * All system permissions organized by module with Arabic labels and descriptions.
     */
    public static function all(): array
    {
        return [
            'dashboard' => [
                'name' => 'لوحة التحكم والتقارير',
                'icon' => 'ti-layout-dashboard',
                'permissions' => [
                    'dashboard.view' => [
                        'label' => 'عرض لوحة التحكم الرئيسية',
                        'desc' => 'الاطلاع على الإحصائيات العامة والمؤشرات الحية والرسوم البيانية'
                    ],
                    'reports.view' => [
                        'label' => 'عرض وتحميل التقارير المالية',
                        'desc' => 'استعراض تقارير الأرباح والمبيعات ومعدلات النمو'
                    ],
                ]
            ],
            'users' => [
                'name' => 'إدارة المستخدمين والمحافظ',
                'icon' => 'ti-users',
                'permissions' => [
                    'users.view' => [
                        'label' => 'عرض قائمة المستخدمين',
                        'desc' => 'تصفح حسابات العملاء وسجلاتهم'
                    ],
                    'users.create' => [
                        'label' => 'إضافة عميل جديد',
                        'desc' => 'إنشاء حساب مستخدم جديد يدوياً من اللوحة'
                    ],
                    'users.edit' => [
                        'label' => 'تعديل بيانات المستخدمين',
                        'desc' => 'تعديل البريد، الهاتف، ومستوى الثقة'
                    ],
                    'users.ban' => [
                        'label' => 'حظر وإلغاء حظر المستخدمين',
                        'desc' => 'إيقاف الحسابات المخالفة أو إعادة تفعيلها'
                    ],
                    'users.balance' => [
                        'label' => 'تعديل رصيد المحفظة (شحن / خصم يدوياً)',
                        'desc' => 'إضافة أو خصم رصيد مالي لحساب العميل مع توثيق السبب'
                    ],
                    'users.api_access' => [
                        'label' => 'منح / سحب صلاحية الربط البرمجي (B2B API)',
                        'desc' => 'تفعيل مفاتيح الـ API للمطورين والموزعين'
                    ],
                ]
            ],
            'roles' => [
                'name' => 'إدارة المشرفين والأدوار (Spatie)',
                'icon' => 'ti-shield-lock',
                'permissions' => [
                    'roles.view' => [
                        'label' => 'عرض الأدوار والصلاحيات',
                        'desc' => 'الاطلاع على قائمة الأدوار والمشرفين المربوطين بها'
                    ],
                    'roles.create' => [
                        'label' => 'إنشاء دور جديد',
                        'desc' => 'تحديد مسمى وظيفي جديد وربطه بصلاحيات مخصصة'
                    ],
                    'roles.edit' => [
                        'label' => 'تعديل الأدوار والصلاحيات',
                        'desc' => 'تحديث مصفوفة الصلاحيات لأي دور'
                    ],
                    'roles.delete' => [
                        'label' => 'حذف الأدوار',
                        'desc' => 'حذف الأدوار المخصصة غير المستخدمة'
                    ],
                    'admins.manage' => [
                        'label' => 'إدارة طاقم المشرفين والمدراء',
                        'desc' => 'إضافة مشرفين وتعيين الأدوار والصلاحيات المباشرة لهم'
                    ],
                ]
            ],
            'categories' => [
                'name' => 'الأقسام والفئات',
                'icon' => 'ti-category',
                'permissions' => [
                    'categories.view' => [
                        'label' => 'عرض الأقسام والفئات',
                        'desc' => 'الاطلاع على تصنيفات الألعاب وتطبيقات الشات'
                    ],
                    'categories.create' => [
                        'label' => 'إضافة قسم جديد',
                        'desc' => 'إنشاء تصنيف جديد للألعاب أو البطاقات'
                    ],
                    'categories.edit' => [
                        'label' => 'تعديل وتفعيل الأقسام',
                        'desc' => 'تغيير الصور، الأيقونات، وحالة العرض'
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
                        'label' => 'عرض قائمة المنتجات والباقات',
                        'desc' => 'استعراض الألعاب والباقات والأسعار'
                    ],
                    'products.create' => [
                        'label' => 'إضافة منتجات وباقات جديدة',
                        'desc' => 'إضافة لعبة جديدة وتحديد فئات الشحن'
                    ],
                    'products.edit' => [
                        'label' => 'تعديل المنتجات والأسعار وحقول الإدخال',
                        'desc' => 'تعديل الأسعار والربط التلقائي للمنتج'
                    ],
                    'products.delete' => [
                        'label' => 'حذف المنتجات',
                        'desc' => 'حذف المنتجات والباقات من المتجر'
                    ],
                    'pricing.manage' => [
                        'label' => 'إدارة قواعد وهوامش التسعير',
                        'desc' => 'تحديد نسب الأرباح التلقائية وهوامش العملات'
                    ],
                    'vouchers.manage' => [
                        'label' => 'إدارة مخزون الأكواد الرقمية (Vouchers)',
                        'desc' => 'رفع وتوليد ومتابعة الأكواد الرقمية وبطاقات الهدايا'
                    ],
                ]
            ],
            'orders' => [
                'name' => 'طلبات الشحن والعمليات',
                'icon' => 'ti-shopping-cart',
                'permissions' => [
                    'orders.view' => [
                        'label' => 'عرض كافة طلبات الشحن',
                        'desc' => 'متابعة تدفق الطلبات وحالات التنفيذ'
                    ],
                    'orders.process' => [
                        'label' => 'معالجة وتنفيذ الطلبات يدوياً',
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
                        'label' => 'الموافقة على بيع التارجت وتحويل الكاش',
                        'desc' => 'تأكيد استلام الكوينز وصرف المبلغ لمحفظة العميل'
                    ],
                    'targets.reject' => [
                        'label' => 'رفض طلبات بيع التارجت',
                        'desc' => 'إلغاء الطلب في حال عدم إتمام تحويل الكوينز'
                    ],
                    'targets.rates' => [
                        'label' => 'تعديل أسعار وتطبيقات التارجت',
                        'desc' => 'تحديث تسعير المليون كوينز لكل تطبيق بث'
                    ],
                ]
            ],
            'deposits' => [
                'name' => 'الإيداعات والتحويلات المالية',
                'icon' => 'ti-wallet',
                'permissions' => [
                    'deposits.view' => [
                        'label' => 'عرض طلبات الإيداع والمحافظ',
                        'desc' => 'الاطلاع على إيصالات وإشعارات التحويل البنكي وفودافون كاش'
                    ],
                    'deposits.approve' => [
                        'label' => 'الموافقة على الإيداعات وشحن المحفظة',
                        'desc' => 'تأكيد صحة الإيصال وإيداع الرصيد تلقائياً للعميل'
                    ],
                    'deposits.reject' => [
                        'label' => 'رفض الإيداعات غير الصحيحة',
                        'desc' => 'رفض طلبات الإيداع الوهمية أو غير المكتملة'
                    ],
                    'withdrawals.manage' => [
                        'label' => 'إدارة طلبات السحب وصرف الأرباح',
                        'desc' => 'معالجة طلبات تحويل الأرباح للمسوقين والوكلاء'
                    ],
                    'payment_methods.manage' => [
                        'label' => 'إدارة طرق الدفع والحسابات',
                        'desc' => 'تعديل أرقام فودافون كاش، انستاباي، وحسابات الاستقبال'
                    ],
                    'exchange_rates.manage' => [
                        'label' => 'إدارة أسعار صرف العملات',
                        'desc' => 'تحديث سعر الدولار والريال مقابل الجنيه'
                    ],
                ]
            ],
            'providers' => [
                'name' => 'المزودين والمصادر الخارجية (API)',
                'icon' => 'ti-server',
                'permissions' => [
                    'providers.view' => [
                        'label' => 'عرض قائمة المزودين',
                        'desc' => 'الاطلاع على بوابات الربط التلقائي وحساباتها'
                    ],
                    'providers.manage' => [
                        'label' => 'إضافة وتعديل مفاتيح API للمزودين',
                        'desc' => 'ضبط الـ Endpoints و API Keys لمزودي الخدمة'
                    ],
                    'providers.sync' => [
                        'label' => 'مزامنة الكتالوج وفحص الرصيد',
                        'desc' => 'سحب المنتجات والأسعار تلقائياً وفحص رصيد المنصة لدى المزود'
                    ],
                    'api_clients.manage' => [
                        'label' => 'إدارة عملاء الـ API (الموزعين B2B)',
                        'desc' => 'التحكم في أسعار الموزعين وتوليد الـ Webhooks والـ Keys'
                    ],
                ]
            ],
            'marketing_support' => [
                'name' => 'التسويق والإشعارات والدعم الفني',
                'icon' => 'ti-speakerphone',
                'permissions' => [
                    'banners.manage' => [
                        'label' => 'إدارة البانرات والعروض الترويجية',
                        'desc' => 'إضافة وتعديل صور وشرائح السلايدر الإعلانية'
                    ],
                    'notifications.send' => [
                        'label' => 'إرسال الإشعارات والحملات الجماعية',
                        'desc' => 'إرسال إشعارات فورية ومجدولة لكافة العملاء'
                    ],
                    'referrals.manage' => [
                        'label' => 'إدارة نظام الإحالات ونسب العمولات',
                        'desc' => 'تحديد نسب الأرباح ونظام الوكلاء الفرعيين'
                    ],
                    'support.manage' => [
                        'label' => 'إدارة قنوات الدعم والشكاوى',
                        'desc' => 'متابعة رسائل الدعم الفني وأرقام خدمة العملاء'
                    ],
                ]
            ],
            'system' => [
                'name' => 'إعدادات المنصة وسجلات الأمان',
                'icon' => 'ti-settings',
                'permissions' => [
                    'settings.view' => [
                        'label' => 'عرض إعدادات المنصة',
                        'desc' => 'الاطلاع على بيانات ومعلومات النظام'
                    ],
                    'settings.edit' => [
                        'label' => 'تعديل الإعدادات العامة وبيانات الموقع',
                        'desc' => 'تغيير اللوجو، الاسم، النصوص، والتكاملات'
                    ],
                    'audit_logs.view' => [
                        'label' => 'عرض سجل النشاطات الإدارية (Audit Trail)',
                        'desc' => 'مراقبة كل العمليات والتعديلات التي يقوم بها المشرفون'
                    ],
                ]
            ],
        ];
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
                'categories.view', 'categories.create', 'categories.edit', 'categories.delete',
                'products.view', 'products.create', 'products.edit', 'products.delete', 'pricing.manage', 'vouchers.manage',
                'orders.view', 'orders.process', 'orders.refund', 'orders.retry',
                'targets.view', 'targets.approve', 'targets.reject', 'targets.rates',
                'providers.view', 'providers.manage', 'providers.sync', 'api_clients.manage',
            ],
            'finance_manager' => [
                'dashboard.view', 'reports.view',
                'users.view', 'users.balance',
                'deposits.view', 'deposits.approve', 'deposits.reject',
                'withdrawals.manage', 'payment_methods.manage', 'exchange_rates.manage',
                'targets.view', 'targets.approve', 'targets.reject',
            ],
            'support_agent' => [
                'dashboard.view',
                'users.view',
                'orders.view',
                'targets.view',
                'deposits.view',
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
                'name' => 'super_admin',
                'label' => 'المدير العام (Super Admin)',
                'badge' => 'bg-danger text-white',
                'desc' => 'صلاحيات مطلقة وكاملة لكافة أقسام النظام وقواعد البيانات والمشرفين',
            ],
            'operations_manager' => [
                'name' => 'operations_manager',
                'label' => 'مدير العمليات والتنفيذ (Operations)',
                'badge' => 'bg-primary text-white',
                'desc' => 'إدارة المنتجات، الأقسام، معالجة طلبات الشحن، والتارجت والمزودين',
            ],
            'finance_manager' => [
                'name' => 'finance_manager',
                'label' => 'المدير المالي والمحاسبي (Finance)',
                'badge' => 'bg-success text-white',
                'desc' => 'مراجعة الإيداعات والسحوبات، تعديل الأرصدة، وأسعار صرف العملات والتقارير',
            ],
            'support_agent' => [
                'name' => 'support_agent',
                'label' => 'مسؤول خدمة العملاء والدعم (Support)',
                'badge' => 'bg-info text-dark',
                'desc' => 'متابعة شكاوى المستخدمين، استعراض الطلبات، وإرسال الإشعارات وحملات التسويق',
            ],
            'custom' => [
                'name' => 'custom',
                'label' => 'دور مخصص (Custom Role)',
                'badge' => 'bg-secondary text-white',
                'desc' => 'صلاحيات مخصصة يتم تحديدها يدوياً بدقة لهذا الحساب',
            ],
        ];
    }
}
