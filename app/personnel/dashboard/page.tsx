    import React from 'react';
    import Header from '@/components/Header';
    import StatusCard from '@/components/StatusCard';
    import { statusCardsData } from '@/data/statusCards';
    import MainContainer from '@/components/PersonnelRequests';


    export default function RequesterDashboard() {
    return (
        <div>        
        <Header userName="Angielyn" />
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
        <div className="pt-10 flex pl-8 pr-8 flex-wrap justify-center">
            <MainContainer   />
        </div>

        </div>
        </div>
    );
    }