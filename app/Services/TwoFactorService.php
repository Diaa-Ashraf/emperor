<?php

namespace App\Services;

use BaconQrCode\Renderer\Image\SvgImageBackEnd;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Writer;
use Illuminate\Support\Str;
use PragmaRX\Google2FA\Google2FA;

class TwoFactorService
{
    protected Google2FA $google2fa;

    public function __construct()
    {
        $this->google2fa = new Google2FA();
    }

    /**
     * Generate a new secret key for 2FA.
     */
    public function generateSecretKey(): string
    {
        return $this->google2fa->generateSecretKey(32);
    }

    /**
     * Get OTP Auth URL for authenticator apps.
     */
    public function getOtpAuthUrl(string $company, string $holder, string $secret): string
    {
        return $this->google2fa->getQRCodeUrl($company, $holder, $secret);
    }

    /**
     * Generate inline SVG QR code for the OTP Auth URL.
     */
    public function getQrCodeSvg(string $company, string $holder, string $secret): string
    {
        $otpUrl = $this->getOtpAuthUrl($company, $holder, $secret);

        $renderer = new ImageRenderer(
            new RendererStyle(200, 2),
            new SvgImageBackEnd()
        );

        $writer = new Writer($renderer);

        return $writer->writeString($otpUrl);
    }

    /**
     * Verify a 6-digit TOTP code against a secret key.
     */
    public function verifyKey(string $secret, string $key): bool
    {
        if (empty($secret) || empty($key)) {
            return false;
        }

        // Allow 1 window before/after for time drift (30 seconds each)
        return (bool) $this->google2fa->verifyKey($secret, $key, 1);
    }

    /**
     * Generate a list of backup recovery codes.
     *
     * @return array<string>
     */
    public function generateRecoveryCodes(int $count = 8): array
    {
        $codes = [];
        for ($i = 0; $i < $count; $i++) {
            $codes[] = strtoupper(Str::random(5) . '-' . Str::random(5));
        }

        return $codes;
    }
}
