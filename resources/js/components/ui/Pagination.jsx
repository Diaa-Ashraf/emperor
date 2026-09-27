import React from 'react';

export default function Pagination({
    currentPage = 1,
    lastPage = 1,
    onPageChange,
    style = {},
}) {
    if (lastPage <= 1) return null;

    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(lastPage, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '24px',
                direction: 'rtl',
                ...style,
            }}
        >
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    background: 'rgba(255, 255, 255, 0.04)',
                    color: currentPage === 1 ? '#555560' : '#FFFFFF',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    fontWeight: '600',
                }}
            >
                السابق
            </button>

            {pages.map((p) => (
                <button
                    key={p}
                    onClick={() => onPageChange(p)}
                    style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        border: p === currentPage ? '1px solid #D4A537' : '1px solid rgba(255, 255, 255, 0.08)',
                        background: p === currentPage ? 'linear-gradient(135deg, #D4A537 0%, #AA7C11 100%)' : 'rgba(255, 255, 255, 0.04)',
                        color: p === currentPage ? '#0D0D0F' : '#FFFFFF',
                        cursor: 'pointer',
                        fontWeight: '700',
                    }}
                >
                    {p}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === lastPage}
                style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    background: 'rgba(255, 255, 255, 0.04)',
                    color: currentPage === lastPage ? '#555560' : '#FFFFFF',
                    cursor: currentPage === lastPage ? 'not-allowed' : 'pointer',
                    fontWeight: '600',
                }}
            >
                التالي
            </button>
        </div>
    );
}
