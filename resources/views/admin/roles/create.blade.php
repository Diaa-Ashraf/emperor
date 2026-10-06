@extends('layouts.admin')

@section('title', 'إنشاء دور إداري جديد')

@section('content')
<div class="container-fluid px-0">
    <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div>
            <h4 class="fw-bold text-white mb-1">
                <i class="ti ti-plus text-warning me-2"></i> إنشاء دور إداري جديد
            </h4>
            <p class="text-muted mb-0" style="font-size: 13.5px;">
                قم بتسمية الدور وتحديد الصلاحيات المسموح بها من مصفوفة النظام
            </p>
        </div>
        <a href="{{ route('admin.roles.index') }}" class="btn btn-outline-secondary">
            <i class="ti ti-arrow-right me-1"></i> العودة لقائمة الأدوار
        </a>
    </div>

    <form action="{{ route('admin.roles.store') }}" method="POST">
        @csrf

        @if($errors->any())
            <div class="alert alert-danger mb-4">
                <ul class="mb-0">
                    @foreach($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <div class="card border-0 shadow-sm bg-dark-card rounded-4 mb-4" style="border: 1px solid rgba(255,255,255,0.06) !important;">
            <div class="card-body p-4">
                <h5 class="fw-bold text-white mb-3"><i class="ti ti-info-circle text-warning me-2"></i> بيانات الدور الأساسية</h5>
                <div class="row g-3">
                    <div class="col-md-6">
                        <label class="form-label text-white fw-semibold">المسمى التقني للدور (Role Key) <span class="text-danger">*</span></label>
                        <input type="text" name="name" class="form-control font-monospace" placeholder="مثال: inventory_manager" value="{{ old('name') }}" required>
                        <small class="text-muted">أحرف إنجليزية صغيرة بدون مسافات (استخدم _ بين الكلمات)</small>
                    </div>
                </div>
            </div>
        </div>

        <!-- Permissions Matrix Card -->
        <div class="card border-0 shadow-sm bg-dark-card rounded-4 mb-4" style="border: 1px solid rgba(255,255,255,0.06) !important;">
            <div class="card-header bg-transparent border-bottom border-dark-subtle p-4 d-flex flex-wrap align-items-center justify-content-between gap-3">
                <div>
                    <h5 class="fw-bold text-white mb-1"><i class="ti ti-key text-warning me-2"></i> مصفوفة الصلاحيات المخصصة</h5>
                    <p class="text-muted small mb-0">حدد الصلاحيات التي يمتلكها هذا الدور في النظام</p>
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

            <!-- Role Presets Quick Selection -->
            <div class="p-3 border-bottom border-dark-subtle bg-dark-subtle d-flex flex-wrap align-items-center gap-2">
                <span class="text-muted small fw-bold me-2"><i class="ti ti-wand me-1 text-info"></i> قوالب جاهزة:</span>
                <button type="button" class="btn btn-xs btn-outline-info rounded-pill preset-btn" data-preset="operations_manager">
                    <i class="ti ti-device-gamepad-2 me-1"></i> مدير العمليات
                </button>
                <button type="button" class="btn btn-xs btn-outline-success rounded-pill preset-btn" data-preset="finance_manager">
                    <i class="ti ti-wallet me-1"></i> المدير المالي
                </button>
                <button type="button" class="btn btn-xs btn-outline-primary rounded-pill preset-btn" data-preset="support_agent">
                    <i class="ti ti-headset me-1"></i> الدعم الفني
                </button>
                <button type="button" class="btn btn-xs btn-outline-danger rounded-pill preset-btn" data-preset="super_admin">
                    <i class="ti ti-crown me-1"></i> كامل الصلاحيات
                </button>
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
                                        <label class="form-check form-switch d-flex align-items-start gap-2 p-2 rounded-3 hover-bg-dark m-0 cursor-pointer" style="border: 1px solid rgba(255,255,255,0.03);">
                                            <input class="form-check-input flex-shrink-0 ms-2 perm-checkbox group-{{ $groupKey }}" type="checkbox" name="permissions[]" value="{{ $permKey }}" id="perm_{{ str_replace('.', '_', $permKey) }}">
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
                <a href="{{ route('admin.roles.index') }}" class="btn btn-outline-secondary">إلغاء والعودة</a>
                <button type="submit" class="btn btn-primary px-4"><i class="ti ti-device-floppy me-1"></i> حفظ وإنشاء الدور</button>
            </div>
        </div>
    </form>
</div>

@push('scripts')
<script>
    const presets = @json($defaultPermissions);

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

    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const presetName = btn.dataset.preset;
            const perms = presets[presetName] || [];
            document.querySelectorAll('.perm-checkbox').forEach(cb => {
                cb.checked = perms.includes(cb.value);
            });
        });
    });
</script>
@endpush
@endsection
