@extends('layouts.admin')

@section('title', 'طاقم المشرفين والمدراء')

@section('content')
<div class="container-fluid px-0">
    <!-- Header -->
    <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div>
            <h4 class="fw-bold text-white mb-1">
                <i class="ti ti-users-group text-warning me-2"></i> طاقم المشرفين والمدراء
            </h4>
            <p class="text-muted mb-0" style="font-size: 13.5px;">
                إدارة حسابات المشرفين، توزيع الأدوار والصلاحيات المخصصة لكل موظف
            </p>
        </div>
        <div class="d-flex align-items-center gap-2">
            <a href="{{ route('admin.roles.index') }}" class="btn btn-outline-warning">
                <i class="ti ti-shield-lock me-1"></i> إدارة مصفوفة الأدوار
            </a>
            <a href="{{ route('admin.admins.create') }}" class="btn btn-primary">
                <i class="ti ti-user-plus me-1"></i> إضافة مشرف جديد
            </a>
        </div>
    </div>

    <!-- Filters -->
    <div class="card border-0 shadow-sm bg-dark-card rounded-4 mb-4" style="border: 1px solid rgba(255,255,255,0.06) !important;">
        <div class="card-body p-3">
            <form method="GET" action="{{ route('admin.admins.index') }}" class="row g-2 align-items-center">
                <div class="col-md-5">
                    <div class="input-group">
                        <span class="input-group-text bg-transparent border-dark-subtle text-muted"><i class="ti ti-search"></i></span>
                        <input type="text" name="search" class="form-control border-dark-subtle" placeholder="البحث بالاسم، البريد، أو رقم الهاتف..." value="{{ request('search') }}">
                    </div>
                </div>
                <div class="col-md-3">
                    <select name="role" class="form-select border-dark-subtle">
                        <option value="">-- كافة الأدوار --</option>
                        @foreach($allRoles as $r)
                            @php $preset = $rolePresets[$r->name] ?? null; @endphp
                            <option value="{{ $r->name }}" {{ request('role') === $r->name ? 'selected' : '' }}>
                                {{ $preset['label'] ?? $r->name }}
                            </option>
                        @endforeach
                    </select>
                </div>
                <div class="col-md-2">
                    <select name="status" class="form-select border-dark-subtle">
                        <option value="">-- الحالة --</option>
                        <option value="active" {{ request('status') === 'active' ? 'selected' : '' }}>نشط</option>
                        <option value="banned" {{ request('status') === 'banned' ? 'selected' : '' }}>محظور / معطل</option>
                    </select>
                </div>
                <div class="col-md-2 d-flex gap-2">
                    <button type="submit" class="btn btn-warning flex-grow-1">تصفية</button>
                    @if(request()->anyFilled(['search', 'role', 'status']))
                        <a href="{{ route('admin.admins.index') }}" class="btn btn-outline-secondary" title="إعادة تعيين"><i class="ti ti-refresh"></i></a>
                    @endif
                </div>
            </form>
        </div>
    </div>

    <!-- Admins Table -->
    <div class="card border-0 shadow-sm bg-dark-card rounded-4 overflow-hidden" style="border: 1px solid rgba(255,255,255,0.06) !important;">
        <div class="table-responsive">
            <table class="table table-dark table-hover align-middle mb-0">
                <thead class="table-dark-header">
                    <tr>
                        <th class="ps-4">المشرف / الحساب</th>
                        <th>الدور الإداري (Spatie)</th>
                        <th>الصلاحيات الفعالة</th>
                        <th>الحالة</th>
                        <th>تاريخ الإضافة</th>
                        <th class="text-end pe-4">الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($admins as $admin)
                        @php
                            $role = $admin->roles->first();
                            $preset = $role ? ($rolePresets[$role->name] ?? null) : null;
                            $allPermsCount = $admin->getAllPermissions()->count();
                            $directPermsCount = $admin->permissions->count();
                            $isSuperMain = $admin->email === 'admin@emperor.com';
                        @endphp
                        <tr>
                            <td class="ps-4">
                                <div class="d-flex align-items-center gap-3">
                                    <div class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0" style="width: 42px; height: 42px; background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); border: 1.5px solid rgba(56, 189, 248, 0.4);">
                                        {{ mb_substr($admin->name, 0, 1) }}
                                    </div>
                                    <div>
                                        <div class="fw-bold text-white d-flex align-items-center gap-2">
                                            {{ $admin->name }}
                                            @if($isSuperMain)
                                                <span class="badge bg-warning text-dark font-monospace" style="font-size: 10px;">ROOT ADMIN</span>
                                            @endif
                                        </div>
                                        <div class="text-muted small font-monospace">{{ $admin->email }}</div>
                                        @if($admin->phone)
                                            <div class="text-muted" style="font-size: 11px;">{{ $admin->phone }}</div>
                                        @endif
                                    </div>
                                </div>
                            </td>
                            <td>
                                @if($role)
                                    <span class="badge {{ $preset['badge'] ?? 'bg-secondary text-white' }} px-3 py-2 rounded-pill font-monospace" style="font-size: 11.5px;">
                                        {{ $preset['label'] ?? $role->name }}
                                    </span>
                                @else
                                    <span class="badge bg-secondary text-white">بدون دور محدد</span>
                                @endif
                            </td>
                            <td>
                                <div class="d-flex flex-column gap-1">
                                    <span class="badge bg-dark-subtle text-warning border border-warning-subtle align-self-start font-monospace">
                                        <i class="ti ti-key me-1"></i> {{ $allPermsCount }} صلاحية
                                    </span>
                                    @if($directPermsCount > 0)
                                        <small class="text-info" style="font-size: 10.5px;">
                                            ({{ $directPermsCount }} صلاحية مخصصة مباشرة)
                                        </small>
                                    @endif
                                </div>
                            </td>
                            <td>
                                @if($admin->status === \App\Enums\UserStatus::ACTIVE)
                                    <span class="badge bg-success-subtle text-success border border-success-subtle px-2 py-1">
                                        <i class="ti ti-circle-check me-1"></i> نشط ومفعل
                                    </span>
                                @else
                                    <span class="badge bg-danger-subtle text-danger border border-danger-subtle px-2 py-1">
                                        <i class="ti ti-circle-x me-1"></i> محظور / معطل
                                    </span>
                                @endif
                            </td>
                            <td>
                                <div class="text-muted small">{{ $admin->created_at?->format('Y-m-d') }}</div>
                                <div class="text-muted" style="font-size: 10.5px;">{{ $admin->created_at?->diffForHumans() }}</div>
                            </td>
                            <td class="text-end pe-4">
                                <div class="d-flex align-items-center justify-content-end gap-1">
                                    <a href="{{ route('admin.admins.edit', $admin->id) }}" class="btn btn-sm btn-outline-warning" title="تعديل الحساب والصلاحيات">
                                        <i class="ti ti-edit"></i>
                                    </a>
                                    @if(!$isSuperMain && $admin->id !== auth()->id())
                                        <form action="{{ route('admin.admins.toggle-status', $admin->id) }}" method="POST" class="d-inline">
                                            @csrf
                                            <button type="submit" class="btn btn-sm {{ $admin->status === \App\Enums\UserStatus::ACTIVE ? 'btn-outline-secondary' : 'btn-outline-success' }}" title="{{ $admin->status === \App\Enums\UserStatus::ACTIVE ? 'تعطيل الحساب' : 'تفعيل الحساب' }}">
                                                <i class="ti {{ $admin->status === \App\Enums\UserStatus::ACTIVE ? 'ti-ban' : 'ti-check' }}"></i>
                                            </button>
                                        </form>
                                        <form action="{{ route('admin.admins.destroy', $admin->id) }}" method="POST" class="d-inline" onsubmit="return confirm('هل أنت متأكد من حذف هذا المشرف وسحب كافة صلاحياته؟');">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="btn btn-sm btn-outline-danger" title="حذف المشرف">
                                                <i class="ti ti-trash"></i>
                                            </button>
                                        </form>
                                    @endif
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="6" class="text-center py-5 text-muted">
                                <i class="ti ti-users-off fs-1 d-block mb-2 text-secondary"></i>
                                لم يتم العثور على أي مشرفين يطابقون شروط البحث
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        @if($admins->hasPages())
            <div class="card-footer bg-transparent border-top border-dark-subtle p-3 d-flex justify-content-center">
                {{ $admins->links() }}
            </div>
        @endif
    </div>
</div>
@endsection
