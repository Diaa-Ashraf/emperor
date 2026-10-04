@extends('layouts.admin')

@section('title', 'مركز التقارير والإحصائيات المتقدمة')

@section('header')
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
            <h3 class="fw-black text-white mb-1">
                📊 مركز التقارير والإحصائيات والذكاء المالي
            </h3>
            <p class="text-muted mb-0 fs-6">تحليل الأداء المالي، مبيعات الألعاب، سلوك المستخدمين، وحركة بيع التارجت.</p>
        </div>
        <div class="d-flex align-items-center gap-2">
            <button type="button" class="btn btn-dark-outline d-flex align-items-center gap-2" onclick="window.print();">
                <i class="ti ti-printer"></i>
                <span>طباعة التقرير</span>
            </button>
            <button type="button" class="btn btn-primary d-flex align-items-center gap-2" onclick="location.reload();">
                <i class="ti ti-refresh"></i>
                <span>تحديث الأرقام</span>
            </button>
        </div>
    </div>
@endsection

@section('content')
    <!-- Date Filter Controls -->
    <div class="card border-0 mb-4 p-3" style="background: var(--bg-card, #12131a); border-radius: 16px;">
        <form action="{{ route('admin.reports.index') }}" method="GET" class="d-flex flex-wrap align-items-center justify-content-between gap-3">
            <!-- Filter Pills -->
            <div class="d-flex flex-wrap gap-2">
                @php
                    $ranges = [
                        'today' => 'اليوم',
                        'yesterday' => 'أمس',
                        '7days' => 'آخر 7 أيام',
                        '30days' => 'آخر 30 يوم',
                        'this_month' => 'هذا الشهر',
                        'last_month' => 'الشهر السابق',
                    ];
                @endphp
                @foreach($ranges as $key => $label)
                    <a href="{{ route('admin.reports.index', ['range' => $key]) }}"
                       class="btn btn-sm {{ $range === $key ? 'btn-warning fw-bold text-dark' : 'btn-dark text-muted border-secondary' }} px-3 py-2"
                       style="border-radius: 10px;">
                        {{ $label }}
                    </a>
                @endforeach
            </div>

            <!-- Custom Date Range -->
            <div class="d-flex flex-wrap align-items-center gap-2 w-100 w-xl-auto">
                <input type="hidden" name="range" value="custom">
                <div class="d-flex align-items-center gap-1 bg-dark px-2 py-1 rounded-3 border border-secondary flex-grow-1 flex-sm-grow-0">
                    <span class="text-muted fs-7">من:</span>
                    <input type="date" name="start_date" value="{{ $startDate ?? $report['from'] }}" class="form-control form-control-sm bg-transparent border-0 text-white" style="min-width: 110px; max-width: 140px;">
                </div>
                <div class="d-flex align-items-center gap-1 bg-dark px-2 py-1 rounded-3 border border-secondary flex-grow-1 flex-sm-grow-0">
                    <span class="text-muted fs-7">إلى:</span>
                    <input type="date" name="end_date" value="{{ $endDate ?? $report['to'] }}" class="form-control form-control-sm bg-transparent border-0 text-white" style="min-width: 110px; max-width: 140px;">
                </div>
                <button type="submit" class="btn btn-sm btn-outline-warning px-3 py-2 fw-bold flex-grow-1 flex-sm-grow-0" style="border-radius: 10px;">
                    <i class="ti ti-filter"></i> تطبيق
                </button>
            </div>
        </form>
    </div>

    <!-- Top KPI Financial Cards -->
    <div class="row g-3 mb-4">
        <!-- 1. Total Sales -->
        <div class="col-12 col-sm-6 col-xl-3">
            <div class="card stat-card h-100 p-3" style="background: #12131A; border: 1px solid rgba(212, 165, 55, 0.3); border-radius: 16px;">
                <div class="d-flex align-items-center justify-content-between mb-3">
                    <span class="text-muted fw-bold fs-7">إجمالي مبيعات الشحن</span>
                    <div class="stat-icon bg-warning-subtle text-warning p-2 rounded-3">
                        <i class="ti ti-currency-pound fs-4"></i>
                    </div>
                </div>
                <div class="d-flex align-items-baseline gap-2">
                    <h3 class="fw-black text-white mb-0 font-monospace">{{ number_format($report['metrics']['total_sales'], 2) }}</h3>
                    <span class="text-gold fw-bold fs-7">ج.م</span>
                </div>
                <small class="text-muted mt-2 d-block">
                    عدد الطلبات الناجحة: <strong class="text-white">{{ $report['metrics']['orders_count'] }}</strong> طلب
                </small>
            </div>
        </div>

        <!-- 2. Net Profit & Margin -->
        <div class="col-12 col-sm-6 col-xl-3">
            <div class="card stat-card h-100 p-3" style="background: #12131A; border: 1px solid rgba(34, 197, 94, 0.3); border-radius: 16px;">
                <div class="d-flex align-items-center justify-content-between mb-3">
                    <span class="text-muted fw-bold fs-7">صافي الأرباح المحققة</span>
                    <div class="stat-icon bg-success-subtle text-success p-2 rounded-3">
                        <i class="ti ti-sparkles fs-4"></i>
                    </div>
                </div>
                <div class="d-flex align-items-baseline gap-2">
                    <h3 class="fw-black text-success mb-0 font-monospace">{{ number_format($report['metrics']['total_profit'], 2) }}</h3>
                    <span class="text-success fw-bold fs-7">ج.م</span>
                </div>
                <small class="text-muted mt-2 d-block">
                    هامش الربح الإجمالي: <span class="badge bg-success text-white font-monospace">{{ $report['metrics']['profit_margin'] }}%</span>
                </small>
            </div>
        </div>

        <!-- 3. Deposits vs Target Payouts -->
        <div class="col-12 col-sm-6 col-xl-3">
            <div class="card stat-card h-100 p-3" style="background: #12131A; border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 16px;">
                <div class="d-flex align-items-center justify-content-between mb-3">
                    <span class="text-muted fw-bold fs-7">إجمالي الإيداعات</span>
                    <div class="stat-icon bg-info-subtle text-info p-2 rounded-3">
                        <i class="ti ti-wallet fs-4"></i>
                    </div>
                </div>
                <div class="d-flex align-items-baseline gap-2">
                    <h3 class="fw-black text-info mb-0 font-monospace">{{ number_format($report['metrics']['total_deposits'], 2) }}</h3>
                    <span class="text-info fw-bold fs-7">ج.م</span>
                </div>
                <small class="text-muted mt-2 d-block">
                    مستحقات التارجت: <strong class="text-gold font-monospace">{{ number_format($report['metrics']['total_target_payouts'], 2) }} ج.م</strong>
                </small>
            </div>
        </div>

        <!-- 4. Target Selling & Auto-Verify -->
        <div class="col-12 col-sm-6 col-xl-3">
            <div class="card stat-card h-100 p-3" style="background: #12131A; border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 16px;">
                <div class="d-flex align-items-center justify-content-between mb-3">
                    <span class="text-muted fw-bold fs-7">عمليات بيع التارجت</span>
                    <div class="stat-icon bg-purple-subtle text-white p-2 rounded-3" style="background: rgba(168, 85, 247, 0.2);">
                        <i class="ti ti-bolt fs-4 text-purple"></i>
                    </div>
                </div>
                <div class="d-flex align-items-baseline gap-2">
                    <h3 class="fw-black text-white mb-0 font-monospace">{{ $report['metrics']['target_orders_count'] }}</h3>
                    <span class="text-muted fw-bold fs-7">عملية</span>
                </div>
                <small class="text-muted mt-2 d-block">
                    اعتماد فوري تلقائي: <span class="badge bg-purple text-white font-monospace">{{ $report['metrics']['auto_verified_target_count'] }} فوري</span>
                </small>
            </div>
        </div>
    </div>

    <!-- Interactive Charts Row -->
    <div class="row g-4 mb-4">
        <!-- Sales & Profits Chart -->
        <div class="col-lg-8">
            <div class="card border-0 p-4" style="background: var(--bg-card, #12131a); border-radius: 16px;">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h5 class="fw-bold text-white mb-1 d-flex align-items-center gap-2">
                            <i class="ti ti-chart-line text-gold fs-4"></i>
                            منحنى حركة المبيعات والأرباح اليومية
                        </h5>
                        <small class="text-muted">مقارنة حجم المبيعات الإجمالي مع صافي الربح المحقق بالفترة المحددة</small>
                    </div>
                </div>
                <div id="salesChart" style="min-height: 320px;"></div>
            </div>
        </div>

        <!-- Trust Levels Donut Chart -->
        <div class="col-lg-4">
            <div class="card border-0 p-4 h-100" style="background: var(--bg-card, #12131a); border-radius: 16px;">
                <div class="mb-3">
                    <h5 class="fw-bold text-white mb-1 d-flex align-items-center gap-2">
                        <i class="ti ti-shield-check text-gold fs-4"></i>
                        توزيع مستويات ثقة العملاء
                    </h5>
                    <small class="text-muted">نسبة العملاء حسب الـ Trust Levels</small>
                </div>
                <div id="trustChart" style="min-height: 260px;"></div>
                <div class="mt-3 pt-3 border-top border-secondary text-center">
                    <small class="text-muted">
                        العملاء الجدد المسجلين في الفترة: <strong class="text-gold font-monospace">{{ $report['metrics']['new_users_count'] }}</strong> مستخدم
                    </small>
                </div>
            </div>
        </div>
    </div>

    <!-- Data Tables Row -->
    <div class="row g-4">
        <!-- Top Selling Games & Products -->
        <div class="col-lg-6">
            <div class="card border-0" style="background: var(--bg-card, #12131a); border-radius: 16px;">
                <div class="card-header bg-transparent border-bottom border-secondary py-3 d-flex justify-content-between align-items-center">
                    <h5 class="card-title fw-bold mb-0 text-white d-flex align-items-center gap-2">
                        <i class="ti ti-flame text-warning fs-4"></i>
                        أكثر الألعاب والمنتجات مبيعاً وأرباحاً
                    </h5>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0">
                            <thead class="table-dark">
                                <tr>
                                    <th class="ps-3">اللعبة / المنتج</th>
                                    <th>عدد الطلبات</th>
                                    <th>إجمالي المبيعات</th>
                                    <th class="text-end pe-3">صافي الأرباح</th>
                                </tr>
                            </thead>
                            <tbody>
                                @forelse($report['top_products'] as $prod)
                                    <tr>
                                        <td class="ps-3">
                                            <div class="d-flex align-items-center gap-2">
                                                @if($prod->product?->image)
                                                    <img src="{{ filter_var($prod->product->image, FILTER_VALIDATE_URL) ? $prod->product->image : asset('storage/' . $prod->product->image) }}"
                                                         alt="" style="width: 32px; height: 32px; border-radius: 8px; object-fit: cover;">
                                                @else
                                                    <div style="width: 32px; height: 32px; border-radius: 8px; background: #2A2A38; display: flex; align-items: center; justify-content: center; color: #D4A537;">
                                                        <i class="ti ti-device-gamepad-2"></i>
                                                    </div>
                                                @endif
                                                <span class="fw-bold text-white fs-7">{{ $prod->product?->name ?? 'منتج #' . $prod->product_id }}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span class="badge bg-secondary font-monospace">{{ $prod->orders_count }} طلب</span>
                                        </td>
                                        <td>
                                            <span class="text-gold fw-bold font-monospace">{{ number_format($prod->total_revenue, 2) }} ج.م</span>
                                        </td>
                                        <td class="text-end pe-3">
                                            <span class="text-success fw-bold font-monospace">+{{ number_format($prod->total_profit, 2) }} ج.م</span>
                                        </td>
                                    </tr>
                                @empty
                                    <tr>
                                        <td colspan="4" class="text-center py-4 text-muted">لا توجد مبيعات مسجلة في هذه الفترة</td>
                                    </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- Top VIP Spenders & Target Apps -->
        <div class="col-lg-6">
            <div class="card border-0 mb-4" style="background: var(--bg-card, #12131a); border-radius: 16px;">
                <div class="card-header bg-transparent border-bottom border-secondary py-3 d-flex justify-content-between align-items-center">
                    <h5 class="card-title fw-bold mb-0 text-white d-flex align-items-center gap-2">
                        <i class="ti ti-crown text-gold fs-4"></i>
                        كبار العملاء والموزعين الأكثر إنفاقاً (VIP)
                    </h5>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0">
                            <thead class="table-dark">
                                <tr>
                                    <th class="ps-3">المستخدم</th>
                                    <th>مستوى الثقة</th>
                                    <th>الطلبات</th>
                                    <th class="text-end pe-3">إجمالي الإنفاق</th>
                                </tr>
                            </thead>
                            <tbody>
                                @forelse($report['top_customers'] as $cust)
                                    <tr>
                                        <td class="ps-3">
                                            <div class="fw-bold text-white fs-7">{{ $cust->user?->name ?? 'مستخدم #' . $cust->user_id }}</div>
                                            <small class="text-muted">{{ $cust->user?->phone ?? $cust->user?->email }}</small>
                                        </td>
                                        <td>
                                            <span class="badge bg-dark text-gold border border-gold font-monospace">
                                                {{ strtoupper($cust->user?->trust_level?->value ?? 'NEW') }}
                                            </span>
                                        </td>
                                        <td>
                                            <span class="badge bg-secondary font-monospace">{{ $cust->orders_count }} طلب</span>
                                        </td>
                                        <td class="text-end pe-3">
                                            <span class="text-gold fw-bold font-monospace">{{ number_format($cust->total_spent, 2) }} ج.م</span>
                                        </td>
                                    </tr>
                                @empty
                                    <tr>
                                        <td colspan="4" class="text-center py-4 text-muted">لا يوجد عملاء في هذه الفترة</td>
                                    </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Target Apps Volume Breakdown -->
            @if(count($report['target_apps']) > 0)
                <div class="card border-0" style="background: var(--bg-card, #12131a); border-radius: 16px;">
                    <div class="card-header bg-transparent border-bottom border-secondary py-3">
                        <h6 class="card-title fw-bold mb-0 text-white d-flex align-items-center gap-2">
                            <i class="ti ti-cash text-purple fs-5"></i>
                            حجم استبدال التارجت حسب التطبيق
                        </h6>
                    </div>
                    <div class="card-body p-0">
                        <div class="table-responsive">
                            <table class="table table-hover align-middle mb-0">
                                <thead class="table-dark">
                                    <tr>
                                        <th class="ps-3">التطبيق</th>
                                        <th>النقاط المستبدلة</th>
                                        <th>العمليات</th>
                                        <th class="text-end pe-3">المستحقات المدفوعة</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach($report['target_apps'] as $tgt)
                                        <tr>
                                            <td class="ps-3 fw-bold text-white">{{ $tgt->product?->name ?? 'تطبيق #' . $tgt->product_id }}</td>
                                            <td class="text-muted font-monospace">{{ number_format($tgt->total_points) }} نقطة</td>
                                            <td><span class="badge bg-secondary font-monospace">{{ $tgt->count }}</span></td>
                                            <td class="text-end pe-3 text-gold fw-bold font-monospace">{{ number_format($tgt->total_payout, 2) }} ج.م</td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            @endif
        </div>
    </div>
