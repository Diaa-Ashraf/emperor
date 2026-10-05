import React from 'react';

export default function StatsCard({ icon: Icon, title, value, unit, color = '#D4A537', bg = 'rgba(212, 165, 55, 0.15)' }) {
    return (
        <div style={{
            background: 'linear-gradient(145deg, #181822 0%, #111118 100%)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: '20px 22px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            minWidth: 0,
            boxSizing: 'border-box',
        }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = color;
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 12px 30px ${bg}`;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
            }}
        >
            <div className="referral-stats-icon-container" style={{
                width: '52px',
                height: '52px',
                borderRadius: '16px',
                background: bg,
                color: color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                border: `1px solid ${color}33`,
            }}>
                <Icon size={24} className="referral-stats-icon" />
            </div>

            <div style={{ minWidth: 0, flex: 1 }}>
                <span style={{
                    fontSize: '13px',
                    color: '#9E9EA8',
                    display: 'block',
                    marginBottom: '4px',
                    fontWeight: '700',
                    lineHeight: '1.4',
                }}>
                    {title}
                </span>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', flexWrap: 'wrap' }}>
                    <strong style={{
                        fontSize: '22px',
                        fontWeight: '900',
                        color: '#FFFFFF',
                        fontFamily: 'Cairo, sans-serif',
                        letterSpacing: '-0.3px',
                    }}>
                        {value}
                    </strong>
                    {unit && (
                        <span style={{
                            fontSize: '12.5px',
                            color: color,
                            fontWeight: '800',
                            whiteSpace: 'nowrap',
                        }}>
                            {unit}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
