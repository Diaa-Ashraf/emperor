import React from 'react';

export default function StatsCard({ icon: Icon, title, value, unit, color = '#D4A537', bg = 'rgba(212, 165, 55, 0.15)' }) {
    return (
        <div style={{
            background: 'rgba(26, 26, 36, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: '22px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.25s ease',
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = color;
            e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.transform = 'translateY(0)';
        }}
        >
            <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '16px',
                background: bg,
                color: color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
            }}>
                <Icon size={26} />
            </div>

            <div>
                <span style={{ fontSize: '13px', color: '#9E9EA8', display: 'block', marginBottom: '4px' }}>
                    {title}
                </span>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                    <strong style={{ fontSize: '24px', fontWeight: '900', color: '#FFFFFF', fontFamily: 'Cairo, sans-serif' }}>
                        {value}
                    </strong>
                    {unit && (
                        <span style={{ fontSize: '13px', color: color, fontWeight: '700' }}>
                            {unit}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
