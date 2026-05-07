"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddTestimonialPage() {
  const [authorName, setAuthorName] = useState("");
  const [designation, setDesignation] = useState("");
  const [rating, setRating] = useState("");
  const [content, setContent] = useState("");

  const handleSave = () => {
    if (!authorName || !rating || !content) {
      alert("Please fill in the required fields (Author Name, Rating, Testimonial Content)");
      return;
    }
    alert("Testimonial added successfully!");
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-4xl mx-auto mb-10">
      {/* Header */}
      <div className="p-6 border-b border-gray-50 flex items-center gap-4">
        <Link href="/admin/customization/testimonials" className="text-gray-400 hover:text-gray-600 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h2 className="text-lg font-bold text-[#1f2937]">Add Testimonial</h2>
      </div>

      {/* Form Content */}
      <div className="p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Author Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Designation (e.g., Serial Entrepreneur)</label>
          <input
            type="text"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rating (1-5) <span className="text-red-500">*</span></label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Avatar Image</label>
          <div className="flex items-center gap-0 w-full border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-500 max-w-md mb-3">
            <label className="bg-blue-50 text-blue-600 px-4 py-3 text-sm font-medium cursor-pointer border-r border-gray-200 hover:bg-blue-100 transition-colors whitespace-nowrap">
              Choose File
              <input type="file" className="hidden" />
            </label>
            <div className="px-4 py-3 text-sm text-gray-400 bg-white flex-1 truncate">
              No file chosen
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Testimonial Content <span className="text-red-500">*</span></label>
          <textarea
            rows={4}
            placeholder="Write the review content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white resize-y"
          ></textarea>
        </div>

        <div className="pt-4">
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors"
          >
            Save Testimonial
          </button>
        </div>
      </div>
    </div>
  );
}
