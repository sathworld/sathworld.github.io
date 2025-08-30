import { useEffect } from 'react';
import { SocialButtons } from '../components/SocialButtons';
import { ResumeDropdown } from '../components/ResumeDropdown';

export const HomeSection = () => {
    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mq.matches) return; // respect reduced motion

        // Curated palettes (pink / purple / blue) with higher contrast separation
        const palettes = [
            [ { h:325,s:78,l:52 }, { h:285,s:72,l:46 }, { h:250,s:70,l:45 } ], // vivid magenta -> royal purple -> indigo
            [ { h:335,s:82,l:55 }, { h:300,s:70,l:48 }, { h:265,s:72,l:47 } ], // hot pink -> purple -> violet blue
            [ { h:345,s:85,l:54 }, { h:310,s:75,l:49 }, { h:275,s:70,l:46 } ], // pinker variant
            [ { h:330,s:80,l:53 }, { h:295,s:72,l:47 }, { h:260,s:68,l:45 } ]  // balanced
        ];
        const total = palettes.length;
        if (!total) return;

        const cycleMs = 40000; // full loop duration (40s)
        const segMs = cycleMs / total;
        const lerp = (a,b,t)=> a + (b-a)*t;
        const clamp01 = v => v < 0 ? 0 : v > 1 ? 1 : v;
        const fmt = ({h,s,l}) => `hsl(${h} ${s}% ${l}%)`;

        // Initialize first palette immediately
        palettes[0].forEach((c,i)=>{
            document.documentElement.style.setProperty(`--name-c${i+1}`, fmt(c));
        });

        let raf; const start = performance.now();
        const animate = (t) => {
            const elapsed = (t - start) % cycleMs;
            const segIndex = Math.floor(elapsed / segMs);
            const nextIndex = (segIndex + 1) % total;
            const localT = (elapsed - segIndex * segMs) / segMs; // 0..1
            const easeT = localT < 0.5
                ? 2*localT*localT  // accelerate
                : 1 - Math.pow(-2*localT + 2, 2)/2; // decelerate (easeInOutQuad)
            const from = palettes[segIndex];
            const to = palettes[nextIndex];
            if (!from || !to) { raf = requestAnimationFrame(animate); return; }
            const dark = document.documentElement.classList.contains('dark');
            // Darken further in light mode for stronger contrast
            const lightnessAdjust = dark ? 0 : 0; // percent points
            for (let i=0;i<3;i++) {
                const f = from[i]; const g = to[i];
                const c = {
                    h: lerp(f.h, g.h, easeT).toFixed(2),
                    s: lerp(f.s, g.s, easeT).toFixed(2),
                    l: Math.max(0, Math.min(100, lerp(f.l, g.l, easeT) + lightnessAdjust)).toFixed(2)
                };
                document.documentElement.style.setProperty(`--name-c${i+1}`, fmt(c));
            }
            raf = requestAnimationFrame(animate);
        };
        raf = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(raf);
    }, []);

    return (
    <section id="home" className="relative min-h-screen flex items-center justify-center text-center bg-transparent text-purple-dark dark:text-purple-light">
            <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <h1 className="text-5xl font-bold mb-6 inline-block name-gradient">Damir Gazizullin</h1>
                <p className="text-xl mb-8">Discover my work and projects here.</p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <ResumeDropdown variant="outline" size="sm" />
                    <SocialButtons size="sm" align="center" variant="outline" inline />
                </div>
            </div>
        </section>
    );
};
