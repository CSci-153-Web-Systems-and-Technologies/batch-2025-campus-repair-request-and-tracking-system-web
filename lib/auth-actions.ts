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

  const { data: authData, error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: `Login failed: ${error.message}` };
  }

  if (authData?.user) {
    let { data: profile, error: profileError } = await supabase
      .from('profile')
      .select('id, role')
      .eq('id', authData.user.id)
      .single();

    if (profileError || !profile) {
      const { data: pendingProfile } = await supabase
        .from('pending_profiles')
        .select('*')
        .eq('user_id', authData.user.id)
        .single();

      const profileData = pendingProfile || {
        full_name: data.email?.split('@')[0] || 'New User',
        department: '',
        contact_number: '',
        designation: '',
        role: 'requester',
      };

      const { error: insertError } = await supabase
        .from('profile')
        .insert({
          id: authData.user.id,
          full_name: profileData.full_name,
          email_address: data.email,
          role: profileData.role,
          department: profileData.department,
          contact_number: profileData.contact_number,
          designation: profileData.designation,
        });

        if (insertError) {
        console.error('Profile creation failed:', insertError);
        await supabase.auth.signOut();
        return { error: `Profile creation failed: ${insertError.message}` };
      }

      if (pendingProfile) {
        await supabase.from('pending_profiles').delete().eq('user_id', authData.user.id);
      }

      profile = { id: authData.user.id, role: profileData.role } as any;
    }

    const role = (profile as any).role?.toLowerCase();
    if (role !== 'requester' && role !== 'personnel') {
      await supabase.auth.signOut();
      return { error: "Invalid role. Please contact support." };
    }

    revalidatePath("/", "layout");
    redirect(role === 'personnel' ? "/personnel/dashboard" : "/requester/dashboard");
  }
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const firstName = formData.get("first-name") as string;
  const lastName = formData.get("last-name") as string;
  const department = formData.get("department") as string;
  const contactNumber = formData.get("contact_number") as string;
  const designation = formData.get("designation") as string;
  const role = (formData.get("role") as string)?.toLowerCase();

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters" };
  }

  const allowedRoles = ["requester", "personnel"];
  if (!role || !allowedRoles.includes(role)) {
    return { error: "Role must be requester or personnel" };
  }

  const { data: authData, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: `${firstName} ${lastName}`.trim(),
        department: department,
        contact_number: contactNumber,
        designation: designation,
        role: role,
      }
    }
  });

  if (error) {
    console.error('Signup failed:', error);
    return { error: `Authentication failed: ${error.message}` };
  }

  if (!authData?.user) {
    return { error: "No user data received" };
  }

  return {
    success: true,
    message: `Account created! Please check your email at ${email} to confirm your account.`,
  };
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