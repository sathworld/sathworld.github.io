import { useState, useEffect, useRef } from 'react';
import { MoonIcon, SunIcon, Bars3Icon } from '@heroicons/react/24/solid';
import { useTheme } from '../utils/theme';

export const Navbar = () => {
    const { isDarkMode, setIsDarkMode } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
    const mobileMenuRef = useRef(null); // Reference for mobile menu
    const menuButtonRef = useRef(null); // Reference for the hamburger menu button

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark', !isDarkMode);
    };

    // Store links in one place
    const links = [
        { name: 'Home', href: '#home' },
        { name: 'Portfolio', href: '#portfolio' },
        { name: 'Models', href: '#models' },
        { name: 'Contact', href: '#contact' }
    ];

    // Close mobile menu after clicking on a link
    const handleLinkClick = () => {
        setIsMobileMenuOpen(false); // Close the mobile menu
    };

    // Close mobile menu if clicked outside
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

        // Cleanup the event listener on unmount
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <nav className="fixed w-full bg-purple-light dark:bg-purple-dark shadow-lg dark:shadow-xl dark:shadow-purple-dark z-50">
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
                        {/* Theme Switcher */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-purple-light-contrast dark:bg-purple-dark-contrast text-purple-dark dark:text-purple-light hover:bg-purple-light dark:hover:bg-purple-dark transition-colors duration-200"
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
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                            className={`md:hidden p-2 rounded-lg bg-purple-light-contrast dark:bg-purple-dark-contrast
                            text-purple-dark dark:text-purple-light hover:bg-purple-light dark:hover:bg-purple-dark focus:outline-none`}
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
                <div className={`transform transition-transform duration-300 ease-in-out 
                    ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-10'}
                    pl-4`} // Added padding-left (pl-4) here for whitespace on the left
                >
                    {links.map((item) => (
                        <a 
                            key={item.href} 
                            href={item.href} 
                            className="block text-purple-dark dark:text-purple-light py-2"
                            onClick={handleLinkClick} // Close menu when a link is clicked
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
};
