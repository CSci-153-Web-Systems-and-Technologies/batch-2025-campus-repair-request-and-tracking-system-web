'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import RequestsCard from "@/components/RequestsCard";

type RequestRow = {
    id: string;
    title: string;
    category: string;
    location: string;
    status: string;
    created_at: string;
};

function formatSchedule(dateString?: string) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `Created on ${date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}`;
}

function mapStatusToDisplay(status: string): 'Pending' | 'In Progress' | 'Completed' | 'Cancelled' {
    const statusMap: Record<string, 'Pending' | 'In Progress' | 'Completed' | 'Cancelled'> = {
        'pending': 'Pending',
        'submitted': 'Pending',
        'under_review': 'Pending',
        'in_progress': 'In Progress',
        'completed': 'Completed',
        'cancelled': 'Cancelled',
    };
    return statusMap[status] || 'Pending';
}

interface RequestContainerProps {
    requests: RequestRow[];
    error: any;
}

export default function RequestContainer({ requests, error }: RequestContainerProps) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const statusOptions = [
        { value: "all", label: "All Status" },
        { value: "pending", label: "Pending" },
        { value: "in_progress", label: "In Progress" },
        { value: "completed", label: "Completed" },
        { value: "cancelled", label: "Cancelled" },
    ];

    const filteredRequests = requests?.filter((req) => {
        const matchesSearch = 
            req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.category?.toLowerCase().includes(searchTerm.toLowerCase());
        
        let matchesStatus = false;
        if (statusFilter === "all") {
            matchesStatus = true;
        } else if (statusFilter === "pending") {
            matchesStatus = req.status === 'submitted' || req.status === 'under_review' || req.status === 'pending';
        } else {
            matchesStatus = req.status === statusFilter;
        }
        
        return matchesSearch && matchesStatus;
    }) || [];

    const numRequests = filteredRequests.length;
    const numRows = Math.ceil(numRequests / 4);
    const cardHeight = 240;
    const gap = 12;
    const topSpacing = 150;
    const bottomPadding = 24;
    const containerHeight = topSpacing + (numRows * cardHeight) + ((numRows - 1) * gap) + bottomPadding;
    const minHeight = Math.max(450, containerHeight);

    const selectedStatus = statusOptions.find(opt => opt.value === statusFilter)?.label || "All Status";

    return (
        <div className="w-full max-w-[1326px] mx-auto relative pb-6" style={{ minHeight: `${minHeight}px` }}>
            <div className="w-full h-full absolute bg-neutral-100 rounded-2xl border border-lime-950"></div>

            <div className="absolute top-3 left-4 text-lime-950 text-sm font-semibold font-montserrat">
                My Requests
            </div>
            <div className="absolute top-9 left-4 text-lime-950 text-xs font-light font-montserrat">
                Easily track updates on your submitted repairs.
            </div>

            <div className="absolute top-20 left-4 w-[calc(100%-2rem)] flex items-center gap-2 z-10">
                <div className="w-3/4 h-6 bg-neutral-200 rounded-xl border border-lime-950 relative flex items-center">
                    <img
                        className="absolute left-2 w-4 h-4"
                        src="/images/search.png"
                        alt="Search Icon"
                    />
                    <input
                        type="text"
                        placeholder="Search requests..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-6 pl-8 text-xs text-black font-montserrat rounded-xl bg-transparent outline-none"
                    />
                </div>

                <div className="w-1/4 relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full h-6 bg-neutral-200 rounded-xl border border-lime-950 flex items-center justify-between px-2"
                    >
                        <span className="text-xs text-lime-950 pl-3 font-light font-montserrat">
                            {selectedStatus}
                        </span>
                        <img
                            className="w-4 h-4"
                            src="/images/arrow.png"
                            alt="Arrow Icon"
                        />
                    </button>
                    
                    {isDropdownOpen && (
                        <div className="absolute top-7 left-0 w-full bg-white border border-lime-950 rounded-xl shadow-lg z-20">
                            {statusOptions.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => {
                                        setStatusFilter(option.value);
                                        setIsDropdownOpen(false);
                                    }}
                                    className="w-full px-3 py-2 text-xs text-left text-lime-950 font-montserrat hover:bg-neutral-100 first:rounded-t-xl last:rounded-b-xl"
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="relative top-[150px] w-full px-4 grid grid-cols-4 gap-3 pb-4">
                {error && (
                    <div className="col-span-4 text-red-600 text-sm">{error.message}</div>
                )}
                {!error && filteredRequests.length === 0 && (
                    <div className="col-span-4 text-sm text-lime-950">
                        {requests?.length === 0 ? "No requests yet." : "No requests match your search."}
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
                        className="w-full h-60"
                        onClick={() => router.push(`/requester/request-details?id=${req.id}`)}
                    />
                ))}
            </div>
        </div>
    );
}
