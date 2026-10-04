<?php

namespace Tests\Feature;

use App\Enums\DepositStatus;
use App\Enums\OrderStatus;
use App\Enums\PaymentStatus;
use App\Enums\ProductType;
use App\Enums\TargetOrderStatus;
use App\Enums\TransactionType;
use App\Enums\UserRole;
use App\Enums\UserStatus;
use App\Enums\WalletTxType;
use App\Models\Category;
use App\Models\DepositRequest;
use App\Models\Order;
use App\Models\PaymentMethod;
use App\Models\Product;
use App\Models\ProductTier;
use App\Models\Provider;
use App\Models\Setting;
use App\Models\SupportContact;
use App\Models\TargetRate;
use App\Models\TargetSellOrder;
use App\Models\User;
use App\Models\Wallet;
use App\Models\WalletTransaction;
use App\Services\WalletService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class ComprehensiveSystemAuditTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;
    protected User $customer;
    protected WalletService $walletService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->walletService = app(WalletService::class);

        // Create Admin
        $this->admin = User::create([
            'name' => 'Emperor Super Admin',
            'email' => 'audit_admin@emperor.test',
            'phone' => '01000000001',
            'role' => UserRole::ADMIN->value,
            'status' => UserStatus::ACTIVE,
            'password' => Hash::make('password123'),
            'balance' => 10000,
            'is_active' => true,
        ]);

        // Create Customer
        $this->customer = User::create([
            'name' => 'Audited Customer',
            'email' => 'audit_customer@emperor.test',
            'phone' => '01000000002',
            'role' => UserRole::CUSTOMER->value,
            'status' => UserStatus::ACTIVE,
            'password' => Hash::make('password123'),
            'balance' => 500,
            'is_active' => true,
        ]);

        $this->walletService->getOrCreateWallet($this->customer, 'EGP');
        $this->walletService->credit($this->customer, 500, WalletTxType::DEPOSIT, 'Initial Audit Balance', 'EGP');
    }

    /** 2.1 - 2.15: Admin Dashboard Audit */
    public function test_admin_dashboard_and_kpis()
    {
        $response = $this->actingAs($this->admin)->get(route('admin.dashboard'));
        $response->assertStatus(200);
        $response->assertSee('لوحة التحكم الرئيسية');
    }

    public function test_admin_settings_page_and_update()
    {
        $response = $this->actingAs($this->admin)->get(route('admin.settings.index'));
        $response->assertStatus(200);

        // Update settings
        $updateResp = $this->actingAs($this->admin)->post(route('admin.settings.update-general'), [
            'site_name' => 'منصة إمبراطور للشحن',
            'site_description' => 'أفضل منصة شحن رقمي',
            'default_currency' => 'EGP',
        ]);
        $updateResp->assertRedirect();
    }

    public function test_admin_categories_crud()
    {
        $response = $this->actingAs($this->admin)->get(route('admin.categories.index'));
        $response->assertStatus(200);

        $cat = Category::create([
            'name' => 'قسم تجريبي للتدقيق',
            'slug' => 'audit-category-' . uniqid(),
            'is_active' => true,
            'sort_order' => 99,
        ]);

        $this->assertDatabaseHas('categories', ['id' => $cat->id]);
    }

    public function test_admin_providers_and_catalog()
    {
        $response = $this->actingAs($this->admin)->get(route('admin.providers.index'));
        $response->assertStatus(200);

        $provider = Provider::create([
            'name' => 'Manual Test Provider',
            'driver' => 'manual',
            'balance' => 1000,
            'balance_currency' => 'EGP',
            'is_active' => true,
        ]);

        $balanceResp = $this->actingAs($this->admin)->get(route('admin.providers.check-balance', $provider->id));
        $balanceResp->assertStatus(200);
    }

    public function test_admin_products_and_packages()
    {
        $response = $this->actingAs($this->admin)->get(route('admin.products.index'));
        $response->assertStatus(200);

        $cat = Category::create([
            'name' => 'ألعاب',
            'slug' => 'games-' . uniqid(),
            'is_active' => true,
        ]);

        $product = Product::create([
            'category_id' => $cat->id,
            'name' => 'منتج تدقيق',
            'slug' => 'audit-product-' . uniqid(),
            'type' => ProductType::PLAYER_ID,
            'is_active' => true,
        ]);

        $tier = ProductTier::create([
            'product_id' => $product->id,
            'name' => '100 جوهرة',
            'cost_price' => 10,
            'price_egp' => 15,
            'is_active' => true,
        ]);

        $this->assertDatabaseHas('product_tiers', ['id' => $tier->id]);
    }

    public function test_admin_deposits_management()
    {
        $response = $this->actingAs($this->admin)->get(route('admin.deposits.index'));
        $response->assertStatus(200);

        $pm = PaymentMethod::create([
            'name' => 'Vodafone Cash',
            'code' => 'vodafone_cash_' . uniqid(),
            'type' => 'manual',
            'currency' => 'EGP',
            'is_active' => true,
            'min_amount' => 10,
            'max_amount' => 10000,
            'account_details' => ['phone' => '01012345678'],
        ]);

        $deposit = DepositRequest::create([
            'user_id' => $this->customer->id,
            'payment_method_id' => $pm->id,
            'amount' => 100,
            'fee' => 0,
            'final_amount' => 100,
            'currency' => 'EGP',
            'sender_account' => '01099999999',
            'transaction_reference' => 'REF-' . uniqid(),
            'status' => DepositStatus::PENDING,
        ]);

        $wallet = $this->walletService->getOrCreateWallet($this->customer, 'EGP');
        $initBalance = (float) $wallet->fresh()->balance;

        // Approve deposit
        $approveResp = $this->actingAs($this->admin)->post(route('admin.deposits.approve', $deposit->id));
        $approveResp->assertRedirect();

        $this->assertEquals(DepositStatus::APPROVED, $deposit->fresh()->status);
        $this->assertEquals($initBalance + 100, (float) $wallet->fresh()->balance);
    }

    public function test_admin_users_and_balance_adjustment()
    {
        $response = $this->actingAs($this->admin)->get(route('admin.users.index'));
        $response->assertStatus(200);

        $wallet = $this->walletService->getOrCreateWallet($this->customer, 'EGP');
        $initBalance = (float) $wallet->fresh()->balance;

        // Adjust balance
        $adjustResp = $this->actingAs($this->admin)->post(route('admin.users.adjust-balance', $this->customer->id), [
            'type' => 'credit',
            'amount' => 50,
            'currency' => 'EGP',
            'notes' => 'Audit Bonus',
        ]);
        $adjustResp->assertRedirect();

        $this->assertEquals($initBalance + 50, (float) $wallet->fresh()->balance);

        // Toggle ban
        $banResp = $this->actingAs($this->admin)->post(route('admin.users.toggle-ban', $this->customer->id));
        $banResp->assertRedirect();
        $this->assertEquals(UserStatus::BANNED, $this->customer->fresh()->status);

        // Unban
        $this->actingAs($this->admin)->post(route('admin.users.toggle-ban', $this->customer->id));
        $this->assertEquals(UserStatus::ACTIVE, $this->customer->fresh()->status);
    }

    public function test_admin_target_apps_and_orders()
    {
        $response = $this->actingAs($this->admin)->get(route('admin.targets.apps'));
        $response->assertStatus(200);

        $cat = Category::create(['name' => 'تطبيقات تارجت', 'slug' => 'target-apps-' . uniqid(), 'is_active' => true]);
        $product = Product::create([
            'category_id' => $cat->id,
            'name' => 'TikTok Target',
            'slug' => 'tiktok-' . uniqid(),
            'type' => ProductType::TARGET,
            'is_active' => true,
        ]);

        $this->assertDatabaseHas('products', ['id' => $product->id]);
    }

    /** 3.1 - 3.11: Customer Storefront APIs Audit */
    public function test_storefront_auth_and_profile_api()
    {
        // Login API
        $loginResp = $this->postJson('/api/v1/auth/login', [
            'email' => 'audit_customer@emperor.test',
            'password' => 'password123',
        ]);
        $loginResp->assertStatus(200);
        $token = $loginResp->json('token') ?? $loginResp->json('data.token');
        $this->assertNotEmpty($token);

        // Profile API
        $profileResp = $this->withHeader('Authorization', 'Bearer ' . $token)->getJson('/api/v1/profile');
        $profileResp->assertStatus(200);
    }

    public function test_storefront_home_and_catalog_apis()
    {
        $catResp = $this->getJson('/api/v1/categories');
        $catResp->assertStatus(200);

        $bannersResp = $this->getJson('/api/v1/banners');
        $bannersResp->assertStatus(200);

        $dealsResp = $this->getJson('/api/v1/deals');
        $dealsResp->assertStatus(200);

        $prodResp = $this->getJson('/api/v1/products');
        $prodResp->assertStatus(200);
    }

    public function test_storefront_purchase_flow_and_ledger()
    {
        $cat = Category::create(['name' => 'Cat', 'slug' => 'test-cat-' . uniqid(), 'is_active' => true]);
        $product = Product::create([
            'category_id' => $cat->id,
            'name' => 'PUBG Mobile',
            'slug' => 'pubg-' . uniqid(),
            'type' => ProductType::PLAYER_ID,
            'is_active' => true,
        ]);
        $tier = ProductTier::create([
            'product_id' => $product->id,
            'name' => '60 UC',
            'sku' => '60_uc',
            'source_cost' => 20,
            'final_price' => 30,
            'price_strategy' => \App\Enums\PriceStrategy::MANUAL,
            'in_stock' => true,
            'is_active' => true,
        ]);

        $wallet = $this->walletService->getOrCreateWallet($this->customer, 'EGP');
        $token = $this->customer->createToken('audit_token')->plainTextToken;

        $orderResp = $this->withHeader('Authorization', 'Bearer ' . $token)->postJson('/api/v1/orders', [
            'product_id' => $product->id,
            'product_tier_id' => $tier->id,
            'quantity' => 1,
            'player_id' => '512345678',
        ]);

        $orderResp->assertStatus(201);

        // Verify balance was deducted (500 - 30 = 470)
        $this->assertEquals(470, (float) $wallet->fresh()->balance);

        // Verify ledger transaction was recorded
        $this->assertDatabaseHas('wallet_transactions', [
            'user_id' => $this->customer->id,
            'type' => WalletTxType::ORDER_PAYMENT->value,
        ]);
    }

    public function test_storefront_wallet_and_notifications_apis()
    {
        $token = $this->customer->createToken('audit_token_2')->plainTextToken;

        $walletResp = $this->withHeader('Authorization', 'Bearer ' . $token)->getJson('/api/v1/wallet/transactions');
        $walletResp->assertStatus(200);

        $notifResp = $this->withHeader('Authorization', 'Bearer ' . $token)->getJson('/api/v1/notifications');
        $notifResp->assertStatus(200);

        $readAllResp = $this->withHeader('Authorization', 'Bearer ' . $token)->postJson('/api/v1/notifications/read-all');
        $readAllResp->assertStatus(200);
    }

    public function test_admin_orders_refund_flow()
    {
        $cat = Category::create(['name' => 'Cat', 'slug' => 'test-refund-cat-' . uniqid(), 'is_active' => true]);
        $product = Product::create([
            'category_id' => $cat->id,
            'name' => 'PUBG Refund',
            'slug' => 'pubg-refund-' . uniqid(),
            'type' => ProductType::PLAYER_ID,
            'is_active' => true,
        ]);
        $tier = ProductTier::create([
            'product_id' => $product->id,
            'name' => '60 UC',
            'sku' => '60_uc_refund',
            'source_cost' => 20,
            'final_price' => 30,
            'price_strategy' => \App\Enums\PriceStrategy::MANUAL,
            'in_stock' => true,
            'is_active' => true,
        ]);

        $wallet = $this->walletService->getOrCreateWallet($this->customer, 'EGP');
        $wallet->update(['balance' => 470]);

        $order = Order::create([
            'user_id' => $this->customer->id,
            'product_id' => $product->id,
            'product_tier_id' => $tier->id,
            'quantity' => 1,
            'unit_price' => 30,
            'total_amount' => 30,
            'currency' => 'EGP',
            'cost_amount' => 20,
            'profit_amount' => 10,
            'status' => OrderStatus::FAILED,
        ]);

        $refundResp = $this->actingAs($this->admin)->post(route('admin.orders.refund', $order->id), [
            'reason' => 'تعويض يدوي للعميل',
        ]);
        $refundResp->assertRedirect();

        $this->assertEquals(OrderStatus::REFUNDED, $order->fresh()->status);
        $this->assertEquals(500, (float) $wallet->fresh()->balance);
    }

    public function test_admin_target_sell_order_approve_flow()
    {
        $cat = Category::create(['name' => 'Target Cat', 'slug' => 'target-sell-cat-' . uniqid(), 'is_active' => true]);
        $product = Product::create([
            'category_id' => $cat->id,
            'name' => 'Likee Live',
            'slug' => 'likee-' . uniqid(),
            'type' => ProductType::TARGET,
            'is_active' => true,
        ]);

        $wallet = $this->walletService->getOrCreateWallet($this->customer, 'EGP');
        $initBalance = (float) $wallet->fresh()->balance;

        $targetOrder = TargetSellOrder::create([
            'user_id' => $this->customer->id,
            'product_id' => $product->id,
            'app_user_id' => '12345678',
            'app_username' => 'EmperorHost',
            'agency_id' => 'EMP-AGENCY-777',
            'target_points' => 1000,
            'rate_per_point' => 0.1,
            'gross_amount' => 100,
            'fee' => 0,
            'net_payout' => 100,
            'currency' => 'EGP',
            'status' => TargetOrderStatus::PENDING,
        ]);

        $approveResp = $this->actingAs($this->admin)->post(route('admin.targets.approve', $targetOrder->id));
        $approveResp->assertRedirect();

        $this->assertEquals(TargetOrderStatus::PAID, $targetOrder->fresh()->status);
        $this->assertEquals($initBalance + 100, (float) $wallet->fresh()->balance);
    }

    public function test_admin_banners_and_support_contacts()
    {
        $bannerResp = $this->actingAs($this->admin)->get(route('admin.banners.index'));
        $bannerResp->assertStatus(200);

        $supportResp = $this->actingAs($this->admin)->get(route('admin.support-contacts.index'));
        $supportResp->assertStatus(200);
    }

    public function test_admin_referrals_and_developer_api()
    {
        $refResp = $this->actingAs($this->admin)->get(route('admin.referrals.index'));
        $refResp->assertStatus(200);

        $apiClientsResp = $this->actingAs($this->admin)->get(route('admin.api-clients.index'));
        $apiClientsResp->assertStatus(200);

        $auditResp = $this->actingAs($this->admin)->get(route('admin.audit-logs.index'));
        $auditResp->assertStatus(200);
    }
}
