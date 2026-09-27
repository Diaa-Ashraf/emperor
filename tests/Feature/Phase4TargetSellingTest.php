<?php

namespace Tests\Feature;

use App\Enums\CategoryType;
use App\Enums\ProductType;
use App\Enums\TargetOrderStatus;
use App\Enums\UserRole;
use App\Enums\WalletTxType;
use App\Models\Category;
use App\Models\Notification;
use App\Models\Product;
use App\Models\TargetRate;
use App\Models\TargetSellOrder;
use App\Models\User;
use App\Models\Wallet;
use App\Models\WalletTransaction;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class Phase4TargetSellingTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;
    protected User $customer;
    protected Product $targetProduct;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('public');

        $this->admin = User::factory()->create([
            'email' => 'admin@emperor.com',
            'role' => UserRole::ADMIN,
        ]);

        $this->customer = User::factory()->create([
            'email' => 'customer@emperor.com',
            'role' => UserRole::CUSTOMER,
            'currency' => 'EGP',
        ]);
        Wallet::create([
            'user_id' => $this->customer->id,
            'balance' => 100.00,
            'currency' => 'EGP',
        ]);

        $category = Category::create([
            'name' => 'برامج الشات الصوتي',
            'slug' => 'voice-chat-apps',
            'type' => CategoryType::TARGET,
            'is_active' => true,
        ]);

        $this->targetProduct = Product::create([
            'category_id' => $category->id,
            'name' => 'Falla Target',
            'slug' => 'falla-target',
            'type' => ProductType::TARGET,
            'player_id_label' => 'معرف حساب فلا',
            'is_active' => true,
        ]);

        TargetRate::create([
            'product_id' => $this->targetProduct->id,
            'min_points' => 1000,
            'max_points' => 50000,
            'rate_per_point' => 0.05,
            'currency' => 'EGP',
            'is_active' => true,
        ]);

        TargetRate::create([
            'product_id' => $this->targetProduct->id,
            'min_points' => 50001,
            'max_points' => 500000,
            'rate_per_point' => 0.055,
            'currency' => 'EGP',
            'is_active' => true,
        ]);
    }

    public function test_public_can_list_target_apps_and_rates(): void
    {
        $response = $this->getJson('/api/v1/target-apps');

        $response->assertOk()
            ->assertJsonPath('status', 'success')
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.name', 'Falla Target')
            ->assertJsonCount(2, 'data.0.rates');
    }

    public function test_can_calculate_target_quote(): void
    {
        $response = $this->postJson('/api/v1/target-apps/quote', [
            'product_id' => $this->targetProduct->id,
            'points' => 10000,
        ]);

        $response->assertOk()
            ->assertJsonPath('status', 'success')
            ->assertJsonPath('data.points', 10000)
            ->assertJsonPath('data.rate_per_point', 0.05)
            ->assertJsonPath('data.gross_amount', 500)
            ->assertJsonPath('data.net_payout', 500);

        // Higher tier rate test
        $tier2Response = $this->postJson('/api/v1/target-apps/quote', [
            'product_id' => $this->targetProduct->id,
            'points' => 100000,
        ]);

        $tier2Response->assertOk()
            ->assertJsonPath('data.rate_per_point', 0.055)
            ->assertJsonPath('data.net_payout', 5500);
    }

    public function test_customer_can_submit_target_sell_order_with_proof_image(): void
    {
        $token = $this->customer->createToken('test')->plainTextToken;
        $file = UploadedFile::fake()->image('proof.jpg');

        $response = $this->withHeader('Authorization', "Bearer {$token}")
            ->postJson('/api/v1/target-orders', [
                'product_id' => $this->targetProduct->id,
                'app_user_id' => 'FALLA_USER_999',
                'app_username' => 'KingFalla',
                'target_points' => 20000,
                'proof_image' => $file,
                'user_notes' => 'يرجى التحقق والدفع للمحفظة سريعاً',
            ]);

        $response->assertCreated()
            ->assertJsonPath('status', 'success')
            ->assertJsonPath('data.app_user_id', 'FALLA_USER_999')
            ->assertJsonPath('data.target_points', 20000)
            ->assertJsonPath('data.net_payout', 1000)
            ->assertJsonPath('data.status', 'pending');

        $this->assertDatabaseHas('target_sell_orders', [
            'user_id' => $this->customer->id,
            'product_id' => $this->targetProduct->id,
            'app_user_id' => 'FALLA_USER_999',
            'target_points' => 20000,
            'net_payout' => 1000.00,
            'status' => TargetOrderStatus::PENDING->value,
        ]);
    }

    public function test_customer_can_view_target_orders_ledger_and_details(): void
    {
        $token = $this->customer->createToken('test')->plainTextToken;

        $order = TargetSellOrder::create([
            'user_id' => $this->customer->id,
            'product_id' => $this->targetProduct->id,
            'app_user_id' => 'USER_123',
            'agency_id' => 'EMP-TEST-AGENCY',
            'target_points' => 10000,
            'rate_per_point' => 0.05,
            'gross_amount' => 500.00,
            'net_payout' => 500.00,
            'currency' => 'EGP',
            'status' => TargetOrderStatus::PENDING,
        ]);

        $listResponse = $this->withHeader('Authorization', "Bearer {$token}")
            ->getJson('/api/v1/target-orders');

        $listResponse->assertOk()
            ->assertJsonPath('status', 'success')
            ->assertJsonCount(1, 'data');

        $showResponse = $this->withHeader('Authorization', "Bearer {$token}")
            ->getJson("/api/v1/target-orders/{$order->id}");

        $showResponse->assertOk()
            ->assertJsonPath('status', 'success')
            ->assertJsonPath('data.id', $order->id)
            ->assertJsonPath('data.public_id', $order->public_id);
    }

    public function test_admin_can_approve_target_order_and_credit_wallet(): void
    {
        $order = TargetSellOrder::create([
            'user_id' => $this->customer->id,
            'product_id' => $this->targetProduct->id,
            'app_user_id' => 'USER_123',
            'agency_id' => 'EMP-TEST-AGENCY',
            'target_points' => 10000,
            'rate_per_point' => 0.05,
            'gross_amount' => 500.00,
            'net_payout' => 500.00,
            'currency' => 'EGP',
            'status' => TargetOrderStatus::PENDING,
        ]);

        $response = $this->actingAs($this->admin)
            ->post("/admin/targets/{$order->id}/approve");

        $response->assertRedirect();
        $order->refresh();

        $this->assertEquals(TargetOrderStatus::PAID, $order->status);
        $this->assertEquals(600.00, (float) $this->customer->wallet->fresh()->balance);

        $this->assertDatabaseHas('wallet_transactions', [
            'wallet_id' => $this->customer->wallet->id,
            'type' => WalletTxType::TARGET_PAYOUT->value,
            'amount' => 500.00,
        ]);

        $this->assertDatabaseHas('notifications', [
            'notifiable_id' => $this->customer->id,
            'type' => 'target_paid',
        ]);
    }

    public function test_admin_can_reject_target_order(): void
    {
        $order = TargetSellOrder::create([
            'user_id' => $this->customer->id,
            'product_id' => $this->targetProduct->id,
            'app_user_id' => 'USER_123',
            'agency_id' => 'EMP-TEST-AGENCY',
            'target_points' => 10000,
            'rate_per_point' => 0.05,
            'gross_amount' => 500.00,
            'net_payout' => 500.00,
            'currency' => 'EGP',
            'status' => TargetOrderStatus::PENDING,
        ]);

        $response = $this->actingAs($this->admin)
            ->post("/admin/targets/{$order->id}/reject", [
                'reason' => 'لم يتم استلام التارجت على الوكالة',
            ]);

        $response->assertRedirect();
        $order->refresh();

        $this->assertEquals(TargetOrderStatus::REJECTED, $order->status);
        $this->assertEquals('لم يتم استلام التارجت على الوكالة', $order->reviewer_notes);
        $this->assertEquals(100.00, (float) $this->customer->wallet->fresh()->balance); // unchanged

        $this->assertDatabaseHas('notifications', [
            'notifiable_id' => $this->customer->id,
            'type' => 'target_rejected',
        ]);
    }
}
