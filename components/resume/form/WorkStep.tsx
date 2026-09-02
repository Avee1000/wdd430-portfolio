'use client'

import { useState, useMemo } from "react"
import { Plus, Trash2, Briefcase, Pencil } from "lucide-react"
import EntryEditor from "./EntryEditor"
import { WorkStepSchema, type WorkEntry } from "@/lib/resume/schema"
import { IoIosAlert } from "react-icons/io";

interface WorkStepProps {
  entries: WorkEntry[]
  onChange: (entries: WorkEntry[]) => void
}

export default function WorkStep({ entries, onChange }: WorkStepProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  const errors = useMemo(() => {
    const result = WorkStepSchema.safeParse({ entries })
    return result.success ? {} : result.error.flatten().fieldErrors
  }, [entries])

  const handleSave = (entry: WorkEntry) => {
    if (editingIndex !== null) {
      const updated = [...entries]
      updated[editingIndex] = entry
      onChange(updated)
    } else {
      onChange([...entries, entry])
    }
    setIsEditing(false)
    setEditingIndex(null)
  }

  const handleEdit = (index: number) => {
    setEditingIndex(index)
    setIsEditing(true)
  }

  const handleDelete = (index: number) => {
    onChange(entries.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-col gap-4">
      {entries.map((entry, index) => (
        <div key={index} className="rounded-2xl border border-neutral-200 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-neutral-900 text-white">
                <Briefcase className="size-5" />
              </span>
              <div>
                <h3 className="text-base font-semibold text-neutral-900">{entry.title}</h3>
                <p className="text-sm font-medium text-neutral-600">{entry.company}</p>
                <p className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                  {entry.startDate} — {entry.endDate}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleEdit(index)}
                className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
              >
                <Pencil className="size-4"/>
              </button>
              <button
                type="button"
                onClick={() => handleDelete(index)}
                className="rounded-lg p-2 text-neutral-500 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
          {entry.description.length > 0 && (
            <ul className="mt-4 list-disc space-y-1 pl-4 text-sm leading-relaxed text-neutral-600">
              {entry.description.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
          )}
          {entry.skills.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {entry.skills.map((skill) => (
                <span key={skill} className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 font-mono text-[11px] font-medium text-neutral-700">
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}

      {!isEditing && (
        <button
          type="button"
          onClick={() => { setEditingIndex(null); setIsEditing(true) }}
          className="mt-2 flex items-center gap-2 rounded-2xl border-2 border-dashed border-neutral-300 p-4 text-sm font-medium text-neutral-600 transition-colors hover:border-neutral-400 hover:text-neutral-900"
        >
          <Plus className="size-4" />
          Add Work Experience
        </button>
      )}

      {isEditing && (
        <EntryEditor
          category="work"
          initialData={editingIndex !== null ? entries[editingIndex] as unknown as Record<string, unknown> : undefined}
          onSave={handleSave}
          onCancel={() => { setIsEditing(false); setEditingIndex(null) }}
        />
      )}

      {errors.entries?.map((err) => (
        <p key={err} className="text-sm text-foreground"><IoIosAlert className="size-4 inline-flex mr-1"/>{err}</p>
      ))}
    </div>
  )
}
