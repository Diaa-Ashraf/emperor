<?php

namespace Tests\Feature;

use App\DTOs\OrderRequestDTO;
use App\Enums\CategoryType;
use App\Enums\OrderStatus;
use App\Enums\PriceStrategy;
use App\Enums\ProductType;
use App\Enums\UserRole;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductTier;
use App\Models\User;
use App\Services\OrderService;
use App\Services\WalletService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class Phase2ApiTest extends TestCase
{
    use RefreshDatabase;
    protected function createCustomer(float $initialBalance = 1000.0): User
    {
        $user = User::factory()->create([
            'role' => UserRole::CUSTOMER,
            'currency' => 'EGP',
            'phone' => '+2010' . rand(10000000, 99999999),
        ]);

        $walletService = app(WalletService::class);
        $wallet = $walletService->getOrCreateWallet($user, 'EGP');
        $wallet->update(['balance' => $initialBalance]);

        return $user;
    }

    public function test_categories_api_returns_active_categories(): void
    {
        $category = Category::create([
            'name' => 'ألعاب باتل رويال',
            'slug' => 'battle-royale-games-' . rand(100, 999),
            'type' => CategoryType::GAMES,
            'is_active' => true,
            'sort_order' => 1,
        ]);

        $response = $this->getJson('/api/v1/categories');

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
            ])
            ->assertJsonFragment([
                'name' => 'ألعاب باتل رويال',
            ]);
    }

    public function test_products_api_returns_products_with_tiers(): void
    {
        $category = Category::create([
            'name' => 'ألعاب الموبايل',
            'slug' => 'mobile-games-' . rand(100, 999),
            'type' => CategoryType::GAMES,
            'is_active' => true,
        ]);

        $product = Product::create([
            'category_id' => $category->id,
            'name' => 'PUBG Mobile Test',
            'slug' => 'pubg-mobile-test-' . rand(100, 999),
            'type' => ProductType::PLAYER_ID,
            'is_active' => true,
        ]);

        $tier = ProductTier::create([
            'product_id' => $product->id,
            'name' => '60 UC',
            'source_cost' => 0.90,
            'cost_currency' => 'USD',
            'price_strategy' => PriceStrategy::PERCENTAGE,
            'margin_percent' => 10,
            'final_price' => 50.00,
            'is_active' => true,
        ]);

        $response = $this->getJson("/api/v1/products/{$product->id}");

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
            ])
            ->assertJsonFragment([
                'name' => 'PUBG Mobile Test',
                'price' => 50.0,
            ]);
    }

    public function test_customer_can_place_order_and_wallet_is_debited(): void
    {
        $customer = $this->createCustomer(1000.0);

        $category = Category::create([
            'name' => 'ألعاب إلكترونية',
            'slug' => 'esports-' . rand(100, 999),
            'type' => CategoryType::GAMES,
            'is_active' => true,
        ]);

        $product = Product::create([
            'category_id' => $category->id,
            'name' => 'Free Fire Test',
            'slug' => 'free-fire-' . rand(100, 999),
            'type' => ProductType::PLAYER_ID,
            'is_active' => true,
        ]);

        $tier = ProductTier::create([
            'product_id' => $product->id,
            'name' => '100 جوهرة',
            'source_cost' => 1.0,
            'cost_currency' => 'USD',
            'price_strategy' => PriceStrategy::MANUAL,
            'final_price' => 100.00,
            'is_active' => true,
        ]);

        $response = $this->actingAs($customer, 'sanctum')->postJson('/api/v1/orders', [
            'product_id' => $product->id,
            'product_tier_id' => $tier->id,
            'quantity' => 2,
            'player_id' => '5544332211',
            'idempotency_key' => 'test-idemp-' . rand(1000, 9999),
        ]);

        $response->assertStatus(201)
            ->assertJson([
                'status' => 'success',
            ])
            ->assertJsonFragment([
                'quantity' => 2,
                'total_amount' => 200.0,
                'player_id' => '5544332211',
            ]);

        // Check wallet balance
        $wallet = $customer->fresh()->wallet;
        $this->assertEquals(800.0, (float) $wallet->balance);

        // Check order history
        $historyResponse = $this->actingAs($customer, 'sanctum')->getJson('/api/v1/orders');
        $historyResponse->assertStatus(200)
            ->assertJsonFragment([
                'player_id' => '5544332211',
            ]);
    }

    public function test_order_refund_restores_user_balance(): void
    {
        $customer = $this->createCustomer(500.0);

        $category = Category::create([
            'name' => 'تطبيقات صوتية',
            'slug' => 'voice-apps-' . rand(100, 999),
            'type' => CategoryType::VOICE_APPS,
            'is_active' => true,
        ]);

        $product = Product::create([
            'category_id' => $category->id,
            'name' => 'Tami Live',
            'slug' => 'tami-live-' . rand(100, 999),
            'type' => ProductType::PLAYER_ID,
            'is_active' => true,
        ]);

        $tier = ProductTier::create([
            'product_id' => $product->id,
            'name' => '1000 كوين',
            'source_cost' => 5.0,
            'cost_currency' => 'USD',
            'price_strategy' => PriceStrategy::MANUAL,
            'final_price' => 150.00,
            'is_active' => true,
        ]);

        $orderService = app(OrderService::class);
        $dto = new OrderRequestDTO(
            userId: $customer->id,
            productId: $product->id,
            productTierId: $tier->id,
            quantity: 1,
            playerId: '99887766'
        );

        $order = $orderService->createOrder($dto, $customer);
        $this->assertEquals(350.0, (float) $customer->fresh()->wallet->balance);

        // Refund order
        $orderService->refundOrder($order, 'فشل من المزود');
        $this->assertEquals(OrderStatus::REFUNDED, $order->fresh()->status);
        $this->assertEquals(500.0, (float) $customer->fresh()->wallet->balance);
    }
}
