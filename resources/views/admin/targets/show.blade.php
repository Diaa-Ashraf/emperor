@extends('layouts.admin')

@section('title', 'تفاصيل طلب التارجت: ' . $order->public_id)

@section('content')
<div class="row">
    <!-- Main Target Order Details -->
    <div class="col-lg-8">
        <div class="card border-0 shadow-sm mb-4">
            <div class="card-header bg-transparent border-0 py-3 d-flex justify-content-between align-items-center">
                <div>
                    <h5 class="card-title fw-bold mb-0 text-white">
                        <i class="ti ti-target-arrow text-warning me-2"></i> طلب بيع تارجت: <span class="font-monospace text-warning">{{ $order->public_id }}</span>
                    </h5>
                    <small class="text-muted">تم التقديم في: {{ $order->created_at->format('Y-m-d H:i:s') }} ({{ $order->created_at->diffForHumans() }})</small>
                </div>
                <div>
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
                <!-- App & Account Info -->
                <div class="p-3 bg-dark rounded border border-secondary mb-4">
                    <h6 class="fw-bold text-warning mb-3"><i class="ti ti-device-mobile me-1"></i> تطبيق المحادثة وبيانات التحويل</h6>
                    <div class="row g-3">
                        <div class="col-md-4">
                            <span class="text-muted small d-block">التطبيق:</span>
                            <span class="fs-5 fw-bold text-white">{{ $order->product->name ?? '-' }}</span>
                        </div>
                        <div class="col-md-4">
                            <span class="text-muted small d-block">معرّف حساب المستخدم (App User ID):</span>
                            <span class="fs-5 fw-bold font-monospace text-info">{{ $order->app_user_id }}</span>
                        </div>
                        <div class="col-md-4">
                            <span class="text-muted small d-block">اسم الحساب داخل التطبيق:</span>
                            <span class="fs-6 fw-semibold text-white">{{ $order->app_username ?: '-' }}</span>
                        </div>
                    </div>
                </div>

                <!-- Target Points & Financials -->
                <div class="p-3 bg-dark rounded border border-secondary mb-4">
                    <h6 class="fw-bold text-warning mb-3"><i class="ti ti-cash me-1"></i> الحساب المالي للمستحقات</h6>
                    <div class="row text-center g-3">
                        <div class="col-md-3">
                            <span class="text-muted small d-block">كمية التارجت المحولة</span>
                            <span class="fw-bold text-warning fs-5 font-monospace">{{ number_format($order->target_points) }} نقطة</span>
                        </div>
                        <div class="col-md-3">
                            <span class="text-muted small d-block">سعر النقطة (Rate)</span>
                            <span class="fw-bold text-white fs-6 font-monospace">{{ $order->rate_per_point }} EGP</span>
                        </div>
                        <div class="col-md-3">
                            <span class="text-muted small d-block">رسوم التحويل والعمولة</span>
                            <span class="fw-bold text-muted fs-6 font-monospace">{{ number_format((float) $order->fee, 2) }} {{ $order->currency }}</span>
                        </div>
                        <div class="col-md-3">
                            <span class="text-muted small d-block">صافي المبلغ للدفع للمحفظة</span>
                            <span class="fw-bold text-success fs-4 font-monospace">{{ number_format((float) $order->net_payout, 2) }} {{ $order->currency }}</span>
                        </div>
                    </div>
                </div>

                <!-- Proof Image -->
                @if($order->proof_image)
                    <div class="p-3 bg-dark rounded border border-secondary mb-4">
                        <h6 class="fw-bold text-warning mb-3"><i class="ti ti-photo me-1"></i> سكرين شوت إثبات تحويل التارجت</h6>
                        <div class="text-center">
                            <a href="{{ Storage::url($order->proof_image) }}" target="_blank">
                                <img src="{{ Storage::url($order->proof_image) }}" alt="إثبات التارجت" class="img-fluid rounded border border-secondary shadow" style="max-height: 350px;">
                            </a>
                            <small class="text-muted d-block mt-2">انقر على الصورة لفتحها بالحجم الكامل</small>
                        </div>
                    </div>
                @endif

                <!-- Reviewer Notes / User Notes -->
                @if($order->user_notes)
                    <div class="p-3 bg-dark rounded border border-secondary mb-4">
                        <span class="text-muted small d-block mb-1">ملاحظات المستخدم:</span>
                        <p class="text-white mb-0">{{ $order->user_notes }}</p>
                    </div>
                @endif

                @if($order->reviewer_notes)
                    <div class="alert alert-info mb-0">
                        <strong>ملاحظات المراجعة:</strong> {{ $order->reviewer_notes }}
                        <div class="small text-muted mt-1">بواسطة: {{ $order->reviewer->name ?? 'الإدارة' }} في {{ $order->reviewed_at?->format('Y-m-d H:i') }}</div>
                    </div>
                @endif
            </div>

            <!-- Action Buttons -->
            <div class="card-footer bg-transparent border-0 d-flex flex-wrap justify-content-between gap-2 py-3">
                <a href="{{ route('admin.targets.index') }}" class="btn btn-outline-secondary">
                    <i class="ti ti-arrow-right me-1"></i> العودة للقائمة
                </a>
                
                @if($order->status->value !== 'paid')
                    <div class="d-flex gap-2">
                        <form action="{{ route('admin.targets.approve', $order->id) }}" method="POST" onsubmit="return confirm('تأكيد اعتماد التارجت وإيداع مبلغ {{ $order->net_payout }} {{ $order->currency }} في محفظة المستخدم؟');">
                            @csrf
                            <button type="submit" class="btn btn-success">
                                <i class="ti ti-check me-1"></i> اعتماد ودفع للمحفظة
                            </button>
                        </form>

                        @if($order->status->value !== 'rejected')
                            <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#rejectModal">
                                <i class="ti ti-x me-1"></i> رفض الطلب
                            </button>
                        @endif
                    </div>
                @endif
            </div>
        </div>
    </div>

    <!-- Customer Details Sidebar -->
    <div class="col-lg-4">
        <div class="card border-0 shadow-sm mb-4">
            <div class="card-header bg-transparent border-0 py-3">
                <h5 class="card-title fw-bold mb-0 text-white"><i class="ti ti-user text-warning me-2"></i> بيانات المستخدم</h5>
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

                    <div class="mt-3">
                        <a href="{{ route('admin.users.show', $order->user->id) }}" class="btn btn-sm btn-outline-info w-100">
                            <i class="ti ti-user-check me-1"></i> ملف المستخدم وسجل العمليات
                        </a>
                    </div>
                @endif
            </div>
        </div>
    </div>
</div>

<!-- Reject Modal -->
<div class="modal fade" id="rejectModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
        <form action="{{ route('admin.targets.reject', $order->id) }}" method="POST" class="modal-content bg-dark border-secondary text-white">
            @csrf
            <div class="modal-header border-secondary">
                <h5 class="modal-title text-danger"><i class="ti ti-alert-triangle me-2"></i> رفض طلب استلام التارجت</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>يرجى كتابة سبب رفض الطلب (سيتم إرسال إشعار للمستخدم بالسبب):</p>
                <div class="mb-3">
                    <label class="form-label text-white">سبب الرفض <span class="text-danger">*</span></label>
                    <textarea name="reason" class="form-control" rows="3" placeholder="مثال: لم يتم استلام نقاط التارجت على الوكالة حتى الآن / سكرين شوت غير واضح" required></textarea>
                </div>
            </div>
            <div class="modal-footer border-secondary">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">إلغاء</button>
                <button type="submit" class="btn btn-danger"><i class="ti ti-check me-1"></i> تأكيد الرفض</button>
            </div>
        </form>
    </div>
</div>
@endsection
