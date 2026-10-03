<?php

namespace App\Enums;

enum TargetVerificationMethod: string
{
    case MANUAL = 'manual';
    case OCR = 'ocr';
    case TRUST_LEVEL = 'trust_level';

    public function label(): string
    {
        return match ($this) {
            self::MANUAL => 'مراجعة يدوية',
            self::OCR => 'تحقق ذكي بالصورة (OCR)',
            self::TRUST_LEVEL => 'تحقق فوري بمستوى الثقة (Trust Level)',
        };
    }
}
