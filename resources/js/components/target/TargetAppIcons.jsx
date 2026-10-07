import React from 'react';

/**
 * High-definition, vibrant 3D vector artwork for top target selling apps.
 * Designed with specular lighting, depth, and vibrant colors matching KA CARD / industry benchmarks.
 */

export function PartyStarIcon({ size = 80 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="psBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1E3C72" />
                    <stop offset="50%" stopColor="#2A5298" />
                    <stop offset="100%" stopColor="#0B132B" />
                </linearGradient>
                <linearGradient id="psBoard" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00E5FF" />
                    <stop offset="100%" stopColor="#0072FF" />
                </linearGradient>
                <linearGradient id="psStar" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF176" />
                    <stop offset="50%" stopColor="#FFB300" />
                    <stop offset="100%" stopColor="#FF6F00" />
                </linearGradient>
                <linearGradient id="psRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF1744" />
                    <stop offset="100%" stopColor="#B71C1C" />
                </linearGradient>
                <filter id="psShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.5" />
                </filter>
            </defs>
            <rect width="100" height="100" rx="20" fill="url(#psBg)" />
            {/* Ludo board tiles */}
            <rect x="14" y="52" width="72" height="34" rx="8" fill="url(#psBoard)" opacity="0.9" />
            <rect x="18" y="56" width="14" height="12" rx="3" fill="#FF1744" />
            <rect x="36" y="56" width="14" height="12" rx="3" fill="#FFEA00" />
            <rect x="54" y="56" width="14" height="12" rx="3" fill="#00E676" />
            <rect x="72" y="56" width="10" height="12" rx="3" fill="#2979FF" />
            {/* 3D Dice */}
            <g filter="url(#psShadow)">
                <rect x="38" y="44" width="24" height="24" rx="5" fill="#FFFFFF" />
                <rect x="40" y="46" width="20" height="20" rx="4" fill="#F8FAFC" />
                <circle cx="50" cy="56" r="3" fill="#FF1744" />
                <circle cx="44" cy="50" r="2" fill="#1E293B" />
                <circle cx="56" cy="62" r="2" fill="#1E293B" />
                <circle cx="56" cy="50" r="2" fill="#1E293B" />
                <circle cx="44" cy="62" r="2" fill="#1E293B" />
            </g>
            {/* Ribbon banner */}
            <path d="M15 28 Q50 34 85 28 L82 14 Q50 20 18 14 Z" fill="url(#psRibbon)" filter="url(#psShadow)" />
            <text x="50" y="24" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="900" fontFamily="Arial Black, sans-serif" letterSpacing="1">
                PARTY
            </text>
            <text x="50" y="38" textAnchor="middle" fill="url(#psStar)" fontSize="13" fontWeight="900" fontFamily="Arial Black, sans-serif" filter="url(#psShadow)" letterSpacing="1.5">
                STAR
            </text>
        </svg>
    );
}

export function BoutaLiveIcon({ size = 80 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="boutaBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF3B0" />
                    <stop offset="40%" stopColor="#FFD54F" />
                    <stop offset="100%" stopColor="#FFB300" />
                </linearGradient>
                <linearGradient id="boutaWhite" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#F1F5F9" />
                </linearGradient>
                <linearGradient id="boutaRed" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF3366" />
                    <stop offset="100%" stopColor="#D50000" />
                </linearGradient>
                <filter id="boutaGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#B78103" floodOpacity="0.4" />
                </filter>
            </defs>
            <rect width="100" height="100" rx="20" fill="url(#boutaBg)" />
            {/* White Speech Bubble */}
            <g filter="url(#boutaGlow)">
                <path d="M50 16 C30 16 16 28 16 44 C16 54 22 63 32 68 L28 82 L44 72 C46 72.3 48 72.5 50 72.5 C70 72.5 84 60 84 44 C84 28 70 16 50 16 Z" fill="url(#boutaWhite)" />
                {/* Yellow Inner Ring / P letter */}
                <circle cx="50" cy="44" r="18" fill="none" stroke="#FFC107" strokeWidth="6" />
                <path d="M44 32 L44 56" stroke="#FFB300" strokeWidth="5" strokeLinecap="round" />
                <path d="M44 34 C54 34 56 46 44 46" fill="none" stroke="#FFB300" strokeWidth="5" strokeLinecap="round" />
            </g>
            {/* Red Live Audio Wave Pill */}
            <g filter="url(#boutaGlow)">
                <circle cx="72" cy="28" r="12" fill="url(#boutaRed)" />
                <rect x="66" y="26" width="2" height="4" rx="1" fill="#FFFFFF" />
                <rect x="70" y="23" width="2" height="10" rx="1" fill="#FFFFFF" />
                <rect x="74" y="21" width="2" height="14" rx="1" fill="#FFFFFF" />
                <rect x="78" y="25" width="2" height="6" rx="1" fill="#FFFFFF" />
            </g>
        </svg>
    );
}

