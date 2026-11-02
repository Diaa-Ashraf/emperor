<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('support_contacts')) {
            DB::table('support_contacts')
                ->where(function ($query) {
                    $query->whereRaw('LOWER(channel) = ?', ['telegram'])
                        ->orWhere('name', 'like', '%تيليجرام%')
                        ->orWhere('name', 'like', '%تليجرام%');
                })
                ->delete();
        }

        if (Schema::hasTable('settings')) {
            DB::table('settings')->whereIn('key', ['telegram_support', 'social_telegram'])->delete();
        }

        if (Schema::hasTable('payment_methods') && Schema::hasColumn('payment_methods', 'percent_fee')) {
            DB::table('payment_methods')->update(['percent_fee' => 0]);
        }
    }

    public function down(): void
    {
        // Removed contact and fee data cannot be restored safely.
    }
};
