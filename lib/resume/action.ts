'use server'

import { sql } from "@vercel/postgres"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { readSessionToken } from "@/lib/auth"
import {
  WorkStepSchema,
  EducationStepSchema,
  VolunteerStepSchema,
  SkillsStepSchema,
  type WorkEntry,
  type EducationEntry,
  type VolunteerEntry,
  type SkillCategoryEntry,
} from "./schema"

export type State = {
  errors?: Record<string, string[]>
  message?: string | null
  success?: boolean
}

export async function requireAdmin() {
  const cookieStore = await cookies()
  const token = cookieStore.get("session")?.value ?? null

  if (!token) {
    redirect("/login")
  }

  const session = await readSessionToken(token)
  if (!session) {
    redirect("/login")
  }

  return session
}

export async function createResumeEntries(data: {
  work: WorkEntry[]
  education: EducationEntry[]
  volunteer: VolunteerEntry[]
  skills: SkillCategoryEntry[]
}): Promise<State> {
  await requireAdmin()

  const workParsed = WorkStepSchema.safeParse({ entries: data.work })
  const educationParsed = EducationStepSchema.safeParse({ entries: data.education })
  const volunteerParsed = VolunteerStepSchema.safeParse({ entries: data.volunteer })
  const skillsParsed = SkillsStepSchema.safeParse({ entries: data.skills })

  if (!workParsed.success) {
    return {
      errors: { work: workParsed.error.flatten().fieldErrors.entries ?? [] },
      message: "Please fix the work experience errors.",
    }
  }

  if (!educationParsed.success) {
    return {
      errors: { education: educationParsed.error.flatten().fieldErrors.entries ?? [] },
      message: "Please fix the education errors.",
    }
  }

  if (!volunteerParsed.success) {
    return {
      errors: { volunteer: volunteerParsed.error.flatten().fieldErrors.entries ?? [] },
      message: "Please fix the volunteer errors.",
    }
  }

  if (!skillsParsed.success) {
    return {
      errors: { skills: skillsParsed.error.flatten().fieldErrors.entries ?? [] },
      message: "Please fix the skills errors.",
    }
  }

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS resume_entries (
        id  GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        category TEXT NOT NULL,
        title TEXT NOT NULL,
        subtitle TEXT,
        location TEXT,
        start_date TEXT NOT NULL,
        end_date TEXT NOT NULL,
        description TEXT[],
        skills TEXT[],
        icon TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `

    const insertRow = async (
      category: string,
      title: string,
      subtitle: string | null,
      location: string | null,
      startDate: string,
      endDate: string,
      description: string[],
      skills: string[],
      icon: string | null,
    ) => {
      await sql`
        INSERT INTO resume_entries (category, title, subtitle, location, start_date, end_date, description, skills, icon)
        VALUES (${category}, ${title}, ${subtitle}, ${location}, ${startDate}, ${endDate}, ${description as unknown as string}::text[], ${skills as unknown as string}::text[], ${icon})
      `
    }

    const endDateFor = (entry: { endDate?: string; currentlyWorking?: boolean }) =>
      entry.currentlyWorking ? "Present" : entry.endDate ?? ""

    for (const entry of workParsed.data.entries) {
      await insertRow(
        "work",
        entry.title,
        entry.company,
        entry.location ?? null,
        entry.startDate,
        endDateFor(entry),
        entry.description,
        entry.skills,
        null,
      )
    }

    for (const entry of educationParsed.data.entries) {
      await insertRow(
        "education",
        entry.title,
        entry.subtitle,
        entry.location ?? null,
        entry.startDate,
        endDateFor(entry),
        entry.description ?? [],
        [],
        null,
      )
    }

    for (const entry of volunteerParsed.data.entries) {
      await insertRow(
        "volunteer",
        entry.title,
        entry.subtitle,
        entry.location ?? null,
        entry.startDate,
        endDateFor(entry),
        entry.description,
        entry.skills,
        null,
      )
    }

    for (const entry of skillsParsed.data.entries) {
      await insertRow(
        "skills",
        entry.title,
        null,
        null,
        "",
        "",
        [],
        entry.skills,
        entry.icon ?? null,
      )
    }
  } catch {
    return {
      message: "Database Error: Failed to create resume entries.",
    }
  }

  revalidatePath("/resume")
  revalidatePath("/resume/more")
  return {
    message: "Resume created successfully.",
    success: true,
    errors: {},
  }
}
