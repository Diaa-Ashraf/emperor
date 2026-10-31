<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\CustomerGroup;
use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminPricingTierController extends Controller
{
    use ApiResponse;

    /**
     * List all customer groups with live member counts, member previews, and deletion status.
     * Matches Screenshots 1 & 2.
     */
    public function index(): JsonResponse
    {
        $groups = CustomerGroup::orderBy('sort_order', 'asc')->orderBy('id', 'asc')->get();

        // Load all users' vip_group preferences for fast grouping
        $users = User::select(['id', 'name', 'preferences'])->get();

        $usersByGroup = [];
        foreach ($users as $u) {
            $grp = $u->preferences['vip_group'] ?? null;
            if ($grp) {
                $usersByGroup[$grp][] = $u->name;
            }
        }

        $totalGroups = $groups->count();
        $activeGroups = 0;
        $emptyGroups = 0;

        $groupsData = $groups->map(function ($g) use ($usersByGroup, &$activeGroups, &$emptyGroups) {
            $memberNames = $usersByGroup[$g->name] ?? [];
            $membersCount = count($memberNames);

            if ($membersCount > 0) {
                $activeGroups++;
            } else {
                $emptyGroups++;
            }

            return [
                'id' => $g->id,
                'name' => $g->name,
                'discount_percentage' => (float) $g->discount_percentage,
                'discount_formatted' => $g->discount_percentage . '%',
                'sort_order' => $g->sort_order,
                'is_active' => $g->is_active,
                'members_count' => $membersCount,
                'members_preview' => $membersCount > 0
                    ? implode(', ', array_slice($memberNames, 0, 3)) . ($membersCount > 3 ? '...' : '')
                    : 'لا يوجد مستخدمون داخل هذه المجموعة...',
                'can_delete' => $membersCount === 0,
                'protection_status' => $membersCount > 0 ? 'محمي بنقل الأعضاء' : 'بدون أعضاء',
            ];
        });

        return $this->successResponse([
            'stats' => [
                'total_groups' => $totalGroups,
                'active_groups' => $activeGroups,
                'empty_groups' => $emptyGroups,
            ],
            'groups' => $groupsData,
        ], 'تم جلب مجموعات العملاء بنجاح');
    }

    /**
     * Create a new customer group.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:50', 'unique:customer_groups,name'],
            'discount_percentage' => ['required', 'numeric', 'min:0', 'max:100'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ], [
            'name.required' => 'اسم المجموعة مطلوب.',
            'name.unique' => 'اسم المجموعة مستخدم بالفعل.',
            'discount_percentage.required' => 'نسبة الخصم مطلوبة.',
        ]);

        $group = CustomerGroup::create([
            'name' => $validated['name'],
            'discount_percentage' => $validated['discount_percentage'],
            'sort_order' => $validated['sort_order'] ?? (CustomerGroup::max('sort_order') + 1),
            'is_active' => true,
        ]);

        return $this->successResponse($group, 'تمت إضافة المجموعة بنجاح', Response::HTTP_CREATED);
    }

    /**
     * Update an existing group.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $group = CustomerGroup::findOrFail($id);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:50', 'unique:customer_groups,name,' . $id],
            'discount_percentage' => ['required', 'numeric', 'min:0', 'max:100'],
        ], [
            'name.required' => 'اسم المجموعة مطلوب.',
            'discount_percentage.required' => 'نسبة الخصم مطلوبة.',
        ]);

        $oldName = $group->name;
        $newName = $validated['name'];

        $group->update([
            'name' => $newName,
            'discount_percentage' => $validated['discount_percentage'],
        ]);

        // If the group name changed, update assigned users' preferences
        if ($oldName !== $newName) {
            $users = User::where('preferences->vip_group', $oldName)->get();
            foreach ($users as $u) {
                $prefs = $u->preferences ?? [];
                $prefs['vip_group'] = $newName;
                $u->preferences = $prefs;
                $u->save();
            }
        }

        return $this->successResponse($group, 'تم تحديث بيانات المجموعة بنجاح');
    }

    /**
     * Transfer members from one group to another before deletion.
     */
    public function transfer(Request $request, int $id): JsonResponse
    {
        $sourceGroup = CustomerGroup::findOrFail($id);

        $validated = $request->validate([
            'target_group_id' => ['required', 'integer', 'exists:customer_groups,id'],
        ], [
            'target_group_id.required' => 'يرجى اختيار المجموعة البديلة لنقل الأعضاء.',
            'target_group_id.exists' => 'المجموعة البديلة غير موجودة.',
        ]);

        $targetGroup = CustomerGroup::findOrFail($validated['target_group_id']);

        if ($sourceGroup->id === $targetGroup->id) {
            return $this->errorResponse('لا يمكن نقل الأعضاء إلى نفس المجموعة.', Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $users = User::where('preferences->vip_group', $sourceGroup->name)->get();
        $transferredCount = 0;

        foreach ($users as $u) {
            $prefs = $u->preferences ?? [];
            $prefs['vip_group'] = $targetGroup->name;
            $u->preferences = $prefs;
            $u->save();
            $transferredCount++;
        }

        return $this->successResponse([
            'transferred_count' => $transferredCount,
            'source_group' => $sourceGroup->name,
            'target_group' => $targetGroup->name,
        ], "تم نقل {$transferredCount} عضو بنجاح إلى مجموعة {$targetGroup->name}");
    }

    /**
     * Delete an empty group.
     */
    public function destroy(int $id): JsonResponse
    {
        $group = CustomerGroup::findOrFail($id);

        $hasMembers = User::where('preferences->vip_group', $group->name)->exists();
        if ($hasMembers) {
            return $this->errorResponse('لا يمكن حذف المجموعة لأن بها أعضاء حاليين. يرجى نقل الأعضاء أولاً.', Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $group->delete();

        return $this->successResponse(null, 'تم حذف المجموعة بنجاح');
    }
}

