import type { NextPage } from 'next';
import RequestContainer2 from '@/components/RequestsContainer2';

const MainContainer: NextPage = () => {
return (
    <div className="w-full max-w-[1520px] min-h-[499px] mx-auto px-4 sm:px-6 lg:px-8">
    <div className="relative w-full min-h-[700px] bg-neutral-100 rounded-2xl border border-lime-950 p-8">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
                <h1 className="text-lime-950 text-xl font-electrolize tracking-wider font-semibold">
                All Requests
                </h1>
                <p className="text-lime-950 text-sm font-light mt-2">
                Manage and track repair requests
                </p>
            </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1 min-w-[280px]">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <img
                    className="size-5"
                    src="/images/search.png"
                    alt="Search icon"
                />
                </div>
                <div className="w-full h-12 pl-10 pr-4 bg-neutral-200 rounded-2xl border border-lime-950 flex items-center">
                <span className="text-stone-600 text-sm font-light">
                    Search requests...
                </span>
                </div>
            </div>

            {/* Status */}
            <div className="relative min-w-[200px]">
                <button className="w-full h-12 px-4 bg-neutral-200 rounded-2xl border border-lime-950 flex items-center justify-between">
                <span className="text-lime-950 text-sm font-light">
                    All Status
                </span>
                <img 
                className="size-5" 
                src="/images/arrow.png" 
                alt="Dropdown icon" />
                </button>
            </div>

            {/* Building */}
            <div className="relative min-w-[200px]">
                <button className="w-full h-12 px-4 bg-neutral-200 rounded-2xl border border-lime-950 flex items-center justify-between">
                <span className="text-lime-950 text-sm font-light">
                    All Buildings
                </span>
                <img 
                className="size-5" 
                src="/images/arrow.png" 
                alt="Dropdown icon" />
                </button>
            </div>

            {/* Category */}
            <div className="relative min-w-[200px]">
                <button className="w-full h-12 px-4 bg-neutral-200 rounded-2xl border border-lime-950 flex items-center justify-between">
                <span className="text-lime-950 text-sm font-light">
                    All Categories
                </span>
                <img 
                className="size-5" 
                src="/images/arrow.png" 
                alt="Dropdown icon" />
                </button>
            </div>

            {/* Priority */}
            <div className="relative min-w-[200px]">
                <button className="w-full h-12 px-4 bg-neutral-200 rounded-2xl border border-lime-950 flex items-center justify-between">
                <span className="text-lime-950 text-sm font-light">
                    All Priorities
                </span> 
                <img 
                className="size-5" 
                src="/images/arrow.png" 
                alt="Dropdown icon" />
                </button>
            </div>
            </div>

            <div className="w-full">
            <RequestContainer2 />
            </div>
        </div>
        </div>
    );
    };
    
    export default MainContainer;