import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bannersApi } from '../../api/endpoints';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { formatImageUrl } from '../../utils/imageHelper';

export default function GoldenTargetBanner() {
    const { isRtl, language, t } = useLanguage();
    const { theme } = useTheme();
    const isLight = theme === 'light';
    const [hovered, setHovered] = useState(false);
    const [customBanner, setCustomBanner] = useState(null);

    useEffect(() => {
        bannersApi.getBanners({ type: 'target' })
            .then(res => {
                const list = Array.isArray(res?.data) ? res.data : (Array.isArray(res?.data?.data) ? res.data.data : []);
                if (list.length > 0) {
                    setCustomBanner(list[0]);
                } else {
                    // Check all banners for any banner with type or title related to target
                    bannersApi.getBanners().then(allRes => {
                        const allList = Array.isArray(allRes?.data) ? allRes.data : (Array.isArray(allRes?.data?.data) ? allRes.data.data : []);
                        const found = allList.find(b => b.type === 'target' || (b.title && (b.title.includes('تارجت') || b.title.toLowerCase().includes('target'))));
                        if (found) setCustomBanner(found);
                    }).catch(() => {});
                }
            })
            .catch(() => {});
    }, []);

    const bannerImage = customBanner
        ? formatImageUrl(customBanner.image_url || customBanner.image || customBanner.mobile_image)
        : '/images/artwork/hero_banner.jpg';

    const bannerLink = customBanner?.link || '/target/apps';
    const bannerTitle = customBanner?.title
        ? (language === 'en' && (customBanner.title.includes('تارجت') || customBanner.title.includes('بيع')) ? t('sellTargetBannerTitle', 'Sell Live App Target & Coins') : customBanner.title)
        : t('sellTargetBannerTitle', 'بيع تارجت');

    return (
        <div style={{
            maxWidth: '680px',
            margin: '0 auto 44px',
            width: '100%',
        }}>
            <Link
                to={bannerLink}
                style={{
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                    width: '100%',
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                {/* ── Luxury Glowing Poster Frame ── */}
                <div
                    className="emperor-target-banner-card"
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: 'clamp(200px, 28vw, 310px)',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        background: isLight ? '#FFFFFF' : '#0B0B0F',
                        border: isLight
                            ? `1.8px solid ${hovered ? '#D4A537' : 'rgba(212, 165, 55, 0.35)'}`
                            : `1.8px solid ${hovered ? '#F5D061' : 'rgba(212, 165, 55, 0.45)'}`,
                        boxShadow: isLight
                            ? (hovered ? '0 0 25px rgba(212, 165, 55, 0.35)' : 'none')
                            : (hovered
                                ? '0 18px 50px rgba(0, 0, 0, 0.95), 0 0 40px rgba(212, 165, 55, 0.45)'
                                : '0 10px 30px rgba(0, 0, 0, 0.75), 0 0 22px rgba(212, 165, 55, 0.18)'),
                        transform: hovered ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
                        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                >
                    <img
                        src={bannerImage}
                        alt={bannerTitle}
                        loading="lazy"
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = '/images/artwork/hero_banner.jpg';
                        }}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            display: 'block',
                            transform: hovered ? 'scale(1.06)' : 'scale(1)',
                            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                    />

                    {/* Animated Shimmer Sweep */}
                    <div
                        className="emperor-target-shimmer"
                        style={{
                            position: 'absolute',
                            inset: 0,
                            width: '50%',
                            height: '100%',
                            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), rgba(212, 165, 55, 0.25), transparent)',
                            transform: 'skewX(-25deg)',
                            pointerEvents: 'none',
                            zIndex: 2,
                        }}
                    />
                </div>

                {/* ── Subtitle Below Card (Matches Reference Screenshot) ── */}
                <h3
                    style={{
                        margin: '14px 0 0',
                        fontSize: 'clamp(16px, 2.2vw, 18px)',
                        fontWeight: '800',
                        color: hovered ? (isLight ? '#B45309' : '#F5D061') : (isLight ? '#0F172A' : '#FFFFFF'),
                        textAlign: 'center',
                        lineHeight: '1.4',
                        letterSpacing: '-0.2px',
                        transition: 'color 0.25s ease, transform 0.25s ease',
                        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
                    }}
                >
                    {bannerTitle}
                </h3>
            </Link>

            <style>{`
                .emperor-target-banner-card {
                    animation: ${isLight ? 'none' : 'targetCardPulse 4s ease-in-out infinite alternate'};
                }
                @keyframes targetCardPulse {
                    0% {
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.75), 0 0 20px rgba(212, 165, 55, 0.15);
                        border-color: rgba(212, 165, 55, 0.45);
                    }
                    100% {
                        box-shadow: 0 14px 40px rgba(0, 0, 0, 0.85), 0 0 32px rgba(212, 165, 55, 0.32);
                        border-color: rgba(245, 208, 97, 0.8);
                    }
                }
                .emperor-target-shimmer {
                    animation: targetShimmerSweep 5.5s ease-in-out infinite;
                }
                @keyframes targetShimmerSweep {
                    0% {
                        transform: translateX(-150%) skewX(-25deg);
                    }
                    35%, 100% {
                        transform: translateX(350%) skewX(-25deg);
                    }
                }
            `}</style>
        </div>
    );
}
