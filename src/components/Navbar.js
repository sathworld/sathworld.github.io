import { useState, useEffect, useRef } from 'react';
import { MoonIcon, SunIcon, Bars3Icon } from '@heroicons/react/24/solid';
import { CubeIcon, CubeTransparentIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../utils/theme';

export const Navbar = () => {
    const { isDarkMode, setIsDarkMode, showThree, setShowThree } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
    const mobileMenuRef = useRef(null); // Reference for mobile menu
    const menuButtonRef = useRef(null); // Reference for the hamburger menu button

    // Prevent sticky active / focus state on touch devices without risking null event reuse
    const safeBlur = (e) => {
        if (!e) return;
        const target = e.currentTarget; // capture before event is released
        if (target && typeof target.blur === 'function') {
            setTimeout(() => target.blur(), 0); // defer to let state update first
        }
    };

    const toggleTheme = (e) => {
        setIsDarkMode(prev => {
            const next = !prev;
            document.documentElement.classList.toggle('dark', next);
            return next;
        });
        safeBlur(e);
    };
    const toggleThree = (e) => {
        setShowThree(v => !v);
        safeBlur(e);
    };

    // Store links in one place
    const links = [
        { name: 'Home', href: '#home' },
        { name: 'Portfolio', href: '#portfolio' },
        { name: 'Contact', href: '#contact' }
    ];

    // Close mobile menu after clicking on a link
    const handleLinkClick = () => {
        setIsMobileMenuOpen(false); // Close the mobile menu
    };

    // Close mobile menu if clicked outside and trap focus inside when open
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && 
                !menuButtonRef.current.contains(event.target)
            ) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        const handleKeyDown = (e) => {
            if (!isMobileMenuOpen) return;
            if (e.key === 'Escape') { setIsMobileMenuOpen(false); menuButtonRef.current?.focus(); }
            if (e.key === 'Tab') {
                const focusables = mobileMenuRef.current?.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
                if (!focusables || focusables.length === 0) return;
                const list = Array.from(focusables);
                const first = list[0];
                const last = list[list.length - 1];
                if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
                else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
            }
        };
        document.addEventListener('keydown', handleKeyDown);

        // Cleanup the event listener on unmount
        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isMobileMenuOpen]);

    return (
        <nav className="fixed top-0 inset-x-0 w-full bg-purple-light/90 backdrop-blur-sm dark:bg-purple-dark/85 shadow-lg dark:shadow-xl dark:shadow-purple-dark z-[100] pointer-events-auto">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <a href="#home" className="text-xl font-bold text-purple-dark dark:text-purple-light">
                        Damir Gazizullin
                    </a>

                    {/* Navigation Links (Centered on desktop) */}
                    <div className="hidden md:flex flex-grow justify-center space-x-8">
                        {links.map((item) => (
                            <a 
                                key={item.href} 
                                href={item.href} 
                                className="text-purple-dark dark:text-purple-light hover:text-purple-dark-contrast dark:hover:text-purple-light-contrast transition-colors duration-200"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>

                    {/* Theme Switcher and Hamburger (Right-aligned) */}
                    <div className="flex items-center ml-auto space-x-4">
                        {/* 3D Toggle */}
                        <button
                            onClick={toggleThree}
                            aria-pressed={showThree}
                            className="p-2 rounded-lg bg-purple-light-contrast dark:bg-purple-dark-contrast text-purple-dark dark:text-purple-light md:hover:bg-purple-light md:dark:hover:bg-purple-dark transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70"
                            title={showThree ? 'Disable 3D background' : 'Enable 3D background'}
                        >
                            {showThree ? (
                                <CubeTransparentIcon className="h-6 w-6" />
                            ) : (
                                <CubeIcon className="h-6 w-6" />
                            )}
                            <span className="sr-only">Toggle 3D background</span>
                        </button>
                        {/* Theme Switcher */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-purple-light-contrast dark:bg-purple-dark-contrast text-purple-dark dark:text-purple-light md:hover:bg-purple-light md:dark:hover:bg-purple-dark transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70"
                            title={isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'}
                            aria-label={isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'}
                        >
                            {isDarkMode ? (
                                <SunIcon className="h-6 w-6" />
                            ) : (
                                <MoonIcon className="h-6 w-6" />
                            )}
                        </button>

                        {/* Hamburger Icon for Mobile (Visible only on small screens) */}
                        <button 
                            ref={menuButtonRef} // Add ref to hamburger button
                            onClick={(e) => { setIsMobileMenuOpen(m => !m); safeBlur(e); }} 
                            className={`md:hidden p-2 rounded-lg bg-purple-light-contrast dark:bg-purple-dark-contrast
                            text-purple-dark dark:text-purple-light md:hover:bg-purple-light md:dark:hover:bg-purple-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70`}
                            aria-expanded={isMobileMenuOpen}
                            aria-controls="mobile-nav"
                        >
                            {/* Hamburger Icon */}
                            <Bars3Icon className={`h-6 w-6 ${isMobileMenuOpen ? 'text-purple-dark dark:text-purple-light' : 'text-purple-dark dark:text-purple-light'}`} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div 
                ref={mobileMenuRef} // Add ref to mobile menu
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
                ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
                `}
            >
                <div id="mobile-nav" className={`transform transition-transform duration-300 ease-in-out 
                    ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-10'}
                    pl-4`} // Added padding-left (pl-4) here for whitespace on the left
                >
                    {links.map((item) => (
                        <a 
                            key={item.href} 
                            href={item.href} 
                            className="block text-purple-dark dark:text-purple-light py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70"
                            onClick={(e) => { handleLinkClick(); safeBlur(e); }} // Close menu and blur
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
};
