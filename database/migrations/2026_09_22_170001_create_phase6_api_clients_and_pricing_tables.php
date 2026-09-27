<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Add webhook_url and api_rate_limit to users table
        Schema::table('users', function (Blueprint $table) {
            $table->string('webhook_url', 500)->nullable()->after('api_ip_whitelist');
            $table->integer('api_rate_limit')->default(60)->after('webhook_url'); // requests per minute
        });

        // 2. Per-client custom pricing table
        Schema::create('api_client_prices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('product_tier_id')->constrained('product_tiers')->cascadeOnDelete();
            $table->decimal('custom_price', 12, 2);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->unique(['user_id', 'product_tier_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('api_client_prices');
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['webhook_url', 'api_rate_limit']);
        });
    }
};
