@extends('layouts.admin')

@section('title', 'ملف المستخدم: ' . $user->name)

@section('header')
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div class="d-flex align-items-center gap-3">
            <div class="rounded-circle bg-gold d-flex align-items-center justify-content-center text-dark fw-bold fs-3 shadow" style="width: 56px; height: 56px;">
                {{ strtoupper(substr($user->name, 0, 1)) }}
            </div>
            <div>
                <h3 class="fw-black text-white mb-1">{{ $user->name }}</h3>
                <div class="d-flex align-items-center gap-2 text-muted fs-7">
                    <span>{{ $user->email }}</span>
                    <span>•</span>
                    <span class="badge bg-{{ $user->status?->color() ?? 'success' }}-subtle text-{{ $user->status?->color() ?? 'success' }}">
                        {{ $user->status?->label() }}
                    </span>
                    <span>•</span>
                    <span class="badge bg-secondary-subtle text-light">
                        {{ $user->role?->label() }}
                    </span>
                </div>
            </div>
        </div>

        <div class="d-flex align-items-center gap-2">
            <!-- Adjust Balance Modal Trigger -->
            <button type="button" class="btn btn-primary d-flex align-items-center gap-2" data-bs-toggle="modal" data-bs-target="#adjustBalanceModal">
                <i class="ti ti-wallet"></i>
                <span>تعديل الرصيد يدوي</span>
            </button>

            @if(!$user->isAdmin())
                <form method="POST" action="{{ route('admin.users.toggle-ban', $user->id) }}" onsubmit="return confirm('هل أنت متأكد من تغيير حالة هذا الحساب؟')">
                    @csrf
                    <button type="submit" class="btn {{ $user->status === \App\Enums\UserStatus::BANNED ? 'btn-outline-success' : 'btn-outline-danger' }} d-flex align-items-center gap-1">
                        <i class="ti {{ $user->status === \App\Enums\UserStatus::BANNED ? 'ti-user-check' : 'ti-user-x' }}"></i>
                        <span>{{ $user->status === \App\Enums\UserStatus::BANNED ? 'إلغاء الحظر' : 'حظر الحساب' }}</span>
                    </button>
                </form>
            @endif

            <a href="{{ route('admin.users.index') }}" class="btn btn-dark-outline">
                &larr; رجوع
            </a>
        </div>
    </div>
@endsection

