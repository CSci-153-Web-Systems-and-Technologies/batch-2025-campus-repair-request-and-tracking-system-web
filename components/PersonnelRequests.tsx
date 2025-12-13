'use client';

import { useEffect, useMemo, useState } from 'react';
import RequestContainer2 from '@/components/RequestsContainer2';
import { createClient } from '@/utils/supabase/client';

const statusOptions = ['All', 'pending', 'in_progress', 'completed', 'cancelled'];
const statusLabels: { [key: string]: string } = {
    pending: 'Pending',
    in_progress: 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled',
};
const departmentOptions = [
    'All',
    'Department of Computer Science and Technology',
    'Library',
    'Department of Teacher Education',
    'Admin',
    'Other',
];
const defaultCategoryOptions = ['All'];

const MainContainer = () => {
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('All');
    const [department, setDepartment] = useState('All');
    const [category, setCategory] = useState('All');
    const [categoryOptions, setCategoryOptions] = useState<string[]>(
        defaultCategoryOptions
    );

    const [openDropdown, setOpenDropdown] = useState<
        'status' | 'department' | 'category' | null
    >(null);

    useEffect(() => {
        const loadCategories = async () => {
            const supabase = createClient();
            const { data, error } = await supabase
                .from('categories')
                .select('name')
                .order('name');
            if (error) {
                console.error('Error loading categories', error);
                return;
            }
            const names = (data || [])
                .map((c) => c.name)
                .filter(Boolean) as string[];
            setCategoryOptions(['All', ...names]);
        };
        loadCategories();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.dropdown-container')) {
                setOpenDropdown(null);
            }
        };

        if (openDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openDropdown]);

    const activeFiltersLabel = useMemo(() => {
        const parts: string[] = [];
        if (status !== 'All') parts.push(`Status: ${status}`);
        if (department !== 'All') parts.push(`Department: ${department}`);
        if (category !== 'All') parts.push(`Category: ${category}`);
        if (search.trim()) parts.push(`Search: ${search.trim()}`);
        return parts.join(' • ');
    }, [status, department, category, search]);

    const renderDropdown = (
        type: 'status' | 'department' | 'category',
        options: string[],
        value: string,
        setter: (val: string) => void
    ) => (
        <div className="relative min-w-[200px] dropdown-container">
            <button
                onClick={() => setOpenDropdown(openDropdown === type ? null : type)}
                className="w-full h-12 px-4 bg-neutral-200 rounded-2xl border border-lime-950 flex items-center justify-between"
            >
                <span className="text-lime-950 text-sm font-light truncate">
                    {value === 'All'
                        ? `All ${
                                type === 'status'
                                    ? 'Status'
                                    : type === 'department'
                                        ? 'Departments'
                                        : 'Categories'
                            }`
                        : type === 'status'
                            ? statusLabels[value] || value
                            : value}
                </span>
                <img
                    className="size-5 flex-shrink-0"
                    src="/images/arrow.png"
                    alt="Dropdown icon"
                />
            </button>
            {openDropdown === type && (
                <div className="absolute z-20 mt-2 w-full bg-white border border-lime-950 rounded-xl shadow-sm max-h-64 overflow-y-auto">
                    {options.map((opt) => (
                        <button
                            key={opt}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-neutral-100"
                            onClick={() => {
                                setter(opt);
                                setOpenDropdown(null);
                            }}
                        >
                            {type === 'status' && opt !== 'All'
                                ? statusLabels[opt] || opt
                                : opt}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <div className="w-full min-h-[499px]">
            <div className="relative w-full min-h-[700px] bg-neutral-100 rounded-2xl border border-lime-950 p-4 sm:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
                    <div>
                        <h1 className="text-lime-950 text-lg sm:text-xl font-electrolize tracking-wider font-semibold">
                            All Requests
                        </h1>
                        <p className="text-lime-950 text-xs sm:text-sm font-light mt-2">
                            Manage and track repair requests
                        </p>
                        {activeFiltersLabel && (
                            <p className="text-xs text-stone-600 mt-2 break-words">
                                {activeFiltersLabel}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <div className="relative flex-1 min-w-[280px]">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <img className="size-5" src="/images/search.png" alt="Search icon" />
                        </div>
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search requests..."
                            className="w-full h-12 pl-10 pr-4 bg-neutral-200 rounded-2xl border border-lime-950 text-sm text-lime-950 focus:outline-none"
                        />
                    </div>

                    {renderDropdown('status', statusOptions, status, setStatus)}

                    {renderDropdown('department', departmentOptions, department, setDepartment)}

                    {renderDropdown('category', categoryOptions, category, setCategory)}

                    <div className="relative min-w-[200px]">
                        <button
                            className="w-full h-12 px-4 bg-neutral-200 rounded-2xl border border-lime-950 flex items-center justify-between"
                            disabled
                        >
                            <span className="text-lime-950 text-sm font-light">All Priorities</span>
                            <img
                                className="size-5 flex-shrink-0"
                                src="/images/arrow.png"
                                alt="Dropdown icon"
                            />
                        </button>
                    </div>
                </div>

                <div className="w-full overflow-x-auto">
                    <RequestContainer2
                        search={search}
                        status={status === 'All' ? 'all' : status}
                        department={department === 'All' ? 'all' : department}
                        category={category === 'All' ? 'all' : category}
                    />
                </div>
            </div>
        </div>
    );
};

export default MainContainer;