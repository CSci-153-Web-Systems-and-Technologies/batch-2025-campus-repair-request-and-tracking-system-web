'use client';

import React, { useState } from 'react';

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
        <div className="relative w-full h-20 sm:h-20 px-2 sm:px-0">
            <div className={`relative w-full h-full ${bgColor} rounded-2xl border ${borderColor} flex items-center px-4 sm:px-6`}>
                {/* Text Content */}
                <div className="flex flex-col justify-center flex-1 min-w-0">
                    {/* Status */}
                    <div className={`${textColor} text-xs sm:text-sm font-normal font-montserrat leading-tight tracking-wide truncate`}>
                        {status}
                    </div>
                    
                    {/* Count */}
                    <div className={`${textColor} text-2xl sm:text-3xl lg:text-4xl font-normal font-electrolize leading-tight tracking-wider`}>
                        {count}
                    </div>
                </div>
                
                {/* Icon */}
                <div className="flex-shrink-0 ml-2 sm:ml-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12">
                        <div className="w-full h-full rounded-lg overflow-hidden">
                            {!imageError && iconSrc ? (
                                <img
                                    src={iconSrc}
                                    alt={iconAlt}
                                    className="object-contain w-full h-full p-1"
                                    onError={() => setImageError(true)}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-neutral-200 rounded-lg">
                                    <span className="text-lime-950 text-lg font-medium">
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