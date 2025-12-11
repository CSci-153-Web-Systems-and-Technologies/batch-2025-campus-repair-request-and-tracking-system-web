import React from "react";

    const RequestRow: React.FC = () => {
    return (
        <div className="relative w-full h-14 grid grid-cols-12 items-center px-6 gap-x-4">

        <div className="col-span-2 flex flex-col justify-center items-start">
            <div className="text-lime-950 text-base font-light font-['Montserrat'] leading-9 tracking-wide">
            abcd
            </div>
            <div
            className="w-24 h-6 px-5 py-2 rounded-3xl shadow-[0px_4px_8px_0px_rgba(0,0,0,0.10)] outline outline-1 outline-offset-[-1px] outline-black inline-flex justify-center items-center"
            >
            <div className="flex justify-start items-start gap-2">
                <div className="text-black text-sm font-semibold font-electrolize leading-5">
                Plumbing
                </div>
            </div>
            </div>
        </div>

        <div className="col-span-2 flex items-center gap-2 -ml-4">
        <img
            className="size-5"
            src="/images/location.png"
            alt="Location icon"
        />
        <div className="text-lime-950 text-sm font-semibold tracking-wide">
            DCST - ROOM 101
        </div>
        </div>

        <div className="col-span-2 relative h-8">
        <div className="ml-5 w-full h-8 bg-neutral-200 rounded-2xl"></div>
        <div
            className="ml-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-6 px-5 py-2 bg-sky-100 rounded-3xl shadow-[0px_4px_8px_0px_rgba(0,0,0,0.10)] flex justify-center items-center"
        >
            <div className="flex justify-center items-center gap-2">
            <div className="text-sky-600 text-sm font-semibold font-electrolize">
                🔨 In Progress
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

        <div className="ml-11 col-span-2 flex items-center justify-start gap-2">
            <img
                className="size-6"
                src="/images/calendar.png"
                alt="View icon"
                />
            <div className="text-lime-950 text-sm font-semibold leading-9 tracking-wide truncate">
            09/10/25
            </div>
        </div>

        <div className="ml-8 col-span-2 flex items-center justify-start gap-2">
            <button
            className="w-24 h-6 px-5 py-2 bg-stone-300 rounded-3xl shadow-[0px_4px_8px_0px_rgba(0,0,0,0.10)] inline-flex justify-center items-center"
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
    );
    };

    export default RequestRow;