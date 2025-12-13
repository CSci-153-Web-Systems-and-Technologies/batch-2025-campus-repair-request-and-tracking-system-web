'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

interface ManagementActionsProps {
    requestId?: string;
}

const ManagementActions: React.FC<ManagementActionsProps> = ({ requestId }) => {
    const [status, setStatus] = useState('submitted');
    const [priority, setPriority] = useState('Low');
    const [technician, setTechnician] = useState('');
    const [scheduleDate, setScheduleDate] = useState('');
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateMessage, setUpdateMessage] = useState('');

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

    const handleStatusChange = async (newStatus: string) => {
        setStatus(newStatus);
        setShowStatusDropdown(false);
    };

    const handleUpdate = async () => {
        if (!requestId) {
            setUpdateMessage('Request ID not available');
            return;
        }

        setIsUpdating(true);
        try {
            const supabase = createClient();
            const { error } = await supabase
                .from('requests')
                .update({ status: status })
                .eq('id', requestId);

            if (error) {
                setUpdateMessage(`Error: ${error.message}`);
                console.error('Update error details:', error);
            } else {
                setUpdateMessage('Status updated successfully');
                setTimeout(() => setUpdateMessage(''), 3000);
            }
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Failed to update status';
            setUpdateMessage(errorMsg);
            console.error('Update failed:', err);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="w-full max-w-[788px] mx-4 sm:mx-6 lg:mx-auto">
            <div className="bg-neutral-100 rounded-2xl border border-lime-950 p-4 sm:p-5 lg:p-6">
                
                {/* Header */}
                <h2 className="font-electrolize text-lime-950 text-base sm:text-lg font-semibold leading-tight tracking-wide mb-1">
                    Management Actions
                </h2>
                <p className="text-lime-950 text-sm sm:text-base leading-tight tracking-wide mb-4 sm:mb-6">
                    Update requests, status, priority, and assignment
                </p>
                
                {/* Form Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    
                    {/* Status Dropdown */}
                    <div className="flex flex-col">
                        <label className="text-lime-950 text-sm font-semibold leading-tight tracking-wide mb-2">
                            Status
                        </label>
                        <div className="relative dropdown-wrapper">
                            <button
                                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                                className={`w-full h-9 sm:h-8 rounded-lg px-3 flex items-center justify-between transition-colors ${
                                    status === 'submitted' ? 'bg-zinc-300' :
                                    status === 'under_review' ? 'bg-yellow-100' :
                                    status === 'in_progress' ? 'bg-sky-100' :
                                    status === 'completed' ? 'bg-green-100' :
                                    status === 'cancelled' ? 'bg-red-100' :
                                    'bg-zinc-300'
                                }`}
                            >
                                <span className="text-lime-950 text-xs sm:text-sm truncate">{status}</span>
                                <img className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ml-2" src="/images/arrow.png" alt="dropdown icon" />
                            </button>
                            {showStatusDropdown && (
                                <div className="absolute z-20 w-full mt-1 bg-white border border-lime-950 rounded-lg shadow-lg overflow-hidden">
                                    {['submitted', 'under_review', 'in_progress', 'completed', 'cancelled'].map((s) => {
                                        const bgColor = 
                                            s === 'under_review' ? 'bg-yellow-100' : 
                                            s === 'in_progress' ? 'bg-sky-100' : 
                                            s === 'completed' ? 'bg-green-100' : 
                                            s === 'cancelled' ? 'bg-red-100' : 
                                            'bg-zinc-300';
                                        return (
                                            <button
                                                key={s}
                                                onClick={() => handleStatusChange(s)}
                                                disabled={isUpdating}
                                                className={`w-full text-left px-3 py-2 text-xs sm:text-sm hover:opacity-80 disabled:opacity-50 transition-opacity ${bgColor}`}
                                            >
                                                {s}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Priority Dropdown */}
                    <div className="flex flex-col">
                        <label className="text-lime-950 text-sm font-semibold leading-tight tracking-wide mb-2">
                            Priority
                        </label>
                        <div className="relative dropdown-wrapper">
                            <button
                                onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}
                                className={`w-full h-9 sm:h-8 rounded-lg px-3 flex items-center justify-between transition-colors ${
                                    priority === 'High' ? 'bg-red-100' :
                                    priority === 'Medium' ? 'bg-yellow-100' :
                                    priority === 'Low' ? 'bg-green-100' :
                                    'bg-zinc-300'
                                }`}
                            >
                                <span className="text-lime-950 text-xs sm:text-sm truncate">{priority}</span>
                                <img className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ml-2" src="/images/arrow.png" alt="dropdown icon" />
                            </button>
                            {showPriorityDropdown && (
                                <div className="absolute z-20 w-full mt-1 bg-white border border-lime-950 rounded-lg shadow-lg overflow-hidden">
                                    {['Low', 'Medium', 'High'].map((p) => {
                                        const bgColor = 
                                            p === 'High' ? 'bg-red-100' : 
                                            p === 'Medium' ? 'bg-yellow-100' : 
                                            p === 'Low' ? 'bg-green-100' : 
                                            '';
                                        return (
                                            <button
                                                key={p}
                                                onClick={() => { 
                                                    setPriority(p); 
                                                    setShowPriorityDropdown(false); 
                                                }}
                                                className={`w-full text-left px-3 py-2 text-xs sm:text-sm hover:opacity-80 transition-opacity ${bgColor}`}
                                            >
                                                {p}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Technician Input */}
                    <div className="flex flex-col">
                        <label className="text-lime-950 text-sm font-semibold leading-tight tracking-wide mb-2">
                            Assigned Technician
                        </label>
                        <input
                            type="text"
                            value={technician}
                            onChange={(e) => setTechnician(e.target.value)}
                            placeholder="Enter technician name"
                            className="w-full h-9 sm:h-8 bg-zinc-300 rounded-lg px-3 text-lime-950 text-xs sm:text-sm placeholder:text-lime-950 placeholder:opacity-60 focus:outline-none focus:ring-2 focus:ring-lime-950"
                        />
                    </div>
                    
                    {/* Schedule Input */}
                    <div className="flex flex-col">
                        <label className="text-lime-950 text-sm font-semibold leading-tight tracking-wide mb-2">
                            Schedule Repair
                        </label>
                        <input
                            type="date"
                            value={scheduleDate}
                            onChange={(e) => setScheduleDate(e.target.value)}
                            className="w-full h-9 sm:h-8 bg-zinc-300 rounded-lg px-3 text-lime-950 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-lime-950"
                        />
                    </div>
                </div>
                
                {/* Update Button and Message */}
                <div className="flex flex-col items-center justify-center mt-6 gap-3">
                    <button 
                        onClick={handleUpdate}
                        disabled={isUpdating}
                        className="w-full sm:w-32 h-10 sm:h-9 rounded-[5px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-black/95 bg-white flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 transition-colors"
                    >
                        <span className="text-lime-950 text-xs sm:text-sm font-medium">
                            {isUpdating ? 'Updating...' : 'Update'}
                        </span>
                    </button>
                    {updateMessage && (
                        <p className={`text-xs sm:text-sm text-center ${updateMessage.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                            {updateMessage}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManagementActions;