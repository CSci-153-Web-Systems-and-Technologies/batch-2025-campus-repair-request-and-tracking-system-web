'use client';

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import RepairRequestFormFields from "@/components/RepairRequestFormFields";
import Header from "@/components/Header";

const FORM_INITIAL_STATE = {
dateFiled: new Date().toISOString().split('T')[0],
requestingParty: "",
department: "",
designation: "",
location: "",
contactInfo: "",
workNature: [] as string[],
othersSpecification: "",
workDescription: "",
photos: [] as File[],
};

const REQUIRED_FIELDS = {
workDescription: "Work description is required",
location: "Location is required",
};

export default function RepairRequestForm() {
const supabase = createClient();
const router = useRouter();

const [loading, setLoading] = useState(false);
const [submitMessage, setSubmitMessage] = useState("");
const [formData, setFormData] = useState(FORM_INITIAL_STATE);
const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);

useEffect(() => {
    const loadData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: profile } = await supabase
        .from('profile')
        .select('full_name,email_address,contact_number,designation,department')
        .eq('id', user.id)
        .single();

    const contactCombined = [profile?.contact_number, profile?.email_address]
        .filter(Boolean)
        .join(' / ');

    setFormData(prev => ({
        ...prev,
        dateFiled: prev.dateFiled || new Date().toISOString().split('T')[0],
        requestingParty: profile?.full_name || prev.requestingParty,
        department: profile?.department || prev.department,
        designation: profile?.designation || prev.designation,
        contactInfo: contactCombined || prev.contactInfo,
    }));

    const { data: categoriesData } = await supabase
        .from('categories')
        .select('id, name')
        .order('name');
    
    if (categoriesData) {
        setCategories(categoriesData);
    }
    };

    loadData();
}, []);

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
};

const handleCheckboxChange = (categoryId: string) => {
    setFormData(prev => {
    const currentSelection = [...prev.workNature];
    const isSelected = currentSelection.includes(categoryId);
        
    if (isSelected) {
        return { ...prev, workNature: currentSelection.filter(id => id !== categoryId) };
    }
        
    return { ...prev, workNature: [...currentSelection, categoryId] };
    });
};

const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files ? e.target.files[0] : undefined;
    if (!file) return;
        
    const newPhotos = [...formData.photos];
    newPhotos[index] = file;
    setFormData(prev => ({ ...prev, photos: newPhotos }));
};

const hasUnsavedChanges = () => {
    return !!formData.requestingParty || 
        !!formData.workDescription || 
        formData.photos.length > 0;
};

const handleCancel = () => {
    if (!hasUnsavedChanges() || window.confirm("You have unsaved changes. Cancel and go to dashboard?")) {
    router.push("/requester/dashboard");
    }
};

const validateForm = (): string[] => {
    const errors: string[] = [];
        
    Object.entries(REQUIRED_FIELDS).forEach(([field, message]) => {
    const value = formData[field as keyof typeof formData];
    if (!value || (typeof value === 'string' && value.trim() === "")) {
        errors.push(message);
    }
    });
        
    return errors;
};

const uploadPhoto = async (photo: File, userId: string): Promise<string | null> => {
    try {
    const fileExt = photo.name.split('.').pop();
    const fileName = `${userId.slice(0, 8)}-${Date.now()}.${fileExt}`;
        
    const { error } = await supabase.storage
        .from('repair_photos')
        .upload(fileName, photo);
        
    if (error) return null;
        
    const { data: { publicUrl } } = supabase.storage
        .from('repair_photos')
        .getPublicUrl(fileName);
        
    return publicUrl;
    } catch {
    return null;
    }
};

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitMessage("");
        
    try {

    const { data: { user }, error: authError } = await supabase.auth.getUser();
        
    if (authError || !user) {
        alert("You must be logged in to submit a repair request!");
        setSubmitMessage("Please log in to submit a request");
        setLoading(false);
        return;
    }
        
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
        alert(`Please fix:\n${validationErrors.join('\n')}`);
        setSubmitMessage(validationErrors.join(', '));
        setLoading(false);
        return;
    }
        
    let uploadedPhotoUrls: string[] = [];
    if (formData.photos.length > 0) {
        const uploadPromises = formData.photos
            .filter(photo => photo)
            .map(photo => uploadPhoto(photo, user.id));
            
        uploadedPhotoUrls = (await Promise.all(uploadPromises)).filter(Boolean) as string[];
    }
        
    const categoryMap = new Map(categories.map(cat => [cat.id, cat.name] as const));
    const primaryCategoryId = formData.workNature[0];
    const primaryCategoryName = primaryCategoryId ? categoryMap.get(primaryCategoryId) : undefined;


    const requestData = {
        title: formData.workDescription, 
        location: formData.location, 
        status: 'submitted',
        requester_id: user.id, 
        img_url: uploadedPhotoUrls, 
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };
        
    const { data, error } = await supabase
        .from('requests')
        .insert([requestData])
        .select();
        
    if (error) throw error;
    
    const requestId = data[0]?.id;

    if (formData.workNature.length > 0) {
        const categoryRelations = formData.workNature.map(categoryId => ({
            request_id: requestId,
            category_id: categoryId
        }));

        const { error: catError } = await supabase
            .from('request_categories')
            .insert(categoryRelations);

        if (catError) {
            console.error('Category insertion error:', catError);
        }
    }
    
    setSubmitMessage(`Request #${requestId} submitted successfully!`);
    
    setFormData(FORM_INITIAL_STATE);
        
    setTimeout(() => {
        router.push("/requester/dashboard");
    }, 1500);
        
    } catch (error: any) {
    console.error("Submission error:", error);
    alert(`Error: ${error.message}`);
    setSubmitMessage(`Error: ${error.message}`);
    } finally {
    setLoading(false);
    }
};

const getMessageStyles = () => {
    const isSuccess = submitMessage.includes('Request #');
    return {
    container: isSuccess 
        ? 'bg-green-50 border border-green-200 text-green-800' 
        : 'bg-red-50 border border-red-200 text-red-800',
    icon: isSuccess ? '✅' : '❌'
    };
};

const messageStyles = getMessageStyles();

return (
    <div>
    <Header userName="Angielyn" />
        
    <div className="min-h-screen p-4 md:p-8 pt-6">
        <div className="w-full border border-lime-950 font-xs font-montserrat rounded-lg bg-white p-4 md:p-6 shadow-sm">
            
        <h1 className="text-2xl font-bold mb-6 text-lime-950 font-electrolize">
            Repair Request Form
        </h1>
            
        {submitMessage && (
            <div className={`p-4 mb-6 rounded-lg ${messageStyles.container}`}>
            <div className="flex items-center">
                {messageStyles.icon}
                <span className="ml-2 font-medium">{submitMessage}</span>
            </div>
            </div>
        )}
            
        <RepairRequestFormFields
            formData={formData}
            handleInputChange={handleInputChange}
            handleCheckboxChange={handleCheckboxChange}
            handleFileUpload={handleFileUpload}
            handleCancel={handleCancel}
            handleSubmit={handleSubmit}
            loading={loading}
            categories={categories}
        />
        </div>
    </div>
    </div>
);
}