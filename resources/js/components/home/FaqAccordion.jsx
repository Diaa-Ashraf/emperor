import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function FaqAccordion() {
    const { isRtl } = useLanguage();

    const faqs = [
        {
            q: 'كم يستغرق وصول الشدات، الجواهر، أو أكواد البطاقات؟',
            a: 'الشحن في منصة إمبراطور يتم بنظام آلي مباشر (Automated Instant Delivery). في معظم الحالات يصل الشحن إلى حسابك أو يظهر الكود في صفحة طلباتك خلال 10 إلى 30 ثانية فقط بعد إتمام الدفع بنجاح.',
        },
        {
            q: 'كيف يمكنني بيع تارجت تطبيقات البث والدردشة (مثل ميجو، بولا، أزومي)؟',
            a: 'يمكنك التوجه إلى قسم «بيع التارجت»، واختيار التطبيق، وإدخال عدد النقاط أو الكوينز التي تملكها. سيظهر لك المبلغ فوراً بالجنيه المصري، وعند إرسال الطلب يتم تحويل الكاش لحسابك فوراً عبر إنستاباي، فودافون كاش، أو محفظة المنصة خلال أقل من 5 دقائق.',
        },
        {
            q: 'ما هي طرق الدفع المتاحة لشحن رصيد المحفظة أو الدفع المباشر؟',
            a: 'ندعم كافة وسائل الدفع المصرية والعربية الفورية: إنستاباي (InstaPay)، فودافون كاش ومحافظ الهاتف المحمول (أورنج كاش، وي باي، اتصالات كاش)، البطاقات البنكية (Visa / MasterCard / ميزة)، ورصيد المحفظة الرقمية الداخلية.',
        },
        {
            q: 'هل كروت وشحنات إمبراطور آمنة ورسمية؟ وهل يوجد خطر باند؟',
            a: 'جميع منتجاتنا معتمدة ورسمية 100% ويتم توريدها مباشرة من الموزعين المعتمدين وسيرفرات الألعاب الرسمية. لا يوجد أي خطر باند أو مخالفة لسياسات الألعاب نهائياً، ومعاملاتك محمية بضمان استرداد كامل.',
        },
        {
            q: 'أنا صاحب متجر أو موقع، كيف يمكنني ربط موقعي بـ API إمبراطور؟',
            a: 'نوفر للتجار والموزعين واجهة برمجية كاملة (API) تتيح مزامنة الأسعار وإرسال طلبات الشحن تلقائياً وخصم القيمة من محفظتك. يمكنك ترقية حسابك إلى رتبة «وكيل معتمد» أو التواصل مع الدعم الفني لاستلام مفتاح الـ API وتوثيق الاندماج.',
        },
    ];

    const [openIndex, setOpenIndex] = useState(0);

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <div className="emperor-entrance" style={{ marginBottom: '56px' }}>
            <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 32px' }}>
                <div className="emperor-badge" style={{ margin: '0 auto 12px' }}>
                    <HelpCircle size={13} color="var(--gold-400)" />
                    <span>إجابات واضحة ومباشرة</span>
                </div>
                <h2 style={{
                    fontSize: 'clamp(22px, 3.5vw, 28px)',
                    fontWeight: '900',
                    color: 'var(--text-primary)',
                    marginBottom: '8px',
                }}>
                    الأسئلة الأكثر شيوعاً
                </h2>
                <p style={{
                    fontSize: '13.5px',
                    color: 'var(--text-secondary)',
                    margin: 0,
                }}>
                    كل ما تحتاج معرفته عن خدمات الشحن، سحب التارجت، وطرق الدفع
                </p>
            </div>

            <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {faqs.map((faq, idx) => {
                    const isOpen = openIndex === idx;
                    return (
                        <div
                            key={idx}
                            style={{
                                background: isOpen
                                    ? 'linear-gradient(135deg, rgba(212, 165, 55, 0.08) 0%, rgba(17, 17, 24, 0.95) 100%)'
                                    : 'var(--bg-card)',
                                border: `1px solid ${isOpen ? 'var(--gold-400)' : 'var(--border-subtle)'}`,
                                borderRadius: '18px',
                                overflow: 'hidden',
                                transition: 'all 0.3s ease',
                                boxShadow: isOpen ? 'var(--shadow-gold)' : 'none',
                            }}
                        >
                            <button
                                onClick={() => toggleFaq(idx)}
                                style={{
                                    width: '100%',
                                    padding: '18px 20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: '12px',
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    textAlign: isRtl ? 'right' : 'left',
                                    color: isOpen ? 'var(--gold-100)' : 'var(--text-primary)',
                                    fontFamily: 'var(--font-cairo)',
                                    fontSize: '14.5px',
                                    fontWeight: '800',
                                }}
                            >
                                <span>{faq.q}</span>
                                {isOpen ? (
                                    <ChevronUp size={18} color="var(--gold-400)" style={{ flexShrink: 0 }} />
                                ) : (
                                    <ChevronDown size={18} color="var(--text-muted)" style={{ flexShrink: 0 }} />
                                )}
                            </button>

                            {isOpen && (
                                <div style={{
                                    padding: '0 20px 20px',
                                    color: 'var(--text-secondary)',
                                    fontSize: '13.5px',
                                    lineHeight: '1.8',
                                    borderTop: '1px solid rgba(212, 165, 55, 0.1)',
                                    paddingTop: '14px',
                                    animation: 'fadeInUp 0.3s ease',
                                }}>
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
