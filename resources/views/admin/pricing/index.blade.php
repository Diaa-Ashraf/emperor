@extends('layouts.admin')

@section('title', 'قواعد وهوامش التسعير')

@section('header')
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
            <h3 class="page-header-title mb-1">
                <i class="ti ti-coin text-gold"></i>
                <span>قواعد وهوامش التسعير (Pricing Rules)</span>
            </h3>
            <p class="page-header-subtitle mb-0">التحكم في نسب وهوامش الأرباح المضافة، خصومات الوكلاء، وتطبيق الأسعار التلقائية</p>
        </div>
        <div class="d-flex flex-wrap align-items-center gap-2">
            <form action="{{ route('admin.pricing.recalculate') }}" method="POST" class="d-inline" onsubmit="this.querySelector('button').disabled=true; this.querySelector('button').innerHTML='<i class=\'ti ti-loader animate-spin me-1\'></i> جاري الحساب والتطبيق...';">
                @csrf
                <button type="submit" class="btn btn-outline-warning fw-bold px-3 d-inline-flex align-items-center gap-2" title="إعادة حساب وتطبيق هوامش الربح على كافة الباقات غير اليدوية">
                    <i class="ti ti-calculator fs-5"></i>
                    <span>تطبيق الأسعار على كافة المنتجات</span>
                </button>
            </form>
            <button type="button" class="btn btn-primary fw-bold px-3 d-inline-flex align-items-center gap-2" data-bs-toggle="modal" data-bs-target="#addRuleModal">
                <i class="ti ti-plus fs-5"></i>
                <span>إضافة قاعدة تسعير</span>
            </button>
        </div>
    </div>
@endsection