export function TamiIcon({ size = 80 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="tamiBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00E5FF" />
                    <stop offset="50%" stopColor="#00B0FF" />
                    <stop offset="100%" stopColor="#00E676" />
                </linearGradient>
                <linearGradient id="tamiText" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#E0F7FA" />
                </linearGradient>
                <filter id="tamiGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#006064" floodOpacity="0.4" />
                </filter>
            </defs>
            <rect width="100" height="100" rx="20" fill="url(#tamiBg)" />
            {/* Glossy highlight */}
            <path d="M0 20 C0 8.9 8.9 0 20 0 L80 0 C91.1 0 100 8.9 100 20 L100 40 C70 45 30 45 0 40 Z" fill="#FFFFFF" opacity="0.25" />
            {/* Microphone Icon */}
            <g filter="url(#tamiGlow)" transform="translate(62, 22)">
                <rect x="6" y="2" width="8" height="14" rx="4" fill="#FFFFFF" />
                <path d="M3 9 C3 16 17 16 17 9" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M10 16 L10 21 M6 21 L14 21" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            </g>
            {/* Bold 3D "Tami" Text */}
            <text x="46" y="62" textAnchor="middle" fill="url(#tamiText)" fontSize="26" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" filter="url(#tamiGlow)" letterSpacing="-0.5">
                Tami
            </text>
            <circle cx="28" cy="38" r="4" fill="#FFFFFF" opacity="0.8" />
            <circle cx="20" cy="48" r="2.5" fill="#FFFFFF" opacity="0.6" />
        </svg>
    );
}

export function JankoIcon({ size = 80 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="jankoBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00B4D8" />
                    <stop offset="60%" stopColor="#0077B6" />
                    <stop offset="100%" stopColor="#023E8A" />
                </linearGradient>
                <linearGradient id="cheetahGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFD54F" />
                    <stop offset="50%" stopColor="#FFB300" />
                    <stop offset="100%" stopColor="#FF8F00" />
                </linearGradient>
                <linearGradient id="hoodieOrange" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF6F00" />
                    <stop offset="100%" stopColor="#E65100" />
                </linearGradient>
                <filter id="jankoShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.45" />
                </filter>
            </defs>
            <rect width="100" height="100" rx="20" fill="url(#jankoBg)" />
            {/* Leopard Ears */}
            <circle cx="28" cy="34" r="14" fill="url(#cheetahGold)" />
            <circle cx="28" cy="34" r="8" fill="#4E342E" />
            <circle cx="72" cy="34" r="14" fill="url(#cheetahGold)" />
            <circle cx="72" cy="34" r="8" fill="#4E342E" />
            {/* Cheetah Face */}
            <circle cx="50" cy="50" r="28" fill="url(#cheetahGold)" filter="url(#jankoShadow)" />
            {/* Orange Hoodie */}
            <path d="M22 74 C22 66 34 62 50 62 C66 62 78 66 78 74 L80 100 L20 100 Z" fill="url(#hoodieOrange)" />
            <path d="M42 66 L50 78 L58 66" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            {/* Spots */}
            <ellipse cx="50" cy="30" rx="3" ry="2" fill="#5D4037" />
            <ellipse cx="40" cy="34" rx="2.5" ry="1.5" fill="#5D4037" />
            <ellipse cx="60" cy="34" rx="2.5" ry="1.5" fill="#5D4037" />
            <ellipse cx="32" cy="44" rx="3" ry="2" fill="#5D4037" />
            <ellipse cx="68" cy="44" rx="3" ry="2" fill="#5D4037" />
            {/* Big Expressive Eyes */}
            <circle cx="38" cy="48" r="7.5" fill="#2E7D32" />
            <circle cx="38" cy="48" r="5" fill="#000000" />
            <circle cx="36" cy="46" r="2" fill="#FFFFFF" />
            <circle cx="62" cy="48" r="7.5" fill="#2E7D32" />
            <circle cx="62" cy="48" r="5" fill="#000000" />
            <circle cx="60" cy="46" r="2" fill="#FFFFFF" />
            {/* Muzzle & Smile */}
            <ellipse cx="50" cy="58" rx="8" ry="5.5" fill="#FFF9C4" />
            <polygon points="47,55 53,55 50,58" fill="#D81B60" />
            <path d="M47 58 Q50 61 53 58" stroke="#3E2723" strokeWidth="1.5" fill="none" />
        </svg>
    );
}

export function ZafaLiveIcon({ size = 80 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="zafaBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7B1FA2" />
                    <stop offset="60%" stopColor="#4A148C" />
                    <stop offset="100%" stopColor="#1A0033" />
                </linearGradient>
                <linearGradient id="lionGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF176" />
                    <stop offset="50%" stopColor="#FFCA28" />
                    <stop offset="100%" stopColor="#FF9800" />
                </linearGradient>
                <linearGradient id="lionMane" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFA726" />
                    <stop offset="100%" stopColor="#E65100" />
                </linearGradient>
                <filter id="zafaShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.5" />
                </filter>
            </defs>
            <rect width="100" height="100" rx="20" fill="url(#zafaBg)" />
            {/* Sparkles */}
            <path d="M22 18 L24 23 L29 25 L24 27 L22 32 L20 27 L15 25 L20 23 Z" fill="#FFEB3B" opacity="0.8" />
            <path d="M82 22 L83.5 25.5 L87 27 L83.5 28.5 L82 32 L80.5 28.5 L77 27 L80.5 25.5 Z" fill="#00E5FF" opacity="0.8" />
            {/* Lion Mane Flower Fluffs */}
            <circle cx="50" cy="50" r="32" fill="url(#lionMane)" filter="url(#zafaShadow)" />
            {/* Lion Head */}
            <circle cx="50" cy="50" r="22" fill="url(#lionGold)" />
            {/* Ears */}
            <circle cx="32" cy="34" r="8" fill="url(#lionMane)" />
            <circle cx="32" cy="34" r="4.5" fill="#FFE082" />
            <circle cx="68" cy="34" r="8" fill="url(#lionMane)" />
            <circle cx="68" cy="34" r="4.5" fill="#FFE082" />
            {/* Cheerful Winking Face */}
            <circle cx="39" cy="48" r="5" fill="#000000" />
            <circle cx="38" cy="46" r="1.8" fill="#FFFFFF" />
            {/* Winking right eye */}
            <path d="M57 48 Q62 44 67 48" stroke="#000000" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* Rosy Cheeks */}
            <ellipse cx="34" cy="54" rx="4" ry="2.5" fill="#FF8A80" opacity="0.7" />
            <ellipse cx="66" cy="54" rx="4" ry="2.5" fill="#FF8A80" opacity="0.7" />
            {/* Cute Nose and Tongue */}
            <ellipse cx="50" cy="54" rx="3.5" ry="2.5" fill="#8D6E63" />
            <path d="M47 57 Q50 63 53 57" stroke="#3E2723" strokeWidth="1.5" fill="#FF5252" />
            {/* Waving Paw */}
            <g transform="translate(14, 52)">
                <circle cx="8" cy="8" r="8" fill="url(#lionGold)" filter="url(#zafaShadow)" />
                <circle cx="5" cy="4" r="1.8" fill="#FFB74D" />
                <circle cx="8" cy="3" r="1.8" fill="#FFB74D" />
                <circle cx="11" cy="4" r="1.8" fill="#FFB74D" />
                <ellipse cx="8" cy="9" rx="3.5" ry="2.5" fill="#FFB74D" />
            </g>
        </svg>
    );
}

