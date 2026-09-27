import React from 'react';
import { Send, Bell, Gift, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function CommunityTelegramBanner() {
    const { isRtl } = useLanguage();

    return (
        <div
            className="emperor-entrance emperor-vip-card"
            style={{
                borderRadius: '24px',
                padding: 'clamp(24px, 4vw, 36px)',
                marginBottom: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '24px',
                background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.12) 0%, rgba(17, 17, 24, 0.95) 100%)',
                border: '1px solid rgba(14, 165, 233, 0.3)',
                boxShadow: '0 15px 40px rgba(0,0,0,0.5)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <div style={{ maxWidth: '580px', zIndex: 2 }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    background: 'rgba(14, 165, 233, 0.15)',
                    border: '1px solid rgba(14, 165, 233, 0.35)',
                    color: '#38BDF8',
                    fontSize: '11px',
                    fontWeight: '800',
                    marginBottom: '12px',
                }}>
                    <Send size={12} />
                    <span>مجتمع وتحديثات إمبراطور الرسمية</span>
                </div>

                <h3 style={{
                    fontSize: 'clamp(20px, 3vw, 26px)',
                    fontWeight: '900',
                    color: 'var(--text-primary)',
                    marginBottom: '8px',
                }}>
                    انضم لقناة تليجرام إمبراطور واحصل على أكواد خصم حصرية
                </h3>

                <p style={{
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.7',
                    margin: 0,
                }}>
                    تحديثات أسعار التارجت اليومية فور صدورها، كبونات خصم مجانية، ومسابقات شحن شدات وجواهر أسبوعية لأعضاء القناة فقط.
                </p>
            </div>

            <div style={{ zIndex: 2 }}>
                <a
                    href="https://t.me/emperor_cards"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="emperor-btn-primary"
                    style={{
                        padding: '14px 28px',
                        fontSize: '14.5px',
                        borderRadius: '16px',
                        background: 'linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)',
                        color: '#FFFFFF',
                        boxShadow: '0 8px 24px rgba(14, 165, 233, 0.35)',
                    }}
                >
                    <Send size={18} />
                    <span>انضم لقناة التليجرام الآن</span>
                    {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                </a>
            </div>
        </div>
    );
}
