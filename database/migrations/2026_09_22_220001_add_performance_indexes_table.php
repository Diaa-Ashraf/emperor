<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->index(['user_id', 'status'], 'idx_orders_user_status');
            $table->index(['status', 'created_at'], 'idx_orders_status_created');
        });

        Schema::table('deposit_requests', function (Blueprint $table) {
            $table->index(['user_id', 'status'], 'idx_deposits_user_status');
        });

        Schema::table('wallet_transactions', function (Blueprint $table) {
            $table->index(['wallet_id', 'created_at'], 'idx_wallet_tx_wallet_created');
        });

        Schema::table('products', function (Blueprint $table) {
            $table->index(['category_id', 'is_active'], 'idx_products_cat_active');
            $table->index(['type', 'is_active'], 'idx_products_type_active');
        });

        Schema::table('product_tiers', function (Blueprint $table) {
            $table->index(['product_id', 'is_active'], 'idx_tiers_prod_active');
        });

        Schema::table('target_sell_orders', function (Blueprint $table) {
            $table->index(['user_id', 'status'], 'idx_target_orders_user_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropIndex('idx_orders_user_status');
            $table->dropIndex('idx_orders_status_created');
        });

        Schema::table('deposit_requests', function (Blueprint $table) {
            $table->dropIndex('idx_deposits_user_status');
        });

        Schema::table('wallet_transactions', function (Blueprint $table) {
            $table->dropIndex('idx_wallet_tx_wallet_created');
        });

        Schema::table('products', function (Blueprint $table) {
            $table->dropIndex('idx_products_cat_active');
            $table->dropIndex('idx_products_type_active');
        });

        Schema::table('product_tiers', function (Blueprint $table) {
            $table->dropIndex('idx_tiers_prod_active');
        });

        Schema::table('target_sell_orders', function (Blueprint $table) {
            $table->dropIndex('idx_target_orders_user_status');
        });
    }
};
