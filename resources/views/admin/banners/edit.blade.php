@extends('layouts.admin')

@section('title', 'تعديل الإعلان: ' . $banner->title)

@section('content')
<div class="row justify-content-center">
    <div class="col-lg-8">
        <div class="card border-0 shadow-sm">
            <div class="card-header bg-transparent border-0 py-3">
                <h5 class="card-title fw-bold mb-0 text-white"><i class="ti ti-edit text-warning me-2"></i> تعديل الإعلان: {{ $banner->title }}</h5>
            </div>

            <form action="{{ route('admin.banners.update', $banner->id) }}" method="POST" enctype="multipart/form-data">
                @csrf
                @method('PUT')
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
                        <div class="col-md-8 mb-3">
                            <label class="form-label text-white fw-semibold">العنوان الرئيسي <span class="text-danger">*</span></label>
                            <input type="text" name="title" class="form-control" value="{{ old('title', $banner->title) }}" required>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label class="form-label text-white fw-semibold">نوع العرض <span class="text-danger">*</span></label>
                            <select name="type" id="bannerTypeSelect" class="form-select" required>
                                <option value="slider" {{ old('type', $banner->type) === 'slider' ? 'selected' : '' }}>سلايدر رئيسي (Slider)</option>
                                <option value="banner" {{ old('type', $banner->type) === 'banner' ? 'selected' : '' }}>بانر إعلاني (Banner)</option>
                                <option value="target" {{ old('type', $banner->type) === 'target' ? 'selected' : '' }}>بانر سحب التارجت (Target Banner)</option>
                                <option value="popup" {{ old('type', $banner->type) === 'popup' ? 'selected' : '' }}>نافذة منبثقة (Popup)</option>
                                <option value="deal" {{ old('type', $banner->type) === 'deal' ? 'selected' : '' }}>عرض وتخفيض خاص (Flash Deal)</option>
                            </select>
                        </div>
                    </div>

                    <!-- Deal Specific Fields (Flash Deals) -->
                    <div id="dealFieldsContainer" class="p-3 mb-4 rounded border border-warning shadow-sm" style="background: rgba(212, 165, 55, 0.08); display: {{ old('type', $banner->type) === 'deal' ? 'block' : 'none' }};">
                        <div class="d-flex align-items-center gap-2 mb-3 text-warning fw-bold">
                            <i class="ti ti-flame fs-4"></i>
                            <span>تفاصيل العرض والتخفيض الخاص (Flash Deal)</span>
                        </div>

                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label text-white fw-semibold">السعر الأصلي قبل الخصم (ج.م)</label>
                                <input type="number" step="0.01" name="old_price" id="oldPriceInput" class="form-control" value="{{ old('old_price', $banner->old_price) }}" placeholder="مثال: 340.00">
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label text-white fw-semibold">السعر بعد الخصم / سعر العرض (ج.م)</label>
                                <input type="number" step="0.01" name="sale_price" id="salePriceInput" class="form-control" value="{{ old('sale_price', $banner->sale_price) }}" placeholder="مثال: 279.00">
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-4 mb-3">
                                <label class="form-label text-white fw-semibold">بادج / شارة الخصم</label>
                                <input type="text" name="discount_badge" id="discountBadgeInput" class="form-control" value="{{ old('discount_badge', $banner->discount_badge) }}" placeholder="مثال: خصم 20%">
                                <small class="text-muted">يُحسب تلقائياً من السعرين إذا تُرِك فارغاً</small>
                            </div>
                            <div class="col-md-4 mb-3">
                                <label class="form-label text-white fw-semibold">نسبة حجز الكمية المحققة (%)</label>
                                <input type="number" name="claimed_percent" class="form-control" value="{{ old('claimed_percent', $banner->claimed_percent ?? 85) }}" min="0" max="100" placeholder="85">
                            </div>
                            <div class="col-md-4 mb-3">
                                <label class="form-label text-white fw-semibold">القطع / الكمية المتبقية</label>
                                <input type="number" name="remaining_items" class="form-control" value="{{ old('remaining_items', $banner->remaining_items ?? 6) }}" min="0" placeholder="6">
                            </div>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label text-white fw-semibold">العنوان الفرعي / الوصف المختصر</label>
                        <input type="text" name="subtitle" class="form-control" value="{{ old('subtitle', $banner->subtitle) }}">
                    </div>

                    <div class="row">
                        <div class="col-md-8 mb-3">
                            <label class="form-label text-white fw-semibold">الرابط التوجيهي (Link)</label>
                            <input type="text" name="link" class="form-control" value="{{ old('link', $banner->link) }}">
                        </div>
                        <div class="col-md-4 mb-3">
                            <label class="form-label text-white fw-semibold">ترتيب العرض</label>
                            <input type="number" name="sort_order" class="form-control" value="{{ old('sort_order', $banner->sort_order) }}" min="0">
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label text-white fw-semibold">صورة سطح المكتب الحالية / الجديدة</label>
                            @if($banner->image)
                                <div class="mb-2">
                                    <img src="{{ Storage::url($banner->image) }}" alt="{{ $banner->title }}" class="rounded shadow-sm" style="max-height: 60px; object-fit: cover;">
                                </div>
                            @endif
                            <input type="file" name="image" class="form-control" accept="image/*">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label text-white fw-semibold">صورة الموبايل الحالية / الجديدة</label>
                            @if($banner->mobile_image)
                                <div class="mb-2">
                                    <img src="{{ Storage::url($banner->mobile_image) }}" alt="{{ $banner->title }}" class="rounded shadow-sm" style="max-height: 60px; object-fit: cover;">
                                </div>
                            @endif
                            <input type="file" name="mobile_image" class="form-control" accept="image/*">
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label text-white fw-semibold">تاريخ بدء العرض</label>
                            <input type="date" name="starts_at" class="form-control" value="{{ old('starts_at', $banner->starts_at?->format('Y-m-d')) }}">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label text-white fw-semibold">تاريخ انتهاء العرض</label>
                            <input type="date" name="ends_at" class="form-control" value="{{ old('ends_at', $banner->ends_at?->format('Y-m-d')) }}">
                        </div>
                    </div>

                    <div class="form-check form-switch mb-3">
                        <input class="form-check-input" type="checkbox" name="is_active" id="isActive" value="1" {{ old('is_active', $banner->is_active) ? 'checked' : '' }}>
                        <label class="form-check-label text-white" for="isActive">تفعيل الإعلان</label>
                    </div>
                </div>

                <div class="card-footer bg-transparent border-0 d-flex justify-content-between py-3">
                    <a href="{{ route('admin.banners.index') }}" class="btn btn-outline-secondary">إلغاء والعودة</a>
                    <button type="submit" class="btn btn-primary px-4"><i class="ti ti-device-floppy me-1"></i> حفظ التعديلات</button>
                </div>
            </form>
        </div>
    </div>
