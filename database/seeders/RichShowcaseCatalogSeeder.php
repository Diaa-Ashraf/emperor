<?php

namespace Database\Seeders;

use App\Enums\CategoryType;
use App\Enums\PriceStrategy;
use App\Enums\ProductType;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductTier;
use App\Models\Provider;
use App\Models\TargetRate;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class RichShowcaseCatalogSeeder extends Seeder
{
    public function run(): void
    {
        $provider = Provider::firstOrCreate(
            ['driver' => 'manual'],
            [
                'name' => 'إمبراطور للشحن الفوري المباشر',
                'balance' => 999999.00,
                'balance_currency' => 'EGP',
                'is_active' => true,
                'auto_fulfill' => true,
            ]
        );

        // ══════════════════════════════════════════════
        // 1. Categories
        // ══════════════════════════════════════════════
        $gamesCat = Category::withTrashed()->firstOrNew(['slug' => 'games']);
        $gamesCat->fill([
            'name' => 'قسم الألعاب الإلكترونية',
            'type' => CategoryType::GAMES,
            'description' => 'شحن شدات ببجي، جواهر فري فاير، فالورانت وروبلوكس بأفضل الأسعار',
            'icon' => 'gamepad-2',
            'is_active' => true,
            'sort_order' => 1,
        ]);
        if ($gamesCat->trashed()) {
            $gamesCat->restore();
        }
        $gamesCat->save();

        $voiceAppsCat = Category::withTrashed()->firstOrNew(['slug' => 'apps']);
        $voiceAppsCat->fill([
            'name' => 'تطبيقات البث والمحادثات',
            'type' => CategoryType::VOICE_APPS,
            'description' => 'شحن كوينز وماسات تيك توك، بيجو لايف، لايكي، وميكو، ويوهو',
            'icon' => 'smartphone',
            'is_active' => true,
            'sort_order' => 2,
        ]);
        if ($voiceAppsCat->trashed()) {
            $voiceAppsCat->restore();
        }
        $voiceAppsCat->save();

        $cardsCat = Category::withTrashed()->firstOrNew(['slug' => 'cards']);
        $cardsCat->fill([
            'name' => 'البطاقات الرقمية والاشتراكات',
            'type' => CategoryType::CARDS,
            'description' => 'اشتراكات شاهد VIP، بلايستيشن، إكس بوكس، ونتفليكس',
            'icon' => 'credit-card',
            'is_active' => true,
            'sort_order' => 3,
        ]);
        if ($cardsCat->trashed()) {
            $cardsCat->restore();
        }
        $cardsCat->save();

        // ══════════════════════════════════════════════
        // 2. 12 Rich Products Definition
        // ══════════════════════════════════════════════
        $productsData = [
            // ── 1. PUBG Mobile ──
            [
                'category_id' => $gamesCat->id,
                'name' => 'ببجي موبايل (PUBG Mobile)',
                'slug' => 'pubg-mobile',
                'type' => ProductType::PLAYER_ID,
                'description' => 'شحن شدات ببجي الرسمية (UC) فورياً برقم الآيدي Player ID لجميع السيرفرات العربية والعالمية.',
                'image' => 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
                'player_id_label' => 'معرّف اللاعب (Player ID)',
                'player_id_validation_regex' => '^[0-9]{7,12}$',
                'has_server_id' => false,
                'sort_order' => 1,
                'tiers' => [
                    ['name' => '60 شدة (60 UC)', 'sku' => 'pubg_60_uc', 'cost' => 38, 'price' => 45],
                    ['name' => '325 شدة (325 UC)', 'sku' => 'pubg_325_uc', 'cost' => 195, 'price' => 225],
                    ['name' => '660 شدة (660 UC)', 'sku' => 'pubg_660_uc', 'cost' => 385, 'price' => 440],
                    ['name' => '1800 شدة (1800 UC)', 'sku' => 'pubg_1800_uc', 'cost' => 1020, 'price' => 1150],
                    ['name' => '3850 شدة (3850 UC)', 'sku' => 'pubg_3850_uc', 'cost' => 2100, 'price' => 2350],
                    ['name' => '8100 شدة (8100 UC)', 'sku' => 'pubg_8100_uc', 'cost' => 4150, 'price' => 4600],
                ]
            ],

            // ── 2. Free Fire ──
            [
                'category_id' => $gamesCat->id,
                'name' => 'فري فاير (Free Fire)',
                'slug' => 'free-fire',
                'type' => ProductType::PLAYER_ID,
                'description' => 'شحن جواهر فري فاير فورياً بالـ Player ID مع مكافآت وبونص شحن مباشر.',
                'image' => 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&auto=format&fit=crop&q=80',
                'player_id_label' => 'معرّف حساب فري فاير (UID)',
                'player_id_validation_regex' => '^[0-9]{8,12}$',
                'has_server_id' => false,
                'sort_order' => 2,
                'tiers' => [
                    ['name' => '100+10 جوهرة (Diamonds)', 'sku' => 'ff_110_dia', 'cost' => 32, 'price' => 40],
                    ['name' => '310+31 جوهرة (Diamonds)', 'sku' => 'ff_341_dia', 'cost' => 98, 'price' => 120],
                    ['name' => '520+52 جوهرة (Diamonds)', 'sku' => 'ff_572_dia', 'cost' => 165, 'price' => 195],
                    ['name' => '1060+106 جوهرة (Diamonds)', 'sku' => 'ff_1166_dia', 'cost' => 330, 'price' => 390],
                    ['name' => '2180+218 جوهرة (Diamonds)', 'sku' => 'ff_2398_dia', 'cost' => 660, 'price' => 770],
                ]
            ],

            // ── 3. Roblox ──
            [
                'category_id' => $gamesCat->id,
                'name' => 'روبلوكس (Roblox Robux)',
                'slug' => 'roblox',
                'type' => ProductType::PLAYER_ID,
                'description' => 'شحن عملة روبوكس الرسمية لحسابك في روبلوكس فورياً بأمان تام.',
                'image' => 'https://images.unsplash.com/photo-1612287233202-0e9b97ca967a?w=600&auto=format&fit=crop&q=80',
                'player_id_label' => 'اسم المستخدم في روبلوكس (Username)',
                'player_id_validation_regex' => '^[a-zA-Z0-9_]{3,20}$',
                'has_server_id' => false,
                'sort_order' => 3,
                'tiers' => [
                    ['name' => '80 Robux (روبوكس)', 'sku' => 'rbx_80', 'cost' => 40, 'price' => 50],
                    ['name' => '400 Robux (روبوكس)', 'sku' => 'rbx_400', 'cost' => 200, 'price' => 240],
                    ['name' => '800 Robux (روبوكس)', 'sku' => 'rbx_800', 'cost' => 395, 'price' => 470],
                    ['name' => '2000 Robux (روبوكس)', 'sku' => 'rbx_2000', 'cost' => 980, 'price' => 1150],
                ]
            ],

            // ── 4. Valorant ──
            [
                'category_id' => $gamesCat->id,
                'name' => 'فالورانت (Valorant Points)',
                'slug' => 'valorant',
                'type' => ProductType::VOUCHER,
                'description' => 'أكواد شحن نقاط فالورانت VP فورية لحسابات سيرفر الشرق الأوسط وأوروبا.',
                'image' => 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80',
                'player_id_label' => 'البريد الإلكتروني لاستلام الكود',
                'has_server_id' => false,
                'sort_order' => 4,
                'tiers' => [
                    ['name' => '575 Valorant Points (VP)', 'sku' => 'val_575', 'cost' => 220, 'price' => 260],
                    ['name' => '1200 Valorant Points (VP)', 'sku' => 'val_1200', 'cost' => 450, 'price' => 520],
                    ['name' => '2475 Valorant Points (VP)', 'sku' => 'val_2475', 'cost' => 910, 'price' => 1040],
                    ['name' => '5350 Valorant Points (VP)', 'sku' => 'val_5350', 'cost' => 1900, 'price' => 2150],
                ]
            ],

            // ── 5. Honor of Kings ──
            [
                'category_id' => $gamesCat->id,
                'name' => 'أونور أوف كينجز (Honor of Kings)',
                'slug' => 'honor-of-kings',
                'type' => ProductType::PLAYER_ID,
                'description' => 'شحن توكنز وجواهر Honor of Kings العالمية بالمعرف UID.',
                'image' => 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&auto=format&fit=crop&q=80',
                'player_id_label' => 'معرّف الحساب (UID)',
                'player_id_validation_regex' => '^[0-9]{6,16}$',
                'has_server_id' => false,
                'sort_order' => 5,
                'tiers' => [
                    ['name' => '80 Tokens + 8 Bonus', 'sku' => 'hok_80', 'cost' => 35, 'price' => 45],
                    ['name' => '240 Tokens + 24 Bonus', 'sku' => 'hok_240', 'cost' => 105, 'price' => 130],
                    ['name' => '800 Tokens + 80 Bonus', 'sku' => 'hok_800', 'cost' => 350, 'price' => 420],
                ]
            ],

            // ── 6. TikTok (شحن كوينز) ──
            [
                'category_id' => $voiceAppsCat->id,
                'name' => 'تيك توك (TikTok Coins)',
                'slug' => 'tiktok',
                'type' => ProductType::PLAYER_ID,
                'description' => 'شحن عملات وكوينز تيك توك الرسمية فورياً عبر اسم المستخدم أو معرف الحساب.',
                'image' => 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=600&auto=format&fit=crop&q=80',
                'player_id_label' => 'يوزر الحساب في تيك توك (@username)',
                'has_server_id' => false,
                'sort_order' => 6,
                'tiers' => [
                    ['name' => '70 عملة تيك توك (Coins)', 'sku' => 'tt_70', 'cost' => 38, 'price' => 48],
                    ['name' => '350 عملة تيك توك (Coins)', 'sku' => 'tt_350', 'cost' => 190, 'price' => 235],
                    ['name' => '700 عملة تيك توك (Coins)', 'sku' => 'tt_700', 'cost' => 380, 'price' => 465],
                    ['name' => '1400 عملة تيك توك (Coins)', 'sku' => 'tt_1400', 'cost' => 760, 'price' => 920],
                    ['name' => '7000 عملة تيك توك (Coins)', 'sku' => 'tt_7000', 'cost' => 3800, 'price' => 4550],
                ]
            ],

            // ── 7. Bigo Live (شحن ماسات) ──
            [
                'category_id' => $voiceAppsCat->id,
                'name' => 'بيجو لايف (Bigo Live)',
                'slug' => 'bigo-live',
                'type' => ProductType::PLAYER_ID,
                'description' => 'شحن ماسات بيجو لايف الفوري والمباشر عبر الـ Bigo ID بأفضل الأسعار.',
                'image' => 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
                'player_id_label' => 'معرّف Bigo ID',
                'has_server_id' => false,
                'sort_order' => 7,
                'tiers' => [
                    ['name' => '42 ماسة (Diamonds)', 'sku' => 'bigo_42', 'cost' => 45, 'price' => 55],
                    ['name' => '210 ماسة (Diamonds)', 'sku' => 'bigo_210', 'cost' => 220, 'price' => 265],
                    ['name' => '840 ماسة (Diamonds)', 'sku' => 'bigo_840', 'cost' => 880, 'price' => 1050],
                ]
            ],

            // ── 8. Likee (شحن ماسات) ──
            [
                'category_id' => $voiceAppsCat->id,
                'name' => 'لايكي (Likee Live)',
                'slug' => 'likee',
                'type' => ProductType::PLAYER_ID,
                'description' => 'شحن ماسات وجواهر تطبيق لايكي فورياً ومباشراً بالـ Likee ID.',
                'image' => 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80',
                'player_id_label' => 'معرّف حساب Likee ID',
                'has_server_id' => false,
                'sort_order' => 8,
                'tiers' => [
                    ['name' => '45 ماسة لايكي (Diamonds)', 'sku' => 'likee_45', 'cost' => 40, 'price' => 50],
                    ['name' => '225 ماسة لايكي (Diamonds)', 'sku' => 'likee_225', 'cost' => 200, 'price' => 240],
                    ['name' => '900 ماسة لايكي (Diamonds)', 'sku' => 'likee_900', 'cost' => 800, 'price' => 950],
                ]
            ],

            // ── 9. Mico Live (ميكو لايف) ──
            [
                'category_id' => $voiceAppsCat->id,
                'name' => 'ميكو لايف (Mico Live)',
                'slug' => 'mico-live',
                'type' => ProductType::PLAYER_ID,
                'description' => 'شحن كوينز وعملات ميكو لايف فورياً إلى حسابك عبر الـ Mico ID.',
                'image' => 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=600&auto=format&fit=crop&q=80',
                'player_id_label' => 'معرّف حساب Mico ID',
                'has_server_id' => false,
                'sort_order' => 9,
                'tiers' => [
                    ['name' => '320 كوينز (Coins)', 'sku' => 'mico_320', 'cost' => 50, 'price' => 60],
                    ['name' => '1600 كوينز (Coins)', 'sku' => 'mico_1600', 'cost' => 240, 'price' => 290],
                    ['name' => '6400 كوينز (Coins)', 'sku' => 'mico_6400', 'cost' => 950, 'price' => 1100],
                ]
            ],

            // ── 10. YoHo (يوهو شات) ──
            [
                'category_id' => $voiceAppsCat->id,
                'name' => 'يوهو (YoHo Voice Chat)',
                'slug' => 'yoho',
                'type' => ProductType::PLAYER_ID,
                'description' => 'شحن كوينز وغرف المحادثة يوهو شات فورياً عبر المعرف YoHo ID.',
                'image' => 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop&q=80',
                'player_id_label' => 'معرّف حساب YoHo ID',
                'has_server_id' => false,
                'sort_order' => 10,
                'tiers' => [
                    ['name' => '500 عملة يوهو (Coins)', 'sku' => 'yoho_500', 'cost' => 35, 'price' => 45],
                    ['name' => '2500 عملة يوهو (Coins)', 'sku' => 'yoho_2500', 'cost' => 175, 'price' => 210],
                    ['name' => '10000 عملة يوهو (Coins)', 'sku' => 'yoho_10000', 'cost' => 690, 'price' => 820],
                ]
            ],

            // ── 11. Shahid VIP ──
            [
                'category_id' => $cardsCat->id,
                'name' => 'اشتراك شاهد VIP (Shahid VIP)',
                'slug' => 'shahid-vip',
                'type' => ProductType::VOUCHER,
                'description' => 'قسائم واشتراكات شاهد VIP الرسمية بدون إعلانات وبجودة 4K فائقة.',
                'image' => 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=600&auto=format&fit=crop&q=80',
                'player_id_label' => 'البريد الإلكتروني لتفعيل الاشتراك',
                'has_server_id' => false,
                'sort_order' => 11,
                'tiers' => [
                    ['name' => 'اشتراك شهر شاهد VIP', 'sku' => 'shahid_1m', 'cost' => 78, 'price' => 95],
                    ['name' => 'اشتراك 3 أشهر شاهد VIP', 'sku' => 'shahid_3m', 'cost' => 220, 'price' => 260],
                    ['name' => 'اشتراك سنة كاملة شاهد VIP', 'sku' => 'shahid_12m', 'cost' => 630, 'price' => 750],
                    ['name' => 'اشتراك شهر VIP + باقة الرياضة', 'sku' => 'shahid_sports_1m', 'cost' => 145, 'price' => 175],
                ]
            ],

            // ── 12. PlayStation Store ──
            [
                'category_id' => $cardsCat->id,
                'name' => 'بلايستيشن ستور (PlayStation Store)',
                'slug' => 'playstation-store',
                'type' => ProductType::VOUCHER,
                'description' => 'بطاقات شحن رصيد بلايستيشن أمريكي وسعودي لجهاز PS4 و PS5 فورياً.',
                'image' => 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&auto=format&fit=crop&q=80',
                'player_id_label' => 'البريد الإلكتروني لاستلام الكود',
                'has_server_id' => false,
                'sort_order' => 12,
                'tiers' => [
                    ['name' => 'بطاقة 10$ ستور أمريكي (PSN)', 'sku' => 'psn_10_usd', 'cost' => 480, 'price' => 520],
                    ['name' => 'بطاقة 20$ ستور أمريكي (PSN)', 'sku' => 'psn_20_usd', 'cost' => 960, 'price' => 1030],
                    ['name' => 'بطاقة 50$ ستور أمريكي (PSN)', 'sku' => 'psn_50_usd', 'cost' => 2390, 'price' => 2550],
                    ['name' => 'بطاقة 100$ ستور أمريكي (PSN)', 'sku' => 'psn_100_usd', 'cost' => 4750, 'price' => 5050],
                ]
            ],
        ];

        // ══════════════════════════════════════════════
        // 3. Seed Products, Tiers & Target Rates
        // ══════════════════════════════════════════════
        foreach ($productsData as $pData) {
            $tiers = $pData['tiers'] ?? [];
            $targetRates = $pData['target_rates'] ?? [];
            unset($pData['tiers'], $pData['target_rates']);

            $product = Product::withTrashed()->firstOrNew(['slug' => $pData['slug']]);
            $product->fill(array_merge($pData, ['is_active' => true]));
            if ($product->trashed()) {
                $product->restore();
            }
            $product->save();

            // Seed Tiers
            foreach ($tiers as $tIdx => $tData) {
                ProductTier::updateOrCreate(
                    [
                        'product_id' => $product->id,
                        'sku' => $tData['sku'],
                    ],
                    [
                        'name' => $tData['name'],
                        'source_cost' => $tData['cost'],
                        'final_price' => $tData['price'],
                        'cost_currency' => 'EGP',
                        'price_strategy' => PriceStrategy::MANUAL,
                        'min_qty' => 1,
                        'max_qty' => 50,
                        'in_stock' => true,
                        'stock_qty' => 9999,
                        'is_active' => true,
                        'sort_order' => $tIdx + 1,
                    ]
                );
            }

            // Seed Target Rates if applicable
            if (!empty($targetRates)) {
                TargetRate::where('product_id', $product->id)->delete();
                foreach ($targetRates as $rData) {
                    TargetRate::create([
                        'product_id' => $product->id,
                        'min_points' => $rData['min'],
                        'max_points' => $rData['max'],
                        'rate_per_point' => $rData['rate'],
                        'currency' => 'EGP',
                        'is_active' => true,
                    ]);
                }
            }
        }
    }
}
