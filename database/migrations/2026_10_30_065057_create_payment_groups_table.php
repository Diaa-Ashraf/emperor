<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payment_groups', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('currency', 10)->default('EGP');
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        if (!Schema::hasColumn('payment_methods', 'payment_group_id')) {
            Schema::table('payment_methods', function (Blueprint $table) {
                $table->foreignId('payment_group_id')->nullable()->after('id');
                $table->string('bank_name')->nullable()->after('account_number');
                $table->string('account_holder_name')->nullable()->after('bank_name');
                $table->string('qr_code')->nullable()->after('logo');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('payment_methods', 'payment_group_id')) {
            Schema::table('payment_methods', function (Blueprint $table) {
                $table->dropColumn(['payment_group_id', 'bank_name', 'account_holder_name', 'qr_code']);
            });
        }
        Schema::dropIfExists('payment_groups');
    }
};
