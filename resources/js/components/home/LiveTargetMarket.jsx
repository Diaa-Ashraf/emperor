import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, DollarSign, ArrowLeft, ArrowRight, ShieldCheck, Zap, Calculator, RefreshCw, Smartphone } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function LiveTargetMarket() {
    const { isRtl } = useLanguage();

    const targetApps = [
        { id: 'pola', name: 'بولا (Pola App)', ratePer10k: 125, trend: '+3.5%', status: 'نشط جداً' },
        { id: 'mego', name: 'ميجو لايف (Mego Live)', ratePer10k: 132, trend: '+4.1%', status: 'مرتفع' },
        { id: 'yomi', name: 'ايومي شات (Yomi Chat)', ratePer10k: 110, trend: '+1.8%', status: 'مستقر' },
        { id: 'azal', name: 'ازال لايف (Azal Live)', ratePer10k: 140, trend: '+5.0%', status: 'أعلى سعر' },
        { id: 'tada', name: 'تادا شات (Tada Chat)', ratePer10k: 115, trend: '+2.2%', status: 'نشط' },
        { id: 'bigo', name: 'بيجو لايف (Bigo Live)', ratePer10k: 145, trend: '+2.9%', status: 'طلب عالي' },
    ];

    const [selectedAppId, setSelectedAppId] = useState(targetApps[0].id);
    const [calcPoints, setCalcPoints] = useState(50000);

    const activeApp = targetApps.find((a) => a.id === selectedAppId) || targetApps[0];
    const estimatedPayout = ((calcPoints / 10000) * activeApp.ratePer10k).toFixed(2);

    return (
        <div
            className="emperor-entrance emperor-vip-card"
            style={{
                borderRadius: '24px',
                padding: 'clamp(16px, 3.5vw, 32px)',
                marginBottom: '40px',
                border: '1px solid var(--border-strong)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.6), var(--shadow-gold)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
                marginBottom: '26px',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        background: 'rgba(212, 165, 55, 0.12)',
                        border: '1px solid var(--border-medium)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <TrendingUp size={22} color="var(--gold-400)" />
                    </div>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <h2 style={{
                                margin: 0,
                                fontSize: 'clamp(18px, 3vw, 24px)',
                                fontWeight: '900',
                                color: 'var(--text-primary)',
                            }}>
                                بورصة وسحب التارجت اللحظية
                            </h2>
                            <span style={{
                                background: 'rgba(16, 185, 129, 0.15)',
                                color: 'var(--success)',
                                fontSize: '11px',
                                fontWeight: '800',
                                padding: '2px 8px',
                                borderRadius: '9999px',
                            }}>
                                أسعار صرف اليوم
                            </span>
                        </div>
                        <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                            حوّل نقاط وكوينز تطبيقات البث إلى كاش فوراً عبر إنستاباي، فودافون كاش، أو محفظتك
                        </p>
                    </div>
                </div>

                <Link
                    to="/target/sell"
                    className="emperor-btn-ghost"
                    style={{
                        padding: '8px 18px',
                        fontSize: '12.5px',
                        borderRadius: '9999px',
                    }}
                >
                    <span>فتح منصة التارجت الكاملة</span>
                    {isRtl ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
                </Link>
            </div>

            {/* Content: Left Rates Grid + Right Live Calculator */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                gap: '20px',
                alignItems: 'start',
            }}>
                {/* 1. Live Rates App Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 140px), 1fr))',
                    gap: '10px',
                }}>
                    {targetApps.map((app) => {
                        const isSelected = app.id === selectedAppId;
                        return (
                            <div
                                key={app.id}
                                onClick={() => setSelectedAppId(app.id)}
                                style={{
                                    background: isSelected
                                        ? 'linear-gradient(135deg, rgba(212, 165, 55, 0.15) 0%, rgba(17, 17, 24, 0.9) 100%)'
                                        : 'var(--bg-card)',
                                    border: `1.5px solid ${isSelected ? 'var(--gold-400)' : 'var(--border-subtle)'}`,
                                    borderRadius: '16px',
                                    padding: '14px',
                                    cursor: 'pointer',
                                    transition: 'all 0.25s ease',
                                    transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: 'rgba(212, 165, 55, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Smartphone size={16} color="#F5D061" />
                                    </div>
                                    <span style={{
                                        fontSize: '10px',
                                        fontWeight: '800',
                                        color: 'var(--success)',
                                        background: 'rgba(16, 185, 129, 0.1)',
                                        padding: '2px 6px',
                                        borderRadius: '6px',
                                    }}>
                                        {app.trend}
                                    </span>
                                </div>

                                <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px' }}>
                                    {app.name}
                                </div>

                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                                    <span style={{ fontSize: '16px', fontWeight: '900', color: 'var(--gold-300)' }}>
                                        {app.ratePer10k} ج.م
                                    </span>
                                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                                        / 10,000 نقطة
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* 2. Interactive Calculator Card */}
                <div style={{
                    background: 'var(--bg-card)',
                    border: '1.5px solid var(--border-medium)',
                    borderRadius: '22px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    position: 'relative',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Calculator size={18} color="var(--gold-400)" />
                        <span style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-gold)' }}>
                            حاسبة تسييل التارجت الفورية: {activeApp.name}
                        </span>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '700', marginBottom: '6px' }}>
                            أدخل عدد النقاط أو الكوينز:
                        </label>
                        <input
                            type="number"
                            step="5000"
                            min="10000"
                            value={calcPoints}
                            onChange={(e) => setCalcPoints(Math.max(0, Number(e.target.value)))}
                            style={{
                                width: '100%',
                                background: 'var(--bg-surface)',
                                border: '1px solid var(--border-subtle)',
                                borderRadius: '12px',
                                padding: '12px 14px',
                                color: 'var(--text-primary)',
                                fontSize: '16px',
                                fontWeight: '800',
                                outline: 'none',
                                fontFamily: 'var(--font-cairo)',
                            }}
                        />
                    </div>

                    {/* Quick point presets */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {[20000, 50000, 100000, 250000].map((preset) => (
                            <button
                                key={preset}
                                onClick={() => setCalcPoints(preset)}
                                style={{
                                    padding: '4px 10px',
                                    borderRadius: '8px',
                                    background: calcPoints === preset ? 'rgba(212, 165, 55, 0.2)' : 'var(--bg-surface)',
                                    border: `1px solid ${calcPoints === preset ? 'var(--gold-400)' : 'var(--border-subtle)'}`,
                                    color: calcPoints === preset ? 'var(--gold-200)' : 'var(--text-secondary)',
                                    fontSize: '11px',
                                    fontWeight: '800',
                                    cursor: 'pointer',
                                    fontFamily: 'var(--font-cairo)',
                                }}
                            >
                                {(preset / 1000).toLocaleString()}K
                            </button>
                        ))}
                    </div>

                    {/* Estimated Cash Value */}
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(212, 165, 55, 0.15) 0%, rgba(16, 185, 129, 0.08) 100%)',
                        border: '1px solid var(--border-medium)',
                        borderRadius: '16px',
                        padding: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <div>
                            <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', fontWeight: '700' }}>
                                تستلم كاش فوراً:
                            </div>
                            <div style={{ fontSize: '24px', fontWeight: '900', color: 'var(--gold-300)' }}>
                                {Number(estimatedPayout).toLocaleString()} <span style={{ fontSize: '14px' }}>ج.م</span>
                            </div>
                        </div>

                        <div style={{ textAlign: 'end', fontSize: '11px', color: 'var(--success)', fontWeight: '800' }}>
                            تحويل خلال دقيقتين
                            <br />
                            <span style={{ color: 'var(--text-muted)', fontWeight: '600' }}>إنستاباي / فودافون كاش</span>
                        </div>
                    </div>

                    {/* CTA */}
                    <Link
                        to={`/target/sell?app=${activeApp.id}`}
                        className="emperor-btn-primary"
                        style={{
                            width: '100%',
                            padding: '13px',
                            borderRadius: '14px',
                            fontSize: '14px',
                        }}
                    >
                        <DollarSign size={18} />
                        <span>بيع التارجت واستلم المبلغ الآن</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
