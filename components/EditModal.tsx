'use client'

import { updateProject } from "@/lib/action";
import { Button } from "@/components/ui/button";
// import { Spinner } from "@/components/ui/spinner";
import { useState, KeyboardEvent, useRef } from "react";
import { X, LoaderIcon, Check } from "lucide-react";
import { useFormStatus } from "react-dom";
import { ProjectProps } from "./EditProjects";

interface EditModalProps {
    isOpen: boolean;

    onClose: () => void;
    project: ProjectProps;
}

function Submit() {
    const { pending } = useFormStatus();
    return (
        <Button
            type={pending ? "button" : "submit"}
            variant="default"
            className=" bg-red-500 mt-3 text-black hover:bg-brand/90 cursor-pointer w-auto ml-auto" >
            {pending ? <><LoaderIcon className="animate-spin" /> Processing</> : <><Check />Save Edit</>}
        </Button>
    )
}

export default function Edit({ isOpen, onClose, project }: EditModalProps) {

    const [techs, setTechs] = useState<string[]>(project.technologies || []);
    const [input, setInput] = useState('');
    const [isSaving, setIsSaving] = useState<'idle' | 'saving' | 'success' | 'exiting'>('idle');
    const inputRef = useRef<HTMLInputElement>(null);

    if (!isOpen && isSaving === 'idle') return null;

    const handleClose = () => {
        // setIsExiting(true);
        onClose();
    }
    const handleAction = async (formData: FormData) => {
        try {
            await updateProject(project.id, formData);
        } catch (error) {
            console.error("Failed to update project", error);
            setIsSaving('idle');
        } finally {
            // Switch to success mode once the database update finishes
            setIsSaving('success');
            // Leave the success message on screen for 2.5 seconds, then hide it
            // 1. Wait 2 seconds for the user to read the success message
            setTimeout(() => {
                setIsSaving('exiting'); // Trigger the slide-out animation

                // 2. Wait 300ms for the animation to finish, THEN remove it
                setTimeout(() => {
                    setIsSaving('idle');
                }, 300);

            }, 2000);
        }
    };

    const addTech = (value: string) => {
        const formatted = value.trim();
        if (formatted && !techs.includes(formatted)) {
            setTechs([...techs, formatted]);
        }
        setInput('');
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTech(input);
        } else if (e.key === 'Backspace' && !input && techs.length > 0) {
            // Remove last tag if user hits backspace on empty input
            setTechs(techs.slice(0, -1));
        }
    };

    return (
        <>
            {/* SAVING INDICATOR (Bottom Right) */}
            {isSaving !== 'idle' && (
                <div className={`fixed bottom-6 right-6 bg-gray-900 text-white shadow-xl px-5 py-3 rounded-lg flex justify-center items-center gap-3 z-20 
                    ${isSaving === 'exiting'
                        ? 'animate-out fade-out slide-out-to-bottom-100 duration-300'
                        : 'animate-in fade-in slide-in-from-bottom-100 duration-300'
                    }`}>
                    {isSaving === 'saving' ? (
                        <>
                            <LoaderIcon className="animate-spin size-5 text-white" />
                            <span className="font-medium text-sm">Saving project...</span>
                        </>
                    ) : (
                        <>
                            <Check className="size-5 text-green-500" />
                            <span className="font-medium text-sm text-green-400">Project saved!</span>
                        </>
                    )}
                </div>
            )}

            {isOpen && (
                <dialog
                    className="fixed inset-0 m-0 h-full w-full bg-black/80 flex justify-center items-center backdrop-blur-md z-11 p-4">
                    <div className="relative max-w-150 mx-auto px-4 py-12 w-full h-auto items-center transition-all flex flex-1 z-10 ">
                        <div className="absolute top-6 right-0 transition-all duration-300 ease-in-out  translate-y-1.5 cursor-pointer">
                            <button
                                onClick={handleClose}
                                className="bg-black size-8 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-800 transition-colors"
                                aria-label="Exit Edit"
                            >
                                <X className="text-white size-5" />
                            </button>
                        </div>
                        <div className="p-4 border border-gray-600 bg-gray-50 rounded shrink-0 w-full  h-full">
                            <form
                                action={handleAction}
                                onSubmit={() => {
                                    onClose();
                                    setIsSaving('saving');
                                }}
                                id='userForm'
                                className="flex flex-col gap-4">
                                <label htmlFor="title" className="block">
                                    Title:
                                    <input id="title" name="title" type='text' defaultValue={project.title} placeholder="Name of project" required />
                                </label>

                                <label htmlFor="description" className="block">
                                    Description:
                                    <textarea id="description" name="description" placeholder="Description of project" defaultValue={project.description} className="w-full h-20 min-h-20 max-h-20 block" required />
                                </label>

                                <label htmlFor="type" >
                                    Type:
                                    <select id="type" name="type" className="block" required defaultValue={project.type}>
                                        <option value="" disabled>Select a project type:</option>
                                        <option value="opensource">Opensource</option>
                                        <option value="school">School</option>
                                    </select>
                                </label>

                                <div className="flex flex-col">
                                    <label htmlFor="technologies">Technologies:
                                        <div
                                            className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-md bg-white min-h-10.5  transition-all cursor-text mt-2.5 focus-within:ring-2 focus-within:ring-gray-200"
                                            onClick={() => inputRef.current?.focus()}
                                        >
                                            {techs.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="flex items-center gap-1 bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm font-medium"
                                                >
                                                    {tech}
                                                    <button
                                                        type="button"
                                                        onClick={() => setTechs(techs.filter((t) => t !== tech))}
                                                        className="hover:text-red-900 focus:outline-none cursor-pointer"
                                                        aria-label={`Remove ${tech}`}
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                    {/* The hidden input ensures server-side form submission works */}
                                                    <input type="hidden" name="technologies" value={tech} />
                                                </span>
                                            ))}
                                            <input
                                                ref={inputRef}
                                                type="text"
                                                className="flex-1 outline-none min-w-30 bg-transparent"
                                                placeholder={techs.length < 3 ? "e.g. React, Next.js..." : ""}
                                                value={input}
                                                onChange={(e) => setInput(e.target.value)}
                                                onKeyDown={handleKeyDown}
                                                onBlur={() => addTech(input)} // Adds tech if user clicks away
                                            />
                                        </div></label>
                                    <p className="text-xs text-gray-500">Press Enter or comma to add a tag.</p>
                                </div>

                                <label htmlFor="link" >
                                    Link:
                                    <input id="link" name="link" type="url" defaultValue={project.link} placeholder="Link to project"  required/>
                                </label>
                                <Submit />
                            </form>
                        </div>
                    </div>
                </dialog>
            )}
        </>
    )
}
