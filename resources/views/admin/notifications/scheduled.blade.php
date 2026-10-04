@extends('layouts.admin')

@section('title', 'حملات التسويق والإشعارات الذكية')

@section('content')
<div class="row g-4">
    <!-- Create Campaign Form -->
    <div class="col-lg-5">
        <div class="card border-0 shadow-sm" style="background: var(--bg-card, #12131a); border-radius: 16px;">
            <div class="card-header bg-transparent border-bottom border-secondary py-3">
                <h5 class="card-title fw-bold mb-0 text-white d-flex align-items-center gap-2">
                    <i class="ti ti-speakerphone text-gold fs-4"></i>
                    إنشاء حملة تسويق / إشعار ذكي
                </h5>
                <small class="text-muted">استهداف شرائح المستخدمين وجدولة الإشعارات الفورية</small>
            </div>
            <div class="card-body p-4">
                @if(session('success'))
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <i class="ti ti-check me-1"></i> {{ session('success') }}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                @endif

                @if($errors->any())
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <ul class="mb-0 ps-3">
                            @foreach($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                @endif

                <form action="{{ route('admin.notifications.scheduled.store') }}" method="POST">
                    @csrf

                    <!-- Target Audience -->
                    <div class="mb-3">
                        <label class="form-label text-white fw-semibold">الشريحة المستهدفة</label>
                        <select name="target_audience" class="form-select bg-dark text-white border-secondary" id="audienceSelect" onchange="handleAudienceChange(this.value)" required>
                            <option value="all">📢 جميع المستخدمين المسجلين</option>
                            <option value="inactive_users">💤 المستخدمون الخاملون (لم يطلبوا منذ 7 أيام)</option>
                            <option value="active_users">⚡ المستخدمون النشطون (طلبوا خلال 30 يوم)</option>
                            <option value="with_balance">💰 مستخدمون لديهم رصيد في المحفظة (> 10 جنيه)</option>
                            <option value="specific_users">🎯 مستخدمون محددون</option>
                        </select>
                    </div>

                    <!-- Specific Users Multi-Select (Hidden by default) -->
                    <div class="mb-3 d-none" id="specificUsersWrapper">
                        <div class="d-flex align-items-center justify-content-between mb-2">
                            <label class="form-label text-white fw-bold mb-0">
                                <i class="ti ti-users text-warning me-1"></i> اختر المستخدمين المستهدفين
                            </label>
                            <span class="badge bg-warning text-dark fw-bold px-2 py-1" id="selectedUsersCount">0 مستخدم محدد</span>
                        </div>

                        <!-- Search & Quick Selection Controls -->
                        <div class="input-group input-group-sm mb-2">
                            <span class="input-group-text bg-black border-secondary text-muted"><i class="ti ti-search"></i></span>
                            <input type="text" id="userSearchInput" class="form-control bg-black border-secondary text-white" placeholder="ابحث بالاسم، الهاتف، أو البريد..." oninput="filterUsersList(this.value)">
                            <button type="button" class="btn btn-outline-warning btn-sm" onclick="toggleSelectAllUsers(true)" title="تحديد جميع الظاهرين">تحديد الكل</button>
                            <button type="button" class="btn btn-outline-secondary btn-sm" onclick="toggleSelectAllUsers(false)" title="إلغاء التحديد">إلغاء</button>
                        </div>

                        <!-- Scrollable Sleek User Cards List -->
                        <div class="border border-secondary rounded p-2 bg-black" style="max-height: 220px; overflow-y: auto;">
                            <div id="usersChecklistContainer" class="d-flex flex-column gap-1">
                                @forelse($users as $u)
                                    <label class="user-check-item d-flex align-items-center justify-content-between p-2 rounded transition-all" 
                                           id="user-item-{{ $u->id }}"
                                           style="cursor: pointer; border: 1px solid rgba(255,255,255,0.06); background: #161722; user-select: none;"
                                           data-search="{{ mb_strtolower($u->name . ' ' . $u->phone . ' ' . $u->email) }}">
                                        <div class="d-flex align-items-center gap-2 overflow-hidden">
                                            <div class="avatar-xs bg-dark text-warning rounded-circle d-flex align-items-center justify-content-center fw-bold border border-secondary flex-shrink-0" style="width: 32px; height: 32px; font-size: 13px;">
                                                {{ mb_substr($u->name, 0, 1) }}
                                            </div>
                                            <div class="text-truncate">
                                                <div class="text-white fw-semibold fs-7 text-truncate">{{ $u->name }}</div>
                                                <small class="text-muted font-monospace" style="font-size: 11px;">{{ $u->phone ?: ($u->email ?: 'ID #' . $u->id) }}</small>
                                            </div>
                                        </div>
                                        <div class="form-check m-0 ms-2">
                                            <input class="form-check-input user-checkbox" type="checkbox" name="target_user_ids[]" value="{{ $u->id }}" onchange="onUserCheckChange(this)">
                                        </div>
                                    </label>
                                @empty
                                    <div class="text-center py-3 text-muted small">لا يوجد مستخدمين مسجلين</div>
                                @endforelse
                            </div>
                            <div id="noUsersFound" class="text-center py-3 text-muted d-none small">
                                <i class="ti ti-user-x me-1"></i> لا يوجد مستخدمين يطابقون كلمة البحث
                            </div>
                        </div>
                    </div>

                    <!-- Notification Type -->
                    <div class="mb-3">
                        <label class="form-label text-white fw-semibold">نوع الإرسال</label>
                        <select name="type" class="form-select bg-dark text-white border-secondary" required>
                            <option value="both">🔔 داخل التطبيق + إشعار Push على الهاتف (FCM)</option>
                            <option value="push">📱 إشعار هاتف فقط (Push Notification)</option>
                            <option value="in_app">📥 إشعار داخل التطبيق فقط</option>
                        </select>
                    </div>

                    <!-- Title -->
                    <div class="mb-3">
                        <label class="form-label text-white fw-semibold">عنوان الإشعار <span class="text-danger">*</span></label>
                        <input type="text" name="title" class="form-control bg-dark text-white border-secondary" placeholder="مثال: 🔥 عروض الجمعة: خصم 15% على شحن ببجي وفري فاير!" required>
                    </div>

                    <!-- Body -->
                    <div class="mb-3">
                        <label class="form-label text-white fw-semibold">نص الإشعار <span class="text-danger">*</span></label>
                        <textarea name="body" rows="3" class="form-control bg-dark text-white border-secondary" placeholder="اكتب نص الرسالة التسويقية الجذابة هنا..." required></textarea>
                    </div>

                    <!-- Action Link & Image -->
                    <div class="row g-2 mb-3">
                        <div class="col-md-6">
                            <label class="form-label text-white fw-semibold">رابط التحويل (Link)</label>
                            <input type="text" name="action_url" class="form-control bg-dark text-white border-secondary" placeholder="/games أو /wallet">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-white fw-semibold">رابط صورة (اختياري)</label>
                            <input type="text" name="image_url" class="form-control bg-dark text-white border-secondary" placeholder="https://...">
                        </div>
                    </div>

                    <!-- Schedule Mode -->
                    <div class="mb-4">
                        <label class="form-label text-white fw-semibold">توقيت الإرسال</label>
                        <div class="d-flex gap-3 mb-2">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="send_mode" id="sendNow" value="now" checked onchange="toggleSchedule(false)">
                                <label class="form-check-label text-white" for="sendNow">
                                    إرسال فوري الآن ⚡
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="send_mode" id="sendSchedule" value="schedule" onchange="toggleSchedule(true)">
                                <label class="form-check-label text-white" for="sendSchedule">
                                    جدولة لموعد لاحق ⏰
                                </label>
                            </div>
                        </div>

                        <div class="d-none mt-2" id="scheduleInputWrapper">
                            <input type="datetime-local" name="scheduled_at" class="form-control bg-dark text-white border-secondary">
                        </div>
                    </div>

                    <!-- Submit Button -->
                    <button type="submit" class="btn btn-warning w-100 py-2 fw-bold text-dark d-flex align-items-center justify-content-center gap-2">
                        <i class="ti ti-send fs-5"></i>
                        تنفيذ الحملة
                    </button>
                </form>
            </div>
        </div>
    </div>

    <!-- Campaigns List -->
    <div class="col-lg-7">
        <div class="card border-0 shadow-sm" style="background: var(--bg-card, #12131a); border-radius: 16px;">
            <div class="card-header bg-transparent border-bottom border-secondary py-3 d-flex justify-content-between align-items-center">
                <h5 class="card-title fw-bold mb-0 text-white d-flex align-items-center gap-2">
                    <i class="ti ti-calendar-event text-gold fs-4"></i>
                    سجل الحملات والإشعارات المجدولة
                </h5>
                <span class="badge bg-dark text-gold border border-gold">{{ $notifications->total() }} حملة</span>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead class="table-dark">
                            <tr>
                                <th class="ps-3">العنوان والشريحة</th>
                                <th>الحالة / الوصول</th>
                                <th>الموعد</th>
                                <th class="text-end pe-3">إجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse($notifications as $item)
                                <tr>
                                    <td class="ps-3">
                                        <div class="fw-bold text-white fs-7">{{ $item->title }}</div>
                                        <small class="text-secondary d-block" style="max-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                            {{ $item->body }}
                                        </small>
                                        <span class="badge bg-secondary font-monospace mt-1" style="font-size: 10px;">
                                            {{ $item->target_audience }}
                                        </span>
                                    </td>
                                    <td>
                                        @if($item->sent_at)
                                            <span class="badge bg-success d-inline-flex align-items-center gap-1">
                                                <i class="ti ti-check"></i> تم الإرسال ({{ $item->sent_count }} مستخدم)
                                            </span>
                                            <small class="d-block text-muted">{{ $item->sent_at->diffForHumans() }}</small>
                                        @else
                                            <span class="badge bg-warning text-dark d-inline-flex align-items-center gap-1">
                                                <i class="ti ti-clock"></i> مجدول
                                            </span>
                                        @endif
                                    </td>
                                    <td>
                                        <small class="text-muted">
                                            {{ $item->scheduled_at ? $item->scheduled_at->format('Y-m-d H:i') : 'فوري' }}
                                        </small>
                                    </td>
                                    <td class="text-end pe-3">
                                        <div class="d-flex align-items-center justify-content-end gap-2">
                                            @if(!$item->sent_at)
                                                <form action="{{ route('admin.notifications.scheduled.send-now', $item->id) }}" method="POST">
                                                    @csrf
                                                    <button type="submit" class="btn btn-sm btn-outline-warning" title="إرسال الآن">
                                                        <i class="ti ti-send"></i> إرسال الآن
                                                    </button>
                                                </form>
                                            @endif
                                            <form action="{{ route('admin.notifications.scheduled.destroy', $item->id) }}" method="POST" onsubmit="return confirm('هل أنت متأكد من حذف هذه الحملة؟')">
                                                @csrf
                                                @method('DELETE')
                                                <button type="submit" class="btn btn-sm btn-outline-danger" title="حذف">
                                                    <i class="ti ti-trash"></i>
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="4" class="text-center py-5 text-muted">
                                        لا توجد حملات تسويقية مسجلة حتى الآن
                                    </td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>
            @if($notifications->hasPages())
                <div class="card-footer bg-transparent border-top border-secondary py-3">
                    {{ $notifications->links() }}
                </div>
            @endif
        </div>
    </div>
</div>

<script>
function handleAudienceChange(value) {
    const wrapper = document.getElementById('specificUsersWrapper');
    if (value === 'specific_users') {
        wrapper.classList.remove('d-none');
    } else {
        wrapper.classList.add('d-none');
    }
}

function toggleSchedule(show) {
    const wrapper = document.getElementById('scheduleInputWrapper');
    if (show) {
        wrapper.classList.remove('d-none');
    } else {
        wrapper.classList.add('d-none');
    }
}

function onUserCheckChange(checkbox) {
    const parentLabel = checkbox.closest('.user-check-item');
    if (checkbox.checked) {
        parentLabel.style.borderColor = 'rgba(212, 165, 55, 0.4)';
        parentLabel.style.background = '#212230';
    } else {
        parentLabel.style.borderColor = 'rgba(255, 255, 255, 0.06)';
        parentLabel.style.background = '#161722';
    }
    updateSelectedUsersCount();
}

function updateSelectedUsersCount() {
    const checked = document.querySelectorAll('.user-checkbox:checked').length;
    const badge = document.getElementById('selectedUsersCount');
    if (badge) {
        badge.innerText = `${checked} مستخدم محدد`;
    }
}

function filterUsersList(keyword) {
    const query = keyword.trim().toLowerCase();
    const items = document.querySelectorAll('.user-check-item');
    let visibleCount = 0;

    items.forEach(item => {
        const searchData = item.getAttribute('data-search') || '';
        if (!query || searchData.includes(query)) {
            item.classList.remove('d-none');
            visibleCount++;
        } else {
            item.classList.add('d-none');
        }
    });

    const noFoundEl = document.getElementById('noUsersFound');
    if (noFoundEl) {
        if (visibleCount === 0) {
            noFoundEl.classList.remove('d-none');
        } else {
            noFoundEl.classList.add('d-none');
        }
    }
}

function toggleSelectAllUsers(selectAll) {
    const visibleItems = document.querySelectorAll('.user-check-item:not(.d-none) .user-checkbox');
    visibleItems.forEach(cb => {
        cb.checked = selectAll;
        onUserCheckChange(cb);
    });
    updateSelectedUsersCount();
}
</script>
@endsection
