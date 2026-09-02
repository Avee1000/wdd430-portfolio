'use client'

import { useState, KeyboardEvent, useRef } from "react"
import { X } from "lucide-react"

interface ArrayInputProps {
  label: string
  name: string
  items: string[]
  onChange: (items: string[]) => void
  placeholder?: string
  error?: string[]
  maxItems?: number
}

export default function ArrayInput({
  label,
  name,
  items,
  onChange,
  placeholder = "Type and press Enter...",
  error,
  maxItems = 20,
}: ArrayInputProps) {
  const [input, setInput] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const addItem = (value: string) => {
    const formatted = value.trim()
    if (formatted && !items.includes(formatted) && items.length < maxItems) {
      onChange([...items, formatted])
    }
    setInput("")
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addItem(input)
    } else if (e.key === "Backspace" && !input && items.length > 0) {
      onChange(items.slice(0, -1))
    }
  }

  const handleBlur = () => {
    if (input.trim()) {
      addItem(input)
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-foreground">
        <span>{label}</span>
        <input type="hidden" name={name} value={items.join(",")} aria-describedby={`${name}-error`} />
        <div
          className="mt-2.5 flex min-h-11 cursor-text flex-wrap gap-2 rounded-xl border border-input bg-background p-2.5 focus-within:ring-2 focus-within:ring-ring/20"
          onClick={() => inputRef.current?.focus()}
        >
          {items.map((item) => (
            <span
              key={item}
              className="flex items-center gap-1 rounded-full border border-border bg-muted px-2.5 py-1 text-xs font-medium text-foreground"
            >
              {item}
              <button
                type="button"
                onClick={() => onChange(items.filter((t) => t !== item))}
                className="hover:text-red-900 focus:outline-none cursor-pointer"
                aria-label={`Remove ${item}`}
              >
                <X size={14} />
              </button>
            </span>
          ))}
          <input
            ref={inputRef}
            type="text"
            className="min-w-30 flex-1 bg-transparent px-1 outline-none placeholder:text-muted-foreground"
            placeholder={items.length < maxItems ? placeholder : `Maximum ${maxItems} items`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
          />
        </div>
      </label>
      <p className="mt-2 text-xs text-muted-foreground">Press Enter or comma to add an item.</p>
      {error && error.length > 0 && (
        <div id={`${name}-error`} aria-live="polite" className="mt-1">
          {error.map((err) => (
            <p key={err} className="text-sm text-red-600">{err}</p>
          ))}
        </div>
      )}
    </div>
  )
}
