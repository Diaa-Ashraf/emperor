@extends('layouts.admin')

@section('title', 'لوحة التحكم الرئيسية')

@section('header')
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
            <h3 class="fw-black text-white mb-1">
                مرحباً بك، <span class="gold-gradient-text">{{ auth()->user()->name }}</span> 👑
            </h3>
            <p class="text-muted mb-0 fs-6">نظرة عامة على نشاط المنصة، المبيعات والطلبات قيد التنفيذ.</p>
        </div>
        <div class="d-flex align-items-center gap-2">
            <button type="button" class="btn btn-dark-outline d-flex align-items-center gap-2" onclick="location.reload();">
                <i class="ti ti-refresh"></i>
                <span>تحديث البيانات</span>
            </button>
            <a href="{{ route('admin.orders.index') }}" class="btn btn-primary d-flex align-items-center gap-2">
                <i class="ti ti-shopping-cart-plus"></i>
                <span>عرض كل الطلبات</span>
            </a>
        </div>
    </div>
@endsection

@section('content')
    @if(isset($lowBalanceProviders) && $lowBalanceProviders->count() > 0)
        <div class="alert alert-warning border-warning bg-warning bg-opacity-10 d-flex flex-column flex-md-row align-items-md-center justify-content-between p-3 mb-4 rounded-3 gap-3">
            <div class="d-flex align-items-center gap-3">
                <div class="fs-2 text-warning flex-shrink-0">
                    <i class="ti ti-alert-triangle-filled"></i>
                </div>
                <div>
                    <h6 class="fw-bold text-white mb-1">تنبيه: رصيد منخفض لدى بعض الموردين (API Providers)</h6>
                    <p class="text-warning-emphasis mb-0 fs-7">
                        @foreach($lowBalanceProviders as $lp)
                            <strong>{{ $lp->name }}</strong> (الرصيد المتبقي: <span class="font-monospace fw-bold">{{ number_format($lp->balance, 2) }} {{ $lp->balance_currency }}</span>)@if(!$loop->last) ، @endif
                        @endforeach
                        — يرجى شحن الرصيد لدى المورد لتفادي تعليق طلبات الشحن التلقائية.
                    </p>
                </div>
            </div>
            <a href="{{ route('admin.providers.index') }}" class="btn btn-warning btn-sm fw-bold text-dark px-3 text-nowrap align-self-start align-self-md-center">
                <i class="ti ti-wallet"></i> فحص وشحن المزودين
            </a>
        </div>
    @endif

    <!-- Top Statistics Grid -->
    <div class="row g-3 mb-4">
        <!-- Card 1: Today Sales -->
        <div class="col-12 col-sm-6 col-xl-3">
            <div class="card stat-card h-100 p-3">
                <div class="d-flex align-items-center justify-content-between mb-3">
                    <span class="text-muted fw-bold fs-7">مبيعات اليوم</span>
                    <div class="stat-icon bg-warning-subtle text-warning">
                        <i class="ti ti-currency-pound"></i>
                    </div>
                </div>
                <div class="d-flex align-items-baseline gap-2">
                    <h3 class="fw-black text-white mb-0">{{ number_format($summary['today_sales'] ?? 0, 2) }}</h3>
                    <span class="text-gold fw-bold fs-7">ج.م</span>
                </div>
                <div class="d-flex align-items-center gap-1 text-muted fs-7 mt-2">
                    <i class="ti ti-calendar text-gold"></i>
                    <span>إجمالي المبيعات المكتملة لليوم</span>
                </div>
            </div>
        </div>

        <!-- Card 2: Total Sales -->
        <div class="col-12 col-sm-6 col-xl-3">
            <div class="card stat-card h-100 p-3">
                <div class="d-flex align-items-center justify-content-between mb-3">
                    <span class="text-muted fw-bold fs-7">إجمالي المبيعات الكلية</span>
                    <div class="stat-icon bg-success-subtle text-success">
                        <i class="ti ti-chart-arrows"></i>
                    </div>
                </div>
                <div class="d-flex align-items-baseline gap-2">
                    <h3 class="fw-black text-white mb-0">{{ number_format($summary['total_sales'] ?? 0, 2) }}</h3>
                    <span class="text-gold fw-bold fs-7">ج.م</span>
                </div>
                <div class="d-flex align-items-center gap-1 text-muted fs-7 mt-2">
                    <i class="ti ti-sparkles text-success"></i>
                    <span>صافي الأرباح: {{ number_format($summary['total_profit'] ?? 0, 2) }} ج.م</span>
                </div>
            </div>
        </div>

        <!-- Card 3: Pending Orders -->
        <div class="col-12 col-sm-6 col-xl-3">
            <div class="card stat-card h-100 p-3">
                <div class="d-flex align-items-center justify-content-between mb-3">
                    <span class="text-muted fw-bold fs-7">طلبات شحن قيد المعالجة</span>
                    <div class="stat-icon bg-info-subtle text-info">
                        <i class="ti ti-clock-hour-4"></i>
                    </div>
                </div>
                <div class="d-flex align-items-baseline gap-2">
                    <h3 class="fw-black text-white mb-0">{{ $summary['pending_orders'] ?? 0 }}</h3>
                    <span class="text-muted fw-bold fs-7">طلب</span>
                </div>
                <div class="d-flex align-items-center gap-1 text-muted fs-7 mt-2">
                    <a href="{{ route('admin.orders.index') }}?status=pending" class="text-gold text-decoration-none fw-semibold">
                        متابعة الطلبات المعلقة &larr;
                    </a>
                </div>
            </div>
        </div>

        <!-- Card 4: Target & Users -->
        <div class="col-12 col-sm-6 col-xl-3">
            <div class="card stat-card h-100 p-3">
                <div class="d-flex align-items-center justify-content-between mb-3">
                    <span class="text-muted fw-bold fs-7">طلبات بيع التارجت المعلقة</span>
                    <div class="stat-icon bg-danger-subtle text-danger">
                        <i class="ti ti-target-arrow"></i>
                    </div>
                </div>
                <div class="d-flex align-items-baseline gap-2">
                    <h3 class="fw-black text-white mb-0">{{ $summary['pending_targets'] ?? 0 }}</h3>
                    <span class="badge bg-danger text-white ms-auto">يحتاج مراجعة</span>
                </div>
                <div class="d-flex align-items-center gap-1 text-muted fs-7 mt-2">
                    <a href="{{ route('admin.targets.index') }}" class="text-gold text-decoration-none fw-semibold">
                        مراجعة إيصالات التارجت &larr;
                    </a>
                </div>
            </div>
        </div>
    </div>

    <!-- Quick Management Action Shortcuts -->
    <div class="card p-3 mb-4">
        <div class="d-flex align-items-center justify-content-between mb-3">
            <h6 class="fw-bold text-white mb-0 d-flex align-items-center gap-2">
                <i class="ti ti-bolt text-gold"></i>
                <span>إجراءات سريعة واختصارات</span>
            </h6>
        </div>
        <div class="row g-2">
            <div class="col-6 col-md-3">
                <a href="{{ route('admin.catalog-sources.index') }}" class="btn btn-dark-outline w-100 py-3 d-flex flex-column align-items-center gap-2 text-center">
                    <i class="ti ti-refresh fs-3 text-gold"></i>
                    <span class="fw-semibold fs-7">مزامنة الكتالوج</span>
                </a>
            </div>
            <div class="col-6 col-md-3">
                <a href="{{ route('admin.products.index') }}" class="btn btn-dark-outline w-100 py-3 d-flex flex-column align-items-center gap-2 text-center">
                    <i class="ti ti-plus fs-3 text-gold"></i>
                    <span class="fw-semibold fs-7">إضافة باقة / منتج</span>
                </a>
            </div>
            <div class="col-6 col-md-3">
                <a href="{{ route('admin.deposits.index') }}" class="btn btn-dark-outline w-100 py-3 d-flex flex-column align-items-center gap-2 text-center">
                    <i class="ti ti-wallet fs-3 text-gold"></i>
                    <span class="fw-semibold fs-7">مراجعة الإيداعات</span>
                </a>
            </div>
            <div class="col-6 col-md-3">
                <a href="{{ route('admin.pricing.index') }}" class="btn btn-dark-outline w-100 py-3 d-flex flex-column align-items-center gap-2 text-center">
                    <i class="ti ti-percentage fs-3 text-gold"></i>
                    <span class="fw-semibold fs-7">تعديل هوامش الربح</span>
                </a>
            </div>
        </div>
    </div>

    <!-- Tables Row: Recent Orders & Recent Target Requests -->
    <div class="row g-4">
        <!-- Recent Orders -->
        <div class="col-12 col-xl-7">
            <div class="card h-100">
                <div class="card-header bg-transparent border-bottom border-dark d-flex align-items-center justify-content-between p-3">
                    <h6 class="fw-bold text-white mb-0 d-flex align-items-center gap-2">
                        <i class="ti ti-shopping-cart text-gold"></i>
                        <span>أحدث طلبات الشحن</span>
                    </h6>
                    <a href="{{ route('admin.orders.index') }}" class="btn btn-sm btn-dark-outline">عرض الكل</a>
                </div>
                <div class="table-responsive dashboard-table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead>
                            <tr>
                                <th>رقم الطلب</th>
                                <th>المستخدم</th>
                                <th>المنتج / الباقة</th>
                                <th>المبلغ</th>
                                <th>الحالة</th>
                                <th>الوقت</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse($recentOrders ?? [] as $order)
                                <tr>
                                    <td><span class="font-monospace text-gold fw-bold fs-7">{{ $order->public_id }}</span></td>
                                    <td>{{ $order->user?->name ?? 'زائر' }}</td>
                                    <td>
                                        <div class="fw-semibold text-white">{{ $order->product?->name }}</div>
                                        <div class="text-muted fs-7">{{ $order->tier?->name }}</div>
                                    </td>
                                    <td class="fw-bold text-white">{{ number_format($order->total_amount, 2) }} {{ $order->currency }}</td>
                                    <td>
                                        <span class="badge bg-{{ $order->status->color() }}-subtle text-{{ $order->status->color() }} border border-{{ $order->status->color() }}">
                                            {{ $order->status->label() }}
                                        </span>
                                    </td>
                                    <td class="text-muted fs-7">{{ $order->created_at->diffForHumans() }}</td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="6" class="text-center py-5 text-muted">
                                        <i class="ti ti-inbox fs-1 d-block mb-2 text-secondary"></i>
                                        <span>لا توجد طلبات شحن مسجلة بعد.</span>
                                    </td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Recent Target Sell Submissions -->
        <div class="col-12 col-xl-5">
            <div class="card h-100">
                <div class="card-header bg-transparent border-bottom border-dark d-flex align-items-center justify-content-between p-3">
                    <h6 class="fw-bold text-white mb-0 d-flex align-items-center gap-2">
                        <i class="ti ti-target-arrow text-gold"></i>
                        <span>أحدث طلبات بيع التارجت</span>
                    </h6>
                    <a href="{{ route('admin.targets.index') }}" class="btn btn-sm btn-dark-outline">عرض الكل</a>
                </div>
                <div class="table-responsive dashboard-table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead>
                            <tr>
                                <th>التطبيق / المستخدم</th>
                                <th>النقاط</th>
                                <th>المستحق</th>
                                <th>الحالة</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse($recentTargets ?? [] as $target)
                                <tr>
                                    <td>
                                        <div class="fw-semibold text-white">{{ $target->product?->name }}</div>
                                        <div class="text-muted fs-7 font-monospace">ID: {{ $target->app_user_id }}</div>
                                    </td>
                                    <td class="fw-bold text-warning">{{ number_format($target->target_points) }}</td>
                                    <td class="fw-bold text-success">{{ number_format($target->net_payout, 2) }} {{ $target->currency }}</td>
                                    <td>
                                        <span class="badge bg-{{ $target->status->color() }}-subtle text-{{ $target->status->color() }}">
                                            {{ $target->status->label() }}
                                        </span>
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="4" class="text-center py-5 text-muted">
                                        <i class="ti ti-target fs-1 d-block mb-2 text-secondary"></i>
                                        <span>لا توجد طلبات تارجت حالياً.</span>
                                    </td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
@endsection
