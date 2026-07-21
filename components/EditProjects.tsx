'use client'

import { X, Pencil } from "lucide-react";
import { deleteProject } from "@/lib/action";
import { useState } from "react";
import Edit from "./EditModal";
import SaveToast from "./StatusToast";



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
    const [isDeleting, setIsDeleting] = useState(false);
    const [isRemoved, setIsRemoved] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
    const [saveMessage, setSaveMessage] = useState("");
    // const [editKey, setEditKey] = useState(0);

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
        <div>
            <div>
                {isEditOpen && (
                    <Edit isOpen={isEditOpen}
                        onClose={() => {
                            setIsEditOpen(false);
                            // setEditKey(prev => prev + 1);
                        }}
                        onSaving={() => {
                            setSaveStatus("saving");
                        }}
                        onSuccess={() => {
                            setSaveStatus("success");
                            setIsEditOpen(false)
                            setTimeout(() => {
                                setSaveStatus("idle");
                            }, 2000);
                        }}
                        onError={(message) => {
                            setSaveStatus("error");
                            setSaveMessage(message);
                            setTimeout(() => {
                                setSaveStatus("idle");
                            }, 3000);
                        }}
                        project={p}
                    />
                )}
            </div>
            <article
                className={`group overflow-hidden relative border p-4 border-gray-600 bg-gray-50 rounded flex flex-col h-full transform transition-all duration-500 ease-in-out origin-center  ${isDeleting ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}>
                <div className="absolute top-3 right-3 flex flex-row-reverse gap-1.5 transition-all duration-300 ease-in-out opacity-0 translate-y-1.5 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto">
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="bg-black size-8 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-800 transition-colors"
                        aria-label="Delete Project"
                    >
                        <X className="text-white size-5" />
                    </button>
                    <button
                        onClick={() => setIsEditOpen(true)}
                        disabled={isEditOpen}
                        className="bg-white size-8 shadow-md rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-300 transition-colors"
                        aria-label="Edit Project"
                    >
                        <Pencil className="text-black size-4" />
                    </button>
                </div>


                <h3 className=" text-black text-xl font-bold mb-2">{p.title}</h3>
                <h2 className="text-gray-700 italic mb-2 h-auto">{p.description}</h2>
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
            <SaveToast
                status={saveStatus}
                message={saveMessage}
            />
        </div>
    )
}