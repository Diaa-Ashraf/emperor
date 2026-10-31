/**
 * Helper to normalize and resolve image paths across the application.
 * Ensures consistent handling of relative storage paths, full URLs, and fallback states.
 */
export const formatImageUrl = (src) => {
    if (!src || typeof src !== 'string') return null;
    
    let trimmed = src.trim();
    if (!trimmed) return null;

    // Full URLs or data/blob URIs
    if (
        trimmed.startsWith('http://') || 
        trimmed.startsWith('https://') || 
        trimmed.startsWith('data:') || 
        trimmed.startsWith('blob:')
    ) {
        return trimmed;
    }

    // Collapse multiple consecutive slashes: e.g. /storage//images/ -> /storage/images/
    trimmed = trimmed.replace(/\/+/g, '/');

    // If it points to /images/... or /storage/images/...
    if (trimmed.includes('/images/')) {
        const idx = trimmed.indexOf('/images/');
        return trimmed.substring(idx);
    }

    // Already properly prefixed with /storage/
    if (trimmed.startsWith('/storage/')) {
        const withoutPrefix = trimmed.replace(/^\/storage\//, '');
        if (!withoutPrefix.includes('/') && !/\.(png|jpe?g|svg|webp|gif|ico|avif)$/i.test(withoutPrefix)) {
            return null;
        }
        return trimmed;
    }

    // Starts with storage/ without leading slash
    if (trimmed.startsWith('storage/')) {
        const withoutPrefix = trimmed.replace(/^storage\//, '');
        if (!withoutPrefix.includes('/') && !/\.(png|jpe?g|svg|webp|gif|ico|avif)$/i.test(withoutPrefix)) {
            return null;
        }
        return '/' + trimmed;
    }

    // Starts with a root slash but not storage (e.g. /images/...)
    if (trimmed.startsWith('/')) {
        return trimmed;
    }

    // If it's just a raw icon keyword like "gamepad-2", "credit-card", "phone", etc.
    if (!trimmed.includes('/') && !/\.(png|jpe?g|svg|webp|gif|ico|avif)$/i.test(trimmed)) {
        return null;
    }

    // Relative storage paths (e.g. "products/xyz.jpg", "categories/abc.png", "banners/...")
    return `/storage/${trimmed}`;
};

export default formatImageUrl;
