'use client'

import { X } from "lucide-react";
import { deleteProject } from "@/lib/action";
import { use, useRef, useState } from "react";


export interface ProjectProps {
    id: string | number;
    title: string;
    description: string;
    type: 'opensource' | 'school';
    technologies: string[];
    link?: string;
}

export async function DeleteProjects(id: any) {
    await deleteProject(id);
}

export default function ProjectCard(p: ProjectProps) {
    // const article = useRef<HTMLElement>(null);
    // const handleDelete = () => {
    //     if (article.current){
    //         article.current.style.scale = '0';
    //         article.current.style.transition = '0.5s ease-in-out';
    //         article.current.style.opacity = '0';
    //     }
    //     setTimeout(() => {
    //     DeleteProjects(p.id);
    //     }, 500);
    // }
    const [ isDeleting, setIsDeleting ] = useState(false);
    const [isRemoved, setIsRemoved] = useState(false);

    const number = Number(p.id)

    const handleDelete = () => {
        // 1. Trigger the visual animation (scale to 0, fade out)
        setIsDeleting(true);

        // 2. Wait for the 500ms CSS transition to finish
        setTimeout(() => {
            // 3. Instantly remove it from the DOM so surrounding elements collapse the gap
            setIsRemoved(true); 

            // 4. Fire the server action in the background (fire and forget)
            deleteProject(number).catch(err => {
                console.error("Failed to delete project:", err);
                // Optional: if it fails, you could set isRemoved(false) and isDeleting(false) to bring it back
            });
        }, 500); 
    }

    // Once the timer finishes, render nothing so the space is completely freed up
    if (isRemoved) return null;

    return (
        <article className={`relative border p-4 border-gray-600 bg-gray-50 rounded flex flex-col h-full transform transition-all duration-500 ease-in-out origin-center
            ${isDeleting ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}>
            <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="absolute top-3 right-3 bg-black size-8 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-800 transition-colors"
                aria-label="Delete Project"
            >
                <X className="text-white size-5" />
            </button>
            <h3 className=" text-black text-xl font-bold mb-2">{p.title}</h3>
            <h2 className="text-gray-700 italic mb-2 h-full">{p.description}</h2>
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
                        className="mt-2 flex h-12 text-white bg-black w-full items-center justify-center rounded border border-solid border-black px-5 transition-colors hover:border-black hover:text-gray-900 hover:bg-orange-100 dark:border-orange/[.145] dark:hover:bg-orange-100  md:w-39.5"
                    >
                        View Project
                    </a>
                )}
            </div>
        </article>
    )
}