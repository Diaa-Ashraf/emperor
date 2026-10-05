import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, ChevronLeft, ShieldCheck, Sparkles, ArrowLeft } from 'lucide-react';
import { TargetAppIconRenderer } from '../target/TargetAppIcons';
import { formatImageUrl } from '../../utils/imageHelper';
import { useTheme } from '../../contexts/ThemeContext';

export default function ProductCard({ product }) {
    if (!product) return null;

    const { theme } = useTheme();
    const isLight = theme === 'light';

    const imageSrc = formatImageUrl(product.image_url || product.image);
    const [imgError, setImgError] = useState(false);

    // Calculate starting price from active tiers
    const tiers = product.active_tiers || product.activeTiers || product.tiers || [];
    let minPrice = null;

    if (tiers.length > 0) {
        minPrice = Math.min(...tiers.map(t => Number(t.final_price || t.price_egp || t.price || 0)));
    }

    const formattedPrice = minPrice && minPrice > 0
        ? Number(minPrice).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : null;

    const productUrl = `/products/${product.id}`;

    // Check if the image seems like a generic stock image or if we should prefer the 3D App Icon
    const isApp = product.category?.type === 'voice_apps' || product.type === 'voice_apps';
    const showTargetIcon = isApp && (!imageSrc || imgError || imageSrc.includes('unsplash') || imageSrc.includes('pexels') || imageSrc.includes('random'));

    return (
        <div
            className="emperor-product-card-luxury"
            style={{
                background: isLight
                    ? '#ffffff'
                    : 'linear-gradient(145deg, rgba(22, 22, 30, 0.9) 0%, rgba(12, 12, 16, 0.96) 100%)',
                border: isLight ? '1.5px solid rgba(180, 215, 240, 0.95)' : '1.5px solid rgba(212, 165, 55, 0.22)',
                borderRadius: '22px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: isLight ? '0 6px 20px rgba(30, 80, 140, 0.08)' : '0 10px 30px rgba(0, 0, 0, 0.45)',
                position: 'relative',
                boxSizing: 'border-box',
                height: '100%',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212, 165, 55, 0.65)';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = isLight
                    ? '0 12px 30px rgba(30, 80, 140, 0.15), 0 0 20px rgba(212, 165, 55, 0.2)'
                    : '0 16px 40px rgba(0, 0, 0, 0.7), 0 0 25px rgba(212, 165, 55, 0.2)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = isLight ? 'rgba(180, 215, 240, 0.95)' : 'rgba(212, 165, 55, 0.22)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = isLight ? '0 6px 20px rgba(30, 80, 140, 0.08)' : '0 10px 30px rgba(0, 0, 0, 0.45)';
            }}
        >
            {/* Top Media Container */}
            <div className="card-media-wrap" style={{
                position: 'relative',
                height: 'clamp(112px, 18vw, 150px)',
                background: isLight ? 'linear-gradient(180deg, #f0f7fd 0%, #e2eefa 100%)' : 'linear-gradient(180deg, #181824 0%, #0D0D12 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                padding: '12px',
            }}>
                {/* Floating Instant Delivery Badge */}
                <div style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    zIndex: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: 'rgba(34, 197, 94, 0.18)',
                    border: '1px solid rgba(34, 197, 94, 0.4)',
                    color: '#4ADE80',
                    borderRadius: '8px',
                    padding: '2px 7px',
                    fontSize: '10.5px',
                    fontWeight: '800',
                    backdropFilter: 'blur(8px)',
                }}>
                    <Zap size={10} fill="#4ADE80" />
                    <span>فوري</span>
                </div>

                {/* Floating Category Badge */}
                {product.category?.name && (
                    <div style={{
                        position: 'absolute',
                        bottom: '8px',
                        left: '8px',
                        zIndex: 2,
                        background: isLight ? 'rgba(255, 255, 255, 0.95)' : 'rgba(10, 10, 14, 0.85)',
                        border: isLight ? '1px solid rgba(212, 165, 55, 0.5)' : '1px solid rgba(212, 165, 55, 0.3)',
                        color: isLight ? '#9A7210' : '#F5D061',
                        borderRadius: '8px',
                        padding: '2px 8px',
                        fontSize: '10px',
                        fontWeight: '800',
                        backdropFilter: 'blur(8px)',
                        boxShadow: isLight ? '0 2px 8px rgba(0, 0, 0, 0.08)' : '0 4px 12px rgba(0, 0, 0, 0.5)',
                        maxWidth: 'calc(100% - 16px)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}>
                        {product.category.name}
                    </div>
                )}

                {/* Main Media Image / 3D App Icon */}
                {showTargetIcon ? (
                    <div className="card-app-icon" style={{
                        width: '76px',
                        height: '76px',
                        borderRadius: '18px',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.65)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.35s ease',
                    }}>
                        <TargetAppIconRenderer app={product} size={76} />
                    </div>
                ) : imageSrc && !imgError ? (
                    <img
                        src={imageSrc}
                        alt={product.name}
                        loading="lazy"
                        decoding="async"
                        onError={() => setImgError(true)}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '14px',
                            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                    />
                ) : (
                    <div className="card-app-icon" style={{
                        width: '76px',
                        height: '76px',
                        borderRadius: '18px',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.65)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <TargetAppIconRenderer app={product} size={76} />
                    </div>
                )}
            </div>

            {/* Content Body */}
            <div className="card-body-wrap" style={{
                padding: '14px 14px 12px',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                justifyContent: 'space-between',
                background: isLight ? '#ffffff' : 'rgba(10, 10, 14, 0.6)',
            }}>
                <div>
                    <h4 className="card-product-title" style={{
                        margin: '0 0 4px',
                        fontSize: 'clamp(13.5px, 2.5vw, 15.5px)',
                        fontWeight: '900',
                        color: isLight ? '#0f172a' : '#FFFFFF',
                        lineHeight: '1.35',
                        letterSpacing: '-0.3px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }} title={product.name}>
                        {product.name}
                    </h4>

                    <p className="card-product-desc" style={{
                        margin: '0 0 10px',
                        fontSize: '12px',
                        color: isLight ? '#475569' : '#94A3B8',
                        lineHeight: '1.5',
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}>
                        {product.description || 'شحن رسمي وفوري بأعلى سرعة وأسعار الجملة المعتمدة.'}
                    </p>
                </div>

                {/* Price & Action Row */}
                <div style={{
                    borderTop: isLight ? '1px solid rgba(200, 225, 245, 0.85)' : '1px solid rgba(255, 255, 255, 0.07)',
                    paddingTop: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '6px',
                }}>
                    <div style={{ minWidth: 0, flex: '1 1 auto' }}>
                        <span className="card-price-label" style={{ fontSize: '10px', color: isLight ? '#64748b' : '#8E8E98', display: 'block', fontWeight: '700', marginBottom: '1px' }}>
                            الأسعار تبدأ من
                        </span>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px', flexWrap: 'nowrap' }}>
                            <span className="card-price-val" style={{ fontSize: '15px', fontWeight: '900', color: isLight ? '#9a7210' : '#D4A537', fontFamily: 'Cairo, sans-serif', whiteSpace: 'nowrap' }}>
                                {formattedPrice ? formattedPrice : 'حسب الباقة'}
                            </span>
                            {formattedPrice && (
                                <span style={{ fontSize: '10px', color: isLight ? '#9a7210' : '#D4A537', fontWeight: '800' }}>
                                    ج.م
                                </span>
                            )}
                        </div>
                    </div>

                    <Link to={productUrl} style={{ textDecoration: 'none', flexShrink: 0 }}>
                        <button
                            type="button"
                            className="card-action-btn"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '7px 14px',
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)',
                                color: '#0A0A0E',
                                border: 'none',
                                fontSize: '12px',
                                fontWeight: '900',
                                cursor: 'pointer',
                                boxShadow: '0 4px 15px rgba(212, 165, 55, 0.3)',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.04)';
                                e.currentTarget.style.boxShadow = '0 6px 20px rgba(212, 165, 55, 0.5)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = '0 4px 15px rgba(212, 165, 55, 0.3)';
                            }}
                        >
                            <span>شحن</span>
                            <ChevronLeft size={14} strokeWidth={2.5} />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
