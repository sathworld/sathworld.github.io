import { useCallback, useState } from 'react';

const GITHUB_URL = 'https://github.com/sathworld';
const LINKEDIN_URL = 'https://www.linkedin.com/in/dgazizullin/';
// Base64 for dgazizul@uwaterloo.ca (avoid plain text in initial DOM)
const EMAIL_ENC = 'ZGdheml6dWxAdXdhdGVybG9vLmNh';

const iconClasses = 'w-5 h-5';

const IconGitHub = () => (
  <svg className={iconClasses} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.42 7.86 10.95.58.11.79-.25.79-.56 0-.27-.01-1.16-.02-2.1-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.06-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.74 1.26 3.41.96.11-.76.41-1.26.75-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.2-3.1-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.99 0 1.98.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.75.81 1.2 1.84 1.2 3.1 0 4.43-2.69 5.41-5.25 5.69.42.36.8 1.06.8 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/></svg>
);
const IconLinkedIn = () => (
  <svg className={iconClasses} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm7.5 0h3.83v1.71h.05c.53-1 1.84-2.05 3.79-2.05 4.05 0 4.8 2.67 4.8 6.15V21h-4v-5.2c0-1.24-.02-2.84-1.73-2.84-1.74 0-2.01 1.36-2.01 2.75V21h-4V9Z"/></svg>
);
const IconMail = () => (
  <svg className={iconClasses} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M3 4h18a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 2v.01L12 13l9-6.99V6H3Zm0 12h18V9l-9 7L3 9v9Z"/></svg>
);

export const SocialButtons = ({ size='md', align='center', variant='solid', includeEmail = true, direction='row', inline=false }) => {
  const decodedEmail = atob(EMAIL_ENC);
  const [copied, setCopied] = useState(false);
  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(decodedEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = decodedEmail;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); setCopied(true); setTimeout(() => setCopied(false), 1600); } catch(_) {}
      document.body.removeChild(ta);
    }
  }, [decodedEmail]);

  const base = 'inline-flex items-center gap-2 font-semibold rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70 transition-colors';
  const sizing = size === 'sm' ? 'text-sm px-3 py-2' : 'text-base px-4 py-2';
  const solid = 'bg-purple-dark text-white dark:bg-purple-light dark:text-black hover:brightness-110';
  const outline = 'border-2 border-purple-dark text-purple-dark dark:border-purple-light dark:text-purple-light hover:bg-purple-dark/10 dark:hover:bg-purple-light/10';
  const style = variant === 'outline' ? outline : solid;
  const containerJustify = align === 'left' ? 'justify-start' : align === 'right' ? 'justify-end' : 'justify-center';

  const dirClass = direction === 'column' ? 'flex-col items-stretch' : 'flex-row flex-wrap';
  const fullItem = direction === 'column' ? 'w-full justify-center' : '';
  const items = <>
    <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={`${base} ${sizing} ${style} ${fullItem}`} aria-label="GitHub profile">
      <IconGitHub /> <span>GitHub</span>
    </a>
    <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={`${base} ${sizing} ${style} ${fullItem}`} aria-label="LinkedIn profile">
      <IconLinkedIn /> <span>LinkedIn</span>
    </a>
    {includeEmail && (
      <button type="button" onClick={handleCopyEmail} className={`${base} ${sizing} ${style} relative ${fullItem}`} aria-label="Copy my email address">
        <IconMail /> <span>{copied ? 'Copied!' : 'Email'}</span>
        <span className={`absolute -top-2 -right-2 text-[10px] px-2 py-0.5 rounded-full bg-emerald-600 text-white shadow transition-opacity ${copied ? 'opacity-100' : 'opacity-0'}`}>OK</span>
      </button>
    )}
  </>;
  if (inline) return items;
  return (
    <div className={`flex ${dirClass} gap-3 ${containerJustify}`}>{items}</div>
  );
};

export default SocialButtons;
