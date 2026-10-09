<aside class="sidebar" id="sidebar">
    @php
        $sidebarLogo = \App\Models\Setting::get('site_logo') ? asset(\App\Models\Setting::get('site_logo')) : asset('images/logo.png');
        $rawSiteName = \App\Models\Setting::get('site_name', 'EMPEROR');
        // Extract clean short brand name for sidebar to prevent multi-line overflow
        $sidebarSiteName = trim(explode('|', $rawSiteName)[0] ?? 'EMPEROR');
        if (mb_strlen($sidebarSiteName) > 16) {
            $sidebarSiteName = mb_substr($sidebarSiteName, 0, 16);
        }
    @endphp
    <!-- Brand Logo Area -->
    <div class="logo-area">
        <a href="{{ route('admin.dashboard') }}" class="d-flex align-items-center gap-2 text-decoration-none min-w-0 flex-grow-1 overflow-hidden">
            <div class="logo-icon-wrap flex-shrink-0 d-flex align-items-center justify-content-center">
                <img src="{{ $sidebarLogo }}" alt="Logo">
            </div>
            <div class="logo-text d-flex flex-column min-w-0 flex-grow-1 overflow-hidden">
                <span class="fw-bold fs-6 text-white tracking-wide text-truncate" title="{{ $rawSiteName }}">{{ $sidebarSiteName }}</span>
                <span class="text-gold text-truncate" style="font-size: 11px; margin-top: -2px; font-weight: 600;">لوحة الإدارة</span>
            </div>
        </a>
        <button type="button" class="btn btn-sm btn-dark-outline d-lg-none p-1 ms-auto flex-shrink-0" id="sidebarCloseBtn" title="إغلاق القائمة">
            <i class="ti ti-x fs-5"></i>
        </button>
    </div>

    <!-- Navigation List -->
    <div class="py-2">
        <div class="nav-section-title">الرئيسية</div>
        <a href="{{ route('admin.dashboard') }}" class="nav-link {{ request()->routeIs('admin.dashboard') ? 'active' : '' }}">
            <i class="ti ti-layout-dashboard"></i>
            <span class="nav-text">لوحة التحكم</span>
        </a>
        <a href="{{ route('admin.reports.index') }}" class="nav-link {{ request()->routeIs('admin.reports.*') ? 'active' : '' }}">
            <i class="ti ti-chart-pie"></i>
            <span class="nav-text">التقارير والإحصائيات</span>
            <span class="badge rounded-pill bg-warning text-dark ms-auto font-monospace" style="font-size: 10px;">PRO</span>
        </a>

        <div class="nav-section-title">المتجر والمنتجات</div>
        <a href="{{ route('admin.categories.index') }}" class="nav-link {{ request()->routeIs('admin.categories.*') ? 'active' : '' }}">
            <i class="ti ti-category"></i>
            <span class="nav-text">الأقسام والفئات</span>
        </a>
        <a href="{{ route('admin.products.index') }}" class="nav-link {{ request()->routeIs('admin.products.*') ? 'active' : '' }}">
            <i class="ti ti-device-gamepad-2"></i>
            <span class="nav-text">المنتجات والباقات</span>
        </a>
        <a href="{{ route('admin.vouchers.index') }}" class="nav-link {{ request()->routeIs('admin.vouchers.*') ? 'active' : '' }}">
            <i class="ti ti-ticket"></i>
            <span class="nav-text">مخزون الأكواد الرقمية</span>
        </a>
        <a href="{{ route('admin.pricing.index') }}" class="nav-link {{ request()->routeIs('admin.pricing.*') ? 'active' : '' }}">
            <i class="ti ti-coin"></i>
            <span class="nav-text">قواعد وهوامش التسعير</span>
        </a>

        <div class="nav-section-title">إدارة الطلبات والعمليات</div>
        <a href="{{ route('admin.orders.index') }}" class="nav-link {{ request()->routeIs('admin.orders.*') ? 'active' : '' }}">
            <i class="ti ti-shopping-cart"></i>
            <span class="nav-text">طلبات الشحن</span>
            @php $pendingOrders = \App\Models\Order::whereIn('status', ['pending', 'processing', 'manual_review'])->count(); @endphp
            @if($pendingOrders > 0)
                <span class="badge rounded-pill bg-warning text-dark ms-auto">{{ $pendingOrders }}</span>
            @endif
        </a>
        <a href="{{ route('admin.targets.index') }}" class="nav-link {{ request()->routeIs('admin.targets.*') ? 'active' : '' }}">
            <i class="ti ti-target-arrow"></i>
            <span class="nav-text">بيع التارجت</span>
            @php $pendingTargets = \App\Models\TargetSellOrder::where('status', 'pending')->count(); @endphp
            @if($pendingTargets > 0)
                <span class="badge rounded-pill bg-danger text-white ms-auto">{{ $pendingTargets }}</span>
            @endif
        </a>

        <div class="nav-section-title">المحفظة والمالية</div>
        <a href="{{ route('admin.deposits.index') }}" class="nav-link {{ request()->routeIs('admin.deposits.*') ? 'active' : '' }}">
            <i class="ti ti-wallet"></i>
            <span class="nav-text">طلبات الإيداع</span>
            @php $pendingDeposits = \App\Models\DepositRequest::where('status', 'pending')->count(); @endphp
            @if($pendingDeposits > 0)
                <span class="badge rounded-pill bg-warning text-dark ms-auto">{{ $pendingDeposits }}</span>
            @endif
        </a>
        <a href="{{ route('admin.payment-methods.index') }}" class="nav-link {{ request()->routeIs('admin.payment-methods.*') ? 'active' : '' }}">
            <i class="ti ti-credit-card"></i>
            <span class="nav-text">طرق الدفع وبطاقات التحويل</span>
        </a>
        <a href="{{ route('admin.exchange-rates.index') }}" class="nav-link {{ request()->routeIs('admin.exchange-rates.*') ? 'active' : '' }}">
            <i class="ti ti-arrows-exchange"></i>
            <span class="nav-text">أسعار الصرف (العملات)</span>
        </a>

        <div class="nav-section-title">المزودين والمصادر</div>
        <a href="{{ route('admin.providers.index') }}" class="nav-link {{ request()->routeIs('admin.providers.*') ? 'active' : '' }}">
            <i class="ti ti-server"></i>
            <span class="nav-text">مزودي الخدمة (API)</span>
        </a>
        <a href="{{ route('admin.catalog-sources.index') }}" class="nav-link {{ request()->routeIs('admin.catalog-sources.*') ? 'active' : '' }}">
            <i class="ti ti-refresh"></i>
            <span class="nav-text">مصادر مزامنة الكتالوج</span>
        </a>

        <div class="nav-section-title">المستخدمين والوكلاء والـ API</div>
        <a href="{{ route('admin.users.index') }}" class="nav-link {{ request()->routeIs('admin.users.*') ? 'active' : '' }}">
            <i class="ti ti-users"></i>
            <span class="nav-text">إدارة المستخدمين</span>
        </a>
        <a href="{{ route('admin.api-clients.index') }}" class="nav-link {{ request()->routeIs('admin.api-clients.*') ? 'active' : '' }}">
            <i class="ti ti-api-app"></i>
            <span class="nav-text">عملاء الـ API (الموزعين)</span>
            @php $apiClientsCount = \App\Models\User::where('role', \App\Enums\UserRole::API_CLIENT)->count(); @endphp
            @if($apiClientsCount > 0)
                <span class="badge rounded-pill bg-warning text-dark ms-auto font-monospace">{{ $apiClientsCount }}</span>
            @endif
        </a>
        <a href="{{ route('admin.referrals.index') }}" class="nav-link {{ request()->routeIs('admin.referrals.*') ? 'active' : '' }}">
            <i class="ti ti-users-group"></i>
            <span class="nav-text">الإحالات والتسويق</span>
        </a>

        <div class="nav-section-title">المشرفين والصلاحيات (Spatie)</div>
        <a href="{{ route('admin.admins.index') }}" class="nav-link {{ request()->routeIs('admin.admins.*') ? 'active' : '' }}">
            <i class="ti ti-user-shield"></i>
            <span class="nav-text">طاقم المشرفين والمدراء</span>
            @php $adminsCount = \App\Models\User::where('role', \App\Enums\UserRole::ADMIN)->count(); @endphp
            @if($adminsCount > 0)
                <span class="badge rounded-pill bg-info text-white ms-auto font-monospace">{{ $adminsCount }}</span>
            @endif
        </a>
        <a href="{{ route('admin.roles.index') }}" class="nav-link {{ request()->routeIs('admin.roles.*') ? 'active' : '' }}">
            <i class="ti ti-shield-lock"></i>
            <span class="nav-text">الأدوار والصلاحيات</span>
        </a>

        <div class="nav-section-title">إعدادات المنصة والتسويق</div>
        <a href="{{ route('admin.notifications.scheduled.index') }}" class="nav-link {{ request()->routeIs('admin.notifications.scheduled.*') ? 'active' : '' }}">
            <i class="ti ti-speakerphone"></i>
            <span class="nav-text">الحملات والتسويق الذكي</span>
        </a>
        <a href="{{ route('admin.notifications.index') }}" class="nav-link {{ request()->routeIs('admin.notifications.index') ? 'active' : '' }}">
            <i class="ti ti-bell-ringing"></i>
            <span class="nav-text">مركز الإشعارات والتعميمات</span>
        </a>
        <a href="{{ route('admin.banners.index') }}" class="nav-link {{ request()->routeIs('admin.banners.*') ? 'active' : '' }}">
            <i class="ti ti-photo"></i>
            <span class="nav-text">البانرات والإعلانات</span>
        </a>
        <a href="{{ route('admin.support-contacts.index') }}" class="nav-link {{ request()->routeIs('admin.support-contacts.*') ? 'active' : '' }}">
            <i class="ti ti-headset"></i>
            <span class="nav-text">قنوات الدعم الفني</span>
        </a>
        <a href="{{ route('admin.settings.index') }}" class="nav-link {{ request()->routeIs('admin.settings.*') ? 'active' : '' }}">
            <i class="ti ti-settings"></i>
            <span class="nav-text">الإعدادات العامة</span>
        </a>
        <a href="{{ route('admin.audit-logs.index') }}" class="nav-link {{ request()->routeIs('admin.audit-logs.*') ? 'active' : '' }}">
            <i class="ti ti-history"></i>
            <span class="nav-text">سجل النشاطات (Audit)</span>
        </a>
    </div>
</aside>
