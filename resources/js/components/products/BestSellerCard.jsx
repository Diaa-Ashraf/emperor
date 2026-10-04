import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { TargetAppIconRenderer } from '../target/TargetAppIcons';
import { formatImageUrl } from '../../utils/imageHelper';

export default function BestSellerCard({ item }) {
    const { t, isRtl } = useLanguage();
    const [hovered, setHovered] = useState(false);

    if (!item) return null;

    const imageSrc = formatImageUrl(item.image_url || item.image);
    const tiers = item.tiers || item.active_tiers || [];
    let minPrice = item.price_egp || null;

    if (!minPrice && tiers.length > 0) {
        const prices = tiers.map(t => Number(t.final_price || t.price_egp || t.price || 0)).filter(p => p > 0);
        if (prices.length > 0) minPrice = Math.min(...prices);
    }

    return (
        <Link
            to={item.is_target ? '/target/sell' : `/products/${item.id}`}
            style={{
                textDecoration: 'none',
                background: 'var(--card-gradient)',
                border: `1px solid ${hovered ? 'var(--border-strong)' : 'var(--border-subtle)'}`,
                borderRadius: '20px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: hovered
                    ? 'var(--shadow-lg), var(--shadow-gold)'
                    : 'var(--shadow-sm)',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
                position: 'relative',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* ── Image Area ── */}
            <div style={{
                position: 'relative',
                height: '160px',
                background: 'linear-gradient(180deg, #151520 0%, #0C0C12 100%)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px',
            }}>
                {imageSrc ? (
                    <img
                        src={imageSrc}
                        alt={item.name}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                            transform: hovered ? 'scale(1.08)' : 'scale(1)',
                        }}
                    />
                ) : (
                    <div style={{
                        width: '92px',
                        height: '92px',
                        borderRadius: '22px',
                        border: '2px solid rgba(229, 195, 120, 0.75)',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.65)',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                        transform: hovered ? 'scale(1.08)' : 'scale(1)',
                    }}>
                        <TargetAppIconRenderer app={item} size={92} />
                    </div>
                )}

                {/* Bottom gradient overlay */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '50%',
                    background: 'linear-gradient(transparent, var(--bg-card))',
                    pointerEvents: 'none',
                }} />

                {/* Status: Available */}
                <div style={{
                    position: 'absolute',
                    top: '10px',
                    [isRtl ? 'right' : 'left']: '10px',
                    background: 'var(--glass-bg-heavy)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                    color: 'var(--success)',
                    padding: '3px 8px',
                    borderRadius: '9999px',
                    fontSize: '10px',
                    fontWeight: '800',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                }}>
                    <span className="emperor-status-dot" style={{ width: '5px', height: '5px' }} />
                    <span>{t('inStock')}</span>
                </div>

                {/* Buy Now overlay on hover */}
                <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '50%',
                    transform: `translateX(-50%) translateY(${hovered ? '0' : '10px'})`,
                    opacity: hovered ? 1 : 0,
                    transition: 'all 0.3s ease',
                    background: 'var(--gold-metallic)',
                    color: '#050507',
                    padding: '6px 16px',
                    borderRadius: '9999px',
                    fontSize: '11px',
                    fontWeight: '800',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: 'var(--shadow-gold-md)',
                    whiteSpace: 'nowrap',
                    zIndex: 3,
                }}>
                    <ShoppingCart size={13} />
                    <span>اشترِ الآن</span>
                </div>
            </div>

            {/* ── Bottom Info Bar ── */}
            <div style={{
                padding: '14px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px',
            }}>
                {/* Product Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{
                        fontSize: '13px',
                        fontWeight: '800',
                        color: 'var(--text-primary)',
                        display: 'block',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        marginBottom: '4px',
                    }}>
                        {item.name}
                    </span>
                    {minPrice && (
                        <span style={{
                            fontSize: '12px',
                            fontWeight: '800',
                            color: 'var(--gold-400)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '2px',
                        }}>
                            {minPrice} {t('currency')}
                        </span>
                    )}
                </div>

                {/* Arrow */}
                <div style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: hovered ? 'var(--gold-metallic-soft)' : 'rgba(212, 165, 55, 0.06)',
                    border: `1px solid ${hovered ? 'var(--border-medium)' : 'var(--border-subtle)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--gold-400)',
                    flexShrink: 0,
                    transition: 'all 0.3s ease',
                }}>
                    {isRtl ? <ChevronLeft size={15} /> : <ChevronRight size={15} />}
                </div>
            </div>
        </Link>
    );
}
