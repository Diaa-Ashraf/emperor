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
 * Curated brand medallions with micro-labels for all categories
 */
function getCategoryFlankingBadges(cat) {
    const catType = getCategoryClassification(cat);

    // 1. Electronic Games
    if (catType === 'games') {
        return {
            left: [
                { id: 'pubg', label: 'PUBG', color: '#F59E0B', bg: '#221505', icon: 'pubg' },
                { id: 'freefire', label: 'Free Fire', color: '#EF4444', bg: '#290707', icon: 'freefire' },
                { id: 'roblox', label: 'Roblox', color: '#00D2FF', bg: '#041724', icon: 'roblox' },
                { id: 'cod', label: 'COD', color: '#10B981', bg: '#051D12', icon: 'cod' },
            ],
            right: [
                { id: 'brawl', label: 'Brawl Stars', color: '#FBBF24', bg: '#231A05', icon: 'brawl' },
                { id: 'valorant', label: 'Valorant', color: '#F43F5E', bg: '#25070E', icon: 'valorant' },
                { id: 'fortnite', label: 'Fortnite', color: '#A855F7', bg: '#1C082E', icon: 'fortnite' },
                { id: 'minecraft', label: 'Minecraft', color: '#22C55E', bg: '#082512', icon: 'minecraft' },
            ]
        };
    }

    // 2. Live & Voice Apps
    if (catType === 'apps') {
        return {
            left: [
                { id: 'tiktok', label: 'TikTok', color: '#00F2FE', bg: '#050D14', icon: 'tiktok' },
                { id: 'bigo', label: 'Bigo Live', color: '#00D2FF', bg: '#051928', icon: 'bigo' },
                { id: 'poppo', label: 'Poppo Live', color: '#EC4899', bg: '#260818', icon: 'poppo' },
                { id: 'likee', label: 'Likee', color: '#F43F5E', bg: '#250711', icon: 'likee' },
            ],
            right: [
                { id: 'chamet', label: 'Chamet', color: '#A855F7', bg: '#1C082E', icon: 'chamet' },
                { id: 'olla', label: 'Olla / Soul', color: '#38BDF8', bg: '#081D29', icon: 'olla' },
                { id: 'starmaker', label: 'StarMaker', color: '#F59E0B', bg: '#221605', icon: 'star' },
                { id: 'yoho', label: 'YoHo', color: '#10B981', bg: '#051D12', icon: 'mic' },
            ]
        };
    }

    // 3. Telecom Recharge
    if (catType === 'telecom') {
        return {
            left: [
                { id: 'vf', label: 'فودافون', color: '#E60000', bg: '#2B0000', icon: 'vodafone' },
                { id: 'org', label: 'أورنج', color: '#FF7900', bg: '#2B1400', icon: 'orange' },
                { id: 'et', label: 'اتصالات', color: '#78BE20', bg: '#132403', icon: 'etisalat' },
                { id: 'we', label: 'وي WE', color: '#5A2D82', bg: '#1C082D', icon: 'we' },
            ],
            right: [
                { id: 'ip', label: 'إنستاباي', color: '#A855F7', bg: '#1F0A33', icon: 'instapay' },
                { id: 'faw', label: 'فوري', color: '#FACC15', bg: '#221D04', icon: 'fawry' },
                { id: 'aman', label: 'أمان', color: '#38BDF8', bg: '#061D2B', icon: 'shield' },
                { id: 'card', label: 'كروت شحن', color: '#10B981', bg: '#051E12', icon: 'bolt' },
            ]
        };
    }

    // 4. Digital Currencies & Crypto
    if (catType === 'crypto') {
        return {
            left: [
                { id: 'usdt', label: 'USDT', color: '#26A17B', bg: '#052219', icon: 'usdt' },
                { id: 'binance', label: 'Binance', color: '#F3BA2F', bg: '#251D04', icon: 'crown' },
                { id: 'btc', label: 'Bitcoin', color: '#F7931A', bg: '#261603', icon: 'star' },
                { id: 'bolt', label: 'فوري', color: '#00D2FF', bg: '#051928', icon: 'bolt' },
            ],
            right: [
                { id: 'wallet', label: 'محافظ', color: '#A855F7', bg: '#1C082E', icon: 'card' },
                { id: 'fast', label: 'سحب سريع', color: '#10B981', bg: '#052012', icon: 'shield' },
                { id: 'support', label: 'دعم 24/7', color: '#38BDF8', bg: '#061D2B', icon: 'headset' },
                { id: 'guarantee', label: 'ضمان 100%', color: '#22C55E', bg: '#052210', icon: 'shield' },
            ]
        };
    }

    // 5. Social Media
    if (catType === 'social') {
        return {
            left: [
                { id: 'tiktok', label: 'TikTok', color: '#00F2FE', bg: '#050D14', icon: 'tiktok' },
                { id: 'insta', label: 'Instagram', color: '#E1306C', bg: '#260613', icon: 'instagram' },
                { id: 'fb', label: 'Facebook', color: '#1877F2', bg: '#061730', icon: 'facebook' },
                { id: 'tg', label: 'Telegram', color: '#2AABEE', bg: '#071F2C', icon: 'telegram' },
            ],
            right: [
                { id: 'snap', label: 'Snapchat', color: '#FFFC00', bg: '#262602', icon: 'snapchat' },
                { id: 'yt', label: 'YouTube', color: '#FF0000', bg: '#2B0404', icon: 'youtube' },
                { id: 'x', label: 'Twitter', color: '#FFFFFF', bg: '#1A1A1A', icon: 'x' },
                { id: 'discord', label: 'Discord', color: '#5865F2', bg: '#0F122B', icon: 'discord' },
            ]
        };
    }

    // 6. Design Apps
    if (catType === 'design') {
        return {
            left: [
                { id: 'ps', label: 'Photoshop', color: '#31A8FF', bg: '#071B2B', icon: 'ps' },
                { id: 'ai', label: 'Illustrator', color: '#FF9A00', bg: '#2A1702', icon: 'ai_app' },
                { id: 'canva', label: 'Canva', color: '#00C4CC', bg: '#031E20', icon: 'canva' },
                { id: 'pr', label: 'Premiere', color: '#EA77FF', bg: '#250B29', icon: 'pr' },
            ],
            right: [
                { id: 'ae', label: 'After Effects', color: '#9999FF', bg: '#121229', icon: 'ae' },
                { id: 'capcut', label: 'CapCut', color: '#FFFFFF', bg: '#1A1A1A', icon: 'capcut' },
                { id: 'figma', label: 'Figma', color: '#F24E1E', bg: '#260D06', icon: 'figma' },
                { id: 'vn', label: 'VN Video', color: '#38BDF8', bg: '#071E2B', icon: 'vn' },
            ]
        };
    }

    // 7. Financial Transfers
    if (catType === 'finance') {
        return {
            left: [
                { id: 'vfcash', label: 'فودافون كاش', color: '#E60000', bg: '#2B0000', icon: 'vodafone' },
                { id: 'instapay', label: 'إنستاباي', color: '#A855F7', bg: '#1F0A33', icon: 'instapay' },
                { id: 'etcash', label: 'اتصالات كاش', color: '#78BE20', bg: '#132403', icon: 'etisalat' },
                { id: 'orgcash', label: 'أورنج كاش', color: '#FF7900', bg: '#2B1400', icon: 'orange' },
            ],
            right: [
                { id: 'wepay', label: 'وي باي', color: '#5A2D82', bg: '#1C082D', icon: 'we' },
                { id: 'usdt', label: 'USDT', color: '#26A17B', bg: '#052219', icon: 'usdt' },
                { id: 'fawry', label: 'فوري باي', color: '#FACC15', bg: '#221D04', icon: 'fawry' },
                { id: 'bank', label: 'تحويل بنكي', color: '#38BDF8', bg: '#061D2B', icon: 'bank' },
            ]
        };
    }

    // 8. AI Tools
    if (catType === 'ai') {
        return {
            left: [
                { id: 'chatgpt', label: 'ChatGPT', color: '#10A37F', bg: '#041E17', icon: 'chatgpt' },
                { id: 'claude', label: 'Claude', color: '#D97706', bg: '#241403', icon: 'claude' },
                { id: 'midjourney', label: 'Midjourney', color: '#FFFFFF', bg: '#1C1C1E', icon: 'midjourney' },
                { id: 'dalle', label: 'DALL-E', color: '#EC4899', bg: '#260818', icon: 'sparkle' },
            ],
            right: [
                { id: 'perplexity', label: 'Perplexity', color: '#22D3EE', bg: '#041F24', icon: 'perplexity' },
                { id: 'canvaai', label: 'Canva AI', color: '#00C4CC', bg: '#031E20', icon: 'canva' },
                { id: 'notion', label: 'Notion AI', color: '#FFFFFF', bg: '#1A1A1A', icon: 'notion' },
                { id: 'runway', label: 'Runway ML', color: '#A855F7', bg: '#1B082E', icon: 'bolt' },
            ]
        };
    }

    // 9. TV & Streaming
    if (catType === 'tv') {
        return {
            left: [
                { id: 'netflix', label: 'Netflix', color: '#E50914', bg: '#270507', icon: 'netflix' },
                { id: 'shahid', label: 'شاهد VIP', color: '#22C55E', bg: '#052210', icon: 'shahid' },
                { id: 'bein', label: 'beIN', color: '#5B21B6', bg: '#180733', icon: 'bein' },
                { id: 'osn', label: 'OSN+', color: '#EF4444', bg: '#260707', icon: 'osn' },
            ],
            right: [
                { id: 'starz', label: 'StarzPlay', color: '#F59E0B', bg: '#221505', icon: 'star' },
                { id: 'apple', label: 'Apple TV', color: '#FFFFFF', bg: '#1C1C1E', icon: 'apple' },
                { id: 'prime', label: 'Prime Video', color: '#00A8E1', bg: '#031B24', icon: 'prime_video' },
                { id: 'disney', label: 'Disney+', color: '#3B82F6', bg: '#061730', icon: 'disney' },
            ]
        };
    }

    // 10. Digital Cards & Subscriptions
    if (catType === 'cards') {
        return {
            left: [
                { id: 'ps', label: 'PlayStation', color: '#0070D1', bg: '#001D38', icon: 'playstation' },
                { id: 'xbox', label: 'Xbox', color: '#107C10', bg: '#052A05', icon: 'xbox' },
                { id: 'steam', label: 'Steam', color: '#66C0F4', bg: '#0C1B2A', icon: 'steam' },
                { id: 'razer', label: 'Razer Gold', color: '#22C55E', bg: '#052210', icon: 'bolt' },
            ],
            right: [
                { id: 'apple', label: 'iTunes', color: '#F8FAFC', bg: '#1E293B', icon: 'apple' },
                { id: 'google', label: 'Google Play', color: '#34A853', bg: '#092411', icon: 'google' },
                { id: 'netflix', label: 'Netflix', color: '#E50914', bg: '#270507', icon: 'netflix' },
                { id: 'spotify', label: 'Spotify', color: '#1ED760', bg: '#04240F', icon: 'music' },
            ]
        };
    }

    // 11. Target Selling
    if (catType === 'target') {
        return {
            left: [
                { id: 'bigo', label: 'Bigo Live', color: '#00D2FF', bg: '#051928', icon: 'bigo' },
                { id: 'poppo', label: 'Poppo Live', color: '#EC4899', bg: '#260818', icon: 'poppo' },
                { id: 'usdt', label: 'USDT', color: '#26A17B', bg: '#052219', icon: 'usdt' },
                { id: 'vf', label: 'فودافون كاش', color: '#E60000', bg: '#2B0000', icon: 'vodafone' },
            ],
            right: [
                { id: 'likee', label: 'Likee Target', color: '#F43F5E', bg: '#250711', icon: 'likee' },
                { id: 'chamet', label: 'Chamet Live', color: '#A855F7', bg: '#1C082E', icon: 'chamet' },
                { id: 'instapay', label: 'إنستاباي', color: '#A855F7', bg: '#1F0A33', icon: 'instapay' },
                { id: 'dollar', label: 'سحب أرباح', color: '#F5D061', bg: '#201804', icon: 'dollar' },
            ]
        };
    }

    // Default Fallback
    return {
        left: [
            { id: 'crown', label: 'VIP', color: '#F5D061', bg: '#1E1604', icon: 'crown' },
            { id: 'bolt', label: 'فوري', color: '#00D2FF', bg: '#051928', icon: 'bolt' },
            { id: 'shield', label: 'معتمد', color: '#10B981', bg: '#062013', icon: 'shield' },
            { id: 'star', label: 'الأفضل', color: '#F5D061', bg: '#1E1604', icon: 'star' },
        ],
        right: [
            { id: 'card', label: 'أكواد', color: '#38BDF8', bg: '#071F2E', icon: 'card' },
            { id: 'sparkle', label: 'عروض', color: '#EC4899', bg: '#250716', icon: 'sparkle' },
            { id: 'support', label: 'دعم 24/7', color: '#A855F7', bg: '#1D0830', icon: 'headset' },
            { id: 'check', label: 'ضمان', color: '#22C55E', bg: '#052210', icon: 'shield' },
        ]
    };
}

