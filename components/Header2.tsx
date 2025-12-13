'use client';

import { useRouter } from 'next/navigation';

export default function Header2() {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    return (
        <div className="w-full relative">
            {/* Back Button */}
            <div className="px-4 sm:px-8 md:px-10 py-4 sm:py-5">
                <button 
                    onClick={handleBack}
                    className="w-20 sm:w-24 h-8 bg-neutral-100 rounded-[3px] border border-stone-400 hover:bg-neutral-200 transition-colors relative flex items-center justify-center"
                >
                    <img 
                        className="w-4 h-4 sm:w-5 sm:h-5 absolute left-2 sm:left-3" 
                        src="/images/signout.png"
                        alt="Back icon"
                    />
                    <span className="text-black text-sm sm:text-base font-normal font-electrolize ml-4 sm:ml-5">
                        Back
                    </span>
                </button>
            </div>
            
            {/* Divider Line */}
            <div className="w-full h-0 shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] border-t border-lime-950"></div>
        </div>
    );
}