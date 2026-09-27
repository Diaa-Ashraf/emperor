import * as bootstrap from 'bootstrap';
import ApexCharts from 'apexcharts';

window.bootstrap = bootstrap;
window.ApexCharts = ApexCharts;

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

    // Click outside overlay to close
    if (overlay) {
        overlay.addEventListener('click', () => {
            if (sidebar) sidebar.classList.remove('mobile-show');
            if (overlay) overlay.classList.remove('show');
        });
    }

    // Auto-dismiss alerts after 5 seconds
    const alerts = document.querySelectorAll('.alert-dismissible');
    alerts.forEach(alert => {
        setTimeout(() => {
            const bsAlert = bootstrap.Alert.getOrCreateInstance(alert);
            if (bsAlert) bsAlert.close();
        }, 5000);
    });
});
