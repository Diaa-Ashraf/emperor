import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Helper to gracefully retry or refresh if a lazy chunk failed to load (e.g. after a new build)
function lazyRetry(componentImport) {
    return React.lazy(async () => {
        const hasRefreshed = window.sessionStorage.getItem('chunk_retry_refreshed');
        try {
            const module = await componentImport();
            window.sessionStorage.removeItem('chunk_retry_refreshed');
            return module;
        } catch (error) {
            if (!hasRefreshed) {
                window.sessionStorage.setItem('chunk_retry_refreshed', 'true');
                window.location.reload();
                return { default: () => null };
            }
            throw error;
        }
    });
}

// Pages with lazy retry support
const HomePage = lazyRetry(() => import('./pages/HomePage'));
const LoginPage = lazyRetry(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazyRetry(() => import('./pages/auth/RegisterPage'));
const CompleteProfilePage = lazyRetry(() => import('./pages/auth/CompleteProfilePage'));
const CategoryPage = lazyRetry(() => import('./pages/CategoryPage'));
const ProductDetailPage = lazyRetry(() => import('./pages/ProductDetailPage'));
const WalletPage = lazyRetry(() => import('./pages/WalletPage'));
const DepositPage = lazyRetry(() => import('./pages/DepositPage'));
const DepositDetailPage = lazyRetry(() => import('./pages/DepositDetailPage'));
const OrdersPage = lazyRetry(() => import('./pages/OrdersPage'));
const OrderDetailPage = lazyRetry(() => import('./pages/OrderDetailPage'));
const TargetAppsPage = lazyRetry(() => import('./pages/TargetAppsPage'));
const TargetOrderPage = lazyRetry(() => import('./pages/TargetOrderPage'));
const TargetOrdersPage = lazyRetry(() => import('./pages/TargetOrdersPage'));
const TargetOrderDetailPage = lazyRetry(() => import('./pages/TargetOrderDetailPage'));
const ReferralsPage = lazyRetry(() => import('./pages/ReferralsPage'));
const NotificationsPage = lazyRetry(() => import('./pages/NotificationsPage'));
const ProfilePage = lazyRetry(() => import('./pages/ProfilePage'));
const SettingsPage = lazyRetry(() => import('./pages/SettingsPage'));
const SupportPage = lazyRetry(() => import('./pages/SupportPage'));
const CreatedByPage = lazyRetry(() => import('./pages/CreatedByPage'));
const AccountIssuesPage = lazyRetry(() => import('./pages/AccountIssuesPage'));
const AboutPage = lazyRetry(() => import('./pages/AboutPage'));
const DeveloperApiPage = lazyRetry(() => import('./pages/DeveloperApiPage'));
const NotFoundPage = lazyRetry(() => import('./pages/NotFoundPage'));

// Admin SPA Pages (Guarded by AdminProtectedRoute)
const AdminDashboardPage = lazyRetry(() => import('./pages/admin/AdminDashboardPage'));
const AdminWalletPage = lazyRetry(() => import('./pages/admin/AdminWalletPage'));
const AdminUsersPage = lazyRetry(() => import('./pages/admin/AdminUsersPage'));
const AdminDepositsPage = lazyRetry(() => import('./pages/admin/AdminDepositsPage'));
const AdminOrdersPage = lazyRetry(() => import('./pages/admin/AdminOrdersPage'));
const AdminTargetsPage = lazyRetry(() => import('./pages/admin/AdminTargetsPage'));
const AdminProductsPage = lazyRetry(() => import('./pages/admin/AdminProductsPage'));
const AdminProvidersPage = lazyRetry(() => import('./pages/admin/AdminProvidersPage'));
const AdminPaymentMethodsPage = lazyRetry(() => import('./pages/admin/AdminPaymentMethodsPage'));
const AdminPricingTiersPage = lazyRetry(() => import('./pages/admin/AdminPricingTiersPage'));
const AdminActivityLogsPage = lazyRetry(() => import('./pages/admin/AdminActivityLogsPage'));
const AdminStaffPage = lazyRetry(() => import('./pages/admin/AdminStaffPage'));
const AdminReferralsPage = lazyRetry(() => import('./pages/admin/AdminReferralsPage'));
const AdminUserLedgerPage = lazyRetry(() => import('./pages/admin/AdminUserLedgerPage'));
const AdminSettingsPage = lazyRetry(() => import('./pages/admin/AdminSettingsPage'));
const AdminCurrenciesPage = lazyRetry(() => import('./pages/admin/AdminCurrenciesPage'));
const AdminWhatsAppPage = lazyRetry(() => import('./pages/admin/AdminWhatsAppPage'));

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

// Admin Protected Route Guard (Verifies is_admin or staff permissions)
export function AdminProtectedRoute({ children, requiredPermission }) {
    const { isAuthenticated, canAccessAdmin, can, loading } = useAuth();

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '60vh',
                color: '#F5D061'
            }}>
                <div style={{
                    width: '36px',
                    height: '36px',
                    border: '3px solid rgba(245, 208, 97, 0.2)',
                    borderTopColor: '#F5D061',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                }} />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!canAccessAdmin || (requiredPermission && !can(requiredPermission))) {
        return <Navigate to="/" replace />;
    }

    return children;
}

