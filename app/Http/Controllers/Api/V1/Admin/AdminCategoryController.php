<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Enums\CategoryType;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class AdminCategoryController extends Controller
{
    use ApiResponse;

    /**
     * Get categories list sorted by sort_order.
     * Matches Screenshot 3.
     */
    public function index(): JsonResponse
    {
        $categories = Category::query()
            ->select(['id', 'name', 'slug', 'type', 'icon', 'sort_order', 'is_active', 'created_at'])
            ->withCount('products')
            ->orderBy('sort_order', 'asc')
            ->orderBy('id', 'asc')
            ->get();

        return $this->successResponse($categories, 'تم جلب الأقسام بنجاح');
    }

    /**
     * Store new category.
     * Matches Screenshot 4.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['nullable', 'string', 'max:100'],
            'name_en' => ['nullable', 'string', 'max:100'],
            'type' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'parent_id' => ['nullable', 'integer'],
            'image' => ['nullable', 'image', 'max:4096'],
        ]);

        $name = !empty($validated['name']) ? $validated['name'] : (!empty($validated['name_en']) ? $validated['name_en'] : 'قسم جديد');
        $slugBase = !empty($validated['name_en']) ? $validated['name_en'] : $name;
        $slug = Str::slug($slugBase, '-', null);
        if (empty($slug) || $slug === '-') {
            $slug = 'category-' . Str::lower(Str::random(6));
        }
        if (Category::where('slug', $slug)->exists()) {
            $slug .= '-' . Str::lower(Str::random(4));
        }

        // Auto-detect type if not passed or passed as voice_apps / apps
        $categoryType = CategoryType::GAMES;
        if (!empty($validated['type'])) {
            $categoryType = CategoryType::tryFrom($validated['type']) ?? CategoryType::GAMES;
        } elseif (str_contains($name, 'تطبيق') || str_contains($name, 'شات') || str_contains(strtolower($slugBase), 'app')) {
            $categoryType = CategoryType::VOICE_APPS;
        }

        $iconPath = 'gamepad-2';
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('categories', 'public');
            $iconPath = '/storage/' . $path;
        }

        $category = Category::create([
            'name' => $name,
            'slug' => $slug,
            'type' => $categoryType,
            'icon' => $iconPath,
            'sort_order' => $validated['sort_order'] ?? (Category::max('sort_order') + 1),
            'is_active' => true,
        ]);

        \Illuminate\Support\Facades\Cache::flush();

        return $this->successResponse($category, 'تمت إضافة القسم بنجاح', Response::HTTP_CREATED);
    }

    /**
     * Update category.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $category = Category::findOrFail($id);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
            'image' => ['nullable', 'image', 'max:4096'],
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('categories', 'public');
            $category->icon = '/storage/' . $path;
        }

        $category->name = $validated['name'];
        if (!empty($validated['type'])) {
            $category->type = CategoryType::tryFrom($validated['type']) ?? $category->type;
        } elseif (str_contains($validated['name'], 'تطبيق') || str_contains($validated['name'], 'شات')) {
            $category->type = CategoryType::VOICE_APPS;
        }
        if (isset($validated['sort_order'])) {
            $category->sort_order = $validated['sort_order'];
        }
        if (isset($validated['is_active'])) {
            $category->is_active = $validated['is_active'];
        }
        $category->save();

        \Illuminate\Support\Facades\Cache::flush();

        return $this->successResponse($category, 'تم تحديث بيانات القسم بنجاح');
    }

    /**
     * Delete category.
     */
    public function destroy(int $id): JsonResponse
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return $this->successResponse(null, 'تم حذف القسم بنجاح');
    }

    /**
     * Reorder categories.
     */
    public function reorder(Request $request): JsonResponse
    {
        $items = $request->input('orders', $request->input('items', []));
        if (!is_array($items)) {
            $items = [];
        }

        foreach ($items as $item) {
            if (isset($item['id']) && isset($item['sort_order'])) {
                Category::where('id', $item['id'])->update(['sort_order' => (int) $item['sort_order']]);
            }
        }

        return $this->successResponse(null, 'تم حفظ ترتيب الأقسام بنجاح');
    }
}

