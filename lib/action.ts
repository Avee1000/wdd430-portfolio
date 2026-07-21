'use server'

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { redirect } from "next/navigation";

const ProjectFormSchema = z.object({

    title: z
        .string()
        .trim()
        .min(5, "Title is required.")
        .max(100, "Title must be less than 100 characters."),
    description: z
        .string()
        .trim()
        .min(1, "Description is required.")
        .max(
            1000,
            "Description must be less than 1000 characters."
        ),
    technologies: z
        .array(
            z
                .string()
                .trim()
                .min(1)
                .max(
                    30,
                    "Technology names cannot exceed 30 characters."
                )
        )
        .min(
            1,
            "Please select at least one technology."
        )
        .max(
            15,
            "Maximum of 15 technologies allowed."
        ),
    link: z
        .string()
        .trim()
        .url(
            "Please enter a valid URL."
        ),
    type: z.enum(
        [
            "opensource",
            "school",
        ],
        {
            message:
                "Please select a valid project type.",
        }
    ),
});

export type State = {
    errors?: {
        title?: string[];
        description?: string[];
        technologies?: string[];
        link?: string[];
        type?: string[];
    };
    message?: string | null;
    success?: boolean;
}

/**
 * Converts FormData into a validated object.
 */
function getProjectData(
    formData: FormData
) {
    const technologies = formData
        .getAll("technologies")
        .map(value =>
            String(value)
                .trim()
                .replace(/\s+/g, " ")
        )
        .filter(Boolean);

    const uniqueTechnologies =
        Array.from(
            new Map(
                technologies.map(item => [
                    item.toLowerCase(),
                    item,
                ])
            ).values()
        );

    return {
        title:
            String(
                formData.get("title") ?? ""
            ),
        description:
            String(
                formData.get("description") ?? ""
            ),
        technologies:
            uniqueTechnologies,
        link:
            String(
                formData.get("link") ?? ""
            ),
        type:
            String(
                formData.get("type") ?? ""
            ),
    };
}


export async function createProject(prevState: State, formData: FormData): Promise<State> {

    const parsed = ProjectFormSchema.safeParse(getProjectData(formData));
    // if (!parsed.success) {
    //     throw new Error('Invalid project input.' + parsed.error.toString());
    // }
    if (!parsed.success) {
        return {
            errors: parsed.error.flatten().fieldErrors,
            message: 'Missing or invalid fields. Failed to create project.',
        };
    }

    const { title, description, type, technologies, link } = parsed.data;
    try {
        await sql`INSERT INTO projects (title, description, type, technologies, link) VALUES (${title}, ${description}, ${type}, ${technologies as any}::text[], ${link})`;
    } catch (error) {
        return {
            message: 'Database Error: Failed to create project.'
        }
    }
    revalidatePath('/projects');
    redirect('/projects');
}

export async function deleteProject(id: number) {
    await sql`DELETE FROM projects WHERE id = ${id}`;
    revalidatePath('/projects');
}

export async function updateProject(id: string | number, prevState: State, formData: FormData): Promise<State> {


    const parsed = ProjectFormSchema.safeParse(getProjectData(formData));

    if (!parsed.success) {
        return {
            errors: parsed.error.flatten().fieldErrors,
            message: 'Missing or invalid fields. Failed to create project.',
        };
    }

    const { title, description, type, technologies, link } = parsed.data;

    try {
        await sql`UPDATE projects  
        SET 
        title = ${title},
        description = ${description},
        type = ${type},
        technologies = ${technologies as any}::text[],
        link = ${link}
        WHERE id = ${id}`;
    } catch (error) {
        // throw new Error("Failed to update project.");
        return {
            message: 'Database Error: Failed to create project.'
        }
    }
    revalidatePath('/projects');
    revalidatePath('/projects/edit');
    return {
        message: 'Project updated successfully.',
    };
}