export function SodfaIcon({ size = 80 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="sodfaBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4A2800" />
                    <stop offset="50%" stopColor="#2E1800" />
                    <stop offset="100%" stopColor="#120A00" />
                </linearGradient>
                <linearGradient id="sodfaGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF8E1" />
                    <stop offset="30%" stopColor="#FFE082" />
                    <stop offset="70%" stopColor="#FFB300" />
                    <stop offset="100%" stopColor="#B27400" />
                </linearGradient>
                <filter id="sodfaGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#FFB300" floodOpacity="0.4" />
                </filter>
            </defs>
            <rect width="100" height="100" rx="20" fill="url(#sodfaBg)" />
            {/* Islamic Starry Arch / Moon */}
            <g filter="url(#sodfaGlow)">
                <path d="M68 22 C50 22 36 36 36 54 C36 72 50 86 68 86 C58 86 48 76 48 54 C48 32 58 22 68 22 Z" fill="url(#sodfaGold)" />
            </g>
            {/* Hanging Lantern (Fanous) */}
            <g transform="translate(48, 16)">
                <line x1="12" y1="0" x2="12" y2="8" stroke="#FFE082" strokeWidth="1.5" />
                <polygon points="9,8 15,8 14,14 10,14" fill="#FFB300" />
                <rect x="8" y="14" width="8" height="10" rx="2" fill="#FFE57F" opacity="0.9" />
                <polygon points="8,24 16,24 12,28" fill="#FFB300" />
            </g>
            {/* 3D Script "Sodfa" */}
            <text x="50" y="66" textAnchor="middle" fill="url(#sodfaGold)" fontSize="20" fontWeight="900" fontFamily="Georgia, serif" filter="url(#sodfaGlow)">
                Sodfa
            </text>
            <circle cx="28" cy="28" r="1.5" fill="#FFE082" />
            <circle cx="78" cy="40" r="1.5" fill="#FFE082" />
            <circle cx="74" cy="74" r="1.5" fill="#FFE082" />
        </svg>
    );
}

export function ShababChatIcon({ size = 80 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="shababBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#212121" />
                    <stop offset="60%" stopColor="#0D0D0D" />
                    <stop offset="100%" stopColor="#000000" />
                </linearGradient>
                <linearGradient id="shababGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFE082" />
                    <stop offset="50%" stopColor="#FFB300" />
                    <stop offset="100%" stopColor="#FF6F00" />
                </linearGradient>
                <filter id="shababGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#FFB300" floodOpacity="0.4" />
                </filter>
            </defs>
            <rect width="100" height="100" rx="20" fill="url(#shababBg)" />
            {/* Golden Starburst Rays */}
            <circle cx="50" cy="50" r="42" fill="none" stroke="url(#shababGold)" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
            {/* Golden Ribbon Banner Header */}
            <rect x="15" y="16" width="70" height="18" rx="6" fill="url(#shababGold)" filter="url(#shababGlow)" />
            <text x="50" y="29" textAnchor="middle" fill="#000000" fontSize="10.5" fontWeight="900" fontFamily="Arial Black, sans-serif" letterSpacing="0.5">
                SHABAB
            </text>
            {/* Royal Falcon Mascot */}
            <g transform="translate(25, 36)" filter="url(#shababGlow)">
                {/* Wings */}
                <path d="M4 36 C-2 22 6 12 16 18 C10 24 10 32 12 36 Z" fill="url(#shababGold)" />
                <path d="M46 36 C52 22 44 12 34 18 C40 24 40 32 38 36 Z" fill="url(#shababGold)" />
                {/* Falcon Body / Head */}
                <ellipse cx="25" cy="22" rx="14" ry="16" fill="#FFFFFF" />
                {/* Black Sunglasses */}
                <path d="M14 18 Q25 22 36 18 L34 24 Q25 26 16 24 Z" fill="#1A1A1A" />
                {/* Golden Beak */}
                <polygon points="22,24 28,24 25,30" fill="url(#shababGold)" />
                {/* Microphone */}
                <g transform="translate(18, 26)">
                    <rect x="4" y="4" width="6" height="12" rx="3" fill="url(#shababGold)" />
                    <line x1="7" y1="16" x2="7" y2="24" stroke="url(#shababGold)" strokeWidth="2" />
                </g>
            </g>
        </svg>
    );
}

export function SoloStarIcon({ size = 80 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="soloBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4A148C" />
                    <stop offset="50%" stopColor="#311B92" />
                    <stop offset="100%" stopColor="#1A0033" />
                </linearGradient>
                <linearGradient id="soloPlanet" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E1BEE7" />
                    <stop offset="50%" stopColor="#BA68C8" />
                    <stop offset="100%" stopColor="#6A1B9A" />
                </linearGradient>
                <linearGradient id="soloRing" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00E5FF" />
                    <stop offset="50%" stopColor="#E040FB" />
                    <stop offset="100%" stopColor="#00E5FF" />
                </linearGradient>
                <filter id="soloGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#E040FB" floodOpacity="0.55" />
                </filter>
            </defs>
            <rect width="100" height="100" rx="20" fill="url(#soloBg)" />
            {/* Deep Space Stars */}
            <circle cx="20" cy="24" r="1.5" fill="#FFFFFF" />
            <circle cx="80" cy="20" r="1.2" fill="#00E5FF" />
            <circle cx="84" cy="76" r="1.8" fill="#FFFFFF" />
            <circle cx="16" cy="74" r="1" fill="#E040FB" />
            {/* Planet Body */}
            <circle cx="50" cy="50" r="24" fill="url(#soloPlanet)" />
            {/* Planetary Ring */}
            <ellipse cx="50" cy="50" rx="38" ry="14" transform="rotate(-25 50 50)" fill="none" stroke="url(#soloRing)" strokeWidth="4.5" filter="url(#soloGlow)" />
            {/* Sound Wave Bars inside Planet */}
            <g transform="translate(36, 40)" filter="url(#soloGlow)">
                <rect x="4" y="6" width="3" height="8" rx="1.5" fill="#FFFFFF" />
                <rect x="10" y="2" width="3" height="16" rx="1.5" fill="#FFFFFF" />
                <rect x="16" y="0" width="3" height="20" rx="1.5" fill="#FFFFFF" />
                <rect x="22" y="4" width="3" height="12" rx="1.5" fill="#FFFFFF" />
            </g>
        </svg>
    );
}

