@extends('layouts.admin')

@section('title', 'إضافة إعلان أو بانر جديد')

@section('content')
<div class="row justify-content-center">
    <div class="col-lg-8">
        <div class="card border-0 shadow-sm">
            <div class="card-header bg-transparent border-0 py-3">
                <h5 class="card-title fw-bold mb-0 text-white"><i class="ti ti-plus text-warning me-2"></i> إضافة بانر / إعلان جديد</h5>
            </div>

            <form action="{{ route('admin.banners.store') }}" method="POST" enctype="multipart/form-data">
                @csrf
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
                            <input type="text" name="title" class="form-control" value="{{ old('title') }}" placeholder="مثال: خصم 20% على شدات ببجي" required>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label class="form-label text-white fw-semibold">نوع العرض <span class="text-danger">*</span></label>
                            <select name="type" id="bannerTypeSelect" class="form-select" required>
                                <option value="slider" {{ old('type') === 'slider' ? 'selected' : '' }}>سلايدر رئيسي (Slider)</option>
                                <option value="banner" {{ old('type') === 'banner' ? 'selected' : '' }}>بانر إعلاني (Banner)</option>
                                <option value="popup" {{ old('type') === 'popup' ? 'selected' : '' }}>نافذة منبثقة (Popup)</option>
                                <option value="deal" {{ old('type') === 'deal' ? 'selected' : '' }}>عرض وتخفيض خاص (Flash Deal)</option>
                            </select>
                        </div>
                    </div>

                    <!-- Deal Specific Fields (Flash Deals) -->
                    <div id="dealFieldsContainer" class="p-3 mb-4 rounded border border-warning shadow-sm" style="background: rgba(212, 165, 55, 0.08); display: {{ old('type') === 'deal' ? 'block' : 'none' }};">
                        <div class="d-flex align-items-center gap-2 mb-3 text-warning fw-bold">
                            <i class="ti ti-flame fs-4"></i>
                            <span>تفاصيل العرض والتخفيض الخاص (Flash Deal)</span>
                        </div>

                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label text-white fw-semibold">السعر الأصلي قبل الخصم (ج.م)</label>
                                <input type="number" step="0.01" name="old_price" id="oldPriceInput" class="form-control" value="{{ old('old_price') }}" placeholder="مثال: 340.00">
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label text-white fw-semibold">السعر بعد الخصم / سعر العرض (ج.م) <span class="text-danger">*</span></label>
                                <input type="number" step="0.01" name="sale_price" id="salePriceInput" class="form-control" value="{{ old('sale_price') }}" placeholder="مثال: 279.00">
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-4 mb-3">
                                <label class="form-label text-white fw-semibold">بادج / شارة الخصم</label>
                                <input type="text" name="discount_badge" id="discountBadgeInput" class="form-control" value="{{ old('discount_badge') }}" placeholder="مثال: خصم 20%">
                                <small class="text-muted">يُحسب تلقائياً من السعرين إذا تُرِك فارغاً</small>
                            </div>
                            <div class="col-md-4 mb-3">
                                <label class="form-label text-white fw-semibold">نسبة حجز الكمية المحققة (%)</label>
                                <input type="number" name="claimed_percent" class="form-control" value="{{ old('claimed_percent', 85) }}" min="0" max="100" placeholder="85">
                            </div>
                            <div class="col-md-4 mb-3">
                                <label class="form-label text-white fw-semibold">القطع / الكمية المتبقية</label>
                                <input type="number" name="remaining_items" class="form-control" value="{{ old('remaining_items', 6) }}" min="0" placeholder="6">
                            </div>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label text-white fw-semibold">العنوان الفرعي / الوصف المختصر</label>
                        <input type="text" name="subtitle" class="form-control" value="{{ old('subtitle') }}" placeholder="مثال: العرض ساري حتى نهاية الأسبوع">
                    </div>

                    <div class="row">
                        <div class="col-md-8 mb-3">
                            <label class="form-label text-white fw-semibold">الرابط التوجيهي (Link)</label>
                            <input type="text" name="link" class="form-control" value="{{ old('link') }}" placeholder="/products/pubg-uc-global أو رابط خارجي">
                        </div>
                        <div class="col-md-4 mb-3">
                            <label class="form-label text-white fw-semibold">ترتيب العرض</label>
                            <input type="number" name="sort_order" class="form-control" value="{{ old('sort_order', 0) }}" min="0">
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label text-white fw-semibold">صورة سطح المكتب <span class="text-danger">*</span></label>
                            <input type="file" name="image" class="form-control" accept="image/*" required>
                            <small class="text-muted">المقاس المفضل: 1200x400 بكسل</small>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label text-white fw-semibold">صورة الموبايل (اختياري)</label>
                            <input type="file" name="mobile_image" class="form-control" accept="image/*">
                            <small class="text-muted">المقاس المفضل: 600x300 بكسل</small>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label text-white fw-semibold">تاريخ بدء العرض (اختياري)</label>
                            <input type="date" name="starts_at" class="form-control" value="{{ old('starts_at') }}">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label text-white fw-semibold">تاريخ انتهاء العرض (اختياري)</label>
                            <input type="date" name="ends_at" class="form-control" value="{{ old('ends_at') }}">
                        </div>
                    </div>

                    <div class="form-check form-switch mb-3">
                        <input class="form-check-input" type="checkbox" name="is_active" id="isActive" value="1" {{ old('is_active', true) ? 'checked' : '' }}>
                        <label class="form-check-label text-white" for="isActive">تفعيل الإعلان ونشره على الموقع والتطبيق</label>
                    </div>
                </div>

                <div class="card-footer bg-transparent border-0 d-flex justify-content-between py-3">
                    <a href="{{ route('admin.banners.index') }}" class="btn btn-outline-secondary">إلغاء والعودة</a>
                    <button type="submit" class="btn btn-primary px-4"><i class="ti ti-device-floppy me-1"></i> حفظ الإعلان</button>
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
