import React, { useEffect, useRef, useState } from 'react';
import {
    Headphones,
    MessageCircle,
    Phone,
    Send,
    Mail,
    Clock,
    ShieldCheck,
    Zap,
    Copy,
    Check,
    ChevronDown,
    ChevronUp,
    HelpCircle,
    ExternalLink,
    Sparkles,
    MousePointer2,
} from 'lucide-react';
import { supportApi } from '../api/endpoints';
import { useToast } from '../contexts/ToastContext';
import Button from '../components/ui/Button';
import VideoBackground from "../components/home/VideoBackground";
import "../../css/faqAccordion.css";
import "../../css/supportPage.css";


export default function SupportPage() {
    const { addToast } = useToast();
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [openFaq, setOpenFaq] = useState(null); // Index of opened FAQ
    // animation 
    const faqListRef = useRef(null);
    const questionRefs = useRef([]);
    const [isListVisible, setIsListVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [cursorTop, setCursorTop] = useState(0);



    useEffect(() => {
        const fetchContacts = async () => {
            setLoading(true);
            try {
                const res = await supportApi.getSupportContacts();
                const data = res.data?.data || res.data || [];
                setContacts(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error('Error fetching support contacts:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);

    const handleCopy = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        addToast('تم نسخ الرقم / المعرف بنجاح', 'success');
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    // Default channels fallback if none from backend yet
    const fallbackContacts = [
        {
            id: 'wa-main',
            name: 'خدمة العملاء الرئيسية (واتساب)',
            channel: 'whatsapp',
            channel_label: 'واتساب',
            value: '+201000000000',
            description: 'متاح 24/7 للاستفسارات العامة، متابعة الطلبات، وتأكيد الإيداعات',
            icon: 'message-circle',
        },
        {
            id: 'wa-target',
            name: 'قسم بيع التارجت والوكالات',
            channel: 'whatsapp',
            channel_label: 'واتساب',
            value: '+201100000000',
            description: 'مخصص لاستلام أرباح صانعي المحتوى وموزعي التارجت في كافة التطبيقات',
            icon: 'zap',
        },
        {
            id: 'tg-channel',
            name: 'قناة إمبراطور الرسمية (تليجرام)',
            channel: 'telegram',
            channel_label: 'تليجرام',
            value: 'https://t.me/EmperorStore',
            description: 'عروض يومية حصرية، تحديثات أسعار التارجت الفورية، ومسابقات وجوائز',
            icon: 'send',
        },
        {
            id: 'email-support',
            name: 'البريد الإلكتروني للإدارة',
            channel: 'email',
            channel_label: 'بريد إلكتروني',
            value: 'support@emperor-store.com',
            description: 'للشكاوى والاقتراحات والشراكات التجارية الكبرى',
            icon: 'mail',
        },
    ];

    const displayContacts = contacts.length > 0 ? contacts : fallbackContacts;

    const faqs = [
        {
            q: 'كم يستغرق تنفيذ طلب شحن الألعاب أو البطاقات الرقمية؟',
            a: 'التنفيذ في منصة إمبراطور فوري وتلقائي بنسبة 100%! في معظم الألعاب (مثل ببجي، فري فاير، وغيرها) يتم شحن حسابك مباشرة عبر الـ ID خلال 1 إلى 5 دقائق من تأكيد الطلب.',
        },
        {
            q: 'كيف تتم عملية بيع تارجت التطبيقات واستلام الأرباح؟',
            a: 'اختر التطبيق من صفحة "بيع التارجت"، وحدد عدد النقاط لتظهر لك القيمة الفورية بالجنيه المصري. بعد ذلك انسخ كود الوكالة المعتمد، قم بتحويل التارجت داخل التطبيق، وارفع لقطة شاشة الإثبات. يتم فحص العملية وإيداع المبلغ في محفظتك أو تحويله فورياً لحسابك البنكي أو محفظتك الإلكترونية.',
        },
        {
            q: 'ما هي طرق الإيداع المتاحة لشحن الرصيد؟',
            a: 'نوفر أسرع وأوسع وسائل الدفع المحلية والدولية، وتشمل: فودافون كاش، انستاباي InstaPay، أورنج كاش، اتصالات كاش، التحويلات البنكية المباشرة، وعملات USDT الرقمية.',
        },
        {
            q: 'ماذا أفعل في حال واجهت مشكلة في الطلب أو الإيداع؟',
            a: 'فريق الدعم الفني متواجد على مدار الساعة لخدمتك. يمكنك نسخ رقم المحادثة أو الضغط مباشرة على زر "تواصل عبر واتساب" وإرسال رقم الطلب / الإيداع وسيتم التعامل معه فوراً خلال دقائق معدودة.',
        },
        {
            q: 'كيف يعمل برنامج الإحالات وجني الأرباح؟',
            a: 'بمجرد تسجيلك، تحصل على كود ورابط إحالة خاص بك. شاركه مع أصدقائك أو متابعيك، وستربح نسبة عمولة نقدية مباشرة تضاف لمحفظتك مع كل عملية شحن أو بيع تارجت يقومون بها مدى الحياة!',
        },
    ];

    const getChannelAction = (contact) => {
        const val = contact.value || '';
        const ch = (contact.channel || '').toLowerCase();

        if (ch.includes('whatsapp') || val.startsWith('+') || /^[0-9]+$/.test(val.replace(/[\s+-]/g, ''))) {
            const cleanPhone = val.replace(/[^0-9]/g, '');
            const msg = encodeURIComponent('مرحباً فريق إمبراطور، أحتاج إلى مساعدة بخصوص حسابي.');
            return `https://wa.me/${cleanPhone}?text=${msg}`;
        }

        if (ch.includes('telegram') || val.includes('t.me')) {
            return val.startsWith('http') ? val : `https://t.me/${val.replace('@', '')}`;
        }

        if (ch.includes('email') || val.includes('@')) {
            return `mailto:${val}`;
        }

        return val.startsWith('http') ? val : `https://${val}`;
    };

    useEffect(() => {
        const faqList = faqListRef.current;
        if (!faqList || !('IntersectionObserver' in window)) return undefined;

        const observer = new IntersectionObserver(([entry]) => {
            setIsListVisible(entry.isIntersecting);
        }, { threshold: 0.12 });

        observer.observe(faqList);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const sequenceLength = Math.min(5, questionRefs.current.length);
        if (!isListVisible || openFaq !== null || sequenceLength === 0) {
            setActiveIndex(-1);
            return undefined;
        }

        let index = 0;
        setActiveIndex(index);
        const intervalId = window.setInterval(() => {
            index = (index + 1) % sequenceLength;
            setActiveIndex(index);
        }, 2000);

        return () => window.clearInterval(intervalId);
    }, [isListVisible, openFaq]);

    useEffect(() => {
        const list = faqListRef.current;
        const question = questionRefs.current[activeIndex];
        if (!list || !question || activeIndex < 0) return;

        const listBounds = list.getBoundingClientRect();
        const questionBounds = question.getBoundingClientRect();
        setCursorTop(questionBounds.top - listBounds.top + questionBounds.height / 2);
    }, [activeIndex]);



    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px 16px 80px' }}>
            {/* Hero Header */}
            <VideoBackground>
                <div
                    className='hero-header'
                    style={{
                        background: 'linear-gradient(135deg, rgba(28, 28, 38, 0.95) 0%, rgb(18 18 24 / 56%) 100%)',
                        border: '1px solid rgba(212, 165, 55, 0.25)',
                        borderRadius: '24px',
                        padding: '36px 30px',
                        marginBottom: '32px',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)',
                        marginTop: "30px"
                    }}>
                    <div
                        style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '20px',
                            background: 'linear-gradient(135deg, rgba(212, 165, 55, 0.25) 0%, rgba(212, 165, 55, 0.08) 100%)',
                            border: '1px solid rgba(212, 165, 55, 0.4)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#D4A537',
                            margin: '0 auto 18px',
                            boxShadow: '0 0 25px rgba(212, 165, 55, 0.2)',
                        }}>
                        <Headphones size={32} />
                    </div>

                    <h1 style={{ margin: '0 0 10px', fontSize: '26px', fontWeight: '900', color: '#FFFFFF' }}>
                        مركز الدعم الفني وخدمة العملاء
                    </h1>

                    <p style={{ margin: '0 auto 24px', fontSize: '15px', color: '#9E9EA8', maxWidth: '600px', lineHeight: '1.6' }}>
                        فريق دعم منصة إمبراطور متواجد لخدمتكم على مدار 24 ساعة، للإجابة عن استفساراتكم وحل أي مشكلة في أسرع وقت.
                    </p>

                    {/* Trust Badges */}
                    <div
                        className="trust-badges"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            gap: '20px',
                            paddingTop: '16px',
                            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                        }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4ADE80', fontSize: '13px', fontWeight: '700' }}>
                            <Clock size={16} />
                            <span>متاح 24/7 طوال الأسبوع</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#D4A537', fontSize: '13px', fontWeight: '700' }}>
                            <Zap size={16} />
                            <span>متوسط سرعة الرد: أقل من دقيقة</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38BDF8', fontSize: '13px', fontWeight: '700' }}>
                            <ShieldCheck size={16} />
                            <span>دعم فني معتمد ومباشر</span>
                        </div>
                    </div>
                </div>
            </VideoBackground>
            {/* Support Contacts Grid */}
            <div style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                    <MessageCircle size={22} color="#D4A537" />
                    <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#FFFFFF' }}>
                        قنوات التواصل المباشر
                    </h2>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
                    gap: '18px',
                }}>
                    {displayContacts.map((contact, index) => {
                        const isWhatsapp = (contact.channel || '').toLowerCase().includes('whatsapp') || (contact.name || '').includes('واتساب');
                        const isTelegram = (contact.channel || '').toLowerCase().includes('telegram') || (contact.name || '').includes('تليجرام');
                        const isEmail = (contact.channel || '').toLowerCase().includes('email') || (contact.name || '').includes('بريد');

                        const Icon = isWhatsapp ? MessageCircle : (isTelegram ? Send : (isEmail ? Mail : Phone));
                        const iconColor = isWhatsapp ? '#22C55E' : (isTelegram ? '#38BDF8' : '#D4A537');
                        const iconBg = isWhatsapp ? 'rgba(34, 197, 94, 0.15)' : (isTelegram ? 'rgba(56, 189, 248, 0.15)' : 'rgba(212, 165, 55, 0.15)');
                        const actionUrl = getChannelAction(contact);

                        return (
                            <div
                                key={contact.id || index}
                                style={{
                                    background: 'rgba(22, 22, 30, 0.85)',
                                    border: '1px solid rgba(255, 255, 255, 0.08)',
                                    borderRadius: '18px',
                                    padding: '22px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    gap: '18px',
                                    transition: 'all 0.2s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = '#D4A537';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
                                        <div style={{
                                            width: '46px',
                                            height: '46px',
                                            borderRadius: '14px',
                                            background: iconBg,
                                            color: iconColor,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                        }}>
                                            <Icon size={22} />
                                        </div>
                                        <div>
                                            <h3 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: '800', color: '#FFFFFF' }}>
                                                {contact.name}
                                            </h3>
                                            <span style={{
                                                fontSize: '11px',
                                                color: iconColor,
                                                fontWeight: '700',
                                                background: iconBg,
                                                padding: '2px 8px',
                                                borderRadius: '6px',
                                            }}>
                                                {contact.channel_label || (isWhatsapp ? 'واتساب' : 'تليجرام')}
                                            </span>
                                        </div>
                                    </div>

                                    <p style={{ margin: '0 0 12px', fontSize: '13px', color: '#9E9EA8', lineHeight: '1.5' }}>
                                        {contact.description}
                                    </p>

                                    {/* Value Pill with Copy Button */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '8px 12px',
                                        background: 'rgba(13, 13, 16, 0.6)',
                                        border: '1px solid rgba(255, 255, 255, 0.05)',
                                        borderRadius: '10px',
                                        fontSize: '13px',
                                        color: '#E2E8F0',
                                        fontWeight: '600',
                                        direction: 'ltr',
                                    }}>
                                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {contact.value}
                                        </span>
                                        <button
                                            onClick={() => handleCopy(contact.value, index)}
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                color: '#D4A537',
                                                cursor: 'pointer',
                                                padding: '2px',
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                            title="نسخ"
                                        >
                                            {copiedIndex === index ? <Check size={16} color="#22C55E" /> : <Copy size={16} />}
                                        </button>
                                    </div>
                                </div>

                                <a
                                    href={actionUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        padding: '10px 16px',
                                        borderRadius: '12px',
                                        background: isWhatsapp ? 'linear-gradient(135deg, #22C55E 0%, #15803D 100%)' : 'linear-gradient(135deg, #D4A537 0%, #AA7C11 100%)',
                                        color: '#FFFFFF',
                                        fontSize: '13px',
                                        fontWeight: '800',
                                        textDecoration: 'none',
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    <span>{isWhatsapp ? 'تواصل معنا عبر واتساب' : 'فتح القناة / المحادثة'}</span>
                                    <ExternalLink size={15} />
                                </a>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Interactive FAQ Section */}
            <div style={{
                background: 'rgba(22, 22, 30, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '24px',
                padding: '30px',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                    <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        background: 'rgba(212, 165, 55, 0.15)',
                        color: '#D4A537',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <HelpCircle size={22} />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#FFFFFF' }}>
                            الأسئلة الشائعة (FAQ)
                        </h2>
                        <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#9E9EA8' }}>
                            إجابات سريعة ومباشرة على أكثر الاستفسارات تكراراً
                        </p>
                    </div>
                </div>
                {/* faq */}
                <div
                    ref={faqListRef}
                    className="faq-list"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        position: 'relative',
                    }}>
                    {faqs.map((faq, idx) => {
                        const isOpen = openFaq === idx;

                        return (
                            <div
                                key={idx}
                                ref={(element) => { questionRefs.current[idx] = element; }}
                                className={`faq-question${activeIndex === idx ? ' faq-question--pointed' : ''}`}
                                style={{
                                    borderRadius: '14px',
                                    border: `1px solid ${isOpen ? 'rgba(212, 165, 55, 0.3)' : 'rgba(255, 255, 255, 0.06)'}`,
                                    background: isOpen ? 'rgba(30, 30, 42, 0.9)' : 'rgba(13, 13, 16, 0.5)',
                                    overflow: 'hidden',
                                    transition: 'all 0.2s ease',

                                }}
                            >
                                <button
                                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                                    style={{
                                        width: '100%',
                                        padding: '16px 20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        background: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                        textAlign: 'right',
                                        color: isOpen ? '#D4A537' : '#FFFFFF',
                                        fontSize: '15px',
                                        fontWeight: '700',
                                        fontFamily: 'Cairo, sans-serif',
                                    }}
                                >
                                    <span className="faq-question-text">{faq.q}</span>
                                    {isOpen ? <ChevronUp size={18} color="#D4A537" /> : <ChevronDown size={18} color="#8E8E98" />}
                                </button>

                                {isOpen && (
                                    <div style={{
                                        padding: '0 20px 18px',
                                        color: '#B8B8C2',
                                        fontSize: '14px',
                                        lineHeight: '1.7',
                                        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                                        paddingTop: '12px',
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
        </div >
    );
}