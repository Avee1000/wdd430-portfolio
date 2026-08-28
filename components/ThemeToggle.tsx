"use client";

import { Moon, Sun, Sunset } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

const themes = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dim", label: "Dim", Icon: Sunset },
  { value: "dark", label: "Dark", Icon: Moon },
] as const;

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false
  );

  if (!mounted) {
    return <div aria-hidden className="h-9 w-33 rounded-full border border-border" />;
  }

  return (
    <div aria-label="Choose color theme" className="inline-flex items-center gap-0.5 rounded-full border border-border bg-muted p-1" role="group">
      {themes.map(({ value, label, Icon }) => {
        const active = theme === value;
        return (
          <button
            key={value}
            type="button"
            aria-label={`${label} theme`}
            aria-pressed={active}
            onClick={() => {
              setTheme(value);
              document.documentElement.classList.remove("light", "dim", "dark");
              document.documentElement.classList.add(value);
            }}
            className={cn(
              "inline-flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors",
              active && "bg-background text-foreground shadow-sm"
            )}
          >
            <Icon className="size-3.5" aria-hidden />
          </button>
        );
      })}
    </div>
  );
}