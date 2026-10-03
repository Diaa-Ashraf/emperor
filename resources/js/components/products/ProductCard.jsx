import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ChevronLeft, ShieldCheck, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import { TargetAppIconRenderer } from '../target/TargetAppIcons';
import "../../../css/productCard.css"; // Import the CSS file for ProductCard
export default function ProductCard({ product }) {
    if (!product) return null;

    const imageSrc = product.image_url || product.image;

    // Calculate starting price from active tiers
    const tiers = product.active_tiers || product.activeTiers || product.tiers || [];
    let minPrice = null;

    if (tiers.length > 0) {
        minPrice = Math.min(...tiers.map(t => Number(t.price_egp || t.price || 0)));
    }

    const formattedPrice = minPrice
        ? Number(minPrice).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : null;

    return (
        <div className="emperor-card-premium" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '95%',
            borderRadius: "16px",
            marginTop: "7px",
        }}>
            {/* Top Media / Banner */}
            <div style={{
                position: 'relative',
                height: 'clamp(115px, 22vw, 145px)',
                background: 'linear-gradient(180deg, #151520 0%, #0C0C12 100%)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px',
                borderRadius: "16px",

            }}>
                {imageSrc ? (
                    <img
                        src={imageSrc}
                        alt={product.name}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                ) : (
                    <div style={{
                        width: '84px',
                        height: '84px',
                        borderRadius: '20px',
                        border: '2px solid rgba(229, 195, 120, 0.75)',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.65)',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}>
                        <TargetAppIconRenderer app={product} size={84} />
                    </div>
                )}

                {/* Top Instant Badge */}
                <div style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    background: 'rgba(11, 11, 14, 0.88)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(212, 165, 55, 0.45)',
                    color: '#D4A537',
                    padding: '2px 7px',
                    borderRadius: '7px',
                    fontSize: '10.5px',
                    fontWeight: '800',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                }}>
                    <Zap size={11} color="#D4A537" />
                    <span>تسليم فوري</span>
                </div>

                {/* Category tag */}
                {product.category?.name && (
                    <div style={{
                        position: 'absolute',
                        bottom: '8px',
                        left: '8px',
                        background: 'rgba(0, 0, 0, 0.8)',
                        backdropFilter: 'blur(6px)',
                        color: '#F3E5AB',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        padding: '2px 7px',
                        borderRadius: '6px',
                        fontSize: '10.5px',
                        fontWeight: '700',
                    }}>
                        {product.category.name}
                    </div>
                )}
            </div>

            {/* Content Body */}
            <div style={{
                padding: 'clamp(12px, 2.5vw, 16px)',
                display: 'flex',
                flexDirection: 'column',
                flex: 1, justifyContent: 'space-between',
                backgroundColor: "rgba(9, 7, 0, 0.75)",
                borderRadius: "16px",

            }}>
                <div className='product-card'>
                    <h4 style={{
                        margin: '0 0 6px',
                        fontSize: 'clamp(14px, 2.5vw, 16px)',
                        fontWeight: '800',
                        color: '#FFFFFF',
                        lineHeight: '1.3',
                        letterSpacing: '-0.3px',
                    }}>
                        {product.name}
                    </h4>

                    <p style={{
                        margin: '0 0 12px',
                        fontSize: '11.5px',
                        color: '#9E9EA8',
                        lineHeight: '1.5',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}>
                        {product.description || 'شحن رسمي وفوري داخل الحساب بأمان وسرعة فائقة'}
                    </p>
                </div>

                {/* Price & Action */}
                <div style={{
                    borderTop: '1px solid rgba(212, 165, 55, 0.12)',
                    paddingTop: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '6px',
                    flexWrap: 'wrap',

                }}>
                    <div>
                        <span style={{ fontSize: '10.5px', color: '#7E7E8E', display: 'block', fontWeight: '500' }}>
                            الأسعار تبدأ من
                        </span>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
                            <span style={{ fontSize: 'clamp(14px, 2.8vw, 16px)', fontWeight: '900', color: '#D4A537' }}>
                                {formattedPrice ? `${formattedPrice}` : 'حسب الباقة'}
                            </span>
                            {formattedPrice && (
                                <span style={{ fontSize: '10.5px', color: '#D4A537', fontWeight: '700' }}>
                                    ج.م
                                </span>
                            )}
                        </div>
                    </div>

                    {(() => {
                        const isTarget = product.type === 'target' || product.slug?.includes('target');
                        const productUrl = isTarget
                            ? `/target-orders/new?app_id=${product.id}&app_name=${encodeURIComponent(product.name)}`
                            : `/products/${product.id}`;

                        return (
                            <Link to={productUrl} style={{ textDecoration: 'none', flexShrink: 0 }}>
                                <Button variant="primary" size="sm" icon={ChevronLeft} iconPosition="end" style={{ padding: '6px 12px', fontSize: '12px' }}>
                                    {isTarget ? 'سحب التارجت' : 'شحن الآن'}
                                </Button>
                            </Link>
                        );
                    })()}
                </div>
            </div>
        </div>
    );
}
