@extends('layouts.admin')

@section('title', 'سجل النشاطات الإدارية')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="card mb-4 border-0 shadow-sm">
            <div class="card-header bg-transparent border-0 d-flex flex-wrap justify-content-between align-items-center gap-3 py-3">
                <div>
                    <h5 class="card-title fw-bold mb-0 text-white"><i class="ti ti-history text-warning me-2"></i> سجل العمليات والنشاطات الإدارية (Audit Trail)</h5>
                    <small class="text-muted">تتبع وتوثيق كافة التعديلات والعمليات الحساسة التي يقوم بها فريق الإدارة والمشرفين</small>
                </div>
            </div>

            <!-- Filters -->
            <div class="card-body border-top border-bottom border-dark py-3">
                <form action="{{ route('admin.audit-logs.index') }}" method="GET" class="row g-3 align-items-center">
                    <div class="col-md-4">
                        <div class="input-group">
                            <span class="input-group-text bg-dark border-secondary text-muted"><i class="ti ti-search"></i></span>
                            <input type="text" name="search" class="form-control" placeholder="بحث بالإجراء / الـ IP / الموديل..." value="{{ request('search') }}">
                        </div>
                    </div>
                    <div class="col-md-3">
                        <select name="user_id" class="form-select">
                            <option value="">-- كل المشرفين --</option>
                            @foreach($admins as $admin)
                                <option value="{{ $admin->id }}" {{ request('user_id') == $admin->id ? 'selected' : '' }}>
                                    {{ $admin->name }}
                                </option>
                            @endforeach
                        </select>
                    </div>
                    <div class="col-md-3">
                        <select name="action" class="form-select">
                            <option value="">-- كل أنواع الإجراءات --</option>
                            <option value="created" {{ request('action') === 'created' ? 'selected' : '' }}>إضافة (Created)</option>
                            <option value="updated" {{ request('action') === 'updated' ? 'selected' : '' }}>تعديل (Updated)</option>
                            <option value="deleted" {{ request('action') === 'deleted' ? 'selected' : '' }}>حذف (Deleted)</option>
                        </select>
                    </div>
                    <div class="col-md-2 d-flex gap-2">
                        <button type="submit" class="btn btn-warning flex-fill"><i class="ti ti-filter me-1"></i> تصفية</button>
                        @if(request()->hasAny(['search', 'user_id', 'action']))
                            <a href="{{ route('admin.audit-logs.index') }}" class="btn btn-outline-secondary"><i class="ti ti-x"></i></a>
                        @endif
                    </div>
                </form>
            </div>

            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead class="table-dark">
                            <tr>
                                <th class="ps-3" style="width: 5%;">#</th>
                                <th style="width: 15%;">المشرف</th>
                                <th style="width: 12%;">نوع الإجراء</th>
                                <th style="width: 18%;">النموذج المتأثر</th>
                                <th style="width: 30%;">التغييرات (Changes)</th>
                                <th style="width: 10%;">عنوان IP</th>
                                <th class="text-end pe-3" style="width: 10%;">التاريخ والوقت</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse($logs as $log)
                                <tr>
                                    <td class="ps-3 text-muted font-monospace">{{ $log->id }}</td>
                                    <td>
                                        <div class="fw-bold text-white">{{ $log->user->name ?? 'النظام / تلقائي' }}</div>
                                        @if($log->user)
                                            <span class="badge bg-primary-subtle text-primary small">{{ $log->user->role->label() ?? 'مشرف' }}</span>
                                        @endif
                                    </td>
                                    <td>
                                        @php
                                            $actionColors = [
                                                'created' => 'bg-success',
                                                'updated' => 'bg-info text-dark',
                                                'deleted' => 'bg-danger',
                                            ];
                                        @endphp
                                        <span class="badge {{ $actionColors[$log->action] ?? 'bg-secondary' }}">
                                            {{ strtoupper($log->action) }}
                                        </span>
                                    </td>
                                    <td>
                                        <span class="fw-bold text-white font-monospace">{{ class_basename($log->auditable_type) }} #{{ $log->auditable_id }}</span>
                                    </td>
                                    <td>
                                        @if(!empty($log->new_values))
                                            <div class="small font-monospace text-muted" style="max-height: 80px; overflow-y: auto;">
                                                @foreach($log->new_values as $key => $val)
                                                    <div><span class="text-warning">{{ $key }}</span>: {{ is_array($val) ? json_encode($val) : $val }}</div>
                                                @endforeach
                                            </div>
                                        @else
                                            <span class="text-muted small">-</span>
                                        @endif
                                    </td>
                                    <td>
                                        <span class="font-monospace text-muted small">{{ $log->ip_address ?? '127.0.0.1' }}</span>
                                    </td>
                                    <td class="text-end pe-3 text-muted small">
                                        {{ $log->created_at?->format('Y-m-d H:i:s') }}
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="7" class="text-center py-5 text-muted">
                                        <i class="ti ti-history-off fs-1 d-block mb-2 text-warning"></i>
                                        لا توجد نشاطات مسجلة تطابق معايير الفلترة.
                                    </td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>

            @if($logs->hasPages())
                <div class="card-footer bg-transparent border-0 d-flex justify-content-center">
                    {{ $logs->links() }}
                </div>
            @endif
        </div>
    </div>
</div>
@endsection
