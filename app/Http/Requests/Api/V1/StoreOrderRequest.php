<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'product_id' => ['required', 'exists:products,id'],
            'product_tier_id' => ['required', 'exists:product_tiers,id'],
            'quantity' => ['required', 'integer', 'min:1', 'max:100'],
            'player_id' => ['nullable', 'string', 'max:100'],
            'server_id' => ['nullable', 'string', 'max:100'],
            'account_region' => ['nullable', 'string', 'max:100'],
            'extra_fields' => ['nullable', 'array'],
            'idempotency_key' => ['nullable', 'string', 'max:100'],
        ];
    }

    public function messages(): array
    {
        return [
            'product_id.required' => 'يرجى تحديد المنتج المطلوب.',
            'product_id.exists' => 'المنتج المحدد غير متوفر.',
            'product_tier_id.required' => 'يرجى تحديد باقة الشحن المطلوبة.',
            'product_tier_id.exists' => 'باقة الشحن المحددة غير متوفرة.',
            'quantity.required' => 'يرجى تحديد الكمية.',
            'quantity.min' => 'أقل كمية مسموح بها هي 1.',
        ];
    }
}
