@extends('layouts.admin')

@section('title', 'البانرات والإعلانات الترويجية')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="card mb-4 border-0 shadow-sm">
            <div class="card-header bg-transparent border-0 d-flex flex-wrap justify-content-between align-items-center gap-3 py-3">
                <div>
                    <h5 class="card-title fw-bold mb-0 text-white"><i class="ti ti-photo text-warning me-2"></i> إدارة البانرات وسلايدر العروض</h5>
                    <small class="text-muted">إدارة العروض الترويجية في الصفحة الرئيسية وتطبيقات الموبايل</small>
                </div>
                <div>
                    <a href="{{ route('admin.banners.create') }}" class="btn btn-primary">
                        <i class="ti ti-plus me-1"></i> إضافة إعلان جديد
                    </a>
                </div>
            </div>

            @if(session('success'))
                <div class="mx-3 alert alert-success alert-dismissible fade show" role="alert">
                    {{ session('success') }}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            @endif

            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead class="table-dark">
                            <tr>
                                <th class="ps-3">الترتيب</th>
                                <th>معاينة الصورة</th>
                                <th>العنوان الرئيسي</th>
                                <th>النوع</th>
                                <th>الرابط التوجيهي</th>
                                <th>فترة العرض</th>
                                <th>الحالة</th>
                                <th class="text-end pe-3">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse($banners as $banner)
                                <tr>
                                    <td class="ps-3">
                                        <span class="badge bg-secondary font-monospace">#{{ $banner->sort_order }}</span>
                                    </td>
                                    <td>
                                        @if($banner->image)
                                            <img src="{{ Storage::url($banner->image) }}" alt="{{ $banner->title }}" class="rounded shadow-sm" style="height: 48px; max-width: 120px; object-fit: cover;">
                                        @else
                                            <div class="rounded bg-dark border border-secondary text-center py-2 px-3 text-muted">لا توجد صورة</div>
                                        @endif
                                    </td>
                                    <td>
                                        <div class="fw-bold text-white">{{ $banner->title }}</div>
                                        @if($banner->subtitle)
                                            <small class="text-muted">{{ $banner->subtitle }}</small>
                                        @endif
                                    </td>
                                    <td>
                                        @php
                                            $typeBadges = [
                                                'slider' => 'bg-info-subtle text-info border border-info-subtle',
                                                'banner' => 'bg-warning-subtle text-warning border border-warning-subtle',
                                                'popup' => 'bg-danger-subtle text-danger border border-danger-subtle',
                                                'deal' => 'bg-danger text-white border border-danger shadow-sm',
                                            ];
                                        @endphp
                                        <span class="badge {{ $typeBadges[$banner->type] ?? 'bg-secondary' }}">
                                            {{ ucfirst($banner->type) }}
                                        </span>
                                    </td>
                                    <td>
                                        @if($banner->link)
                                            <a href="{{ $banner->link }}" target="_blank" class="text-info text-truncate d-inline-block font-monospace small" style="max-width: 160px;">{{ $banner->link }}</a>
                                        @else
                                            <span class="text-muted small">-</span>
                                        @endif
                                    </td>
                                    <td class="text-muted small">
                                        @if($banner->starts_at || $banner->ends_at)
                                            {{ $banner->starts_at ? $banner->starts_at->format('Y-m-d') : 'دائم' }} ~ {{ $banner->ends_at ? $banner->ends_at->format('Y-m-d') : 'دائم' }}
                                        @else
                                            <span class="badge bg-dark border border-secondary text-muted">دائم</span>
                                        @endif
                                    </td>
                                    <td>
                                        @if($banner->is_active)
                                            <span class="badge bg-success-subtle text-success border border-success-subtle">نشط</span>
                                        @else
                                            <span class="badge bg-danger-subtle text-danger border border-danger-subtle">معطل</span>
                                        @endif
                                    </td>
                                    <td class="text-end pe-3">
                                        <form action="{{ route('admin.banners.toggle-active', $banner->id) }}" method="POST" class="d-inline">
                                            @csrf
                                            <button type="submit" class="btn btn-sm {{ $banner->is_active ? 'btn-outline-danger' : 'btn-outline-success' }}" title="تبديل الحالة">
                                                <i class="ti {{ $banner->is_active ? 'ti-eye-off' : 'ti-eye' }}"></i>
                                            </button>
                                        </form>
                                        <a href="{{ route('admin.banners.edit', $banner->id) }}" class="btn btn-sm btn-outline-info">
                                            <i class="ti ti-edit"></i>
                                        </a>
                                        <form action="{{ route('admin.banners.destroy', $banner->id) }}" method="POST" class="d-inline" onsubmit="return confirm('هل أنت متأكد من حذف هذا الإعلان؟');">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="btn btn-sm btn-outline-danger">
                                                <i class="ti ti-trash"></i>
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="8" class="text-center py-5 text-muted">
                                        <i class="ti ti-photo-off fs-1 d-block mb-2 text-warning"></i>
                                        لا توجد إعلانات أو بانرات مضافة حتى الآن.
                                    </td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>

            @if($banners->hasPages())
                <div class="card-footer bg-transparent border-0 d-flex justify-content-center">
                    {{ $banners->links() }}
                </div>
            @endif
        </div>
    </div>
</div>
@endsection
