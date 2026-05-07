"use client";

import React from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";

const mockCoupons = [
  { id: 1, name: "pimjo", code: "pimjo", percentage: "100%" },
  { id: 2, name: "best deal", code: "DGODIOOJ", percentage: "9%" },
  { id: 3, name: "best deal", code: "WTPWDUPW", percentage: "11%" },
];

export default function CouponsPage() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px] max-w-5xl mx-auto">
      {/* Header */}
      <div className="p-6 border-b border-gray-50 flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#1f2937]">All Coupons</h2>
        <Link 
          href="/admin/coupons/add" 
          className="bg-[#1f2937] hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <Plus size={16} />
          Add Coupon
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-4 px-6 text-sm font-semibold text-gray-500 w-[30%]">Name</th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-500 w-[30%]">Code</th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-500 w-[20%]">Percentage</th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-500 text-right w-[20%]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {mockCoupons.map((coupon) => (
              <tr key={coupon.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-6 text-sm text-gray-600 font-medium">
                  {coupon.name}
                </td>
                <td className="py-4 px-6 text-sm text-gray-800 font-medium">
                  {coupon.code}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {coupon.percentage}
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors">
                      <Trash2 size={14} />
                    </button>
                    <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-colors">
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
