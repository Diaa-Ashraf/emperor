@extends('layouts.admin')

@section('title', 'إضافة مزود خدمة جديد')

@section('content')
<div class="row justify-content-center">
    <div class="col-lg-8">
        <div class="card border-0 shadow-sm">
            <div class="card-header bg-transparent border-0 py-3">
                <h5 class="card-title fw-bold mb-0 text-white"><i class="ti ti-plus text-warning me-2"></i> إضافة مزود خدمة جديد</h5>
            </div>

            <form action="{{ route('admin.providers.store') }}" method="POST">
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
                            <label class="form-label text-white fw-semibold">اسم المزود <span class="text-danger">*</span></label>
                            <input type="text" name="name" class="form-control" value="{{ old('name') }}" placeholder="مثال: KA-Cards API / Manual Ops" required>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label class="form-label text-white fw-semibold">الأولوية (Priority) <span class="text-danger">*</span></label>
                            <input type="number" name="priority" class="form-control" value="{{ old('priority', 1) }}" min="1" required>
                            <small class="text-muted">الرقم الأقل يعني أولوية تنفيذ أعلى (1 أولاً ثم 2 ثم 3)</small>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label text-white fw-semibold">المشغل (Driver) <span class="text-danger">*</span></label>
                            <select name="driver" class="form-select" required>
                                <option value="ka_cards_api" {{ old('driver') === 'ka_cards_api' ? 'selected' : '' }}>KA-Cards API</option>
                                <option value="manual_review" {{ old('driver') === 'manual_review' ? 'selected' : '' }}>تنفيذ يدوي (Manual Review)</option>
                            </select>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label text-white fw-semibold">عملة حساب المزود <span class="text-danger">*</span></label>
                            <select name="balance_currency" class="form-select" required>
                                <option value="USD" {{ old('balance_currency') === 'USD' ? 'selected' : '' }}>دولار أمريكي (USD)</option>
                                <option value="EGP" {{ old('balance_currency') === 'EGP' ? 'selected' : '' }}>جنيه مصري (EGP)</option>
                                <option value="SAR" {{ old('balance_currency') === 'SAR' ? 'selected' : '' }}>ريال سعودي (SAR)</option>
                                <option value="USDT" {{ old('balance_currency') === 'USDT' ? 'selected' : '' }}>USDT</option>
                            </select>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label text-white fw-semibold">الرابط الأساسي للـ API (Base URL)</label>
                        <input type="url" name="base_url" class="form-control" value="{{ old('base_url', 'https://ka-cards.com/api/v1') }}" placeholder="https://api.provider.com/v1">
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label text-white fw-semibold">مفتاح API (API Key)</label>
                            <input type="text" name="api_key" class="form-control" value="{{ old('api_key') }}" placeholder="API Key">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label text-white fw-semibold">المفتاح السري (API Secret)</label>
                            <input type="password" name="api_secret" class="form-control" placeholder="API Secret">
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-check form-switch mb-3">
                                <input class="form-check-input" type="checkbox" name="auto_fulfill" id="autoFulfill" value="1" {{ old('auto_fulfill', true) ? 'checked' : '' }}>
                                <label class="form-check-label text-white" for="autoFulfill">إرسال الطلبات تلقائياً للمزود فور الدفع</label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-check form-switch mb-3">
                                <input class="form-check-input" type="checkbox" name="is_active" id="isActive" value="1" {{ old('is_active', true) ? 'checked' : '' }}>
                                <label class="form-check-label text-white" for="isActive">تفعيل المزود واستخدامه في التوجيه</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card-footer bg-transparent border-0 d-flex justify-content-between py-3">
                    <a href="{{ route('admin.providers.index') }}" class="btn btn-outline-secondary">إلغاء والعودة</a>
                    <button type="submit" class="btn btn-primary px-4"><i class="ti ti-device-floppy me-1"></i> حفظ المزود</button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection
