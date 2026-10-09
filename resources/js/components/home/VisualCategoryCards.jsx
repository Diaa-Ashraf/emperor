import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { catalogApi } from '../../api/endpoints';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { formatImageUrl } from '../../utils/imageHelper';
import "../../../css/visualCategory.css";

export default function VisualCategoryCards() {
    const { isRtl, language } = useLanguage();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        catalogApi.getCategories()
            .then(res => {
                const data = Array.isArray(res?.data) ? res.data : res?.data?.data;
                if (data && Array.isArray(data)) {
                    setCategories(data);
                } else {
                    setCategories([]);
                }
            })
            .catch(() => {
                setCategories([]);
            })
            .finally(() => setLoading(false));
    }, []);

    if (!loading && categories.length === 0) {
        return null;
    }

    return (
        <section className="emperor-category-section" style={{ marginBottom: '52px' }}>
            <div className="emperor-category-poster-grid">
                {categories.map((cat, i) => (
                    <EmperorCategoryCard
                        key={cat.id || i}
                        cat={cat}
                        isRtl={isRtl}
                        language={language}
                        index={i}
                    />
                ))}
            </div>
        </section>
    );
}

function getCategoryClassification(cat) {
    const name = (cat?.name || '').toLowerCase();
    const slug = (cat?.slug || '').toLowerCase();

    // Priority 1: Check category name (explicit user naming)
    if (name.includes('لعب') || name.includes('ألعاب') || name.includes('العاب') || name.includes('game') || name.includes('ببجي') || name.includes('pubg')) {
        return 'games';
    }
    if (name.includes('تطبيق') || name.includes('تطبيقات') || name.includes('بث') || name.includes('شات') || name.includes('app') || name.includes('voice')) {
        return 'apps';
    }
    if (name.includes('اتصال') || name.includes('شبك') || name.includes('رصيد') || name.includes('telecom')) {
        return 'telecom';
    }
    if (name.includes('عملات') || name.includes('رقمية') || name.includes('كريبتو') || name.includes('crypto') || name.includes('usdt')) {
        return 'crypto';
    }
    if (name.includes('تارجت') || name.includes('سحب') || name.includes('target')) {
        return 'target';
    }
    if (name.includes('بطاق') || name.includes('كروت') || name.includes('اشتراك') || name.includes('card')) {
        return 'cards';
    }
    if (name.includes('سوشيال') || name.includes('تواصل') || name.includes('social')) {
        return 'social';
    }
    if (name.includes('تصميم') || name.includes('مونتاج') || name.includes('design')) {
        return 'design';
    }
    if (name.includes('تحويل') || name.includes('كاش') || name.includes('مالي') || name.includes('finance')) {
        return 'finance';
    }
    if (name.includes('ذكاء') || name.includes('اصطناع') || name.includes('ai')) {
        return 'ai';
    }
    if (name.includes('تلفاز') || name.includes('شاش') || name.includes('tv')) {
        return 'tv';
    }

    // Priority 2: Fallback to slug if name did not match
    if (slug.includes('game') || slug.includes('لعب')) return 'games';
    if (slug.includes('app') || slug.includes('تطبيق')) return 'apps';
    if (slug.includes('telecom') || slug.includes('اتصال')) return 'telecom';
    if (slug.includes('crypto') || slug.includes('عملات')) return 'crypto';
    if (slug.includes('target') || slug.includes('تارجت')) return 'target';
    if (slug.includes('card') || slug.includes('بطاق')) return 'cards';
    if (slug.includes('social') || slug.includes('سوشيال')) return 'social';
    if (slug.includes('design') || slug.includes('تصميم')) return 'design';
    if (slug.includes('finance') || slug.includes('تحويل')) return 'finance';
    if (slug.includes('ai') || slug.includes('ذكاء')) return 'ai';
    if (slug.includes('tv') || slug.includes('تلفاز')) return 'tv';

    return 'default';
}

function getCategoryDisplayName(cat, language) {
    if (language !== 'en') return cat.name;
    if (cat.name_en) return cat.name_en;
    const catType = getCategoryClassification(cat);

    switch (catType) {
        case 'games': return 'Electronic Games';
        case 'apps': return 'Live & Chat Apps';
        case 'cards': return 'Digital Cards & Subs';
        case 'telecom': return 'Telecom Recharge';
        case 'crypto': return 'Digital Currencies & Crypto';
        case 'social': return 'Social Media';
        case 'design': return 'Design Apps';
        case 'finance': return 'Financial Transfers';
        case 'ai': return 'AI Tools';
        case 'tv': return 'TV & Cinema';
        case 'target': return 'Sell Target';
        default: return cat.name;
    }
}

function getCategorySubLabel(cat, language) {
    if (language === 'en') {
        return 'Instant Delivery & Support';
    }
    const catType = getCategoryClassification(cat);
    switch (catType) {
        case 'games':
            return 'شحن ألعاب وبطاقات فورية';
        case 'apps':
            return 'شحن كوينز وبث مباشر';
        case 'telecom':
            return 'شحن رصيد وباقات إنترنت';
        case 'crypto':
            return 'شحن وتحويلات رقمية فورية';
        case 'cards':
            return 'بطاقات هدايا واشتراكات';
        case 'target':
            return 'سحب واستبدال التارجت';
        case 'social':
            return 'خدمات وتوثيق السوشيال ميديا';
        case 'design':
            return 'اشتراكات برامج التصميم';
        case 'finance':
            return 'خدمات التحويل والمحافظ';
        case 'ai':
            return 'أدوات الذكاء الاصطناعي';
        case 'tv':
            return 'باقات الأفلام والمسلسلات';
        default:
            return 'خدمات وشحن فوري';
    }
}

/**
 * 3D Sculpted Emperor Spartan Arch Crown
 */
function EmperorArchCrest() {
    return (
        <div className="emperor-card-crest">
            <svg viewBox="0 0 140 44" width="96" height="30" fill="none">
                <defs>
                    <linearGradient id="empGoldLustre" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFF9D2" />
                        <stop offset="35%" stopColor="#F5D061" />
                        <stop offset="70%" stopColor="#D4A537" />
                        <stop offset="100%" stopColor="#875F0D" />
                    </linearGradient>
                    <linearGradient id="empCyanHalo" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#A5F3FC" />
                        <stop offset="50%" stopColor="#00E5FF" />
                        <stop offset="100%" stopColor="#0072FF" />
                    </linearGradient>
                    <filter id="empShadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.8" />
                    </filter>
                </defs>

                {/* Left Royal Laurel Leaves */}
                <g filter="url(#empShadow)">
                    <path d="M48 24C42 19 32 19 26 22C30 16 39 16 46 19" fill="url(#empGoldLustre)" />
                    <path d="M46 29C38 27 28 29 22 34C28 26 38 24 45 25" fill="url(#empGoldLustre)" />
                    <path d="M44 17C37 11 25 13 18 17C26 10 38 11 43 14" fill="url(#empGoldLustre)" />
                </g>

                {/* Right Royal Laurel Leaves */}
                <g filter="url(#empShadow)">
                    <path d="M92 24C98 19 108 19 114 22C110 16 101 16 94 19" fill="url(#empGoldLustre)" />
                    <path d="M94 29C102 27 112 29 118 34C112 26 102 24 95 25" fill="url(#empGoldLustre)" />
                    <path d="M96 17C103 11 115 13 122 17C114 10 102 11 97 14" fill="url(#empGoldLustre)" />
                </g>

                {/* Central Spartan Helmet Emblem */}
                <g transform="translate(56, 1)" filter="url(#empShadow)">
                    {/* Glowing Cyan Feather Plume */}
                    <path d="M14 0C10 2 10 7 14 9C18 7 18 2 14 0Z" fill="url(#empCyanHalo)" />
                    {/* Golden Helmet Body */}
                    <path d="M5 9C5 5 23 5 23 9L25 20C25 27 20 31 14 33C8 31 3 27 3 20L5 9Z" fill="url(#empGoldLustre)" />
                    {/* Dark Visor T-Slit */}
                    <path d="M13 12H15V27H13V12Z" fill="#06080D" />
                    <path d="M7 14H21V17H7V14Z" fill="#06080D" />
                    {/* Radiant Cyan Eye Slits */}
                    <circle cx="10" cy="15.5" r="1.5" fill="url(#empCyanHalo)" />
                    <circle cx="18" cy="15.5" r="1.5" fill="url(#empCyanHalo)" />
                </g>

                {/* Imperial Metallic Ribbon Under Helmet */}
                <rect x="48" y="34" width="44" height="9" rx="4.5" fill="#080C14" stroke="url(#empGoldLustre)" strokeWidth="1" />
                <text x="70" y="40.5" textAnchor="middle" fill="url(#empGoldLustre)" fontSize="5.5" fontWeight="900" letterSpacing="1.5" fontFamily="serif">
                    EMPEROR
                </text>
            </svg>
        </div>
    );
}

