    "use client";

    import React from "react";
    import RequestRow from "@/components/RequestRow";

    const RequestContainer2: React.FC = () => {
    return (
        <div className="w-full mt-4">
        <div className="w-full">
            <div className="relative w-full min-h-[500px] rounded-2xl">
            {/* Background */}
            <div className="absolute inset-0 bg-neutral-100 rounded-2xl border border-lime-950"></div>

            {/* Grid-based header - will wrap on smaller screens */}
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

            {/* Header divider */}
            <div className="absolute left-0 right-0 top-[40px] border border-black" />

            {/* Content area */}
            <div className="absolute top-[60px] left-0 right-0 bottom-0 overflow-y-auto px-4">
                <div className="space-y-3">
                <RequestRow />
                <RequestRow />
                <RequestRow />
                <RequestRow />
                <RequestRow />
                </div>
            </div>
            </div>
        </div>
        </div>
    );
    };

    export default RequestContainer2;