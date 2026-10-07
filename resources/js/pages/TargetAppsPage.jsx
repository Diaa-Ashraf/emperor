import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import EmptyState from '../components/ui/EmptyState';
import { targetApi } from '../api/endpoints';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { TargetAppIconRenderer } from '../components/target/TargetAppIcons';
import VideoBackground from '../components/home/VideoBackground';

export default function TargetAppsPage() {
    const { isRtl, t } = useLanguage();
    const { theme } = useTheme();
    const isLight = theme === 'light';
    const navigate = useNavigate();
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch Target Apps dynamically from Database via API
    useEffect(() => {
        targetApi.getApps()
            .then(res => {
                if (res?.data) {
                    const appData = Array.isArray(res.data) ? res.data : res.data.data || [];
                    setApps(appData);
                }
            })
            .catch(() => {
                setApps([]);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <MainLayout>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '10px 0 40px' }}>
                {/* ═══ Top Action Bar with Gold Accents ═══ */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '22px',
                    gap: '12px',
                }}>
                    <Link
                        to="/target/orders"
                        preventScrollReset={true}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 20px',
                            borderRadius: '24px',
                            background: isLight ? 'rgba(212, 165, 55, 0.14)' : 'rgba(229, 195, 120, 0.08)',
                            border: isLight ? '1.5px solid rgba(212, 165, 55, 0.5)' : '1.5px solid rgba(229, 195, 120, 0.4)',
                            color: isLight ? '#9A7210' : '#E5C378',
                            fontSize: '13.5px',
                            fontWeight: '800',
                            textDecoration: 'none',
                            transition: 'all 0.25s ease',
                            boxShadow: isLight ? '0 4px 15px rgba(212, 165, 55, 0.15)' : '0 4px 15px rgba(0, 0, 0, 0.4)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = isLight ? '#9A7210' : '#FFDF73';
                            e.currentTarget.style.boxShadow = '0 0 15px rgba(229, 195, 120, 0.3)';
                            e.currentTarget.style.background = isLight ? 'rgba(212, 165, 55, 0.22)' : 'rgba(229, 195, 120, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = isLight ? 'rgba(212, 165, 55, 0.5)' : 'rgba(229, 195, 120, 0.4)';
                            e.currentTarget.style.boxShadow = isLight ? '0 4px 15px rgba(212, 165, 55, 0.15)' : '0 4px 15px rgba(0, 0, 0, 0.4)';
                            e.currentTarget.style.background = isLight ? 'rgba(212, 165, 55, 0.14)' : 'rgba(229, 195, 120, 0.08)';
                        }}
                    >
                        <FileText size={16} />
                        <span>{t('ordersHistory', 'سجل الطلبات')}</span>
                    </Link>

                    <button
                        onClick={() => navigate(-1)}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '9px 18px',
                            borderRadius: '24px',
                            background: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.04)',
                            border: isLight ? '1.5px solid rgba(212, 165, 55, 0.35)' : '1px solid rgba(255, 255, 255, 0.12)',
                            color: isLight ? '#475569' : '#D1D1DB',
                            fontSize: '13.5px',
                            fontWeight: '700',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            boxShadow: isLight ? '0 2px 8px rgba(0,0,0,0.04)' : 'none',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#E5C378';
                            e.currentTarget.style.color = isLight ? '#0F172A' : '#FFFFFF';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = isLight ? 'rgba(212, 165, 55, 0.35)' : 'rgba(255, 255, 255, 0.12)';
                            e.currentTarget.style.color = isLight ? '#475569' : '#D1D1DB';
                        }}
                    >
                        <span>{t('back', 'رجوع')}</span>
                        {isRtl ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}
                    </button>
                </div>

                {/* ═══ Ultra-Luxury Gold Frame Container Box ═══ */}
                <div style={{
                    background: isLight
                        ? 'radial-gradient(ellipse at 50% 0%, #FFFDF8 0%, #FEF8EA 50%, #FDF1D5 100%)'
                        : 'radial-gradient(ellipse at 50% 0%, #151522 0%, #0C0C12 70%, #08080C 100%)',
                    border: isLight ? '2px solid rgba(212, 165, 55, 0.55)' : '2px solid #E5C378',
                    borderRadius: '28px',
                    padding: 'clamp(20px, 3.5vw, 36px)',
                    boxShadow: isLight
                        ? '0 12px 35px rgba(212, 165, 55, 0.15), 0 4px 15px rgba(0, 0, 0, 0.04)'
                        : '0 0 35px rgba(212, 165, 55, 0.18), 0 20px 60px rgba(0, 0, 0, 0.9)',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    {/* Subtle Golden Ambient Top Light */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: '15%',
                        right: '15%',
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent, #FFE082, transparent)',
                        opacity: isLight ? 0.9 : 0.8,
                    }} />

                    {/* Section Header: • اختر التطبيق */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '12px',
                        marginBottom: '28px',
                        paddingBottom: '16px',
                        borderBottom: isLight ? '1px solid rgba(212, 165, 55, 0.25)' : '1px solid rgba(229, 195, 120, 0.15)',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{
                                color: isLight ? '#D4A537' : '#FFD700',
                                fontSize: '24px',
                                lineHeight: '1',
                                textShadow: isLight ? 'none' : '0 0 12px rgba(255, 215, 0, 0.8)',
                            }}>
                                •
                            </span>
                            <h2 style={{
                                margin: 0,
                                fontSize: '20px',
                                fontWeight: '900',
                                color: isLight ? '#0F172A' : '#FFFFFF',
                                letterSpacing: '-0.3px',
                            }}>
                                {t('selectApp', 'اختر التطبيق')}
                            </h2>
                        </div>

                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '12.5px',
                            fontWeight: '800',
                            color: isLight ? '#9A7210' : '#E5C378',
                            background: isLight ? 'rgba(212, 165, 55, 0.18)' : 'rgba(229, 195, 120, 0.08)',
                            border: isLight ? '1px solid rgba(212, 165, 55, 0.45)' : '1px solid rgba(229, 195, 120, 0.25)',
                            padding: '4px 12px',
                            borderRadius: '20px',
                        }}>
                            <Sparkles size={13} color={isLight ? '#9A7210' : '#FFD700'} />
                            <span>{t('instantCashTopRate', 'استلام فوري كاش بأعلى سعر صرف')}</span>
                        </div>
                    </div>
                    <VideoBackground>
                        {loading ? (
                            <div style={{ padding: '70px 0' }}>
                                <LoadingSpinner text={t('loadingTargetApps', 'جاري تحميل التطبيقات وأسعار الصرف من قاعدة البيانات...')} />
                            </div>
                        ) : apps.length === 0 ? (
                            <EmptyState
                                title={t('noTargetApps', 'لا توجد تطبيقات تارجت حالياً')}
                                description={t('noTargetAppsDesc', 'لم يتم تفعيل أو إضافة أي تطبيقات بيع تارجت في لوحة التحكم بعد')}
                                actionText={t('refreshPage', 'تحديث الصفحة')}
                                onAction={() => window.location.reload()}
                            />
                        ) : (
                            <div className="target-apps-grid">
                                {apps.map((app) => (
                                    <Link
                                        key={app.id}
                                        to={`/target-orders/new?app_id=${app.id}&app_name=${encodeURIComponent(app.name)}`}
                                        style={{
                                            textDecoration: 'none',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            width: '100%',
                                            maxWidth: '150px',
                                            padding: '4px 6px',
                                            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                                        }}
                                        onMouseEnter={(e) => {
                                            const iconBox = e.currentTarget.querySelector('.app-icon-frame');
                                            if (iconBox) {
                                                iconBox.style.transform = 'translateY(-6px) scale(1.04)';
                                                iconBox.style.borderColor = '#FFE082';
                                                iconBox.style.boxShadow = isLight ? '0 10px 25px rgba(212, 165, 55, 0.35)' : '0 14px 32px rgba(212, 165, 55, 0.45)';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            const iconBox = e.currentTarget.querySelector('.app-icon-frame');
                                            if (iconBox) {
                                                iconBox.style.transform = 'translateY(0) scale(1)';
                                                iconBox.style.borderColor = isLight ? 'rgba(212, 165, 55, 0.7)' : 'rgba(229, 195, 120, 0.85)';
                                                iconBox.style.boxShadow = isLight ? '0 6px 16px rgba(0, 0, 0, 0.08)' : '0 8px 24px rgba(0, 0, 0, 0.65)';
                                            }
                                        }}
                                    >
                                        {/* ── App Icon Frame with Distinct Golden Bezel ── */}
                                        <div
                                            className="app-icon-frame"
                                            style={{
                                                width: '94px',
                                                height: '94px',
                                                borderRadius: '24px',
                                                border: isLight ? '2.5px solid rgba(212, 165, 55, 0.7)' : '2.5px solid rgba(229, 195, 120, 0.85)',
                                                background: isLight ? '#FFFFFF' : '#0E0E14',
                                                boxShadow: isLight ? '0 6px 16px rgba(0, 0, 0, 0.08)' : '0 8px 24px rgba(0, 0, 0, 0.65)',
                                                overflow: 'hidden',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                                                cursor: 'pointer',
                                                position: 'relative',
                                            }}
                                        >
                                            <TargetAppIconRenderer app={app} size={94} />
                                        </div>

                                        {/* ── App Name in Crisp Dark / White ── */}
                                        <div style={{
                                            fontSize: '14.5px',
                                            fontWeight: '800',
                                            color: isLight ? '#0F172A' : '#FFFFFF',
                                            marginTop: '10px',
                                            marginBottom: '4px',
                                            lineHeight: '1.3',
                                            letterSpacing: '-0.2px',
                                        }}>
                                            {app.name}
                                        </div>

                                        {/* ── Rate / Price Text in Radiant Gold (from Database) ── */}
                                        <div style={{
                                            fontSize: '13px',
                                            fontWeight: '800',
                                            color: isLight ? '#9A7210' : '#E5C378',
                                            letterSpacing: '-0.2px',
                                            textShadow: isLight ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.6)',
                                        }}>
                                            {app.rate_text || `${app.rate_per_unit || 48} EGP / دولار`}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </VideoBackground>
                </div>
            </div>
        </MainLayout>
    );
}
