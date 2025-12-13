"use client";

import React, { useEffect, useMemo, useState } from "react";
import RequestRow from "@/components/RequestRow";
import { createClient } from "@/utils/supabase/client";

interface Request {
    id: string;
    title: string;
    category: string;
    location: string;
    status: string;
    created_at: string;
}

interface RequestContainer2Props {
    search?: string;
    status?: string;
    department?: string;
    category?: string;
}

const RequestContainer2: React.FC<RequestContainer2Props> = ({
    search = "",
    status = "all",
    department = "all",
    category = "all",
}) => {
    const [requests, setRequests] = useState<Request[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequests = async () => {
        const supabase = createClient();
        const { data, error } = await supabase
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
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching requests:', error);
        } else {
            const formattedData = (data || []).map((req: any) => ({
                id: req.id,
                title: req.title,
                location: req.location,
                status: req.status,
                created_at: req.created_at,
                category: req.request_categories?.[0]?.categories?.name || 'Uncategorized'
            }));
            setRequests(formattedData);
        }
        setLoading(false);
    };

    fetchRequests();
    }, []);

    const filteredRequests = useMemo(() => {
        const query = search.trim().toLowerCase();
        const statusFilter = status.trim().toLowerCase();
        const departmentFilter = department.trim().toLowerCase();
        const categoryFilter = category.trim().toLowerCase();

        return requests.filter((req) => {
            const matchesQuery = query
                ? req.title.toLowerCase().includes(query) || req.category.toLowerCase().includes(query) || req.location.toLowerCase().includes(query)
                : true;

            let matchesStatus = true;
            if (statusFilter && statusFilter !== "all") {
                if (statusFilter === "pending") {
                    matchesStatus = req.status === 'submitted' || req.status === 'under_review' || req.status === 'pending';
                } else {
                    matchesStatus = req.status.toLowerCase() === statusFilter;
                }
            }

            const matchesDepartment = departmentFilter && departmentFilter !== "all"
                ? req.location.toLowerCase().includes(departmentFilter)
                : true;

            const matchesCategory = categoryFilter && categoryFilter !== "all"
                ? req.category.toLowerCase() === categoryFilter
                : true;

            return matchesQuery && matchesStatus && matchesDepartment && matchesCategory;
        });
    }, [requests, search, status, department, category]);

    const isFiltered = Boolean(search?.trim()) || (status && status !== "all") || (department && department !== "all") || (category && category !== "all");

return (
        <div className="w-full mt-4">
        <div className="w-full">
            <div className="relative w-full min-h-[500px] rounded-2xl">
            <div className="absolute inset-0 bg-neutral-100 rounded-2xl border border-lime-950"></div>

            <div className="absolute left-12 right-0 top-0 h-10 px-6 z-10 grid grid-cols-12 items-center">
                <div className="col-span-2 text-lime-950 text-sm font-semibold truncate">
                Request
                </div>
                <div className="ml-3 col-span-2 text-lime-950 text-sm font-semibold truncate">
                Location
                </div>
                <div className="col-span-2 ml-14 text-lime-950 text-sm font-semibold truncate">
                Status
                </div>
                <div className="col-span-2 text-lime-950 ml-16 text-sm font-semibold truncate">
                Priority
                </div>
                <div className="col-span-2 text-lime-950 ml-12  text-sm font-semibold truncate">
                Created
                </div>
                <div className="col-span-.5 text-lime-950 ml-10 text-sm font-semibold truncate text-right">
                Actions
                </div>
            </div>

            <div className="absolute left-0 right-0 top-[40px] border border-black" />

            <div className="absolute top-[60px] left-0 right-0 bottom-0 overflow-y-auto px-4">
                {loading ? (
                    <div className="flex justify-center items-center h-32">
                    <div className="text-lime-950 text-sm">Loading requests...</div>
                    </div>
                ) : filteredRequests.length === 0 ? (
                    <div className="flex justify-center items-center h-32">
                    <div className="text-lime-950 text-sm">
                        {isFiltered ? "No matching requests" : "No requests found"}
                    </div>
                    </div>
                ) : (
                    <div className="space-y-3">
                    {filteredRequests.map((request) => (
                        <RequestRow key={request.id} request={request} />
                    ))}
                    </div>
                )}
            </div>
            </div>
        </div>
        </div>
    );
    };

    export default RequestContainer2;