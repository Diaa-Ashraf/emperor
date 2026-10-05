import React from 'react';

export default function PaymentBrandLogo({ methodId, size = 68 }) {
    const id = (methodId || '').toLowerCase();

    // 1. Vodafone Cash
    if (id.includes('vodafone') || id.includes('vf')) {
        return (
            <div style={{
                width: size,
                height: size,
                borderRadius: '50%',
                background: 'radial-gradient(circle, #E60000 0%, #B30000 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(230, 0, 0, 0.45)',
                border: '2px solid #FF4D4D',
                padding: '4px',
                boxSizing: 'border-box',
            }}>
                <svg viewBox="0 0 24 24" width={size * 0.44} height={size * 0.44} fill="#FFFFFF">
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 3.66 1.97 6.86 4.9 8.61L8.5 17.5C6.96 16.27 6 14.25 6 12c0-3.31 2.69-6 6-6s6 2.69 6 6c0 2.25-.96 4.27-2.5 5.5l1.6 3.11C20.03 18.86 22 15.66 22 12c0-5.52-4.48-10-10-10zm0 6c-2.21 0-4 1.79-4 4 0 1.25.58 2.36 1.48 3.1l1.62-3.13C10.74 11.7 10.5 11.37 10.5 11c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5c0 .37-.24.7-.6 1.07l1.62 3.13C15.42 14.36 16 13.25 16 12c0-2.21-1.79-4-4-4z"/>
                </svg>
                <span style={{ color: '#FFFFFF', fontSize: `${Math.max(8, size * 0.12)}px`, fontWeight: '900', letterSpacing: '-0.3px', marginTop: '1px' }}>
                    vodafone
                </span>
                <span style={{ color: '#FFD700', fontSize: `${Math.max(7, size * 0.11)}px`, fontWeight: '800', textTransform: 'uppercase' }}>
                    cash
                </span>
            </div>
        );
    }

    // 2. Etisalat Cash
    if (id.includes('etisalat')) {
        return (
            <div style={{
                width: size,
                height: size,
                borderRadius: '50%',
                background: 'radial-gradient(circle, #78BE20 0%, #4D8010 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(120, 190, 32, 0.45)',
                border: '2px solid #99E633',
                padding: '4px',
                boxSizing: 'border-box',
            }}>
                <svg viewBox="0 0 24 24" width={size * 0.46} height={size * 0.46} fill="#FFFFFF">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.93V18h-2v-1.07c-2.31-.47-4-2.27-4-4.93h2c0 1.65 1.35 3 3 3s3-1.35 3-3-1.35-3-3-3c-2.76 0-5-2.24-5-5 0-2.66 1.69-4.46 4-4.93V3h2v1.07c2.31.47 4 2.27 4 4.93h-2c0-1.65-1.35-3-3-3s-3 1.35-3 3 1.35 3 3 3c2.76 0 5 2.24 5 5 0 2.66-1.69 4.46-4 4.93z"/>
                </svg>
                <span style={{ color: '#FFFFFF', fontSize: `${Math.max(9, size * 0.14)}px`, fontWeight: '900' }}>
                    اتصالات
                </span>
                <span style={{ color: '#FFD700', fontSize: `${Math.max(7, size * 0.11)}px`, fontWeight: '800' }}>
                    CASH
                </span>
            </div>
        );
    }

    // 3. InstaPay Egypt
    if (id.includes('instapay') || id.includes('insta')) {
        return (
            <div style={{
                width: size,
                height: size,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #4A148C 0%, #7B1FA2 50%, #FF6F00 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(123, 31, 162, 0.5)',
                border: '2px solid #BA68C8',
                padding: '4px',
                boxSizing: 'border-box',
            }}>
                <span style={{ color: '#FFD700', fontSize: `${Math.max(12, size * 0.28)}px`, fontWeight: '900', fontStyle: 'italic', letterSpacing: '-0.5px' }}>
                    i<span style={{ color: '#FFFFFF' }}>P</span>
                </span>
                <span style={{ color: '#FFFFFF', fontSize: `${Math.max(8, size * 0.13)}px`, fontWeight: '900', letterSpacing: '0.5px' }}>
                    INSTAPAY
                </span>
                <span style={{ color: '#FFB300', fontSize: `${Math.max(6, size * 0.1)}px`, fontWeight: '800' }}>
                    انستا باي
                </span>
            </div>
        );
    }

    // 4. Orange Cash / Money
    if (id.includes('orange')) {
        return (
            <div style={{
                width: size,
                height: size,
                borderRadius: '50%',
                background: 'radial-gradient(circle, #FF6600 0%, #CC5200 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(255, 102, 0, 0.45)',
                border: '2px solid #FFA366',
                padding: '4px',
                boxSizing: 'border-box',
            }}>
                <div style={{ width: size * 0.38, height: size * 0.38, background: '#000000', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: '#FF6600', fontWeight: '900', fontSize: `${size * 0.25}px` }}>O</span>
                </div>
                <span style={{ color: '#FFFFFF', fontSize: `${Math.max(8, size * 0.13)}px`, fontWeight: '900', marginTop: '2px' }}>
                    Orange
                </span>
                <span style={{ color: '#FFD700', fontSize: `${Math.max(6, size * 0.1)}px`, fontWeight: '800' }}>
                    Money
                </span>
            </div>
        );
    }

    // 5. USDT / Tether Crypto
    if (id.includes('usdt') || id.includes('tether') || id.includes('crypto')) {
        return (
            <div style={{
                width: size,
                height: size,
                borderRadius: '50%',
                background: 'radial-gradient(circle, #26A17B 0%, #1A7056 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(38, 161, 123, 0.45)',
                border: '2px solid #53D2A9',
                padding: '4px',
                boxSizing: 'border-box',
            }}>
                <span style={{ color: '#FFFFFF', fontSize: `${Math.max(16, size * 0.36)}px`, fontWeight: '900', lineHeight: '1' }}>
                    ₮
                </span>
                <span style={{ color: '#FFFFFF', fontSize: `${Math.max(8, size * 0.14)}px`, fontWeight: '900', letterSpacing: '0.5px' }}>
                    USDT
                </span>
                <span style={{ color: '#A7F3D0', fontSize: `${Math.max(6, size * 0.1)}px`, fontWeight: '800' }}>
                    TRC20
                </span>
            </div>
        );
    }

    // 6. Binance Pay
    if (id.includes('binance')) {
        return (
            <div style={{
                width: size,
                height: size,
                borderRadius: '50%',
                background: 'radial-gradient(circle, #1E2329 0%, #0B0E11 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(243, 186, 47, 0.3)',
                border: '2px solid #F3BA2F',
                padding: '4px',
                boxSizing: 'border-box',
            }}>
                <svg viewBox="0 0 24 24" width={size * 0.4} height={size * 0.4} fill="#F3BA2F">
                    <path d="M12 3.5l3.5 3.5-3.5 3.5-3.5-3.5L12 3.5zm-5.5 5.5l3.5 3.5-3.5 3.5-3.5-3.5 3.5-3.5zm11 0l3.5 3.5-3.5 3.5-3.5-3.5 3.5-3.5zm-5.5 5.5l3.5 3.5-3.5 3.5-3.5-3.5 3.5-3.5z"/>
                </svg>
                <span style={{ color: '#F3BA2F', fontSize: `${Math.max(8, size * 0.13)}px`, fontWeight: '900', letterSpacing: '0.3px' }}>
                    BINANCE
                </span>
                <span style={{ color: '#FFFFFF', fontSize: `${Math.max(6, size * 0.1)}px`, fontWeight: '800' }}>
                    PAY
                </span>
            </div>
        );
    }

    // 7. Ziraat Bankasi (Turkey)
    if (id.includes('ziraat') || id.includes('turkey')) {
        return (
            <div style={{
                width: size,
                height: size,
                borderRadius: '50%',
                background: 'radial-gradient(circle, #E30613 0%, #99040D 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(227, 6, 19, 0.4)',
                border: '2px solid #FF6670',
                padding: '4px',
                boxSizing: 'border-box',
            }}>
                <svg viewBox="0 0 24 24" width={size * 0.38} height={size * 0.38} fill="#FFFFFF">
                    <path d="M12 2L2 7v2h20V7L12 2zm1 17h4v-7h-4v7zm-6 0h4v-7H7v7zm13 2H4v-2h16v2z"/>
                </svg>
                <span style={{ color: '#FFFFFF', fontSize: `${Math.max(7, size * 0.12)}px`, fontWeight: '900', marginTop: '2px' }}>
                    Ziraat
                </span>
                <span style={{ color: '#FFD700', fontSize: `${Math.max(6, size * 0.1)}px`, fontWeight: '800' }}>
                    Bankası
                </span>
            </div>
        );
    }

    // 8. Sham Cash (Syria)
    if (id.includes('sham') || id.includes('syria')) {
        return (
            <div style={{
                width: size,
                height: size,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #007A3D 0%, #004D26 50%, #000000 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(0, 122, 61, 0.4)',
                border: '2px solid #33CC77',
                padding: '4px',
                boxSizing: 'border-box',
            }}>
                <span style={{ color: '#FFFFFF', fontSize: `${Math.max(11, size * 0.22)}px`, fontWeight: '900' }}>
                    شام كاش
                </span>
                <span style={{ color: '#FFD700', fontSize: `${Math.max(7, size * 0.11)}px`, fontWeight: '800' }}>
                    SHAM CASH
                </span>
            </div>
        );
    }

    // 9. STC Pay / Al Rajhi (Saudi)
    if (id.includes('saudi') || id.includes('stc') || id.includes('rajhi')) {
        return (
            <div style={{
                width: size,
                height: size,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #4F008C 0%, #2E0054 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(79, 0, 140, 0.4)',
                border: '2px solid #9D4EDD',
                padding: '4px',
                boxSizing: 'border-box',
            }}>
                <span style={{ color: '#FFD700', fontSize: `${Math.max(10, size * 0.22)}px`, fontWeight: '900' }}>
                    الراجحي
                </span>
                <span style={{ color: '#FFFFFF', fontSize: `${Math.max(8, size * 0.13)}px`, fontWeight: '800' }}>
                    stc pay
                </span>
            </div>
        );
    }

    // 10. CliQ / Zain Cash (Jordan)
    if (id.includes('jordan') || id.includes('cliq') || id.includes('zain')) {
        return (
            <div style={{
                width: size,
                height: size,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #D4145A 0%, #9B0038 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(212, 20, 90, 0.4)',
                border: '2px solid #FF4D88',
                padding: '4px',
                boxSizing: 'border-box',
            }}>
                <span style={{ color: '#FFFFFF', fontSize: `${Math.max(12, size * 0.26)}px`, fontWeight: '900' }}>
                    CliQ
                </span>
                <span style={{ color: '#FFD700', fontSize: `${Math.max(7, size * 0.11)}px`, fontWeight: '800' }}>
                    الأردن JOD
                </span>
            </div>
        );
    }

    // 11. Yemen / Kuraimi
    if (id.includes('yemen') || id.includes('kuraimi') || id.includes('onecash')) {
        return (
            <div style={{
                width: size,
                height: size,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #005691 0%, #002B49 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(0, 86, 145, 0.4)',
                border: '2px solid #3399FF',
                padding: '4px',
                boxSizing: 'border-box',
            }}>
                <span style={{ color: '#FFD700', fontSize: `${Math.max(10, size * 0.2)}px`, fontWeight: '900' }}>
                    الكريمي
                </span>
                <span style={{ color: '#FFFFFF', fontSize: `${Math.max(7, size * 0.11)}px`, fontWeight: '800' }}>
                    اليمن YER
                </span>
            </div>
        );
    }

    // 12. Default Bank / Card Logo
    return (
        <div style={{
            width: size,
            height: size,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #D4A537 0%, #8A6510 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(212, 165, 55, 0.4)',
            border: '2px solid #F5D061',
            padding: '4px',
            boxSizing: 'border-box',
        }}>
            <svg viewBox="0 0 24 24" width={size * 0.42} height={size * 0.42} fill="#000000">
                <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
            </svg>
            <span style={{ color: '#000000', fontSize: `${Math.max(7, size * 0.12)}px`, fontWeight: '900', marginTop: '2px' }}>
                تحويل بنكي
            </span>
        </div>
    );
}
