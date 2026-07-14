import { NextResponse, NextRequest } from "next/server";
import { getProjects } from "@/lib/projects-db";   

export async function GET(request: NextRequest) {
  // 1. Get the URL from the request
  const { searchParams } = new URL(request.url);
  
  // 2. Extract the 'type' query parameter
  const type = searchParams.get('type');

  // 3. Call your service function
  const projects = await getProjects(type ?? undefined);

  // (optional) log the requested type
  console.log('projects request type:', type);

      // Temporarily in your data fetch — remove after testing
  // await new Promise(res => setTimeout(res, 5000));

  // 4. Return as a JSON response
  return NextResponse.json(projects);
}