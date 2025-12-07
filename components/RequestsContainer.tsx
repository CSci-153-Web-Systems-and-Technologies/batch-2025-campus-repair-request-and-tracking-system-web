    "use client";
    import React from "react";
    import RequestsCard from "@/components/RequestsCard";

    interface RequestData {
    title: string;
    location: string;
    schedule: string;
    status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
    category: string;
    }

    export default function RequestContainer() {
    const requests: RequestData[] = [
        {
        title: "Aircon in Dorm Room 12 leaking water",
        location: "DCST - ROOM 101",
        schedule: "Schedule of Repair - Pending",
        status: "Pending",
        category: "Plumbing",
        },
        {
        title: "Lights not working in Hall 2",
        location: "DCST - HALL 2",
        schedule: "Scheduled Today",
        status: "In Progress",
        category: "Electrical",
        },
        {
        title: "Broken chair in Room 204",
        location: "DCST - ROOM 204",
        schedule: "Completed Last Week",
        status: "Completed",
        category: "Carpentry",
        },
        {
        title: "AC not cooling in Room 101",
        location: "DCST - ROOM 101",
        schedule: "Cancelled by User",
        status: "Cancelled",
        category: "Air Conditioning",
        },
    ];

    return (
        <div className="w-full max-w-[1326px] mx-auto h-[450px] relative">
        <div className="w-full h-full absolute bg-neutral-100 rounded-2xl border border-lime-950"></div>

        <div className="absolute top-3 left-4 text-lime-950 text-sm font-semibold font-montserrat">
            My Requests
        </div>
        <div className="absolute top-9 left-4 text-lime-950 text-xs font-light font-montserrat">
            Easily track updates on your submitted repairs.
        </div>

        <div className="absolute top-20 left-4 w-[calc(100%-2rem)] flex items-center gap-2">
            <div className="w-3/4 h-6 bg-neutral-200 rounded-xl border border-lime-950 relative flex items-center">
            <img
                className="absolute left-2 w-4 h-4"
                src="/images/search.png"
                alt="Search Icon"
            />
            <input
                type="text"
                placeholder="Search requests..."
                className="w-full h-6 pl-8 text-xs text-black font-montserrat rounded-xl bg-transparent outline-none"
            />
            </div>

            <div className="w-1/4 h-6 bg-neutral-200 rounded-xl border border-lime-950 flex items-center justify-between px-2 relative">
            <span className="text-xs text-lime-950 pl-3 font-light font-montserrat">
                All Status
            </span>
            <img
                className="w-4 h-4"
                src="/images/arrow.png"
                alt="Arrow Icon"
            />
            </div>
        </div>

        {/* Request Cards */}
        <div className="absolute top-[150px] left-1/2 transform -translate-x-1/2 w-full px-4 grid grid-cols-4 gap-3">
            {requests.map((req, idx) => (
            <RequestsCard
                key={idx}
                title={req.title}
                location={req.location}
                schedule={req.schedule}
                status={req.status}
                category={req.category}
                className="w-full h-60"
            />
            ))}
        </div>
        </div>
    );
    }
