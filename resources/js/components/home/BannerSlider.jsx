import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Sparkles, ArrowLeft } from 'lucide-react';

export default function BannerSlider({ banners = [] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const timerRef = useRef(null);

    // Default luxury banners if API returns empty
    const defaultBanners = [
        {
            id: 'd1',
            title: 'شحن ألعابك المفضلة بأعلى سرعة وأفضل سعر',
            subtitle: 'ببجي، فري فاير، فالورانت، روبلوكس والمزيد مع تنفيذ فوري',
            link: '/category/games',
            button_text: 'اشحن الآن',
            gradient: 'linear-gradient(135deg, #1C1917 0%, #2A1D0C 50%, #17120A 100%)',
            accent: '#D4A537',
            tag: 'خصومات حصرية',
        },
        {
            id: 'd2',
            title: 'بيع تارجت تطبيقات البث بأعلى سعر كاش',
            subtitle: 'بيجو لايف، تيك توك، لايكي، سولشيل — استلم فلوسك فودافون كاش أو في المحفظة',
            link: '/target/sell',
            button_text: 'بيع تارجت الآن',
            gradient: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #0B0F19 100%)',
            accent: '#38BDF8',
            tag: 'سعر تارجت معتمد',
        },
        {
            id: 'd3',
            title: 'انضم لبرنامج الإحالات واربح عمولات غير محدودة',
            subtitle: 'شارك كود الدعوة مع أصدقائك واكسب كاش على كل عملية إيداع وشحن يقومون بها',
            link: '/referrals',
            button_text: 'ابدأ الربح',
            gradient: 'linear-gradient(135deg, #064E3B 0%, #065F46 50%, #022C22 100%)',
            accent: '#34D399',
            tag: 'أرباح نقدية',
        },
    ];

    const displayBanners = banners.length > 0 ? banners : defaultBanners;

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % displayBanners.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + displayBanners.length) % displayBanners.length);
    };

    useEffect(() => {
        if (!isHovered && displayBanners.length > 1) {
            timerRef.current = setInterval(nextSlide, 5000);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isHovered, displayBanners.length]);

    const currentBanner = displayBanners[currentIndex];

    return (
        <div
            style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                marginBottom: '32px',
                border: '1px solid rgba(212, 165, 55, 0.25)',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.5)',
                minHeight: '240px',
                background: currentBanner.gradient || '#181820',
                transition: 'background 0.5s ease',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Ambient Lighting Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                background: currentBanner.image
                    ? `linear-gradient(90deg, rgba(13,13,15,0.95) 0%, rgba(13,13,15,0.7) 60%, rgba(13,13,15,0.2) 100%), url(${currentBanner.image}) center/cover no-repeat`
                    : 'radial-gradient(circle at 80% 20%, rgba(212, 165, 55, 0.15) 0%, transparent 60%)',
                pointerEvents: 'none',
            }} />

            {/* Slide Content */}
            <div style={{
                position: 'relative',
                zIndex: 2,
                padding: '36px 32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                maxWidth: '650px',
                minHeight: '220px',
            }}>
                {/* Tag Badge */}
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 12px',
                    background: 'rgba(212, 165, 55, 0.15)',
                    border: '1px solid rgba(212, 165, 55, 0.3)',
                    borderRadius: '20px',
                    color: currentBanner.accent || '#D4A537',
                    fontSize: '13px',
                    fontWeight: '700',
                    width: 'fit-content',
                    marginBottom: '14px',
                }}>
                    <Sparkles size={14} />
                    <span>{currentBanner.tag || 'عرض خاص'}</span>
                </div>

                {/* Title */}
                <h2 style={{
                    margin: '0 0 10px',
                    fontSize: 'clamp(20px, 3.5vw, 28px)',
                    fontWeight: '900',
                    color: '#FFFFFF',
                    lineHeight: '1.3',
                }}>
                    {currentBanner.title}
                </h2>

                {/* Subtitle */}
                <p style={{
                    margin: '0 0 22px',
                    fontSize: 'clamp(13px, 2vw, 15px)',
                    color: '#CBD5E1',
                    lineHeight: '1.6',
                }}>
                    {currentBanner.subtitle}
                </p>

                {/* CTA Button */}
                <div>
                    <Link
                        to={currentBanner.link || '/'}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: 'linear-gradient(135deg, #F3E5AB 0%, #D4A537 50%, #AA7C11 100%)',
                            color: '#0D0D0F',
                            fontWeight: '800',
                            fontSize: '15px',
                            padding: '10px 24px',
                            borderRadius: '12px',
                            textDecoration: 'none',
                            boxShadow: '0 6px 20px rgba(212, 165, 55, 0.4)',
                            transition: 'all 0.2s',
                        }}
                    >
                        <span>{currentBanner.button_text || 'اكتشف الآن'}</span>
                        <ArrowLeft size={16} />
                    </Link>
                </div>
            </div>

            {/* Navigation Arrows */}
            {displayBanners.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        style={{
                            position: 'absolute',
                            left: '16px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'rgba(0, 0, 0, 0.6)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            color: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            zIndex: 3,
                            transition: 'background 0.2s',
                        }}
                        aria-label="Previous Slide"
                    >
                        <ChevronRight size={22} />
                    </button>

                    <button
                        onClick={nextSlide}
                        style={{
                            position: 'absolute',
                            right: '16px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'rgba(0, 0, 0, 0.6)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            color: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            zIndex: 3,
                            transition: 'background 0.2s',
                        }}
                        aria-label="Next Slide"
                    >
                        <ChevronLeft size={22} />
                    </button>

                    {/* Pagination Dots */}
                    <div style={{
                        position: 'absolute',
                        bottom: '16px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        gap: '8px',
                        zIndex: 3,
                    }}>
                        {displayBanners.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                style={{
                                    width: currentIndex === idx ? '24px' : '8px',
                                    height: '8px',
                                    borderRadius: '4px',
                                    background: currentIndex === idx ? '#D4A537' : 'rgba(255, 255, 255, 0.3)',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: 0,
                                    transition: 'all 0.3s ease',
                                }}
                                aria-label={`Slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
