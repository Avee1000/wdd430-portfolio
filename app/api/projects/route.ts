import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import type { Project } from "@/lib/projects-db";

const ITEMS_PER_PAGE = 6;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const type = searchParams.get("type") || undefined;
  const mode = searchParams.get("mode") || "projects";

  const offset = (page - 1) * ITEMS_PER_PAGE;
  const searchQuery = `%${query}%`;
  const filterType = type || null;

  if (mode === "home") {
    const { rows: projects } = await sql<Project>`
      SELECT * FROM projects
      WHERE (title ILIKE ${searchQuery}
         OR description ILIKE ${searchQuery}
         OR technologies::text ILIKE ${searchQuery})
        AND (${filterType}::text IS NULL OR type = ${filterType})
      ORDER BY id
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    const { rows: countRows } = await sql`
      SELECT COUNT(*)
        FROM projects
        WHERE (title ILIKE ${searchQuery}
           OR description ILIKE ${searchQuery}
           OR technologies::text ILIKE ${searchQuery})
          AND (${filterType}::text IS NULL OR type = ${filterType})
    `;

    const totalCount = Number(countRows[0].count);
    const pages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    return NextResponse.json({ projects, pages });
  }

  if (mode === "edit") {
    const { rows: projects } = await sql<Project>`
      SELECT * FROM projects
      ORDER BY id
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    const { rows: countRows } = await sql`SELECT COUNT(*) FROM projects`;
    const totalCount = Number(countRows[0].count);
    const pages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    return NextResponse.json({ projects, pages });
  }

  const { rows: projects } = await sql<Project>`
    SELECT * FROM projects
    WHERE title ILIKE ${searchQuery}
       OR description ILIKE ${searchQuery}
       OR type ILIKE ${searchQuery}
       OR technologies::text ILIKE ${searchQuery}
    ORDER BY id
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;

  const { rows: countRows } = await sql`
    SELECT COUNT(*)
      FROM projects
      WHERE title ILIKE ${searchQuery}
         OR description ILIKE ${searchQuery}
         OR technologies::text ILIKE ${searchQuery}
         OR type ILIKE ${searchQuery}
  `;

  const totalCount = Number(countRows[0].count);
  const pages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return NextResponse.json({ projects, pages });
}
