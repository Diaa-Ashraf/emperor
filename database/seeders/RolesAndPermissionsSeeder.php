<?php

namespace Database\Seeders;

use App\Support\PermissionsMatrix;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // 1. Seed all granular permissions
        $allPermissions = PermissionsMatrix::allPermissionKeys();
        foreach ($allPermissions as $permissionName) {
            Permission::firstOrCreate(['name' => $permissionName, 'guard_name' => 'web']);
        }

        // Also ensure backward compatible legacy permissions if any existed
        $legacyPermissions = [
            'view-dashboard', 'view-orders', 'manage-orders', 'refund-orders',
            'view-products', 'manage-products', 'manage-categories', 'sync-catalog',
            'manage-pricing', 'manage-providers', 'view-targets', 'review-targets',
            'manage-target-rates', 'view-wallets', 'manage-wallets', 'manage-deposits',
            'manage-withdrawals', 'manage-payment-methods', 'view-users', 'manage-users',
            'manage-agents', 'manage-banners', 'manage-announcements', 'manage-settings',
            'view-audit-logs', 'view-api-logs'
        ];
        foreach ($legacyPermissions as $legacy) {
            Permission::firstOrCreate(['name' => $legacy, 'guard_name' => 'web']);
        }

        // 2. Predefined Administrative Roles
        $rolesData = [
            'super_admin' => 'المدير العام',
            'admin' => 'مشرف إداري عام',
            'operations_manager' => 'مدير العمليات والطلبات',
            'finance_manager' => 'مدير مالي وإيداعات',
            'support_agent' => 'مسؤول دعم فني',
            'agent' => 'وكيل معتمد',
            'customer' => 'عميل المتجر',
            'api_client' => 'عميل الربط البرمجي',
        ];

        $roleObjects = [];
        foreach ($rolesData as $roleKey => $roleLabel) {
            $roleObjects[$roleKey] = Role::firstOrCreate(['name' => $roleKey, 'guard_name' => 'web']);
        }

        // 3. Assign Default Permissions to Roles
        $defaultPermissions = PermissionsMatrix::defaultRolePermissions();
        foreach ($defaultPermissions as $roleKey => $perms) {
            if (isset($roleObjects[$roleKey])) {
                $roleObjects[$roleKey]->syncPermissions($perms);
            }
        }

        // Admin and Super Admin roles get all permissions
        $roleObjects['super_admin']->syncPermissions($allPermissions);
        $roleObjects['admin']->syncPermissions($allPermissions);

        // Clear cache again after syncing
        app()[PermissionRegistrar::class]->forgetCachedPermissions();
    }
}
