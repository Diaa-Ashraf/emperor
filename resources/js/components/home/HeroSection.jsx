import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search,
    X
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { formatImageUrl } from '../../utils/imageHelper';

// Static home banners are intentionally managed in source control, not through the admin panel.
const HOME_BANNERS = [
    {
        src: '/images/banners/home_vodafone_deposit.jpg',
        alt: 'إيداع فودافون كاش أوتوماتيكيًا',
    },
    {
        src: '/images/banners/home_referral.jpg',
        alt: 'رابط الإحالة واربح من دعوة الأصدقاء',
    },
    {
        src: '/images/banners/home_vodafone_instant.jpg',
        alt: 'إيداع فودافون كاش خلال ثوانٍ',
    },
    {
        src: '/images/banners/home_whatsapp_channel.jpg',
        alt: 'انضم إلى مجتمعنا على واتساب',
        href: 'https://whatsapp.com/channel/0029VbDuIu76mYPJomZfr72N',
    },
];

export default function HeroSection({ products = [] }) {
    const navigate = useNavigate();
    const { t, isRtl } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchFocused, setSearchFocused] = useState(false);
    const [activeBanner, setActiveBanner] = useState(0);

    useEffect(() => {
        if (HOME_BANNERS.length < 2) return undefined;
        const timer = window.setInterval(() => {
            setActiveBanner((current) => (current + 1) % HOME_BANNERS.length);
        }, 5000);
        return () => window.clearInterval(timer);
    }, []);

    const filteredItems = (searchQuery.trim()
        ? products.filter(p => (p.name || '').toLowerCase().includes(searchQuery.toLowerCase()))
        : []
    ).slice(0, 8);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/category/all?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <section className="emperor-hero-container emperor-home-hero">
            <div className="emperor-home-banner" aria-roledescription="carousel" aria-label={t('homeBanners', 'البانرات الرئيسية')}>
                {HOME_BANNERS.map((banner, index) => (
                    <div
                        key={banner.src}
                        className={`emperor-home-banner-slide ${index === activeBanner ? 'is-active' : ''}`}
                        aria-hidden={index !== activeBanner}
                    >
                        {banner.href ? (
                            <a
                                className="emperor-home-banner-link"
                                href={banner.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={banner.alt}
                                tabIndex={index === activeBanner ? 0 : -1}
                            >
                                <img src={banner.src} alt="" fetchPriority={index === 0 ? 'high' : 'auto'} />
                            </a>
                        ) : (
                            <img src={banner.src} alt={banner.alt} fetchPriority={index === 0 ? 'high' : 'auto'} />
                        )}
                    </div>
                ))}
                <div className="emperor-home-banner-dots" role="group" aria-label={t('chooseBanner', 'اختيار البانر')}>
                    {HOME_BANNERS.map((banner, index) => (
                        <button
                            key={banner.src}
                            type="button"
                            className={`emperor-home-banner-dot ${index === activeBanner ? 'is-active' : ''}`}
                            aria-label={`${t('banner', 'بانر')} ${index + 1}`}
                            aria-pressed={index === activeBanner}
                            onClick={() => setActiveBanner(index)}
                        />
                    ))}
                </div>
            </div>

            <div className="emperor-home-hero-content">
                {/* Quranic verse remains directly beneath the banner. */}
                <div className="emperor-hero-quran-marquee-wrapper" title="آية الرزق المباركة">
                    <div className="emperor-hero-quran-marquee-track">
                        <div className="emperor-hero-quran-marquee-item">
                            <span className="quran-bismillah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</span>
                            <span className="quran-verse">﴿قُلْ إِنَّ رَبِّي يَبْسُطُ الرِّزْقَ لِمَنْ يَشَاءُ مِنْ عِبَادِهِ وَيَقْدِرُ لَهُ وَمَا أَنْفَقْتُمْ مِنْ شَيْءٍ فَهُوَ يُخْلِفُهُ وَهُوَ خَيْرُ الرَّازِقِينَ﴾</span>
                            <span className="quran-sadaqa">صَدَقَ اللَّهُ الْعَظِيمُ</span>
                            <span className="quran-divider">✦</span>
                        </div>
                        <div className="emperor-hero-quran-marquee-item" aria-hidden="true">
                            <span className="quran-bismillah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</span>
                            <span className="quran-verse">﴿قُلْ إِنَّ رَبِّي يَبْسُطُ الرِّزْقَ لِمَنْ يَشَاءُ مِنْ عِبَادِهِ وَيَقْدِرُ لَهُ وَمَا أَنْفَقْتُمْ مِنْ شَيْءٍ فَهُوَ يُخْلِفُهُ وَهُوَ خَيْرُ الرَّازِقِينَ﴾</span>
                            <span className="quran-sadaqa">صَدَقَ اللَّهُ الْعَظِيمُ</span>
                            <span className="quran-divider">✦</span>
                        </div>
                    </div>
                </div>

                <div className="emperor-hero-search-wrapper">
                    <form
                        onSubmit={handleSearchSubmit}
                        className={`emperor-hero-search-box ${searchFocused ? 'focused' : ''}`}
                    >
                        <Search size={18} color="#38BDF8" style={{ flexShrink: 0 }} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setSearchFocused(true)}
                            onBlur={() => setTimeout(() => setSearchFocused(false), 250)}
                            placeholder={t('heroSearchPlaceholder', 'ابحث عن الخدمة التي تحتاجها...')}
                            className="emperor-hero-search-input"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery('')}
                                className="emperor-hero-search-clear"
                                title="مسح"
                            >
                                <X size={12} />
                            </button>
                        )}
                    </form>

                    {/* Live Search Results Dropdown */}
                    {searchFocused && searchQuery.trim() && (
                        <div style={{
                            position: 'absolute',
                            top: 'calc(100% + 8px)',
                            left: 0,
                            right: 0,
                            background: '#07152b',
                            borderRadius: '16px',
                            border: '1.5px solid rgba(56, 189, 248, 0.45)',
                            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.85), 0 0 25px rgba(56, 189, 248, 0.25)',
                            padding: '10px',
                            maxHeight: '340px',
                            overflowY: 'auto',
                            zIndex: 100,
                        }}>
                            <div style={{ fontSize: '12px', color: '#F5D061', fontWeight: '900', padding: '4px 10px 8px', textAlign: isRtl ? 'right' : 'left' }}>
                                {t('liveSearchResults', 'نتائج البحث المباشرة')} ({filteredItems.length})
                            </div>
                            {filteredItems.length > 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    {filteredItems.map((item) => {
                                        const itemImg = formatImageUrl(item.image_url || item.image);
                                        return (
                                            <div
                                                key={item.id}
                                                onClick={() => navigate(`/product/${item.id}`)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    padding: '9px 12px',
                                                    borderRadius: '10px',
                                                    background: 'rgba(12, 26, 48, 0.75)',
                                                    border: '1px solid rgba(56, 189, 248, 0.2)',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s',
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.borderColor = '#38BDF8';
                                                    e.currentTarget.style.background = 'rgba(18, 38, 70, 0.9)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.2)';
                                                    e.currentTarget.style.background = 'rgba(12, 26, 48, 0.75)';
                                                }}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', overflow: 'hidden', background: '#070e1a' }}>
                                                        {itemImg && <img src={itemImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                                                    </div>
                                                    <span style={{ fontSize: '13px', fontWeight: '800', color: '#F8E8B8' }}>{item.name}</span>
                                                </div>
                                                <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontSize: '12px', fontWeight: '900', color: '#F5D061' }}>
                                                    {item.price ? `${Number(item.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${item.currency || 'EGP'}` : t('viewPackages', 'عرض الباقات')}
                                                    {Number(item.price_usd) > 0 && <small style={{ color: '#22C55E', direction: 'ltr' }}>{Number(item.price_usd).toFixed(2)} USD</small>}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div style={{ padding: '16px', textAlign: 'center', color: '#E2E8F0', fontSize: '12.5px', fontWeight: '700' }}>
                                    {t('noMatchesFor', 'لا توجد منتجات مطابقة لـ')} "{searchQuery}"
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
