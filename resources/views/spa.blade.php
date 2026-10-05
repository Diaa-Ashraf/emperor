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
            site_description: {!! json_encode($siteDesc) !!},
            site_logo: {!! json_encode($siteLogo) !!},
            site_favicon: {!! json_encode($siteFavicon) !!},
            footer_slogan: {!! json_encode(\App\Models\Setting::get('footer_slogan', 'المنصة الرائدة والأولى لشحن الألعاب والبطاقات الرقمية وبيع التارجت بأفضل الأسعار.')) !!},
            whatsapp_support: {!! json_encode(\App\Models\Setting::get('whatsapp_support', '+201000000000')) !!},
            telegram_support: {!! json_encode(\App\Models\Setting::get('telegram_support', 'EmperorSupport')) !!},
            support_email: {!! json_encode(\App\Models\Setting::get('support_email', 'support@emperorcard.com')) !!},
            support_phone: {!! json_encode(\App\Models\Setting::get('support_phone', '')) !!},
            working_hours: {!! json_encode(\App\Models\Setting::get('working_hours', 'على مدار 24 ساعة طوال أيام الأسبوع')) !!},
            social_facebook: {!! json_encode(\App\Models\Setting::get('social_facebook', '')) !!},
            social_instagram: {!! json_encode(\App\Models\Setting::get('social_instagram', '')) !!},
            social_tiktok: {!! json_encode(\App\Models\Setting::get('social_tiktok', '')) !!},
            social_youtube: {!! json_encode(\App\Models\Setting::get('social_youtube', '')) !!},
            social_telegram: {!! json_encode(\App\Models\Setting::get('social_telegram', '')) !!},
            social_discord: {!! json_encode(\App\Models\Setting::get('social_discord', '')) !!},
            announcement_enabled: {!! json_encode(\App\Models\Setting::get('announcement_enabled', '0') == '1') !!},
            announcement_text: {!! json_encode(\App\Models\Setting::get('announcement_text', '')) !!},
            target_agency_id: {!! json_encode(\App\Models\Setting::get('target_agency_id', 'EMP-TARGET-001')) !!},
            target_agency_name: {!! json_encode(\App\Models\Setting::get('target_agency_name', 'وكالة إمبراطور الرسمية')) !!},
            min_wallet_deposit: {!! json_encode((int) \App\Models\Setting::get('min_wallet_deposit', 50)) !!},
            about_us_text: {!! json_encode(\App\Models\Setting::get('about_us_text', '')) !!},
            terms_conditions: {!! json_encode(\App\Models\Setting::get('terms_conditions', '')) !!},
            privacy_policy: {!! json_encode(\App\Models\Setting::get('privacy_policy', '')) !!}
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
