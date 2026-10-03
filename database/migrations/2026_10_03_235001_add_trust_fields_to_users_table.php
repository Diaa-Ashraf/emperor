<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('trust_level', 20)->default('new')->after('role')->index();
            $table->unsignedInteger('successful_target_count')->default(0)->after('trust_level');
            $table->unsignedInteger('rejected_target_count')->default(0)->after('successful_target_count');
            $table->decimal('custom_auto_approve_limit', 12, 2)->nullable()->after('rejected_target_count');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'trust_level',
                'successful_target_count',
                'rejected_target_count',
                'custom_auto_approve_limit',
            ]);
        });
    }
};
