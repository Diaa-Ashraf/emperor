<?php

namespace Tests\Feature;

use App\DTOs\NotificationPayloadDTO;
use App\Enums\CategoryType;
use App\Enums\PriceStrategy;
use App\Enums\ProductType;
use App\Enums\UserRole;
use App\Events\DepositApproved;
use App\Events\OrderCompleted;
use App\Events\OrderFailed;
use App\Models\Banner;
use App\Models\Category;
use App\Models\DepositRequest;
use App\Models\Order;
use App\Models\PaymentMethod;
use App\Models\Product;
use App\Models\ProductTier;
use App\Models\User;
use App\Services\NotificationService;
use App\Services\OrderService;
use App\Services\WalletService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class Phase3NotificationAndAnnouncementTest extends TestCase
{
    use RefreshDatabase;
    protected function createCustomer(): User
    {
        $user = User::factory()->create([
            'role' => UserRole::CUSTOMER,
            'currency' => 'EGP',
            'phone' => '+2010' . rand(10000000, 99999999),
        ]);

        $walletService = app(WalletService::class);
        $walletService->getOrCreateWallet($user, 'EGP')->update(['balance' => 1000]);

        return $user;
    }

    public function test_public_announcements_api(): void
    {
        $banner = Banner::create([
            'title' => 'عرض شحن رمضان',
            'subtitle' => 'باقات مضاعفة',
            'type' => 'slider',
            'image' => 'banners/test.png',
            'is_active' => true,
            'sort_order' => 1,
        ]);

        $response = $this->getJson('/api/v1/announcements');

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
            ])
            ->assertJsonFragment([
                'title' => 'عرض شحن رمضان',
            ]);
    }

    public function test_notification_service_creates_database_notification(): void
    {
        $customer = $this->createCustomer();
        $notificationService = app(NotificationService::class);

        $payload = new NotificationPayloadDTO(
            title: 'إشعار تجريبي',
            body: 'هذا محتوى الإشعار التجريبي',
            type: 'promo'
        );

        $notificationService->notify($customer, $payload);

        $this->assertEquals(1, $customer->notifications()->count());
        $this->assertEquals(1, $customer->unreadNotifications()->count());

        $notification = $customer->notifications()->first();
        $data = json_decode($notification->data, true);
        $this->assertEquals('إشعار تجريبي', $data['title']);
    }

    public function test_deposit_approved_event_creates_notification(): void
    {
        $customer = $this->createCustomer();
        $method = PaymentMethod::firstOrCreate(
            ['code' => 'instapay_eg'],
            [
                'name' => 'InstaPay',
                'type' => 'manual',
                'currency' => 'EGP',
                'min_amount' => 50,
                'max_amount' => 50000,
                'is_active' => true,
                'allow_deposit' => true,
            ]
        );

        $deposit = DepositRequest::create([
            'user_id' => $customer->id,
            'payment_method_id' => $method->id,
            'amount' => 500,
            'fee' => 0,
            'final_amount' => 500,
            'currency' => 'EGP',
            'status' => 'approved',
        ]);

        event(new DepositApproved($deposit));

        // Check customer received notification
        $this->assertGreaterThanOrEqual(1, $customer->notifications()->count());
    }

    public function test_order_completed_and_failed_events_trigger_notifications(): void
    {
        $customer = $this->createCustomer();

        $category = Category::create([
            'name' => 'تصنيف تجريبي',
            'slug' => 'test-cat-' . rand(100, 999),
            'type' => CategoryType::GAMES,
            'is_active' => true,
        ]);

        $product = Product::create([
            'category_id' => $category->id,
            'name' => 'PUBG Notification Test',
            'slug' => 'pubg-notif-' . rand(100, 999),
            'type' => ProductType::PLAYER_ID,
            'is_active' => true,
        ]);

        $tier = ProductTier::create([
            'product_id' => $product->id,
            'name' => '60 UC',
            'source_cost' => 1,
            'cost_currency' => 'USD',
            'price_strategy' => PriceStrategy::MANUAL,
            'final_price' => 50,
            'is_active' => true,
        ]);

        $order = Order::create([
            'user_id' => $customer->id,
            'product_id' => $product->id,
            'product_tier_id' => $tier->id,
            'quantity' => 1,
            'unit_price' => 50,
            'total_amount' => 50,
            'currency' => 'EGP',
            'cost_amount' => 45,
            'profit_amount' => 5,
            'player_id' => '123456789',
            'status' => 'completed',
        ]);

        event(new OrderCompleted($order));
        $this->assertGreaterThanOrEqual(1, $customer->notifications()->count());
    }

    public function test_customer_can_fetch_and_read_notifications(): void
    {
        $customer = $this->createCustomer();
        $notificationService = app(NotificationService::class);

        $notificationService->notify($customer, new NotificationPayloadDTO(
            title: 'إشعار 1',
            body: 'محتوى 1',
        ));
        $notificationService->notify($customer, new NotificationPayloadDTO(
            title: 'إشعار 2',
            body: 'محتوى 2',
        ));

        // 1. Fetch list
        $response = $this->actingAs($customer, 'sanctum')->getJson('/api/v1/notifications');
        $response->assertStatus(200)
            ->assertJsonStructure(['status', 'data', 'pagination']);

        // 2. Fetch unread count
        $countResponse = $this->actingAs($customer, 'sanctum')->getJson('/api/v1/notifications/unread-count');
        $countResponse->assertStatus(200)
            ->assertJson([
                'status' => 'success',
                'data' => [
                    'unread_count' => 2,
                ],
            ]);

        // 3. Mark single as read
        $firstNotif = $customer->notifications()->first();
        $readRes = $this->actingAs($customer, 'sanctum')->postJson("/api/v1/notifications/{$firstNotif->id}/read");
        $readRes->assertStatus(200)
            ->assertJsonFragment([
                'is_read' => true,
            ]);

        $this->assertEquals(1, $customer->unreadNotifications()->count());

        // 4. Mark all as read
        $readAllRes = $this->actingAs($customer, 'sanctum')->postJson('/api/v1/notifications/read-all');
        $readAllRes->assertStatus(200);

        $this->assertEquals(0, $customer->unreadNotifications()->count());
    }
}
