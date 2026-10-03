<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('scheduled_notifications', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('body');
            $table->string('type', 32)->default('both'); // push, in_app, both
            $table->string('target_audience', 32)->default('all'); // all, active_users, inactive_users, specific_users
            $table->json('target_user_ids')->nullable();
            $table->json('segment_rules')->nullable(); // min_balance, max_orders, last_login_days, etc.
            $table->string('action_url')->nullable();
            $table->string('image_url')->nullable();
            $table->timestamp('scheduled_at')->nullable()->index();
            $table->timestamp('sent_at')->nullable()->index();
            $table->unsignedInteger('sent_count')->default(0);
            $table->boolean('is_active')->default(true)->index();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('scheduled_notifications');
    }
};
