"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

export default function RedirectIfNotRegistered({ children }: { children: ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const registered = localStorage.getItem("registered");
      if (!registered && window.location.pathname !== "/login") {
        router.replace("/login");
      }
    }
  }, [router]);
  return <>{children}</>;
}
