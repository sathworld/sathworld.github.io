import { useState } from "react";
import { motion } from "framer-motion";
import { ProjectCard } from '../components/ProjectCard';

export const PortfolioSection = () => {
    const projects = [
        { id: 1, title: "EV PCB Design", tags: ["PCB", "High Voltage"], description: "Designed a high-voltage PCB for an electric vehicle." },
        { id: 2, title: "FPGA Development", tags: ["HDL", "Digital Logic"], description: "Implemented a hardware-accelerated algorithm using VHDL." },
        { id: 3, title: "Embedded Systems", tags: ["Firmware", "IoT"], description: "Developed firmware for an IoT device with real-time constraints." }
    ];

    const tags = ["All", "PCB", "High Voltage", "HDL", "Digital Logic", "Firmware", "IoT"];
    const [selectedTag, setSelectedTag] = useState("All");
    const [expandedProject, setExpandedProject] = useState(null);

    const filteredProjects = selectedTag === "All" 
      ? projects 
      : projects.filter(project => project.tags.includes(selectedTag));

    return (
        <section id="portfolio" className="min-h-screen bg-purple-light dark:bg-purple-dark text-purple-dark dark:text-purple-light max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <h1 className="text-3xl font-bold mb-12 text-center">My Projects</h1>
            <div className="flex flex-wrap gap-2 mb-4">
                {tags.map(tag => (
                    <button 
                        key={tag} 
                        onClick={() => setSelectedTag(tag)} 
                        className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 
                        ${selectedTag === tag 
                            ? "bg-purple-dark text-white dark:bg-purple-light dark:text-black" 
                            : "border-2 border-purple-dark text-purple-dark dark:border-purple-light dark:text-purple-light"}`}
                    >
                        {tag}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
                {filteredProjects.map(project => (
                    <motion.div 
                        key={project.id} 
                        layout 
                        className={expandedProject === project.id ? "col-span-1 sm:col-span-2 md:col-span-2" : "col-span-1"}
                    >
                        <ProjectCard 
                            title={project.title} 
                            description={expandedProject === project.id ? project.description : ""} 
                            tags={project.tags} 
                            onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                            isExpanded={expandedProject === project.id}  // Passes the expanded state
                        />
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
