'use client'

import { createProject } from "@/lib/action";
import { Button } from "@/components/ui/button";
// import { Spinner } from "@/components/ui/spinner";
import { useState, KeyboardEvent, useRef } from "react";
import { X } from "lucide-react";
import { useFormStatus } from "react-dom";
import { LoaderIcon } from "lucide-react";

function Submit() {
    const { pending } = useFormStatus();
    return (
        <Button
            type={pending ? "button" : "submit"}
            variant="default"
            className=" bg-red-500 mt-3 text-black hover:bg-brand/90 cursor-pointer w-auto ml-auto" >
            {pending ? <><LoaderIcon className="animate-spin" /> Processing</> : '+ Create Project'}
        </Button>
    )
}

export default function Create() {

    const [techs, setTechs] = useState<string[]>([]);
    const [input, setInput] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

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
        <main className="max-w-150 mx-auto px-4 py-12 w-full h-auto items-center transition-all flex flex-1 ">
            <div className="p-4 border border-gray-600 bg-gray-50 rounded shrink-0 w-full  h-full">
                <form action={createProject} id='userForm' className="flex flex-col gap-4">
                    <label htmlFor="title" className="block">
                        Title:
                        <input id="title" name="title" type='text' placeholder="Name of project" required />
                    </label>

                    <label htmlFor="description" className="block">
                        Description:
                        <textarea id="description" name="description" placeholder="Description of project" className="w-full h-20 min-h-20 max-h-20 block" required />
                    </label>

                    <label htmlFor="type" >
                        Type:
                        <select id="type" name="type" className="block" required defaultValue="">
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
                        <input id="link" name="link" type="url" placeholder="Name of project" required />
                    </label>
                    <Submit />
                </form>
            </div>
        </main>
    )
}
