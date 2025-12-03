    'use client';

    import React, { useState } from 'react';
    import Image from 'next/image';

    export interface StatusCardProps {
    count: number;
    status: string;
    iconSrc: string;
    iconAlt: string;
    bgColor?: string;
    textColor?: string;
    borderColor?: string;
    }

    const StatusCard: React.FC<StatusCardProps> = ({
    count,
    status,
    iconSrc,
    iconAlt,
    bgColor = 'bg-neutral-100',
    textColor = 'text-lime-950',
    borderColor = 'border-lime-950',
    }) => {
    const [imageError, setImageError] = useState(false);

    return (
        <div className="relative ml-2 mr-2 mt-5 h-20">
        <div className={` left-0 top-0 w-65 h-20 ${bgColor} rounded-2xl border ${borderColor}`}>
        
        {/* Status */}
        <div className={`absolute left-[30px] top-[1px] ${textColor} text-sm font-normal font-montserrat leading-9 tracking-wide`}>
            {status}
        </div>
        
        {/* Count */}
        <div className={`absolute left-[30px] top-[35px] ${textColor} text-4xl font-normal font-electrolize leading-9 tracking-wider`}>
            {count}
        </div>
        
        {/* Image */}
        <div className="relative left-[225px] top-[15px]">
            <div className="relative w-12 h-12">
            <div className="w-full h-full rounded-lg overflow-hidden">
                {!imageError && iconSrc ? (
                <img
                    src={iconSrc}
                    alt={iconAlt}
                    width={48}
                    height={48}
                    className="object-contain w-full h-full p-1"
                    onError={() => setImageError(true)}
                />
                ) : (
                <div className="w-full h-full flex items-center justify-center">
                    <span className=" text-lg font-medium">
                    {status.charAt(0)}
                    </span>
                </div>
                )}
            </div>
            </div>
        </div>
        </div>
        </div>
    );
    };

    export default StatusCard;