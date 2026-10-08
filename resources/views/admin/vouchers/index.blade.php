@extends('layouts.admin')

@section('title', 'مخزون الأكواد الرقمية')

@section('header')
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
            <h3 class="page-header-title mb-1">
                <i class="ti ti-ticket text-gold"></i>
                <span>مخزون الأكواد الرقمية (Vouchers)</span>
            </h3>
            <p class="page-header-subtitle mb-0">إدارة واستيراد بطاقات وقسائم الشحن الجاهزة للتسليم الآلي الفوري للمستخدمين</p>
        </div>
        <div class="d-flex flex-wrap align-items-center gap-2">
            <button type="button" class="btn btn-primary fw-bold px-3 d-inline-flex align-items-center gap-2" data-bs-toggle="modal" data-bs-target="#importVouchersModal">
                <i class="ti ti-plus fs-5"></i>
                <span>إضافة واستيراد أكواد</span>
            </button>
        </div>
    </div>
@endsection

@section('content')
    <!-- Stats Cards -->
    <div class="row g-3 mb-4">
        <div class="col-6 col-md-3">
            <div class="card p-3 text-center">
                <span class="text-muted small d-block mb-1">إجمالي الأكواد</span>
                <span class="fw-bold text-white fs-4 font-monospace">{{ $stats['total'] }}</span>
            </div>
        </div>
        <div class="col-6 col-md-3">
            <div class="card p-3 text-center">
                <span class="text-muted small d-block mb-1">الأكواد المتاحة</span>
                <span class="fw-bold text-success fs-4 font-monospace">{{ $stats['available'] }}</span>
            </div>
        </div>
        <div class="col-6 col-md-3">
            <div class="card p-3 text-center">
                <span class="text-muted small d-block mb-1">تم تسليمها / مباعة</span>
                <span class="fw-bold text-info fs-4 font-monospace">{{ $stats['sold'] }}</span>
            </div>
        </div>
        <div class="col-6 col-md-3">
            <div class="card p-3 text-center">
                <span class="text-muted small d-block mb-1">محجوزة مؤقتاً</span>
                <span class="fw-bold text-warning fs-4 font-monospace">{{ $stats['reserved'] }}</span>
            </div>
        </div>
    </div>

    <!-- Filters Card -->
    <div class="card p-3 mb-4">
        <form action="{{ route('admin.vouchers.index') }}" method="GET" class="row g-2 align-items-center">
            <div class="col-12 col-md-4">
                <div class="input-group">
                    <span class="input-group-text bg-dark border-secondary text-gold"><i class="ti ti-search"></i></span>
                    <input type="text" name="search" class="form-control" placeholder="بحث بالكود أو الرقم التسلسلي..." value="{{ request('search') }}">
                </div>
            </div>
            <div class="col-12 col-sm-6 col-md-3">
                <select name="product_id" class="form-select">
                    <option value="">-- كل المنتجات --</option>
                    @foreach($products as $prod)
                        <option value="{{ $prod->id }}" {{ request('product_id') == $prod->id ? 'selected' : '' }}>
                            {{ $prod->name }}
                        </option>
                    @endforeach
                </select>
            </div>
            <div class="col-12 col-sm-6 col-md-3">
                <select name="status" class="form-select">
                    <option value="">-- كل الحالات --</option>
                    <option value="available" {{ request('status') === 'available' ? 'selected' : '' }}>متاح للبيع (Available)</option>
                    <option value="sold" {{ request('status') === 'sold' ? 'selected' : '' }}>تم تسليمه (Sold)</option>
                    <option value="reserved" {{ request('status') === 'reserved' ? 'selected' : '' }}>محجوز لطلب (Reserved)</option>
                </select>
            </div>
            <div class="col-12 col-md-2 d-flex gap-2">
                <button type="submit" class="btn btn-primary w-100 fw-bold"><i class="ti ti-filter"></i> تصفية</button>
                @if(request()->hasAny(['search', 'product_id', 'status']))
                    <a href="{{ route('admin.vouchers.index') }}" class="btn btn-dark-outline" title="إعادة تعيين"><i class="ti ti-rotate-clockwise"></i></a>
                @endif
            </div>
        </form>
    </div>

    <!-- Bulk Actions Floating Bar -->
    <div id="bulkActionsToolbar" class="d-none alert alert-dark border border-warning d-flex align-items-center justify-content-between p-3 mb-3 rounded-3 shadow-lg" style="background: rgba(22, 22, 29, 0.95); backdrop-filter: blur(8px);">
        <div class="d-flex align-items-center gap-2">
            <i class="ti ti-checkbox text-gold fs-4"></i>
            <span class="text-white fw-semibold">تم تحديد <strong id="selectedCount" class="text-warning fs-5">0</strong> كود</span>
        </div>
        <div class="d-flex align-items-center gap-2">
            <button type="button" class="btn btn-sm btn-dark-outline text-muted" onclick="clearVoucherSelection()">
                إلغاء التحديد
            </button>
            <button type="button" class="btn btn-sm btn-danger fw-bold d-inline-flex align-items-center gap-1 px-3" onclick="openBulkDeleteModal()">
                <i class="ti ti-trash"></i>
                <span>حذف الأكواد المحددة</span>
            </button>
        </div>
    </div>

    <!-- Vouchers Table Card -->
    <div class="card">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead>
                    <tr>
                        <th class="ps-3" style="width: 40px;">
                            <input type="checkbox" id="selectAllVouchers" class="form-check-input" title="تحديد الكل">
                        </th>
                        <th style="width: 50px;">#</th>
                        <th>المنتج والباقة</th>
                        <th>الكود الرقمي (Voucher Code)</th>
                        <th>الرقم التسلسلي (Serial)</th>
                        <th>الحالة</th>
                        <th>الطلب المرتبط</th>
                        <th>تاريخ الانتهاء</th>
                        <th class="text-end pe-3">الإجراء</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($vouchers as $voucher)
                        <tr>
                            <td class="ps-3">
                                @if($voucher->status !== 'sold')
                                    <input type="checkbox" class="form-check-input voucher-select-checkbox" value="{{ $voucher->id }}">
                                @endif
                            </td>
                            <td class="text-muted font-monospace small">#{{ $voucher->id }}</td>
                            <td>
                                <div class="fw-bold text-white">{{ $voucher->product->name ?? 'منتج محذوف' }}</div>
                                <small class="text-warning">{{ $voucher->tier->name ?? '-' }}</small>
                            </td>
                            <td>
                                <div class="d-inline-flex align-items-center gap-2 font-monospace">
                                    <span class="badge bg-dark border border-secondary text-warning px-2 py-1 fs-6" id="code-text-{{ $voucher->id }}">
                                        {{ Str::mask($voucher->code, '*', 3, -3) }}
                                    </span>
                                    <button class="btn btn-sm btn-link text-muted p-0" title="إظهار الكود" onclick="toggleCodeReveal({{ $voucher->id }}, '{{ addslashes($voucher->code) }}')">
                                        <i class="ti ti-eye" id="eye-icon-{{ $voucher->id }}"></i>
                                    </button>
                                    <button class="btn btn-sm btn-link text-muted p-0" title="نسخ الكود" onclick="navigator.clipboard.writeText('{{ addslashes($voucher->code) }}'); alert('تم نسخ الكود!');">
                                        <i class="ti ti-copy"></i>
                                    </button>
                                </div>
                            </td>
                            <td>
                                @if($voucher->serial_number)
                                    <span class="font-monospace text-muted small">{{ $voucher->serial_number }}</span>
                                @else
                                    <span class="text-muted small">-</span>
                                @endif
                            </td>
                            <td>
                                @if($voucher->status === 'available')
                                    <span class="badge bg-success-subtle text-success border border-success-subtle px-2 py-1">
                                        <i class="ti ti-circle-check me-1"></i> متاح للبيع
                                    </span>
                                @elseif($voucher->status === 'sold')
                                    <span class="badge bg-info-subtle text-info border border-info-subtle px-2 py-1">
                                        <i class="ti ti-check me-1"></i> تم تسليمه
                                    </span>
                                @elseif($voucher->status === 'reserved')
                                    <span class="badge bg-warning-subtle text-warning border border-warning-subtle px-2 py-1">
                                        <i class="ti ti-clock me-1"></i> محجوز لطلب
                                    </span>
                                @else
                                    <span class="badge bg-danger-subtle text-danger border border-danger-subtle px-2 py-1">
                                        منتهي
                                    </span>
                                @endif
                            </td>
                            <td>
                                @if($voucher->order)
                                    <a href="{{ route('admin.orders.show', $voucher->order_id) }}" class="badge bg-dark border border-secondary text-warning text-decoration-none font-monospace">
                                        #{{ $voucher->order->public_id }}
                                    </a>
                                @else
                                    <span class="text-muted small">-</span>
                                @endif
                            </td>
                            <td class="text-muted small">
                                {{ $voucher->expires_at ? $voucher->expires_at->format('Y-m-d') : 'غير محدد' }}
                            </td>
                            <td class="text-end pe-3">
                                @if($voucher->status !== 'sold')
                                    <button type="button" class="btn-action btn-action-danger" title="حذف الكود" onclick="openSingleDeleteModal('{{ route('admin.vouchers.destroy', $voucher->id) }}', 'كود #{{ $voucher->id }}')">
                                        <i class="ti ti-trash"></i>
                                    </button>
                                @else
                                    <span class="text-muted small">-</span>
                                @endif
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="9" class="text-center py-5">
                                <div class="py-4">
                                    <i class="ti ti-ticket-off fs-1 text-warning d-block mb-3 opacity-50"></i>
                                    <h6 class="text-white fw-bold mb-1">لا توجد أكواد مسجلة في المخزون</h6>
                                    <p class="text-muted small mb-3">يمكنك إضافة واستيراد بطاقات وقسائم الشحن للتسليم التلقائي</p>
                                    <button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#importVouchersModal">
                                        <i class="ti ti-plus me-1"></i> إضافة واستيراد أكواد
                                    </button>
                                </div>
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        @if($vouchers->hasPages())
            <div class="card-footer bg-transparent border-0 d-flex justify-content-center py-3">
                {{ $vouchers->links() }}
            </div>
        @endif
    </div>

    <!-- Import / Add Vouchers Modal -->
    <div class="modal fade" id="importVouchersModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header border-0 pb-0">
                    <div class="d-flex align-items-center gap-2">
                        <div class="rounded-circle bg-warning-subtle text-warning d-flex align-items-center justify-content-center" style="width: 42px; height: 42px;">
                            <i class="ti ti-ticket fs-4 text-gold"></i>
                        </div>
                        <div>
                            <h5 class="modal-title fw-bold text-white mb-0">إضافة واستيراد أكواد رقمية</h5>
                            <small class="text-muted">أضف كوداً واحداً أو الصق مجموعة أكواد للتسليم الفوري</small>
                        </div>
                    </div>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form action="{{ route('admin.vouchers.store') }}" method="POST">
                    @csrf
                    <div class="modal-body py-4">
                        <div class="row g-3">
                            <div class="col-12 col-md-6">
                                <label class="form-label text-white fw-semibold small">المنتج التابع له <span class="text-danger">*</span></label>
                                <select name="product_id" id="modalProductSelect" class="form-select" required onchange="window.updateTierOptions(this.value)">
                                    <option value="">-- اختر المنتج --</option>
                                    @foreach($products as $p)
                                        <option value="{{ $p->id }}">{{ $p->name }}</option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="col-12 col-md-6">
                                <label class="form-label text-white fw-semibold small">الباقة المحددة <span class="text-danger">*</span></label>
                                <select name="product_tier_id" id="modalTierSelect" class="form-select" required>
                                    <option value="">-- اختر الباقة --</option>
                                </select>
                            </div>
                            <div class="col-12">
                                <label class="form-label text-white fw-semibold small">الأكواد الرقمية (Code) <span class="text-danger">*</span></label>
                                <textarea name="codes" rows="5" class="form-control font-monospace" placeholder="ضع كل كود في سطر جديد أو افصل بينها بفواصل...&#10;XXXX-YYYY-ZZZZ-1111&#10;XXXX-YYYY-ZZZZ-2222" required></textarea>
                                <small class="text-muted">يمكنك نسخ ولصق مئات الأكواد دفعة واحدة، سيتم إدراج كل سطر ككود مستقل.</small>
                            </div>
                            <div class="col-12 col-md-6">
                                <label class="form-label text-white fw-semibold small">الأرقام التسلسلية Serial (اختياري)</label>
                                <textarea name="serial_numbers" rows="3" class="form-control font-monospace" placeholder="الرقم التسلسلي المقابل لكل كود بالترتيب..."></textarea>
                            </div>
                            <div class="col-12 col-md-6">
                                <label class="form-label text-white fw-semibold small">تاريخ انتهاء الصلاحية (اختياري)</label>
                                <input type="date" name="expires_at" class="form-control">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer border-0 pt-0">
                        <button type="button" class="btn btn-dark-outline" data-bs-dismiss="modal">إلغاء</button>
                        <button type="submit" class="btn btn-primary fw-bold px-4">
                            <i class="ti ti-plus me-1"></i> حفظ وإدراج الأكواد
                        </button>
                    </div>
                </form>
            </div>
        </div>
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
                        <h5 class="modal-title fw-bold text-white mb-0">تأكيد حذف الكود</h5>
                    </div>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body py-4">
                    <p class="text-muted mb-2">هل أنت متأكد من حذف هذا الكود من المخزون؟</p>
                    <div class="p-3 bg-dark rounded-3 border border-secondary">
                        <div class="fw-bold text-white fs-6" id="deleteTargetName">-</div>
                    </div>
                </div>
                <div class="modal-footer border-0 pt-0">
                    <button type="button" class="btn btn-dark-outline" data-bs-dismiss="modal">إلغاء</button>
                    <form id="singleDeleteForm" method="POST" class="d-inline">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-danger fw-bold px-4">
                            <i class="ti ti-trash me-1"></i> نعم، حذف
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
                        <h5 class="modal-title fw-bold text-white mb-0">تأكيد حذف الأكواد المحددة</h5>
                    </div>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body py-4">
                    <p class="text-muted mb-2">هل أنت متأكد من حذف الأكواد المحددة من المخزون؟</p>
                    <div class="p-3 bg-dark rounded-3 border border-secondary mb-3">
                        <div class="fw-bold text-warning fs-6 mb-1">
                            عدد الأكواد المحددة: <span id="bulkDeleteCount">0</span>
                        </div>
                        <small class="text-muted">الأكواد المباعة مسبقاً لن تتأثر.</small>
                    </div>
                </div>
                <div class="modal-footer border-0 pt-0">
                    <button type="button" class="btn btn-dark-outline" data-bs-dismiss="modal">إلغاء</button>
                    <form id="bulkDeleteForm" action="{{ route('admin.vouchers.bulk-destroy') }}" method="POST" class="d-inline">
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
    <script>
        window.voucherProductsList = @json($products);

        window.updateTierOptions = function(productId) {
            const tierSelect = document.getElementById('modalTierSelect');
            if (!tierSelect) return;
            tierSelect.innerHTML = '<option value="">-- اختر الباقة --</option>';

            if (!productId) return;

            const products = window.voucherProductsList || [];
            const product = products.find(p => String(p.id) === String(productId));

            if (!product || !product.tiers || product.tiers.length === 0) {
                const noOpt = document.createElement('option');
                noOpt.value = '';
                noOpt.disabled = true;
                noOpt.textContent = 'لا توجد باقات مسجلة لهذا المنتج';
                tierSelect.appendChild(noOpt);
                return;
            }

            product.tiers.forEach(tier => {
                const opt = document.createElement('option');
                opt.value = tier.id;
                opt.textContent = tier.name;
                tierSelect.appendChild(opt);
            });
        };

        // Auto wire change listener when DOM or modal is ready
        (function() {
            function bindProductSelect() {
                const sel = document.getElementById('modalProductSelect');
                if (sel && !sel.dataset.listenerBound) {
                    sel.dataset.listenerBound = 'true';
                    sel.addEventListener('change', function() {
                        window.updateTierOptions(this.value);
                    });
                    if (sel.value) {
                        window.updateTierOptions(sel.value);
                    }
                }
            }

            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', bindProductSelect);
            } else {
                bindProductSelect();
            }

            // Also check whenever modal is opened
            const modalEl = document.getElementById('importVouchersModal');
            if (modalEl) {
                modalEl.addEventListener('shown.bs.modal', function() {
                    bindProductSelect();
                    const sel = document.getElementById('modalProductSelect');
                    if (sel && sel.value) {
                        window.updateTierOptions(sel.value);
                    }
                });
            }
        })();
    </script>
