"use client";

import { useState, useMemo } from "react";
import { format, parse, isValid } from "date-fns";
import { z } from "zod";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MonthPicker } from "@/components/modern-ui/date-picker";
import ArrayInput from "./ArrayInput";
import {
  WorkEntrySchema,
  EducationEntrySchema,
  VolunteerEntrySchema,
  SkillCategorySchema,
  iconOptions,
  iconLabels,
} from "@/lib/resume/schema";

type EntryCategory = "work" | "education" | "volunteer" | "skills";

interface EntryEditorProps {
  category: EntryCategory;
  initialData?: Record<string, unknown>;
  onSave: (data: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  onCancel: () => void;
  isSubmitting?: boolean;
}

const fieldConfig: Record<
  EntryCategory,
  {
    titleLabel: string;
    titlePlaceholder: string;
    subtitleLabel: string;
    subtitlePlaceholder: string;
    showLocation: boolean;
    showDescription: boolean;
    showSkills: boolean;
    showIcon: boolean;
    showDates: boolean;
  }
> = {
  work: {
    titleLabel: "Job Title",
    titlePlaceholder: "e.g. Software Engineer",
    subtitleLabel: "Company",
    subtitlePlaceholder: "e.g. Acme Corp",
    showLocation: true,
    showDescription: true,
    showSkills: true,
    showIcon: false,
    showDates: true,
  },
  education: {
    titleLabel: "Degree",
    titlePlaceholder: "e.g. BS in Software Engineering",
    subtitleLabel: "School / University",
    subtitlePlaceholder: "e.g. BYU-Idaho",
    showLocation: true,
    showDescription: true,
    showSkills: false,
    showIcon: false,
    showDates: true,
  },
  volunteer: {
    titleLabel: "Role Title",
    titlePlaceholder: "e.g. Web Developer",
    subtitleLabel: "Organization",
    subtitlePlaceholder: "e.g. Red Cross",
    showLocation: true,
    showDescription: true,
    showSkills: true,
    showIcon: false,
    showDates: true,
  },
  skills: {
    titleLabel: "Category Label",
    titlePlaceholder: "e.g. Languages, Frameworks...",
    subtitleLabel: "",
    subtitlePlaceholder: "",
    showLocation: false,
    showDescription: false,
    showSkills: true,
    showIcon: true,
    showDates: false,
  },
};

const MONTH_FORMAT = "MMMM yyyy";

const parseMonth = (value: string | undefined): Date | undefined => {
  if (!value || value === "Present") return undefined;
  try {
    const result = parse(value, MONTH_FORMAT, new Date());
    return isValid(result) ? result : undefined;
  } catch {
    return undefined;
  }
};

const formatMonth = (date: Date | undefined): string => {
  return date ? format(date, MONTH_FORMAT) : "";
};

const initStr = (v: unknown): string => (typeof v === "string" ? v : "");
const initStrArr = (v: unknown): string[] =>
  Array.isArray(v) ? (v as string[]) : [];

export default function EntryEditor({
  category,
  initialData,
  onSave,
  onCancel,
  isSubmitting = false,
}: EntryEditorProps) {
  const config = fieldConfig[category];

  const [title, setTitle] = useState(initStr(initialData?.title));
  const [subtitle, setSubtitle] = useState(
    initStr(initialData?.subtitle) || initStr(initialData?.company),
  );
  const [location, setLocation] = useState(initStr(initialData?.location));
  const [startDate, setStartDate] = useState(initStr(initialData?.startDate));
  const [endDate, setEndDate] = useState(initStr(initialData?.endDate));
  const [currentlyWorking, setCurrentlyWorking] = useState<boolean>(
    Boolean(initialData?.currentlyWorking) ||
      initStr(initialData?.endDate) === "Present",
  );
  const [description, setDescription] = useState<string[]>(
    initStrArr(initialData?.description),
  );
  const [skills, setSkills] = useState<string[]>(
    initStrArr(initialData?.skills),
  );
  const [icon, setIcon] = useState(initStr(initialData?.icon) || "Briefcase");

  const schema = useMemo(() => {
    switch (category) {
      case "work":
        return WorkEntrySchema as z.ZodTypeAny;
      case "education":
        return EducationEntrySchema as z.ZodTypeAny;
      case "volunteer":
        return VolunteerEntrySchema as z.ZodTypeAny;
      case "skills":
        return SkillCategorySchema as z.ZodTypeAny;
    }
  }, [category]);

  const payload = useMemo(
    () => ({
      title,
      subtitle,
      company: category === "work" ? subtitle : undefined,
      location,
      startDate,
      endDate: currentlyWorking ? "Present" : endDate,
      currentlyWorking,
      description,
      skills,
      icon,
    }),
    [
      title,
      subtitle,
      location,
      startDate,
      endDate,
      currentlyWorking,
      description,
      skills,
      icon,
      category,
    ],
  );

  const errors = useMemo(() => {
    const result = schema.safeParse(payload);
    if (result.success) return {};
    const fields = result.error.flatten().fieldErrors as Record<string, string[]>;
    return fields;
  }, [payload, schema]);

  const isValid = useMemo(
    () => schema.safeParse(payload).success,
    [payload, schema],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(payload);
    if (!result.success) {
      return;
    }
    onSave(result.data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 rounded-2xl grid gap-y-4"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 ">
        <div>
          <label className="block text-sm font-medium">
            <span>{config.titleLabel}</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={config.titlePlaceholder}
              className="mt-2.5 h-11 w-full rounded-xl border border-input bg-background px-3 text-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
            />
          </label>
          {errors.title?.map((err) => (
            <p key={err} className="mt-1 text-sm text-red-600">
              {err}
            </p>
          ))}
        </div>

        {config.subtitleLabel && (
          <div>
            <label className="block text-sm font-medium">
              <span>{config.subtitleLabel}</span>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder={config.subtitlePlaceholder}
                className="mt-2.5 h-11 w-full rounded-xl border border-input bg-background px-3 text-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
              />
            </label>
            {errors.subtitle?.map((err) => (
              <p key={err} className="mt-1 text-sm text-red-600">
                {err}
              </p>
            ))}
            {errors.company?.map((err) => (
              <p key={err} className="mt-1 text-sm text-red-600">
                {err}
              </p>
            ))}
          </div>
        )}

        {config.showLocation && (
          <div>
            <label className="block text-sm font-medium">
              <span>Location</span>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. New York, NY or Remote"
                className="mt-2.5 h-11 w-full rounded-xl border border-input bg-background px-3 text-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
              />
            </label>
            {errors.location?.map((err) => (
              <p key={err} className="mt-1 text-sm text-red-600">
                {err}
              </p>
            ))}
          </div>
        )}

        {config.showDates && (
          <>
            <div>
              <label className="block text-sm font-medium">
                <span>Start Date</span>
              </label>
              <MonthPicker
                month={parseMonth(startDate)}
                setMonth={(d) => setStartDate(formatMonth(d))}
                placeholder="e.g. January 2023"
                className="mt-2.5 w-full rounded-xl h-11"
              />
              {errors.startDate?.map((err) => (
                <p key={err} className="mt-1 text-sm text-red-600">
                  {err}
                </p>
              ))}
            </div>

            <div className="">
              <label className="block text-sm font-medium">
                <span>End Date</span>
              </label>
              {currentlyWorking ? (
                <div className="mt-2.5 flex h-11 w-full items-center rounded-xl border border-input bg-background px-3 text-sm text-neutral-600">
                  Present
                </div>
              ) : (
                <MonthPicker
                  month={parseMonth(endDate)}
                  setMonth={(d) => setEndDate(formatMonth(d))}
                  placeholder="e.g. January 2025"
                  className="mt-2.5 w-full rounded-xl h-11"
                />
              )}
              {errors.endDate?.map((err) => (
                <p key={err} className="mt-1 text-sm text-red-600 block">
                  {err}
                </p>
              ))}
            </div>
            <div className="flex justify-end items-center mr-2 h-20">
              <div className=" flex items-center gap-2">
                <input
                  id="currently-working"
                  type="checkbox"
                  checked={currentlyWorking}
                  onChange={(e) => {
                    setCurrentlyWorking(e.target.checked);
                    if (e.target.checked) {
                      setEndDate("Present");
                    } else if (endDate === "Present") {
                      setEndDate("");
                    }
                  }}
                  className="size-4.5  appearance-none rounded-full border border-foreground/30 bg-white checked:bg-neutral-900 checked:border-neutral-900 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all cursor-pointer"
                />
                <label
                  htmlFor="currently-working"
                  className="text-sm text-neutral-700"
                >
                  Currently still working
                </label>
              </div>
            </div>
          </>
        )}
      </div>

      {config.showDescription && (
        <ArrayInput
          label={category === "skills" ? "Description" : "Description Bullets"}
          name="description"
          items={description}
          onChange={setDescription}
          placeholder="e.g. Led a team of 5 engineers..."
          error={errors.description}
        />
      )}

      {config.showSkills && (
        <ArrayInput
          label="Skills & Technologies"
          name="skills"
          items={skills}
          onChange={setSkills}
          placeholder="e.g. React, TypeScript, Project Management..."
          error={errors.skills}
        />
      )}

      {config.showIcon && (
        <div>
          <label className="block text-sm font-medium mb-3">Icon</label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {iconOptions.map((iconOption) => (
              <button
                key={iconOption}
                type="button"
                onClick={() => setIcon(iconOption)}
                className={`rounded-xl border px-3 py-2 text-xs font-medium transition-all ${
                  icon === iconOption
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300"
                }`}
              >
                {iconLabels[iconOption] ?? iconOption}
              </button>
            ))}
          </div>
          {errors.icon?.map((err) => (
            <p key={err} className="mt-1 text-sm text-red-600">
              {err}
            </p>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="bg-foreground text-background hover:opacity-85"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle className="animate-spin" /> Saving...
            </>
          ) : (
            "Save Entry"
          )}
        </Button>
      </div>
    </form>
  );
}
