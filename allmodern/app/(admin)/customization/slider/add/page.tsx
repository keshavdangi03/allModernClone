"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const allModernProducts = [
  { id: 1, name: "Miller 56\" Upholstered Loveseat", slug: "miller-56-upholstered-loveseat" },
  { id: 2, name: "Bennett Upholstered Swivel Barrel Chair", slug: "bennett-upholstered-swivel-barrel-chair" },
  { id: 3, name: "Miller 84\" Upholstered Sofa", slug: "miller-84-upholstered-sofa" },
  { id: 4, name: "Miller Upholstered Armchair", slug: "miller-upholstered-armchair" },
  { id: 5, name: "Bennett Vegan Leather Swivel Barrel Chair", slug: "bennett-vegan-leather-swivel-barrel-chair" },
  { id: 6, name: "Miller 2 - Piece Upholstered Chaise Sectional", slug: "miller-2-piece-upholstered-chaise-sectional" },
  { id: 7, name: "Salma Colorful Enamel End Table", slug: "salma-colorful-enamel-end-table" },
  { id: 8, name: "Rustic Pine Wood Platform Bed", slug: "rustic-pine-wood-platform-bed" },
];

export default function AddHeroSliderPage() {
  const [sliderName, setSliderName] = useState("");
  const [slug, setSlug] = useState("");
  const [discountRate, setDiscountRate] = useState("0");
  const [productSlug, setProductSlug] = useState("");

  const handleSave = () => {
    if (!sliderName || !discountRate || !productSlug) {
      alert("Please fill in the required fields (Slider Name, Discount Rate, and Product Slug)");
      return;
    }
    alert("Hero Slider added successfully!");
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-4xl mx-auto mb-10">
      {/* Header */}
      <div className="p-6 border-b border-gray-50 flex items-center gap-4">
        <Link href="/admin/customization/slider" className="text-gray-400 hover:text-gray-600 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h2 className="text-lg font-bold text-[#1f2937]">Add Hero Slider</h2>
      </div>

      {/* Form Content */}
      <div className="p-8 space-y-6">
        
        {/* Slider Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Slider Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={sliderName}
            onChange={(e) => setSliderName(e.target.value)}
            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white"
          />
        </div>

        {/* Discount Rate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Discount Rate (%) <span className="text-red-500">*</span></label>
          <input
            type="number"
            value={discountRate}
            onChange={(e) => setDiscountRate(e.target.value)}
            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white"
          />
        </div>

        {/* Slider Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Slider Image (Recommended: 385x480) <span className="text-red-500">*</span></label>
          <div className="flex items-center gap-0 w-full border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-500 max-w-md">
            <label className="bg-blue-50 text-blue-600 px-4 py-3 text-sm font-medium cursor-pointer border-r border-gray-200 hover:bg-blue-100 transition-colors whitespace-nowrap">
              Choose File
              <input type="file" className="hidden" />
            </label>
            <div className="px-4 py-3 text-sm text-gray-400 bg-white flex-1 truncate">
              No file chosen
            </div>
          </div>
        </div>

        {/* Product Slug (Dropdown based on products) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Slug <span className="text-red-500">*</span></label>
          <select
            value={productSlug}
            onChange={(e) => setProductSlug(e.target.value)}
            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white text-gray-700 cursor-pointer"
          >
            <option value="" disabled>Select your product slug</option>
            {allModernProducts.map((product) => (
              <option key={product.id} value={product.slug}>
                {product.slug} ({product.name})
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors"
          >
            Save Slider
          </button>
        </div>
      </div>
    </div>
  );
}
