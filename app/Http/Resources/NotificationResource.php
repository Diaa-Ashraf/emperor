<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NotificationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $data = $this->data;
        while (is_string($data)) {
            $decoded = json_decode($data, true);
            if (json_last_error() === JSON_ERROR_NONE && (is_array($decoded) || is_string($decoded))) {
                $data = $decoded;
            } else {
                break;
            }
        }
        if (!is_array($data)) {
            $data = [];
        }

        return [
            'id' => $this->id,
            'type' => $this->type,
            'title' => $data['title'] ?? 'إشعار من إمبراطور',
            'body' => $data['body'] ?? '',
            'link' => $data['link'] ?? null,
            'image_url' => $data['image_url'] ?? null,
            'extra' => $data['extra'] ?? [],
            'read_at' => $this->read_at?->toIso8601String(),
            'is_read' => $this->read_at !== null,
            'created_at' => $this->created_at?->toIso8601String(),
            'time_ago' => $this->created_at?->diffForHumans(),
        ];
    }
}
