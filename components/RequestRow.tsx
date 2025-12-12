"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface RequestRowProps {
  request: {
    id: string;
    title: string;
    category: string;
    location: string;
    status: string;
    created_at: string;
  };
}

const RequestRow: React.FC<RequestRowProps> = ({ request }) => {
  const router = useRouter();
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${month}/${day}/${year}`;
  };

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return { bg: 'bg-green-100', text: 'text-green-600', icon: '✅' };
      case 'pending':
        return { bg: 'bg-yellow-100', text: 'text-orange-600', icon: '⏳' };
      case 'in progress':
        return { bg: 'bg-sky-100', text: 'text-sky-600', icon: '🔨' };
      case 'cancelled':
        return { bg: 'bg-red-100', text: 'text-red-600', icon: '❌' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-600', icon: '' };
    }
  };

  const statusStyle = getStatusStyle(request.status);

  return (
    <div>
      <div className="w-full border-t border-gray-300 mb-3"></div>
      
      <div className="relative w-full h-14 grid grid-cols-12 items-center px-6 gap-x-4">

      <div className="col-span-2 flex flex-col justify-center items-start">
        {/* request title and category */}
        <div className="text-lime-950 text-base font-light font-electrolize leading-9 tracking-wide truncate w-full">
          {request.title}
        </div>
        <div
          className="w-24 h-6 px-5 py-2 rounded-3xl shadow-[0px_4px_8px_0px_rgba(0,0,0,0.10)] outline outline-1 outline-offset-[-1px] outline-black inline-flex justify-center items-center"
        >
          <div className="flex justify-start items-start gap-2">
            <div className="text-black text-sm font-semibold font-electrolize leading-5 truncate">
              {request.category}
            </div>
          </div>
        </div>
      </div>

      {/* location */}
      <div className="col-span-2 flex items-center gap-2 -ml-4">
        <img
          className="size-5"
          src="/images/location.png"
          alt="Location icon"
        />
        <div className="text-lime-950 text-sm font-semibold tracking-wide truncate">
          {request.location}
        </div>
      </div>

      {/* Status */}
      <div className="col-span-2 relative h-8">
        <div className="ml-5 w-full h-8 bg-neutral-200 rounded-2xl"></div>
        <div
          className={`ml-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-6 px-5 py-2 ${statusStyle.bg} rounded-3xl shadow-[0px_4px_8px_0px_rgba(0,0,0,0.10)] flex justify-center items-center`}
        >
          <div className="flex justify-center items-center gap-2">
            <div className={`${statusStyle.text} text-sm font-semibold font-electrolize`}>
              {statusStyle.icon} {request.status}
            </div>
          </div>
        </div>
      </div>

        
        <div className="ml-14 col-span-2 flex items-center justify-center">
            <div
            className="w-20 h-6 px-5 py-2 bg-red-100 rounded-3xl shadow-[0px_4px_8px_0px_rgba(0,0,0,0.10)] inline-flex justify-center items-center"
            >
            <div className="flex justify-start items-center gap-2">
                <div className="text-red-700 text-sm font-semibold font-electrolize leading-5">
                High
                </div>
            </div>
            </div>
        </div>

      {/* Date */}
      <div className="ml-11 col-span-2 flex items-center justify-start gap-2">
        <img
          className="size-6"
          src="/images/calendar.png"
          alt="Calendar icon"
        />
        <div className="text-lime-950 text-sm font-semibold leading-9 tracking-wide truncate">
          {formatDate(request.created_at)}
        </div>
      </div>

        <div className="ml-8 col-span-2 flex items-center justify-start gap-2">
            <button
            onClick={() => router.push(`/personnel/request-details?id=${request.id}`)}
            className="w-24 h-6 px-5 py-2 bg-stone-300 rounded-3xl shadow-[0px_4px_8px_0px_rgba(0,0,0,0.10)] inline-flex justify-center items-center hover:bg-stone-400 cursor-pointer transition-colors"
            >
            <div className=" flex justify-start items-center row-2 gap-1">
                <img
                className="size-4"
                src="/images/view.png"
                alt="View icon"
                />
                <div className="text-semibold font-electrolize text-sm leading-5">
                View
                </div>
            </div>
            </button>
        </div>
      </div>
    </div>
  );
};

export default RequestRow;