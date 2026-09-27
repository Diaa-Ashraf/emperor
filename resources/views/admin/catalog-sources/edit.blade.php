@extends('layouts.admin')

@section('title', 'تعديل مصدر الكتالوج: ' . $source->name)

@section('content')
<div class="row justify-content-center">
    <div class="col-lg-8">
        <div class="card border-0 shadow-sm">
            <div class="card-header bg-transparent border-0 py-3 d-flex justify-content-between align-items-center">
                <h5 class="card-title fw-bold mb-0 text-white"><i class="ti ti-edit text-warning me-2"></i> تعديل مصدر الكتالوج: {{ $source->name }}</h5>
                <span class="badge bg-dark border border-secondary text-warning">{{ $source->products_count ?? $source->products()->count() }} منتج مرتبط</span>
            </div>

            <form action="{{ route('admin.catalog-sources.update', $source->id) }}" method="POST">
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

                    <div class="mb-3">
                        <label class="form-label text-white fw-semibold">اسم المصدر <span class="text-danger">*</span></label>
                        <input type="text" name="name" class="form-control" value="{{ old('name', $source->name) }}" required>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label text-white fw-semibold">المشغل (Driver) <span class="text-danger">*</span></label>
                            <select name="driver" class="form-select" required>
                                <option value="ka_cards_scraper" {{ old('driver', $source->driver) === 'ka_cards_scraper' ? 'selected' : '' }}>KA-Cards Scraper / Adapter</option>
                                <option value="generic_api" {{ old('driver', $source->driver) === 'generic_api' ? 'selected' : '' }}>Generic API Adapter</option>
                            </select>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label text-white fw-semibold">الرابط الأساسي (Base URL) <span class="text-danger">*</span></label>
                            <input type="url" name="base_url" class="form-control" value="{{ old('base_url', $source->base_url) }}" required>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label text-white fw-semibold">مفتاح API (اتركه فارغاً للإبقاء على القديم)</label>
                            <input type="text" name="api_key" class="form-control" placeholder="اتركه فارغاً بدون تغيير">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label text-white fw-semibold">المفتاح السري (اتركه فارغاً للإبقاء على القديم)</label>
                            <input type="password" name="api_secret" class="form-control" placeholder="اتركه فارغاً بدون تغيير">
                        </div>
                    </div>

                    <div class="form-check form-switch mb-3">
                        <input class="form-check-input" type="checkbox" name="is_active" id="isActive" value="1" {{ old('is_active', $source->is_active) ? 'checked' : '' }}>
                        <label class="form-check-label text-white" for="isActive">تفعيل المصدر للمزامنة</label>
                    </div>
                </div>

                <div class="card-footer bg-transparent border-0 d-flex justify-content-between py-3">
                    <a href="{{ route('admin.catalog-sources.index') }}" class="btn btn-outline-secondary">إلغاء والعودة</a>
                    <button type="submit" class="btn btn-primary px-4"><i class="ti ti-device-floppy me-1"></i> حفظ التعديلات</button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection
