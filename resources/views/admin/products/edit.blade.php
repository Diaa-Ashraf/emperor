@extends('layouts.admin')

@section('title', 'تعديل المنتج: ' . $product->name)

@section('content')
<div class="row justify-content-center">
    <div class="col-lg-10">
        <form action="{{ route('admin.products.update', $product->id) }}" method="POST" enctype="multipart/form-data">
            @csrf
            @method('PUT')
            
            <div class="card border-0 shadow-sm mb-4">
                <div class="card-header bg-transparent border-0 py-3 d-flex justify-content-between align-items-center">
                    <h5 class="card-title fw-bold mb-0 text-white"><i class="ti ti-edit text-warning me-2"></i> تعديل بيانات المنتج: {{ $product->name }}</h5>
                    <a href="{{ route('admin.products.provider-mapping', $product->id) }}" class="btn btn-sm btn-outline-warning">
                        <i class="ti ti-server me-1"></i> ربط وتوجيه المزودين
                    </a>
                </div>
                <div class="card-body">
                    @if($errors->any())
                        <div class="alert alert-danger">
                            <ul class="mb-0">
                                @foreach($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif

                    <div class="row">
                        <div class="col-md-4 mb-3">
                            <label class="form-label text-white fw-semibold">اسم المنتج <span class="text-danger">*</span></label>
                            <input type="text" name="name" class="form-control" value="{{ old('name', $product->name) }}" required>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label class="form-label text-white fw-semibold">الرابط المخصص (Slug)</label>
                            <input type="text" name="slug" class="form-control" value="{{ old('slug', $product->slug) }}" placeholder="اتركه فارغاً للتوليد التلقائي">
                        </div>
                        <div class="col-md-4 mb-3">
                            <label class="form-label text-white fw-semibold">القسم التابع له <span class="text-danger">*</span></label>
                            <select name="category_id" class="form-select" required>
                                @foreach($categories as $category)
                                    <option value="{{ $category->id }}" {{ old('category_id', $product->category_id) == $category->id ? 'selected' : '' }}>
                                        {{ $category->name }} ({{ $category->type->label() }})
                                    </option>
                                @endforeach
                            </select>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-4 mb-3">
                            <label class="form-label text-white fw-semibold">نوع الشحن <span class="text-danger">*</span></label>
                            <select name="type" class="form-select" required>
                                @foreach(\App\Enums\ProductType::cases() as $type)
                                    <option value="{{ $type->value }}" {{ old('type', $product->type->value) === $type->value ? 'selected' : '' }}>
                                        {{ $type->label() }}
                                    </option>
                                @endforeach
                            </select>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label class="form-label text-white fw-semibold">مصدر المزامنة (إن وجد)</label>
                            <select name="catalog_source_id" class="form-select">
                                <option value="">-- بدون مصدر (يدوي) --</option>
                                @foreach($sources as $source)
                                    <option value="{{ $source->id }}" {{ old('catalog_source_id', $product->catalog_source_id) == $source->id ? 'selected' : '' }}>
                                        {{ $source->name }}
                                    </option>
                                @endforeach
                            </select>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label class="form-label text-white fw-semibold">ترتيب العرض</label>
                            <input type="number" name="sort_order" class="form-control" value="{{ old('sort_order', $product->sort_order) }}" min="0">
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label text-white fw-semibold">عنوان حقل ID اللاعب (Label)</label>
                            <input type="text" name="player_id_label" class="form-control" value="{{ old('player_id_label', $product->player_id_label) }}">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label text-white fw-semibold">صورة غلاف المنتج</label>
                            @if($product->image)
                                <div class="mb-2">
                                    <img src="{{ Storage::url($product->image) }}" alt="{{ $product->name }}" class="rounded shadow-sm" style="max-height: 50px; object-fit: cover;">
                                </div>
                            @endif
                            <input type="file" name="image" class="form-control" accept="image/*">
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-md-4">
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" name="has_server_id" id="hasServerId" value="1" {{ old('has_server_id', $product->has_server_id) ? 'checked' : '' }}>
                                <label class="form-check-label text-white" for="hasServerId">يتطلب إدخال Zone ID / Server ID</label>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" name="requires_account_region" id="reqRegion" value="1" {{ old('requires_account_region', $product->requires_account_region) ? 'checked' : '' }}>
                                <label class="form-check-label text-white" for="reqRegion">يتطلب تحديد منطقة الحساب (Region)</label>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" name="is_active" id="isActive" value="1" {{ old('is_active', $product->is_active) ? 'checked' : '' }}>
                                <label class="form-check-label text-white" for="isActive">تفعيل المنتج للمستخدمين</label>
                            </div>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label text-white fw-semibold">وصف وإرشادات الشحن</label>
                        <textarea name="description" class="form-control" rows="3">{{ old('description', $product->description) }}</textarea>
                    </div>
                </div>
            </div>

            <!-- Tiers Section -->
            <div class="card border-0 shadow-sm mb-4">
                <div class="card-header bg-transparent border-0 d-flex justify-content-between align-items-center py-3">
                    <h5 class="card-title fw-bold mb-0 text-white"><i class="ti ti-coin text-warning me-2"></i> باقات وفئات الشحن الحالية ({{ $product->tiers->count() }})</h5>
                    <button type="button" class="btn btn-sm btn-outline-warning" id="addTierBtn">
                        <i class="ti ti-plus me-1"></i> إضافة باقة جديدة
                    </button>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0" id="tiersTable">
                            <thead class="table-dark">
                                <tr>
                                    <th class="ps-3" style="width: 25%;">اسم الباقة</th>
                                    <th style="width: 15%;">سعر التكلفة (USD)</th>
                                    <th style="width: 20%;">استراتيجية التسعير</th>
                                    <th style="width: 15%;">هامش الربح</th>
                                    <th style="width: 15%;">سعر البيع النهائي</th>
                                    <th class="text-center" style="width: 10%;">مفعلة</th>
                                </tr>
                            </thead>
                            <tbody id="tiersContainer">
                                @forelse($product->tiers as $index => $tier)
                                    <tr class="tier-row">
                                        <td class="ps-3">
                                            <input type="hidden" name="tiers[{{ $index }}][id]" value="{{ $tier->id }}">
                                            <input type="text" name="tiers[{{ $index }}][name]" class="form-control form-control-sm" value="{{ $tier->name }}" required>
                                        </td>
                                        <td>
                                            <input type="number" step="0.0001" name="tiers[{{ $index }}][source_cost]" class="form-control form-control-sm tier-cost" value="{{ (float) $tier->source_cost }}" required>
                                        </td>
                                        <td>
                                            <select name="tiers[{{ $index }}][price_strategy]" class="form-select form-select-sm tier-strategy">
                                                <option value="percentage" {{ $tier->price_strategy->value === 'percentage' ? 'selected' : '' }}>نسبة مئوية (%)</option>
                                                <option value="fixed_addition" {{ $tier->price_strategy->value === 'fixed_addition' ? 'selected' : '' }}>مبلغ ثابت إضافي</option>
                                                <option value="manual" {{ $tier->price_strategy->value === 'manual' ? 'selected' : '' }}>يدوي</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input type="number" step="0.01" name="tiers[{{ $index }}][margin_percent]" class="form-control form-control-sm tier-margin" value="{{ (float) $tier->margin_percent }}">
                                        </td>
                                        <td>
                                            <input type="number" step="0.01" name="tiers[{{ $index }}][final_price]" class="form-control form-control-sm tier-final" value="{{ (float) $tier->final_price }}">
                                        </td>
                                        <td class="text-center">
                                            <input type="checkbox" class="form-check-input" name="tiers[{{ $index }}][is_active]" value="1" {{ $tier->is_active ? 'checked' : '' }}>
                                        </td>
                                    </tr>
                                @empty
                                    <tr class="tier-row">
                                        <td class="ps-3">
                                            <input type="text" name="tiers[0][name]" class="form-control form-control-sm" placeholder="اسم الباقة" required>
                                        </td>
                                        <td>
                                            <input type="number" step="0.0001" name="tiers[0][source_cost]" class="form-control form-control-sm" value="1.00" required>
                                        </td>
                                        <td>
                                            <select name="tiers[0][price_strategy]" class="form-select form-select-sm">
                                                <option value="percentage">نسبة مئوية (%)</option>
                                                <option value="fixed_addition">مبلغ ثابت إضافي</option>
                                                <option value="manual">يدوي</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input type="number" step="0.01" name="tiers[0][margin_percent]" class="form-control form-control-sm" value="5">
                                        </td>
                                        <td>
                                            <input type="number" step="0.01" name="tiers[0][final_price]" class="form-control form-control-sm" placeholder="تلقائي">
                                        </td>
                                        <td class="text-center">
                                            <input type="checkbox" class="form-check-input" name="tiers[0][is_active]" value="1" checked>
                                        </td>
                                    </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="d-flex justify-content-between mb-5">
                <a href="{{ route('admin.products.index') }}" class="btn btn-outline-secondary">إلغاء والعودة</a>
                <button type="submit" class="btn btn-primary px-4"><i class="ti ti-device-floppy me-1"></i> حفظ التعديلات</button>
            </div>
        </form>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    let tierIndex = {{ $product->tiers->count() + 1 }};
    const container = document.getElementById('tiersContainer');
    const addBtn = document.getElementById('addTierBtn');

    addBtn.addEventListener('click', function() {
        const tr = document.createElement('tr');
        tr.className = 'tier-row';
        tr.innerHTML = `
            <td class="ps-3">
                <input type="text" name="tiers[${tierIndex}][name]" class="form-control form-control-sm" placeholder="اسم الباقة الجديدة" required>
            </td>
            <td>
                <input type="number" step="0.0001" name="tiers[${tierIndex}][source_cost]" class="form-control form-control-sm tier-cost" value="1.00" required>
            </td>
            <td>
                <select name="tiers[${tierIndex}][price_strategy]" class="form-select form-select-sm tier-strategy">
                    <option value="percentage">نسبة مئوية (%)</option>
                    <option value="fixed_addition">مبلغ ثابت إضافي</option>
                    <option value="manual">يدوي</option>
                </select>
            </td>
            <td>
                <input type="number" step="0.01" name="tiers[${tierIndex}][margin_percent]" class="form-control form-control-sm tier-margin" value="5">
            </td>
            <td>
                <input type="number" step="0.01" name="tiers[${tierIndex}][final_price]" class="form-control form-control-sm tier-final" placeholder="تلقائي">
            </td>
            <td class="text-center">
                <input type="checkbox" class="form-check-input" name="tiers[${tierIndex}][is_active]" value="1" checked>
            </td>
        `;
        container.appendChild(tr);
        tierIndex++;
    });
});
</script>
@endsection
