/**
 * Helper to get dynamic site settings injected from the server / dashboard
 */

export function getSiteLogo() {
    return window.__APP_SETTINGS__?.site_logo || '/images/logo.png';
}

export function getSiteFavicon() {
    return window.__APP_SETTINGS__?.site_favicon || window.__APP_SETTINGS__?.site_logo || '/images/logo.png';
}

export function getSiteName() {
    return window.__APP_SETTINGS__?.site_name || 'إمبراطور';
}

export function getWhatsAppSupport() {
    return window.__APP_SETTINGS__?.whatsapp_support || '+201000000000';
}

export function getTelegramSupport() {
    return window.__APP_SETTINGS__?.telegram_support || 'EmperorSupport';
}
