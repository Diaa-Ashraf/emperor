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
            'icon' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp,svg', 'max:2048'],
            'banner' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:4096'],
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
            'icon.image' => 'يجب أن يكون ملف الأيقونة صورة صحيحة.',
            'icon.max' => 'الحد الأقصى لحجم الأيقونة 2 ميجابايت.',
            'banner.image' => 'يجب أن يكون ملف البانر صورة صحيحة.',
            'banner.max' => 'الحد الأقصى لحجم البانر 4 ميجابايت.',
        ];
    }
}
