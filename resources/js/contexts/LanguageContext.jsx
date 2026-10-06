import React, { createContext, useContext, useState, useEffect } from 'react';
import arLocale from '../locales/ar.json';
import enLocale from '../locales/en.json';

const LanguageContext = createContext();

const translations = {
    ar: arLocale,
    en: enLocale,
};

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('emperor_lang') || 'ar';
    });

    useEffect(() => {
        localStorage.setItem('emperor_lang', language);
        const isRtl = language === 'ar';
        document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
        document.documentElement.lang = language;
        document.body.dir = isRtl ? 'rtl' : 'ltr';
    }, [language]);

    const switchLanguage = (lang) => {
        if (lang === 'ar' || lang === 'en') {
            setLanguage(lang);
        }
    };

    const t = (key, defaultText = '') => {
        return translations[language]?.[key] || translations.ar?.[key] || defaultText || key;
    };

    const isRtl = language === 'ar';

    return (
        <LanguageContext.Provider value={{ language, switchLanguage, t, isRtl }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

