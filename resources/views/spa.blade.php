@php
    $siteLogo = \App\Models\Setting::get('site_logo') ?: '/images/logo.png';
    $siteFavicon = \App\Models\Setting::get('site_favicon') ?: ($siteLogo ?: '/images/logo.png');
    $siteName = \App\Models\Setting::get('site_name', 'إمبراطور | Emperor Card');
    $siteDesc = \App\Models\Setting::get('site_description', 'شحن ألعاب، بطاقات رقمية وبيع تارجت');
@endphp
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ $siteName }} — {{ $siteDesc }}</title>

    <!-- App Favicon & Mobile Icons -->
    <link rel="icon" type="image/png" sizes="32x32" href="{{ $siteFavicon }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ $siteFavicon }}">
    <link rel="shortcut icon" href="{{ $siteFavicon }}">
    <link rel="apple-touch-icon" sizes="180x180" href="{{ $siteFavicon }}">
    <link rel="manifest" href="/site.webmanifest">

    <script>
        window.__APP_SETTINGS__ = {
            site_name: {!! json_encode($siteName) !!},
            site_logo: {!! json_encode($siteLogo) !!},
            site_favicon: {!! json_encode($siteFavicon) !!},
            whatsapp_support: {!! json_encode(\App\Models\Setting::get('whatsapp_support', '+201000000000')) !!},
            telegram_support: {!! json_encode(\App\Models\Setting::get('telegram_support', 'EmperorSupport')) !!}
        };
    </script>

    <!-- Mobile Web App Metas -->
    <meta name="theme-color" content="#070709">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="EMPEROR">
    <meta name="application-name" content="EMPEROR CARD">

    <!-- Google Font Cairo -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body class="font-['Cairo',sans-serif] antialiased">
    <div id="app"></div>
</body>
</html>