export function SoMatchIcon({ size = 80 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="somatchBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#12002B" />
                    <stop offset="60%" stopColor="#240046" />
                    <stop offset="100%" stopColor="#0B0014" />
                </linearGradient>
                <linearGradient id="soGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00E5FF" />
                    <stop offset="100%" stopColor="#00B0FF" />
                </linearGradient>
                <linearGradient id="matchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF4081" />
                    <stop offset="50%" stopColor="#E040FB" />
                    <stop offset="100%" stopColor="#7C4DFF" />
                </linearGradient>
                <filter id="somatchGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#E040FB" floodOpacity="0.45" />
                </filter>
            </defs>
            <rect width="100" height="100" rx="20" fill="url(#somatchBg)" />
            {/* Playful Cute Mascot Character on Top */}
            <circle cx="56" cy="24" r="8" fill="url(#soGrad)" />
            <circle cx="53" cy="22" r="1.5" fill="#000000" />
            <circle cx="58" cy="22" r="1.5" fill="#000000" />
            {/* "SO" 3D Typography */}
            <text x="36" y="44" textAnchor="middle" fill="url(#soGrad)" fontSize="26" fontWeight="900" fontFamily="Arial Black, sans-serif" filter="url(#somatchGlow)">
                SO
            </text>
            {/* "Match!" 3D Typography */}
            <text x="50" y="74" textAnchor="middle" fill="url(#matchGrad)" fontSize="22" fontWeight="900" fontFamily="Arial Black, sans-serif" filter="url(#somatchGlow)" letterSpacing="0.5">
                Match!
            </text>
            {/* Cute sparkle icon */}
            <polygon points="76,32 78,37 83,39 78,41 76,46 74,41 69,39 74,37" fill="#FFEA00" />
        </svg>
    );
}

export function ZinaLiveIcon({ size = 80 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="zinaBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0F172A" />
                    <stop offset="50%" stopColor="#1E1B4B" />
                    <stop offset="100%" stopColor="#0B091E" />
                </linearGradient>
                <linearGradient id="zinaRing1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF007F" />
                    <stop offset="50%" stopColor="#D946EF" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
                <linearGradient id="zinaRing2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06B6D4" />
                    <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
                <filter id="zinaGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#EC4899" floodOpacity="0.6" />
                </filter>
            </defs>
            <rect width="100" height="100" rx="20" fill="url(#zinaBg)" />
            {/* Intersecting Glowing Infinity Neon Circles */}
            <circle cx="36" cy="50" r="19" fill="none" stroke="url(#zinaRing1)" strokeWidth="6" filter="url(#zinaGlow)" />
            <circle cx="64" cy="50" r="19" fill="none" stroke="url(#zinaRing2)" strokeWidth="6" filter="url(#zinaGlow)" />
            {/* Arrow upwards inside right circle */}
            <path d="M58 56 L68 44 M68 44 L60 44 M68 44 L68 52" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            {/* Tiny live broadcasting dots */}
            <circle cx="36" cy="50" r="4" fill="#FFFFFF" />
            <circle cx="82" cy="26" r="2" fill="#EC4899" />
            <circle cx="18" cy="28" r="2" fill="#06B6D4" />
        </svg>
    );
}

export function FallaIcon({ size = 80 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="fallaBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B1C54" />
                    <stop offset="50%" stopColor="#1E0E2C" />
                    <stop offset="100%" stopColor="#0D0614" />
                </linearGradient>
                <linearGradient id="fallaGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF275" />
                    <stop offset="50%" stopColor="#FFC837" />
                    <stop offset="100%" stopColor="#FF8008" />
                </linearGradient>
                <filter id="fallaGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#FFC837" floodOpacity="0.45" />
                </filter>
            </defs>
            <rect width="100" height="100" rx="20" fill="url(#fallaBg)" />
            {/* Confetti & Party Poppers */}
            <circle cx="24" cy="24" r="3" fill="#FF4081" />
            <circle cx="76" cy="24" r="2.5" fill="#00E5FF" />
            <circle cx="80" cy="74" r="3" fill="#76FF03" />
            <circle cx="20" cy="72" r="2.5" fill="#FFEA00" />
            {/* Golden Festive Star & Ribbon */}
            <g filter="url(#fallaGlow)">
                <path d="M50 18 L55 32 L70 34 L59 44 L62 58 L50 50 L38 58 L41 44 L30 34 L45 32 Z" fill="url(#fallaGold)" />
            </g>
            <text x="50" y="78" textAnchor="middle" fill="url(#fallaGold)" fontSize="18" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="1" filter="url(#fallaGlow)">
                FALLA
            </text>
        </svg>
    );
}

export function BigoLiveIcon({ size = 80 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="bigoBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00E5FF" />
                    <stop offset="60%" stopColor="#00B0FF" />
                    <stop offset="100%" stopColor="#0288D1" />
                </linearGradient>
                <filter id="bigoShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#01579B" floodOpacity="0.4" />
                </filter>
            </defs>
            <rect width="100" height="100" rx="20" fill="url(#bigoBg)" />
            {/* Cute White Dinosaur Mascot Silhouette */}
            <g filter="url(#bigoShadow)" transform="translate(24, 20)">
                <ellipse cx="26" cy="38" rx="20" ry="18" fill="#FFFFFF" />
                <circle cx="26" cy="20" r="16" fill="#FFFFFF" />
                {/* Dinosaur Spikes */}
                <polygon points="12,12 8,16 12,20" fill="#00E5FF" />
                <polygon points="10,24 6,28 10,32" fill="#00E5FF" />
                <polygon points="10,36 6,40 10,44" fill="#00E5FF" />
                {/* Big Blue Eye */}
                <circle cx="30" cy="18" r="5" fill="#0288D1" />
                <circle cx="29" cy="16" r="1.8" fill="#FFFFFF" />
                {/* Cute Smile */}
                <path d="M28 26 Q34 29 38 24" stroke="#0288D1" strokeWidth="2" strokeLinecap="round" fill="none" />
            </g>
        </svg>
    );
}

