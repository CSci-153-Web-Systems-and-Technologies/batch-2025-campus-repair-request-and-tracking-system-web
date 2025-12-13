import RequestsCard from "@/components/RequestsCard";
import { createClient } from "@/utils/supabase/server";

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

export default async function RequestContainer() {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return (
            <div className="w-full max-w-[1326px] mx-auto h-[450px] relative flex items-center justify-center text-sm text-red-600">
                Please sign in to view your requests.
            </div>
        );
    }

    const { data: requests, error } = await supabase
        .from("requests")
        .select("id, title, category, location, status, created_at")
        .eq("requester_id", user.id)
        .order("created_at", { ascending: false });

    const numRequests = requests?.length || 0;
    const numRows = Math.ceil(numRequests / 4);
    const cardHeight = 240;
    const gap = 12;
    const topSpacing = 150;
    const bottomPadding = 24;
    const containerHeight = topSpacing + (numRows * cardHeight) + ((numRows - 1) * gap) + bottomPadding;
    const minHeight = Math.max(450, containerHeight);

    return (
        <div className="w-full max-w-[1326px] mx-auto relative pb-6" style={{ minHeight: `${minHeight}px` }}>
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
                        readOnly
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

            <div className="relative top-[150px] w-full px-4 grid grid-cols-4 gap-3 pb-4">
                {error && (
                    <div className="col-span-4 text-red-600 text-sm">{error.message}</div>
                )}
                {!error && (!requests || requests.length === 0) && (
                    <div className="col-span-4 text-sm text-lime-950">No requests yet.</div>
                )}
                {requests?.map((req) => (
                    <RequestsCard
                        key={req.id}
                        title={req.title}
                        location={req.location}
                        schedule={formatSchedule(req.created_at)}
                        status={req.status as any}
                        category={req.category}
                        className="w-full h-60"
                    />
                ))}
            </div>
        </div>
    );
}
