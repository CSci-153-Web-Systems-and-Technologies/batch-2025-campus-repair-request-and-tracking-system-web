'use client';
import React from "react";

interface FormData {
    dateFiled: string;
    requestingParty: string;
    department: string;
    designation: string;
    location: string;
    contactInfo: string;
    workNature: string[];
    othersSpecification: string;
    workDescription: string;
    photos: File[];
}

interface FormFieldsProps {
    formData: FormData;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleCheckboxChange: (workType: string) => void;
    handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
    handleCancel: () => void;
    handleSubmit: (e: React.FormEvent) => void;
    loading: boolean;
    categories?: { id: string; name: string }[];
}

interface InputFieldConfig {
    name: keyof FormData;
    label: string;
    placeholder: string;
    type?: string;
}

const INPUT_FIELDS: InputFieldConfig[] = [
    { name: "dateFiled", label: "Date Filed", placeholder: "month/day/year", type: "date" },
    { name: "requestingParty", label: "Requesting Party", placeholder: "Enter name" },
    { name: "department", label: "Building / Department", placeholder: "Enter department" },
    { name: "designation", label: "Designation / Position", placeholder: "Enter designation" },
    { name: "location", label: "Location", placeholder: "Enter location" },
    { name: "contactInfo", label: "Contact Number / Email", placeholder: "Contact info" },
];

const PHOTO_UPLOAD_SLOTS = [0, 1, 2] as const;

const PhotoUploadPlaceholder = () => (
    <>
        <img
            src="/images/photo.png"
            alt="Upload placeholder"
            className="object-cover h-10 w-10 mb-2"
        />
        <span className="text-sm text-gray-600">Click to upload</span>
    </>
);

const PhotoUploadedInfo = ({ fileName }: { fileName: string }) => (
    <div className="text-center p-4">
        <p className="text-sm text-gray-700 truncate">{fileName}</p>
        <p className="text-xs text-gray-500 mt-2">Click to change</p>
    </div>
);

export default function RepairRequestFormFields({
    formData,
    handleInputChange,
    handleCheckboxChange,
    handleFileUpload,
    handleCancel,
    handleSubmit,
    loading,
    categories = [],
}: FormFieldsProps) {

    const isOthersSelected = formData.workNature.some(id => {
        const cat = categories.find(c => c.id === id);
        return cat?.name.toLowerCase().includes('others');
    });

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div className="grid md:grid-cols-2 gap-4 md:gap-6 p-2 pt-4">
                    {INPUT_FIELDS.map((field) => (
                        <div key={field.name}>
                            <label className="block mb-1 text-black text-base font-medium">
                                {field.label} <span className="text-red-500">*</span>
                            </label>
                            <input
                                type={field.type || "text"}
                                name={field.name}
                                placeholder={field.placeholder}
                                value={formData[field.name] as string}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-neutral-400 rounded-sm text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-lime-600 focus:border-transparent"
                                required
                            />
                        </div>
                    ))}
                </div>

                <h2 className="text-xl text-lime-950 font-electrolize mt-10 mb-4">
                    Please check and specify the nature of work requested:
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                    {categories.length > 0 ? (
                        categories.map((category) => (
                            <div key={category.id} className="flex items-center p-2 hover:bg-gray-50 rounded">
                                <input
                                    type="checkbox"
                                    id={`work-${category.id}`}
                                    name="work-nature"
                                    checked={formData.workNature.includes(category.id)}
                                    onChange={() => handleCheckboxChange(category.id)}
                                    className="h-4 w-4 text-lime-700 border-neutral-400 rounded focus:ring-lime-300"
                                />
                                <label htmlFor={`work-${category.id}`} className="ml-2 text-sm text-neutral-700 cursor-pointer">
                                    {category.name}
                                </label>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm">Loading categories...</p>
                    )}
                </div>
\
                <textarea
                    name="othersSpecification"
                    placeholder="If 'Others' is selected, please specify details here..."
                    value={formData.othersSpecification}
                    onChange={handleInputChange}
                    className="w-full min-h-[100px] p-3 border border-neutral-400 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-lime-600 focus:border-transparent"
                    disabled={!isOthersSelected}
                />

                <h2 className="text-xl text-lime-950 font-electrolize mt-10 mb-2">
                    Brief description of the work requested
                </h2>
                <textarea
                    name="workDescription"
                    placeholder="Write a brief description..."
                    value={formData.workDescription}
                    onChange={handleInputChange}
                    className="w-full min-h-[120px] p-3 border border-neutral-400 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-lime-600 focus:border-transparent"
                    required
                />

                <h2 className="text-xl text-lime-950 font-electrolize mt-10 mb-2">Photo/s</h2>
                <p className="text-sm text-gray-600 mb-4">Upload up to 3 photos (optional)</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {PHOTO_UPLOAD_SLOTS.map((index) => (
                        <div key={index} className="relative">
                            <label htmlFor={`photo-${index}`} className="cursor-pointer">
                                <div className="border-2 border-dashed border-neutral-400 rounded-lg flex flex-col items-center justify-center w-full h-40 hover:border-lime-600 transition-colors">
                                    {formData.photos[index] ? (
                                        <PhotoUploadedInfo fileName={formData.photos[index].name} />
                                    ) : (
                                        <PhotoUploadPlaceholder />
                                    )}
                                </div>
                            </label>
                            <input
                                id={`photo-${index}`}
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileUpload(e, index)}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row gap-4 justify-center mt-12">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="bg-gray-400 hover:bg-gray-500 text-white px-10 py-3 rounded-lg text-sm tracking-wide transition-colors"
                    >
                        CANCEL
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-lime-950 hover:bg-lime-900 text-white px-10 py-3 rounded-lg text-sm tracking-wide transition-colors disabled:opacity-50">
                        {loading ? "SUBMITTING..." : "SUBMIT REQUEST"}
                    </button>
                </div>
            </div>
        </form>
    );
}