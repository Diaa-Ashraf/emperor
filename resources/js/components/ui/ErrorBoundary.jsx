import React from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('React ErrorBoundary caught error:', error, errorInfo);
        this.setState({ errorInfo });

        // Check if error is due to stale Vite dynamic import chunk
        const errMsg = (error?.message || '').toLowerCase();
        if (errMsg.includes('failed to fetch dynamically imported module') || errMsg.includes('loading chunk')) {
            const hasReloaded = window.sessionStorage.getItem('chunk_eb_reload');
            if (!hasReloaded) {
                window.sessionStorage.setItem('chunk_eb_reload', 'true');
                window.location.reload();
            }
        }
    }

    handleReload = () => {
        window.sessionStorage.removeItem('chunk_eb_reload');
        window.sessionStorage.removeItem('chunk_retry_refreshed');
        this.setState({ hasError: false, error: null, errorInfo: null });
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    minHeight: '80vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '30px',
                    textAlign: 'center',
                    color: '#FFFFFF',
                    backgroundColor: '#070709',
                    fontFamily: 'Cairo, sans-serif',
                }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '20px',
                        background: 'rgba(239, 68, 68, 0.15)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#EF4444',
                        marginBottom: '20px',
                    }}>
                        <AlertTriangle size={32} />
                    </div>

                    <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '8px', color: '#FFFFFF' }}>
                        حدث خطأ غير متوقع أثناء عرض هذه الصفحة
                    </h2>

                    <p style={{ fontSize: '14px', color: '#9E9EA8', maxWidth: '480px', marginBottom: '24px', lineHeight: '1.6' }}>
                        يرجى إعادة تحميل الصفحة أو العودة للصفحة الرئيسية. تم تسجيل الخطأ لمعالجته تلقائياً.
                    </p>

                    {this.state.error && (
                        <div style={{
                            maxWidth: '600px',
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            borderRadius: '12px',
                            padding: '12px 16px',
                            marginBottom: '24px',
                            fontSize: '12px',
                            color: '#FCA5A5',
                            textAlign: 'left',
                            direction: 'ltr',
                            fontFamily: 'monospace',
                            wordBreak: 'break-all',
                        }}>
                            {this.state.error.toString()}
                        </div>
                    )}

                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <button
                            onClick={this.handleReload}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '12px 24px',
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)',
                                border: 'none',
                                color: '#000000',
                                fontSize: '14px',
                                fontWeight: '800',
                                cursor: 'pointer',
                            }}
                        >
                            <RefreshCw size={16} />
                            <span>إعادة تحميل الصفحة</span>
                        </button>

                        <a
                            href="/"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '12px 24px',
                                borderRadius: '12px',
                                background: 'rgba(255, 255, 255, 0.08)',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                color: '#CBD5E1',
                                fontSize: '14px',
                                fontWeight: '700',
                                textDecoration: 'none',
                            }}
                        >
                            العودة للرئيسية
                        </a>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
