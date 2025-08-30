import { SocialButtons } from '../components/SocialButtons';
import { ResumeDropdown } from '../components/ResumeDropdown';

export const HomeSection = () => {
    return (
    <section id="home" className="relative min-h-screen flex items-center justify-center text-center bg-transparent text-purple-dark dark:text-purple-light">
            <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <h1 className="text-5xl font-bold mb-6 text-gradient drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]">Damir Gazizullin</h1>
                <p className="text-xl mb-8">Discover my work and projects here.</p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <ResumeDropdown variant="outline" size="sm" />
                    <SocialButtons size="sm" align="center" variant="outline" inline />
                </div>
            </div>
        </section>
    );
};
