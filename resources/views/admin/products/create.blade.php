@extends('layouts.admin')

@section('title', 'إضافة منتج وباقات جديدة')

@section('content')
<div class="row justify-content-center">
    <div class="col-lg-10">
        <form action="{{ route('admin.products.store') }}" method="POST" enctype="multipart/form-data">
            @csrf
            
            <div class="card border-0 shadow-sm mb-4">
                <div class="card-header bg-transparent border-0 py-3">
                    <h5 class="card-title fw-bold mb-0 text-white"><i class="ti ti-device-gamepad-2 text-warning me-2"></i> بيانات المنتج الأساسية</h5>
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
                            <input type="text" name="name" class="form-control" value="{{ old('name') }}" placeholder="مثال: شدات ببجي موبايل UC" required>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label class="form-label text-white fw-semibold">الرابط المخصص (Slug)</label>
                            <input type="text" name="slug" class="form-control" value="{{ old('slug') }}" placeholder="اختياري (يتم توليده تلقائياً)">
                        </div>
                        <div class="col-md-4 mb-3">
                            <label class="form-label text-white fw-semibold">القسم التابع له <span class="text-danger">*</span></label>
                            <select name="category_id" class="form-select" required>
                                <option value="">-- اختر القسم --</option>
                                @foreach($categories as $category)
                                    <option value="{{ $category->id }}" {{ old('category_id') == $category->id ? 'selected' : '' }}>
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
                                    <option value="{{ $type->value }}" {{ old('type') === $type->value ? 'selected' : '' }}>
                                        {{ $type->label() }}
                                    </option>
                                @endforeach
                            </select>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label class="form-label text-white fw-semibold">التطبيق الرئيسي (الأب - اختياري)</label>
                            <select name="parent_id" class="form-select">
                                <option value="">-- منتج رئيسي مستقل --</option>
                                @foreach($parentProducts as $parent)
                                    <option value="{{ $parent->id }}" {{ old('parent_id') == $parent->id ? 'selected' : '' }}>
                                        {{ $parent->name }}
                                    </option>
                                @endforeach
                            </select>
                            <small class="text-muted">إذا كان هذا المنتج سيرفر/نسخة فرعية (مثل أهلاً 2 أو هيلين 2) اختر التطبيق الأصلي هنا.</small>
                        </div>
                        <div class="col-md-2 mb-3">
                            <label class="form-label text-white fw-semibold">مصدر المزامنة</label>
                            <select name="catalog_source_id" class="form-select">
                                <option value="">-- بدون مصدر (يدوي) --</option>
                                @foreach($sources as $source)
                                    <option value="{{ $source->id }}" {{ old('catalog_source_id') == $source->id ? 'selected' : '' }}>
                                        {{ $source->name }}
                                    </option>
                                @endforeach
                            </select>
                        </div>
                        <div class="col-md-2 mb-3">
                            <label class="form-label text-white fw-semibold">ترتيب العرض</label>
                            <input type="number" name="sort_order" class="form-control" value="{{ old('sort_order', 0) }}" min="0">
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label text-white fw-semibold">عنوان حقل ID اللاعب (Label)</label>
                            <input type="text" name="player_id_label" class="form-control" value="{{ old('player_id_label', 'معرّف الحساب / Player ID') }}" placeholder="Player ID">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label text-white fw-semibold">صورة غلاف المنتج</label>
                            <input type="file" name="image" class="form-control" accept="image/*">
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-md-4">
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" name="has_server_id" id="hasServerId" value="1" {{ old('has_server_id') ? 'checked' : '' }}>
                                <label class="form-check-label text-white" for="hasServerId">يتطلب إدخال Zone ID / Server ID</label>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" name="requires_account_region" id="reqRegion" value="1" {{ old('requires_account_region') ? 'checked' : '' }}>
                                <label class="form-check-label text-white" for="reqRegion">يتطلب تحديد منطقة الحساب (Region)</label>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" name="is_active" id="isActive" value="1" {{ old('is_active', true) ? 'checked' : '' }}>
                                <label class="form-check-label text-white" for="isActive">تفعيل المنتج للمستخدمين</label>
                            </div>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label text-white fw-semibold">وصف وإرشادات الشحن</label>
                        <textarea name="description" class="form-control" rows="3" placeholder="اكتب شروط وإرشادات الشحن وسرعة التسليم">{{ old('description') }}</textarea>
                    </div>
                </div>
            </div>

            <!-- Tiers Section -->
            <div class="card border-0 shadow-sm mb-4">
                <div class="card-header bg-transparent border-0 d-flex justify-content-between align-items-center py-3">
                    <h5 class="card-title fw-bold mb-0 text-white"><i class="ti ti-coin text-warning me-2"></i> باقات وفئات الشحن والأسعار</h5>
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
                                    <th class="text-end pe-3" style="width: 10%;">حذف</th>
                                </tr>
                            </thead>
                            <tbody id="tiersContainer">
                                <tr class="tier-row">
                                    <td class="ps-3">
                                        <input type="text" name="tiers[0][name]" class="form-control form-control-sm" placeholder="مثال: 60 UC" required>
                                    </td>
                                    <td>
                                        <input type="number" step="0.0001" name="tiers[0][source_cost]" class="form-control form-control-sm tier-cost" value="0.95" required>
                                    </td>
                                    <td>
                                        <select name="tiers[0][price_strategy]" class="form-select form-select-sm tier-strategy">
                                            <option value="percentage">نسبة مئوية (%)</option>
                                            <option value="fixed_addition">مبلغ ثابت إضافي</option>
                                            <option value="manual">يدوي</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input type="number" step="0.01" name="tiers[0][margin_percent]" class="form-control form-control-sm tier-margin" value="5" placeholder="5%">
                                    </td>
                                    <td>
                                        <input type="number" step="0.01" name="tiers[0][final_price]" class="form-control form-control-sm tier-final" placeholder="تلقائي">
                                    </td>
                                    <td class="text-end pe-3">
                                        <button type="button" class="btn btn-sm btn-outline-danger remove-tier-btn"><i class="ti ti-trash"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="d-flex justify-content-between mb-5">
                <a href="{{ route('admin.products.index') }}" class="btn btn-outline-secondary">إلغاء والعودة</a>
                <button type="submit" class="btn btn-primary px-4"><i class="ti ti-device-floppy me-1"></i> حفظ المنتج والباقات</button>
            </div>
        </form>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    let tierIndex = 1;
    const container = document.getElementById('tiersContainer');
    const addBtn = document.getElementById('addTierBtn');

    addBtn.addEventListener('click', function() {
        const tr = document.createElement('tr');
        tr.className = 'tier-row';
        tr.innerHTML = `
            <td class="ps-3">
                <input type="text" name="tiers[${tierIndex}][name]" class="form-control form-control-sm" placeholder="اسم الباقة" required>
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
                <input type="number" step="0.01" name="tiers[${tierIndex}][margin_percent]" class="form-control form-control-sm tier-margin" value="5" placeholder="5%">
            </td>
            <td>
                <input type="number" step="0.01" name="tiers[${tierIndex}][final_price]" class="form-control form-control-sm tier-final" placeholder="تلقائي">
            </td>
            <td class="text-end pe-3">
                <button type="button" class="btn btn-sm btn-outline-danger remove-tier-btn"><i class="ti ti-trash"></i></button>
            </td>
        `;
        container.appendChild(tr);
        tierIndex++;
    });

    container.addEventListener('click', function(e) {
        if (e.target.closest('.remove-tier-btn')) {
            const rows = container.querySelectorAll('.tier-row');
            if (rows.length > 1) {
                e.target.closest('.tier-row').remove();
            }
        }
    });
});
</script>
@endsection
