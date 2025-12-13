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
        <div className={`relative max-w m-8 mt-10 h-auto min-h-25 rounded-2xl ${className}`}>
        <div className="absolute inset-0 bg-neutral-100 rounded-2xl border border-[#2B310A]"></div>

        <div className="relative p-4 md:p-6 h-full flex flex-col justify-between">
            <div>
            {/* Title */}
            <h3 className="text-lime-950 text-xl md:text-xl font-semibold font-electrolize tracking-wide mb-1/2">
                {title}
            </h3>
            
            {/* Description */}
            <p className="text-lime-950 text-base md:text-sm font-light font-montserrat tracking-wide max-w-2xl">
                {description}
            </p>
            </div>
            
            {/* Button */}
            <button
            onClick={handleClick}
            className="mt-4 w-full md:w-48 h-6 bg-lime-950 rounded-2xl font-sm shadow-[0px_4px_10px_0px_rgba(43,49,10,0.25)] hover:bg-lime-900 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group"
            aria-label={Text}
            >
            {/*icon */}
            <span className="text-white text-xl md:text-2xl font-medium font-montserrat transition-transform">
                {Icon}
            </span>
            
            {/* Button text */}
            <span className="text-white text-sm md:text-base font-medium font-montserrat tracking-wide">
                {Text}
            </span>
            </button>
        </div>
        </div>
    );
    };

    export default SubmitRequestCard;