export function PubgIcon({ size = 80 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="pubgBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1E1E24" />
                    <stop offset="60%" stopColor="#0F0F14" />
                    <stop offset="100%" stopColor="#000000" />
                </linearGradient>
                <linearGradient id="crateRed" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF3B30" />
                    <stop offset="100%" stopColor="#B71C1C" />
                </linearGradient>
                <linearGradient id="tarpBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00B0FF" />
                    <stop offset="100%" stopColor="#0D47A1" />
                </linearGradient>
                <linearGradient id="goldUc" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF176" />
                    <stop offset="50%" stopColor="#FFB300" />
                    <stop offset="100%" stopColor="#FF6F00" />
                </linearGradient>
                <filter id="pubgShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.6" />
                </filter>
            </defs>
            <rect width="100" height="100" rx="20" fill="url(#pubgBg)" />
            {/* Airdrop Crate */}
            <g filter="url(#pubgShadow)" transform="translate(24, 22)">
                {/* Red Container Base */}
                <rect x="0" y="16" width="52" height="42" rx="4" fill="url(#crateRed)" />
                <rect x="6" y="18" width="4" height="38" rx="1.5" fill="#7F0000" />
                <rect x="18" y="18" width="4" height="38" rx="1.5" fill="#7F0000" />
                <rect x="30" y="18" width="4" height="38" rx="1.5" fill="#7F0000" />
                <rect x="42" y="18" width="4" height="38" rx="1.5" fill="#7F0000" />
                {/* Blue Tarpaulin Top */}
                <path d="M-2 18 C0 6 12 4 26 4 C40 4 52 6 54 18 Z" fill="url(#tarpBlue)" />
                <line x1="26" y1="4" x2="26" y2="18" stroke="#01579B" strokeWidth="2" />
            </g>
            {/* Golden UC Badge */}
            <g filter="url(#pubgShadow)" transform="translate(48, 54)">
                <circle cx="22" cy="22" r="18" fill="url(#goldUc)" />
                <circle cx="22" cy="22" r="15" fill="#1A1A24" />
                <text x="22" y="27" textAnchor="middle" fill="url(#goldUc)" fontSize="13" fontWeight="900" fontFamily="Arial Black, sans-serif">
                    UC
                </text>
            </g>
        </svg>
    );
}

export function PolaLiveIcon({ size = 80 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="polaBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00E5FF" />
                    <stop offset="60%" stopColor="#0091EA" />
                    <stop offset="100%" stopColor="#01579B" />
                </linearGradient>
                <linearGradient id="polaBear" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#E1F5FE" />
                </linearGradient>
                <filter id="polaShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#01579B" floodOpacity="0.45" />
                </filter>
            </defs>
            <rect width="100" height="100" rx="20" fill="url(#polaBg)" />
            {/* Polar Bear Ears */}
            <circle cx="34" cy="34" r="10" fill="url(#polaBear)" />
            <circle cx="34" cy="34" r="5" fill="#81D4FA" />
            <circle cx="66" cy="34" r="10" fill="url(#polaBear)" />
            <circle cx="66" cy="34" r="5" fill="#81D4FA" />
            {/* Bear Head */}
            <circle cx="50" cy="52" r="26" fill="url(#polaBear)" filter="url(#polaShadow)" />
            {/* Golden Headband / Headphones */}
            <path d="M28 44 C28 26 72 26 72 44" fill="none" stroke="#FFD54F" strokeWidth="4" strokeLinecap="round" />
            <rect x="24" y="40" width="7" height="12" rx="3" fill="#FFC107" />
            <rect x="69" y="40" width="7" height="12" rx="3" fill="#FFC107" />
            {/* Eyes & Cute Snout */}
            <circle cx="41" cy="49" r="3.5" fill="#0D47A1" />
            <circle cx="59" cy="49" r="3.5" fill="#0D47A1" />
            <ellipse cx="50" cy="58" rx="8" ry="6" fill="#B3E5FC" />
            <polygon points="47,56 53,56 50,59" fill="#01579B" />
            <path d="M47 59 Q50 62 53 59" stroke="#01579B" strokeWidth="1.5" fill="none" />
            {/* "POLA" text */}
            <text x="50" y="88" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="900" fontFamily="Arial Black, sans-serif" letterSpacing="1">
                POLA
            </text>
        </svg>
    );
}

export function FreeFireIcon({ size = 80 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="ffBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2E0854" />
                    <stop offset="60%" stopColor="#17032B" />
                    <stop offset="100%" stopColor="#0B0114" />
                </linearGradient>
                <linearGradient id="ffFire" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFEB3B" />
                    <stop offset="50%" stopColor="#FF9800" />
                    <stop offset="100%" stopColor="#F44336" />
                </linearGradient>
                <linearGradient id="ffDiamond" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00E5FF" />
                    <stop offset="100%" stopColor="#0072FF" />
                </linearGradient>
                <filter id="ffGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#FF5722" floodOpacity="0.6" />
                </filter>
            </defs>
            <rect width="100" height="100" rx="20" fill="url(#ffBg)" />
            {/* Flaming Fire Behind */}
            <path d="M50 16 C58 28 68 36 68 52 C68 68 56 76 50 78 C44 76 32 68 32 52 C32 40 40 32 50 16 Z" fill="url(#ffFire)" filter="url(#ffGlow)" />
            {/* Glowing Diamond */}
            <g transform="translate(35, 38)">
                <polygon points="15,0 30,10 24,28 6,28 0,10" fill="url(#ffDiamond)" />
                <polygon points="15,0 20,10 10,10" fill="#FFFFFF" opacity="0.6" />
                <polygon points="10,10 20,10 15,28" fill="#00B0FF" />
            </g>
            <text x="50" y="88" textAnchor="middle" fill="url(#ffFire)" fontSize="10" fontWeight="900" fontFamily="Arial Black, sans-serif" letterSpacing="1">
                FREE FIRE
            </text>
        </svg>
    );
}

export function DefaultGameIcon({ size = 80 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="gameBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1E1E28" />
                    <stop offset="100%" stopColor="#0F0F16" />
                </linearGradient>
                <linearGradient id="padGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFE082" />
                    <stop offset="50%" stopColor="#FFB300" />
                    <stop offset="100%" stopColor="#FF8F00" />
                </linearGradient>
                <filter id="padGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#FFB300" floodOpacity="0.4" />
                </filter>
            </defs>
            <rect width="100" height="100" rx="20" fill="url(#gameBg)" />
            {/* Gamepad Silhouette */}
            <g filter="url(#padGlow)" transform="translate(18, 28)">
                <path d="M12 8 C18 4 46 4 52 8 C60 12 64 34 58 40 C52 46 46 36 40 36 C34 36 28 46 22 40 C16 34 20 12 12 8 Z" fill="url(#padGold)" />
                {/* D-Pad */}
                <rect x="22" y="16" width="4" height="12" rx="1.5" fill="#1E1E28" />
                <rect x="18" y="20" width="12" height="4" rx="1.5" fill="#1E1E28" />
                {/* Action Buttons */}
                <circle cx="44" cy="18" r="2" fill="#1E1E28" />
                <circle cx="48" cy="22" r="2" fill="#1E1E28" />
                <circle cx="44" cy="26" r="2" fill="#1E1E28" />
                <circle cx="40" cy="22" r="2" fill="#1E1E28" />
            </g>
        </svg>
    );
}

