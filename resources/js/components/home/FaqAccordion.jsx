import React, { useEffect, useRef, useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MousePointer2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import "../../../css/faqAccordion.css";
export default function FaqAccordion() {
    const { isRtl } = useLanguage();
    const { theme } = useTheme();
    const faqListRef = useRef(null);
    const questionRefs = useRef([]);
    const [isListVisible, setIsListVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [cursorTop, setCursorTop] = useState(0);

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
        {
            q: 'من هو مطور ومبرمج منصة إمبراطور؟ وكيف يمكنني طلب مشروع أو سيستم مماثل؟',
            a: (
                <div>
                    <span>تم تصميم وبرمجة منصة إمبراطور بأعلى معايير الأمان والسرعة بواسطة المهندس </span>
                    <strong style={{ color: 'var(--gold-400)' }}>ضياء الشافعي (Diaa Elshafey)</strong>
                    <span> وفريق </span>
                    <strong style={{ color: 'var(--gold-400)' }}>Stackway</strong>.
                    <br />
                    <span>لطلب وتطوير منصات شحن رقمي، متاجر إلكترونية، أو أنظمة SaaS مخصصة:</span>
                    <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
                        <a
                            href="https://wa.me/201202325201"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '7px 14px',
                                borderRadius: '10px',
                                background: 'rgba(34, 197, 94, 0.15)',
                                border: '1px solid rgba(34, 197, 94, 0.4)',
                                color: '#22C55E',
                                textDecoration: 'none',
                                fontWeight: '800',
                                fontSize: '13px',
                            }}
                        >
                            <span>واتساب: 01202325201 (+201202325201)</span>
                        </a>
                        <a
                            href="https://portfolio.stackway.cloud"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '7px 14px',
                                borderRadius: '10px',
                                background: 'rgba(212, 165, 55, 0.15)',
                                border: '1px solid rgba(212, 165, 55, 0.4)',
                                color: 'var(--gold-400)',
                                textDecoration: 'none',
                                fontWeight: '800',
                                fontSize: '13px',
                            }}
                        >
                            <span>معرض الأعمال (Portfolio Stackway)</span>
                        </a>
                    </div>
                </div>
            ),
        },
    ];

    const [openIndex, setOpenIndex] = useState(-1);

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    useEffect(() => {
        const faqList = faqListRef.current;
        if (!faqList || !('IntersectionObserver' in window)) return undefined;

        const observer = new IntersectionObserver(([entry]) => {
            setIsListVisible(entry.isIntersecting);
        }, { threshold: 0.12 });

        observer.observe(faqList);

        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!isListVisible || openIndex !== -1) {
            setActiveIndex(-1);
        }
    }, [isListVisible, openIndex]);


    return (
        <>
            <div className="emperor-entrance" style={{ marginBottom: '56px' }}>
                <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 32px' }}>
                    <div className="emperor-badge" style={{ margin: '0 auto 12px' }}>
                        <HelpCircle size={13} color="var(--gold-400)" />
                        <span>إجابات واضحة ومباشرة</span>
                    </div>
                    <h2 style={{
                        fontSize: 'clamp(22px, 3.5vw, 28px)',
                        fontWeight: '900',
                        color: theme === 'light' ? 'var(--gold-700)' : 'var(--text-primary)',
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
                <div ref={faqListRef} className="faq-list" style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {faqs.map((faq, idx) => {
                        const isOpen = openIndex === idx;
                        const isLight = theme === 'light';

                        return (
                            <div
                                key={idx}
                                ref={(element) => { questionRefs.current[idx] = element; }}
                                className={`faq-question${activeIndex === idx ? ' faq-question--pointed' : ''}`}
                                style={{
                                    background: isOpen
                                        ? (isLight
                                            ? 'linear-gradient(135deg, rgba(212, 165, 55, 0.12) 0%, #ffffff 100%)'
                                            : 'linear-gradient(135deg, rgba(212, 165, 55, 0.08) 0%, rgba(17, 17, 24, 0.95) 100%)')
                                        : (isLight ? '#ffffff' : 'rgba(17, 17, 24, 0.85)'),
                                    border: `1.5px solid ${isOpen ? 'var(--gold-400)' : (isLight ? 'rgba(210, 228, 245, 0.9)' : 'rgba(255, 255, 255, 0.06)')}`,
                                    borderRadius: '18px',
                                    overflow: 'hidden',
                                    transition: 'all 0.3s ease',
                                    boxShadow: isOpen
                                        ? (isLight ? '0 10px 30px rgba(212, 165, 55, 0.18), 0 4px 12px rgba(15, 23, 42, 0.05)' : 'var(--shadow-gold)')
                                        : (isLight ? '0 4px 16px rgba(15, 23, 42, 0.04)' : 'none'),
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
                                        color: isOpen
                                            ? (isLight ? 'var(--gold-700)' : 'var(--gold-100)')
                                            : (isLight ? '#0f172a' : 'var(--text-primary)'),
                                        fontFamily: 'var(--font-cairo)',
                                        fontSize: '14.5px',
                                        fontWeight: '800',
                                    }}
                                >
                                    <span className="faq-question-text">{faq.q}</span>
                                    {isOpen ? (
                                        <ChevronUp size={18} color="var(--gold-400)" style={{ flexShrink: 0 }} />
                                    ) : (
                                        <ChevronDown size={18} color={isLight ? '#64748b' : 'var(--text-muted)'} style={{ flexShrink: 0 }} />
                                    )}
                                </button>

                                {isOpen && (
                                    <div style={{
                                        padding: '0 20px 20px',
                                        color: isLight ? '#334155' : 'var(--text-secondary)',
                                        fontSize: '13.5px',
                                        lineHeight: '1.8',
                                        borderTop: isLight ? '1px solid rgba(212, 165, 55, 0.2)' : '1px solid rgba(212, 165, 55, 0.1)',
                                        paddingTop: '14px',
                                        animation: 'fadeInUp 0.3s ease',
                                    }}>
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                    {activeIndex >= 0 && (
                        <div className="faq-scroll-cursor" style={{ top: `${cursorTop}px` }} aria-hidden="true">
                            <MousePointer2 size={19} strokeWidth={2.5} />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
