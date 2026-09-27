import React from 'react';
import { Zap, ShieldCheck, DollarSign, Headphones, RefreshCw, Key, Award, Cpu } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function EmperorFeaturesGrid() {
    const { isRtl } = useLanguage();

    const features = [
        {
            icon: Zap,
            title: 'شحن فوري بالثواني',
            desc: 'نظام ربط مباشر مع سيرفرات الألعاب والتطبيقات العالمية ينفذ طلبك خلال 15 إلى 30 ثانية فقط.',
            color: 'var(--gold-400)',
        },
        {
            icon: DollarSign,
            title: 'أقوى أسعار جملة في مصر',
            desc: 'أسعار مباشرة من المصدر تمنحك أعلى هامش ربح سواء كنت لاعباً فردياً أو صاحب متجر رقمي.',
            color: 'var(--gold-200)',
        },
        {
            icon: RefreshCw,
            title: 'تسييل تارجت وسحب كاش',
            desc: 'حول رصيدك ونقاطك في تطبيقات البث والدردشة (ميجو، بولا، أزومي، وغيرها) إلى كاش في دقائق.',
            color: 'var(--success)',
        },
        {
            icon: ShieldCheck,
            title: 'أمان رسمي وضمان 100%',
            desc: 'جميع الأكواد والشحنات معتمدة رسمياً وبدون أي احتمالية للباند أو حظر الحسابات نهائياً.',
            color: '#38BDF8',
        },
        {
            icon: Cpu,
            title: 'بوابة API متقدمة للتجار',
            desc: 'ربط برمجي فوري للمتاجر مع مزامنة المنتجات والأسعار وإدارة الرصيد آلياً بدقة متناهية.',
            color: '#A78BFA',
        },
        {
            icon: Headphones,
            title: 'دعم فني على مدار 24/7',
            desc: 'فريق دعم متخصص مستعد لمساعدتك وحل أي استفسار فوراً عبر المحادثة المباشرة والواتساب.',
            color: 'var(--gold-300)',
        },
    ];

    return (
        <div className="emperor-entrance" style={{ marginBottom: '56px' }}>
            <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 32px' }}>
                <div className="emperor-badge" style={{ margin: '0 auto 12px' }}>
                    <Award size={13} color="var(--gold-400)" />
                    <span>المعايير القياسية لإمبراطور</span>
                </div>
                <h2 style={{
                    fontSize: 'clamp(22px, 3.5vw, 28px)',
                    fontWeight: '900',
                    color: 'var(--text-primary)',
                    marginBottom: '8px',
                }}>
                    لماذا يفضل مئات الآلاف إمبراطور؟
                </h2>
                <p style={{
                    fontSize: '13.5px',
                    color: 'var(--text-secondary)',
                    margin: 0,
                }}>
                    تجربة شحن وتداول رقمي متكاملة تجمع بين السرعة الفائقة والأمان المطلق وأفضل أسعار السوق
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
                gap: '18px',
            }}>
                {features.map((feat, idx) => {
                    const IconComponent = feat.icon;
                    return (
                        <div
                            key={idx}
                            className="emperor-card"
                            style={{
                                padding: '24px 20px',
                                borderRadius: '22px',
                                border: '1px solid var(--border-subtle)',
                                background: 'var(--card-gradient)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px',
                            }}
                        >
                            <div style={{
                                width: '46px',
                                height: '46px',
                                borderRadius: '14px',
                                background: 'rgba(212, 165, 55, 0.1)',
                                border: '1px solid var(--border-medium)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <IconComponent size={22} color={feat.color} />
                            </div>

                            <h3 style={{
                                fontSize: '16px',
                                fontWeight: '900',
                                color: 'var(--text-primary)',
                                margin: 0,
                            }}>
                                {feat.title}
                            </h3>

                            <p style={{
                                fontSize: '13px',
                                color: 'var(--text-secondary)',
                                lineHeight: '1.7',
                                margin: 0,
                            }}>
                                {feat.desc}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