export function YohoIcon({ size = 80 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="yohoBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1E1B4B" />
                    <stop offset="100%" stopColor="#0F172A" />
                </linearGradient>
                <linearGradient id="yohoGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4ADE80" />
                    <stop offset="100%" stopColor="#16A34A" />
                </linearGradient>
                <linearGradient id="yohoRed" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F87171" />
                    <stop offset="100%" stopColor="#DC2626" />
                </linearGradient>
                <linearGradient id="yohoGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FDE047" />
                    <stop offset="100%" stopColor="#CA8A04" />
                </linearGradient>
            </defs>
            <rect width="100" height="100" rx="20" fill="url(#yohoBg)" />
            {/* Green and Red Characters */}
            <circle cx="36" cy="42" r="18" fill="url(#yohoGreen)" />
            <circle cx="32" cy="38" r="3" fill="#000" />
            <circle cx="42" cy="38" r="3" fill="#000" />
            <path d="M32 46 Q37 52 42 46" stroke="#000" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            
            <circle cx="64" cy="42" r="18" fill="url(#yohoRed)" />
            <circle cx="60" cy="38" r="3" fill="#FFF" />
            <circle cx="70" cy="38" r="3" fill="#FFF" />
            <path d="M60 46 Q65 52 70 46" stroke="#FFF" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            
            {/* YOHO Gold Banner */}
            <rect x="18" y="66" width="64" height="20" rx="6" fill="#111827" stroke="url(#yohoGold)" strokeWidth="2" />
            <text x="50" y="80" textAnchor="middle" fill="url(#yohoGold)" fontSize="13" fontWeight="900" fontFamily="Arial Black, sans-serif" letterSpacing="1.5">
                ★ YOHO ★
            </text>
        </svg>
    );
}

export function HaahlanIcon({ size = 80 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="haahlanBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7E22CE" />
                    <stop offset="100%" stopColor="#3B0764" />
                </linearGradient>
                <linearGradient id="haahlanCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="100%" stopColor="#0284C7" />
                </linearGradient>
                <linearGradient id="haahlanGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FDE047" />
                    <stop offset="100%" stopColor="#EAB308" />
                </linearGradient>
            </defs>
            <rect width="100" height="100" rx="20" fill="url(#haahlanBg)" />
            {/* Smile Character */}
            <circle cx="50" cy="40" r="22" fill="url(#haahlanCyan)" />
            <circle cx="42" cy="34" r="3" fill="#FFF" />
            <circle cx="58" cy="34" r="3" fill="#FFF" />
            <path d="M40 44 Q50 54 60 44" stroke="#FFF" strokeWidth="3" fill="none" strokeLinecap="round" />
            <text x="32" y="24" fill="url(#haahlanGold)" fontSize="14" fontWeight="900">Ya</text>
            {/* Banner */}
            <rect x="14" y="66" width="72" height="20" rx="6" fill="#18181B" stroke="url(#haahlanGold)" strokeWidth="2" />
            <text x="50" y="80" textAnchor="middle" fill="url(#haahlanGold)" fontSize="11" fontWeight="900" fontFamily="Arial Black, sans-serif" letterSpacing="1">
                ★ HAAHLAN ★
            </text>
        </svg>
    );
}

export function FunUpIcon({ size = 80 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="funBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0369A1" />
                    <stop offset="100%" stopColor="#082F49" />
                </linearGradient>
                <linearGradient id="funCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="100%" stopColor="#0284C7" />
                </linearGradient>
                <linearGradient id="funYellow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FACC15" />
                    <stop offset="100%" stopColor="#EAB308" />
                </linearGradient>
            </defs>
            <rect width="100" height="100" rx="20" fill="url(#funBg)" />
            {/* Crown */}
            <path d="M40 22 L45 28 L50 18 L55 28 L60 22 L58 32 L42 32 Z" fill="url(#funYellow)" />
            <text x="50" y="44" textAnchor="middle" fill="url(#funCyan)" fontSize="20" fontWeight="900" fontFamily="Arial Black, sans-serif">
                Fun
            </text>
            <text x="50" y="60" textAnchor="middle" fill="url(#funYellow)" fontSize="16" fontWeight="900" fontFamily="Arial Black, sans-serif">
                UP
            </text>
            <rect x="18" y="68" width="64" height="18" rx="5" fill="#0C4A6E" stroke="url(#funYellow)" strokeWidth="1.5" />
            <text x="50" y="81" textAnchor="middle" fill="url(#funYellow)" fontSize="10" fontWeight="900" letterSpacing="1">
                ★ FunUP ★
            </text>
        </svg>
    );
}

export function MajlisIcon({ size = 80 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="majBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1C1917" />
                    <stop offset="100%" stopColor="#0C0A09" />
                </linearGradient>
                <linearGradient id="majGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FDE047" />
                    <stop offset="50%" stopColor="#D4A537" />
                    <stop offset="100%" stopColor="#A16207" />
                </linearGradient>
            </defs>
            <rect width="100" height="100" rx="20" fill="url(#majBg)" />
            {/* Arabic Diwan / Luxury Crown Pattern */}
            <circle cx="50" cy="42" r="26" fill="none" stroke="url(#majGold)" strokeWidth="2.5" strokeDasharray="4 2" />
            <path d="M30 46 L38 30 L50 42 L62 30 L70 46 L50 56 Z" fill="url(#majGold)" opacity="0.9" />
            <circle cx="50" cy="24" r="3" fill="#FFF" />
            <text x="50" y="78" textAnchor="middle" fill="url(#majGold)" fontSize="18" fontWeight="900" fontFamily="system-ui, sans-serif">
                مجلس
            </text>
        </svg>
    );
}

