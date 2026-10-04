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

        $title = $data['title'] ?? $data['subject'] ?? $data['heading'] ?? null;
        $body = $data['body'] ?? $data['message'] ?? $data['content'] ?? $data['text'] ?? $data['description'] ?? $data['notes'] ?? '';

        if (empty($title)) {
            $title = match ($this->type) {
                'deposit_submitted', 'deposit_approved', 'deposit_rejected' => 'تحديث بشأن الإيداع',
                'order_created', 'order_completed', 'order_failed', 'order_refunded' => 'تحديث بشأن الطلب',
                'referral_commission', 'referral_registered' => 'مكافأة إحالة جديدة',
                'target_order_submitted', 'target_order_approved', 'target_order_rejected' => 'تحديث تارجت الرومات',
                'admin_deposit_alert', 'admin_new_order_alert' => 'تنبيه إداري جديد',
                default => 'إشعار من منصة إمبراطور',
            };
        }

        return [
            'id' => $this->id,
            'type' => $this->type,
            'title' => $title,
            'body' => $body,
            'message' => $body,
            'link' => $data['link'] ?? $data['action_url'] ?? $data['url'] ?? null,
            'image_url' => $data['image_url'] ?? $data['image'] ?? null,
            'data' => $data,
            'extra' => $data['extra'] ?? [],
            'read_at' => $this->read_at?->toIso8601String(),
            'is_read' => $this->read_at !== null,
            'created_at' => $this->created_at?->toIso8601String(),
            'time_ago' => $this->created_at?->diffForHumans(),
        ];
    }
}
