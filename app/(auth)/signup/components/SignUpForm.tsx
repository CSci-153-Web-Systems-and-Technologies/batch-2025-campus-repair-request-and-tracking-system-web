"use client";
import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom";
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
import { signup } from "@/lib/auth-actions";

export function SignUpForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    department: "",
    contactNumber: "",
    designation: "",
    role: "",
  });

  const [state, formAction] = useFormState(async (_prevState: any, data: FormData) => {
    return await signup(data);
  }, null);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    await formAction(data);
  };

  if (state?.success && state?.message) {
    return (
      <Card className="mx-auto max-w-xs font-montserrat rounded-[10px] box-content p-6">
        <CardHeader>
          <CardTitle className="text-xl text-[#0D3311] font-electrolize">Check your email</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-800">
              {state.message}
            </div>
            <Link href="/login">
              <Button className="w-full">Go to Login</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-[10px] mx-auto max-w-xs box-content p-6 font-montserrat">
      <CardHeader>
        {step === 1 && (
          <CardTitle className="text-2xl text-[#0D3311] font-electrolize tracking-wide">Sign Up</CardTitle>
        )}
        <CardDescription>
          <div>{step}/3</div>
          <div>Enter your information to create an account</div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input
                    name="first-name"
                    id="first-name"
                    placeholder="Boiled"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input
                    name="last-name"
                    id="last-name"
                    placeholder="Gudetama"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  name="password"
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  minLength={6}
                />
              </div>

              <Button type="button" onClick={handleNext} className="w-full font-electrolize">
                NEXT
              </Button>
            </div>
          )}

          {/* Step 2: Work Info */}
          {step === 2 && (
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  name="department"
                  id="department"
                  placeholder="Department of Computer Science and Technology"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="designation">Designation</Label>
                <Input
                  name="designation"
                  id="designation"
                  placeholder="Student/Staff/Professor"
                  value={formData.designation}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <select
                  name="role"
                  id="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="">Select a role</option>
                  <option value="requester">Requester</option>
                  <option value="personnel">Personnel</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button type="button" onClick={handleBack} variant="outline" className="w-full font-electrolize">
                  BACK
                </Button>
                <Button type="button" onClick={handleNext} className="w-full font-electrolize">
                  NEXT
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Contact Info */}
          {step === 3 && (
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="contact_number">Contact Number</Label>
                <Input
                  name="contact_number"
                  id="contact_number"
                  placeholder="09123456789"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                />
              </div>

              <input type="hidden" name="full_name" id="full_name" value={`${formData.firstName} ${formData.lastName}`} />

              {state?.error && (
                <div className="text-red-600 text-sm" role="alert">
                  {state.error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <Button type="button" onClick={handleBack} variant="outline" className="w-full font-electrolize">
                  BACK
                </Button>
                <Button type="submit" className="w-full font-electrolize">
                  CREATE ACCOUNT
                </Button>
              </div>
            </div>
          )}
        </form>
        <div className="mt-4 nt text-xs text-[#0D3311] font-electrolize">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}