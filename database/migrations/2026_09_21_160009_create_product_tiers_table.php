<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('product_tiers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->string('name'); // e.g. "60 UC", "325 Diamonds", "1000 Coins"
            $table->string('sku')->nullable();
            $table->decimal('source_cost', 12, 4)->default(0.0000);
            $table->string('cost_currency', 3)->default('EGP');
            $table->string('price_strategy', 32)->default('percentage'); // percentage, fixed_addition, manual
            $table->decimal('margin_percent', 6, 2)->default(5.00);
            $table->decimal('fixed_margin', 12, 4)->default(0.0000);
            $table->decimal('final_price', 12, 2)->default(0.00); // base price for end customer
            $table->decimal('agent_price', 12, 2)->nullable(); // discounted price for agents/resellers
            $table->decimal('api_price', 12, 2)->nullable(); // price for API clients
            $table->decimal('sale_price', 12, 2)->nullable(); // promotional price
            $table->unsignedInteger('min_qty')->default(1);
            $table->unsignedInteger('max_qty')->default(100);
            $table->boolean('in_stock')->default(true);
            $table->integer('stock_qty')->default(-1); // -1 = infinite / digital provider
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->json('metadata')->nullable();
            $table->timestamps();

            $table->index(['product_id', 'is_active', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_tiers');
    }
};
