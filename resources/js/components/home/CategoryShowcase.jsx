import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Landmark, Smartphone, Coins, Sparkles } from 'lucide-react';
import { formatImageUrl } from '../../utils/imageHelper';

export default function CategoryShowcase({ categories = [] }) {
    const getCategoryMeta = (cat) => {
        const name = (cat.name || '').toLowerCase();
        const slug = (cat.slug || '').toLowerCase();

        if (name.includes('مالي') || name.includes('تحويل') || slug.includes('finance') || name.includes('كاش')) {
            return { icon: Landmark, link: `/category/${cat.slug || cat.id}` };
        }
        if (name.includes('لعب') || name.includes('ألعاب') || slug.includes('game') || name.includes('game')) {
            return { icon: Gamepad2, link: `/category/${cat.slug || cat.id}` };
        }
        if (name.includes('تطبيق') || slug.includes('app') || name.includes('شات') || name.includes('voice')) {
            return { icon: Smartphone, link: `/category/${cat.slug || cat.id}` };
        }
        if (name.includes('تارجت') || slug.includes('target')) {
            return { icon: Coins, link: '/target/apps' };
        }

        return { icon: Sparkles, link: `/category/${cat.slug || cat.id}` };
    };

    if (!categories.length) return null;

    return (
        <section className="emperor-showcase-grid" aria-label="أقسام المتجر">
            {categories.map((category) => {
                const { icon: Icon, link } = getCategoryMeta(category);
                const image = formatImageUrl(category.icon_url || category.icon || category.banner_url || category.banner);

                return (
                    <Link
                        key={category.id}
                        to={link}
                        className="emperor-showcase-card"
                        aria-label={`تصفح قسم ${category.name}`}
                    >
                        <div className="emperor-showcase-card-inner emperor-showcase-category-tile">
                            <div className="emperor-showcase-image-badge" title={category.name}>
                                {image ? (
                                    <img
                                        src={image}
                                        alt={category.name}
                                        className="emperor-showcase-cat-img"
                                        loading="lazy"
                                        decoding="async"
                                        onError={(event) => {
                                            event.currentTarget.style.display = 'none';
                                            const fallback = event.currentTarget.parentElement?.querySelector('.emperor-showcase-fallback-icon');
                                            if (fallback) fallback.style.display = 'flex';
                                        }}
                                    />
                                ) : null}
                                <div className="emperor-showcase-fallback-icon" style={{ display: image ? 'none' : 'flex' }}>
                                    <Icon size={32} color="#F5D061" />
                                </div>
                            </div>
                            <h3 className="emperor-showcase-title">{category.name}</h3>
                        </div>
                    </Link>
                );
            })}
        </section>
    );
}
