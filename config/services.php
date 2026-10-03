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
        'redirect' => env('GOOGLE_REDIRECT_URI', 'http://localhost:8000/api/v1/auth/google/callback'),
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

];
