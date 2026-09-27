@extends('layouts.admin')

@section('title', 'إعدادات المنصة وطرق الدفع')

@section('header')
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
            <h3 class="fw-black text-white mb-1 d-flex align-items-center gap-2">
                <i class="ti ti-settings text-gold"></i>
                <span>الإعدادات العامة للمنصة وطرق الدفع</span>
            </h3>
            <p class="text-muted mb-0 fs-6">التحكم في بيانات المنصة، أرقام الدعم، معرفات وكالة التارجت، وحسابات الاستقبال.</p>
        </div>
    </div>
@endsection

@section('content')
    <div class="row g-4">
        <!-- Main Settings Column -->
        <div class="col-12 col-xl-7">
            <!-- General Settings Card -->
            <div class="card p-4 mb-4">
                <h5 class="fw-bold text-white mb-3 d-flex align-items-center gap-2">
                    <i class="ti ti-adjustments text-gold"></i>
                    <span>بيانات المنصة والدعم</span>
                </h5>
                <form method="POST" action="{{ route('admin.settings.update-general') }}">
                    @csrf
                    <div class="mb-3">
                        <label class="form-label text-white fw-semibold">اسم المنصة</label>
                        <input type="text" name="site_name" class="form-control" value="{{ old('site_name', $settings['site_name'] ?? 'Emperor') }}" required>
                    </div>

                    <div class="mb-3">
                        <label class="form-label text-white fw-semibold">وصف المنصة (SEO & Header)</label>
                        <textarea name="site_description" class="form-control" rows="2">{{ old('site_description', $settings['site_description'] ?? '') }}</textarea>
                    </div>

                    <div class="row g-3 mb-3">
                        <div class="col-12 col-md-6">
                            <label class="form-label text-white fw-semibold">رقم الواتساب للدعم الفني</label>
                            <div class="input-group">
                                <span class="input-group-text bg-dark border-secondary text-success"><i class="ti ti-brand-whatsapp"></i></span>
                                <input type="text" name="whatsapp_support" class="form-control font-monospace" value="{{ old('whatsapp_support', $settings['whatsapp_support'] ?? '+201000000000') }}" required>
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <label class="form-label text-white fw-semibold">يوزر تيليجرام للدعم</label>
                            <div class="input-group">
                                <span class="input-group-text bg-dark border-secondary text-info"><i class="ti ti-brand-telegram"></i></span>
                                <input type="text" name="telegram_support" class="form-control font-monospace" value="{{ old('telegram_support', $settings['telegram_support'] ?? 'EmperorSupport') }}">
                            </div>
                        </div>
                    </div>

                    <hr class="border-dark my-4">

                    <h5 class="fw-bold text-white mb-3 d-flex align-items-center gap-2">
                        <i class="ti ti-target-arrow text-gold"></i>
                        <span>إعدادات وكالة بيع التارجت</span>
                    </h5>

                    <div class="row g-3 mb-3">
                        <div class="col-12 col-md-6">
                            <label class="form-label text-white fw-semibold">كود / آيدي الوكالة الرسمي (Agency ID)</label>
                            <input type="text" name="target_agency_id" class="form-control font-monospace text-gold fw-bold" value="{{ old('target_agency_id', $settings['target_agency_id'] ?? 'EMP-TARGET-001') }}" required>
                            <span class="text-muted fs-8">هذا هو الكود الذي سيقوم المستخدم بتحويل التارجت إليه في التطبيقات.</span>
                        </div>
                        <div class="col-12 col-md-6">
                            <label class="form-label text-white fw-semibold">اسم الوكالة المعروض</label>
                            <input type="text" name="target_agency_name" class="form-control" value="{{ old('target_agency_name', $settings['target_agency_name'] ?? 'وكالة إمبراطور الرسمية') }}" required>
                        </div>
                    </div>

                    <div class="mb-4">
                        <label class="form-label text-white fw-semibold">الحد الأدنى للإيداع بالمحفظة (ج.م)</label>
                        <input type="number" step="1" name="min_wallet_deposit" class="form-control font-monospace" value="{{ old('min_wallet_deposit', $settings['min_wallet_deposit'] ?? 50) }}" required>
                    </div>

                    <button type="submit" class="btn btn-primary fw-bold">
                        <i class="ti ti-device-floppy"></i> حفظ الإعدادات العامة
                    </button>
                </form>
            </div>
        </div>

        <!-- Payment Methods Column -->
        <div class="col-12 col-xl-5">
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

                    <form method="POST" action="{{ route('admin.settings.update-payment-method', $method->id) }}">
                        @csrf
                        <input type="hidden" name="name" value="{{ $method->name }}">

                        <div class="row g-2 mb-2">
                            <div class="col-6">
                                <label class="form-label text-muted fs-8">الحد الأدنى ({{ $method->currency }})</label>
                                <input type="number" step="0.01" name="min_amount" class="form-control form-control-sm font-monospace" value="{{ $method->min_amount }}">
                            </div>
                            <div class="col-6">
                                <label class="form-label text-muted fs-8">الحد الأقصى ({{ $method->currency }})</label>
                                <input type="number" step="0.01" name="max_amount" class="form-control form-control-sm font-monospace" value="{{ $method->max_amount }}">
                            </div>
                        </div>

                        <div class="row g-2 mb-2">
                            <div class="col-6">
                                <label class="form-label text-muted fs-8">رسوم ثابتة ({{ $method->currency }})</label>
                                <input type="number" step="0.01" name="fixed_fee" class="form-control form-control-sm font-monospace" value="{{ $method->fixed_fee }}">
                            </div>
                            <div class="col-6">
                                <label class="form-label text-muted fs-8">نسبة الرسوم (%)</label>
                                <input type="number" step="0.01" name="percent_fee" class="form-control form-control-sm font-monospace" value="{{ $method->percent_fee }}">
                            </div>
                        </div>

                        <!-- Dynamic Account Details based on code -->
                        <div class="mb-3 p-2 rounded bg-dark border border-secondary">
                            <label class="form-label text-gold fw-semibold fs-8 mb-1">بيانات الحساب لاستقبال التحويلات:</label>
                            @if($method->code === 'vodafone_cash')
                                <input type="text" name="account_details[wallet_number]" class="form-control form-control-sm font-monospace mb-1" placeholder="رقم محفظة كاش" value="{{ $method->account_details['wallet_number'] ?? '' }}">
                            @elseif($method->code === 'instapay')
                                <input type="text" name="account_details[ipa_handle]" class="form-control form-control-sm font-monospace mb-1" placeholder="عنوان انستاباي IPA" value="{{ $method->account_details['ipa_handle'] ?? '' }}">
                            @elseif($method->code === 'usdt_crypto')
                                <input type="text" name="account_details[trc20_address]" class="form-control form-control-sm font-monospace mb-1" placeholder="عنوان محفظة TRC20" value="{{ $method->account_details['trc20_address'] ?? '' }}">
                            @endif
                        </div>

                        <div class="d-flex align-items-center justify-content-between">
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" name="is_active" id="active{{ $method->id }}" {{ $method->is_active ? 'checked' : '' }}>
                                <label class="form-check-label text-muted fs-8" for="active{{ $method->id }}">تفعيل الطريقة</label>
                            </div>
                            <button type="submit" class="btn btn-sm btn-dark-outline">
                                <i class="ti ti-device-floppy"></i> حفظ الطريقة
                            </button>
                        </div>
                    </form>
                </div>
            @endforeach
        </div>
    </div>
@endsection
