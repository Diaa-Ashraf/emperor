@extends('layouts.admin')

@section('title', 'تفاصيل طلب الإيداع #' . $deposit->id)

@section('header')
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
            <h3 class="fw-black text-white mb-1 d-flex align-items-center gap-2">
                <i class="ti ti-receipt text-gold"></i>
                <span>طلب إيداع رقم #{{ $deposit->id }}</span>
                <span class="badge bg-{{ $deposit->status?->color() }}-subtle text-{{ $deposit->status?->color() }} border border-{{ $deposit->status?->color() }} fs-7 ms-2">
                    {{ $deposit->status?->label() }}
                </span>
            </h3>
            <p class="text-muted mb-0 fs-6">تاريخ الإنشاء: {{ $deposit->created_at->format('Y-m-d h:i A') }} ({{ $deposit->created_at->diffForHumans() }})</p>
        </div>
        <div class="d-flex align-items-center gap-2">
            <a href="{{ route('admin.deposits.index') }}" class="btn btn-dark-outline">
                &larr; رجوع لقائمة الإيداعات
            </a>
        </div>
    </div>
@endsection

@section('content')
    <div class="row g-4">
        <!-- Main Details Column -->
        <div class="col-12 col-lg-7">
            <!-- Financial Card -->
            <div class="card p-4 mb-4">
                <h5 class="fw-bold text-white mb-3 d-flex align-items-center gap-2">
                    <i class="ti ti-coin text-gold"></i>
                    <span>بيانات المبالغ والتحويل</span>
                </h5>
                <div class="row g-3">
                    <div class="col-6 col-md-4">
                        <span class="text-muted fs-7 d-block">طريقة الدفع</span>
                        <strong class="text-white fs-6">{{ $deposit->paymentMethod?->name }}</strong>
                    </div>
                    <div class="col-6 col-md-4">
                        <span class="text-muted fs-7 d-block">المبلغ المحول</span>
                        <strong class="text-white fs-5">{{ number_format($deposit->amount, 2) }} {{ $deposit->currency }}</strong>
                    </div>
                    <div class="col-6 col-md-4">
                        <span class="text-muted fs-7 d-block">رسوم العملية</span>
                        <strong class="text-danger fs-6">{{ number_format($deposit->fee, 2) }} {{ $deposit->currency }}</strong>
                    </div>
                    <div class="col-12">
                        <div class="p-3 rounded bg-dark border border-secondary d-flex justify-content-between align-items-center">
                            <span class="text-gold fw-bold">الصافي المعتمد لشحن المحفظة:</span>
                            <span class="fw-black text-success fs-4">{{ number_format($deposit->final_amount, 2) }} {{ $deposit->currency }}</span>
                        </div>
                    </div>
                </div>

                <hr class="border-dark my-4">

                <h6 class="fw-bold text-white mb-3">بيانات التحويل المسجلة من المستخدم:</h6>
                <div class="row g-3">
                    <div class="col-12 col-md-6">
                        <span class="text-muted fs-7 d-block">حساب / رقم المحفظة المحول منها:</span>
                        <span class="font-monospace text-light fs-6">{{ $deposit->sender_account ?: 'غير محدد' }}</span>
                    </div>
                    <div class="col-12 col-md-6">
                        <span class="text-muted fs-7 d-block">رقم المعاملة أو الكود المرجعي (TXID):</span>
                        <span class="font-monospace text-gold fs-6">{{ $deposit->transaction_reference ?: 'غير محدد' }}</span>
                    </div>
                </div>
            </div>

            <!-- Review Status Card if processed -->
            @if($deposit->status !== \App\Enums\DepositStatus::PENDING)
                <div class="card p-4 border-{{ $deposit->status === \App\Enums\DepositStatus::APPROVED ? 'success' : 'danger' }}">
                    <h5 class="fw-bold text-white mb-2 d-flex align-items-center gap-2">
                        <i class="ti ti-shield-check text-gold"></i>
                        <span>سجل المراجعة والتدقيق</span>
                    </h5>
                    <div class="text-muted fs-7 mb-2">
                        تمت المراجعة بواسطة: <strong class="text-white">{{ $deposit->reviewer?->name ?? 'مدير النظام' }}</strong>
                        في تاريخ: <span class="text-light">{{ $deposit->reviewed_at?->format('Y-m-d h:i A') }}</span>
                    </div>
                    @if($deposit->reviewer_notes)
                        <div class="p-3 rounded bg-dark border border-secondary text-light fs-7">
                            <strong>ملاحظات المراجع:</strong> {{ $deposit->reviewer_notes }}
                        </div>
                    @endif
                </div>
            @else
                <!-- Action Buttons Card for Pending -->
                <div class="card p-4">
                    <h5 class="fw-bold text-white mb-3">اتخاذ قرار بشأن الطلب:</h5>
                    <div class="d-flex flex-wrap gap-3">
                        <form method="POST" action="{{ route('admin.deposits.approve', $deposit->id) }}" onsubmit="return confirm('تأكيد الموافقة وشحن محفظة العميل بمبلغ {{ $deposit->final_amount }} {{ $deposit->currency }}؟')">
                            @csrf
                            <button type="submit" class="btn btn-success btn-lg fw-bold d-flex align-items-center gap-2">
                                <i class="ti ti-check fs-4"></i>
                                <span>الموافقة وشحن المحفظة</span>
                            </button>
                        </form>

                        <button type="button" class="btn btn-danger btn-lg fw-bold d-flex align-items-center gap-2" data-bs-toggle="modal" data-bs-target="#rejectModal">
                            <i class="ti ti-x fs-4"></i>
                            <span>رفض الطلب</span>
                        </button>
                    </div>
                </div>

                <!-- Reject Modal -->
                <div class="modal fade" id="rejectModal" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content border-secondary">
                            <form method="POST" action="{{ route('admin.deposits.reject', $deposit->id) }}">
                                @csrf
                                <div class="modal-header border-dark">
                                    <h5 class="modal-title text-danger fw-bold">
                                        <i class="ti ti-alert-circle"></i> رفض طلب الإيداع #{{ $deposit->id }}
                                    </h5>
                                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <p class="text-muted mb-2">يرجى كتابة سبب رفض الطلب لتوضيحه للمستخدم:</p>
                                    <textarea name="reason" class="form-control" rows="3" placeholder="اكتب سبب الرفض هنا..." required minlength="3"></textarea>
                                </div>
                                <div class="modal-footer border-dark">
                                    <button type="button" class="btn btn-dark-outline" data-bs-dismiss="modal">إلغاء</button>
                                    <button type="submit" class="btn btn-danger fw-bold">تأكيد الرفض</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            @endif
        </div>

        <!-- Sidebar Column: Proof Image & User Profile -->
        <div class="col-12 col-lg-5">
            <!-- User Info Card -->
            <div class="card p-3 mb-4">
                <div class="d-flex align-items-center gap-3 mb-3">
                    <div class="rounded-circle bg-gold d-flex align-items-center justify-content-center text-dark fw-bold fs-4" style="width: 48px; height: 48px;">
                        {{ strtoupper(substr($deposit->user?->name ?? 'U', 0, 1)) }}
                    </div>
                    <div>
                        <h6 class="fw-bold text-white mb-0">{{ $deposit->user?->name ?? 'مستخدم' }}</h6>
                        <span class="text-muted fs-7">{{ $deposit->user?->email }}</span>
                    </div>
                </div>
                <div class="d-flex justify-content-between align-items-center p-2 rounded bg-dark border border-secondary text-muted fs-7 mb-3">
                    <span>رصيد محفظة العميل الحالي:</span>
                    <strong class="text-white fs-6">{{ number_format($deposit->user?->wallet?->balance ?? 0, 2) }} {{ $deposit->user?->currency ?? 'EGP' }}</strong>
                </div>
                <a href="{{ route('admin.users.show', $deposit->user_id) }}" class="btn btn-sm btn-dark-outline w-100">
                    عرض بروفايل العميل بالكامل &rarr;
                </a>
            </div>

            <!-- Receipt Proof Image -->
            <div class="card p-3">
                <h6 class="fw-bold text-white mb-3 d-flex align-items-center gap-2">
                    <i class="ti ti-photo text-gold"></i>
                    <span>إيصال وصورة التحويل</span>
                </h6>
                @if($deposit->proof_image)
                    <div class="text-center">
                        <a href="{{ asset('storage/' . $deposit->proof_image) }}" target="_blank" title="اضغط للتكبير">
                            <img src="{{ asset('storage/' . $deposit->proof_image) }}" alt="إيصال التحويل" class="img-fluid rounded border border-secondary shadow" style="max-height: 400px; object-fit: contain;">
                        </a>
                        <div class="mt-2 text-muted fs-8">اضغط على الصورة لفتحها بالحجم الكامل في نافذة جديدة</div>
                    </div>
                @else
                    <div class="text-center py-5 text-muted border border-dashed border-secondary rounded">
                        <i class="ti ti-photo-off fs-1 d-block mb-2 text-secondary"></i>
                        <span>لم يرفق المستخدم أي صورة إيصال لهذا الطلب.</span>
                    </div>
                @endif
            </div>
        </div>
    </div>
@endsection
