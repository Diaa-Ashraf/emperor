<?php

namespace App\Services;

use App\Contracts\ProviderAdapter;
use App\DTOs\OrderRequestDTO;
use App\DTOs\ProviderOrderResultDTO;
use App\DTOs\StockVerificationDTO;
use App\Models\Order;
use App\Models\ProductProvider;
use App\Models\Provider;
use Exception;

class ProviderManagerService
{
    /**
     * Resolve provider adapter by driver name.
     */
    public function resolveAdapter(string $driver, array $config = []): ProviderAdapter
    {
        $className = match ($driver) {
            'manual', 'manual_review' => \App\Adapters\Providers\ManualProviderAdapter::class,
            'ad_card', 'ad-card', 'adcard' => \App\Adapters\Providers\AdCardProviderAdapter::class,
            default => \App\Adapters\Providers\EmbratorProviderAdapter::class,
        };

        if (class_exists($className)) {
            return new $className($config);
        }

        return new \App\Adapters\Providers\EmbratorProviderAdapter($config);
    }

    /**
     * Execute fulfillment for an order by priority routing.
     */
    public function fulfill(Order $order): ProviderOrderResultDTO
    {
        $productProviders = ProductProvider::with('provider')
            ->where(function ($query) use ($order) {
                $query->where('product_tier_id', $order->product_tier_id);
                if ($order->product_id) {
                    $query->orWhere('product_id', $order->product_id);
                }
            })
            ->where('is_active', true)
            ->orderBy('priority', 'asc')
            ->get();

        if ($productProviders->isEmpty()) {
            // Manual provider fallback
            return new ProviderOrderResultDTO(
                success: true,
                status: 'pending',
                errorMessage: null,
                rawResponse: ['mode' => 'manual_review']
            );
        }

        $attemptFailures = [];
        foreach ($productProviders as $pp) {
            $provider = $pp->provider;
            if (!$provider || !$provider->is_active) {
                continue;
            }

            try {
                $providerConfig = array_merge($provider->config ?? [], ['_provider_id' => $provider->id]);
                $adapter = $this->resolveAdapter($provider->driver, $providerConfig);
                $dto = new OrderRequestDTO(
                    userId: $order->user_id,
                    productId: $order->product_id,
                    productTierId: $order->product_tier_id,
                    quantity: $order->quantity,
                    playerId: $order->player_id,
                    serverId: $order->server_id,
                    accountRegion: $order->account_region,
                    extraFields: array_merge(
                        (array) ($order->extra_fields ?? []),
                        array_filter([
                            'player_id' => $order->player_id,
                            'server_id' => $order->server_id,
                            'region' => $order->account_region,
                        ], fn ($value) => $value !== null && $value !== '')
                    ),
                    idempotencyKey: (string) $order->public_id,
                    providerSku: (string) ($pp->provider_sku ?? ''),
                );

                $result = $adapter->executeOrder($dto);
                if ($result->success) {
                    $order->update([
                        'provider_id' => $provider->id,
                        'provider_order_id' => $result->providerOrderId,
                        'provider_status' => $result->status,
                        'provider_response' => $result->rawResponse,
                    ]);

                    return $result;
                }
                $attemptFailures[] = [
                    'provider_id' => $provider->id,
                    'provider_name' => $provider->name,
                    'error' => $result->errorMessage,
                    'response' => $result->rawResponse,
                ];
            } catch (Exception $e) {
                $attemptFailures[] = [
                    'provider_id' => $provider->id,
                    'provider_name' => $provider->name,
                    'error' => $e->getMessage(),
                ];
                continue;
            }
        }

        \Illuminate\Support\Facades\Log::warning('All providers failed for order fulfillment.', [
            'order_id' => $order->id,
            'attempts' => $attemptFailures,
        ]);

        return new ProviderOrderResultDTO(
            success: false,
            status: 'failed',
            errorMessage: 'جميع المزودين غير متاحين حالياً.' . (count($attemptFailures) ? ' ' . implode(' | ', array_map(fn ($failure) => ($failure['provider_name'] ?? 'Provider') . ': ' . ($failure['error'] ?? 'failed'), $attemptFailures)) : '')
        );
    }

    public function checkOrder(Order $order): ProviderOrderResultDTO
    {
        if (!$order->provider || !$order->provider_order_id) {
            return new ProviderOrderResultDTO(false, 'pending', errorMessage: 'لا يوجد طلب مسجل لدى المورد.');
        }
        $adapter = $this->resolveAdapter($order->provider->driver, array_merge($order->provider->config ?? [], ['base_url' => $order->provider->base_url]));
        $lookupId = $order->provider_response['order_uuid'] ?? $order->provider_order_id;
        return $adapter->checkOrderStatus((string) $lookupId);
    }
}
