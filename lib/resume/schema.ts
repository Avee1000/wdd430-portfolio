import { z } from "zod"

export const currentlyWorkingField = z.boolean().optional().default(false)

export const WorkEntrySchema = z.object({
  title: z.string().trim().min(2, "Job title is required.").max(100, "Job title must be less than 100 characters."),
  company: z.string().trim().min(2, "Company is required.").max(100, "Company must be less than 100 characters."),
  location: z.string().trim().min(1, "Location is required."),
  startDate: z.string().trim().min(2, "Start date is required.").max(50, "Start date must be less than 50 characters."),
  endDate: z.string().trim().min(2, "End date is required.").max(50, "End date must be less than 50 characters."),
  currentlyWorking: currentlyWorkingField,
  description: z.array(z.string().trim().min(1)).min(1, "Add at least one description bullet.").max(20, "Maximum 20 bullets allowed."),
  skills: z.array(z.string().trim().min(1)).min(1, "Add at least one skill.").max(30, "Maximum 30 skills allowed."),
})

export const EducationEntrySchema = z.object({
  title: z.string().trim().min(2, "Degree is required.").max(150, "Degree must be less than 150 characters."),
  subtitle: z.string().trim().min(2, "School is required.").max(150, "School must be less than 150 characters."),
  location: z.string().trim().min(1, "Location is required."),
  startDate: z.string().trim().min(2, "Start date is required.").max(50, "Start date must be less than 50 characters."),
  endDate: z.string().trim().min(2, "End date is required.").max(50, "End date must be less than 50 characters."),
  currentlyWorking: currentlyWorkingField,
  description: z.array(z.string().trim().min(1)).max(20, "Maximum 20 bullets allowed.").optional(),
})

export const VolunteerEntrySchema = z.object({
  title: z.string().trim().min(2, "Role title is required.").max(100, "Role title must be less than 100 characters."),
  subtitle: z.string().trim().min(2, "Organization is required.").max(100, "Organization must be less than 100 characters."),
  location: z.string().trim().min(2, "Location is required.").max(100, "Location must be less than 100 characters."),
  startDate: z.string().trim().min(2, "Start date is required.").max(50, "Start date must be less than 50 characters."),
  endDate: z.string().trim().min(2, "End date is required.").max(50, "End date must be less than 50 characters."),
  currentlyWorking: currentlyWorkingField,
  description: z.array(z.string().trim().min(1)).min(1, "Add at least one description bullet.").max(20, "Maximum 20 bullets allowed."),
  skills: z.array(z.string().trim().min(1)).min(1, "Add at least one skill.").max(30, "Maximum 30 skills allowed."),
})

export const SkillCategorySchema = z.object({
  title: z.string().trim().min(2, "Category label is required.").max(50, "Label must be less than 50 characters."),
  icon: z.string().trim().max(50, "Icon must be less than 50 characters.").optional(),
  skills: z.array(z.string().trim().min(1)).min(1, "Add at least one skill.").max(30, "Maximum 30 skills allowed."),
})

export const WorkStepSchema = z.object({
  entries: z.array(WorkEntrySchema).min(1, "Add at least one work experience."),
})

export const EducationStepSchema = z.object({
  entries: z.array(EducationEntrySchema).min(1, "Add at least one education entry."),
})

export const VolunteerStepSchema = z.object({
  entries: z.array(VolunteerEntrySchema),
})

export const SkillsStepSchema = z.object({
  entries: z.array(SkillCategorySchema).min(1, "Add at least one skill category."),
})

export type WorkEntry = z.infer<typeof WorkEntrySchema>
export type EducationEntry = z.infer<typeof EducationEntrySchema>
export type VolunteerEntry = z.infer<typeof VolunteerEntrySchema>
export type SkillCategoryEntry = z.infer<typeof SkillCategorySchema>

export type WorkStepData = z.infer<typeof WorkStepSchema>
export type EducationStepData = z.infer<typeof EducationStepSchema>
export type VolunteerStepData = z.infer<typeof VolunteerStepSchema>
export type SkillsStepData = z.infer<typeof SkillsStepSchema>

export const iconOptions = [
  "Briefcase",
  "HeartHandshake",
  "GraduationCap",
  "Code",
  "CodeXml",
  "Database",
  "GitBranch",
  "Layers",
  "Timer",
  "TimelineIcon",
  "TrendingUp",
  "Zap",
  "Globe",
  "Smartphone",
  "Wrench",
] as const

export const iconLabels: Record<string, string> = {
  Briefcase: "Work",
  HeartHandshake: "Volunteer",
  GraduationCap: "Education",
  Code: "Code",
  CodeXml: "Development",
  Database: "Database",
  GitBranch: "Git",
  Layers: "Frameworks",
  Timer: "Time",
  TimelineIcon: "Project Management",
  TrendingUp: "Productivity",
  Zap: "General",
  Globe: "Web",
  Smartphone: "Mobile",
  Wrench: "Tools",
}
