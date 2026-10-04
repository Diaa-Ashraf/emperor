import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { catalogApi } from '../../api/endpoints';
import { useLanguage } from '../../contexts/LanguageContext';
import { formatImageUrl } from '../../utils/imageHelper';
import "../../../css/visualCategory.css";

export default function VisualCategoryCards() {
    const { isRtl } = useLanguage();
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
        <div style={{ marginBottom: '44px' }}>
            <div className="emperor-category-poster-grid">
                {categories.map((cat, i) => (
                    <CategoryPosterCard key={cat.id || i} cat={cat} isRtl={isRtl} index={i} />
                ))}
            </div>
        </div>
    );
}

function CategoryPosterCard({ cat, isRtl, index }) {
    const [hovered, setHovered] = useState(false);
    const isTarget = cat.slug === 'target' || cat.slug === 'target-apps' || cat.isTarget;
    const categoryLink = isTarget ? '/target/apps' : `/category/${cat.slug || cat.id}`;

    // Resolve artwork image with high-definition defaults
    const rawImg = cat.banner_url || cat.banner || cat.image_url || cat.image || cat.icon_url || cat.icon;
    const formattedImg = formatImageUrl(rawImg);

    let finalImage = formattedImg;
    if (!finalImage) {
        const s = (cat.slug || cat.name || '').toLowerCase();
        if (s.includes('target') || s.includes('تارجت') || s.includes('سحب')) {
            finalImage = '/images/artwork/cat_target.jpg';
        } else if (s.includes('app') || s.includes('تطبيق') || s.includes('بث') || s.includes('شات') || s.includes('voice')) {
            finalImage = '/images/artwork/cat_apps.jpg';
        } else {
            finalImage = '/images/artwork/cat_games.jpg';
        }
    }

    return (
        <Link
            to={categoryLink}
            style={{
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* ── Square Full-Bleed Poster Card Frame ── */}
            <div
                className="category-poster-frame"
                style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '1 / 1',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    background: '#0B0B0F',
                    border: `1.8px solid ${hovered ? '#F5D061' : 'rgba(212, 165, 55, 0.4)'}`,
                    boxShadow: hovered
                        ? '0 16px 40px rgba(0, 0, 0, 0.9), 0 0 30px rgba(212, 165, 55, 0.35)'
                        : '0 8px 24px rgba(0, 0, 0, 0.65), 0 0 15px rgba(212, 165, 55, 0.1)',
                    transform: hovered ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
            >
                <img
                    src={finalImage}
                    alt={cat.name}
                    loading="lazy"
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/images/artwork/cat_games.jpg';
                    }}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        display: 'block',
                        transform: hovered ? 'scale(1.06)' : 'scale(1)',
                        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                />

                {/* Subtle Luxury Shimmer Glow on hover */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: hovered
                            ? 'linear-gradient(180deg, rgba(245, 208, 97, 0.12) 0%, transparent 40%, rgba(0,0,0,0.4) 100%)'
                            : 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.3) 100%)',
                        pointerEvents: 'none',
                        transition: 'all 0.3s ease',
                    }}
                />
            </div>

            {/* ── Category Name Below Poster (Matches Screenshot) ── */}
            <h3
                style={{
                    margin: '14px 0 0',
                    fontSize: 'clamp(15px, 2vw, 17px)',
                    fontWeight: '800',
                    color: hovered ? '#F5D061' : '#FFFFFF',
                    textAlign: 'center',
                    lineHeight: '1.4',
                    letterSpacing: '-0.2px',
                    transition: 'color 0.25s ease, transform 0.25s ease',
                    transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
                }}
            >
                {cat.name}
            </h3>
        </Link>
    );
}
