<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class OrderResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'public_id' => $this->public_id,
            'product' => [
                'id' => $this->product_id,
                'name' => $this->product?->name,
                'image_url' => $this->product?->image_url ?? ($this->product?->image ? Storage::disk('public')->url($this->product->image) : null),
                'type' => $this->product?->type?->value,
            ],
            'tier' => [
                'id' => $this->product_tier_id,
                'name' => $this->tier?->name,
            ],
            'vouchers' => $this->relationLoaded('vouchers')
                ? $this->vouchers->map(fn($v) => [
                    'id' => $v->id,
                    'code' => $v->code,
                    'serial_number' => $v->serial_number,
                    'expires_at' => $v->expires_at?->format('Y-m-d'),
                ])
                : [],
            'quantity' => (int) $this->quantity,
            'unit_price' => (float) $this->unit_price,
            'total_amount' => (float) $this->total_amount,
            'currency' => $this->currency,
            'player_id' => $this->player_id,
            'server_id' => $this->server_id,
            'account_region' => $this->account_region,
            'status' => $this->status?->value,
            'status_label' => $this->status?->label(),
            'failure_reason' => $this->failure_reason,
            'created_at' => $this->created_at?->toIso8601String(),
            'completed_at' => in_array($this->status?->value, ['completed', 'refunded']) ? $this->updated_at?->toIso8601String() : null,
        ];
    }
}
