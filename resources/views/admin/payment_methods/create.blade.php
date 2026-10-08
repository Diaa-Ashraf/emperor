@extends('layouts.admin')

@section('title', 'إضافة وسيلة تحويل ودفع جديدة')

@section('header')
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
            <h3 class="page-header-title mb-1 d-flex align-items-center gap-2">
                <i class="ti ti-plus text-gold"></i>
                <span>إضافة وسيلة تحويل / بطاقة دفع جديدة</span>
            </h3>
            <p class="page-header-subtitle mb-0">أضف طريقة دفع لأي دولة (مثل: تحويل الأردن JOD، تحويل السعودية SAR...) مع تخصيص بيانات الكارت كاملة.</p>
        </div>
        <div>
            <a href="{{ route('admin.payment-methods.index') }}" class="btn btn-secondary px-3 w-100 w-md-auto d-inline-flex align-items-center justify-content-center gap-2">
                <i class="ti ti-arrow-right"></i> الرجوع للقائمة
            </a>
        </div>
    </div>
@endsection

@section('content')
    <form method="POST" action="{{ route('admin.payment-methods.store') }}" enctype="multipart/form-data">
        @csrf

        <div class="row g-4">
            <!-- Form Column -->
            <div class="col-12 col-xl-8 order-2 order-xl-1">
                <!-- 1. Country & Identity -->
                <div class="card p-3 p-md-4 mb-4">
                    <h5 class="fw-bold text-white mb-3 d-flex align-items-center gap-2">
                        <i class="ti ti-world text-gold"></i>
                        <span>بيانات الدولة ونوع التحويل (Country & Transfer)</span>
                    </h5>

                    <div class="row g-3">
                        <div class="col-12 col-md-6">
                            <label class="form-label text-white fw-semibold">اسم التحويل / الدولة <span class="text-danger">*</span></label>
                            <input type="text" name="country_name" id="input_country_name" class="form-control" placeholder="مثال: تحويل الأردن أو تحويل مصر أو تحويل السعودية" value="{{ old('country_name', 'تحويل الأردن') }}" required oninput="updatePreview()">
                            <small class="text-muted fs-8">يظهر كزر تصفية في الشريط العلوي وكعنوان أسفل الكارت.</small>
                        </div>

                        <div class="col-12 col-md-3">
                            <label class="form-label text-white fw-semibold">كود العملة <span class="text-danger">*</span></label>
                            <input type="text" name="currency" id="input_currency" class="form-control font-monospace text-gold fw-bold text-uppercase" placeholder="مثال: JOD أو EGY أو USD" value="{{ old('currency', 'JOD') }}" required oninput="updatePreview()">
                            <small class="text-muted fs-8">يظهر بجانب اسم الدولة وفي الحسابات.</small>
                        </div>

                        <div class="col-12 col-md-3">
                            <label class="form-label text-white fw-semibold">معرّف الدولة (Slug)</label>
                            <input type="text" name="country" id="input_country" class="form-control font-monospace" placeholder="مثال: jordan أو egypt" value="{{ old('country', 'jordan') }}">
                            <small class="text-muted fs-8">يستخدم كفلتر برمجي.</small>
                        </div>
                    </div>
                </div>

                <!-- 2. Method Card Display -->
                <div class="card p-3 p-md-4 mb-4">
                    <h5 class="fw-bold text-white mb-3 d-flex align-items-center gap-2">
                        <i class="ti ti-id text-gold"></i>
                        <span>بيانات الكارت الظاهرة للعميل (Card Display)</span>
                    </h5>

                    <div class="row g-3 mb-3">
                        <div class="col-12 col-md-6">
                            <label class="form-label text-white fw-semibold">اسم وسيلة الدفع الكامل <span class="text-danger">*</span></label>
                            <input type="text" name="name" id="input_name" class="form-control" placeholder="مثال: كليك (CliQ Jordan)" value="{{ old('name', 'كليك (CliQ Jordan)') }}" required oninput="updatePreview()">
                            <small class="text-muted fs-8">يظهر في تفاصيل الطلب وتأكيد الدفع.</small>
                        </div>

                        <div class="col-12 col-md-6">
                            <label class="form-label text-white fw-semibold">الاسم البارز على الكارت (SubName) <span class="text-danger">*</span></label>
                            <input type="text" name="sub_name" id="input_sub_name" class="form-control fw-bold" placeholder="مثال: CliQ الأردن أو VF-CASH أو انستا بي" value="{{ old('sub_name', 'CliQ الأردن') }}" required oninput="updatePreview()">
                            <small class="text-muted fs-8">يظهر بخط كبير وواضح في منتصف الكارت.</small>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label text-white fw-semibold">رقم المحفظة / الحساب / الآيبان للتحويل <span class="text-danger">*</span></label>
                        <input type="text" name="account_number" id="input_account_number" class="form-control font-monospace text-gold fw-bold" placeholder="مثال: EMPEROR_CLIQ أو 01025515743 أو عنوان المحفظة" value="{{ old('account_number', 'EMPEROR_CLIQ') }}" required oninput="updatePreview()">
                        <small class="text-muted fs-8">الرقم أو العنوان الذي ينسخه العميل لإرسال المبلغ إليه.</small>
                    </div>

                    <div class="mb-3">
                        <label class="form-label text-white fw-semibold">ملاحظة الكارت (Card Note)</label>
                        <textarea name="note" id="input_note" class="form-control" rows="2" placeholder="مثال: تحويل فوري عبر نظام كليك الأردني بدون عمولات" oninput="updatePreview()">{{ old('note', 'تحويل فوري عبر نظام كليك الأردني بدون عمولات') }}</textarea>
                        <small class="text-muted fs-8">تظهر داخل صندوق الملاحظات الرمادي/الشفاف على الكارت.</small>
                    </div>

                    <div class="mb-0">
                        <label class="form-label text-white fw-semibold">تعليمات إضافية عند فتح النموذج (Instructions)</label>
                        <textarea name="instruction" class="form-control" rows="2" placeholder="مثال: قم بالتحويل إلى معرف كليك ثم ارفع صورة الإيصال لإيداع الرصيد فوراً.">{{ old('instruction', 'أقل تحويل 5 د.أ، التحويل متاح 24/7 عبر نظام كليك، يتم مراجعة الإيصال وإيداع الرصيد فوراً.') }}</textarea>
                    </div>
                </div>

                <!-- 3. Financial & Limits -->
                <div class="card p-3 p-md-4 mb-4">
                    <h5 class="fw-bold text-white mb-3 d-flex align-items-center gap-2">
                        <i class="ti ti-coin text-gold"></i>
                        <span>الحدود المالية والترتيب</span>
                    </h5>

                    <div class="row g-3 mb-3">
                        <div class="col-12 col-md-6">
                            <label class="form-label text-white fw-semibold">الحد الأدنى للتحويل <span class="text-danger">*</span></label>
                            <input type="number" step="0.01" name="min_amount" class="form-control font-monospace" value="{{ old('min_amount', 5.00) }}" required>
                        </div>
                        <div class="col-12 col-md-6">
                            <label class="form-label text-white fw-semibold">الحد الأقصى للتحويل</label>
                            <input type="number" step="0.01" name="max_amount" class="form-control font-monospace" value="{{ old('max_amount', 5000.00) }}">
                        </div>
                    </div>

                    <div class="row g-3 mb-3">
                        <div class="col-12 col-md-6">
                            <label class="form-label text-white fw-semibold">رسوم ثابتة</label>
                            <input type="number" step="0.01" name="fixed_fee" class="form-control font-monospace" value="{{ old('fixed_fee', 0.00) }}">
                        </div>
                        <div class="col-12 col-md-6">
                            <label class="form-label text-white fw-semibold">نسبة الرسوم (%)</label>
                            <input type="number" step="0.01" name="percent_fee" class="form-control font-monospace" value="{{ old('percent_fee', 0.00) }}">
                        </div>
                    </div>

                    <div class="row g-3">
                        <div class="col-12 col-md-6">
                            <label class="form-label text-white fw-semibold">ترتيب الظهور (Sort Order)</label>
                            <input type="number" name="sort_order" class="form-control font-monospace" value="{{ old('sort_order', 10) }}">
                        </div>
                        <div class="col-12 col-md-6 d-flex align-items-center gap-4 pt-4">
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" name="is_active" value="1" id="is_active" checked>
                                <label class="form-check-label text-white fw-bold" for="is_active">تفعيل الطريقة للعملاء</label>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 4. Logo / Icon -->
                <div class="card p-3 p-md-4 mb-4">
                    <h5 class="fw-bold text-white mb-3 d-flex align-items-center gap-2">
                        <i class="ti ti-photo text-gold"></i>
                        <span>شعار وسيلة الدفع (Logo)</span>
                    </h5>

                    <div class="row g-3 align-items-center">
                        <div class="col-12 col-md-6">
                            <label class="form-label text-white fw-semibold">رفع صورة الشعار (PNG / SVG / JPG)</label>
                            <input type="file" name="logo" class="form-control" accept="image/*" onchange="previewLogoFile(this)">
                            <small class="text-muted fs-8">يفضل صورة مربعة أو دائرية مفرغة بخلفية شفافة أو ملونة.</small>
                        </div>
                        <div class="col-12 col-md-6">
                            <label class="form-label text-white fw-semibold">أو اختر شعاراً جاهزاً من النظام</label>
                            <select name="brand_icon" id="select_brand_icon" class="form-select" onchange="updateBrandIcon(this.value)">
                                <option value="">-- تلقائي حسب الكود والاسم --</option>
                                <option value="vodafone_cash">فودافون كاش (Vodafone Cash)</option>
                                <option value="instapay">انستا باي (InstaPay)</option>
                                <option value="etisalat_cash">اتصالات كاش (Etisalat)</option>
                                <option value="orange_cash">أورنج كاش (Orange Money)</option>
                                <option value="cliq_jordan" selected>كليك الأردن (CliQ Jordan)</option>
                                <option value="zain_cash">زين كاش (Zain Cash)</option>
                                <option value="sham_cash">شام كاش (Sham Cash)</option>
                                <option value="stc_pay">STC Pay / الراجحي (Saudi)</option>
                                <option value="uae_bank">تحويل الإمارات (UAE Bank)</option>
                                <option value="kuraimi">الكريمي (Yemen Kuraimi)</option>
                                <option value="usdt_crypto">USDT (TRC-20)</option>
                                <option value="binance_pay">Binance Pay (باينانس)</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="d-grid mb-4">
                    <button type="submit" class="btn btn-primary btn-lg fw-bold py-3">
                        <i class="ti ti-device-floppy fs-5"></i> حفظ وسيلة التحويل وإضافتها للمنصة فوراً
                    </button>
                </div>
            </div>

            <!-- Live Card Preview Column -->
            <div class="col-12 col-xl-4 order-1 order-xl-2">
                <div class="live-preview-wrapper">
                    <div class="d-flex align-items-center justify-content-between mb-3">
                        <h6 class="fw-bold text-white mb-0 d-flex align-items-center gap-2">
                            <i class="ti ti-eye text-gold"></i>
                            <span>معاينة حية للبطاقة كما ستظهر للعميل</span>
                        </h6>
                    </div>

                    <!-- The Luxury Card Preview (Matches KA-CARDS & Emperor Theme) -->
                    <div class="p-3 rounded-4 shadow-lg mb-3" style="background: linear-gradient(180deg, #881124 0%, #560815 55%, #38030D 100%); border: 1.5px solid rgba(239, 68, 68, 0.45); max-width: 320px; margin: 0 auto;">
                        <!-- Top Bar -->
                        <div class="d-flex align-items-center justify-content-between mb-2">
                            <span style="background: rgba(0,0,0,0.45); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; padding: 2px 7px; color: #fff; font-size: 10px; font-weight: 800;">Recharge</span>
                            <span style="color: #FCD34D; font-size: 11px; font-weight: 800; display: flex; align-items: center; gap: 4px;">
                                <i class="ti ti-flame text-warning"></i>
                                <span>اشحن رصيدك</span>
                            </span>
                        </div>

                        <!-- White Logo Capsule -->
                        <div class="d-flex align-items-center justify-content-center p-2 rounded-4 mb-2 shadow-sm" style="background: #ffffff; min-height: 72px;">
                            <div id="preview_logo_box" style="width: 52px; height: 52px; border-radius: 50%; background: radial-gradient(circle, #D4145A 0%, #9B0038 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; color: #fff; font-weight: bold; font-size: 11px; border: 2px solid #FF4D88;">
                                <span id="preview_logo_text">CliQ</span>
                                <span style="color: #FFD700; font-size: 8px;" id="preview_logo_sub">JOD</span>
                            </div>
                        </div>

                        <!-- 0000 Pin Box -->
                        <div class="text-center mb-2">
                            <span style="border: 1px solid rgba(255,255,255,0.35); border-radius: 6px; padding: 2px 14px; font-size: 12px; font-weight: 800; font-family: monospace; letter-spacing: 2px; color: #fff; background: rgba(0,0,0,0.2);">0000</span>
                        </div>

                        <!-- Method Name -->
                        <div class="text-center fw-black text-white fs-6 mb-2" id="preview_sub_name">CliQ الأردن</div>

                        <!-- Note Box -->
                        <div class="text-center p-2 rounded-3 mb-2" style="background: rgba(0,0,0,0.32); border: 1px solid rgba(255,255,255,0.08); min-height: 48px;">
                            <div style="color: #FCD34D; font-size: 10.5px; font-weight: 800; margin-bottom: 2px;">ملاحظة:</div>
                            <div style="color: #F1F5F9; font-size: 10px; line-height: 1.35;" id="preview_note">تحويل فوري عبر نظام كليك الأردني بدون عمولات</div>
                        </div>

                        <!-- Footer Bar -->
                        <div class="d-flex align-items-center justify-content-between p-2 rounded-pill" style="background: rgba(0,0,0,0.38); border: 1px solid rgba(255,255,255,0.12); padding: 4px 12px;">
                            <span style="background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2); color: #FCD34D; border-radius: 12px; padding: 2px 7px; font-size: 10px; font-weight: 800;" id="preview_currency">JOD</span>
                            <span style="color: #ffffff; font-weight: 800; font-size: 11px;" id="preview_country_name">تحويل الأردن</span>
                        </div>
                    </div>

                    <div class="alert alert-dark border border-secondary text-muted fs-8">
                        <i class="ti ti-info-circle text-gold me-1"></i>
                        بمجرد الضغط على «حفظ وسيلة التحويل»، ستظهر البطاقة فوراً داخل صفحة الشحن للمستخدمين في موقعك تحت زر تصفية الدولة المحددة.
                    </div>
                </div>
            </div>
        </div>
    </form>