export function YabiIcon({ size = 80 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="yabiBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#581C87" />
                    <stop offset="100%" stopColor="#1E1B4B" />
                </linearGradient>
                <linearGradient id="yabiPink" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F43F5E" />
                    <stop offset="100%" stopColor="#BE123C" />
                </linearGradient>
                <linearGradient id="yabiGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FDE047" />
                    <stop offset="100%" stopColor="#CA8A04" />
                </linearGradient>
            </defs>
            <rect width="100" height="100" rx="20" fill="url(#yabiBg)" />
            <rect x="20" y="16" width="60" height="50" rx="14" fill="#000" stroke="url(#yabiPink)" strokeWidth="2.5" />
            <text x="50" y="48" textAnchor="middle" fill="url(#yabiPink)" fontSize="20" fontWeight="900" fontFamily="Arial Black, sans-serif">
                Yabi
            </text>
            <rect x="18" y="70" width="64" height="18" rx="5" fill="#18181B" stroke="url(#yabiGold)" strokeWidth="1.5" />
            <text x="50" y="83" textAnchor="middle" fill="url(#yabiGold)" fontSize="10" fontWeight="900" letterSpacing="1">
                ★ هايو / YABI ★
            </text>
        </svg>
    );
}

export function YoYoIcon({ size = 80 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="yoyoBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#B45309" />
                </linearGradient>
                <linearGradient id="yoyoWhite" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#E2E8F0" />
                </linearGradient>
            </defs>
            <rect width="100" height="100" rx="20" fill="url(#yoyoBg)" />
            <circle cx="50" cy="40" r="24" fill="#1E293B" />
            <circle cx="50" cy="40" r="14" fill="url(#yoyoBg)" />
            <circle cx="50" cy="40" r="5" fill="#FFFFFF" />
            <text x="50" y="80" textAnchor="middle" fill="url(#yoyoWhite)" fontSize="16" fontWeight="900" fontFamily="Arial Black, sans-serif">
                YoYo
            </text>
        </svg>
    );
}

export function HyaChatIcon({ size = 80 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="hyaBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4338CA" />
                    <stop offset="100%" stopColor="#312E81" />
                </linearGradient>
                <linearGradient id="hyaPink" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#EC4899" />
                    <stop offset="100%" stopColor="#DB2777" />
                </linearGradient>
            </defs>
            <rect width="100" height="100" rx="20" fill="url(#hyaBg)" />
            <path d="M30 26 C20 26 16 34 16 44 C16 54 24 60 32 62 L28 72 L42 64 C44 64 46 64 48 64 C58 64 64 56 64 44 C64 32 56 26 48 26 Z" fill="url(#hyaPink)" />
            <path d="M52 38 C62 38 68 44 68 52 C68 58 62 64 56 65 L59 73 L49 67 C48 67 46 67 45 67 C42 67 36 65 36 58" fill="#38BDF8" opacity="0.8" />
            <text x="50" y="84" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="900" fontFamily="system-ui, sans-serif">
                هيا شات
            </text>
        </svg>
    );
}

export function SoulChillIcon({ size = 80 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="soulBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#047857" />
                    <stop offset="100%" stopColor="#064E3B" />
                </linearGradient>
                <linearGradient id="soulPlanet" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#34D399" />
                    <stop offset="100%" stopColor="#059669" />
                </linearGradient>
            </defs>
            <rect width="100" height="100" rx="20" fill="url(#soulBg)" />
            <circle cx="50" cy="40" r="18" fill="url(#soulPlanet)" />
            <ellipse cx="50" cy="40" rx="30" ry="8" fill="none" stroke="#A7F3D0" strokeWidth="2.5" transform="rotate(-15 50 40)" />
            <text x="50" y="78" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="900" fontFamily="Arial Black, sans-serif">
                SoulChill
            </text>
        </svg>
    );
}

export function WePlayIcon({ size = 80 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="wpBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E11D48" />
                    <stop offset="100%" stopColor="#9F1239" />
                </linearGradient>
            </defs>
            <rect width="100" height="100" rx="20" fill="url(#wpBg)" />
            <circle cx="38" cy="38" r="8" fill="#FACC15" />
            <circle cx="62" cy="38" r="8" fill="#38BDF8" />
            <circle cx="50" cy="54" r="8" fill="#4ADE80" />
            <text x="50" y="80" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="900" fontFamily="Arial Black, sans-serif">
                WePlay
            </text>
        </svg>
    );
}

export function TikTokIcon({ size = 80 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="ttBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#121218" />
                    <stop offset="100%" stopColor="#050508" />
                </linearGradient>
                <filter id="ttGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="-2" dy="-2" stdDeviation="2" floodColor="#25F4EE" floodOpacity="0.8" />
                    <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="#FE2C55" floodOpacity="0.8" />
                </filter>
            </defs>
            <rect width="100" height="100" rx="20" fill="url(#ttBg)" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
            {/* Cyan layer */}
            <path d="M56 22 C59 28 65 32 72 33 L72 44 C67 44 62 42 58 39 L58 63 C58 73 50 81 40 81 C30 81 22 73 22 63 C22 53 30 45 40 45 C42 45 44 45.4 46 46 L46 57 C44 56.4 42 56 40 56 C36 56 33 59 33 63 C33 67 36 70 40 70 C44 70 47 67 47 63 L47 22 L56 22 Z" fill="#25F4EE" opacity="0.9" />
            {/* Red layer offset */}
            <path d="M60 22 C63 28 69 32 76 33 L76 44 C71 44 66 42 62 39 L62 63 C62 73 54 81 44 81 C34 81 26 73 26 63 C26 53 34 45 44 45 C46 45 48 45.4 50 46 L50 57 C48 56.4 46 56 44 56 C40 56 37 59 37 63 C37 67 40 70 44 70 C48 70 51 67 51 63 L51 22 L60 22 Z" fill="#FE2C55" opacity="0.9" />
            {/* White note center */}
            <path d="M58 22 C61 28 67 32 74 33 L74 44 C69 44 64 42 60 39 L60 63 C60 73 52 81 42 81 C32 81 24 73 24 63 C24 53 32 45 42 45 C44 45 46 45.4 48 46 L48 57 C46 56.4 44 56 42 56 C38 56 35 59 35 63 C35 67 38 70 42 70 C46 70 49 67 49 63 L49 22 L58 22 Z" fill="#FFFFFF" />
        </svg>
    );
}

