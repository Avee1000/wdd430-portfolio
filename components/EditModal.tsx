'use client'

import { updateProject, type State } from "@/lib/action";
import { Button } from "@/components/ui/button";
import { useState, useEffect, KeyboardEvent, useRef, useActionState, useTransition } from "react";
import { X, LoaderIcon, Check } from "lucide-react";
import { useFormStatus } from "react-dom";
import { ProjectProps } from "./EditProjects";

const initialState: State = {
    message: null,
    success: false,
    errors: {},
};

interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: ProjectProps;

    onSaving: () => void;
    onSuccess: () => void;
    onError: (message: string) => void;
}

function Submit() {
    const { pending } = useFormStatus();
    return (
        <Button
            type={pending ? "button" : "submit"}
            disabled={pending}
            variant="default"
            className="bg-red-500 mt-3 text-black hover:bg-brand/90 cursor-pointer w-[20%] ml-auto"
        >
            {pending ? <><LoaderIcon className="animate-spin" /></> : <><Check />Save Edit</>}
        </Button>
    )
}

export default function Edit({ isOpen, onClose, project, onSaving, onSuccess, onError }: EditModalProps) {
    const [state, formAction] = useActionState(
        updateProject.bind(null, project.id),
        initialState
    );

    const [techs, setTechs] = useState<string[]>(project.technologies || []);
    const [input, setInput] = useState('');
    const [isPending, startTransition] = useTransition();
    const inputRef = useRef<HTMLInputElement>(null);

    // Track when the action completes to check for errors
    useEffect(() => {
        if (!state.message && (!state.errors || Object.keys(state.errors).length === 0)) {
            return;
        }

        if (state.errors && Object.keys(state.errors).length > 0) {
            onError(state.message || "Failed to updateProject");
            return;
        }

        if (state.success === true) {
            onSuccess();
        }

    }, [state, onSuccess, onError]);

    if (!isOpen) return null;

    const handleClose = () => {
        onClose();
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSaving();
        const formData = new FormData(e.currentTarget);
        startTransition(() => {
            formAction(formData);
        });
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
            setTechs(techs.slice(0, -1));
        }
    };

    return (
        <>
            {isOpen && (
                <dialog
                    className="fixed inset-0 m-0 h-full w-full bg-black/80 flex justify-center items-center backdrop-blur-md z-11 p-4">
                    <div className="animate-in fade-in zoom-in-80 duration-300 relative max-w-150 mx-auto px-4 py-12 w-full h-auto items-center flex flex-1 z-10">
                        <div className="absolute top-6 right-0 transition-all duration-300 ease-in-out translate-y-1.5 cursor-pointer">
                            <button
                                onClick={handleClose}
                                className="bg-black size-8 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-800 transition-colors"
                                aria-label="Exit Edit"
                            >
                                <X className="text-white size-5" />
                            </button>
                        </div>
                        <div className="p-4 border border-gray-600 bg-gray-50 rounded shrink-0 w-full h-full">
                            <form
                                onSubmit={handleSubmit}
                                id='userForm'
                                className="flex flex-col gap-4"
                            >
                                <div>
                                    <label htmlFor="title" className="block">
                                        Title:
                                        <input id="title" name="title" type='text' defaultValue={project.title} placeholder="Name of project" />
                                    </label>
                                    <div id="title-error" aria-live="polite" aria-atomic="true">
                                        {state.errors?.title?.map((error) => (
                                            <p key={error} className="mt-1 text-sm text-red-600">
                                                {error}
                                            </p>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="description" className="block">
                                        Description:
                                        <textarea id="description" name="description" placeholder="Description of project" defaultValue={project.description} className="w-full h-20 min-h-20 max-h-20 block" />
                                    </label>
                                    <div id="description-error" aria-live="polite" aria-atomic="true">
                                        {state.errors?.description?.map((error) => (
                                            <p key={error} className="mt-1 text-sm text-red-600">
                                                {error}
                                            </p>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="type">
                                        Type:
                                        <select id="type" name="type" className="block" defaultValue={project.type}>
                                            <option value="" disabled>Select a project type:</option>
                                            <option value="opensource">Opensource</option>
                                            <option value="school">School</option>
                                        </select>
                                    </label>
                                    <div id="type-error" aria-live="polite" aria-atomic="true">
                                        {state.errors?.type?.map((error) => (
                                            <p key={error} className="mt-1 text-sm text-red-600">
                                                {error}
                                            </p>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <div className="flex flex-col">
                                        <label htmlFor="technologies">Technologies:
                                            <div
                                                className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-md bg-white min-h-10.5 transition-all cursor-text mt-2.5 focus-within:ring-2 focus-within:ring-gray-200"
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
                                                    onBlur={() => addTech(input)}
                                                />
                                            </div>
                                        </label>
                                        <p className="text-xs text-gray-500">Press Enter or comma to add a tag.</p>
                                    </div>
                                    <div id="technologies-error" aria-live="polite" aria-atomic="true">
                                        {state.errors?.technologies?.map((error) => (
                                            <p key={error} className="mt-1 text-sm text-red-600">
                                                {error}
                                            </p>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="link">
                                        Link:
                                        <input id="link" name="link" type="url" defaultValue={project.link} placeholder="Link to project" />
                                    </label>
                                    <div id="link-error" aria-live="polite" aria-atomic="true">
                                        {state.errors?.link?.map((error) => (
                                            <p key={error} className="mt-1 text-sm text-red-600">
                                                {error}
                                            </p>
                                        ))}
                                    </div>
                                </div>

                                <Submit />
                            </form>
                        </div>
                    </div>
                </dialog>
            )}
        </>
    )
}