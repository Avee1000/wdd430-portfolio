// Remove 'use client' entirely

import { fetchProjectsPages } from "@/app/api/route"; 
import Link from "next/link";

export default async function Pagination(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  // Await the searchParams as you were doing
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  
  const currentPage = Number(searchParams?.page) || 1;
  const pages = await fetchProjectsPages(query);

  return (
    <div className="flex flex-row justify-center items-center">
      <div className="flex flex-row w-full">
        {Array.from({ length: pages }).map((_, index) => {
          const pageNumber = index + 1;
          
          // Check if the current loop iteration matches the active page
          const isActive = currentPage === pageNumber;

          return (
            <div key={index} className="page-box">
              <Link 
                // It's good practice to preserve the query string if one exists
                href={`?page=${pageNumber}${query ? `&query=${query}` : ''}`} 
                className={`flex items-center justify-center mx-1 size-10 text-center rounded-full ${
                  isActive ? "bg-black text-white" : "bg-red-500 text-black"}`}>
                {pageNumber}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}