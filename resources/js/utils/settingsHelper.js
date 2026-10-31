/**
 * Comprehensive Dynamic Settings Helper
 * Reads server-injected dynamic settings from window.__APP_SETTINGS__
 */

export function getSiteSettings() {
    return window.__APP_SETTINGS__ || {};
}

export function getSiteName() {
    return window.__APP_SETTINGS__?.site_name || 'مهره و سند كارد';
}

export function getSiteDescription() {
    return window.__APP_SETTINGS__?.site_description || 'خدماتك الرقمية والمالية في مكان واحد';
}

export function getSiteLogo() {
    return window.__APP_SETTINGS__?.site_logo || '/images/mohra_sand_logo.png';
}

export function getSiteFavicon() {
    return window.__APP_SETTINGS__?.site_favicon || window.__APP_SETTINGS__?.site_logo || '/images/mohra_sand_logo.png';
}

export function getFooterSlogan() {
    return window.__APP_SETTINGS__?.footer_slogan || 'مهره و سند كارد — خدماتك الرقمية والمالية في مكان واحد';
}

export function getHeroServices() {
    const services = window.__APP_SETTINGS__?.hero_services;
    return Array.isArray(services) && services.length > 0 ? services : null;
}

export function getWhatsAppSupport() {
    return window.__APP_SETTINGS__?.whatsapp_support || '+201026042456';
}

export function getWhatsAppChannel() {
    return window.__APP_SETTINGS__?.whatsapp_channel || 'https://whatsapp.com/channel/0029Vb7b7oQ8KMqoJcK0H81F';
}


export function getTelegramSupport() {
    return window.__APP_SETTINGS__?.telegram_support || 'EmperorSupport';
}

export function getSupportEmail() {
    return window.__APP_SETTINGS__?.support_email || 'support@emperorcard.com';
}

export function getSupportPhone() {
    return window.__APP_SETTINGS__?.support_phone || '';
}

export function getWorkingHours() {
    return window.__APP_SETTINGS__?.working_hours || 'على مدار 24 ساعة طوال أيام الأسبوع';
}

export function getSocialLinks() {
    return {
        facebook: window.__APP_SETTINGS__?.social_facebook || '',
        instagram: window.__APP_SETTINGS__?.social_instagram || '',
        tiktok: window.__APP_SETTINGS__?.social_tiktok || '',
        youtube: window.__APP_SETTINGS__?.social_youtube || '',
        telegram: window.__APP_SETTINGS__?.social_telegram || '',
        discord: window.__APP_SETTINGS__?.social_discord || '',
    };
}

export function getAnnouncement() {
    return {
        enabled: Boolean(window.__APP_SETTINGS__?.announcement_enabled),
        text: window.__APP_SETTINGS__?.announcement_text || '',
    };
}

export function getTargetAgencySettings() {
    return {
        id: window.__APP_SETTINGS__?.target_agency_id || 'SAND-MOHRA-001',
        name: window.__APP_SETTINGS__?.target_agency_name || 'وكالة سند ومهره الرسمية',
    };
}

export function getMinWalletDeposit() {
    return Number(window.__APP_SETTINGS__?.min_wallet_deposit || 50);
}

export function getCmsTexts() {
    return {
        aboutUs: window.__APP_SETTINGS__?.about_us_text || '',
        terms: window.__APP_SETTINGS__?.terms_conditions || '',
        privacy: window.__APP_SETTINGS__?.privacy_policy || '',
    };
}
