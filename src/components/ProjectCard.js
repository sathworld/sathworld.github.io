import { motion, AnimatePresence } from 'framer-motion';

export const ProjectCard = ({ title, description, tags, onClick, isExpanded }) => {
    return (
        <motion.div
            className="relative p-6 card-surface card-gradient-light dark:card-gradient-dark hover:shadow-lg min-w-[250px] flex flex-col interactive hover-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ boxShadow: '0 6px 22px -4px rgba(0,0,0,0.25)' }}
            transition={{ duration: 0.35, ease: [0.4,0,0.2,1] }}
            onClick={onClick}
        >
            <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-2 text-purple-dark dark:text-purple-light">
                    {title}
                </h3>
                {description && (
                    <p className="text-purple-dark-contrast dark:text-purple-light-contrast mb-4">{description}</p>
                )}
                <AnimatePresence initial={false}>
                    {isExpanded && (
                        <motion.div
                            key="details"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.4,0,0.2,1] }}
                            className="overflow-hidden"
                        >
                            <div className="mt-2 pt-3 border-t border-purple-dark/10 dark:border-purple-light/15 text-sm leading-relaxed text-purple-dark-contrast dark:text-purple-light-contrast">
                                <p>Additional project details or preview can go here...</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div className="flex flex-wrap gap-2 mt-4">
                    {tags.map(tag => (
                        <span
                            key={tag}
                            className="px-3 py-1 bg-purple-light-contrast dark:bg-purple-dark-contrast text-purple-dark dark:text-purple-light rounded-full text-sm"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};
