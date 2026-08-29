'use client'

import { createProject, type State } from "@/lib/action";
import { Button } from "@/components/ui/button";
import { useState, KeyboardEvent, useRef, useActionState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { X, LoaderCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const initialState: State = {
    message: null,
    errors: {},
};

export default function CreateForm() {
    const [state, formAction] = useActionState(createProject, initialState);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const queryClient = useQueryClient();

    const [techs, setTechs] = useState<string[]>([]);
    const [input, setInput] = useState('');
    const [type, setType] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        toast.promise(
            new Promise((resolve, reject) => {
                startTransition(async () => {
                    const res = await createProject(state, formData);
                    if (res?.errors && Object.keys(res.errors).length > 0) {
                        reject(res.message || "Please fix the validation errors.");
                    } else {
                        queryClient.invalidateQueries({ queryKey: ["school-projects"] });
                        queryClient.invalidateQueries({ queryKey: ["edit-projects"] });
                        resolve(res?.message || "Project created successfully!");
                        if (res?.success) {
                            router.push('/projects');
                        }
                    }
                });
            }),
            {
                loading: "Creating project...",
                success: (data) => `${data}`,
                error: (err) => `${err}`,
            }
        );
    };

    return (
        <main className="container-page flex flex-1 items-start justify-center py-10 sm:py-16">
            <div className="w-full max-w-2xl rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10">
                <form onSubmit={handleSubmit} id="userForm" className="flex flex-col gap-5 text-foreground">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium">
                            <span className="block">Title</span>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)} 
                                placeholder="Name of project"
                                required
                                aria-describedby="title-error"
                                className="mt-2.5 h-11 w-full rounded-xl border border-input bg-background px-3 text-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
                            />
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
                        <label htmlFor="description" className="block text-sm font-medium">
                            <span className="block">Description</span>
                            <textarea
                                id="description"
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description of project"
                                className="mt-2.5 block min-h-28 w-full resize-y rounded-xl border border-input bg-background px-3 py-2.5 text-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
                                required
                                aria-describedby="description-error"
                            />
                        </label>
                        <div id="description-error" aria-live="polite">
                            {state.errors?.description?.map((error) => (
                                <p key={error} className="mt-1 text-sm text-red-600">
                                    {error}
                                </p>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="type" className="block text-sm font-medium">
                            <span className="block">Project type</span>
                            <input type="hidden" name="type" value={type} />
                            <Select value={type} onValueChange={(value) => setType(value ?? "")}>
                                <SelectTrigger id="type" className="mt-2.5 h-11 w-full rounded-xl bg-background">
                                    <SelectValue placeholder="Select a project type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="opensource">Open source</SelectItem>
                                    <SelectItem value="school">School</SelectItem>
                                </SelectContent>
                            </Select>
                        </label>
                        <div id="type-error" aria-live="polite">
                            {state.errors?.type?.map((error) => (
                                <p key={error} className="mt-1 text-sm text-red-600">
                                    {error}
                                </p>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="flex flex-col">
                            <label htmlFor="technologies" className="text-sm font-medium">
                                <span>Technologies</span>
                                <input type="hidden" name="technologies" value={techs.join(',')} aria-describedby="technologies-error" />
                                <div
                                    className="mt-2.5 flex min-h-11 cursor-text flex-wrap gap-2 rounded-xl border border-input bg-background p-2.5 focus-within:ring-2 focus-within:ring-ring/20"
                                    onClick={() => inputRef.current?.focus()}
                                >
                                    {techs.map((tech) => (
                                        <span
                                            key={tech}
                                            className="flex items-center gap-1 rounded-full border border-border bg-muted px-2.5 py-1 text-xs font-medium text-foreground"
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
                                        </span>
                                    ))}
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        className="min-w-30 flex-1 bg-transparent px-1 outline-none placeholder:text-muted-foreground"
                                        placeholder={techs.length < 3 ? "e.g. React, Next.js..." : ""}
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        onBlur={() => addTech(input)}
                                    />
                                </div>
                            </label>
                            <p className="mt-2 text-xs text-muted-foreground">Press Enter or comma to add a tag.</p>
                        </div>
                        <div id="technologies-error" aria-live="polite">
                            {state.errors?.technologies?.map((error) => (
                                <p key={error} className="mt-1 text-sm text-red-600">
                                    {error}
                                </p>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="link" className="block text-sm font-medium">
                            <span className="block">Project link</span>
                            <input
                                id="link"
                                name="link"
                                type="url"
                                placeholder="https://github.com/..."
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                required
                                aria-describedby="link-error"
                                className="mt-2.5 h-11 w-full rounded-xl border border-input bg-background px-3 text-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
                            />
                        </label>
                        <div id="link-error" aria-live="polite">
                            {state.errors?.link?.map((error) => (
                                <p key={error} className="mt-1 text-sm text-red-600">
                                    {error}
                                </p>
                            ))}
                        </div>
                    </div>

                    <Button
                        type={isPending ? "button" : "submit"}
                        variant="default"
                        disabled={isPending}
                        className="mt-3 ml-auto inline-flex w-auto cursor-pointer bg-foreground text-background hover:opacity-85"
                    >
                        {isPending ? (
                            <>
                                <LoaderCircle className="animate-spin" /> Processing...
                            </>
                        ) : (
                            'Create project'
                        )}
                    </Button>
                </form>
            </div>
        </main>
    );
}