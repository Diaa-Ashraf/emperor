<?php

namespace Database\Seeders;

use App\Enums\CategoryType;
use App\Enums\OrderStatus;
use App\Enums\PriceStrategy;
use App\Enums\ProductType;
use App\Models\CatalogSource;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductProvider;
use App\Models\ProductTier;
use App\Models\Provider;
use App\Models\User;
use Illuminate\Database\Seeder;

class SampleCatalogAndOrdersSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Catalog Sources
        $kaSource = CatalogSource::firstOrCreate(
            ['name' => 'KA-Cards Main Source'],
            [
                'driver' => 'ka_cards_scraper',
                'base_url' => 'https://ka-cards.com',
                'is_active' => true,
                'sync_status' => 'success',
                'last_synced_at' => now()->subMinutes(25),
            ]
        );

        // 2. Providers
        $kaProvider = Provider::firstOrCreate(
            ['name' => 'KA-Cards API Direct'],
            [
                'driver' => 'ka_cards_api',
                'base_url' => 'https://ka-cards.com/api/v1',
                'priority' => 1,
                'balance' => 4580.50,
                'balance_currency' => 'USD',
                'is_active' => true,
                'auto_fulfill' => true,
            ]
        );

        $manualProvider = Provider::firstOrCreate(
            ['name' => 'Manual Operations Desk'],
            [
                'driver' => 'manual_review',
                'priority' => 2,
                'balance' => 0.00,
                'balance_currency' => 'EGP',
                'is_active' => true,
                'auto_fulfill' => false,
            ]
        );

        // 3. Categories
        $appsCat = Category::firstOrCreate(
            ['slug' => 'apps'],
            [
                'name' => 'قسم التطبيقات',
                'type' => CategoryType::VOICE_APPS,
                'description' => 'شحن كوينز وتارجت تطبيقات المحادثة والبث المباشر',
                'is_active' => true,
                'sort_order' => 1,
            ]
        );

        $gamesCat = Category::firstOrCreate(
            ['slug' => 'games'],
            [
                'name' => 'قسم الألعاب',
                'type' => CategoryType::GAMES,
                'description' => 'شحن شدات ببجي، جواهر فري فاير، نقاط فالورانت وروبلوكس',
                'is_active' => true,
                'sort_order' => 2,
            ]
        );

        $telecomCat = Category::firstOrCreate(
            ['slug' => 'telecom'],
            [
                'name' => 'قسم شحن الاتصالات',
                'type' => CategoryType::CARDS,
                'description' => 'كروت شحن فودافون، أورنج، اتصالات، والمصرية للاتصالات WE',
                'is_active' => true,
                'sort_order' => 3,
            ]
        );

        $tvCat = Category::firstOrCreate(
            ['slug' => 'tv-subscriptions'],
            [
                'name' => 'قسم اشتراكات التلفاز',
                'type' => CategoryType::CARDS,
                'description' => 'اشتراكات شاهد VIP، نتفليكس، TOD، و OSN+',
                'is_active' => true,
                'sort_order' => 4,
            ]
        );

        // 4. Products & Tiers (Pola Live, Tami, PUBG, Yomi Chat, Azal)
        $polaProduct = Product::firstOrCreate(
            ['slug' => 'pola-live'],
            [
                'category_id' => $appsCat->id,
                'catalog_source_id' => $kaSource->id,
                'name' => 'بولا لايف (Pola Live)',
                'type' => ProductType::PLAYER_ID,
                'player_id_label' => 'معرف الحساب (User ID)',
                'has_server_id' => false,
                'is_active' => true,
                'sort_order' => 1,
                'description' => 'شحن مباشر وفوري لبرنامج بولا لايف عبر الأيدي الرسمي.',
            ]
        );

        $polaTiers = [
            ['name' => 'بولا 1 (7,000 كوين)', 'final_price' => 50.00, 'agent_price' => 48.00, 'api_price' => 47.00],
            ['name' => 'بولا 2 (14,000 كوين)', 'final_price' => 100.00, 'agent_price' => 96.00, 'api_price' => 94.00],
            ['name' => 'بولا 3 (35,000 كوين)', 'final_price' => 250.00, 'agent_price' => 240.00, 'api_price' => 235.00],
            ['name' => 'بولا 4 (70,000 كوين)', 'final_price' => 500.00, 'agent_price' => 480.00, 'api_price' => 470.00],
            ['name' => 'بولا 5 (140,000 كوين)', 'final_price' => 1000.00, 'agent_price' => 960.00, 'api_price' => 940.00],
        ];

        foreach ($polaTiers as $idx => $tData) {
            ProductTier::firstOrCreate(
                ['product_id' => $polaProduct->id, 'name' => $tData['name']],
                [
                    'source_cost' => $tData['final_price'] * 0.9,
                    'cost_currency' => 'EGP',
                    'price_strategy' => PriceStrategy::PERCENTAGE,
                    'margin_percent' => 5.0,
                    'final_price' => $tData['final_price'],
                    'agent_price' => $tData['agent_price'],
                    'api_price' => $tData['api_price'],
                    'is_active' => true,
                    'sort_order' => $idx + 1,
                ]
            );
        }

        // PUBG Mobile
        $pubgProduct = Product::firstOrCreate(
            ['slug' => 'pubg-uc-global'],
            [
                'category_id' => $gamesCat->id,
                'catalog_source_id' => $kaSource->id,
                'name' => 'شدات ببجي موبايل (PUBG UC)',
                'type' => ProductType::PLAYER_ID,
                'player_id_label' => 'معرف اللاعب (Player ID)',
                'has_server_id' => false,
                'is_active' => true,
                'sort_order' => 1,
                'description' => 'تسليم فوري ومباشر إلى حسابك داخل اللعبة عبر الـ ID الرسمي.',
            ]
        );

        $tier60 = ProductTier::firstOrCreate(
            ['product_id' => $pubgProduct->id, 'name' => '60 UC شدة'],
            [
                'source_cost' => 0.9200,
                'cost_currency' => 'USD',
                'price_strategy' => PriceStrategy::PERCENTAGE,
                'margin_percent' => 5.0,
                'final_price' => 48.50,
                'agent_price' => 47.00,
                'api_price' => 46.50,
                'is_active' => true,
                'sort_order' => 1,
            ]
        );

        $tier325 = ProductTier::firstOrCreate(
            ['product_id' => $pubgProduct->id, 'name' => '325 UC (300 + 25 مجاناً)'],
            [
                'source_cost' => 4.6000,
                'cost_currency' => 'USD',
                'price_strategy' => PriceStrategy::PERCENTAGE,
                'margin_percent' => 4.5,
                'final_price' => 240.00,
                'agent_price' => 235.00,
                'api_price' => 232.00,
                'is_active' => true,
                'sort_order' => 2,
            ]
        );

        $tier660 = ProductTier::firstOrCreate(
            ['product_id' => $pubgProduct->id, 'name' => '660 UC (600 + 60 مجاناً)'],
            [
                'source_cost' => 9.2000,
                'cost_currency' => 'USD',
                'price_strategy' => PriceStrategy::PERCENTAGE,
                'margin_percent' => 4.0,
                'final_price' => 475.00,
                'agent_price' => 465.00,
                'api_price' => 460.00,
                'is_active' => true,
                'sort_order' => 3,
            ]
        );

        // 5. Product Provider Mappings
        ProductProvider::firstOrCreate(
            ['product_tier_id' => $tier60->id, 'provider_id' => $kaProvider->id],
            [
                'product_id' => $pubgProduct->id,
                'provider_sku' => 'PUBG_60_UC',
                'priority' => 1,
                'cost_price' => 0.92,
                'cost_currency' => 'USD',
                'is_active' => true,
            ]
        );

        ProductProvider::firstOrCreate(
            ['product_tier_id' => $tier60->id, 'provider_id' => $manualProvider->id],
            [
                'product_id' => $pubgProduct->id,
                'provider_sku' => 'PUBG_MANUAL_60',
                'priority' => 2,
                'cost_price' => 0.95,
                'cost_currency' => 'USD',
                'is_active' => true,
            ]
        );

        // 6. Sample Orders
        $customer = User::where('role', 'customer')->first() ?? User::first();

        if ($customer) {
            Order::firstOrCreate(
                ['player_id' => '5123498765'],
                [
                    'user_id' => $customer->id,
                    'product_id' => $pubgProduct->id,
                    'product_tier_id' => $tier60->id,
                    'provider_id' => $kaProvider->id,
                    'quantity' => 1,
                    'unit_price' => 48.50,
                    'total_amount' => 48.50,
                    'currency' => 'EGP',
                    'cost_amount' => 46.00,
                    'profit_amount' => 2.50,
                    'status' => OrderStatus::COMPLETED,
                    'provider_order_id' => 'KA-ORD-889123',
                    'provider_status' => 'completed',
                    'provider_response' => [
                        'code' => 200,
                        'order_id' => 'KA-ORD-889123',
                        'player_id' => '5123498765',
                        'status' => 'Success',
                        'timestamp' => now()->toIso8601String(),
                    ],
                    'created_at' => now()->subHours(2),
                ]
            );

            Order::firstOrCreate(
                ['player_id' => '5987654321'],
                [
                    'user_id' => $customer->id,
                    'product_id' => $pubgProduct->id,
                    'product_tier_id' => $tier325->id,
                    'provider_id' => $kaProvider->id,
                    'quantity' => 2,
                    'unit_price' => 240.00,
                    'total_amount' => 480.00,
                    'currency' => 'EGP',
                    'cost_amount' => 460.00,
                    'profit_amount' => 20.00,
                    'status' => OrderStatus::PROCESSING,
                    'provider_order_id' => 'KA-ORD-889552',
                    'provider_status' => 'pending',
                    'created_at' => now()->subMinutes(12),
                ]
            );

            // 7. Target Products & Rates (Phase 4)
            $fallaProduct = Product::firstOrCreate(
                ['slug' => 'falla-target-sell'],
                [
                    'category_id' => $appsCat->id,
                    'name' => 'بيع واستلام تارجت فلا (Falla)',
                    'type' => ProductType::TARGET,
                    'player_id_label' => 'معرف حساب فلا (Falla ID)',
                    'has_server_id' => false,
                    'is_active' => true,
                    'sort_order' => 10,
                    'description' => 'بيع نقاط وتارجت تطبيق فلا لايف واستلام المستحقات كاش وفوري على المحفظة.',
                ]
            );

            \App\Models\TargetRate::firstOrCreate(
                ['product_id' => $fallaProduct->id, 'min_points' => 1000],
                [
                    'max_points' => 50000,
                    'rate_per_point' => 0.05000000,
                    'currency' => 'EGP',
                    'is_active' => true,
                ]
            );

            \App\Models\TargetRate::firstOrCreate(
                ['product_id' => $fallaProduct->id, 'min_points' => 50001],
                [
                    'max_points' => 500000,
                    'rate_per_point' => 0.05500000,
                    'currency' => 'EGP',
                    'is_active' => true,
                ]
            );

            // Sample Target Sell Orders
            \App\Models\TargetSellOrder::firstOrCreate(
                ['app_user_id' => 'FALLA-STAR-992'],
                [
                    'user_id' => $customer->id,
                    'product_id' => $fallaProduct->id,
                    'app_username' => 'EmperorHost',
                    'agency_id' => 'EMP-TARGET-001',
                    'target_points' => 30000,
                    'rate_per_point' => 0.05000000,
                    'gross_amount' => 1500.00,
                    'fee' => 0.00,
                    'net_payout' => 1500.00,
                    'currency' => 'EGP',
                    'payout_method' => 'wallet',
                    'user_notes' => 'تم تحويل 30 ألف نقطة على وكالة إمبراطور المعتمدة',
                    'status' => \App\Enums\TargetOrderStatus::PENDING,
                    'created_at' => now()->subMinutes(35),
                ]
            );
        }
    }
}