/**
 * The Emperor Luxury Category Card:
 * Features arched 3D Roman frame, sculpted crest, vibrant center artwork,
 * tiered ribbon plaque, and dynamic auto-expansion
 */
function EmperorCategoryCard({ cat, isRtl, language, index }) {
    const { theme } = useTheme();
    const isLight = theme === 'light';
    const [hovered, setHovered] = useState(false);
    const isTarget = cat.slug === 'target' || cat.slug === 'target-apps' || cat.isTarget;
    const categoryLink = isTarget ? '/target/apps' : `/category/${cat.slug || cat.id}`;
    const displayName = getCategoryDisplayName(cat, language);
    const subLabel = getCategorySubLabel(cat, language);

    // Resolve artwork image
    const rawImg = cat.banner_url || cat.banner || cat.image_url || cat.image || cat.icon_url || cat.icon;
    const formattedImg = formatImageUrl(rawImg);

    let finalImage = formattedImg;
    if (!finalImage) {
        const catType = getCategoryClassification(cat);
        switch (catType) {
            case 'target':
                finalImage = '/images/artwork/cat_target.jpg';
                break;
            case 'apps':
            case 'social':
            case 'telecom':
                finalImage = '/images/artwork/cat_apps.jpg';
                break;
            case 'crypto':
                finalImage = '/images/artwork/cat_target.jpg';
                break;
            case 'games':
            default:
                finalImage = '/images/artwork/cat_games.jpg';
                break;
        }
    }

    return (
        <div className="emperor-category-card-wrapper">
            <Link
                to={categoryLink}
                className={`emperor-royal-category-card ${hovered ? 'is-hovered' : ''} ${isLight ? 'theme-light' : 'theme-dark'}`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                {/* ═══ 1. Outer 3D Sculpted Arch Frame ═══ */}
                <div className="emperor-card-arched-shell">
                    {/* Center Artwork */}
                    <img
                        src={finalImage}
                        alt={cat.name}
                        loading="lazy"
                        className="emperor-card-bg-img"
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = '/images/artwork/cat_games.jpg';
                        }}
                    />

                    {/* Volumetric Radial Light Glow */}
                    <div className="emperor-card-lighting-overlay" />

                    {/* Top Emperor Spartan Laurel Crest */}
                    <EmperorArchCrest />

                    {/* ═══ 2. Bottom Sculpted 3D Gilded Plaque ═══ */}
                    <div className="emperor-bottom-plaque">
                        {/* Upper Arch Ribbon for Title */}
                        <div className="emperor-plaque-ribbon-crest">
                            <span className="emperor-plaque-title">
                                {displayName}
                            </span>
                        </div>

                        {/* Interactive Golden CTA Button */}
                        <div className="emperor-plaque-cta-btn">
                            <span className="cta-text">
                                {language === 'en' ? 'Enter Category' : 'دخول القسم'}
                            </span>
                            {isRtl ? (
                                <ChevronLeft size={13} className="cta-arrow" />
                            ) : (
                                <ChevronRight size={13} className="cta-arrow" />
                            )}
                        </div>

                        {/* Lower Subtitle Ribbon */}
                        <div className="emperor-plaque-subtext">
                            {subLabel}
                        </div>
                    </div>

                    {/* Golden Light Sweep Effect */}
                    <div className="emperor-card-shimmer" />
                </div>
            </Link>

            {/* Clean Outer Label Below Card */}
            <h3 className="emperor-card-footer-title">
                {displayName}
            </h3>
        </div>
    );
}
