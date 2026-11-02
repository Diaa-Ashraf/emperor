<?php

namespace Database\Seeders;

use App\Models\Setting;
use App\Models\SupportContact;
use Illuminate\Database\Seeder;

class SupportContactSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Referral System Core Settings
        Setting::set('referral_is_active', true);
        Setting::set('referral_percentage', 2.5);
        Setting::set('referral_trigger', 'deposit');
        Setting::set('referral_terms', 'يحصل المحيل على نسبة عمولة تلقائية بقيمة 2.5% تُضاف لمحفظته فور تأكيد شحن الرصيد من قِبل أي صديق مسجل برابطه.');

        // 2. Clean Platform Support Contacts
        SupportContact::updateOrCreate(
            ['channel' => 'whatsapp', 'sort_order' => 1],
            [
                'name' => 'خدمة العملاء (واتساب)',
                'value' => '+201002575638',
                'description' => 'متاح على مدار الساعة لخدمة العملاء والاستفسارات',
                'is_active' => true,
            ]
        );

        SupportContact::updateOrCreate(
            ['channel' => 'whatsapp', 'sort_order' => 2],
            [
                'name' => 'مدير المنصة (واتساب)',
                'value' => '+972523281869',
                'description' => 'للتواصل المباشر مع مدير المنصة',
                'is_active' => true,
            ]
        );

        SupportContact::updateOrCreate(
            ['channel' => 'email'],
            [
                'name' => 'بريد الاستفسارات والشكاوى',
                'value' => 'support@mohra-sand.com',
                'description' => 'للشكاوى والاقتراحات وعقود الوكلاء والموزعين',
                'is_active' => true,
                'sort_order' => 3,
            ]
        );
    }
}
