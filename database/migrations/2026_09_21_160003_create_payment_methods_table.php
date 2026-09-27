<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payment_methods', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code', 32)->unique(); // vodafone_cash, instapay, usdt_trc20, bank_transfer, etc.
            $table->string('type', 20)->default('manual'); // manual, gateway
            $table->string('currency', 3)->default('EGP');
            $table->string('logo')->nullable();
            $table->decimal('min_amount', 12, 2)->default(10.00);
            $table->decimal('max_amount', 12, 2)->default(50000.00);
            $table->decimal('fixed_fee', 12, 2)->default(0.00);
            $table->decimal('percent_fee', 5, 2)->default(0.00);
            $table->json('account_details')->nullable(); // e.g. wallet number, instapay handle, USDT address
            $table->json('instructions')->nullable(); // instructions in AR & EN
            $table->boolean('is_active')->default(true);
            $table->boolean('allow_deposit')->default(true);
            $table->boolean('allow_withdrawal')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payment_methods');
    }
};
