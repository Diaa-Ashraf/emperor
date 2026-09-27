<?php

namespace Tests\Feature;

use App\Adapters\CatalogSources\RealCatalogAdapter;
use App\Adapters\Providers\HalaAdapter;
use App\Adapters\Providers\TamiAdapter;
use App\DTOs\OrderRequestDTO;
use App\Models\CatalogSource;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductProvider;
use App\Models\ProductTier;
use App\Models\Provider;
use App\Models\User;
use App\Models\Wallet;
use App\Services\CatalogSyncService;
use App\Services\ProviderManagerService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class Phase11RealProviderAdapterTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;
    protected Category $category;
    protected Product $product;
    protected ProductTier $tier;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        Wallet::create([
            'user_id' => $this->user->id,
            'currency' => 'USD',
            'balance' => 500.00,
            'status' => 'active',
        ]);

        $this->category = Category::create([
            'name' => 'ألعاب باتل رويال',
            'slug' => 'battle-royale-games',
            'type' => 'games',
            'is_active' => true,
        ]);

        $this->product = Product::create([
            'category_id' => $this->category->id,
            'name' => 'ببجي موبايل',
            'slug' => 'pubg-mobile',
            'type' => 'direct_topup',
            'is_active' => true,
        ]);

        $this->tier = ProductTier::create([
            'product_id' => $this->product->id,
            'sku' => 'PUBG-60-UC',
            'name' => '60 شدة UC',
            'source_cost' => 0.85,
            'final_price' => 1.00,
            'sale_price' => 1.00,
            'is_active' => true,
        ]);
    }

    public function test_hala_adapter_simulated_execution_and_balance(): void
    {
        $adapter = new HalaAdapter([
            'sandbox_mode' => true,
        ]);

        $dto = new OrderRequestDTO(
            userId: $this->user->id,
            productId: $this->product->id,
            productTierId: $this->tier->id,
            quantity: 1,
            playerId: '5123456789',
        );

        $result = $adapter->executeOrder($dto);
        $this->assertTrue($result->success);
        $this->assertEquals('completed', $result->status);
        $this->assertStringStartsWith('HALA-SIM-', $result->providerOrderId);

        // Verify player
        $verify = $adapter->verifyPlayer('PUBG-60-UC', '5123456789');
        $this->assertTrue($verify->valid);
        $this->assertNotNull($verify->playerName);

        // Balance check
        $balance = $adapter->getBalance();
        $this->assertEquals('USD', $balance['currency']);
        $this->assertEquals('active', $balance['status']);
        $this->assertGreaterThan(0, $balance['balance']);
    }

    public function test_hala_adapter_real_http_call_with_signature(): void
    {
        Http::fake([
            'https://api.hala-topup.com/v1/orders/topup' => Http::response([
                'status' => 'success',
                'message' => 'Topup initiated',
                'data' => [
                    'order_id' => 'HALA-ORDER-998877',
                    'cost' => 0.85,
                    'codes' => null,
                ],
            ], 200),
        ]);

        $adapter = new HalaAdapter([
            'api_url' => 'https://api.hala-topup.com/v1',
            'api_key' => 'test_hala_key',
            'api_secret' => 'test_hala_secret',
            'sandbox_mode' => false,
        ]);

        $dto = new OrderRequestDTO(
            userId: $this->user->id,
            productId: $this->product->id,
            productTierId: $this->tier->id,
            quantity: 1,
            playerId: '55667788',
        );

        $result = $adapter->executeOrder($dto);
        $this->assertTrue($result->success);
        $this->assertEquals('completed', $result->status);
        $this->assertEquals('HALA-ORDER-998877', $result->providerOrderId);
        $this->assertEquals(0.85, $result->costAmount);
    }

    public function test_tami_adapter_voucher_purchase_and_pins(): void
    {
        $adapter = new TamiAdapter([
            'sandbox_mode' => true,
        ]);

        $dto = new OrderRequestDTO(
            userId: $this->user->id,
            productId: $this->product->id,
            productTierId: $this->tier->id,
            quantity: 2,
        );

        $result = $adapter->executeOrder($dto);
        $this->assertTrue($result->success);
        $this->assertEquals('completed', $result->status);
        $this->assertCount(2, $result->voucherCodes);
        $this->assertStringStartsWith('TAMI-', $result->voucherCodes[0]);

        $stock = $adapter->verifyPlayer('ITUNES-10', 'none');
        $this->assertTrue($stock->valid);

        $balance = $adapter->getBalance();
        $this->assertEquals('active', $balance['status']);
        $this->assertGreaterThan(0, $balance['balance']);
    }

    public function test_real_catalog_sync_creates_and_updates_items(): void
    {
        $catalogSource = CatalogSource::create([
            'name' => 'Real Catalog API',
            'slug' => 'real-catalog-api',
            'driver' => 'real_catalog',
            'config' => ['sandbox_mode' => true],
            'is_active' => true,
        ]);

        $service = app(CatalogSyncService::class);
        $result = $service->syncSource($catalogSource);

        $this->assertTrue($result->success);
        $this->assertGreaterThan(0, $result->categoriesCreated + $result->categoriesUpdated);
        $this->assertGreaterThan(0, $result->productsCreated + $result->productsUpdated);
        $this->assertGreaterThan(0, $result->tiersCreated + $result->tiersUpdated);

        // Verify synced products exist in DB
        $this->assertDatabaseHas('products', [
            'slug' => 'pubg-mobile-global',
        ]);
        $this->assertDatabaseHas('product_tiers', [
            'sku' => 'PUBG-60-UC',
        ]);
    }

    public function test_provider_manager_routing_and_cascade_fallback(): void
    {
        $failingProvider = Provider::create([
            'name' => 'Failing Primary Provider',
            'driver' => 'hala_api',
            'config' => [
                'api_url' => 'https://api.failing-hala.com/v1',
                'api_key' => 'invalid_key',
                'api_secret' => 'invalid_secret',
                'sandbox_mode' => false,
            ],
            'is_active' => true,
        ]);

        $backupProvider = Provider::create([
            'name' => 'Backup Tami Provider',
            'driver' => 'tami_api',
            'config' => [
                'sandbox_mode' => true,
            ],
            'is_active' => true,
        ]);

        // Link both providers to product tier
        ProductProvider::create([
            'product_id' => $this->product->id,
            'provider_id' => $failingProvider->id,
            'product_tier_id' => $this->tier->id,
            'provider_sku' => 'PUBG-60',
            'cost_price' => 0.80,
            'priority' => 1,
            'is_active' => true,
        ]);

        ProductProvider::create([
            'product_id' => $this->product->id,
            'provider_id' => $backupProvider->id,
            'product_tier_id' => $this->tier->id,
            'provider_sku' => 'PUBG-60-PIN',
            'cost_price' => 0.85,
            'priority' => 2,
            'is_active' => true,
        ]);

        // HTTP fake for failing provider
        Http::fake([
            'https://api.failing-hala.com/*' => Http::response(['message' => 'Service Unavailable'], 503),
        ]);

        $order = Order::create([
            'user_id' => $this->user->id,
            'product_id' => $this->product->id,
            'product_tier_id' => $this->tier->id,
            'quantity' => 1,
            'unit_price' => 1.00,
            'total_amount' => 1.00,
            'currency' => 'USD',
            'player_id' => '99887766',
            'status' => \App\Enums\OrderStatus::PROCESSING,
        ]);

        $manager = app(ProviderManagerService::class);
        $result = $manager->fulfill($order);

        $this->assertTrue($result->success);
        $this->assertEquals('completed', $result->status);
        $this->assertEquals($backupProvider->id, $order->fresh()->provider_id);
    }
}
