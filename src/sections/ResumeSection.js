import { ResumeCard } from '../components/ResumeCard';

// ResumeSection.js
export const ResumeSection = () => {
    const experiences = [
        { 
            id: 1, 
            title: "Software Engineer Intern", 
            company: "Tech Company", 
            date: "June 2023 - August 2023", 
            description: "Worked on developing a feature for an internal tool using React and Node.js.", 
            tags: ["React", "Node.js", "JavaScript"],
            logo: "https://example.com/company-logo.png"  // Add company logo URL here
        },
        { 
            id: 2, 
            title: "Research Assistant", 
            company: "University of XYZ", 
            date: "September 2022 - May 2023", 
            description: "Assisted in data analysis and modeling for a project on machine learning algorithms.", 
            tags: ["Python", "Data Science", "Machine Learning"],
            logo: "https://example.com/university-logo.png"  // Add logo URL for the university
        },
    ];

    return (
        <section id="resume" className="min-h-screen bg-purple-light dark:bg-purple-dark text-purple-dark dark:text-purple-light max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <h1 className="text-3xl font-bold mb-12 text-center">My Resume</h1>
            <div className="space-y-8">
                {experiences.map(experience => (
                    <ResumeCard 
                        key={experience.id}
                        title={experience.title}
                        company={experience.company}
                        date={experience.date}
                        description={experience.description}
                        tags={experience.tags}
                        logo={experience.logo}  // Pass the logo as a prop
                    />
                ))}
            </div>
        </section>
    );
};
