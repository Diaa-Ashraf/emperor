@extends('layouts.admin')

@section('title', 'إدارة طرق الدفع والتحويلات')

@section('header')
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
            <h3 class="page-header-title mb-1 d-flex align-items-center gap-2">
                <i class="ti ti-credit-card text-gold"></i>
                <span>إدارة طرق التحويل والدفع (بطاقات الشحن)</span>
            </h3>
            <p class="page-header-subtitle mb-0">التحكم في بطاقات الدفع الرقمية وفلاتر الدول (مصر، الأردن، سوريا، الخليج، USDT) وتعديل الحسابات والملاحظات.</p>
        </div>
        <div class="d-flex flex-wrap align-items-center gap-2 w-100 w-md-auto">
            <a href="{{ route('admin.payment-methods.create') }}" class="btn btn-primary fw-bold px-3 d-inline-flex align-items-center justify-content-center gap-2 w-100 w-md-auto">
                <i class="ti ti-plus fs-5"></i>
                <span>إضافة وسيلة تحويل جديدة</span>
            </a>
        </div>
    </div>
@endsection

@section('content')
    <!-- Quick Stats Cards (2-per-row on mobile, 4-on-desktop) -->
    <div class="row g-2 g-md-3 mb-4">
        <div class="col-6 col-xl-3">
            <div class="card p-2 p-md-3 border-0 shadow-sm h-100" style="background: linear-gradient(135deg, rgba(212, 165, 55, 0.12) 0%, rgba(20, 20, 30, 0.9) 100%);">
                <div class="d-flex align-items-center justify-content-between">
                    <div>
                        <div class="text-muted fs-8 fs-md-7 fw-bold mb-1">إجمالي الطرق</div>
                        <h3 class="fw-black text-white mb-0 fs-4 fs-md-3">{{ $counts['total'] }}</h3>
                    </div>
                    <div class="p-2 p-md-3 rounded-circle bg-dark border border-secondary text-gold d-none d-sm-flex">
                        <i class="ti ti-credit-card fs-4 fs-md-3"></i>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-6 col-xl-3">
            <div class="card p-2 p-md-3 border-0 shadow-sm h-100" style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.12) 0%, rgba(20, 20, 30, 0.9) 100%);">
                <div class="d-flex align-items-center justify-content-between">
                    <div>
                        <div class="text-muted fs-8 fs-md-7 fw-bold mb-1">طرق مفعلة</div>
                        <h3 class="fw-black text-success mb-0 fs-4 fs-md-3">{{ $counts['active'] }}</h3>
                    </div>
                    <div class="p-2 p-md-3 rounded-circle bg-dark border border-secondary text-success d-none d-sm-flex">
                        <i class="ti ti-check fs-4 fs-md-3"></i>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-6 col-xl-3">
            <div class="card p-2 p-md-3 border-0 shadow-sm h-100" style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(20, 20, 30, 0.9) 100%);">
                <div class="d-flex align-items-center justify-content-between">
                    <div>
                        <div class="text-muted fs-8 fs-md-7 fw-bold mb-1">الدول المعتمدة</div>
                        <h3 class="fw-black text-info mb-0 fs-4 fs-md-3">{{ $counts['countries'] }}</h3>
                    </div>
                    <div class="p-2 p-md-3 rounded-circle bg-dark border border-secondary text-info d-none d-sm-flex">
                        <i class="ti ti-world fs-4 fs-md-3"></i>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-6 col-xl-3">
            <div class="card p-2 p-md-3 border-0 shadow-sm h-100" style="background: linear-gradient(135deg, rgba(239, 68, 68, 0.12) 0%, rgba(20, 20, 30, 0.9) 100%);">
                <div class="d-flex align-items-center justify-content-between">
                    <div>
                        <div class="text-muted fs-8 fs-md-7 fw-bold mb-1">طرق معطلة</div>
                        <h3 class="fw-black text-danger mb-0 fs-4 fs-md-3">{{ $counts['inactive'] }}</h3>
                    </div>
                    <div class="p-2 p-md-3 rounded-circle bg-dark border border-secondary text-danger d-none d-sm-flex">
                        <i class="ti ti-ban fs-4 fs-md-3"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Filter & Search Toolbar -->
    <div class="card p-3 mb-4">
        <form method="GET" action="{{ route('admin.payment-methods.index') }}" class="row g-2 align-items-center">
            <div class="col-12 col-md-5">
                <div class="input-group">
                    <span class="input-group-text bg-dark border-secondary text-muted"><i class="ti ti-search"></i></span>
                    <input type="text" name="search" class="form-control" placeholder="ابحث باسم الطريقة، الدولة، العملة أو رقم الحساب..." value="{{ request('search') }}">
                </div>
            </div>

            <div class="col-12 col-md-4">
                <select name="country" class="form-select" onchange="this.form.submit()">
                    <option value="all">كل الدول والتحويلات (الكل)</option>
                    @foreach($countriesList as $c)
                        <option value="{{ $c['code'] }}" {{ request('country') == $c['code'] ? 'selected' : '' }}>
                            {{ $c['name'] }} ({{ $c['currency'] }}) - {{ $c['count'] }} طريقة
                        </option>
                    @endforeach
                </select>
            </div>

            <div class="col-12 col-md-3 d-flex gap-2">
                <button type="submit" class="btn btn-primary fw-bold flex-grow-1">
                    <i class="ti ti-filter"></i> تصفية
                </button>
                @if(request()->hasAny(['search', 'country']))
                    <a href="{{ route('admin.payment-methods.index') }}" class="btn btn-secondary px-3">
                        <i class="ti ti-refresh"></i> إلغاء
                    </a>
                @endif
            </div>
        </form>
    </div>

    <!-- Payment Methods Table -->
    <div class="card">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead class="text-nowrap">
                    <tr>
                        <th class="ps-3" style="width: 60px;">الترتيب</th>
                        <th style="width: 70px;">الشعار</th>
                        <th>اسم الوسيلة (على الكارت)</th>
                        <th>التحويل والدولة</th>
                        <th>العملة</th>
                        <th>رقم الحساب / المحفظة</th>
                        <th>ملاحظة الكارت</th>
                        <th>الحد الأدنى</th>
                        <th>الحالة</th>
                        <th class="text-end pe-3">الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($methods as $method)
                        <tr>
                            <td class="ps-3">
                                <span class="badge bg-secondary font-monospace">#{{ $method->sort_order }}</span>
                            </td>
                            <td>
                                @if($method->logo && !str_starts_with($method->logo, 'http') && !str_starts_with($method->logo, '/storage/'))
                                    <div class="rounded-circle d-flex align-items-center justify-content-center bg-dark border border-secondary" style="width: 44px; height: 44px; font-size: 10px; font-weight: bold; color: #f5d061;">
                                        {{ $method->currency }}
                                    </div>
                                @elseif($method->logo)
                                    <img src="{{ str_starts_with($method->logo, 'http') ? $method->logo : asset($method->logo) }}" alt="{{ $method->name }}" class="rounded-circle border border-secondary shadow-sm" style="width: 44px; height: 44px; object-fit: contain; background: #fff; padding: 2px;">
                                @else
                                    <div class="rounded-circle d-flex align-items-center justify-content-center bg-dark border border-secondary" style="width: 44px; height: 44px; color: #d4a537;">
                                        <i class="ti ti-credit-card fs-4"></i>
                                    </div>
                                @endif
                            </td>
                            <td>
                                <div class="fw-black text-white fs-6">{{ $method->name }}</div>
                                <div class="badge bg-dark border border-secondary text-gold font-monospace fs-8">{{ $method->sub_name ?: $method->name }}</div>
                            </td>
                            <td>
                                <span class="badge bg-primary-subtle text-primary border border-primary-subtle px-2 py-1 fs-7">
                                    {{ $method->country_name ?: 'تحويل مصر' }}
                                </span>
                            </td>
                            <td>
                                <span class="badge badge-gold px-2 py-1 fs-7 font-monospace fw-bold">
                                    {{ $method->currency }}
                                </span>
                            </td>
                            <td>
                                @php
                                    $acc = $method->account_number ?: ($method->account_details['account_number'] ?? ($method->account_details['wallet_number'] ?? ($method->account_details['ipa_handle'] ?? ($method->account_details['trc20_address'] ?? ''))));
                                @endphp
                                <code class="text-white bg-dark px-2 py-1 rounded border border-secondary font-monospace fs-7">{{ $acc ?: '-' }}</code>
                            </td>
                            <td style="max-width: 220px;">
                                <div class="text-muted fs-8 text-truncate" title="{{ $method->note }}">{{ $method->note ?: 'لا توجد ملاحظة' }}</div>
                            </td>
                            <td>
                                <span class="fw-bold text-white fs-7">{{ number_format($method->min_amount, 2) }}</span>
                                <small class="text-muted fs-8">{{ $method->currency }}</small>
                            </td>
                            <td>
                                <form action="{{ route('admin.payment-methods.toggle-active', $method->id) }}" method="POST" class="d-inline">
                                    @csrf
                                    <button type="submit" class="badge bg-{{ $method->is_active ? 'success' : 'danger' }}-subtle text-{{ $method->is_active ? 'success' : 'danger' }} border border-{{ $method->is_active ? 'success' : 'danger' }}-subtle px-2 py-1 btn btn-sm border-0" style="cursor: pointer;">
                                        <i class="ti ti-{{ $method->is_active ? 'circle-check' : 'circle-x' }} me-1"></i>
                                        {{ $method->is_active ? 'مفعل' : 'معطل' }}
                                    </button>
                                </form>
                            </td>
                            <td class="text-end pe-3">
                                <div class="d-inline-flex align-items-center gap-1">
                                    <a href="{{ route('admin.payment-methods.edit', $method->id) }}" class="btn btn-sm btn-icon btn-dark text-warning border border-secondary" title="تعديل الطريقة">
                                        <i class="ti ti-edit"></i>
                                    </a>

                                    <button type="button" 
                                            class="btn btn-sm btn-icon btn-dark text-danger border border-secondary" 
                                            title="حذف"
                                            onclick="confirmDeleteMethod({{ $method->id }}, '{{ addslashes($method->name) }}', '{{ addslashes($method->sub_name ?: $method->name) }}', '{{ addslashes($method->country_name ?: $method->tag) }}')">
                                        <i class="ti ti-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="10" class="text-center py-5">
                                <div class="text-muted mb-2"><i class="ti ti-credit-card-off fs-1"></i></div>
                                <h5 class="text-white fw-bold">لا توجد طرق دفع مطابقة</h5>
                                <p class="text-muted fs-7 mb-3">يمكنك إضافة وسيلة تحويل جديدة لأي دولة أو تعديل الفلاتر الحالية.</p>
                                <a href="{{ route('admin.payment-methods.create') }}" class="btn btn-primary btn-sm fw-bold">
                                    <i class="ti ti-plus"></i> إضافة وسيلة تحويل الآن
                                </a>
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        @if($methods->hasPages())
            <div class="card-footer bg-transparent border-top border-secondary py-3">
                {{ $methods->links() }}
            </div>
        @endif
    </div>

    <!-- Chic Luxury Delete Confirmation Modal -->
    <div class="modal fade" id="deletePaymentMethodModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" style="max-width: 440px;">
            <div class="modal-content rounded-4 border-0 shadow-lg text-white" style="background: linear-gradient(180deg, #181824 0%, #0d0d15 100%); border: 1.5px solid rgba(239, 68, 68, 0.45) !important;">
                <div class="modal-body p-4 text-center">
                    <!-- Glowing Pulsing Danger Icon -->
                    <div class="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle shadow" 
                         style="width: 68px; height: 68px; background: radial-gradient(circle, rgba(239, 68, 68, 0.25) 0%, rgba(136, 17, 36, 0.15) 100%); border: 2px solid rgba(239, 68, 68, 0.5); color: #EF4444;">
                        <i class="ti ti-trash fs-1"></i>
                    </div>

                    <h4 class="fw-black text-white mb-2">تأكيد حذف وسيلة الدفع</h4>
                    <p class="text-muted fs-7 mb-3">هل أنت متأكد من رغبتك في حذف وسيلة التحويل هذه نهائياً؟</p>

                    <!-- Method Highlight Box -->
                    <div class="p-3 rounded-3 mb-3 text-start" style="background: rgba(0, 0, 0, 0.45); border: 1px solid rgba(255, 255, 255, 0.1);">
                        <div class="d-flex align-items-center justify-content-between mb-1">
                            <span class="text-white fw-bold fs-6" id="deleteMethodName">-</span>
                            <span class="badge bg-danger-subtle text-danger border border-danger-subtle fs-8" id="deleteMethodCountry">-</span>
                        </div>
                        <div class="text-gold font-monospace fs-8" id="deleteMethodSubName">-</div>
                    </div>

                    <div class="alert alert-dark border border-danger-subtle text-danger py-2 px-3 fs-8 mb-4 d-flex align-items-center gap-2 text-start">
                        <i class="ti ti-alert-triangle fs-5 text-danger flex-shrink-0"></i>
                        <span>تنبيه: سيتم إزالة هذه البطاقة فوراً من صفحة الشحن لجميع العملاء.</span>
                    </div>

                    <div class="d-flex gap-2">
                        <button type="button" class="btn btn-secondary flex-grow-1 fw-bold py-2 rounded-3" data-bs-dismiss="modal">
                            إلغاء الأمر
                        </button>
                        <form id="deleteMethodForm" method="POST" class="flex-grow-1 m-0">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-danger w-100 fw-bold py-2 rounded-3 d-flex align-items-center justify-content-center gap-2 shadow-sm">
                                <i class="ti ti-trash"></i>
                                <span>نعم، حذف الآن</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
<script>
function confirmDeleteMethod(id, name, subName, country) {
    document.getElementById('deleteMethodName').textContent = name;
    document.getElementById('deleteMethodSubName').textContent = subName;
    document.getElementById('deleteMethodCountry').textContent = country;
    
    const form = document.getElementById('deleteMethodForm');
    form.action = "{{ url('admin/payment-methods') }}/" + id;
    
    const modal = new bootstrap.Modal(document.getElementById('deletePaymentMethodModal'));
    modal.show();
}
</script>
@endpush
