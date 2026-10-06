import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { getSiteName, getSiteLogo } from '../../utils/settingsHelper';

export default function AppFooter() {
    const { theme } = useTheme();
    const { t, language } = useLanguage();
    const isLight = theme === 'light';
    const currentYear = new Date().getFullYear();
    const siteName = getSiteName() || (language === 'en' ? 'EMPEROR CARD' : 'إمبراطور كارد');

    return (
        <footer className="emperor-app-footer">
            <div className="emperor-app-footer-inner">
                {/* Brand Logo & Copyright */}
                <div className="emperor-app-footer-brand">
                    <div
                        style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '7px',
                            overflow: 'hidden',
                            border: '1px solid rgba(212, 165, 55, 0.4)',
                            background: isLight ? '#ffffff' : '#0a0a10',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            boxShadow: '0 0 8px rgba(212, 165, 55, 0.25)',
                        }}
                    >
                        <img
                            src={getSiteLogo()}
                            alt="Logo"
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                    </div>

                    <span
                        style={{
                            color: isLight ? '#475569' : '#94A3B8',
                            fontWeight: '600',
                            lineHeight: '1.6',
                        }}
                    >
                        {t(
                            'rights',
                            language === 'en'
                                ? `All Rights Reserved © ${currentYear} — ${siteName}`
                                : `جميع الحقوق محفوظة © ${currentYear} — منصة ${siteName}`
                        )}
                    </span>
                </div>

                {/* Developer Team Credits */}
                <div>
                    <Link
                        to="/created-by"
                        style={{
                            color: isLight ? '#b45309' : '#D4A537',
                            textDecoration: 'none',
                            fontWeight: '700',
                            fontSize: '12px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            padding: '5px 12px',
                            borderRadius: '8px',
                            background: isLight ? 'rgba(212, 165, 55, 0.1)' : 'rgba(212, 165, 55, 0.08)',
                            border: isLight ? '1px solid rgba(212, 165, 55, 0.25)' : '1px solid rgba(212, 165, 55, 0.18)',
                            transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = isLight
                                ? 'rgba(212, 165, 55, 0.2)'
                                : 'rgba(212, 165, 55, 0.16)';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = isLight
                                ? 'rgba(212, 165, 55, 0.1)'
                                : 'rgba(212, 165, 55, 0.08)';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        <span>{t('developedByTeam', 'تم التطوير بواسطة فريق العمل')}</span>
                        <ExternalLink size={12} />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
