'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RequestsCard from '@/components/RequestsCard';

type RequestRow = {
    id: string;
    title: string;
    category: string;
    location: string;
    status: string;
    created_at: string;
};

function formatSchedule(dateString?: string) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `Created on ${date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    })}`;
}

function mapStatusToDisplay(
    status: string
): 'Pending' | 'In Progress' | 'Completed' | 'Cancelled' {
    const statusMap: Record<
        string,
        'Pending' | 'In Progress' | 'Completed' | 'Cancelled'
    > = {
        pending: 'Pending',
        submitted: 'Pending',
        under_review: 'Pending',
        in_progress: 'In Progress',
        completed: 'Completed',
        cancelled: 'Cancelled',
    };
    return statusMap[status] || 'Pending';
}

interface RequestContainerProps {
    requests: RequestRow[];
    error: any;
}

export default function RequestContainer({
    requests,
    error,
}: RequestContainerProps) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const statusOptions = [
        { value: 'all', label: 'All Status' },
        { value: 'pending', label: 'Pending' },
        { value: 'in_progress', label: 'In Progress' },
        { value: 'completed', label: 'Completed' },
        { value: 'cancelled', label: 'Cancelled' },
    ];

    const filteredRequests =
        requests?.filter((req) => {
            const matchesSearch =
                req.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                req.location
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                req.category?.toLowerCase().includes(searchTerm.toLowerCase());

            let matchesStatus = false;
            if (statusFilter === 'all') {
                matchesStatus = true;
            } else if (statusFilter === 'pending') {
                matchesStatus =
                    req.status === 'submitted' ||
                    req.status === 'under_review' ||
                    req.status === 'pending';
            } else {
                matchesStatus = req.status === statusFilter;
            }

            return matchesSearch && matchesStatus;
        }) || [];

    const selectedStatus =
        statusOptions.find((opt) => opt.value === statusFilter)?.label ||
        'All Status';

    return (
        <div className="w-full relative pb-6">
            <div className="w-full min-h-[450px] bg-neutral-100 rounded-2xl border border-lime-950 p-4 sm:p-6">
                <div className="mb-4 sm:mb-6">
                    <h2 className="text-lime-950 text-base sm:text-lg font-semibold font-montserrat mb-1">
                        My Requests
                    </h2>
                    <p className="text-lime-950 text-xs sm:text-sm font-light font-montserrat">
                        Easily track updates on your submitted repairs.
                    </p>
                </div>

                <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                    <div className="w-full sm:flex-1 h-9 sm:h-10 bg-neutral-200 rounded-xl border border-lime-950 relative flex items-center">
                        <img
                            className="absolute left-2 sm:left-3 w-4 h-4"
                            src="/images/search.png"
                            alt="Search Icon"
                        />
                        <input
                            type="text"
                            placeholder="Search requests..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-full pl-8 sm:pl-10 pr-3 text-xs sm:text-sm text-black font-montserrat rounded-xl bg-transparent outline-none"
                        />
                    </div>

                    <div className="w-full sm:w-48 relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full h-9 sm:h-10 bg-neutral-200 rounded-xl border border-lime-950 flex items-center justify-between px-3 sm:px-4"
                        >
                            <span className="text-xs sm:text-sm text-lime-950 font-light font-montserrat truncate">
                                {selectedStatus}
                            </span>
                            <img
                                className="w-4 h-4 flex-shrink-0 ml-2"
                                src="/images/arrow.png"
                                alt="Arrow Icon"
                            />
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute top-full mt-1 left-0 w-full bg-white border border-lime-950 rounded-xl shadow-lg z-20 overflow-hidden">
                                {statusOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => {
                                            setStatusFilter(option.value);
                                            setIsDropdownOpen(false);
                                        }}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-left text-lime-950 font-montserrat hover:bg-neutral-100 transition-colors"
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                    {error && (
                        <div className="col-span-full text-red-600 text-sm p-4 bg-red-50 rounded-lg">
                            {error.message}
                        </div>
                    )}
                    {!error && filteredRequests.length === 0 && (
                        <div className="col-span-full text-sm text-lime-950 text-center py-8">
                            {requests?.length === 0
                                ? 'No requests yet.'
                                : 'No requests match your search.'}
                        </div>
                    )}
                    {filteredRequests.map((req) => (
                        <RequestsCard
                            key={req.id}
                            title={req.title}
                            location={req.location}
                            schedule={formatSchedule(req.created_at)}
                            status={mapStatusToDisplay(req.status)}
                            category={req.category}
                            className="w-full h-56 sm:h-60"
                            onClick={() => router.push(`/requester/request-details?id=${req.id}`)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}