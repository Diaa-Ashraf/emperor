<?php

namespace Database\Seeders;

use App\Models\PaymentMethod;
use Illuminate\Database\Seeder;

class PaymentMethodSeeder extends Seeder
{
    public function run(): void
    {
        $methods = [
            [
                'name' => 'فودافون كاش / محافظ إلكترونية (Vodafone Cash)',
                'code' => 'vodafone_cash',
                'type' => 'manual',
                'currency' => 'EGP',
                'min_amount' => 50.00,
                'max_amount' => 30000.00,
                'fixed_fee' => 0.00,
                'percent_fee' => 0.00,
                'account_details' => ['wallet_number' => '01000000000', 'account_name' => 'Emperor Cash'],
                'instructions' => [
                    'ar' => 'قم بتحويل المبلغ المطلوب إلى رقم فودافون كاش الموضح، ثم ارفع صورة الإيصال أو أدخل رقم المحفظة المحول منها.',
                    'en' => 'Transfer the amount to the Vodafone Cash wallet number and attach the payment screenshot.',
                ],
                'is_active' => true,
                'allow_deposit' => true,
                'allow_withdrawal' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'انستاباي (InstaPay Egypt)',
                'code' => 'instapay',
                'type' => 'manual',
                'currency' => 'EGP',
                'min_amount' => 50.00,
                'max_amount' => 50000.00,
                'fixed_fee' => 0.00,
                'percent_fee' => 0.00,
                'account_details' => ['ipa_handle' => 'emperor@instapay', 'account_name' => 'Emperor Store'],
                'instructions' => [
                    'ar' => 'قم بالتحويل عبر تطبيق انستاباي إلى العنوان المعرف أو رقم الحساب، ثم ارفع إيصال التحويل.',
                    'en' => 'Transfer via InstaPay to the handle/account and upload receipt.',
                ],
                'is_active' => true,
                'allow_deposit' => true,
                'allow_withdrawal' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'USDT (TRC20 / Binance Pay)',
                'code' => 'usdt_crypto',
                'type' => 'manual',
                'currency' => 'USD',
                'min_amount' => 10.00,
                'max_amount' => 10000.00,
                'fixed_fee' => 1.00,
                'percent_fee' => 0.00,
                'account_details' => ['trc20_address' => 'TYDzsYbm76DDF4nZp3eM1eF78Bxxxxxxxx', 'binance_pay_id' => '123456789'],
                'instructions' => [
                    'ar' => 'قم بتحويل عملة USDT عبر شبكة TRC20 أو Binance Pay وأدخل رقم المعاملة TXID مع صورة التحويل.',
                    'en' => 'Transfer USDT via TRC20 or Binance Pay and provide the TXID and screenshot.',
                ],
                'is_active' => true,
                'allow_deposit' => true,
                'allow_withdrawal' => true,
                'sort_order' => 3,
            ],
        ];

        foreach ($methods as $method) {
            PaymentMethod::updateOrCreate(['code' => $method['code']], $method);
        }
    }
}
