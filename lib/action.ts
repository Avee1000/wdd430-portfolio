'use server'

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { readSessionToken } from "@/lib/auth";

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
                    2000,
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
    const rawTechnologies = (formData.getAll("technologies") ?? []).join(",");
    const technologies = rawTechnologies
        .split(",")
        .map(value =>
            value
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


export async function requireAdmin() {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value ?? null;

    if (!token) {
        redirect("/login");
    }

    const session = await readSessionToken(token);
    if (!session) {
        redirect("/login");
    }

    return session;
}

export async function createProject(prevState: State, formData: FormData): Promise<State> {
    await requireAdmin();

    const parsed = ProjectFormSchema.safeParse(getProjectData(formData));

    if (!parsed.success) {
        return {
            errors: parsed.error.flatten().fieldErrors,
            message: 'Missing or invalid fields. Failed to create project.',
        };
    }

    const { title, description, type, technologies, link } = parsed.data;
    console.log(parsed.data)
    try {
        await sql`INSERT INTO projects (title, description, type, technologies, link) VALUES (${title}, ${description}, ${type}, ${technologies as unknown as string}::text[], ${link})`;
    } catch {
        return {
            message: 'Database Error: Failed to create project.'
        }
    }
    revalidatePath('/projects');
    return {
        message: 'Project created successfully.',
        success: true,
        errors: {},
    };
}

const ContactSchema = z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters.").max(100, "Name must be less than 100 characters."),
    email: z.string().trim().email("Please enter a valid email address.").max(100, "Email must be less than 100 characters."),
    subject: z.string().trim().min(2, "Subject is required.").max(150, "Subject must be less than 150 characters."),
    message: z.string().trim().min(10, "Message must be at least 10 characters.").max(2000, "Message must be less than 2000 characters."),
});

export type ContactState = {
    errors?: {
        name?: string[];
        email?: string[];
        subject?: string[];
        message?: string[];
    };
    message?: string | null;
    success?: boolean;
};

export async function sendContactMessage(prevState: ContactState, formData: FormData): Promise<ContactState> {
    const parsed = ContactSchema.safeParse({
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        subject: String(formData.get("subject") ?? ""),
        message: String(formData.get("message") ?? ""),
    });

    if (!parsed.success) {
        return {
            errors: parsed.error.flatten().fieldErrors,
            message: "Please fix the errors below.",
        };
    }

    const { name, email, subject, message } = parsed.data;

    try {
        const apiKey = process.env.BREVO_API_KEY;
        if (apiKey) {
            const { BrevoClient } = await import("@getbrevo/brevo");
            const client = new BrevoClient({ apiKey });
            await (client.transactionalEmails).sendTransacEmail({
                sender: { email: "hello@example.com", name: "Portfolio Contact" },
                to: [{ email: "hello@example.com" }],
                subject: `Contact Form: ${subject}`,
                htmlContent: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, "<br>")}</p>`,
            });
        }
    } catch {
        return {
            message: "Failed to send message. Please try again later.",
        };
    }

    return {
        message: "Message sent successfully! I'll get back to you soon.",
        success: true,
        errors: {},
    };
}

export async function deleteProject(id: number) {
    await requireAdmin();
    await sql`DELETE FROM projects WHERE id = ${id}`;
    revalidatePath('/projects/edit');
}

export async function updateProject(id: string | number, prevState: State, formData: FormData): Promise<State> {
    await requireAdmin();
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
        technologies = ${technologies as unknown as string}::text[],
        link = ${link}
        WHERE id = ${id}`;
    } catch {
        // throw new Error("Failed to update project.");
        return {
            message: 'Failed to create project.'
        }
    }
    revalidatePath('/projects');
    revalidatePath('/projects/edit');
    return {
        message: 'Project updated successfully.',
        errors: {},
        success: true,
    };
}

export async function createProjectDep(prevState: State, formData: FormData): Promise<State> {
    await requireAdmin();

    // 1. Extract raw data from FormData
    const rawTechnologies = formData.get('technologies') as string;

    // 2. Split comma-separated technologies into a real string array
    const parsedTechnologies = rawTechnologies 
        ? rawTechnologies.split(',').map(tech => tech.trim()).filter(Boolean)
        : [];

    // 3. Construct object for Zod validation with the formatted array
    const rawFormData = {
        title: formData.get('title'),
        description: formData.get('description'),
        type: formData.get('type'),
        link: formData.get('link'),
        technologies: parsedTechnologies, // Pass real array to Zod schema
    };

    const parsed = ProjectFormSchema.safeParse(rawFormData);

    if (!parsed.success) {
        return {
            errors: parsed.error.flatten().fieldErrors,
            message: 'Missing or invalid fields. Failed to create project.',
        };
    }

    const { title, description, type, technologies, link } = parsed.data;

    try {
        // 4. Pass the array directly without `as unknown as string::text[]`
        await sql`
            INSERT INTO projects (title, description, type, technologies, link) 
            VALUES (${title}, ${description}, ${type}, ${technologies[0]}::text[], ${link})
        `;
    } catch (error) {
        console.error("Database insert error:", error);
        return {
            message: 'Database Error: Failed to create project.'
        };
    }

    revalidatePath('/projects');
    
    return {
        message: 'Project created successfully.',
        errors: {},
    };
}