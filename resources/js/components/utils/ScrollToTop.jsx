import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
    const { pathname, search } = useLocation();

    useEffect(() => {
        const scrollToTop = () => {
            window.scrollTo(0, 0);
            if (document.documentElement) document.documentElement.scrollTop = 0;
            if (document.body) document.body.scrollTop = 0;
        };

        // Immediate scroll
        scrollToTop();

        // Delayed scroll to handle DOM painting and layout shifts
        const timeoutId = setTimeout(scrollToTop, 20);
        const secondTimeoutId = setTimeout(scrollToTop, 100);

        return () => {
            clearTimeout(timeoutId);
            clearTimeout(secondTimeoutId);
        };
    }, [pathname, search]);

    return null;
}
