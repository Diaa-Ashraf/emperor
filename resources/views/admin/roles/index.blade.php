@extends('layouts.admin')

@section('title', 'إدارة الأدوار والصلاحيات (Spatie)')

@section('content')
<div class="container-fluid px-0">
    <!-- Header with Stats -->
    <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div>
            <h4 class="fw-bold text-white mb-1">
                <i class="ti ti-shield-lock text-warning me-2"></i> إدارة الأدوار والصلاحيات
            </h4>
            <p class="text-muted mb-0" style="font-size: 13.5px;">
                التحكم في مصفوفة الصلاحيات وتوزيع الرتب والأدوار الإدارية لطاقم العمل والمشرفين
            </p>
        </div>
        <div class="d-flex align-items-center gap-2">
            <a href="{{ route('admin.admins.index') }}" class="btn btn-outline-info">
                <i class="ti ti-users me-1"></i> طاقم المشرفين ({{ \App\Models\User::where('role', \App\Enums\UserRole::ADMIN)->count() }})
            </a>
            <a href="{{ route('admin.roles.create') }}" class="btn btn-primary">
                <i class="ti ti-plus me-1"></i> إنشاء دور جديد
            </a>
        </div>
    </div>

    <!-- Quick Stat Cards -->
    <div class="row g-3 mb-4">
        <div class="col-sm-6 col-xl-3">
            <div class="card border-0 shadow-sm bg-dark-card p-3 rounded-4">
                <div class="d-flex align-items-center justify-content-between">
                    <div>
                        <div class="text-muted small fw-semibold">إجمالي الأدوار</div>
                        <div class="fs-4 fw-bold text-white mt-1">{{ $roles->count() }}</div>
                    </div>
                    <div class="rounded-3 p-3 bg-primary-subtle text-primary">
                        <i class="ti ti-shield-check fs-3"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-6 col-xl-3">
            <div class="col-12 card border-0 shadow-sm bg-dark-card p-3 rounded-4">
                <div class="d-flex align-items-center justify-content-between">
                    <div>
                        <div class="text-muted small fw-semibold">الصلاحيات في المصفوفة</div>
                        <div class="fs-4 fw-bold text-warning mt-1">{{ count(\App\Support\PermissionsMatrix::allPermissionKeys()) }}</div>
                    </div>
                    <div class="rounded-3 p-3 bg-warning-subtle text-warning">
                        <i class="ti ti-key fs-3"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-6 col-xl-3">
            <div class="col-12 card border-0 shadow-sm bg-dark-card p-3 rounded-4">
                <div class="d-flex align-items-center justify-content-between">
                    <div>
                        <div class="text-muted small fw-semibold">الأقسام المحمية</div>
                        <div class="fs-4 fw-bold text-info mt-1">{{ count($matrix) }}</div>
                    </div>
                    <div class="rounded-3 p-3 bg-info-subtle text-info">
                        <i class="ti ti-category fs-3"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-6 col-xl-3">
            <div class="col-12 card border-0 shadow-sm bg-dark-card p-3 rounded-4">
                <div class="d-flex align-items-center justify-content-between">
                    <div>
                        <div class="text-muted small fw-semibold">المشرفين النشطين</div>
                        <div class="fs-4 fw-bold text-success mt-1">{{ \App\Models\User::where('role', \App\Enums\UserRole::ADMIN)->where('status', \App\Enums\UserStatus::ACTIVE)->count() }}</div>
                    </div>
                    <div class="rounded-3 p-3 bg-success-subtle text-success">
                        <i class="ti ti-user-check fs-3"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Roles Grid -->
    <div class="row g-3">
        @foreach($roles as $role)
            @php
                $preset = $rolePresets[$role->name] ?? null;
                $isSystemRole = in_array($role->name, ['super_admin', 'admin', 'customer', 'agent', 'api_client']);
                $permCount = $role->permissions_count;
                $userCount = $role->users_count;
            @endphp
            <div class="col-md-6 col-xl-4">
                <div class="card border-0 shadow-sm bg-dark-card rounded-4 h-100 position-relative overflow-hidden" style="border: 1px solid rgba(255,255,255,0.06) !important;">
                    <div class="card-body p-4 d-flex flex-column justify-content-between">
                        <div>
                            <div class="d-flex align-items-center justify-content-between mb-3">
                                <span class="badge {{ $preset['badge'] ?? 'bg-secondary text-white' }} px-3 py-2 rounded-pill font-monospace" style="font-size: 11.5px;">
                                    {{ $preset['label'] ?? $role->name }}
                                </span>
                                @if($isSystemRole)
                                    <span class="badge bg-dark-subtle text-warning border border-warning-subtle" style="font-size: 10.5px;">
                                        <i class="ti ti-lock me-1"></i> دور نظامي
                                    </span>
                                @else
                                    <span class="badge bg-dark-subtle text-info border border-info-subtle" style="font-size: 10.5px;">
                                        <i class="ti ti-adjustments me-1"></i> دور مخصص
                                    </span>
                                @endif
                            </div>

                            <h5 class="fw-bold text-white mb-2 font-monospace">{{ $role->name }}</h5>
                            <p class="text-muted small mb-3" style="line-height: 1.6; min-height: 42px;">
                                {{ $preset['desc'] ?? 'دور مخصص تم إنشاؤه لإدارة مهام وصلاحيات محددة في لوحة الإدارة.' }}
                            </p>

                            <div class="d-flex align-items-center gap-3 py-3 border-top border-bottom border-dark-subtle mb-3">
                                <div>
                                    <div class="text-muted" style="font-size: 11px;">عدد الصلاحيات</div>
                                    <div class="fw-bold text-warning fs-6">
                                        <i class="ti ti-key me-1"></i> {{ $permCount }} صلاحية
                                    </div>
                                </div>
                                <div class="vr bg-secondary opacity-25"></div>
                                <div>
                                    <div class="text-muted" style="font-size: 11px;">المشرفين المعينين</div>
                                    <div class="fw-bold text-info fs-6">
                                        <i class="ti ti-users me-1"></i> {{ $userCount }} مشرف
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="d-flex align-items-center justify-content-between gap-2 mt-2">
                            <a href="{{ route('admin.roles.edit', $role->id) }}" class="btn btn-sm btn-outline-warning flex-grow-1">
                                <i class="ti ti-edit me-1"></i> تعديل الصلاحيات
                            </a>
                            @if(!$isSystemRole && $userCount === 0)
                                <form action="{{ route('admin.roles.destroy', $role->id) }}" method="POST" onsubmit="return confirm('هل أنت متأكد من حذف هذا الدور المخصص نهائياً؟');">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-sm btn-outline-danger" title="حذف الدور">
                                        <i class="ti ti-trash"></i>
                                    </button>
                                </form>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        @endforeach
    </div>
</div>
@endsection
