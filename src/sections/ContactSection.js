import { useState, useRef, useEffect } from 'react';
import { SocialButtons } from '../components/SocialButtons';
import { ResumeDropdown } from '../components/ResumeDropdown';

export const ContactSection = () => {
    const [copied, setCopied] = useState(false); // controls badge
    const [showEmail, setShowEmail] = useState(false); // controls email visibility
    const [fadeEmail, setFadeEmail] = useState(false); // triggers fade-out
    const hideTimers = useRef([]);

    // Base64 for dgazizul@uwaterloo.ca (keeps plain text out of initial DOM)
    const encoded = 'ZGdheml6dWxAdXdhdGVybG9vLmNh';

    const decodeEmail = () => {
        try {
            return atob(encoded);
        } catch (e) {
            return 'Something went wrong';
        }
    };

    const clearTimers = () => {
        hideTimers.current.forEach(id => clearTimeout(id));
        hideTimers.current = [];
    };

    useEffect(() => () => clearTimers(), []);

    const handleCopy = async () => {
        const email = decodeEmail();
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500); // badge hides
        } catch (err) {
            // Fallback: create a temporary textarea
            const ta = document.createElement('textarea');
            ta.value = email;
            document.body.appendChild(ta);
            ta.select();
            try { document.execCommand('copy'); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch(_) {}
            document.body.removeChild(ta);
        }

        // Manage email reveal lifecycle (5s total, fade last 0.5s)
        clearTimers();
        setShowEmail(true);
        setFadeEmail(false);
        hideTimers.current.push(setTimeout(() => setFadeEmail(true), 2500)); // start fade after 2.5s
        hideTimers.current.push(setTimeout(() => { setShowEmail(false); setFadeEmail(false); }, 3000)); // remove at 3s
    };

    // Human-readable but less trivially scrapeable (no literal @ / .)
    const disguisedVisible = 'dgazizul [at] uwaterloo [dot] ca';

    return (
    <section id="contact" className="min-h-[80vh] text-purple-dark dark:text-purple-light max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-transparent">
            <h2 className="text-3xl font-bold mb-12 text-center" id="contact-heading">Contact Me</h2>
            <div className="flex flex-col items-center gap-10 w-full max-w-5xl">
                <div className="w-full flex flex-col sm:flex-row gap-8">
                    {/* Left: Large email button */}
                    <button
                        type="button"
                        onClick={handleCopy}
                        className="relative group flex-1 px-8 py-6 rounded-lg card-gradient-light dark:card-gradient-dark text-purple-dark dark:text-purple-light font-semibold shadow-md hover:shadow-lg transition-all duration-300 card-surface border border-purple-500/20 dark:border-purple-300/10 text-left"
                        aria-label="Copy my email address to your clipboard"
                        aria-describedby="email-copy-help"
                        data-email={encoded}
                    >
                        <span className="select-none block text-base sm:text-2xl" aria-hidden="true">{disguisedVisible}</span>
                        <span className="block font-normal opacity-70 group-hover:opacity-90 transition-opacity mt-2">Click to copy real email</span>
                        <span
                            className={`pointer-events-none absolute -top-2 -right-2 text-base px-2 py-0.5 rounded-full bg-emerald-600 text-white shadow transition-opacity ${copied ? 'opacity-100' : 'opacity-0'}`}
                            role="status" aria-live="polite"
                        >{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                    <p id="email-copy-help" className="sr-only">Button copies the full email address to the clipboard.</p>
                    {/* Right: Vertical stack (Resume + socials) */}
                    <div className="flex flex-row sm:flex-col sm:w-60 gap-4 items-stretch">
                        <SocialButtons size="sm" align="center" variant="outline" includeEmail={false} direction="column" />
                        <ResumeDropdown variant="outline" fullWidth size="sm" align="center" />
                    </div>
                </div>
            </div>
        </section>
    );
};
