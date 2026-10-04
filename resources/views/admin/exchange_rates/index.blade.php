@extends('layouts.admin')

@section('title', 'إدارة أسعار الصرف وتحويل العملات')

@section('content')
<div class="row g-4">
    <!-- Add/Update Rate Form -->
    <div class="col-lg-4">
        <div class="card border-0 shadow-sm" style="background: var(--bg-card, #12131a); border-radius: 16px;">
            <div class="card-header bg-transparent border-bottom border-secondary py-3">
                <h5 class="card-title fw-bold mb-0 text-white d-flex align-items-center gap-2">
                    <i class="ti ti-currency-dollar text-gold fs-4"></i>
                    تحديد سعر صرف ثابت
                </h5>
                <small class="text-muted">تحديد أسعار التحويل بين العملات للمحفظة</small>
            </div>
            <div class="card-body p-4">
                @if(session('success'))
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <i class="ti ti-check me-1"></i> {{ session('success') }}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                @endif

                @if($errors->any())
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <ul class="mb-0 ps-3">
                        @foreach($errors->all() as $error)
                        <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                @endif

                <form action="{{ route('admin.exchange-rates.store') }}" method="POST">
                    @csrf

                    <div class="mb-3">
                        <label class="form-label text-white fw-semibold">عملة المصدر (From)</label>
                        <select name="from_currency" class="form-select bg-dark text-white border-secondary" required>
                            <option value="USD">USD - دولار أمريكي</option>
                            <option value="EGP">EGP - جنيه مصري</option>
                            <option value="SAR">SAR - ريال سعودي</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label class="form-label text-white fw-semibold">عملة الهدف (To)</label>
                        <select name="to_currency" class="form-select bg-dark text-white border-secondary" required>
                            <option value="EGP">EGP - جنيه مصري</option>
                            <option value="USD">USD - دولار أمريكي</option>
                            <option value="SAR">SAR - ريال سعودي</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label class="form-label text-white fw-semibold">سعر الصرف (1 From = X To)</label>
                        <input type="number" step="0.000001" min="0.000001" name="rate" class="form-control bg-dark text-white border-secondary" placeholder="مثال: 50.00" required>
                        <small class="text-muted">مثال: 1 دولار = 50 جنيه مصري، اكتب 50.00</small>
                    </div>

                    <div class="mb-3">
                        <label class="form-label text-white fw-semibold">عمولة التحويل % (اختياري)</label>
                        <input type="number" step="0.01" min="0" max="100" name="conversion_fee_percent" class="form-control bg-dark text-white border-secondary" value="0.00">
                    </div>

                    <div class="form-check mb-4">
                        <input class="form-check-input" type="checkbox" name="is_active" id="isActive" value="1" checked>
                        <label class="form-check-label text-white" for="isActive">
                            تفعيل سعر الصرف فوراً
                        </label>
                    </div>

                    <button type="submit" class="btn btn-warning w-100 py-2 fw-bold text-dark d-flex align-items-center justify-content-center gap-2">
                        <i class="ti ti-device-floppy fs-5"></i>
                        حفظ سعر الصرف
                    </button>
                </form>
            </div>
        </div>
    </div>

    <!-- Rates Table -->
    <div class="col-lg-8">
        <div class="card border-0 shadow-sm" style="background: var(--bg-card, #12131a); border-radius: 16px;">
            <div class="card-header bg-transparent border-bottom border-secondary py-3 d-flex justify-content-between align-items-center">
                <h5 class="card-title fw-bold mb-0 text-white d-flex align-items-center gap-2">
                    <i class="ti ti-arrows-exchange text-gold fs-4"></i>
                    جدول أسعار الصرف النشطة
                </h5>
                <span class="badge bg-dark text-gold border border-gold">{{ count($rates) }} عملة</span>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead class="table-dark">
                            <tr>
                                <th class="ps-3">زوج العملات</th>
                                <th>سعر الصرف</th>
                                <th>عمولة التحويل</th>
                                <th>الحالة</th>
                                <th>آخر تحديث بواسطة</th>
                                <th class="text-end pe-3">إجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse($rates as $rate)
                            <tr>
                                <td class="ps-3">
                                    <div class="d-flex align-items-center gap-2">
                                        <span class="badge bg-primary fs-7">{{ $rate->from_currency }}</span>
                                        <i class="ti ti-arrow-left text-muted"></i>
                                        <span class="badge bg-success fs-7">{{ $rate->to_currency }}</span>
                                    </div>
                                </td>
                                <td>
                                    <div class="fw-bold text-gold fs-6 font-monospace">
                                        1 {{ $rate->from_currency }} = {{ number_format((float) $rate->rate, 4) }} {{ $rate->to_currency }}
                                    </div>
                                </td>
                                <td>
                                    @if((float)$rate->conversion_fee_percent > 0)
                                    <span class="badge bg-warning text-dark">{{ $rate->conversion_fee_percent }}%</span>
                                    @else
                                    <span class="badge bg-secondary text-light">بدون عمولة (0%)</span>
                                    @endif
                                </td>
                                <td>
                                    @if($rate->is_active)
                                    <span class="badge bg-success">نشط ومتاح للتحويل</span>
                                    @else
                                    <span class="badge bg-danger">معطل</span>
                                    @endif
                                </td>
                                <td>
                                    <small class="text-muted">{{ $rate->updatedBy?->name ?? 'النظام' }}</small>
                                </td>
                                <td class="text-end pe-3">
                                    <form action="{{ route('admin.exchange-rates.toggle', $rate->id) }}" method="POST" class="d-inline">
                                        @csrf
                                        <button type="submit" class="btn btn-sm {{ $rate->is_active ? 'btn-outline-danger' : 'btn-outline-success' }}">
                                            {{ $rate->is_active ? 'تعطيل' : 'تفعيل' }}
                                        </button>
                                    </form>
                                </td>
                            </tr>
                            @empty
                            <tr>
                                <td colspan="6" class="text-center py-5 text-muted">
                                    لا توجد أسعار صرف محددة حتى الآن
                                </td>
                            </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection