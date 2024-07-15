"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";

export default function Layout({ children }) {
  const token = useSelector((state) => state.auth.token);

  if (!token) {
    redirect("/auth/login");
  }
  return (
    <main>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        {children}
      </div>
    </main>
  );
}
