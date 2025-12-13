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
      <div>
        <div className="pb-10">
          <Header2 />
        </div>
        <div className="flex items-center justify-center">
          <p className="text-red-600 text-sm">No request ID provided</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="pb-10">
        <Header2 />
      </div>

      <div className="flex items-center justify-center pb-10">
        <RequestDetails requestId={requestId} />
      </div>

      <div className="flex items-center pb-10 justify-center">
        <ManagementActions requestId={requestId} />
      </div>

      <div className="flex items-center justify-center">
        <CommunicationUpdates requestId={requestId} role="personnel" />
      </div>
    </div>
  );
}