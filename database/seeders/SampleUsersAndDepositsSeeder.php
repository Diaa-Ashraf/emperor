<?php

namespace Database\Seeders;

use App\Enums\DepositStatus;
use App\Enums\UserRole;
use App\Enums\UserStatus;
use App\Enums\WalletTxType;
use App\Models\DepositRequest;
use App\Models\PaymentMethod;
use App\Models\User;
use App\Services\WalletService;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class SampleUsersAndDepositsSeeder extends Seeder
{
    public function run(): void
    {
        $walletService = app(WalletService::class);
        $vodaCash = PaymentMethod::where('code', 'vodafone_cash')->first();
        $instaPay = PaymentMethod::where('code', 'instapay')->first();
        $usdt = PaymentMethod::where('code', 'usdt_crypto')->first();
        $admin = User::where('role', UserRole::ADMIN)->first();

        // 1. Create Sample Customer User
        $customer = User::firstOrCreate(
            ['email' => 'customer@emperor.com'],
            [
                'name' => 'أحمد محمد (لاعب PUBG)',
                'phone' => '+201012345678',
                'password' => Hash::make('12345678'),
                'role' => UserRole::CUSTOMER,
                'status' => UserStatus::ACTIVE,
                'currency' => 'EGP',
                'api_key' => Str::random(32),
                'email_verified_at' => now(),
                'phone_verified_at' => now(),
            ]
        );
        $customer->assignRole('customer');
        $walletService->getOrCreateWallet($customer, 'EGP');

        // Credit some initial funds
        $walletService->credit(
            user: $customer,
            amount: 1250.00,
            type: WalletTxType::DEPOSIT,
            description: 'شحن رصيد أولي عبر انستاباي',
            currency: 'EGP'
        );

        // 2. Create Sample Agent / Reseller User
        $agent = User::firstOrCreate(
            ['email' => 'agent@emperor.com'],
            [
                'name' => 'متجر الصقر للخدمات الرقمية (وكيل)',
                'phone' => '+201198765432',
                'password' => Hash::make('12345678'),
                'role' => UserRole::AGENT,
                'status' => UserStatus::ACTIVE,
                'currency' => 'EGP',
                'api_key' => Str::random(32),
                'email_verified_at' => now(),
                'phone_verified_at' => now(),
            ]
        );
        $agent->assignRole('agent');
        $walletService->getOrCreateWallet($agent, 'EGP');
        $walletService->credit(
            user: $agent,
            amount: 15000.00,
            type: WalletTxType::DEPOSIT,
            description: 'إيداع بنكي للموزعين',
            currency: 'EGP'
        );

        // 3. Create Sample Deposit Requests (Pending, Approved, Rejected)
        if ($vodaCash) {
            DepositRequest::firstOrCreate(
                ['transaction_reference' => 'TX-VF-9812401'],
                [
                    'user_id' => $customer->id,
                    'payment_method_id' => $vodaCash->id,
                    'amount' => 500.00,
                    'fee' => 0.00,
                    'final_amount' => 500.00,
                    'currency' => 'EGP',
                    'sender_account' => '01099887766',
                    'transaction_reference' => 'TX-VF-9812401',
                    'status' => DepositStatus::PENDING,
                ]
            );
        }

        if ($instaPay) {
            DepositRequest::firstOrCreate(
                ['transaction_reference' => 'IPA-20260921-5541'],
                [
                    'user_id' => $agent->id,
                    'payment_method_id' => $instaPay->id,
                    'amount' => 3000.00,
                    'fee' => 0.00,
                    'final_amount' => 3000.00,
                    'currency' => 'EGP',
                    'sender_account' => 'saqr_store@instapay',
                    'transaction_reference' => 'IPA-20260921-5541',
                    'status' => DepositStatus::PENDING,
                ]
            );

            DepositRequest::firstOrCreate(
                ['transaction_reference' => 'IPA-20260920-1122'],
                [
                    'user_id' => $customer->id,
                    'payment_method_id' => $instaPay->id,
                    'amount' => 1250.00,
                    'fee' => 0.00,
                    'final_amount' => 1250.00,
                    'currency' => 'EGP',
                    'sender_account' => 'ahmed@instapay',
                    'transaction_reference' => 'IPA-20260920-1122',
                    'status' => DepositStatus::APPROVED,
                    'reviewer_id' => $admin?->id,
                    'reviewer_notes' => 'تم التأكد من استلام الحوالة',
                    'reviewed_at' => now()->subDay(),
                ]
            );
        }

        if ($usdt) {
            DepositRequest::firstOrCreate(
                ['transaction_reference' => '0x8f7d6e5c4b3a210987654321fedcba0987654321'],
                [
                    'user_id' => $customer->id,
                    'payment_method_id' => $usdt->id,
                    'amount' => 100.00,
                    'fee' => 1.00,
                    'final_amount' => 99.00,
                    'currency' => 'USD',
                    'sender_account' => 'TX9yZ1...trc20',
                    'transaction_reference' => '0x8f7d6e5c4b3a210987654321fedcba0987654321',
                    'status' => DepositStatus::REJECTED,
                    'reviewer_id' => $admin?->id,
                    'reviewer_notes' => 'رقم المعاملة TXID غير موجود على شبكة ترون.',
                    'reviewed_at' => now()->subHours(5),
                ]
            );
        }
    }
}
