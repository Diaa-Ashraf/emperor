@extends('layouts.admin')

@section('title', $title)

@section('header')
    <div class="placeholder-page-heading d-flex align-items-center justify-content-between">
        <div>
            <h3 class="placeholder-page-title fw-bold text-white mb-1 d-flex align-items-center gap-2">
                <i class="ti {{ $icon }} text-gold"></i>
                <span>{{ $title }}</span>
            </h3>
            <p class="placeholder-page-description text-muted mb-0">{{ $description ?: 'سيتم تفعيل كامل أدوات هذا القسم في المرحلة القادمة.' }}</p>
        </div>
        <a href="{{ route('admin.dashboard') }}" class="btn btn-dark-outline">
            &larr; العودة للوحة التحكم
        </a>
    </div>
@endsection

@section('content')
    <div class="card p-5 text-center my-4">
        <div class="mb-3">
            <div class="rounded-circle bg-warning-subtle text-warning d-inline-flex p-4">
                <i class="ti {{ $icon }} fs-1"></i>
            </div>
        </div>
        <h4 class="fw-bold text-white mb-2">{{ $title }}</h4>
        <p class="text-muted mx-auto mb-4" style="max-width: 500px;">
            تم تجهيز البنية التحتية، الجداول، العلاقات والموديلز الخاصة بهذا القسم بنجاح. سنقوم ببناء الواجهات التفاعلية والعمليات الخاصة به في مراحله المخصصة.
        </p>
        <div>
            <a href="{{ route('admin.dashboard') }}" class="btn btn-primary">
                الانتقال إلى لوحة المعلومات الرئيسية
            </a>
        </div>
    </div>
@endsection
