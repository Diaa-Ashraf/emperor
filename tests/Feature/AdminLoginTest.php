<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\AdminUserSeeder;
use Database\Seeders\RolesAndPermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminLoginTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_login_via_web_and_access_admin_dashboard(): void
    {
        $this->seed(RolesAndPermissionsSeeder::class);
        $this->seed(AdminUserSeeder::class);

        $response = $this->post('/login', [
            'email' => 'admin@emperor.com',
            'password' => 'Admin@123456',
        ]);

        $this->assertAuthenticated();

        $response->assertRedirect('/dashboard');

        // Follow redirect to /dashboard which redirects to admin.dashboard
        $dashResponse = $this->get('/dashboard');
        $dashResponse->assertRedirect(route('admin.dashboard'));

        // Access admin dashboard
        $adminResponse = $this->get(route('admin.dashboard'));
        $adminResponse->assertStatus(200);
    }
}
