import React from 'react';
import Header from '@/components/Header';
import StatusCard from '@/components/StatusCard';
import SubmitRequestCard from '@/components/SubmitRequestCard';
import RequestsContainer from '@/components/RequestsContainer';
import { createClient } from '@/utils/supabase/server';

export default async function RequesterDashboard() {
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
    
    if (user) {
        const { data: requests, error } = await supabase
            .from('requests')
            .select('status')
            .eq('requester_id', user.id);
        
        if (requests) {
            statusCounts.total = requests.filter((r) => r.status !== 'cancelled').length;
            statusCounts.pending = requests.filter((r) => r.status === 'under_review' || r.status === 'submitted').length;
            statusCounts.inProgress = requests.filter((r) => r.status === 'in_progress').length;
            statusCounts.completed = requests.filter((r) => r.status === 'completed').length;
        }
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
    
    let requests: any[] = [];
    let requestsError: any = null;
    
    if (user) {
        const result = await supabase
            .from('requests')
            .select(`
                id, 
                title, 
                location, 
                status, 
                created_at,
                request_categories(
                    categories(name)
                )
            `)
            .eq('requester_id', user.id)
            .order('created_at', { ascending: false });
        
        const formattedData = (result.data || []).map((req: any) => ({
            id: req.id,
            title: req.title,
            location: req.location,
            status: req.status,
            created_at: req.created_at,
            category: req.request_categories?.[0]?.categories?.name || 'Uncategorized'
        }));
        
        requests = formattedData;
        requestsError = result.error;
    }
    
    return (
        <div>        
        <Header userName={user?.user_metadata?.full_name || 'User'} />
        <div className="min-h-screen p-8 pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 ml-14 mr-14">
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
            <div className="mx-4 sm:mx-6 lg:mx-8 mb-6 sm:mb-8 lg:mb-10">
            <SubmitRequestCard />
            </div>
            <div className="pt-1 flex flex-wrap justify-center">
            <RequestsContainer requests={requests} error={requestsError} />
            </div>
        </div>
        </div>
    );
    }