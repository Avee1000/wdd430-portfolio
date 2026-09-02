'use client'

import { useState, useMemo } from "react"
import { Plus, Trash2, GraduationCap, Pencil } from "lucide-react"
import EntryEditor from "./EntryEditor"
import { EducationStepSchema, type EducationEntry } from "@/lib/resume/schema"
import { IoIosAlert } from "react-icons/io"

interface EducationStepProps {
  entries: EducationEntry[]
  onChange: (entries: EducationEntry[]) => void
}

export default function EducationStep({ entries, onChange }: EducationStepProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  const errors = useMemo(() => {
    const result = EducationStepSchema.safeParse({ entries })
    return result.success ? {} : result.error.flatten().fieldErrors
  }, [entries])

  const handleSave = (entry: EducationEntry) => {
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
                <GraduationCap className="size-5" />
              </span>
              <div>
                <h3 className="text-base font-semibold text-neutral-900">{entry.title}</h3>
                <p className="text-sm font-medium text-neutral-600">{entry.subtitle}</p>
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
          {entry.location && (
            <p className="mt-2 text-sm text-neutral-500">{entry.location}</p>
          )}
          {entry.description && entry.description.length > 0 && (
            <ul className="mt-4 list-disc space-y-1 pl-4 text-sm leading-relaxed text-neutral-600">
              {entry.description.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
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
          Add Education
        </button>
      )}

      {isEditing && (
        <EntryEditor
          category="education"
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
