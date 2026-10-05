import * as bootstrap from 'bootstrap';
import ApexCharts from 'apexcharts';

window.bootstrap = bootstrap;
window.ApexCharts = ApexCharts;

// ==========================================
// Emperor Admin SPA / Seamless AJAX Engine
// ==========================================

const getOrCreateProgressBar = () => {
    let bar = document.getElementById('admin-spa-loader');
    if (!bar) {
        bar = document.createElement('div');
        bar.id = 'admin-spa-loader';
        bar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            width: 0%;
            background: linear-gradient(90deg, #F0C35B, #D4A537, #FFFFFF);
            box-shadow: 0 0 12px rgba(212, 165, 55, 0.9), 0 0 6px #D4A537;
            z-index: 99999;
            transition: width 0.2s ease, opacity 0.25s ease;
            pointer-events: none;
            opacity: 0;
        `;
        document.body.appendChild(bar);
    }
    return bar;
};

let progressTimer = null;
const startProgress = () => {
    const bar = getOrCreateProgressBar();
    bar.style.opacity = '1';
    bar.style.width = '20%';
    if (progressTimer) clearInterval(progressTimer);
    progressTimer = setInterval(() => {
        const current = parseFloat(bar.style.width) || 20;
        if (current < 85) {
            bar.style.width = (current + Math.random() * 15) + '%';
        }
    }, 150);
};

const completeProgress = () => {
    if (progressTimer) clearInterval(progressTimer);
    const bar = getOrCreateProgressBar();
    bar.style.width = '100%';
    setTimeout(() => {
        bar.style.opacity = '0';
        setTimeout(() => {
            bar.style.width = '0%';
        }, 250);
    }, 180);
};

let currentAbortController = null;

export async function navigateAdmin(url, pushState = true) {
    let targetUrl;
    try {
        targetUrl = new URL(url, window.location.origin);
    } catch (e) {
        window.location.href = url;
        return;
    }

    if (targetUrl.origin !== window.location.origin || !targetUrl.pathname.startsWith('/admin')) {
        window.location.href = url;
        return;
    }

    if (currentAbortController) {
        currentAbortController.abort();
    }
    currentAbortController = new AbortController();

    startProgress();

    try {
        const response = await fetch(targetUrl.href, {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-Admin-SPA': 'true'
            },
            signal: currentAbortController.signal
        });

        if (!response.ok) {
            window.location.href = targetUrl.href;
            return;
        }

        const htmlText = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');

        const newContent = doc.getElementById('content');
        const currentContent = document.getElementById('content');

        if (!newContent || !currentContent) {
            window.location.href = targetUrl.href;
            return;
        }

        // Update Title
        if (doc.title) {
            document.title = doc.title;
        }

        // Smooth fade-out before replace
        currentContent.style.opacity = '0.35';
        currentContent.style.transition = 'opacity 0.1s ease';

        setTimeout(() => {
            currentContent.innerHTML = newContent.innerHTML;
            currentContent.style.opacity = '1';

            // Execute inline scripts inside the new content
            const scripts = currentContent.querySelectorAll('script');
            scripts.forEach(oldScript => {
                const newScript = document.createElement('script');
                Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
                newScript.appendChild(document.createTextNode(oldScript.innerHTML));
                oldScript.parentNode.replaceChild(newScript, oldScript);
            });

            // Re-init behaviors
            initAdminBehaviors();

            // Update sidebar active link
            updateActiveSidebar(targetUrl.pathname);

            // Close mobile sidebar if open
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('overlay');
            if (sidebar) sidebar.classList.remove('mobile-show');
            if (overlay) overlay.classList.remove('show');

            // Update URL in browser history
            if (pushState) {
                window.history.pushState({ path: targetUrl.href }, '', targetUrl.href);
            }

            window.scrollTo({ top: 0, behavior: 'instant' });
            completeProgress();
        }, 100);

    } catch (err) {
        if (err.name !== 'AbortError') {
            completeProgress();
            window.location.href = targetUrl.href;
        }
    }
}

window.navigateAdmin = navigateAdmin;

function updateActiveSidebar(pathname) {
    const navLinks = document.querySelectorAll('.sidebar .nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        try {
            const url = new URL(href, window.location.origin);
            const linkPath = url.pathname;
            if (linkPath === pathname) {
                link.classList.add('active');
            } else if (linkPath !== '/admin' && pathname.startsWith(linkPath + '/')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        } catch (e) {}
    });
}

function initAdminBehaviors() {
    // Auto-dismiss alerts after 5 seconds
    const alerts = document.querySelectorAll('.alert-dismissible');
    alerts.forEach(alert => {
        setTimeout(() => {
            const bsAlert = bootstrap.Alert.getOrCreateInstance(alert);
            if (bsAlert) bsAlert.close();
        }, 5000);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    const topbar = document.getElementById('topbar');
    const toggleBtn = document.getElementById('toggleBtn');
    const mobileBtn = document.getElementById('mobileBtn');
    const overlay = document.getElementById('overlay');

    // Desktop collapse toggle
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            if (sidebar) sidebar.classList.toggle('collapsed');
            if (content) content.classList.toggle('full');
            if (topbar) topbar.classList.toggle('full');
            
            // Save state in localStorage
            const isCollapsed = sidebar && sidebar.classList.contains('collapsed');
            localStorage.setItem('emperor_sidebar_collapsed', isCollapsed ? 'true' : 'false');
        });
    }

    // Restore saved state
    if (localStorage.getItem('emperor_sidebar_collapsed') === 'true') {
        if (sidebar) sidebar.classList.add('collapsed');
        if (content) content.classList.add('full');
        if (topbar) topbar.classList.add('full');
    }

    // Mobile sidebar open
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            if (sidebar) sidebar.classList.add('mobile-show');
            if (overlay) overlay.classList.add('show');
        });
    }

    // Mobile sidebar close button
    const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
    if (sidebarCloseBtn) {
        sidebarCloseBtn.addEventListener('click', () => {
            if (sidebar) sidebar.classList.remove('mobile-show');
            if (overlay) overlay.classList.remove('show');
        });
    }

    // Click outside overlay to close
    if (overlay) {
        overlay.addEventListener('click', () => {
            if (sidebar) sidebar.classList.remove('mobile-show');
            if (overlay) overlay.classList.remove('show');
        });
    }

    initAdminBehaviors();
});

// Intercept admin link clicks (Tabs, Filters, Pagination, Nav)
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
    if (link.target === '_blank' || link.hasAttribute('download') || link.dataset.noAjax === 'true') return;
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0) return;

    try {
        const url = new URL(href, window.location.origin);
        if (url.origin === window.location.origin && url.pathname.startsWith('/admin')) {
            e.preventDefault();
            navigateAdmin(url.href);
        }
    } catch (err) {
        // Fallback
    }
});

// Intercept GET filter/search forms
document.addEventListener('submit', (e) => {
    const form = e.target.closest('form');
    if (!form) return;

    const method = (form.getAttribute('method') || 'GET').toUpperCase();
    if (method !== 'GET') return;
    if (form.dataset.noAjax === 'true' || form.target === '_blank') return;

    const action = form.getAttribute('action') || window.location.pathname;
    try {
        const url = new URL(action, window.location.origin);
        if (url.origin === window.location.origin && url.pathname.startsWith('/admin')) {
            e.preventDefault();
            const formData = new FormData(form);
            const params = new URLSearchParams();
            for (const [key, value] of formData.entries()) {
                if (value !== '') {
                    params.append(key, value);
                }
            }
            const queryStr = params.toString();
            const fullUrl = url.pathname + (queryStr ? '?' + queryStr : '');
            navigateAdmin(fullUrl);
        }
    } catch (err) {
        // Fallback
    }
});

// Popstate listener for Back / Forward buttons
window.addEventListener('popstate', () => {
    navigateAdmin(window.location.href, false);
});
