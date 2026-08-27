# Project Overview

This is a Next.js portfolio website designed to showcase software development projects. The application is built with TypeScript, React, and Tailwind CSS, and it uses Next.js for server-side rendering and routing. The project is configured to connect to a Vercel Postgres database for data storage and retrieval.

## Building and Running

To get the application up and running, use the following commands:

-   `npm install`: Installs all the necessary dependencies.
-   `npm run dev`: Starts the development server.
-   `npm run build`: Creates a production-ready build of the application.
-   `npm run start`: Starts the production server.
-   `npm run lint`: Lints the codebase to ensure code quality.

## Development Conventions

The project follows standard Next.js and React conventions. Key libraries include:

-   **Styling**: Tailwind CSS with `clsx` and `tailwind-merge` for utility-first styling.
-   **UI Components**: Radix UI and a custom component library for UI elements.
-   **Data Fetching**: The application fetches data from a Vercel Postgres database using the `@vercel/postgres` package.
-   **Linting**: ESLint is used for code linting and quality control.

The application is structured with a clear separation of concerns, with API routes, UI components, and utility functions organized into their own dedicated directories. The main application layout is defined in `app/layout.tsx`, and the homepage is located at `app/page.tsx`.
