    export interface StatusCardData {
    id: number;
    count: number;
    status: string;
    iconSrc: string;
    iconAlt: string;
    page?: string;
    }

    export const statusCardsData: StatusCardData[] = [
   //requester-dashboard cards
    { id: 1, count: 3, status: 'Requests', iconSrc: '/images/request.png', iconAlt: 'Requests' },
    { id: 2, count: 2, status: 'Pending', iconSrc: '/images/pending.png', iconAlt: 'Pending icon' },
    { id: 3, count: 1, status: 'In Progress', iconSrc: '/images/inprogress.png', iconAlt: 'In progress icon' },
    { id: 4, count: 5, status: 'Completed', iconSrc: '/images/completed.png', iconAlt: 'Completed icon' },
    ];