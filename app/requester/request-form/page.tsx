import Header from "@/components/Header";
import React from "react";

export default function RepairRequestForm() {
    return (
        <div>
            <Header userName="Angielyn" />
            <div className="min-h-screen p-8 pt-6">
                <div className="w-full border border-lime-950 font-xs font-montserrat rounded-lg bg-white p-6 shadow-sm">
                    <h2 className="text-xl border-b-2 border-black text-lime-950 p-3 font-electrolize mb-4">
                        Request Information
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6 p-2 pt-4">
                        {[
                            { label: "Date Filed", placeholder: "month/day/year" },
                            { label: "Requesting Party", placeholder: "Enter name" },
                            { label: "Building / Department", placeholder: "Enter department" },
                            { label: "Designation / Position", placeholder: "Enter designation" },
                            { label: "Location", placeholder: "Enter location" },
                            { label: "Contact Number / Email", placeholder: "Contact info" },
                        ].map((field, index) => (
                            <div key={index}>
                                <label className="block mb-1 text-black text-base">
                                    {field.label}
                                </label>
                                <input
                                    type="text"
                                    placeholder={field.placeholder}
                                    className="w-full p-2 border border-neutral-400 rounded-sm text-xs text-neutral-600"
                                />
                            </div>
                        ))}
                    </div>

                    <h2 className="text-xl text-lime-950 font-electrolize mt-10 mb-4">
                        Please check and specify the nature of work requested:
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                        {[
                            "Vehicle Repair",
                            "Welding Works", 
                            "Mechanical",
                            "Electrical Works",
                            "Carpentry",
                            "Masonry",
                            "Plumbing",
                            "Painting",
                            "Others (please specify)"
                        ].map((work, index) => (
                            <div key={index} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`work-${index}`}
                                    name="work-nature"
                                    className="h-4 w-4 text-lime-700 border-neutral-400 rounded focus:ring-lime-300"
                                />
                                <label htmlFor={`work-${index}`} className="ml-2 text-sm text-neutral-700">
                                    {work}
                                </label>
                            </div>
                        ))}
                    </div>

                    <textarea
                        placeholder="If 'Others' is selected, please specify details here..."
                        className="w-full min-h-[100px] p-3 border border-neutral-400 rounded-sm text-sm"
                    />

                    <h2 className="text-xl text-lime-950 font-electrolize mt-10 mb-2">
                        Brief description of the work requested
                    </h2>
                    <textarea
                        placeholder="Write a brief description..."
                        className="w-full min-h-[120px] p-3 border border-neutral-400 rounded-sm text-sm"
                    />

                    <h2 className="text-xl text-lime-950 font-electrolize mt-10 mb-2">Photo/s</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((num) => (
                            <button key={num} className="border-2 border-neutral-400 rounded-lg flex items-center justify-center w-50 h-20">
                                <img
                                    src="/images/photo.png"
                                    alt="Placeholder"
                                    className="object-cover h-7 w-7"
                                />
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 justify-center mt-12">
                        <button className="bg-gray-400 text-white px-10 py-3 rounded-lg text-sm tracking-wide">
                            CANCEL
                        </button>
                        <button className="bg-lime-950 text-white px-10 py-3 rounded-lg text-sm tracking-wide">
                            SUBMIT REQUEST
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}