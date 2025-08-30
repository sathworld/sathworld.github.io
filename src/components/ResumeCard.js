// ResumeCard.js
export const ResumeCard = ({ title, company, date, description, tags, logo }) => {
    return (
    <div className="p-6 card-surface card-gradient-light dark:card-gradient-dark hover:shadow-lg flex flex-col sm:flex-row min-w-[250px] interactive hover-accent">
            {/* Logo and Content Layout */}
            <div className="flex sm:flex-row flex-col sm:mr-6 mb-4 sm:mb-0 justify-center sm:justify-start items-center sm:items-start w-full sm:w-auto">
                {/* Logo on top for small screens, side by side on larger screens */}
                {logo && (
                    <img 
                        src={logo} 
                        alt={`${company} Logo`} 
                        className="w-64 h-64 object-cover mb-4 sm:mb-0" 
                    />
                )}
            </div>

            {/* Text Content */}
            <div className="flex-1">
                <h2 className="text-2xl font-semibold text-purple-dark dark:text-purple-light">{title}</h2>
                <p className="text-lg text-purple-dark dark:text-purple-light">
                    {company} <span className="text-purple-light dark:text-purple-light">{`| ${date}`}</span>
                </p>
                <p className="mt-4 text-purple-dark-contrast dark:text-purple-light-contrast">{description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 bg-purple-light-contrast dark:bg-purple-dark-contrast text-purple-dark dark:text-purple-light rounded-full text-sm"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};
