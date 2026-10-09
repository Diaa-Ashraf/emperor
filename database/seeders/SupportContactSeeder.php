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

        // 2. Official Customer Support Contacts
        SupportContact::updateOrCreate(
            ['channel' => 'whatsapp'],
            [
                'name' => 'خدمة العملاء والشحن السريع (واتساب)',
                'value' => '+201025515743',
                'description' => 'متاح على مدار الساعة للإيداع والاستفسارات السريعة',
                'is_active' => true,
                'sort_order' => 1,
            ]
        );

        SupportContact::updateOrCreate(
            ['channel' => 'telegram'],
            [
                'name' => 'قناة الدعم الفني الرسمية (تيليجرام)',
                'value' => '@EmperorSupport_Bot',
                'description' => 'تحديثات الأسعار والعروض والدعم الفني المباشر',
                'is_active' => true,
                'sort_order' => 2,
            ]
        );

        SupportContact::updateOrCreate(
            ['channel' => 'email'],
            [
                'name' => 'بريد الاستفسارات والشكاوى',
                'value' => 'support@emperor-topup.com',
                'description' => 'للشكاوى والاقتراحات وعقود الوكلاء والموزعين',
                'is_active' => true,
                'sort_order' => 3,
            ]
        );
    }
}
