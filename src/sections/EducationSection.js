import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resumeData } from '../utils/resumeData';

export const EducationSection = () => {
  const edu = resumeData.education;
  // Fallback if migration in progress (can remove once sure)
  const courses = (edu?.courses && edu.courses.length > 0)
    ? edu.courses
    : (resumeData.selectedCourses || []);

  const allTags = useMemo(() => {
    const set = new Set();
    courses.forEach(c => (c.categories || []).forEach(cat => set.add(cat)));
    return Array.from(set).sort();
  }, [courses]);

  const [selectedTags, setSelectedTags] = useState([]); // multi-select
  const [filterMode, setFilterMode] = useState('OR'); // OR | AND

  const toggleMode = () => setFilterMode(m => m === 'OR' ? 'AND' : 'OR');
  const handleTagClick = (tag) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };
  const clearTags = () => setSelectedTags([]);

  const filteredCourses = selectedTags.length === 0
    ? courses
    : courses.filter(c => {
        if (filterMode === 'OR') return selectedTags.some(t => c.categories?.includes(t));
        return selectedTags.every(t => c.categories?.includes(t));
      });

  return (
    <section id="education" className="text-purple-dark dark:text-purple-light max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-transparent">
      <h2 className="text-3xl font-bold mb-12 text-center">Education</h2>
      {edu ? (
        <div className="mb-12">
          <div className="p-6 rounded-xl card-surface card-gradient-light dark:card-gradient-dark border border-purple-dark/10 dark:border-purple-light/10 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:justify-between gap-1 md:items-start">
              <h3 className="text-xl font-semibold leading-snug">{edu.university}</h3>
              <div className="flex flex-col md:items-end text-left md:text-right">
                <p className="text-sm lg:text-base text-purple-dark-contrast dark:text-purple-light-contrast mb-1 leading-snug">{edu.location}</p>
                <p className="text-sm uppercase tracking-wide text-purple-dark/70 dark:text-purple-light/60 leading-snug">{edu.duration}</p>
              </div>
            </div>
            <p className="mt-1 lg:-mt-5 text-sm lg:text-base text-purple-dark-contrast dark:text-purple-light-contrast font-medium leading-snug transition-all">{edu.degree} <span className="opacity-80 font-normal">(GPA: {edu.gpa})</span></p>
            {edu.awards?.length > 0 && (
              <div className="mt-5">
                <h4 className="text-sm uppercase tracking-wide font-semibold mb-2 text-purple-dark/80 dark:text-purple-light/80">Awards & Scholarships</h4>
                <ul className="flex flex-wrap gap-3 text-sm lg:text-sm">
                  {edu.awards.map((a,i)=>(
                    <li
                      key={i}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-dark/5 dark:bg-purple-light/10 border border-purple-dark/15 dark:border-purple-light/15 text-purple-dark-contrast dark:text-purple-light-contrast shadow-sm backdrop-blur-[2px] hover:bg-purple-dark/10 dark:hover:bg-purple-light/15 transition-colors"
                    >
                      <span className="leading-snug">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p className="mb-12 text-sm text-purple-dark-contrast dark:text-purple-light-contrast">No education data available.</p>
      )}

      {courses.length > 0 && (
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <button
              type="button"
              onClick={toggleMode}
              className="px-4 py-2 rounded-lg font-semibold bg-purple-dark text-white dark:bg-purple-light dark:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70 shadow-sm"
            >
              Mode: {filterMode}
            </button>
            <button
              type="button"
              onClick={clearTags}
              disabled={selectedTags.length === 0}
              className={`px-3 py-2 rounded-lg font-medium border-2 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70 ${selectedTags.length === 0 ? 'border-purple-dark/30 text-purple-dark/40 dark:border-purple-light/30 dark:text-purple-light/40 cursor-not-allowed' : 'border-purple-dark text-purple-dark dark:border-purple-light dark:text-purple-light'}`}
            >
              Clear
            </button>
            {allTags.map(tag => {
              const active = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  aria-pressed={active}
                  onClick={() => handleTagClick(tag)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70 ${active ? 'bg-purple-dark text-white dark:bg-purple-light dark:text-black' : 'border-2 border-purple-dark text-purple-dark dark:border-purple-light dark:text-purple-light hover:bg-purple-dark/10 dark:hover:bg-purple-light/10'}`}
                >
                  {tag}
                </button>
              );
            })}
          </div>

          <ul className="grid gap-6 sm:grid-cols-2" aria-live="polite">
            <AnimatePresence mode="popLayout" initial={false}>
              {filteredCourses.map((c,i)=>(
                <motion.li
                  key={c.code + i}
                  layout="position"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28, ease: [0.4,0,0.2,1] }}
                  className="group relative p-5 rounded-xl card-surface card-gradient-light dark:card-gradient-dark border border-purple-dark/10 dark:border-purple-light/10 shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="font-semibold text-purple-dark dark:text-purple-light tracking-wide text-base lg:text-lg">{c.code}</span>
                    <div className="flex flex-wrap gap-2 justify-end">
                      {(c.categories||[]).map(cat => (
                        <span
                          key={cat}
                          className="px-3 py-1 rounded-full text-sm font-medium bg-purple-light-contrast dark:bg-purple-dark-contrast text-purple-dark dark:text-purple-light border border-purple-dark/10 dark:border-purple-light/10 select-none"
                        >{cat}</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-base lg:text-lg font-medium text-purple-dark-contrast dark:text-purple-light-contrast leading-snug">{c.title}</p>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      )}
    </section>
  );
};
