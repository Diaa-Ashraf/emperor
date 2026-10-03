<?php

namespace Tests\Feature;

use App\Enums\ProductType;
use App\Enums\TargetOrderStatus;
use App\Enums\TrustLevel;
use App\Models\Category;
use App\Models\Product;
use App\Models\TargetRate;
use App\Models\User;
use App\Services\TargetSellService;
use App\Services\TrustLevelService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TargetAutoVerificationTest extends TestCase
{
    use RefreshDatabase;

    public function test_trust_level_calculation_and_auto_approval(): void
    {
        $trustService = app(TrustLevelService::class);

        $newUser = User::factory()->create([
            'trust_level' => TrustLevel::NEW->value,
            'successful_target_count' => 0,
            'rejected_target_count' => 0,
        ]);

        $this->assertFalse($trustService->canAutoApproveByTrust($newUser, 100));

        // Trusted user with 15 successful orders
        $trustedUser = User::factory()->create([
            'trust_level' => TrustLevel::SILVER->value,
            'successful_target_count' => 15,
            'rejected_target_count' => 0,
        ]);

        $this->assertTrue($trustService->canAutoApproveByTrust($trustedUser, 300));
        $this->assertFalse($trustService->canAutoApproveByTrust($trustedUser, 1000));
    }

    public function test_target_sell_order_instant_auto_approval_for_silver_user(): void
    {
        $targetService = app(TargetSellService::class);

        $category = Category::create(['name' => 'تطبيقات تارجت', 'slug' => 'target-apps']);
        $product = Product::create([
            'category_id' => $category->id,
            'name' => 'Tami Live',
            'slug' => 'tami-live',
            'type' => ProductType::TARGET,
            'is_active' => true,
        ]);

        TargetRate::create([
            'product_id' => $product->id,
            'min_points' => 100,
            'max_points' => 100000,
            'rate_per_point' => 0.05,
            'currency' => 'EGP',
            'is_active' => true,
        ]);

        $silverUser = User::factory()->create([
            'trust_level' => TrustLevel::SILVER->value,
            'successful_target_count' => 12,
            'rejected_target_count' => 0,
            'currency' => 'EGP',
        ]);

        $order = $targetService->submitOrder(
            user: $silverUser,
            product: $product,
            appUserId: '987654321',
            appUsername: 'KingPlayer',
            points: 5000,
            proofImage: null
        );

        $this->assertEquals(TargetOrderStatus::PAID, $order->status);
        $this->assertTrue($order->auto_verified);
        $this->assertEquals('trust_level', $order->verification_method);

        $wallet = $silverUser->fresh()->wallet;
        $this->assertEquals(250.0, (float) $wallet->balance);
    }
}
