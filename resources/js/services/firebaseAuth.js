import { initializeApp, getApps } from 'firebase/app';
import {
    getAuth,
    RecaptchaVerifier,
    signInWithPhoneNumber,
} from 'firebase/auth';

// Firebase configuration from environment or fallback
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyEmperorDemoFallbackKey123456789',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'emperor-saas.firebaseapp.com',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'emperor-saas',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'emperor-saas.appspot.com',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '100000000000',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:100000000000:web:abcdef123456',
};

// Initialize Firebase once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

// Language set to Arabic
auth.languageCode = 'ar';

/**
 * Setup Invisible reCAPTCHA verifier for phone auth
 */
export function setupRecaptcha(containerId = 'recaptcha-container') {
    if (window.recaptchaVerifier) {
        try {
            window.recaptchaVerifier.clear();
        } catch (e) {}
    }

    window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
        size: 'invisible',
        callback: () => {
            // reCAPTCHA solved, will proceed with submit...
        },
        'expired-callback': () => {
            console.warn('reCAPTCHA expired, please retry');
        },
    });

    return window.recaptchaVerifier;
}

/**
 * Send OTP to phone number
 * @param {string} phoneNumber E.164 formatted (+2010xxxxxxxx)
 * @param {string} containerId
 */
export async function sendPhoneOtp(phoneNumber, containerId = 'recaptcha-container') {
    try {
        const appVerifier = setupRecaptcha(containerId);
        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
        return {
            success: true,
            confirmationResult,
        };
    } catch (error) {
        console.error('Firebase sendPhoneOtp error:', error);
        return {
            success: false,
            error: parseFirebaseError(error),
            rawError: error,
        };
    }
}

/**
 * Verify OTP Code with confirmation result
 * @param {object} confirmationResult
 * @param {string} code 6-digit code
 */
export async function verifyPhoneOtp(confirmationResult, code) {
    try {
        const result = await confirmationResult.confirm(code);
        const idToken = await result.user.getIdToken();
        return {
            success: true,
            user: result.user,
            idToken,
        };
    } catch (error) {
        console.error('Firebase verifyPhoneOtp error:', error);
        return {
            success: false,
            error: parseFirebaseError(error),
            rawError: error,
        };
    }
}

/**
 * Parse Firebase error codes to Arabic friendly messages
 */
export function parseFirebaseError(error) {
    const code = error?.code || '';

    switch (code) {
        case 'auth/invalid-phone-number':
            return 'صيغة رقم الهاتف غير صالحة. يرجى إدخال الرقم مع كود الدولة الصحيح.';
        case 'auth/missing-phone-number':
            return 'يرجى إدخال رقم الهاتف.';
        case 'auth/quota-exceeded':
            return 'تم تجاوز الحد الأقصى لإرسال الرسائل، يرجى المحاولة لاحقاً.';
        case 'auth/too-many-requests':
            return 'محاولات كثيرة متكررة، يرجى الانتظار بضع دقائق ثم المحاولة مجدداً.';
        case 'auth/invalid-verification-code':
            return 'رمز التحقق (OTP) غير صحيح، يرجى التأكد وإعادة المحاولة.';
        case 'auth/code-expired':
            return 'انتهت صلاحية رمز التحقق، يرجى طلب رمز جديد.';
        case 'auth/captcha-check-failed':
            return 'فشل التحقق الأمني (reCAPTCHA)، يرجى تحديث الصفحة والمحاولة مرة أخرى.';
        default:
            return error?.message || 'حدث خطأ أثناء إرسال رمز التحقق، يرجى المحاولة لاحقاً.';
    }
}

export { app, auth };
