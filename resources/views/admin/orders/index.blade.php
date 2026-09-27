@extends('layouts.admin')

@section('title', 'إدارة طلبات الشحن')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="card mb-4 border-0 shadow-sm">
            <div class="card-header bg-transparent border-0 d-flex flex-wrap justify-content-between align-items-center gap-3 py-3">
                <div>
                    <h5 class="card-title fw-bold mb-0 text-white"><i class="ti ti-shopping-cart text-warning me-2"></i> سجل طلبات الشحن والعمليات</h5>
                    <small class="text-muted">متابعة كافة طلبات شحن الألعاب والبطاقات، حالة التنفيذ، وإعادة المحاولة</small>
                </div>
            </div>

            <!-- Filters -->
            <div class="card-body border-top border-bottom border-dark py-3">
                <form action="{{ route('admin.orders.index') }}" method="GET" class="row g-3 align-items-center">
                    <div class="col-md-3">
                        <div class="input-group">
                            <span class="input-group-text bg-dark border-secondary text-muted"><i class="ti ti-search"></i></span>
                            <input type="text" name="search" class="form-control" placeholder="رقم الطلب / ID اللاعب / العميل..." value="{{ request('search') }}">
                        </div>
                    </div>
                    <div class="col-md-2">
                        <select name="status" class="form-select">
                            <option value="">-- كل الحالات --</option>
                            @foreach(\App\Enums\OrderStatus::cases() as $st)
                                <option value="{{ $st->value }}" {{ request('status') === $st->value ? 'selected' : '' }}>
                                    {{ $st->label() }}
                                </option>
                            @endforeach
                        </select>
                    </div>
                    <div class="col-md-3">
                        <select name="product_id" class="form-select">
                            <option value="">-- كل المنتجات --</option>
                            @foreach($products as $prod)
                                <option value="{{ $prod->id }}" {{ request('product_id') == $prod->id ? 'selected' : '' }}>
                                    {{ $prod->name }}
                                </option>
                            @endforeach
                        </select>
                    </div>
                    <div class="col-md-2">
                        <input type="date" name="date_from" class="form-control" value="{{ request('date_from') }}" title="من تاريخ">
                    </div>
                    <div class="col-md-2 d-flex gap-2">
                        <button type="submit" class="btn btn-warning flex-fill"><i class="ti ti-filter me-1"></i> تصفية</button>
                        @if(request()->hasAny(['search', 'status', 'product_id', 'date_from']))
                            <a href="{{ route('admin.orders.index') }}" class="btn btn-outline-secondary"><i class="ti ti-x"></i></a>
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
                                <th>المنتج والباقة</th>
                                <th>معرف اللاعب (Player ID)</th>
                                <th>المبلغ الإجمالي</th>
                                <th>صافي الربح</th>
                                <th>المزود المنفذ</th>
                                <th>الحالة</th>
                                <th>التاريخ</th>
                                <th class="text-end pe-3">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse($orders as $order)
                                <tr>
                                    <td class="ps-3">
                                        <a href="{{ route('admin.orders.show', $order->id) }}" class="fw-bold font-monospace text-warning text-decoration-none">
                                            {{ $order->public_id }}
                                        </a>
                                    </td>
                                    <td>
                                        <div class="fw-bold text-white">{{ $order->user->name ?? 'مستخدم محذوف' }}</div>
                                        <small class="text-muted font-monospace">{{ $order->user->phone ?? $order->user->email ?? '' }}</small>
                                    </td>
                                    <td>
                                        <div class="fw-semibold text-white">{{ $order->product->name ?? '-' }}</div>
                                        <small class="text-warning">{{ $order->tier->name ?? '-' }} (x{{ $order->quantity }})</small>
                                    </td>
                                    <td>
                                        <span class="badge bg-dark border border-secondary font-monospace text-info fs-6">
                                            {{ $order->player_id ?? '-' }}
                                        </span>
                                    </td>
                                    <td>
                                        <div class="fw-bold text-white font-monospace">
                                            {{ number_format((float) $order->total_amount, 2) }} {{ $order->currency }}
                                        </div>
                                    </td>
                                    <td>
                                        <span class="badge bg-success-subtle text-success border border-success-subtle font-monospace">
                                            +{{ number_format((float) $order->profit_amount, 2) }} $
                                        </span>
                                    </td>
                                    <td>
                                        @if($order->provider)
                                            <span class="badge bg-secondary font-monospace">{{ $order->provider->name }}</span>
                                        @else
                                            <span class="badge bg-dark text-muted">لم يحدد</span>
                                        @endif
                                    </td>
                                    <td>
                                        @php
                                            $statusBadges = [
                                                'completed' => 'bg-success',
                                                'processing' => 'bg-info text-dark',
                                                'pending' => 'bg-warning text-dark',
                                                'failed' => 'bg-danger',
                                                'refunded' => 'bg-secondary',
                                                'cancelled' => 'bg-dark border border-secondary',
                                            ];
                                            $badgeClass = $statusBadges[$order->status->value] ?? 'bg-secondary';
                                        @endphp
                                        <span class="badge {{ $badgeClass }}">
                                            {{ $order->status->label() }}
                                        </span>
                                    </td>
                                    <td class="text-muted small">
                                        {{ $order->created_at->format('Y-m-d H:i') }}
                                    </td>
                                    <td class="text-end pe-3">
                                        <a href="{{ route('admin.orders.show', $order->id) }}" class="btn btn-sm btn-outline-info">
                                            <i class="ti ti-eye"></i> تفاصيل
                                        </a>
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="10" class="text-center py-5 text-muted">
                                        <i class="ti ti-shopping-cart-off fs-1 d-block mb-2 text-warning"></i>
                                        لا توجد طلبات مسجلة تطابق خيارات التصفية.
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
