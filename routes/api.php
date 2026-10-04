<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\BannerController;
use App\Http\Controllers\Api\V1\CategoryController;
use App\Http\Controllers\Api\V1\DepositController;
use App\Http\Controllers\Api\V1\NotificationController;
use App\Http\Controllers\Api\V1\OrderController;
use App\Http\Controllers\Api\V1\ProductController;
use App\Http\Controllers\Api\V1\ProfileController;
use App\Http\Controllers\Api\V1\TargetAppController;
use App\Http\Controllers\Api\V1\TargetOrderController;
use App\Http\Controllers\Api\V1\WalletController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes for Emperor Platform (Customer & Public API)
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->middleware(['locale'])->group(function () {
    // Health & Public Info
    Route::get('/ping', function () {
        return response()->json([
            'status' => 'success',
            'message' => 'Emperor API is live and healthy',
            'timestamp' => now()->toIso8601String(),
        ]);
    });

    Route::get('/settings/public', function () {
        $settings = \App\Models\Setting::where('is_public', true)->pluck('value', 'key');
        return response()->json(['status' => 'success', 'data' => $settings]);
    });

    // Public Catalog (2.8)
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{id}', [ProductController::class, 'show']);

    // Public Target Selling Apps & Quotes (4.3)
    Route::get('/target-apps', [TargetAppController::class, 'index']);
    Route::post('/target-apps/quote', [TargetAppController::class, 'quote']);

    // Public Announcements & Banners & Deals (3.3)
    Route::get('/announcements', [BannerController::class, 'index']);
    Route::get('/banners', [BannerController::class, 'index']);
    Route::get('/deals', [BannerController::class, 'deals']);

    // Public Support Contacts (5.2)
    Route::get('/support-contacts', [App\Http\Controllers\Api\V1\SupportContactController::class, 'index']);

    // Public Payment Methods for Deposit
    Route::get('/deposits/methods', [DepositController::class, 'methods']);

    // Public Auth Routes
    Route::prefix('auth')->group(function () {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/login/2fa', [AuthController::class, 'login2FA']);
        Route::post('/login/google', [AuthController::class, 'googleLogin']);
        Route::get('/google/redirect', [AuthController::class, 'getGoogleRedirectUrl']);
        Route::get('/google/callback', [AuthController::class, 'handleGoogleCallback']);
        Route::post('/verify-phone', [AuthController::class, 'verifyPhone']);
    });

    // Protected Customer Routes
    Route::middleware(['auth:sanctum', 'log.api'])->group(function () {
        // Auth session
        Route::post('/auth/logout', [AuthController::class, 'logout']);

        // Profile (1.6)
        Route::get('/profile', [ProfileController::class, 'show']);
        Route::post('/profile', [ProfileController::class, 'update']);
        Route::post('/profile/password', [ProfileController::class, 'updatePassword']);
        Route::put('/profile/complete', [ProfileController::class, 'completeProfile']);
        Route::post('/profile/2fa/enable', [ProfileController::class, 'enable2FA']);
        Route::post('/profile/2fa/verify', [ProfileController::class, 'verify2FA']);
        Route::post('/profile/2fa/disable', [ProfileController::class, 'disable2FA']);
        Route::get('/profile/2fa/recovery-codes', [ProfileController::class, 'recoveryCodes']);
        Route::post('/profile/fcm-token', [ProfileController::class, 'updateFcmToken']);

        // Wallet & Ledger & Multi-Currency (1.7)
        Route::get('/wallet/balance', [WalletController::class, 'balance']);
        Route::get('/wallet/rates', [WalletController::class, 'rates']);
        Route::post('/wallet/preview-conversion', [WalletController::class, 'previewConversion']);
        Route::post('/wallet/convert', [WalletController::class, 'convert']);
        Route::get('/wallet/transactions', [WalletController::class, 'transactions']);

        // Deposit Requests (1.8)
        Route::get('/deposits', [DepositController::class, 'index']);
        Route::post('/deposits', [DepositController::class, 'store']);
        Route::get('/deposits/{id}', [DepositController::class, 'show']);

        // Order Placement & History (2.9)
        Route::get('/orders', [OrderController::class, 'index']);
        Route::post('/orders', [OrderController::class, 'store']);
        Route::get('/orders/{id}', [OrderController::class, 'show']);

        // Target Selling Orders (4.3)
        Route::get('/target-orders', [TargetOrderController::class, 'index']);
        Route::post('/target-orders', [TargetOrderController::class, 'store']);
        Route::get('/target-orders/{id}', [TargetOrderController::class, 'show']);

        // Referrals & Affiliates (5.4)
        Route::get('/referrals/stats', [App\Http\Controllers\Api\V1\ReferralController::class, 'stats']);
        Route::get('/referrals/invited-users', [App\Http\Controllers\Api\V1\ReferralController::class, 'invitedUsers']);

        // User Preferences & Settings (5.5)
        Route::get('/settings/user', [App\Http\Controllers\Api\V1\SettingController::class, 'userSettings']);
        Route::put('/settings/user', [App\Http\Controllers\Api\V1\SettingController::class, 'updateUserSettings']);

        // Customer Notifications (3.3)
        Route::get('/notifications', [NotificationController::class, 'index']);
        Route::get('/notifications/unread-count', [NotificationController::class, 'unreadCount']);
        Route::get('/notifications/check-latest', [NotificationController::class, 'checkLatest']);
        Route::post('/notifications/read-all', [NotificationController::class, 'markAllAsRead']);
        Route::post('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);

        // Developer / B2B Integration (B2B API Management)
        Route::get('/developer/keys', [\App\Http\Controllers\Api\V1\DeveloperApiController::class, 'index']);
        Route::post('/developer/keys/generate', [\App\Http\Controllers\Api\V1\DeveloperApiController::class, 'generateKeys']);
        Route::put('/developer/settings', [\App\Http\Controllers\Api\V1\DeveloperApiController::class, 'updateSettings']);
    });

    // Track C: External Distributor API (Phase 6)
    Route::prefix('external')->middleware(['auth.api_client'])->group(function () {
        // Products Catalog with Client-specific Pricing
        Route::get('/products', [\App\Http\Controllers\Api\V1\External\ProductController::class, 'index']);

        // Orders Management
        Route::post('/orders', [\App\Http\Controllers\Api\V1\External\OrderController::class, 'store']);
        Route::get('/orders/{id}', [\App\Http\Controllers\Api\V1\External\OrderController::class, 'show']);

        // Wallet Balance & Health
        Route::get('/balance', [\App\Http\Controllers\Api\V1\External\BalanceController::class, 'show']);
    });
});

