import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TargetAppIconRenderer } from '../target/TargetAppIcons';
import { formatImageUrl } from '../../utils/imageHelper';
import { useTheme } from '../../contexts/ThemeContext';
import '../../../css/visualCategory.css';

export default function ProductCard({ product }) {
    if (!product) return null;

    const { theme } = useTheme();
    const isLight = theme === 'light';

    const imageSrc = formatImageUrl(product.image_url || product.image || product.banner_url || product.banner || product.icon_url || product.icon);
    const [imgError, setImgError] = useState(false);

    const productUrl = `/products/${product.id}`;

    const isApp = product.category?.type === 'voice_apps' || product.type === 'voice_apps';
    const showTargetIcon = isApp && (!imageSrc || imgError || (typeof imageSrc === 'string' && (imageSrc.includes('unsplash') || imageSrc.includes('pexels') || imageSrc.includes('random'))));

    return (
        <Link
            to={productUrl}
            className="emperor-product-poster-card"
            style={{
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                width: '100%',
                userSelect: 'none',
            }}
        >
            {/* ── Square Luxury Poster Frame ── */}
            <div
                className="product-poster-frame"
                style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '1 / 1',
                    borderRadius: '20px',
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
                    <div style={{ width: '80%', height: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                    <div style={{ width: '80%', height: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <TargetAppIconRenderer app={product} size={80} />
                    </div>
                )}
            </div>

            {/* ── App / Product Title (Underneath) ── */}
            <span
                className="product-poster-title"
                style={{
                    marginTop: '8px',
                    fontSize: '13.5px',
                    fontWeight: '800',
                    color: isLight ? '#0F172A' : '#FFFFFF',
                    textAlign: 'center',
                    lineHeight: 1.3,
                    maxWidth: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    padding: '0 4px',
                    fontFamily: 'var(--font-cairo)',
                }}
                title={product.name}
            >
                {product.name}
            </span>
        </Link>
    );
}
