// ResumeCard.js
// Accepts description as string or array of bullet points.
import { useTheme } from '../utils/theme';

export const ResumeCard = ({
    title,
    company,
    location,
    duration,
    description,
    tags = [],
    logo,
    darkLogo,
    website
}) => {
    const { isDarkMode } = useTheme();
    const displayLogo = (isDarkMode && darkLogo) ? darkLogo : logo;
    const isArray = Array.isArray(description);

    return (
    <div className="p-6 card-surface card-gradient-light dark:card-gradient-dark shadow-md flex flex-col sm:flex-row min-w-[250px] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70 rounded-xl">
            {/* Logo */}
            {displayLogo && (
                <div className="flex sm:mr-6 mb-4 sm:mb-0 justify-center sm:justify-start items-center w-full sm:w-auto">
                    {website ? (
                        <a
                            href={website}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${company} website`}
                            className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70 rounded-md"
                        >
                                            <img
                                                src={displayLogo}
                                                alt={`${company} Logo`}
                                                className="w-32 h-32 object-contain rounded-full ring-2 ring-purple-dark/15 dark:ring-purple-light/20 bg-white dark:bg-purple-dark/40 p-3"
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
                    <div className="mb-2">
                        {location && (
                            <p className="text-sm lg:text-base text-purple-dark-contrast dark:text-purple-light-contrast leading-snug mb-1">
                                {location}
                            </p>
                        )}
                        {duration && (
                            <p className="text-sm uppercase tracking-wide text-purple-dark/70 dark:text-purple-light/60 leading-snug">
                                {duration}
                            </p>
                        )}
                    </div>
                )}

                {isArray ? (
                    <ul className="mt-3 space-y-3 text-sm lg:text-base text-purple-dark-contrast dark:text-purple-light-contrast">
                        {description.map((d, i) => (
                            <li
                                key={i}
                                className="relative pl-6 leading-relaxed before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:transform before:w-2 before:h-2 before:rounded-full before:bg-purple-dark dark:before:bg-purple-light before:ring-2 before:ring-purple-dark/15 dark:before:ring-purple-light/25"
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
