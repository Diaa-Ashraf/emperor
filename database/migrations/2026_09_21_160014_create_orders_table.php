<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('public_id', 32)->unique(); // EMP-ORD-XXXXXX
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->foreignId('product_tier_id')->constrained()->cascadeOnDelete();
            $table->foreignId('provider_id')->nullable()->constrained('providers')->nullOnDelete();
            $table->unsignedInteger('quantity')->default(1);
            $table->decimal('unit_price', 12, 2);
            $table->decimal('total_amount', 12, 2);
            $table->string('currency', 3)->default('EGP');
            $table->decimal('cost_amount', 12, 4)->default(0.0000);
            $table->decimal('profit_amount', 12, 4)->default(0.0000);
            
            // Order Input Fields
            $table->string('player_id')->nullable();
            $table->string('server_id')->nullable();
            $table->string('account_region')->nullable();
            $table->json('extra_fields')->nullable();

            // Status & Execution
            $table->string('status', 32)->default('pending')->index(); // pending, processing, completed, failed, refunded, manual_review
            $table->string('provider_order_id')->nullable();
            $table->string('provider_status')->nullable();
            $table->json('provider_response')->nullable();
            $table->text('failure_reason')->nullable();
            $table->unsignedInteger('retry_count')->default(0);
            
            // Meta
            $table->string('channel', 20)->default('web'); // web, api, mobile
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'status', 'created_at']);
            $table->index(['product_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
