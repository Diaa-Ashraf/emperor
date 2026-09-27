<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained()->cascadeOnDelete();
            $table->foreignId('catalog_source_id')->nullable()->constrained('catalog_sources')->nullOnDelete();
            $table->string('external_product_id')->nullable();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->string('type', 32)->default('player_id'); // player_id, voucher, target, direct_topup
            $table->string('player_id_label')->default('Player ID / معرف اللاعب');
            $table->string('player_id_validation_regex')->nullable();
            $table->string('player_id_guide_image')->nullable();
            $table->boolean('has_server_id')->default(false);
            $table->string('server_id_label')->nullable();
            $table->json('server_options')->nullable(); // list of servers if dropdown
            $table->boolean('requires_account_region')->default(false);
            $table->json('region_options')->nullable();
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
            $table->softDeletes();

            $table->index(['category_id', 'is_active', 'sort_order']);
            $table->index('slug');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
