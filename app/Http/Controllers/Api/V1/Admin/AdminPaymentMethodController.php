<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\PaymentGroup;
use App\Models\PaymentMethod;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AdminPaymentMethodController extends Controller
{
    use ApiResponse;

    /**
     * Get payment groups and methods for admin management.
     */
    public function index(): JsonResponse
    {
        $groups = PaymentGroup::with(['paymentMethods' => function ($query) {
            $query->orderBy('sort_order')->orderBy('id');
        }])->get();

        // Also fetch any standalone methods not tied to a group
        $standaloneMethods = PaymentMethod::whereNull('payment_group_id')
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();

        $totalMethods = PaymentMethod::count();
        $activeMethods = PaymentMethod::where('is_active', true)->count();

        return $this->successResponse([
            'groups' => $groups,
            'standalone_methods' => $standaloneMethods,
            'stats' => [
                'total_methods' => $totalMethods,
                'active_methods' => $activeMethods,
                'total_groups' => $groups->count(),
            ],
        ], 'تم جلب طرق ومجموعات الدفع بنجاح');
    }

    /**
     * Store a new payment group (Matching Screenshot media_1793325113651_7368b658.png).
     */
    public function storeGroup(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:190',
            'currency' => 'required|string|max:10',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $group = PaymentGroup::create([
            'name' => $validated['name'],
            'currency' => strtoupper($validated['currency']),
            'description' => $validated['description'] ?? null,
            'image' => $validated['image'] ?? '1000299968.png',
            'is_active' => $request->boolean('is_active', true),
        ]);

        return $this->successResponse($group, 'تمت إضافة مجموعة الدفع بنجاح');
    }

    /**
     * Store a new payment method (Matching Screenshots media_1793325123040_b245b91e.png & media_1793325156633_8ee6edba.png).
     */
    public function storeMethod(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'payment_group_id' => 'nullable|exists:payment_groups,id',
            'name' => 'required|string|max:190',
            'type' => 'nullable|string|max:100',
            'percent_fee' => 'nullable|numeric|min:0',
            'account_number' => 'nullable|string|max:190',
            'bank_name' => 'nullable|string|max:190',
            'account_holder_name' => 'nullable|string|max:190',
            'instruction' => 'nullable|string',
            'logo' => 'nullable|string',
            'qr_code' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $code = Str::slug($validated['name']) . '_' . Str::random(5);

        $method = PaymentMethod::create([
            'payment_group_id' => $validated['payment_group_id'] ?? null,
            'name' => $validated['name'],
            'code' => $code,
            'type' => $validated['type'] ?? 'محفظة إلكترونية',
            'currency' => 'EGP',
            'percent_fee' => $validated['percent_fee'] ?? 0,
            'account_number' => $validated['account_number'] ?? null,
            'bank_name' => $validated['bank_name'] ?? null,
            'account_holder_name' => $validated['account_holder_name'] ?? null,
            'instruction' => $validated['instruction'] ?? null,
            'instructions' => $validated['instruction'] ?? null,
            'logo' => $validated['logo'] ?? '1000299996.png',
            'qr_code' => $validated['qr_code'] ?? null,
            'is_active' => $request->boolean('is_active', true),
        ]);

        return $this->successResponse($method, 'تمت إضافة طريقة الدفع بنجاح');
    }

    /**
     * Toggle active status.
     */
    public function toggleMethod(int $id): JsonResponse
    {
        $method = PaymentMethod::findOrFail($id);
        $method->is_active = !$method->is_active;
        $method->save();

        return $this->successResponse([
            'id' => $method->id,
            'is_active' => $method->is_active,
        ], 'تم تحديث حالة طريقة الدفع');
    }

    /**
     * Delete payment method.
     */
    public function destroyMethod(int $id): JsonResponse
    {
        $method = PaymentMethod::findOrFail($id);
        $method->delete();

        return $this->successResponse(null, 'تم حذف طريقة الدفع بنجاح');
    }

    /**
     * Delete payment group.
     */
    public function destroyGroup(int $id): JsonResponse
    {
        $group = PaymentGroup::findOrFail($id);
        $group->paymentMethods()->update(['payment_group_id' => null]);
        $group->delete();

        return $this->successResponse(null, 'تم حذف مجموعة الدفع بنجاح');
    }
}

