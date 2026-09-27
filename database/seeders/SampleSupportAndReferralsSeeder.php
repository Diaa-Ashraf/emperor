<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\ReferralCommission;
use App\Models\Setting;
use App\Models\SupportContact;
use App\Models\User;
use Illuminate\Database\Seeder;

class SampleSupportAndReferralsSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Referral Settings
        Setting::set('referral_is_active', true);
        Setting::set('referral_percentage', 2.5);
        Setting::set('referral_trigger', 'deposit');
        Setting::set('referral_terms', 'يحصل المحيل على نسبة عمولة تلقائية بقيمة 2.5% تُضاف لمحفظته فور تأكيد شحن الرصيد من قِبل أي صديق مسجل برابطه.');

        // 2. Support Contacts
        SupportContact::firstOrCreate(
            ['value' => '+201099887766'],
            [
                'name' => 'خدمة العملاء والشحن السريع (واتساب)',
                'channel' => 'whatsapp',
                'description' => 'متاح على مدار الساعة للإيداع والاستفسارات السريعة',
                'is_active' => true,
                'sort_order' => 1,
            ]
        );

        SupportContact::firstOrCreate(
            ['value' => '@EmperorSupport_Bot'],
            [
                'name' => 'قناة الدعم الفني الرسمية (تيليجرام)',
                'channel' => 'telegram',
                'description' => 'تحديثات الأسعار والعروض والدعم الفني المباشر',
                'is_active' => true,
                'sort_order' => 2,
            ]
        );

        SupportContact::firstOrCreate(
            ['value' => 'support@emperor-topup.com'],
            [
                'name' => 'بريد الاستفسارات والشكاوى',
                'channel' => 'email',
                'description' => 'للشكاوى والاقتراحات وعقود الوكلاء والموزعين',
                'is_active' => true,
                'sort_order' => 3,
            ]
        );

        // 3. Link customer to sample referrer
        $referrer = User::where('role', UserRole::CUSTOMER)->first();
        if ($referrer) {
            $invitedCustomer = User::firstOrCreate(
                ['email' => 'friend@emperor.com'],
                [
                    'name' => 'صديق إمبراطور المدعو',
                    'phone' => '+201055554433',
                    'password' => bcrypt('12345678'),
                    'role' => UserRole::CUSTOMER,
                    'status' => 'active',
                    'currency' => 'EGP',
                    'referrer_id' => $referrer->id,
                ]
            );

            ReferralCommission::firstOrCreate(
                [
                    'referrer_id' => $referrer->id,
                    'referred_user_id' => $invitedCustomer->id,
                    'source_id' => 101,
                ],
                [
                    'source_type' => 'deposit',
                    'amount' => 25.00,
                    'percentage' => 2.50,
                    'currency' => 'EGP',
                    'status' => 'paid',
                    'created_at' => now()->subHours(5),
                ]
            );
        }
    }
}
