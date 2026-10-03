@extends('layouts.admin')

@section('title', 'إدارة المستخدمين والوكلاء')

@section('header')
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
            <h3 class="fw-black text-white mb-1 d-flex align-items-center gap-2">
                <i class="ti ti-users text-gold"></i>
                <span>إدارة المستخدمين والوكلاء</span>
            </h3>
            <p class="text-muted mb-0 fs-6">قائمة بجميع حسابات العملاء، الوكلاء، ومراجعة الأرصدة والنشاط.</p>
        </div>
        <div class="d-flex align-items-center gap-2">
            <span class="badge badge-gold px-3 py-2 fs-6">
                إجمالي الحسابات: {{ $users->total() }}
            </span>
        </div>
    </div>
@endsection

@section('content')
    <!-- Search & Filter Card -->
    <div class="card p-3 mb-4">
        <form method="GET" action="{{ route('admin.users.index') }}" class="row g-2 align-items-center">
            <div class="col-12 col-md-5">
                <div class="input-group">
                    <span class="input-group-text bg-dark border-secondary text-gold">
                        <i class="ti ti-search"></i>
                    </span>
                    <input type="text" name="search" class="form-control" placeholder="ابحث بالاسم، البريد الإلكتروني، أو رقم الهاتف..." value="{{ request('search') }}">
                </div>
            </div>
            <div class="col-6 col-md-3">
                <select name="role" class="form-select users-filter-select">
                    <option value="">-- كل الرتب / الأدوار --</option>
                    @foreach($roles as $role)
                        <option value="{{ $role->value }}" {{ request('role') === $role->value ? 'selected' : '' }}>
                            {{ $role->label() }}
                        </option>
                    @endforeach
                </select>
            </div>
            <div class="col-6 col-md-2">
                <select name="status" class="form-select users-filter-select">
                    <option value="">-- كل الحالات --</option>
                    @foreach($statuses as $status)
                        <option value="{{ $status->value }}" {{ request('status') === $status->value ? 'selected' : '' }}>
                            {{ $status->label() }}
                        </option>
                    @endforeach
                </select>
            </div>
            <div class="col-12 col-md-2 d-flex gap-2">
                <button type="submit" class="btn btn-primary w-100 fw-bold">
                    <i class="ti ti-filter"></i> تصفية
                </button>
                @if(request()->hasAny(['search', 'role', 'status']))
                    <a href="{{ route('admin.users.index') }}" class="btn btn-dark-outline" title="إعادة تعيين">
                        <i class="ti ti-rotate-clockwise"></i>
                    </a>
                @endif
            </div>
        </form>
    </div>

    <!-- Users Table Card -->
    <div class="card">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>المستخدم</th>
                        <th>رقم الهاتف</th>
                        <th>الرتبة</th>
                        <th>رصيد المحفظة</th>
                        <th>الحالة</th>
                        <th>تاريخ التسجيل</th>
                        <th class="text-center">الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($users as $user)
                        <tr>
                            <td class="text-muted fs-7">{{ $user->id }}</td>
                            <td>
                                <div class="d-flex align-items-center gap-2">
                                    <div class="rounded-circle bg-gold d-flex align-items-center justify-content-center text-dark fw-bold" style="width: 38px; height: 38px; font-size: 14px;">
                                        {{ strtoupper(substr($user->name, 0, 1)) }}
                                    </div>
                                    <div>
                                        <div class="fw-bold text-white">{{ $user->name }}</div>
                                        <div class="text-muted fs-7">{{ $user->email }}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                @if($user->phone)
                                    <span class="font-monospace text-muted">{{ $user->phone }}</span>
                                @else
                                    <span class="text-secondary fs-8">غير محدد</span>
                                @endif
                            </td>
                            <td>
                                @php
                                    $roleBadgeClass = match($user->role->value ?? '') {
                                        'admin' => 'bg-danger-subtle text-danger border-danger',
                                        'agent' => 'bg-warning-subtle text-warning border-warning',
                                        'api_client' => 'bg-info-subtle text-info border-info',
                                        default => 'bg-secondary-subtle text-light border-secondary',
                                    };
                                @endphp
                                <span class="badge {{ $roleBadgeClass }} border">
                                    {{ $user->role?->label() ?? 'عميل' }}
                                </span>
                            </td>
                            <td>
                                <div class="d-flex align-items-baseline gap-1">
                                    <span class="fw-black text-white fs-6">{{ number_format($user->wallet?->balance ?? 0, 2) }}</span>
                                    <span class="text-gold fw-bold fs-8">{{ $user->currency ?? 'EGP' }}</span>
                                </div>
                            </td>
                            <td>
                                <span class="badge bg-{{ $user->status?->color() ?? 'success' }}-subtle text-{{ $user->status?->color() ?? 'success' }} border border-{{ $user->status?->color() ?? 'success' }}">
                                    {{ $user->status?->label() ?? 'نشط' }}
                                </span>
                            </td>
                            <td class="text-muted fs-7">
                                {{ $user->created_at->format('Y-m-d') }}
                            </td>
                            <td class="text-center">
                                <div class="d-flex align-items-center justify-content-center gap-1">
                                    <a href="{{ route('admin.users.show', $user->id) }}" class="btn btn-sm btn-dark-outline" title="عرض الملف والعمليات">
                                        <i class="ti ti-eye"></i>
                                    </a>
                                    
                                    @if(!$user->isAdmin())
                                        <form method="POST" action="{{ route('admin.users.toggle-ban', $user->id) }}" class="d-inline" onsubmit="return confirm('هل أنت متأكد من تغيير حالة هذا الحساب؟')">
                                            @csrf
                                            <button type="submit" class="btn btn-sm {{ $user->status === \App\Enums\UserStatus::BANNED ? 'btn-outline-success' : 'btn-outline-danger' }}" title="{{ $user->status === \App\Enums\UserStatus::BANNED ? 'إلغاء الحظر' : 'حظر الحساب' }}">
                                                <i class="ti {{ $user->status === \App\Enums\UserStatus::BANNED ? 'ti-user-check' : 'ti-user-x' }}"></i>
                                            </button>
                                        </form>
                                    @endif
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="8" class="text-center py-5 text-muted">
                                <i class="ti ti-user-off fs-1 d-block mb-2 text-secondary"></i>
                                <span>لم يتم العثور على أي مستخدمين مطابقين للبحث.</span>
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        @if($users->hasPages())
            <div class="card-footer bg-transparent border-top border-dark p-3">
                {{ $users->links() }}
            </div>
        @endif
    </div>
@endsection
