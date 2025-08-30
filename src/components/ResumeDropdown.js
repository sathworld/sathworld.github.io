import { useState, useRef, useEffect } from 'react';

// Configure resume variants here. Files should be named using the pattern:
//   Damir Gazizullin - <Suffix>.pdf
// and placed in: public/resumes/
// Example final filenames:
//   Damir Gazizullin - FPGA ASIC.pdf
//   Damir Gazizullin - Electrical Engineering.pdf
//   Damir Gazizullin - Embedded Systems.pdf
const BASE_NAME = 'Damir Gazizullin - ';
const RESUME_OPTIONS = [
  { id: 'fpga', label: 'FPGA / ASIC Resume', suffix: 'FPGA ASIC' },
  { id: 'electrical', label: 'Electrical Engineering Resume', suffix: 'Electrical' },
  { id: 'embedded', label: 'Embedded Systems Resume', suffix: 'Embedded' }
];

export const ResumeDropdown = ({ variant = 'outline', size = 'md', align = 'center', fullWidth = false }) => {
  const [open, setOpen] = useState(false);
  const [available, setAvailable] = useState({});
  const menuRef = useRef(null);
  const btnRef = useRef(null);

  // Probe for file existence (HEAD requests). If fetch forbidden for static, we optimistically allow.
  useEffect(() => {
    let active = true;
    (async () => {
      const results = {};
      for (const opt of RESUME_OPTIONS) {
        const file = `${BASE_NAME}${opt.suffix}.pdf`;
        const encoded = encodeURI(`/resumes/${file}`);
        try {
          const res = await fetch(encoded, { method: 'HEAD' });
          results[opt.id] = res.ok;
        } catch {
          results[opt.id] = false;
        }
      }
      if (active) setAvailable(results);
    })();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onClick = (e) => {
      if (open && menuRef.current && !menuRef.current.contains(e.target) && !btnRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onClick);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('mousedown', onClick); };
  }, [open]);

  const base = 'inline-flex items-center gap-2 font-semibold rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70 transition-colors';
  const sizing = size === 'sm' ? 'text-sm px-3 py-2' : 'text-base px-4 py-2';
  const solid = 'bg-purple-dark text-white dark:bg-purple-light dark:text-black hover:brightness-110';
  const outline = 'border-2 border-purple-dark text-purple-dark dark:border-purple-light dark:text-purple-light hover:bg-purple-dark/10 dark:hover:bg-purple-light/10';
  const style = variant === 'outline' ? outline : solid;
  const containerJustify = align === 'left' ? 'justify-start' : align === 'right' ? 'justify-end' : 'justify-center';
  // Positioning for the dropdown menu relative to the trigger button
  const menuAlign = align === 'left'
    ? 'left-0'
    : align === 'right'
      ? 'right-0'
      : 'left-1/2 -translate-x-1/2';

  return (
  <div className={`relative inline-flex ${fullWidth ? 'w-full' : ''} ${containerJustify}`}>
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`${base} ${sizing} ${style} ${fullWidth ? 'w-full justify-center' : ''}`}
      >
        <svg className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
        <span>Resume</span>
      </button>
      {open && (
        <div
          ref={menuRef}
          role="menu"
          className={`absolute top-full mt-2 ${menuAlign} z-20 w-56 rounded-lg border border-purple-dark/20 dark:border-purple-light/15 backdrop-blur-sm bg-white/80 dark:bg-purple-dark/70 shadow-lg p-2 flex flex-col gap-1 animate-fade-in transform`}
        >
          {RESUME_OPTIONS.map(opt => {
            const exists = available[opt.id];
            const disabled = exists === false; // unknown (undefined) -> allow click
            const file = `${BASE_NAME}${opt.suffix}.pdf`;
            const encoded = encodeURI(`/resumes/${file}`);
            return (
              <a
                key={opt.id}
                role="menuitem"
                href={disabled ? undefined : encoded}
                download={disabled ? undefined : file}
                onClick={() => setOpen(false)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60 flex items-start
                  ${disabled ? 'opacity-40 cursor-not-allowed bg-transparent' : 'hover:bg-purple-dark/10 dark:hover:bg-purple-light/10 cursor-pointer'}`}
                aria-disabled={disabled}
              >
                <span className="flex-1 leading-snug pr-2">{opt.label}</span>
                {!disabled && <span className="ml-auto self-center text-[10px] uppercase tracking-wide opacity-60">PDF</span>}
                {disabled && <span className="ml-auto self-center text-[10px] uppercase tracking-wide">Missing</span>}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ResumeDropdown;
