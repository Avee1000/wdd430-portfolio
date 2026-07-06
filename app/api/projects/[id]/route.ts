import { NextResponse } from 'next/server';
import { getProjectById } from '@/lib/projects-db'; // Adjust your path

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    // 2. Await the params object before accessing .id
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
    console.log("Received ID from URL:", resolvedParams.id);

    // If the ID isn't a valid number, return 400 Bad Request
    if (isNaN(id)) {
        return NextResponse.json(
            { error: 'Invalid ID format. ID must be a number.' },
            { status: 400 }
        );
    }

    // 2. Lookup the project
    const project = getProjectById(id);

    // 3. Return 404 if project doesn't exist
    if (!project) {
        return NextResponse.json(
            { error: 'Project not found.' },
            { status: 404 }
        );
    }

    // 4. Success: Return the project
    return NextResponse.json(project);
}
