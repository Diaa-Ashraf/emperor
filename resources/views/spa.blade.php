<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>إمبراطور | Emperor Card — شحن ألعاب، بطاقات رقمية وبيع تارجت</title>

    <!-- App Favicon & Mobile Icons -->
    <link rel="icon" type="image/png" sizes="32x32" href="/images/logo.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/images/logo.png">
    <link rel="shortcut icon" href="/favicon.ico">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="manifest" href="/site.webmanifest">

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
<body class="bg-[#070709] text-white font-['Cairo',sans-serif] antialiased selection:bg-[#D4A537] selection:text-[#070709]">
    <div id="app"></div>
</body>
</html>
