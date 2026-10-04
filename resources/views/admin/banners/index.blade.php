@extends('layouts.admin')

@section('title', 'البانرات والإعلانات الترويجية')

@section('header')
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
            <h3 class="page-header-title mb-1">
                <i class="ti ti-photo text-gold"></i>
                <span>إدارة البانرات وسلايدر العروض</span>
            </h3>
            <p class="page-header-subtitle mb-0">إدارة العروض الترويجية والإعلانات في الصفحة الرئيسية والمنصة</p>
        </div>
        <div class="d-flex flex-wrap align-items-center gap-2">
            <a href="{{ route('admin.banners.create') }}" class="btn btn-primary fw-bold px-3 d-inline-flex align-items-center gap-2">
                <i class="ti ti-plus fs-5"></i>
                <span>إضافة إعلان جديد</span>
            </a>
        </div>
    </div>
@endsection

@section('content')
    <!-- Banners Table Card -->
    <div class="card">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead>
                    <tr>
                        <th class="ps-3" style="width: 70px;">الترتيب</th>
                        <th style="width: 110px;">معاينة الصورة</th>
                        <th>العنوان الرئيسي</th>
                        <th>النوع</th>
                        <th>الرابط التوجيهي</th>
                        <th>فترة العرض</th>
                        <th>الحالة</th>
                        <th class="text-end pe-3">الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($banners as $banner)
                        <tr>
                            <td class="ps-3">
                                <span class="badge bg-secondary font-monospace">#{{ $banner->sort_order }}</span>
                            </td>
                            <td>
                                @if($banner->image)
                                    <img src="{{ Storage::url($banner->image) }}" alt="{{ $banner->title }}" class="rounded-3 border border-secondary shadow-sm" style="height: 42px; width: 90px; object-fit: cover;">
                                @else
                                    <div class="rounded-3 bg-dark border border-secondary text-center py-1 px-2 text-muted small">لا توجد صورة</div>
                                @endif
                            </td>
                            <td>
                                <div class="fw-bold text-white fs-6">{{ $banner->title }}</div>
                                @if($banner->subtitle)
                                    <small class="text-muted">{{ $banner->subtitle }}</small>
                                @endif
                            </td>
                            <td>
                                @php
                                    $typeBadges = [
                                        'slider' => 'bg-info-subtle text-info border border-info-subtle',
                                        'banner' => 'bg-warning-subtle text-warning border border-warning-subtle',
                                        'popup' => 'bg-danger-subtle text-danger border border-danger-subtle',
                                        'deal' => 'bg-danger text-white border border-danger shadow-sm',
                                    ];
                                @endphp
                                <span class="badge {{ $typeBadges[$banner->type] ?? 'bg-secondary' }} px-2 py-1">
                                    {{ ucfirst($banner->type) }}
                                </span>
                            </td>
                            <td>
                                @if($banner->link)
                                    <a href="{{ $banner->link }}" target="_blank" class="text-info text-truncate d-inline-block font-monospace small" style="max-width: 180px;">{{ $banner->link }}</a>
                                @else
                                    <span class="text-muted small">-</span>
                                @endif
                            </td>
                            <td class="text-muted small">
                                @if($banner->starts_at || $banner->ends_at)
                                    {{ $banner->starts_at ? $banner->starts_at->format('Y-m-d') : 'دائم' }} ~ {{ $banner->ends_at ? $banner->ends_at->format('Y-m-d') : 'دائم' }}
                                @else
                                    <span class="badge bg-dark border border-secondary text-muted px-2 py-1">دائم</span>
                                @endif
                            </td>
                            <td>
                                @if($banner->is_active)
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
                                    <form action="{{ route('admin.banners.toggle-active', $banner->id) }}" method="POST" class="d-inline">
                                        @csrf
                                        <button type="submit" class="btn-action {{ $banner->is_active ? 'btn-action-info' : 'btn-action-success' }}" title="{{ $banner->is_active ? 'تعطيل الإعلان' : 'تفعيل الإعلان' }}">
                                            <i class="ti {{ $banner->is_active ? 'ti-eye-off' : 'ti-eye' }}"></i>
                                        </button>
                                    </form>
                                    <a href="{{ route('admin.banners.edit', $banner->id) }}" class="btn-action btn-action-info" title="تعديل الإعلان">
                                        <i class="ti ti-edit"></i>
                                    </a>
                                    <button type="button" class="btn-action btn-action-danger" title="حذف الإعلان" onclick="openDeleteModal('{{ route('admin.banners.destroy', $banner->id) }}', '{{ addslashes($banner->title) }}')">
                                        <i class="ti ti-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="8" class="text-center py-5">
                                <div class="py-4">
                                    <i class="ti ti-photo-off fs-1 text-warning d-block mb-3 opacity-50"></i>
                                    <h6 class="text-white fw-bold mb-1">لا توجد إعلانات أو بانرات مضافة حتى الآن</h6>
                                    <p class="text-muted small mb-3">أضف بانرات وسلايدر عروض لعرضها في واجهة المستخدم</p>
                                    <a href="{{ route('admin.banners.create') }}" class="btn btn-sm btn-primary">
                                        <i class="ti ti-plus me-1"></i> إضافة إعلان جديد
                                    </a>
                                </div>
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        @if($banners->hasPages())
            <div class="card-footer bg-transparent border-0 d-flex justify-content-center py-3">
                {{ $banners->links() }}
            </div>
        @endif
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
                        <h5 class="modal-title fw-bold text-white mb-0">تأكيد حذف الإعلان</h5>
                    </div>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body py-4">
                    <p class="text-muted mb-2">هل أنت متأكد من رغبتك في حذف هذا الإعلان نهائياً؟</p>
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