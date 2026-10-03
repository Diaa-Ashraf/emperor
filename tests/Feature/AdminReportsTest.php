<?php

namespace Tests\Feature;

use App\Enums\OrderStatus;
use App\Enums\ProductType;
use App\Enums\UserRole;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use App\Services\ReportService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminReportsTest extends TestCase
{
    use RefreshDatabase;

    public function test_report_service_calculates_advanced_metrics_and_trends(): void
    {
        $admin = User::factory()->create(['role' => UserRole::ADMIN->value]);

        $category = Category::create(['name' => 'Games', 'slug' => 'games']);
        $product = Product::create([
            'category_id' => $category->id,
            'name' => 'PUBG Mobile',
            'slug' => 'pubg-mobile',
            'type' => ProductType::PLAYER_ID,
            'is_active' => true,
        ]);

        $tier = \App\Models\ProductTier::create([
            'product_id' => $product->id,
            'name' => '60 UC',
            'price_egp' => 500.0,
            'cost_price' => 450.0,
            'is_active' => true,
        ]);

        // Create completed orders
        Order::create([
            'user_id' => $admin->id,
            'product_id' => $product->id,
            'product_tier_id' => $tier->id,
            'player_id' => '12345678',
            'quantity' => 1,
            'unit_price' => 500.0,
            'total_amount' => 500.0,
            'cost_amount' => 450.0,
            'profit_amount' => 50.0,
            'status' => OrderStatus::COMPLETED,
            'currency' => 'EGP',
        ]);

        $service = app(ReportService::class);
        $report = $service->getAdvancedReport('30days');

        $this->assertEquals(500.0, $report['metrics']['total_sales']);
        $this->assertEquals(50.0, $report['metrics']['total_profit']);
        $this->assertEquals(1, $report['metrics']['orders_count']);
        $this->assertNotEmpty($report['chart_data']['labels']);
        $this->assertNotEmpty($report['top_products']);
    }

    public function test_admin_reports_page_accessible_by_admin(): void
    {
        $admin = User::factory()->create(['role' => UserRole::ADMIN->value]);

        $response = $this->actingAs($admin)->get('/admin/reports');

        $response->assertStatus(200);
        $response->assertSee('مركز التقارير والإحصائيات والذكاء المالي');
    }
}
