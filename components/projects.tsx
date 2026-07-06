export interface ProjectProps {
    id: string | number;
    title: string;
    description: string;
    type: 'opensource' | 'school';
    technologies: string[];
    link?: string;
}

export default function ProjectCard(p: ProjectProps) {
    return (
        <article className="p-4 border border-gray-600 bg-gray-50 rounded flex flex-col h-full">
            <h3 className=" text-black text-xl font-bold mb-2">{p.title}</h3>
            <h2 className="text-gray-700 italic text-l  mb-2 h-full">{p.description}</h2>
            <p className="mt-auto text-sm text-gray-600 mb-3">{p.type}</p>
            <ul className="mt-auto flex flex-wrap gap-2 mb-3"><strong>Technologies:</strong>
                {p.technologies.map((tech: string) => (
                    <li
                        key={tech}
                        className=" px-3 py-1 bg-orange-200 text-gray-900 text-sm rounded-full"
                    >
                        {tech}
                    </li>
                ))}
            </ul>
            <div className="mt-auto">
                {p.link && (
                    <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 flex h-12 text-white bg-black w-full items-center justify-center rounded border border-solid border-black/[.08] px-5 transition-colors hover:border-black hover:text-gray-900 hover:bg-orange-100 dark:border-orange/[.145] dark:hover:bg-orange-100  md:w-[158px]"
                    >
                        View Project
                    </a>
                )}
            </div>

        </article>
    )
}