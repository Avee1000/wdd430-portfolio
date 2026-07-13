import { getAllProjects } from "@/lib/homeProjects-db";
import { NextResponse } from "next/server";


export async function GET(): Promise<NextResponse> {
    const projects = await getAllProjects();
    return NextResponse.json(
        {data: projects, status: 404},
        {status: 200, headers: {"Content-Type": "application/json"}}
    );
}