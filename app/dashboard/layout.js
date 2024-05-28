import Sidebar from "@/components/dashboard/Sidebar";
import React from "react";

export default function Layout({ children }) {
  return (
    <main>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        {children}
      </div>
    </main>
  );
}
