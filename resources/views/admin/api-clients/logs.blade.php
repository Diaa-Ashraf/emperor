@extends('layouts.admin')

@section('title', 'سجل طلبات API للعميل')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="card mb-4 border-0 shadow-sm">
            <div class="card-header bg-transparent border-0 d-flex flex-wrap justify-content-between align-items-center gap-3 py-3">
                <div>
                    <h5 class="card-title fw-bold mb-0 text-white">
                        <i class="ti ti-history text-info me-2"></i> سجل طلبات الـ API (Logs): <span class="text-warning">{{ $client->name }}</span>
                    </h5>
                    <small class="text-muted">مراقبة استهلاك وتفاصيل نداءات الـ API وأوقات الاستجابة وحالات الخطأ والنجاح</small>
                </div>
                <div class="d-flex gap-2">
                    <a href="{{ route('admin.api-clients.pricing', $client->id) }}" class="btn btn-outline-warning btn-sm">
                        <i class="ti ti-coin me-1"></i> مصفوفة الأسعار
                    </a>
                    <a href="{{ route('admin.api-clients.index') }}" class="btn btn-outline-secondary btn-sm">
                        <i class="ti ti-arrow-right me-1"></i> رجوع للعملاء
                    </a>
                </div>
            </div>

            <!-- Filters -->
            <div class="card-body border-top border-bottom border-dark py-3">
                <form action="{{ route('admin.api-clients.logs', $client->id) }}" method="GET" class="row g-3 align-items-center">
                    <div class="col-md-4">
                        <input type="text" name="endpoint" class="form-control font-monospace" placeholder="مسار الرابط (مثال: /api/v1/external/orders)..." value="{{ request('endpoint') }}">
                    </div>
                    <div class="col-md-3">
                        <select name="method" class="form-select font-monospace">
                            <option value="">-- كل الطرق (Methods) --</option>
                            <option value="GET" {{ request('method') === 'GET' ? 'selected' : '' }}>GET</option>
                            <option value="POST" {{ request('method') === 'POST' ? 'selected' : '' }}>POST</option>
                            <option value="PUT" {{ request('method') === 'PUT' ? 'selected' : '' }}>PUT</option>
                            <option value="DELETE" {{ request('method') === 'DELETE' ? 'selected' : '' }}>DELETE</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <select name="status_code" class="form-select font-monospace">
                            <option value="">-- كل الحالات (Status Codes) --</option>
                            <option value="200" {{ request('status_code') == '200' ? 'selected' : '' }}>200 OK</option>
                            <option value="201" {{ request('status_code') == '201' ? 'selected' : '' }}>201 Created</option>
                            <option value="400" {{ request('status_code') == '400' ? 'selected' : '' }}>400 Bad Request</option>
                            <option value="401" {{ request('status_code') == '401' ? 'selected' : '' }}>401 Unauthorized</option>
                            <option value="402" {{ request('status_code') == '402' ? 'selected' : '' }}>402 Payment Required</option>
                            <option value="422" {{ request('status_code') == '422' ? 'selected' : '' }}>422 Unprocessable</option>
                            <option value="429" {{ request('status_code') == '429' ? 'selected' : '' }}>429 Too Many Requests</option>
                            <option value="500" {{ request('status_code') == '500' ? 'selected' : '' }}>500 Server Error</option>
                        </select>
                    </div>
                    <div class="col-md-2 d-flex gap-2">
                        <button type="submit" class="btn btn-primary w-100"><i class="ti ti-filter me-1"></i> تصفية</button>
                        <a href="{{ route('admin.api-clients.logs', $client->id) }}" class="btn btn-outline-secondary"><i class="ti ti-refresh"></i></a>
                    </div>
                </form>
            </div>

            <!-- Table -->
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover table-dark align-middle mb-0 font-monospace small">
                        <thead class="bg-black text-muted text-uppercase" style="font-family: inherit;">
                            <tr>
                                <th class="ps-3">الوقت</th>
                                <th>Method</th>
                                <th>Endpoint</th>
                                <th>Status</th>
                                <th>المدة (ms)</th>
                                <th>عنوان IP</th>
                                <th class="text-end pe-3">التفاصيل</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse($logs as $log)
                                <tr>
                                    <td class="ps-3 text-muted">
                                        {{ $log->created_at->format('Y-m-d H:i:s') }}
                                        <small class="d-block text-secondary" style="font-size: 10px;">{{ $log->created_at->diffForHumans() }}</small>
                                    </td>
                                    <td>
                                        @if($log->method === 'GET')
                                            <span class="badge bg-success-subtle text-success border border-success">GET</span>
                                        @elseif($log->method === 'POST')
                                            <span class="badge bg-primary-subtle text-primary border border-primary">POST</span>
                                        @elseif($log->method === 'PUT' || $log->method === 'PATCH')
                                            <span class="badge bg-warning-subtle text-warning border border-warning">{{ $log->method }}</span>
                                        @else
                                            <span class="badge bg-danger-subtle text-danger border border-danger">{{ $log->method }}</span>
                                        @endif
                                    </td>
                                    <td class="text-white fw-bold">
                                        /{{ ltrim($log->endpoint, '/') }}
                                    </td>
                                    <td>
                                        @if($log->response_status >= 200 && $log->response_status < 300)
                                            <span class="badge bg-success text-white">{{ $log->response_status }}</span>
                                        @elseif($log->response_status >= 400 && $log->response_status < 500)
                                            <span class="badge bg-warning text-dark">{{ $log->response_status }}</span>
                                        @else
                                            <span class="badge bg-danger text-white">{{ $log->response_status }}</span>
                                        @endif
                                    </td>
                                    <td>
                                        <span class="text-{{ $log->duration_ms > 1000 ? 'warning' : 'muted' }}">
                                            {{ $log->duration_ms }} ms
                                        </span>
                                    </td>
                                    <td class="text-muted">
                                        {{ $log->ip_address }}
                                    </td>
                                    <td class="text-end pe-3">
                                        <button class="btn btn-sm btn-outline-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#logDetail{{ $log->id }}">
                                            <i class="ti ti-code"></i> عرض الحمولة
                                        </button>
                                    </td>
                                </tr>
                                <tr class="collapse" id="logDetail{{ $log->id }}">
                                    <td colspan="7" class="bg-black p-3 border-bottom border-dark">
                                        <div class="row g-3">
                                            <div class="col-md-6">
                                                <h6 class="text-info fw-bold mb-2">Request Body (الحمولة المرسلة):</h6>
                                                <pre class="bg-dark text-light p-2 rounded small" style="max-height: 200px; overflow-y: auto;">{{ json_encode($log->request_body, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) ?: 'لا توجد بيانات (Empty Body)' }}</pre>
                                            </div>
                                            <div class="col-md-6">
                                                <h6 class="text-warning fw-bold mb-2">Response Body (استجابة الخادم):</h6>
                                                <pre class="bg-dark text-light p-2 rounded small" style="max-height: 200px; overflow-y: auto;">{{ json_encode($log->response_body, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) ?: 'لا توجد استجابة نصية' }}</pre>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="7" class="text-center py-5 text-muted">
                                        <i class="ti ti-terminal fs-1 d-block mb-2 text-secondary"></i>
                                        لا توجد سجلات طلبات لهذا العميل حتى الآن
                                    </td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Pagination -->
            @if($logs->hasPages())
                <div class="card-footer bg-transparent border-dark d-flex justify-content-center py-3">
                    {{ $logs->links() }}
                </div>
            @endif
        </div>
    </div>
</div>
@endsection
