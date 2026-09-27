@extends('layouts.admin')

@section('title', 'نظام الإحالات والعمولات')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="card mb-4 border-0 shadow-sm">
            <div class="card-header bg-transparent border-0 d-flex flex-wrap justify-content-between align-items-center gap-3 py-3">
                <div>
                    <h5 class="card-title fw-bold mb-0 text-white"><i class="ti ti-users-group text-warning me-2"></i> نظام الإحالات وشبكة المسوقين</h5>
                    <small class="text-muted">متابعة أداء روابط الإحالة وتوزيع العمولات المالية المكتسبة للعملاء</small>
                </div>
                <div class="d-flex gap-2">
                    <a href="{{ route('admin.referrals.settings') }}" class="btn btn-outline-warning">
                        <i class="ti ti-settings me-1"></i> إعدادات نسبة الإحالة
                    </a>
                </div>
            </div>

            <!-- Stats Bar -->
            <div class="card-body border-top border-bottom border-dark py-3">
                <div class="row g-3 text-center">
                    <div class="col-md-3">
                        <div class="p-2 bg-dark rounded border border-secondary">
                            <span class="text-muted small d-block">إجمالي العمولات المدفوعة</span>
                            <span class="fw-bold text-success fs-5 font-monospace">{{ number_format($stats['total_commissions_paid'], 2) }} EGP</span>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="p-2 bg-dark rounded border border-secondary">
                            <span class="text-muted small d-block">مرات صرف العمولات</span>
                            <span class="fw-bold text-warning fs-5 font-monospace">{{ $stats['total_referral_rewards_count'] }}</span>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="p-2 bg-dark rounded border border-secondary">
                            <span class="text-muted small d-block">المسوقون الفعّالون</span>
                            <span class="fw-bold text-info fs-5 font-monospace">{{ $stats['total_active_referrers'] }}</span>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="p-2 bg-dark rounded border border-secondary">
                            <span class="text-muted small d-block">المستخدمون المدعوون</span>
                            <span class="fw-bold text-white fs-5 font-monospace">{{ $stats['total_referred_users'] }}</span>
                        </div>
                    </div>
                </div>

                <!-- Filters -->
                <form action="{{ route('admin.referrals.index') }}" method="GET" class="row g-3 align-items-center mt-2">
                    <div class="col-md-6">
                        <div class="input-group">
                            <span class="input-group-text bg-dark border-secondary text-muted"><i class="ti ti-search"></i></span>
                            <input type="text" name="search" class="form-control" placeholder="بحث باسم المسوق أو الصديق المدعو أو الهاتف..." value="{{ request('search') }}">
                        </div>
                    </div>
                    <div class="col-md-3">
                        <select name="source_type" class="form-select">
                            <option value="">-- كل مصادر العمليات --</option>
                            <option value="deposit" {{ request('source_type') === 'deposit' ? 'selected' : '' }}>عمليات الإيداع (Deposit)</option>
                            <option value="order" {{ request('source_type') === 'order' ? 'selected' : '' }}>مشتريات وطلبات (Orders)</option>
                        </select>
                    </div>
                    <div class="col-md-3 d-flex gap-2">
                        <button type="submit" class="btn btn-warning flex-fill"><i class="ti ti-filter me-1"></i> تصفية</button>
                        @if(request()->hasAny(['search', 'source_type']))
                            <a href="{{ route('admin.referrals.index') }}" class="btn btn-outline-secondary"><i class="ti ti-x"></i></a>
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

            <div class="card-body">
                <div class="row g-4">
                    <!-- Top Referrers Sidebar -->
                    <div class="col-lg-4">
                        <div class="p-3 bg-dark rounded border border-secondary">
                            <h6 class="fw-bold text-warning mb-3"><i class="ti ti-trophy me-1"></i> أفضل المسوقين والمحيلين</h6>
                            <ul class="list-group list-group-flush bg-transparent">
                                @forelse($topReferrers as $index => $ref)
                                    <li class="list-group-item bg-transparent text-white px-0 py-2 border-secondary d-flex justify-content-between align-items-center">
                                        <div class="d-flex align-items-center">
                                            <span class="badge {{ $index === 0 ? 'bg-warning text-dark' : 'bg-secondary' }} me-2 font-monospace">{{ $index + 1 }}</span>
                                            <div>
                                                <a href="{{ route('admin.users.show', $ref->id) }}" class="fw-bold text-white text-decoration-none d-block">
                                                    {{ $ref->name }}
                                                </a>
                                                <small class="text-muted font-monospace">{{ $ref->referral_code }}</small>
                                            </div>
                                        </div>
                                        <div class="text-end">
                                            <span class="badge bg-primary-subtle text-primary">{{ $ref->referrals_count }} صديق</span>
                                            <small class="d-block text-success font-monospace mt-1">+{{ number_format((float) $ref->referral_commissions_sum_amount, 2) }} EGP</small>
                                        </div>
                                    </li>
                                @empty
                                    <li class="list-group-item bg-transparent text-muted text-center py-3">
                                        لا توجد بيانات مسوقين بعد.
                                    </li>
                                @endforelse
                            </ul>
                        </div>
                    </div>

                    <!-- Commissions Ledger -->
                    <div class="col-lg-8">
                        <h6 class="fw-bold text-white mb-3"><i class="ti ti-receipt-tax me-1"></i> سجل توزيع العمولات المباشرة</h6>
                        <div class="table-responsive">
                            <table class="table table-hover align-middle mb-0">
                                <thead class="table-dark">
                                    <tr>
                                        <th class="ps-3">المحيل (المسوق)</th>
                                        <th>الصديق المدعو</th>
                                        <th>العملية</th>
                                        <th>النسبة</th>
                                        <th>مبلغ العمولة</th>
                                        <th>الحالة</th>
                                        <th class="text-end pe-3">التاريخ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @forelse($commissions as $comm)
                                        <tr>
                                            <td class="ps-3">
                                                <a href="{{ route('admin.users.show', $comm->referrer_id) }}" class="fw-bold text-warning text-decoration-none">
                                                    {{ $comm->referrer->name ?? '-' }}
                                                </a>
                                                <small class="text-muted d-block font-monospace">{{ $comm->referrer->phone ?? '' }}</small>
                                            </td>
                                            <td>
                                                <a href="{{ route('admin.users.show', $comm->referred_user_id) }}" class="text-white text-decoration-none">
                                                    {{ $comm->referredUser->name ?? '-' }}
                                                </a>
                                            </td>
                                            <td>
                                                <span class="badge bg-secondary font-monospace">{{ strtoupper($comm->source_type) }} #{{ $comm->source_id }}</span>
                                            </td>
                                            <td>
                                                <span class="badge bg-dark border border-secondary text-info font-monospace">{{ $comm->percentage }}%</span>
                                            </td>
                                            <td>
                                                <div class="fw-bold text-success font-monospace fs-6">
                                                    +{{ number_format((float) $comm->amount, 2) }} {{ $comm->currency }}
                                                </div>
                                            </td>
                                            <td>
                                                <span class="badge bg-success">تم الصرف</span>
                                            </td>
                                            <td class="text-end pe-3 text-muted small">
                                                {{ $comm->created_at->format('Y-m-d H:i') }}
                                            </td>
                                        </tr>
                                    @empty
                                        <tr>
                                            <td colspan="7" class="text-center py-5 text-muted">
                                                <i class="ti ti-users-minus fs-1 d-block mb-2 text-warning"></i>
                                                لا توجد عمولات إحالة مسجلة حالياً.
                                            </td>
                                        </tr>
                                    @endforelse
                                </tbody>
                            </table>
                        </div>

                        @if($commissions->hasPages())
                            <div class="d-flex justify-content-center mt-3">
                                {{ $commissions->links() }}
                            </div>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
