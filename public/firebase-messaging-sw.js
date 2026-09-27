/* eslint-disable no-undef */
// Scripts for firebase and firebase messaging in Service Worker
importScripts('https://www.gstatic.com/firebasejs/10.9.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.9.0/firebase-messaging-compat.js');

// Initialize Firebase in Service Worker
firebase.initializeApp({
    apiKey: 'AIzaSyFakeKeyForLocalTesting12345678',
    authDomain: 'emperor-saas.firebaseapp.com',
    projectId: 'emperor-saas',
    storageBucket: 'emperor-saas.appspot.com',
    messagingSenderId: '123456789012',
    appId: '1:123456789012:web:abcdef123456',
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background push message:', payload);

    const notificationTitle = payload.notification?.title || payload.data?.title || 'إشعار جديد من إمبراطور 👑';
    const notificationOptions = {
        body: payload.notification?.body || payload.data?.body || 'لديك تحديث جديد في حسابك',
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        image: payload.notification?.image || payload.data?.image,
        data: {
            link: payload.data?.link || payload.notification?.click_action || '/notifications',
        },
        dir: 'rtl',
        lang: 'ar',
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click event to focus or open relevant page
self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    const targetUrl = event.notification.data?.link || '/notifications';

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
            for (let i = 0; i < clientList.length; i++) {
                const client = clientList[i];
                if (client.url.includes(self.location.origin) && 'focus' in client) {
                    client.navigate(targetUrl);
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(targetUrl);
            }
        })
    );
});
