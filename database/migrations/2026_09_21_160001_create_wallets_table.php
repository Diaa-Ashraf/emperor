<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('wallets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('currency', 3)->default('EGP');
            $table->decimal('balance', 16, 4)->default(0.0000);
            $table->decimal('frozen_balance', 16, 4)->default(0.0000);
            $table->boolean('is_locked')->default(false);
            $table->timestamps();

            $table->unique(['user_id', 'currency']);
            $table->index('currency');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('wallets');
    }
};
