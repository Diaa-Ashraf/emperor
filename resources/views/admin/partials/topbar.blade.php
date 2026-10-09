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

        <!-- Notifications / Pending Alerts Dropdown -->
        @php
            $dismissedAt = session('admin_alerts_dismissed_at');
            $pendingOrdersQuery = \App\Models\Order::whereIn('status', ['pending', 'processing', 'manual_review']);
            $pendingDepositsQuery = \App\Models\DepositRequest::where('status', 'pending');
            $pendingTargetsQuery = \App\Models\TargetSellOrder::where('status', 'pending');
            $pendingApiRequestsQuery = \App\Models\User::where('api_access_status', 'pending');

            if ($dismissedAt) {
                $pendingOrdersCount = (clone $pendingOrdersQuery)->where('created_at', '>', $dismissedAt)->count();
                $pendingDepositsCount = (clone $pendingDepositsQuery)->where('created_at', '>', $dismissedAt)->count();
                $pendingTargetsCount = (clone $pendingTargetsQuery)->where('created_at', '>', $dismissedAt)->count();
                $pendingApiRequestsCount = (clone $pendingApiRequestsQuery)->where('api_access_requested_at', '>', $dismissedAt)->count();
            } else {
                $pendingOrdersCount = $pendingOrdersQuery->count();
                $pendingDepositsCount = $pendingDepositsQuery->count();
                $pendingTargetsCount = $pendingTargetsQuery->count();
                $pendingApiRequestsCount = $pendingApiRequestsQuery->count();
            }

            $adminUnreadNotifs = auth()->check() ? \Illuminate\Support\Facades\DB::table('notifications')->where('notifiable_id', auth()->id())->whereNull('read_at')->count() : 0;
            $adminRecentNotifs = auth()->check() ? \Illuminate\Support\Facades\DB::table('notifications')->where('notifiable_id', auth()->id())->whereNull('read_at')->latest('created_at')->limit(3)->get() : collect();
            $totalAlertsCount = $pendingOrdersCount + $pendingDepositsCount + $pendingTargetsCount + $pendingApiRequestsCount + $adminUnreadNotifs;
        @endphp
        <div class="dropdown" id="adminNotifDropdownContainer">
            <button class="btn btn-dark-outline p-2 position-relative dropdown-toggle d-flex align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false" title="التنبيهات والطلبات المعلقة">
                <i class="ti ti-bell fs-5 {{ $totalAlertsCount > 0 ? 'text-gold' : 'text-muted' }}" id="adminBellIcon"></i>
                @if($totalAlertsCount > 0)
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="adminNotifBadge" style="font-size: 10px; padding: 3px 6px;">
                        {{ $totalAlertsCount }}
                    </span>
                @endif
            </button>
            <ul class="dropdown-menu dropdown-menu-end shadow-lg border-secondary py-0" style="min-width: 330px; background: #12131a;">
                <li class="px-3 py-2 border-bottom border-dark d-flex justify-content-between align-items-center">
                    <span class="fw-bold text-white fs-7">التنبيهات والإشعارات</span>
                    @if($totalAlertsCount > 0)
                        <button type="button" class="btn btn-link text-gold p-0 fs-8 text-decoration-none d-flex align-items-center gap-1" onclick="markAllAdminNotificationsRead(event)" title="قراءة وتصفير العداد">
                            <i class="ti ti-checks"></i>
                            <span>تحديد الكل كمقروء</span>
                        </button>
                    @else
                        <span class="badge bg-secondary text-light fs-8">لا توجد تنبيهات جديدة</span>
                    @endif
                </li>

                @if($pendingApiRequestsCount > 0)
                    <li>
                        <a class="dropdown-item d-flex align-items-center justify-content-between py-2 border-bottom border-dark" href="{{ route('admin.api-clients.index') }}">
                            <div class="d-flex align-items-center gap-2">
                                <div class="rounded-circle bg-warning bg-opacity-10 p-2 text-warning">
                                    <i class="ti ti-api-app fs-6"></i>
                                </div>
                                <div>
                                    <div class="text-white fs-7 fw-semibold">طلبات تفعيل ربط (B2B API)</div>
                                    <small class="text-muted">بانتظار موافقة الإدارة والتفعيل</small>
                                </div>
                            </div>
                            <span class="badge bg-warning text-dark">{{ $pendingApiRequestsCount }}</span>
                        </a>
                    </li>
                @endif

                @if($pendingOrdersCount > 0)
                    <li>
                        <a class="dropdown-item d-flex align-items-center justify-content-between py-2 border-bottom border-dark" href="{{ route('admin.orders.index') }}">
                            <div class="d-flex align-items-center gap-2">
                                <div class="rounded-circle bg-warning bg-opacity-10 p-2 text-warning">
                                    <i class="ti ti-shopping-cart fs-6"></i>
                                </div>
                                <div>
                                    <div class="text-white fs-7 fw-semibold">طلبات شحن بانتظار التنفيذ</div>
                                    <small class="text-muted">تحتاج معالجة فورية</small>
                                </div>
                            </div>
                            <span class="badge bg-warning text-dark">{{ $pendingOrdersCount }}</span>
                        </a>
                    </li>
                @endif

                @if($pendingDepositsCount > 0)
                    <li>
                        <a class="dropdown-item d-flex align-items-center justify-content-between py-2 border-bottom border-dark" href="{{ route('admin.deposits.index') }}">
                            <div class="d-flex align-items-center gap-2">
                                <div class="rounded-circle bg-info bg-opacity-10 p-2 text-info">
                                    <i class="ti ti-wallet fs-6"></i>
                                </div>
                                <div>
                                    <div class="text-white fs-7 fw-semibold">إيداعات تحتاج مراجعة</div>
                                    <small class="text-muted">تأكيد تحويلات العملاء</small>
                                </div>
                            </div>
                            <span class="badge bg-info text-dark">{{ $pendingDepositsCount }}</span>
                        </a>
                    </li>
                @endif

                @if($pendingTargetsCount > 0)
                    <li>
                        <a class="dropdown-item d-flex align-items-center justify-content-between py-2 border-bottom border-dark" href="{{ route('admin.targets.index') }}">
                            <div class="d-flex align-items-center gap-2">
                                <div class="rounded-circle bg-danger bg-opacity-10 p-2 text-danger">
                                    <i class="ti ti-target-arrow fs-6"></i>
                                </div>
                                <div>
                                    <div class="text-white fs-7 fw-semibold">طلبات سحب تارجت</div>
                                    <small class="text-muted">تسييل رواتب معلق</small>
                                </div>
                            </div>
                            <span class="badge bg-danger text-white">{{ $pendingTargetsCount }}</span>
                        </a>
                    </li>
                @endif

                @foreach($adminRecentNotifs as $notif)
                    @php
                        $notifData = is_array($notif->data) ? $notif->data : (json_decode($notif->data ?? '', true) ?? []);
                        $notifLink = $notifData['link'] ?? route('admin.notifications.index');
                        $notifTitle = $notifData['title'] ?? 'إشعار جديد';
                        $notifBody = $notifData['body'] ?? '';
                    @endphp
                    <li>
                        <a class="dropdown-item d-flex align-items-center justify-content-between py-2 border-bottom border-dark" href="{{ $notifLink }}">
                            <div class="d-flex align-items-center gap-2 min-w-0">
                                <div class="rounded-circle bg-primary bg-opacity-10 p-2 text-primary flex-shrink-0">
                                    <i class="ti ti-bell-ringing fs-6"></i>
                                </div>
                                <div class="text-truncate">
                                    <div class="text-white fs-7 fw-semibold text-truncate">{{ $notifTitle }}</div>
                                    <small class="text-muted text-truncate d-block">{{ Str::limit($notifBody, 35) }}</small>
                                </div>
                            </div>
                            <span class="badge bg-secondary text-light fs-8">{{ \Carbon\Carbon::parse($notif->created_at)->diffForHumans() }}</span>
                        </a>
                    </li>
                @endforeach

                @if($totalAlertsCount === 0)
                    <li class="text-center py-4 text-muted">
                        <i class="ti ti-bell-off fs-4 d-block mb-1 text-secondary"></i>
                        <small>لا توجد طلبات معلقة حالياً</small>
                    </li>
                @endif

                <li class="p-2 border-top border-dark text-center">
                    <a href="{{ route('admin.notifications.index') }}" class="btn btn-sm btn-dark-outline w-100 fs-7 text-gold d-flex align-items-center justify-content-center gap-1">
                        <i class="ti ti-send"></i>
                        مركز إرسال الإشعارات
                    </a>
                </li>
            </ul>
        </div>

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

<script>
function markAllAdminNotificationsRead(event) {
    if (event) event.preventDefault();
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    
    // Instantly hide badge in UI
    const badge = document.getElementById('adminNotifBadge');
    if (badge) badge.style.display = 'none';
    const bellIcon = document.getElementById('adminBellIcon');
    if (bellIcon) {
        bellIcon.classList.remove('text-gold');
        bellIcon.classList.add('text-muted');
    }

    fetch("{{ route('admin.notifications.mark-all-read') }}", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": token || "",
            "Accept": "application/json"
        },
        body: JSON.stringify({})
    }).then(res => res.json()).then(data => {
        // Updated successfully
    }).catch(err => {
        console.error("Failed to mark notifications read:", err);
    });
}
</script>
