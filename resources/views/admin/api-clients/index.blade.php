@extends('layouts.admin')

@section('title', 'عملاء الـ API وشبكة الموزعين')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="card mb-4 border-0 shadow-sm">
            <div class="card-header bg-transparent border-0 d-flex flex-wrap justify-content-between align-items-center gap-3 py-3">
                <div>
                    <h5 class="card-title fw-bold mb-0 text-white"><i class="ti ti-api-app text-warning me-2"></i> إدارة عملاء الـ API وشبكة الموزعين (B2B)</h5>
                    <small class="text-muted">التحكم في مفاتيح الربط الخارجي، هوامش التسعير المخصصة، سجلات الاستهلاك ومحافظ الموزعين</small>
                </div>
                <div class="d-flex gap-2">
                    <a href="{{ route('admin.api-clients.create') }}" class="btn btn-warning text-dark fw-bold">
                        <i class="ti ti-plus me-1"></i> إضافة عميل API جديد
                    </a>
                </div>
            </div>

            <!-- Newly Created Credentials Alert -->
            @if(session('new_client_credentials'))
                <div class="card-body bg-dark border-top border-bottom border-warning py-3">
                    <div class="alert alert-warning border-0 bg-black text-white p-3 mb-0 rounded-3">
                        <div class="d-flex align-items-center gap-2 mb-2">
                            <i class="ti ti-shield-lock text-warning fs-4"></i>
                            <h6 class="fw-bold mb-0 text-warning">بيانات اعتماد الـ API للعميل: {{ session('new_client_credentials')['name'] }}</h6>
                        </div>
                        <p class="small text-muted mb-3">⚠️ تنبيه هام: هذا الرمز السري (API Secret) لن يظهر مرة أخرى مطلقاً. يرجى نسخه وتزويد العميل به في بيئة آمنة.</p>
                        
                        <div class="row g-2">
                            <div class="col-md-6">
                                <label class="form-label text-muted small mb-1">API Key (مفتاح الـ API):</label>
                                <div class="input-group">
                                    <input type="text" readonly class="form-control font-monospace bg-dark text-white border-secondary" id="newApiKey" value="{{ session('new_client_credentials')['api_key'] }}">
                                    <button class="btn btn-outline-warning" type="button" onclick="navigator.clipboard.writeText(document.getElementById('newApiKey').value); this.innerText='تم النسخ!'; setTimeout(() => this.innerText='نسخ', 2000);">نسخ</button>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label text-muted small mb-1">API Secret (الرمز السري للـ API):</label>
                                <div class="input-group">
                                    <input type="text" readonly class="form-control font-monospace bg-dark text-warning border-warning" id="newApiSecret" value="{{ session('new_client_credentials')['api_secret'] }}">
                                    <button class="btn btn-warning text-dark fw-bold" type="button" onclick="navigator.clipboard.writeText(document.getElementById('newApiSecret').value); this.innerText='تم النسخ!'; setTimeout(() => this.innerText='نسخ', 2000);">نسخ</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            @endif

            <!-- Stats Bar -->
            <div class="card-body border-top border-bottom border-dark py-3">
                <div class="row g-3 text-center">
                    <div class="col-md-3">
                        <div class="p-2 bg-dark rounded border border-secondary">
                            <span class="text-muted small d-block">إجمالي عملاء API</span>
                            <span class="fw-bold text-warning fs-5 font-monospace">{{ $stats['total_clients'] }}</span>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="p-2 bg-dark rounded border border-secondary">
                            <span class="text-muted small d-block">الحسابات النشطة</span>
                            <span class="fw-bold text-success fs-5 font-monospace">{{ $stats['active_clients'] }}</span>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="p-2 bg-dark rounded border border-secondary">
                            <span class="text-muted small d-block">طلبات الـ API المنفذة</span>
                            <span class="fw-bold text-info fs-5 font-monospace">{{ $stats['total_api_orders'] }}</span>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="p-2 bg-dark rounded border border-secondary">
                            <span class="text-muted small d-block">إجمالي حجم التداول المكتمل</span>
                            <span class="fw-bold text-white fs-5 font-monospace">{{ number_format($stats['total_api_revenue'], 2) }} EGP</span>
                        </div>
                    </div>
                </div>

                <!-- Search & Filters -->
                <form action="{{ route('admin.api-clients.index') }}" method="GET" class="row g-3 align-items-center mt-2">
                    <div class="col-md-7">
                        <div class="input-group">
                            <span class="input-group-text bg-dark border-secondary text-muted"><i class="ti ti-search"></i></span>
                            <input type="text" name="search" class="form-control" placeholder="بحث بالاسم، البريد الإلكتروني، أو مفتاح الـ API..." value="{{ request('search') }}">
                        </div>
                    </div>
                    <div class="col-md-3">
                        <select name="status" class="form-select">
                            <option value="">-- كل الحالات --</option>
                            <option value="active" {{ request('status') === 'active' ? 'selected' : '' }}>نشط (Active)</option>
                            <option value="suspended" {{ request('status') === 'suspended' ? 'selected' : '' }}>موقوف مؤقتاً (Suspended)</option>
                            <option value="banned" {{ request('status') === 'banned' ? 'selected' : '' }}>محظور (Banned)</option>
                        </select>
                    </div>
                    <div class="col-md-2 d-flex gap-2">
                        <button type="submit" class="btn btn-primary w-100"><i class="ti ti-filter me-1"></i> تصفية</button>
                        <a href="{{ route('admin.api-clients.index') }}" class="btn btn-outline-secondary"><i class="ti ti-refresh"></i></a>
                    </div>
                </form>
            </div>

            <!-- Table -->
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover table-dark align-middle mb-0">
                        <thead class="bg-black text-muted small text-uppercase">
                            <tr>
                                <th class="ps-3">العميل / المؤسسة</th>
                                <th>API Key</th>
                                <th>رصيد المحفظة</th>
                                <th>معدل الطلبات</th>
                                <th>الطلبات</th>
                                <th>الحالة</th>
                                <th class="text-end pe-3">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse($clients as $client)
                                <tr>
                                    <td class="ps-3">
                                        <div class="d-flex align-items-center gap-2">
                                            <div class="rounded-circle bg-warning text-dark fw-bold d-flex align-items-center justify-content-center" style="width: 38px; height: 38px; font-size: 14px;">
                                                {{ strtoupper(mb_substr($client->name, 0, 2)) }}
                                            </div>
                                            <div>
                                                <div class="fw-bold text-white">{{ $client->name }}</div>
                                                <small class="text-muted font-monospace">{{ $client->email }}</small>
                                                @if($client->phone)
                                                    <small class="text-muted d-block font-monospace" style="font-size: 11px;">{{ $client->phone }}</small>
                                                @endif
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="d-flex align-items-center gap-1 font-monospace small">
                                            <span class="text-warning bg-black px-2 py-1 rounded border border-dark">
                                                {{ Str::limit($client->api_key, 18, '...') }}
                                            </span>
                                            <button class="btn btn-sm btn-link text-muted p-0" title="نسخ مفتاح الـ API" onclick="navigator.clipboard.writeText('{{ $client->api_key }}'); alert('تم نسخ API Key');">
                                                <i class="ti ti-copy"></i>
                                            </button>
                                        </div>
                                        @if(!empty($client->api_ip_whitelist))
                                            <small class="badge bg-secondary mt-1" style="font-size: 10px;">
                                                <i class="ti ti-shield-check"></i> IP مقيّد ({{ count($client->api_ip_whitelist) }})
                                            </small>
                                        @else
                                            <small class="text-muted d-block" style="font-size: 10px;">كل العناوين مصرح بها</small>
                                        @endif
                                    </td>
                                    <td>
                                        <span class="fw-bold text-success font-monospace fs-6">
                                            {{ number_format($client->wallet?->balance ?? 0, 2) }}
                                        </span>
                                        <small class="text-muted">{{ $client->wallet?->currency ?? 'EGP' }}</small>
                                    </td>
                                    <td>
                                        <span class="badge bg-dark border border-secondary text-info font-monospace">
                                            {{ $client->api_rate_limit ?? 60 }} طلب/دقيقة
                                        </span>
                                    </td>
                                    <td>
                                        <span class="badge bg-dark border border-secondary text-white font-monospace">
                                            {{ $client->orders_count }} طلب
                                        </span>
                                    </td>
                                    <td>
                                        @if($client->status->value === 'active')
                                            <span class="badge bg-success-subtle text-success border border-success">نشط</span>
                                        @elseif($client->status->value === 'suspended')
                                            <span class="badge bg-warning-subtle text-warning border border-warning">موقوف مؤقتاً</span>
                                        @else
                                            <span class="badge bg-danger-subtle text-danger border border-danger">محظور</span>
                                        @endif
                                    </td>
                                    <td class="text-end pe-3">
                                        <div class="btn-group btn-group-sm">
                                            <!-- Custom Pricing Matrix -->
                                            <a href="{{ route('admin.api-clients.pricing', $client->id) }}" class="btn btn-outline-warning" title="تخصيص أسعار المنتجات">
                                                <i class="ti ti-coin"></i> أسعار العميل
                                            </a>
                                            <!-- Logs -->
                                            <a href="{{ route('admin.api-clients.logs', $client->id) }}" class="btn btn-outline-info" title="سجلات الطلبات (Logs)">
                                                <i class="ti ti-history"></i> السجلات
                                            </a>
                                            <!-- Edit -->
                                            <a href="{{ route('admin.api-clients.edit', $client->id) }}" class="btn btn-outline-secondary" title="تعديل">
                                                <i class="ti ti-edit"></i>
                                            </a>
                                            <!-- Toggle Status -->
                                            <form action="{{ route('admin.api-clients.toggle-active', $client->id) }}" method="POST" class="d-inline" onsubmit="return confirm('هل أنت متأكد من تغيير حالة هذا العميل؟');">
                                                @csrf
                                                <button type="submit" class="btn btn-outline-{{ $client->status->value === 'active' ? 'danger' : 'success' }}" title="{{ $client->status->value === 'active' ? 'إيقاف مؤقت' : 'تفعيل' }}">
                                                    <i class="ti ti-power"></i>
                                                </button>
                                            </form>
                                            <!-- Regenerate Keys -->
                                            <form action="{{ route('admin.api-clients.regenerate-credentials', $client->id) }}" method="POST" class="d-inline" onsubmit="return confirm('تحذير: سيتم إبطال الرمز السري الحالي فوراً وإنشاء مفاتيح جديدة للعميل. هل تود المتابعة؟');">
                                                @csrf
                                                <button type="submit" class="btn btn-outline-danger" title="تجديد مفتاح الـ API والرمز السري">
                                                    <i class="ti ti-refresh"></i>
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="7" class="text-center py-5 text-muted">
                                        <i class="ti ti-api-app fs-1 d-block mb-2 text-secondary"></i>
                                        لا يوجد أي عملاء API مضافين حالياً
                                    </td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Pagination -->
            @if($clients->hasPages())
                <div class="card-footer bg-transparent border-dark d-flex justify-content-center py-3">
                    {{ $clients->links() }}
                </div>
            @endif
        </div>
    </div>
</div>
@endsection
