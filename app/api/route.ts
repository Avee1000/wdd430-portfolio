import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { getAllProjects, Project } from "@/lib/homeProjects-db"; // Added Project type import

export async function GET(): Promise<NextResponse> {
    const projects = await getAllProjects();
    return NextResponse.json(
        { data: projects, status: 404 }, // Note: You might want to change this to status: 200 for successful GET requests!
        { status: 200, headers: { "Content-Type": "application/json" } }
    );
}

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredProjects(query: string, currentPage: number) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    // Using Vercel Postgres raw SQL with ILIKE for case-insensitive searching
    const { rows } = await sql<Project>`
        SELECT * FROM homeprojects
        WHERE title ILIKE ${`%${query}%`}
           OR description ILIKE ${`%${query}%`}
           OR technologies::text ILIKE ${`%${query}%`}
        ORDER BY id
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return rows;
}

export async function fetchProjectsPages(query: string) {
    // Count the total records that match the query
    const { rows } = await sql`
        SELECT COUNT(*)
        FROM homeprojects
        WHERE title ILIKE ${`%${query}%`}
           OR description ILIKE ${`%${query}%`}
           OR technologies::text ILIKE ${`%${query}%`}
    `;
    // Extract the count from the SQL result (rows[0].count)
    const totalCount = Number(rows[0].count);
    const pagination = Math.ceil(totalCount / ITEMS_PER_PAGE);
    return pagination;
}

export async function fetchFilteredSchoolProjects(query: string, currentPage: number) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    // Using Vercel Postgres raw SQL with ILIKE for case-insensitive searching
    const { rows } = await sql<Project>`
        SELECT * FROM projects
        WHERE title ILIKE ${`%${query}%`}
           OR description ILIKE ${`%${query}%`}
           OR type ILIKE ${`%${query}%`}
           OR technologies::text ILIKE ${`%${query}%`}
        ORDER BY id
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return rows;
}

export async function fetchSchoolProjectsPages(query: string) {
    // Count the total records that match the query
    const { rows } = await sql`
        SELECT COUNT(*)
        FROM projects
        WHERE title ILIKE ${`%${query}%`}
           OR description ILIKE ${`%${query}%`}
           OR technologies::text ILIKE ${`%${query}%`}
            OR type ILIKE ${`%${query}%`}
    `;
    // Extract the count from the SQL result (rows[0].count)
    const totalCount = Number(rows[0].count);
    const pagination = Math.ceil(totalCount / ITEMS_PER_PAGE);
    return pagination;
}
