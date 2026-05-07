"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";

// Mock data using AllModern products
const initialCountdowns = [
  { id: 1, title: "Miller 56\" Upholstered Loveseat", image: "/images/cat_living_room.png" },
];

export default function CountdownPage() {
  const [countdowns, setCountdowns] = useState(initialCountdowns);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px] flex flex-col max-w-5xl mx-auto">
      {/* Header */}
      <div className="p-6 border-b border-gray-50 flex items-center justify-between shrink-0">
        <h2 className="text-lg font-bold text-[#1f2937]">All Countdown</h2>
        <Link 
          href="/admin/customization/countdown/add" 
          className="bg-[#1f2937] hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <Plus size={16} />
          Add Countdown
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-4 px-6 text-sm font-semibold text-gray-500 w-[20%]">Image</th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-500 w-[60%]">Title</th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-500 text-right w-[20%]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {countdowns.map((countdown) => (
              <tr key={countdown.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="py-4 px-6">
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center relative">
                    <Image
                      src={countdown.image}
                      alt={countdown.title}
                      fill
                      className="object-contain p-1 mix-blend-multiply"
                    />
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-gray-600 font-medium">
                  {countdown.title}
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors">
                      <Trash2 size={14} />
                    </button>
                    <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                      <Pencil size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
