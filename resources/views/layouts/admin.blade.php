<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" dir="{{ app()->getLocale() == 'ar' ? 'rtl' : 'ltr' }}" data-bs-theme="dark">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title', 'لوحة التحكم') | {{ config('app.name', 'Emperor') }}</title>

    <!-- Favicon -->
    @php
        $adminFavicon = \App\Models\Setting::get('site_favicon') ? asset(\App\Models\Setting::get('site_favicon')) : asset('images/logo.png');
    @endphp
    <link rel="shortcut icon" href="{{ $adminFavicon }}" type="image/png">
    <link rel="icon" href="{{ $adminFavicon }}" type="image/png">

    <!-- Styles & Scripts via Vite -->
    @vite(['resources/scss/admin.scss', 'resources/js/admin.js'])

    @stack('styles')
</head>
<body>
    <!-- Background Overlay for Mobile Drawer -->
    <div class="overlay" id="overlay"></div>

    <div class="layout-wrapper d-flex min-vh-100">
        <!-- Sidebar -->
        @include('admin.partials.sidebar')

        <!-- Main Content Area -->
        <div class="d-flex flex-column flex-grow-1 w-100" style="min-width: 0;">
            <!-- Topbar -->
            @include('admin.partials.topbar')

            <!-- Main Page Body -->
            <main class="content flex-grow-1" id="content">
                <!-- Session Alerts -->
                @if(session('success'))
                    <div class="alert alert-success alert-dismissible fade show border-0 d-flex align-items-center gap-2 mb-4" role="alert" style="background: rgba(16, 185, 129, 0.15); border: 1px solid #10B981 !important; color: #10B981;">
                        <i class="ti ti-circle-check fs-4"></i>
                        <div class="fw-semibold">{{ session('success') }}</div>
                        <button type="button" class="btn-close btn-close-white ms-auto" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                @endif

                @if(session('error'))
                    <div class="alert alert-danger alert-dismissible fade show border-0 d-flex align-items-center gap-2 mb-4" role="alert" style="background: rgba(239, 68, 68, 0.15); border: 1px solid #EF4444 !important; color: #EF4444;">
                        <i class="ti ti-alert-circle fs-4"></i>
                        <div class="fw-semibold">{{ session('error') }}</div>
                        <button type="button" class="btn-close btn-close-white ms-auto" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                @endif

                @if($errors->any())
                    <div class="alert alert-warning alert-dismissible fade show border-0 mb-4" role="alert" style="background: rgba(245, 158, 11, 0.15); border: 1px solid #F59E0B !important; color: #F59E0B;">
                        <div class="d-flex align-items-center gap-2 mb-1 fw-bold">
                            <i class="ti ti-alert-triangle fs-4"></i>
                            <span>تنبيه: يرجى مراجعة الأخطاء التالية:</span>
                        </div>
                        <ul class="mb-0 ps-3">
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                        <button type="button" class="btn-close btn-close-white ms-auto" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                @endif

                <!-- Page Header / Breadcrumb if provided -->
                @hasSection('header')
                    <div class="mb-4">
                        @yield('header')
                    </div>
                @endif

                <!-- Page Content -->
                @yield('content')
            </main>

            <!-- Footer -->
            @include('admin.partials.footer')
        </div>
    </div>

    @stack('scripts')
</body>
</html>
