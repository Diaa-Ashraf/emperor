<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pricing_rules', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedInteger('priority')->default(10);
            $table->string('target_type', 32)->default('all'); // all, role, specific_user, category, product, tier
            $table->unsignedBigInteger('target_id')->nullable();
            $table->string('margin_type', 32)->default('percentage'); // percentage_discount, percentage_markup, fixed_discount, fixed_markup
            $table->decimal('margin_value', 12, 4);
            $table->boolean('is_active')->default(true);
            $table->timestamp('valid_from')->nullable();
            $table->timestamp('valid_to')->nullable();
            $table->timestamps();

            $table->index(['target_type', 'target_id', 'is_active']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pricing_rules');
    }
};
