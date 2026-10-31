<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('product_tiers', function (Blueprint $table) {
            $table->decimal('source_cost', 16, 8)->default(0.00000000)->change();
            $table->decimal('final_price', 16, 8)->default(0.00000000)->change();
            $table->decimal('sale_price', 16, 8)->nullable()->change();
            $table->decimal('agent_price', 16, 8)->nullable()->change();
            $table->decimal('api_price', 16, 8)->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('product_tiers', function (Blueprint $table) {
            $table->decimal('source_cost', 12, 4)->default(0.0000)->change();
            $table->decimal('final_price', 12, 2)->default(0.00)->change();
            $table->decimal('sale_price', 12, 2)->nullable()->change();
            $table->decimal('agent_price', 12, 2)->nullable()->change();
            $table->decimal('api_price', 12, 2)->nullable()->change();
        });
    }
};
