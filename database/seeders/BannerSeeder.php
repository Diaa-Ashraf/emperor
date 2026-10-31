<?php

namespace Database\Seeders;

use App\Models\Banner;
use Illuminate\Database\Seeder;

class BannerSeeder extends Seeder
{
    /**
     * Seeds clean primary official platform banner only.
     */
    public function run(): void
    {
        Banner::updateOrCreate(
            ['link' => '/category/all'],
            [
                'title' => 'مهره و سند كارد — خدماتك الرقمية والمالية في مكان واحد',
                'subtitle' => 'شحن الألعاب، سحب التارجت، تحويل العملات وإصدار البطاقات الافتراضية بأفضل الأسعار وأسرع تنفيذ',
                'link' => '/category/all',
                'image' => '/images/mohra_sand_card_banner.png',
                'type' => 'slider',
                'is_active' => true,
                'sort_order' => 1,
            ]
        );
    }
}
