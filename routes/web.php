<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

// Admin Authentication (Web Session)
Route::get('/admin/login', [AuthenticatedSessionController::class, 'create'])->middleware('guest')->name('login');
Route::post('/admin/login', [AuthenticatedSessionController::class, 'store']);

// Admin Profile & Session Actions
Route::middleware(['auth'])->group(function () {
    Route::get('/admin/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/admin/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::put('/admin/password', [PasswordController::class, 'update'])->name('password.update');
    Route::delete('/admin/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/admin/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});

// React SPA catch-all for all client-side routing
Route::get('/{any?}', function () {
    return view('spa');
})->where('any', '^(?!admin(?:/|$)|api(?:/|$)|storage(?:/|$)).*$')->name('spa');
