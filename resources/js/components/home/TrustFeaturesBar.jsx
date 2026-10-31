import React from 'react';
import { ShieldCheck, Zap, Headphones, Percent } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function TrustFeaturesBar() {
    const { t } = useLanguage();

    const features = [
        {
            id: 'safe',
            icon: ShieldCheck,
            title: t('featureSafeTitle', 'تعاملات آمنة'),
            subtitle: t('featureSafeSub', 'حماية كاملة لبياناتك'),
        },
        {
            id: 'fast',
            icon: Zap,
            title: t('featureFastTitle', 'سرعة في التنفيذ'),
            subtitle: t('featureFastSub', 'خدمات فورية بأعلى دقة'),
        },
        {
            id: 'support',
            icon: Headphones,
            title: t('featureSupportTitle', 'دعم فني 24/7'),
            subtitle: t('featureSupportSub', 'نحن دائماً معك لأي استفسار'),
        },
        {
            id: 'prices',
            icon: Percent,
            title: t('featurePricesTitle', 'أسعار منافسة'),
            subtitle: t('featurePricesSub', 'أفضل العروض والخصومات دائماً'),
        },
    ];

    return (
        <section className="emperor-trust-bar">
            {features.map((item) => {
                const Icon = item.icon;
                return (
                    <div key={item.id} className="emperor-trust-item">
                        <div className="emperor-trust-icon-box">
                            <Icon size={22} />
                        </div>
                        <div className="emperor-trust-text-group">
                            <span className="emperor-trust-title">{item.title}</span>
                            <span className="emperor-trust-subtitle">{item.subtitle}</span>
                        </div>
                    </div>
                );
            })}
        </section>
    );
}

