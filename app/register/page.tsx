
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    // Name validation: only letters and spaces
    if (!/^[A-Za-z ]+$/.test(name)) {
      setError("Name must contain only letters and spaces.");
      return;
    }
    // Mobile validation: exactly 10 digits
    if (!/^\d{10}$/.test(mobile)) {
      setError("Mobile number must be exactly 10 digits.");
      return;
    }
    setIsLoading(true);
    // Save registration status in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("registered", "true");
      localStorage.setItem("userName", name);
      localStorage.setItem("userPhone", mobile);
    }
    setTimeout(() => {
      setIsLoading(false);
      router.push("/"); // Redirect to main menu
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-800">Arogya Health Bot</h1>
              <p className="text-sm text-slate-600">Register your details</p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Register</CardTitle>
              <CardDescription>Enter your name and mobile number</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister}>
                <div className="flex flex-col gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      required
                      value={name}
                      onChange={e => {
                        const value = e.target.value;
                        if (/^[A-Za-z ]*$/.test(value)) {
                          setName(value);
                        }
                      }}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <Input
                      id="mobile"
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      required
                      value={mobile}
                      maxLength={10}
                      onChange={e => {
                        const value = e.target.value.replace(/[^\d]/g, "");
                        if (/^\d{0,10}$/.test(value)) {
                          setMobile(value);
                        }
                      }}
                    />
                  </div>
                  {error && <p className="text-sm text-red-500">{error}</p>}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Registering..." : "Register"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
