"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2 } from "lucide-react";

const allModernCategories = [
  { id: 1, title: "Furniture", image: "/images/cat_living_room.png" },
  { id: 2, title: "Outdoor", image: "/images/cat_outdoor.png" },
  { id: 3, title: "Lighting", image: "/images/hero.png" },
  { id: 4, title: "Rugs", image: "/images/cat_bedroom.png" },
  { id: 5, title: "Decor & Pillows", image: "/images/cat_dining.png" },
  { id: 6, title: "Wall Decor", image: "/images/cat_living_room.png" },
  { id: 7, title: "Bedding", image: "/images/cat_bedroom.png" },
  { id: 8, title: "Bath", image: "/images/cat_dining.png" },
  { id: 9, title: "Kitchen & Tabletop", image: "/images/cat_outdoor.png" },
  { id: 10, title: "Storage", image: "/images/hero.png" },
  { id: 11, title: "Baby & Kids", image: "/images/cat_living_room.png" },
];

export default function CategoriesPage() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px]">
      {/* Header */}
      <div className="p-6 border-b border-gray-50 flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#1f2937]">All Category</h2>
        <Link 
          href="/admin/categories/add" 
          className="bg-[#1f2937] hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <Plus size={16} />
          Add Category
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-4 px-6 text-sm font-semibold text-gray-500 w-[150px]">Image</th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-500">Title</th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-500 text-right w-[150px]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {allModernCategories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-6">
                  <div className="w-14 h-14 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center overflow-hidden p-1">
                    <Image
                      src={category.image}
                      alt={category.title}
                      width={48}
                      height={48}
                      className="object-contain w-full h-full mix-blend-multiply"
                    />
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-gray-700 font-medium">
                  {category.title}
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
