<?php

namespace Tests\Feature;

use App\Adapters\Notifications\FirebaseChannel;
use App\DTOs\NotificationPayloadDTO;
use App\Models\User;
use App\Models\Wallet;
use App\Services\NotificationService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class Phase11FirebasePushTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->artisan('db:seed', ['--class' => 'SettingSeeder'])->run();
    }

    public function test_authenticated_user_can_update_fcm_token(): void
    {
        $user = User::factory()->create();
        Wallet::create(['user_id' => $user->id, 'currency' => 'EGP', 'balance' => 0]);

        $response = $this->actingAs($user)->postJson('/api/v1/profile/fcm-token', [
            'fcm_token' => 'fcm_sample_device_token_xyz_1234567890',
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
            ]);

        $this->assertEquals('fcm_sample_device_token_xyz_1234567890', $user->fresh()->fcm_token);
    }

    public function test_updating_fcm_token_requires_token(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->postJson('/api/v1/profile/fcm-token', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['fcm_token']);
    }

    public function test_notification_service_dispatches_fcm_push_when_token_exists(): void
    {
        $user = User::factory()->create([
            'fcm_token' => 'fcm_valid_user_device_token_999',
        ]);
        Wallet::create(['user_id' => $user->id, 'currency' => 'EGP', 'balance' => 0]);

        // Mock FirebaseChannel
        $firebaseChannelMock = $this->mock(FirebaseChannel::class);
        $firebaseChannelMock->shouldReceive('send')
            ->once()
            ->withArgs(function ($token, $payload) {
                return $token === 'fcm_valid_user_device_token_999'
                    && $payload->title === 'تم شحن المحفظة'
                    && $payload->body === 'تمت إضافة 500 جنيه إلى محفظتك بنجاح.';
            })
            ->andReturn(true);

        $notificationService = new NotificationService($firebaseChannelMock);

        $payload = new NotificationPayloadDTO(
            title: 'تم شحن المحفظة',
            body: 'تمت إضافة 500 جنيه إلى محفظتك بنجاح.',
            type: 'deposit_approved',
            link: '/wallet',
            data: ['amount' => 500, 'currency' => 'EGP']
        );

        $notificationService->notify($user, $payload);

        // Assert database notification was created
        $this->assertDatabaseHas('notifications', [
            'notifiable_id' => $user->id,
            'type' => 'deposit_approved',
        ]);
    }

    public function test_firebase_channel_formats_and_sends_http_request(): void
    {
        Http::fake([
            'https://fcm.googleapis.com/fcm/send' => Http::response(['success' => 1, 'failure' => 0], 200),
        ]);

        config(['services.firebase.server_key' => 'test_server_key_secret']);

        $channel = new FirebaseChannel();
        $payload = new NotificationPayloadDTO(
            title: 'طلب مكتمل 👑',
            body: 'تم شحن شدات ببجي بنجاح.',
            type: 'order_completed',
            link: '/orders/101'
        );

        $result = $channel->send('device_token_123', $payload);

        $this->assertTrue($result);

        Http::assertSent(function ($request) {
            return $request->url() === 'https://fcm.googleapis.com/fcm/send'
                && $request->hasHeader('Authorization', 'key=test_server_key_secret')
                && $request['to'] === 'device_token_123'
                && $request['notification']['title'] === 'طلب مكتمل 👑';
        });
    }
}
