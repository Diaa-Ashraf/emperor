@extends('layouts.admin')

@section('title', 'إعدادات المنصة وطرق الدفع')

@section('header')
    <div class="settings-page-heading d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
            <h3 class="settings-page-title fw-black text-white mb-1 d-flex align-items-center gap-2">
                <i class="ti ti-settings text-gold"></i>
                <span>الإعدادات العامة والبيانات الديناميكية للمنصة</span>
            </h3>
            <p class="settings-page-description text-muted mb-0 fs-6">التحكم في الشعار، النصوص، وسائل التواصل، الإعلانات، وكالة التارجت، وحسابات الدفع.</p>
        </div>
    </div>
@endsection

@section('content')
    <div class="settings-page-content">
        <form method="POST" action="{{ route('admin.settings.update-general') }}" enctype="multipart/form-data">
            @csrf
            
            <div class="row g-4">
                <!-- Main Settings Column -->
                <div class="col-12 col-xl-7">
                    <!-- 1. Branding & Identity -->
                    <div class="card p-4 mb-4">
                        <h5 class="fw-bold text-white mb-3 d-flex align-items-center gap-2">
                            <i class="ti ti-photo text-gold"></i>
                            <span>الهوية والشعار والأيقونات (Branding & Identity)</span>
                        </h5>

                        <div class="p-3 mb-3 rounded-3 border border-secondary" style="background: rgba(255, 255, 255, 0.02);">
                            <div class="row g-3">
                                <!-- Site Logo -->
                                <div class="col-12 col-md-6">
                                    <label class="form-label text-white fw-semibold fs-7 mb-1">لوجو الموقع الرئيسي (Site Logo)</label>
                                    <div class="d-flex align-items-center gap-3 mb-2 p-2 rounded bg-dark border border-secondary">
                                        <img id="site_logo_preview" src="{{ !empty($settings['site_logo']) ? asset($settings['site_logo']) : asset('images/logo.png') }}" alt="Logo" style="width: 48px; height: 48px; object-fit: contain; background: #000; border-radius: 8px; padding: 4px;">
                                        <div class="fs-8 text-muted">يظهر في الهيدر، الفوتر، والشاشات الرئيسية.</div>
                                    </div>
                                    <input type="file" name="site_logo" id="site_logo_input" class="form-control form-control-sm" accept="image/*" onchange="previewImage(this, 'site_logo_preview')">
                                </div>

                                <!-- Tab Favicon -->
                                <div class="col-12 col-md-6">
                                    <label class="form-label text-white fw-semibold fs-7 mb-1">أيقونة التاب في المتصفح (Tab Favicon)</label>
                                    <div class="d-flex align-items-center gap-3 mb-2 p-2 rounded bg-dark border border-secondary">
                                        <img id="site_favicon_preview" src="{{ !empty($settings['site_favicon']) ? asset($settings['site_favicon']) : (!empty($settings['site_logo']) ? asset($settings['site_logo']) : asset('images/logo.png')) }}" alt="Favicon" style="width: 32px; height: 32px; object-fit: contain; background: #000; border-radius: 6px; padding: 2px;">
                                        <div class="fs-8 text-muted">تظهر بجانب اسم الموقع في علامة تبويب المتصفح.</div>
                                    </div>
                                    <input type="file" name="site_favicon" id="site_favicon_input" class="form-control form-control-sm" accept="image/*" onchange="previewImage(this, 'site_favicon_preview')">
                                </div>
                            </div>
                        </div>

                        <div class="mb-3">
                            <label class="form-label text-white fw-semibold">اسم المنصة الرسمي</label>
                            <input type="text" name="site_name" class="form-control" value="{{ old('site_name', $settings['site_name'] ?? 'Emperor') }}" required>
                        </div>

                        <div class="mb-3">
                            <label class="form-label text-white fw-semibold">وصف المنصة (SEO & Header Meta)</label>
                            <textarea name="site_description" class="form-control" rows="2" placeholder="وصف المنصة للظهور في محركات البحث ومشاركات الروابط">{{ old('site_description', $settings['site_description'] ?? '') }}</textarea>
                        </div>

                        <div class="mb-3">
                            <label class="form-label text-white fw-semibold">سلوجان الفوتر (Footer Slogan)</label>
                            <input type="text" name="footer_slogan" class="form-control" value="{{ old('footer_slogan', $settings['footer_slogan'] ?? 'المنصة الرائدة والأولى لشحن الألعاب والبطاقات الرقمية وبيع التارجت بأفضل الأسعار.') }}" placeholder="النص التعريفي المختصر في أسفل الموقع">
                        </div>
                    </div>

                    <!-- 2. Marquee / Top Announcement Bar -->
                    <div class="card p-4 mb-4">
                        <div class="d-flex align-items-center justify-content-between mb-3">
                            <h5 class="fw-bold text-white mb-0 d-flex align-items-center gap-2">
                                <i class="ti ti-speakerphone text-gold"></i>
                                <span>شريط التنبيهات العاجلة المتحرك (Announcement Bar)</span>
                            </h5>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" name="announcement_enabled" value="1" id="announcement_enabled" {{ !empty($settings['announcement_enabled']) && $settings['announcement_enabled'] == '1' ? 'checked' : '' }}>
                                <label class="form-check-label text-white fs-7" for="announcement_enabled">تفعيل الشريط</label>
                            </div>
                        </div>
                        <div class="mb-0">
                            <label class="form-label text-white fw-semibold">نص التنبيه أو العرض العاجل</label>
                            <textarea name="announcement_text" class="form-control" rows="2" placeholder="مثال: خصومات حصرية بنسبة 10% بمناسبة إطلاق التحديث الجديد!">{{ old('announcement_text', $settings['announcement_text'] ?? '') }}</textarea>
                        </div>
                    </div>

                    <!-- 3. Contact & Support Info -->
                    <div class="card p-4 mb-4">
                        <h5 class="fw-bold text-white mb-3 d-flex align-items-center gap-2">
                            <i class="ti ti-headset text-gold"></i>
                            <span>قنوات التواصل والدعم الفني (Support Channels)</span>
                        </h5>

                        <div class="row g-3 mb-3">
                            <div class="col-12 col-md-6">
                                <label class="form-label text-white fw-semibold">رقم الواتساب للدعم الفني</label>
                                <div class="input-group">
                                    <span class="input-group-text bg-dark border-secondary text-success"><i class="ti ti-brand-whatsapp"></i></span>
                                    <input type="text" name="whatsapp_support" class="form-control font-monospace" value="{{ old('whatsapp_support', $settings['whatsapp_support'] ?? '+201000000000') }}" required>
                                </div>
                            </div>
                            <div class="col-12 col-md-6">
                                <label class="form-label text-white fw-semibold">معرّف تيليجرام للدعم</label>
                                <div class="input-group">
                                    <span class="input-group-text bg-dark border-secondary text-info"><i class="ti ti-brand-telegram"></i></span>
                                    <input type="text" name="telegram_support" class="form-control font-monospace" value="{{ old('telegram_support', $settings['telegram_support'] ?? 'EmperorSupport') }}">
                                </div>
                            </div>
                        </div>

                        <div class="row g-3 mb-3">
                            <div class="col-12 col-md-6">
                                <label class="form-label text-white fw-semibold">البريد الإلكتروني الرسمي</label>
                                <div class="input-group">
                                    <span class="input-group-text bg-dark border-secondary text-warning"><i class="ti ti-mail"></i></span>
                                    <input type="email" name="support_email" class="form-control font-monospace" value="{{ old('support_email', $settings['support_email'] ?? 'support@emperorcard.com') }}">
                                </div>
                            </div>
                            <div class="col-12 col-md-6">
                                <label class="form-label text-white fw-semibold">ساعات العمل والدعم</label>
                                <div class="input-group">
                                    <span class="input-group-text bg-dark border-secondary text-light"><i class="ti ti-clock"></i></span>
                                    <input type="text" name="working_hours" class="form-control" value="{{ old('working_hours', $settings['working_hours'] ?? 'على مدار 24 ساعة طوال أيام الأسبوع') }}">
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 4. Social Media Links -->
                    <div class="card p-4 mb-4">
                        <h5 class="fw-bold text-white mb-3 d-flex align-items-center gap-2">
                            <i class="ti ti-share text-gold"></i>
                            <span>روابط منصات التواصل الاجتماعي (Social Media)</span>
                        </h5>

                        <div class="row g-3 mb-3">
                            <div class="col-12 col-md-6">
                                <label class="form-label text-muted fs-7">رابط صفحة فيسبوك</label>
                                <div class="input-group">
                                    <span class="input-group-text bg-dark border-secondary text-primary"><i class="ti ti-brand-facebook"></i></span>
                                    <input type="url" name="social_facebook" class="form-control form-control-sm font-monospace" placeholder="https://facebook.com/..." value="{{ old('social_facebook', $settings['social_facebook'] ?? '') }}">
                                </div>
                            </div>
                            <div class="col-12 col-md-6">
                                <label class="form-label text-muted fs-7">رابط حساب إنستجرام</label>
                                <div class="input-group">
                                    <span class="input-group-text bg-dark border-secondary text-danger"><i class="ti ti-brand-instagram"></i></span>
                                    <input type="url" name="social_instagram" class="form-control form-control-sm font-monospace" placeholder="https://instagram.com/..." value="{{ old('social_instagram', $settings['social_instagram'] ?? '') }}">
                                </div>
                            </div>
                        </div>

                        <div class="row g-3 mb-3">
                            <div class="col-12 col-md-6">
                                <label class="form-label text-muted fs-7">رابط حساب تيك توك</label>
                                <div class="input-group">
                                    <span class="input-group-text bg-dark border-secondary text-white"><i class="ti ti-brand-tiktok"></i></span>
                                    <input type="url" name="social_tiktok" class="form-control form-control-sm font-monospace" placeholder="https://tiktok.com/@..." value="{{ old('social_tiktok', $settings['social_tiktok'] ?? '') }}">
                                </div>
                            </div>
                            <div class="col-12 col-md-6">
                                <label class="form-label text-muted fs-7">رابط قناة تيليجرام العامة</label>
                                <div class="input-group">
                                    <span class="input-group-text bg-dark border-secondary text-info"><i class="ti ti-brand-telegram"></i></span>
                                    <input type="url" name="social_telegram" class="form-control form-control-sm font-monospace" placeholder="https://t.me/..." value="{{ old('social_telegram', $settings['social_telegram'] ?? '') }}">
                                </div>
                            </div>
                        </div>

                        <div class="row g-3">
                            <div class="col-12 col-md-6">
                                <label class="form-label text-muted fs-7">رابط قناة يوتيوب</label>
                                <div class="input-group">
                                    <span class="input-group-text bg-dark border-secondary text-danger"><i class="ti ti-brand-youtube"></i></span>
                                    <input type="url" name="social_youtube" class="form-control form-control-sm font-monospace" placeholder="https://youtube.com/..." value="{{ old('social_youtube', $settings['social_youtube'] ?? '') }}">
                                </div>
                            </div>
                            <div class="col-12 col-md-6">
                                <label class="form-label text-muted fs-7">سيرفر ديسكورد</label>
                                <div class="input-group">
                                    <span class="input-group-text bg-dark border-secondary text-indigo"><i class="ti ti-brand-discord"></i></span>
                                    <input type="url" name="social_discord" class="form-control form-control-sm font-monospace" placeholder="https://discord.gg/..." value="{{ old('social_discord', $settings['social_discord'] ?? '') }}">
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 5. Target & Wallet Settings -->
                    <div class="card p-4 mb-4">
                        <h5 class="fw-bold text-white mb-3 d-flex align-items-center gap-2">
                            <i class="ti ti-target-arrow text-gold"></i>
                            <span>إعدادات وكالة بيع التارجت والمحفظة</span>
                        </h5>

                        <div class="row g-3 mb-3">
                            <div class="col-12 col-md-6">
                                <label class="form-label text-white fw-semibold">كود / آيدي الوكالة الرسمي (Agency ID)</label>
                                <input type="text" name="target_agency_id" class="form-control font-monospace text-gold fw-bold" value="{{ old('target_agency_id', $settings['target_agency_id'] ?? 'EMP-TARGET-001') }}" required>
                                <span class="text-muted fs-8">هذا هو الكود الذي سيقوم العميل بتحويل التارجت إليه داخل التطبيقات.</span>
                            </div>
                            <div class="col-12 col-md-6">
                                <label class="form-label text-white fw-semibold">اسم الوكالة المعروض</label>
                                <input type="text" name="target_agency_name" class="form-control" value="{{ old('target_agency_name', $settings['target_agency_name'] ?? 'وكالة إمبراطور الرسمية') }}" required>
                            </div>
                        </div>

                        <div class="mb-0">
                            <label class="form-label text-white fw-semibold">الحد الأدنى للإيداع بالمحفظة (ج.م)</label>
                            <input type="number" step="1" name="min_wallet_deposit" class="form-control font-monospace" value="{{ old('min_wallet_deposit', $settings['min_wallet_deposit'] ?? 50) }}" required>
                        </div>
                    </div>

                    <!-- 6. CMS Texts & Policies -->
                    <div class="card p-4 mb-4">
                        <h5 class="fw-bold text-white mb-3 d-flex align-items-center gap-2">
                            <i class="ti ti-file-text text-gold"></i>
                            <span>نصوص الصفحات الثابتة والسياسات (CMS Content)</span>
                        </h5>

                        <div class="mb-3">
                            <label class="form-label text-white fw-semibold">نص صفحة «من نحن» (About Us)</label>
                            <textarea name="about_us_text" class="form-control" rows="4" placeholder="اكتب نبذة عن منصة إمبراطور وتاريخها ومميزاتها...">{{ old('about_us_text', $settings['about_us_text'] ?? '') }}</textarea>
                        </div>

                        <div class="mb-3">
                            <label class="form-label text-white fw-semibold">الشروط والأحكام وسياسة الاستخدام</label>
                            <textarea name="terms_conditions" class="form-control" rows="4" placeholder="الشروط والأحكام الخاصة بطلبات الشحن واستخدام المنصة...">{{ old('terms_conditions', $settings['terms_conditions'] ?? '') }}</textarea>
                        </div>

                        <div class="mb-0">
                            <label class="form-label text-white fw-semibold">سياسة الخصوصية واسترجاع الأموال</label>
                            <textarea name="privacy_policy" class="form-control" rows="4" placeholder="سياسة حماية البيانات والخصوصية واسترداد الرصيد...">{{ old('privacy_policy', $settings['privacy_policy'] ?? '') }}</textarea>
                        </div>
                    </div>

                    <div class="d-grid mb-4">
                        <button type="submit" class="btn btn-primary btn-lg fw-bold py-3">
                            <i class="ti ti-device-floppy fs-5"></i> حفظ وتحديث جميع إعدادات المنصة
                        </button>
                    </div>
                </div>

                <!-- Payment Methods Column -->
                <div class="col-12 col-xl-5">
                    <div class="sticky-top" style="top: 90px;">
                        <h5 class="fw-bold text-white mb-3 d-flex align-items-center gap-2">
                            <i class="ti ti-credit-card text-gold"></i>
                            <span>طرق وحسابات الدفع (Payment Accounts)</span>
                        </h5>

                        @foreach($paymentMethods as $method)
                            <div class="card p-3 mb-3">
                                <div class="d-flex align-items-center justify-content-between mb-3">
                                    <div class="d-flex align-items-center gap-2">
                                        <span class="badge badge-gold">{{ $method->currency }}</span>
                                        <h6 class="fw-bold text-white mb-0">{{ $method->name }}</h6>
                                    </div>
                                    <span class="badge bg-{{ $method->is_active ? 'success' : 'secondary' }}-subtle text-{{ $method->is_active ? 'success' : 'light' }}">
                                        {{ $method->is_active ? 'مفعل' : 'معطل' }}
                                    </span>
                                </div>

                                <div class="row g-2 mb-2">
                                    <div class="col-6">
                                        <label class="form-label text-muted fs-8">الحد الأدنى ({{ $method->currency }})</label>
                                        <input type="number" step="0.01" name="methods[{{ $method->id }}][min_amount]" class="form-control form-control-sm font-monospace" value="{{ $method->min_amount }}">
                                    </div>
                                    <div class="col-6">
                                        <label class="form-label text-muted fs-8">الحد الأقصى ({{ $method->currency }})</label>
                                        <input type="number" step="0.01" name="methods[{{ $method->id }}][max_amount]" class="form-control form-control-sm font-monospace" value="{{ $method->max_amount }}">
                                    </div>
                                </div>

                                <div class="row g-2 mb-2">
                                    <div class="col-6">
                                        <label class="form-label text-muted fs-8">رسوم ثابتة ({{ $method->currency }})</label>
                                        <input type="number" step="0.01" name="methods[{{ $method->id }}][fixed_fee]" class="form-control form-control-sm font-monospace" value="{{ $method->fixed_fee }}">
                                    </div>
                                    <div class="col-6">
                                        <label class="form-label text-muted fs-8">نسبة الرسوم (%)</label>
                                        <input type="number" step="0.01" name="methods[{{ $method->id }}][percent_fee]" class="form-control form-control-sm font-monospace" value="{{ $method->percent_fee }}">
                                    </div>
                                </div>

                                <!-- Dynamic Account Details based on code -->
                                <div class="mb-3 p-2 rounded bg-dark border border-secondary">
                                    <label class="form-label text-gold fw-semibold fs-8 mb-1">بيانات الحساب لاستقبال التحويلات:</label>
                                    @if($method->code === 'vodafone_cash' || str_contains($method->code, 'cash'))
                                        <input type="text" name="methods[{{ $method->id }}][account_details][wallet_number]" class="form-control form-control-sm font-monospace mb-1" placeholder="رقم محفظة كاش" value="{{ $method->account_details['wallet_number'] ?? '' }}">
                                    @elseif($method->code === 'instapay')
                                        <input type="text" name="methods[{{ $method->id }}][account_details][ipa_handle]" class="form-control form-control-sm font-monospace mb-1" placeholder="عنوان انستاباي IPA" value="{{ $method->account_details['ipa_handle'] ?? '' }}">
                                    @elseif($method->code === 'usdt_crypto' || str_contains($method->code, 'usdt'))
                                        <input type="text" name="methods[{{ $method->id }}][account_details][trc20_address]" class="form-control form-control-sm font-monospace mb-1" placeholder="عنوان محفظة TRC20" value="{{ $method->account_details['trc20_address'] ?? '' }}">
                                    @else
                                        <input type="text" name="methods[{{ $method->id }}][account_details][account_number]" class="form-control form-control-sm font-monospace mb-1" placeholder="رقم الحساب / المحفظة" value="{{ $method->account_details['account_number'] ?? ($method->account_details['wallet_number'] ?? '') }}">
                                    @endif
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </form>
    </div>
@endsection

@push('scripts')
<script>
function previewImage(input, previewId) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById(previewId).src = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
}
</script>
@endpush
