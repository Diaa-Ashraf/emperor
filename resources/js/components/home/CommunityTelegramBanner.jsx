import React, { useState, useEffect } from 'react';
import { MessageCircle, ExternalLink, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
import { bannersApi } from '../../api/endpoints';
import { useLanguage } from '../../contexts/LanguageContext';
import { formatImageUrl } from '../../utils/imageHelper';

export default function CommunityTelegramBanner() {
    const { isRtl } = useLanguage();
    const [hovered, setHovered] = useState(false);
    const [customBanner, setCustomBanner] = useState(null);

    const defaultLink = "https://whatsapp.com/channel/0029Vb97YHSB4hdZjFJysw14";
    const defaultImage = "/images/banners/whatsapp_channel_banner.jpg";

    useEffect(() => {
        bannersApi.getBanners()
            .then(res => {
                const list = Array.isArray(res?.data) ? res.data : (Array.isArray(res?.data?.data) ? res.data.data : []);
                const found = list.find(b => 
                    b.type === 'community' || 
                    b.type === 'whatsapp' || 
                    (b.title && (b.title.includes('واتساب') || b.title.toLowerCase().includes('whatsapp'))) ||
                    (b.link && b.link.includes('whatsapp.com'))
                );
                if (found) setCustomBanner(found);
            })
            .catch(() => {});
    }, []);

    const bannerImage = customBanner
        ? formatImageUrl(customBanner.image_url || customBanner.image || customBanner.mobile_image)
        : defaultImage;

    const bannerLink = customBanner?.link || defaultLink;
    const bannerTitle = customBanner?.title || 'انضم إلى مجتمعنا على الواتساب وتابع أحدث العروض والتحديثات';

    return (
        <div style={{
            maxWidth: '680px',
            margin: '0 auto 48px',
            width: '100%',
        }}>
            <a
                href={bannerLink}
                target="_blank"
                rel="noopener noreferrer"
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
                {/* ── Luxury Glowing Compact Poster Frame ── */}
                <div
                    className="emperor-whatsapp-banner-card"
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: 'clamp(180px, 24vw, 240px)',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        background: '#07080A',
                        border: `1.8px solid ${hovered ? '#22C55E' : 'rgba(34, 197, 94, 0.45)'}`,
                        boxShadow: hovered
                            ? '0 18px 50px rgba(0, 0, 0, 0.95), 0 0 35px rgba(34, 197, 94, 0.45), 0 0 15px rgba(212, 165, 55, 0.3)'
                            : '0 10px 30px rgba(0, 0, 0, 0.75), 0 0 22px rgba(34, 197, 94, 0.18)',
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
                            e.currentTarget.src = defaultImage;
                        }}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            display: 'block',
                            transform: hovered ? 'scale(1.05)' : 'scale(1)',
                            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                    />

                    {/* Animated Shimmer Sweep */}
                    <div
                        className="emperor-whatsapp-shimmer"
                        style={{
                            position: 'absolute',
                            inset: 0,
                            width: '50%',
                            height: '100%',
                            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), rgba(34, 197, 94, 0.25), transparent)',
                            transform: 'skewX(-25deg)',
                            pointerEvents: 'none',
                            zIndex: 2,
                        }}
                    />
                </div>

                {/* ── Subtitle Below Card ── */}
                <h3
                    style={{
                        margin: '14px 0 0',
                        fontSize: 'clamp(15px, 2vw, 17px)',
                        fontWeight: '800',
                        color: hovered ? '#4ADE80' : '#E2E8F0',
                        textAlign: 'center',
                        lineHeight: '1.4',
                        letterSpacing: '-0.2px',
                        transition: 'color 0.25s ease, transform 0.25s ease',
                        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                    }}
                >
                    <MessageCircle size={17} color={hovered ? '#4ADE80' : '#22C55E'} />
                    <span>{bannerTitle}</span>
                </h3>
            </a>

            <style>{`
                .emperor-whatsapp-banner-card {
                    animation: whatsappCardPulse 4s ease-in-out infinite alternate;
                }
                @keyframes whatsappCardPulse {
                    0% {
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.75), 0 0 18px rgba(34, 197, 94, 0.18);
                        border-color: rgba(34, 197, 94, 0.45);
                    }
                    100% {
                        box-shadow: 0 14px 40px rgba(0, 0, 0, 0.85), 0 0 30px rgba(34, 197, 94, 0.35);
                        border-color: rgba(74, 222, 128, 0.8);
                    }
                }
                .emperor-whatsapp-shimmer {
                    animation: whatsappShimmerSweep 5.5s ease-in-out infinite;
                }
                @keyframes whatsappShimmerSweep {
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
