import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return (
        <div style={{ padding: '40px 20px', textAlign: 'center' }}>
            <h1 style={{ color: '#D4A537', fontSize: '64px', margin: '0 0 16px' }}>404</h1>
            <h2 style={{ fontSize: '24px', margin: '0 0 16px' }}>الصفحة غير موجودة</h2>
            <p style={{ color: '#A0A0A0', marginBottom: '24px' }}>عذراً، الصفحة التي تبحث عنها غير متاحة أو تم نقلها.</p>
            <Link
                to="/"
                style={{
                    display: 'inline-block',
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, #D4A537 0%, #AA7C11 100%)',
                    color: '#0D0D0F',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    textDecoration: 'none'
                }}
            >
                العودة للرئيسية
            </Link>
        </div>
    );
}
