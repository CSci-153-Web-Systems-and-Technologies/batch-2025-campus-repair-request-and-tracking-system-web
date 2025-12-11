'use client';

import React, { useState, useEffect } from 'react';

const ManagementActions: React.FC = () => {
    const [status, setStatus] = useState('Submitted');
    const [priority, setPriority] = useState('Low');
    const [technician, setTechnician] = useState('');
    const [scheduleDate, setScheduleDate] = useState('');
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.dropdown-wrapper')) {
                setShowStatusDropdown(false);
                setShowPriorityDropdown(false);
            }
        };

        if (showStatusDropdown || showPriorityDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showStatusDropdown, showPriorityDropdown]);

    return (
        <div className="w-full max-w-[788px] min-h-[192px] relative">

        <div className="w-full h-full bg-neutral-100 rounded-2xl border border-lime-950 p-6">
        
            <div className="font-electrolize text-lime-950 text-base font-semibold leading-tight tracking-wide">
            Management Actions
            </div>
            
            <div className="text-lime-950 text-base leading-tight tracking-wide" style={{marginTop: '3px'}}>
            Update requests, status, priority, and assignment
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">

            {/* Status */}
            <div className="flex flex-col">
                <label className="text-lime-950 text-sm leading-9 font-semibold tracking-wide mb-1">
                Status
                </label>
                <div className="relative dropdown-wrapper">
                <button
                    onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                    className={`w-full h-7 rounded-lg px-3 flex items-center justify-between ${
                        status === 'Submitted' ? 'bg-zinc-300' :
                        status === 'In Progress' ? 'bg-sky-100' :
                        status === 'Pending' ? 'bg-yellow-100' :
                        status === 'Completed' ? 'bg-green-100' :
                        status === 'Cancelled' ? 'bg-red-100' :
                        'bg-zinc-300'
                    }`}
                >
                    <span className="text-lime-950 text-xs">{status}</span>
                    <img className="size-5" src="/images/arrow.png" alt="dropdown icon" />
                </button>
                {showStatusDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-lime-950 rounded-lg shadow-lg overflow-hidden">
                    {['Pending', 'In Progress', 'Completed', 'Cancelled'].map((s) => {
                        const bgColor = s === 'In Progress' ? 'bg-sky-100' : s === 'Pending' ? 'bg-yellow-100' : s === 'Completed' ? 'bg-green-100' : s === 'Cancelled' ? 'bg-red-100' : '';
                        return (
                        <button
                        key={s}
                        onClick={() => { setStatus(s); setShowStatusDropdown(false); }}
                        className={`w-full text-left px-3 py-2 text-xs hover:opacity-80 ${bgColor}`}
                        >
                        {s}
                        </button>
                        );
                    })}
                    </div>
                )}
                </div>
            </div>
            
            {/* Priority */}
            <div className="flex flex-col">
                <label className="text-lime-950 text-sm font-semibold leading-9 tracking-wide mb-1">
                Priority
                </label>
                <div className="relative dropdown-wrapper">
                <button
                    onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}
                    className={`w-full h-7 rounded-lg px-3 flex items-center justify-between ${
                        priority === 'High' ? 'bg-red-100' :
                        priority === 'Medium' ? 'bg-yellow-100' :
                        priority === 'Low' ? 'bg-green-100' :
                        'bg-zinc-300'
                    }`}
                >
                    <span className="text-lime-950 text-xs">{priority}</span>
                    <img className="size-5" src="/images/arrow.png" alt="dropdown icon" />
                </button>
                {showPriorityDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-lime-950 rounded-lg shadow-lg overflow-hidden">
                    {['Low', 'Medium', 'High'].map((p) => {
                        const bgColor = p === 'High' ? 'bg-red-100' : p === 'Medium' ? 'bg-yellow-100' : p === 'Low' ? 'bg-green-100' : '';
                        return (
                        <button
                        key={p}
                        onClick={() => { setPriority(p); setShowPriorityDropdown(false); }}
                        className={`w-full text-left px-3 py-2 text-xs hover:opacity-80 ${bgColor}`}
                        >
                        {p}
                        </button>
                        );
                    })}
                    </div>
                )}
                </div>
            </div>
            
            {/* Technician */}
            <div className="flex flex-col">
                <label className="text-lime-950 text-sm font-semibold leading-9 tracking-wide mb-1">
                Assigned Technician
                </label>
                <input
                type="text"
                value={technician}
                onChange={(e) => setTechnician(e.target.value)}
                placeholder="Enter technician name"
                className="w-full h-7 bg-zinc-300 rounded-lg px-3 text-lime-950 text-xs placeholder:text-lime-950 placeholder:opacity-60 focus:outline-none"
                />
            </div>
            
            {/* Schedule */}
            <div className="flex flex-col">
                <label className="text-lime-950 text-sm font-semibold leading-9 tracking-wide mb-1">
                Schedule Repair
                </label>
                <input
                type="date"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                className="w-full h-7 bg-zinc-300 rounded-lg px-3 text-lime-950 text-xs focus:outline-none"
                />
            </div>
            </div>
            
            {/* Update */}
            <div className="flex justify-center mt-6">
            <button className="w-32 h-8 rounded-[5px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-black/95 bg-white flex items-center justify-center hover:bg-gray-100">
                <span className="text-lime-950 text-xs font-medium">Update</span>
            </button>
            </div>
        </div>
        </div>
    );
};

export default ManagementActions;