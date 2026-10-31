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

Route::prefix('v1')->middleware(['locale', 'throttle:api'])->group(function () {
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
    Route::get('/hero-services', [CategoryController::class, 'heroServices']);
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

    // Public Payment Methods & Supported Countries for Deposit & Financial Services
    Route::get('/deposits/methods', [DepositController::class, 'methods']);
    Route::get('/supported-countries', [DepositController::class, 'supportedCountries']);

    // Public Auth Routes (Guarded with Anti-Brute-Force Rate Limiting)
    Route::prefix('auth')->middleware(['throttle:auth'])->group(function () {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/login/2fa', [AuthController::class, 'login2FA']);
        Route::post('/login/google', [AuthController::class, 'googleLogin']);
        Route::post('/google/demo', [AuthController::class, 'googleDemoLogin']);
        Route::get('/google/redirect', [AuthController::class, 'getGoogleRedirectUrl']);
        Route::get('/google/callback', [AuthController::class, 'handleGoogleCallback']);
        Route::post('/verify-phone', [AuthController::class, 'verifyPhone']);
    });

    // Protected Customer Routes (Guarded with Sanctum & Inactivity Idle Timeout Shield)
    Route::middleware(['auth:sanctum', 'session.idle', 'log.api'])->group(function () {
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
        Route::post('/wallet/convert', [WalletController::class, 'convert'])->middleware('throttle:financial');
        Route::get('/wallet/transactions', [WalletController::class, 'transactions']);

        // Deposit Requests (1.8)
        Route::get('/deposits', [DepositController::class, 'index']);
        Route::post('/deposits', [DepositController::class, 'store'])->middleware('throttle:financial');
        Route::get('/deposits/{id}', [DepositController::class, 'show']);

        // Order Placement & History (2.9)
        Route::get('/orders', [OrderController::class, 'index']);
        Route::post('/orders', [OrderController::class, 'store'])->middleware('throttle:financial');
        Route::get('/orders/{id}', [OrderController::class, 'show']);

        // Target Selling Orders (4.3)
        Route::get('/target-orders', [TargetOrderController::class, 'index']);
        Route::post('/target-orders', [TargetOrderController::class, 'store'])->middleware('throttle:financial');
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
        Route::post('/developer/request-access', [\App\Http\Controllers\Api\V1\DeveloperApiController::class, 'requestAccess']);
        Route::post('/developer/keys/generate', [\App\Http\Controllers\Api\V1\DeveloperApiController::class, 'generateKeys']);
        Route::put('/developer/settings', [\App\Http\Controllers\Api\V1\DeveloperApiController::class, 'updateSettings']);
    });

    // Track C: External Distributor & B2B Reseller API (Supports both /external and /reseller prefixes)
    foreach (['external', 'reseller'] as $prefix) {
        Route::prefix($prefix)->middleware(['auth.api_client'])->group(function () {
            // Products Catalog with Client-specific Pricing & Dynamic Fields
            Route::get('/products', [\App\Http\Controllers\Api\V1\External\ProductController::class, 'index']);

            // Orders Management
            Route::get('/orders', [\App\Http\Controllers\Api\V1\External\OrderController::class, 'index']);
            Route::post('/orders', [\App\Http\Controllers\Api\V1\External\OrderController::class, 'store']);
            Route::get('/orders/{id}', [\App\Http\Controllers\Api\V1\External\OrderController::class, 'show']);

            // Wallet Balance & Health
            Route::get('/balance', [\App\Http\Controllers\Api\V1\External\BalanceController::class, 'show']);
        });
    }

    // Track D: Unified Admin SPA Endpoints (Guarded with Sanctum & Admin Access)
    Route::prefix('admin')->middleware(['auth:sanctum'])->group(function () {
        Route::middleware([\App\Http\Middleware\AdminApiGuard::class])->group(function () {
            // Dashboard stats
            Route::get('/dashboard/stats', [\App\Http\Controllers\Api\V1\Admin\AdminDashboardController::class, 'stats']);

            // Wallet operations
            Route::get('/wallet/summary', [\App\Http\Controllers\Api\V1\Admin\AdminWalletController::class, 'summary']);
            Route::get('/wallet/transactions', [\App\Http\Controllers\Api\V1\Admin\AdminWalletController::class, 'transactions']);
            Route::post('/wallet/adjust', [\App\Http\Controllers\Api\V1\Admin\AdminWalletController::class, 'adjustBalance']);
            Route::post('/wallet/settings', [\App\Http\Controllers\Api\V1\Admin\AdminWalletController::class, 'updateSettings']);

            // Users management
            Route::get('/users/ledger', [\App\Http\Controllers\Api\V1\Admin\AdminUserController::class, 'ledger']);
            Route::get('/users/{id}/ledger', [\App\Http\Controllers\Api\V1\Admin\AdminUserController::class, 'ledger']);
            Route::get('/users', [\App\Http\Controllers\Api\V1\Admin\AdminUserController::class, 'index']);
            Route::get('/users/{id}', [\App\Http\Controllers\Api\V1\Admin\AdminUserController::class, 'show']);
            Route::post('/users/{id}/balance', [\App\Http\Controllers\Api\V1\Admin\AdminUserController::class, 'adjustBalance']);
            Route::post('/users/{id}/set-balance', [\App\Http\Controllers\Api\V1\Admin\AdminUserController::class, 'setBalance']);
            Route::post('/users/{id}/status', [\App\Http\Controllers\Api\V1\Admin\AdminUserController::class, 'updateStatus']);
            Route::post('/users/{id}/settings', [\App\Http\Controllers\Api\V1\Admin\AdminUserController::class, 'updateSettings']);
            Route::post('/users/{id}/toggle-api', [\App\Http\Controllers\Api\V1\Admin\AdminUserController::class, 'toggleApiAccess']);

            // Staff & Supervisors Management (Matching Screenshots 3 & 4)
            Route::get('/staff', [\App\Http\Controllers\Api\V1\Admin\AdminStaffController::class, 'index']);
            Route::post('/staff', [\App\Http\Controllers\Api\V1\Admin\AdminStaffController::class, 'store']);
            Route::post('/staff/{id}', [\App\Http\Controllers\Api\V1\Admin\AdminStaffController::class, 'update']);
            Route::post('/staff/{id}/permissions', [\App\Http\Controllers\Api\V1\Admin\AdminStaffController::class, 'updatePermissions']);
            Route::post('/staff/{id}/toggle-status', [\App\Http\Controllers\Api\V1\Admin\AdminStaffController::class, 'toggleStatus']);
            Route::delete('/staff/{id}', [\App\Http\Controllers\Api\V1\Admin\AdminStaffController::class, 'destroy']);

            // Rewards & Referral System (Matching Screenshot 5)
            Route::get('/referrals', [\App\Http\Controllers\Api\V1\Admin\AdminReferralController::class, 'index']);
            Route::post('/referrals/rate', [\App\Http\Controllers\Api\V1\Admin\AdminReferralController::class, 'updateRate']);

            // Deposits management
            Route::get('/deposits', [\App\Http\Controllers\Api\V1\Admin\AdminDepositController::class, 'index']);
            Route::get('/deposits/{id}', [\App\Http\Controllers\Api\V1\Admin\AdminDepositController::class, 'show']);
            Route::post('/deposits/{id}/approve', [\App\Http\Controllers\Api\V1\Admin\AdminDepositController::class, 'approve']);
            Route::post('/deposits/{id}/reject', [\App\Http\Controllers\Api\V1\Admin\AdminDepositController::class, 'reject']);

            // Target cashout management
            Route::get('/targets/apps', [\App\Http\Controllers\Api\V1\Admin\AdminTargetController::class, 'apps']);
            Route::post('/targets/apps/save/{id?}', [\App\Http\Controllers\Api\V1\Admin\AdminTargetController::class, 'saveApp']);
            Route::delete('/targets/apps/{id}', [\App\Http\Controllers\Api\V1\Admin\AdminTargetController::class, 'deleteApp']);
            Route::post('/targets/apps/{id}/toggle', [\App\Http\Controllers\Api\V1\Admin\AdminTargetController::class, 'toggleApp']);
            Route::get('/targets', [\App\Http\Controllers\Api\V1\Admin\AdminTargetController::class, 'index']);
            Route::get('/targets/{id}', [\App\Http\Controllers\Api\V1\Admin\AdminTargetController::class, 'show']);
            Route::post('/targets/{id}/approve', [\App\Http\Controllers\Api\V1\Admin\AdminTargetController::class, 'approve']);
            Route::post('/targets/{id}/reject', [\App\Http\Controllers\Api\V1\Admin\AdminTargetController::class, 'reject']);

            // Orders management
            Route::get('/orders', [\App\Http\Controllers\Api\V1\Admin\AdminOrderController::class, 'index']);
            Route::get('/orders/{id}', [\App\Http\Controllers\Api\V1\Admin\AdminOrderController::class, 'show']);
            Route::post('/orders/{id}/status', [\App\Http\Controllers\Api\V1\Admin\AdminOrderController::class, 'updateStatus']);
            Route::post('/orders/{id}/retry', [\App\Http\Controllers\Api\V1\Admin\AdminOrderController::class, 'retry']);
            Route::post('/orders/{id}/sync', [\App\Http\Controllers\Api\V1\Admin\AdminOrderController::class, 'retry']);

            // Customer Groups / Pricing Tiers (Matching Screenshots 1 & 2)
            Route::get('/pricing-tiers', [\App\Http\Controllers\Api\V1\Admin\AdminPricingTierController::class, 'index']);
            Route::post('/pricing-tiers', [\App\Http\Controllers\Api\V1\Admin\AdminPricingTierController::class, 'store']);
            Route::post('/pricing-tiers/{id}', [\App\Http\Controllers\Api\V1\Admin\AdminPricingTierController::class, 'update']);
            Route::post('/pricing-tiers/{id}/transfer', [\App\Http\Controllers\Api\V1\Admin\AdminPricingTierController::class, 'transfer']);
            Route::delete('/pricing-tiers/{id}', [\App\Http\Controllers\Api\V1\Admin\AdminPricingTierController::class, 'destroy']);

            // Products & Categories / Catalog (Matching Screenshots 3 & 4)
            Route::get('/categories', [\App\Http\Controllers\Api\V1\Admin\AdminCategoryController::class, 'index']);
            Route::post('/categories', [\App\Http\Controllers\Api\V1\Admin\AdminCategoryController::class, 'store']);
            Route::post('/categories/reorder', [\App\Http\Controllers\Api\V1\Admin\AdminCategoryController::class, 'reorder']);
            Route::post('/categories/{id}', [\App\Http\Controllers\Api\V1\Admin\AdminCategoryController::class, 'update']);
            Route::delete('/categories/{id}', [\App\Http\Controllers\Api\V1\Admin\AdminCategoryController::class, 'destroy']);
            Route::get('/products', [\App\Http\Controllers\Api\V1\Admin\AdminProductController::class, 'index']);
            Route::get('/products/provider-catalog', [\App\Http\Controllers\Api\V1\Admin\AdminProductController::class, 'providerCatalog']);
            Route::get('/products/{id}', [\App\Http\Controllers\Api\V1\Admin\AdminProductController::class, 'show']);
            Route::post('/products/{id}/toggle-active', [\App\Http\Controllers\Api\V1\Admin\AdminProductController::class, 'toggleActive']);
            Route::post('/products/save/{id?}', [\App\Http\Controllers\Api\V1\Admin\AdminProductController::class, 'save']);
            Route::delete('/products/{id}', [\App\Http\Controllers\Api\V1\Admin\AdminProductController::class, 'destroy']);

            // Staff & Supervisor Activity Logs (Matching Screenshot 5)
            Route::get('/activity-logs', [\App\Http\Controllers\Api\V1\Admin\AdminActivityLogController::class, 'index']);

            // Providers & Payment Methods
            Route::get('/providers', [\App\Http\Controllers\Api\V1\Admin\AdminProviderController::class, 'providers']);
            Route::post('/providers', [\App\Http\Controllers\Api\V1\Admin\AdminProviderController::class, 'store']);
            Route::delete('/providers/{id}', [\App\Http\Controllers\Api\V1\Admin\AdminProviderController::class, 'destroy']);
            Route::post('/providers/{id}/check-balance', [\App\Http\Controllers\Api\V1\Admin\AdminProviderController::class, 'checkBalance']);
            Route::post('/providers/{id}/toggle', [\App\Http\Controllers\Api\V1\Admin\AdminProviderController::class, 'toggleProvider']);
            // Payment Methods & Groups Management (Matching Screenshots 3, 4, 5)
            Route::get('/payment-methods', [\App\Http\Controllers\Api\V1\Admin\AdminPaymentMethodController::class, 'index']);
            Route::post('/payment-methods', [\App\Http\Controllers\Api\V1\Admin\AdminPaymentMethodController::class, 'storeMethod']);
            Route::post('/payment-methods/{id}', [\App\Http\Controllers\Api\V1\Admin\AdminPaymentMethodController::class, 'updateMethod']);
            Route::post('/payment-methods/{id}/toggle', [\App\Http\Controllers\Api\V1\Admin\AdminPaymentMethodController::class, 'toggleMethod']);
            Route::delete('/payment-methods/demo-cleanup', [\App\Http\Controllers\Api\V1\Admin\AdminPaymentMethodController::class, 'deleteDemoMethods']);
            Route::delete('/payment-methods/{id}', [\App\Http\Controllers\Api\V1\Admin\AdminPaymentMethodController::class, 'destroyMethod']);

            Route::post('/payment-groups', [\App\Http\Controllers\Api\V1\Admin\AdminPaymentMethodController::class, 'storeGroup']);
            Route::delete('/payment-groups/{id}', [\App\Http\Controllers\Api\V1\Admin\AdminPaymentMethodController::class, 'destroyGroup']);

            // System Settings Management
            Route::get('/settings', [\App\Http\Controllers\Api\V1\Admin\AdminSettingController::class, 'index']);
            Route::post('/settings', [\App\Http\Controllers\Api\V1\Admin\AdminSettingController::class, 'update']);
        });
    });
});

