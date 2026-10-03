<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use thiagoalessio\TesseractOCR\TesseractOCR;

class OcrVerificationService
{
    /**
     * Scan image for verification code and points.
     *
     * @param string $relativeImagePath Path relative to public storage (e.g. target_proofs/abc.png)
     * @param string $verificationCode e.g. EMP-7K9A
     * @param int $targetPoints e.g. 50000
     * @return array
     */
    public function verifyProofImage(string $relativeImagePath, string $verificationCode, int $targetPoints): array
    {
        $fullPath = Storage::disk('public')->path($relativeImagePath);

        if (!file_exists($fullPath)) {
            return [
                'success' => false,
                'error' => 'الصورة غير موجودة على الخادم',
                'confidence' => 0,
                'code_found' => false,
                'points_matched' => false,
                'raw_text' => '',
            ];
        }

        try {
            // Run Tesseract OCR
            $ocr = new TesseractOCR($fullPath);
            
            // Check if custom tesseract path is set in config/env
            $customPath = config('services.tesseract.path', env('TESSERACT_PATH'));
            if ($customPath && file_exists($customPath)) {
                $ocr->executable($customPath);
            }

            $rawText = $ocr->run();
        } catch (\Throwable $e) {
            Log::warning('OCR execution skipped or failed: ' . $e->getMessage(), [
                'file' => $relativeImagePath,
            ]);

            return [
                'success' => false,
                'error' => 'تعذر تشغيل الفحص الآلي للصورة، سيتم التحقق يدوياً بواسطة الأدمن',
                'confidence' => 0,
                'code_found' => false,
                'points_matched' => false,
                'raw_text' => '',
            ];
        }

        if (empty($rawText)) {
            return [
                'success' => false,
                'error' => 'لم يتم استخراج أي نص من الصورة',
                'confidence' => 0,
                'code_found' => false,
                'points_matched' => false,
                'raw_text' => '',
            ];
        }

        // Clean strings for comparison
        $cleanText = strtoupper(preg_replace('/[^A-Za-z0-9]/', '', $rawText));
        $cleanCode = strtoupper(preg_replace('/[^A-Za-z0-9]/', '', $verificationCode));

        $codeFound = false;
        if (!empty($cleanCode) && str_contains($cleanText, $cleanCode)) {
            $codeFound = true;
        }

        // Points check
        $pointsMatched = false;
        $pointsStr = (string) $targetPoints;
        if (str_contains($cleanText, $pointsStr)) {
            $pointsMatched = true;
        }

        // Calculate confidence
        $confidence = 0.0;
        if ($codeFound && $pointsMatched) {
            $confidence = 98.0;
        } elseif ($codeFound) {
            $confidence = 85.0;
        } elseif ($pointsMatched) {
            $confidence = 40.0;
        }

        $isVerified = ($codeFound && $pointsMatched) || ($codeFound && $confidence >= 80.0);

        return [
            'success' => $isVerified,
            'code_found' => $codeFound,
            'points_matched' => $pointsMatched,
            'confidence' => $confidence,
            'raw_text' => mb_substr($rawText, 0, 1000),
        ];
    }
}
