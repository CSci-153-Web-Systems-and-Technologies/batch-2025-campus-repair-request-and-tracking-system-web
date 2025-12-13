"use client";
import { useRouter } from "next/navigation";
import { signout } from "@/lib/auth-actions";

interface HeaderProps {
    userName?: string;
}

export default function Header({ userName = "Angielyn" }: HeaderProps) {
    const router = useRouter();
    const handleSignOut = async () => {
        await signout();
    }
    
    return (
        <header className="bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
                <div className="flex flex-row items-center justify-between gap-2 sm:gap-4">
                    {/* Logo and Title Section */}
                    <div className="flex flex-row items-center space-x-2 min-w-0 flex-1">
                        <div className="pr-1 sm:pr-2 flex-shrink-0">
                            <img
                                className="w-6 h-6 sm:w-8 sm:h-8 rounded-md"
                                src="/images/helmet.png"
                                alt="Campus Repair Portal Logo"
                            />
                        </div>
                        <div className="flex flex-col leading-tight min-w-0">
                            <h1 className="text-[#0D3311] text-sm sm:text-lg lg:text-xl font-normal font-electrolize tracking-wide truncate">
                                Campus Repair Portal
                            </h1>
                            <p className="text-[#0D3311] text-xs sm:text-sm font-normal font-montserrat truncate">
                                Welcome, {userName}!
                            </p>
                        </div>
                    </div>
                    
                    {/* Sign Out Button */}
                    <div className="flex items-center justify-end flex-shrink-0">
                        <button 
                            onClick={handleSignOut} 
                            className="group relative w-auto min-w-[100px] sm:min-w-[120px] h-8 sm:h-9 bg-neutral-100 rounded-[5px] border border-stone-400 hover:bg-neutral-200 transition-colors flex items-center justify-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2"
                        >
                            <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex-shrink-0">
                                <img src="/images/signout.png" alt="Sign Out Icon" className="w-full h-full object-contain" />
                            </div>
                            <span className="text-black text-xs sm:text-sm lg:text-base font-normal font-electrolize tracking-wide group-hover:text-gray-800 whitespace-nowrap">
                                Sign Out
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}