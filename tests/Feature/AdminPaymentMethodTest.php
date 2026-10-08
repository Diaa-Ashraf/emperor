<?php

namespace Tests\Feature;

use App\Models\PaymentMethod;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminPaymentMethodTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::firstOrCreate(
            ['email' => 'admin_test@emperor.com'],
            [
                'name' => 'Admin Tester',
                'password' => bcrypt('password123'),
                'role' => 'admin',
                'is_admin' => true,
                'email_verified_at' => now(),
            ]
        );
    }

    public function test_admin_can_view_payment_methods_index(): void
    {
        $response = $this->actingAs($this->admin)->get(route('admin.payment-methods.index'));
        $response->assertStatus(200);
        $response->assertSee('إدارة طرق التحويل والدفع');
        $response->assertSee('deletePaymentMethodModal');
    }

    public function test_admin_can_view_create_page(): void
    {
        $response = $this->actingAs($this->admin)->get(route('admin.payment-methods.create'));
        $response->assertStatus(200);
        $response->assertSee('إضافة وسيلة تحويل');
        $response->assertSee('preview_sub_name');
    }

    public function test_admin_can_store_custom_country_transfer(): void
    {
        $data = [
            'name' => 'تحويل كليك الأردن التجريبي',
            'sub_name' => 'CliQ الأردن تجريبي',
            'country_name' => 'تحويل الأردن',
            'country' => 'jordan_test',
            'currency' => 'JOD',
            'account_number' => 'TEST_CLIQ_ALIAS_999',
            'note' => 'تحويل فوري بدون عمولة',
            'instruction' => 'قم بإرسال المبلغ ثم رفع الإشعار فوراً.',
            'min_amount' => 10,
            'max_amount' => 1000,
            'fixed_fee' => 0,
            'percent_fee' => 0,
            'sort_order' => 1,
            'is_active' => '1',
        ];

        $response = $this->actingAs($this->admin)->post(route('admin.payment-methods.store'), $data);
        $response->assertRedirect(route('admin.payment-methods.index'));

        $this->assertDatabaseHas('payment_methods', [
            'currency' => 'JOD',
            'country' => 'jordan_test',
            'account_number' => 'TEST_CLIQ_ALIAS_999',
        ]);
    }

    public function test_deposit_api_returns_dynamic_custom_transfer(): void
    {
        $response = $this->getJson('/api/v1/deposits/methods');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'name',
                    'subName',
                    'country',
                    'country_name',
                    'currency',
                    'account_number',
                    'note',
                ],
            ],
        ]);
    }

    public function test_admin_can_toggle_active_status(): void
    {
        $method = PaymentMethod::create([
            'code' => 'toggle_test_code',
            'name' => 'Toggle Test Method',
            'sub_name' => 'Toggle',
            'country_name' => 'تحويل تجريبي',
            'country' => 'test_country',
            'currency' => 'USD',
            'account_number' => '12345',
            'min_amount' => 10,
            'is_active' => true,
        ]);

        $response = $this->actingAs($this->admin)->post(route('admin.payment-methods.toggle-active', $method->id));
        $response->assertRedirect();
        $this->assertFalse((bool) $method->fresh()->is_active);
    }

    public function test_admin_can_delete_payment_method(): void
    {
        $method = PaymentMethod::create([
            'code' => 'delete_test_code',
            'name' => 'Delete Test Method',
            'sub_name' => 'Delete',
            'country_name' => 'تحويل حذف',
            'country' => 'del_country',
            'currency' => 'USD',
            'account_number' => '54321',
            'min_amount' => 10,
            'is_active' => true,
        ]);

        $response = $this->actingAs($this->admin)->delete(route('admin.payment-methods.destroy', $method->id));
        $response->assertRedirect(route('admin.payment-methods.index'));
        $this->assertDatabaseMissing('payment_methods', [
            'id' => $method->id,
        ]);
    }
}
