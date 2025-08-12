"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call Electron API
      const result = await window.api.auth.login({ email, password });

      if (result.success) {
        console.log("Login successful:", result);
        localStorage.setItem("auth_token", result.token);
        toast.success("Login successful!");
        router.push("/HomePage"); // Redirect to home page
      } else {
        toast.error(result.message || "Invalid credentials");
      }
    } catch (err) {
      toast.error("Login failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center  bg-gray-950 p-4">
      <Card className="w-full max-w-sm border-gray-800  bg-gray-900  ">
        <CardHeader>
          <CardTitle className="text-white text-center">Login to your account</CardTitle>
          <CardDescription className="text-white text-center">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label 
                  className="text-gray-300"
                  htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-gray-800 text-white border-gray-700"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label 
                    className="text-gray-300"
                    htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-gray-300"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-gray-800 text-white border-gray-700"
                />
              </div>
            </div>
            <CardFooter className="flex-col gap-2 mt-6">
              <Button type="submit"className="w-full bg-green-600 hover:bg-green-700" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
              <p className="text-center text-[15px] text-gray-400">
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="text-green-500 hover:underline"
                >
                  Sign Up
                </a>
              </p>

            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
