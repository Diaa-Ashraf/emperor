<?php

namespace App\Http\Requests\Admin;

use App\Enums\CategoryType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:categories,slug'],
            'type' => ['required', Rule::enum(CategoryType::class)],
            'description' => ['nullable', 'string'],
            'icon' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp,svg', 'max:10240'],
            'banner' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:10240'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'يرجى إدخال اسم القسم.',
            'slug.unique' => 'الرابط المخصص (Slug) مستخدم بالفعل.',
            'type.required' => 'يرجى تحديد نوع القسم.',
            'icon.image' => 'يجب أن يكون ملف الأيقونة صورة صالحة.',
            'icon.mimes' => 'صيغة الأيقونة يجب أن تكون PNG أو JPG أو WEBP أو SVG.',
            'icon.max' => 'حجم الأيقونة يجب ألا يتجاوز 10 ميجابايت.',
            'banner.image' => 'يجب أن يكون ملف البانر صورة صالحة.',
            'banner.mimes' => 'صيغة البانر يجب أن تكون PNG أو JPG أو WEBP.',
            'banner.max' => 'حجم البانر يجب ألا يتجاوز 10 ميجابايت.',
        ];
    }
}
