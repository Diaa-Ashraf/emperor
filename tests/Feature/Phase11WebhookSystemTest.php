<?php

namespace Tests\Feature;

use App\Events\OrderCompleted;
use App\Events\OrderFailed;
use App\Http\Middleware\VerifyWebhookSignature;
use App\Jobs\DispatchWebhookJob;
use App\Models\ApiLog;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductTier;
use App\Models\User;
use App\Models\Wallet;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Facades\Route;
use Tests\TestCase;

class Phase11WebhookSystemTest extends TestCase
{
    use RefreshDatabase;

    protected User $apiUser;
    protected User $normalUser;
    protected Order $order;
    protected Product $product;
    protected ProductTier $tier;

    protected function setUp(): void
    {
        parent::setUp();

        $this->apiUser = User::factory()->create([
            'api_key' => 'emp_test_client_key_123',
            'api_secret' => 'super_secret_webhook_key_xyz',
            'webhook_url' => 'https://client-domain.com/webhooks/orders',
            'status' => 'active',
        ]);

        $this->normalUser = User::factory()->create([
            'webhook_url' => null,
            'status' => 'active',
        ]);

        $category = Category::create([
            'name' => 'الألعاب',
            'slug' => 'games-category',
            'type' => 'games',
            'is_active' => true,
        ]);

        $this->product = Product::create([
            'category_id' => $category->id,
            'name' => 'Free Fire',
            'slug' => 'free-fire',
            'type' => 'direct_topup',
            'is_active' => true,
        ]);

        $this->tier = ProductTier::create([
            'product_id' => $this->product->id,
            'sku' => 'FF-100-DIAMONDS',
            'name' => '100 جوهرة',
            'source_cost' => 0.90,
            'final_price' => 1.10,
            'sale_price' => 1.10,
            'is_active' => true,
        ]);

        $this->order = Order::create([
            'user_id' => $this->apiUser->id,
            'product_id' => $this->product->id,
            'product_tier_id' => $this->tier->id,
            'quantity' => 1,
            'unit_price' => 1.10,
            'total_amount' => 1.10,
            'currency' => 'USD',
            'player_id' => 'FF-998877',
            'status' => \App\Enums\OrderStatus::PROCESSING,
        ]);
    }

    public function test_dispatch_webhook_job_sends_signed_payload_and_logs(): void
    {
        Http::fake([
            'https://client-domain.com/webhooks/orders' => Http::response(['received' => true], 200),
        ]);

        $payload = [
            'order_id' => $this->order->public_id,
            'status' => 'completed',
            'amount' => 1.10,
        ];

        $job = new DispatchWebhookJob(
            userId: $this->apiUser->id,
            event: 'order.completed',
            payload: $payload,
            webhookUrl: $this->apiUser->webhook_url,
            secret: $this->apiUser->api_secret
        );

        $job->handle();

        // Verify HTTP call was made with HMAC signature
        Http::assertSent(function ($request) use ($payload) {
            $hasSignature = !empty($request->header('X-Emperor-Signature')[0]);
            $isCorrectEvent = $request->header('X-Emperor-Event')[0] === 'order.completed';
            $dataMatch = $request->data()['data']['order_id'] === $this->order->public_id;

            return $hasSignature && $isCorrectEvent && $dataMatch;
        });

        // Verify API log was recorded
        $this->assertDatabaseHas('api_logs', [
            'user_id' => $this->apiUser->id,
            'method' => 'POST',
            'endpoint' => 'https://client-domain.com/webhooks/orders',
            'response_status' => 200,
        ]);
    }

    public function test_order_completed_event_triggers_webhook_job_for_webhook_enabled_user(): void
    {
        Queue::fake([DispatchWebhookJob::class]);

        $this->order->update(['status' => \App\Enums\OrderStatus::COMPLETED]);
        event(new OrderCompleted($this->order));

        Queue::assertPushed(DispatchWebhookJob::class, function ($job) {
            return $job->userId === $this->apiUser->id && $job->event === 'order.completed';
        });
    }

    public function test_order_completed_event_does_not_trigger_webhook_for_normal_user(): void
    {
        Queue::fake([DispatchWebhookJob::class]);

        $normalOrder = Order::create([
            'user_id' => $this->normalUser->id,
            'product_id' => $this->product->id,
            'product_tier_id' => $this->tier->id,
            'quantity' => 1,
            'unit_price' => 1.10,
            'total_amount' => 1.10,
            'currency' => 'USD',
            'player_id' => '12345',
            'status' => \App\Enums\OrderStatus::PROCESSING,
        ]);

        event(new OrderCompleted($normalOrder));

        Queue::assertNotPushed(DispatchWebhookJob::class);
    }

    public function test_order_failed_event_triggers_webhook_job_with_reason(): void
    {
        Queue::fake([DispatchWebhookJob::class]);

        $this->order->update([
            'status' => \App\Enums\OrderStatus::FAILED,
            'failure_reason' => 'Player ID not found in server',
        ]);

        event(new OrderFailed($this->order, 'Player ID not found in server'));

        Queue::assertPushed(DispatchWebhookJob::class, function ($job) {
            return $job->userId === $this->apiUser->id && $job->event === 'order.failed';
        });
    }

    public function test_verify_webhook_signature_middleware_validates_incoming_payloads(): void
    {
        $secret = 'test_incoming_secret_key_123';

        Route::post('/test-incoming-webhook', function () {
            return response()->json(['status' => 'ok']);
        })->middleware(VerifyWebhookSignature::class . ':' . $secret);

        $payload = ['event' => 'supplier.stock_update', 'sku' => 'PUBG-60', 'qty' => 500];
        $json = json_encode($payload);
        $signature = hash_hmac('sha256', $json, $secret);

        // 1. Missing signature -> 401
        $response = $this->postJson('/test-incoming-webhook', $payload);
        $response->assertStatus(401);

        // 2. Invalid signature -> 403
        $response = $this->postJson('/test-incoming-webhook', $payload, [
            'X-Emperor-Signature' => 'invalid_signature_hash',
        ]);
        $response->assertStatus(403);

        // 3. Valid signature -> 200
        $response = $this->call(
            'POST',
            '/test-incoming-webhook',
            [],
            [],
            [],
            [
                'CONTENT_TYPE' => 'application/json',
                'HTTP_X_EMPEROR_SIGNATURE' => $signature,
            ],
            $json
        );
        $response->assertStatus(200);
        $response->assertJson(['status' => 'ok']);
    }
}
