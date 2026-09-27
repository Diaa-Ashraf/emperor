@extends('layouts.admin')

@section('title', 'إضافة عميل API جديد')

@section('content')
<div class="row justify-content-center">
    <div class="col-lg-8">
        <div class="card border-0 shadow-sm">
            <div class="card-header bg-transparent border-0 d-flex justify-content-between align-items-center py-3">
                <div>
                    <h5 class="card-title fw-bold mb-0 text-white"><i class="ti ti-plus text-warning me-2"></i> إنشاء حساب عميل API جديد</h5>
                    <small class="text-muted">توليد بيانات الربط البرمجي ومحفظة العميل للربط المباشر مع المنصة</small>
                </div>
                <a href="{{ route('admin.api-clients.index') }}" class="btn btn-outline-secondary btn-sm">
                    <i class="ti ti-arrow-right me-1"></i> رجوع للقائمة
                </a>
            </div>

            <form action="{{ route('admin.api-clients.store') }}" method="POST">
                @csrf
                <div class="card-body border-top border-dark">
                    @if ($errors->any())
                        <div class="alert alert-danger bg-danger text-white border-0 mb-4">
                            <ul class="mb-0">
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif

                    <h6 class="text-warning fw-bold mb-3"><i class="ti ti-user-check me-1"></i> البيانات الأساسية</h6>
                    <div class="row g-3 mb-4">
                        <div class="col-md-6">
                            <label class="form-label text-light small">اسم العميل / المؤسسة <span class="text-danger">*</span></label>
                            <input type="text" name="name" class="form-control" placeholder="مثال: شركة النجم للمدفوعات" value="{{ old('name') }}" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-light small">البريد الإلكتروني <span class="text-danger">*</span></label>
                            <input type="email" name="email" class="form-control font-monospace" placeholder="partner@domain.com" value="{{ old('email') }}" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-light small">رقم الهاتف (واتساب / دعم)</label>
                            <input type="text" name="phone" class="form-control font-monospace" placeholder="+201012345678" value="{{ old('phone') }}">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-light small">كلمة المرور (اختياري، يتم توليدها تلقائياً إذا تركت فارغة)</label>
                            <input type="password" name="password" class="form-control font-monospace" placeholder="********">
                        </div>
                    </div>

                    <h6 class="text-warning fw-bold mb-3"><i class="ti ti-wallet me-1"></i> المحفظة والرصيد الافتتاحي</h6>
                    <div class="row g-3 mb-4">
                        <div class="col-md-6">
                            <label class="form-label text-light small">الرصيد الافتتاحي (EGP)</label>
                            <div class="input-group">
                                <input type="number" step="0.01" min="0" name="initial_balance" class="form-control font-monospace" placeholder="0.00" value="{{ old('initial_balance', '0.00') }}">
                                <span class="input-group-text bg-dark border-secondary text-warning">EGP</span>
                            </div>
                            <small class="text-muted">سيتم شحن المحفظة فوراً بهذا الرصيد الافتتاحي إذا تم تحديده.</small>
                        </div>
                    </div>

                    <h6 class="text-warning fw-bold mb-3"><i class="ti ti-shield-lock me-1"></i> إعدادات الأمان والربط البرمجي</h6>
                    <div class="row g-3 mb-4">
                        <div class="col-md-6">
                            <label class="form-label text-light small">الحد الأقصى للطلبات في الدقيقة (Rate Limit)</label>
                            <input type="number" name="api_rate_limit" class="form-control font-monospace" min="10" max="1000" value="{{ old('api_rate_limit', 60) }}">
                            <small class="text-muted">الافتراضي: 60 طلب في الدقيقة الواحدة لكل عميل.</small>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-light small">رابط الـ Webhook للإشعارات (اختياري)</label>
                            <input type="url" name="webhook_url" class="form-control font-monospace" placeholder="https://api.partner.com/webhooks/orders" value="{{ old('webhook_url') }}">
                            <small class="text-muted">يتم إرسال إشعار فوري عند تغير حالة الطلبات (مكتمل / ملغي).</small>
                        </div>
                        <div class="col-12">
                            <label class="form-label text-light small">القائمة البيضاء لعناوين IP المسموح بها (IP Whitelist)</label>
                            <textarea name="api_ip_whitelist" class="form-control font-monospace" rows="3" placeholder="أدخل عناوين IP مفصولة بأسطر جديدة أو فواصل (مثال: 197.38.10.12) أو اترك فارغاً للسماح لجميع العناوين">{{ old('api_ip_whitelist') }}</textarea>
                            <small class="text-muted">اترك هذا الحقل فارغاً إذا كنت ترغب في السماح للعميل بإرسال الطلبات من أي عنوان IP.</small>
                        </div>
                    </div>
                </div>

                <div class="card-footer bg-transparent border-dark d-flex justify-content-end gap-2 py-3">
                    <a href="{{ route('admin.api-clients.index') }}" class="btn btn-outline-secondary">إلغاء</a>
                    <button type="submit" class="btn btn-warning text-dark fw-bold">
                        <i class="ti ti-check me-1"></i> حفظ وتوليد مفاتيح الـ API
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection
