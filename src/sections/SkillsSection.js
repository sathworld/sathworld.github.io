// SkillsSection.js
export const SkillsSection = () => {
    const skills = [
        { id: 1, name: "JavaScript", level: "Advanced", tags: ["Web Development", "Frontend"] },
        { id: 2, name: "React", level: "Intermediate", tags: ["Web Framework", "Frontend"] },
        { id: 3, name: "Node.js", level: "Intermediate", tags: ["Backend", "JavaScript"] },
        { id: 4, name: "Python", level: "Advanced", tags: ["Programming", "Data Science"] },
        { id: 5, name: "SQL", level: "Intermediate", tags: ["Database", "Backend"] },
    ];

    return (
        <section id="skills" className="min-h-screen bg-purple-light dark:bg-purple-dark text-purple-dark dark:text-purple-light max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <h1 className="text-3xl font-bold mb-12 text-center">My Skills</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {skills.map(skill => (
                    <div key={skill.id} className="p-6 bg-purple-light dark:bg-purple-dark rounded-lg shadow-md dark:shadow-md dark:shadow-purple-dark hover:shadow-md dark:hover:shadow-md dark:hover:shadow-purple-dark-hover transition-shadow duration-200 min-w-[250px] flex flex-col">
                        <h2 className="text-xl font-semibold text-purple-dark dark:text-purple-light">{skill.name}</h2>
                        <p className="mt-2 text-purple-dark-contrast dark:text-purple-light-contrast">{skill.level}</p>
                        <div className="flex flex-wrap gap-2 mt-4">
                            {skill.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 bg-purple-light-contrast dark:bg-purple-dark-contrast text-purple-dark dark:text-purple-light rounded-full text-sm"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