@section('content')
    <!-- User Wallets Summary Row -->
    <div class="row g-3 mb-4">
        @forelse($user->wallets as $wallet)
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card p-3">
                    <div class="d-flex align-items-center justify-content-between mb-2">
                        <span class="text-muted fw-bold fs-7">محفظة ({{ $wallet->currency }})</span>
                        <div class="stat-icon bg-warning-subtle text-warning">
                            <i class="ti ti-wallet"></i>
                        </div>
                    </div>
                    <div class="d-flex align-items-baseline gap-2">
                        <h3 class="fw-black text-white mb-0">{{ number_format($wallet->balance, 2) }}</h3>
                        <span class="text-gold fw-bold">{{ $wallet->currency }}</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-center text-muted fs-7 mt-2 pt-2 border-top border-dark">
                        <span>المجمد: {{ number_format($wallet->frozen_balance, 2) }}</span>
                        <span>المتاح: <strong class="text-success">{{ number_format($wallet->available_balance, 2) }}</strong></span>
                    </div>
                </div>
            </div>
        @empty
            <div class="col-12">
                <div class="alert alert-dark border-secondary text-muted">
                    لا توجد محافظ منشأة لهذا المستخدم بعد.
                </div>
            </div>
        @endforelse
    </div>

    <!-- History Tabs -->
    <div class="card">
        <div class="card-header bg-transparent border-bottom border-dark p-3">
            <ul class="nav nav-tabs card-header-tabs border-0 gap-2" id="userTabs" role="tablist">
                <li class="nav-item">
                    <button class="nav-link active btn-dark-outline text-white py-2 px-3 fw-bold" id="tx-tab" data-bs-toggle="tab" data-bs-target="#tx-pane" type="button">
                        <i class="ti ti-receipt text-gold"></i> سجل المعاملات المالية ({{ $user->walletTransactions->count() }})
                    </button>
                </li>
                <li class="nav-item">
                    <button class="nav-link btn-dark-outline text-white py-2 px-3 fw-bold" id="orders-tab" data-bs-toggle="tab" data-bs-target="#orders-pane" type="button">
                        <i class="ti ti-shopping-cart text-gold"></i> طلبات الشحن ({{ $user->orders->count() }})
                    </button>
                </li>
                <li class="nav-item">
                    <button class="nav-link btn-dark-outline text-white py-2 px-3 fw-bold" id="deposits-tab" data-bs-toggle="tab" data-bs-target="#deposits-pane" type="button">
                        <i class="ti ti-arrow-down-circle text-gold"></i> طلبات الإيداع ({{ $user->depositRequests->count() }})
                    </button>
                </li>
            </ul>
        </div>

        <div class="card-body p-0">
            <div class="tab-content" id="userTabsContent">
                <!-- Transactions Tab -->
                <div class="tab-pane fade show active" id="tx-pane" role="tabpanel">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0">
                            <thead>
                                <tr>
                                    <th>العملية</th>
                                    <th>المبلغ</th>
                                    <th>الرصيد قبل</th>
                                    <th>الرصيد بعد</th>
                                    <th>الوصف</th>
                                    <th>التاريخ</th>
                                </tr>
                            </thead>
                            <tbody>
                                @forelse($user->walletTransactions as $tx)
                                    <tr>
                                        <td>
                                            <span class="badge bg-{{ $tx->amount > 0 ? 'success' : 'danger' }}-subtle text-{{ $tx->amount > 0 ? 'success' : 'danger' }} border border-{{ $tx->amount > 0 ? 'success' : 'danger' }}">
                                                {{ $tx->type?->label() }}
                                            </span>
                                        </td>
                                        <td class="fw-bold {{ $tx->amount > 0 ? 'text-success' : 'text-danger' }}">
                                            {{ $tx->amount > 0 ? '+' : '' }}{{ number_format($tx->amount, 2) }}
                                        </td>
                                        <td class="text-muted">{{ number_format($tx->balance_before, 2) }}</td>
                                        <td class="fw-bold text-white">{{ number_format($tx->balance_after, 2) }}</td>
                                        <td>{{ $tx->description }}</td>
                                        <td class="text-muted fs-7">{{ $tx->created_at->format('Y-m-d h:i A') }}</td>
                                    </tr>
                                @empty
                                    <tr>
                                        <td colspan="6" class="text-center py-4 text-muted">لا توجد حركات مالية مسجلة بعد.</td>
                                    </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Orders Tab -->
                <div class="tab-pane fade" id="orders-pane" role="tabpanel">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0">
                            <thead>
                                <tr>
                                    <th>رقم الطلب</th>
                                    <th>المنتج والباقة</th>
                                    <th>المبلغ</th>
                                    <th>الحالة</th>
                                    <th>التاريخ</th>
                                </tr>
                            </thead>
                            <tbody>
                                @forelse($user->orders as $order)
                                    <tr>
                                        <td><span class="font-monospace text-gold fw-bold">{{ $order->public_id }}</span></td>
                                        <td>{{ $order->product?->name }} ({{ $order->tier?->name }})</td>
                                        <td class="fw-bold text-white">{{ number_format($order->total_amount, 2) }} {{ $order->currency }}</td>
                                        <td>
                                            <span class="badge bg-{{ $order->status?->color() }}-subtle text-{{ $order->status?->color() }}">
                                                {{ $order->status?->label() }}
                                            </span>
                                        </td>
                                        <td class="text-muted fs-7">{{ $order->created_at->format('Y-m-d h:i A') }}</td>
                                    </tr>
                                @empty
                                    <tr>
                                        <td colspan="5" class="text-center py-4 text-muted">لا توجد طلبات شحن للمستخدم.</td>
                                    </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Deposits Tab -->
                <div class="tab-pane fade" id="deposits-pane" role="tabpanel">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>طريقة الدفع</th>
                                    <th>المبلغ</th>
                                    <th>المبلغ الصافي</th>
                                    <th>الحالة</th>
                                    <th>التاريخ</th>
                                </tr>
                            </thead>
                            <tbody>
                                @forelse($user->depositRequests as $deposit)
                                    <tr>
                                        <td>#{{ $deposit->id }}</td>
                                        <td>{{ $deposit->paymentMethod?->name }}</td>
                                        <td class="text-muted">{{ number_format($deposit->amount, 2) }} {{ $deposit->currency }}</td>
                                        <td class="fw-bold text-success">{{ number_format($deposit->final_amount, 2) }} {{ $deposit->currency }}</td>
                                        <td>
                                            <span class="badge bg-{{ $deposit->status?->color() }}-subtle text-{{ $deposit->status?->color() }}">
                                                {{ $deposit->status?->label() }}
                                            </span>
                                        </td>
                                        <td class="text-muted fs-7">{{ $deposit->created_at->format('Y-m-d h:i A') }}</td>
                                    </tr>
                                @empty
                                    <tr>
                                        <td colspan="6" class="text-center py-4 text-muted">لا توجد طلبات إيداع سابقة.</td>
                                    </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Adjust Balance Modal -->
    <div class="modal fade" id="adjustBalanceModal" tabindex="-1" aria-labelledby="adjustBalanceModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-secondary shadow-2xl">
                <form method="POST" action="{{ route('admin.users.adjust-balance', $user->id) }}">
                    @csrf
                    <div class="modal-header border-dark">
                        <h5 class="modal-title fw-bold text-white" id="adjustBalanceModalLabel">
                            <i class="ti ti-wallet text-gold"></i> تعديل رصيد محفظة: {{ $user->name }}
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label class="form-label text-white fw-semibold">نوع العملية</label>
                            <select name="type" class="form-select" required>
                                <option value="credit">إضافة رصيد (شحن المحفظة)</option>
                                <option value="debit">خصم رصيد (سحب من المحفظة)</option>
                            </select>
                        </div>

                        <div class="row g-2 mb-3">
                            <div class="col-8">
                                <label class="form-label text-white fw-semibold">المبلغ</label>
                                <input type="number" step="0.01" name="amount" class="form-control" placeholder="0.00" required min="0.01">
                            </div>
                            <div class="col-4">
                                <label class="form-label text-white fw-semibold">العملة</label>
                                <select name="currency" class="form-select">
                                    <option value="EGP">EGP (ج.م)</option>
                                    <option value="USD">USD ($)</option>
                                    <option value="SAR">SAR (ر.س)</option>
                                </select>
                            </div>
                        </div>

                        <div class="mb-3">
                            <label class="form-label text-white fw-semibold">سبب التعديل / ملاحظات الإدارة</label>
                            <textarea name="notes" class="form-control" rows="3" placeholder="اكتب سبب الشحن أو الخصم لتسجيله في الأرشيف المالي..." required></textarea>
                        </div>
                    </div>
                    <div class="modal-footer border-dark">
                        <button type="button" class="btn btn-dark-outline" data-bs-dismiss="modal">إلغاء</button>
                        <button type="submit" class="btn btn-primary fw-bold">تنفيذ وتوثيق العملية</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
