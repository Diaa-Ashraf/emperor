@extends('layouts.admin')

@section('title', 'إدارة الأقسام والتصنيفات')

@section('header')
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
            <h3 class="page-header-title mb-1">
                <i class="ti ti-category text-gold"></i>
                <span>إدارة الأقسام والتصنيفات</span>
            </h3>
            <p class="page-header-subtitle mb-0">أقسام الألعاب، تطبيقات البث، وكروت الشحن والاشتراكات</p>
        </div>
        <div class="d-flex flex-wrap align-items-center gap-2">
            <span class="badge badge-gold px-3 py-2 fs-6">
                إجمالي الأقسام: {{ $categories->total() }}
            </span>
            <a href="{{ route('admin.categories.create') }}" class="btn btn-primary fw-bold px-3 d-inline-flex align-items-center gap-2">
                <i class="ti ti-plus fs-5"></i>
                <span>إضافة قسم جديد</span>
            </a>
        </div>
    </div>
@endsection

@section('content')
    <!-- Search & Filter Card -->
    <div class="card p-3 mb-4">
        <form action="{{ route('admin.categories.index') }}" method="GET" class="row g-2 align-items-center">
            <div class="col-12 col-md-5">
                <div class="input-group">
                    <span class="input-group-text bg-dark border-secondary text-gold">
                        <i class="ti ti-search"></i>
                    </span>
                    <input type="text" name="search" class="form-control" placeholder="بحث باسم القسم..." value="{{ request('search') }}">
                </div>
            </div>
            <div class="col-12 col-sm-6 col-md-4">
                <select name="type" class="form-select">
                    <option value="">-- كل الأنواع والتصنيفات --</option>
                    @foreach(\App\Enums\CategoryType::cases() as $catType)
                        <option value="{{ $catType->value }}" {{ request('type') === $catType->value ? 'selected' : '' }}>
                            {{ $catType->label() }}
                        </option>
                    @endforeach
                </select>
            </div>
            <div class="col-12 col-sm-6 col-md-3 d-flex gap-2">
                <button type="submit" class="btn btn-primary w-100 fw-bold">
                    <i class="ti ti-filter"></i> تصفية
                </button>
                @if(request()->hasAny(['search', 'type']))
                    <a href="{{ route('admin.categories.index') }}" class="btn btn-dark-outline" title="إعادة تعيين">
                        <i class="ti ti-rotate-clockwise"></i>
                    </a>
                @endif
            </div>
        </form>
    </div>

    <!-- Bulk Actions Floating Bar -->
    <div id="bulkActionsToolbar" class="d-none alert alert-dark border border-warning d-flex align-items-center justify-content-between p-3 mb-3 rounded-3 shadow-lg" style="background: rgba(22, 22, 29, 0.95); backdrop-filter: blur(8px);">
        <div class="d-flex align-items-center gap-2">
            <i class="ti ti-checkbox text-gold fs-4"></i>
            <span class="text-white fw-semibold">تم تحديد <strong id="selectedCount" class="text-warning fs-5">0</strong> قسم</span>
        </div>
        <div class="d-flex align-items-center gap-2">
            <button type="button" class="btn btn-sm btn-dark-outline text-muted" onclick="clearCategorySelection()">
                إلغاء التحديد
            </button>
            <button type="button" class="btn btn-sm btn-danger fw-bold d-inline-flex align-items-center gap-1 px-3" onclick="openBulkDeleteModal()">
                <i class="ti ti-trash"></i>
                <span>حذف الأقسام المحددة</span>
            </button>
        </div>
    </div>

    <!-- Categories Table Card -->
    <div class="card">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead>
                    <tr>
                        <th class="ps-3" style="width: 40px;">
                            <input type="checkbox" id="selectAllCategories" class="form-check-input" title="تحديد الكل">
                        </th>
                        <th style="width: 60px;">الترتيب</th>
                        <th style="width: 60px;">الأيقونة</th>
                        <th>اسم القسم</th>
                        <th>النوع والتصنيف</th>
                        <th>الرابط (Slug)</th>
                        <th>عدد المنتجات</th>
                        <th>الحالة</th>
                        <th class="text-end pe-3">الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($categories as $category)
                        <tr id="category-row-{{ $category->id }}">
                            <td class="ps-3">
                                <input type="checkbox" class="form-check-input category-select-checkbox" value="{{ $category->id }}" data-name="{{ $category->name }}">
                            </td>
                            <td>
                                <span class="badge bg-secondary font-monospace">#{{ $category->sort_order }}</span>
                            </td>
                            <td>
                                @if($category->icon)
                                    <img src="{{ Storage::url($category->icon) }}" alt="{{ $category->name }}" class="rounded-3 border border-secondary shadow-sm" style="width: 38px; height: 38px; object-fit: cover;">
                                @else
                                    <div class="rounded-3 bg-dark border border-secondary d-flex align-items-center justify-content-center text-warning" style="width: 38px; height: 38px;">
                                        <i class="ti ti-folder fs-5 text-gold"></i>
                                    </div>
                                @endif
                            </td>
                            <td>
                                <div class="fw-bold text-white fs-6">{{ $category->name }}</div>
                                @if($category->description)
                                    <small class="text-muted text-truncate d-block" style="max-width: 250px;">{{ $category->description }}</small>
                                @endif
                            </td>
                            <td>
                                <span class="badge bg-primary-subtle text-primary border border-primary-subtle px-2 py-1">
                                    {{ $category->type->label() }}
                                </span>
                            </td>
                            <td class="font-monospace text-muted small">{{ $category->slug }}</td>
                            <td>
                                <a href="{{ route('admin.products.index', ['category_id' => $category->id]) }}" class="badge bg-dark border border-secondary text-warning text-decoration-none px-2 py-1" title="عرض منتجات القسم">
                                    <i class="ti ti-package me-1"></i>{{ $category->products_count }} منتج
                                </a>
                            </td>
                            <td>
                                @if($category->is_active)
                                    <span class="badge bg-success-subtle text-success border border-success-subtle px-2 py-1">
                                        <i class="ti ti-circle-check me-1"></i>نشط
                                    </span>
                                @else
                                    <span class="badge bg-danger-subtle text-danger border border-danger-subtle px-2 py-1">
                                        <i class="ti ti-circle-x me-1"></i>معطل
                                    </span>
                                @endif
                            </td>
                            <td class="text-end pe-3">
                                <div class="d-inline-flex align-items-center gap-1">
                                    <form action="{{ route('admin.categories.toggle-active', $category->id) }}" method="POST" class="d-inline">
                                        @csrf
                                        <button type="submit" class="btn-action {{ $category->is_active ? 'btn-action-info' : 'btn-action-success' }}" title="{{ $category->is_active ? 'تعطيل القسم' : 'تفعيل القسم' }}">
                                            <i class="ti {{ $category->is_active ? 'ti-eye-off' : 'ti-eye' }}"></i>
                                        </button>
                                    </form>
                                    <a href="{{ route('admin.categories.edit', $category->id) }}" class="btn-action btn-action-info" title="تعديل القسم">
                                        <i class="ti ti-edit"></i>
                                    </a>
                                    <button type="button" class="btn-action btn-action-danger" title="حذف القسم" onclick="openSingleDeleteModal('{{ route('admin.categories.destroy', $category->id) }}', '{{ addslashes($category->name) }}')">
                                        <i class="ti ti-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="9" class="text-center py-5">
                                <div class="py-4">
                                    <i class="ti ti-category-2 fs-1 text-warning d-block mb-3 opacity-50"></i>
                                    <h6 class="text-white fw-bold mb-1">لا توجد أقسام مسجلة حتى الآن</h6>
                                    <p class="text-muted small mb-3">يمكنك إضافة قسم جديد لتصنيف المنتجات والألعاب</p>
                                    <a href="{{ route('admin.categories.create') }}" class="btn btn-sm btn-primary">
                                        <i class="ti ti-plus me-1"></i> إضافة قسم جديد
                                    </a>
                                </div>
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        @if($categories->hasPages())
            <div class="card-footer bg-transparent border-0 d-flex justify-content-center py-3">
                {{ $categories->links() }}
            </div>
        @endif
    </div>

    <!-- Single Delete Modal -->
    <div class="modal fade" id="singleDeleteModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-0 pb-0">
                    <div class="d-flex align-items-center gap-2">
                        <div class="rounded-circle bg-danger-subtle text-danger d-flex align-items-center justify-content-center" style="width: 42px; height: 42px;">
                            <i class="ti ti-alert-triangle fs-4"></i>
                        </div>
                        <h5 class="modal-title fw-bold text-white mb-0">تأكيد حذف القسم</h5>
                    </div>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body py-4">
                    <p class="text-muted mb-2">هل أنت متأكد من رغبتك في حذف هذا القسم نهائياً؟</p>
                    <div class="p-3 bg-dark rounded-3 border border-secondary">
                        <div class="fw-bold text-white fs-6" id="deleteTargetName">-</div>
                        <small class="text-warning">⚠️ تأكد من عدم وجود منتجات مرتبطة بهذا القسم قبل الحذف.</small>
                    </div>
                </div>
                <div class="modal-footer border-0 pt-0">
                    <button type="button" class="btn btn-dark-outline" data-bs-dismiss="modal">إلغاء</button>
                    <form id="singleDeleteForm" method="POST" class="d-inline">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-danger fw-bold px-4">
                            <i class="ti ti-trash me-1"></i> نعم، حذف نهائياً
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Bulk Delete Modal -->
    <div class="modal fade" id="bulkDeleteModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-0 pb-0">
                    <div class="d-flex align-items-center gap-2">
                        <div class="rounded-circle bg-danger-subtle text-danger d-flex align-items-center justify-content-center" style="width: 42px; height: 42px;">
                            <i class="ti ti-trash-x fs-4"></i>
                        </div>
                        <h5 class="modal-title fw-bold text-white mb-0">تأكيد الحذف الجماعي</h5>
                    </div>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body py-4">
                    <p class="text-muted mb-2">هل أنت متأكد من حذف الأقسام المحددة التالية؟</p>
                    <div class="p-3 bg-dark rounded-3 border border-secondary mb-3">
                        <div class="fw-bold text-warning fs-6 mb-1">
                            عدد الأقسام المحددة: <span id="bulkDeleteCount">0</span>
                        </div>
                        <small class="text-muted">لن يتم حذف الأقسام التي تحتوي على منتجات نشطة مرتبطة بها.</small>
                    </div>
                </div>
                <div class="modal-footer border-0 pt-0">
                    <button type="button" class="btn btn-dark-outline" data-bs-dismiss="modal">إلغاء</button>
                    <form id="bulkDeleteForm" action="{{ route('admin.categories.bulk-destroy') }}" method="POST" class="d-inline">
                        @csrf
                        <div id="bulkDeleteInputsContainer"></div>
                        <button type="submit" class="btn btn-danger fw-bold px-4">
                            <i class="ti ti-trash me-1"></i> تأكيد وحذف المحدد
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const selectAllCheckbox = document.getElementById('selectAllCategories');
        const itemCheckboxes = document.querySelectorAll('.category-select-checkbox');
        const bulkToolbar = document.getElementById('bulkActionsToolbar');
        const selectedCountSpan = document.getElementById('selectedCount');

        function updateBulkToolbar() {
            const selected = Array.from(itemCheckboxes).filter(cb => cb.checked);
            const count = selected.length;

            if (count > 0) {
                bulkToolbar.classList.remove('d-none');
                selectedCountSpan.textContent = count;
            } else {
                bulkToolbar.classList.add('d-none');
            }

            if (selectAllCheckbox) {
                selectAllCheckbox.checked = (selected.length === itemCheckboxes.length && itemCheckboxes.length > 0);
                selectAllCheckbox.indeterminate = (selected.length > 0 && selected.length < itemCheckboxes.length);
            }
        }

        if (selectAllCheckbox) {
            selectAllCheckbox.addEventListener('change', function() {
                itemCheckboxes.forEach(cb => {
                    cb.checked = selectAllCheckbox.checked;
                });
                updateBulkToolbar();
            });
        }

        itemCheckboxes.forEach(cb => {
            cb.addEventListener('change', updateBulkToolbar);
        });

        window.clearCategorySelection = function() {
            itemCheckboxes.forEach(cb => {
                cb.checked = false;
            });
            if (selectAllCheckbox) {
                selectAllCheckbox.checked = false;
                selectAllCheckbox.indeterminate = false;
            }
            updateBulkToolbar();
        };

        window.openSingleDeleteModal = function(url, name) {
            const form = document.getElementById('singleDeleteForm');
            const nameEl = document.getElementById('deleteTargetName');
            form.action = url;
            nameEl.textContent = name;
            
            const modalEl = document.getElementById('singleDeleteModal');
            const modal = new bootstrap.Modal(modalEl);
            modal.show();
        };

        window.openBulkDeleteModal = function() {
            const selected = Array.from(itemCheckboxes).filter(cb => cb.checked);
            if (selected.length === 0) return;

            const container = document.getElementById('bulkDeleteInputsContainer');
            container.innerHTML = '';
            selected.forEach(cb => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = 'ids[]';
                input.value = cb.value;
                container.appendChild(input);
            });

            document.getElementById('bulkDeleteCount').textContent = selected.length;

            const modalEl = document.getElementById('bulkDeleteModal');
            const modal = new bootstrap.Modal(modalEl);
            modal.show();
        };
    });
</script>
@endpush