import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const prefersDark = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const prefersReducedMotion = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const [isDarkMode, setIsDarkMode] = useState(() => prefersDark());
    const [showThree, setShowThree] = useState(() => {
        try {
            const stored = localStorage.getItem('showThree');
            if (stored !== null) return stored === 'true';
        } catch(_) {}
        // Disable 3D by default if user prefers reduced motion.
        return !prefersReducedMotion();
    });

    useEffect(() => {
        const darkMQ = window.matchMedia('(prefers-color-scheme: dark)');
        const motionMQ = window.matchMedia('(prefers-reduced-motion: reduce)');

        const handleDark = (e) => setIsDarkMode(e.matches);
        const handleMotion = (e) => {
            // Auto-disable 3D if user toggles reduced motion on and they haven't explicitly enabled it after.
            if (e.matches) setShowThree(false);
        };
        darkMQ.addEventListener('change', handleDark);
        motionMQ.addEventListener('change', handleMotion);

        if (isDarkMode) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');

        return () => {
            darkMQ.removeEventListener('change', handleDark);
            motionMQ.removeEventListener('change', handleMotion);
        };
    }, [isDarkMode]);

    useEffect(() => {
        try { localStorage.setItem('showThree', String(showThree)); } catch(_) {}
    }, [showThree]);

    return (
        <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode, showThree, setShowThree }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}