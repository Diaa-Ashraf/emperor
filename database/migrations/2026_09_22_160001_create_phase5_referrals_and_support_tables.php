<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Add referral and preference fields to users
        Schema::table('users', function (Blueprint $table) {
            $table->string('referral_code', 32)->nullable()->unique()->after('currency');
            $table->foreignId('referrer_id')->nullable()->after('referral_code')->constrained('users')->nullOnDelete();
            $table->json('preferences')->nullable()->after('fcm_token');
        });

        // 2. Referral Commissions Ledger
        Schema::create('referral_commissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('referrer_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('referred_user_id')->constrained('users')->cascadeOnDelete();
            $table->string('source_type', 32); // deposit, order
            $table->unsignedBigInteger('source_id');
            $table->decimal('amount', 12, 2);
            $table->decimal('percentage', 5, 2)->default(0.00);
            $table->string('currency', 3)->default('EGP');
            $table->string('status', 20)->default('paid');
            $table->timestamps();

            $table->index(['referrer_id', 'created_at']);
            $table->index(['source_type', 'source_id']);
        });

        // 3. Support Contacts
        Schema::create('support_contacts', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('channel', 32)->default('whatsapp'); // whatsapp, phone, telegram, email
            $table->string('value');
            $table->string('icon', 64)->nullable();
            $table->string('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('support_contacts');
        Schema::dropIfExists('referral_commissions');
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['referrer_id']);
            $table->dropColumn(['referral_code', 'referrer_id', 'preferences']);
        });
    }
};
