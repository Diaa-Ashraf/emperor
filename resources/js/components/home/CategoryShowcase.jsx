import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Landmark, Smartphone, Coins, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { formatImageUrl } from '../../utils/imageHelper';

export default function CategoryShowcase({ categories = [], products = [] }) {
    const { isRtl, language, t } = useLanguage();

    // Map categories with their associated products and custom icon/descriptions
    const getCategoryMeta = (cat) => {
        const name = (cat.name || '').toLowerCase();
        const slug = (cat.slug || '').toLowerCase();

        if (name.includes('مالي') || name.includes('تحويل') || slug.includes('finance') || name.includes('كاش')) {
            return {
                icon: Landmark,
                desc: 'إرسال واستقبال الأموال وبطاقات الدفع بسهولة وأمان',
                cta: 'تصفح التحويلات المالية',
                link: `/category/${cat.slug || cat.id}`
            };
        }
        if (name.includes('لعب') || name.includes('ألعاب') || slug.includes('game') || name.includes('game')) {
            return {
                icon: Gamepad2,
                desc: 'اشحن حساباتك فوراً بأفضل الأسعار وأسرع تنفيذ',
                cta: 'تصفح الألعاب',
                link: `/category/${cat.slug || cat.id}`
            };
        }
        if (name.includes('تطبيق') || slug.includes('app') || name.includes('شات') || name.includes('voice')) {
            return {
                icon: Smartphone,
                desc: 'شحن كوينز وبرامج البث المباشر فوراً',
                cta: 'تصفح التطبيقات',
                link: `/category/${cat.slug || cat.id}`
            };
        }
        if (name.includes('تارجت') || slug.includes('target')) {
            return {
                icon: Coins,
                desc: 'سحب واستبدال كوينز التارجت إلى كاش فوري',
                cta: 'سحب التارجت الآن',
                link: '/target/apps'
            };
        }

        return {
            icon: Sparkles,
            desc: 'خدمات وباقات فورية متميزة',
            cta: 'تصفح القسم',
            link: `/category/${cat.slug || cat.id}`
        };
    };

    if (!categories || categories.length === 0) {
        return null;
    }

    return (
        <section className="emperor-showcase-grid">
            {categories.map((cat) => {
                const meta = getCategoryMeta(cat);
                const Icon = meta.icon;
                
                // Get sample products for this category
                const catProducts = products
                    .filter(p => p.category_id === cat.id || (p.category && p.category.id === cat.id))
                    .slice(0, 6);

                return (
                    <div key={cat.id} className="emperor-showcase-card">
                        <div className="emperor-showcase-card-inner">
                            {/* Header Details */}
                            <div className="emperor-showcase-header">
                                <div className="emperor-showcase-title-group">
                                    <h3 className="emperor-showcase-title">
                                        <Icon size={24} color="#F5D061" />
                                        <span>{cat.name}</span>
                                    </h3>
                                    <p className="emperor-showcase-desc">{cat.description || meta.desc}</p>
                                </div>
                                <div className="emperor-showcase-icon-badge">
                                    <Icon size={24} />
                                </div>
                            </div>

                            {/* Visual sample products / logos row */}
                            {catProducts.length > 0 && (
                                <div className="emperor-showcase-items-row">
                                    {catProducts.map((p) => {
                                        const img = formatImageUrl(p.image_url || p.image);
                                        return (
                                            <div key={p.id} className="emperor-showcase-mini-item" title={p.name}>
                                                {img ? (
                                                    <img
                                                        src={img}
                                                        alt={p.name}
                                                        onError={(e) => {
                                                            e.currentTarget.onerror = null;
                                                            e.currentTarget.src = '/images/mohra_sand_logo.png';
                                                        }}
                                                    />
                                                ) : (
                                                    <Icon size={20} color="#F5D061" />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Call to action button */}
                            <Link to={meta.link} className="emperor-showcase-cta">
                                <span>{meta.cta}</span>
                                {isRtl ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                            </Link>
                        </div>
                    </div>
                );
            })}
        </section>
    );
}

