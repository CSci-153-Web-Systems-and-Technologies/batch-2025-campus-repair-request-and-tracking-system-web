import React from 'react';
import { createClient } from '@/utils/supabase/server';

interface RequestDetailsProps {
    requestId: string;
}

async function getRequestDetails(requestId: string) {
    const supabase = createClient();
    
    const { data: request, error } = await supabase
        .from('requests')
        .select(`
            *,
            profile:requester_id (
                full_name,
                email_address
            )
        `)
        .eq('id', requestId)
        .single();
    
    if (error || !request) {
        return null;
    }
    
    return request;
}

const RequestDetails = async ({ requestId }: RequestDetailsProps) => {
    const request = await getRequestDetails(requestId);
    
    if (!request) {
        return (
            <div className="w-full max-w-[788px] min-h-[384px] bg-neutral-100 rounded-2xl border border-lime-950 flex items-center justify-center mx-4">
                <p className="text-red-600 text-sm">Request not found</p>
            </div>
        );
    }
    
    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: '2-digit', 
            day: '2-digit', 
            year: 'numeric' 
        });
    };
    
    const getStatusStyle = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'completed':
                return { bg: 'bg-green-100', text: 'text-green-600', icon: '✅' };
            case 'pending':
                return { bg: 'bg-yellow-100', text: 'text-orange-600', icon: '⏳' };
            case 'in progress':
                return { bg: 'bg-sky-100', text: 'text-sky-600', icon: '🔨' };
            case 'cancelled':
                return { bg: 'bg-red-100', text: 'text-red-600', icon: '❌' };
            default:
                return { bg: 'bg-gray-100', text: 'text-gray-600', icon: '' };
        }
    };
    
    const statusStyle = getStatusStyle(request.status);
    const requesterName = request.profile?.full_name || 'Unknown';
    const requesterEmail = request.profile?.email_address || 'N/A';

    return (
        <div className="w-full max-w-[788px] mx-4 sm:mx-6 lg:mx-auto">
            <div className="bg-neutral-100 rounded-2xl border border-lime-950 p-4 sm:p-5 lg:p-6">
                
                {/* Title */}
                <h1 className="font-electrolize text-lime-950 text-base sm:text-lg font-semibold leading-tight tracking-wide mb-3 break-words">
                    {request.title}
                </h1>
                
                {/* Description */}
                <p className="text-lime-950 text-sm sm:text-base leading-relaxed tracking-wide mb-4 break-words">
                    {request.description ?? ''}
                </p>
                
                {/* Status, Priority, Category Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {/* Status */}
                    <div className={`h-7 px-4 py-1.5 ${statusStyle.bg} rounded-3xl shadow-[0px_4px_8px_0px_rgba(0,0,0,0.10)] inline-flex justify-center items-center border border-black`}>
                        <span className={`${statusStyle.text} text-xs sm:text-sm font-semibold font-electrolize whitespace-nowrap`}>
                            {statusStyle.icon} {request.status}
                        </span>
                    </div>
                    
                    {/* Priority */}
                    <div className="h-7 px-4 py-1.5 bg-red-100 rounded-3xl shadow-[0px_4px_8px_0px_rgba(0,0,0,0.10)] inline-flex justify-center items-center">
                        <span className="text-red-700 text-xs sm:text-sm font-semibold font-electrolize whitespace-nowrap">
                            {request.priority || 'Medium'}
                        </span>
                    </div>
                    
                    {/* Category */}
                    <div className="h-7 px-4 py-1.5 rounded-3xl shadow-[0px_4px_8px_0px_rgba(0,0,0,0.10)] border border-black inline-flex justify-center items-center">
                        <span className="text-black text-xs sm:text-sm font-semibold font-electrolize whitespace-nowrap">
                            {request.category}
                        </span>
                    </div>
                </div>
                
                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    
                    {/* Left Column */}
                    <div className="space-y-6">
                        {/* Location */}
                        <div className="flex items-start gap-3">
                            <img 
                                src="/images/location.png" 
                                alt="location icon" 
                                className="w-5 h-5 sm:w-6 sm:h-6 mt-1 flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-lime-950 text-xs font-light font-montserrat">Location</p>
                                <p className="text-lime-950 text-sm font-semibold font-montserrat mt-1 break-words">
                                    {request.location}
                                </p>
                                {request.building && (
                                    <p className="text-lime-950 text-xs font-light font-montserrat mt-1">
                                        {request.building}
                                    </p>
                                )}
                            </div>
                        </div>
                        
                        {/* Created */}
                        <div className="flex items-start gap-3">
                            <img 
                                src="/images/calendar.png" 
                                alt="calendar icon" 
                                className="w-5 h-5 sm:w-6 sm:h-6 mt-1 flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-lime-950 text-xs font-light font-montserrat">Created</p>
                                <p className="text-lime-950 text-sm font-semibold font-montserrat mt-1 break-words">
                                    {formatDate(request.created_at)}
                                </p>
                            </div>
                        </div>
                        
                        {/* Schedule */}
                        <div className="flex items-start gap-3">
                            <img 
                                src="/images/clock.png" 
                                alt="schedule icon" 
                                className="w-5 h-5 sm:w-6 sm:h-6 mt-1 flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-lime-950 text-xs font-light font-montserrat">Schedule of Repair</p>
                                <p className="text-lime-950 text-sm font-semibold font-montserrat mt-1 break-words">
                                    {formatDate(request.schedule_date)}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Requested By */}
                        <div className="flex items-start gap-3">
                            <img 
                                src="/images/user.png" 
                                alt="user icon" 
                                className="w-5 h-5 sm:w-6 sm:h-6 mt-1 flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-lime-950 text-xs font-light font-montserrat">Requested by</p>
                                <p className="text-lime-950 text-sm font-semibold font-montserrat mt-1 break-words">
                                    {requesterName}
                                </p>
                            </div>
                        </div>
                        
                        {/* Contact */}
                        <div className="flex items-start gap-3">
                            <img 
                                src="/images/email.png" 
                                alt="email icon" 
                                className="w-5 h-5 sm:w-6 sm:h-6 mt-1 flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-lime-950 text-xs font-light font-montserrat">Contact</p>
                                <p className="text-lime-950 text-sm font-semibold font-montserrat mt-1 break-words">
                                    {requesterEmail}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequestDetails;