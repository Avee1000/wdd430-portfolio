'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
    error,
    reset
}: {
    error: Error & { digest: string };
    reset: () => void
}) {
    useEffect(() => {
        // optionally log the error
        console.error('An uncaught error occurred:', error);
    }, [error]);

    return (
        <div className='flex-1 min-h-dvh justify-self-center items-center flex'>
            <div className="mx-auto max-w-xl rounded-lg border border-muted-foreground bg-white p-6 text-center shadow-sm">
                <h1 className="text-2xl font-bold ">Something went wrong!</h1>
                <p className="mt-3 text-muted-foreground">
                    {error.message || "An unexpected error occurred. Please try again later."}
                </p>

                <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <button
                        onClick={reset}
                        className="rounded-md bg-gray-950 px-4 py-2 font-semibold text-white transition hover:bg-gray-800"
                    >
                        Try Again
                    </button>

                    <Link
                        href="/projects"
                        className="rounded-md border border-slate-300 px-4 py-2 font-semibold  transition hover:bg-"
                    >
                        Go Back to Projects
                    </Link>
                </div>
            </div>
        </div>

    );
}