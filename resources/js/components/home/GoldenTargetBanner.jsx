import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Headphones, Zap, ArrowLeft, ArrowRight, DollarSign, Sparkles, TrendingUp, Crown } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function GoldenTargetBanner() {
    const { t, isRtl } = useLanguage();
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="emperor-entrance emperor-vip-card emperor-shimmer"
            style={{
                borderRadius: '24px',
                padding: 'clamp(20px, 4vw, 36px) clamp(16px, 3.5vw, 32px)',
                marginBottom: '40px',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '24px',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Ambient Gold Radial Flare */}
            <div style={{
                position: 'absolute',
                top: '-100px',
                [isRtl ? 'right' : 'left']: '-100px',
                width: '320px',
                height: '320px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(212, 165, 55, 0.18) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />
            <div style={{
                position: 'absolute',
                bottom: '-80px',
                [isRtl ? 'left' : 'right']: '-80px',
                width: '240px',
                height: '240px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(212, 165, 55, 0.10) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            {/* Left Content */}
            <div style={{ maxWidth: '580px', zIndex: 2 }}>
                <div className="emperor-badge" style={{ marginBottom: '16px' }}>
                    <Crown size={13} />
                    <span>خدمة سحب الراتب وتسييل التارجت المعتمدة</span>
                </div>

                <h2 style={{
                    margin: '0 0 14px',
                    fontSize: 'clamp(20px, 3.5vw, 30px)',
                    fontWeight: '900',
                    color: 'var(--text-primary)',
                    lineHeight: '1.3',
                    letterSpacing: '-0.5px',
                }}>
                    {t('targetTitle')}
                </h2>

                <p style={{
                    margin: '0 0 20px',
                    fontSize: 'clamp(12.5px, 2vw, 14px)',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.75',
                    maxWidth: '500px',
                }}>
                    {t('targetDesc')}. نحول لك كاش فوري على فودافون كاش، إنستاباي، الحساب البنكي، أو محفظتك الرقمية في أقل من 5 دقائق!
                </p>

                {/* Trust Badges */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '14px',
                    fontSize: '12px',
                    color: 'var(--text-gold)',
                    fontWeight: '700',
                }}>
                    {[
                        { icon: ShieldCheck, text: 'ضمان وأمان 100%' },
                        { icon: Zap, text: 'تحويل كاش فوري' },
                        { icon: Headphones, text: 'دعم فني 24/7' },
                    ].map(({ icon: Icon, text }) => (
                        <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Icon size={15} color="var(--gold-400)" />
                            <span>{text}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right: CTA */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', zIndex: 2, width: '100%', maxWidth: '340px' }}>
                <Link
                    to="/target/sell"
                    className="emperor-btn-primary emperor-pulse"
                    style={{
                        padding: 'clamp(12px, 2.5vw, 16px) clamp(18px, 3vw, 28px)',
                        fontSize: 'clamp(13.5px, 2.8vw, 15.5px)',
                        borderRadius: '16px',
                        width: '100%',
                        boxSizing: 'border-box',
                    }}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    <DollarSign size={22} strokeWidth={2.5} />
                    <span>{t('targetSelling')} — بيع تارجت الآن</span>
                    {isRtl ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                </Link>

                <span style={{
                    fontSize: '12px',
                    color: 'var(--text-muted)',
                    textAlign: 'center',
                    fontWeight: '600',
                }}>
                    أعلى سعر رسمي معتمد
                </span>
            </div>
        </div>
    );
}
