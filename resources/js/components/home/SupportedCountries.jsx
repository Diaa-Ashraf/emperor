import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe2, ArrowUpRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { depositsApi } from '../../api/endpoints';

export default function SupportedCountries({ countries: propCountries, loading: propLoading }) {
    const { t } = useLanguage();
    const navigate = useNavigate();

    const [countries, setCountries] = useState(propCountries || []);
    const [loading, setLoading] = useState(propLoading !== undefined ? propLoading : !propCountries?.length);

    useEffect(() => {
        if (propCountries && propCountries.length > 0) {
            setCountries(propCountries);
            setLoading(false);
            return;
        }

        let isMounted = true;
        depositsApi.getSupportedCountries()
            .then((res) => {
                if (!isMounted) return;
                const data = Array.isArray(res?.data) ? res.data : (res?.data?.data || []);
                setCountries(data);
            })
            .catch(() => {
                // If endpoint fails, keep empty or previous
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [propCountries]);

    const handleCountryClick = (country) => {
        if (country?.id) {
            navigate(`/deposit?country=${encodeURIComponent(country.id)}`);
        } else {
            navigate('/deposit');
        }
    };

    return (
        <section className="emperor-countries-bar" aria-label={t('supportedCountries', 'الدول المدعومة')}>
            <div className="emperor-countries-label">
                <Globe2 size={20} color="#F5D061" />
                <span>{t('supportedCountries', 'الدول المدعومة')}</span>
                <span className="emperor-countries-badge">
                    {loading ? '...' : `${countries.length} ${t('countriesCount', 'دول')}`}
                </span>
            </div>

            <div className="emperor-countries-list">
                {loading ? (
                    // Shimmer skeleton items while loading
                    Array.from({ length: 6 }).map((_, idx) => (
                        <div key={idx} className="emperor-country-item emperor-country-skeleton">
                            <span className="emperor-country-skeleton-flag" />
                            <span className="emperor-country-skeleton-text" />
                        </div>
                    ))
                ) : countries.length > 0 ? (
                    countries.map((c) => (
                        <button
                            key={c.id || c.code || c.name}
                            type="button"
                            className="emperor-country-item emperor-country-clickable"
                            onClick={() => handleCountryClick(c)}
                            title={`${c.name} — ${c.currency || ''} (${c.methods_count || 1} ${t('paymentMethods', 'طرق دفع')})`}
                        >
                            <span className="emperor-country-flag">{c.flag || '🌐'}</span>
                            <span className="emperor-country-name">{c.name}</span>
                            {c.currency && (
                                <span className="emperor-country-currency">{c.currency}</span>
                            )}
                        </button>
                    ))
                ) : (
                    <div className="emperor-country-item emperor-country-fallback">
                        <span className="emperor-country-flag">🌐</span>
                        <span className="emperor-country-name">{t('globalCoverage', 'تغطية إقليمية ودولية')}</span>
                    </div>
                )}
            </div>
        </section>
    );
}
