@extends('layouts.admin')

@section('title', 'تعديل بيانات عميل API')

@section('content')
<div class="row justify-content-center">
    <div class="col-lg-8">
        <div class="card border-0 shadow-sm">
            <div class="card-header bg-transparent border-0 d-flex justify-content-between align-items-center py-3">
                <div>
                    <h5 class="card-title fw-bold mb-0 text-white"><i class="ti ti-edit text-warning me-2"></i> تعديل بيانات عميل API: {{ $client->name }}</h5>
                    <small class="text-muted">التحكم في قيود الوصول وحالة الحساب والـ Webhook</small>
                </div>
                <div class="d-flex gap-2">
                    <a href="{{ route('admin.api-clients.pricing', $client->id) }}" class="btn btn-outline-warning btn-sm">
                        <i class="ti ti-coin me-1"></i> مصفوفة الأسعار
                    </a>
                    <a href="{{ route('admin.api-clients.index') }}" class="btn btn-outline-secondary btn-sm">
                        <i class="ti ti-arrow-right me-1"></i> رجوع
                    </a>
                </div>
            </div>

            <form action="{{ route('admin.api-clients.update', $client->id) }}" method="POST">
                @csrf
                @method('PUT')
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

                    <!-- Account Overview -->
                    <div class="p-3 bg-dark rounded border border-secondary mb-4 d-flex justify-content-between align-items-center flex-wrap gap-2">
                        <div>
                            <span class="text-muted small d-block">مفتاح الـ API الحالي:</span>
                            <span class="font-monospace text-warning fw-bold">{{ $client->api_key }}</span>
                        </div>
                        <div>
                            <span class="text-muted small d-block">رصيد المحفظة:</span>
                            <span class="font-monospace text-success fw-bold fs-6">{{ number_format($client->wallet?->balance ?? 0, 2) }} {{ $client->wallet?->currency ?? 'EGP' }}</span>
                            <a href="{{ route('admin.users.show', $client->id) }}" class="btn btn-sm btn-link text-info p-0 ms-2">إدارة الرصيد</a>
                        </div>
                    </div>

                    <h6 class="text-warning fw-bold mb-3"><i class="ti ti-user-check me-1"></i> البيانات الأساسية</h6>
                    <div class="row g-3 mb-4">
                        <div class="col-md-6">
                            <label class="form-label text-light small">اسم العميل / المؤسسة <span class="text-danger">*</span></label>
                            <input type="text" name="name" class="form-control" value="{{ old('name', $client->name) }}" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-light small">البريد الإلكتروني <span class="text-danger">*</span></label>
                            <input type="email" name="email" class="form-control font-monospace" value="{{ old('email', $client->email) }}" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-light small">رقم الهاتف (واتساب / دعم)</label>
                            <input type="text" name="phone" class="form-control font-monospace" value="{{ old('phone', $client->phone) }}">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-light small">حالة الحساب <span class="text-danger">*</span></label>
                            <select name="status" class="form-select" required>
                                <option value="active" {{ old('status', $client->status->value) === 'active' ? 'selected' : '' }}>نشط (Active)</option>
                                <option value="suspended" {{ old('status', $client->status->value) === 'suspended' ? 'selected' : '' }}>موقوف مؤقتاً (Suspended)</option>
                                <option value="banned" {{ old('status', $client->status->value) === 'banned' ? 'selected' : '' }}>محظور (Banned)</option>
                            </select>
                        </div>
                    </div>

                    <h6 class="text-warning fw-bold mb-3"><i class="ti ti-shield-lock me-1"></i> إعدادات الأمان والربط البرمجي</h6>
                    <div class="row g-3 mb-4">
                        <div class="col-md-6">
                            <label class="form-label text-light small">الحد الأقصى للطلبات في الدقيقة (Rate Limit)</label>
                            <input type="number" name="api_rate_limit" class="form-control font-monospace" min="10" max="1000" value="{{ old('api_rate_limit', $client->api_rate_limit ?? 60) }}">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-light small">رابط الـ Webhook للإشعارات</label>
                            <input type="url" name="webhook_url" class="form-control font-monospace" placeholder="https://api.partner.com/webhooks/orders" value="{{ old('webhook_url', $client->webhook_url) }}">
                        </div>
                        <div class="col-12">
                            <label class="form-label text-light small">القائمة البيضاء لعناوين IP المسموح بها (IP Whitelist)</label>
                            <textarea name="api_ip_whitelist" class="form-control font-monospace" rows="4" placeholder="أدخل عناوين IP مفصولة بأسطر جديدة أو فواصل أو اترك فارغاً">{{ old('api_ip_whitelist', $ipWhitelistString) }}</textarea>
                            <small class="text-muted">اترك فارغاً للسماح لجميع عناوين الـ IP.</small>
                        </div>
                    </div>
                </div>

                <div class="card-footer bg-transparent border-dark d-flex justify-content-end gap-2 py-3">
                    <a href="{{ route('admin.api-clients.index') }}" class="btn btn-outline-secondary">إلغاء</a>
                    <button type="submit" class="btn btn-warning text-dark fw-bold">
                        <i class="ti ti-check me-1"></i> حفظ التعديلات
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection
