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
            'footer_slogan' => ['nullable', 'string', 'max:500'],
            'whatsapp_support' => ['required', 'string', 'max:50'],
            'telegram_support' => ['nullable', 'string', 'max:50'],
            'support_phone' => ['nullable', 'string', 'max:50'],
            'support_email' => ['nullable', 'string', 'max:100'],
            'working_hours' => ['nullable', 'string', 'max:100'],
            'target_agency_id' => ['required', 'string', 'max:50'],
            'target_agency_name' => ['required', 'string', 'max:100'],
            'min_wallet_deposit' => ['required', 'numeric', 'min:1'],
            'site_logo' => ['nullable', 'image', 'mimes:png,jpg,jpeg,svg,webp', 'max:10240'],
            'site_favicon' => ['nullable', 'image', 'mimes:png,ico,jpg,jpeg,svg,webp', 'max:5120'],
            'social_facebook' => ['nullable', 'string', 'max:255'],
            'social_instagram' => ['nullable', 'string', 'max:255'],
            'social_tiktok' => ['nullable', 'string', 'max:255'],
            'social_youtube' => ['nullable', 'string', 'max:255'],
            'social_discord' => ['nullable', 'string', 'max:255'],
            'social_telegram' => ['nullable', 'string', 'max:255'],
            'announcement_enabled' => ['nullable', 'string'],
            'announcement_text' => ['nullable', 'string', 'max:1000'],
            'about_us_text' => ['nullable', 'string', 'max:5000'],
            'terms_conditions' => ['nullable', 'string', 'max:10000'],
            'privacy_policy' => ['nullable', 'string', 'max:10000'],
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
            'site_logo.image' => 'يجب أن يكون ملف اللوجو صورة صالحة.',
            'site_logo.mimes' => 'صيغة اللوجو يجب أن تكون PNG أو JPG أو SVG أو WEBP.',
            'site_logo.max' => 'حجم ملف اللوجو يجب ألا يتجاوز 10 ميجابايت.',
            'site_favicon.image' => 'يجب أن يكون ملف أيقونة التاب (Favicon) صورة صالحة.',
            'site_favicon.max' => 'حجم Favicon يجب ألا يتجاوز 5 ميجابايت.',
        ];
    }
}
