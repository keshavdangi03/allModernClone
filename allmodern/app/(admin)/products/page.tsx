"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pencil, Trash2, Plus, ArrowLeft, ArrowRight } from "lucide-react";

// Mock data from allmodern clone components
const allProducts = [
  { id: 1, name: "Miller 56\" Upholstered Loveseat", image: "/images/cat_living_room.png" },
  { id: 2, name: "Bennett Upholstered Swivel Barrel Chair", image: "/images/cat_dining.png" },
  { id: 3, name: "Miller 84\" Upholstered Sofa", image: "/images/hero.png" },
  { id: 4, name: "Miller Upholstered Armchair", image: "/images/cat_living_room.png" },
  { id: 5, name: "Bennett Vegan Leather Swivel Barrel Chair", image: "/images/cat_bedroom.png" },
  { id: 6, name: "Miller 2 - Piece Upholstered Chaise Sectional", image: "/images/cat_outdoor.png" },
  { id: 7, name: "Salma Colorful Enamel End Table", image: "/images/cat_dining.png" },
  { id: 8, name: "Rustic Pine Wood Platform Bed", image: "/images/cat_bedroom.png" }, // Added to have enough for pagination
];

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(allProducts.length / itemsPerPage);

  const paginatedProducts = allProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col min-h-[600px]">
      {/* Header */}
      <div className="p-6 border-b border-gray-50 flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#1f2937]">All Products</h2>
        <Link 
          href="/admin/products/add" 
          className="bg-[#1f2937] hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <Plus size={16} />
          Add Product
        </Link>
      </div>

      {/* Product Grid */}
      <div className="p-6 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProducts.map((product) => (
            <div key={product.id} className="group">
              <div className="border border-gray-100 rounded-xl p-4 flex flex-col h-[280px] bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-1 relative w-full mb-4 flex items-center justify-center overflow-hidden rounded-lg bg-gray-50/50">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="object-contain max-h-full mix-blend-multiply"
                  />
                </div>
                <div className="flex items-center gap-2 mt-auto">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2.5 text-sm font-medium flex items-center justify-center gap-2 transition-colors">
                    <Pencil size={16} />
                    Edit Product
                  </button>
                  <button className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center text-gray-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors shrink-0">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <p className="mt-3 text-sm font-medium text-gray-700 px-1 line-clamp-2">
                {product.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="p-6 border-t border-gray-50 flex items-center justify-center sm:justify-end gap-2 mt-auto">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowLeft size={16} />
          Previous
        </button>

        <div className="flex items-center gap-1">
          {[...Array(totalPages)].map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                  currentPage === pageNum
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
