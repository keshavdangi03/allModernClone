"use client";

import React, { useState } from "react";

export default function SeoSettingsPage() {
  const [metaTitle, setMetaTitle] = useState("AllModern Clone - Shop Furniture & Decor");
  const [metaDescription, setMetaDescription] = useState("Shop AllModern for the best of modern in every style, smartly priced and delivered fast + free.");
  const [metaKeywords, setMetaKeywords] = useState("furniture, modern furniture, decor, allmodern");

  const handleSave = () => {
    alert("SEO Settings saved successfully!");
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-6 border-b border-gray-50">
        <h2 className="text-lg font-bold text-[#1f2937]">SEO Settings</h2>
      </div>

      {/* Form Content */}
      <div className="p-8 space-y-6">
        
        {/* Meta Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white"
          />
        </div>

        {/* Meta Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description <span className="text-red-500">*</span></label>
          <textarea
            rows={4}
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white resize-y"
          ></textarea>
        </div>

        {/* Meta Keywords */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Meta Keywords <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={metaKeywords}
            onChange={(e) => setMetaKeywords(e.target.value)}
            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white"
          />
          <p className="text-xs text-gray-500 mt-2">Separate keywords with a comma.</p>
        </div>

        {/* OG Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">OG Image (Recommended: 1200x630)</label>
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

        {/* Submit */}
        <div className="pt-4">
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
