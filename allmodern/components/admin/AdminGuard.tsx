"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("allmodern-auth") === "true";
    const role = localStorage.getItem("allmodern-auth-role");

    if (!isAuthenticated || role !== "admin") {
      router.push("/account");
    } else {
      setAuthorized(true);
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#f8f9fc]">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#1a237e] border-t-transparent mx-auto"></div>
          <p className="mt-4 text-[14px] text-gray-500 font-medium font-sans">Checking authorization...</p>
        </div>
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  return <>{children}</>;
}
