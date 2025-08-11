"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HomePage from "@/app/HomePage/page";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      console.warn("No auth token found, redirecting to login");
      router.push("/login");
      return;
    }

    (async () => {
      const res = await window.api.auth.verify(token);
      if (!res.success) {
        localStorage.removeItem("auth_token");
        router.push("/login");
      } else {
        setIsLoggedIn(true);
        console.log("User is logged in by token, proceeding to home page");
      }
      setLoading(false);
    })();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; // optional loading state
  }

  return isLoggedIn ? <HomePage /> : null;
}
// This component checks if the user is logged in by verifying the JWT token.
// If not logged in, it redirects to the login page. If logged in, it renders the HomePage component.