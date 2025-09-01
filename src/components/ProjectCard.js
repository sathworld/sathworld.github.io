import { motion, AnimatePresence } from 'framer-motion';

// Extended ProjectCard to support optional duration and detailed bullet points.
export const ProjectCard = ({ id, title, description, details = [], duration, tags = [], onClick, isExpanded }) => {
    return (
        <motion.button
            type="button"
            className="text-left relative p-6 card-surface card-gradient-light dark:card-gradient-dark hover:shadow-lg min-w-[250px] w-full flex flex-col interactive hover-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ boxShadow: '0 6px 22px -4px rgba(0,0,0,0.25)' }}
            transition={{ duration: 0.35, ease: [0.4,0,0.2,1] }}
            onClick={onClick}
            aria-expanded={isExpanded}
            aria-controls={isExpanded ? `${id}-details` : undefined}
        >
            <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-1 text-purple-dark dark:text-purple-light">
                    {title}
                </h3>
                {duration && (
                    <p className="text-xs uppercase tracking-wide text-purple-dark/70 dark:text-purple-light/60 mb-2">{duration}</p>
                )}
                {description && (
                    <p className="text-purple-dark-contrast dark:text-purple-light-contrast mb-4 line-clamp-4">{description}</p>
                )}
                <AnimatePresence initial={false}>
                    {isExpanded && (
                        <motion.div
                            key="details"
                            id={`${id}-details`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.4,0,0.2,1] }}
                            className="overflow-hidden"
                        >
                            <div className="mt-2 pt-3 border-t border-purple-dark/10 dark:border-purple-light/15 text-sm leading-relaxed text-purple-dark-contrast dark:text-purple-light-contrast space-y-2">
                                {details.length > 0 ? (
                                    <ul className="list-disc pl-5 space-y-1">
                                        {details.map((d, i) => (
                                            <li key={i}>{d}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No further details provided.</p>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                {tags.length > 0 && (
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
                )}
            </div>
        </motion.button>
    );
};
