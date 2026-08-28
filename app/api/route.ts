import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import type { Project } from "@/lib/projects-db";

export async function GET(): Promise<NextResponse> {
    const { rows: projects } = await sql<Project>`SELECT * FROM projects ORDER BY id`;
    return NextResponse.json(
        { data: projects, status: 404 }, // Note: You might want to change this to status: 200 for successful GET requests!
        { status: 200, headers: { "Content-Type": "application/json" } }
    );
}

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredProjects(query: string, currentPage: number, type?: "opensource" | "school") {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const searchQuery = `%${query}%`;
    const filterType = type || null;

    const { rows } = await sql<Project>`
        SELECT * FROM projects
        WHERE (title ILIKE ${searchQuery}
           OR description ILIKE ${searchQuery}
           OR technologies::text ILIKE ${searchQuery})
        AND (${filterType}::text IS NULL OR type = ${filterType})
        ORDER BY id
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return rows;
}

export async function fetchProjectsPages(query: string, type?: "opensource" | "school") {
    const searchQuery = `%${query}%`;
    const filterType = type || null;

    // Count the total records that match the query
    const { rows } = await sql`
        SELECT COUNT(*)
          FROM projects
          WHERE (title ILIKE ${searchQuery}
             OR description ILIKE ${searchQuery}
             OR technologies::text ILIKE ${searchQuery})
          AND (${filterType}::text IS NULL OR type = ${filterType})
    `;
    
    // Extract the count from the SQL result (rows[0].count)
    const totalCount = Number(rows[0].count);
    const pagination = Math.ceil(totalCount / ITEMS_PER_PAGE);
    return pagination;
}

export async function fetchFilteredSchoolProjects(query: string, currentPage: number) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
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

export async function allSchoolProjects(currentPage: number) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const { rows } = await sql<Project>`
        SELECT * FROM projects
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
