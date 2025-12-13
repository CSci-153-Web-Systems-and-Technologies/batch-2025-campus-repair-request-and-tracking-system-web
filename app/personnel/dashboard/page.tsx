import React from 'react';
import Header from '@/components/Header';
import StatusCard from '@/components/StatusCard';
import MainContainer from '@/components/PersonnelRequests';
import { createClient } from '@/utils/supabase/server';


export default async function PersonnelDashboard() {
    const supabase = createClient();
    
    const {
        data: { user },
    } = await supabase.auth.getUser();
    
    let statusCounts = {
        total: 0,
        pending: 0,
        inProgress: 0,
        completed: 0,
    };
    
    const { data: requests, error } = await supabase
        .from('requests')
        .select('status');
    
    if (requests) {
        statusCounts.total = requests.filter((r) => r.status !== 'cancelled').length;
        statusCounts.pending = requests.filter((r) => r.status === 'under_review' || r.status === 'submitted' || r.status === 'pending').length;
        statusCounts.inProgress = requests.filter((r) => r.status === 'in_progress').length;
        statusCounts.completed = requests.filter((r) => r.status === 'completed').length;
    }
    
    const statusCardsData = [
        {
            id: 1,
            count: statusCounts.total,
            status: 'Total Request',
            iconSrc: '/images/request.png',
            iconAlt: 'Total Request',
        },
        {
            id: 2,
            count: statusCounts.pending,
            status: 'Pending',
            iconSrc: '/images/pending.png',
            iconAlt: 'Pending Request',
        },
        {
            id: 3,
            count: statusCounts.inProgress,
            status: 'In Progress',
            iconSrc: '/images/inprogress.png',
            iconAlt: 'In Progress Request',
        },
        {
            id: 4,
            count: statusCounts.completed,
            status: 'Completed',
            iconSrc: '/images/completed.png',
            iconAlt: 'Completed Request',
        },
    ];

    return (
        <div>        
        <Header userName={user?.user_metadata?.full_name || 'Personnel'} />
        <div className="min-h-screen px-4 md:p-8 pt-4 md:pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 pt-5 lg:grid-cols-4 gap-4 md:gap-10 md:ml-14 md:mr-14">
            {statusCardsData.map((card) => (
            <StatusCard
                key={card.id}
                count={card.count}
                status={card.status}
                iconSrc={card.iconSrc}
                iconAlt={card.iconAlt}
            />
            ))}
        </div>
        <div className="pt-6 md:pt-10 md:mx-14">
            <MainContainer />
        </div>

        </div>
        </div>
    );
    }