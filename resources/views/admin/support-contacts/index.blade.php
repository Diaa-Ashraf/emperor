@extends('layouts.admin')

@section('title', 'قنوات الدعم الفني والمساعدة')

@section('header')
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
            <h3 class="page-header-title mb-1">
                <i class="ti ti-headset text-gold"></i>
                <span>قنوات وأرقام الدعم الفني</span>
            </h3>
            <p class="page-header-subtitle mb-0">إدارة أرقام واتساب، معرفات تيليجرام، ووسائل التواصل المباشر المعروضة للمستخدمين</p>
        </div>
        <div class="d-flex flex-wrap align-items-center gap-2">
            <a href="{{ route('admin.support-contacts.create') }}" class="btn btn-primary fw-bold px-3 d-inline-flex align-items-center gap-2">
                <i class="ti ti-plus fs-5"></i>
                <span>إضافة وسيلة دعم جديدة</span>
            </a>
        </div>
    </div>
@endsection

@section('content')
    <!-- Contacts Table Card -->
    <div class="card">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead>
                    <tr>
                        <th class="ps-3" style="width: 60px;">#</th>
                        <th>اسم القناة / الفريق</th>
                        <th>نوع الوسيلة</th>
                        <th>القيمة / الرقم / الرابط</th>
                        <th>الترتيب</th>
                        <th>الحالة</th>
                        <th class="text-end pe-3">الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($contacts as $contact)
                        <tr>
                            <td class="ps-3 text-muted font-monospace">#{{ $contact->id }}</td>
                            <td>
                                <div class="fw-bold text-white fs-6">
                                    <i class="ti {{ $contact->channel_icon }} me-1 text-gold"></i> {{ $contact->name }}
                                </div>
                                @if($contact->description)
                                    <small class="text-muted">{{ $contact->description }}</small>
                                @endif
                            </td>
                            <td>
                                <span class="badge bg-secondary font-monospace">{{ $contact->channel_label }}</span>
                            </td>
                            <td>
                                <span class="badge bg-dark border border-secondary text-warning font-monospace fs-6 px-2 py-1">
                                    {{ $contact->value }}
                                </span>
                            </td>
                            <td>
                                <span class="badge bg-secondary font-monospace">#{{ $contact->sort_order }}</span>
                            </td>
                            <td>
                                @if($contact->is_active)
                                    <span class="badge bg-success-subtle text-success border border-success-subtle px-2 py-1">
                                        <i class="ti ti-circle-check me-1"></i>نشط
                                    </span>
                                @else
                                    <span class="badge bg-danger-subtle text-danger border border-danger-subtle px-2 py-1">
                                        <i class="ti ti-circle-x me-1"></i>معطل
                                    </span>
                                @endif
                            </td>
                            <td class="text-end pe-3">
                                <div class="d-inline-flex align-items-center gap-1">
                                    <form action="{{ route('admin.support-contacts.toggle-active', $contact->id) }}" method="POST" class="d-inline">
                                        @csrf
                                        <button type="submit" class="btn-action {{ $contact->is_active ? 'btn-action-info' : 'btn-action-success' }}" title="{{ $contact->is_active ? 'تعطيل القناة' : 'تفعيل القناة' }}">
                                            <i class="ti {{ $contact->is_active ? 'ti-eye-off' : 'ti-eye' }}"></i>
                                        </button>
                                    </form>
                                    <a href="{{ route('admin.support-contacts.edit', $contact->id) }}" class="btn-action btn-action-info" title="تعديل">
                                        <i class="ti ti-edit"></i>
                                    </a>
                                    <button type="button" class="btn-action btn-action-danger" title="حذف" onclick="openDeleteModal('{{ route('admin.support-contacts.destroy', $contact->id) }}', '{{ addslashes($contact->name) }}')">
                                        <i class="ti ti-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="7" class="text-center py-5">
                                <div class="py-4">
                                    <i class="ti ti-headset-off fs-1 text-warning d-block mb-3 opacity-50"></i>
                                    <h6 class="text-white fw-bold mb-1">لا توجد قنوات دعم فني مضافة</h6>
                                    <p class="text-muted small mb-3">أضف أرقام واتساب أو معرفات تواصل لمساعدة العملاء</p>
                                    <a href="{{ route('admin.support-contacts.create') }}" class="btn btn-sm btn-primary">
                                        <i class="ti ti-plus me-1"></i> إضافة وسيلة دعم جديدة
                                    </a>
                                </div>
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-0 pb-0">
                    <div class="d-flex align-items-center gap-2">
                        <div class="rounded-circle bg-danger-subtle text-danger d-flex align-items-center justify-content-center" style="width: 42px; height: 42px;">
                            <i class="ti ti-alert-triangle fs-4"></i>
                        </div>
                        <h5 class="modal-title fw-bold text-white mb-0">تأكيد حذف وسيلة الدعم</h5>
                    </div>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body py-4">
                    <p class="text-muted mb-2">هل أنت متأكد من رغبتك في حذف وسيلة الدعم هذه؟</p>
                    <div class="p-3 bg-dark rounded-3 border border-secondary">
                        <div class="fw-bold text-white fs-6" id="deleteTargetName">-</div>
                    </div>
                </div>
                <div class="modal-footer border-0 pt-0">
                    <button type="button" class="btn btn-dark-outline" data-bs-dismiss="modal">إلغاء</button>
                    <form id="deleteForm" method="POST" class="d-inline">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-danger fw-bold px-4">
                            <i class="ti ti-trash me-1"></i> نعم، حذف
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
<script>
    function openDeleteModal(url, name) {
        const form = document.getElementById('deleteForm');
        const nameEl = document.getElementById('deleteTargetName');
        form.action = url;
        nameEl.textContent = name;
        
        const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
        modal.show();
    }
</script>
@endpush