@extends('layouts.admin')

@section('title', 'تعديل حساب المشرف والصلاحيات - ' . $admin->name)

@section('content')
<div class="container-fluid px-0">
    <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div>
            <h4 class="fw-bold text-white mb-1">
                <i class="ti ti-edit text-warning me-2"></i> تعديل المشرف: <span class="text-warning">{{ $admin->name }}</span>
            </h4>
            <p class="text-muted mb-0" style="font-size: 13.5px;">
                تعديل بيانات الحساب، الدور الوظيفي، وتخصيص مصفوفة الصلاحيات الممنوحة
            </p>
        </div>
        <a href="{{ route('admin.admins.index') }}" class="btn btn-outline-secondary">
            <i class="ti ti-arrow-right me-1"></i> العودة لقائمة المشرفين
        </a>
    </div>

    <form action="{{ route('admin.admins.update', $admin->id) }}" method="POST">
        @csrf
        @method('PUT')

        @if($errors->any())
            <div class="alert alert-danger mb-4">
                <ul class="mb-0">
                    @foreach($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <!-- Staff Account Details -->
        <div class="card border-0 shadow-sm bg-dark-card rounded-4 mb-4" style="border: 1px solid rgba(255,255,255,0.06) !important;">
            <div class="card-header bg-transparent border-bottom border-dark-subtle p-4">
                <h5 class="fw-bold text-white mb-0"><i class="ti ti-user text-warning me-2"></i> 1. البيانات الشخصية وبيانات الدخول</h5>
            </div>
            <div class="card-body p-4">
                <div class="row g-3">
                    <div class="col-md-4">
                        <label class="form-label text-white fw-semibold">اسم المشرف / الموظف <span class="text-danger">*</span></label>
                        <input type="text" name="name" class="form-control" value="{{ old('name', $admin->name) }}" required>
                    </div>
                    <div class="col-md-4">
                        <label class="form-label text-white fw-semibold">البريد الإلكتروني <span class="text-danger">*</span></label>
                        <input type="email" name="email" class="form-control font-monospace" value="{{ old('email', $admin->email) }}" required>
                    </div>
                    <div class="col-md-4">
                        <label class="form-label text-white fw-semibold">رقم الهاتف (اختياري)</label>
                        <input type="text" name="phone" class="form-control font-monospace" value="{{ old('phone', $admin->phone) }}">
                    </div>

                    <div class="col-md-4">
                        <label class="form-label text-white fw-semibold">كلمة مرور جديدة (اختياري)</label>
                        <input type="password" name="password" class="form-control" placeholder="اتركه فارغاً إذا لم ترغب في التغيير">
                    </div>
                    <div class="col-md-4">
                        <label class="form-label text-white fw-semibold">تأكيد كلمة المرور الجديدة</label>
                        <input type="password" name="password_confirmation" class="form-control" placeholder="••••••••">
                    </div>
                    <div class="col-md-4">
                        <label class="form-label text-white fw-semibold">حالة الحساب <span class="text-danger">*</span></label>
                        <select name="status" class="form-select" required>
                            <option value="active" {{ old('status', $admin->status->value) === 'active' ? 'selected' : '' }}>نشط ومفعل</option>
                            <option value="banned" {{ old('status', $admin->status->value) === 'banned' ? 'selected' : '' }}>معطل / محظور</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <!-- Role Selection -->
        <div class="card border-0 shadow-sm bg-dark-card rounded-4 mb-4" style="border: 1px solid rgba(255,255,255,0.06) !important;">
            <div class="card-header bg-transparent border-bottom border-dark-subtle p-4">
                <h5 class="fw-bold text-white mb-0"><i class="ti ti-shield text-warning me-2"></i> 2. الدور الإداري الرئيسي (Role)</h5>
                <p class="text-muted small mb-0 mt-1">تغيير الدور يمكنه إعادة ملء الصلاحيات أو يمكنك الحفاظ على الصلاحيات المخصصة الحالية</p>
            </div>
            <div class="card-body p-4">
                <div class="row g-3">
                    @foreach($allRoles as $r)
                        @php
                            $preset = $rolePresets[$r->name] ?? null;
                            $isSelected = old('role_name', $currentRole) === $r->name;
                        @endphp
                        <div class="col-md-6 col-xl-4">
                            <label class="card h-100 p-3 rounded-4 cursor-pointer role-card {{ $isSelected ? 'active-role' : '' }}" style="background: rgba(255,255,255,0.03); border: 1.5px solid {{ $isSelected ? '#d4a537' : 'rgba(255,255,255,0.08)' }};">
                                <div class="d-flex align-items-start gap-3">
                                    <input type="radio" name="role_name" value="{{ $r->name }}" class="form-check-input mt-1 role-radio" {{ $isSelected ? 'checked' : '' }} required>
                                    <div class="flex-grow-1">
                                        <div class="d-flex align-items-center justify-content-between mb-1">
                                            <span class="fw-bold text-white fs-6">{{ $preset['label'] ?? $r->name }}</span>
                                            <span class="badge {{ $preset['badge'] ?? 'bg-secondary text-white' }}" style="font-size: 10px;">{{ $r->name }}</span>
                                        </div>
                                        <p class="text-muted small mb-0" style="line-height: 1.4; font-size: 11.5px;">
                                            {{ $preset['desc'] ?? 'دور مخصص في النظام.' }}
                                        </p>
                                    </div>
                                </div>
                            </label>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>

        <!-- Granular Permissions Matrix -->
        <div class="card border-0 shadow-sm bg-dark-card rounded-4 mb-4" style="border: 1px solid rgba(255,255,255,0.06) !important;">
            <div class="card-header bg-transparent border-bottom border-dark-subtle p-4 d-flex flex-wrap align-items-center justify-content-between gap-3">
                <div>
                    <h5 class="fw-bold text-white mb-1"><i class="ti ti-key text-warning me-2"></i> 3. مصفوفة الصلاحيات المخصصة للمشرف</h5>
                    <p class="text-muted small mb-0">يمكنك إضافة أو سحب أي صلاحية معينة لهذا المشرف بشكل منفصل</p>
                </div>
                <div class="d-flex align-items-center gap-2">
                    <button type="button" class="btn btn-sm btn-outline-warning" id="btnSelectAll">
                        <i class="ti ti-check-all me-1"></i> تحديد الكل
                    </button>
                    <button type="button" class="btn btn-sm btn-outline-secondary" id="btnDeselectAll">
                        <i class="ti ti-x me-1"></i> إلغاء التحديد
                    </button>
                </div>
            </div>

            <div class="card-body p-4">
                <div class="row g-4">
                    @foreach($matrix as $groupKey => $group)
                        <div class="col-12 col-xl-6">
                            <div class="p-3 rounded-4 bg-dark-subtle h-100" style="border: 1px solid rgba(255,255,255,0.05);">
                                <div class="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom border-dark-subtle">
                                    <div class="d-flex align-items-center gap-2">
                                        <i class="ti {{ $group['icon'] ?? 'ti-folder' }} text-warning fs-5"></i>
                                        <h6 class="fw-bold text-white mb-0">{{ $group['name'] }}</h6>
                                        <span class="badge bg-secondary-subtle text-secondary" style="font-size: 10px;">{{ count($group['permissions']) }}</span>
                                    </div>
                                    <button type="button" class="btn btn-link btn-sm text-info p-0 text-decoration-none group-toggle-btn" data-group="{{ $groupKey }}">
                                        تحديد المجموعة
                                    </button>
                                </div>

                                <div class="d-flex flex-column gap-2">
                                    @foreach($group['permissions'] as $permKey => $perm)
                                        @php
                                            $checked = in_array($permKey, old('permissions', $assignedPermissions));
                                        @endphp
                                        <label class="form-check form-switch d-flex align-items-start gap-2 p-2 rounded-3 hover-bg-dark m-0 cursor-pointer" style="border: 1px solid rgba(255,255,255,0.03);">
                                            <input class="form-check-input flex-shrink-0 ms-2 perm-checkbox group-{{ $groupKey }}" type="checkbox" name="permissions[]" value="{{ $permKey }}" id="perm_{{ str_replace('.', '_', $permKey) }}" {{ $checked ? 'checked' : '' }}>
                                            <div class="flex-grow-1">
                                                <span class="fw-bold text-white d-block" style="font-size: 13px;">{{ $perm['label'] }}</span>
                                                <small class="text-muted d-block" style="font-size: 11px; line-height: 1.4;">{{ $perm['desc'] }}</small>
                                            </div>
                                        </label>
                                    @endforeach
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>

            <div class="card-footer bg-transparent border-top border-dark-subtle p-4 d-flex align-items-center justify-content-between">
                <a href="{{ route('admin.admins.index') }}" class="btn btn-outline-secondary">إلغاء والعودة</a>
                <button type="submit" class="btn btn-warning px-4"><i class="ti ti-device-floppy me-1"></i> حفظ تعديلات المشرف</button>
            </div>
        </div>
    </form>
</div>

@push('scripts')
<script>
    const presets = @json($defaultPermissions);

    function applyRolePermissions(roleName) {
        const perms = presets[roleName] || [];
        document.querySelectorAll('.perm-checkbox').forEach(cb => {
            cb.checked = perms.includes(cb.value);
        });
    }

    document.querySelectorAll('.role-radio').forEach(radio => {
        radio.addEventListener('change', (e) => {
            document.querySelectorAll('.role-card').forEach(c => {
                c.style.borderColor = 'rgba(255,255,255,0.08)';
            });
            const parent = e.target.closest('.role-card');
            if (parent) parent.style.borderColor = '#d4a537';

            if (confirm('هل تريد تطبيق الصلاحيات الافتراضية لهذا الدور على القائمة بالأسفل؟')) {
                applyRolePermissions(e.target.value);
            }
        });
    });

    document.getElementById('btnSelectAll')?.addEventListener('click', () => {
        document.querySelectorAll('.perm-checkbox').forEach(cb => cb.checked = true);
    });

    document.getElementById('btnDeselectAll')?.addEventListener('click', () => {
        document.querySelectorAll('.perm-checkbox').forEach(cb => cb.checked = false);
    });

    document.querySelectorAll('.group-toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const group = btn.dataset.group;
            const checkboxes = document.querySelectorAll(`.group-${group}`);
            const anyUnchecked = Array.from(checkboxes).some(cb => !cb.checked);
            checkboxes.forEach(cb => cb.checked = anyUnchecked);
        });
    });
</script>
@endpush
@endsection
