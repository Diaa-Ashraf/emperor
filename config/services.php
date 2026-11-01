<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'resend' => [
        'key' => env('RESEND_KEY'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    'google' => [
        'client_id' => env('GOOGLE_CLIENT_ID'),
        'client_secret' => env('GOOGLE_CLIENT_SECRET'),
        'redirect' => env('GOOGLE_REDIRECT_URI', 'http://localhost:8000/auth/google/callback'),
    ],

    'firebase' => [
        'project_id' => env('FIREBASE_PROJECT_ID', 'emperor-saas'),
        'server_key' => env('FIREBASE_SERVER_KEY'),
        'credentials_file' => env('FIREBASE_CREDENTIALS'),
    ],

    'whatsapp' => [
        'provider' => env('WHATSAPP_PROVIDER', 'meta'),
        'api_token' => env('WHATSAPP_API_TOKEN'),
        'phone_number_id' => env('WHATSAPP_PHONE_NUMBER_ID'),
        'instance_id' => env('WHATSAPP_INSTANCE_ID'),
        'custom_endpoint' => env('WHATSAPP_CUSTOM_ENDPOINT'),
    ],

    'ka_cards' => [
        'api_url' => env('KA_CARDS_API_URL', 'https://ka-cards.com/client/api'),
        'api_token' => env('KA_CARDS_API_TOKEN'),
        'timeout' => env('KA_CARDS_TIMEOUT', 30),
    ],

    'embrator' => [
        'base_url' => env('EMBRATOR_API_BASE_URL', 'https://embrator.store/api/v1/reseller'),
        'api_key' => env('EMBRATOR_API_KEY', '8a36b758817f8708502c4e16cd3a4b5f9650133a1968961a68b08f6e4544ed8f'),
    ],

    'ad_card' => [
        'base_url' => env('AD_CARD_API_BASE_URL', 'https://ad-card.com/client/api'),
        'api_token' => env('AD_CARD_API_TOKEN'),
        'timeout' => env('AD_CARD_API_TIMEOUT', 25),
    ],

];
