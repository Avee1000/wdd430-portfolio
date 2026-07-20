'use server'

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { redirect } from "next/navigation";

const ProjectFormSchema = z.object({
    title: z.string().min(1).max(100),
    description: z.string().min(1).max(1000),
    technologies: z.array(z.string()).min(1, 'Please select at least one technology.'),
    link: z.string().url().optional(),
    type: z.enum(['opensource', 'school']),
})

export async function createProject(formData: FormData) {
    const raw = {
        title: formData.get('title'),
        description: formData.get('description'),
        technologies: formData.getAll('technologies').filter((t) => t.toString().trim() !== ""),
        link: formData.get('link'),
        type: formData.get('type'),
    }

    const parsed = ProjectFormSchema.safeParse(raw);
    if (!parsed.success) {
        throw new Error('Invalid project input.' + parsed.error.toString());
    }

    const { title, description, type, technologies, link} = parsed.data;
    await sql`INSERT INTO projects (title, description, type, technologies, link) VALUES (${title}, ${description}, ${type}, ${technologies as any}::text[], ${link})`;
    revalidatePath('/projects');
    redirect('/projects');
}

export async function deleteProject(id: number) {
    await sql`DELETE FROM projects WHERE id = ${id}`;
    revalidatePath('/projects');
}