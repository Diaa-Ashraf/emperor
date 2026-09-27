<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('banners', function (Blueprint $table) {
            $table->decimal('old_price', 10, 2)->nullable()->after('subtitle');
            $table->decimal('sale_price', 10, 2)->nullable()->after('old_price');
            $table->string('discount_badge', 64)->nullable()->after('sale_price');
            $table->unsignedTinyInteger('claimed_percent')->nullable()->after('discount_badge');
            $table->unsignedInteger('remaining_items')->nullable()->after('claimed_percent');
        });
    }

    public function down(): void
    {
        Schema::table('banners', function (Blueprint $table) {
            $table->dropColumn([
                'old_price',
                'sale_price',
                'discount_badge',
                'claimed_percent',
                'remaining_items',
            ]);
        });
    }
};
