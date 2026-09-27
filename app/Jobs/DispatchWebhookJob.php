<?php

namespace App\Jobs;

use App\Models\ApiLog;
use App\Models\User;
use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class DispatchWebhookJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;
    public array $backoff = [10, 30, 60];

    public function __construct(
        public int $userId,
        public string $event,
        public array $payload,
        public ?string $webhookUrl = null,
        public ?string $secret = null
    ) {}

    public function handle(): void
    {
        $user = User::find($this->userId);
        if (!$user && empty($this->webhookUrl)) {
            return;
        }

        $targetUrl = $this->webhookUrl ?? $user?->webhook_url;
        if (empty($targetUrl)) {
            return;
        }

        $signingSecret = $this->secret ?? $user?->api_secret ?? config('app.key');
        $timestamp = time();

        $bodyData = [
            'event' => $this->event,
            'timestamp' => $timestamp,
            'data' => $this->payload,
        ];

        $jsonPayload = json_encode($bodyData, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        $signature = hash_hmac('sha256', $jsonPayload, $signingSecret);

        $startTime = microtime(true);

        try {
            $response = Http::timeout(10)
                ->withHeaders([
                    'Content-Type' => 'application/json',
                    'Accept' => 'application/json',
                    'X-Emperor-Signature' => $signature,
                    'X-Emperor-Event' => $this->event,
                    'X-Emperor-Timestamp' => (string) $timestamp,
                    'User-Agent' => 'Emperor-Webhook/1.0',
                ])
                ->withBody($jsonPayload, 'application/json')
                ->post($targetUrl);

            $durationMs = (int) round((microtime(true) - $startTime) * 1000);

            // Log webhook delivery
            if ($user) {
                ApiLog::create([
                    'user_id' => $user->id,
                    'method' => 'POST',
                    'endpoint' => $targetUrl,
                    'request_headers' => [
                        'X-Emperor-Signature' => $signature,
                        'X-Emperor-Event' => $this->event,
                        'X-Emperor-Timestamp' => $timestamp,
                    ],
                    'request_body' => $bodyData,
                    'response_status' => $response->status(),
                    'response_body' => $response->json() ?? ['raw' => substr($response->body(), 0, 500)],
                    'ip_address' => '127.0.0.1',
                    'duration_ms' => $durationMs,
                    'created_at' => now(),
                ]);
            }

            if (!$response->successful()) {
                Log::warning("Webhook delivery failed for user {$this->userId} to {$targetUrl} with status {$response->status()}");
                throw new Exception("Webhook delivery returned status {$response->status()}");
            }
        } catch (\Throwable $e) {
            Log::error("Webhook dispatch exception for user {$this->userId}: {$e->getMessage()}");
            throw $e;
        }
    }
}
