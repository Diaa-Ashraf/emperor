import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, ChevronLeft, ShieldCheck, Sparkles, ArrowLeft } from 'lucide-react';
import { TargetAppIconRenderer } from '../target/TargetAppIcons';
import { formatImageUrl } from '../../utils/imageHelper';

export default function ProductCard({ product }) {
    if (!product) return null;

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

    const isTarget = product.type === 'target' || product.slug?.includes('target');
    const productUrl = isTarget
        ? `/target-orders/new?app_id=${product.id}&app_name=${encodeURIComponent(product.name)}`
        : `/products/${product.id}`;

    // Check if the image seems like a generic stock image or if we should prefer the 3D App Icon
    const isAppOrTarget = isTarget || product.category?.type === 'voice_apps' || product.type === 'voice_apps';
    const showTargetIcon = isAppOrTarget && (!imageSrc || imgError || imageSrc.includes('unsplash') || imageSrc.includes('pexels') || imageSrc.includes('random'));

    return (
        <div
            className="emperor-product-card-luxury"
            style={{
                background: 'linear-gradient(145deg, rgba(22, 22, 30, 0.9) 0%, rgba(12, 12, 16, 0.96) 100%)',
                border: '1.5px solid rgba(212, 165, 55, 0.22)',
                borderRadius: '22px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.45)',
                position: 'relative',
                boxSizing: 'border-box',
                height: '100%',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212, 165, 55, 0.65)';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(0, 0, 0, 0.7), 0 0 25px rgba(212, 165, 55, 0.2)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212, 165, 55, 0.22)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.45)';
            }}
        >
            {/* Top Media Container */}
            <div style={{
                position: 'relative',
                height: 'clamp(120px, 20vw, 150px)',
                background: 'linear-gradient(180deg, #181824 0%, #0D0D12 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                padding: '12px',
            }}>
                {/* Floating Instant Delivery Badge */}
                <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    zIndex: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: 'rgba(34, 197, 94, 0.18)',
                    border: '1px solid rgba(34, 197, 94, 0.4)',
                    color: '#4ADE80',
                    borderRadius: '8px',
                    padding: '3px 8px',
                    fontSize: '11px',
                    fontWeight: '800',
                    backdropFilter: 'blur(8px)',
                }}>
                    <Zap size={11} fill="#4ADE80" />
                    <span>فوري</span>
                </div>

                {/* Floating Category Badge */}
                {product.category?.name && (
                    <div style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '10px',
                        zIndex: 2,
                        background: 'rgba(10, 10, 14, 0.85)',
                        border: '1px solid rgba(212, 165, 55, 0.3)',
                        color: '#F5D061',
                        borderRadius: '8px',
                        padding: '3px 9px',
                        fontSize: '11px',
                        fontWeight: '800',
                        backdropFilter: 'blur(8px)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                    }}>
                        {product.category.name}
                    </div>
                )}

                {/* Main Media Image / 3D App Icon */}
                {showTargetIcon ? (
                    <div style={{
                        width: '84px',
                        height: '84px',
                        borderRadius: '20px',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.65)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.35s ease',
                    }}>
                        <TargetAppIconRenderer app={product} size={84} />
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
                    <div style={{
                        width: '84px',
                        height: '84px',
                        borderRadius: '20px',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.65)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <TargetAppIconRenderer app={product} size={84} />
                    </div>
                )}
            </div>

            {/* Content Body */}
            <div style={{
                padding: '16px 16px 14px',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                justifyContent: 'space-between',
                background: 'rgba(10, 10, 14, 0.6)',
            }}>
                <div>
                    <h4 style={{
                        margin: '0 0 6px',
                        fontSize: 'clamp(14.5px, 2.5vw, 16px)',
                        fontWeight: '900',
                        color: '#FFFFFF',
                        lineHeight: '1.35',
                        letterSpacing: '-0.3px',
                    }}>
                        {product.name}
                    </h4>

                    <p style={{
                        margin: '0 0 14px',
                        fontSize: '12.5px',
                        color: '#94A3B8',
                        lineHeight: '1.6',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}>
                        {product.description || 'شحن رسمي وفوري بأعلى سرعة وأسعار الجملة المعتمدة.'}
                    </p>
                </div>

                {/* Price & Action Row */}
                <div style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.07)',
                    paddingTop: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '8px',
                }}>
                    <div style={{ minWidth: 0 }}>
                        <span style={{ fontSize: '11px', color: '#8E8E98', display: 'block', fontWeight: '700', marginBottom: '2px' }}>
                            الأسعار تبدأ من
                        </span>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
                            <span style={{ fontSize: '16px', fontWeight: '900', color: '#D4A537', fontFamily: 'Cairo, sans-serif' }}>
                                {formattedPrice ? formattedPrice : 'حسب الباقة'}
                            </span>
                            {formattedPrice && (
                                <span style={{ fontSize: '11px', color: '#D4A537', fontWeight: '800' }}>
                                    ج.م
                                </span>
                            )}
                        </div>
                    </div>

                    <Link to={productUrl} style={{ textDecoration: 'none', flexShrink: 0 }}>
                        <button
                            type="button"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px',
                                padding: '8px 16px',
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)',
                                color: '#0A0A0E',
                                border: 'none',
                                fontSize: '12.5px',
                                fontWeight: '900',
                                cursor: 'pointer',
                                boxShadow: '0 4px 15px rgba(212, 165, 55, 0.3)',
                                transition: 'all 0.2s ease',
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
                            <span>{isTarget ? 'سحب التارجت' : 'شحن الآن'}</span>
                            <ChevronLeft size={15} strokeWidth={2.5} />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
