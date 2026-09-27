import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
    ar: {
        // General
        appName: 'إمبراطور',
        tagline: 'المنصة الرقمية المعتمدة',
        searchPlaceholder: 'ابحث عن منتج أو لعبة أو قسم...',
        home: 'الرئيسية',
        myAccount: 'حسابي',
        security: 'حماية الحساب',
        referrals: 'رابط الإحالة اكسب واسحب',
        myOrders: 'طلباتي',
        targetSelling: 'بيع التارجت',
        targetTitle: 'اضغط هنا لسحب راتبك',
        targetDesc: 'بيع كوينز وتارجت تطبيقات البث واستلم كاش فوري بأعلى سعر',
        settings: 'الإعدادات',
        support: 'اتصل بنا',
        logout: 'تسجيل الخروج',
        login: 'تسجيل الدخول',
        register: 'حساب جديد',
        storeMember: 'عضو المتجر',
        vipMember: 'عميل إمبراطور VIP',
        inStock: 'متوفر',
        instantDelivery: 'تسليم فوري',
        bestSellers: 'الأكثر مبيعاً',
        viewAll: 'عرض الكل',
        wallet: 'المحفظة',
        availableBalance: 'الرصيد المتاح',
        chargeWallet: 'شحن المحفظة',
        withdrawSalary: 'اسحب راتبك',
        rateUs: 'معاملات آمنة 100%',
        successRate: 'معدل نجاح 99.9%',
        copied: 'تم النسخ بنجاح!',
        userId: 'المعرف',
        allCategories: 'الأقسام والخدمات الرئيسية',
        appsCategory: 'قسم التطبيقات',
        gamesCategory: 'قسم الألعاب',
        telecomCategory: 'قسم شحن الاتصالات',
        tvCategory: 'قسم اشتراكات التلفاز',
        enterCategory: 'دخول القسم',
        buyNow: 'شحن الآن',
        priceStarts: 'الأسعار تبدأ من',
        currency: 'ج.م',
        rights: 'جميع الحقوق محفوظة © منصة إمبراطور الرقمية',
    },
    en: {
        // General
        appName: 'EMPEROR',
        tagline: 'The Ultimate Digital Platform',
        searchPlaceholder: 'Search for games, cards, apps...',
        home: 'Home',
        myAccount: 'My Account',
        security: 'Account Security',
        referrals: 'Referral Earn & Withdraw',
        myOrders: 'My Orders',
        targetSelling: 'Target Selling',
        targetTitle: 'Click Here To Withdraw Your Salary',
        targetDesc: 'Sell live app coins & target for instant cash at top rates',
        settings: 'Settings',
        support: 'Contact Us',
        logout: 'Logout',
        login: 'Login',
        register: 'Sign Up',
        storeMember: 'Store Member',
        vipMember: 'Emperor VIP Member',
        inStock: 'In Stock',
        instantDelivery: 'Instant Delivery',
        bestSellers: 'Best Sellers',
        viewAll: 'View All',
        wallet: 'Wallet',
        availableBalance: 'Available Balance',
        chargeWallet: 'Top Up Wallet',
        withdrawSalary: 'Withdraw Cash',
        rateUs: '100% Secure Transactions',
        successRate: '99.9% Success Rate',
        copied: 'Copied successfully!',
        userId: 'ID',
        allCategories: 'Main Categories & Services',
        appsCategory: 'Live Apps Section',
        gamesCategory: 'Gaming Section',
        telecomCategory: 'Telecom Recharge',
        tvCategory: 'TV Subscriptions',
        enterCategory: 'Enter Section',
        buyNow: 'Top Up Now',
        priceStarts: 'Starting from',
        currency: 'EGP',
        rights: 'All Rights Reserved © Emperor Digital Platform',
    }
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

    const t = (key) => {
        return translations[language]?.[key] || translations.ar?.[key] || key;
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
