<?php

namespace Database\Seeders;

use App\Models\Banner;
use Illuminate\Database\Seeder;

class BannerSeeder extends Seeder
{
    public function run(): void
    {
        $banners = [
            [
                'title' => 'إيداع فودافون كاش أوتوماتيك خلال 0 ثانية',
                'subtitle' => 'أسرع وأسهل شحن رصيد للمحفظة فورياً',
                'link' => '/deposit',
                'image' => '/images/banners/banner_vodafone_cash.jpg',
                'type' => 'slider',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'title' => 'أقل سعر في مصر لبرامج الدردشة الصوتية',
                'subtitle' => 'عروض يومية مميزة على كوينز وباقات الشات',
                'link' => '/category/apps',
                'image' => '/images/banners/banner_chat_apps.jpg',
                'type' => 'slider',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'title' => 'انضم إلى مجتمعنا على واتساب',
                'subtitle' => 'تابع أحدث التحديثات والعروض الحصرية',
                'link' => 'https://whatsapp.com/channel/0029Vb97YHSB4hdZjFJysw14',
                'image' => '/images/banners/whatsapp_channel_banner.jpg',
                'type' => 'slider',
                'is_active' => true,
                'sort_order' => 3,
            ],
        ];

        foreach ($banners as $bannerData) {
            Banner::updateOrCreate(
                ['title' => $bannerData['title']],
                $bannerData
            );
        }
    }
}
