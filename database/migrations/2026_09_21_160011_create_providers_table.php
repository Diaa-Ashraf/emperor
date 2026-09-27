<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('providers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('driver', 64); // manual, ka_cards_api, custom_reseller_api
            $table->string('base_url')->nullable();
            $table->text('api_key')->nullable();
            $table->text('api_secret')->nullable();
            $table->string('webhook_secret')->nullable();
            $table->unsignedInteger('priority')->default(1);
            $table->decimal('balance', 16, 4)->default(0.0000);
            $table->string('balance_currency', 3)->default('USD');
            $table->boolean('is_active')->default(true);
            $table->boolean('auto_fulfill')->default(true);
            $table->json('config')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('providers');
    }
};
