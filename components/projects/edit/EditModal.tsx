"use client";

import { updateProject, type State } from "@/lib/action";
import { Button } from "@/components/ui/button";
import {
  useState,
  useEffect,
  KeyboardEvent,
  useRef,
  useActionState,
  useTransition,
} from "react";
import { X, LoaderIcon, Check } from "lucide-react";
import { ProjectProps } from "./EditProjects";
import {
  Drawer,
  DrawerContent,
  DrawerClose,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const initialState: State = {
  message: null,
  success: false,
  errors: {},
};

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectProps;
  pathname?: string;

  onSaving?: () => void;
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

function Submit({ pending }: { pending: boolean }) {
  return (
    <Button
      type={pending ? "button" : "submit"}
      disabled={pending}
      variant="default"
      className="w-auto bg-foreground border border-black text-background hover:opacity-85"
    >
      {pending ? (
        <LoaderIcon className="animate-spin" />
      ) : (
        <>
          <Check />
          Save Edit
        </>
      )}
    </Button>
  );
}

export default function Edit({
  isOpen,
  onClose,
  project,
  pathname,
  onSaving,
  onSuccess,
  onError,
}: EditModalProps) {
  const [state, formAction] = useActionState(
    updateProject.bind(null, project.id),
    initialState
  );
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const [techs, setTechs] = useState<string[]>(project.technologies || []);
  const [type, setType] = useState<ProjectProps["type"]>(project.type);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [formKey, setFormKey] = useState(0);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  
  // Track whether a submit action was intentionally triggered
  const isSubmittingRef = useRef<boolean>(false);
  const toastIdRef = useRef<string | number | null>(null);

  // Sync component state when modal opens
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setTechs(project.technologies || []);
      setType(project.type);
      setInput("");
      setFormKey((k) => k + 1);
    }
  }

  // Clear toast and submit flag when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      isSubmittingRef.current = false;
      if (toastIdRef.current) {
        toast.dismiss(toastIdRef.current);
        toastIdRef.current = null;
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isSubmittingRef.current || !state.message) return;

    if (toastIdRef.current) {
      toast.dismiss(toastIdRef.current);
      toastIdRef.current = null;
    }

    if (state.errors && Object.keys(state.errors).length > 0) {
      onError?.(state.message || "Failed to update project");
      toast.error(state.message);
      isSubmittingRef.current = false; 
      return;
    }

    if (state.success) {
      onSuccess?.();
      toast.success(state.message, {
        className: "text-green-400! bg-gray-900!",
      });
      queryClient.invalidateQueries({ queryKey: ["school-projects"] });
      queryClient.invalidateQueries({ queryKey: ["edit-projects"] });
      
      isSubmittingRef.current = false; 
      onClose(); 
    }
  }, [state, pathname, onSuccess, onError, queryClient, onClose]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    isSubmittingRef.current = true; 
    onSaving?.();
    toastIdRef.current = toast.loading("Updating project...");
    const formData = new FormData(e.currentTarget);
    startTransition(() => formAction(formData));
  };

  const addTech = (value: string) => {
    const formatted = value.trim();
    if (formatted && !techs.includes(formatted)) {
      setTechs([...techs, formatted]);
    }
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTech(input);
    } else if (e.key === "Backspace" && !input && techs.length > 0) {
      setTechs(techs.slice(0, -1));
    }
  };

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      showSwipeHandle
    >
      <DrawerContent className="max-h-[92dvh] rounded-none">
        <DrawerHeader className="mx-auto flex my-2 w-full max-w-2xl flex-row items-start justify-center gap-4 px-6 pb-4 sm:px-10">
          <div className="min-w-0">
            <DrawerTitle>Edit project</DrawerTitle>
            <DrawerDescription>
              Update the project details below.
            </DrawerDescription>
          </div>
        </DrawerHeader>
        <div className="relative mx-auto max-h-[calc(92dvh-6rem)] w-full max-w-2xl overflow-y-auto px-6 pb-8 sm:px-10">
          <form
            key={formKey}
            onSubmit={handleSubmit}
            id="userForm"
            className="flex flex-col gap-5 text-foreground"
          >
            <div>
              <label htmlFor="title" className="block text-sm font-medium">
                <span className="block">Title</span>
                <input
                  id="title"
                  name="title"
                  type="text"
                  defaultValue={project.title}
                  placeholder="Name of project"
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
              <label
                htmlFor="description"
                className="block text-sm font-medium"
              >
                <span className="block">Description</span>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Description of project"
                  defaultValue={project.description}
                  className="mt-2.5 block min-h-28 w-full resize-y rounded-xl border border-input bg-background px-3 py-2.5 text-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
                />
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
              <label htmlFor="type" className="block text-sm font-medium">
                <span>Project type</span>
                <input type="hidden" name="type" value={type} />
                <Select
                  value={type}
                  onValueChange={(value) =>
                    value && setType(value as ProjectProps["type"])
                  }
                >
                  <SelectTrigger
                    id="type"
                    className="mt-2.5 h-11 w-full rounded-xl bg-background"
                  >
                    <SelectValue placeholder="Select a project type" />
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false}>
                    <SelectItem value="opensource">Open source</SelectItem>
                    <SelectItem value="school">School</SelectItem>
                  </SelectContent>
                </Select>
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
                <label htmlFor="technologies" className="text-sm font-medium">
                  <span>Technologies</span>
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
                          onClick={() =>
                            setTechs(techs.filter((t) => t !== tech))
                          }
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
                      className="min-w-30 flex-1 bg-transparent px-1 outline-none placeholder:text-muted-foreground"
                      placeholder={
                        techs.length < 3 ? "e.g. React, Next.js..." : ""
                      }
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      onBlur={() => addTech(input)}
                    />
                  </div>
                </label>
                <p className="mt-2 text-xs text-muted-foreground">
                  Press Enter or comma to add a tag.
                </p>
              </div>
              <div
                id="technologies-error"
                aria-live="polite"
                aria-atomic="true"
              >
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
                  defaultValue={project.link}
                  placeholder="https://github.com/..."
                  className="mt-2.5 h-11 w-full rounded-xl border border-input bg-background px-3 text-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
                />
              </label>
              <div id="link-error" aria-live="polite" aria-atomic="true">
                {state.errors?.link?.map((error) => (
                  <p key={error} className="mt-1 text-sm text-red-600">
                    {error}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex flex-col-reverse gap-1 mt-6">
              <DrawerClose render={<Button variant="outline">Cancel</Button>} />
              <Submit pending={isPending} />
            </div>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}