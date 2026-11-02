@php
    $siteLogo = \App\Models\Setting::get('site_logo') ?: '/images/mohra_sand_logo.png';
    $siteFavicon = \App\Models\Setting::get('site_favicon') ?: ($siteLogo ?: '/images/mohra_sand_logo.png');
    $siteName = \App\Models\Setting::get('site_name', 'سند ومهره كارد');
    $siteDesc = \App\Models\Setting::get('site_description', 'خدماتك الرقمية والمالية في مكان واحد');
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
    <script>
        (function() {
            try {
                var savedTheme = localStorage.getItem('emperor_theme') || 'light';
                if (savedTheme === 'light') {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                    document.documentElement.setAttribute('data-theme', 'light');
                } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                    document.documentElement.setAttribute('data-theme', 'dark');
                }
            } catch (e) {}
        })();
    </script>

    <script>
        window.__APP_SETTINGS__ = {
            site_name: {!! json_encode($siteName) !!},
            site_description: {!! json_encode($siteDesc) !!},
            site_logo: {!! json_encode($siteLogo) !!},
            site_favicon: {!! json_encode($siteFavicon) !!},
            footer_slogan: {!! json_encode(\App\Models\Setting::get('footer_slogan', 'المنصة الرائدة والأولى لشحن الألعاب والبطاقات الرقمية وبيع التارجت بأفضل الأسعار.')) !!},
            whatsapp_support: {!! json_encode(\App\Models\Setting::get('whatsapp_support', '+201002575638')) !!},
            whatsapp_channel: {!! json_encode(\App\Models\Setting::get('whatsapp_channel', 'https://whatsapp.com/channel/0029VbDuIu76mYPJomZfr72N')) !!},
            support_email: {!! json_encode(\App\Models\Setting::get('support_email', 'support@emperorcard.com')) !!},
            support_phone: {!! json_encode(\App\Models\Setting::get('support_phone', '')) !!},
            working_hours: {!! json_encode(\App\Models\Setting::get('working_hours', 'على مدار 24 ساعة طوال أيام الأسبوع')) !!},
            social_facebook: {!! json_encode(\App\Models\Setting::get('social_facebook', '')) !!},
            social_instagram: {!! json_encode(\App\Models\Setting::get('social_instagram', '')) !!},
            social_tiktok: {!! json_encode(\App\Models\Setting::get('social_tiktok', '')) !!},
            social_youtube: {!! json_encode(\App\Models\Setting::get('social_youtube', '')) !!},
            social_discord: {!! json_encode(\App\Models\Setting::get('social_discord', '')) !!},
            announcement_enabled: {!! json_encode(\App\Models\Setting::get('announcement_enabled', '0') == '1') !!},
            announcement_text: {!! json_encode(\App\Models\Setting::get('announcement_text', '')) !!},
            target_agency_id: {!! json_encode(\App\Models\Setting::get('target_agency_id', 'EMP-TARGET-001')) !!},
            target_agency_name: {!! json_encode(\App\Models\Setting::get('target_agency_name', 'وكالة سند ومهره الرسمية')) !!},
            min_wallet_deposit: {!! json_encode((int) \App\Models\Setting::get('min_wallet_deposit', 50)) !!},
            hero_services: {!! json_encode(\App\Models\Setting::get('hero_services')) !!},
            about_us_text: {!! json_encode(\App\Models\Setting::get('about_us_text', '')) !!},
            terms_conditions: {!! json_encode(\App\Models\Setting::get('terms_conditions', '')) !!},
            privacy_policy: {!! json_encode(\App\Models\Setting::get('privacy_policy', '')) !!},
            google_client_id: {!! json_encode(config('services.google.client_id')) !!}
        };
    </script>

    @if (auth()->check())
    @php
        $authUser = auth()->user();
        $authUserData = (new \App\Http\Resources\UserResource($authUser))->resolve();
        $authToken = $authUser->createToken('spa_session')->plainTextToken;
    @endphp
    <script>
        window.__AUTH_USER__ = {!! json_encode($authUserData) !!};
        window.__AUTH_TOKEN__ = {!! json_encode($authToken) !!};
        try {
            localStorage.setItem('emperor_token', {!! json_encode($authToken) !!});
            localStorage.setItem('emperor_user', JSON.stringify({!! json_encode($authUserData) !!}));
            localStorage.setItem('emperor_last_activity', Date.now().toString());
        } catch(e) {}
    </script>
    @endif

    <!-- Google Identity Services (One Tap & Sign In SDK) -->
    <script src="https://accounts.google.com/gsi/client" async defer></script>

    <!-- Mobile Web App Metas -->
    <meta name="theme-color" content="#070709">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="سند ومهره كارد">
    <meta name="application-name" content="سند ومهره كارد">

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
