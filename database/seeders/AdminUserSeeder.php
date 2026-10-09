<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Enums\UserStatus;
use App\Models\User;
use App\Models\Wallet;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        // Ensure Spatie role exists
        app()[PermissionRegistrar::class]->forgetCachedPermissions();
        $adminRole = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);

        // Update or create the main Admin user
        $admin = User::updateOrCreate(
            ['email' => 'admin@emperor.com'],
            [
                'name' => 'Emperor Admin',
                'phone' => '+201000000000',
                'password' => Hash::make('Admin@123456'),
                'role' => UserRole::ADMIN,
                'status' => UserStatus::ACTIVE,
                'currency' => 'EGP',
                'api_key' => Str::random(32),
                'email_verified_at' => now(),
                'phone_verified_at' => now(),
            ]
        );

        // Sync Spatie role
        $admin->syncRoles([$adminRole]);

        // Create or update Admin Wallet
        Wallet::updateOrCreate(
            ['user_id' => $admin->id, 'currency' => 'EGP'],
            [
                'balance' => 0.0000,
                'frozen_balance' => 0.0000,
                'is_locked' => false,
            ]
        );

        $this->command->info("Admin user created/updated successfully:");
        $this->command->info("Email: admin@emperor.com");
        $this->command->info("Password: Admin@123456");
        $this->command->info("Role: " . $admin->role->value);
    }
}
