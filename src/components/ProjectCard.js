import { motion } from 'framer-motion';

export const ProjectCard = ({ title, description, tags, onClick, isExpanded }) => {
    return (
        <motion.div
            className="p-6 bg-purple-light dark:bg-purple-dark rounded-lg shadow-md dark:shadow-md dark:shadow-purple-dark hover:shadow-md dark:hover:shadow-md dark:hover:shadow-purple-dark-hover transition-shadow duration-200 min-w-[250px] flex flex-col"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onClick}
        >
            <h3 className="text-xl font-semibold mb-2 text-purple-dark dark:text-purple-light">
                {title}
            </h3>
            <p className="text-purple-dark-contrast dark:text-purple-light-contrast mb-4">{description}</p>
            {isExpanded && (
                <div className="mt-4 text-purple-dark-contrast dark:text-purple-light-contrast">
                    <p>Additional project details or preview can go here...</p>
                    {/* You could include images, a project demo, or any extra content. */}
                </div>
            )}
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
        </motion.div>
    );
};
