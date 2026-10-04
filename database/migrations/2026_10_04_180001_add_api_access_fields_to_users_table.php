<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('api_access_status', 20)->default('inactive')->index()->after('api_rate_limit');
            $table->timestamp('api_access_requested_at')->nullable()->after('api_access_status');
            $table->timestamp('api_access_approved_at')->nullable()->after('api_access_requested_at');
            $table->text('api_access_notes')->nullable()->after('api_access_approved_at');
        });

        // Backfill existing API clients and Admins as active
        \DB::table('users')
            ->where('role', 'api_client')
            ->orWhereNotNull('api_key')
            ->update([
                'api_access_status' => 'active',
                'api_access_approved_at' => now(),
            ]);
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'api_access_status',
                'api_access_requested_at',
                'api_access_approved_at',
                'api_access_notes',
            ]);
        });
    }
};
