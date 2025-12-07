"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: `Login failed: ${error.message}` };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return { error: "Email and password are required" };
    }

    if (password.length < 6) {
      return { error: "Password must be at least 6 characters" };
    }

    const { data: authData, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error('Signup failed:', error);
      return { error: `Authentication failed: ${error.message}` };
    }

    if (!authData?.user) {
      return { error: "No user data received" };
    }

    const { error: profileError } = await supabase
      .from('profile')
      .insert({
        id: authData.user.id,
        full_name: `${formData.get("first-name")} ${formData.get("last-name")}`,
        email_address: email,
        role: formData.get("role") as string,
        department: formData.get("department") as string,
        contact_number: formData.get("contact_number") as string,
        designation: formData.get("designation") as string,
      });

    if (profileError) {
      console.error('Profile creation failed:', profileError);
      return { error: `Profile creation failed: ${profileError.message}` };
    }

    revalidatePath("/", "layout");
    return { success: true, message: "Account created successfully!" };
    
  } catch (error: any) {
    return { error: `Unexpected error: ${error.message}` };
  }
}

export async function signout() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
    redirect("/error");
  }

  redirect("/login");
}

export async function signInWithGoogle() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    console.log(error); 
    redirect("/error");
  }

  redirect(data.url);
}