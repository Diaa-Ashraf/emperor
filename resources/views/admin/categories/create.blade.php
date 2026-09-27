@extends('layouts.admin')

@section('title', 'إضافة قسم جديد')

@section('content')
<div class="row justify-content-center">
    <div class="col-lg-8">
        <div class="card border-0 shadow-sm">
            <div class="card-header bg-transparent border-0 py-3">
                <h5 class="card-title fw-bold mb-0 text-white"><i class="ti ti-plus text-warning me-2"></i> إضافة قسم جديد للمنصة</h5>
            </div>

            <form action="{{ route('admin.categories.store') }}" method="POST" enctype="multipart/form-data">
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
                            <label class="form-label text-white fw-semibold">اسم القسم <span class="text-danger">*</span></label>
                            <input type="text" name="name" class="form-control" value="{{ old('name') }}" placeholder="مثال: ببجي موبايل / PUBG Mobile" required>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label class="form-label text-white fw-semibold">نوع القسم <span class="text-danger">*</span></label>
                            <select name="type" class="form-select" required>
                                @foreach(\App\Enums\CategoryType::cases() as $type)
                                    <option value="{{ $type->value }}" {{ old('type') === $type->value ? 'selected' : '' }}>
                                        {{ $type->label() }}
                                    </option>
                                @endforeach
                            </select>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-8 mb-3">
                            <label class="form-label text-white fw-semibold">الرابط المخصص (Slug)</label>
                            <input type="text" name="slug" class="form-control" value="{{ old('slug') }}" placeholder="اتركه فارغاً للتوليد التلقائي">
                        </div>
                        <div class="col-md-4 mb-3">
                            <label class="form-label text-white fw-semibold">ترتيب العرض</label>
                            <input type="number" name="sort_order" class="form-control" value="{{ old('sort_order', 0) }}" min="0">
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label text-white fw-semibold">وصف القسم</label>
                        <textarea name="description" class="form-control" rows="3" placeholder="نبذة توضيحية عن القسم والخدمات المتاحة بداخله">{{ old('description') }}</textarea>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label text-white fw-semibold">أيقونة القسم (Icon)</label>
                            <input type="file" name="icon" class="form-control" accept="image/*">
                            <small class="text-muted">صورة مربعة (SVG, PNG, WebP) بحجم أقصى 2MB</small>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label text-white fw-semibold">بانر العرض (Banner)</label>
                            <input type="file" name="banner" class="form-control" accept="image/*">
                            <small class="text-muted">صورة عرض عريضة بحجم أقصى 4MB</small>
                        </div>
                    </div>

                    <div class="form-check form-switch mb-3">
                        <input class="form-check-input" type="checkbox" name="is_active" id="isActive" value="1" {{ old('is_active', true) ? 'checked' : '' }}>
                        <label class="form-check-label text-white" for="isActive">تفعيل القسم وإظهاره في المتجر للعملاء</label>
                    </div>
                </div>

                <div class="card-footer bg-transparent border-0 d-flex justify-content-between py-3">
                    <a href="{{ route('admin.categories.index') }}" class="btn btn-outline-secondary">إلغاء والعودة</a>
                    <button type="submit" class="btn btn-primary px-4"><i class="ti ti-device-floppy me-1"></i> حفظ القسم</button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection
