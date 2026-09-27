import React from 'react';

export default function Select({
    label,
    error,
    helperText,
    options = [],
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
            <select
                style={{
                    width: '100%',
                    padding: '10px 14px',
                    background: '#121218',
                    border: error ? '1px solid #EF4444' : '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '10px',
                    color: '#FFFFFF',
                    fontSize: '15px',
                    outline: 'none',
                    fontFamily: 'Cairo, sans-serif',
                    cursor: 'pointer',
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
            >
                {options.map((opt, idx) => {
                    const value = typeof opt === 'object' ? opt.value : opt;
                    const text = typeof opt === 'object' ? opt.label : opt;
                    return (
                        <option key={idx} value={value} style={{ background: '#181820', color: '#FFF' }}>
                            {text}
                        </option>
                    );
                })}
            </select>
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
