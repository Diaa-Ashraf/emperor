<?php

namespace Database\Seeders;

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

        // Permissions list
        $permissions = [
            // Dashboard
            'view-dashboard',
            
            // Orders
            'view-orders',
            'manage-orders',
            'refund-orders',

            // Products & Catalog
            'view-products',
            'manage-products',
            'manage-categories',
            'sync-catalog',
            'manage-pricing',

            // Providers
            'manage-providers',

            // Target Selling
            'view-targets',
            'review-targets',
            'manage-target-rates',

            // Financial & Wallets
            'view-wallets',
            'manage-wallets',
            'manage-deposits',
            'manage-withdrawals',
            'manage-payment-methods',

            // Users & Agents
            'view-users',
            'manage-users',
            'manage-agents',

            // Settings & CMS
            'manage-banners',
            'manage-announcements',
            'manage-settings',
            'view-audit-logs',
            'view-api-logs',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);
        }

        // Roles
        $adminRole = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
        $adminRole->syncPermissions(Permission::all());

        $agentRole = Role::firstOrCreate(['name' => 'agent', 'guard_name' => 'web']);
        $agentRole->syncPermissions(['view-dashboard']);

        $customerRole = Role::firstOrCreate(['name' => 'customer', 'guard_name' => 'web']);
        $apiClientRole = Role::firstOrCreate(['name' => 'api_client', 'guard_name' => 'web']);
    }
}
