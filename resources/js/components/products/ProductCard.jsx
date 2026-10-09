import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Crown } from 'lucide-react';
import { TargetAppIconRenderer } from '../target/TargetAppIcons';
import { formatImageUrl } from '../../utils/imageHelper';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import '../../../css/visualCategory.css';

export default function ProductCard({ product, onClick }) {
    if (!product) return null;

    const { theme } = useTheme();
    const { isRtl } = useLanguage();
    const isLight = theme === 'light';

    const imageSrc = formatImageUrl(product.image_url || product.image || product.banner_url || product.banner || product.icon_url || product.icon);
    const [imgError, setImgError] = useState(false);

    const productUrl = `/products/${product.id}`;

    const isStockPhoto = typeof imageSrc === 'string' && (imageSrc.includes('unsplash') || imageSrc.includes('pexels') || imageSrc.includes('random'));
    const hasCustomImage = imageSrc && !imgError && !isStockPhoto;

    // Clean title for KA-CARD style single-line clarity (e.g. "بولا (Pola Live)" -> "بولا")
    const cleanTitle = (() => {
        const raw = product.name || '';
        const match = raw.match(/^([^(]+)\s*\([^)]*\)$/);
        if (match && match[1]?.trim()) {
            return match[1].trim();
        }
        return raw;
    })();

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
            {/* ── Square Luxury Poster Frame (KA-CARD Match) ── */}
            <div
                className="product-poster-frame"
                style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '1 / 1',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: isLight
                        ? 'linear-gradient(145deg, #FFFFFF 0%, #F8FAFC 100%)'
                        : 'linear-gradient(145deg, #161622 0%, #101018 60%, #0A0A0E 100%)',
                    border: isLight
                        ? '1.2px solid rgba(212, 165, 55, 0.4)'
                        : '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: isLight
                        ? '0 3px 12px rgba(212, 165, 55, 0.12)'
                        : 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 8px 24px rgba(0, 0, 0, 0.65)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxSizing: 'border-box',
                }}
            >
                {/* ── Top-Corner Emperor Luxury Emblem Badge (KA-CARD Match) ── */}
                <div
                    className="emperor-card-corner-badge"
                    style={{
                        position: 'absolute',
                        top: '7px',
                        left: isRtl ? 'auto' : '7px',
                        right: isRtl ? '7px' : 'auto',
                        zIndex: 10,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px',
                        padding: '2px 6px',
                        borderRadius: '6px',
                        background: 'linear-gradient(135deg, rgba(245, 208, 97, 0.3) 0%, rgba(212, 165, 55, 0.12) 100%)',
                        border: '1px solid rgba(212, 165, 55, 0.55)',
                        backdropFilter: 'blur(6px)',
                        WebkitBackdropFilter: 'blur(6px)',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
                        pointerEvents: 'none',
                    }}
                >
                    <Crown size={10} color="#F5D061" />
                    <span style={{
                        fontSize: '8px',
                        fontWeight: '900',
                        color: '#F5D061',
                        letterSpacing: '0.4px',
                        fontFamily: 'monospace',
                    }}>
                        EMPEROR
                    </span>
                </div>

                {/* ── Edge-to-Edge Artwork (Full 100% Fill) ── */}
                {hasCustomImage ? (
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
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <TargetAppIconRenderer app={product} size="100%" />
                    </div>
                )}
            </div>

            {/* ── App / Product Title (KA-CARD Match: Crisp White Bold Title) ── */}
            <span
                className="product-poster-title"
                style={{
                    color: isLight ? '#0F172A' : '#FFFFFF',
                    fontFamily: 'var(--font-cairo)',
                }}
                title={product.name}
            >
                {cleanTitle}
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