@endsection

@push('scripts')
<script>
document.addEventListener('DOMContentLoaded', function () {
    const labels = @json($report['chart_data']['labels']);
    const salesData = @json($report['chart_data']['sales']);
    const profitsData = @json($report['chart_data']['profits']);
    const trustLevels = @json($report['trust_levels']);

    // 1. Sales & Profit Area Chart
    const salesOptions = {
        series: [
            { name: 'إجمالي المبيعات (ج.م)', data: salesData },
            { name: 'صافي الأرباح (ج.م)', data: profitsData }
        ],
        chart: {
            type: 'area',
            height: 320,
            toolbar: { show: false },
            fontFamily: 'Cairo, sans-serif',
            background: 'transparent'
        },
        colors: ['#D4A537', '#10B981'],
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth', width: 2 },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.45,
                opacityTo: 0.05,
                stops: [0, 90, 100]
            }
        },
        xaxis: {
            categories: labels,
            labels: { style: { colors: '#8E8E98' } },
            axisBorder: { color: 'rgba(255, 255, 255, 0.1)' }
        },
        yaxis: {
            labels: {
                style: { colors: '#8E8E98' },
                formatter: val => val.toLocaleString('en-US') + ' ج.م'
            }
        },
        tooltip: {
            theme: 'dark',
            y: { formatter: val => val.toLocaleString('en-US') + ' ج.م' }
        },
        grid: { borderColor: 'rgba(255, 255, 255, 0.05)' },
        legend: { labels: { colors: '#E2E8F0' }, position: 'top' }
    };

    if (document.querySelector("#salesChart")) {
        const salesChart = new ApexCharts(document.querySelector("#salesChart"), salesOptions);
        salesChart.render();
    }

    // 2. Trust Levels Donut Chart
    const trustLabels = Object.keys(trustLevels).map(k => k.toUpperCase());
    const trustSeries = Object.values(trustLevels);

    const trustOptions = {
        series: trustSeries.length > 0 ? trustSeries : [1],
        labels: trustLabels.length > 0 ? trustLabels : ['لا توجد بيانات'],
        chart: {
            type: 'donut',
            height: 260,
            fontFamily: 'Cairo, sans-serif',
            background: 'transparent'
        },
        colors: ['#8E8E98', '#F59E0B', '#3B82F6', '#D4A537', '#10B981'],
        legend: { position: 'bottom', labels: { colors: '#E2E8F0' } },
        dataLabels: { enabled: false },
        tooltip: { theme: 'dark' },
        stroke: { colors: ['#12131A'] }
    };

    if (document.querySelector("#trustChart")) {
        const trustChart = new ApexCharts(document.querySelector("#trustChart"), trustOptions);
        trustChart.render();
    }
});
</script>
@endpush
