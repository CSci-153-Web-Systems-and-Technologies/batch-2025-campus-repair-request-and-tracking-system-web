'use client';

import { useRouter } from 'next/navigation';

export default function Header2() {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    return (
        <div className="w-[1728px] h-20 relative">
            <button 
                onClick={handleBack}
                className="w-24 h-8 left-[40px] top-5 absolute bg-neutral-100 rounded-[3px] border border-stone-400 hover:bg-neutral-200 transition-colors"
            >
                <div className="left-[42px] top-[3px] absolute text-black text-base font-normal font-['Electrolize'] leading-6">
                    Back
                </div>
                <img 
                className="w-5 h-5 left-[15px] top-[5px] absolute" 
                src="/images/signout.png" />
            </button>
            <div className="w-[1728px] h-0 left-0 top-[74px] absolute shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] outline outline-1 outline-offset-[-0.50px] outline-lime-950"></div>
        </div>
);
}