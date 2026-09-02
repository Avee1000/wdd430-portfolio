"use client";

import { X, Pencil, ArrowUpRight } from "lucide-react";
import { deleteProject } from "@/lib/action";
import { useState } from "react";
import Edit from "./EditModal";
import SaveToast from "../../global/StatusToast";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export interface ProjectProps {
  id: string | number;
  title: string;
  description: string;
  type: "opensource" | "school";
  technologies: string[];
  link?: string;
}

export default function ProjectCard(p: ProjectProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editKey, setEditKey] = useState("");
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "success" | "error"
  >("idle");
  const [saveMessage, setSaveMessage] = useState("");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const page = searchParams.get('page')

  const currentPathname = `${pathname}?page=${page}`; 
  const number = Number(p.id);


  
  const handleDelete = () => {
    setIsDeleting(true);
    toast("Are you sure you want to delete this project?", {
      description: `This action cannot be undone for "${p.title}".`,
      action: {
        label: "Delete",
        onClick: () => {
          toast.promise(
            async () => {
              await deleteProject(number);
            },
            {
              loading: "Deleting project...",
              success: () => {
                setIsDeleting(false);
                setIsDeleted(true);
                queryClient.invalidateQueries({ queryKey: ["school-projects"] });
                queryClient.invalidateQueries({ queryKey: ["edit-projects"] });
                return `"${p.title}" deleted successfully.`;
              },
              error: (err) => {
                setIsDeleting(false);
                console.error("Failed to delete project:", err);
                return "Failed to delete project.";
              },
            },
          );
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {
          setIsDeleting(false);
        },
      },
      cancelButtonStyle: {
        borderWidth: "2px",
        borderColor: "#e5e7eb",
        backgroundColor: "#transparent",
      },
      duration: 90000000,
    });
  };

  return (
    <div>
      <div>
        <Edit
          key={editKey ? p.id : 'closed'}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          onSuccess={() => setIsEditOpen((prev) => !prev)}
          pathname={currentPathname}
          // onSaving={() => {
          //   toast.loading("Saving edit...");
          //   setSaveStatus("saving");
          // }}
          // onSuccess={() => {
          //   toast.success("Project Saved")
          //   setSaveStatus("success");
          //   setIsEditOpen(false);
          //   setTimeout(() => {
          //     setSaveStatus("idle");
          //   }, 2000);
          // }}
          // onError={(message) => {
          //   setSaveStatus("error");
          //   setSaveMessage(message);
          //   setTimeout(() => {
          //     setSaveStatus("idle");
          //   }, 3000);
          // }}
          project={p}
        />
      </div>
      <article
        className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_1px_0_0_rgba(10,10,10,0.02)] transition-all duration-300 ${
          isDeleting
            ? "scale-95 opacity-50 pointer-events-none"
            : isDeleted
              ? "scale-0 opacity-0"
              : "scale-100 opacity-100"
        }`}
      >
        <div className="absolute right-3 top-3 flex flex-row-reverse gap-1.5 transition-all duration-300 ease-out opacity-0 translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full bg-neutral-900 text-white transition-colors hover:bg-neutral-800 disabled:opacity-50"
            aria-label="Delete Project"
          >
            <X className="size-4" />
          </button>
          <button
            onClick={() => {
              setEditKey((k) => k + 1);
              setIsEditOpen(true);
            }}
            disabled={isEditOpen || isDeleting}
            className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50 disabled:opacity-50"
            aria-label="Edit Project"
          >
            <Pencil className="size-4" />
          </button>
        </div>

        <header className="flex items-start gap-3">
          <span
            aria-hidden
            className="grid size-9 shrink-0 place-items-center rounded-lg bg-neutral-900 text-white"
          >
            <span className="font-mono text-xs font-bold">
              {p.title.charAt(0).toUpperCase()}
            </span>
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-neutral-900">
              {p.title}
            </h3>
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
              {p.type === "opensource" ? "Open source" : "School"}
            </p>
          </div>
        </header>

        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-neutral-600">
          {p.description}
        </p>

        {p.technologies?.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {p.technologies.map((tech: string) => (
              <li key={tech}>
                <span className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 font-mono text-[11px] font-medium text-neutral-700">
                  {tech}
                </span>
              </li>
            ))}
          </ul>
        )}

        {p.link && (
          <div className="mt-6 pt-2">
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900 underline-offset-4 hover:underline"
            >
              View project
              <ArrowUpRight className="size-3.5" aria-hidden />
            </a>
          </div>
        )}
      </article>
      {/* <SaveToast status={saveStatus} message={saveMessage} /> */}
    </div>
  );
}
