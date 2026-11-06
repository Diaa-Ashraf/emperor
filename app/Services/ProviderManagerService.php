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
            'jasser_card', 'jasser-card', 'jassercard' => \App\Adapters\Providers\JasserCardProviderAdapter::class,
            default => \App\Adapters\Providers\EmbratorProviderAdapter::class,
        };

        if (class_exists($className)) {
            return new $className($config);
        }

        return new \App\Adapters\Providers\EmbratorProviderAdapter($config);
    }

    /** Build the adapter using credentials and endpoint saved on this provider. */
    public function adapterFor(Provider $provider): ProviderAdapter
    {
        $config = $provider->config ?? [];

        if (filled($provider->base_url)) {
            $config['base_url'] = $provider->base_url;
        }

        if (filled($provider->api_key)) {
            $config['api_key'] = $provider->api_key;
            $config['api_token'] = $provider->api_key;
        } elseif (blank($config['api_key'] ?? null) && filled($config['api_token'] ?? null)) {
            // The admin provider form stores API credentials under api_token.
            $config['api_key'] = $config['api_token'];
        }

        $config['_provider_id'] = $provider->id;

        return $this->resolveAdapter($provider->driver, $config);
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
            return new ProviderOrderResultDTO(
                success: false,
                status: 'failed',
                errorMessage: 'المنتج غير مربوط بمورد نشط. لم يتم إرسال الطلب لأي مورد.'
            );
        }

        $attemptFailures = [];
        foreach ($productProviders as $pp) {
            $provider = $pp->provider;
            if (!$provider || !$provider->is_active) {
                continue;
            }

            try {
                $adapter = $this->adapterFor($provider);
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
        $adapter = $this->adapterFor($order->provider);
        $lookupId = $order->provider_response['order_uuid'] ?? $order->provider_order_id;
        return $adapter->checkOrderStatus((string) $lookupId);
    }
}
