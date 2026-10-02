import React, { useState, useEffect } from 'react';
import { Zap, ShieldCheck, TrendingUp, Sparkles, Clock, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';

export default function LiveActivityTicker() {
    const { isRtl } = useLanguage();
    const { theme } = useTheme();

    const activities = [
        { id: 1, type: 'order', text: 'مستخدم من الجيزة شحن 60 شدة ببجي (60 UC) فورياً', time: 'منذ 4 ثوانٍ', icon: Zap, color: 'var(--gold-400)' },
        { id: 2, type: 'target', text: 'تاجر معتمد صرف تارجت بولا بقيمة 2,450 ج.م كاش', time: 'منذ 18 ثانية', icon: TrendingUp, color: 'var(--success)' },
        { id: 3, type: 'order', text: 'عميل استلم 575 VP فالورانت كود رسمي فوري', time: 'منذ 35 ثانية', icon: CheckCircle, color: '#38BDF8' },
        { id: 4, type: 'speed', text: 'متوسط سرعة تنفيذ الطلبات اللحظية الآن: 14 ثانية فقط', time: 'مباشر', icon: Clock, color: 'var(--gold-200)' },
        { id: 5, type: 'tier', text: 'موزع جديد ترقى إلى رتبة «وكيل ذهبي» بنجاح', time: 'منذ دقيقة', icon: Sparkles, color: 'var(--gold-300)' },
        { id: 6, type: 'security', text: 'جميع المعاملات مشفرة ومحمية بضمان استرداد 100%', time: 'حماية نشطة', icon: ShieldCheck, color: 'var(--success)' },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % activities.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [activities.length]);

    const activeItem = activities[currentIndex];
    const IconComponent = activeItem.icon;

    return (
        <div
            className="emperor-entrance live-activity-ticker-wrap"
            style={{
                marginBottom: '20px',
                background: 'linear-gradient(90deg, rgba(212, 165, 55, 0.08) 0%, rgba(17, 17, 24, 0.85) 50%, rgba(212, 165, 55, 0.08) 100%)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '16px',
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                backdropFilter: 'blur(10px)',
                width: '100%',
                boxSizing: 'border-box',
                overflow: 'hidden',
            }}
        >
            {/* Live Indicator Tag */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '3px 8px',
                    borderRadius: '9999px',
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    color: 'var(--success)',
                    fontSize: '11px',
                    fontWeight: '800',
                    letterSpacing: '0.2px',
                    whiteSpace: 'nowrap',
                }}>
                    <span style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: 'var(--success)',
                        boxShadow: '0 0 8px var(--success)',
                        animation: 'pulse-gold 2s infinite',
                        flexShrink: 0,
                    }} />
                    <span>نشاط مباشر</span>
                </span>
            </div>

            {/* Rotating Item */}
            <div
                key={activeItem.id}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    flex: '1 1 0%',
                    minWidth: 0,
                    overflow: 'hidden',
                    animation: 'fadeInUp 0.35s ease',
                }}
            >
                <div style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '6px',
                    background: 'rgba(212, 165, 55, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                }}>
                    <IconComponent size={13} color={activeItem.color} />
                </div>

                <span style={{
                    fontSize: '12px',
                    fontWeight: '700',
                    color: theme === 'light' ? '#F4F4F5' : 'var(--text-primary)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}>
                    {activeItem.text}
                </span>
            </div>

            {/* System Status (Desktop / Wide screens only) */}
            <div className="ticker-status-desktop" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '11px',
                color: 'var(--text-gold)',
                fontWeight: '700',
                flexShrink: 0,
            }}>
                <span style={{
                    padding: '3px 8px',
                    borderRadius: '6px',
                    background: 'rgba(212, 165, 55, 0.1)',
                    border: '1px solid var(--border-subtle)',
                    whiteSpace: 'nowrap',
                }}>
                    السيرفرات تعمل 100%
                </span>
            </div>
        </div>
    );
}
