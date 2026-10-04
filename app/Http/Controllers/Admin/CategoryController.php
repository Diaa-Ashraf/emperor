<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreCategoryRequest;
use App\Http\Requests\Admin\UpdateCategoryRequest;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\View\View;

class CategoryController extends Controller
{
    public function index(Request $request): View
    {
        $query = Category::query()
            ->select(['id', 'name', 'slug', 'type', 'icon', 'banner', 'is_active', 'sort_order', 'created_at'])
            ->withCount('products');

        if ($type = $request->input('type')) {
            $query->where('type', $type);
        }

        if ($search = $request->input('search')) {
            $query->where('name', 'like', "%{$search}%");
        }

        $categories = $query->orderBy('sort_order', 'asc')
            ->latest('id')
            ->paginate(15)
            ->withQueryString();

        return view('admin.categories.index', compact('categories'));
    }

    public function create(): View
    {
        return view('admin.categories.create');
    }

    public function store(StoreCategoryRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['slug'] = !empty($validated['slug']) ? Str::slug($validated['slug']) : Str::slug($validated['name']);

        if ($request->hasFile('icon')) {
            $validated['icon'] = $request->file('icon')->store('categories/icons', 'public');
        }

        if ($request->hasFile('banner')) {
            $validated['banner'] = $request->file('banner')->store('categories/banners', 'public');
        }

        Category::create($validated);

        return redirect()
            ->route('admin.categories.index')
            ->with('success', 'تم إضافة القسم بنجاح.');
    }

    public function edit(int $id): View
    {
        $category = Category::findOrFail($id);

        return view('admin.categories.edit', compact('category'));
    }

    public function update(UpdateCategoryRequest $request, int $id): RedirectResponse
    {
        $category = Category::findOrFail($id);
        $validated = $request->validated();
        $validated['is_active'] = $request->boolean('is_active');
        $validated['slug'] = !empty($validated['slug'])
            ? Str::slug($validated['slug'])
            : ($category->slug ?: Str::slug($validated['name']));

        if ($request->hasFile('icon')) {
            if ($category->icon) {
                Storage::disk('public')->delete($category->icon);
            }
            $validated['icon'] = $request->file('icon')->store('categories/icons', 'public');
        }

        if ($request->hasFile('banner')) {
            if ($category->banner) {
                Storage::disk('public')->delete($category->banner);
            }
            $validated['banner'] = $request->file('banner')->store('categories/banners', 'public');
        }

        $category->update($validated);

        return redirect()
            ->route('admin.categories.index')
            ->with('success', 'تم تحديث بيانات القسم بنجاح.');
    }

    public function toggleActive(int $id): RedirectResponse
    {
        $category = Category::findOrFail($id);
        $category->update(['is_active' => !$category->is_active]);

        $status = $category->is_active ? 'تفعيل' : 'تعطيل';
        return back()->with('success', "تم {$status} القسم بنجاح.");
    }

    public function destroy(int $id): RedirectResponse
    {
        $category = Category::findOrFail($id);

        if ($category->products()->count() > 0) {
            return back()->with('error', 'لا يمكن حذف هذا القسم نظراً لوجود منتجات مرتبطة به.');
        }

        $category->delete();

        return redirect()
            ->route('admin.categories.index')
            ->with('success', 'تم حذف القسم بنجاح.');
    }

    public function bulkDestroy(Request $request): RedirectResponse
    {
        $ids = $request->input('ids', []);
        if (empty($ids) || !is_array($ids)) {
            return back()->with('error', 'يرجى تحديد قسم واحد على الأقل للحذف.');
        }

        $withProducts = Category::whereIn('id', $ids)->has('products')->count();
        if ($withProducts > 0) {
            return back()->with('error', 'لا يمكن حذف بعض الأقسام المحددة نظراً لوجود منتجات مرتبطة بها.');
        }

        $count = count($ids);
        Category::whereIn('id', $ids)->delete();

        return redirect()
            ->route('admin.categories.index')
            ->with('success', "تم حذف {$count} من الأقسام المحددة بنجاح.");
    }
}

