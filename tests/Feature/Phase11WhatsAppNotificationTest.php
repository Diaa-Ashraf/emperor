<?php

namespace Tests\Feature;

use App\Adapters\Notifications\FirebaseChannel;
use App\Adapters\Notifications\WhatsAppChannel;
use App\DTOs\NotificationPayloadDTO;
use App\Models\User;
use App\Models\Wallet;
use App\Services\NotificationService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class Phase11WhatsAppNotificationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->artisan('db:seed', ['--class' => 'SettingSeeder'])->run();
    }

    public function test_phone_number_normalization(): void
    {
        $channel = new WhatsAppChannel();

        $this->assertEquals('201012345678', $channel->normalizePhoneNumber('01012345678'));
        $this->assertEquals('201198765432', $channel->normalizePhoneNumber('+20 11 9876 5432'));
        $this->assertEquals('966501234567', $channel->normalizePhoneNumber('00966501234567'));
        $this->assertEquals('966501234567', $channel->normalizePhoneNumber('+966-50-123-4567'));
    }

    public function test_luxury_arabic_message_formatting(): void
    {
        $channel = new WhatsAppChannel();

        $payload = new NotificationPayloadDTO(
            title: 'تم شحن المحفظة بنجاح 👑',
            body: 'تم قبول طلب الإيداع وإضافة الرصيد إلى محفظتك.',
            type: 'deposit_approved',
            link: '/wallet',
            data: [
                'amount' => '1,500.00',
                'currency' => 'EGP',
                'order_id' => 'DEP-8849',
                'status' => 'معتمد ومحول',
            ]
        );

        $message = $channel->formatMessage($payload, 'أحمد ممدوح');

        $this->assertStringContainsString('👑 *منصة إمبراطور | Emperor Platform*', $message);
        $this->assertStringContainsString('مرحباً يا أحمد ممدوح 👑', $message);
        $this->assertStringContainsString('📌 *تم شحن المحفظة بنجاح 👑*', $message);
        $this->assertStringContainsString('💰 *المبلغ:* 1,500.00 EGP', $message);
        $this->assertStringContainsString('📦 *رقم الطلب:* #DEP-8849', $message);
        $this->assertStringContainsString('📊 *الحالة:* معتمد ومحول', $message);
        $this->assertStringContainsString('🔗 *للتفاصيل والمتابعة:*', $message);
        $this->assertStringContainsString('شكراً لثقتكم بنا', $message);
    }

    public function test_whatsapp_channel_sends_via_meta_cloud_api(): void
    {
        Http::fake([
            'https://graph.facebook.com/v18.0/10987654321/messages' => Http::response(['messaging_product' => 'whatsapp', 'messages' => [['id' => 'wamid.HBg...']]], 200),
        ]);

        config([
            'services.whatsapp.provider' => 'meta',
            'services.whatsapp.api_token' => 'meta_test_access_token_xyz',
            'services.whatsapp.phone_number_id' => '10987654321',
        ]);

        $channel = new WhatsAppChannel();
        $payload = new NotificationPayloadDTO(
            title: 'طلبك قيد التنفيذ',
            body: 'جاري تسليم شدات ببجي إلى حسابك الآن.',
            type: 'order_processing',
            link: '/orders/202'
        );

        $result = $channel->send('01099887766', $payload, 'محمد علي');

        $this->assertTrue($result);

        Http::assertSent(function ($request) {
            return $request->url() === 'https://graph.facebook.com/v18.0/10987654321/messages'
                && $request->hasHeader('Authorization', 'Bearer meta_test_access_token_xyz')
                && $request['to'] === '201099887766'
                && str_contains($request['text']['body'], 'طلبك قيد التنفيذ');
        });
    }

    public function test_whatsapp_channel_sends_via_ultramsg(): void
    {
        Http::fake([
            'https://api.ultramsg.com/instance9999/messages/chat' => Http::response(['sent' => 'true', 'message' => 'ok'], 200),
        ]);

        config([
            'services.whatsapp.provider' => 'ultramsg',
            'services.whatsapp.api_token' => 'ultramsg_token_secret',
            'services.whatsapp.instance_id' => 'instance9999',
        ]);

        $channel = new WhatsAppChannel();
        $payload = new NotificationPayloadDTO(
            title: 'تم تحويل أرباح التارجت',
            body: 'تم إرسال أرباحك إلى حساب فودافون كاش.',
            type: 'target_paid'
        );

        $result = $channel->send('01234567890', $payload);

        $this->assertTrue($result);

        Http::assertSent(function ($request) {
            return $request->url() === 'https://api.ultramsg.com/instance9999/messages/chat'
                && $request['token'] === 'ultramsg_token_secret'
                && $request['to'] === '201234567890'
                && str_contains($request['body'], 'تم تحويل أرباح التارجت');
        });
    }

    public function test_notification_service_triggers_whatsapp_when_user_has_phone(): void
    {
        $user = User::factory()->create([
            'name' => 'طارق السيد',
            'phone' => '01055443322',
            'fcm_token' => 'device_token_xyz',
        ]);
        Wallet::create(['user_id' => $user->id, 'currency' => 'EGP', 'balance' => 0]);

        $firebaseMock = $this->mock(FirebaseChannel::class);
        $firebaseMock->shouldReceive('send')->once()->andReturn(true);

        $whatsappMock = $this->mock(WhatsAppChannel::class);
        $whatsappMock->shouldReceive('send')
            ->once()
            ->with('01055443322', \Mockery::type(NotificationPayloadDTO::class), 'طارق السيد')
            ->andReturn(true);

        $service = new NotificationService($firebaseMock, $whatsappMock);

        $payload = new NotificationPayloadDTO(
            title: 'تم قبول طلب الإيداع',
            body: 'تمت إضافة الرصيد لحسابك.',
            type: 'deposit_approved'
        );

        $service->notify($user, $payload);

        $this->assertDatabaseHas('notifications', [
            'notifiable_id' => $user->id,
            'type' => 'deposit_approved',
        ]);
    }
}
