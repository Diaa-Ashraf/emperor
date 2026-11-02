<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        $customerService = '+201002575638';
        $manager = '+972523281869';
        $channel = 'https://whatsapp.com/channel/0029VbDuIu76mYPJomZfr72N';

        if (Schema::hasTable('settings')) {
            foreach ([
                'whatsapp_support' => $customerService,
                'whatsapp_channel' => $channel,
            ] as $key => $value) {
                DB::table('settings')->updateOrInsert(
                    ['key' => $key],
                    [
                        'value' => $value,
                        'group' => 'general',
                        'type' => 'string',
                        'is_public' => true,
                        'updated_at' => now(),
                        'created_at' => now(),
                    ]
                );
            }
        }

        if (Schema::hasTable('support_contacts')) {
            $customerContact = DB::table('support_contacts')
                ->where('channel', 'whatsapp')
                ->orderBy('sort_order')
                ->orderBy('id')
                ->first();

            $contactData = [
                'name' => 'خدمة العملاء (واتساب)',
                'value' => $customerService,
                'description' => 'متاح للاستفسارات العامة ومتابعة الطلبات',
                'is_active' => true,
                'sort_order' => 1,
                'updated_at' => now(),
            ];

            if ($customerContact) {
                DB::table('support_contacts')->where('id', $customerContact->id)->update($contactData);
            } else {
                DB::table('support_contacts')->insert($contactData + [
                    'channel' => 'whatsapp',
                    'created_at' => now(),
                ]);
            }

            $managerContact = DB::table('support_contacts')
                ->where('channel', 'whatsapp')
                ->where('sort_order', 2)
                ->first();

            $managerData = [
                'name' => 'مدير المنصة (واتساب)',
                'value' => $manager,
                'description' => 'للتواصل المباشر مع مدير المنصة',
                'is_active' => true,
                'sort_order' => 2,
                'updated_at' => now(),
            ];

            if ($managerContact) {
                DB::table('support_contacts')->where('id', $managerContact->id)->update($managerData);
            } else {
                DB::table('support_contacts')->insert($managerData + [
                    'channel' => 'whatsapp',
                    'created_at' => now(),
                ]);
            }
        }
    }

    public function down(): void
    {
        // Keep the supplied support details in place when rolling back code.
    }
};
