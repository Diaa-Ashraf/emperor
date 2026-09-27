<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCatalogSourceRequest extends FormRequest
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
            'base_url' => ['required', 'url', 'max:255'],
            'api_key' => ['nullable', 'string', 'max:255'],
            'api_secret' => ['nullable', 'string', 'max:255'],
            'is_active' => ['nullable', 'boolean'],
            'config' => ['nullable', 'array'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'يرجى إدخال اسم المصدر.',
            'name.max' => 'اسم المصدر طويل جداً.',
            'driver.required' => 'يرجى اختيار المشغل أو نوع المصدر.',
            'base_url.required' => 'يرجى إدخال الرابط الأساسي للمصدر.',
            'base_url.url' => 'صيغة الرابط غير صحيحة.',
        ];
    }
}
