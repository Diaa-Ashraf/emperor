@extends('layouts.admin')

@section('title', 'طلبات إيداع الرصيد')

@section('header')
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
            <h3 class="fw-black text-white mb-1 d-flex align-items-center gap-2">
                <i class="ti ti-wallet text-gold"></i>
                <span>طلبات إيداع الرصيد (Deposits)</span>
            </h3>
            <p class="text-muted mb-0 fs-6">مراجعة التحويلات البنكية ومحافظ الكاش واعتماد شحن محافظ المستخدمين.</p>
        </div>
        <div class="d-flex align-items-center gap-2">
            <span class="badge bg-warning-subtle text-warning border border-warning px-3 py-2 fs-6">
                قيد الانتظار: {{ $counts['pending'] }} طلب
            </span>
        </div>
    </div>
@endsection

@section('content')
    <!-- Status Filter Tabs -->
    <div class="card p-2 mb-4">
        <div class="deposit-filter-toolbar d-flex flex-wrap align-items-center justify-content-between gap-2">
            <div class="btn-group deposit-status-filters" role="group">
                <a href="{{ route('admin.deposits.index') }}" class="btn {{ !request('status') ? 'btn-primary' : 'btn-dark-outline' }} fs-7 fw-semibold">
                    الكل ({{ $counts['all'] }})
                </a>
                <a href="{{ route('admin.deposits.index', ['status' => 'pending']) }}" class="btn {{ request('status') === 'pending' ? 'btn-warning text-dark' : 'btn-dark-outline' }} fs-7 fw-semibold">
                    قيد الانتظار ({{ $counts['pending'] }})
                </a>
                <a href="{{ route('admin.deposits.index', ['status' => 'approved']) }}" class="btn {{ request('status') === 'approved' ? 'btn-success text-white' : 'btn-dark-outline' }} fs-7 fw-semibold">
                    تمت الموافقة ({{ $counts['approved'] }})
                </a>
                <a href="{{ route('admin.deposits.index', ['status' => 'rejected']) }}" class="btn {{ request('status') === 'rejected' ? 'btn-danger text-white' : 'btn-dark-outline' }} fs-7 fw-semibold">
                    المرفوضة ({{ $counts['rejected'] }})
                </a>
            </div>

            <!-- Search Form -->
            <form method="GET" action="{{ route('admin.deposits.index') }}" class="deposit-search-form d-flex gap-2">
                @if(request('status'))
                    <input type="hidden" name="status" value="{{ request('status') }}">
                @endif
                <div class="input-group">
                    <input type="text" name="search" class="form-control form-control-sm" placeholder="ابحث برقم المعاملة، أو المستخدم..." value="{{ request('search') }}">
                    <button class="btn btn-sm btn-primary" type="submit">
                        <i class="ti ti-search"></i>
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Deposits Table Card -->
    <div class="card">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>المستخدم</th>
                        <th>طريقة الدفع</th>
                        <th>المبلغ المطلوب</th>
                        <th>الصافي للمحفظة</th>
                        <th>بيانات التحويل</th>
                        <th>إثبات التحويل</th>
                        <th>الحالة</th>
                        <th>الوقت</th>
                        <th class="text-center">الإجراء</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($deposits as $deposit)
                        <tr>
                            <td class="text-muted fs-7">#{{ $deposit->id }}</td>
                            <td>
                                <a href="{{ route('admin.users.show', $deposit->user_id) }}" class="text-decoration-none">
                                    <div class="fw-bold text-white">{{ $deposit->user?->name ?? 'مستخدم محذوف' }}</div>
                                    <div class="text-muted fs-8">{{ $deposit->user?->phone ?? $deposit->user?->email }}</div>
                                </a>
                            </td>
                            <td>
                                <span class="badge bg-dark border border-secondary text-white">
                                    {{ $deposit->paymentMethod?->name }}
                                </span>
                            </td>
                            <td>
                                <span class="fw-bold text-white">{{ number_format($deposit->amount, 2) }}</span>
                                <span class="text-gold fs-8">{{ $deposit->currency }}</span>
                            </td>
                            <td>
                                <div class="fw-black text-success fs-6">{{ number_format($deposit->final_amount, 2) }} {{ $deposit->currency }}</div>
                                @if($deposit->fee > 0)
                                    <div class="text-danger fs-8">خصم رسوم: {{ number_format($deposit->fee, 2) }}</div>
                                @endif
                            </td>
                            <td>
                                @if($deposit->sender_account)
                                    <div class="text-muted fs-8">من: <strong class="text-light font-monospace">{{ $deposit->sender_account }}</strong></div>
                                @endif
                                @if($deposit->transaction_reference)
                                    <div class="text-gold fs-8">رقم المعاملة: <span class="font-monospace">{{ $deposit->transaction_reference }}</span></div>
                                @endif
                            </td>
                            <td>
                                @if($deposit->proof_image)
                                    <a href="{{ asset('storage/' . $deposit->proof_image) }}" target="_blank" class="btn btn-sm btn-dark-outline p-1" title="عرض الإيصال بالحجم الكامل">
                                        <i class="ti ti-photo fs-5 text-gold"></i>
                                        <span class="fs-8">معاينة الإيصال</span>
                                    </a>
                                @else
                                    <span class="text-secondary fs-8">بدون إيصال</span>
                                @endif
                            </td>
                            <td>
                                <span class="badge bg-{{ $deposit->status?->color() }}-subtle text-{{ $deposit->status?->color() }} border border-{{ $deposit->status?->color() }}">
                                    {{ $deposit->status?->label() }}
                                </span>
                            </td>
                            <td class="text-muted fs-8">
                                {{ $deposit->created_at->diffForHumans() }}
                            </td>
                            <td class="text-center">
                                <div class="d-flex align-items-center justify-content-center gap-1">
                                    <a href="{{ route('admin.deposits.show', $deposit->id) }}" class="btn btn-sm btn-dark-outline" title="عرض التفاصيل الكاملة">
                                        <i class="ti ti-eye"></i>
                                    </a>

                                    @if($deposit->status === \App\Enums\DepositStatus::PENDING)
                                        <!-- Quick Approve Form -->
                                        <form method="POST" action="{{ route('admin.deposits.approve', $deposit->id) }}" class="d-inline" onsubmit="return confirm('تأكيد الموافقة وشحن محفظة العميل بمبلغ {{ $deposit->final_amount }} {{ $deposit->currency }}؟')">
                                            @csrf
                                            <button type="submit" class="btn btn-sm btn-success fw-bold" title="قبول وشحن المحفظة">
                                                <i class="ti ti-check"></i>
                                            </button>
                                        </form>

                                        <!-- Quick Reject Modal Trigger -->
                                        <button type="button" class="btn btn-sm btn-danger fw-bold" data-bs-toggle="modal" data-bs-target="#rejectModal{{ $deposit->id }}" title="رفض الطلب">
                                            <i class="ti ti-x"></i>
                                        </button>

                                        <!-- Reject Modal -->
                                        <div class="modal fade text-start" id="rejectModal{{ $deposit->id }}" tabindex="-1" aria-hidden="true">
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
                                                            <p class="text-muted mb-2">يرجى كتابة سبب رفض الطلب لتوضيحه للمستخدم (مثلاً: رقم المعاملة غير صحيح، لم يصل التحويل، إلخ):</p>
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
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="10" class="text-center py-5 text-muted">
                                <i class="ti ti-inbox fs-1 d-block mb-2 text-secondary"></i>
                                <span>لا توجد طلبات إيداع مطابقة للفلاتر الحالية.</span>
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        @if($deposits->hasPages())
            <div class="card-footer bg-transparent border-top border-dark p-3">
                {{ $deposits->links() }}
            </div>
        @endif
    </div>
@endsection
