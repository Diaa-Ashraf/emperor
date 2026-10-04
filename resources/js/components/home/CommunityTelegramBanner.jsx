import React from 'react';
import { MessageCircle, ExternalLink, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function CommunityTelegramBanner() {
    const { isRtl } = useLanguage();
    const whatsappChannelUrl = "https://whatsapp.com/channel/0029Vb97YHSB4hdZjFJysw14";

    return (
        <div
            className="emperor-entrance"
            style={{
                position: 'relative',
                maxWidth: '1120px',
                margin: '0 auto 48px',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '1.5px solid rgba(212, 165, 55, 0.45)',
                boxShadow: '0 12px 36px rgba(0, 0, 0, 0.8), 0 0 25px rgba(34, 197, 94, 0.15)',
                background: '#0B0B0F',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
        >
            <style>{`
                .whatsapp-community-banner-card {
                    display: block;
                    position: relative;
                    width: 100%;
                    overflow: hidden;
                    text-decoration: none;
                    cursor: pointer;
                }
                .whatsapp-community-banner-img {
                    width: 100%;
                    height: auto;
                    display: block;
                    object-fit: cover;
                    transition: transform 0.4s ease, filter 0.3s ease;
                }
                .whatsapp-community-banner-card:hover .whatsapp-community-banner-img {
                    transform: scale(1.02);
                    filter: brightness(1.06);
                }
                .whatsapp-community-banner-glow {
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                    background: radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.12) 0%, transparent 70%);
                    opacity: 0.6;
                    transition: opacity 0.3s ease;
                }
                .whatsapp-community-banner-card:hover .whatsapp-community-banner-glow {
                    opacity: 1;
                }
            `}</style>

            <a
                href={whatsappChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-community-banner-card"
                title="انضم إلى قناة واتساب إمبراطور الرسمية"
            >
                <img
                    src="/images/banners/whatsapp_channel_banner.jpg"
                    alt="انضم إلى مجتمعنا على الواتساب - EMPEROR CARD"
                    className="whatsapp-community-banner-img"
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/images/banner_whatsapp.jpg';
                    }}
                />
                <div className="whatsapp-community-banner-glow" />
            </a>
        </div>
    );
}
