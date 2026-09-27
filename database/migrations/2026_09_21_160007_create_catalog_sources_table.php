<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('catalog_sources', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('driver', 64); // ka_cards_scraper, custom_api, etc.
            $table->string('base_url')->nullable();
            $table->text('api_key')->nullable();
            $table->text('api_secret')->nullable();
            $table->boolean('is_active')->default(true);
            $table->string('sync_status', 32)->default('idle'); // idle, syncing, failed, success
            $table->timestamp('last_synced_at')->nullable();
            $table->json('config')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('catalog_sources');
    }
};
