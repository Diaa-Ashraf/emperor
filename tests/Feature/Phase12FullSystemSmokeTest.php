<?php

namespace Tests\Feature;

use App\Adapters\Providers\HalaAdapter;
use App\Enums\OrderStatus;
use App\Enums\ProductType;
use App\Enums\TargetOrderStatus;
use App\Enums\UserRole;
use App\Enums\WalletTxType;
use App\Events\DepositApproved;
use App\Events\OrderCompleted;
use App\Jobs\DispatchWebhookJob;
use App\Models\Category;
use App\Models\DepositRequest;
use App\Models\Order;
use App\Models\PaymentMethod;
use App\Models\Product;
use App\Models\ProductProvider;
use App\Models\ProductTier;
use App\Models\Provider;
use App\Models\Setting;
use App\Models\TargetRate;
use App\Models\TargetSellOrder;
use App\Models\User;
use App\Models\Wallet;
use App\Services\OrderService;
use App\Services\TargetSellingService;
use App\Services\TwoFactorService;
use App\Services\WalletService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Queue;
use Tests\TestCase;

class Phase12FullSystemSmokeTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;
    protected User $referrer;
    protected Category $category;
    protected Product $product;
    protected ProductTier $tier;
    protected TargetRate $targetRate;
    protected PaymentMethod $paymentMethod;

    protected function setUp(): void
    {
        parent::setUp();

        // 1. Settings & Referral setup
        Setting::set('referral_percentage', 5.0);
        Setting::set('platform_name', 'Emperor Platform');

        // 2. Admin user
        $this->admin = User::factory()->create([
            'name' => 'Emperor Super Admin',
            'email' => 'admin@emperor.vip',
            'role' => UserRole::ADMIN,
            'status' => 'active',
        ]);

        // 3. Referrer user
        $this->referrer = User::factory()->create([
            'name' => 'VIP Referrer',
            'email' => 'referrer@emperor.vip',
            'referral_code' => 'ROYAL99',
            'currency' => 'EGP',
            'status' => 'active',
        ]);
        Wallet::create([
            'user_id' => $this->referrer->id,
            'currency' => 'EGP',
            'balance' => 0.00,
            'status' => 'active',
        ]);

        // 4. Payment method
        $this->paymentMethod = PaymentMethod::create([
            'name' => 'فودافون كاش',
            'code' => 'vodafone_cash',
            'currency' => 'EGP',
            'min_amount' => 50.00,
            'max_amount' => 50000.00,
            'fixed_fee' => 0.00,
            'percent_fee' => 0.00,
            'account_details' => '01012345678',
            'is_active' => true,
        ]);

        // 5. Catalog
        $this->category = Category::create([
            'name' => 'شحن الألعاب الفوري',
            'slug' => 'games-instant',
            'type' => 'games',
            'is_active' => true,
        ]);

        $this->product = Product::create([
            'category_id' => $this->category->id,
            'name' => 'PUBG Mobile',
            'slug' => 'pubg-mobile',
            'type' => ProductType::DIRECT_TOPUP,
            'is_active' => true,
        ]);

        $this->tier = ProductTier::create([
            'product_id' => $this->product->id,
            'sku' => 'PUBG-60-UC',
            'name' => '60 شدة UC',
            'source_cost' => 40.00,
            'final_price' => 50.00,
            'sale_price' => 50.00,
            'is_active' => true,
        ]);

        // 6. Target rate for target selling
        $targetProduct = Product::create([
            'category_id' => $this->category->id,
            'name' => 'Likee Live',
            'slug' => 'likee-live',
            'type' => ProductType::TARGET,
            'is_active' => true,
        ]);

        $this->targetRate = TargetRate::create([
            'product_id' => $targetProduct->id,
            'min_points' => 1000,
            'rate_per_point' => 0.045, // 1000 points = 45 EGP
            'currency' => 'EGP',
            'is_active' => true,
        ]);
    }

    public function test_complete_end_to_end_platform_lifecycle(): void
    {
        Queue::fake([DispatchWebhookJob::class]);

        // --- Step 1: Customer Registration with Referral Code ---
        $registerRes = $this->postJson('/api/v1/auth/register', [
            'name' => 'سيف الدين الإمبراطور',
            'email' => 'seif@emperor.vip',
            'password' => 'SeifPassword123!',
            'password_confirmation' => 'SeifPassword123!',
            'referral_code' => 'ROYAL99',
        ]);
        $registerRes->assertStatus(201);
        $token = $registerRes->json('data.token');
        $this->assertNotEmpty($token);

        // --- Step 2: Complete Profile & Set Currency with Referral Invite Code ---
        $profileRes = $this->withHeader('Authorization', "Bearer {$token}")
            ->putJson('/api/v1/profile/complete', [
                'phone' => '+201099881122',
                'country' => 'EG',
                'currency' => 'EGP',
                'invite_code' => 'ROYAL99',
            ]);
        $profileRes->assertStatus(200);

        $customer = User::where('email', 'seif@emperor.vip')->first();
        $this->assertEquals($this->referrer->id, $customer->referrer_id);

        // --- Step 3: Enable 2FA Security ---
        $enable2faRes = $this->withHeader('Authorization', "Bearer {$token}")
            ->postJson('/api/v1/profile/2fa/enable');
        $enable2faRes->assertStatus(200);
        $twoFactorSecret = $enable2faRes->json('data.secret');

        $google2fa = new \PragmaRX\Google2FA\Google2FA();
        $validTotp = $google2fa->getCurrentOtp($twoFactorSecret);

        $verify2faRes = $this->withHeader('Authorization', "Bearer {$token}")
            ->postJson('/api/v1/profile/2fa/verify', [
                'code' => $validTotp,
            ]);
        $verify2faRes->assertStatus(200);
        $this->assertNotNull($customer->fresh()->two_factor_confirmed_at);

        // --- Step 4: Submit Deposit & Admin Approval (Wallet Credited + Referrer Rewarded) ---
        $deposit = DepositRequest::create([
            'user_id' => $customer->id,
            'payment_method_id' => $this->paymentMethod->id,
            'amount' => 1000.00,
            'fee' => 0.00,
            'final_amount' => 1000.00,
            'currency' => 'EGP',
            'sender_wallet' => '01099881122',
            'transaction_ref' => 'TX-EMPEROR-777',
            'status' => 'pending',
        ]);

        // Simulate admin approval event
        $deposit->update(['status' => 'approved']);
        $walletService = app(WalletService::class);
        $walletService->credit(
            user: $customer,
            amount: 1000.00,
            type: WalletTxType::DEPOSIT,
            description: 'إيداع معتمد',
            currency: 'EGP',
            referenceType: DepositRequest::class,
            referenceId: $deposit->id
        );
        event(new DepositApproved($deposit));

        // Customer wallet has 1000 EGP
        $customerWallet = $customer->fresh()->wallets()->where('currency', 'EGP')->first();
        $this->assertEquals(1000.00, (float) $customerWallet->balance);

        // Referrer got 5% commission = 50 EGP automatically
        $referrerWallet = $this->referrer->fresh()->wallets()->where('currency', 'EGP')->first();
        $this->assertEquals(50.00, (float) $referrerWallet->balance);

        // --- Step 5: Customer Places Game Top-up Order ---
        $orderRes = $this->withHeader('Authorization', "Bearer {$token}")
            ->postJson('/api/v1/orders', [
                'product_id' => $this->product->id,
                'product_tier_id' => $this->tier->id,
                'quantity' => 2, // 2 * 50 = 100 EGP
                'player_id' => '599887766',
            ]);
        $orderRes->assertStatus(201);
        $orderPublicId = $orderRes->json('data.public_id');

        // Customer wallet debited 100 EGP -> balance 900 EGP
        $this->assertEquals(900.00, (float) $customerWallet->fresh()->balance);

        $order = Order::where('public_id', $orderPublicId)->first();
        $this->assertEquals(OrderStatus::PROCESSING, $order->status);

        // Complete order & verify webhook dispatch if customer sets webhook_url
        $customer->update([
            'webhook_url' => 'https://seif-merchant.vip/webhook',
            'api_secret' => 'seif_secret_123',
        ]);
        $order->update(['status' => OrderStatus::COMPLETED]);
        event(new OrderCompleted($order));

        Queue::assertPushed(DispatchWebhookJob::class);

        // --- Step 6: Target Selling Payout Flow ---
        $targetService = app(\App\Services\TargetSellService::class);
        $targetProduct = $this->targetRate->product;
        $quote = $targetService->calculateQuote($targetProduct, 10000);
        $this->assertGreaterThan(0, $quote->netPayout);

        $targetOrder = TargetSellOrder::create([
            'user_id' => $customer->id,
            'product_id' => $targetProduct->id,
            'agency_id' => 'EMPEROR_AGENCY_001',
            'target_points' => 10000,
            'rate_per_point' => $quote->ratePerPoint,
            'gross_amount' => $quote->grossAmount,
            'fee' => $quote->fee,
            'net_payout' => $quote->netPayout,
            'currency' => 'EGP',
            'payout_method' => 'wallet',
            'app_user_id' => 'LIKE_SEIF_77',
            'status' => TargetOrderStatus::PENDING,
        ]);

        // Admin approves target sell -> credits customer wallet
        $targetService->approveAndPay($targetOrder, $this->admin, 'تم التحقق من الوكالة');
        $this->assertEquals(TargetOrderStatus::PAID, $targetOrder->fresh()->status);
        $this->assertGreaterThan(900.00, (float) $customerWallet->fresh()->balance);

        // --- Step 7: External B2B API Merchant Verification ---
        $rawMerchantSecret = 'b2b_merchant_secret_99';
        $merchant = User::factory()->create([
            'role' => UserRole::API_CLIENT,
            'status' => \App\Enums\UserStatus::ACTIVE,
            'api_key' => 'b2b_merchant_key_99',
            'api_secret' => hash('sha256', $rawMerchantSecret),
            'currency' => 'USD',
        ]);
        Wallet::create([
            'user_id' => $merchant->id,
            'currency' => 'USD',
            'balance' => 2500.00,
            'status' => 'active',
        ]);

        $b2bBalanceRes = $this->withHeaders([
            'X-Api-Key' => 'b2b_merchant_key_99',
            'X-Api-Secret' => $rawMerchantSecret,
        ])->getJson('/api/v1/external/balance');
        $b2bBalanceRes->assertStatus(200);
        $this->assertEquals(2500.00, $b2bBalanceRes->json('data.balance'));
    }
}
