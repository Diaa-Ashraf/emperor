@extends('layouts.admin')

@section('title', 'ربط وتوجيه المزودين: ' . $product->name)

@section('content')
<div class="row justify-content-center">
    <div class="col-12">
        <div class="card border-0 shadow-sm mb-4">
            <div class="card-header bg-transparent border-0 py-3 d-flex justify-content-between align-items-center">
                <div>
                    <h5 class="card-title fw-bold mb-0 text-white"><i class="ti ti-server text-warning me-2"></i> ربط وتوجيه المزودين (Cascade Routing): {{ $product->name }}</h5>
                    <small class="text-muted">تحديد المزودين المسؤولين عن تنفيذ كل باقة شحن وترتيب أولويات السقوط والتنفيذ التلقائي (Fallback)</small>
                </div>
                <a href="{{ route('admin.products.index') }}" class="btn btn-outline-secondary btn-sm">
                    <i class="ti ti-arrow-right me-1"></i> العودة للمنتجات
                </a>
            </div>

            @if(session('success'))
                <div class="mx-3 alert alert-success alert-dismissible fade show" role="alert">
                    {{ session('success') }}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            @endif

            <form action="{{ route('admin.products.update-provider-mapping', $product->id) }}" method="POST">
                @csrf
                <div class="card-body">
                    @forelse($product->tiers as $tIndex => $tier)
                        <div class="card bg-dark border-secondary mb-4">
                            <div class="card-header bg-transparent border-secondary d-flex justify-content-between align-items-center py-2">
                                <div class="fw-bold text-warning fs-6">
                                    <i class="ti ti-coin me-1"></i> الباقة: {{ $tier->name }}
                                    <span class="badge bg-secondary ms-2">التكلفة: ${{ number_format((float) $tier->source_cost, 2) }}</span>
                                    <span class="badge bg-success ms-1">سعر البيع: ${{ number_format((float) $tier->final_price, 2) }}</span>
                                </div>
                                <button type="button" class="btn btn-xs btn-outline-warning add-mapping-row" data-tier-id="{{ $tier->id }}" data-tier-index="{{ $tIndex }}">
                                    <i class="ti ti-plus me-1"></i> إضافة مزود لهذه الباقة
                                </button>
                            </div>
                            <div class="card-body p-0">
                                <div class="table-responsive">
                                    <table class="table table-hover align-middle mb-0">
                                        <thead class="table-dark">
                                            <tr>
                                                <th class="ps-3" style="width: 25%;">المزود</th>
                                                <th style="width: 25%;">كود المنتج لدى المزود (Provider SKU / Item ID)</th>
                                                <th style="width: 15%;">الأولوية (Priority)</th>
                                                <th style="width: 15%;">سعر التكلفة (USD)</th>
                                                <th class="text-center" style="width: 10%;">مفعل</th>
                                                <th class="text-end pe-3" style="width: 10%;">حذف</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tier-mappings-{{ $tier->id }}">
                                            @php $mCount = 0; @endphp
                                            @foreach($tier->productProviders as $pp)
                                                <tr class="mapping-row">
                                                    <td class="ps-3">
                                                        <input type="hidden" name="mappings[{{ $tIndex }}_{{ $mCount }}][product_tier_id]" value="{{ $tier->id }}">
                                                        <select name="mappings[{{ $tIndex }}_{{ $mCount }}][provider_id]" class="form-select form-select-sm" required>
                                                            @foreach($providers as $provider)
                                                                <option value="{{ $provider->id }}" {{ $pp->provider_id == $provider->id ? 'selected' : '' }}>
                                                                    {{ $provider->name }} ({{ $provider->driver }})
                                                                </option>
                                                            @endforeach
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <input type="text" name="mappings[{{ $tIndex }}_{{ $mCount }}][provider_sku]" class="form-control form-control-sm" value="{{ $pp->provider_sku }}" placeholder="Item ID / SKU">
                                                    </td>
                                                    <td>
                                                        <input type="number" name="mappings[{{ $tIndex }}_{{ $mCount }}][priority]" class="form-control form-control-sm" value="{{ $pp->priority }}" min="1" required>
                                                    </td>
                                                    <td>
                                                        <input type="number" step="0.0001" name="mappings[{{ $tIndex }}_{{ $mCount }}][cost_price]" class="form-control form-control-sm" value="{{ (float) $pp->cost_price }}">
                                                    </td>
                                                    <td class="text-center">
                                                        <input type="checkbox" class="form-check-input" name="mappings[{{ $tIndex }}_{{ $mCount }}][is_active]" value="1" {{ $pp->is_active ? 'checked' : '' }}>
                                                    </td>
                                                    <td class="text-end pe-3">
                                                        <button type="button" class="btn btn-sm btn-outline-danger remove-mapping-btn"><i class="ti ti-trash"></i></button>
                                                    </td>
                                                </tr>
                                                @php $mCount++; @endphp
                                            @endforeach
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    @empty
                        <div class="alert alert-warning text-center">
                            لا توجد باقات شحن مضافة لهذا المنتج حتى الآن، يرجى إضافة باقات أولاً.
                        </div>
                    @endforelse
                </div>

                @if($product->tiers->isNotEmpty())
                    <div class="card-footer bg-transparent border-0 d-flex justify-content-between py-3">
                        <a href="{{ route('admin.products.index') }}" class="btn btn-outline-secondary">إلغاء والعودة</a>
                        <button type="submit" class="btn btn-primary px-4"><i class="ti ti-device-floppy me-1"></i> حفظ كافة إعدادات التوجيه</button>
                    </div>
                @endif
            </form>
        </div>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    let globalCounter = 1000;
    const providersOptions = `@foreach($providers as $provider)<option value="{{ $provider->id }}">{{ $provider->name }} ({{ $provider->driver }})</option>@endforeach`;

    document.querySelectorAll('.add-mapping-row').forEach(button => {
        button.addEventListener('click', function() {
            const tierId = this.dataset.tierId;
            const tierIndex = this.dataset.tierIndex;
            const container = document.getElementById(`tier-mappings-${tierId}`);
            
            const tr = document.createElement('tr');
            tr.className = 'mapping-row';
            tr.innerHTML = `
                <td class="ps-3">
                    <input type="hidden" name="mappings[${tierIndex}_${globalCounter}][product_tier_id]" value="${tierId}">
                    <select name="mappings[${tierIndex}_${globalCounter}][provider_id]" class="form-select form-select-sm" required>
                        ${providersOptions}
                    </select>
                </td>
                <td>
                    <input type="text" name="mappings[${tierIndex}_${globalCounter}][provider_sku]" class="form-control form-control-sm" placeholder="Item ID / SKU">
                </td>
                <td>
                    <input type="number" name="mappings[${tierIndex}_${globalCounter}][priority]" class="form-control form-control-sm" value="1" min="1" required>
                </td>
                <td>
                    <input type="number" step="0.0001" name="mappings[${tierIndex}_${globalCounter}][cost_price]" class="form-control form-control-sm" placeholder="0.0000">
                </td>
                <td class="text-center">
                    <input type="checkbox" class="form-check-input" name="mappings[${tierIndex}_${globalCounter}][is_active]" value="1" checked>
                </td>
                <td class="text-end pe-3">
                    <button type="button" class="btn btn-sm btn-outline-danger remove-mapping-btn"><i class="ti ti-trash"></i></button>
                </td>
            `;
            container.appendChild(tr);
            globalCounter++;
        });
    });

    document.addEventListener('click', function(e) {
        if (e.target.closest('.remove-mapping-btn')) {
            e.target.closest('.mapping-row').remove();
        }
    });
});
</script>
@endsection
