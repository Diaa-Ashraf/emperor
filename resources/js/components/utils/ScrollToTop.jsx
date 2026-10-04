import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
    const { pathname, search, hash } = useLocation();
    const prevPathnameRef = useRef(pathname);

    // Disable browser's auto scroll restoration globally
    useEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
    }, []);

    useLayoutEffect(() => {
        const prev = prevPathnameRef.current;
        prevPathnameRef.current = pathname;

        const getBaseSection = (path) => {
            if (!path || path === '/') return 'home';
            const seg = path.split('/').filter(Boolean)[0];
            return seg || 'home';
        };

        const prevSection = getBaseSection(prev);
        const currentSection = getBaseSection(pathname);

        // If navigating within the same main section (tabs, filters, subpages of the same category/target/wallet),
        // keep the user's scroll position without jarring bounce to the top!
        const isIntraSection = prevSection === currentSection && prevSection !== 'home';
        if (isIntraSection && !hash) {
            return;
        }

        const performScroll = () => {
            if (hash) {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    return;
                }
            }

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'instant'
            });

            if (document.documentElement) document.documentElement.scrollTop = 0;
            if (document.body) document.body.scrollTop = 0;

            const root = document.getElementById('app') || document.getElementById('root');
            if (root) root.scrollTop = 0;

            const scrollables = document.querySelectorAll('main, [data-scrollable], .emperor-main-layout');
            scrollables.forEach(el => {
                if (el) el.scrollTop = 0;
            });
        };

        // 1. Instant layout effect execution before painting
        performScroll();

        // 2. Micro-frame checks for lazy-loaded routes and API layout shifts
        const frame1 = requestAnimationFrame(performScroll);
        const timeout1 = setTimeout(performScroll, 30);
        const timeout2 = setTimeout(performScroll, 120);
        const timeout3 = setTimeout(performScroll, 300);

        return () => {
            cancelAnimationFrame(frame1);
            clearTimeout(timeout1);
            clearTimeout(timeout2);
            clearTimeout(timeout3);
        };
    }, [pathname, search, hash]);

    return null;
}


