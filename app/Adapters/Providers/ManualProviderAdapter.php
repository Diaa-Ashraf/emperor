<?php

namespace App\Adapters\Providers;

use App\Contracts\ProviderAdapter;
use App\DTOs\OrderRequestDTO;
use App\DTOs\ProviderOrderResultDTO;
use App\DTOs\StockVerificationDTO;

class ManualProviderAdapter implements ProviderAdapter
{
    public function __construct(
        protected array $config = []
    ) {}

    public function executeOrder(OrderRequestDTO $orderDto): ProviderOrderResultDTO
    {
        return new ProviderOrderResultDTO(
            success: true,
            status: 'manual_review',
            providerOrderId: null,
            rawResponse: ['note' => 'Order routed to manual execution']
        );
    }

    public function checkOrderStatus(string $providerOrderId): ProviderOrderResultDTO
    {
        return new ProviderOrderResultDTO(
            success: true,
            status: 'processing'
        );
    }

    public function verifyPlayer(string $sku, string $playerId, ?string $serverId = null): StockVerificationDTO
    {
        return new StockVerificationDTO(
            valid: true,
            playerName: 'لاعب تجريبي'
        );
    }

    public function getBalance(): array
    {
        return [
            'balance' => 999999.00,
            'currency' => 'EGP',
        ];
    }
}