// Public Route (redirects to home if already authenticated, unless OAuth callback params exist)
export function PublicRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return null;
    }

    // If URL contains oauth_token, let the child (LoginPage / RegisterPage) handle setting the session & redirecting to /complete-profile
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('oauth_token')) {
        return children;
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
                {/*  */}
                {/* Orders */}
                <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
                <Route path="/orders/:id" element={<ProtectedRoute><OrderDetailPage /></ProtectedRoute>} />

                {/* Target Orders */}
                <Route path="/target-orders" element={<ProtectedRoute><TargetOrdersPage /></ProtectedRoute>} />
                <Route path="/target/orders" element={<ProtectedRoute><TargetOrdersPage /></ProtectedRoute>} />
                {/*  */}
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

                {/* Unified Admin Routes (Protected by AdminProtectedRoute) */}
                <Route path="/admin" element={<AdminProtectedRoute><AdminDashboardPage /></AdminProtectedRoute>} />
                <Route path="/admin/dashboard" element={<AdminProtectedRoute><AdminDashboardPage /></AdminProtectedRoute>} />
                <Route path="/admin/wallet" element={<AdminProtectedRoute><AdminWalletPage /></AdminProtectedRoute>} />
                <Route path="/admin/users" element={<AdminProtectedRoute><AdminUsersPage /></AdminProtectedRoute>} />
                <Route path="/admin/users/ledger" element={<AdminProtectedRoute><AdminUserLedgerPage /></AdminProtectedRoute>} />
                <Route path="/admin/users/:id/ledger" element={<AdminProtectedRoute><AdminUserLedgerPage /></AdminProtectedRoute>} />
                <Route path="/admin/deposits" element={<AdminProtectedRoute><AdminDepositsPage /></AdminProtectedRoute>} />
                <Route path="/admin/orders" element={<AdminProtectedRoute><AdminOrdersPage /></AdminProtectedRoute>} />
                <Route path="/admin/targets" element={<AdminProtectedRoute><AdminTargetsPage /></AdminProtectedRoute>} />
                <Route path="/admin/products" element={<AdminProtectedRoute><AdminProductsPage /></AdminProtectedRoute>} />
                <Route path="/admin/categories" element={<AdminProtectedRoute><AdminProductsPage /></AdminProtectedRoute>} />
                <Route path="/admin/catalog" element={<AdminProtectedRoute><AdminProductsPage /></AdminProtectedRoute>} />
                <Route path="/admin/providers" element={<AdminProtectedRoute><AdminProvidersPage /></AdminProtectedRoute>} />
                <Route path="/admin/payment-methods" element={<AdminProtectedRoute><AdminPaymentMethodsPage /></AdminProtectedRoute>} />
                <Route path="/admin/payment_methods" element={<AdminProtectedRoute><AdminPaymentMethodsPage /></AdminProtectedRoute>} />
                <Route path="/admin/pricing-tiers" element={<AdminProtectedRoute><AdminPricingTiersPage /></AdminProtectedRoute>} />
                <Route path="/admin/groups" element={<AdminProtectedRoute><AdminPricingTiersPage /></AdminProtectedRoute>} />
                <Route path="/admin/staff" element={<AdminProtectedRoute><AdminStaffPage /></AdminProtectedRoute>} />
                <Route path="/admin/activity-logs" element={<AdminProtectedRoute><AdminActivityLogsPage /></AdminProtectedRoute>} />
                <Route path="/admin/audit-logs" element={<AdminProtectedRoute><AdminActivityLogsPage /></AdminProtectedRoute>} />
                <Route path="/admin/staff-activity" element={<AdminProtectedRoute><AdminActivityLogsPage /></AdminProtectedRoute>} />
                <Route path="/admin/referrals" element={<AdminProtectedRoute><AdminReferralsPage /></AdminProtectedRoute>} />
                <Route path="/admin/rewards" element={<AdminProtectedRoute><AdminReferralsPage /></AdminProtectedRoute>} />
                <Route path="/admin/appearance" element={<AdminProtectedRoute><AdminDashboardPage /></AdminProtectedRoute>} />
                <Route path="/admin/whatsapp" element={<AdminProtectedRoute><AdminWhatsAppPage /></AdminProtectedRoute>} />
                <Route path="/admin/currencies" element={<AdminProtectedRoute><AdminCurrenciesPage /></AdminProtectedRoute>} />
                <Route path="/admin/settings" element={<AdminProtectedRoute><AdminSettingsPage /></AdminProtectedRoute>} />
                <Route path="/admin/setting" element={<AdminProtectedRoute><AdminSettingsPage /></AdminProtectedRoute>} />

                {/* 404 Fallback */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </React.Suspense>
    );
}

export default AppRoutes;
