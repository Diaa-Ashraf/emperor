import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Placeholder Pages (will be replaced by full pages in Phase 9 & 10)
const HomePage = React.lazy(() => import('./pages/HomePage'));
const LoginPage = React.lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/auth/RegisterPage'));
const CompleteProfilePage = React.lazy(() => import('./pages/auth/CompleteProfilePage'));
const CategoryPage = React.lazy(() => import('./pages/CategoryPage'));
const ProductDetailPage = React.lazy(() => import('./pages/ProductDetailPage'));
const WalletPage = React.lazy(() => import('./pages/WalletPage'));
const DepositPage = React.lazy(() => import('./pages/DepositPage'));
const DepositDetailPage = React.lazy(() => import('./pages/DepositDetailPage'));
const OrdersPage = React.lazy(() => import('./pages/OrdersPage'));
const OrderDetailPage = React.lazy(() => import('./pages/OrderDetailPage'));
const TargetAppsPage = React.lazy(() => import('./pages/TargetAppsPage'));
const TargetOrderPage = React.lazy(() => import('./pages/TargetOrderPage'));
const TargetOrdersPage = React.lazy(() => import('./pages/TargetOrdersPage'));
const TargetOrderDetailPage = React.lazy(() => import('./pages/TargetOrderDetailPage'));
const ReferralsPage = React.lazy(() => import('./pages/ReferralsPage'));
const NotificationsPage = React.lazy(() => import('./pages/NotificationsPage'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));
const SettingsPage = React.lazy(() => import('./pages/SettingsPage'));
const SupportPage = React.lazy(() => import('./pages/SupportPage'));
const CreatedByPage = React.lazy(() => import('./pages/CreatedByPage'));
const AccountIssuesPage = React.lazy(() => import('./pages/AccountIssuesPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const DeveloperApiPage = React.lazy(() => import('./pages/DeveloperApiPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

// Protected Route Guard
export function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '60vh',
                color: '#D4A537'
            }}>
                <div style={{
                    width: '36px',
                    height: '36px',
                    border: '3px solid rgba(212, 165, 55, 0.2)',
                    borderTopColor: '#D4A537',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                }} />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

// Public Route (redirects to home if already authenticated)
export function PublicRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return null;
    }

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export function AppRoutes() {
    return (
        <React.Suspense fallback={
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '80vh',
                color: '#D4A537'
            }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    border: '3px solid rgba(212, 165, 55, 0.2)',
                    borderTopColor: '#D4A537',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                }} />
            </div>
        }>
            <Routes>
                {/* Public & Catalog Pages */}
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/category" element={<CategoryPage />} />
                <Route path="/categories" element={<CategoryPage />} />
                <Route path="/category/:slug" element={<CategoryPage />} />
                <Route path="/category/:id" element={<CategoryPage />} />
                <Route path="/products" element={<CategoryPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                {/* Target Selling & Apps */}
                <Route path="/target" element={<TargetAppsPage />} />
                <Route path="/target/apps" element={<TargetAppsPage />} />
                <Route path="/target-apps" element={<TargetAppsPage />} />
                <Route path="/target/sell" element={<TargetAppsPage />} />
                <Route path="/target-sell" element={<TargetAppsPage />} />
                <Route path="/buy-target" element={<TargetAppsPage />} />
                <Route path="/support" element={<SupportPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/about-us" element={<AboutPage />} />
                <Route path="/created-by" element={<CreatedByPage />} />
                <Route path="/developers" element={<CreatedByPage />} />
                <Route path="/account-issues" element={<AccountIssuesPage />} />
                <Route path="/public-contact-us" element={<AccountIssuesPage />} />
                <Route path="/complaints" element={<AccountIssuesPage />} />

                {/* Auth Pages */}
                <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
                <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
                <Route path="/complete-profile" element={<ProtectedRoute><CompleteProfilePage /></ProtectedRoute>} />

                {/* Protected Customer Pages */}
                <Route path="/wallet" element={<ProtectedRoute><WalletPage /></ProtectedRoute>} />
                <Route path="/deposits" element={<ProtectedRoute><WalletPage /></ProtectedRoute>} />
                <Route path="/deposit" element={<ProtectedRoute><DepositPage /></ProtectedRoute>} />
                <Route path="/deposit/new" element={<ProtectedRoute><DepositPage /></ProtectedRoute>} />
                <Route path="/deposits/new" element={<ProtectedRoute><DepositPage /></ProtectedRoute>} />
                <Route path="/wallet/deposit" element={<ProtectedRoute><DepositPage /></ProtectedRoute>} />
                <Route path="/wallet/add-balance" element={<ProtectedRoute><DepositPage /></ProtectedRoute>} />
                <Route path="/deposits/:id" element={<ProtectedRoute><DepositDetailPage /></ProtectedRoute>} />
                
                {/* Orders */}
                <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
                <Route path="/orders/:id" element={<ProtectedRoute><OrderDetailPage /></ProtectedRoute>} />
                
                {/* Target Orders */}
                <Route path="/target-orders" element={<ProtectedRoute><TargetOrdersPage /></ProtectedRoute>} />
                <Route path="/target/orders" element={<ProtectedRoute><TargetOrdersPage /></ProtectedRoute>} />
                <Route path="/target-orders/new" element={<ProtectedRoute><TargetOrderPage /></ProtectedRoute>} />
                <Route path="/target/orders/new" element={<ProtectedRoute><TargetOrderPage /></ProtectedRoute>} />
                <Route path="/target/sell/new" element={<ProtectedRoute><TargetOrderPage /></ProtectedRoute>} />
                <Route path="/target-sell/new" element={<ProtectedRoute><TargetOrderPage /></ProtectedRoute>} />
                <Route path="/target-order/new" element={<ProtectedRoute><TargetOrderPage /></ProtectedRoute>} />
                <Route path="/target-orders/:id" element={<ProtectedRoute><TargetOrderDetailPage /></ProtectedRoute>} />
                <Route path="/target/orders/:id" element={<ProtectedRoute><TargetOrderDetailPage /></ProtectedRoute>} />
                <Route path="/target/sell/:id" element={<ProtectedRoute><TargetOrderDetailPage /></ProtectedRoute>} />
                <Route path="/target-sell/:id" element={<ProtectedRoute><TargetOrderDetailPage /></ProtectedRoute>} />
                
                {/* User & Settings */}
                <Route path="/referrals" element={<ProtectedRoute><ReferralsPage /></ProtectedRoute>} />
                <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
                <Route path="/developer" element={<ProtectedRoute><DeveloperApiPage /></ProtectedRoute>} />
                <Route path="/developers/api" element={<ProtectedRoute><DeveloperApiPage /></ProtectedRoute>} />
                <Route path="/b2b" element={<ProtectedRoute><DeveloperApiPage /></ProtectedRoute>} />
                <Route path="/api-docs" element={<ProtectedRoute><DeveloperApiPage /></ProtectedRoute>} />

                {/* 404 Fallback */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </React.Suspense>
    );
}

export default AppRoutes;
