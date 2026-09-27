<?php

namespace App\Contracts;

use App\DTOs\OrderRequestDTO;
use App\DTOs\ProviderOrderResultDTO;
use App\DTOs\StockVerificationDTO;

interface ProviderAdapter
{
    /**
     * Submit an order to the provider for fulfillment.
     */
    public function executeOrder(OrderRequestDTO $orderDto): ProviderOrderResultDTO;

    /**
     * Check order status from provider.
     */
    public function checkOrderStatus(string $providerOrderId): ProviderOrderResultDTO;

    /**
     * Verify stock or account player ID before ordering.
     */
    public function verifyPlayer(string $sku, string $playerId, ?string $serverId = null): StockVerificationDTO;

    /**
     * Get remaining balance on provider account.
     */
    public function getBalance(): array;
}
