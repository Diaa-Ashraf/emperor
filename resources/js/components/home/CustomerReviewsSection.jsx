import React from 'react';
import { Star, CheckCircle, MessageSquareQuote, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function CustomerReviewsSection() {
    const { isRtl } = useLanguage();

    const reviews = [
        {
            id: 1,
            name: 'أحمد الصاوي',
            role: 'تاجر شحن وموزع بطاقات',
            city: 'القاهرة',
            rating: 5,
            comment: 'من أقوى المنصات اللي اتعاملت معاها، الربط بالـ API شغال أوتوماتيك وسرعة وصول شدات ببجي أقل من 20 ثانية.. والأسعار جملة بجد.',
            service: 'ببجي موبايل + API',
        },
        {
            id: 2,
            name: 'محمود عبد الرازق',
            role: 'صانع محتوى وستريمر',
            city: 'الإسكندرية',
            rating: 5,
            comment: 'بصفي تارجت ميجو لايف وبولا من خلالهم دايماً، الفلوس بتوصلني على فودافون كاش وإنستاباي في نفس اللحظة بأعلى سعر في السوق.',
            service: 'سحب تارجت ميجو لايف',
        },
        {
            id: 3,
            name: 'كريم البنا',
            role: 'لاعب محترف (Pro Gamer)',
            city: 'المنصورة',
            rating: 5,
            comment: 'شحنت كروت فالورانت وروبلوكس، الكود نزل في صفحة طلباتي فوراً وفعلته في ثواني بدون أي مشكلة. خدمة العملاء محترمين جداً.',
            service: 'فالورانت 2500 VP',
        },
        {
            id: 4,
            name: 'طارق حسام',
            role: 'صاحب سايبر ألعاب وستور',
            city: 'طنطا',
            rating: 5,
            comment: 'رتبة التاجر وفرت عليا كتير جداً، شحن المحفظة بإنستاباي بيسمع فوراً وبشحن لزبايني في السايبر بدون أي تأخير.',
            service: 'شحن المحفظة ورتبة الذهب',
        },
    ];

    return (
        <div className="emperor-entrance" style={{ marginBottom: '56px' }}>
            <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 32px' }}>
                <div className="emperor-badge" style={{ margin: '0 auto 12px' }}>
                    <MessageSquareQuote size={13} color="var(--gold-400)" />
                    <span>تجارب حقيقية موثقة ⭐️</span>
                </div>
                <h2 style={{
                    fontSize: 'clamp(22px, 3.5vw, 28px)',
                    fontWeight: '900',
                    color: 'var(--text-primary)',
                    marginBottom: '8px',
                }}>
                    ماذا يقول عملاؤنا وتجارنا؟
                </h2>
                <p style={{
                    fontSize: '13.5px',
                    color: 'var(--text-secondary)',
                    margin: 0,
                }}>
                    أكثر من 50,000 عميل وتاجر يثقون في منصة إمبراطور يومياً
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
                gap: '16px',
            }}>
                {reviews.map((rev) => (
                    <div
                        key={rev.id}
                        className="emperor-card"
                        style={{
                            padding: 'clamp(16px, 3vw, 22px)',
                            borderRadius: '22px',
                            border: '1px solid var(--border-subtle)',
                            background: 'var(--card-gradient)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        <div>
                            {/* Stars */}
                            <div style={{ display: 'flex', gap: '3px', marginBottom: '12px' }}>
                                {[...Array(rev.rating)].map((_, i) => (
                                    <Star key={i} size={15} color="var(--gold-400)" fill="var(--gold-400)" />
                                ))}
                            </div>

                            {/* Comment */}
                            <p style={{
                                fontSize: '13px',
                                color: 'var(--text-secondary)',
                                lineHeight: '1.75',
                                marginBottom: '16px',
                                minHeight: '65px',
                            }}>
                                “{rev.comment}”
                            </p>
                        </div>

                        {/* User Profile */}
                        <div style={{
                            borderTop: '1px solid var(--border-subtle)',
                            paddingTop: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span style={{ fontSize: '13.5px', fontWeight: '800', color: 'var(--text-primary)' }}>
                                        {rev.name}
                                    </span>
                                    <CheckCircle size={13} color="var(--success)" />
                                </div>
                                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>
                                    {rev.role} • {rev.city}
                                </div>
                            </div>

                            <span style={{
                                fontSize: '10px',
                                background: 'rgba(212, 165, 55, 0.1)',
                                border: '1px solid var(--border-subtle)',
                                color: 'var(--gold-200)',
                                padding: '2px 7px',
                                borderRadius: '6px',
                                fontWeight: '700',
                            }}>
                                {rev.service}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