export function LikeeIcon({ size = 80 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="likeeBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4A0E4E" />
                    <stop offset="50%" stopColor="#2A0845" />
                    <stop offset="100%" stopColor="#15002A" />
                </linearGradient>
                <linearGradient id="likeeHeart" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF416C" />
                    <stop offset="100%" stopColor="#FF4B2B" />
                </linearGradient>
                <linearGradient id="likeeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFD200" />
                    <stop offset="100%" stopColor="#F7971E" />
                </linearGradient>
            </defs>
            <rect width="100" height="100" rx="20" fill="url(#likeeBg)" />
            {/* Layered vibrant 3D Heart */}
            <path d="M50 78 C40 70 20 54 20 37 C20 26 29 18 39 18 C45 18 50 22 50 22 C50 22 55 18 61 18 C71 18 80 26 80 37 C80 54 60 70 50 78 Z" fill="url(#likeeHeart)" />
            <path d="M50 72 C43 65 26 51 26 37 C26 28 33 22 41 22 C45 22 48 24 50 26 C52 24 55 22 59 22 C67 22 74 28 74 37 C74 51 57 65 50 72 Z" fill="url(#likeeGlow)" opacity="0.6" />
            <text x="50" y="88" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="900" fontFamily="system-ui, sans-serif">
                Likee
            </text>
        </svg>
    );
}

export function MicoIcon({ size = 80 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="micoBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="50%" stopColor="#1D4ED8" />
                    <stop offset="100%" stopColor="#1E1B4B" />
                </linearGradient>
                <linearGradient id="micoYellow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FDE047" />
                    <stop offset="100%" stopColor="#EAB308" />
                </linearGradient>
            </defs>
            <rect width="100" height="100" rx="20" fill="url(#micoBg)" />
            {/* Smiling Chat Bubble */}
            <path d="M22 46 C22 30 34 20 50 20 C66 20 78 30 78 46 C78 62 66 72 50 72 C44 72 38 70 34 68 L22 74 L26 62 C23 58 22 52 22 46 Z" fill="#FFFFFF" />
            <circle cx="38" cy="44" r="5" fill="#1E293B" />
            <circle cx="62" cy="44" r="5" fill="#1E293B" />
            <path d="M42 54 Q50 62 58 54" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" fill="none" />
            <text x="50" y="86" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="900" fontFamily="system-ui, sans-serif">
                MICO
            </text>
        </svg>
    );
}

/**
 * Universal resolver for target app icons.
 * If app has custom uploaded image, uses that; otherwise falls back to the high-res 3D icon by name.
 */
export function TargetAppIconRenderer({ app, size = 84 }) {
    if (app?.image_url || app?.icon_url || app?.iconUrl || app?.image) {
        const u = app.image_url || app.icon_url || app.iconUrl || app.image;
        const isStockPhoto = typeof u === 'string' && (u.includes('unsplash') || u.includes('pexels') || u.includes('random'));
        if (!isStockPhoto) {
            const resolved = typeof u === 'string' && u.includes('/storage/')
                ? ('/storage/' + u.split('/storage/')[1])
                : u;
            return (
                <img
                    src={resolved}
                    alt={app.name}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        borderRadius: '16px',
                    }}
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        if (e.currentTarget.nextElementSibling) {
                            e.currentTarget.nextElementSibling.style.display = 'block';
                        }
                    }}
                />
            );
        }
    }

    const n = (app?.name || '').toLowerCase();
    const en = (app?.enName || app?.slug || '').toLowerCase();

    // Voice & Chat Apps (KA CARD benchmark)
    if (n.includes('تيك') || en.includes('tiktok')) return <TikTokIcon size={size} />;
    if (n.includes('لايكي') || en.includes('likee')) return <LikeeIcon size={size} />;
    if (n.includes('ميكو') || en.includes('mico')) return <MicoIcon size={size} />;
    if (n.includes('يوهو') || en.includes('yoho')) return <YohoIcon size={size} />;
    if (n.includes('هلين') || en.includes('haahlan')) return <HaahlanIcon size={size} />;
    if (n.includes('فان') || en.includes('funup')) return <FunUpIcon size={size} />;
    if (n.includes('مجلس') || en.includes('majlis')) return <MajlisIcon size={size} />;
    if (n.includes('هايو') || en.includes('yabi')) return <YabiIcon size={size} />;
    if (n.includes('يويو') || en.includes('yoyo')) return <YoYoIcon size={size} />;
    if (n.includes('هيا') || en.includes('hya')) return <HyaChatIcon size={size} />;
    if (n.includes('سول') || en.includes('soul')) return <SoulChillIcon size={size} />;
    if (n.includes('ويبلاي') || en.includes('weplay')) return <WePlayIcon size={size} />;
    if (n.includes('زينا') || en.includes('zina')) return <ZinaLiveIcon size={size} />;
    if (n.includes('زفا') || en.includes('zafa')) return <ZafaLiveIcon size={size} />;
    if (n.includes('بولا') || en.includes('pola')) return <PolaLiveIcon size={size} />;

    // Other Target & Game Apps
    if (n.includes('ببجي') || en.includes('pubg')) return <PubgIcon size={size} />;
    if (n.includes('فاير') || en.includes('free fire')) return <FreeFireIcon size={size} />;
    if (n.includes('بارتي') || en.includes('party')) return <PartyStarIcon size={size} />;
    if (n.includes('بوتا') || en.includes('bouta')) return <BoutaLiveIcon size={size} />;
    if (n.includes('تامي') || en.includes('tami')) return <TamiIcon size={size} />;
    if (n.includes('جانكو') || en.includes('janko')) return <JankoIcon size={size} />;
    if (n.includes('صدف') || en.includes('sodfa')) return <SodfaIcon size={size} />;
    if (n.includes('شباب') || en.includes('shabab')) return <ShababChatIcon size={size} />;
    if (n.includes('سولو') || en.includes('solo')) return <SoloStarIcon size={size} />;
    if (n.includes('ماتش') || en.includes('match')) return <SoMatchIcon size={size} />;
    if (n.includes('فلا') || en.includes('falla')) return <FallaIcon size={size} />;
    if (n.includes('بيجو') || en.includes('bigo')) return <BigoLiveIcon size={size} />;

    return <DefaultGameIcon size={size} />;
}
