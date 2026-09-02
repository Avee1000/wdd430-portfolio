'use client'

import { Check, AlertCircle, LoaderIcon } from "lucide-react";

interface SaveToastProps {
    status: "idle" | "saving" | "success" | "error";
    message?: string | null;
}

export default function SaveToast({ status, message }: SaveToastProps) {

    if (status === "idle") return null;

    return (
        <div className={`
            fixed bottom-6 right-6
            bg-gray-900 text-white
            shadow-xl px-5 py-3 rounded-lg
            flex items-center gap-3 z-50
            animate-in fade-in slide-in-from-bottom-100 duration-300
        `}>
            {status === "saving" && (
                <>
                    <LoaderIcon className="animate-spin size-5" />
                    <span>Saving project...</span>
                </>
            )}

            {status === "success" && (
                <>
                    <Check className="size-5 text-green-500" />
                    <span className="text-green-400">
                        Project saved!
                    </span>
                </>
            )}

            {status === "error" && (
                <>
                    <AlertCircle className="size-5 text-red-500" />
                    <span className="text-red-400">
                        {message}
                    </span>
                </>
            )}
        </div>
    )
}