@extends('layouts.admin')

@section('title', 'مصادر مزامنة الكتالوج')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="card mb-4 border-0 shadow-sm">
            <div class="card-header bg-transparent border-0 d-flex justify-content-between align-items-center py-3">
                <div>
                    <h5 class="card-title fw-bold mb-0 text-white"><i class="ti ti-refresh text-warning me-2"></i> مصادر الكتالوج والأسعار</h5>
                    <small class="text-muted">إدارة مصادر جلب المنتجات والأسعار تلقائياً وتحديث التكاليف</small>
                </div>
                <div>
                    <a href="{{ route('admin.catalog-sources.create') }}" class="btn btn-primary">
                        <i class="ti ti-plus me-1"></i> إضافة مصدر جديد
                    </a>
                </div>
            </div>

            @if(session('success'))
            <div class="mx-3 alert alert-success alert-dismissible fade show" role="alert">
                {{ session('success') }}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            @endif

            @if(session('error'))
            <div class="mx-3 alert alert-danger alert-dismissible fade show" role="alert">
                {{ session('error') }}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            @endif

            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead class="table-dark">
                            <tr>
                                <th class="ps-3">#</th>
                                <th>اسم المصدر</th>
                                <th>المشغل (Driver)</th>
                                <th>الرابط الأساسي</th>
                                <th>عدد المنتجات</th>
                                <th>حالة المزامنة</th>
                                <th>آخر مزامنة</th>
                                <th>الحالة</th>
                                <th class="text-end pe-3">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse($sources as $source)
                            <tr>
                                <td class="ps-3 fw-bold text-muted">{{ $source->id }}</td>
                                <td>
                                    <div class="fw-bold text-white">{{ $source->name }}</div>
                                </td>
                                <td><span class="badge bg-secondary font-monospace">{{ $source->driver }}</span></td>
                                <td class="text-truncate font-monospace text-muted" style="max-width: 200px;">
                                    <a href="{{ $source->base_url }}" target="_blank" class="text-info text-decoration-none">{{ $source->base_url }}</a>
                                </td>
                                <td>
                                    <span class="badge bg-dark border border-secondary text-warning">{{ $source->products_count }} منتج</span>
                                </td>
                                <td>
                                    @if($source->sync_status === 'success')
                                    <span class="badge bg-success"><i class="ti ti-check me-1"></i> مكتملة</span>
                                    @elseif($source->sync_status === 'syncing')
                                    <span class="badge bg-warning text-dark"><i class="ti ti-loader animate-spin me-1"></i> جاري المزامنة</span>
                                    @elseif($source->sync_status === 'failed')
                                    <span class="badge bg-danger"><i class="ti ti-alert-triangle me-1"></i> فشلت</span>
                                    @else
                                    <span class="badge bg-secondary">معلقة</span>
                                    @endif
                                </td>
                                <td class="text-muted small">
                                    {{ $source->last_synced_at ? $source->last_synced_at->diffForHumans() : 'لم تتم بعد' }}
                                </td>
                                <td>
                                    @if($source->is_active)
                                    <span class="badge bg-success-subtle text-success border border-success-subtle">نشط</span>
                                    @else
                                    <span class="badge bg-danger-subtle text-danger border border-danger-subtle">معطل</span>
                                    @endif
                                </td>
                                <td class="text-end pe-3">
                                    <form action="{{ route('admin.catalog-sources.sync', $source->id) }}" method="POST" class="d-inline">
                                        @csrf
                                        <button type="submit" class="btn btn-sm btn-outline-warning" title="بدء المزامنة الفورية">
                                            <i class="ti ti-refresh"></i> مزامنة
                                        </button>
                                    </form>
                                    <a href="{{ route('admin.catalog-sources.edit', $source->id) }}" class="btn btn-sm btn-outline-info">
                                        <i class="ti ti-edit"></i> تعديل
                                    </a>
                                </td>
                            </tr>
                            @empty
                            <tr>
                                <td colspan="9" class="text-center py-5 text-muted">
                                    <i class="ti ti-refresh-off fs-1 d-block mb-2 text-warning"></i>
                                    لا توجد مصادر كتالوج مضافة حتى الآن.
                                </td>
                            </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>

            @if($sources->hasPages())
            <div class="card-footer bg-transparent border-0 d-flex justify-content-center">
                {{ $sources->links() }}
            </div>
            @endif
        </div>
    </div>
</div>
@endsection