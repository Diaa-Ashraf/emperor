import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

export default function Input({
    label,
    error,
    helperText,
    icon: Icon,
    type = 'text',
    className = '',
    style = {},
    containerStyle = {},
    onFocus,
    onBlur,
    ...props
}) {
    const { theme } = useTheme();
    const isLight = theme === 'light';
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px', ...containerStyle }}>
            {label && (
                <label style={{
                    fontSize: '13.5px',
                    fontWeight: '700',
                    color: isLight ? '#0F172A' : '#E2E8F0',
                    fontFamily: 'Cairo, sans-serif',
                    transition: 'color 0.2s',
                }}>
                    {label}
                </label>
            )}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                {Icon && (
                    <div style={{
                        position: 'absolute',
                        right: '12px',
                        color: error
                            ? '#EF4444'
                            : (isFocused ? (isLight ? '#B8860B' : '#F5D061') : (isLight ? '#64748B' : '#94A3B8')),
                        display: 'flex',
                        alignItems: 'center',
                        pointerEvents: 'none',
                        transition: 'color 0.2s',
                        zIndex: 2,
                    }}>
                        <Icon size={18} />
                    </div>
                )}
                <input
                    type={type}
                    style={{
                        width: '100%',
                        padding: Icon ? '11px 42px 11px 14px' : '11px 14px',
                        background: isLight ? '#FFFFFF' : 'rgba(18, 18, 26, 0.85)',
                        border: error
                            ? '1.5px solid #EF4444'
                            : (isFocused
                                ? (isLight ? '1.5px solid #D4A537' : '1.5px solid #F5D061')
                                : (isLight ? '1.5px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.14)')),
                        borderRadius: '12px',
                        color: isLight ? '#0F172A' : '#FFFFFF',
                        fontSize: '14.5px',
                        fontWeight: '600',
                        outline: 'none',
                        fontFamily: 'Cairo, sans-serif',
                        boxShadow: isFocused
                            ? (error
                                ? '0 0 0 3px rgba(239, 68, 68, 0.15)'
                                : (isLight ? '0 0 0 3px rgba(212, 165, 55, 0.2)' : '0 0 0 3px rgba(212, 165, 55, 0.25)'))
                            : (isLight ? '0 1px 3px rgba(0, 0, 0, 0.04)' : 'none'),
                        transition: 'all 0.2s ease',
                        boxSizing: 'border-box',
                        ...style,
                    }}
                    onFocus={(e) => {
                        setIsFocused(true);
                        if (onFocus) onFocus(e);
                    }}
                    onBlur={(e) => {
                        setIsFocused(false);
                        if (onBlur) onBlur(e);
                    }}
                    className={className}
                    {...props}
                />
            </div>
            {error && (
                <span style={{ fontSize: '12px', color: '#EF4444', fontWeight: '700', fontFamily: 'Cairo, sans-serif' }}>
                    {Array.isArray(error) ? error[0] : error}
                </span>
            )}
            {helperText && !error && (
                <span style={{ fontSize: '12px', color: isLight ? '#64748B' : '#94A3B8', fontFamily: 'Cairo, sans-serif' }}>
                    {helperText}
                </span>
            )}
        </div>
    );
}
