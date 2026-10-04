<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductTier;
use App\Models\Voucher;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\View\View;

class VoucherController extends Controller
{
    public function index(Request $request): View
    {
        $query = Voucher::with(['product:id,name,image', 'tier:id,name,final_price,cost_currency', 'order:id,public_id']);

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('code', 'like', "%{$search}%")
                  ->orWhere('serial_number', 'like', "%{$search}%");
            });
        }

        if ($productId = $request->input('product_id')) {
            $query->where('product_id', $productId);
        }

        if ($tierId = $request->input('tier_id')) {
            $query->where('product_tier_id', $tierId);
        }

        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        $vouchers = $query->latest('id')->paginate(20)->withQueryString();

        $stats = [
            'total' => Voucher::count(),
            'available' => Voucher::where('status', 'available')->count(),
            'sold' => Voucher::where('status', 'sold')->count(),
            'reserved' => Voucher::where('status', 'reserved')->count(),
        ];

        $products = Product::where('is_active', true)->with('tiers:id,product_id,name')->select(['id', 'name'])->get();

        return view('admin.vouchers.index', compact('vouchers', 'stats', 'products'));
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'product_tier_id' => 'required|exists:product_tiers,id',
            'codes' => 'required|string',
            'expires_at' => 'nullable|date',
            'serial_numbers' => 'nullable|string',
        ], [
            'product_id.required' => 'يرجى اختيار المنتج.',
            'product_tier_id.required' => 'يرجى اختيار باقة المنتج.',
            'codes.required' => 'يرجى إدخال كود واحد على الأقل.',
        ]);

        $productId = (int) $request->input('product_id');
        $tierId = (int) $request->input('product_tier_id');
        $expiresAt = $request->input('expires_at');

        // Split multiple codes by new lines or commas
        $rawCodes = preg_split('/[\r\n,]+/', $request->input('codes'), -1, PREG_SPLIT_NO_EMPTY);
        $rawSerials = preg_split('/[\r\n,]+/', (string) $request->input('serial_numbers'), -1, PREG_SPLIT_NO_EMPTY);

        $insertedCount = 0;
        DB::transaction(function () use ($rawCodes, $rawSerials, $productId, $tierId, $expiresAt, &$insertedCount) {
            foreach ($rawCodes as $index => $code) {
                $code = trim($code);
                if (empty($code)) continue;

                $serial = isset($rawSerials[$index]) ? trim($rawSerials[$index]) : null;

                Voucher::create([
                    'product_id' => $productId,
                    'product_tier_id' => $tierId,
                    'code' => $code,
                    'serial_number' => $serial,
                    'expires_at' => $expiresAt,
                    'status' => 'available',
                ]);
                $insertedCount++;
            }
        });

        return redirect()
            ->route('admin.vouchers.index')
            ->with('success', "تم إضافة واستيراد {$insertedCount} كود رقمي بنجاح إلى المخزون.");
    }

    public function destroy(int $id): RedirectResponse
    {
        $voucher = Voucher::findOrFail($id);
        
        if ($voucher->status === 'sold') {
            return back()->with('error', 'لا يمكن حذف كود تم بيعه وتسليمه لطلب سابق.');
        }

        $voucher->delete();

        return redirect()
            ->route('admin.vouchers.index')
            ->with('success', 'تم حذف الكود من المخزون بنجاح.');
    }

    public function bulkDestroy(Request $request): RedirectResponse
    {
        $ids = $request->input('ids', []);
        if (empty($ids) || !is_array($ids)) {
            return back()->with('error', 'يرجى تحديد كود واحد على الأقل للحذف.');
        }

        $count = Voucher::whereIn('id', $ids)->where('status', '!=', 'sold')->delete();

        return redirect()
            ->route('admin.vouchers.index')
            ->with('success', "تم حذف {$count} من الأكواد المحددة بنجاح.");
    }
}
