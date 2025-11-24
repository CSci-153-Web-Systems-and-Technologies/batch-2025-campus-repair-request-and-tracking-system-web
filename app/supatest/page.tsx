    "use client";

    import { useEffect, useState } from "react";
    import { createClient } from "@/utils/supabase/client";

    export default function TestSupabaseConnection() {
    const [status, setStatus] = useState("Checking connection...");

    useEffect(() => {
        const supabase = createClient();

        const checkConnection = async () => {
        try {
            const { data, error } = await supabase.auth.getSession();

            if (error) {
            setStatus("❌ Connection error: " + error.message);
            } else {
            setStatus("✅ Connected to Supabase!");
            console.log("Session data:", data);
            }
        } catch (err: any) {
            setStatus("Unexpected error: " + err.message);
        }
        };

        checkConnection();
    }, []);

    return <div className="p-8 text-center text-lg font-medium">{status}</div>;
    }
