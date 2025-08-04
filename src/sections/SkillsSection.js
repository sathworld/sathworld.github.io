import { resumeData } from '../utils/resumeData';

export const SkillsSection = () => {
    const { skills } = resumeData;

    return (
        <section id="skills" className="min-h-screen bg-purple-light dark:bg-purple-dark text-purple-dark dark:text-purple-light max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <h1 className="text-3xl font-bold mb-12 text-center">Technical Skills</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {skills.map((skillCategory, index) => (
                    <div key={index} className="p-6 bg-purple-light dark:bg-purple-dark rounded-lg shadow-md dark:shadow-md dark:shadow-purple-dark hover:shadow-lg dark:hover:shadow-purple-dark-hover transition-shadow duration-200">
                        <h2 className="text-xl font-semibold text-purple-dark dark:text-purple-light mb-4">{skillCategory.category}</h2>
                        <p className="text-purple-dark-contrast dark:text-purple-light-contrast">
                            {skillCategory.items}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};
