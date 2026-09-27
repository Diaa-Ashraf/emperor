import React from 'react';

export default function Input({
    label,
    error,
    helperText,
    icon: Icon,
    type = 'text',
    className = '',
    style = {},
    containerStyle = {},
    ...props
}) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px', ...containerStyle }}>
            {label && (
                <label style={{ fontSize: '14px', fontWeight: '600', color: '#E2E8F0' }}>
                    {label}
                </label>
            )}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                {Icon && (
                    <div style={{
                        position: 'absolute',
                        right: '12px',
                        color: error ? '#EF4444' : '#8E8E98',
                        display: 'flex',
                        alignItems: 'center',
                        pointerEvents: 'none',
                    }}>
                        <Icon size={18} />
                    </div>
                )}
                <input
                    type={type}
                    style={{
                        width: '100%',
                        padding: Icon ? '10px 40px 10px 14px' : '10px 14px',
                        background: 'rgba(18, 18, 24, 0.8)',
                        border: error ? '1px solid #EF4444' : '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: '10px',
                        color: '#FFFFFF',
                        fontSize: '15px',
                        outline: 'none',
                        fontFamily: 'Cairo, sans-serif',
                        transition: 'border-color 0.2s',
                        ...style,
                    }}
                    onFocus={(e) => {
                        if (!error) e.target.style.borderColor = '#D4A537';
                    }}
                    onBlur={(e) => {
                        if (!error) e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                    }}
                    className={className}
                    {...props}
                />
            </div>
            {error && (
                <span style={{ fontSize: '12px', color: '#EF4444', fontWeight: '600' }}>
                    {Array.isArray(error) ? error[0] : error}
                </span>
            )}
            {helperText && !error && (
                <span style={{ fontSize: '12px', color: '#8E8E98' }}>
                    {helperText}
                </span>
            )}
        </div>
    );
}
