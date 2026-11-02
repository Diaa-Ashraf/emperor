<?php

use Illuminate\Support\Facades\Route;

$spaResponse = static function (...$routeParameters) {
    return response()->view('spa')->withHeaders([
        'Cache-Control' => 'no-store, no-cache, must-revalidate, max-age=0',
        'Pragma' => 'no-cache',
        'Expires' => 'Thu, 01 Jan 1970 00:00:00 GMT',
    ]);
};

// 1. Force permanent redirect from legacy /admin/login to unified SPA login
Route::any('/admin/login', fn () => redirect('/login', 301));

// 2. Google OAuth Web Routes (Direct browser redirect flow)
Route::get('/auth/google', [\App\Http\Controllers\Api\V1\AuthController::class, 'getGoogleRedirectUrl'])->name('auth.google');
Route::get('/auth/google/callback', [\App\Http\Controllers\Api\V1\AuthController::class, 'handleGoogleCallback'])->name('auth.google.callback');

// 3. Named login route for Laravel auth middleware redirection
Route::get('/login', $spaResponse)->name('login');

// 4. React SPA catch-all for all client-side routing (including SPA /admin/*)
Route::get('/{any?}', $spaResponse)
    ->where('any', '^(?!api(?:/|$)|storage(?:/|$)|legacy-admin(?:/|$)).*$')
    ->name('spa');

