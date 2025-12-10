"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
    interface HeaderProps {
    userName?: string;
    }

    export default function Header({ userName = "Angielyn" }: HeaderProps) {
        const router = useRouter();
        const handleSignOut = async () => {

        await createClient().auth.signOut();
        }
    return (
        <header className="bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            <div className="flex flex-row sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-row items-center space-x-2">
                <div className="pr-2">
                <img
                    className="w-5 h-5 sm:w-8 sm:h-8 rounded-md"
                    src="/images/helmet.png"
                    alt="Campus Repair Portal Logo"
                />
                </div>
                <div className="flex flex-col leading-tight">
                <h1 className="text-[#0D3311] text-xl font-normal font-electrolize tracking-wide">
                    Campus Repair Portal
                </h1>
                <p className="text-[#0D3311] text-sm font-normal font-montserrat">
                    Welcome, {userName}!
                </p>
                </div>
            </div>
            <div className="flex items-center justify-end sm:justify-center sm:w-auto">
                <button className="group relative sm:w-auto min-w-[140px] sm:min-w-[120px] h-8 sm:h-8 bg-neutral-100 rounded-[5px] border border-stone-400 hover:bg-neutral-200 transition-colors flex items-center justify-center space-x-2 px-2 py-2">
                <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 flex-shrink-0">
                    <img src="/images/signout.png" alt="Sign Out Icon" />
                </div>
                <span className="text-black text-base sm:text-lg lg:text-sm font-normal font-electrolize tracking-wide group-hover:text-gray-800 whitespace-nowrap">
                    Sign Out
                </span>
                </button>
            </div>
            </div>
        </div>
        </header>
    );
    }