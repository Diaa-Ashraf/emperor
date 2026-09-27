import React from 'react';

export default function Card({
    children,
    title,
    subtitle,
    action,
    goldAccent = false,
    hoverEffect = false,
    className = '',
    style = {},
    headerStyle = {},
    bodyStyle = {},
    ...props
}) {
    return (
        <div
            style={{
                background: goldAccent
                    ? 'linear-gradient(135deg, rgba(212, 165, 55, 0.08) 0%, rgba(24, 24, 30, 0.95) 100%)'
                    : 'rgba(24, 24, 30, 0.85)',
                border: goldAccent
                    ? '1px solid rgba(212, 165, 55, 0.3)'
                    : '1px solid rgba(255, 255, 255, 0.07)',
                borderRadius: '16px',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
                overflow: 'hidden',
                ...style,
            }}
            className={`${hoverEffect ? 'emperor-card-hover' : ''} ${className}`}
            {...props}
        >
            {(title || action) && (
                <div
                    style={{
                        padding: '18px 22px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        ...headerStyle,
                    }}
                >
                    <div>
                        {title && (
                            <h3 style={{
                                margin: 0,
                                fontSize: '18px',
                                fontWeight: '700',
                                color: goldAccent ? '#D4A537' : '#FFFFFF',
                            }}>
                                {title}
                            </h3>
                        )}
                        {subtitle && (
                            <p style={{
                                margin: '4px 0 0',
                                fontSize: '13px',
                                color: '#8E8E98',
                            }}>
                                {subtitle}
                            </p>
                        )}
                    </div>
                    {action && <div>{action}</div>}
                </div>
            )}
            <div style={{ padding: '22px', ...bodyStyle }}>
                {children}
            </div>
        </div>
    );
}