/**
 * Micro Brand Vector Glyph for Emperor Medallions
 */
function BrandGlyph({ icon, color }) {
    switch (icon) {
        case 'pubg':
            return (
                <svg viewBox="0 0 24 24" width="12" height="12" fill={color}>
                    <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 4a3 3 0 110 6 3 3 0 010-6zm-4 10.5c.37-2.12 2.05-3.5 4-3.5s3.63 1.38 4 3.5H8z"/>
                </svg>
            );
        case 'freefire':
            return (
                <svg viewBox="0 0 24 24" width="12" height="12" fill={color}>
                    <path d="M12 2.24c-.4.5-4 5.35-4 8.76a4 4 0 008 0c0-3.41-3.6-8.26-4-8.76zm0 15.76a2 2 0 01-2-2c0-1.4 1.5-3.6 2-4.2.5.6 2 2.8 2 4.2a2 2 0 01-2 2z"/>
                </svg>
            );
        case 'roblox':
            return (
                <svg viewBox="0 0 24 24" width="11" height="11" fill={color}>
                    <path d="M5.34 2L2 18.66 18.66 22 22 5.34 5.34 2zm8.44 11.22l-2.78-.56.56-2.78 2.78.56-.56 2.78z"/>
                </svg>
            );
        case 'cod':
            return (
                <svg viewBox="0 0 24 24" width="12" height="12" fill={color}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
            );
        case 'brawl':
            return (
                <svg viewBox="0 0 24 24" width="12" height="12" fill={color}>
                    <path d="M12 2a5 5 0 00-5 5v3a5 5 0 0010 0V7a5 5 0 00-5-5zm-3 8a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm-7 5h8v2H8v-2z"/>
                </svg>
            );
        case 'valorant':
            return (
                <svg viewBox="0 0 24 24" width="11" height="11" fill={color}>
                    <path d="M2.5 4h8L6.5 20h-4L2.5 4zm19 0l-9 16h4.5l6.5-12V4h-2z"/>
                </svg>
            );
        case 'fortnite':
            return (
                <text x="12" y="16" textAnchor="middle" fill={color} fontSize="11" fontWeight="900" fontFamily="sans-serif">
                    F
                </text>
            );
        case 'minecraft':
            return (
                <rect x="5" y="5" width="14" height="14" rx="2" fill={color} />
            );
        case 'tiktok':
            return (
                <svg viewBox="0 0 24 24" width="12" height="12" fill={color}>
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.29 0 .58.04.86.12V9.4a6.33 6.33 0 00-.86-.06A6.34 6.34 0 003.1 15.68a6.34 6.34 0 008.34 6.03 6.3 6.3 0 004.38-6.03V8.82a8.28 8.28 0 004.77 1.49v-3.45a4.83 4.83 0 01-1-.17z"/>
                </svg>
            );
        case 'instagram':
            return (
                <svg viewBox="0 0 24 24" width="12" height="12" fill={color}>
                    <rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke={color} strokeWidth="2" />
                    <circle cx="12" cy="12" r="4" fill="none" stroke={color} strokeWidth="2" />
                    <circle cx="18" cy="6" r="1.2" fill={color} />
                </svg>
            );
        case 'facebook':
            return (
                <svg viewBox="0 0 24 24" width="12" height="12" fill={color}>
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
            );
        case 'telegram':
            return (
                <svg viewBox="0 0 24 24" width="12" height="12" fill={color}>
                    <path d="M21.5 2.5L2 10.5l5.5 2 2 6 3-3.5 5 4zM9 13.5l8-8-6.5 7.5-.5 3z"/>
                </svg>
            );
        case 'snapchat':
            return (
                <svg viewBox="0 0 24 24" width="12" height="12" fill={color}>
                    <path d="M12 2C8 2 6 5 6 7c0 2 1 3 1 4 0 1-2 1-2 2 0 1 2 1 3 2 1 1 2 3 4 3s3-2 4-3c1-1 3-1 3-2 0-1-2-1-2-2 0-1 1-2 1-4 0-2-2-5-6-5z"/>
                </svg>
            );
        case 'youtube':
            return (
                <svg viewBox="0 0 24 24" width="12" height="12" fill={color}>
                    <path d="M21.58 7.19a2.5 2.5 0 00-1.76-1.77C18.26 5 12 5 12 5s-6.26 0-7.82.42A2.5 2.5 0 002.42 7.2C2 8.76 2 12 2 12s0 3.24.42 4.8a2.5 2.5 0 001.76 1.77C5.74 19 12 19 12 19s6.26 0 7.82-.43a2.5 2.5 0 001.76-1.77C22 15.24 22 12 22 12s0-3.24-.42-4.81zM10 15V9l5.2 3L10 15z"/>
                </svg>
            );
        case 'x':
            return (
                <svg viewBox="0 0 24 24" width="11" height="11" fill={color}>
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
            );
        case 'discord':
            return (
                <svg viewBox="0 0 24 24" width="12" height="12" fill={color}>
                    <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 00-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 00-4.8 0c-.14-.34-.35-.76-.54-1.09-.01-.02-.04-.03-.07-.03-1.5.26-2.93.71-4.27 1.33-.01 0-.02.01-.03.02-2.72 4.07-3.47 8.03-3.1 11.95 0 .02.01.04.03.05 1.8 1.32 3.53 2.12 5.24 2.65.03.01.06 0 .07-.02.4-.55.76-1.13 1.07-1.74.02-.04 0-.08-.04-.09-.57-.22-1.11-.48-1.64-.78-.04-.02-.04-.08-.01-.11.11-.08.22-.17.33-.25.02-.02.05-.02.07-.01 3.44 1.57 7.15 1.57 10.55 0 .02-.01.05-.01.07.01.11.09.22.17.33.26.04.03.03.09-.01.11-.52.31-1.07.56-1.64.78-.04.01-.05.06-.04.09.32.61.68 1.19 1.07 1.74.02.02.05.03.08.02 1.72-.53 3.45-1.33 5.25-2.65.02-.01.03-.03.03-.05.44-4.53-.73-8.46-3.1-11.95-.01-.01-.02-.02-.03-.02z"/>
                </svg>
            );
        case 'bigo':
            return (
                <svg viewBox="0 0 24 24" width="12" height="12" fill={color}>
                    <path d="M12 3a9 9 0 109 9 9 9 0 00-9-9zm0 5a4 4 0 11-4 4 4 4 0 014-4zm0 6a2 2 0 10-2-2 2 2 0 002 2z"/>
                </svg>
            );
        case 'poppo':
            return (
                <svg viewBox="0 0 24 24" width="12" height="12" fill={color}>
                    <path d="M12 2l2.4 7.2h7.6l-6.1 4.5 2.3 7.3-6.2-4.5-6.2 4.5 2.3-7.3-6.1-4.5h7.6L12 2z"/>
                </svg>
            );
        case 'likee':
            return (
                <svg viewBox="0 0 24 24" width="11" height="11" fill={color}>
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
            );
        case 'chamet':
            return (
                <svg viewBox="0 0 24 24" width="12" height="12" fill={color}>
                    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                </svg>
            );
        case 'ps':
            return (
                <text x="12" y="15" textAnchor="middle" fill={color} fontSize="9" fontWeight="900" fontFamily="sans-serif">
                    Ps
                </text>
            );
        case 'ai_app':
            return (
                <text x="12" y="15" textAnchor="middle" fill={color} fontSize="9" fontWeight="900" fontFamily="sans-serif">
                    Ai
                </text>
            );
        case 'canva':
            return (
                <circle cx="12" cy="12" r="6" fill={color} />
            );
        case 'pr':
            return (
                <text x="12" y="15" textAnchor="middle" fill={color} fontSize="9" fontWeight="900" fontFamily="sans-serif">
                    Pr
                </text>
            );
        case 'ae':
            return (
                <text x="12" y="15" textAnchor="middle" fill={color} fontSize="9" fontWeight="900" fontFamily="sans-serif">
                    Ae
                </text>
            );
        case 'figma':
            return (
                <circle cx="12" cy="12" r="5" fill={color} />
            );
        case 'chatgpt':
            return (
                <svg viewBox="0 0 24 24" width="12" height="12" fill={color}>
                    <circle cx="12" cy="12" r="7" fill="none" stroke={color} strokeWidth="2.5" />
                    <circle cx="12" cy="12" r="2.5" fill={color} />
                </svg>
            );
        case 'claude':
            return (
                <text x="12" y="15" textAnchor="middle" fill={color} fontSize="10" fontWeight="900" fontFamily="serif">
                    C
                </text>
            );
        case 'midjourney':
            return (
                <svg viewBox="0 0 24 24" width="12" height="12" fill={color}>
                    <path d="M12 2L6 12l6 10 6-10L12 2z"/>
                </svg>
            );
        case 'netflix':
            return (
                <svg viewBox="0 0 24 24" width="11" height="11" fill={color}>
                    <path d="M5 2h3.5l7 14V2H19v20h-3.5L8.5 8V22H5V2z"/>
                </svg>
            );
        case 'shahid':
            return (
                <text x="12" y="15" textAnchor="middle" fill={color} fontSize="9" fontWeight="900" fontFamily="sans-serif">
                    SH
                </text>
            );
        case 'playstation':
            return (
                <svg viewBox="0 0 24 24" width="12" height="12" fill={color}>
                    <path d="M8.5 4v10.5l-3.5-1.2v-7.8l3.5-1.5zm11.5 8.3l-6-2.1v4.8l3.5 1.2c1.7.6 2.5-.2 2.5-1.9v-2zm-7.5-6.8l3.5-1.2v6.6l-3.5-1.2V5.5z"/>
                </svg>
            );
        case 'xbox':
            return (
                <svg viewBox="0 0 24 24" width="12" height="12" fill={color}>
                    <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm3.8 3.5c1.6 1.4 2.7 3.2 3.1 5.2-1.2-.8-2.6-1.5-4.2-1.9 1.4-1.3 1.9-2.6 1.1-3.3zm-7.6 0c-.8.7-.3 2 1.1 3.3-1.6.4-3 1.1-4.2 1.9.4-2 1.5-3.8 3.1-5.2zM12 18.5a7.5 7.5 0 01-5-2c1.6-1.7 3.4-3.5 5-5 1.6 1.5 3.4 3.3 5 5a7.5 7.5 0 01-5 2z"/>
                </svg>
            );
        case 'steam':
            return (
                <svg viewBox="0 0 24 24" width="12" height="12" fill={color}>
                    <path d="M12 2a10 10 0 00-10 9.7l5.6 2.3a3.5 3.5 0 002.4-.4l2.8 4a3.5 3.5 0 102.7-2.6l-2.6-3.8A3.5 3.5 0 0015.5 8 3.5 3.5 0 1012 11.5v.5l-3.4-1.4A10 10 0 0012 2z"/>
                </svg>
            );
        case 'apple':
            return (
                <svg viewBox="0 0 24 24" width="11" height="11" fill={color}>
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.78 1.06-1.85.94-2.93-.93.04-2.02.63-2.66 1.4-.56.65-1.06 1.74-.93 2.8.02.01 1.02.08 2.65-1.27z"/>
                </svg>
            );
        case 'google':
            return (
                <svg viewBox="0 0 24 24" width="11" height="11" fill={color}>
                    <path d="M3 20.5v-17l14 8.5L3 20.5zm2-14.2v11.4L13.7 12 5 6.3z"/>
                </svg>
            );
        case 'vodafone':
            return (
                <svg viewBox="0 0 24 24" width="12" height="12" fill={color}>
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 3.66 1.97 6.86 4.9 8.61L8.5 17.5C6.96 16.27 6 14.25 6 12c0-3.31 2.69-6 6-6s6 2.69 6 6c0 2.25-.96 4.27-2.5 5.5l1.6 3.11C20.03 18.86 22 15.66 22 12c0-5.52-4.48-10-10-10z"/>
                </svg>
            );
        case 'orange':
            return (
                <rect x="4" y="4" width="16" height="16" rx="3" fill={color} />
            );
        case 'etisalat':
            return (
                <svg viewBox="0 0 24 24" width="12" height="12" fill={color}>
                    <circle cx="12" cy="12" r="7" fill="none" stroke={color} strokeWidth="3" />
                    <circle cx="12" cy="12" r="2.5" fill={color} />
                </svg>
            );
        case 'we':
            return (
                <svg viewBox="0 0 24 24" width="12" height="12" fill={color}>
                    <circle cx="12" cy="12" r="7" fill="none" stroke={color} strokeWidth="3" />
                </svg>
            );
        case 'instapay':
            return (
                <text x="12" y="15" textAnchor="middle" fill={color} fontSize="9" fontWeight="900" fontFamily="sans-serif">
                    IP
                </text>
            );
        case 'fawry':
            return (
                <svg viewBox="0 0 24 24" width="12" height="12" fill={color}>
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
            );
        case 'usdt':
            return (
                <svg viewBox="0 0 24 24" width="12" height="12" fill={color}>
                    <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm1 6.5h3v2h-3v1.8c2.4.2 4.2.9 4.2 1.7 0 1-2.2 1.8-5.2 1.8s-5.2-.8-5.2-1.8c0-.8 1.8-1.5 4.2-1.7V10.5H8v-2h3V6h2v2.5z"/>
                </svg>
            );
        case 'uc':
            return (
                <text x="12" y="15" textAnchor="middle" fill={color} fontSize="9" fontWeight="900" fontFamily="sans-serif">
                    UC
                </text>
            );
        default:
            return (
                <svg viewBox="0 0 24 24" width="11" height="11" fill={color}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
            );
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
 * Features arched 3D Roman frame, flanking gold coin medallions with micro-labels,
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

    const flankingBadges = getCategoryFlankingBadges(cat);

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

                    {/* ═══ 2. Left Side Medallions with Micro-Labels ═══ */}
                    <div className="emperor-side-rail emperor-rail-left">
                        {flankingBadges.left.map((badge, bIdx) => (
                            <div
                                key={badge.id || bIdx}
                                className={`emperor-side-item ${bIdx >= 2 ? 'emperor-badge-desktop-only' : ''}`}
                            >
                                <div
                                    className="emperor-side-badge"
                                    style={{
                                        '--badge-color': badge.color,
                                        '--badge-bg': badge.bg,
                                    }}
                                >
                                    <BrandGlyph icon={badge.icon} color={badge.color} />
                                </div>
                                <span className="emperor-side-badge-label" title={badge.label}>
                                    {badge.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* ═══ 3. Right Side Medallions with Micro-Labels ═══ */}
                    <div className="emperor-side-rail emperor-rail-right">
                        {flankingBadges.right.map((badge, bIdx) => (
                            <div
                                key={badge.id || bIdx}
                                className={`emperor-side-item ${bIdx >= 2 ? 'emperor-badge-desktop-only' : ''}`}
                            >
                                <div
                                    className="emperor-side-badge"
                                    style={{
                                        '--badge-color': badge.color,
                                        '--badge-bg': badge.bg,
                                    }}
                                >
                                    <BrandGlyph icon={badge.icon} color={badge.color} />
                                </div>
                                <span className="emperor-side-badge-label" title={badge.label}>
                                    {badge.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* ═══ 4. Bottom Sculpted 3D Gilded Plaque ═══ */}
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

                        {/* Lower Subtitle Ribbon (Matches Benchmark) */}
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
