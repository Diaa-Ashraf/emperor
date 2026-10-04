<?php

namespace App\Http\Controllers\Admin;

use App\Enums\PriceStrategy;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreProductRequest;
use App\Http\Requests\Admin\UpdateProductRequest;
use App\Http\Requests\Admin\UpdateProviderMappingRequest;
use App\Models\CatalogSource;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductProvider;
use App\Models\ProductTier;
use App\Models\Provider;
use App\Services\PricingService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\View\View;

class ProductController extends Controller
{
    public function __construct(
        protected PricingService $pricingService
    ) {}

    public function index(Request $request): View
    {
        $query = Product::query()
            ->with(['category', 'catalogSource'])
            ->withCount(['tiers', 'orders'])
            ->select([
                'id',
                'category_id',
                'catalog_source_id',
                'name',
                'slug',
                'type',
                'image',
                'is_active',
                'sort_order',
                'created_at'
            ]);

        if ($catId = $request->input('category_id')) {
            $query->where('category_id', $catId);
        }

        if ($type = $request->input('type')) {
            $query->where('type', $type);
        }

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('slug', 'like', "%{$search}%");
            });
        }

        $products = $query->orderBy('sort_order', 'asc')
            ->latest('id')
            ->paginate(15)
            ->withQueryString();

        $categories = Category::select(['id', 'name'])->orderBy('sort_order')->get();

        return view('admin.products.index', compact('products', 'categories'));
    }

    public function create(): View
    {
        $categories = Category::where('is_active', true)->select(['id', 'name', 'type'])->orderBy('sort_order')->get();
        $sources = CatalogSource::where('is_active', true)->select(['id', 'name'])->get();

        return view('admin.products.create', compact('categories', 'sources'));
    }

    public function store(StoreProductRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['has_server_id'] = $request->boolean('has_server_id');
        $validated['requires_account_region'] = $request->boolean('requires_account_region');
        $validated['slug'] = !empty($validated['slug']) ? Str::slug($validated['slug']) : Str::slug($validated['name']);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('products', 'public');
        }

        DB::transaction(function () use ($validated, $request) {
            $product = Product::create($validated);

            // Handle initial tiers
            if (!empty($validated['tiers']) && is_array($validated['tiers'])) {
                foreach ($validated['tiers'] as $index => $tierData) {
                    $tier = new ProductTier([
                        'product_id' => $product->id,
                        'name' => $tierData['name'],
                        'sku' => $tierData['sku'] ?? null,
                        'source_cost' => $tierData['source_cost'],
                        'cost_currency' => 'USD',
                        'price_strategy' => $tierData['price_strategy'],
                        'margin_percent' => $tierData['margin_percent'] ?? 0,
                        'fixed_margin' => $tierData['fixed_margin'] ?? 0,
                        'final_price' => $tierData['final_price'] ?? 0,
                        'agent_price' => $tierData['agent_price'] ?? null,
                        'api_price' => $tierData['api_price'] ?? null,
                        'is_active' => true,
                        'sort_order' => $index,
                    ]);

                    if ($tier->price_strategy !== PriceStrategy::MANUAL) {
                        $tier->final_price = $this->pricingService->calculateSellPrice($tier);
                        if (empty($tier->agent_price)) {
                            $tier->agent_price = round($tier->final_price * 0.98, 2);
                        }
                        if (empty($tier->api_price)) {
                            $tier->api_price = round($tier->final_price * 0.97, 2);
                        }
                    }

                    $tier->save();
                }
            }
        });

        return redirect()
            ->route('admin.products.index')
            ->with('success', 'تم إضافة المنتج والباقات بنجاح.');
    }

    public function edit(int $id): View
    {
        $product = Product::with(['tiers' => function ($q) {
            $q->orderBy('sort_order', 'asc');
        }])->findOrFail($id);

        $categories = Category::select(['id', 'name', 'type'])->orderBy('sort_order')->get();
        $sources = CatalogSource::select(['id', 'name'])->get();

        return view('admin.products.edit', compact('product', 'categories', 'sources'));
    }

    public function update(UpdateProductRequest $request, int $id): RedirectResponse
    {
        $product = Product::findOrFail($id);
        $validated = $request->validated();
        $validated['is_active'] = $request->boolean('is_active');
        $validated['has_server_id'] = $request->boolean('has_server_id');
        $validated['requires_account_region'] = $request->boolean('requires_account_region');
        $validated['slug'] = !empty($validated['slug'])
            ? Str::slug($validated['slug'])
            : ($product->slug ?: Str::slug($validated['name']));

        if ($request->hasFile('image')) {
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
            $validated['image'] = $request->file('image')->store('products', 'public');
        }

        DB::transaction(function () use ($product, $validated) {
            $product->update($validated);

            // Update / Upsert Tiers
            if (isset($validated['tiers']) && is_array($validated['tiers'])) {
                $keptTierIds = [];

                foreach ($validated['tiers'] as $index => $tierData) {
                    $tierId = $tierData['id'] ?? null;
                    $tier = $tierId ? ProductTier::where('product_id', $product->id)->find($tierId) : new ProductTier();

                    if (!$tier) {
                        $tier = new ProductTier();
                    }

                    $tier->product_id = $product->id;
                    $tier->name = $tierData['name'];
                    $tier->sku = $tierData['sku'] ?? null;
                    $tier->source_cost = $tierData['source_cost'];
                    $tier->cost_currency = 'USD';
                    $tier->price_strategy = $tierData['price_strategy'];
                    $tier->margin_percent = $tierData['margin_percent'] ?? 0;
                    $tier->fixed_margin = $tierData['fixed_margin'] ?? 0;
                    $tier->final_price = $tierData['final_price'] ?? 0;
                    $tier->agent_price = $tierData['agent_price'] ?? null;
                    $tier->api_price = $tierData['api_price'] ?? null;
                    $tier->is_active = isset($tierData['is_active']) ? (bool) $tierData['is_active'] : true;
                    $tier->sort_order = $index;

                    if ($tier->price_strategy !== PriceStrategy::MANUAL) {
                        $tier->final_price = $this->pricingService->calculateSellPrice($tier);
                        if (empty($tier->agent_price)) {
                            $tier->agent_price = round($tier->final_price * 0.98, 2);
                        }
                        if (empty($tier->api_price)) {
                            $tier->api_price = round($tier->final_price * 0.97, 2);
                        }
                    }

                    $tier->save();
                    $keptTierIds[] = $tier->id;
                }
            }
        });

        return redirect()
            ->route('admin.products.index')
            ->with('success', 'تم تحديث بيانات المنتج والباقات بنجاح.');
    }

    public function providerMapping(int $id): View
    {
        $product = Product::with(['tiers.productProviders.provider'])->findOrFail($id);
        $providers = Provider::where('is_active', true)->orderBy('priority', 'asc')->get();

        return view('admin.products.provider-mapping', compact('product', 'providers'));
    }

    public function updateProviderMapping(UpdateProviderMappingRequest $request, int $id): RedirectResponse
    {
        $product = Product::with('tiers')->findOrFail($id);
        $validated = $request->validated();

        DB::transaction(function () use ($product, $validated) {
            // Delete existing mappings for this product's tiers
            $tierIds = $product->tiers->pluck('id');
            ProductProvider::whereIn('product_tier_id', $tierIds)->delete();

            if (!empty($validated['mappings'])) {
                foreach ($validated['mappings'] as $mapping) {
                    ProductProvider::create([
                        'product_id' => $product->id,
                        'product_tier_id' => $mapping['product_tier_id'],
                        'provider_id' => $mapping['provider_id'],
                        'provider_sku' => $mapping['provider_sku'] ?? null,
                        'priority' => $mapping['priority'] ?? 1,
                        'cost_price' => $mapping['cost_price'] ?? null,
                        'is_active' => isset($mapping['is_active']) ? (bool) $mapping['is_active'] : true,
                    ]);
                }
            }
        });

        return redirect()
            ->route('admin.products.provider-mapping', $product->id)
            ->with('success', 'تم حفظ ربط وتوجيه المزودين بنجاح.');
    }

    public function toggleActive(int $id): RedirectResponse
    {
        $product = Product::findOrFail($id);
        $product->update(['is_active' => !$product->is_active]);

        $status = $product->is_active ? 'تفعيل' : 'تعطيل';
        return back()->with('success', "تم {$status} المنتج بنجاح.");
    }

    public function destroy(int $id): RedirectResponse
    {
        $product = Product::findOrFail($id);

        DB::transaction(function () use ($product) {
            $product->tiers()->delete();
            $product->delete();
        });

        return redirect()
            ->route('admin.products.index')
            ->with('success', "تم حذف المنتج «{$product->name}» وباقاته بنجاح.");
    }

    public function bulkDestroy(Request $request): RedirectResponse
    {
        $ids = $request->input('ids', []);
        if (empty($ids) || !is_array($ids)) {
            return back()->with('error', 'يرجى تحديد منتج واحد على الأقل للحذف.');
        }

        $count = count($ids);
        DB::transaction(function () use ($ids) {
            \App\Models\ProductTier::whereIn('product_id', $ids)->delete();
            Product::whereIn('id', $ids)->delete();
        });

        return redirect()
            ->route('admin.products.index')
            ->with('success', "تم حذف {$count} من المنتجات المحددة وباقاتها بنجاح.");
    }
}

