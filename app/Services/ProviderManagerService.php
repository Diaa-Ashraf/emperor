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
            'hala', 'hala_api' => \App\Adapters\Providers\HalaAdapter::class,
            'tami', 'tami_api' => \App\Adapters\Providers\TamiAdapter::class,
            'ka_cards_api' => \App\Adapters\Providers\KaCardsProviderAdapter::class,
            default => \App\Adapters\Providers\ManualProviderAdapter::class,
        };

        if (class_exists($className)) {
            return new $className($config);
        }

        return new \App\Adapters\Providers\ManualProviderAdapter($config);
    }

    /**
     * Execute fulfillment for an order by priority routing.
     */
    public function fulfill(Order $order): ProviderOrderResultDTO
    {
        $productProviders = ProductProvider::with('provider')
            ->where('product_tier_id', $order->product_tier_id)
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

        foreach ($productProviders as $pp) {
            $provider = $pp->provider;
            if (!$provider->is_active) {
                continue;
            }

            try {
                $adapter = $this->resolveAdapter($provider->driver, $provider->config ?? []);
                $dto = new OrderRequestDTO(
                    userId: $order->user_id,
                    productId: $order->product_id,
                    productTierId: $order->product_tier_id,
                    quantity: $order->quantity,
                    playerId: $order->player_id,
                    serverId: $order->server_id,
                    accountRegion: $order->account_region,
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
            } catch (Exception $e) {
                // Log and continue to next provider in cascade
                continue;
            }
        }

        return new ProviderOrderResultDTO(
            success: false,
            status: 'failed',
            errorMessage: 'جميع المزودين غير متاحين حالياً.'
        );
    }
}
