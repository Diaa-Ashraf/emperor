<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Enums\UserRole;
use App\Enums\UserStatus;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Support\PermissionsMatrix;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Symfony\Component\HttpFoundation\Response;

class AdminStaffController extends Controller
{
    use ApiResponse;

    /**
     * Define categorized permissions matching full enterprise system capabilities.
     */
    protected function getPermissionGroups(): array
    {
        return PermissionsMatrix::getUiPermissionGroups();
    }

    /**
     * Role definitions with Arabic labels.
     */
    protected function getAvailableRoles(): array
    {
        return array_values(PermissionsMatrix::rolePresets());
    }

    /**
     * Helper to get Arabic label for a role.
     */
    protected function getRoleArabicLabel(string $role): string
    {
        $presets = PermissionsMatrix::rolePresets();
        return $presets[$role]['name'] ?? ($presets[$role]['label'] ?? 'مشرف إداري');
    }

    /**
     * Ensure permissions exist in database.
     */
    protected function ensurePermissionsExist(array $permissions): void
    {
        foreach ($permissions as $p) {
            if (!empty($p)) {
                Permission::firstOrCreate(['name' => $p, 'guard_name' => 'web']);
            }
        }
    }

    /**
     * List all supervisors / staff members with Spatie Roles & Permissions.
     */
    public function index(Request $request): JsonResponse
    {
        // Ensure all UI permissions exist in Spatie
        $groups = $this->getPermissionGroups();
        foreach ($groups as $group) {
            foreach ($group['permissions'] as $p) {
                Permission::firstOrCreate(['name' => $p['key'], 'guard_name' => 'web']);
            }
        }

        $query = User::query()
            ->where(function ($q) {
                $q->where('role', UserRole::ADMIN)
                    ->orWhere('role', 'admin')
                    ->orWhereHas('roles', function ($rq) {
                        $rq->whereIn('name', ['admin', 'super_admin', 'operations_manager', 'finance_manager', 'support_agent', 'agent']);
                    })
                    ->orWhereNotNull('preferences->staff_title');
            })
            ->with(['roles', 'permissions'])
            ->select([
                'id',
                'name',
                'email',
                'phone',
                'role',
                'status',
                'avatar',
                'last_login_at',
                'preferences',
                'created_at',
            ]);

        if ($request->filled('search')) {
            $search = trim($request->input('search'));
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        $supervisors = $query->latest('id')->get();
        $totalStaff = $supervisors->count();

        $data = $supervisors->map(function ($s) {
            $lastLogin = $s->last_login_at;
            $presence = 'غير متصل';
            $isOnline = false;

            if ($lastLogin) {
                $diffMinutes = now()->diffInMinutes($lastLogin);
                if ($diffMinutes <= 15) {
                    $presence = 'متصل الآن';
                    $isOnline = true;
                } elseif ($diffMinutes < 60) {
                    $presence = "نشط منذ {$diffMinutes} دقيقة";
                } elseif ($diffMinutes < 1440) {
                    $hours = round($diffMinutes / 60);
                    $presence = "نشط منذ {$hours} ساعة";
                } else {
                    $days = round($diffMinutes / 1440);
                    $presence = "نشط منذ {$days} يوم";
                }
            }

            // Get Spatie Role & Permissions
            $primaryRole = $s->roles->first()?->name ?? $s->role ?? 'admin';
            $roleLabel = $s->preferences['staff_title'] ?? $this->getRoleArabicLabel($primaryRole);

            // Spatie all permissions list
            $spatiePerms = $s->getAllPermissions()->pluck('name')->toArray();

            // If user has no Spatie permissions yet, check preferences fallback
            if (empty($spatiePerms) && !empty($s->preferences['permissions'])) {
                $fallback = $s->preferences['permissions'];
                foreach ($fallback as $k => $val) {
                    if ($val) {
                        $mapped = str_replace('_', '.', $k);
                        $spatiePerms[] = $mapped;
                    }
                }
            }

            return [
                'id' => $s->id,
                'name' => $s->name,
                'email' => $s->email,
                'phone' => $s->phone,
                'role' => $primaryRole,
                'role_label' => $roleLabel,
                'status' => $s->status,
                'is_active' => $s->status === UserStatus::ACTIVE || $s->status === 'active',
                'avatar' => $s->avatar,
                'presence' => $presence,
                'is_online' => $isOnline,
                'permissions' => $spatiePerms,
                'permissions_count' => count($spatiePerms),
                'created_at' => $s->created_at->toISOString(),
            ];
        });

        return $this->successResponse([
            'total_staff' => $totalStaff,
            'supervisors' => $data,
            'available_roles' => $this->getAvailableRoles(),
            'permission_groups' => $groups,
        ], 'تم جلب قائمة المشرفين والصلاحيات بنجاح');
    }

    /**
     * Add new supervisor with Spatie Role & Permissions.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:150', 'unique:users,email'],
            'password' => ['required', 'string', 'min:6'],
            'phone' => ['nullable', 'string', 'max:20'],
            'role' => ['required', 'string'],
            'staff_title' => ['nullable', 'string', 'max:100'],
            'permissions' => ['nullable', 'array'],
            'permissions.*' => ['string'],
        ], [
            'name.required' => 'اسم المشرف مطلوب.',
            'email.required' => 'البريد الإلكتروني مطلوب.',
            'email.unique' => 'البريد الإلكتروني مسجل بالفعل لمستخدم آخر.',
            'password.required' => 'كلمة المرور مطلوبة.',
            'password.min' => 'يجب ألا تقل كلمة المرور عن 6 أحرف.',
            'role.required' => 'يرجى اختيار دور المشرف.',
        ]);

        $roleName = $validated['role'];
        Role::firstOrCreate(['name' => $roleName, 'guard_name' => 'web']);

        $selectedPermissions = $validated['permissions'] ?? [];
        $this->ensurePermissionsExist($selectedPermissions);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'password' => Hash::make($validated['password']),
            'role' => UserRole::ADMIN,
            'status' => UserStatus::ACTIVE,
            'currency' => 'EGP',
            'email_verified_at' => now(),
            'phone_verified_at' => now(),
            'preferences' => [
                'staff_title' => $validated['staff_title'] ?: $this->getRoleArabicLabel($roleName),
                'permissions' => $selectedPermissions,
            ],
        ]);

        // Assign Spatie Role and Permissions
        $user->syncRoles([$roleName]);
        if (!empty($selectedPermissions)) {
            $user->syncPermissions($selectedPermissions);
        }

        return $this->successResponse([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $roleName,
            'permissions' => $selectedPermissions,
        ], 'تمت إضافة المشرف بنجاح وتعيين دوره وصلاحياته');
    }

    /**
     * Update Spatie Role and Permissions for a supervisor.
     */
    public function updatePermissions(Request $request, int $id): JsonResponse
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'role' => ['nullable', 'string'],
            'staff_title' => ['nullable', 'string', 'max:100'],
            'permissions' => ['required', 'array'],
            'permissions.*' => ['string'],
        ], [
            'permissions.required' => 'يجب إرسال مصفوفة الصلاحيات.',
        ]);

        $selectedPermissions = $validated['permissions'] ?? [];
        $this->ensurePermissionsExist($selectedPermissions);

        // Update Spatie Role if provided
        if (!empty($validated['role'])) {
            $roleName = $validated['role'];
            Role::firstOrCreate(['name' => $roleName, 'guard_name' => 'web']);
            $user->syncRoles([$roleName]);
        }

        // Sync Spatie Permissions
        $user->syncPermissions($selectedPermissions);

        // Update preferences
        $preferences = $user->preferences ?? [];
        if (!empty($validated['staff_title'])) {
            $preferences['staff_title'] = $validated['staff_title'];
        } elseif (!empty($validated['role'])) {
            $preferences['staff_title'] = $this->getRoleArabicLabel($validated['role']);
        }
        $preferences['permissions'] = $selectedPermissions;
        $user->preferences = $preferences;
        $user->save();

        return $this->successResponse([
            'id' => $user->id,
            'name' => $user->name,
            'role' => $user->roles->first()?->name ?? $user->role,
            'permissions' => $user->getAllPermissions()->pluck('name')->toArray(),
        ], 'تم حفظ صلاحيات المشرف بنجاح');
    }

    /**
     * Toggle supervisor status (Active / Suspended).
     */
    public function toggleStatus(int $id): JsonResponse
    {
        $user = User::findOrFail($id);
        $user->status = ($user->status === UserStatus::ACTIVE || $user->status === 'active')
            ? UserStatus::SUSPENDED
            : UserStatus::ACTIVE;
        $user->save();

        return $this->successResponse([
            'id' => $user->id,
            'status' => $user->status,
            'is_active' => $user->status === UserStatus::ACTIVE || $user->status === 'active',
        ], 'تم تعديل حالة المشرف بنجاح');
    }

    /**
     * Delete / Remove supervisor permissions.
     */
    public function destroy(int $id): JsonResponse
    {
        $user = User::findOrFail($id);
        $user->syncRoles([]);
        $user->syncPermissions([]);
        $user->role = UserRole::CUSTOMER;

        $prefs = $user->preferences ?? [];
        unset($prefs['staff_title']);
        unset($prefs['permissions']);
        $user->preferences = $prefs;
        $user->save();

        return $this->successResponse(null, 'تمت إزالة صلاحيات الإشراف عن المستخدم بنجاح');
    }
}
