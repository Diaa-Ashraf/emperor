@extends('layouts.admin')

@section('title', 'طلبات سحب الرصيد')

@section('header')
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
            <h3 class="fw-black text-white mb-1 d-flex align-items-center gap-2">
                <i class="ti ti-cash-banknote text-warning"></i>
                <span>طلبات سحب الرصيد والأرباح</span>
            </h3>
            <p class="text-muted mb-0 fs-6">إدارة ومراجعة طلبات سحب الأرباح الخارجية، تحويل المستحقات وإرفاق إيصالات السداد.</p>
        </div>
        <div class="d-flex align-items-center gap-2">
            @if($counts['pending'] > 0)
            <span class="badge bg-warning text-dark px-3 py-2 fs-6 fw-bold shadow-sm animate-pulse">
                <i class="ti ti-alert-circle me-1"></i> بانتظار التحويل: {{ $counts['pending'] }} طلب
            </span>
            @else
            <span class="badge bg-success-subtle text-success border border-success px-3 py-2 fs-6">
                <i class="ti ti-check me-1"></i> لا توجد طلبات معلقة
            </span>
            @endif
        </div>
    </div>
@endsection

@section('content')
    <!-- Metric Summary Cards -->
    <div class="row g-3 mb-4">
        <div class="col-12 col-sm-6 col-xl-3">
            <div class="card bg-dark border-0 shadow-sm p-3 h-100">
                <div class="d-flex align-items-center justify-content-between">
                    <div>
                        <div class="text-muted small mb-1">إجمالي طلبات السحب</div>
                        <h3 class="text-white fw-bold mb-0">{{ number_format($counts['all']) }}</h3>
                    </div>
                    <div class="avatar-sm bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center" style="width: 48px; height: 48px;">
                        <i class="ti ti-receipt fs-3"></i>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 col-sm-6 col-xl-3">
            <div class="card bg-dark border-0 shadow-sm p-3 h-100 border-start border-warning border-4">
                <div class="d-flex align-items-center justify-content-between">
                    <div>
                        <div class="text-warning small mb-1 fw-semibold">قيد المراجعة والتحويل</div>
                        <h3 class="text-warning fw-bold mb-0">{{ number_format($counts['pending']) }}</h3>
                    </div>
                    <div class="avatar-sm bg-warning-subtle text-warning rounded-circle d-flex align-items-center justify-content-center" style="width: 48px; height: 48px;">
                        <i class="ti ti-clock-pause fs-3"></i>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 col-sm-6 col-xl-3">
            <div class="card bg-dark border-0 shadow-sm p-3 h-100 border-start border-success border-4">
                <div class="d-flex align-items-center justify-content-between">
                    <div>
                        <div class="text-success small mb-1 fw-semibold">تم التحويل بنجاح</div>
                        <h3 class="text-success fw-bold mb-0">{{ number_format($counts['completed']) }}</h3>
                    </div>
                    <div class="avatar-sm bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center" style="width: 48px; height: 48px;">
                        <i class="ti ti-check-double fs-3"></i>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 col-sm-6 col-xl-3">
            <div class="card bg-dark border-0 shadow-sm p-3 h-100 border-start border-danger border-4">
                <div class="d-flex align-items-center justify-content-between">
                    <div>
                        <div class="text-danger small mb-1 fw-semibold">المرفوضة والمسترجعة</div>
                        <h3 class="text-danger fw-bold mb-0">{{ number_format($counts['rejected']) }}</h3>
                    </div>
                    <div class="avatar-sm bg-danger-subtle text-danger rounded-circle d-flex align-items-center justify-content-center" style="width: 48px; height: 48px;">
                        <i class="ti ti-circle-x fs-3"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Status Filter Tabs & Search -->
    <div class="card bg-dark border-0 shadow-sm p-3 mb-4">
        <div class="d-flex flex-wrap align-items-center justify-content-between gap-3">
            <!-- Tabs -->
            <div class="btn-group flex-wrap" role="group">
                <a href="{{ route('admin.withdrawals.index') }}" class="btn {{ !request('status') ? 'btn-warning text-dark fw-bold' : 'btn-outline-secondary text-white' }} btn-sm">
                    الكل ({{ $counts['all'] }})
                </a>
                <a href="{{ route('admin.withdrawals.index', ['status' => 'pending']) }}" class="btn {{ request('status') === 'pending' ? 'btn-warning text-dark fw-bold' : 'btn-outline-secondary text-white' }} btn-sm">
                    قيد الانتظار ({{ $counts['pending'] }})
                </a>
                <a href="{{ route('admin.withdrawals.index', ['status' => 'completed']) }}" class="btn {{ request('status') === 'completed' ? 'btn-success text-white fw-bold' : 'btn-outline-secondary text-white' }} btn-sm">
                    تم التحويل ({{ $counts['completed'] }})
                </a>
                <a href="{{ route('admin.withdrawals.index', ['status' => 'rejected']) }}" class="btn {{ request('status') === 'rejected' ? 'btn-danger text-white fw-bold' : 'btn-outline-secondary text-white' }} btn-sm">
                    المرفوضة ({{ $counts['rejected'] }})
                </a>
            </div>

            <!-- Search Form -->
            <form method="GET" action="{{ route('admin.withdrawals.index') }}" class="d-flex gap-2 flex-grow-1 flex-md-grow-0" style="min-width: 320px;">
                @if(request('status'))
                    <input type="hidden" name="status" value="{{ request('status') }}">
                @endif
                <div class="input-group input-group-sm">
                    <input type="text" name="search" class="form-control bg-black border-secondary text-white" placeholder="بحث برقم الطلب، الهاتف، الحساب، العميل..." value="{{ request('search') }}">
                    <button class="btn btn-warning" type="submit">
                        <i class="ti ti-search"></i> بحث
                    </button>
                    @if(request('search') || request('status'))
                        <a href="{{ route('admin.withdrawals.index') }}" class="btn btn-outline-secondary" title="إلغاء الفلتر">
                            <i class="ti ti-x"></i>
                        </a>
                    @endif
                </div>
            </form>
        </div>
    </div>

    @if(session('success'))
    <div class="alert alert-success alert-dismissible fade show border-0 bg-success-subtle text-success mb-4" role="alert">
        <i class="ti ti-circle-check me-2 fs-5"></i>
        {{ session('success') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    @endif

    @if(session('error'))
    <div class="alert alert-danger alert-dismissible fade show border-0 bg-danger-subtle text-danger mb-4" role="alert">
        <i class="ti ti-alert-triangle me-2 fs-5"></i>
        {{ session('error') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    @endif

    <!-- Withdrawals Table -->
    <div class="card bg-dark border-0 shadow-sm">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0 text-white">
                <thead class="table-dark">
                    <tr>
                        <th class="ps-3">#</th>
                        <th>العميل</th>
                        <th>طريقة السحب</th>
                        <th>الحساب المستلم</th>
                        <th>المبلغ والرسوم</th>
                        <th>الصافي للتحويل</th>
                        <th>الحالة</th>
                        <th>تاريخ الطلب</th>
                        <th class="text-end pe-3">الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($withdrawals as $withdrawal)
                        <tr>
                            <td class="ps-3">
                                <span class="fw-bold font-monospace text-muted">#{{ $withdrawal->id }}</span>
                            </td>
                            <td>
                                <div class="d-flex align-items-center gap-2">
                                    <div class="avatar-xs bg-secondary rounded-circle text-center d-flex align-items-center justify-content-center text-white fw-bold" style="width: 34px; height: 34px; font-size: 13px;">
                                        {{ mb_substr($withdrawal->user?->name ?? 'U', 0, 1) }}
                                    </div>
                                    <div>
                                        <a href="{{ route('admin.users.show', $withdrawal->user_id) }}" class="fw-bold text-white text-decoration-none d-block">
                                            {{ $withdrawal->user?->name ?? 'مستخدم محذوف' }}
                                        </a>
                                        <small class="text-muted font-monospace">{{ $withdrawal->user?->phone ?? $withdrawal->user?->email }}</small>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span class="badge bg-black border border-secondary text-warning px-2 py-1">
                                    {{ $withdrawal->paymentMethod?->name ?? 'طريقة سحب خارجية' }}
                                </span>
                            </td>
                            <td>
                                <div class="d-flex align-items-center gap-1">
                                    <span class="font-monospace text-warning fw-bold fs-6">{{ $withdrawal->recipient_account }}</span>
                                    <button type="button" class="btn btn-sm btn-link text-muted p-0 ms-1" onclick="navigator.clipboard.writeText('{{ $withdrawal->recipient_account }}'); alert('تم نسخ الحساب: {{ $withdrawal->recipient_account }}');" title="نسخ الحساب">
                                        <i class="ti ti-copy"></i>
                                    </button>
                                </div>
                            </td>
                            <td>
                                <div class="fw-bold text-white">{{ number_format($withdrawal->amount, 2) }} <small class="text-muted">{{ $withdrawal->currency }}</small></div>
                                @if($withdrawal->fee > 0)
                                    <small class="text-danger">خصم عمولة: {{ number_format($withdrawal->fee, 2) }}</small>
                                @endif
                            </td>
                            <td>
                                <div class="fw-black text-success fs-5">
                                    {{ number_format($withdrawal->final_amount, 2) }}
                                    <span class="fs-7">{{ $withdrawal->currency }}</span>
                                </div>
                            </td>
                            <td>
                                <span class="badge bg-{{ $withdrawal->status?->color() }}-subtle text-{{ $withdrawal->status?->color() }} border border-{{ $withdrawal->status?->color() }} px-2 py-1">
                                    {{ $withdrawal->status?->label() }}
                                </span>
                                @if($withdrawal->payout_reference)
                                    <div class="small text-muted font-monospace mt-1">كود: {{ $withdrawal->payout_reference }}</div>
                                @endif
                            </td>
                            <td>
                                <div class="small text-muted">{{ $withdrawal->created_at->diffForHumans() }}</div>
                                <div class="fs-8 text-secondary font-monospace">{{ $withdrawal->created_at->format('Y-m-d H:i') }}</div>
                            </td>
                            <td class="text-end pe-3">
                                <div class="d-flex align-items-center justify-content-end gap-1">
                                    <a href="{{ route('admin.withdrawals.show', $withdrawal->id) }}" class="btn btn-sm btn-outline-info" title="عرض التفاصيل الكاملة">
                                        <i class="ti ti-eye"></i>
                                    </a>

                                    @if($withdrawal->status === \App\Enums\WithdrawalStatus::PENDING)
                                        <!-- Approve Payout Trigger -->
                                        <button type="button" class="btn btn-sm btn-success fw-bold" data-bs-toggle="modal" data-bs-target="#approveModal{{ $withdrawal->id }}" title="اعتماد وتحويل المستحقات">
                                            <i class="ti ti-check"></i> تحويل
                                        </button>

                                        <!-- Reject Trigger -->
                                        <button type="button" class="btn btn-sm btn-outline-danger" data-bs-toggle="modal" data-bs-target="#rejectModal{{ $withdrawal->id }}" title="رفض وإرجاع الرصيد">
                                            <i class="ti ti-x"></i>
                                        </button>

                                        <!-- Approve Modal -->
                                        <div class="modal fade text-start" id="approveModal{{ $withdrawal->id }}" tabindex="-1" aria-hidden="true">
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
                                                            <div class="alert alert-dark border border-secondary mb-3">
                                                                <div class="d-flex justify-content-between mb-1">
                                                                    <span class="text-muted">العميل:</span>
                                                                    <strong class="text-white">{{ $withdrawal->user?->name }}</strong>
                                                                </div>
                                                                <div class="d-flex justify-content-between mb-1">
                                                                    <span class="text-muted">طريقة التحويل:</span>
                                                                    <strong class="text-warning">{{ $withdrawal->paymentMethod?->name }}</strong>
                                                                </div>
                                                                <div class="d-flex justify-content-between mb-1">
                                                                    <span class="text-muted">الحساب المستلم:</span>
                                                                    <strong class="text-gold font-monospace fs-6">{{ $withdrawal->recipient_account }}</strong>
                                                                </div>
                                                                <hr class="border-secondary my-2">
                                                                <div class="d-flex justify-content-between">
                                                                    <span class="text-muted">المبلغ المطلوب تحويله:</span>
                                                                    <strong class="text-success fs-5 fw-bold">{{ number_format($withdrawal->final_amount, 2) }} {{ $withdrawal->currency }}</strong>
                                                                </div>
                                                            </div>

                                                            <div class="mb-3">
                                                                <label class="form-label text-muted small">رقم الإشعار / مرجع الحوالة البنكية (Transaction Reference)</label>
                                                                <input type="text" name="payout_reference" class="form-control bg-black border-secondary text-white font-monospace" placeholder="مثال: VF92847291 أو رقم الحوالة">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label class="form-label text-muted small">صورة إيصال التحويل (اختياري)</label>
                                                                <input type="file" name="proof_image" class="form-control bg-black border-secondary text-white" accept="image/*">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label class="form-label text-muted small">ملاحظات داخلية للمراجعة</label>
                                                                <input type="text" name="reviewer_notes" class="form-control bg-black border-secondary text-white" placeholder="مثال: تم الإرسال من محفظة رقم 010...">
                                                            </div>
                                                        </div>
                                                        <div class="modal-footer border-secondary">
                                                            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">إلغاء</button>
                                                            <button type="submit" class="btn btn-success fw-bold px-4">
                                                                <i class="ti ti-check me-1"></i> تأكيد التحويل وإشعار العميل
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Reject Modal -->
                                        <div class="modal fade text-start" id="rejectModal{{ $withdrawal->id }}" tabindex="-1" aria-hidden="true">
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
                                                                <i class="ti ti-info-circle me-1"></i> عند رفض الطلب، سيتم فوراً إرجاع كامل المبلغ (<strong>{{ $withdrawal->amount }} {{ $withdrawal->currency }}</strong>) إلى محفظة العميل وإرسال إشعار فوري له بسبب الرفض.
                                                            </div>

                                                            <div class="mb-3">
                                                                <label class="form-label text-white small fw-bold">سبب الرفض (سيظهر للعميل في الإشعار) <span class="text-danger">*</span></label>
                                                                <textarea name="reason" class="form-control bg-black border-secondary text-white" rows="3" placeholder="مثال: رقم المحفظة غير مسجل باسمك، أو غير متاح لاستقبال تحويلات..." required minlength="3"></textarea>
                                                            </div>
                                                        </div>
                                                        <div class="modal-footer border-secondary">
                                                            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">إلغاء</button>
                                                            <button type="submit" class="btn btn-danger fw-bold px-4">
                                                                <i class="ti ti-x me-1"></i> تأكيد الرفض وإرجاع الرصيد
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    @endif
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="9" class="text-center py-5 text-muted">
                                <i class="ti ti-inbox fs-1 d-block mb-2 text-secondary"></i>
                                <span>لا توجد طلبات سحب رصيد مطابقة للبحث.</span>
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        @if($withdrawals->hasPages())
        <div class="card-footer bg-transparent border-top border-secondary p-3 d-flex justify-content-center">
            {{ $withdrawals->links() }}
        </div>
        @endif
    </div>
@endsection