@endsection

@push('scripts')
<script>
    // Backup declaration for direct page loads
    if (!window.updateTierOptions) {
        window.voucherProductsList = @json($products);
        window.updateTierOptions = function(productId) {
            const tierSelect = document.getElementById('modalTierSelect');
            if (!tierSelect) return;
            tierSelect.innerHTML = '<option value="">-- اختر الباقة --</option>';

            if (!productId) return;

            const products = window.voucherProductsList || [];
            const product = products.find(p => String(p.id) === String(productId));

            if (!product || !product.tiers || product.tiers.length === 0) {
                const noOpt = document.createElement('option');
                noOpt.value = '';
                noOpt.disabled = true;
                noOpt.textContent = 'لا توجد باقات مسجلة لهذا المنتج';
                tierSelect.appendChild(noOpt);
                return;
            }

            product.tiers.forEach(tier => {
                const opt = document.createElement('option');
                opt.value = tier.id;
                opt.textContent = tier.name;
                tierSelect.appendChild(opt);
            });
        };
    }

    function toggleCodeReveal(id, code) {
        const el = document.getElementById('code-text-' + id);
        const icon = document.getElementById('eye-icon-' + id);
        
        if (el.getAttribute('data-revealed') === 'true') {
            el.textContent = code.length > 6 ? code.substring(0, 3) + '****' + code.substring(code.length - 3) : '******';
            el.setAttribute('data-revealed', 'false');
            icon.className = 'ti ti-eye';
        } else {
            el.textContent = code;
            el.setAttribute('data-revealed', 'true');
            icon.className = 'ti ti-eye-off text-warning';
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        const selectAllCheckbox = document.getElementById('selectAllVouchers');
        const itemCheckboxes = document.querySelectorAll('.voucher-select-checkbox');
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

        window.clearVoucherSelection = function() {
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
