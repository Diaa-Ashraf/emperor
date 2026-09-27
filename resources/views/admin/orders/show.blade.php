@extends('layouts.admin')

@section('title', 'تفاصيل الطلب: ' . $order->public_id)

@section('content')
<div class="row">
    <!-- Main Order Details -->
    <div class="col-lg-8">
        <div class="card border-0 shadow-sm mb-4">
            <div class="card-header bg-transparent border-0 py-3 d-flex justify-content-between align-items-center">
                <div>
                    <h5 class="card-title fw-bold mb-0 text-white">
                        <i class="ti ti-shopping-cart text-warning me-2"></i> طلب رقم: <span class="font-monospace text-warning">{{ $order->public_id }}</span>
                    </h5>
                    <small class="text-muted">تم الإنشاء في: {{ $order->created_at->format('Y-m-d H:i:s') }} ({{ $order->created_at->diffForHumans() }})</small>
                </div>
                <div>
                    @php
                        $statusBadges = [
                            'completed' => 'bg-success',
                            'processing' => 'bg-info text-dark',
                            'pending' => 'bg-warning text-dark',
                            'failed' => 'bg-danger',
                            'refunded' => 'bg-secondary',
                            'cancelled' => 'bg-dark border border-secondary',
                        ];
                    @endphp
                    <span class="badge {{ $statusBadges[$order->status->value] ?? 'bg-secondary' }} fs-6 px-3 py-2">
                        {{ $order->status->label() }}
                    </span>
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

            <div class="card-body">
                <!-- Product & Shipping Info -->
                <div class="row g-3 mb-4">
                    <div class="col-md-6">
                        <div class="p-3 bg-dark rounded border border-secondary">
                            <span class="text-muted d-block small">المنتج والقسم:</span>
                            <div class="fw-bold text-white fs-5 mt-1">{{ $order->product->name ?? 'منتج محذوف' }}</div>
                            <span class="badge bg-secondary mt-1">{{ $order->product->category->name ?? '-' }}</span>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="p-3 bg-dark rounded border border-secondary">
                            <span class="text-muted d-block small">الباقة المطلوبة والكمية:</span>
                            <div class="fw-bold text-warning fs-5 mt-1">{{ $order->tier->name ?? 'فئة محذوفة' }}</div>
                            <span class="badge bg-dark border border-secondary text-white mt-1">الكمية: {{ $order->quantity }}</span>
                        </div>
                    </div>
                </div>

                <!-- Player ID and Fields -->
                <div class="p-3 bg-dark rounded border border-secondary mb-4">
                    <h6 class="fw-bold text-warning mb-3"><i class="ti ti-id me-1"></i> بيانات الشحن والحساب</h6>
                    <div class="row g-3">
                        <div class="col-md-4">
                            <span class="text-muted small d-block">{{ $order->product->player_id_label ?? 'Player ID' }}:</span>
                            <span class="fs-5 fw-bold font-monospace text-info">{{ $order->player_id ?? '-' }}</span>
                        </div>
                        @if($order->server_id)
                            <div class="col-md-4">
                                <span class="text-muted small d-block">Zone / Server ID:</span>
                                <span class="fs-5 fw-bold font-monospace text-white">{{ $order->server_id }}</span>
                            </div>
                        @endif
                        @if($order->account_region)
                            <div class="col-md-4">
                                <span class="text-muted small d-block">منطقة الحساب (Region):</span>
                                <span class="fs-5 fw-bold text-white">{{ $order->account_region }}</span>
                            </div>
                        @endif
                    </div>
                </div>

                <!-- Provider & Execution details -->
                <div class="p-3 bg-dark rounded border border-secondary mb-4">
                    <h6 class="fw-bold text-warning mb-3"><i class="ti ti-server me-1"></i> معلومات المزود والتنفيذ</h6>
                    <div class="row g-3">
                        <div class="col-md-4">
                            <span class="text-muted small d-block">المزود المنفذ:</span>
                            <span class="fw-bold text-white">{{ $order->provider->name ?? 'لم يحدد مزود بعد' }}</span>
                        </div>
                        <div class="col-md-4">
                            <span class="text-muted small d-block">رقم الطلب لدى المزود:</span>
                            <span class="font-monospace text-warning">{{ $order->provider_order_id ?? '-' }}</span>
                        </div>
                        <div class="col-md-4">
                            <span class="text-muted small d-block">عدد محاولات التنفيذ:</span>
                            <span class="badge bg-secondary font-monospace">{{ $order->retry_count }} محاولات</span>
                        </div>
                    </div>

                    @if($order->failure_reason)
                        <div class="alert alert-danger mt-3 mb-0">
                            <strong>سبب الفشل / الخطأ:</strong> {{ $order->failure_reason }}
                        </div>
                    @endif

                    @if($order->provider_response)
                        <div class="mt-3">
                            <span class="text-muted small d-block mb-1">استجابة الـ API من المزود (Raw Payload):</span>
                            <pre class="bg-black p-2 rounded text-success font-monospace small mb-0" style="max-height: 150px; overflow-y: auto;">{{ json_encode($order->provider_response, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) }}</pre>
                        </div>
                    @endif
                </div>

                <!-- Financial Ledger for this order -->
                <div class="p-3 bg-dark rounded border border-secondary">
                    <h6 class="fw-bold text-warning mb-3"><i class="ti ti-cash me-1"></i> الحسابات المالية للطلب</h6>
                    <div class="row text-center g-3">
                        <div class="col-md-3">
                            <span class="text-muted small d-block">سعر الوحدة</span>
                            <span class="fw-bold text-white fs-6 font-monospace">{{ number_format((float) $order->unit_price, 2) }} {{ $order->currency }}</span>
                        </div>
                        <div class="col-md-3">
                            <span class="text-muted small d-block">الإجمالي المدفوع</span>
                            <span class="fw-bold text-warning fs-5 font-monospace">{{ number_format((float) $order->total_amount, 2) }} {{ $order->currency }}</span>
                        </div>
                        <div class="col-md-3">
                            <span class="text-muted small d-block">سعر التكلفة الإجمالي</span>
                            <span class="fw-bold text-muted fs-6 font-monospace">${{ number_format((float) $order->cost_amount, 2) }}</span>
                        </div>
                        <div class="col-md-3">
                            <span class="text-muted small d-block">صافي ربح المنصة</span>
                            <span class="fw-bold text-success fs-5 font-monospace">+${{ number_format((float) $order->profit_amount, 2) }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Actions Toolbar -->
            <div class="card-footer bg-transparent border-0 d-flex flex-wrap justify-content-between gap-2 py-3">
                <a href="{{ route('admin.orders.index') }}" class="btn btn-outline-secondary">
                    <i class="ti ti-arrow-right me-1"></i> العودة للقائمة
                </a>
                <div class="d-flex gap-2">
                    @if(!in_array($order->status->value, ['completed', 'refunded']))
                        <form action="{{ route('admin.orders.retry', $order->id) }}" method="POST">
                            @csrf
                            <button type="submit" class="btn btn-warning">
                                <i class="ti ti-refresh me-1"></i> إعادة محاولة التنفيذ الآن
                            </button>
                        </form>
                    @endif

                    @if($order->status->value !== 'refunded')
                        <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#refundModal">
                            <i class="ti ti-arrow-back-up me-1"></i> استرداد يدوي للمحفظة
                        </button>
                    @endif
                </div>
            </div>
        </div>
    </div>

    <!-- Customer Sidebar -->
    <div class="col-lg-4">
        <div class="card border-0 shadow-sm mb-4">
            <div class="card-header bg-transparent border-0 py-3">
                <h5 class="card-title fw-bold mb-0 text-white"><i class="ti ti-user text-warning me-2"></i> بيانات العميل</h5>
            </div>
            <div class="card-body">
                @if($order->user)
                    <div class="d-flex align-items-center mb-3">
                        <div class="rounded-circle bg-warning text-dark d-flex align-items-center justify-content-center fw-bold fs-4 me-3" style="width: 50px; height: 50px;">
                            {{ mb_substr($order->user->name, 0, 1) }}
                        </div>
                        <div>
                            <div class="fw-bold text-white fs-6">{{ $order->user->name }}</div>
                            <span class="badge bg-primary-subtle text-primary border border-primary-subtle">{{ $order->user->role->label() }}</span>
                        </div>
                    </div>

                    <ul class="list-group list-group-flush bg-transparent">
                        <li class="list-group-item bg-transparent text-white px-0 d-flex justify-content-between">
                            <span class="text-muted">البريد الإلكتروني:</span>
                            <span class="font-monospace small">{{ $order->user->email }}</span>
                        </li>
                        <li class="list-group-item bg-transparent text-white px-0 d-flex justify-content-between">
                            <span class="text-muted">رقم الهاتف:</span>
                            <span class="font-monospace">{{ $order->user->phone ?? '-' }}</span>
                        </li>
                        <li class="list-group-item bg-transparent text-white px-0 d-flex justify-content-between">
                            <span class="text-muted">رصيد المحفظة الحالي:</span>
                            <span class="fw-bold text-warning font-monospace">{{ number_format((float) ($order->user->wallet->balance ?? 0), 2) }} {{ $order->user->currency }}</span>
                        </li>
                    </ul>

                    <div class="mt-3 text-center">
                        <a href="{{ route('admin.users.show', $order->user->id) }}" class="btn btn-sm btn-outline-info w-100">
                            <i class="ti ti-user-check me-1"></i> عرض ملف العميل الكامل
                        </a>
                    </div>
                @else
                    <div class="text-muted text-center py-3">المستخدم غير موجود أو تم حذفه.</div>
                @endif
            </div>
        </div>
    </div>
</div>

<!-- Refund Modal -->
<div class="modal fade" id="refundModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
        <form action="{{ route('admin.orders.refund', $order->id) }}" method="POST" class="modal-content bg-dark border-secondary text-white">
            @csrf
            <div class="modal-header border-secondary">
                <h5 class="modal-title text-warning"><i class="ti ti-arrow-back-up me-2"></i> تأكيد استرداد قيمة الطلب</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>هل أنت متأكد من رغبتك في إرجاع مبلغ <strong>{{ number_format((float) $order->total_amount, 2) }} {{ $order->currency }}</strong> إلى محفظة المستخدم <strong>{{ $order->user->name ?? '' }}</strong>؟</p>
                <div class="mb-3">
                    <label class="form-label text-white">سبب الاسترداد:</label>
                    <input type="text" name="reason" class="form-control" placeholder="مثال: تعذر التنفيذ من المزود / خطأ في رقم ID" required>
                </div>
            </div>
            <div class="modal-footer border-secondary">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">إلغاء</button>
                <button type="submit" class="btn btn-danger"><i class="ti ti-check me-1"></i> تأكيد الاسترداد</button>
            </div>
        </form>
    </div>
</div>
@endsection
