<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            ['key' => 'site_name', 'value' => 'Emperor | منصة إمبراطور لشحن الألعاب والبطاقات', 'group' => 'general', 'type' => 'string', 'is_public' => true],
            ['key' => 'site_description', 'value' => 'المنصة الرائدة في الشرق الأوسط لشحن الألعاب، تطبيقات المحادثة الصوتية، البطاقات الرقمية وبيع التارجت بأفضل الأسعار.', 'group' => 'general', 'type' => 'string', 'is_public' => true],
            ['key' => 'whatsapp_support', 'value' => '+201000000000', 'group' => 'general', 'type' => 'string', 'is_public' => true],
            ['key' => 'telegram_support', 'value' => 'EmperorSupport', 'group' => 'general', 'type' => 'string', 'is_public' => true],
            ['key' => 'target_agency_id', 'value' => 'EMP-TARGET-001', 'group' => 'target', 'type' => 'string', 'is_public' => true],
            ['key' => 'target_agency_name', 'value' => 'وكالة إمبراطور الرسمية', 'group' => 'target', 'type' => 'string', 'is_public' => true],
            ['key' => 'default_currency', 'value' => 'EGP', 'group' => 'general', 'type' => 'string', 'is_public' => true],
            ['key' => 'min_wallet_deposit', 'value' => '50', 'group' => 'wallet', 'type' => 'integer', 'is_public' => true],
            ['key' => 'theme_primary_color', 'value' => '#D4A537', 'group' => 'appearance', 'type' => 'string', 'is_public' => true],
            ['key' => 'theme_bg_color', 'value' => '#0D0D0F', 'group' => 'appearance', 'type' => 'string', 'is_public' => true],
        ];

        foreach ($settings as $setting) {
            Setting::updateOrCreate(['key' => $setting['key']], $setting);
        }
    }
}
