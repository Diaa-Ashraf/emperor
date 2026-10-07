import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TargetAppIconRenderer } from '../target/TargetAppIcons';
import { formatImageUrl } from '../../utils/imageHelper';
import { useTheme } from '../../contexts/ThemeContext';
import '../../../css/visualCategory.css';

export default function ProductCard({ product, onClick }) {
    if (!product) return null;

    const { theme } = useTheme();
    const isLight = theme === 'light';

    const imageSrc = formatImageUrl(product.image_url || product.image || product.banner_url || product.banner || product.icon_url || product.icon);
    const [imgError, setImgError] = useState(false);

    const productUrl = `/products/${product.id}`;

    const isApp = product.category?.type === 'voice_apps'
        || product.type === 'voice_apps'
        || product.category_slug === 'apps'
        || product.category_slug === 'voice_apps'
        || (typeof window !== 'undefined' && window.location.pathname.includes('/apps'))
        || product.parent_id !== null;

    const isStockPhoto = typeof imageSrc === 'string' && (imageSrc.includes('unsplash') || imageSrc.includes('pexels') || imageSrc.includes('random'));
    const showTargetIcon = isApp || !imageSrc || imgError || isStockPhoto;

    const cardContent = (
        <div
            className="emperor-product-poster-card"
            onClick={(e) => {
                if (onClick) {
                    e.preventDefault();
                    onClick(product);
                }
            }}
            style={{
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                cursor: 'pointer',
                width: '100%',
                userSelect: 'none',
                boxSizing: 'border-box',
            }}
        >
            {/* ── Square Luxury Poster Frame ── */}
            <div
                className="product-poster-frame"
                style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '1 / 1',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    background: isLight ? '#FFFFFF' : '#0B0B0F',
                    border: isLight
                        ? '1.5px solid rgba(212, 165, 55, 0.45)'
                        : '1.5px solid rgba(212, 165, 55, 0.35)',
                    boxShadow: isLight
                        ? '0 6px 18px rgba(0, 0, 0, 0.06)'
                        : '0 8px 24px rgba(0, 0, 0, 0.65), 0 0 15px rgba(212, 165, 55, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxSizing: 'border-box',
                }}
            >
                {showTargetIcon ? (
                    <div style={{ width: '74%', height: '74%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <TargetAppIconRenderer app={product} size={80} />
                    </div>
                ) : imageSrc && !imgError ? (
                    <img
                        src={imageSrc}
                        alt={product.name}
                        loading="lazy"
                        decoding="async"
                        onError={() => setImgError(true)}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            display: 'block',
                        }}
                    />
                ) : (
                    <div style={{ width: '74%', height: '74%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <TargetAppIconRenderer app={product} size={80} />
                    </div>
                )}
            </div>

            {/* ── App / Product Title (Strict 2-Line Clamped Height for Pixel-Perfect Uniformity) ── */}
            <span
                className="product-poster-title"
                style={{
                    marginTop: '8px',
                    fontSize: '13px',
                    fontWeight: '800',
                    color: isLight ? '#0F172A' : '#FFFFFF',
                    textAlign: 'center',
                    lineHeight: '18px',
                    height: '36px',
                    maxWidth: '100%',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    padding: '0 4px',
                    fontFamily: 'var(--font-cairo)',
                    boxSizing: 'border-box',
                }}
                title={product.name}
            >
                {product.name}
            </span>
        </div>
    );

    if (onClick) {
        return cardContent;
    }

    return (
        <Link to={productUrl} style={{ textDecoration: 'none', width: '100%', display: 'block' }}>
            {cardContent}
        </Link>
    );
}
