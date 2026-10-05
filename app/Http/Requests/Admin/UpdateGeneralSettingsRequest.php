<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateGeneralSettingsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->isAdmin() ?? false;
    }

    public function rules(): array
    {
        return [
            'site_name' => ['required', 'string', 'max:255'],
            'site_description' => ['nullable', 'string', 'max:1000'],
            'whatsapp_support' => ['required', 'string', 'max:50'],
            'telegram_support' => ['nullable', 'string', 'max:50'],
            'target_agency_id' => ['required', 'string', 'max:50'],
            'target_agency_name' => ['required', 'string', 'max:100'],
            'min_wallet_deposit' => ['required', 'numeric', 'min:1'],
            'site_logo' => ['nullable', 'image', 'mimes:png,jpg,jpeg,svg,webp', 'max:5120'],
            'site_favicon' => ['nullable', 'image', 'mimes:png,ico,jpg,jpeg,svg,webp', 'max:2048'],
        ];
    }

    public function messages(): array
    {
        return [
            'site_name.required' => 'يرجى إدخال اسم المنصة.',
            'whatsapp_support.required' => 'يرجى إدخال رقم الواتساب للدعم الفني.',
            'target_agency_id.required' => 'يرجى إدخال كود الوكالة المعتمد لاستلام التارجت.',
            'target_agency_name.required' => 'يرجى إدخال اسم وكالة التارجت.',
            'min_wallet_deposit.required' => 'يرجى تحديد الحد الأدنى للإيداع بالمحفظة.',
        ];
    }
}
