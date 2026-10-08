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
        Schema::table('payment_methods', function (Blueprint $table) {
            $table->string('sub_name', 100)->nullable()->after('name');
            $table->string('country', 50)->default('egypt')->after('code');
            $table->string('country_name', 100)->nullable()->after('country');
            $table->string('account_number', 255)->nullable()->after('percent_fee');
            $table->text('note')->nullable()->after('account_number');
            $table->text('instruction')->nullable()->after('note');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('payment_methods', function (Blueprint $table) {
            $table->dropColumn(['sub_name', 'country', 'country_name', 'account_number', 'note', 'instruction']);
        });
    }
};
