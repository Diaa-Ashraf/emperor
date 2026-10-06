<?php

use App\Http\Controllers\Admin\CatalogSourceController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\DepositController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\PlaceholderAdminController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ProviderController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'admin.only', 'locale'])->prefix('admin')->name('admin.')->group(function () {
    // Main Dashboard & Analytics Reports
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::get('/reports', [App\Http\Controllers\Admin\ReportController::class, 'index'])->name('reports.index');

    // Categories (2.3)
    Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
    Route::get('/categories/create', [CategoryController::class, 'create'])->name('categories.create');
    Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
    Route::post('/categories/bulk-delete', [CategoryController::class, 'bulkDestroy'])->name('categories.bulk-destroy');
    Route::get('/categories/{id}/edit', [CategoryController::class, 'edit'])->name('categories.edit');
    Route::put('/categories/{id}', [CategoryController::class, 'update'])->name('categories.update');
    Route::post('/categories/{id}/toggle-active', [CategoryController::class, 'toggleActive'])->name('categories.toggle-active');
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy'])->name('categories.destroy');

    Route::get('/categories/{id}', fn($id) => redirect()->route('admin.categories.edit', $id));

    // Products & Tiers (2.4)
    Route::get('/products', [ProductController::class, 'index'])->name('products.index');
    Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
    Route::post('/products', [ProductController::class, 'store'])->name('products.store');
    Route::post('/products/bulk-delete', [ProductController::class, 'bulkDestroy'])->name('products.bulk-destroy');
    Route::get('/products/{id}', fn($id) => redirect()->route('admin.products.edit', $id));
    Route::get('/products/{id}/edit', [ProductController::class, 'edit'])->name('products.edit');
    Route::put('/products/{id}', [ProductController::class, 'update'])->name('products.update');
    Route::post('/products/{id}/toggle-active', [ProductController::class, 'toggleActive'])->name('products.toggle-active');
    Route::delete('/products/{id}', [ProductController::class, 'destroy'])->name('products.destroy');
    Route::get('/products/{id}/providers', [ProductController::class, 'providerMapping'])->name('products.provider-mapping');
    Route::post('/products/{id}/providers', [ProductController::class, 'updateProviderMapping'])->name('products.update-provider-mapping');

    // Vouchers (Digital Codes Inventory)
    Route::get('/vouchers', [\App\Http\Controllers\Admin\VoucherController::class, 'index'])->name('vouchers.index');
    Route::post('/vouchers', [\App\Http\Controllers\Admin\VoucherController::class, 'store'])->name('vouchers.store');
    Route::delete('/vouchers/{id}', [\App\Http\Controllers\Admin\VoucherController::class, 'destroy'])->name('vouchers.destroy');
    Route::post('/vouchers/bulk-delete', [\App\Http\Controllers\Admin\VoucherController::class, 'bulkDestroy'])->name('vouchers.bulk-destroy');

    // Pricing Rules & Strategies
    Route::get('/pricing', [\App\Http\Controllers\Admin\PricingRuleController::class, 'index'])->name('pricing.index');
    Route::post('/pricing', [\App\Http\Controllers\Admin\PricingRuleController::class, 'store'])->name('pricing.store');
    Route::post('/pricing/{id}/toggle-active', [\App\Http\Controllers\Admin\PricingRuleController::class, 'toggleActive'])->name('pricing.toggle-active');
    Route::delete('/pricing/{id}', [\App\Http\Controllers\Admin\PricingRuleController::class, 'destroy'])->name('pricing.destroy');
    Route::post('/pricing/recalculate', [\App\Http\Controllers\Admin\PricingRuleController::class, 'recalculate'])->name('pricing.recalculate');

    // Orders Management (2.5)
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{id}', [OrderController::class, 'show'])->name('orders.show');
    Route::post('/orders/{id}/retry', [OrderController::class, 'retry'])->name('orders.retry');
    Route::post('/orders/{id}/refund', [OrderController::class, 'refund'])->name('orders.refund');

    // Target Selling (Phase 4)
    Route::get('/targets', [App\Http\Controllers\Admin\TargetController::class, 'index'])->name('targets.index');
    Route::get('/targets/apps', [App\Http\Controllers\Admin\TargetController::class, 'apps'])->name('targets.apps');
    Route::post('/targets/apps/{id}/rates', [App\Http\Controllers\Admin\TargetController::class, 'updateRates'])->name('targets.update-rates');
    Route::get('/targets/{id}', [App\Http\Controllers\Admin\TargetController::class, 'show'])->name('targets.show');
    Route::post('/targets/{id}/approve', [App\Http\Controllers\Admin\TargetController::class, 'approve'])->name('targets.approve');
    Route::post('/targets/{id}/reject', [App\Http\Controllers\Admin\TargetController::class, 'reject'])->name('targets.reject');

    // Users & Agents (Phase 1)
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::get('/users/{id}', [UserController::class, 'show'])->name('users.show');
    Route::post('/users/{id}/toggle-ban', [UserController::class, 'toggleBan'])->name('users.toggle-ban');
    Route::post('/users/{id}/toggle-api-access', [UserController::class, 'toggleApiAccess'])->name('users.toggle-api-access');
    Route::post('/users/{id}/adjust-balance', [UserController::class, 'adjustBalance'])->name('users.adjust-balance');

    // Deposits Management (Phase 1)
    Route::get('/deposits', [DepositController::class, 'index'])->name('deposits.index');
    Route::get('/deposits/{id}', [DepositController::class, 'show'])->name('deposits.show');
    Route::post('/deposits/{id}/approve', [DepositController::class, 'approve'])->name('deposits.approve');
    Route::post('/deposits/{id}/reject', [DepositController::class, 'reject'])->name('deposits.reject');

    // Financial & Payment Methods
    Route::get('/withdrawals', [\App\Http\Controllers\Admin\WithdrawalController::class, 'index'])->name('withdrawals.index');
    Route::get('/withdrawals/{id}', [\App\Http\Controllers\Admin\WithdrawalController::class, 'show'])->name('withdrawals.show');
    Route::post('/withdrawals/{id}/approve', [\App\Http\Controllers\Admin\WithdrawalController::class, 'approve'])->name('withdrawals.approve');
    Route::post('/withdrawals/{id}/reject', [\App\Http\Controllers\Admin\WithdrawalController::class, 'reject'])->name('withdrawals.reject');

    Route::get('/payment-methods', [PlaceholderAdminController::class, 'index'])
        ->defaults('title', 'طرق الدفع والحسابات')
        ->defaults('icon', 'ti-credit-card')
        ->defaults('description', 'تهيئة أرقام محافظ الكاش، انستاباي، وعناوين USDT')
        ->name('payment-methods.index');

    // Providers Management (2.2)
    Route::get('/providers', [ProviderController::class, 'index'])->name('providers.index');
    Route::get('/providers/create', [ProviderController::class, 'create'])->name('providers.create');
    Route::post('/providers', [ProviderController::class, 'store'])->name('providers.store');
    Route::get('/providers/{id}/edit', [ProviderController::class, 'edit'])->name('providers.edit');
    Route::put('/providers/{id}', [ProviderController::class, 'update'])->name('providers.update');
    Route::post('/providers/{id}/toggle-active', [ProviderController::class, 'toggleActive'])->name('providers.toggle-active');
    Route::get('/providers/{id}/balance', [ProviderController::class, 'checkBalance'])->name('providers.check-balance');

    // Catalog Sources (2.1)
    Route::get('/catalog-sources', [CatalogSourceController::class, 'index'])->name('catalog-sources.index');
    Route::get('/catalog-sources/create', [CatalogSourceController::class, 'create'])->name('catalog-sources.create');
    Route::post('/catalog-sources', [CatalogSourceController::class, 'store'])->name('catalog-sources.store');
    Route::get('/catalog-sources/{id}/edit', [CatalogSourceController::class, 'edit'])->name('catalog-sources.edit');
    Route::put('/catalog-sources/{id}', [CatalogSourceController::class, 'update'])->name('catalog-sources.update');
    Route::post('/catalog-sources/{id}/sync', [CatalogSourceController::class, 'sync'])->name('catalog-sources.sync');
    Route::get('/catalog-sources/{id}/test', [CatalogSourceController::class, 'testConnection'])->name('catalog-sources.test');

    // CMS & Banners (3.1)
    Route::get('/banners', [App\Http\Controllers\Admin\BannerController::class, 'index'])->name('banners.index');
    Route::get('/banners/create', [App\Http\Controllers\Admin\BannerController::class, 'create'])->name('banners.create');
    Route::post('/banners', [App\Http\Controllers\Admin\BannerController::class, 'store'])->name('banners.store');
    Route::get('/banners/{id}/edit', [App\Http\Controllers\Admin\BannerController::class, 'edit'])->name('banners.edit');
    Route::put('/banners/{id}', [App\Http\Controllers\Admin\BannerController::class, 'update'])->name('banners.update');
    Route::post('/banners/{id}/toggle-active', [App\Http\Controllers\Admin\BannerController::class, 'toggleActive'])->name('banners.toggle-active');
    Route::delete('/banners/{id}', [App\Http\Controllers\Admin\BannerController::class, 'destroy'])->name('banners.destroy');

    Route::get('/settings', [SettingController::class, 'index'])->name('settings.index');
    Route::post('/settings/general', [SettingController::class, 'updateGeneral'])->name('settings.update-general');
    Route::post('/settings/payment-methods/{id}', [SettingController::class, 'updatePaymentMethod'])->name('settings.update-payment-method');

    // Referrals & Affiliates (Phase 5)
    Route::get('/referrals', [App\Http\Controllers\Admin\ReferralController::class, 'index'])->name('referrals.index');
    Route::get('/referrals/settings', [App\Http\Controllers\Admin\ReferralController::class, 'settings'])->name('referrals.settings');
    Route::post('/referrals/settings', [App\Http\Controllers\Admin\ReferralController::class, 'updateSettings'])->name('referrals.update-settings');

    // API Clients & B2B Distribution (Phase 6)
    Route::get('/api-clients', [App\Http\Controllers\Admin\ApiClientController::class, 'index'])->name('api-clients.index');
    Route::get('/api-clients/create', [App\Http\Controllers\Admin\ApiClientController::class, 'create'])->name('api-clients.create');
    Route::post('/api-clients', [App\Http\Controllers\Admin\ApiClientController::class, 'store'])->name('api-clients.store');
    Route::post('/api-clients/{id}/approve', [App\Http\Controllers\Admin\ApiClientController::class, 'approve'])->name('api-clients.approve');
    Route::post('/api-clients/{id}/reject', [App\Http\Controllers\Admin\ApiClientController::class, 'reject'])->name('api-clients.reject');
    Route::get('/api-clients/{id}/edit', [App\Http\Controllers\Admin\ApiClientController::class, 'edit'])->name('api-clients.edit');
    Route::put('/api-clients/{id}', [App\Http\Controllers\Admin\ApiClientController::class, 'update'])->name('api-clients.update');
    Route::post('/api-clients/{id}/toggle-active', [App\Http\Controllers\Admin\ApiClientController::class, 'toggleActive'])->name('api-clients.toggle-active');
    Route::post('/api-clients/{id}/regenerate-credentials', [App\Http\Controllers\Admin\ApiClientController::class, 'regenerateCredentials'])->name('api-clients.regenerate-credentials');
    Route::get('/api-clients/{id}/pricing', [App\Http\Controllers\Admin\ApiClientController::class, 'pricing'])->name('api-clients.pricing');
    Route::post('/api-clients/{id}/pricing', [App\Http\Controllers\Admin\ApiClientController::class, 'updatePricing'])->name('api-clients.update-pricing');
    Route::get('/api-clients/{id}/logs', [App\Http\Controllers\Admin\ApiClientController::class, 'logs'])->name('api-clients.logs');

    // Support Contacts (Phase 5)
    Route::get('/support-contacts', [App\Http\Controllers\Admin\SupportContactController::class, 'index'])->name('support-contacts.index');
    Route::get('/support-contacts/create', [App\Http\Controllers\Admin\SupportContactController::class, 'create'])->name('support-contacts.create');
    Route::post('/support-contacts', [App\Http\Controllers\Admin\SupportContactController::class, 'store'])->name('support-contacts.store');
    Route::get('/support-contacts/{id}/edit', [App\Http\Controllers\Admin\SupportContactController::class, 'edit'])->name('support-contacts.edit');
    Route::put('/support-contacts/{id}', [App\Http\Controllers\Admin\SupportContactController::class, 'update'])->name('support-contacts.update');
    Route::post('/support-contacts/{id}/toggle-active', [App\Http\Controllers\Admin\SupportContactController::class, 'toggleActive'])->name('support-contacts.toggle-active');
    Route::delete('/support-contacts/{id}', [App\Http\Controllers\Admin\SupportContactController::class, 'destroy'])->name('support-contacts.destroy');

    // Audit Logs (Phase 5)
    Route::get('/audit-logs', [App\Http\Controllers\Admin\ActivityLogController::class, 'index'])->name('audit-logs.index');

    // Exchange Rates (Multi-Currency)
    Route::get('/exchange-rates', [App\Http\Controllers\Admin\ExchangeRateController::class, 'index'])->name('exchange-rates.index');
    Route::post('/exchange-rates', [App\Http\Controllers\Admin\ExchangeRateController::class, 'store'])->name('exchange-rates.store');
    Route::post('/exchange-rates/{id}/toggle', [App\Http\Controllers\Admin\ExchangeRateController::class, 'toggle'])->name('exchange-rates.toggle');

    // Notifications & Smart Marketing Campaigns
    Route::get('/notifications', [App\Http\Controllers\Admin\NotificationController::class, 'index'])->name('notifications.index');
    Route::post('/notifications/send', [App\Http\Controllers\Admin\NotificationController::class, 'send'])->name('notifications.send');
    Route::post('/notifications/mark-all-read', [App\Http\Controllers\Admin\NotificationController::class, 'markAllRead'])->name('notifications.mark-all-read');
    Route::post('/notifications/{id}/mark-read', [App\Http\Controllers\Admin\NotificationController::class, 'markRead'])->name('notifications.mark-read');
    Route::get('/notifications-scheduled', [App\Http\Controllers\Admin\ScheduledNotificationController::class, 'index'])->name('notifications.scheduled.index');
    Route::post('/notifications-scheduled', [App\Http\Controllers\Admin\ScheduledNotificationController::class, 'store'])->name('notifications.scheduled.store');
    Route::post('/notifications-scheduled/{id}/send-now', [App\Http\Controllers\Admin\ScheduledNotificationController::class, 'sendNow'])->name('notifications.scheduled.send-now');
    Route::delete('/notifications-scheduled/{id}', [App\Http\Controllers\Admin\ScheduledNotificationController::class, 'destroy'])->name('notifications.scheduled.destroy');

    // Spatie Roles & Permissions Matrix
    Route::resource('roles', App\Http\Controllers\Admin\RoleController::class);

    // Admin & Staff Management (Granular Spatie Permissions)
    Route::post('/admins/{id}/toggle-status', [App\Http\Controllers\Admin\AdminStaffController::class, 'toggleStatus'])->name('admins.toggle-status');
    Route::resource('admins', App\Http\Controllers\Admin\AdminStaffController::class);
});
