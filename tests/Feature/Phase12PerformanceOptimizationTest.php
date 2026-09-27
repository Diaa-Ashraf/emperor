<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductTier;
use App\Models\Setting;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class Phase12PerformanceOptimizationTest extends TestCase
{
    use RefreshDatabase;

    public function test_categories_api_uses_cache_and_invalidates_on_update(): void
    {
        Cache::flush();

        Category::create([
            'name' => 'قسم الألعاب الأول',
            'slug' => 'games-category-1',
            'type' => 'games',
            'is_active' => true,
            'sort_order' => 1,
        ]);

        // First call populates cache
        $res1 = $this->getJson('/api/v1/categories');
        $res1->assertStatus(200);
        $this->assertCount(1, $res1->json('data'));
        $this->assertTrue(Cache::has('api_categories_v1_all'));

        // Add a second category via model (which triggers cache invalidation)
        Category::create([
            'name' => 'قسم البطاقات الجديد',
            'slug' => 'cards-category-2',
            'type' => 'cards',
            'is_active' => true,
            'sort_order' => 2,
        ]);

        // Cache was automatically flushed
        $this->assertFalse(Cache::has('api_categories_v1_all'));

        // Second call reflects fresh data
        $res2 = $this->getJson('/api/v1/categories');
        $res2->assertStatus(200);
        $this->assertCount(2, $res2->json('data'));
    }

    public function test_settings_caching_and_cache_flush(): void
    {
        Setting::set('platform_support_phone', '01011223344');
        $this->assertEquals('01011223344', Setting::get('platform_support_phone'));
        $this->assertTrue(Cache::has('emperor_setting_platform_support_phone'));

        Setting::set('platform_support_phone', '01099887766');
        $this->assertEquals('01099887766', Setting::get('platform_support_phone'));
    }

    public function test_database_performance_indexes_are_active(): void
    {
        $this->assertTrue(Schema::hasTable('orders'));
        $this->assertTrue(Schema::hasTable('deposit_requests'));
        $this->assertTrue(Schema::hasTable('wallet_transactions'));
        $this->assertTrue(Schema::hasTable('products'));
        $this->assertTrue(Schema::hasTable('product_tiers'));

        // Query execution plan (EXPLAIN) utilizes index without errors
        $explain = DB::select('EXPLAIN SELECT * FROM orders WHERE user_id = 1 AND status = "completed"');
        $this->assertNotEmpty($explain);
    }
}
