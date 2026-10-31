<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\CustomerGroup;
use App\Models\User;
use App\Models\Wallet;
use App\Models\WalletTransaction;
use App\Enums\WalletTxType;
use App\Enums\CategoryType;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class CustomerGroupSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Seed Customer Groups matching Screenshots 1 & 2
        $groups = [
            ['name' => 'VIP6', 'discount_percentage' => 2.00, 'sort_order' => 1],
            ['name' => 'VIP 10', 'discount_percentage' => 1.75, 'sort_order' => 2],
            ['name' => 'VIP 9', 'discount_percentage' => 1.50, 'sort_order' => 3],
            ['name' => 'لولو', 'discount_percentage' => 1.11, 'sort_order' => 4],
            ['name' => 'VIP8', 'discount_percentage' => 1.00, 'sort_order' => 5],
            ['name' => 'VIP 11', 'discount_percentage' => 0.50, 'sort_order' => 6],
            ['name' => 'VIP 5', 'discount_percentage' => 2.50, 'sort_order' => 7],
            ['name' => 'VIP 3', 'discount_percentage' => 3.00, 'sort_order' => 8],
            ['name' => 'VIP 1', 'discount_percentage' => 5.00, 'sort_order' => 9],
            ['name' => 'Standard', 'discount_percentage' => 0.00, 'sort_order' => 10],
        ];

        foreach ($groups as $g) {
            CustomerGroup::updateOrCreate(
                ['name' => $g['name']],
                [
                    'discount_percentage' => $g['discount_percentage'],
                    'sort_order' => $g['sort_order'],
                    'is_active' => true,
                ]
            );
        }

        // 2. Seed realistic users matching the mobile user screenshots
        $demoUsers = [
            ['name' => 'ملك الشحن', 'email' => 'alshhnmlk40@gmail.com', 'group' => 'VIP8', 'balance' => 0],
            ['name' => 'Tamer Mahmoud', 'email' => 'tamermahmoued24@gmail.com', 'group' => 'VIP 10', 'balance' => 0],
            ['name' => 'Egoo Aura', 'email' => 'auraegoo479@gmail.com', 'group' => 'VIP 5', 'balance' => 0],
            ['name' => 'محمد فولى', 'email' => 'mfwly3491@gmail.com', 'group' => 'VIP 1', 'balance' => 0],
            ['name' => 'سعيد ابوعميرة', 'email' => 'abwmyrtsyd688@gmail.com', 'group' => 'VIP 10', 'balance' => 0],
            ['name' => 'mohemad ezz', 'email' => 'mohemadezz@gmail.com', 'group' => 'VIP6', 'balance' => 150],
            ['name' => 'لولو لولو', 'email' => 'loulou@gmail.com', 'group' => 'VIP8', 'balance' => 180.69],
            ['name' => 'Engy Engy', 'email' => 'engy@gmail.com', 'group' => 'VIP8', 'balance' => 50],
            ['name' => 'Ebtesam Elromy', 'email' => 'ebtesam@gmail.com', 'group' => 'VIP8', 'balance' => 20],
            ['name' => 'ابو غزل', 'email' => 'anasnosir020@gmail.com', 'group' => 'VIP 11', 'balance' => 320],
            ['name' => 'Ahmed', 'email' => 'ahmed.gamer@gmail.com', 'group' => 'VIP 11', 'balance' => 100],
            ['name' => 'Mahmoud Sabry', 'email' => 'm.sabry@gmail.com', 'group' => 'VIP 11', 'balance' => 45],
        ];

        foreach ($demoUsers as $du) {
            $user = User::firstOrCreate(
                ['email' => $du['email']],
                [
                    'name' => $du['name'],
                    'password' => Hash::make('password123'),
                    'role' => 'customer',
                    'status' => 'active',
                    'currency' => 'EGP',
                    'email_verified_at' => now(),
                    'phone_verified_at' => now(),
                    'referral_code' => strtoupper(substr(md5($du['email']), 0, 8)),
                    'preferences' => [
                        'vip_group' => $du['group'],
                        'debt_limit' => 0,
                    ],
                ]
            );

            // Ensure wallet
            $wallet = Wallet::firstOrCreate(
                ['user_id' => $user->id, 'currency' => 'EGP'],
                ['balance' => $du['balance'], 'frozen_balance' => 0, 'is_locked' => false]
            );

            // If user has balance and 0 tx, seed a transaction
            if ($du['balance'] > 0 && WalletTransaction::where('user_id', $user->id)->count() === 0) {
                WalletTransaction::create([
                    'wallet_id' => $wallet->id,
                    'user_id' => $user->id,
                    'type' => WalletTxType::DEPOSIT,
                    'amount' => $du['balance'],
                    'balance_before' => 0,
                    'balance_after' => $du['balance'],
                    'description' => 'إيداع رصيد بالمحفظة',
                    'created_at' => now()->subHours(rand(1, 48)),
                ]);
            }
        }

        // 3. Update / Seed Categories matching Screenshot 3
        $categoriesData = [
            [
                'slug' => 'apps-recharge',
                'name' => 'قسم شحن التطبيقات',
                'type' => CategoryType::VOICE_APPS,
                'icon' => 'smartphone',
                'sort_order' => 1,
            ],
            [
                'slug' => 'games-recharge',
                'name' => 'قسم شحن الالعاب',
                'type' => CategoryType::GAMES,
                'icon' => 'gamepad-2',
                'sort_order' => 2,
            ],
            [
                'slug' => 'tv-subscriptions',
                'name' => 'قسم اشتراكات التلفاز',
                'type' => CategoryType::CARDS,
                'icon' => 'tv',
                'sort_order' => 3,
            ],
            [
                'slug' => 'financial-transfers',
                'name' => 'قسم التحويلات الماليه',
                'type' => CategoryType::CARDS,
                'icon' => 'credit-card',
                'sort_order' => 4,
            ],
        ];

        foreach ($categoriesData as $cd) {
            Category::updateOrCreate(
                ['slug' => $cd['slug']],
                [
                    'name' => $cd['name'],
                    'type' => $cd['type'],
                    'icon' => $cd['icon'],
                    'sort_order' => $cd['sort_order'],
                    'is_active' => true,
                ]
            );
        }
    }
}
