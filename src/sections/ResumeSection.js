import { ResumeCard } from '../components/ResumeCard';
import { resumeData } from '../utils/resumeData';

// ResumeSection.js
export const ResumeSection = () => {
    const experiences = resumeData.experience || [];
    return (
        <section id="experience" className="text-purple-dark dark:text-purple-light max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-transparent">
            <h2 className="text-3xl font-bold mb-12 text-center" id="resume-heading">Experience</h2>
            <div className="space-y-8">
                {experiences.map((exp, idx) => (
                    <ResumeCard
                        key={idx}
                        title={exp.title}
                        company={exp.company}
                        location={exp.location}
                        duration={exp.duration}
                        description={exp.description}
                        logo={exp.logo}
                        darkLogo={exp.darkLogo}
                        website={exp.website}
                    />
                ))}
            </div>
        </section>
    );
};