</div>

@push('scripts')
<script>
    document.addEventListener('DOMContentLoaded', function () {
        const typeSelect = document.getElementById('bannerTypeSelect');
        const dealContainer = document.getElementById('dealFieldsContainer');
        const oldPriceInput = document.getElementById('oldPriceInput');
        const salePriceInput = document.getElementById('salePriceInput');
        const badgeInput = document.getElementById('discountBadgeInput');

        function toggleDealFields() {
            if (typeSelect.value === 'deal') {
                dealContainer.style.display = 'block';
            } else {
                dealContainer.style.display = 'none';
            }
        }

        typeSelect.addEventListener('change', toggleDealFields);

        // Auto calculate discount percentage
        function autoCalcDiscount() {
            const oldP = parseFloat(oldPriceInput.value);
            const saleP = parseFloat(salePriceInput.value);
            if (oldP > 0 && saleP > 0 && oldP > saleP && (!badgeInput.value || badgeInput.dataset.autocalc === 'true')) {
                const percent = Math.round(((oldP - saleP) / oldP) * 100);
                badgeInput.value = 'خصم ' + percent + '%';
                badgeInput.dataset.autocalc = 'true';
            }
        }

        oldPriceInput.addEventListener('input', autoCalcDiscount);
        salePriceInput.addEventListener('input', autoCalcDiscount);
        badgeInput.addEventListener('input', function() {
            badgeInput.dataset.autocalc = 'false';
        });
    });
</script>
@endpush
@endsection
