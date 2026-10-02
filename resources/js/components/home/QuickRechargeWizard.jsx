import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, CheckCircle2, ShieldCheck, ArrowLeft, ArrowRight, UserCheck, Sparkles, Gamepad2, Gem, MessageCircle, Radio, Crosshair } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';

export default function QuickRechargeWizard() {
    const { isRtl } = useLanguage();
    const { theme } = useTheme();
    const navigate = useNavigate();
    const isLight = theme === 'light';
    const subtleBorder = isLight ? 'rgba(24, 24, 27, 0.24)' : 'var(--border-subtle)';
    const mediumBorder = isLight ? 'rgba(24, 24, 27, 0.34)' : 'var(--border-medium)';
    const strongBorder = isLight ? 'rgba(154, 114, 16, 0.65)' : 'var(--border-strong)';
    const accentBorder = isLight ? 'var(--gold-600)' : 'var(--gold-400)';

    // Typing animation
    const text = "الشاحن الملكي السريع";
    const [displayText, setDisplayText] = useState("");
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [index, setIndex] = useState(0);

    // Observe component visibility
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // Typing effect runs while visible and not finished
    useEffect(() => {
        if (!isVisible) return;
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setIndex(i => i + 1);
            }, 0.1);
            return () => clearTimeout(timeout);
        }
    }, [isVisible, index]);

    // Update displayed text when index changes
    useEffect(() => {
        setDisplayText(text.slice(0, index));
    }, [index]);

    // Paragraph animation state
    const subText = "اختر لعبتك أو تطبيقك، أدخل المعرّف، استلم شحنتك في أقل من 30 ثانية بدون انتظار!";
    const [subDisplay, setSubDisplay] = useState("");
    const [subIndex, setSubIndex] = useState(0);

    // Sub paragraph typing effect runs after heading finished
    useEffect(() => {
        if (!isVisible) return;
        if (index >= text.length && subIndex < subText.length) {
            const timeout = setTimeout(() => {
                setSubIndex(i => i + 1);
            }, 0.2);
            return () => clearTimeout(timeout);
        }
    }, [isVisible, index, subIndex]);

    // Update displayed sub paragraph text
    useEffect(() => {
        setSubDisplay(subText.slice(0, subIndex));
    }, [subIndex]);


    const games = [
        {
            id: 'pubg',
            name: 'ببجي موبايل (PUBG)',
            icon: Gamepad2,
            idLabel: 'معرّف اللاعب (Player ID)',
            placeholder: 'مثال: 5129481239',
            packages: [
                { id: 'p60', name: '60 شدة (60 UC)', price: 28.5 },
                { id: 'p325', name: '325 شدة (300+25 UC)', price: 145.0, popular: true },
                { id: 'p660', name: '660 شدة (600+60 UC)', price: 289.0 },
                { id: 'p1800', name: '1800 شدة (1500+300 UC)', price: 715.0 },
            ],
        },
        {
            id: 'freefire',
            name: 'فري فاير (Free Fire)',
            icon: Gem,
            idLabel: 'معرّف الحساب (Player ID)',
            placeholder: 'مثال: 948271032',
            packages: [
                { id: 'ff110', name: '100 + 10 جواهر', price: 22.0 },
                { id: 'ff231', name: '210 + 21 جوهرة', price: 44.0, popular: true },
                { id: 'ff583', name: '530 + 53 جوهرة', price: 108.0 },
                { id: 'ff1188', name: '1080 + 108 جوهرة', price: 215.0 },
            ],
        },
        {
            id: 'yomi',
            name: 'ايومي شات (Yomi Chat)',
            icon: MessageCircle,
            idLabel: 'الآيدي في التطبيق (App ID)',
            placeholder: 'مثال: 1048291',
            packages: [
                { id: 'y1', name: 'باقة ايومي 1 (5,000 كوينز)', price: 50.0 },
                { id: 'y2', name: 'باقة ايومي 2 (10,500 كوينز)', price: 100.0, popular: true },
                { id: 'y3', name: 'باقة ايومي 3 (26,000 كوينز)', price: 245.0 },
            ],
        },
        {
            id: 'azal',
            name: 'ازال لايف (Azal Live)',
            icon: Radio,
            idLabel: 'معرّف الحساب (Azal ID)',
            placeholder: 'مثال: 8829104',
            packages: [
                { id: 'az1', name: 'ازال باقة 1', price: 100.0 },
                { id: 'az2', name: 'ازال باقة 2', price: 200.0, popular: true },
                { id: 'az3', name: 'ازال باقة 3', price: 500.0 },
            ],
        },
        {
            id: 'valorant',
            name: 'فالورانت (Valorant)',
            icon: Crosshair,
            idLabel: 'Riot ID + Tagline',
            placeholder: 'مثال: Player#EGY',
            packages: [
                { id: 'val575', name: '575 VP', price: 195.0, popular: true },
                { id: 'val1200', name: '1200 VP', price: 390.0 },
                { id: 'val2500', name: '2500 VP', price: 780.0 },
            ],
        },
    ];

    const [selectedGameId, setSelectedGameId] = useState(games[0].id);
    const [playerId, setPlayerId] = useState('');
    const [selectedPackageId, setSelectedPackageId] = useState(games[0].packages[0].id);
    const [isVerifying, setIsVerifying] = useState(false);
    const [verifiedPlayerName, setVerifiedPlayerName] = useState(null);

    const activeGame = games.find((g) => g.id === selectedGameId) || games[0];
    const activePackage = activeGame.packages.find((p) => p.id === selectedPackageId) || activeGame.packages[0];

    const handleGameChange = (game) => {
        setSelectedGameId(game.id);
        setSelectedPackageId(game.packages[0].id);
        setVerifiedPlayerName(null);
    };

    const handleVerifyId = () => {
        if (!playerId.trim()) return;
        setIsVerifying(true);
        setTimeout(() => {
            setIsVerifying(false);
            setVerifiedPlayerName(`VerifiedPlayer_${playerId.slice(-4)}`);
        }, 600);
    };

    const handleInstantCheckout = () => {
        // Direct to products or category
        navigate(`/category/games?quick_game=${selectedGameId}&pid=${encodeURIComponent(playerId)}`);
    };

    return (
        <div ref={sectionRef}
            className="emperor-entrance emperor-vip-card"
            style={{
                borderRadius: '24px',
                padding: 'clamp(16px, 3.5vw, 32px)',
                marginBottom: '40px',
                border: `1px solid ${strongBorder}`,
                boxShadow: '0 20px 50px rgba(0,0,0,0.6), var(--shadow-gold)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Ambient Lighting */}
            <div style={{
                position: 'absolute',
                top: '-40px',
                left: '20%',
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(212, 165, 55, 0.12) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '20px',
            }}>
                <div>
                    <div className="emperor-badge" style={{ marginBottom: '8px' }}>
                        <Zap size={13} color="var(--gold-400)" />
                        <span>شحن مباشر وفوري بالـ ID</span>
                    </div>
                    <h2
                        className="typing-text"
                        style={{
                            fontSize: 'clamp(18px, 3.5vw, 26px)',
                            fontWeight: '900',
                            color: 'var(--text-primary)',
                            margin: 0,
                        }}>
                        {displayText}
                        <span className="typing-cursor">|</span>
                    </h2>
                    <p style={{
                        margin: '6px 0 0',
                        fontSize: '12.5px',
                        color: 'var(--text-secondary)',
                    }}>
                        {subDisplay}
                    </p>
                </div>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: `1px solid ${isLight ? 'rgba(5, 150, 105, 0.5)' : 'rgba(16, 185, 129, 0.25)'}`,
                    color: 'var(--success)',
                    fontSize: '11.5px',
                    fontWeight: '800',
                }}>
                    <CheckCircle2 size={15} />
                    <span>تفعيل وتسليم تلقائي 24/7</span>
                </div>
            </div>

            {/* 1. Game Selection Tabs */}
            <div className="no-scrollbar" style={{
                display: 'flex',
                gap: '8px',
                overflowX: 'auto',
                WebkitOverflowScrolling: 'touch',
                paddingBottom: '8px',
                marginBottom: '20px',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
            }}>
                {games.map((g) => {
                    const isSelected = g.id === selectedGameId;
                    return (
                        <button
                            key={g.id}
                            onClick={() => handleGameChange(g)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '9px 15px',
                                borderRadius: '14px',
                                background: isSelected
                                    ? 'var(--gold-metallic)'
                                    : 'var(--bg-card)',
                                color: isSelected ? '#050507' : 'var(--text-primary)',
                                border: `1px solid ${isSelected ? accentBorder : subtleBorder}`,
                                cursor: 'pointer',
                                fontWeight: '800',
                                fontSize: '12.5px',
                                fontFamily: 'var(--font-cairo)',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.25s ease',
                                transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                                boxShadow: isSelected ? 'var(--shadow-gold-md)' : 'none',
                                flexShrink: 0,
                            }}
                        >
                            {g.icon && React.createElement(g.icon, { size: 16, color: isSelected ? '#0D0D0F' : '#F5D061' })}
                            <span>{g.name}</span>
                        </button>
                    );
                })}
            </div>

            {/* 2. Wizard Body: 2-Column Desktop / Fluid Stacking Mobile */}
            <div className="quick-recharge-layout">
                {/* Main Column: Steps 1 & 2 */}
                <div className="quick-recharge-main">
                    {/* Step 1: ID Input Column */}
                    <div style={{
                        background: 'var(--bg-card)',
                        border: `1px solid ${subtleBorder}`,
                        borderRadius: '18px',
                        padding: 'clamp(14px, 2.5vw, 20px)',
                    }}>
                        <label style={{
                            display: 'block',
                            fontSize: '13.5px',
                            fontWeight: '800',
                            color: 'var(--text-gold)',
                            marginBottom: '10px',
                        }}>
                            1. {activeGame.idLabel}
                        </label>

                        <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                            <input
                                type="text"
                                value={playerId}
                                onChange={(e) => {
                                    setPlayerId(e.target.value);
                                    setVerifiedPlayerName(null);
                                }}
                                placeholder={activeGame.placeholder}
                                style={{
                                    flex: 1,
                                    background: 'var(--bg-surface)',
                                    border: `1px solid ${mediumBorder}`,
                                    borderRadius: '12px',
                                    padding: '12px 14px',
                                    color: 'var(--text-primary)',
                                    fontSize: '14px',
                                    fontWeight: '700',
                                    outline: 'none',
                                    fontFamily: 'var(--font-cairo)',
                                    minWidth: 0,
                                }}
                            />
                            <button
                                onClick={handleVerifyId}
                                disabled={!playerId.trim() || isVerifying}
                                style={{
                                    padding: '0 16px',
                                    borderRadius: '12px',
                                    background: 'rgba(212, 165, 55, 0.15)',
                                    border: `1px solid ${strongBorder}`,
                                    color: 'var(--gold-200)',
                                    fontWeight: '800',
                                    fontSize: '12.5px',
                                    cursor: playerId.trim() ? 'pointer' : 'not-allowed',
                                    fontFamily: 'var(--font-cairo)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    flexShrink: 0,
                                }}
                            >
                                {isVerifying ? 'فحص...' : 'تحقق'}
                            </button>
                        </div>

                        {verifiedPlayerName ? (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                fontSize: '12px',
                                color: 'var(--success)',
                                fontWeight: '700',
                                padding: '6px 12px',
                                borderRadius: '8px',
                                background: 'rgba(16, 185, 129, 0.1)',
                            }}>
                                <UserCheck size={14} />
                                <span>اسم الحساب المسجل: <strong>{verifiedPlayerName}</strong></span>
                            </div>
                        ) : (
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                                * سيتم شحن الحساب فوريًا بعد إتمام الدفع.
                            </span>
                        )}
                    </div>

                    {/* Step 2: Package Selector Column */}
                    <div style={{
                        background: 'var(--bg-card)',
                        border: `1px solid ${subtleBorder}`,
                        borderRadius: '18px',
                        padding: 'clamp(14px, 2.5vw, 20px)',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '13.5px',
                                fontWeight: '800',
                                color: 'var(--text-gold)',
                                margin: 0,
                            }}>
                                2. اختر الباقة المطلوبة
                            </label>
                            <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                                {activeGame.packages.length} باقات متوفرة
                            </span>
                        </div>

                        <div className="quick-recharge-packages-grid">
                            {activeGame.packages.map((pkg) => {
                                const isSelected = pkg.id === selectedPackageId;
                                return (
                                    <div
                                        key={pkg.id}
                                        onClick={() => setSelectedPackageId(pkg.id)}
                                        className="quick-recharge-pkg-card"
                                        style={{
                                            background: isSelected
                                                ? isLight
                                                    ? 'linear-gradient(135deg, #FDF3D3 0%, #F8E8B8 100%)'
                                                    : 'linear-gradient(135deg, rgba(212, 165, 55, 0.18) 0%, rgba(212, 165, 55, 0.06) 100%)'
                                                : 'var(--bg-surface)',
                                            border: `1.5px solid ${isSelected ? accentBorder : subtleBorder}`,
                                            boxShadow: isSelected
                                                ? `0 0 16px ${isLight ? 'rgba(154, 114, 16, 0.2)' : 'rgba(212, 165, 55, 0.25)'}`
                                                : 'none',
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '6px' }}>
                                            <span style={{
                                                fontSize: '12.5px',
                                                fontWeight: '800',
                                                color: isSelected && isLight ? '#4A3D15' : isSelected ? 'var(--gold-100)' : 'var(--text-primary)',
                                                lineHeight: 1.3,
                                            }}>
                                                {pkg.name}
                                            </span>
                                            {pkg.popular && (
                                                <span style={{
                                                    background: 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)',
                                                    color: '#050507',
                                                    fontSize: '8.5px',
                                                    fontWeight: '900',
                                                    padding: '1px 6px',
                                                    borderRadius: '6px',
                                                    whiteSpace: 'nowrap',
                                                    flexShrink: 0,
                                                }}>
                                                    الأكثر طلباً
                                                </span>
                                            )}
                                        </div>

                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'baseline',
                                            justifyContent: 'space-between',
                                            paddingTop: '6px',
                                            borderTop: `1px solid ${isSelected ? (isLight ? 'rgba(154, 114, 16, 0.45)' : 'rgba(212, 165, 55, 0.25)') : subtleBorder}`,
                                        }}>
                                            <span style={{
                                                fontSize: '14.5px',
                                                fontWeight: '900',
                                                color: isLight ? 'var(--gold-600)' : 'var(--gold-300)',
                                            }}>
                                                {pkg.price.toFixed(2)} <span style={{ fontSize: '11px', fontWeight: '700' }}>ج.م</span>
                                            </span>
                                            {isSelected && (
                                                <span style={{
                                                    fontSize: '10px',
                                                    color: isLight ? 'var(--gold-700)' : 'var(--gold-400)',
                                                    fontWeight: '900',
                                                }}>
                                                    محدد
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Final Action / Summary Column */}
                <div className="quick-recharge-summary" style={{ border: `1.5px solid ${mediumBorder}` }}>
                    <div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '10px',
                            borderBottom: `1px solid ${mediumBorder}`,
                            paddingBottom: '8px',
                        }}>
                            <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '700' }}>
                                ملخص الشحن المباشر:
                            </span>
                            <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontSize: '10.5px',
                                color: 'var(--success)',
                                fontWeight: '800',
                            }}>
                                <CheckCircle2 size={12} />
                                تسليم فوري
                            </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                            {activeGame.icon && React.createElement(activeGame.icon, { size: 18, color: '#D4A537' })}
                            <span style={{ fontSize: '15px', fontWeight: '900', color: 'var(--text-primary)' }}>
                                {activeGame.name}
                            </span>
                        </div>

                        <div style={{ fontSize: '13px', color: 'var(--gold-200)', fontWeight: '800', marginBottom: '12px' }}>
                            الباقة: {activePackage.name}
                        </div>

                        <div style={{
                            background: 'rgba(0, 0, 0, 0.4)',
                            border: `1px solid ${isLight ? 'rgba(154, 114, 16, 0.5)' : 'rgba(212, 165, 55, 0.2)'}`,
                            borderRadius: '12px',
                            padding: '10px 14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <span style={{ fontSize: '12.5px', color: '#B8B8C2', fontWeight: '700' }}>
                                الإجمالي المطلوب:
                            </span>
                            <span style={{
                                fontSize: '22px',
                                fontWeight: '900',
                                color: 'var(--gold-400)',
                            }}>
                                {activePackage.price.toFixed(2)} <span style={{ fontSize: '13px' }}>ج.م</span>
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={handleInstantCheckout}
                        className="emperor-btn-primary emperor-pulse"
                        style={{
                            width: '100%',
                            padding: '14px',
                            borderRadius: '14px',
                            fontSize: '14.5px',
                            fontWeight: '900',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            cursor: 'pointer',
                        }}
                    >
                        <Zap size={18} />
                        <span>اشحن الآن فورياً</span>
                        {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                    </button>
                </div>
            </div>
        </div>
    );
}