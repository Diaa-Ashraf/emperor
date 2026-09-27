@extends('layouts.admin')

@section('title', 'إعدادات نظام الإحالات')

@section('content')
<div class="row justify-content-center">
    <div class="col-lg-8">
        <div class="card border-0 shadow-sm mb-4">
            <div class="card-header bg-transparent border-0 d-flex justify-content-between align-items-center py-3">
                <div>
                    <h5 class="card-title fw-bold mb-0 text-white"><i class="ti ti-settings text-warning me-2"></i> تهيئة قواعد وشروط نظام الإحالات</h5>
                    <small class="text-muted">التحكم في نسبة العمولة، شروط احتساب المكافآت، ونصوص سياسة التسويق بالعمولة</small>
                </div>
                <div>
                    <a href="{{ route('admin.referrals.index') }}" class="btn btn-outline-secondary">
                        <i class="ti ti-arrow-right me-1"></i> العودة للسجل
                    </a>
                </div>
            </div>

            @if(session('success'))
                <div class="mx-3 alert alert-success alert-dismissible fade show" role="alert">
                    {{ session('success') }}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            @endif

            <form action="{{ route('admin.referrals.update-settings') }}" method="POST">
                @csrf
                <div class="card-body">
                    <!-- Enable/Disable -->
                    <div class="p-3 bg-dark rounded border border-secondary mb-4">
                        <div class="form-check form-switch fs-5">
                            <input class="form-check-input" type="checkbox" id="referral_is_active" name="referral_is_active" value="1" {{ $settings['referral_is_active'] ? 'checked' : '' }}>
                            <label class="form-check-label text-white fw-bold fs-6" for="referral_is_active">
                                تفعيل نظام الإحالات والمكافآت لجميع المستخدمين
                            </label>
                        </div>
                        <small class="text-muted d-block mt-1">عند تعطيل هذا الخيار، سيتم إيقاف احتساب أي عمولات جديدة تلقائياً.</small>
                    </div>

                    <!-- Percentage & Trigger -->
                    <div class="row g-3 mb-4">
                        <div class="col-md-6">
                            <label class="form-label text-white fw-bold">نسبة العمولة المئوية (%) <span class="text-danger">*</span></label>
                            <div class="input-group">
                                <input type="number" step="0.1" min="0" max="100" name="referral_percentage" class="form-control font-monospace text-warning fs-5" value="{{ old('referral_percentage', $settings['referral_percentage']) }}" required>
                                <span class="input-group-text bg-dark border-secondary text-white">%</span>
                            </div>
                            <small class="text-muted">النسبة التي يحصل عليها المحيل من قيمة عملية الصديق (افتراضي: 2%).</small>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label text-white fw-bold">شرط احتساب العمولة (Trigger Event) <span class="text-danger">*</span></label>
                            <select name="referral_trigger" class="form-select">
                                <option value="deposit" {{ $settings['referral_trigger'] === 'deposit' ? 'selected' : '' }}>عند إيداع رصيد بالمحفظة (Deposit Approved)</option>
                                <option value="order" {{ $settings['referral_trigger'] === 'order' ? 'selected' : '' }}>عند إتمام شراء طلب بنجاح (Order Completed)</option>
                                <option value="both" {{ $settings['referral_trigger'] === 'both' ? 'selected' : '' }}>في كلتا الحالتين (الإيداع والمشتريات)</option>
                            </select>
                            <small class="text-muted">الحدث الذي يُطلق احتساب العمولة وإيداعها في محفظة المحيل.</small>
                        </div>
                    </div>

                    <!-- Terms & Notes -->
                    <div class="mb-3">
                        <label class="form-label text-white fw-bold">الشروط وسياسة الإحالة المعروضة للمستخدمين</label>
                        <textarea name="referral_terms" class="form-control" rows="4">{{ old('referral_terms', $settings['referral_terms']) }}</textarea>
                        <small class="text-muted">يتم عرض هذه البنود داخل صفحة الإحالات في واجهة تطبيق المستخدم.</small>
                    </div>
                </div>

                <div class="card-footer bg-transparent border-0 d-flex justify-content-end py-3">
                    <button type="submit" class="btn btn-warning">
                        <i class="ti ti-device-floppy me-1"></i> حفظ إعدادات الإحالة
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection
