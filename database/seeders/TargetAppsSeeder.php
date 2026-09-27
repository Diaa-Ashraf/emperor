<?php

namespace Database\Seeders;

use App\Enums\ProductType;
use App\Models\Category;
use App\Models\Product;
use App\Models\TargetRate;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TargetAppsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Find or create the target applications category
        $category = Category::firstOrCreate(
            ['slug' => 'apps'],
            [
                'name' => 'قسم التطبيقات',
                'type' => 'voice_apps',
                'is_active' => true,
                'sort_order' => 1,
            ]
        );

        $apps = [
            [
                'name' => 'بارتي استار',
                'slug' => 'party-star-target',
                'rate' => 48.00,
                'min' => 5,
                'max' => 10000,
                'order' => 1,
                'desc' => 'بيع واستبدال تارجت تطبيق بارتي استار (Party Star) واستلام كاش فوري.',
            ],
            [
                'name' => 'بوتا لايف',
                'slug' => 'bouta-live-target',
                'rate' => 47.50,
                'min' => 5,
                'max' => 10000,
                'order' => 2,
                'desc' => 'بيع واستبدال تارجت تطبيق بوتا لايف (Bouta Live) واستلام كاش فوري.',
            ],
            [
                'name' => 'تامي',
                'slug' => 'tami-target',
                'rate' => 44.00,
                'min' => 10,
                'max' => 10000,
                'order' => 3,
                'desc' => 'بيع واستبدال تارجت تطبيق تامي (Tami) واستلام كاش فوري.',
            ],
            [
                'name' => 'جانكو',
                'slug' => 'janko-target',
                'rate' => 47.00,
                'min' => 5,
                'max' => 10000,
                'order' => 4,
                'desc' => 'بيع واستبدال تارجت تطبيق جانكو (Janko) واستلام كاش فوري.',
            ],
            [
                'name' => 'زفا لايف',
                'slug' => 'zafa-live-target',
                'rate' => 46.00,
                'min' => 5,
                'max' => 10000,
                'order' => 5,
                'desc' => 'بيع واستبدال تارجت تطبيق زفا لايف (Zafa Live) واستلام كاش فوري.',
            ],
            [
                'name' => 'صدفه',
                'slug' => 'sodfa-target',
                'rate' => 47.00,
                'min' => 5,
                'max' => 10000,
                'order' => 6,
                'desc' => 'بيع واستبدال تارجت تطبيق صدفه (Sodfa) واستلام كاش فوري.',
            ],
            [
                'name' => 'شباب شات',
                'slug' => 'shabab-chat-target',
                'rate' => 46.00,
                'min' => 5,
                'max' => 10000,
                'order' => 7,
                'desc' => 'بيع واستبدال تارجت تطبيق شباب شات (Shabab Chat) واستلام كاش فوري.',
            ],
            [
                'name' => 'سولو استار',
                'slug' => 'solo-star-target',
                'rate' => 46.50,
                'min' => 5,
                'max' => 10000,
                'order' => 8,
                'desc' => 'بيع واستبدال تارجت تطبيق سولو استار (Solo Star) واستلام كاش فوري.',
            ],
            [
                'name' => 'سو ماتش',
                'slug' => 'somatch-target',
                'rate' => 47.00,
                'min' => 5,
                'max' => 10000,
                'order' => 9,
                'desc' => 'بيع واستبدال تارجت تطبيق سو ماتش (SoMatch) واستلام كاش فوري.',
            ],
            [
                'name' => 'زينا لايف',
                'slug' => 'zina-live-target',
                'rate' => 46.00,
                'min' => 5,
                'max' => 10000,
                'order' => 10,
                'desc' => 'بيع واستبدال تارجت تطبيق زينا لايف (Zina Live) واستلام كاش فوري.',
            ],
            [
                'name' => 'بيجو لايف',
                'slug' => 'bigo-live-target',
                'rate' => 48.50,
                'min' => 10,
                'max' => 10000,
                'order' => 11,
                'desc' => 'بيع واستبدال تارجت تطبيق بيجو لايف (Bigo Live) واستلام كاش فوري.',
            ],
        ];

        foreach ($apps as $appData) {
            $product = Product::updateOrCreate(
                [
                    'slug' => $appData['slug'],
                ],
                [
                    'category_id' => $category->id,
                    'name' => $appData['name'],
                    'description' => $appData['desc'],
                    'type' => ProductType::TARGET,
                    'player_id_label' => 'معرّف الحساب (ID)',
                    'is_active' => true,
                    'sort_order' => $appData['order'],
                ]
            );

            // Create or update default rate in target_rates table
            TargetRate::updateOrCreate(
                [
                    'product_id' => $product->id,
                ],
                [
                    'min_points' => $appData['min'],
                    'max_points' => $appData['max'],
                    'rate_per_point' => $appData['rate'],
                    'currency' => 'EGP',
                    'is_active' => true,
                ]
            );
        }
    }
}
