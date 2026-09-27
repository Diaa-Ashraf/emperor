<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreProviderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'driver' => ['required', 'string', 'max:100'],
            'base_url' => ['nullable', 'url', 'max:255'],
            'api_key' => ['nullable', 'string', 'max:255'],
            'api_secret' => ['nullable', 'string', 'max:255'],
            'webhook_secret' => ['nullable', 'string', 'max:255'],
            'priority' => ['required', 'integer', 'min:1', 'max:999'],
            'balance_currency' => ['required', 'string', 'in:USD,EGP,SAR,USDT'],
            'is_active' => ['nullable', 'boolean'],
            'auto_fulfill' => ['nullable', 'boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'يرجى إدخال اسم المزود.',
            'driver.required' => 'يرجى تحديد المشغل (Driver).',
            'priority.required' => 'يرجى تحديد أولوية المزود في التوجيه.',
            'balance_currency.required' => 'يرجى تحديد عملة حساب المزود.',
        ];
    }
}
