/**
 * Helper to get localized currency symbols and labels across the app.
 */

export const CURRENCY_SYMBOLS = {
    EGP: { ar: 'ج.م', en: 'EGP', symbol: 'EGP' },
    EGY: { ar: 'ج.م', en: 'EGP', symbol: 'EGP' },
    SAR: { ar: 'ر.س', en: 'SAR', symbol: 'SAR' },
    AED: { ar: 'د.إ', en: 'AED', symbol: 'AED' },
    USD: { ar: '$', en: '$', symbol: '$' },
    USDT: { ar: 'USDT', en: 'USDT', symbol: 'USDT' },
    EUR: { ar: '€', en: 'EUR', symbol: '€' },
    YER: { ar: 'ر.ي', en: 'YER', symbol: 'YER' },
    SYP: { ar: 'ل.س', en: 'SYP', symbol: 'SYP' },
    JOD: { ar: 'د.أ', en: 'JOD', symbol: 'JOD' },
    KWD: { ar: 'د.ك', en: 'KWD', symbol: 'KWD' },
    QAR: { ar: 'ر.ق', en: 'QAR', symbol: 'QAR' },
    OMR: { ar: 'ر.ع', en: 'OMR', symbol: 'OMR' },
    BHD: { ar: 'د.ب', en: 'BHD', symbol: 'BHD' },
    IQD: { ar: 'د.ع', en: 'IQD', symbol: 'IQD' },
    TRY: { ar: '₺', en: 'TRY', symbol: 'TRY' },
    MAD: { ar: 'د.م.', en: 'MAD', symbol: 'MAD' },
    DZD: { ar: 'د.ج', en: 'DZD', symbol: 'DZD' },
    LYD: { ar: 'د.ل', en: 'LYD', symbol: 'LYD' },
};

/**
 * Returns localized label/symbol for a given currency code.
 * @param {string} currencyCode - e.g. 'SAR', 'EGP', 'USD'
 * @param {string} language - 'ar' or 'en'
 */
export function getCurrencyLabel(currencyCode = 'EGP', language = 'ar') {
    if (!currencyCode) return language === 'en' ? 'EGP' : 'ج.م';
    const code = currencyCode.toUpperCase();
    const item = CURRENCY_SYMBOLS[code];
    if (item) {
        return item[language] || item.ar || code;
    }
    return code;
}

/**
 * Helper to format currency numbers with localized digits and symbols.
 */
export function formatCurrency(amount, currency = 'EGP', language = 'ar') {
    const num = Number(amount) || 0;
    const formatted = num.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    });
    return `${formatted} ${getCurrencyLabel(currency, language)}`;
}

export default formatCurrency;
