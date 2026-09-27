<?php

return [
    'name' => env('APP_NAME', 'Emperor'),
    
    // Supported Currencies
    'currencies' => [
        'default' => env('EMPEROR_DEFAULT_CURRENCY', 'EGP'),
        'supported' => ['EGP', 'USD', 'SAR', 'SYP'],
        'symbols' => [
            'EGP' => 'ج.م',
            'USD' => '$',
            'SAR' => 'ر.س',
            'SYP' => 'ل.س',
        ],
    ],

    // Target Selling Configuration
    'target_selling' => [
        'agency_id' => env('TARGET_AGENCY_ID', 'EMP-TARGET-001'),
        'agency_name' => env('TARGET_AGENCY_NAME', 'Emperor Agency'),
        'min_payout' => env('TARGET_MIN_PAYOUT', 100), // in EGP
        'auto_approve_limit' => env('TARGET_AUTO_APPROVE_LIMIT', 500),
    ],

    // Wallet & Security Limits
    'wallet' => [
        'min_deposit' => env('WALLET_MIN_DEPOSIT', 50),
        'max_deposit' => env('WALLET_MAX_DEPOSIT', 50000),
        'transfer_min' => env('WALLET_TRANSFER_MIN', 10),
        'transfer_max_daily' => env('WALLET_TRANSFER_MAX_DAILY', 10000),
    ],

    // WhatsApp Floating Support Number
    'support' => [
        'whatsapp' => env('WHATSAPP_SUPPORT_NUMBER', '+201000000000'),
        'telegram' => env('TELEGRAM_SUPPORT_USERNAME', 'EmperorSupport'),
    ],

    // Catalog & Sync
    'catalog' => [
        'auto_sync_interval_hours' => 6,
        'default_profit_margin_percent' => 5.0,
    ],
];
