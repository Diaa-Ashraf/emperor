<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProviderMappingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'mappings' => ['nullable', 'array'],
            'mappings.*.product_tier_id' => ['required', 'exists:product_tiers,id'],
            'mappings.*.provider_id' => ['required', 'exists:providers,id'],
            'mappings.*.provider_sku' => ['nullable', 'string', 'max:100'],
            'mappings.*.priority' => ['required', 'integer', 'min:1'],
            'mappings.*.cost_price' => ['nullable', 'numeric', 'min:0'],
            'mappings.*.is_active' => ['nullable', 'boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'mappings.*.product_tier_id.required' => 'يرجى تحديد الباقة.',
            'mappings.*.provider_id.required' => 'يرجى تحديد المزود.',
            'mappings.*.priority.required' => 'يرجى تحديد الأولوية.',
        ];
    }
}
