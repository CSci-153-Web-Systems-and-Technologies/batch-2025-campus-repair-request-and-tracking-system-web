import CommunicationUpdates from "@/components/CommUpdate";
import Header2 from "@/components/Header2";
import ManagementActions from "@/components/ManageActions";
import RequestDetails from "@/components/RequestDetails";
export default function TestPage() {
    return (   
<div>
    <div className="pb-10">
        <Header2 />
    </div>

    <div className="flex items-center justify-center pb-10">
        <RequestDetails />
    </div>

    <div className="flex items-center pb-10 justify-center">
        <ManagementActions />
    </div>

    <div className="flex items-center justify-center">
        <CommunicationUpdates />
    </div>
</div>
);
}