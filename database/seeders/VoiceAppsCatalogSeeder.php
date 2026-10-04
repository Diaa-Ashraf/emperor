<?php

namespace Database\Seeders;

use App\Enums\CategoryType;
use App\Enums\PriceStrategy;
use App\Enums\ProductType;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductTier;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Cache;

class VoiceAppsCatalogSeeder extends Seeder
{
    public function run(): void
    {
        $appsCat = Category::firstOrCreate(
            ['slug' => 'apps'],
            [
                'name' => 'قسم التطبيقات',
                'type' => CategoryType::VOICE_APPS,
                'description' => 'شحن كوينز وتطبيقات المحادثة الصوتية والبث المباشر',
                'is_active' => true,
                'sort_order' => 1,
            ]
        );

        $apps = [
            [
                'name' => 'يوهو (YOHO)',
                'slug' => 'yoho',
                'desc' => 'شحن كوينز تطبيق يوهو YOHO فوري ومباشر إلى حسابك.',
                'label' => 'معرف حساب يوهو (User ID)',
                'tiers' => [
                    ['name' => '7,500 كوينز', 'price' => 50.00],
                    ['name' => '15,000 كوينز', 'price' => 100.00],
                    ['name' => '37,500 كوينز', 'price' => 250.00],
                    ['name' => '75,000 كوينز', 'price' => 500.00],
                    ['name' => '150,000 كوينز', 'price' => 1000.00],
                    ['name' => '375,000 كوينز', 'price' => 2500.00],
                ]
            ],
            [
                'name' => 'هلين شات (HAAHLAN)',
                'slug' => 'haahlan',
                'desc' => 'شحن كوينز وجواهر هلين شات Haahlan فوري عبر المعرف.',
                'label' => 'معرف حساب هلين (User ID)',
                'tiers' => [
                    ['name' => '6,800 كوينز', 'price' => 50.00],
                    ['name' => '13,600 كوينز', 'price' => 100.00],
                    ['name' => '34,000 كوينز', 'price' => 250.00],
                    ['name' => '68,000 كوينز', 'price' => 500.00],
                    ['name' => '136,000 كوينز', 'price' => 1000.00],
                ]
            ],
            [
                'name' => 'فان اب (FunUP)',
                'slug' => 'funup',
                'desc' => 'شحن ذهب وكوينز تطبيق فان اب FunUP فوري ومباشر.',
                'label' => 'معرف حساب فان اب (User ID)',
                'tiers' => [
                    ['name' => '7,000 كوينز', 'price' => 50.00],
                    ['name' => '14,000 كوينز', 'price' => 100.00],
                    ['name' => '35,000 كوينز', 'price' => 250.00],
                    ['name' => '70,000 كوينز', 'price' => 500.00],
                    ['name' => '140,000 كوينز', 'price' => 1000.00],
                ]
            ],
            [
                'name' => 'زينا لايف (Zina Live)',
                'slug' => 'zina-live',
                'desc' => 'شحن مباشر وفوري لكوينز تطبيق زينا لايف عبر الأيدي.',
                'label' => 'معرف حساب زينا (User ID)',
                'tiers' => [
                    ['name' => '7,200 كوينز', 'price' => 50.00],
                    ['name' => '14,400 كوينز', 'price' => 100.00],
                    ['name' => '36,000 كوينز', 'price' => 250.00],
                    ['name' => '72,000 كوينز', 'price' => 500.00],
                    ['name' => '144,000 كوينز', 'price' => 1000.00],
                ]
            ],
            [
                'name' => 'مجلس (Majlis)',
                'slug' => 'majlis',
                'desc' => 'شحن رصيد وكوينز تطبيق مجلس الصوتي بأفضل الأسعار.',
                'label' => 'معرف حساب مجلس (User ID)',
                'tiers' => [
                    ['name' => '5,000 كوينز', 'price' => 50.00],
                    ['name' => '10,000 كوينز', 'price' => 100.00],
                    ['name' => '25,000 كوينز', 'price' => 250.00],
                    ['name' => '50,000 كوينز', 'price' => 500.00],
                    ['name' => '100,000 كوينز', 'price' => 1000.00],
                ]
            ],
            [
                'name' => 'هايو / YABI',
                'slug' => 'yabi',
                'desc' => 'شحن كوينز تطبيق هايو YABI فوري ومضمون.',
                'label' => 'معرف حساب هايو YABI (User ID)',
                'tiers' => [
                    ['name' => '7,000 كوينز', 'price' => 50.00],
                    ['name' => '14,000 كوينز', 'price' => 100.00],
                    ['name' => '35,000 كوينز', 'price' => 250.00],
                    ['name' => '70,000 كوينز', 'price' => 500.00],
                    ['name' => '140,000 كوينز', 'price' => 1000.00],
                ]
            ],
            [
                'name' => 'زفا (Zafa)',
                'slug' => 'zafa',
                'desc' => 'شحن كوينز تطبيق زفا شات فوري عبر المعرف.',
                'label' => 'معرف حساب زفا (User ID)',
                'tiers' => [
                    ['name' => '7,500 كوينز', 'price' => 50.00],
                    ['name' => '15,000 كوينز', 'price' => 100.00],
                    ['name' => '37,500 كوينز', 'price' => 250.00],
                    ['name' => '75,000 كوينز', 'price' => 500.00],
                    ['name' => '150,000 كوينز', 'price' => 1000.00],
                ]
            ],
            [
                'name' => 'يويو (YoYo)',
                'slug' => 'yoyo',
                'desc' => 'شحن كوينز تطبيق يويو شات YoYo الصوتي فوري.',
                'label' => 'معرف حساب يويو (User ID)',
                'tiers' => [
                    ['name' => '6,500 كوينز', 'price' => 50.00],
                    ['name' => '13,000 كوينز', 'price' => 100.00],
                    ['name' => '32,500 كوينز', 'price' => 250.00],
                    ['name' => '65,000 كوينز', 'price' => 500.00],
                    ['name' => '130,000 كوينز', 'price' => 1000.00],
                ]
            ],
            [
                'name' => 'بولا (Pola Live)',
                'slug' => 'pola-live',
                'desc' => 'شحن مباشر وفوري لبرنامج بولا لايف عبر الأيدي الرسمي.',
                'label' => 'معرف الحساب (User ID)',
                'tiers' => [
                    ['name' => '7,000 كوينز', 'price' => 50.00],
                    ['name' => '14,000 كوينز', 'price' => 100.00],
                    ['name' => '35,000 كوينز', 'price' => 250.00],
                    ['name' => '70,000 كوينز', 'price' => 500.00],
                    ['name' => '140,000 كوينز', 'price' => 1000.00],
                ]
            ],
            [
                'name' => 'هيا شات (Hya Chat)',
                'slug' => 'hya-chat',
                'desc' => 'شحن كوينز برنامج هيا شات Hya Chat عبر المعرف.',
                'label' => 'معرف حساب هيا شات (User ID)',
                'tiers' => [
                    ['name' => '6,900 كوينز', 'price' => 50.00],
                    ['name' => '13,800 كوينز', 'price' => 100.00],
                    ['name' => '34,500 كوينز', 'price' => 250.00],
                    ['name' => '69,000 كوينز', 'price' => 500.00],
                    ['name' => '138,000 كوينز', 'price' => 1000.00],
                ]
            ],
            [
                'name' => 'سول شيل (SoulChill)',
                'slug' => 'soulchill',
                'desc' => 'شحن كريستالات وكوينز سول شيل SoulChill الصوتي.',
                'label' => 'معرف حساب سول شيل (User ID)',
                'tiers' => [
                    ['name' => '7,000 كوينز', 'price' => 50.00],
                    ['name' => '14,000 كوينز', 'price' => 100.00],
                    ['name' => '35,000 كوينز', 'price' => 250.00],
                    ['name' => '70,000 كوينز', 'price' => 500.00],
                    ['name' => '140,000 كوينز', 'price' => 1000.00],
                ]
            ],
            [
                'name' => 'ويبلاي (WePlay)',
                'slug' => 'weplay',
                'desc' => 'شحن ذهب وكوينز تطبيق ألعاب ويبلاي WePlay الترفيهي.',
                'label' => 'معرف حساب ويبلاي (User ID)',
                'tiers' => [
                    ['name' => '6,000 ذهب', 'price' => 50.00],
                    ['name' => '12,000 ذهب', 'price' => 100.00],
                    ['name' => '30,000 ذهب', 'price' => 250.00],
                    ['name' => '60,000 ذهب', 'price' => 500.00],
                    ['name' => '120,000 ذهب', 'price' => 1000.00],
                ]
            ],
        ];

        foreach ($apps as $index => $appData) {
            $product = Product::updateOrCreate(
                ['slug' => $appData['slug']],
                [
                    'category_id' => $appsCat->id,
                    'name' => $appData['name'],
                    'type' => ProductType::PLAYER_ID,
                    'player_id_label' => $appData['label'],
                    'description' => $appData['desc'],
                    'has_server_id' => false,
                    'is_active' => true,
                    'sort_order' => $index + 1,
                ]
            );

            foreach ($appData['tiers'] as $tIndex => $t) {
                ProductTier::updateOrCreate(
                    ['product_id' => $product->id, 'name' => $t['name']],
                    [
                        'source_cost' => $t['price'] * 0.9,
                        'cost_currency' => 'EGP',
                        'price_strategy' => PriceStrategy::PERCENTAGE,
                        'margin_percent' => 5.0,
                        'final_price' => $t['price'],
                        'agent_price' => $t['price'] * 0.96,
                        'api_price' => $t['price'] * 0.94,
                        'is_active' => true,
                        'sort_order' => $tIndex + 1,
                    ]
                );
            }
        }

        Cache::flush();
    }
}
