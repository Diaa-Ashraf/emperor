@extends('layouts.admin')

@section('title', 'مركز الإشعارات والتعميمات')

@section('content')
<div class="row g-4">
    <!-- Send Notification Form -->
    <div class="col-lg-5">
        <div class="card border-0 shadow-sm" style="background: var(--bg-card, #12131a); border-radius: 16px;">
            <div class="card-header bg-transparent border-bottom border-secondary py-3">
                <h5 class="card-title fw-bold mb-0 text-white d-flex align-items-center gap-2">
                    <i class="ti ti-bell-ringing text-gold fs-4"></i>
                    إرسال إشعار فوري وتعميم
                </h5>
                <small class="text-muted">إرسال إشعارات منبثقة ورسائل فورية للمستخدمين</small>
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

                <form action="{{ route('admin.notifications.send') }}" method="POST">
                    @csrf

                    <!-- Target Audience -->
                    <div class="mb-3">
                        <label class="form-label text-white fw-semibold">الجمهور المستهدف</label>
                        <div class="d-flex gap-3">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="target" id="targetAll" value="all" checked onchange="toggleUserSelect(false)">
                                <label class="form-check-label text-white" for="targetAll">
                                    جميع المستخدمين ({{ number_format($totalUsers) }})
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="target" id="targetSpecific" value="specific" onchange="toggleUserSelect(true)">
                                <label class="form-check-label text-white" for="targetSpecific">
                                    مستخدم محدد
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- User Select (if specific) -->
                    <div class="mb-3 d-none" id="userSelectWrapper">
                        <label for="user_id" class="form-label text-white fw-semibold">اختر المستخدم</label>
                        <select name="user_id" id="user_id" class="form-select bg-dark text-white border-secondary">
                            <option value="">-- اختر المستخدم --</option>
                            @foreach(\App\Models\User::orderBy('name')->take(100)->get() as $u)
                                <option value="{{ $u->id }}">{{ $u->name }} ({{ $u->phone ?? $u->email }})</option>
                            @endforeach
                        </select>
                    </div>

                    <!-- Title -->
                    <div class="mb-3">
                        <label for="title" class="form-label text-white fw-semibold">عنوان الإشعار <span class="text-danger">*</span></label>
                        <input type="text" class="form-control bg-dark text-white border-secondary" id="title" name="title" placeholder="مثال: خصم خاص 20% على شحن ببجي!" value="{{ old('title') }}" required>
                    </div>

                    <!-- Body -->
                    <div class="mb-3">
                        <label for="body" class="form-label text-white fw-semibold">نص الرسالة <span class="text-danger">*</span></label>
                        <textarea class="form-control bg-dark text-white border-secondary" id="body" name="body" rows="4" placeholder="اكتب تفاصيل الإشعار هنا..." required>{{ old('body') }}</textarea>
                    </div>

                    <!-- Link -->
                    <div class="mb-3">
                        <label for="link" class="form-label text-white fw-semibold">الرابط التوجيهي (اختياري)</label>
                        <input type="text" class="form-control bg-dark text-white border-secondary" id="link" name="link" placeholder="مثال: /category/games أو /target/apps" value="{{ old('link') }}">
                    </div>

                    <!-- Submit -->
                    <button type="submit" class="btn btn-warning w-100 py-2 fw-bold text-dark d-flex align-items-center justify-content-center gap-2">
                        <i class="ti ti-send fs-5"></i>
                        إرسال الإشعار الآن
                    </button>
                </form>
            </div>
        </div>
    </div>

    <!-- Notification Log / History -->
    <div class="col-lg-7">
        <div class="card border-0 shadow-sm" style="background: var(--bg-card, #12131a); border-radius: 16px;">
            <div class="card-header bg-transparent border-bottom border-secondary py-3 d-flex justify-content-between align-items-center">
                <h5 class="card-title fw-bold mb-0 text-white d-flex align-items-center gap-2">
                    <i class="ti ti-history text-gold fs-4"></i>
                    سجل الإشعارات المرسلة
                </h5>
                <div class="d-flex align-items-center gap-2">
                    <form action="{{ route('admin.notifications.mark-all-read') }}" method="POST" class="d-inline">
                        @csrf
                        <button type="submit" class="btn btn-sm btn-outline-warning d-flex align-items-center gap-1">
                            <i class="ti ti-checks"></i>
                            <span>تحديد الكل كمقروء</span>
                        </button>
                    </form>
                    <span class="badge bg-dark text-muted border border-secondary">{{ $notifications->total() }} إشعار</span>
                </div>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead class="table-dark">
                            <tr>
                                <th class="ps-3">المستلم</th>
                                <th>العنوان والمحتوى</th>
                                <th>النوع</th>
                                <th>التاريخ</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse($notifications as $notif)
                                @php
                                    $data = json_decode($notif->data, true) ?? [];
                                    $recipient = \App\Models\User::find($notif->notifiable_id);
                                @endphp
                                <tr>
                                    <td class="ps-3">
                                        @if($recipient)
                                            <div class="fw-bold text-white fs-7">{{ $recipient->name }}</div>
                                            <small class="text-muted">{{ $recipient->phone ?? $recipient->email }}</small>
                                        @else
                                            <span class="text-muted">مستخدم #{{ $notif->notifiable_id }}</span>
                                        @endif
                                    </td>
                                    <td>
                                        <div class="text-gold fw-semibold fs-7">{{ $data['title'] ?? 'إشعار' }}</div>
                                        <small class="text-secondary d-block" style="max-width: 280px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                            {{ $data['body'] ?? '' }}
                                        </small>
                                    </td>
                                    <td>
                                        <span class="badge bg-secondary text-light font-monospace" style="font-size: 11px;">
                                            {{ $notif->type }}
                                        </span>
                                    </td>
                                    <td class="text-muted fs-7">
                                        {{ \Carbon\Carbon::parse($notif->created_at)->diffForHumans() }}
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="4" class="text-center py-5 text-muted">
                                        <i class="ti ti-bell-off fs-1 d-block mb-2 text-secondary"></i>
                                        لا توجد إشعارات مسجلة حتى الآن
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
function toggleUserSelect(show) {
    const wrapper = document.getElementById('userSelectWrapper');
    if (show) {
        wrapper.classList.remove('d-none');
    } else {
        wrapper.classList.add('d-none');
    }
}
</script>
@endsection
