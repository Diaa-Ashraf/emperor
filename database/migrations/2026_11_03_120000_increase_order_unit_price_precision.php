<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->decimal('unit_price', 20, 8)->change();
        });
    }

    public function down(): void
    {
        // Keep the higher precision to avoid truncating existing fractional unit prices.
    }
};
