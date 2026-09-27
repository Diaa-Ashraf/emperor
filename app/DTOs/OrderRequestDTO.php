<?php

namespace App\DTOs;

readonly class OrderRequestDTO
{
    public function __construct(
        public int $userId,
        public int $productId,
        public int $productTierId,
        public int $quantity,
        public ?string $playerId = null,
        public ?string $serverId = null,
        public ?string $accountRegion = null,
        public array $extraFields = [],
        public ?string $idempotencyKey = null,
        public string $channel = 'web',
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            userId: (int) ($data['user_id'] ?? 0),
            productId: (int) $data['product_id'],
            productTierId: (int) $data['product_tier_id'],
            quantity: (int) ($data['quantity'] ?? 1),
            playerId: $data['player_id'] ?? null,
            serverId: $data['server_id'] ?? null,
            accountRegion: $data['account_region'] ?? null,
            extraFields: $data['extra_fields'] ?? [],
            idempotencyKey: $data['idempotency_key'] ?? null,
            channel: $data['channel'] ?? 'web',
        );
    }
}
