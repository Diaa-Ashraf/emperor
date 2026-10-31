/**
 * Helper to format currency numbers with localized digits and symbols.
 */
export function formatCurrency(amount, currency = 'EGP') {
    const num = Number(amount) || 0;
    const formatted = num.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    });
    return `${formatted} ${currency}`;
}

export default formatCurrency;

