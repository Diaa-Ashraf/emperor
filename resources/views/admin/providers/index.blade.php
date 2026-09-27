@extends('layouts.admin')

@section('title', 'مزودي الخدمة والـ APIs')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="card mb-4 border-0 shadow-sm">
            <div class="card-header bg-transparent border-0 d-flex justify-content-between align-items-center py-3">
                <div>
                    <h5 class="card-title fw-bold mb-0 text-white"><i class="ti ti-server text-warning me-2"></i> مزودي الخدمة وتوجيه الطلبات</h5>
                    <small class="text-muted">إدارة الربط مع مزودي الشحن، التحقق من الرصيد وترتيب الأولويات (Cascade Routing)</small>
                </div>
                <div>
                    <a href="{{ route('admin.providers.create') }}" class="btn btn-primary">
                        <i class="ti ti-plus me-1"></i> إضافة مزود جديد
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
                                <th class="ps-3">الأولوية</th>
                                <th>اسم المزود</th>
                                <th>المشغل (Driver)</th>
                                <th>الرصيد المتاح</th>
                                <th>المنتجات المرتبطة</th>
                                <th>إجمالي الطلبات</th>
                                <th>التنفيذ التلقائي</th>
                                <th>الحالة</th>
                                <th class="text-end pe-3">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse($providers as $provider)
                                <tr>
                                    <td class="ps-3">
                                        <span class="badge bg-warning text-dark fw-bold">#{{ $provider->priority }}</span>
                                    </td>
                                    <td>
                                        <div class="fw-bold text-white">{{ $provider->name }}</div>
                                        @if($provider->base_url)
                                            <small class="text-muted font-monospace">{{ $provider->base_url }}</small>
                                        @endif
                                    </td>
                                    <td><span class="badge bg-secondary font-monospace">{{ $provider->driver }}</span></td>
                                    <td>
                                        <div class="fw-bold text-warning font-monospace">
                                            {{ number_format((float) $provider->balance, 2) }} {{ $provider->balance_currency }}
                                        </div>
                                    </td>
                                    <td>
                                        <span class="badge bg-dark border border-secondary">{{ $provider->product_providers_count }} ربط</span>
                                    </td>
                                    <td>
                                        <span class="badge bg-dark border border-secondary">{{ $provider->orders_count }} طلب</span>
                                    </td>
                                    <td>
                                        @if($provider->auto_fulfill)
                                            <span class="badge bg-info-subtle text-info border border-info-subtle">تلقائي فوري</span>
                                        @else
                                            <span class="badge bg-secondary">يدوي</span>
                                        @endif
                                    </td>
                                    <td>
                                        @if($provider->is_active)
                                            <span class="badge bg-success-subtle text-success border border-success-subtle">نشط</span>
                                        @else
                                            <span class="badge bg-danger-subtle text-danger border border-danger-subtle">معطل</span>
                                        @endif
                                    </td>
                                    <td class="text-end pe-3">
                                        <form action="{{ route('admin.providers.toggle-active', $provider->id) }}" method="POST" class="d-inline">
                                            @csrf
                                            <button type="submit" class="btn btn-sm {{ $provider->is_active ? 'btn-outline-danger' : 'btn-outline-success' }}" title="تبديل الحالة">
                                                <i class="ti {{ $provider->is_active ? 'ti-ban' : 'ti-check' }}"></i>
                                            </button>
                                        </form>
                                        <a href="{{ route('admin.providers.edit', $provider->id) }}" class="btn btn-sm btn-outline-info">
                                            <i class="ti ti-edit"></i> تعديل
                                        </a>
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="9" class="text-center py-5 text-muted">
                                        <i class="ti ti-server-off fs-1 d-block mb-2 text-warning"></i>
                                        لا يوجد مزودين مضافين حتى الآن.
                                    </td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>

            @if($providers->hasPages())
                <div class="card-footer bg-transparent border-0 d-flex justify-content-center">
                    {{ $providers->links() }}
                </div>
            @endif
        </div>
    </div>
</div>
@endsection
