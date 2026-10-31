import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function TargetBannerShowcase() {
    const { isRtl, t } = useLanguage();

    return (
        <section className="emperor-target-banner-section">
            <div className="emperor-target-animated-card">
                <div className="emperor-target-card-inner">
                    <Link to="/target/apps" className="emperor-target-banner-link" title="بيع التارجت وسحب كوينز الرواتب">
                        {/* Top Visual Graphic */}
                        <div className="emperor-target-img-wrapper">
                            <img
                                src="/images/artwork/target_salary_banner.png"
                                alt="انطلق موقع خاص لسحب الرواتب - بيع التارجت"
                                className="emperor-target-banner-img"
                                onError={(e) => {
                                    e.currentTarget.src = '/images/artwork/cat_target.jpg';
                                }}
                            />
                            {/* Ambient overlay glow */}
                            <div className="emperor-target-glow-overlay" />
                        </div>

                        {/* Interactive Luxury Bottom Bar */}
                        <div className="emperor-target-footer-bar">
                            <div className="emperor-target-info-group">
                                <div className="emperor-target-badge">
                                    <Sparkles size={14} color="#F5D061" />
                                    <span>{t('targetInstantCash', 'سحب فوري للكاش')}</span>
                                </div>
                                <h3 className="emperor-target-title">
                                    <span>{t('targetTitle', 'بيع التارجت وسحب كوينز الرواتب')}</span>
                                    <span className="emperor-target-tag">Target Selling</span>
                                </h3>
                                <p className="emperor-target-desc">
                                    {t('targetDesc', 'حوّل تارجت وكوينز تطبيقات البث والألعاب فوراً إلى كاش بأفضل الأسعار وأسرع تنفيذ في الوطن العربي')}
                                </p>
                            </div>

                            <div className="emperor-target-cta-btn">
                                <span>{t('targetCta', 'بيع التارجت الآن')}</span>
                                {isRtl ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}