@section('content')
    <!-- Stats Cards -->
    <div class="row g-3 mb-4">
        <div class="col-6 col-md-3">
            <div class="card p-3 text-center">
                <span class="text-muted small d-block mb-1">إجمالي قواعد التسعير</span>
                <span class="fw-bold text-white fs-4 font-monospace">{{ $stats['total_rules'] }}</span>
            </div>
        </div>
        <div class="col-6 col-md-3">
            <div class="card p-3 text-center">
                <span class="text-muted small d-block mb-1">القواعد الفعالة</span>
                <span class="fw-bold text-success fs-4 font-monospace">{{ $stats['active_rules'] }}</span>
            </div>
        </div>
        <div class="col-6 col-md-3">
            <div class="card p-3 text-center">
                <span class="text-muted small d-block mb-1">باقات التسعير التلقائي</span>
                <span class="fw-bold text-info fs-4 font-monospace">{{ $stats['auto_tiers'] }}</span>
            </div>
        </div>
        <div class="col-6 col-md-3">
            <div class="card p-3 text-center">
                <span class="text-muted small d-block mb-1">باقات التسعير اليدوي الثابت</span>
                <span class="fw-bold text-warning fs-4 font-monospace">{{ $stats['manual_tiers'] }}</span>
            </div>
        </div>
    </div>

    <!-- Pricing Rules Table Card -->
    <div class="card">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead>
                    <tr>
                        <th class="ps-3" style="width: 70px;">الأولوية</th>
                        <th>اسم القاعدة</th>
                        <th>النطاق المستهدف (Target)</th>
                        <th>نوع الهامش / الحسبة</th>
                        <th>القيمة</th>
                        <th>الحالة</th>
                        <th class="text-end pe-3">الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($rules as $rule)
                        <tr>
                            <td class="ps-3">
                                <span class="badge badge-gold font-monospace fw-bold">#{{ $rule->priority }}</span>
                            </td>
                            <td>
                                <div class="fw-bold text-white fs-6">{{ $rule->name }}</div>
                            </td>
                            <td>
                                @if($rule->target_type === 'all')
                                    <span class="badge bg-dark border border-secondary text-warning px-2 py-1">
                                        <i class="ti ti-world me-1"></i> كافة المنتجات والأقسام
                                    </span>
                                @elseif($rule->target_type === 'category')
                                    @php $cat = $categories->firstWhere('id', $rule->target_id); @endphp
                                    <span class="badge bg-primary-subtle text-primary border border-primary-subtle px-2 py-1">
                                        <i class="ti ti-folder me-1"></i> قسم: {{ $cat?->name ?? '#' . $rule->target_id }}
                                    </span>
                                @elseif($rule->target_type === 'product')
                                    @php $prod = $products->firstWhere('id', $rule->target_id); @endphp
                                    <span class="badge bg-info-subtle text-info border border-info-subtle px-2 py-1">
                                        <i class="ti ti-device-gamepad me-1"></i> منتج: {{ $prod?->name ?? '#' . $rule->target_id }}
                                    </span>
                                @else
                                    <span class="badge bg-secondary font-monospace">{{ $rule->target_type }}</span>
                                @endif
                            </td>
                            <td>
                                @php
                                    $marginLabels = [
                                        'percentage_markup' => ['label' => 'نسبة ربح مئوية (+%)', 'class' => 'text-success'],
                                        'fixed_markup' => ['label' => 'هامش ربح ثابت (+مبلغ)', 'class' => 'text-success'],
                                        'percentage_discount' => ['label' => 'خصم مئوي (-%)', 'class' => 'text-info'],
                                        'fixed_discount' => ['label' => 'خصم ثابت (-مبلغ)', 'class' => 'text-info'],
                                    ];
                                    $mInfo = $marginLabels[$rule->margin_type] ?? ['label' => $rule->margin_type, 'class' => 'text-muted'];
                                @endphp
                                <span class="fw-semibold {{ $mInfo['class'] }}">{{ $mInfo['label'] }}</span>
                            </td>
                            <td>
                                <span class="badge bg-dark border border-secondary text-warning font-monospace fs-6 px-2 py-1">
                                    @if(str_contains($rule->margin_type, 'percentage'))
                                        +{{ number_format((float) $rule->margin_value, 2) }}%
                                    @else
                                        +{{ number_format((float) $rule->margin_value, 2) }}
                                    @endif
                                </span>
                            </td>
                            <td>
                                @if($rule->is_active)
                                    <span class="badge bg-success-subtle text-success border border-success-subtle px-2 py-1">
                                        <i class="ti ti-circle-check me-1"></i> نشط
                                    </span>
                                @else
                                    <span class="badge bg-danger-subtle text-danger border border-danger-subtle px-2 py-1">
                                        <i class="ti ti-circle-x me-1"></i> معطل
                                    </span>
                                @endif
                            </td>
                            <td class="text-end pe-3">
                                <div class="d-inline-flex align-items-center gap-1">
                                    <form action="{{ route('admin.pricing.toggle-active', $rule->id) }}" method="POST" class="d-inline">
                                        @csrf
                                        <button type="submit" class="btn-action {{ $rule->is_active ? 'btn-action-info' : 'btn-action-success' }}" title="{{ $rule->is_active ? 'تعطيل القاعدة' : 'تفعيل القاعدة' }}">
                                            <i class="ti {{ $rule->is_active ? 'ti-eye-off' : 'ti-eye' }}"></i>
                                        </button>
                                    </form>
                                    <button type="button" class="btn-action btn-action-danger" title="حذف القاعدة" onclick="openDeleteModal('{{ route('admin.pricing.destroy', $rule->id) }}', '{{ addslashes($rule->name) }}')">
                                        <i class="ti ti-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="7" class="text-center py-5">
                                <div class="py-4">
                                    <i class="ti ti-coin-off fs-1 text-warning d-block mb-3 opacity-50"></i>
                                    <h6 class="text-white fw-bold mb-1">لا توجد قواعد تسعير مضافة حتى الآن</h6>
                                    <p class="text-muted small mb-3">أضف قواعد لتحديد هوامش الربح تلقائياً على المنتجات والأقسام</p>
                                    <button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#addRuleModal">
                                        <i class="ti ti-plus me-1"></i> إضافة قاعدة تسعير جديدة
                                    </button>
                                </div>
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>

    <!-- Add Pricing Rule Modal -->
    <div class="modal fade" id="addRuleModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-0 pb-0">
                    <div class="d-flex align-items-center gap-2">
                        <div class="rounded-circle bg-warning-subtle text-warning d-flex align-items-center justify-content-center" style="width: 42px; height: 42px;">
                            <i class="ti ti-coin fs-4 text-gold"></i>
                        </div>
                        <div>
                            <h5 class="modal-title fw-bold text-white mb-0">إضافة قاعدة تسعير جديدة</h5>
                            <small class="text-muted">تحديد استراتيجية حساب سعر البيع وهوامش الربح</small>
                        </div>
                    </div>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form action="{{ route('admin.pricing.store') }}" method="POST">
                    @csrf
                    <div class="modal-body py-4">
                        <div class="row g-3">
                            <div class="col-12">
                                <label class="form-label text-white fw-semibold small">اسم القاعدة <span class="text-danger">*</span></label>
                                <input type="text" name="name" class="form-control" placeholder="مثال: هامش أرباح ألعاب الموبايل 8%" required>
                            </div>

                            <div class="col-12 col-md-6">
                                <label class="form-label text-white fw-semibold small">النطاق المستهدف <span class="text-danger">*</span></label>
                                <select name="target_type" id="ruleTargetType" class="form-select" required onchange="handleTargetTypeChange(this.value)">
                                    <option value="all">كافة المنتجات (شامل)</option>
                                    <option value="category">قسم محدد</option>
                                    <option value="product">منتج محدد</option>
                                </select>
                            </div>

                            <div class="col-12 col-md-6" id="targetIdGroup" style="display: none;">
                                <label class="form-label text-white fw-semibold small">العنصر المستهدف</label>
                                <select name="target_id" id="ruleTargetId" class="form-select">
                                    <!-- Populated via JS -->
                                </select>
                            </div>

                            <div class="col-12 col-md-6">
                                <label class="form-label text-white fw-semibold small">نوع الهامش <span class="text-danger">*</span></label>
                                <select name="margin_type" class="form-select" required>
                                    <option value="percentage_markup">نسبة ربح مئوية (+%)</option>
                                    <option value="fixed_markup">مبلغ ربح ثابت (+EGP/USD)</option>
                                    <option value="percentage_discount">خصم مئوي (-%)</option>
                                    <option value="fixed_discount">خصم ثابت (-EGP/USD)</option>
                                </select>
                            </div>

                            <div class="col-12 col-md-6">
                                <label class="form-label text-white fw-semibold small">قيمة الهامش <span class="text-danger">*</span></label>
                                <input type="number" step="0.01" min="0" name="margin_value" class="form-control" placeholder="مثال: 10.00" required>
                            </div>

                            <div class="col-12 col-md-6">
                                <label class="form-label text-white fw-semibold small">الأولوية (Priority)</label>
                                <input type="number" name="priority" class="form-control" value="10" min="1" max="999" required>
                                <small class="text-muted" style="font-size: 11px;">الرقم الأصغر يُطبق أولاً.</small>
                            </div>

                            <div class="col-12 col-md-6 d-flex align-items-center">
                                <div class="form-check mt-3">
                                    <input class="form-check-input" type="checkbox" name="is_active" id="ruleActive" value="1" checked>
                                    <label class="form-check-label text-white small" for="ruleActive">
                                        تفعيل القاعدة فوراً
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer border-0 pt-0">
                        <button type="button" class="btn btn-dark-outline" data-bs-dismiss="modal">إلغاء</button>
                        <button type="submit" class="btn btn-primary fw-bold px-4">
                            <i class="ti ti-plus me-1"></i> حفظ القاعدة
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-0 pb-0">
                    <div class="d-flex align-items-center gap-2">
                        <div class="rounded-circle bg-danger-subtle text-danger d-flex align-items-center justify-content-center" style="width: 42px; height: 42px;">
                            <i class="ti ti-alert-triangle fs-4"></i>
                        </div>
                        <h5 class="modal-title fw-bold text-white mb-0">تأكيد حذف قاعدة التسعير</h5>
                    </div>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body py-4">
                    <p class="text-muted mb-2">هل أنت متأكد من رغبتك في حذف قاعدة التسعير التالية؟</p>
                    <div class="p-3 bg-dark rounded-3 border border-secondary">
                        <div class="fw-bold text-white fs-6" id="deleteTargetName">-</div>
                    </div>
                </div>
                <div class="modal-footer border-0 pt-0">
                    <button type="button" class="btn btn-dark-outline" data-bs-dismiss="modal">إلغاء</button>
                    <form id="deleteForm" method="POST" class="d-inline">
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
@endsection

@push('scripts')
<script>
    const categoriesData = @json($categories);
    const productsData = @json($products);

    function handleTargetTypeChange(type) {
        const group = document.getElementById('targetIdGroup');
        const select = document.getElementById('ruleTargetId');
        select.innerHTML = '';

        if (type === 'all') {
            group.style.display = 'none';
        } else if (type === 'category') {
            group.style.display = 'block';
            categoriesData.forEach(c => {
                const opt = document.createElement('option');
                opt.value = c.id;
                opt.textContent = c.name;
                select.appendChild(opt);
            });
        } else if (type === 'product') {
            group.style.display = 'block';
            productsData.forEach(p => {
                const opt = document.createElement('option');
                opt.value = p.id;
                opt.textContent = p.name;
                select.appendChild(opt);
            });
        }
    }

    function openDeleteModal(url, name) {
        const form = document.getElementById('deleteForm');
        const nameEl = document.getElementById('deleteTargetName');
        form.action = url;
        nameEl.textContent = name;
        
        const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
        modal.show();
    }
</script>
@endpush
