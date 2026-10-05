import React, { useState, useEffect } from 'react';
import { getSiteLogo, getSiteName } from '../../utils/settingsHelper';

export default function AppSplashScreen() {
    const [visible, setVisible] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Show for ~1.2s on initial load, then fade out smoothly
        const timer1 = setTimeout(() => {
            setFadeOut(true);
        }, 1200);

        const timer2 = setTimeout(() => {
            setVisible(false);
        }, 1600);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    if (!visible) return null;

    return (
        <div
            id="emperor-splash-screen"
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 999999,
                backgroundColor: '#050508',
                backgroundImage: 'radial-gradient(circle at 50% 45%, rgba(212, 165, 55, 0.18) 0%, rgba(5, 5, 8, 0.98) 70%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: fadeOut ? 0 : 1,
                transform: fadeOut ? 'scale(1.04)' : 'scale(1)',
                transition: 'opacity 0.45s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                pointerEvents: fadeOut ? 'none' : 'auto',
                userSelect: 'none',
            }}
        >
            <style>{`
                @keyframes emperorPulseLogo {
                    0% { transform: scale(0.92); filter: drop-shadow(0 0 20px rgba(212, 165, 55, 0.3)); }
                    50% { transform: scale(1.02); filter: drop-shadow(0 0 35px rgba(212, 165, 55, 0.7)); }
                    100% { transform: scale(0.92); filter: drop-shadow(0 0 20px rgba(212, 165, 55, 0.3)); }
                }
                @keyframes emperorProgressFill {
                    0% { width: 0%; }
                    100% { width: 100%; }
                }
                @keyframes emperorShimmerText {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
            `}</style>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '18px',
                textAlign: 'center',
                padding: '20px',
            }}>
                {/* Logo Frame with Breathing Golden Halo */}
                <div style={{
                    position: 'relative',
                    width: '120px',
                    height: '120px',
                    animation: 'emperorPulseLogo 2.5s ease-in-out infinite',
                }}>
                    <img
                        src={getSiteLogo()}
                        alt="EMPEROR CARD"
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '28px',
                            objectFit: 'contain',
                            border: '2px solid rgba(212, 165, 55, 0.6)',
                            boxShadow: '0 0 30px rgba(212, 165, 55, 0.5), inset 0 0 15px rgba(212, 165, 55, 0.3)',
                        }}
                    />
                </div>

                {/* Brand Name with Gold Metallic Gradient */}
                <div>
                    <h1 style={{
                        margin: '6px 0 2px',
                        fontSize: '26px',
                        fontWeight: '900',
                        letterSpacing: '2px',
                        fontFamily: 'var(--font-cairo, Cairo, sans-serif)',
                        background: 'linear-gradient(90deg, #F8E8B8 0%, #FFFFFF 25%, #D4A537 50%, #FFFFFF 75%, #F8E8B8 100%)',
                        backgroundSize: '200% auto',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        animation: 'emperorShimmerText 3s linear infinite',
                        textShadow: '0 0 20px rgba(212, 165, 55, 0.4)',
                    }}>
                        EMPEROR CARD
                    </h1>
                    <p style={{
                        margin: 0,
                        fontSize: '13px',
                        fontWeight: '700',
                        color: '#D4A537',
                        letterSpacing: '0.5px',
                        fontFamily: 'var(--font-cairo, Cairo, sans-serif)',
                    }}>
                        إمبراطور للشحن الرقمي والخدمات الفورية
                    </p>
                </div>

                {/* Sleek Golden Progress Bar */}
                <div style={{
                    width: '160px',
                    height: '4px',
                    borderRadius: '999px',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    overflow: 'hidden',
                    marginTop: '8px',
                    border: '1px solid rgba(212, 165, 55, 0.3)',
                }}>
                    <div style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, #D4A537, #F8E8B8, #22C55E)',
                        animation: 'emperorProgressFill 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                    }} />
                </div>
            </div>
        </div>
    );
}
