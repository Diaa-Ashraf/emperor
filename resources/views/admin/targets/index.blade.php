@extends('layouts.admin')

@section('title', 'طلبات بيع واستلام التارجت')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="card mb-4 border-0 shadow-sm">
            <div class="card-header bg-transparent border-0 d-flex flex-wrap justify-content-between align-items-center gap-3 py-3">
                <div>
                    <h5 class="card-title fw-bold mb-0 text-white"><i class="ti ti-target-arrow text-warning me-2"></i> طلبات بيع التارجت واستلام الأرباح</h5>
                    <small class="text-muted">مراجعة تحويلات التارجت من المستخدمين على برامج المحادثة واعتماد دفع المستحقات</small>
                </div>
                <div class="d-flex gap-2">
                    <a href="{{ route('admin.targets.apps') }}" class="btn btn-outline-warning">
                        <i class="ti ti-settings me-1"></i> إعدادات أسعار التارجت
                    </a>
                </div>
            </div>

            <!-- Stats Bar -->
            <div class="card-body border-top border-bottom border-dark py-3">
                <div class="row g-3 text-center">
                    <div class="col-md-3">
                        <div class="p-2 bg-dark rounded border border-secondary">
                            <span class="text-muted small d-block">إجمالي الطلبات</span>
                            <span class="fw-bold text-white fs-5 font-monospace">{{ $counts['all'] }}</span>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="p-2 bg-dark rounded border border-secondary">
                            <span class="text-muted small d-block">قيد الانتظار</span>
                            <span class="fw-bold text-warning fs-5 font-monospace">{{ $counts['pending'] }}</span>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="p-2 bg-dark rounded border border-secondary">
                            <span class="text-muted small d-block">تم الدفع للمحفظة</span>
                            <span class="fw-bold text-success fs-5 font-monospace">{{ $counts['paid'] }}</span>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="p-2 bg-dark rounded border border-secondary">
                            <span class="text-muted small d-block">مرفوضة</span>
                            <span class="fw-bold text-danger fs-5 font-monospace">{{ $counts['rejected'] }}</span>
                        </div>
                    </div>
                </div>

                <!-- Filters -->
                <form action="{{ route('admin.targets.index') }}" method="GET" class="row g-3 align-items-center mt-2">
                    <div class="col-md-4">
                        <div class="input-group">
                            <span class="input-group-text bg-dark border-secondary text-muted"><i class="ti ti-search"></i></span>
                            <input type="text" name="search" class="form-control" placeholder="رقم الطلب / ID الحساب / العميل..." value="{{ request('search') }}">
                        </div>
                    </div>
                    <div class="col-md-3">
                        <select name="status" class="form-select">
                            <option value="">-- كل الحالات --</option>
                            @foreach(\App\Enums\TargetOrderStatus::cases() as $st)
                                <option value="{{ $st->value }}" {{ request('status') === $st->value ? 'selected' : '' }}>
                                    {{ $st->label() }}
                                </option>
                            @endforeach
                        </select>
                    </div>
                    <div class="col-md-3">
                        <select name="product_id" class="form-select">
                            <option value="">-- كل التطبيقات --</option>
                            @foreach($targetProducts as $app)
                                <option value="{{ $app->id }}" {{ request('product_id') == $app->id ? 'selected' : '' }}>
                                    {{ $app->name }}
                                </option>
                            @endforeach
                        </select>
                    </div>
                    <div class="col-md-2 d-flex gap-2">
                        <button type="submit" class="btn btn-warning flex-fill"><i class="ti ti-filter me-1"></i> تصفية</button>
                        @if(request()->hasAny(['search', 'status', 'product_id']))
                            <a href="{{ route('admin.targets.index') }}" class="btn btn-outline-secondary"><i class="ti ti-x"></i></a>
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
                                <th class="ps-3">رقم الطلب</th>
                                <th>العميل</th>
                                <th>التطبيق</th>
                                <th>معرف الحساب (App ID)</th>
                                <th>كمية التارجت</th>
                                <th>سعر التحويل</th>
                                <th>صافي المستحق</th>
                                <th>الحالة</th>
                                <th>التاريخ</th>
                                <th class="text-end pe-3">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse($orders as $order)
                                <tr>
                                    <td class="ps-3">
                                        <a href="{{ route('admin.targets.show', $order->id) }}" class="fw-bold font-monospace text-warning text-decoration-none">
                                            {{ $order->public_id }}
                                        </a>
                                    </td>
                                    <td>
                                        <div class="fw-bold text-white">{{ $order->user->name ?? 'مستخدم محذوف' }}</div>
                                        <small class="text-muted font-monospace">{{ $order->user->phone ?? $order->user->email ?? '' }}</small>
                                    </td>
                                    <td>
                                        <span class="badge bg-secondary">{{ $order->product->name ?? '-' }}</span>
                                    </td>
                                    <td>
                                        <span class="badge bg-dark border border-secondary font-monospace text-info fs-6">
                                            {{ $order->app_user_id }}
                                        </span>
                                        @if($order->app_username)
                                            <small class="text-muted d-block">{{ $order->app_username }}</small>
                                        @endif
                                    </td>
                                    <td>
                                        <div class="fw-bold text-warning font-monospace fs-6">
                                            {{ number_format($order->target_points) }} نقطة
                                        </div>
                                    </td>
                                    <td>
                                        <span class="font-monospace text-muted small">{{ $order->rate_per_point }} EGP</span>
                                    </td>
                                    <td>
                                        <div class="fw-bold text-success font-monospace fs-6">
                                            {{ number_format((float) $order->net_payout, 2) }} {{ $order->currency }}
                                        </div>
                                    </td>
                                    <td>
                                        @php
                                            $statusBadges = [
                                                'paid' => 'bg-success',
                                                'pending' => 'bg-warning text-dark',
                                                'in_review' => 'bg-info text-dark',
                                                'verified' => 'bg-primary',
                                                'rejected' => 'bg-danger',
                                                'cancelled' => 'bg-secondary',
                                            ];
                                        @endphp
                                        <span class="badge {{ $statusBadges[$order->status->value] ?? 'bg-secondary' }}">
                                            {{ $order->status->label() }}
                                        </span>
                                    </td>
                                    <td class="text-muted small">
                                        {{ $order->created_at->format('Y-m-d H:i') }}
                                    </td>
                                    <td class="text-end pe-3">
                                        <a href="{{ route('admin.targets.show', $order->id) }}" class="btn btn-sm btn-outline-info">
                                            <i class="ti ti-eye"></i> تفاصيل
                                        </a>
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="10" class="text-center py-5 text-muted">
                                        <i class="ti ti-target-off fs-1 d-block mb-2 text-warning"></i>
                                        لا توجد طلبات بيع تارجت مسجلة تطابق البحث.
                                    </td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>

            @if($orders->hasPages())
                <div class="card-footer bg-transparent border-0 d-flex justify-content-center">
                    {{ $orders->links() }}
                </div>
            @endif
        </div>
    </div>
</div>
@endsection
