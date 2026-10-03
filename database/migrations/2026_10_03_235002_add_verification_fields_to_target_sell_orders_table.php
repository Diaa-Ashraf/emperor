<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('target_sell_orders', function (Blueprint $table) {
            $table->string('verification_code', 32)->nullable()->unique()->after('public_id');
            $table->boolean('auto_verified')->default(false)->after('status')->index();
            $table->string('verification_method', 32)->default('manual')->after('auto_verified');
            $table->json('ocr_result')->nullable()->after('verification_method');
            $table->decimal('ocr_confidence', 5, 2)->nullable()->after('ocr_result');
        });
    }

    public function down(): void
    {
        Schema::table('target_sell_orders', function (Blueprint $table) {
            $table->dropColumn([
                'verification_code',
                'auto_verified',
                'verification_method',
                'ocr_result',
                'ocr_confidence',
            ]);
        });
    }
};
