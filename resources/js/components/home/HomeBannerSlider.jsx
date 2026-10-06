import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bannersApi } from '../../api/endpoints';
import { useLanguage } from '../../contexts/LanguageContext';

export default function HomeBannerSlider() {
    const { isRtl } = useLanguage();
    const [banners, setBanners] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Default luxury promotional artwork banners
    const defaultBanners = [
        {
            id: 'banner-vf-cash',
            title: 'إيداع فودافون كاش أوتوماتيك خلال 0 ثانية',
            link: '/deposit',
            isExternal: false,
            image: '/images/banners/banner_vodafone_cash.jpg',
        },
        {
            id: 'banner-chat-apps',
            title: 'أقل سعر في مصر لبرامج الدردشة الصوتية',
            link: '/category/apps',
            isExternal: false,
            image: '/images/banners/banner_chat_apps.jpg',
        },
        {
            id: 'banner-whatsapp-channel',
            title: 'انضم إلى مجتمعنا على واتساب',
            link: 'https://whatsapp.com/channel/0029Vb97YHSB4hdZjFJysw14',
            isExternal: true,
            image: '/images/banners/whatsapp_channel_banner.jpg',
        }
    ];

    useEffect(() => {
        bannersApi.getBanners()
            .then(res => {
                const list = Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : []);
                if (list.length > 0) {
                    const loaded = list.map((b) => {
                        const isExt = b.link && (b.link.startsWith('http://') || b.link.startsWith('https://'));
                        const rawImg = b.image_url || b.image;
                        let cleanImg = '/images/banners/banner_vodafone_cash.jpg';
                        if (rawImg && typeof rawImg === 'string') {
                            if (rawImg.startsWith('http://') || rawImg.startsWith('https://') || rawImg.startsWith('/')) {
                                cleanImg = rawImg;
                            } else {
                                cleanImg = '/storage/' + rawImg;
                            }
                        }
                        return {
                            id: b.id,
                            title: b.title || 'إمبراطور للشحن الرقمي',
                            link: b.link || '/category/games',
                            isExternal: Boolean(isExt),
                            image: cleanImg,
                        };
                    });

                    // Fully dynamic: use only active banners configured in dashboard
                    setBanners(loaded);
                } else {
                    setBanners(defaultBanners);
                }
            })
            .catch(() => {
                setBanners(defaultBanners);
            });
    }, []);

    const activeList = banners.length > 0 ? banners : defaultBanners;

    // Touch swipe gesture handlers for mobile
    const [touchStartX, setTouchStartX] = useState(null);
    const [touchEndX, setTouchEndX] = useState(null);
    const minSwipeDistance = 40;

    const onTouchStart = (e) => {
        setTouchEndX(null);
        setTouchStartX(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEndX(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStartX || !touchEndX) return;
        const distance = touchStartX - touchEndX;
        if (Math.abs(distance) < minSwipeDistance) return;

        if (distance > minSwipeDistance) {
            // Swiped left
            if (isRtl) handlePrev();
            else handleNext();
        } else if (distance < -minSwipeDistance) {
            // Swiped right
            if (isRtl) handleNext();
            else handlePrev();
        }
    };

    // Auto-advance slider every 6s unless hovered
    useEffect(() => {
        if (activeList.length <= 1 || isHovered) return;
        const timer = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % activeList.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [activeList.length, isHovered]);

    const handlePrev = (e) => {
        e?.preventDefault?.();
        e?.stopPropagation?.();
        setCurrentIndex(prev => (prev === 0 ? activeList.length - 1 : prev - 1));
    };

    const handleNext = (e) => {
        e?.preventDefault?.();
        e?.stopPropagation?.();
        setCurrentIndex(prev => (prev + 1) % activeList.length);
    };

    const currentBanner = activeList[currentIndex] || activeList[0];

    return (
        <div
            className="emperor-global-banner-container"
            style={{
                position: 'relative',
                maxWidth: '1120px',
                margin: '8px auto 16px',
                width: '100%',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            {/* Main Luxury Banner Frame - Exact KA CARD Style (Compact Widescreen) */}
            <div
                className="emperor-hero-slider"
                style={{
                    position: 'relative',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    border: '1.2px solid rgba(212, 165, 55, 0.45)',
                    background: '#0B0B0F',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.65), 0 0 20px rgba(212, 165, 55, 0.15)',
                    height: 'clamp(140px, 20vw, 220px)',
                    aspectRatio: '2.3 / 1',
                    maxHeight: '230px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: currentBanner?.link ? 'pointer' : 'default',
                    transition: 'all 0.3s ease',
                    userSelect: 'none',
                    touchAction: 'pan-y',
                }}
            >
                {/* Clickable Banner Wrapper */}
                {currentBanner?.link ? (
                    currentBanner.isExternal ? (
                        <a
                            href={currentBanner.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: 'block', width: '100%', height: '100%', textDecoration: 'none' }}
                        >
                            {currentBanner.image && (
                                <img
                                    key={`banner-img-${currentIndex}-${currentBanner.id}`}
                                    src={currentBanner.image}
                                    alt={currentBanner.title || 'إعلان إمبراطور'}
                                    className="emperor-slider-kenburns"
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = defaultBanners[0].image;
                                    }}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        objectPosition: 'center',
                                        display: 'block',
                                    }}
                                />
                            )}
                            <div className="emperor-slider-shimmer" />
                        </a>
                    ) : (
                        <Link
                            to={currentBanner.link}
                            style={{ display: 'block', width: '100%', height: '100%', textDecoration: 'none' }}
                        >
                            {currentBanner.image && (
                                <img
                                    key={`banner-img-${currentIndex}-${currentBanner.id}`}
                                    src={currentBanner.image}
                                    alt={currentBanner.title || 'إعلان إمبراطور'}
                                    className="emperor-slider-kenburns"
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = defaultBanners[0].image;
                                    }}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        objectPosition: 'center',
                                        display: 'block',
                                    }}
                                />
                            )}
                            <div className="emperor-slider-shimmer" />
                        </Link>
                    )
                ) : (
                    <div style={{ display: 'block', width: '100%', height: '100%' }}>
                        {currentBanner?.image && (
                            <img
                                key={`banner-img-${currentIndex}-${currentBanner.id}`}
                                src={currentBanner.image}
                                alt={currentBanner.title || 'إعلان إمبراطور'}
                                className="emperor-slider-kenburns"
                                onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = defaultBanners[0].image;
                                }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                    display: 'block',
                                }}
                            />
                        )}
                        <div className="emperor-slider-shimmer" />
                    </div>
                )}

                {/* Slider Indicator Dots (Clean and subtle without blocking arrows) */}
                {activeList.length > 1 && (
                    <div style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        zIndex: 4,
                        background: 'rgba(0, 0, 0, 0.6)',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        border: '1px solid rgba(212, 165, 55, 0.25)',
                    }}>
                        {activeList.map((_, i) => (
                            <button
                                key={i}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setCurrentIndex(i);
                                }}
                                aria-label={`Go to slide ${i + 1}`}
                                style={{
                                    width: i === currentIndex ? '20px' : '6px',
                                    height: '6px',
                                    borderRadius: '3px',
                                    background: i === currentIndex
                                        ? 'linear-gradient(90deg, #F5D061 0%, #D4A537 100%)'
                                        : 'rgba(255, 255, 255, 0.35)',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: 0,
                                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Slide Countdown Micro-Progress Bar (at bottom) */}
                {activeList.length > 1 && !isHovered && (
                    <div
                        key={`prog-${currentIndex}`}
                        className="emperor-slider-progress"
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            height: '2.5px',
                            background: 'linear-gradient(90deg, #D4A537 0%, #F5D061 100%)',
                            boxShadow: '0 0 6px rgba(212, 165, 55, 0.8)',
                            zIndex: 5,
                        }}
                    />
                )}
            </div>

            {/* Embedded CSS Animations */}
            <style>{`
                /* Royal Frame Breathing Glow */
                .emperor-hero-slider {
                    animation: royalBorderGlow 4s ease-in-out infinite alternate;
                }
                @keyframes royalBorderGlow {
                    0% {
                        border-color: rgba(212, 165, 55, 0.45);
                        box-shadow: 0 10px 35px rgba(0, 0, 0, 0.8), 0 0 25px rgba(212, 165, 55, 0.18);
                    }
                    100% {
                        border-color: rgba(245, 208, 97, 0.85);
                        box-shadow: 0 12px 45px rgba(0, 0, 0, 0.9), 0 0 45px rgba(212, 165, 55, 0.38);
                    }
                }

                /* Continuous Smooth Breathing Zoom In & Out */
                .emperor-slider-kenburns {
                    animation: continuousBannerZoom 4.5s ease-in-out infinite alternate;
                    will-change: transform;
                }
                @keyframes continuousBannerZoom {
                    0% {
                        transform: scale(1);
                    }
                    100% {
                        transform: scale(1.055);
                    }
                }

                /* Shimmer Light Beam Across Card */
                .emperor-slider-shimmer {
                    position: absolute;
                    inset: 0;
                    width: 50%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.06), rgba(212, 165, 55, 0.2), transparent);
                    transform: skewX(-25deg);
                    animation: bannerShimmerSweep 5s ease-in-out infinite;
                    pointer-events: none;
                    z-index: 2;
                }
                @keyframes bannerShimmerSweep {
                    0% {
                        transform: translateX(-150%) skewX(-25deg);
                    }
                    35%, 100% {
                        transform: translateX(350%) skewX(-25deg);
                    }
                }

                /* Slide Countdown Progress Bar */
                .emperor-slider-progress {
                    animation: slideProgressAnim 6s linear forwards;
                }
                @keyframes slideProgressAnim {
                    from {
                        width: 0%;
                    }
                    to {
                        width: 100%;
                    }
                }

                /* Navigation button hover */
                .emperor-slider-nav-btn:hover {
                    background: rgba(212, 165, 55, 0.35) !important;
                    transform: translateY(-50%) scale(1.1) !important;
                    box-shadow: 0 0 16px rgba(212, 165, 55, 0.5) !important;
                }
            `}</style>
        </div>
    );
}
