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
        <div className="relative w-[788px] h-96 bg-neutral-100 rounded-2xl border border-lime-950 flex items-center justify-center">
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
        <div className="relative w-[788px] h-96">
        <div className="absolute left-0 top-0 w-[788px] h-96 bg-neutral-100 rounded-2xl border border-lime-950" />
        
        {/* Title */}
        <div className="absolute left-[24.07px] font-electrolize top-[18px] w-40 h-12 text-lime-950 text-base font-semibold leading-9 tracking-wide">
            {request.title}
        </div>
        
        {/* Description */}
        <div className="text-lime-950 text-base leading-9 tracking-wide absolute left-[24.07px] top-[43px] w-96 ">
            {request.description || 'No description provided'}
        </div>
        
        {/* Status, Priority, Category - Responsive Container */}
        <div className="absolute left-[24.07px] top-[93px] flex flex-wrap items-center gap-2 max-w-[740px]">
            {/* Status */}
            <div className={`h-6 px-5 py-2 ${statusStyle.bg} rounded-3xl shadow-[0px_4px_8px_0px_rgba(0,0,0,0.10)] inline-flex justify-center items-center border border-black`}>
            <div className={`${statusStyle.text} text-sm font-semibold font-electrolize leading-5 whitespace-nowrap`}>
                {statusStyle.icon} {request.status}
            </div>
            </div>
            
            {/* Priority */}
            <div className="h-6 px-5 py-2 bg-red-100 rounded-3xl shadow-[0px_4px_8px_0px_rgba(0,0,0,0.10)] inline-flex justify-center items-center">
            <div className="text-red-700 text-sm font-semibold font-electrolize leading-5 whitespace-nowrap">
                {request.priority || 'Medium'}
            </div>
            </div>
            
            {/* Category */}
            <div className="h-6 px-5 py-2 rounded-3xl shadow-[0px_4px_8px_0px_rgba(0,0,0,0.10)] outline outline-1 outline-offset-[-1px] outline-black inline-flex justify-center items-center">
            <div className="text-black text-sm font-semibold font-electrolize leading-5 whitespace-nowrap">
                {request.category}
            </div>
            </div>
        </div>
        
        {/* Created */}
        <div className="absolute left-[53.37px] top-[227px] w-20 text-lime-950 text-xs font-light leading-9 tracking-tight">
            Created
        </div>
        <div className="absolute left-[53.37px] top-[245px] w-40 text-lime-950 text-sm font-semibold font-montserrat leading-9 tracking-wide">
            {formatDate(request.created_at)}
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
            {formatDate(request.schedule_date)}
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
            {request.building || 'N/A'}
        </div>
        <div className="absolute left-[52.32px] top-[164px] w-36 h-9 text-lime-950 text-sm font-semibold font-montserrat leading-9 tracking-wide">
            {request.location}
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
            {requesterName}
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
            {requesterEmail}
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
            {request.building || 'N/A'}
        </div>
        <div className="absolute left-[441.38px] top-[295px] w-36 h-9 text-lime-950 text-sm font-semibold font-montserrat leading-9 tracking-wide">
            {request.location}
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