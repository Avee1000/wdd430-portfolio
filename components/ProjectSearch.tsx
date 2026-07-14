'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from "use-debounce";

export function ProjectSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) =>{
        const params = new URLSearchParams(searchParams);
        params.set('page', '1'); // reset to page 1 on every new search
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className='bg-gray-400 h-auto p-3'>
            <div className=" ">
                <div className="flex items-center justify-between gap-2 h-8 w-63">
                    <input
                        type="search"
                        placeholder="Search projects..."
                        defaultValue={searchParams.get('query')?.toString()}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full h-full text-sm rounded-md ring-1 focus:ring-2 bg-white outline-none px-2 py-1"
                    />
                    <div className="search-icon bg-red-500 flex justify-center items-center rounded-full w-13 h-10 hover:cursor-pointer hover:bg-red-500/89">
                        <button aria-label="button" className='hover:cursor-pointer' >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="size-4">
                                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
}