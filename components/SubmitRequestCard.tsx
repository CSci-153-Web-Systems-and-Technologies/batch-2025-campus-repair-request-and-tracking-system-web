'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface SubmitRequestCard {
    title?: string;
    description?: string;
    Text?: string;
    Icon?: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

const SubmitRequestCard: React.FC<SubmitRequestCard> = ({
    title = 'Report an Issue',
    description = 'Please provide the details below to help us assist you.',
    Text = 'SUBMIT REQUEST',
    Icon = '+',
    onClick,
    className = '',
}) => {
    const router = useRouter();
    
    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            router.push('/requester/request-form');
        }
    };
    
    return (
        <div className={`relative w-full max-w-full mx-auto mt-6 sm:mt-8 lg:mt-10 ${className}`}>
            <div className="relative bg-neutral-100 rounded-2xl border border-[#2B310A] p-4 sm:p-5 lg:p-6">
                <div className="flex flex-col gap-3 sm:gap-4">
                    {/* Title */}
                    <h3 className="text-lime-950 text-lg sm:text-xl font-semibold font-electrolize tracking-wide">
                        {title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-lime-950 text-sm sm:text-base font-light font-montserrat tracking-wide max-w-2xl">
                        {description}
                    </p>
                    
                    {/* Button */}
                    <button
                        onClick={handleClick}
                        className="w-full sm:w-48 h-9 sm:h-10 bg-lime-950 rounded-2xl shadow-[0px_4px_10px_0px_rgba(43,49,10,0.25)] hover:bg-lime-900 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group"
                        aria-label={Text}
                    >
                        {/* Icon */}
                        <span className="text-white text-xl sm:text-2xl font-medium font-montserrat transition-transform">
                            {Icon}
                        </span>
                        
                        {/* Button text */}
                        <span className="text-white text-sm sm:text-base font-medium font-montserrat tracking-wide">
                            {Text}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SubmitRequestCard;