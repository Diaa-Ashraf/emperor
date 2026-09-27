<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vouchers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->foreignId('product_tier_id')->constrained()->cascadeOnDelete();
            $table->text('code'); // encrypted or plain depending on setting
            $table->string('serial_number')->nullable();
            $table->dateTime('expires_at')->nullable();
            $table->string('status', 20)->default('available')->index(); // available, reserved, sold, expired
            $table->unsignedBigInteger('order_id')->nullable()->index();
            $table->timestamps();

            $table->index(['product_tier_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vouchers');
    }
};
