@extends('layouts.admin')

@section('title', 'تفاصيل طلب سحب الرصيد #' . $withdrawal->id)

@section('header')
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
            <div class="d-flex align-items-center gap-2 mb-1">
                <a href="{{ route('admin.withdrawals.index') }}" class="btn btn-sm btn-outline-secondary">
                    <i class="ti ti-arrow-right"></i> رجوع
                </a>
                <h3 class="fw-black text-white mb-0">
                    طلب سحب رصيد #{{ $withdrawal->id }}
                </h3>
                <span class="badge bg-{{ $withdrawal->status?->color() }}-subtle text-{{ $withdrawal->status?->color() }} border border-{{ $withdrawal->status?->color() }} px-3 py-1 fs-6">
                    {{ $withdrawal->status?->label() }}
                </span>
            </div>
            <p class="text-muted mb-0 fs-6">تفاصيل المستحقات، الحساب المستلم، وسجل المراجعة والتحويل.</p>
        </div>
    </div>
@endsection

@section('content')
    <div class="row g-4">
        <!-- Main Details -->
        <div class="col-12 col-lg-8">
            <div class="card bg-dark border-0 shadow-sm p-4 mb-4">
                <h5 class="text-white fw-bold mb-3 border-bottom border-secondary pb-2">
                    <i class="ti ti-receipt text-warning me-2"></i> بيانات الطلب والتحويل المالي
                </h5>

                <div class="row g-3">
                    <div class="col-md-6">
                        <div class="text-muted small">المبلغ المطلوب سحبه</div>
                        <div class="fs-4 fw-bold text-white">{{ number_format($withdrawal->amount, 2) }} <small class="text-warning">{{ $withdrawal->currency }}</small></div>
                    </div>

                    <div class="col-md-6">
                        <div class="text-muted small">رسوم / عمولة السحب</div>
                        <div class="fs-4 fw-bold text-danger">{{ number_format($withdrawal->fee, 2) }} <small class="text-muted">{{ $withdrawal->currency }}</small></div>
                    </div>

                    <div class="col-12">
                        <div class="p-3 bg-black rounded border border-success">
                            <div class="text-muted small">صافي المبلغ المستحق للتحويل للعميل</div>
                            <div class="fs-2 fw-black text-success">{{ number_format($withdrawal->final_amount, 2) }} {{ $withdrawal->currency }}</div>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="text-muted small">طريقة السحب المحددة</div>
                        <div class="fs-6 fw-bold text-white">{{ $withdrawal->paymentMethod?->name ?? 'غير محدد' }}</div>
                    </div>

                    <div class="col-md-6">
                        <div class="text-muted small">حساب المستلم (رقم المحفظة / الآيبان)</div>
                        <div class="d-flex align-items-center gap-2 mt-1">
                            <span class="fs-5 fw-bold text-warning font-monospace">{{ $withdrawal->recipient_account }}</span>
                            <button type="button" class="btn btn-sm btn-outline-warning py-0 px-2" onclick="navigator.clipboard.writeText('{{ $withdrawal->recipient_account }}'); alert('تم النسخ!');">
                                <i class="ti ti-copy"></i> نسخ
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Review & Payout Proof -->
            @if($withdrawal->payout_reference || $withdrawal->payout_proof_image || $withdrawal->reviewer_notes)
            <div class="card bg-dark border-0 shadow-sm p-4">
                <h5 class="text-white fw-bold mb-3 border-bottom border-secondary pb-2">
                    <i class="ti ti-check-double text-success me-2"></i> سجل المراجعة والتنفيذ
                </h5>

                <div class="row g-3">
                    @if($withdrawal->payout_reference)
                    <div class="col-md-6">
                        <div class="text-muted small">مرجع المعاملة / كود الحوالة</div>
                        <div class="fs-6 fw-bold text-white font-monospace">{{ $withdrawal->payout_reference }}</div>
                    </div>
                    @endif

                    @if($withdrawal->reviewer)
                    <div class="col-md-6">
                        <div class="text-muted small">تمت المراجعة بواسطة</div>
                        <div class="fs-6 fw-bold text-white">{{ $withdrawal->reviewer->name }} ({{ $withdrawal->reviewed_at?->diffForHumans() }})</div>
                    </div>
                    @endif

                    @if($withdrawal->reviewer_notes)
                    <div class="col-12">
                        <div class="text-muted small">ملاحظات المراجع</div>
                        <div class="p-3 bg-black rounded text-light small">{{ $withdrawal->reviewer_notes }}</div>
                    </div>
                    @endif

                    @if($withdrawal->payout_proof_image)
                    <div class="col-12">
                        <div class="text-muted small mb-2">إيصال السداد / التحويل</div>
                        <a href="{{ asset('storage/' . $withdrawal->payout_proof_image) }}" target="_blank">
                            <img src="{{ asset('storage/' . $withdrawal->payout_proof_image) }}" class="img-fluid rounded border border-secondary" style="max-height: 250px;" alt="إيصال التحويل">
                        </a>
                    </div>
                    @endif
                </div>
            </div>
            @endif
        </div>

        <!-- User Sidebar Info -->
        <div class="col-12 col-lg-4">
            <div class="card bg-dark border-0 shadow-sm p-4 mb-4">
                <h5 class="text-white fw-bold mb-3 border-bottom border-secondary pb-2">
                    <i class="ti ti-user text-warning me-2"></i> بيانات العميل
                </h5>

                @if($withdrawal->user)
                <div class="d-flex align-items-center gap-3 mb-3">
                    <div class="avatar-md bg-warning text-dark rounded-circle d-flex align-items-center justify-content-center fw-bold fs-4" style="width: 50px; height: 50px;">
                        {{ mb_substr($withdrawal->user->name, 0, 1) }}
                    </div>
                    <div>
                        <h6 class="text-white fw-bold mb-0">{{ $withdrawal->user->name }}</h6>
                        <small class="text-muted font-monospace">{{ $withdrawal->user->phone }}</small>
                    </div>
                </div>

                <ul class="list-unstyled text-muted small mb-0">
                    <li class="mb-2"><i class="ti ti-mail me-2"></i> {{ $withdrawal->user->email }}</li>
                    <li class="mb-2"><i class="ti ti-calendar me-2"></i> عضو منذ: {{ $withdrawal->user->created_at->format('Y-m-d') }}</li>
                    <li class="mt-3">
                        <a href="{{ route('admin.users.show', $withdrawal->user_id) }}" class="btn btn-sm btn-outline-warning w-100">
                            <i class="ti ti-user-search me-1"></i> فتح ملف العميل والمحفظة
                        </a>
                    </li>
                </ul>
                @else
                <div class="text-muted">مستخدم غير متوفر أو محذوف.</div>
                @endif
            </div>

            @if($withdrawal->status === \App\Enums\WithdrawalStatus::PENDING)
            <div class="card bg-dark border-0 shadow-sm p-4">
                <h5 class="text-white fw-bold mb-3">اتخاذ إجراء</h5>
                <div class="d-grid gap-2">
                    <button type="button" class="btn btn-success fw-bold py-2" data-bs-toggle="modal" data-bs-target="#approveModal">
                        <i class="ti ti-check me-1"></i> تأكيد التحويل الآن
                    </button>
                    <button type="button" class="btn btn-outline-danger fw-bold py-2" data-bs-toggle="modal" data-bs-target="#rejectModal">
                        <i class="ti ti-x me-1"></i> رفض واسترجاع الرصيد
                    </button>
                </div>
            </div>

            <!-- Approve Modal -->
            <div class="modal fade text-start" id="approveModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content bg-dark border-secondary text-white">
                        <form method="POST" action="{{ route('admin.withdrawals.approve', $withdrawal->id) }}" enctype="multipart/form-data">
                            @csrf
                            <div class="modal-header border-secondary">
                                <h5 class="modal-title text-success fw-bold">
                                    <i class="ti ti-check-circle me-1"></i> تأكيد تحويل مستحقات السحب #{{ $withdrawal->id }}
                                </h5>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="mb-3">
                                    <label class="form-label text-muted small">رقم الإشعار / مرجع الحوالة البنكية</label>
                                    <input type="text" name="payout_reference" class="form-control bg-black border-secondary text-white font-monospace" placeholder="مثال: VF92847291">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label text-muted small">صورة إيصال التحويل (اختياري)</label>
                                    <input type="file" name="proof_image" class="form-control bg-black border-secondary text-white" accept="image/*">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label text-muted small">ملاحظات المراجعة</label>
                                    <input type="text" name="reviewer_notes" class="form-control bg-black border-secondary text-white" placeholder="تم الإرسال بنجاح...">
                                </div>
                            </div>
                            <div class="modal-footer border-secondary">
                                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">إلغاء</button>
                                <button type="submit" class="btn btn-success fw-bold px-4">تأكيد التحويل</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Reject Modal -->
            <div class="modal fade text-start" id="rejectModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content bg-dark border-secondary text-white">
                        <form method="POST" action="{{ route('admin.withdrawals.reject', $withdrawal->id) }}">
                            @csrf
                            <div class="modal-header border-secondary">
                                <h5 class="modal-title text-danger fw-bold">
                                    <i class="ti ti-alert-triangle me-1"></i> رفض طلب السحب #{{ $withdrawal->id }}
                                </h5>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="alert alert-danger bg-danger-subtle text-danger border-0 mb-3 small">
                                    سيتم إرجاع مبلغ <strong>{{ $withdrawal->amount }} {{ $withdrawal->currency }}</strong> إلى محفظة العميل فوراً.
                                </div>
                                <div class="mb-3">
                                    <label class="form-label text-white small fw-bold">سبب الرفض <span class="text-danger">*</span></label>
                                    <textarea name="reason" class="form-control bg-black border-secondary text-white" rows="3" placeholder="اكتب سبب الرفض هنا..." required minlength="3"></textarea>
                                </div>
                            </div>
                            <div class="modal-footer border-secondary">
                                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">إلغاء</button>
                                <button type="submit" class="btn btn-danger fw-bold px-4">تأكيد الرفض</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            @endif
        </div>
    </div>
@endsection
