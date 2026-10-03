<?php

namespace Tests\Feature;

use App\Models\ScheduledNotification;
use App\Models\User;
use App\Services\SmartNotificationService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SmartNotificationsTest extends TestCase
{
    use RefreshDatabase;

    public function test_smart_notification_sends_to_active_users(): void
    {
        $service = app(SmartNotificationService::class);

        User::factory()->count(3)->create(['status' => 'active']);

        $campaign = ScheduledNotification::create([
            'title' => 'عروض حصرية',
            'body' => 'خصم 10% اليوم فقط',
            'type' => 'in_app',
            'target_audience' => 'all',
            'is_active' => true,
        ]);

        $sentCount = $service->sendToAudience($campaign);

        $this->assertGreaterThanOrEqual(3, $sentCount);
        $this->assertNotNull($campaign->fresh()->sent_at);
        $this->assertGreaterThanOrEqual(3, $campaign->fresh()->sent_count);
    }
}
