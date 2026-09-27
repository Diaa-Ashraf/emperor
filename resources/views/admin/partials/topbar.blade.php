<header class="topbar d-flex align-items-center justify-content-between px-3 px-lg-4" id="topbar">
    <!-- Left: Collapse & Quick links -->
    <div class="d-flex align-items-center gap-3">
        <!-- Desktop toggle -->
        <button type="button" class="btn btn-dark-outline d-none d-lg-flex p-2" id="toggleBtn" title="طي/فتح القائمة">
            <i class="ti ti-menu-2 fs-5"></i>
        </button>
        <!-- Mobile toggle -->
        <button type="button" class="btn btn-dark-outline d-lg-none p-2" id="mobileBtn" title="فتح القائمة">
            <i class="ti ti-menu-2 fs-5"></i>
        </button>

        <div class="d-none d-md-flex align-items-center gap-2 text-muted fs-6">
            <span class="badge badge-gold">V 1.0.0</span>
            <span class="text-white fw-semibold">منصة إمبراطور</span>
        </div>
    </div>

    <!-- Right: Currency, Language, Notifications, User Profile -->
    <div class="d-flex align-items-center gap-2 gap-md-3">
        <!-- Live Clock / Cairo Time -->
        <div class="d-none d-xl-flex align-items-center gap-1 text-muted fs-7">
            <i class="ti ti-clock text-gold"></i>
            <span>{{ now()->timezone('Africa/Cairo')->format('h:i A') }} (القاهرة)</span>
        </div>

        <!-- Visit Store Link -->
        <a href="{{ url('/') }}" target="_blank" class="btn btn-dark-outline btn-sm d-flex align-items-center gap-1">
            <i class="ti ti-external-link"></i>
            <span class="d-none d-sm-inline">عرض المتجر</span>
        </a>

        <!-- User Profile Dropdown -->
        <div class="dropdown">
            <button class="btn btn-dark-outline d-flex align-items-center gap-2 py-1 px-2 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <div class="rounded-circle bg-gold d-flex align-items-center justify-content-center fw-bold text-dark" style="width: 32px; height: 32px; font-size: 13px;">
                    {{ strtoupper(substr(auth()->user()->name ?? 'A', 0, 1)) }}
                </div>
                <div class="d-none d-md-flex flex-column text-start" style="line-height: 1.2;">
                    <span class="text-white fw-bold fs-7">{{ auth()->user()->name ?? 'المدير' }}</span>
                    <span class="text-gold" style="font-size: 10px;">{{ auth()->user()->role?->label() ?? 'مسؤول' }}</span>
                </div>
            </button>
            <ul class="dropdown-menu dropdown-menu-end shadow-lg border-secondary" style="min-width: 200px;">
                <li class="px-3 py-2 border-bottom border-dark">
                    <div class="text-white fw-semibold">{{ auth()->user()->name ?? 'المدير' }}</div>
                    <div class="text-muted fs-7">{{ auth()->user()->email ?? '' }}</div>
                </li>
                <li>
                    <a class="dropdown-item d-flex align-items-center gap-2 py-2" href="{{ route('profile.edit') }}">
                        <i class="ti ti-user-circle fs-5 text-gold"></i>
                        <span>الملف الشخصي</span>
                    </a>
                </li>
                <li>
                    <a class="dropdown-item d-flex align-items-center gap-2 py-2" href="{{ route('admin.settings.index') }}">
                        <i class="ti ti-settings fs-5 text-gold"></i>
                        <span>إعدادات النظام</span>
                    </a>
                </li>
                <li><hr class="dropdown-divider border-dark my-1"></li>
                <li>
                    <form method="POST" action="{{ route('logout') }}">
                        @csrf
                        <button type="submit" class="dropdown-item text-danger d-flex align-items-center gap-2 py-2">
                            <i class="ti ti-logout fs-5"></i>
                            <span>تسجيل الخروج</span>
                        </button>
                    </form>
                </li>
            </ul>
        </div>
    </div>
</header>
