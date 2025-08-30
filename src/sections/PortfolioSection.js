import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from '../components/ProjectCard';

export const PortfolioSection = () => {
    const projects = [
        { id: 1, title: "EV PCB Design", tags: ["PCB", "High Voltage"], description: "Designed a high-voltage PCB for an electric vehicle." },
        { id: 2, title: "FPGA Development", tags: ["HDL", "Digital Logic"], description: "Implemented a hardware-accelerated algorithm using VHDL." },
        { id: 3, title: "Embedded Systems", tags: ["Firmware", "IoT"], description: "Developed firmware for an IoT device with real-time constraints." }
    ];

    const tags = ["PCB", "High Voltage", "HDL", "Digital Logic", "Firmware", "IoT"]; // Core selectable tags
    const [selectedTags, setSelectedTags] = useState([]); // multi-select
    const [filterMode, setFilterMode] = useState('OR'); // OR | AND
    const [expandedProject, setExpandedProject] = useState(null);
    
    const toggleMode = () => setFilterMode(m => m === 'OR' ? 'AND' : 'OR');

    const handleTagClick = (tag) => {
        setSelectedTags(prev => {
            if (prev.includes(tag)) {
                const next = prev.filter(t => t !== tag);
                return next; // allow empty selection => show all
            }
            return [...prev, tag];
        });
    };

    const filteredProjects = selectedTags.length === 0
        ? projects
        : projects.filter(project => {
            if (filterMode === 'OR') {
                return selectedTags.some(tag => project.tags.includes(tag));
            }
            // AND mode
            return selectedTags.every(tag => project.tags.includes(tag));
        });

    return (
        <section id="portfolio" className="min-h-screen bg-purple-light dark:bg-purple-dark text-purple-dark dark:text-purple-light max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <h1 className="text-3xl font-bold mb-12 text-center">My Projects</h1>
            <div className="flex flex-wrap items-center gap-2 mb-4">
                <button
                    type="button"
                    onClick={toggleMode}
                    className="px-4 py-2 rounded-lg font-semibold bg-purple-dark text-white dark:bg-purple-light dark:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70 shadow-sm"
                >
                    Mode: {filterMode}
                </button>
                <button
                    type="button"
                    onClick={() => setSelectedTags([])}
                    disabled={selectedTags.length === 0}
                    className={`px-3 py-2 rounded-lg font-medium border-2 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70
                        ${selectedTags.length === 0 ? 'border-purple-dark/30 text-purple-dark/40 dark:border-purple-light/30 dark:text-purple-light/40 cursor-not-allowed' : 'border-purple-dark text-purple-dark dark:border-purple-light dark:text-purple-light hover:bg-purple-dark/10 dark:hover:bg-purple-light/10'}`}
                >
                    Clear
                </button>
                {tags.map(tag => {
                    const active = selectedTags.includes(tag);
                    return (
                        <button
                            key={tag}
                            type="button"
                            onClick={() => handleTagClick(tag)}
                            aria-pressed={active}
                            className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70
                                ${active
                                    ? 'bg-purple-dark text-white dark:bg-purple-light dark:text-black'
                                    : 'border-2 border-purple-dark text-purple-dark dark:border-purple-light dark:text-purple-light hover:bg-purple-dark/10 dark:hover:bg-purple-light/10'}
                            `}
                        >
                            {tag}
                        </button>
                    );
                })}
            </div>
            <div className="flex flex-wrap gap-8">
                {filteredProjects.map(project => {
                    const expanded = expandedProject === project.id;
                    return (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { duration: 0.25 } }}
                            exit={{ opacity: 0, transition: { duration: 0.15 } }}
                            className={
                                `w-full ${expanded ? 'sm:w-full' : 'sm:w-[calc(50%-1rem)]'} ` +
                                'transition-[width] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]'
                            }
                            style={{}}
                        >
                            <ProjectCard
                                title={project.title}
                                description={expanded ? project.description : ""}
                                tags={project.tags}
                                onClick={() => setExpandedProject(expanded ? null : project.id)}
                                isExpanded={expanded}
                            />
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};
