import React from 'react';
import { Package } from 'lucide-react';

export default function EmptyState({
    icon: Icon,
    title = 'لا توجد بيانات حالياً',
    description,
    action,
    style = {},
}) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '48px 24px',
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '16px',
                border: '1px dashed rgba(255, 255, 255, 0.1)',
                ...style,
            }}
        >
            <div
                style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'rgba(212, 165, 55, 0.1)',
                    border: '1px solid rgba(212, 165, 55, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                    color: '#D4A537',
                }}
            >
                {Icon ? <Icon size={28} /> : <Package size={28} />}
            </div>
            <h4 style={{ margin: '0 0 8px', fontSize: '17px', fontWeight: '700', color: '#FFFFFF' }}>
                {title}
            </h4>
            {description && (
                <p style={{ margin: '0 0 20px', fontSize: '14px', color: '#8E8E98', maxWidth: '360px', lineHeight: '1.5' }}>
                    {description}
                </p>
            )}
            {action && <div>{action}</div>}
        </div>
    );
}
