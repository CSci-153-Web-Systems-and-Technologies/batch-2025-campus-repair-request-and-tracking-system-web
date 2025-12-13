import CommunicationUpdates from "@/components/CommUpdate";
import Header2 from "@/components/Header2";
import ManagementActions from "@/components/ManageActions";
import RequestDetails from "@/components/RequestDetails";

export default function RequestDetailsPage({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const requestId = searchParams.id;

  if (!requestId) {
    return (
      <div className="min-h-screen bg-white">
        <Header2 />
        <div className="flex items-center justify-center p-8">
          <p className="text-red-600 text-sm">No request ID provided</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header2 />
      
      {/* Content Container */}
      <div className="px-0 sm:px-4 py-6 sm:py-8 space-y-6 sm:space-y-8 lg:space-y-10">
        
        {/* Request Details */}
        <div className="flex items-center justify-center">
          <RequestDetails requestId={requestId} />
        </div>

        {/* Communication Updates */}
        <div className="flex items-center justify-center">
          <CommunicationUpdates requestId={requestId} role="requester" />
        </div>
      </div>
    </div>
  );
}