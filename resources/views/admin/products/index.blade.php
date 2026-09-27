@extends('layouts.admin')

@section('title', 'إدارة المنتجات والباقات')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="card mb-4 border-0 shadow-sm">
            <div class="card-header bg-transparent border-0 d-flex flex-wrap justify-content-between align-items-center gap-3 py-3">
                <div>
                    <h5 class="card-title fw-bold mb-0 text-white"><i class="ti ti-device-gamepad-2 text-warning me-2"></i> دليل المنتجات والباقات</h5>
                    <small class="text-muted">إدارة المنتجات، باقات الشحن، استراتيجيات التسعير، وربط المزودين</small>
                </div>
                <div>
                    <a href="{{ route('admin.products.create') }}" class="btn btn-primary">
                        <i class="ti ti-plus me-1"></i> إضافة منتج جديد
                    </a>
                </div>
            </div>

            <!-- Filters -->
            <div class="card-body border-top border-bottom border-dark py-3">
                <form action="{{ route('admin.products.index') }}" method="GET" class="row g-3 align-items-center">
                    <div class="col-md-4">
                        <div class="input-group">
                            <span class="input-group-text bg-dark border-secondary text-muted"><i class="ti ti-search"></i></span>
                            <input type="text" name="search" class="form-control" placeholder="بحث باسم المنتج..." value="{{ request('search') }}">
                        </div>
                    </div>
                    <div class="col-md-3">
                        <select name="category_id" class="form-select">
                            <option value="">-- كل الأقسام --</option>
                            @foreach($categories as $category)
                                <option value="{{ $category->id }}" {{ request('category_id') == $category->id ? 'selected' : '' }}>
                                    {{ $category->name }}
                                </option>
                            @endforeach
                        </select>
                    </div>
                    <div class="col-md-3">
                        <select name="type" class="form-select">
                            <option value="">-- كل أنواع الشحن --</option>
                            @foreach(\App\Enums\ProductType::cases() as $type)
                                <option value="{{ $type->value }}" {{ request('type') === $type->value ? 'selected' : '' }}>
                                    {{ $type->label() }}
                                </option>
                            @endforeach
                        </select>
                    </div>
                    <div class="col-md-2 d-flex gap-2">
                        <button type="submit" class="btn btn-warning flex-fill"><i class="ti ti-filter me-1"></i> تصفية</button>
                        @if(request()->hasAny(['search', 'category_id', 'type']))
                            <a href="{{ route('admin.products.index') }}" class="btn btn-outline-secondary"><i class="ti ti-x"></i></a>
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

            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead class="table-dark">
                            <tr>
                                <th class="ps-3">#</th>
                                <th>الصورة</th>
                                <th>اسم المنتج</th>
                                <th>القسم</th>
                                <th>نوع الشحن</th>
                                <th>عدد الباقات</th>
                                <th>الطلبات</th>
                                <th>مصدر الكتالوج</th>
                                <th>الحالة</th>
                                <th class="text-end pe-3">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse($products as $product)
                                <tr>
                                    <td class="ps-3 text-muted fw-bold">{{ $product->id }}</td>
                                    <td>
                                        @if($product->image)
                                            <img src="{{ Storage::url($product->image) }}" alt="{{ $product->name }}" class="rounded shadow-sm" style="width: 44px; height: 44px; object-fit: cover;">
                                        @else
                                            <div class="rounded bg-dark border border-secondary d-flex align-items-center justify-content-center text-warning" style="width: 44px; height: 44px;">
                                                <i class="ti ti-device-gamepad fs-5"></i>
                                            </div>
                                        @endif
                                    </td>
                                    <td>
                                        <div class="fw-bold text-white">{{ $product->name }}</div>
                                        <small class="text-muted font-monospace">{{ $product->slug }}</small>
                                    </td>
                                    <td>
                                        <span class="badge bg-secondary">{{ $product->category->name ?? '-' }}</span>
                                    </td>
                                    <td>
                                        <span class="badge bg-primary-subtle text-primary border border-primary-subtle">
                                            {{ $product->type->label() }}
                                        </span>
                                    </td>
                                    <td>
                                        <span class="badge bg-dark border border-secondary text-warning fw-bold">{{ $product->tiers_count }} فئة / باقة</span>
                                    </td>
                                    <td>
                                        <span class="badge bg-dark border border-secondary">{{ $product->orders_count }} طلب</span>
                                    </td>
                                    <td>
                                        @if($product->catalogSource)
                                            <span class="badge bg-info-subtle text-info border border-info-subtle">{{ $product->catalogSource->name }}</span>
                                        @else
                                            <span class="badge bg-secondary-subtle text-muted">يدوي</span>
                                        @endif
                                    </td>
                                    <td>
                                        @if($product->is_active)
                                            <span class="badge bg-success-subtle text-success border border-success-subtle">نشط</span>
                                        @else
                                            <span class="badge bg-danger-subtle text-danger border border-danger-subtle">معطل</span>
                                        @endif
                                    </td>
                                    <td class="text-end pe-3">
                                        <a href="{{ route('admin.products.provider-mapping', $product->id) }}" class="btn btn-sm btn-outline-warning" title="ربط المزودين والأولويات">
                                            <i class="ti ti-server"></i> المزودين
                                        </a>
                                        <form action="{{ route('admin.products.toggle-active', $product->id) }}" method="POST" class="d-inline">
                                            @csrf
                                            <button type="submit" class="btn btn-sm {{ $product->is_active ? 'btn-outline-danger' : 'btn-outline-success' }}" title="تبديل الحالة">
                                                <i class="ti {{ $product->is_active ? 'ti-eye-off' : 'ti-eye' }}"></i>
                                            </button>
                                        </form>
                                        <a href="{{ route('admin.products.edit', $product->id) }}" class="btn btn-sm btn-outline-info" title="تعديل المنتج والباقات">
                                            <i class="ti ti-edit"></i>
                                        </a>
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="10" class="text-center py-5 text-muted">
                                        <i class="ti ti-device-gamepad-off fs-1 d-block mb-2 text-warning"></i>
                                        لا توجد منتجات مسجلة تطابق خيارات البحث.
                                    </td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>

            @if($products->hasPages())
                <div class="card-footer bg-transparent border-0 d-flex justify-content-center">
                    {{ $products->links() }}
                </div>
            @endif
        </div>
    </div>
</div>
@endsection
