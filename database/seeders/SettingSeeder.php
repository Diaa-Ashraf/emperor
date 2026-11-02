<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $heroServices = [
            [
                'id' => 1,
                'title' => 'إصدار بطاقات افتراضية',
                'subtitle' => 'فيزا وماستركارد دولية',
                'icon' => 'credit-card',
                'link' => '/category/cards',
                'is_active' => true,
            ],
            [
                'id' => 2,
                'title' => 'تحويل عملات دولية ومحلية',
                'subtitle' => 'شحن فوري متعدد الدول',
                'icon' => 'coins',
                'link' => '/deposit',
                'is_active' => true,
            ],
            [
                'id' => 3,
                'title' => 'سحب تارجت',
                'subtitle' => 'استبدال كوينز التارجت لكاش',
                'icon' => 'target',
                'link' => '/target/apps',
                'is_active' => true,
            ],
            [
                'id' => 4,
                'title' => 'شحن ألعاب',
                'subtitle' => 'ببجي وفري فاير وغيرها',
                'icon' => 'gamepad-2',
                'link' => '/category/games',
                'is_active' => true,
            ],
            [
                'id' => 5,
                'title' => 'شحن رصيد الموبايل',
                'subtitle' => 'فودافون واتصالات وأورنج',
                'icon' => 'smartphone',
                'link' => '/category/apps',
                'is_active' => true,
            ],
        ];

        $settings = [
            ['key' => 'site_name', 'value' => 'سند ومهره كارد', 'group' => 'general', 'type' => 'string', 'is_public' => true],
            ['key' => 'site_description', 'value' => 'خدماتك الرقمية والمالية في مكان واحد', 'group' => 'general', 'type' => 'string', 'is_public' => true],
            ['key' => 'site_logo', 'value' => '/images/mohra_sand_logo.png', 'group' => 'general', 'type' => 'string', 'is_public' => true],
            ['key' => 'site_favicon', 'value' => '/images/mohra_sand_logo.png', 'group' => 'general', 'type' => 'string', 'is_public' => true],
            ['key' => 'footer_slogan', 'value' => 'سند ومهره كارد — خدماتك الرقمية والمالية في مكان واحد', 'group' => 'general', 'type' => 'string', 'is_public' => true],
            ['key' => 'whatsapp_support', 'value' => '+201002575638', 'group' => 'general', 'type' => 'string', 'is_public' => true],
            ['key' => 'whatsapp_channel', 'value' => 'https://whatsapp.com/channel/0029VbDuIu76mYPJomZfr72N', 'group' => 'general', 'type' => 'string', 'is_public' => true],
            ['key' => 'target_agency_id', 'value' => 'EMP-TARGET-001', 'group' => 'target', 'type' => 'string', 'is_public' => true],
            ['key' => 'target_agency_name', 'value' => 'وكالة سند ومهره الرسمية', 'group' => 'target', 'type' => 'string', 'is_public' => true],
            ['key' => 'default_currency', 'value' => 'EGP', 'group' => 'general', 'type' => 'string', 'is_public' => true],
            ['key' => 'min_wallet_deposit', 'value' => '50', 'group' => 'wallet', 'type' => 'integer', 'is_public' => true],
            ['key' => 'theme_primary_color', 'value' => '#F5D061', 'group' => 'appearance', 'type' => 'string', 'is_public' => true],
            ['key' => 'theme_bg_color', 'value' => '#060e1d', 'group' => 'appearance', 'type' => 'string', 'is_public' => true],
            ['key' => 'hero_services', 'value' => json_encode($heroServices, JSON_UNESCAPED_UNICODE), 'group' => 'appearance', 'type' => 'json', 'is_public' => true],
            ['key' => 'referral_is_active', 'value' => '1', 'group' => 'general', 'type' => 'boolean', 'is_public' => true],
            ['key' => 'referral_percentage', 'value' => '2.5', 'group' => 'general', 'type' => 'float', 'is_public' => true],
            ['key' => 'referral_trigger', 'value' => 'deposit', 'group' => 'general', 'type' => 'string', 'is_public' => true],
            ['key' => 'referral_terms', 'value' => 'يحصل المحيل على نسبة عمولة تلقائية بقيمة 2.5% تُضاف لمحفظته فور تأكيد شحن الرصيد من قِبل أي صديق مسجل برابطه.', 'group' => 'general', 'type' => 'string', 'is_public' => true],
            ['key' => 'about_us_text', 'value' => 'منصة سند ومهره كارد هي وجهتك الأولى والآمنة لخدمات الشحن الرقمي والتحويلات المالية الدولية والمحلية وسحب التارجت بأفضل الأسعار وأسرع تنفيذ.', 'group' => 'general', 'type' => 'string', 'is_public' => true],
        ];

        foreach ($settings as $setting) {
            Setting::updateOrCreate(['key' => $setting['key']], $setting);
        }
    }
}