@endsection

@push('styles')
<style>
@media (max-width: 1199.98px) {
    .live-preview-wrapper {
        position: static !important;
        margin-bottom: 1.5rem;
    }
}
@media (min-width: 1200px) {
    .live-preview-wrapper {
        position: sticky;
        top: 90px;
    }
}
</style>
@endpush

@push('scripts')
<script>
function updatePreview() {
    const subName = document.getElementById('input_sub_name').value || 'اسم الوسيلة';
    const countryName = document.getElementById('input_country_name').value || 'تحويل الدولة';
    const currency = document.getElementById('input_currency').value || 'EGY';
    const note = document.getElementById('input_note').value || 'لا توجد ملاحظة';

    document.getElementById('preview_sub_name').textContent = subName;
    document.getElementById('preview_country_name').textContent = countryName;
    document.getElementById('preview_currency').textContent = currency;
    document.getElementById('preview_note').textContent = note;
    document.getElementById('preview_logo_sub').textContent = currency;
}

function updateBrandIcon(val) {
    const textEl = document.getElementById('preview_logo_text');
    if (!val) {
        textEl.textContent = 'PAY';
        return;
    }
    if (val.includes('vodafone')) textEl.textContent = 'VF';
    else if (val.includes('instapay')) textEl.textContent = 'iP';
    else if (val.includes('orange')) textEl.textContent = 'ORG';
    else if (val.includes('etisalat')) textEl.textContent = 'ET';
    else if (val.includes('cliq')) textEl.textContent = 'CliQ';
    else if (val.includes('zain')) textEl.textContent = 'Zain';
    else if (val.includes('sham')) textEl.textContent = 'Sham';
    else if (val.includes('stc')) textEl.textContent = 'STC';
    else if (val.includes('usdt')) textEl.textContent = '₮';
    else if (val.includes('binance')) textEl.textContent = 'BIN';
    else textEl.textContent = 'PAY';
}

function previewLogoFile(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const box = document.getElementById('preview_logo_box');
            box.style.background = 'none';
            box.style.border = 'none';
            box.innerHTML = `<img src="${e.target.result}" style="width: 52px; height: 52px; border-radius: 50%; object-fit: cover;">`;
        }
        reader.readAsDataURL(input.files[0]);
    }
}
</script>
@endpush
