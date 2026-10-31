import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search,
    Crown,
    ShieldCheck,
    Coins,
    Headphones,
    Globe,
    X
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getSiteName, getSiteDescription } from '../../utils/settingsHelper';
import { formatImageUrl } from '../../utils/imageHelper';

export default function HeroSection({ products = [] }) {
    const navigate = useNavigate();
    const { t, isRtl } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchFocused, setSearchFocused] = useState(false);

    const siteName = getSiteName() || 'مهره و سند كارد';
    const siteDesc = getSiteDescription() || 'خدماتك الرقمية والمالية في مكان واحد';

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
        <section className="emperor-hero-container">
            {/* Ambient Background Glowing Orbs */}
            <div className="emperor-hero-glow-orb" />
            <div className="emperor-hero-glow-orb-right" />

            {/* ── Left Visual: 3D Phone with Card & Floating Coins Artwork ── */}
            <div className="emperor-hero-phone-wrapper">
                <img
                    src="/images/artwork/hero_phone_art.png"
                    alt="Digital Payment & Cards"
                    className="emperor-hero-phone-img"
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                    }}
                />
            </div>

            {/* ── Center Content: Crown + Brand Title + Subtitle + Search Bar ── */}
            <div className="emperor-hero-center-content">
                {/* Golden Crown Icon */}
                <div className="emperor-hero-crown">
                    <Crown size={32} color="#F5D061" fill="#F5D061" />
                </div>

                {/* Brand Title */}
                <h1 className="emperor-hero-title">
                    {siteName}
                </h1>

                {/* Subtitle */}
                <p className="emperor-hero-subtitle">
                    {siteDesc}
                </p>

                {/* Infinite Scrolling Quranic Verse Marquee (Matching Screenshot media_1793379902984_b44b16a3.jpg) */}
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

                {/* Search Bar */}
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
                                                <span style={{ fontSize: '12px', fontWeight: '900', color: '#F5D061' }}>
                                                    {item.price_egp ? `${item.price_egp} ${t('currency', 'ج.م')}` : t('viewPackages', 'عرض الباقات')}
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

            {/* ── Right Group: Digital Globe Artwork + 4 Vertical Trust Pills ── */}
            <div className="emperor-hero-right-group">
                {/* 3D Glowing Digital Globe Graphic */}
                <div className="emperor-hero-globe-wrapper">
                    <img
                        src="/images/artwork/hero_globe_art.png"
                        alt="Global Digital Network"
                        className="emperor-hero-globe-img"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                </div>

                {/* 4 Trust Feature Items (Matching Official Visual Identity) */}
                <div className="emperor-hero-trust-stack">
                    <div className="emperor-hero-trust-item emperor-trust-secure">
                        <div className="emperor-hero-trust-icon-circle">
                            <ShieldCheck size={16} />
                        </div>
                        <span className="emperor-hero-trust-text">{t('heroTrustSafe', 'سريع وآمن')}</span>
                    </div>
                    <div className="emperor-hero-trust-item emperor-trust-prices">
                        <div className="emperor-hero-trust-icon-circle">
                            <Coins size={16} />
                        </div>
                        <span className="emperor-hero-trust-text">{t('heroTrustPrices', 'أسعار مناسبة')}</span>
                    </div>
                    <div className="emperor-hero-trust-item emperor-trust-support">
                        <div className="emperor-hero-trust-icon-circle">
                            <Headphones size={16} />
                        </div>
                        <span className="emperor-hero-trust-text">{t('heroTrustSupport', 'دعم فني 24/7')}</span>
                    </div>
                    <div className="emperor-hero-trust-item emperor-trust-global">
                        <div className="emperor-hero-trust-icon-circle">
                            <Globe size={16} />
                        </div>
                        <span className="emperor-hero-trust-text">{t('heroTrustGlobal', 'خدمات متعددة الدول')}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
