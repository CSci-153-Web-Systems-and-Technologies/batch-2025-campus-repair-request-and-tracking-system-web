import Link from "next/link";
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
  return (
    <Card className="mx-auto max-w-sm font-montserrat rounded-[10px] box-content p-6">
      <CardHeader>
        <CardTitle className="text-xl text-[#0D3311] font-electrolize">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  name="first-name"
                  id="first-name"
                  placeholder="Boiled"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  name="last-name"
                  id="last-name"
                  placeholder="Gudetama"
                  required
                />
              </div>
            </div>
            
            <input
              type="hidden"
              name="full_name"
              id="full_name"
              required
            />

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                name="password" 
                id="password" 
                type="password" 
                required 
                minLength={6}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="department">Department</Label>
              <Input
                name="department"
                id="department"
                placeholder="Department of Computer Science and Technology"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="contact_number">Contact Number</Label>
              <Input
                name="contact_number"
                id="contact_number"
                placeholder="09123456789"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="designation">Designation</Label>
              <Input
                name="designation"
                id="designation"
                placeholder="Student/Staff/Professor"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <select 
                name="role"
                id="role"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              >
                <option value="">Select a role</option>
                <option value="requester">Requester</option>
                <option value="personnel">Personnel</option>
              </select>
            </div>

            <Button 
              type="submit" 
              formAction={signup}
              className="w-full"
            >
              Create an account
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-xs text-[#0D3311] font-electrolize">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}