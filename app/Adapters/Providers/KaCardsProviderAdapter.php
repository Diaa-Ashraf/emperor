<?php

namespace App\Adapters\Providers;

use App\Contracts\ProviderAdapter;
use App\DTOs\OrderRequestDTO;
use App\DTOs\ProviderOrderResultDTO;
use App\DTOs\StockVerificationDTO;

class KaCardsProviderAdapter implements ProviderAdapter
{
    public function __construct(
        protected array $config = []
    ) {}

    public function executeOrder(OrderRequestDTO $orderDto): ProviderOrderResultDTO
    {
        // TODO: Implement actual KA-Cards API integration when credentials / endpoints confirmed
        return new ProviderOrderResultDTO(
            success: true,
            status: 'processing',
            providerOrderId: 'KA-' . uniqid(),
            rawResponse: ['provider' => 'ka_cards']
        );
    }

    public function checkOrderStatus(string $providerOrderId): ProviderOrderResultDTO
    {
        return new ProviderOrderResultDTO(
            success: true,
            status: 'completed'
        );
    }

    public function verifyPlayer(string $sku, string $playerId, ?string $serverId = null): StockVerificationDTO
    {
        return new StockVerificationDTO(
            valid: true,
            playerName: 'Player_' . $playerId
        );
    }

    public function getBalance(): array
    {
        return [
            'balance' => 0.00,
            'currency' => 'USD',
        ];
    }
}
