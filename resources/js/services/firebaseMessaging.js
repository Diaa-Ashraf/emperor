import { initializeApp, getApps, getApp } from 'firebase/app';
import { getMessaging, getToken, onMessage, isSupported } from 'firebase/messaging';
import { profileApi } from '../api/endpoints';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyFakeKeyForLocalTesting12345678',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'emperor-saas.firebaseapp.com',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'emperor-saas',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'emperor-saas.appspot.com',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456789012',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:123456789012:web:abcdef123456',
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

/**
 * Request notification permission and register FCM device token with backend.
 */
export async function requestNotificationPermission() {
    try {
        if (!('Notification' in window)) {
            console.warn('This browser does not support desktop push notifications');
            return null;
        }

        const supported = await isSupported();
        if (!supported) {
            console.warn('Firebase Cloud Messaging is not supported in this browser environment');
            return null;
        }

        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            const messaging = getMessaging(app);
            const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY;

            const currentToken = await getToken(messaging, {
                vapidKey: vapidKey || undefined,
            });

            if (currentToken) {
                // Sync token to Emperor backend
                await profileApi.updateFcmToken(currentToken);
                localStorage.setItem('emperor_fcm_token', currentToken);
                return currentToken;
            } else {
                console.warn('No registration token available. Request permission to generate one.');
                return null;
            }
        } else {
            console.log('Push notification permission denied by user');
            return null;
        }
    } catch (err) {
        console.error('An error occurred while retrieving FCM token:', err);
        return null;
    }
}

/**
 * Listen for incoming push notifications while application is in foreground.
 */
export async function onForegroundMessage(callback) {
    try {
        const supported = await isSupported();
        if (!supported) return null;

        const messaging = getMessaging(app);
        return onMessage(messaging, (payload) => {
            if (callback) callback(payload);
        });
    } catch (err) {
        console.error('Error attaching foreground message listener:', err);
        return null;
    }
}

export default {
    requestNotificationPermission,
    onForegroundMessage,
};
