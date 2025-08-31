import { resumeData } from '../utils/resumeData';

export const SkillsSection = () => {
    const { skills } = resumeData;

    return (
    <section id="skills" className="text-purple-dark dark:text-purple-light max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-transparent">
            <h1 className="text-3xl font-bold mb-12 text-center">Technical Skills</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {skills.map((skillCategory, index) => (
                    <div key={index} className="p-6 card-surface card-gradient-light dark:card-gradient-dark hover:shadow-lg hover-accent">
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
