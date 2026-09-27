@extends('layouts.admin')

@section('title', 'إضافة مصدر كتالوج جديد')

@section('content')
<div class="row justify-content-center">
    <div class="col-lg-8">
        <div class="card border-0 shadow-sm">
            <div class="card-header bg-transparent border-0 py-3">
                <h5 class="card-title fw-bold mb-0 text-white"><i class="ti ti-plus text-warning me-2"></i> إضافة مصدر كتالوج جديد</h5>
            </div>

            <form action="{{ route('admin.catalog-sources.store') }}" method="POST">
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

                    <div class="mb-3">
                        <label class="form-label text-white fw-semibold">اسم المصدر <span class="text-danger">*</span></label>
                        <input type="text" name="name" class="form-control" value="{{ old('name') }}" placeholder="مثال: KA-Cards Main Scraper" required>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label text-white fw-semibold">المشغل (Driver) <span class="text-danger">*</span></label>
                            <select name="driver" class="form-select" required>
                                <option value="ka_cards_scraper" {{ old('driver') === 'ka_cards_scraper' ? 'selected' : '' }}>KA-Cards Scraper / Adapter</option>
                                <option value="generic_api" {{ old('driver') === 'generic_api' ? 'selected' : '' }}>Generic API Adapter</option>
                            </select>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label text-white fw-semibold">الرابط الأساسي (Base URL) <span class="text-danger">*</span></label>
                            <input type="url" name="base_url" class="form-control" value="{{ old('base_url', 'https://ka-cards.com') }}" required>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label text-white fw-semibold">مفتاح API (إن وجد)</label>
                            <input type="text" name="api_key" class="form-control" value="{{ old('api_key') }}" placeholder="API Key">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label text-white fw-semibold">المفتاح السري (API Secret)</label>
                            <input type="password" name="api_secret" class="form-control" placeholder="API Secret">
                        </div>
                    </div>

                    <div class="form-check form-switch mb-3">
                        <input class="form-check-input" type="checkbox" name="is_active" id="isActive" value="1" {{ old('is_active', true) ? 'checked' : '' }}>
                        <label class="form-check-label text-white" for="isActive">تفعيل المصدر للمزامنة التلقائية</label>
                    </div>
                </div>

                <div class="card-footer bg-transparent border-0 d-flex justify-content-between py-3">
                    <a href="{{ route('admin.catalog-sources.index') }}" class="btn btn-outline-secondary">إلغاء والعودة</a>
                    <button type="submit" class="btn btn-primary px-4"><i class="ti ti-device-floppy me-1"></i> حفظ المصدر</button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection
