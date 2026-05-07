import React from "react";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | CozyCommerce",
  description: "Admin dashboard for CozyCommerce",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#f3f4f6] font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#f8f9fc] p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
