@extends('layouts.admin')

@section('title', 'دليل المنتجات وباقات الشحن')

@section('header')
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
            <h3 class="page-header-title mb-1">
                <i class="ti ti-device-gamepad-2 text-gold"></i>
                <span>دليل المنتجات وباقات الشحن</span>
            </h3>
            <p class="page-header-subtitle mb-0">إدارة الألعاب، تطبيقات البث المباشر، باقات الأسعار، وتوجيه المزودين</p>
        </div>
        <div class="d-flex flex-wrap align-items-center gap-2">
            <span class="badge badge-gold px-3 py-2 fs-6">
                إجمالي المنتجات: {{ $products->total() }}
            </span>
            <a href="{{ route('admin.products.create') }}" class="btn btn-primary fw-bold px-3 d-inline-flex align-items-center gap-2">
                <i class="ti ti-plus fs-5"></i>
                <span>إضافة منتج جديد</span>
            </a>
        </div>
    </div>
@endsection

@section('content')
    <!-- Search & Filter Card -->
    <div class="card p-3 mb-4">
        <form action="{{ route('admin.products.index') }}" method="GET" class="row g-2 align-items-center">
            <div class="col-12 col-md-4">
                <div class="input-group">
                    <span class="input-group-text bg-dark border-secondary text-gold">
                        <i class="ti ti-search"></i>
                    </span>
                    <input type="text" name="search" class="form-control" placeholder="بحث باسم المنتج أو المعرف..." value="{{ request('search') }}">
                </div>
            </div>
            <div class="col-12 col-sm-6 col-md-3">
                <select name="category_id" class="form-select">
                    <option value="">-- كل الأقسام --</option>
                    @foreach($categories as $category)
                        <option value="{{ $category->id }}" {{ request('category_id') == $category->id ? 'selected' : '' }}>
                            {{ $category->name }}
                        </option>
                    @endforeach
                </select>
            </div>
            <div class="col-12 col-sm-6 col-md-3">
                <select name="type" class="form-select">
                    <option value="">-- كل أنواع الشحن --</option>
                    @foreach(\App\Enums\ProductType::cases() as $type)
                        <option value="{{ $type->value }}" {{ request('type') === $type->value ? 'selected' : '' }}>
                            {{ $type->label() }}
                        </option>
                    @endforeach
                </select>
            </div>
            <div class="col-12 col-md-2 d-flex gap-2">
                <button type="submit" class="btn btn-primary w-100 fw-bold">
                    <i class="ti ti-filter"></i> تصفية
                </button>
                @if(request()->hasAny(['search', 'category_id', 'type']))
                    <a href="{{ route('admin.products.index') }}" class="btn btn-dark-outline" title="إعادة تعيين">
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
            <span class="text-white fw-semibold">تم تحديد <strong id="selectedCount" class="text-warning fs-5">0</strong> منتج</span>
        </div>
        <div class="d-flex align-items-center gap-2">
            <button type="button" class="btn btn-sm btn-dark-outline text-muted" onclick="clearProductSelection()">
                إلغاء التحديد
            </button>
            <button type="button" class="btn btn-sm btn-danger fw-bold d-inline-flex align-items-center gap-1 px-3" onclick="openBulkDeleteModal()">
                <i class="ti ti-trash"></i>
                <span>حذف المنتجات المحددة</span>
            </button>
        </div>
    </div>

    <!-- Products Table Card -->
    <div class="card">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead>
                    <tr>
                        <th class="ps-3" style="width: 40px;">
                            <input type="checkbox" id="selectAllProducts" class="form-check-input" title="تحديد الكل">
                        </th>
                        <th style="width: 50px;">#</th>
                        <th style="width: 60px;">الصورة</th>
                        <th>اسم المنتج</th>
                        <th>القسم</th>
                        <th>نوع الشحن</th>
                        <th>الباقات</th>
                        <th>المصدر</th>
                        <th>الحالة</th>
                        <th class="text-end pe-3">الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($products as $product)
                        <tr id="product-row-{{ $product->id }}">
                            <td class="ps-3">
                                <input type="checkbox" class="form-check-input product-select-checkbox" value="{{ $product->id }}" data-name="{{ $product->name }}">
                            </td>
                            <td class="text-muted font-monospace small">#{{ $product->id }}</td>
                            <td>
                                @if($product->image)
                                    <img src="{{ Storage::url($product->image) }}" alt="{{ $product->name }}" class="rounded-3 border border-secondary shadow-sm" style="width: 38px; height: 38px; object-fit: cover;">
                                @else
                                    <div class="rounded-3 bg-dark border border-secondary d-flex align-items-center justify-content-center text-warning" style="width: 38px; height: 38px;">
                                        <i class="ti ti-device-gamepad fs-5 text-gold"></i>
                                    </div>
                                @endif
                            </td>
                            <td>
                                <div class="fw-bold text-white fs-6">{{ $product->name }}</div>
                                <small class="text-muted font-monospace">{{ $product->slug }}</small>
                            </td>
                            <td>
                                <span class="badge bg-dark border border-secondary text-light px-2 py-1">
                                    <i class="ti ti-folder me-1 text-warning"></i>
                                    {{ $product->category->name ?? '-' }}
                                </span>
                            </td>
                            <td>
                                <span class="badge bg-primary-subtle text-primary border border-primary-subtle px-2 py-1">
                                    {{ $product->type->label() }}
                                </span>
                            </td>
                            <td>
                                <span class="badge bg-warning-subtle text-warning border border-warning-subtle px-2 py-1">
                                    <i class="ti ti-packages me-1"></i>{{ $product->tiers_count }} باقات
                                </span>
                            </td>
                            <td>
                                @if($product->catalogSource)
                                    <span class="badge bg-info-subtle text-info border border-info-subtle px-2 py-1">
                                        <i class="ti ti-refresh me-1"></i>{{ $product->catalogSource->name }}
                                    </span>
                                @else
                                    <span class="badge bg-secondary-subtle text-muted px-2 py-1">يدوي</span>
                                @endif
                            </td>
                            <td>
                                @if($product->is_active)
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
                                    <a href="{{ route('admin.products.provider-mapping', $product->id) }}" class="btn-action btn-action-warning" title="ربط وتوجيه المزودين">
                                        <i class="ti ti-server"></i>
                                    </a>
                                    <form action="{{ route('admin.products.toggle-active', $product->id) }}" method="POST" class="d-inline">
                                        @csrf
                                        <button type="submit" class="btn-action {{ $product->is_active ? 'btn-action-info' : 'btn-action-success' }}" title="{{ $product->is_active ? 'تعطيل المنتج' : 'تفعيل المنتج' }}">
                                            <i class="ti {{ $product->is_active ? 'ti-eye-off' : 'ti-eye' }}"></i>
                                        </button>
                                    </form>
                                    <a href="{{ route('admin.products.edit', $product->id) }}" class="btn-action btn-action-info" title="تعديل المنتج والباقات">
                                        <i class="ti ti-edit"></i>
                                    </a>
                                    <button type="button" class="btn-action btn-action-danger" title="حذف المنتج" onclick="openSingleDeleteModal('{{ route('admin.products.destroy', $product->id) }}', '{{ addslashes($product->name) }}')">
                                        <i class="ti ti-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="10" class="text-center py-5">
                                <div class="py-4">
                                    <i class="ti ti-device-gamepad-off fs-1 text-warning d-block mb-3 opacity-50"></i>
                                    <h6 class="text-white fw-bold mb-1">لا توجد منتجات مسجلة تطابق البحث</h6>
                                    <p class="text-muted small mb-3">يمكنك إضافة منتج جديد أو مزامنة الكتالوج من المزودين</p>
                                    <a href="{{ route('admin.products.create') }}" class="btn btn-sm btn-primary">
                                        <i class="ti ti-plus me-1"></i> إضافة منتج جديد
                                    </a>
                                </div>
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        @if($products->hasPages())
            <div class="card-footer bg-transparent border-0 d-flex justify-content-center py-3">
                {{ $products->links() }}
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
                        <h5 class="modal-title fw-bold text-white mb-0">تأكيد حذف المنتج</h5>
                    </div>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body py-4">
                    <p class="text-muted mb-2">هل أنت متأكد من رغبتك في حذف هذا المنتج وكافة باقاته وأسعاره نهائياً؟</p>
                    <div class="p-3 bg-dark rounded-3 border border-secondary">
                        <div class="fw-bold text-white fs-6" id="deleteTargetName">-</div>
                        <small class="text-warning">⚠️ لا يمكن استرجاع المنتج أو باقاته بعد الحذف.</small>
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
                    <p class="text-muted mb-2">هل أنت متأكد من حذف المنتجات المحددة التالية؟</p>
                    <div class="p-3 bg-dark rounded-3 border border-secondary mb-3">
                        <div class="fw-bold text-warning fs-6 mb-1">
                            عدد المنتجات المحددة: <span id="bulkDeleteCount">0</span>
                        </div>
                        <small class="text-muted">سيتم حذف كافة الباقات والأسعار المرتبطة بهذه المنتجات نهائياً.</small>
                    </div>
                </div>
                <div class="modal-footer border-0 pt-0">
                    <button type="button" class="btn btn-dark-outline" data-bs-dismiss="modal">إلغاء</button>
                    <form id="bulkDeleteForm" action="{{ route('admin.products.bulk-destroy') }}" method="POST" class="d-inline">
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
        const selectAllCheckbox = document.getElementById('selectAllProducts');
        const itemCheckboxes = document.querySelectorAll('.product-select-checkbox');
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

        window.clearProductSelection = function() {
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