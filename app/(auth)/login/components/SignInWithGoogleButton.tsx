"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

const SignInWithGoogleButton = () => {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogle = async () => {
    setError(null);
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: typeof window !== "undefined" ? `${window.location.origin}/requester/dashboard` : undefined,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data?.url) {
      window.location.href = data.url;
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Button
        type="button"
        variant="outline"
        className="w-full font-electrolize"
        disabled={loading}
        onClick={handleGoogle}
      >
        {loading ? "REDIRECTING..." : "SIGN IN WITH GOOGLE"}
      </Button>
      {error && (
        <p className="mt-2 text-xs text-red-700 text-center">{error}</p>
      )}
    </div>
  );
};

export default SignInWithGoogleButton;
