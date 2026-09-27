<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SupportContactResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'channel' => $this->channel,
            'channel_label' => $this->channel_label,
            'value' => $this->value,
            'icon' => $this->icon,
            'description' => $this->description,
            'sort_order' => $this->sort_order,
        ];
    }
}
