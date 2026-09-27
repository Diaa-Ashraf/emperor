<?php

namespace Tests\Feature;

use App\Enums\UserRole;
use App\Enums\WalletTxType;
use App\Models\DepositRequest;
use App\Models\PaymentMethod;
use App\Models\Setting;
use App\Models\SupportContact;
use App\Models\User;
use App\Models\Wallet;
use App\Services\DepositService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class Phase5ReferralAndSupportTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;
    protected User $referrer;
    protected User $friend;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::factory()->create([
            'email' => 'admin@emperor.com',
            'role' => UserRole::ADMIN,
        ]);

        $this->referrer = User::factory()->create([
            'name' => 'المسوق أحمد',
            'email' => 'referrer@emperor.com',
            'role' => UserRole::CUSTOMER,
            'currency' => 'EGP',
            'referral_code' => 'AHMED777',
        ]);
        Wallet::create([
            'user_id' => $this->referrer->id,
            'balance' => 100.00,
            'currency' => 'EGP',
        ]);

        $this->friend = User::factory()->create([
            'name' => 'الصديق محمود',
            'email' => 'friend@emperor.com',
            'role' => UserRole::CUSTOMER,
            'currency' => 'EGP',
            'referrer_id' => $this->referrer->id,
        ]);
        Wallet::create([
            'user_id' => $this->friend->id,
            'balance' => 0.00,
            'currency' => 'EGP',
        ]);

        Setting::set('referral_is_active', true);
        Setting::set('referral_percentage', 5.0);
        Setting::set('referral_trigger', 'deposit');
    }

    public function test_public_can_fetch_support_contacts(): void
    {
        SupportContact::create([
            'name' => 'واتساب خدمة العملاء',
            'channel' => 'whatsapp',
            'value' => '+201011223344',
            'is_active' => true,
            'sort_order' => 1,
        ]);

        $response = $this->getJson('/api/v1/support-contacts');

        $response->assertOk()
            ->assertJsonPath('status', 'success')
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.name', 'واتساب خدمة العملاء')
            ->assertJsonPath('data.0.channel', 'whatsapp');
    }

    public function test_customer_can_fetch_referral_stats_and_invited_users(): void
    {
        $token = $this->referrer->createToken('test')->plainTextToken;

        $response = $this->withHeader('Authorization', "Bearer {$token}")
            ->getJson('/api/v1/referrals/stats');

        $response->assertOk()
            ->assertJsonPath('status', 'success')
            ->assertJsonPath('data.referral_code', 'AHMED777')
            ->assertJsonPath('data.total_invited', 1);

        $invitedResponse = $this->withHeader('Authorization', "Bearer {$token}")
            ->getJson('/api/v1/referrals/invited-users');

        $invitedResponse->assertOk()
            ->assertJsonPath('status', 'success')
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.name', 'الصديق محمود');
    }

    public function test_deposit_approval_automatically_rewards_referrer(): void
    {
        $method = PaymentMethod::firstOrCreate(
            ['code' => 'instapay_eg'],
            [
                'name' => 'InstaPay',
                'type' => 'manual',
                'currency' => 'EGP',
                'min_amount' => 50,
                'max_amount' => 50000,
                'is_active' => true,
                'allow_deposit' => true,
            ]
        );

        $deposit = DepositRequest::create([
            'user_id' => $this->friend->id,
            'payment_method_id' => $method->id,
            'amount' => 1000.00,
            'fee' => 0.00,
            'final_amount' => 1000.00,
            'currency' => 'EGP',
            'status' => 'pending',
        ]);

        // Admin approves deposit
        $depositService = app(DepositService::class);
        $depositService->approve($deposit, $this->admin, 'تم التحقق من التحويل البنكي');

        // Check friend wallet credited with 1000 EGP
        $this->assertEquals(1000.00, (float) $this->friend->wallet->fresh()->balance);

        // Check referrer wallet credited with 5% (50 EGP) -> initial 100 + 50 = 150 EGP
        $this->assertEquals(150.00, (float) $this->referrer->wallet->fresh()->balance);

        $this->assertDatabaseHas('referral_commissions', [
            'referrer_id' => $this->referrer->id,
            'referred_user_id' => $this->friend->id,
            'source_type' => 'deposit',
            'source_id' => $deposit->id,
            'amount' => 50.00,
            'percentage' => 5.00,
            'status' => 'paid',
        ]);

        $this->assertDatabaseHas('wallet_transactions', [
            'wallet_id' => $this->referrer->wallet->id,
            'type' => WalletTxType::REFERRAL_COMMISSION->value,
            'amount' => 50.00,
        ]);

        $this->assertDatabaseHas('notifications', [
            'notifiable_id' => $this->referrer->id,
            'type' => 'referral_earned',
        ]);
    }

    public function test_customer_can_read_and_update_preferences(): void
    {
        $token = $this->referrer->createToken('test')->plainTextToken;

        // Read preferences
        $getResponse = $this->withHeader('Authorization', "Bearer {$token}")
            ->getJson('/api/v1/settings/user');

        $getResponse->assertOk()
            ->assertJsonPath('status', 'success')
            ->assertJsonPath('data.preferences.theme', 'dark');

        // Update preferences
        $putResponse = $this->withHeader('Authorization', "Bearer {$token}")
            ->putJson('/api/v1/settings/user', [
                'theme' => 'light',
                'locale' => 'en',
                'push_notifications' => false,
            ]);

        $putResponse->assertOk()
            ->assertJsonPath('status', 'success')
            ->assertJsonPath('data.theme', 'light')
            ->assertJsonPath('data.locale', 'en')
            ->assertJsonPath('data.push_notifications', false);

        $this->assertEquals('light', $this->referrer->fresh()->preferences['theme']);
    }

    public function test_admin_can_access_phase5_dashboard_pages(): void
    {
        // Referrals index & settings
        $this->actingAs($this->admin)->get('/admin/referrals')->assertOk();
        $this->actingAs($this->admin)->get('/admin/referrals/settings')->assertOk();

        $updateRefRes = $this->actingAs($this->admin)->post('/admin/referrals/settings', [
            'referral_is_active' => 1,
            'referral_percentage' => 3.5,
            'referral_trigger' => 'both',
        ]);
        $updateRefRes->assertRedirect();
        $this->assertEquals(3.5, (float) Setting::get('referral_percentage'));

        // Support contacts CRUD
        $this->actingAs($this->admin)->get('/admin/support-contacts')->assertOk();
        $createRes = $this->actingAs($this->admin)->post('/admin/support-contacts', [
            'name' => 'تليجرام الموزعين',
            'channel' => 'telegram',
            'value' => '@EmperorVIP',
            'is_active' => 1,
            'sort_order' => 5,
        ]);
        $createRes->assertRedirect('/admin/support-contacts');
        $this->assertDatabaseHas('support_contacts', ['value' => '@EmperorVIP']);

        // Activity Logs
        $this->actingAs($this->admin)->get('/admin/audit-logs')->assertOk();
    }
}
