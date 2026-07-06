import { NextResponse } from "next/server";
import { getProjects } from "@/lib/projects-db";   

export async function GET(request: Request) {
  // 1. Get the URL from the request
  const { searchParams } = new URL(request.url);
  
  // 2. Extract the 'type' query parameter
  const type = searchParams.get('type');

  // 3. Call your service function
  const projects = await getProjects(type ?? undefined);

  // (optional) log the requested type
  console.log('projects request type:', type);

  // 4. Return as a JSON response
  return NextResponse.json(projects);
}