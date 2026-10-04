import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

export default function GoldenTargetBanner() {
    const { isRtl } = useLanguage();
    const [hovered, setHovered] = useState(false);

    return (
        <div style={{
            maxWidth: '680px',
            margin: '0 auto 44px',
            width: '100%',
        }}>
            <Link
                to="/target/apps"
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
                {/* ── Luxury Poster Frame ── */}
                <div
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: 'clamp(200px, 28vw, 310px)',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        background: '#0B0B0F',
                        border: `1.8px solid ${hovered ? '#F5D061' : 'rgba(212, 165, 55, 0.45)'}`,
                        boxShadow: hovered
                            ? '0 16px 45px rgba(0, 0, 0, 0.9), 0 0 35px rgba(212, 165, 55, 0.35)'
                            : '0 10px 30px rgba(0, 0, 0, 0.75), 0 0 20px rgba(212, 165, 55, 0.15)',
                        transform: hovered ? 'translateY(-6px) scale(1.015)' : 'translateY(0) scale(1)',
                        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                >
                    <img
                        src="/images/artwork/hero_banner.jpg"
                        alt="اضغط هنا لسحب راتبك - بيع تارجت"
                        loading="lazy"
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = '/images/artwork/cat_target.jpg';
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

                    {/* Shimmer Light Beam Effect */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: hovered
                                ? 'linear-gradient(90deg, transparent, rgba(245, 208, 97, 0.15), transparent)'
                                : 'transparent',
                            transition: 'all 0.3s ease',
                            pointerEvents: 'none',
                        }}
                    />
                </div>

                {/* ── Subtitle Below Card (Matches Reference Screenshot) ── */}
                <h3
                    style={{
                        margin: '14px 0 0',
                        fontSize: 'clamp(16px, 2.2vw, 18px)',
                        fontWeight: '800',
                        color: hovered ? '#F5D061' : '#FFFFFF',
                        textAlign: 'center',
                        lineHeight: '1.4',
                        letterSpacing: '-0.2px',
                        transition: 'color 0.25s ease, transform 0.25s ease',
                        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
                    }}
                >
                    بيع تارجت
                </h3>
            </Link>
        </div>
    );
}
