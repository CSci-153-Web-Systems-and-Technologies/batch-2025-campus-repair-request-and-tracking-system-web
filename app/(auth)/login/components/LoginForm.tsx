"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const supabase = createClient();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(`Login failed: ${authError.message}`);
      setLoading(false);
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profile")
      .select("role")
      .eq("email_address", email)
      .single();

    if (profileError || !profile?.role) {
      setError("Profile not found or missing role. Please contact support.");
      setLoading(false);
      return;
    }

    const role = (profile.role as string).toLowerCase();
    if (role === "personnel") {
      router.push("/personnel/dashboard");
    } else {
      router.push("/requester/dashboard");
    }
  };

  return (
    <Card className="rounded-[10px] mx-auto max-w-sm box-content p-6 font-montserrat">
      <CardHeader>
        <CardTitle className="text-2xl text-[#0D3311] font-electrolize tracking-wide">WELCOME!</CardTitle>
        <CardDescription>
          Please enter your details to continue.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="ml-auto inline-block text-xs underline">
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" name="password" type="password" required />
              </div>
              <Button type="submit" className="w-full font-electrolize" disabled={loading}>
                {loading ? "LOGGING IN..." : "LOGIN"}
              </Button>
            </div>
        </form>
        <div className="mt-4 text-center text-xs text-[#0D3311] font-electrolize">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
