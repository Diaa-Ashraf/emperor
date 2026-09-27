@extends('layouts.admin')

@section('title', 'إعدادات أسعار وتطبيقات التارجت')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="card mb-4 border-0 shadow-sm">
            <div class="card-header bg-transparent border-0 d-flex flex-wrap justify-content-between align-items-center gap-3 py-3">
                <div>
                    <h5 class="card-title fw-bold mb-0 text-white"><i class="ti ti-target text-warning me-2"></i> تطبيقات بيع واستلام التارجت وأسعار التحويل</h5>
                    <small class="text-muted">تهيئة أسعار شراء التارجت من المستخدمين ومعرّف الوكالة (Agency ID)</small>
                </div>
                <div>
                    <a href="{{ route('admin.targets.index') }}" class="btn btn-outline-secondary">
                        <i class="ti ti-arrow-right me-1"></i> العودة للطلبات
                    </a>
                </div>
            </div>

            @if(session('success'))
                <div class="mx-3 alert alert-success alert-dismissible fade show" role="alert">
                    {{ session('success') }}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            @endif

            <div class="card-body">
                @forelse($apps as $app)
                    <div class="card bg-dark border-secondary mb-4">
                        <div class="card-header bg-transparent border-secondary d-flex justify-content-between align-items-center py-3">
                            <div class="d-flex align-items-center">
                                @if($app->image)
                                    <img src="{{ Storage::url($app->image) }}" alt="{{ $app->name }}" class="rounded me-3" style="width: 44px; height: 44px; object-fit: cover;">
                                @else
                                    <div class="rounded bg-black border border-secondary text-warning d-flex align-items-center justify-content-center me-3" style="width: 44px; height: 44px;">
                                        <i class="ti ti-device-mobile fs-4"></i>
                                    </div>
                                @endif
                                <div>
                                    <h6 class="fw-bold text-white mb-0">{{ $app->name }}</h6>
                                    <small class="text-muted">{{ $app->category->name ?? 'برامج الشات الصوتي' }}</small>
                                </div>
                            </div>
                            <div>
                                <span class="badge bg-warning text-dark font-monospace">Agency ID: {{ $defaultAgencyId }}</span>
                            </div>
                        </div>
                        <div class="card-body">
                            <form action="{{ route('admin.targets.update-rates', $app->id) }}" method="POST">
                                @csrf
                                <div class="table-responsive mb-3">
                                    <table class="table table-hover align-middle mb-0">
                                        <thead class="table-dark">
                                            <tr>
                                                <th class="ps-3" style="width: 25%;">الحد الأدنى للنقاط (Min Points)</th>
                                                <th style="width: 25%;">الحد الأقصى للنقاط (Max Points)</th>
                                                <th style="width: 25%;">سعر النقطة (EGP / Point)</th>
                                                <th class="text-center" style="width: 15%;">مفعل</th>
                                                <th class="text-end pe-3" style="width: 10%;">حذف</th>
                                            </tr>
                                        </thead>
                                        <tbody id="rates-container-{{ $app->id }}">
                                            @forelse($app->targetRates as $rIndex => $rate)
                                                <tr class="rate-row">
                                                    <td class="ps-3">
                                                        <input type="number" name="rates[{{ $rIndex }}][min_points]" class="form-control form-control-sm" value="{{ $rate->min_points }}" required>
                                                    </td>
                                                    <td>
                                                        <input type="number" name="rates[{{ $rIndex }}][max_points]" class="form-control form-control-sm" value="{{ $rate->max_points }}" required>
                                                    </td>
                                                    <td>
                                                        <input type="number" step="0.00000001" name="rates[{{ $rIndex }}][rate_per_point]" class="form-control form-control-sm font-monospace text-warning" value="{{ $rate->rate_per_point }}" required>
                                                    </td>
                                                    <td class="text-center">
                                                        <input type="checkbox" class="form-check-input" name="rates[{{ $rIndex }}][is_active]" value="1" {{ $rate->is_active ? 'checked' : '' }}>
                                                    </td>
                                                    <td class="text-end pe-3">
                                                        <button type="button" class="btn btn-sm btn-outline-danger remove-rate-btn"><i class="ti ti-trash"></i></button>
                                                    </td>
                                                </tr>
                                            @empty
                                                <tr class="rate-row">
                                                    <td class="ps-3">
                                                        <input type="number" name="rates[0][min_points]" class="form-control form-control-sm" value="1000" required>
                                                    </td>
                                                    <td>
                                                        <input type="number" name="rates[0][max_points]" class="form-control form-control-sm" value="1000000" required>
                                                    </td>
                                                    <td>
                                                        <input type="number" step="0.00000001" name="rates[0][rate_per_point]" class="form-control form-control-sm font-monospace text-warning" value="0.05" required>
                                                    </td>
                                                    <td class="text-center">
                                                        <input type="checkbox" class="form-check-input" name="rates[0][is_active]" value="1" checked>
                                                    </td>
                                                    <td class="text-end pe-3">
                                                        <button type="button" class="btn btn-sm btn-outline-danger remove-rate-btn"><i class="ti ti-trash"></i></button>
                                                    </td>
                                                </tr>
                                            @endforelse
                                        </tbody>
                                    </table>
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <button type="button" class="btn btn-sm btn-outline-warning add-rate-btn" data-app-id="{{ $app->id }}">
                                        <i class="ti ti-plus me-1"></i> إضافة شريحة سعر جديدة
                                    </button>
                                    <button type="submit" class="btn btn-sm btn-primary">
                                        <i class="ti ti-device-floppy me-1"></i> حفظ أسعار {{ $app->name }}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                @empty
                    <div class="text-center py-5 text-muted">
                        <i class="ti ti-device-mobile-off fs-1 d-block mb-2 text-warning"></i>
                        لا توجد تطبيقات تارجت مضافة حتى الآن. يمكنك إضافة منتج بنوع "بيع واستلام تارجت" من شاشة المنتجات.
                    </div>
                @endforelse
            </div>
        </div>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    let rateCounter = 1000;

    document.querySelectorAll('.add-rate-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const appId = this.dataset.appId;
            const container = document.getElementById(`rates-container-${appId}`);
            const tr = document.createElement('tr');
            tr.className = 'rate-row';
            tr.innerHTML = `
                <td class="ps-3">
                    <input type="number" name="rates[${rateCounter}][min_points]" class="form-control form-control-sm" value="50000" required>
                </td>
                <td>
                    <input type="number" name="rates[${rateCounter}][max_points]" class="form-control form-control-sm" value="200000" required>
                </td>
                <td>
                    <input type="number" step="0.00000001" name="rates[${rateCounter}][rate_per_point]" class="form-control form-control-sm font-monospace text-warning" value="0.055" required>
                </td>
                <td class="text-center">
                    <input type="checkbox" class="form-check-input" name="rates[${rateCounter}][is_active]" value="1" checked>
                </td>
                <td class="text-end pe-3">
                    <button type="button" class="btn btn-sm btn-outline-danger remove-rate-btn"><i class="ti ti-trash"></i></button>
                </td>
            `;
            container.appendChild(tr);
            rateCounter++;
        });
    });

    document.addEventListener('click', function(e) {
        if (e.target.closest('.remove-rate-btn')) {
            e.target.closest('.rate-row').remove();
        }
    });
});
</script>
@endsection
