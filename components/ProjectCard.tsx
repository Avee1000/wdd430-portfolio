interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}
        
export default function ProjectCard({title, description, technologies, link}: ProjectCardProps) {
  return (
    <article className="p-4 border border-gray-600 bg-gray-50 rounded">
      <h3 className=" text-black text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-700 mb-3">{description}</p>
      <p className="text-sm text-gray-600 mb-3">
        <strong>Technologies:</strong> {technologies.join(', ')}
      </p>
      {link && (
        <p className="mt-2">
          <a href={link} target="_blank" rel="noopener noreferrer" className="flex h-12 text-white bg-black w-full items-center justify-center rounded border border-solid border-black/[.08] px-5 transition-colors hover:border-black hover:text-gray-900 hover:bg-orange-100 dark:border-orange/[.145] dark:hover:bg-orange-100  md:w-[158px]">View Project</a>
        </p>
      )}
    </article>
  );
}