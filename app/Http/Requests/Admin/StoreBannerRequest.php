<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreBannerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'subtitle' => ['nullable', 'string', 'max:255'],
            'type' => ['required', 'string', 'in:slider,banner,popup,deal'],
            'link' => ['nullable', 'string', 'max:255'],
            'old_price' => ['nullable', 'numeric', 'min:0'],
            'sale_price' => ['nullable', 'numeric', 'min:0'],
            'discount_badge' => ['nullable', 'string', 'max:64'],
            'claimed_percent' => ['nullable', 'integer', 'min:0', 'max:100'],
            'remaining_items' => ['nullable', 'integer', 'min:0'],
            'image' => ['required', 'image', 'mimes:jpeg,png,jpg,webp,svg', 'max:4096'],
            'mobile_image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp,svg', 'max:4096'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
            'starts_at' => ['nullable', 'date'],
            'ends_at' => ['nullable', 'date', 'after_or_equal:starts_at'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'يرجى إدخال عنوان الإعلان/البانر.',
            'type.required' => 'يرجى تحديد نوع العرض (سلايدر/بانر).',
            'image.required' => 'يرجى رفع صورة الإعلان.',
            'image.image' => 'يجب أن يكون الملف المرفوع صورة صحيحة.',
            'ends_at.after_or_equal' => 'تاريخ نهاية العرض يجب أن يكون بعد تاريخ البدء.',
        ];
    }
}
