
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Extended ProjectCard to support optional duration and detailed bullet points.
export const ProjectCard = ({
    id,
    title,
    description,
    details = [],
    duration,
    tags = [],
    images = [],
    links = [], // [{label,url}]
    files = [], // [{label,url,type}]
    onClick,
    isExpanded
}) => {
    const [lightboxIdx, setLightboxIdx] = useState(null);
    useEffect(() => {
        if (!isExpanded) {
            setLightboxIdx(null);
        }
    }, [isExpanded]);
    useEffect(() => {
        // Reset lightbox when switching to another project's images
        setLightboxIdx(null);
    }, [images]);
    return (
        <motion.button
            type="button"
            className={`text-left relative p-6 card-surface card-gradient-light dark:card-gradient-dark min-w-[250px] w-full flex flex-col hover-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70 rounded-xl select-text overflow-visible isolate ${isExpanded ? 'shadow-xl' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, ease: [0.4,0,0.2,1] }}
            onClick={onClick}
            aria-expanded={isExpanded}
            aria-controls={isExpanded ? `${id}-details` : undefined}
            tabIndex={0}
            style={{ zIndex: isExpanded ? 50 : undefined }}
        >
            <div className="relative z-10 select-text">
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
                            <div className="mt-2 pt-3 border-t border-purple-dark/10 dark:border-purple-light/15 text-sm leading-relaxed text-purple-dark-contrast dark:text-purple-light-contrast space-y-4">
                                {details.length > 0 ? (
                                    <ul className="list-disc pl-5 space-y-1 marker:text-purple-dark dark:marker:text-purple-light">
                                        {details.map((d, i) => (
                                            <li key={i}>{d}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No further details provided.</p>
                                )}
                                {(images.length > 0) && (
                                    <div className="flex flex-wrap gap-4">
                                        {images.map((img, i) => {
                                            const src = typeof img === 'string' ? img : img.src;
                                            const caption = typeof img === 'object' && img && img.title ? img.title : '';
                                            const altText = caption || `${title} image ${i+1}`;
                                            return (
                                                <figure key={i} className="max-w-xs">
                                                    <img
                                                        src={src}
                                                        alt={altText}
                                                        title={caption || undefined}
                                                        className="max-h-56 max-w-xs rounded-xl border border-purple-dark/10 dark:border-purple-light/15 shadow-md object-contain bg-white/40 dark:bg-purple-dark/30 p-2 cursor-zoom-in select-none"
                                                        loading="lazy"
                                                        tabIndex={0}
                                                        onClick={e => { e.stopPropagation(); setLightboxIdx(i); }}
                                                        onKeyDown={e => { if ((e.key === 'Enter' || e.key === ' ') && document.activeElement === e.target) { e.stopPropagation(); setLightboxIdx(i); } }}
                                                        draggable={false}
                                                    />
                                                    {caption && (
                                                        <figcaption className="mt-1 text-xs text-purple-dark-contrast/80 dark:text-purple-light-contrast/80">{caption}</figcaption>
                                                    )}
                                                </figure>
                                            );
                                        })}
                                    </div>
                                )}
                                {(links.length > 0 || files.length > 0) && (
                                    <div className="flex flex-wrap gap-2">
                                        {links.map((l,i)=>(
                                            <a
                                                key={i}
                                                href={l.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-3 py-1.5 rounded-md text-xs font-semibold bg-purple-dark text-white dark:bg-purple-light dark:text-black hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70 transition"
                                            >{l.label}</a>
                                        ))}
                                        {files.map((f,i)=>(
                                            <a
                                                key={i}
                                                href={f.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-3 py-1.5 rounded-md text-xs font-semibold border border-purple-dark/30 dark:border-purple-light/30 text-purple-dark dark:text-purple-light hover:bg-purple-dark/10 dark:hover:bg-purple-light/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70 transition"
                                            >{f.label}</a>
                                        ))}
                                    </div>
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
            {/* Lightbox Modal */}
            <AnimatePresence>
                {lightboxIdx !== null && images[lightboxIdx] && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={e => { e.stopPropagation(); setLightboxIdx(null); }}
                        tabIndex={-1}
                    >
                                                {(() => {
                                                    const img = images[lightboxIdx];
                                                    const src = typeof img === 'string' ? img : img.src;
                                                    const caption = typeof img === 'object' && img && img.title ? img.title : '';
                                                    const altText = caption || `${title} large image`;
                                                    return (
                                                        <div className="flex flex-col items-center gap-3" onClick={e => e.stopPropagation()}>
                                                            <motion.img
                                                                src={src}
                                                                alt={altText}
                                                                className="max-h-[80vh] max-w-[90vw] rounded-2xl border-2 border-purple-400 shadow-2xl bg-white dark:bg-purple-dark p-4"
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                exit={{ opacity: 0 }}
                                                                transition={{ duration: 0.18 }}
                                                            />
                                                            {caption && (
                                                                <div className="text-sm text-white/90 text-center px-4">{caption}</div>
                                                            )}
                                                        </div>
                                                    );
                                                })()}
                        <button
                            className="absolute top-6 right-8 text-white text-3xl font-bold bg-black/40 rounded-full px-3 py-1 hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                            onClick={e => { e.stopPropagation(); setLightboxIdx(null); }}
                            aria-label="Close image preview"
                            tabIndex={0}
                        >×</button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
};
