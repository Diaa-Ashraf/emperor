<?php

namespace App\Http\Requests\Admin;

use App\Enums\PriceStrategy;
use App\Enums\ProductType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'category_id' => ['required', 'exists:categories,id'],
            'catalog_source_id' => ['nullable', 'exists:catalog_sources,id'],
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:products,slug'],
            'type' => ['required', Rule::enum(ProductType::class)],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp,svg', 'max:10240'],
            'player_id_label' => ['nullable', 'string', 'max:100'],
            'player_id_validation_regex' => ['nullable', 'string', 'max:255'],
            'has_server_id' => ['nullable', 'boolean'],
            'server_id_label' => ['nullable', 'string', 'max:100'],
            'requires_account_region' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
            // Initial Tiers validation
            'tiers' => ['nullable', 'array'],
            'tiers.*.name' => ['required', 'string', 'max:255'],
            'tiers.*.sku' => ['nullable', 'string', 'max:100'],
            'tiers.*.source_cost' => ['required', 'numeric', 'min:0'],
            'tiers.*.price_strategy' => ['required', Rule::enum(PriceStrategy::class)],
            'tiers.*.margin_percent' => ['nullable', 'numeric', 'min:0'],
            'tiers.*.fixed_margin' => ['nullable', 'numeric', 'min:0'],
            'tiers.*.final_price' => ['nullable', 'numeric', 'min:0'],
            'tiers.*.agent_price' => ['nullable', 'numeric', 'min:0'],
            'tiers.*.api_price' => ['nullable', 'numeric', 'min:0'],
        ];
    }

    public function messages(): array
    {
        return [
            'category_id.required' => 'يرجى اختيار القسم التابع له المنتج.',
            'category_id.exists' => 'القسم المحدد غير موجود.',
            'name.required' => 'يرجى إدخال اسم المنتج.',
            'slug.unique' => 'الرابط المخصص مستخدم بالفعل.',
            'type.required' => 'يرجى تحديد نوع المنتج.',
            'image.image' => 'يجب أن يكون ملف الصورة صالحاً.',
            'image.mimes' => 'صيغة الصورة يجب أن تكون PNG أو JPG أو WEBP أو SVG.',
            'image.max' => 'حجم الصورة يجب ألا يتجاوز 10 ميجابايت.',
            'tiers.*.name.required' => 'يرجى إدخال اسم الباقة/الفئة.',
            'tiers.*.source_cost.required' => 'يرجى إدخال سعر التكلفة للباقة.',
        ];
    }
}
