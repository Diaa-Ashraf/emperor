<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" dir="{{ app()->getLocale() == 'ar' ? 'rtl' : 'ltr' }}" data-bs-theme="dark">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Emperor') }} - تسجيل الدخول</title>

    @php
        $siteFavicon = \App\Models\Setting::get('site_favicon') ? asset(\App\Models\Setting::get('site_favicon')) : asset('images/logo.png');
        $siteLogo = \App\Models\Setting::get('site_logo') ? asset(\App\Models\Setting::get('site_logo')) : asset('images/logo.png');
        $siteName = \App\Models\Setting::get('site_name', 'Emperor');
    @endphp

    <!-- Favicon -->
    <link rel="shortcut icon" href="{{ $siteFavicon }}" type="image/png">
    <link rel="icon" href="{{ $siteFavicon }}" type="image/png">

    <!-- Styles & Scripts via Vite -->
    @vite(['resources/scss/admin.scss', 'resources/js/admin.js'])
</head>
<body class="d-flex align-items-center justify-content-center min-vh-100 py-5" style="background: radial-gradient(circle at 50% 30%, #1a1a24 0%, #0D0D0F 70%);">
    <div class="container" style="max-width: 460px;">
        <!-- Logo & Branding -->
        <div class="text-center mb-4">
            <img src="{{ $siteLogo }}" alt="Emperor Logo" class="mb-3" style="width: 72px; height: 72px; object-fit: contain; filter: drop-shadow(0 0 15px rgba(212, 165, 55, 0.5));">
            <h2 class="fw-black text-white tracking-wide mb-1">{{ $siteName }}</h2>
            <p class="text-gold fw-semibold fs-6 mb-0">منصة إمبراطور للخدمات الرقمية وشحن الألعاب</p>
        </div>

        <!-- Auth Card -->
        <div class="card p-4 p-sm-5 shadow-2xl border-secondary position-relative overflow-hidden" style="border-radius: 18px; background: rgba(22, 22, 26, 0.85); backdrop-filter: blur(12px);">
            {{ $slot }}
        </div>

        <div class="text-center mt-4 text-muted fs-7">
            <span>&copy; {{ date('Y') }} منصة إمبراطور. جميع الحقوق محفوظة.</span>
        </div>
    </div>
</body>
</html>
