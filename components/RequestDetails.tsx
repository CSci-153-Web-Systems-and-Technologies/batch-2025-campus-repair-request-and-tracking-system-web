    'use client';

    import React from 'react';

    interface RequestData {
    title: string;
    description: string;
    category: string;
    status: string;
    priority: string;
    createdDate: string;
    scheduleDate: string;
    location: string;
    room: string;
    requestedBy: string;
    contact: string;
    }

    interface RequestCardProps {
    data?: RequestData;
    }

    const defaultData: RequestData = {
    title: 'Leaking faucet',
    description: 'Sink faucet in the kitchen cannot be closed',
    category: 'Plumbing',
    status: 'In Progress',
    priority: 'High',
    createdDate: 'Saturday, 01/03/2023',
    scheduleDate: 'Sunday, 01/04/2024',
    location: '2nd Floor Mens Restroom',
    room: 'DCST - ROOM 101',
    requestedBy: 'Tom Cruise',
    contact: 'tom_cruise@university.edu.ph'
    };

    const RequestDetails: React.FC<RequestCardProps> = ({ data = defaultData }) => {
    const {
        title,
        description,
        category,
        status,
        priority,
        createdDate,
        scheduleDate,
        location,
        room,
        requestedBy,
        contact
    } = data;

    return (
        <div className="relative w-[788px] h-96">
        <div className="absolute left-0 top-0 w-[788px] h-96 bg-neutral-100 rounded-2xl border border-lime-950" />
        
        {/* Title */}
        <div className="absolute left-[24.07px] font-electrolize top-[18px] w-40 h-12 text-lime-950 text-base font-semibold leading-9 tracking-wide">
            {title}
        </div>
        
        {/* Description */}
        <div className="text-lime-950 text-base leading-9 tracking-wide absolute left-[24.07px] top-[43px] w-96 ">
            {description}
        </div>
        
        {/* Status */}
        <div className="absolute left-[24.07px] top-[93px] w-36 h-6 px-5 py-2 bg-sky-100 rounded-3xl shadow-[0px_4px_8px_0px_rgba(0,0,0,0.10)] inline-flex justify-between items-center overflow-hidden">
            <div className="flex justify-start items-center gap-2">
            <div className="text-sky-600 text-sm font-semibold font-electrolize leading-5">
                🔨 {status}
            </div>
            </div>
            <div className="justify-start"></div>
        </div>
        
        {/* Priority */}
        <div className="absolute left-[189.41px] font-electrolize top-[93px] w-16 h-6 px-5 py-2 bg-red-100 rounded-3xl shadow-[0px_4px_8px_0px_rgba(0,0,0,0.10)] inline-flex justify-between items-center overflow-hidden">
            <div className="flex justify-start items-center gap-2">
            <div className="text-red-700 text-sm font-semibold font-inter leading-5">
                {priority}
            </div>
            </div>
            <div className="justify-start"></div>
        </div>
        
        {/* Category */}
        <div className="absolute font-electrolize left-[276.27px] top-[93px] w-24 h-6 px-5 py-2 rounded-3xl shadow-[0px_4px_8px_0px_rgba(0,0,0,0.10)] outline outline-1 outline-offset-[-1px] outline-black inline-flex justify-between items-center overflow-hidden">
            <div className="flex justify-start items-center gap-2">
            <div className="text-black text-sm font-semibold font-inter leading-5">
                {category}
            </div>
            </div>
        </div>
        
        {/* Created */}
        <div className="absolute left-[53.37px] top-[227px] w-20 text-lime-950 text-xs font-light leading-9 tracking-tight">
            Created
        </div>
        <div className="absolute left-[53.37px] top-[245px] w-40 text-lime-950 text-sm font-semibold font-montserrat leading-9 tracking-wide">
            {createdDate}
        </div>
        <div className="absolute left-[18.98px] top-[240.68px]">
            <img 
            src="/images/calendar.png" 
            alt="calendar icon" 
            width={26}
            height={26}
            />
        </div>
        
        {/* Schedule */}
        <div className="absolute left-[54px] top-[291px] w-40 text-lime-950 text-xs font-light font-montserrat leading-9 tracking-tight">
            Schedule of Repair
        </div>
        <div className="absolute left-[54.42px] top-[309px] w-40 text-lime-950 text-sm font-semibold font-montserrat leading-9 tracking-wide">
            {scheduleDate}
        </div>
        <div className="absolute left-[20.98px] top-[307.75px]">
            <img 
            src="/images/clock.png" 
            alt="schedule icon" 
            width={22}
            height={22}
            />
        </div>
        
        {/* L-Location */}
        <div className="absolute left-[52.32px] top-[146px] w-20 text-lime-950 text-xs font-light font-montserrat leading-9 tracking-tight">
            Location
        </div>
        <div className="absolute left-[52.32px] top-[181px] w-44 text-lime-950 text-xs font-light font-montserrat leading-9 tracking-tight">
            {location}
        </div>
        <div className="absolute left-[52.32px] top-[164px] w-36 h-9 text-lime-950 text-sm font-semibold font-montserrat leading-9 tracking-wide">
            {room}
        </div>
        <div className="absolute left-[19.07px] top-[169.72px]">
            <img 
            src="/images/location.png" 
            alt="location icon" 
            width={24}
            height={24}
            />
        </div>
        
        {/* Requested By */}
        <div className="absolute left-[440.57px] top-[154px] w-24 text-lime-950 text-xs font-light font-montserrat leading-9 tracking-tight">
            Requested by
        </div>
        <div className="absolute left-[440.57px] top-[172px] w-36 h-9 text-lime-950 text-sm font-semibold font-montserrat leading-9 tracking-wide">
            {requestedBy}
        </div>
        <div className="absolute left-[405.25px] top-[170.75px]">
            <img 
            src="/images/user.png" 
            alt="user icon" 
            width={23}
            height={23}
            />
        </div>
        
        {/* Contact */}
        <div className="absolute left-[441.57px] top-[220px] w-20 text-lime-950 text-xs font-light font-montserrat leading-9 tracking-tight">
            Contact
        </div>
        <div className="absolute left-[441.57px] top-[238px] text-lime-950 text-sm font-semibold font-montserrat leading-9 tracking-wide">
            {contact}
        </div>
        <div className="absolute left-[405.26px] top-[234.69px]">
            <img 
            src="/images/email.png" 
            alt="email icon" 
            width={23}
            height={23}
            />
        </div>
        
        {/* R-Location */}
        <div className="absolute left-[441.38px] top-[277px] w-20 text-lime-950 text-xs font-light font-montserrat leading-9 tracking-tight">
            Location
        </div>
        <div className="absolute left-[442.38px] top-[312px] w-44 text-lime-950 text-xs font-light font-montserrat leading-9 tracking-tight">
            {location}
        </div>
        <div className="absolute left-[441.38px] top-[295px] w-36 h-9 text-lime-950 text-sm font-semibold font-montserrat leading-9 tracking-wide">
            {room}
        </div>
        <div className="absolute left-[405.13px] top-[300.72px]">
            <img 
            src="/images/location.png" 
            alt="location icon" 
            width={24}
            height={24}
            />
        </div>
        </div>
    );
    };

    export default RequestDetails;