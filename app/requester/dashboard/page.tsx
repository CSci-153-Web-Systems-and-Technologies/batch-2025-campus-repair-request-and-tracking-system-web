import React from 'react';
import Header from '@/components/Header';
import StatusCard from '@/components/StatusCard';
import { statusCardsData } from '@/data/statusCards';
import SubmitRequestCard from '@/components/SubmitRequestCard';
import RequestsContainer from '@/components/RequestsContainer';
import DarkModeToggle from '@/components/DarkModeToggle';

export default function RequesterDashboard() {
    
    const handleSubmitRequest = () => {
        // Server component cannot use client hooks
    };
    
    return (
        <div>        
        <div className="flex items-center justify-between px-8 pt-6">
          <Header userName="Angielyn" />
          <DarkModeToggle />
        </div>
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
            <RequestsContainer />
            </div>
        </div>
        </div>
    );
    }