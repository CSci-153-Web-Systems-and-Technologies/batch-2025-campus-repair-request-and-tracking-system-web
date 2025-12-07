'use client';

import React from 'react';

export interface RepairRequestCardProps {
title?: string;
location?: string;
schedule?: string;
status?: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
category?: string;
onClick?: () => void;
className?: string;
}

const RepairRequestCard: React.FC<RepairRequestCardProps> = ({
title = "Aircon in Dorm Room 12 leaking water",
location = "DCST - ROOM 101",
schedule = "Schedule of Repair - Pending",
status = "Pending",
category = "Plumbing",
onClick,
className = "",
}) => {

const statusConfig = {
    Pending: {
    bg: "bg-amber-100",
    text: "text-orange-500",
    label: "Pending",
    icon: "⏳",
    },
    "In Progress": {
    bg: "bg-blue-100",
    text: "text-blue-600",
    label: "In Progress",
    icon: "🔨", 
    },
    Completed: {
    bg: "bg-green-100",
    text: "text-green-600",
    label: "Completed",
    icon: "✅",
    },
    Cancelled: {
    bg: "bg-red-100",
    text: "text-red-600",
    label: "Cancelled",
    icon: "❌", 
    },
};

const currentStatus = statusConfig[status] || statusConfig.Pending;

return (
    <div 
        className={`relative bg-neutral-100 rounded-2xl border border-lime-950 cursor-pointer transition-all hover:shadow-md ${className}`}
        onClick={onClick}
        role={onClick ? "button" : "article"}
        tabIndex={onClick ? 0 : -1}
        onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >

        {/* Title */}
        <div className="absolute left-[30px] top-[12px] text-lime-950 text-xs font-semibold font-montserrat max-w-[300px] line-clamp-2">
            {title}
        </div>

        {/* Status */}
        <div className={`absolute left-[30px] top-[47px] ${currentStatus.bg} rounded-3xl shadow-md flex items-center gap-2 px-3 py-1.5`}>
            <span className="text-sm">{currentStatus.icon}</span>
            <span className={`${currentStatus.text} text-xs font-semibold font-inter`}>
                {currentStatus.label}
            </span>
        </div>

        {/* Category Tag */}
        <div className="absolute left-[30px] top-[87px] px-4 py-1 h-6 rounded-3xl shadow-md outline outline-1 outline-black flex items-center">
            <span className="text-black text-xs font-semibold font-inter leading-5">
                {category}
            </span>
        </div>

        {/* Location */}
        <div className="absolute left-[30px] top-[135px] flex items-center gap-3">
            <img src="/images/location.png" alt="Location Icon" className="w-6 h-6" />
            <span className="text-lime-950 text-xs font-semibold font-montserrat truncate max-w-[250px]">
                {location}
            </span>
        </div>

        {/* Schedule */}
        <div className="absolute left-[30px] top-[170px] flex items-center gap-3">
            <img src="/images/calendar.png" alt="Schedule Icon" className="w-6 h-6" />
            <span className="text-lime-950 text-xs font-semibold font-montserrat truncate max-w-[250px]">
                {schedule}
            </span>
        </div>
    </div>
);
};

export default RepairRequestCard;