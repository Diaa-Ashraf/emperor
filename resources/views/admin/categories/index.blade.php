@extends('layouts.admin')

@section('title', 'إدارة الأقسام والفئات')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="card mb-4 border-0 shadow-sm">
            <div class="card-header bg-transparent border-0 d-flex flex-wrap justify-content-between align-items-center gap-3 py-3">
                <div>
                    <h5 class="card-title fw-bold mb-0 text-white"><i class="ti ti-category text-warning me-2"></i> إدارة أقسام المنصة</h5>
                    <small class="text-muted">أقسام وتصنيفات الألعاب، تطبيقات المحادثة الصوتية، والبطاقات الرقمية</small>
                </div>
                <div>
                    <a href="{{ route('admin.categories.create') }}" class="btn btn-primary">
                        <i class="ti ti-plus me-1"></i> إضافة قسم جديد
                    </a>
                </div>
            </div>

            <!-- Filters -->
            <div class="card-body border-top border-bottom border-dark py-3">
                <form action="{{ route('admin.categories.index') }}" method="GET" class="row g-3 align-items-center">
                    <div class="col-md-5">
                        <div class="input-group">
                            <span class="input-group-text bg-dark border-secondary text-muted"><i class="ti ti-search"></i></span>
                            <input type="text" name="search" class="form-control" placeholder="بحث باسم القسم..." value="{{ request('search') }}">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <select name="type" class="form-select">
                            <option value="">-- كل الأنواع والتصنيفات --</option>
                            @foreach(\App\Enums\CategoryType::cases() as $catType)
                                <option value="{{ $catType->value }}" {{ request('type') === $catType->value ? 'selected' : '' }}>
                                    {{ $catType->label() }}
                                </option>
                            @endforeach
                        </select>
                    </div>
                    <div class="col-md-3 d-flex gap-2">
                        <button type="submit" class="btn btn-warning flex-fill"><i class="ti ti-filter me-1"></i> تصفية</button>
                        @if(request()->hasAny(['search', 'type']))
                            <a href="{{ route('admin.categories.index') }}" class="btn btn-outline-secondary"><i class="ti ti-x"></i></a>
                        @endif
                    </div>
                </form>
            </div>

            @if(session('success'))
                <div class="mx-3 mt-3 alert alert-success alert-dismissible fade show" role="alert">
                    {{ session('success') }}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            @endif

            @if(session('error'))
                <div class="mx-3 mt-3 alert alert-danger alert-dismissible fade show" role="alert">
                    {{ session('error') }}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            @endif

            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead class="table-dark">
                            <tr>
                                <th class="ps-3">الترتيب</th>
                                <th>الأيقونة</th>
                                <th>اسم القسم</th>
                                <th>النوع والتصنيف</th>
                                <th>الرابط (Slug)</th>
                                <th>عدد المنتجات</th>
                                <th>الحالة</th>
                                <th class="text-end pe-3">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse($categories as $category)
                                <tr>
                                    <td class="ps-3">
                                        <span class="badge bg-secondary font-monospace">#{{ $category->sort_order }}</span>
                                    </td>
                                    <td>
                                        @if($category->icon)
                                            <img src="{{ Storage::url($category->icon) }}" alt="{{ $category->name }}" class="rounded shadow-sm" style="width: 40px; height: 40px; object-fit: cover;">
                                        @else
                                            <div class="rounded bg-dark border border-secondary d-flex align-items-center justify-content-center text-warning" style="width: 40px; height: 40px;">
                                                <i class="ti ti-folder fs-5"></i>
                                            </div>
                                        @endif
                                    </td>
                                    <td>
                                        <div class="fw-bold text-white">{{ $category->name }}</div>
                                        @if($category->description)
                                            <small class="text-muted text-truncate d-block" style="max-width: 250px;">{{ $category->description }}</small>
                                        @endif
                                    </td>
                                    <td>
                                        <span class="badge bg-primary-subtle text-primary border border-primary-subtle">
                                            {{ $category->type->label() }}
                                        </span>
                                    </td>
                                    <td class="font-monospace text-muted small">{{ $category->slug }}</td>
                                    <td>
                                        <a href="{{ route('admin.products.index', ['category_id' => $category->id]) }}" class="badge bg-dark border border-secondary text-warning text-decoration-none">
                                            {{ $category->products_count }} منتج
                                        </a>
                                    </td>
                                    <td>
                                        @if($category->is_active)
                                            <span class="badge bg-success-subtle text-success border border-success-subtle">نشط</span>
                                        @else
                                            <span class="badge bg-danger-subtle text-danger border border-danger-subtle">معطل</span>
                                        @endif
                                    </td>
                                    <td class="text-end pe-3">
                                        <div class="d-flex justify-content-end gap-1">
                                            <form action="{{ route('admin.categories.toggle-active', $category->id) }}" method="POST" class="d-inline">
                                                @csrf
                                                <button type="submit" class="btn btn-sm {{ $category->is_active ? 'btn-outline-secondary' : 'btn-outline-success' }}" title="تبديل الحالة">
                                                    <i class="ti {{ $category->is_active ? 'ti-eye-off' : 'ti-eye' }}"></i>
                                                </button>
                                            </form>
                                            <a href="{{ route('admin.categories.edit', $category->id) }}" class="btn btn-sm btn-outline-info" title="تعديل القسم">
                                                <i class="ti ti-edit"></i>
                                            </a>
                                            <form action="{{ route('admin.categories.destroy', $category->id) }}" method="POST" class="d-inline" onsubmit="return confirm('هل أنت متأكد من حذف القسم «{{ $category->name }}» نهائياً؟');">
                                                @csrf
                                                @method('DELETE')
                                                <button type="submit" class="btn btn-sm btn-outline-danger" title="حذف القسم">
                                                    <i class="ti ti-trash"></i>
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="8" class="text-center py-5 text-muted">
                                        <i class="ti ti-category-2 fs-1 d-block mb-2 text-warning"></i>
                                        لا توجد أقسام مسجلة حتى الآن.
                                    </td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>

            @if($categories->hasPages())
                <div class="card-footer bg-transparent border-0 d-flex justify-content-center">
                    {{ $categories->links() }}
                </div>
            @endif
        </div>
    </div>
</div>
@endsection
