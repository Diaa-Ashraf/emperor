<?php

namespace Tests\Feature;

use App\Enums\OrderStatus;
use App\Enums\ProductType;
use App\Enums\UserRole;
use App\Enums\UserStatus;
use App\Models\ApiClientPrice;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductTier;
use App\Models\User;
use App\Models\Wallet;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class Phase6ExternalApiTest extends TestCase
{
    use RefreshDatabase;

    protected User $apiClient;
    protected string $rawSecret = 'my_super_secret_123';
    protected ProductTier $tier;
    protected Product $product;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(\Database\Seeders\RolesAndPermissionsSeeder::class);

        $this->apiClient = User::factory()->create([
            'name' => 'Test Partner API Client',
            'email' => 'client@partner.com',
            'role' => UserRole::API_CLIENT,
            'status' => UserStatus::ACTIVE,
            'api_key' => 'test_api_key_abc123',
            'api_secret' => hash('sha256', $this->rawSecret),
            'api_ip_whitelist' => null,
            'api_rate_limit' => 60,
            'webhook_url' => 'https://partner.com/webhook',
            'currency' => 'EGP',
        ]);

        Wallet::create([
            'user_id' => $this->apiClient->id,
            'balance' => 1000.00,
            'currency' => 'EGP',
            'is_locked' => false,
        ]);

        $category = Category::create([
            'name' => 'Games',
            'slug' => 'games',
            'is_active' => true,
        ]);

        $this->product = Product::create([
            'category_id' => $category->id,
            'name' => 'PUBG Mobile UC',
            'slug' => 'pubg-mobile-uc',
            'type' => ProductType::DIRECT_TOPUP,
            'is_active' => true,
        ]);

        $this->tier = ProductTier::create([
            'product_id' => $this->product->id,
            'name' => '60 UC',
            'sku' => 'PUBG-60-UC',
            'source_cost' => 30.00,
            'final_price' => 50.00,
            'api_price' => 45.00,
            'is_active' => true,
            'display_order' => 1,
        ]);
    }

    public function test_external_api_requires_credentials(): void
    {
        $response = $this->getJson('/api/v1/external/balance');

        $response->assertStatus(401)
            ->assertJson([
                'status' => 'error',
                'code' => 'UNAUTHORIZED_MISSING_CREDENTIALS',
            ]);
    }

    public function test_external_api_rejects_invalid_api_key_or_secret(): void
    {
        $response = $this->withHeaders([
            'X-API-Key' => 'invalid_key',
            'X-API-Secret' => 'invalid_secret',
        ])->getJson('/api/v1/external/balance');

        $response->assertStatus(401)
            ->assertJson(['status' => 'error']);

        $responseWrongSecret = $this->withHeaders([
            'X-API-Key' => 'test_api_key_abc123',
            'X-API-Secret' => 'wrong_secret',
        ])->getJson('/api/v1/external/balance');

        $responseWrongSecret->assertStatus(401)
            ->assertJson(['code' => 'INVALID_API_SECRET']);
    }

    public function test_external_api_rejects_suspended_client(): void
    {
        $this->apiClient->update(['status' => UserStatus::SUSPENDED]);

        $response = $this->withHeaders([
            'X-API-Key' => 'test_api_key_abc123',
            'X-API-Secret' => $this->rawSecret,
        ])->getJson('/api/v1/external/balance');

        $response->assertStatus(403)
            ->assertJson(['code' => 'ACCOUNT_SUSPENDED']);
    }

    public function test_external_api_respects_ip_whitelist(): void
    {
        $this->apiClient->update(['api_ip_whitelist' => ['192.168.1.100']]);

        // Request from unauthorized IP
        $responseForbidden = $this->withHeaders([
            'X-API-Key' => 'test_api_key_abc123',
            'X-API-Secret' => $this->rawSecret,
        ])->getJson('/api/v1/external/balance');

        $responseForbidden->assertStatus(403)
            ->assertJson(['code' => 'IP_NOT_WHITELISTED']);

        // Request from authorized IP
        $responseAllowed = $this->withServerVariables(['REMOTE_ADDR' => '192.168.1.100'])
            ->withHeaders([
                'X-API-Key' => 'test_api_key_abc123',
                'X-API-Secret' => $this->rawSecret,
            ])->getJson('/api/v1/external/balance');

        $responseAllowed->assertStatus(200)
            ->assertJson(['status' => 'success']);
    }

    public function test_external_api_balance_endpoint(): void
    {
        $response = $this->withHeaders([
            'X-API-Key' => 'test_api_key_abc123',
            'X-API-Secret' => $this->rawSecret,
        ])->getJson('/api/v1/external/balance');

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
                'data' => [
                    'balance' => 1000.00,
                    'currency' => 'EGP',
                    'is_active' => true,
                    'rate_limit_per_minute' => 60,
                ],
            ]);
    }

    public function test_external_api_products_endpoint_returns_custom_or_api_pricing(): void
    {
        // 1. Without custom override: should return tier api_price (45.00)
        $response1 = $this->withHeaders([
            'X-API-Key' => 'test_api_key_abc123',
            'X-API-Secret' => $this->rawSecret,
        ])->getJson('/api/v1/external/products');

        $response1->assertStatus(200);
        $products = $response1->json('data');
        $this->assertNotEmpty($products);
        $this->assertEquals(45.00, $products[0]['tiers'][0]['price']);

        // 2. With custom override (41.50)
        ApiClientPrice::create([
            'user_id' => $this->apiClient->id,
            'product_tier_id' => $this->tier->id,
            'custom_price' => 41.50,
            'is_active' => true,
        ]);

        $response2 = $this->withHeaders([
            'X-API-Key' => 'test_api_key_abc123',
            'X-API-Secret' => $this->rawSecret,
        ])->getJson('/api/v1/external/products');

        $response2->assertStatus(200);
        $products2 = $response2->json('data');
        $this->assertEquals(41.50, $products2[0]['tiers'][0]['price']);
    }

    public function test_external_api_order_placement_and_wallet_deduction(): void
    {
        // Set custom price 40.00
        ApiClientPrice::create([
            'user_id' => $this->apiClient->id,
            'product_tier_id' => $this->tier->id,
            'custom_price' => 40.00,
            'is_active' => true,
        ]);

        $payload = [
            'tier_id' => $this->tier->id,
            'player_id' => '551234990',
            'quantity' => 2, // Total: 80.00
            'idempotency_key' => 'test_idemp_key_001',
        ];

        $response = $this->withHeaders([
            'X-API-Key' => 'test_api_key_abc123',
            'X-API-Secret' => $this->rawSecret,
        ])->postJson('/api/v1/external/orders', $payload);

        $response->assertStatus(201)
            ->assertJson([
                'status' => 'success',
                'data' => [
                    'player_id' => '551234990',
                    'quantity' => 2,
                    'unit_price' => 40.00,
                    'total_amount' => 80.00,
                    'remaining_balance' => 920.00,
                ],
            ]);

        $this->assertDatabaseHas('orders', [
            'user_id' => $this->apiClient->id,
            'product_tier_id' => $this->tier->id,
            'player_id' => '551234990',
            'channel' => 'api',
            'total_amount' => 80.00,
        ]);

        $this->assertEquals(920.00, (float) $this->apiClient->fresh()->wallet->balance);

        // Check order status lookup
        $publicId = $response->json('data.public_id');
        $showResponse = $this->withHeaders([
            'X-API-Key' => 'test_api_key_abc123',
            'X-API-Secret' => $this->rawSecret,
        ])->getJson("/api/v1/external/orders/{$publicId}");

        $showResponse->assertStatus(200)
            ->assertJson([
                'status' => 'success',
                'data' => [
                    'public_id' => $publicId,
                    'player_id' => '551234990',
                ],
            ]);
    }

    public function test_admin_api_clients_management_and_pricing_matrix(): void
    {
        $admin = User::factory()->create([
            'role' => UserRole::ADMIN,
        ]);

        // 1. Admin creates new API client
        $createResponse = $this->actingAs($admin)
            ->post(route('admin.api-clients.store'), [
                'name' => 'New Partner Enterprise',
                'email' => 'enterprise@partner.com',
                'phone' => '+201011112222',
                'api_rate_limit' => 120,
                'initial_balance' => 2500.00,
                'api_ip_whitelist' => "10.0.0.1\n10.0.0.2",
            ]);

        $createResponse->assertRedirect(route('admin.api-clients.index'))
            ->assertSessionHas('new_client_credentials');

        $newClient = User::where('email', 'enterprise@partner.com')->first();
        $this->assertNotNull($newClient);
        $this->assertEquals(2500.00, (float) $newClient->wallet->balance);
        $this->assertEquals(['10.0.0.1', '10.0.0.2'], $newClient->api_ip_whitelist);

        // 2. Admin sets custom pricing matrix
        $pricingResponse = $this->actingAs($admin)
            ->post(route('admin.api-clients.update-pricing', $newClient->id), [
                'prices' => [
                    $this->tier->id => '38.50',
                ],
            ]);

        $pricingResponse->assertRedirect();
        $this->assertDatabaseHas('api_client_prices', [
            'user_id' => $newClient->id,
            'product_tier_id' => $this->tier->id,
            'custom_price' => 38.50,
        ]);
    }
}
