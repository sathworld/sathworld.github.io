// ResumeCard.js
// Accepts description as string or array of bullet points.
import { useTheme } from '../utils/theme';

export const ResumeCard = ({ title, company, location, duration, description, tags = [], logo, darkLogo, website }) => {
    const { isDarkMode } = useTheme();
    const displayLogo = (isDarkMode && darkLogo) ? darkLogo : logo;
    const isArray = Array.isArray(description);
    return (
        <div className="p-6 card-surface card-gradient-light dark:card-gradient-dark hover:shadow-lg flex flex-col sm:flex-row min-w-[250px] interactive hover-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70 rounded-xl">
            {/* Logo */}
                        {displayLogo && (
                                <div className="flex sm:mr-6 mb-4 sm:mb-0 justify-center sm:justify-start items-center w-full sm:w-auto">
                                    {website ? (
                                        <a href={website} target="_blank" rel="noopener noreferrer" aria-label={`${company} website`} className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70 rounded-md">
                                                                    <img
                                                                        src={displayLogo}
                                                                        alt={`${company} Logo`}
                                                                        className="w-32 h-32 object-contain rounded-full transition-transform duration-300 group-hover:scale-105 ring-2 ring-purple-dark/15 dark:ring-purple-light/20 bg-white dark:bg-purple-dark/40 p-3"
                                                                        loading="lazy"
                                                                    />
                                        </a>
                                    ) : (
                                                                    <img
                                                                        src={displayLogo}
                                                                        alt={`${company} Logo`}
                                                                        className="w-32 h-32 object-contain rounded-full ring-2 ring-purple-dark/15 dark:ring-purple-light/20 bg-white dark:bg-purple-dark/40 p-3"
                                                                        loading="lazy"
                                                                    />
                                    )}
                                </div>
                        )}
            {/* Text Content */}
                    <div className="flex-1">
                        <h3 className="text-xl lg:text-2xl font-semibold text-purple-dark dark:text-purple-light mb-1">
                            {title}
                                                                                    {company && (
                                                                                        <span className="font-normal text-purple-dark-contrast dark:text-purple-light-contrast ml-2">
                                                                                            | {website ? (
                                                                                                <a
                                                                                                    href={website}
                                                                                                    target="_blank"
                                                                                                    rel="noopener noreferrer"
                                                                                                    className="underline decoration-transparent hover:decoration-current focus-visible:decoration-current transition-colors"
                                                                                                >
                                                                                                    {company}
                                                                                                </a>
                                                                                            ) : company}
                                                                                        </span>
                                                                                    )}
                        </h3>
                                                {(location || duration) && (
                                                      <p className="text-sm lg:text-base font-medium text-purple-dark dark:text-purple-light mb-2 flex flex-wrap items-center gap-x-2">
                                                        {location && <span>{location}</span>}
                                                        {location && duration && <span className="text-purple-dark-contrast/60 dark:text-purple-light-contrast/60">|</span>}
                                                        {duration && (
                                                            <span className="text-purple-dark-light dark:text-purple-light/70">{duration}</span>
                                                        )}
                                                    </p>
                                                )}
                        {isArray ? (
                              <ul className="mt-3 space-y-3 text-sm lg:text-base text-purple-dark-contrast dark:text-purple-light-contrast">
                                {description.map((d, i) => (
                                    <li
                                        key={i}
                                        className="relative pl-5 leading-relaxed before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-purple-dark dark:before:bg-purple-light before:ring-2 before:ring-purple-dark/15 dark:before:ring-purple-light/25"
                                    >
                                        {d}
                                    </li>
                                ))}
                            </ul>
                ) : (
                      <p className="mt-2 text-sm lg:text-base text-purple-dark-contrast dark:text-purple-light-contrast">{description}</p>
                )}
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                        {tags.map(tag => (
                            <span
                                key={tag}
                                className="px-3 py-1 bg-purple-light-contrast dark:bg-purple-dark-contrast text-purple-dark dark:text-purple-light rounded-full text-xs"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
