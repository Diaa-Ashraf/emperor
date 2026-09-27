<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('target_sell_orders', function (Blueprint $table) {
            $table->id();
            $table->string('public_id', 32)->unique(); // EMP-TGT-XXXXXX
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete(); // the target app (e.g. Tami, Boota Live...)
            $table->string('app_user_id'); // sender's ID inside the target app
            $table->string('app_username')->nullable();
            $table->string('agency_id'); // Emperor agency ID the target was sent to
            $table->unsignedBigInteger('target_points'); // amount of target/diamonds/points
            $table->decimal('rate_per_point', 16, 8); // e.g. 0.05 EGP per 1000 points
            $table->decimal('gross_amount', 12, 2);
            $table->decimal('fee', 12, 2)->default(0.00);
            $table->decimal('net_payout', 12, 2); // credited to user wallet
            $table->string('currency', 3)->default('EGP');
            $table->string('payout_method', 32)->default('wallet'); // wallet, direct_cashout
            $table->json('payout_details')->nullable();
            $table->string('proof_image')->nullable(); // screenshot proof of transfer
            $table->text('user_notes')->nullable();
            $table->string('status', 32)->default('pending')->index(); // pending, in_review, verified, paid, rejected, cancelled
            $table->foreignId('reviewer_id')->nullable()->constrained('users')->nullOnDelete();
            $table->text('reviewer_notes')->nullable();
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'status', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('target_sell_orders');
    }
};
