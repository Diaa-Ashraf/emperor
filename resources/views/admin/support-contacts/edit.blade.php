@extends('layouts.admin')

@section('title', 'تعديل وسيلة الدعم: ' . $contact->name)

@section('content')
<div class="row justify-content-center">
    <div class="col-lg-8">
        <div class="card border-0 shadow-sm mb-4">
            <div class="card-header bg-transparent border-0 d-flex justify-content-between align-items-center py-3">
                <div>
                    <h5 class="card-title fw-bold mb-0 text-white"><i class="ti ti-edit text-warning me-2"></i> تعديل وسيلة الدعم: {{ $contact->name }}</h5>
                    <small class="text-muted">تحديث بيانات القناة ورقم التواصل</small>
                </div>
                <div>
                    <a href="{{ route('admin.support-contacts.index') }}" class="btn btn-outline-secondary">
                        <i class="ti ti-arrow-right me-1"></i> العودة للقائمة
                    </a>
                </div>
            </div>

            @if($errors->any())
                <div class="mx-3 alert alert-danger alert-dismissible fade show" role="alert">
                    <ul class="mb-0">
                        @foreach($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            @endif

            <form action="{{ route('admin.support-contacts.update', $contact->id) }}" method="POST">
                @csrf
                @method('PUT')
                <div class="card-body">
                    <div class="row g-3 mb-3">
                        <div class="col-md-6">
                            <label class="form-label text-white fw-bold">اسم الفريق أو القناة <span class="text-danger">*</span></label>
                            <input type="text" name="name" class="form-control" value="{{ old('name', $contact->name) }}" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-white fw-bold">نوع الوسيلة (Channel) <span class="text-danger">*</span></label>
                            <select name="channel" class="form-select" required>
                                <option value="whatsapp" {{ old('channel', $contact->channel) === 'whatsapp' ? 'selected' : '' }}>واتساب (WhatsApp)</option>
                                <option value="telegram" {{ old('channel', $contact->channel) === 'telegram' ? 'selected' : '' }}>تيليجرام (Telegram)</option>
                                <option value="phone" {{ old('channel', $contact->channel) === 'phone' ? 'selected' : '' }}>مكالمة هاتفية (Phone)</option>
                                <option value="email" {{ old('channel', $contact->channel) === 'email' ? 'selected' : '' }}>بريد إلكتروني (Email)</option>
                            </select>
                        </div>
                    </div>

                    <div class="row g-3 mb-3">
                        <div class="col-md-8">
                            <label class="form-label text-white fw-bold">رقم الهاتف / المعرف / الرابط <span class="text-danger">*</span></label>
                            <input type="text" name="value" class="form-control font-monospace text-warning" value="{{ old('value', $contact->value) }}" required>
                        </div>
                        <div class="col-md-4">
                            <label class="form-label text-white fw-bold">الترتيب (Sort Order)</label>
                            <input type="number" name="sort_order" class="form-control" value="{{ old('sort_order', $contact->sort_order) }}">
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label text-white fw-bold">وصف أو أوقات العمل</label>
                        <input type="text" name="description" class="form-control" value="{{ old('description', $contact->description) }}">
                    </div>

                    <div class="p-3 bg-dark rounded border border-secondary">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="is_active" name="is_active" value="1" {{ old('is_active', $contact->is_active) ? 'checked' : '' }}>
                            <label class="form-check-label text-white fw-bold" for="is_active">
                                تفعيل وسيلة الاتصال وظهورها للمستخدمين
                            </label>
                        </div>
                    </div>
                </div>

                <div class="card-footer bg-transparent border-0 d-flex justify-content-end py-3">
                    <button type="submit" class="btn btn-warning">
                        <i class="ti ti-device-floppy me-1"></i> حفظ التعديلات
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection
