import { sql } from "@vercel/postgres";



export interface Project {
  id: string | number;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}


export async function getAllProjects(): Promise<Project[]> {
    const { rows } = await sql<Project>`
    SELECT * FROM homeprojects ORDER BY id
  `;
  return rows;
}