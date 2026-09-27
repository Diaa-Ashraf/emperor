<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('product_providers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->foreignId('product_tier_id')->constrained()->cascadeOnDelete();
            $table->foreignId('provider_id')->constrained()->cascadeOnDelete();
            $table->string('provider_sku');
            $table->unsignedInteger('priority')->default(1);
            $table->decimal('cost_price', 12, 4)->default(0.0000);
            $table->string('cost_currency', 3)->default('USD');
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->unique(['product_tier_id', 'provider_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_providers');
    }
};
