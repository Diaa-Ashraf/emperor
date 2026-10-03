import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
import { LanguageProvider } from './contexts/LanguageContext';
import AppRoutes from './router';
import ScrollToTop from './components/utils/ScrollToTop';
import ErrorBoundary from './components/ui/ErrorBoundary';

function App() {
    return (
        <ErrorBoundary>
            <ThemeProvider>
                <LanguageProvider>
                    <AuthProvider>
                        <ToastProvider>
                            <BrowserRouter>
                                <ScrollToTop />
                                <AppRoutes />
                            </BrowserRouter>
                        </ToastProvider>
                    </AuthProvider>
                </LanguageProvider>
            </ThemeProvider>
        </ErrorBoundary>
    );
}

const rootElement = document.getElementById('app') || document.getElementById('root');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}
