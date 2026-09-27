<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreCatalogSourceRequest;
use App\Http\Requests\Admin\UpdateCatalogSourceRequest;
use App\Models\CatalogSource;
use App\Services\CatalogSyncService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class CatalogSourceController extends Controller
{
    public function __construct(
        protected CatalogSyncService $catalogSyncService
    ) {}

    public function index(): View
    {
        $sources = CatalogSource::query()
            ->select(['id', 'name', 'driver', 'base_url', 'is_active', 'sync_status', 'last_synced_at', 'created_at'])
            ->withCount('products')
            ->latest('id')
            ->paginate(15);

        return view('admin.catalog-sources.index', compact('sources'));
    }

    public function create(): View
    {
        return view('admin.catalog-sources.create');
    }

    public function store(StoreCatalogSourceRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $validated['is_active'] = $request->boolean('is_active', true);

        CatalogSource::create($validated);

        return redirect()
            ->route('admin.catalog-sources.index')
            ->with('success', 'تم إضافة مصدر الكتالوج بنجاح.');
    }

    public function edit(int $id): View
    {
        $source = CatalogSource::findOrFail($id);

        return view('admin.catalog-sources.edit', compact('source'));
    }

    public function update(UpdateCatalogSourceRequest $request, int $id): RedirectResponse
    {
        $source = CatalogSource::findOrFail($id);
        $validated = $request->validated();
        $validated['is_active'] = $request->boolean('is_active');

        // Only update API keys if provided
        if (empty($validated['api_key'])) {
            unset($validated['api_key']);
        }
        if (empty($validated['api_secret'])) {
            unset($validated['api_secret']);
        }

        $source->update($validated);

        return redirect()
            ->route('admin.catalog-sources.index')
            ->with('success', 'تم تحديث بيانات مصدر الكتالوج بنجاح.');
    }

    public function sync(int $id): RedirectResponse
    {
        $source = CatalogSource::findOrFail($id);
        $result = $this->catalogSyncService->syncSource($source);

        if ($result->success) {
            $msg = "تمت المزامنة بنجاح! تم إنشاء {$result->productsCreated} وتحديث {$result->productsUpdated} منتج.";
            return back()->with('success', $msg);
        }

        $errors = implode(', ', $result->errors);
        return back()->with('error', "فشلت المزامنة: {$errors}");
    }

    public function testConnection(int $id): JsonResponse
    {
        $source = CatalogSource::findOrFail($id);
        $adapter = $this->catalogSyncService->resolveAdapter($source->driver, $source->config ?? []);
        $result = $adapter->testConnection();

        return response()->json([
            'status' => $result['success'] ? 'success' : 'error',
            'message' => $result['message'] ?? ($result['success'] ? 'الاتصال بالمصدر ناجح.' : 'فشل الاتصال بالمصدر.'),
        ]);
    }
}
