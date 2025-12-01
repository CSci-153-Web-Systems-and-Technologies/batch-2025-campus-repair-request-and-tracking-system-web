    import React from 'react';
    import Header from '@/components/Header';
    import StatusCard from '@/components/StatusCard';
    import { statusCardsData } from '@/data/statusCards';

    export default function RequesterDashboard() {
    return (
        <div>        
        <Header userName="Angielyn" />
        <div className="min-h-screen p-8 pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
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
        </div>
        </div>
    );
    }